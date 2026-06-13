"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized.");
  }
}

export async function getTransactionReports(filters: {
  startDate?: string;
  endDate?: string;
  type?: "POS" | "BOOKING" | "ALL";
}) {
  try {
    await requireAdmin();
    const { startDate, endDate, type = "ALL" } = filters;

    let dateFilter: any = {};
    if (startDate && !isNaN(new Date(startDate).getTime())) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate && !isNaN(new Date(endDate).getTime())) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    const [transactions, bookings] = await Promise.all([
      type === "ALL" || type === "POS"
        ? prisma.transaction.findMany({
          where: {
            createdAt: Object.keys(dateFilter).length > 0 ? dateFilter : undefined,
          },
          include: {
            cashier: { select: { name: true } },
            referralCode: { select: { code: true } },
            items: {
              include: { product: true }
            }
          },
          orderBy: { createdAt: "desc" }
        })
        : Promise.resolve([]),
      type === "ALL" || type === "BOOKING"
        ? prisma.booking.findMany({
          where: {
            createdAt: Object.keys(dateFilter).length > 0 ? dateFilter : undefined,
            // Fix #1: Hanya booking confirmed/completed/success yang masuk laporan revenue
            // Booking pending/cancelled tidak dihitung sebagai pendapatan
            status: { in: ["confirmed", "completed", "success"] },
          },
          orderBy: { createdAt: "desc" }
        })
        : Promise.resolve([])
    ]);

    const normalizedPos = transactions.map(t => ({
      id: t.id,
      invoiceNumber: t.invoiceNumber,
      total: t.total,
      status: t.status,
      paymentMethod: t.paymentMethod,
      createdAt: t.createdAt.toISOString(),
      customer: t.cashier?.name || "POS Customer",
      phone: "-",
      referral: t.referralCode?.code || "-",
      type: "POS",
      details: t.items.map((i: any) => `${i.product.name} x${i.qty}`).join(", ")
    }));

    const normalizedBookings = bookings.map(b => ({
      id: b.id,
      invoiceNumber: b.invoiceNo,
      total: b.finalPrice,
      status: b.status.toUpperCase(),
      paymentMethod: b.paymentMethod.toUpperCase(),
      createdAt: b.createdAt.toISOString(),
      customer: b.customerName,
      phone: b.customerPhone || "-",
      referral: b.referralCode || "-",
      type: "BOOKING",
      details: b.packageName
    }));

    const combined = [...normalizedPos, ...normalizedBookings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // POS transactions are always COMPLETED; bookings can be confirmed/completed/success
    // (already pre-filtered in the query). Count all as revenue.
    const posRevenue = normalizedPos
      .filter(t => t.status === "COMPLETED")
      .reduce((sum, t) => sum + t.total, 0);
    const bookingRevenue = normalizedBookings.reduce((sum, t) => sum + t.total, 0);
    const totalRevenue = posRevenue + bookingRevenue;

    return {
      success: true,
      data: {
        transactions: combined,
        summary: {
          totalCount: combined.length,
          totalRevenue,
          posCount: normalizedPos.length,
          bookingCount: normalizedBookings.length
        }
      }
    };
  } catch (error: any) {
    console.error("Reports Action Error:", error);
    return { success: false, error: error.message };
  }
}

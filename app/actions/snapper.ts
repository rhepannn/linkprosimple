"use server";

import { prisma } from "@/lib/prisma";

export async function getSnapperDashboardData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        referralCode: true,
        commissions: {
          include: {
            booking: true
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

    if (!user) {
      return { success: false, error: "User tidak ditemukan" };
    }

    return {
      success: true,
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        bankName: user.bankName,
        bankAccount: user.bankAccount,
        referralCode: user.referralCode ? {
          id: user.referralCode.id,
          code: user.referralCode.code,
          discountPct: user.referralCode.discountPct,
          maxDiscountAmount: user.referralCode.maxDiscountAmount,
          feePercentage: user.referralCode.feePercentage,
          usageCount: user.referralCode.usageCount,
          isActive: user.referralCode.isActive,
          targetProductId: user.referralCode.targetProductId,
        } : null,
        commissions: user.commissions.map(c => ({
          id: c.id,
          bookingId: c.bookingId,
          amount: c.amount,
          status: c.status,
          createdAt: c.createdAt.toISOString(),
          booking: {
            invoiceNo: c.booking.invoiceNo,
            customerName: c.booking.customerName,
            packageName: c.booking.packageName,
            sessionDate: c.booking.sessionDate,
            finalPrice: c.booking.finalPrice,
          }
        }))
      }
    };
  } catch (error: any) {
    console.error("getSnapperDashboardData error:", error);
    return { success: false, error: error.message || "Gagal mengambil data dashboard." };
  }
}

export async function updateSnapperReferralProduct(userId: string, productId: string | null) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { referralCode: true }
    });

    if (!user || !user.referralCode) {
      return { success: false, error: "Referral code tidak ditemukan untuk user ini." };
    }

    await prisma.referralCode.update({
      where: { id: user.referralCode.id },
      data: { targetProductId: productId }
    });

    return { success: true };
  } catch (error: any) {
    console.error("updateSnapperReferralProduct error:", error);
    return { success: false, error: error.message || "Gagal memperbarui produk referral." };
  }
}

function maskName(name: string): string {
  if (!name) return "***";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].length <= 2 ? parts[0][0] + "***" : parts[0][0] + "*".repeat(Math.max(parts[0].length - 1, 1));
  }
  const firstName = parts[0];
  const rest = parts.slice(1).join(" ");
  if (rest.length <= 2) return firstName + " " + rest[0] + "***";
  return firstName + " " + rest[0] + "*".repeat(Math.max(rest.length - 1, 1));
}

export interface AffiliateTransaction {
  id: string;
  transactionDate: string;
  buyerName: string;
  buyerNameMasked: string;
  productName: string;
  amountPaid: number;
  commissionAmount: number;
  commissionStatus: "pending" | "paid";
}

export interface AffiliateTransactionSummary {
  totalTransactionsThisMonth: number;
  totalCommissionThisMonth: number;
}

export async function getAffiliateTransactions(
  userId: string,
  filters?: { month?: number; year?: number; status?: string }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!user) {
      return { success: false, error: "Affiliator tidak ditemukan." };
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1; // 1-12
    const currentYear = now.getFullYear();

    // Base where clause
    const where: any = { snapperId: userId };

    // Apply month/year filter
    const filterMonth = filters?.month ?? currentMonth;
    const filterYear = filters?.year ?? currentYear;

    const startDate = new Date(filterYear, filterMonth - 1, 1);
    const endDate = new Date(filterYear, filterMonth, 0, 23, 59, 59, 999);
    where.createdAt = { gte: startDate, lte: endDate };

    // Apply status filter
    if (filters?.status && filters.status !== "all") {
      where.status = filters.status;
    }

    // Fetch commissions
    const commissions = await prisma.affiliateCommission.findMany({
      where,
      include: {
        booking: {
          select: {
            invoiceNo: true,
            customerName: true,
            packageName: true,
            finalPrice: true,
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    // Current month summary (unfiltered by month/year, only by userId)
    const thisMonthStart = new Date(currentYear, currentMonth - 1, 1);
    const thisMonthEnd = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    const thisMonthCommissions = await prisma.affiliateCommission.findMany({
      where: {
        snapperId: userId,
        createdAt: { gte: thisMonthStart, lte: thisMonthEnd }
      },
      select: { amount: true },
    });

    const transactions: AffiliateTransaction[] = commissions.map((c) => ({
      id: c.id,
      transactionDate: c.createdAt.toISOString(),
      buyerName: c.booking.customerName,
      buyerNameMasked: maskName(c.booking.customerName),
      productName: c.booking.packageName,
      amountPaid: c.booking.finalPrice,
      commissionAmount: c.amount,
      commissionStatus: c.status as "pending" | "paid",
    }));

    const summary: AffiliateTransactionSummary = {
      totalTransactionsThisMonth: thisMonthCommissions.length,
      totalCommissionThisMonth: thisMonthCommissions.reduce((s, c) => s + c.amount, 0),
    };

    return { success: true, data: { transactions, summary } };
  } catch (error: any) {
    console.error("getAffiliateTransactions error:", error);
    return { success: false, error: error.message || "Gagal mengambil data transaksi." };
  }
}

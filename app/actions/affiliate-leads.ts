"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAffiliateLead(data: {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  occupation?: string;
  productSku?: string;
  productName?: string;
  referralCode?: string;
  snapperId?: string;
  notes?: string;
  originalPrice?: number;
  finalPrice?: number;
}) {
  try {
    const lead = await prisma.affiliateLead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        city: data.city || null,
        occupation: data.occupation || null,
        productSku: data.productSku || null,
        productName: data.productName || null,
        referralCode: data.referralCode || null,
        snapperId: data.snapperId || null,
        notes: data.notes || null,
        status: "pending",
      },
    });

    // Automatically create a Booking entry so they show up under Participants
    let originalPrice = data.originalPrice || 0;
    let finalPrice = data.finalPrice || 0;
    let discountPct = 0;
    let packageId = "custom";

    if (data.productSku) {
      const prod = await prisma.product.findUnique({
        where: { sku: data.productSku }
      });
      if (prod) {
        if (!originalPrice) originalPrice = prod.price;
        packageId = prod.id;
      }
    }

    if (data.referralCode) {
      try {
        const normalizedCode = data.referralCode.trim().toUpperCase();
        const ref = await prisma.referralCode.findUnique({
          where: { code: normalizedCode }
        });
        if (ref) {
          discountPct = ref.discountPct ?? 0;
        }
      } catch (err) {
        console.error("Failed to query discount pct:", err);
      }
    }

    if (!finalPrice) {
      finalPrice = originalPrice * (1 - discountPct / 100);
    }

    const randHex = Math.floor(100000 + Math.random() * 900000).toString();
    const invoiceNo = `LKP-P-${randHex}`;
    const todayStr = new Date().toISOString().split("T")[0];

    // Get current real-time WIB time (Asia/Jakarta)
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat("id-ID", options);
    const sessionTime = formatter.format(now);

    await prisma.booking.create({
      data: {
        invoiceNo,
        packageId,
        packageName: data.productName || "Program Pelatihan",
        customerName: data.name,
        customerPhone: data.phone,
        sessionDate: todayStr,
        sessionTime,
        notes: data.notes || null,
        referralCode: data.referralCode || null,
        discountPct,
        originalPrice,
        finalPrice,
        paymentMethod: "transfer",
        status: "pending"
      }
    });

    // Increment referral usage if applicable
    if (data.referralCode) {
      try {
        const normalizedCode = data.referralCode.trim().toUpperCase();
        await prisma.referralCode.update({
          where: { code: normalizedCode },
          data: { usageCount: { increment: 1 } }
        });
      } catch (err) {
        console.error("Failed to increment referral usage:", err);
      }
    }

    revalidatePath("/admin/affiliators");
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error: any) {
    console.error("createAffiliateLead Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getAffiliateLeadStatus(id: string) {
  try {
    const lead = await prisma.affiliateLead.findUnique({
      where: { id }
    });
    if (!lead) return { success: false, error: "Pendaftaran tidak ditemukan" };
    return { success: true, status: lead.status };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAffiliateLeads(statusFilter?: string) {
  try {
    const where: any = {};
    if (statusFilter && statusFilter !== "all") {
      where.status = statusFilter;
    }

    const leads = await prisma.affiliateLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: leads.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAffiliateLeadStatus(
  id: string,
  status: string
) {
  try {
    await prisma.affiliateLead.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteAffiliateLead(id: string) {
  try {
    await prisma.affiliateLead.delete({
      where: { id },
    });

    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getReferrals() {
  try {
    const [referrals, bookingsRes, transactionsRes] = await Promise.all([
      prisma.referralCode.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          referral_usages: {
            include: {
              transaction: {
                select: { total: true, discount: true }
              }
            }
          }
        }
      }),
      supabaseAdmin
        .from("bookings")
        .select("referral_code, original_price, final_price")
        .not("referral_code", "is", null),
      Promise.resolve(null)
    ]);

    const onlineBookings = (bookingsRes.data || []) as { referral_code: string | null; original_price: number; final_price: number }[];

    // Aggregate online bookings per code
    const onlineStats: Record<string, { count: number; discountAmount: number }> = {};
    onlineBookings.forEach(b => {
      const code = b.referral_code?.toUpperCase();
      if (code) {
        if (!onlineStats[code]) onlineStats[code] = { count: 0, discountAmount: 0 };
        onlineStats[code].count += 1;
        onlineStats[code].discountAmount += Math.max(0, b.original_price - b.final_price);
      }
    });

    const combinedData = referrals.map(ref => {
      // POS transactions via referral_usages
      const posTransactions = ref.referral_usages.length;
      const posDiscountTotal = ref.referral_usages.reduce((sum, u) => sum + (u.transaction?.discount ?? 0), 0);
      const posRevenue = ref.referral_usages.reduce((sum, u) => sum + (u.transaction?.total ?? 0), 0);

      // Online bookings
      const online = onlineStats[ref.code.toUpperCase()] || { count: 0, discountAmount: 0 };

      const totalTransactions = posTransactions + online.count;
      const totalDiscountAmount = posDiscountTotal + online.discountAmount;

      // Marketing fee = feePercentage % of (total - discount) for POS transactions
      const totalMarketingFee = ref.referral_usages.reduce((sum, u) => {
        const gross = (u.transaction?.total ?? 0);
        return sum + (gross * ref.feePercentage / 100);
      }, 0);

      return {
        ...ref,
        createdAt: ref.createdAt.toISOString(),
        updatedAt: ref.updatedAt.toISOString(),
        expiryDate: ref.expiryDate ? ref.expiryDate.toISOString() : null,
        usageCount: ref.usageCount + online.count,
        totalTransactions,
        totalDiscountAmount,
        totalMarketingFee,
        // Remove nested includes from client data
        referral_usages: undefined,
      };
    });

    return { success: true, data: combinedData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createReferral(data: {
  code: string;
  marketerName: string;
  discountPercentage: number;
  maxDiscountAmount: number;
  feePercentage: number;
  bankName?: string | null;
  bankAccount?: string | null;
  usageLimit?: number | null;
  expiryDate?: string | null;
}) {
  try {
    const referral = await prisma.referralCode.create({
      data: {
        code: data.code.toUpperCase(),
        marketerName: data.marketerName,
        discountPct: data.discountPercentage,
        maxDiscountAmount: data.maxDiscountAmount,
        feePercentage: data.feePercentage,
        bankName: data.bankName || null,
        bankAccount: data.bankAccount || null,
        usageLimit: data.usageLimit || null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        isActive: true,
      },
    });
    revalidatePath("/admin/referrals");
    return {
      success: true,
      data: {
        ...referral,
        createdAt: referral.createdAt.toISOString(),
        updatedAt: referral.updatedAt.toISOString(),
        expiryDate: referral.expiryDate ? referral.expiryDate.toISOString() : null,
        totalTransactions: 0,
        totalDiscountAmount: 0,
        totalMarketingFee: 0,
      }
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { success: false, error: "Kode promo ini sudah ada. Silakan gunakan kode lain yang unik." };
    }
    return { success: false, error: error.message || "Gagal membuat kode promo." };
  }
}

export async function updateReferral(
  id: string,
  data: {
    code: string;
    marketerName: string;
    discountPercentage: number;
    maxDiscountAmount: number;
    feePercentage: number;
    bankName?: string | null;
    bankAccount?: string | null;
    usageLimit?: number | null;
    expiryDate?: string | null;
    isActive?: boolean;
  }
) {
  try {
    const referral = await prisma.referralCode.update({
      where: { id },
      data: {
        code: data.code.toUpperCase(),
        marketerName: data.marketerName,
        discountPct: data.discountPercentage,
        maxDiscountAmount: data.maxDiscountAmount,
        feePercentage: data.feePercentage,
        bankName: data.bankName || null,
        bankAccount: data.bankAccount || null,
        usageLimit: data.usageLimit || null,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        isActive: data.isActive ?? true,
      },
    });
    revalidatePath("/admin/referrals");
    return {
      success: true,
      data: {
        ...referral,
        createdAt: referral.createdAt.toISOString(),
        updatedAt: referral.updatedAt.toISOString(),
        expiryDate: referral.expiryDate ? referral.expiryDate.toISOString() : null,
      }
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { success: false, error: "Kode promo ini sudah ada." };
    }
    return { success: false, error: error.message || "Gagal memperbarui kode promo." };
  }
}

export async function toggleReferralStatus(id: string, isActive: boolean) {
  try {
    await prisma.referralCode.update({
      where: { id },
      data: { isActive },
    });
    revalidatePath("/admin/referrals");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteReferral(id: string) {
  try {
    await prisma.referralCode.delete({
      where: { id },
    });
    revalidatePath("/admin/referrals");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function validateReferral(code: string) {
  try {
    const referral = await prisma.referralCode.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
      },
    });

    if (!referral) {
      return { success: false, error: "Kode promo tidak valid atau sudah tidak aktif." };
    }

    if (referral.usageLimit && referral.usageCount >= referral.usageLimit) {
      return { success: false, error: "Batas penggunaan kode promo telah tercapai." };
    }

    if (referral.expiryDate && new Date() > referral.expiryDate) {
      return { success: false, error: "Kode promo telah kadaluarsa." };
    }

    return {
      success: true,
      data: {
        code: referral.code,
        discountPct: referral.discountPct,
        maxDiscountAmount: referral.maxDiscountAmount
      }
    };
  } catch (error: any) {
    console.error("ValidateReferral Error:", error);
    return { success: false, error: `Gagal memvalidasi kode promo: ${error.message}` };
  }
}

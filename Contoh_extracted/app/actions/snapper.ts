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

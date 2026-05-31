"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// Ambil semua data affiliator (role: SNAPPER) dari database
export async function getAffiliators() {
  try {
    const snappers = await prisma.user.findMany({
      where: {
        role: "SNAPPER",
      },
      include: {
        referralCode: true,
        commissions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatted = snappers.map((s) => {
      const earnings = s.commissions.reduce((sum, c) => sum + c.amount, 0);
      return {
        id: s.id,
        name: s.name,
        email: s.email,
        phone: s.phone || "",
        bankName: s.bankName || s.referralCode?.bankName || "",
        bankAccount: s.bankAccount || s.referralCode?.bankAccount || "",
        joinDate: s.createdAt.toISOString().split("T")[0],
        referralCode: s.referralCode?.code || "",
        discountPct: s.referralCode?.discountPct ?? 10.0,
        feePercentage: s.referralCode?.feePercentage ?? 10.0,
        status: s.referralCode?.isActive ? "active" : "inactive",
        totalReferrals: s.referralCode?.usageCount ?? 0,
        totalEarnings: earnings,
        notes: s.referralCode?.bankName ? `${s.referralCode.bankName} - ${s.referralCode.bankAccount || ""}` : "",
      };
    });

    return { success: true, data: formatted };
  } catch (err: any) {
    console.error("getAffiliators error:", err);
    return { success: false, error: err.message || "Gagal mengambil data affiliator." };
  }
}

interface UpdateAffiliatorInput {
  name: string;
  phone: string;
  email: string;
  referralCode: string;
  status: "active" | "inactive";
  bankName?: string;
  bankAccount?: string;
  feePercentage?: number;
  discountPct?: number;
}

// Update data affiliator (User & ReferralCode)
export async function updateAffiliator(id: string, data: UpdateAffiliatorInput) {
  try {
    // 1. Cek apakah user ada
    const user = await prisma.user.findUnique({
      where: { id },
      include: { referralCode: true },
    });

    if (!user) {
      return { success: false, error: "Affiliator tidak ditemukan." };
    }

    // 2. Cek jika email diubah, pastikan tidak duplikat dengan user lain
    if (data.email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const emailDup = await prisma.user.findUnique({
        where: { email: data.email.trim().toLowerCase() },
      });
      if (emailDup) {
        return { success: false, error: "Email sudah digunakan oleh pengguna lain." };
      }
    }

    // 3. Cek jika kode referral diubah, pastikan tidak duplikat
    const cleanCode = data.referralCode.trim().toUpperCase();
    if (user.referralCode && cleanCode !== user.referralCode.code) {
      const codeDup = await prisma.referralCode.findUnique({
        where: { code: cleanCode },
      });
      if (codeDup) {
        return { success: false, error: "Kode referral sudah digunakan." };
      }
    }

    // 4. Update data User dan ReferralCode secara aman dalam transaksi
    await prisma.$transaction(async (tx) => {
      // Update User
      await tx.user.update({
        where: { id },
        data: {
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone.trim(),
          bankName: data.bankName?.trim() || null,
          bankAccount: data.bankAccount?.trim() || null,
        },
      });

      // Update / Create Referral Code
      if (user.referralCode) {
        await tx.referralCode.update({
          where: { id: user.referralCode.id },
          data: {
            code: cleanCode,
            marketerName: data.name.trim(),
            isActive: data.status === "active",
            bankName: data.bankName?.trim() || null,
            bankAccount: data.bankAccount?.trim() || null,
            feePercentage: data.feePercentage ?? user.referralCode.feePercentage,
            discountPct: data.discountPct ?? user.referralCode.discountPct,
          },
        });
      } else {
        // Jika belum punya, buat baru
        await tx.referralCode.create({
          data: {
            code: cleanCode,
            marketerName: data.name.trim(),
            discountPct: data.discountPct ?? 10.0,
            maxDiscountAmount: 50000,
            feePercentage: data.feePercentage ?? 10.0,
            bankName: data.bankName?.trim() || null,
            bankAccount: data.bankAccount?.trim() || null,
            isActive: data.status === "active",
            ownerId: id,
          },
        });
      }
    });

    revalidatePath("/admin/affiliators");
    revalidatePath("/affiliate");
    return { success: true };
  } catch (err: any) {
    console.error("updateAffiliator error:", err);
    return { success: false, error: err.message || "Gagal memperbarui data affiliator." };
  }
}

// Tambah affiliator baru secara manual oleh admin
export async function createAffiliator(data: UpdateAffiliatorInput & { password?: string }) {
  try {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanCode = data.referralCode.trim().toUpperCase();

    // 1. Cek duplikat email
    const emailDup = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (emailDup) {
      return { success: false, error: "Email sudah digunakan." };
    }

    // 2. Cek duplikat referral code
    const codeDup = await prisma.referralCode.findUnique({
      where: { code: cleanCode },
    });
    if (codeDup) {
      return { success: false, error: "Kode referral sudah digunakan." };
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(data.password || "snappframe123", 10);

    // 4. Jalankan transaksi pembuatan user SNAPPER & referralCode
    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: data.name.trim(),
          email: cleanEmail,
          phone: data.phone.trim(),
          password: hashedPassword,
          role: "SNAPPER",
          bankName: data.bankName?.trim() || null,
          bankAccount: data.bankAccount?.trim() || null,
        },
      });

      await tx.referralCode.create({
        data: {
          code: cleanCode,
          marketerName: data.name.trim(),
          discountPct: data.discountPct ?? 10.0,
          maxDiscountAmount: 50000,
          feePercentage: data.feePercentage ?? 10.0,
          bankName: data.bankName?.trim() || null,
          bankAccount: data.bankAccount?.trim() || null,
          isActive: data.status === "active",
          ownerId: newUser.id,
        },
      });
    });

    revalidatePath("/admin/affiliators");
    revalidatePath("/affiliate");
    return { success: true };
  } catch (err: any) {
    console.error("createAffiliator error:", err);
    return { success: false, error: err.message || "Gagal menambahkan affiliator baru." };
  }
}

// Hapus data affiliator secara permanen
export async function deleteAffiliator(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { referralCode: true },
    });

    if (!user) {
      return { success: false, error: "Affiliator tidak ditemukan." };
    }

    await prisma.$transaction(async (tx) => {
      // Hapus referral code jika ada
      if (user.referralCode) {
        // Hapus referral usages jika ada (jika CASCADE belum diaktifkan)
        await tx.referralUsage.deleteMany({
          where: { referralCodeId: user.referralCode.id },
        });

        await tx.referralCode.delete({
          where: { id: user.referralCode.id },
        });
      }

      // Hapus commissions jika ada
      await tx.affiliateCommission.deleteMany({
        where: { snapperId: id },
      });

      // Hapus user
      await tx.user.delete({
        where: { id },
      });
    });

    revalidatePath("/admin/affiliators");
    revalidatePath("/affiliate");
    return { success: true };
  } catch (err: any) {
    console.error("deleteAffiliator error:", err);
    return { success: false, error: err.message || "Gagal menghapus data affiliator." };
  }
}

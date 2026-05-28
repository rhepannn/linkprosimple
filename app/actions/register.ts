"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerSnapper(data: any) {
  try {
    const { name, email, phone, bankName, bankAccount, referralCode, password } = data;

    if (!name || !email || !password || !referralCode) {
      return { success: false, error: "Nama, email, password, dan kode referral wajib diisi." };
    }

    const normalizedCode = referralCode.trim().toUpperCase();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return { success: false, error: "Email sudah terdaftar." };
    }

    // Check if referral code already exists
    const existingCode = await prisma.referralCode.findUnique({
      where: { code: normalizedCode },
    });
    if (existingCode) {
      return { success: false, error: "Kode referral sudah digunakan oleh orang lain." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and referral code in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone,
          bankName,
          bankAccount,
          password: hashedPassword,
          role: "SNAPPER",
        },
      });

      await tx.referralCode.create({
        data: {
          code: normalizedCode,
          marketerName: name,
          discountPct: 10.0, // Default 10% discount
          maxDiscountAmount: 50000, // Default max discount amount Rp 50.000
          feePercentage: 10.0, // Default 10% fee (commission) for snapper
          bankName,
          bankAccount,
          ownerId: user.id,
          isActive: true,
        },
      });

      return user;
    });

    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error: any) {
    console.error("Snapper registration error:", error);
    return { success: false, error: error.message || "Terjadi kesalahan saat pendaftaran." };
  }
}

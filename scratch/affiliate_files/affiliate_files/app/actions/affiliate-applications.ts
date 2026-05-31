"use server";

// app/actions/affiliate-applications.ts
// Server actions for affiliate registration & admin management

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export interface AffiliateApplicationInput {
  name: string;
  email: string;
  phone: string;
  password?: string;
  instagram?: string;
  tiktok?: string;
  occupation?: string;
  city?: string;
  motivation?: string;
  experience?: string;
}

async function generateUniqueReferralCode(name: string): Promise<string> {
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  const baseCode = cleanName.substring(0, 6) || "REF";
  let code = `${baseCode}10`;
  
  // Check if code exists
  let existing = await prisma.referralCode.findUnique({ where: { code } });
  while (existing) {
    const randomNum = Math.floor(10 + Math.random() * 90); // 2 digit random
    code = `${baseCode}${randomNum}`;
    existing = await prisma.referralCode.findUnique({ where: { code } });
  }
  return code;
}

/* ── Public: Submit pendaftaran affiliate ── */
export async function submitAffiliateApplication(data: AffiliateApplicationInput) {
  try {
    // Validasi wajib
    if (!data.name || !data.email || !data.phone || !data.password) {
      return { success: false, error: "Nama, email, nomor WhatsApp, dan kata sandi wajib diisi." };
    }

    // Cek duplikat email/phone di applications
    const existingApp = await prisma.affiliateApplication.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phone: data.phone },
        ],
      },
    });
    if (existingApp) {
      return {
        success: false,
        error: "Email atau nomor WhatsApp ini sudah pernah mengirimkan pendaftaran.",
      };
    }

    // Cek duplikat email di users
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      return {
        success: false,
        error: "Email ini sudah terdaftar sebagai pengguna sistem.",
      };
    }

    const application = await prisma.affiliateApplication.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        password: data.password, // Simpan kata sandi asli (plaintext) agar admin bisa menyalin/meng-hash ke tabel users saat disetujui
        instagram: data.instagram?.trim() || null,
        tiktok: data.tiktok?.trim() || null,
        occupation: data.occupation || null,
        city: data.city?.trim() || null,
        motivation: data.motivation?.trim() || null,
        experience: data.experience?.trim() || null,
        status: "pending",
      },
    });

    revalidatePath("/admin/affiliators");
    return { success: true, data: application };
  } catch (err) {
    console.error("submitAffiliateApplication error:", err);
    return { success: false, error: "Terjadi kesalahan server, silakan coba lagi." };
  }
}

/* ── Admin: Ambil semua pendaftaran ── */
export async function getAffiliateApplications(status?: string) {
  try {
    const where = status && status !== "all" ? { status } : {};
    const applications = await prisma.affiliateApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: applications };
  } catch (err) {
    console.error("getAffiliateApplications error:", err);
    return { success: false, data: [], error: "Gagal mengambil data." };
  }
}

/* ── Admin: Update status pendaftaran ── */
export async function updateApplicationStatus(id: string, status: "approved" | "rejected" | "pending", notes?: string) {
  try {
    // Ambil detail pendaftaran
    const application = await prisma.affiliateApplication.findUnique({
      where: { id }
    });

    if (!application) {
      return { success: false, error: "Pendaftaran tidak ditemukan." };
    }

    // Jika disetujui, buat akun user dengan role SNAPPER secara otomatis!
    if (status === "approved") {
      // Cek apakah email sudah terdaftar di table users
      const existingUser = await prisma.user.findUnique({
        where: { email: application.email },
        include: { referralCode: true }
      });

      if (existingUser) {
        if (existingUser.role !== "SNAPPER") {
          return { success: false, error: "Email pendaftar sudah terdaftar sebagai administrator di sistem." };
        }

        // Jika sudah ada sebagai SNAPPER, pastikan mereka memiliki ReferralCode dan aktifkan
        if (existingUser.referralCode) {
          await prisma.referralCode.update({
            where: { id: existingUser.referralCode.id },
            data: { isActive: true }
          });
        } else {
          // Jika belum punya kode referral, buat baru
          const generatedReferralCode = await generateUniqueReferralCode(application.name);
          await prisma.referralCode.create({
            data: {
              code: generatedReferralCode,
              marketerName: application.name,
              discountPct: 10.0,
              maxDiscountAmount: 50000,
              feePercentage: 10.0,
              ownerId: existingUser.id,
              isActive: true,
            }
          });
        }
      } else {
        // Buat user SNAPPER baru
        const hashedPassword = await bcrypt.hash(application.password || "default123", 10);
        const generatedReferralCode = await generateUniqueReferralCode(application.name);

        await prisma.$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              name: application.name,
              email: application.email,
              phone: application.phone,
              password: hashedPassword,
              role: "SNAPPER",
            }
          });

          await tx.referralCode.create({
            data: {
              code: generatedReferralCode,
              marketerName: application.name,
              discountPct: 10.0,
              maxDiscountAmount: 50000,
              feePercentage: 10.0,
              ownerId: user.id,
              isActive: true,
            }
          });
        });
      }
    } else {
      // Jika status diubah ke pending atau rejected (non-approved), hapus user SNAPPER & referral code mereka agar hilang dari daftar affiliator
      const existingUser = await prisma.user.findUnique({
        where: { email: application.email },
        include: { referralCode: true }
      });
      if (existingUser) {
        if (existingUser.role === "SNAPPER") {
          await prisma.$transaction(async (tx) => {
            if (existingUser.referralCode) {
              // Hapus referral usages jika ada
              await tx.referralUsage.deleteMany({
                where: { referralCodeId: existingUser.referralCode.id },
              });

              // Hapus referral code
              await tx.referralCode.delete({
                where: { id: existingUser.referralCode.id },
              });
            }

            // Hapus commissions jika ada
            await tx.affiliateCommission.deleteMany({
              where: { snapperId: existingUser.id },
            });

            // Hapus user
            await tx.user.delete({
              where: { id: existingUser.id },
            });
          });
        }
      }
    }

    const updated = await prisma.affiliateApplication.update({
      where: { id },
      data: { status, notes: notes ?? undefined },
    });
    
    revalidatePath("/admin/affiliators");
    return { success: true, data: updated };
  } catch (err: any) {
    console.error("updateApplicationStatus error:", err);
    return { success: false, error: err.message || "Gagal mengubah status." };
  }
}

/* ── Admin: Hapus pendaftaran ── */
export async function deleteAffiliateApplication(id: string) {
  try {
    await prisma.affiliateApplication.delete({ where: { id } });
    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (err) {
    console.error("deleteAffiliateApplication error:", err);
    return { success: false, error: "Gagal menghapus data." };
  }
}

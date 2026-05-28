import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// POST: Buat kode referral baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const referralSchema = z.object({
      code: z.string().min(1).max(10).toUpperCase().trim(),
      marketerName: z.string().min(1).trim(),
      discountPercentage: z.coerce.number().min(0).max(100),
      maxDiscountAmount: z.coerce.number().min(0).default(0),
      feePercentage: z.coerce.number().min(0).max(100).default(0),
      bankName: z.string().nullable().optional(),
      bankAccount: z.string().nullable().optional(),
      usageLimit: z.coerce.number().nullable().optional(),
      expiryDate: z.string().nullable().optional(),
    });

    const validatedData = referralSchema.parse(body);

    const referral = await prisma.referralCode.create({
      data: {
        code: validatedData.code,
        marketerName: validatedData.marketerName,
        discountPct: validatedData.discountPercentage,
        maxDiscountAmount: validatedData.maxDiscountAmount,
        feePercentage: validatedData.feePercentage,
        bankName: validatedData.bankName,
        bankAccount: validatedData.bankAccount,
        usageLimit: validatedData.usageLimit,
        expiryDate: validatedData.expiryDate ? new Date(validatedData.expiryDate) : null,
      },
    });

    return NextResponse.json(referral);
  } catch (error) {
    console.error("Referral creation error:", error);
    return NextResponse.json({ error: "Gagal membuat kode referral" }, { status: 400 });
  }
}

// GET: Ambil daftar kode referral
export async function GET() {
  try {
    const referrals = await prisma.referralCode.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(referrals);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data referral" }, { status: 500 });
  }
}

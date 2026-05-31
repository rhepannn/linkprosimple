import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;

    if (!code || typeof subtotal !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Code dan subtotal wajib diisi dengan benar' },
        { status: 400 }
      );
    }

    // Find the referral code
    const referral = await prisma.referralCode.findFirst({
      where: {
        code: {
          equals: code.trim(),
          mode: 'insensitive',
        },
        isActive: true,
      },
    });

    if (!referral) {
      return NextResponse.json(
        { success: false, message: 'Kode referral tidak ditemukan atau tidak aktif' },
        { status: 404 }
      );
    }

    // Check expiry date
    if (referral.expiryDate && new Date(referral.expiryDate) < new Date()) {
      return NextResponse.json(
        { success: false, message: 'Kode referral sudah kadaluarsa' },
        { status: 400 }
      );
    }

    // Check usage limit
    if (referral.usageLimit !== null && referral.usageCount >= referral.usageLimit) {
      return NextResponse.json(
        { success: false, message: 'Batas penggunaan kode referral sudah habis' },
        { status: 400 }
      );
    }

    // Calculate discount amount
    const rawDiscount = subtotal * (referral.discountPct / 100);
    const discountAmount = referral.maxDiscountAmount > 0
      ? Math.min(rawDiscount, referral.maxDiscountAmount)
      : rawDiscount;

    return NextResponse.json({
      success: true,
      data: {
        id: referral.id,
        marketerName: referral.marketerName,
        discountPercentage: referral.discountPct,
        maxDiscountAmount: referral.maxDiscountAmount,
        feePercentage: referral.feePercentage,
        discountAmount: discountAmount,
        bankName: referral.bankName,
        bankAccount: referral.bankAccount,
      },
    });

  } catch (error) {
    console.error('Error applying referral:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat memproses kode referral' },
      { status: 500 }
    );
  }
}

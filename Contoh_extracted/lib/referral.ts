// lib/referral.ts — Sistem Kode Referral Snapp.frame Studio
// validateReferral adalah async — mengambil data dari Supabase referral_codes.

export type ReferralCode = {
  code: string;
  discountPct: number;
  maxDiscountAmount: number;
  ownerName: string;
  isActive: boolean;
};

/**
 * Validasi kode referral — memanggil API route /api/referrals/validate.
 */
export async function validateReferral(input: string): Promise<ReferralCode | null> {
  if (!input?.trim()) return null;
  const normalized = input.trim().toUpperCase();

  try {
    const res = await fetch(`/api/referrals/validate?code=${encodeURIComponent(normalized)}`);
    if (res.ok) {
      const data = await res.json();
      return {
        code: data.code,
        discountPct: data.discountPct,
        maxDiscountAmount: data.maxDiscountAmount,
        ownerName: "Referral Partner",
        isActive: true,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Hitung harga setelah diskon.
 */
export function applyDiscount(originalPrice: number, discountPct: number, maxDiscountAmount: number = 0): number {
  if (discountPct <= 0) return originalPrice;
  if (discountPct >= 100) return 0;
  
  const rawDiscount = Math.floor(originalPrice * (discountPct / 100));
  const finalDiscount = maxDiscountAmount > 0 ? Math.min(rawDiscount, maxDiscountAmount) : rawDiscount;
  
  return Math.max(0, originalPrice - finalDiscount);
}

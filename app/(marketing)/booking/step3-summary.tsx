"use client";

import { useState, useEffect } from "react";
import { Tag, CheckCircle, XCircle } from "lucide-react";
import { Package } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { validateReferral, applyDiscount, ReferralCode } from "@/lib/referral";
import { BookingFormData } from "./step2-personal";
import { btn } from "@/lib/button-classes";

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

interface Step3Props {
  pkg: Package;
  formData: BookingFormData;
  referral: ReferralCode | null;
  onReferralChange: (r: ReferralCode | null) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Summary({ pkg, formData, referral, onReferralChange, onNext, onBack }: Step3Props) {
  const [code, setCode] = useState(referral?.code ?? "");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // If no referral is currently applied, look for one in localStorage
    if (!referral) {
      const savedCode = localStorage.getItem("snapp_referral_code");
      if (savedCode) {
        setCode(savedCode);
        setChecking(true);
        setError("");
        
        validateReferral(savedCode)
          .then((result) => {
            if (result) {
              onReferralChange(result);
            } else {
              // Remove invalid saved code to avoid loops
              localStorage.removeItem("snapp_referral_code");
            }
          })
          .catch(() => {})
          .finally(() => {
            setChecking(false);
          });
      }
    }
  }, [referral, onReferralChange]);

  const finalPrice = referral ? applyDiscount(pkg.price, referral.discountPct, referral.maxDiscountAmount) : pkg.price;
  const discount = pkg.price - finalPrice;

  async function applyCode() {
    if (!code.trim()) return;
    setChecking(true);
    setError("");
    try {
      const result = await validateReferral(code);
      if (result) {
        onReferralChange(result);
      } else {
        onReferralChange(null);
        setError("Kode referral tidak valid atau sudah tidak aktif.");
      }
    } finally {
      setChecking(false);
    }
  }

  function removeCode() {
    onReferralChange(null);
    setCode("");
    setError("");
  }

  const rowClass = "flex items-start justify-between gap-4 py-3 border-b border-[#E0E0DA]";
  const labelStyle = "text-xs text-[#888888]";
  const valueStyle = "text-sm text-[#1A1A1A] font-medium text-right";

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-medium tracking-[0.15em] text-[#888888] uppercase mb-2">Langkah 3 dari 5</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-heading)" }}>
          Ringkasan Booking
        </h2>
        <p className="text-[#5A5A5A] text-sm mt-2">Periksa detail booking Anda sebelum melanjutkan.</p>
      </div>

      {/* Summary Card */}
      <div className="rounded-2xl border border-[#E0E0DA] bg-white p-5 sm:p-6 mb-6">
        <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-[0.1em] mb-3">Detail Sesi</h3>
        <div>
          <div className={rowClass}>
            <span className={labelStyle}>Paket</span>
            <span className={valueStyle}>{pkg.name}</span>
          </div>
          <div className={rowClass}>
            <span className={labelStyle}>Nama</span>
            <span className={valueStyle}>{formData.name}</span>
          </div>
          <div className={rowClass}>
            <span className={labelStyle}>WhatsApp</span>
            <span className={valueStyle}>{formData.whatsapp}</span>
          </div>
          <div className={rowClass}>
            <span className={labelStyle}>Tanggal</span>
            <span className={valueStyle}>{formatDate(formData.date)}</span>
          </div>
          <div className={rowClass}>
            <span className={labelStyle}>Jam Mulai</span>
            <span className={valueStyle}>{formData.time} WIB</span>
          </div>
          {formData.notes && (
            <div className={rowClass}>
              <span className={labelStyle}>Catatan</span>
              <span className={[valueStyle, "max-w-[60%]"].join(" ")}>{formData.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Referral */}
      <div className="rounded-2xl border border-[#E0E0DA] bg-white p-5 sm:p-6 mb-6">
        <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-[0.1em] mb-3">
          <Tag size={12} className="inline mr-1.5" />
          Kode Referral
        </h3>

        {referral ? (
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F0EFE9] border border-[#DBC0AC]">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-[#5A371F] flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#3B2211]">{referral.code}</p>
                <p className="text-xs text-[#8B6145]">
                  {`Diskon ${referral.discountPct}%`}
                  {referral.maxDiscountAmount > 0 && ` (Maks Rp ${referral.maxDiscountAmount.toLocaleString("id-ID")})`}
                </p>
              </div>
            </div>
            <button onClick={removeCode} className="text-xs text-[#8B6145] underline hover:text-[#3B2211]">Hapus</button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan kode referral"
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
                disabled={checking}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E0E0DA] bg-white text-sm text-[#1A1A1A] placeholder-[#C0C0BC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] disabled:opacity-60"
              />
              <button
                onClick={applyCode}
                disabled={!code.trim() || checking}
                className={[btn.primary, "rounded-xl px-5 text-sm disabled:opacity-40 disabled:cursor-not-allowed min-w-[72px]"].join(" ")}
              >
                {checking ? "..." : "Pakai"}
              </button>
            </div>
            {error && (
              <p className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
                <XCircle size={13} /> {error}
              </p>
            )}
          </>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="rounded-2xl border border-[#E0E0DA] bg-white p-5 sm:p-6 mb-8">
        <h3 className="text-xs font-semibold text-[#888888] uppercase tracking-[0.1em] mb-3">Rincian Harga</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#5A5A5A]">Harga {pkg.name}</span>
            <span className="text-[#1A1A1A] font-medium">{formatPrice(pkg.price)}</span>
          </div>
          {referral && (
            <div className="flex justify-between text-sm">
              <span className="text-[#5A371F]">
                Diskon {referral.discountPct}% ({referral.code})
              </span>
              <span className="text-[#5A371F] font-medium">- {formatPrice(discount)}</span>
            </div>
          )}
          <div className="h-px bg-[#E0E0DA] my-2" />
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-[#1A1A1A]">Total</span>
            <span className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-heading)" }}>
              {formatPrice(finalPrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <button onClick={onBack} className={[btn.secondary, "rounded-xl"].join(" ")}>Kembali</button>
        <button onClick={onNext} className={[btn.primary, "rounded-xl px-8"].join(" ")}>Lanjut Bayar</button>
      </div>
    </div>
  );
}

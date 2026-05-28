"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Copy, Check, RotateCcw, AlertCircle, Loader2 } from "lucide-react";
import { Package } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { applyDiscount, ReferralCode } from "@/lib/referral";
import { BookingFormData } from "./step2-personal";
import { PaymentMethod } from "./step4-payment";
import { site } from "@/data/site";
import { btn } from "@/lib/button-classes";
import { createClient } from "@/lib/supabase/client";
import { createBooking, getBookingStatus } from "@/app/actions/bookings";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function formatDate(dateStr: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function generateInvoice(): string {
  const ts = Date.now().toString();
  return "SNF-" + ts.slice(-6);
}

interface Step5Props {
  pkg: Package;
  formData: BookingFormData;
  referral: ReferralCode | null;
  paymentMethod: PaymentMethod;
  onReset: () => void;
  siteSettings?: Record<string, string>;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function Step5Receipt({ pkg, formData, referral, paymentMethod, onReset, siteSettings = {} }: Step5Props) {
  const finalPrice = referral ? applyDiscount(pkg.price, referral.discountPct, referral.maxDiscountAmount) : pkg.price;
  const discount = pkg.price - finalPrice;
  const [invoice] = useState(generateInvoice);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [dbStatus, setDbStatus] = useState<string>("pending");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const hasSaved = useRef(false);

  useEffect(() => {
    if (dbStatus === "confirmed" || dbStatus === "completed") {
      setShowSuccessOverlay(true);
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [dbStatus]);

  // Listen to realtime status updates from database with a robust polling fallback
  useEffect(() => {
    if (saveState !== "saved") return;

    const supabase = createClient();
    const channel = supabase
      .channel(`booking-status-${invoice}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "bookings",
          filter: `invoice_no=eq.${invoice}`,
        },
        (payload) => {
          console.log("Realtime status update received:", payload.new);
          if (payload.new && payload.new.status) {
            setDbStatus(payload.new.status);
          }
        }
      )
      .subscribe();

    const interval = setInterval(async () => {
      try {
        const res = await getBookingStatus(invoice);
        if (res.success && res.status) {
          setDbStatus(res.status);
        }
      } catch (err) {
        console.error("Error polling booking status:", err);
      }
    }, 3000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [saveState, invoice]);

  // Insert booking to database exactly once when Step 5 mounts
  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;

    async function saveBooking() {
      setSaveState("saving");
      try {
        const payload = {
          invoice_no: invoice,
          package_id: pkg.id,
          package_name: pkg.name,
          customer_name: formData.name,
          customer_phone: formData.whatsapp,
          session_date: formData.date,
          session_time: formData.time,
          notes: formData.notes || null,
          referral_code: referral?.code ?? null,
          discount_pct: referral?.discountPct ?? 0,
          original_price: pkg.price,
          final_price: finalPrice,
          payment_method: paymentMethod,
          status: "pending",
        };

        const result = await createBooking(payload);

        if (!result.success) {
          throw new Error(result.error);
        }

        setSaveState("saved");
      } catch (err: any) {
        console.error("[Snapp.frame] Booking save failed:", err);
        setSaveError(err.message || "Booking gagal disimpan ke database. Silakan konfirmasi manual via WhatsApp.");
        setSaveState("error");
      }
    }

    saveBooking();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getPaymentMethodLabel() {
    if (paymentMethod === "transfer") return "Transfer Bank";
    if (paymentMethod === "dana") return "DANA";
    if (paymentMethod === "gopay") return "GoPay";
    return paymentMethod;
  }

  function buildWhatsAppMsg(): string {
    const date = formatDate(formData.date);
    const lines = [
      `Halo Snapp.frame Studio! 👋`,
      ``,
      `Saya sudah melakukan booking sesi foto dan ingin mengonfirmasi pembayaran saya.`,
      ``,
      `📋 *Detail Booking*`,
      `• Nama: ${formData.name}`,
      `• Paket: ${pkg.name}`,
      `• Tanggal: ${date}`,
      `• Jam: ${formData.time} WIB`,
      `• Durasi: ${pkg.duration || "-"}`,
      formData.notes ? `• Catatan: ${formData.notes}` : "",
      ``,
      `💳 *Pembayaran*`,
      `• Metode: ${getPaymentMethodLabel()}`,
      referral ? `• Kode Referral: ${referral.code} (diskon ${referral.discountPct}%)` : "",
      referral ? `• Diskon: - ${formatPrice(discount)}` : "",
      `• Total: ${formatPrice(finalPrice)}`,
      ``,
      `🧾 No. Invoice: ${invoice}`,
      ``,
      `Berikut saya lampirkan bukti transfer pembayarannya. Mohon segera dikonfirmasi ya, terima kasih! 🙏`,
    ].filter(Boolean).join("\n");

    // Gunakan custom WA number dari setting admin jika ada, jika tidak fallback ke default site WA
    const waNumber = siteSettings.training_payment_wa || site.contact.whatsapp;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`;
  }

  const dottedDivider = <div className="border-t border-dashed border-[#E0E0DA] my-4" />;

  return (
    <div>
      <div className="mb-8 text-center">
        <div className={[
          "w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500",
          saveState === "saving"
            ? "bg-[#E0E0DA]"
            : dbStatus === "confirmed" || dbStatus === "completed"
            ? "bg-emerald-500"
            : dbStatus === "cancelled"
            ? "bg-red-500"
            : "bg-amber-500"
        ].join(" ")}>
          {saveState === "saving" ? (
            <Loader2 size={24} className="text-[#888888] animate-spin" />
          ) : dbStatus === "confirmed" || dbStatus === "completed" ? (
            <Check size={26} className="text-white" />
          ) : (
            <AlertCircle size={26} className="text-white" />
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#3B2211] tracking-tight transition-all duration-300" style={{ fontFamily: "var(--font-heading)" }}>
          {saveState === "saving"
            ? "Menyimpan Booking..."
            : dbStatus === "confirmed"
            ? "Booking Dikonfirmasi!"
            : dbStatus === "completed"
            ? "Sesi Foto Selesai!"
            : dbStatus === "cancelled"
            ? "Booking Dibatalkan"
            : "Pesanan Menunggu Konfirmasi"}
        </h2>
        <p className="text-gray-500 text-sm mt-2 transition-all duration-300 font-bold">
          {saveState === "saving"
            ? "Mohon tunggu sebentar."
            : dbStatus === "confirmed"
            ? "Pembayaran Anda telah diverifikasi. Sampai jumpa di studio sesuai jadwal!"
            : dbStatus === "completed"
            ? "Terima kasih telah melakukan pemotretan di Snapp.frame Studio."
            : dbStatus === "cancelled"
            ? "Booking Anda telah dibatalkan. Silakan hubungi admin jika ada pertanyaan."
            : "Selesaikan pembayaran dan kirimkan bukti transfer ke WhatsApp admin melalui link di bawah."}
        </p>
        {saveState === "saved" && (
          <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-500 bg-amber-50 border-amber-200">
            {dbStatus === "confirmed" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700">Pembayaran Dikonfirmasi</span>
              </>
            ) : dbStatus === "completed" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-semibold text-blue-700">Sesi Selesai</span>
              </>
            ) : dbStatus === "cancelled" ? (
              <>
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-red-700">Dibatalkan</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-amber-700">Menunggu Konfirmasi Admin</span>
              </>
            )}
          </div>
        )}
      </div>

      {saveState === "error" && (
        <div className="flex items-start gap-3 mb-6 p-4 rounded-xl border border-red-200 bg-red-50 max-w-md mx-auto">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-red-700">{saveError}</p>
            <button
              onClick={() => { hasSaved.current = false; setSaveState("idle"); }}
              className="text-xs text-red-600 underline mt-1"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      {/* Receipt Card */}
      <div className="rounded-2xl border border-[#E0E0DA] bg-white overflow-hidden mb-6 max-w-md mx-auto">
        {/* Header */}
        <div className="bg-[#3B2211] text-[#FAFAF8] px-6 py-5 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FAFAF8]/60 mb-1">Struk Digital</p>
          <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Snapp.frame Studio</h3>
          <p className="text-xs text-[#FAFAF8]/60 mt-0.5">{site.tagline}</p>
          <p className="text-xs font-mono text-[#FAFAF8]/50 mt-2">{invoice}</p>
        </div>

        <div className="px-6 py-5">
          {/* Booking Details */}
          {[
            { label: "Nama",     value: formData.name },
            { label: "WhatsApp", value: formData.whatsapp },
            { label: "Paket",    value: pkg.name },
            { label: "Durasi",   value: pkg.duration || "-" },
            { label: "Foto",     value: pkg.photoCount || "-" },
            { label: "Tanggal",  value: formatDate(formData.date) },
            { label: "Jam",      value: `${formData.time} WIB` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 py-1.5 text-xs">
              <span className="text-[#888888]">{label}</span>
              <span className="text-[#1A1A1A] font-bold text-right max-w-[55%]">{value}</span>
            </div>
          ))}
          {formData.notes && (
            <div className="flex justify-between gap-4 py-1.5 text-xs">
              <span className="text-[#888888]">Catatan</span>
              <span className="text-[#1A1A1A] font-bold text-right max-w-[55%]">{formData.notes}</span>
            </div>
          )}

          {dottedDivider}

          {/* Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-[#888888]">Harga normal</span>
              <span className="text-[#1A1A1A] font-medium">{formatPrice(pkg.price)}</span>
            </div>
            {referral && (
              <div className="flex justify-between text-xs">
                <span className="text-[#5A371F] font-bold">
                  Diskon {referral.discountPct}% ({referral.code})
                </span>
                <span className="text-[#5A371F] font-bold">- {formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black pt-1">
              <span className="text-[#3B2211]">TOTAL</span>
              <span className="text-[#3B2211]" style={{ fontFamily: "var(--font-heading)" }}>{formatPrice(finalPrice)}</span>
            </div>
          </div>

          {dottedDivider}

          <p className="text-xs text-gray-500 mb-3 font-bold">
            Metode Pembayaran: <span className="font-black text-[#3B2211]">{getPaymentMethodLabel()}</span>
          </p>

          {/* Dynamic Payment Details Display */}
          {paymentMethod === "transfer" && (
            <div className="flex flex-col items-center py-4 bg-[#F8F6F4] rounded-xl mt-3 px-4 text-center space-y-2 border border-[#E0E0DA]/50">
              <p className="text-xs font-black text-[#3B2211] uppercase tracking-wider">Silakan Transfer Ke Rekening Bank</p>
              <p className="text-xl font-black text-[#C88A58] my-1 font-mono">
                {formatPrice(finalPrice)}
              </p>
              <div className="w-full border-t border-[#E0E0DA] my-1" />
              <div className="text-xs text-left w-full space-y-1 py-2 px-3 bg-white/60 rounded-lg font-bold text-gray-600">
                <div className="flex justify-between">
                  <span>Bank:</span>
                  <span className="text-[#3B2211]">{siteSettings.payment_bank_name || site.payment.bankName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>No. Rekening:</span>
                  <span className="text-[#3B2211] font-mono flex items-center gap-1">
                    {siteSettings.payment_bank_account || site.payment.bankAccount}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(siteSettings.payment_bank_account || site.payment.bankAccount);
                        toast.success("Nomor rekening disalin!");
                      }}
                      className="p-1 hover:bg-[#F8F6F4] rounded text-[#C88A58] transition-colors"
                      title="Salin No. Rekening"
                    >
                      <Copy size={11} />
                    </button>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Atas Nama:</span>
                  <span className="text-[#3B2211]">{siteSettings.payment_bank_owner || site.payment.bankOwner}</span>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "dana" && (
            <div className="flex flex-col items-center py-4 bg-[#F8F6F4] rounded-xl mt-3 px-4 text-center space-y-2 border border-[#E0E0DA]/50">
              <p className="text-xs font-black text-[#3B2211] uppercase tracking-wider">Silakan Kirim Saldo DANA</p>
              <p className="text-xl font-black text-[#C88A58] my-1 font-mono">
                {formatPrice(finalPrice)}
              </p>
              <div className="w-full border-t border-[#E0E0DA] my-1" />
              <div className="text-xs text-left w-full space-y-1 py-2 px-3 bg-white/60 rounded-lg font-bold text-gray-600">
                <div className="flex justify-between items-center">
                  <span>No. DANA:</span>
                  <span className="text-[#3B2211] font-mono flex items-center gap-1">
                    {siteSettings.payment_dana_number || "081234567890"}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(siteSettings.payment_dana_number || "081234567890");
                        toast.success("Nomor DANA disalin!");
                      }}
                      className="p-1 hover:bg-[#F8F6F4] rounded text-[#C88A58] transition-colors"
                      title="Salin No. DANA"
                    >
                      <Copy size={11} />
                    </button>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Atas Nama:</span>
                  <span className="text-[#3B2211]">{siteSettings.payment_dana_owner || "Snapp.frame Studio"}</span>
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "gopay" && (
            <div className="flex flex-col items-center py-4 bg-[#F8F6F4] rounded-xl mt-3 px-4 text-center space-y-2 border border-[#E0E0DA]/50">
              <p className="text-xs font-black text-[#3B2211] uppercase tracking-wider">Silakan Kirim Saldo GoPay</p>
              <p className="text-xl font-black text-[#C88A58] my-1 font-mono">
                {formatPrice(finalPrice)}
              </p>
              <div className="w-full border-t border-[#E0E0DA] my-1" />
              <div className="text-xs text-left w-full space-y-1 py-2 px-3 bg-white/60 rounded-lg font-bold text-gray-600">
                <div className="flex justify-between items-center">
                  <span>No. GoPay:</span>
                  <span className="text-[#3B2211] font-mono flex items-center gap-1">
                    {siteSettings.payment_gopay_number || "081234567890"}
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(siteSettings.payment_gopay_number || "081234567890");
                        toast.success("Nomor GoPay disalin!");
                      }}
                      className="p-1 hover:bg-[#F8F6F4] rounded text-[#C88A58] transition-colors"
                      title="Salin No. GoPay"
                    >
                      <Copy size={11} />
                    </button>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Atas Nama:</span>
                  <span className="text-[#3B2211]">{siteSettings.payment_gopay_owner || "Snapp.frame Studio"}</span>
                </div>
              </div>
            </div>
          )}

          {dottedDivider}
          <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">Terima kasih telah memilih Snapp.frame Studio ✦</p>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-md mx-auto space-y-3">
        <a
          href={buildWhatsAppMsg()}
          target="_blank"
          rel="noopener noreferrer"
          className={[btn.whatsapp, "w-full rounded-xl justify-center py-4 text-base font-black uppercase tracking-wider"].join(" ")}
        >
          <MessageCircle size={20} />
          Kirim Bukti Pembayaran (WA)
        </a>

        <button
          onClick={onReset}
          className={[btn.secondary, "w-full rounded-xl justify-center gap-2 font-bold text-xs uppercase tracking-widest py-3"].join(" ")}
        >
          <RotateCcw size={15} />
          Booking Sesi Baru
        </button>
      </div>

      {/* Confirmation Success Overlay (Green Flash + Checkmark Animation) */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            {/* Green Flash Effect */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-[#22C55E]"
            />

            {/* Checkmark Animation Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.3
                }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-12 h-12 text-[#22C55E]"
                  initial={{ strokeDasharray: 50, strokeDashoffset: 50 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </motion.svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-2xl font-black text-[#3B2211] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Booking Dikonfirmasi!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-xs text-gray-500 font-bold"
              >
                Terima kasih, pembayaran Anda berhasil diverifikasi oleh admin.
                <span className="block mt-2 font-medium text-[#C88A58] animate-pulse">Mengalihkan ke beranda...</span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

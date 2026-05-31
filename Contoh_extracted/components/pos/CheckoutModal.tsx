"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Smartphone,
  Sparkles,
  ReceiptText,
  Tag,
  Loader2,
  User,
  Phone,
  Calendar,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { saveTransaction } from "@/app/actions/transactions";
import Receipt from "./Receipt";

const paymentMethods = [
  {
    id: "Tunai",
    label: "Tunai / Cash",
    desc: "Bayar langsung di kasir",
    icon: Banknote,
    accent: "#10B981",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    id: "QRIS",
    label: "QRIS",
    desc: "Scan QR Code",
    icon: Smartphone,
    accent: "#3B82F6",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    id: "E-Wallet",
    label: "E-Wallet",
    desc: "GoPay, OVO, Dana, ShopeePay",
    icon: Smartphone,
    accent: "#F59E0B",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    id: "Transfer",
    label: "Transfer Bank",
    desc: "BCA, BRI, Mandiri, BNI",
    icon: CreditCard,
    accent: "#8B5CF6",
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
];

export default function CheckoutModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    items,
    clearCart,
    customerName,
    customerPhone,
    bookingDate,
    bookingTime,
    setCustomerInfo,
  } = useCartStore();

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container");
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (scrollContainer) scrollContainer.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      if (scrollContainer) scrollContainer.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      if (scrollContainer) scrollContainer.style.overflow = "auto";
    };
  }, [isOpen]);

  const [method, setMethod] = useState("Tunai");
  const [paymentRef, setPaymentRef] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  // Custom Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Referral State
  const [referralInput, setReferralInput] = useState("");
  const [referralData, setReferralData] = useState<{
    id: string;
    marketerName: string;
    discountAmount: number;
    feePercentage: number;
    discountPercentage: number;
  } | null>(null);
  const [referralMessage, setReferralMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isApplyingReferral, setIsApplyingReferral] = useState(false);

  const subtotalAmount = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = referralData?.discountAmount ?? 0;
  const finalTotal = Math.max(0, subtotalAmount - discount);

  const handleApplyReferral = async () => {
    if (!referralInput.trim()) return;
    setIsApplyingReferral(true);
    setReferralMessage(null);

    try {
      const response = await fetch("/api/admin/referrals/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: referralInput.trim(), subtotal: subtotalAmount }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setReferralMessage({ type: "error", text: data.message || "Kode tidak valid" });
        setReferralData(null);
      } else {
        setReferralMessage({
          type: "success",
          text: `Diskon ${data.data.discountPercentage}% berhasil diterapkan`,
        });
        setReferralData(data.data);
      }
    } catch {
      setReferralMessage({ type: "error", text: "Terjadi kesalahan sistem" });
      setReferralData(null);
    } finally {
      setIsApplyingReferral(false);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    const methodMap: Record<string, "CASH" | "QRIS" | "TRANSFER" | "EWALLET"> = {
      Tunai: "CASH",
      QRIS: "QRIS",
      "E-Wallet": "EWALLET",
      Transfer: "TRANSFER",
    };
    const inv = `INV-${Date.now().toString().slice(-8)}`;

    try {
      const res = await saveTransaction({
        invoiceNumber: inv,
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
        paymentMethod: methodMap[method] ?? "CASH",
        referralCodeId: referralData?.id ?? null,
        total: finalTotal,
        discount,
        tax: 0,
        customerName,
        customerPhone,
        bookingDate,
        bookingTime,
        paymentRef,
      });

      if (res.success) {
        setInvoiceNumber(inv);
        setIsSuccess(true);
      } else {
        showToast("Gagal menyimpan transaksi: " + res.error, "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan sistem saat memproses pembayaran.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    clearCart();
    setIsSuccess(false);
    setReferralData(null);
    setReferralInput("");
    setReferralMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!isSuccess ? onClose : undefined}
          className="absolute inset-0 bg-[#1A110B]/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="w-full max-w-md bg-white rounded-[32px] shadow-2xl relative z-10 overflow-y-auto max-h-[90vh] border border-white/20 custom-scrollbar"
        >
          <AnimatePresence mode="wait">
            {/* ── SUCCESS STATE ── */}
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 md:p-8 text-center space-y-4"
              >
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-white shadow-xl flex items-center justify-center">
                      <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#C88A58] rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles size={12} className="text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Title */}
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-playfair)" }}>
                    {method === "QRIS" ? "Scan QRIS" : "Pembayaran Berhasil!"}
                  </h2>
                  <p className="text-[10px] font-medium text-gray-400">
                    {method === "QRIS"
                      ? "Silakan scan QR code berikut menggunakan aplikasi E-Wallet atau M-Banking Anda."
                      : "Transaksi berhasil dicatat ke sistem Sneapici Studio."}
                  </p>
                </div>

                {/* QRIS Code Display */}
                {method === "QRIS" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mx-auto w-36 h-36 bg-white p-2.5 rounded-2xl shadow-lg shadow-blue-900/5 border border-blue-50 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse" />
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QRIS_PAYMENT_${invoiceNumber}_AMOUNT_${finalTotal}`}
                      alt="QRIS Code"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </motion.div>
                )}

                {/* Summary Card */}
                <div className="bg-[#FAFAF8] rounded-2xl border border-[#3B2211]/5 p-4 space-y-2.5 text-left">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 font-medium">No. Invoice</span>
                    <span className="font-black text-[#3B2211] font-mono">{invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 font-medium">Pelanggan</span>
                    <span className="font-bold text-[#3B2211]">{customerName || "Pelanggan Umum"}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-gray-400 font-medium">Metode Bayar</span>
                    <span className="font-bold text-[#3B2211]">{method}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400 font-medium">Diskon</span>
                      <span className="font-bold text-emerald-600">- Rp {discount.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2.5 border-t border-[#3B2211]/5 mt-1">
                    <span className="text-[11px] font-black text-[#3B2211] uppercase tracking-widest">Total Akhir</span>
                    <span className="text-lg font-black text-[#3B2211]">Rp {finalTotal.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Receipt
                    customerName={customerName}
                    customerPhone={customerPhone}
                    items={items}
                    discount={discount}
                    total={finalTotal}
                    paymentMethod={method}
                  />
                  <button
                    onClick={handleDone}
                    className="flex-1 py-3.5 bg-[#3B2211] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] shadow-lg shadow-[#3B2211]/20 hover:bg-[#C88A58] transition-all"
                  >
                    Selesai
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ── PAYMENT SELECTION STATE ── */
              <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Header */}
                <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-[#3B2211]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3B2211] flex items-center justify-center shadow-lg shadow-[#3B2211]/20">
                      <ReceiptText size={18} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-[#3B2211]">Konfirmasi Bayar</h2>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                        {items.length} item · Sneapici Studio
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-xl bg-[#FAFAF8] border border-[#3B2211]/5 flex items-center justify-center text-[#3B2211]/30 hover:text-[#3B2211] hover:bg-[#F0EDE9] transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">

                  {/* Informasi Sesi */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.25em] ml-1">
                      Informasi Sesi
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
                        <input
                          type="text"
                          placeholder="Nama pelanggan"
                          value={customerName}
                          onChange={(e) => setCustomerInfo({ customerName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
                        <input
                          type="text"
                          placeholder="No. HP"
                          value={customerPhone}
                          onChange={(e) => setCustomerInfo({ customerPhone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setCustomerInfo({ bookingDate: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
                        <input
                          type="time"
                          value={bookingTime}
                          onChange={(e) => setCustomerInfo({ bookingTime: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Total Banner */}
                  <div className="bg-[#1A110B] rounded-2xl p-5 text-white relative overflow-hidden shadow-xl shadow-[#1A110B]/30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C88A58]/10 blur-[40px] rounded-full -mr-10 -mt-10" />
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Total Tagihan</p>
                    <p className="text-3xl font-black tracking-tight">
                      Rp {finalTotal.toLocaleString("id-ID")}
                    </p>
                    {referralData && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Subtotal</p>
                          <p className="text-white/60 line-through">Rp {subtotalAmount.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p className="font-bold uppercase tracking-widest text-[10px] text-emerald-400">Diskon</p>
                          <p className="font-bold text-emerald-400">- Rp {referralData.discountAmount.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Referral Section */}
                  <div className="space-y-3">
                    <p className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.25em] ml-1 flex items-center gap-2">
                      <Tag size={12} /> Kode Referral
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={referralInput}
                        onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                        placeholder="Masukkan kode..."
                        className="flex-1 px-4 py-3 bg-white border border-[#3B2211]/10 rounded-xl text-sm font-bold focus:outline-none focus:border-[#3B2211]/30 transition-all uppercase"
                        disabled={!!referralData || isApplyingReferral}
                      />
                      {referralData ? (
                        <button
                          onClick={() => {
                            setReferralData(null);
                            setReferralInput("");
                            setReferralMessage(null);
                          }}
                          className="px-4 py-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 transition-all"
                        >
                          Batal
                        </button>
                      ) : (
                        <button
                          onClick={handleApplyReferral}
                          disabled={isApplyingReferral || !referralInput.trim()}
                          className="px-5 py-3 bg-[#3B2211] text-white rounded-xl text-xs font-bold hover:bg-[#C88A58] disabled:opacity-50 transition-all flex items-center"
                        >
                          {isApplyingReferral ? <Loader2 size={16} className="animate-spin" /> : "Terapkan"}
                        </button>
                      )}
                    </div>
                    {referralMessage && (
                      <div className={`flex items-center gap-2 text-[10px] font-bold ml-1 ${referralMessage.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                        {referralMessage.type === "success"
                          ? <CheckCircle2 size={12} />
                          : <AlertCircle size={12} />}
                        {referralMessage.text}
                      </div>
                    )}
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.25em] ml-1">
                      Pilih Metode Pembayaran
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {paymentMethods.map((pm) => (
                        <button
                          key={pm.id}
                          onClick={() => setMethod(pm.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                            method === pm.id
                              ? "bg-[#3B2211]/[0.03] border-[#3B2211]/20 shadow-sm"
                              : "bg-white border-[#3B2211]/5 hover:border-[#3B2211]/10 hover:bg-[#FAFAF8]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                                method === pm.id ? "bg-[#3B2211] shadow-md shadow-[#3B2211]/20" : pm.bg
                              }`}
                            >
                              <pm.icon
                                size={16}
                                className={method === pm.id ? "text-white" : pm.text}
                              />
                            </div>
                            <div className="text-left">
                              <p className={`text-[11px] font-bold ${method === pm.id ? "text-[#3B2211]" : "text-[#3B2211]/70"}`}>
                                {pm.label}
                              </p>
                              <p className="text-[8px] font-medium text-gray-400 line-clamp-1">{pm.desc}</p>
                            </div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                              method === pm.id ? "border-[#3B2211] bg-[#3B2211]" : "border-gray-200"
                            }`}
                          >
                            {method === pm.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-1.5 h-1.5 bg-white rounded-full"
                              />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {(method === "E-Wallet" || method === "Transfer") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 overflow-hidden"
                        >
                          <p className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.25em] ml-1 mb-2">
                            {method === "E-Wallet" ? "Informasi E-Wallet" : "Informasi Rekening"}
                          </p>
                          <div className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-xl flex flex-col gap-2">
                            {method === "E-Wallet" ? (
                              <>
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-[#3B2211]">GoPay / OVO / Dana</span>
                                  <span className="text-[11px] font-black text-[#3B2211] font-mono tracking-wide">0812-3456-7890</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-[#3B2211]">ShopeePay</span>
                                  <span className="text-[11px] font-black text-[#3B2211] font-mono tracking-wide">0812-3456-7890</span>
                                </div>
                                <div className="pt-2 mt-1 border-t border-[#3B2211]/5 flex justify-between items-center">
                                  <span className="text-[9px] font-bold text-gray-400">Atas Nama</span>
                                  <span className="text-[9px] font-black text-[#3B2211]">SNEAPICI STUDIO</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-[#3B2211]">BCA</span>
                                  <span className="text-[11px] font-black text-[#3B2211] font-mono tracking-wide">1234-5678-90</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[11px] font-bold text-[#3B2211]">Mandiri</span>
                                  <span className="text-[11px] font-black text-[#3B2211] font-mono tracking-wide">0987-6543-21</span>
                                </div>
                                <div className="pt-2 mt-1 border-t border-[#3B2211]/5 flex justify-between items-center">
                                  <span className="text-[9px] font-bold text-gray-400">Atas Nama</span>
                                  <span className="text-[9px] font-black text-[#3B2211]">SNEAPICI STUDIO</span>
                                </div>
                              </>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="relative w-full py-4 bg-[#3B2211] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-[#3B2211]/20 flex items-center justify-center hover:bg-[#C88A58] hover:shadow-[#C88A58]/20 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-3">
                        <Loader2 size={16} className="animate-spin" />
                        Memproses...
                      </span>
                    ) : (
                      <>
                        <span className="text-center">Konfirmasi &amp; Bayar</span>
                        <ChevronRight size={16} className="absolute right-6" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {/* ── CUSTOM TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] pointer-events-none flex items-center justify-center"
          >
            <div className="bg-[#1A110B] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
              {toast.type === "success" && <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />}
              {toast.type === "error" && <XCircle className="text-red-400 shrink-0" size={18} />}
              {toast.type === "info" && <AlertCircle className="text-amber-400 shrink-0" size={18} />}
              <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}

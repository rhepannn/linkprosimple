"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  CreditCard,
  User,
  Phone,
  ShoppingCart,
  Calendar,
  Clock,
  ChevronRight
} from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import CheckoutModal from "./CheckoutModal";

export default function Cart() {
  const {
    items,
    removeItem,
    updateQty,
    clearCart,
    customerName,
    customerPhone,
    bookingDate,
    bookingTime,
    setCustomerInfo,
  } = useCartStore();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const finalTotal = subtotal; // Referral diurus di CheckoutModal

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── Header Keranjang ── */}
      <div className="px-6 py-5 border-b border-[#3B2211]/5 flex items-center justify-between bg-[#FAFAF8] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#3B2211] flex items-center justify-center text-white shadow-lg shadow-[#3B2211]/20">
            <ShoppingCart size={17} />
          </div>
          <div>
            <h2 className="text-sm font-black text-[#3B2211] tracking-tight">Keranjang Pesanan</h2>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{items.length} item terpilih</p>
          </div>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            title="Kosongkan Keranjang"
            className="w-8 h-8 rounded-lg bg-red-50 text-red-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* ── Daftar Item ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-3">
        {items.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3 p-3.5 bg-[#FAFAF8] rounded-xl border border-[#3B2211]/5 group hover:border-[#C88A58]/20 hover:bg-[#FDF9F6] transition-all"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-lg bg-[#3B2211]/5 flex items-center justify-center border border-[#3B2211]/8 shrink-0">
                  <span className="text-xs font-black text-[#3B2211]">{item.name.slice(0, 2).toUpperCase()}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-bold text-[#3B2211] truncate">{item.name}</h4>
                  <p className="text-[10px] font-black text-[#C88A58]">Rp {item.price.toLocaleString("id-ID")}</p>
                </div>

                {/* Qty Controls */}
                <div className="flex items-center bg-white rounded-lg border border-[#3B2211]/8 shadow-sm p-0.5">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#3B2211]/40 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-md transition-all"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-8 text-center text-[11px] font-black text-[#3B2211]">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-7 h-7 flex items-center justify-center text-[#3B2211]/40 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-md transition-all"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 opacity-20">
            <ShoppingCart size={44} strokeWidth={1.5} />
            <div>
              <p className="text-sm font-black text-[#3B2211] uppercase tracking-widest">Keranjang Kosong</p>
              <p className="text-[10px] font-medium text-gray-400 mt-1">Pilih produk dari daftar</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Informasi Pelanggan ── */}
      <div className="px-5 py-4 border-t border-[#3B2211]/5 bg-[#FAFAF8] space-y-3 shrink-0">
        <p className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.25em] ml-0.5">Informasi Sesi</p>

        {/* Nama & Telepon */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
            <input
              type="text"
              placeholder="Nama pelanggan"
              value={customerName}
              onChange={(e) => setCustomerInfo({ customerName: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 focus:border-[#C88A58]/30 transition-all"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
            <input
              type="text"
              placeholder="No. HP"
              value={customerPhone}
              onChange={(e) => setCustomerInfo({ customerPhone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 focus:border-[#C88A58]/30 transition-all"
            />
          </div>
        </div>

        {/* Tanggal & Jam */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setCustomerInfo({ bookingDate: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 focus:border-[#C88A58]/30 transition-all"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3B2211]/25" size={13} />
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setCustomerInfo({ bookingTime: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#3B2211]/8 rounded-xl text-[11px] font-medium text-[#3B2211] focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 focus:border-[#C88A58]/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Ringkasan & Bayar ── */}
      <div className="p-5 border-t border-[#3B2211]/5 bg-white shrink-0">
        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-[11px] text-gray-400">
            <span className="font-medium">Subtotal</span>
            <span className="font-bold text-[#3B2211]">Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-[#3B2211]/5 mt-1">
            <span className="text-[11px] font-black text-[#3B2211] uppercase tracking-widest">Total Akhir</span>
            <span className="text-xl font-black text-[#3B2211]">Rp {finalTotal.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          disabled={items.length === 0}
          className="relative w-full py-4 bg-[#3B2211] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] shadow-xl shadow-[#3B2211]/20 flex items-center justify-center hover:bg-[#C88A58] hover:shadow-[#C88A58]/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:hover:bg-[#3B2211] disabled:scale-100 select-none"
        >
          <CreditCard size={18} className="absolute left-6" />
          <span className="text-center">Proses Pembayaran</span>
          {items.length > 0 && <ChevronRight size={16} className="absolute right-6" />}
        </button>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

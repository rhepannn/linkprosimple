"use client";

import React from "react";
import ProductGrid from "@/components/pos/ProductGrid";
import Cart from "@/components/pos/Cart";
import { ShoppingCart, ArrowLeft, Menu, Zap } from "lucide-react";
import Link from "next/link";

export default function CashierPage() {
  return (
    <div className="flex flex-col h-screen bg-[#FAFAF8] overflow-hidden">
      {/* ── Header ── */}
      <header className="h-16 bg-white/60 backdrop-blur-xl border-b border-[#3B2211]/5 flex items-center justify-between px-6 shrink-0 z-30 shadow-sm shadow-[#3B2211]/2 sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-sidebar"))}
            className="lg:hidden p-2 -ml-2 text-[#3B2211]/50 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-xl transition-all"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3B2211] flex items-center justify-center shadow-lg shadow-[#3B2211]/20">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black text-[#3B2211] tracking-tight leading-tight">Terminal Kasir</h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Sneapici Studio POS</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-[11px] font-black text-[#3B2211] uppercase tracking-wide">
              {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(52,211,153,0.5)] animate-pulse" />
              <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Sistem Aktif</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Kiri: Grid Produk */}
        <main className="flex-1 overflow-hidden relative border-r border-[#3B2211]/5">
          <div className="h-full overflow-y-auto custom-scrollbar p-6">
            <ProductGrid onSelect={() => {}} />
          </div>
        </main>

        {/* Kanan: Keranjang */}
        <aside className="w-[400px] bg-white hidden lg:flex flex-col shrink-0 shadow-xl shadow-black/5">
          <Cart />
        </aside>
      </div>

      {/* ── Tombol Keranjang Mobile ── */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button className="w-16 h-16 bg-[#3B2211] text-white rounded-full shadow-2xl shadow-[#3B2211]/40 flex items-center justify-center relative hover:scale-105 active:scale-95 transition-all">
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#C88A58] rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black">
            0
          </span>
        </button>
      </div>
    </div>
  );
}

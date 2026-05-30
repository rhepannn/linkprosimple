"use client";

import React from "react";
import ProductManagement from "@/components/pos/ProductManagement";
import { Package, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProductsPage() {
  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-[0.4em]">Inventory Management</p>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-white shadow-xl shadow-[#1e293b]/20">
               <Package size={24} />
             </div>
             <h1 className="text-4xl font-black text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>Katalog Program Pelatihan</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium max-w-md">Kelola seluruh program kelas pelatihan, paket layanan kemitraan, dan konsultasi Link Productive.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <ProductManagement hideHeader={true} />
      </div>
    </div>
  );
}


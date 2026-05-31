"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar as CalendarIcon, 
  ArrowLeft,
  Filter,
  RefreshCw,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  FilterX,
  Zap,
  Target,
  ShieldCheck,
  BarChart3,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { getTransactionReports } from "@/app/actions/reports";
import * as XLSX from "xlsx";

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    type: "ALL" as "POS" | "BOOKING" | "ALL"
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getTransactionReports(filters);
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const exportToExcel = () => {
    if (!data?.transactions) return;
    
    const exportData = data.transactions.map((t: any) => ({
      "Invoice": t.invoiceNumber,
      "Tanggal": new Date(t.createdAt).toLocaleString("id-ID"),
      "Pelanggan": t.customer,
      "WhatsApp": t.phone,
      "Tipe": t.type,
      "Layanan": t.details,
      "Metode Bayar": t.paymentMethod,
      "Total": t.total,
      "Status": t.status,
      "Referral": t.referral
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Transaksi");
    XLSX.writeFile(wb, `Sneapici_Report_${filters.startDate}_to_${filters.endDate}.xlsx`);
  };

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* ── Header Section ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#3B2211]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.4em]">Financial Audit</p>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-[#3B2211] flex items-center justify-center text-white shadow-xl shadow-[#3B2211]/20">
               <BarChart3 size={24} />
             </div>
             <h1 className="text-4xl font-black text-[#3B2211] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Wawasan Keuangan</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium max-w-md">Metrik presisi untuk analisis pendapatan dan performa studio strategis.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-3 px-8 py-4 bg-[#3B2211] !text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download size={16} />
            Ekspor Laporan
          </button>
        </div>
      </div>

      {/* ── Metric Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: `Rp ${data?.summary?.totalRevenue.toLocaleString("id-ID") || 0}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Volume Transaksi", value: data?.summary?.totalCount || 0, icon: ShoppingBag, color: "text-[#3B2211]", bg: "bg-gray-100" },
          { label: "POS Revenue", value: data?.summary?.posCount || 0, icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Booking Revenue", value: data?.summary?.bookingCount || 0, icon: CalendarDays, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-7 bg-white rounded-2xl border border-white shadow-sm flex flex-col justify-between group hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
          >
             <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-[#3B2211] tracking-tighter">{stat.value}</span>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="bg-white p-8 rounded-2xl border border-white shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dari Tanggal</label>
          <input 
            type="date" 
            value={filters.startDate}
            onChange={e => setFilters({...filters, startDate: e.target.value})}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2211]/5"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sampai Tanggal</label>
          <input 
            type="date" 
            value={filters.endDate}
            onChange={e => setFilters({...filters, endDate: e.target.value})}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2211]/5"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tipe Transaksi</label>
          <select 
            value={filters.type}
            onChange={e => setFilters({...filters, type: e.target.value as any})}
            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2211]/5 appearance-none cursor-pointer"
          >
            <option value="ALL">Semua Transaksi</option>
            <option value="POS">Penjualan POS</option>
            <option value="BOOKING">Booking Online</option>
          </select>
        </div>
      </div>

      {/* ── Table Ledger ── */}
      <div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-[#3B2211]/5 flex items-center justify-center text-[#3B2211]">
               <FileText size={16} />
             </div>
             <h3 className="text-sm font-black text-[#3B2211] uppercase tracking-widest">Buku Besar Transaksi</h3>
           </div>
           <button 
             onClick={fetchData}
             className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400"
           >
             <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8F6F4]/50 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-5 font-black">ID Transaksi</th>
                <th className="px-8 py-5 font-black">Pelanggan</th>
                <th className="px-8 py-5 font-black">Layanan</th>
                <th className="px-8 py-5 text-right font-black">Total</th>
                <th className="px-8 py-5 font-black text-center">Status</th>
                <th className="px-8 py-5 text-right font-black">Metode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F6F4] text-sm">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-8 py-6"><div className="h-10 bg-[#F8F6F4] rounded-lg w-full" /></td>
                    </tr>
                  ))
                ) : data?.transactions?.map((t: any, idx: number) => (
                  <motion.tr 
                    key={t.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-[#F8F6F4]/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <p className="font-black text-[#3B2211] tracking-widest">#{t.invoiceNumber}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(t.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-8 py-6 font-bold text-[#3B2211]">{t.customer}</td>
                    <td className="px-8 py-6">
                       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${t.type === "BOOKING" ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"}`}>
                         {t.type}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-[#3B2211]">
                       Rp {t.total.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${t.status === "SUCCESS" || t.status === "COMPLETED" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-amber-50 border-amber-100 text-amber-600"}`}>
                           <div className={`w-1 h-1 rounded-full ${t.status === "SUCCESS" || t.status === "COMPLETED" ? "bg-emerald-600" : "bg-amber-600"}`} />
                           {t.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       {t.paymentMethod}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

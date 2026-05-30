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
  ChevronDown,
  Users,
  ChevronUp,
  Phone,
  Package,
  Clock,
  Wallet,
  Check,
  XCircle,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { getTransactionReports } from "@/app/actions/reports";
import { getBookings, updateBookingStatus } from "@/app/actions/bookings";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface CustomerStats {
  name: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
}

interface PendingBooking {
  id: string;
  invoice_no: string;
  customer_name: string;
  customer_phone: string;
  package_name: string;
  session_date: string;
  session_time: string;
  final_price: number;
  payment_method: string;
  status: string;
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<"finance" | "customers">("finance");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  
  // Finance specific state
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    type: "ALL" as "POS" | "BOOKING" | "ALL"
  });

  // Customer specific state
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<CustomerStats[]>([]);
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch reports
      const res = await getTransactionReports(filters);
      if (res.success) {
        setData(res.data);
        
        // Populate customer list from the reports transactions data
        const combinedTransactions = res.data?.transactions || [];
        const normalizePhone = (phone: string) => {
          if (!phone || phone === "-") return null;
          const digits = phone.replace(/\D/g, "");
          if (digits.startsWith("62")) return "0" + digits.slice(2);
          if (digits.startsWith("0")) return digits;
          return "0" + digits;
        };

        const customerMap = new Map();
        combinedTransactions.forEach((t: any) => {
          const normalizedPhone = normalizePhone(t.phone);
          const key = normalizedPhone || t.customer;
          if (!customerMap.has(key)) {
            customerMap.set(key, {
              name: t.customer,
              phone: normalizedPhone || t.phone,
              totalBookings: 0,
              totalSpent: 0,
              lastBooking: t.createdAt
            });
          }
          const c = customerMap.get(key);
          c.totalBookings += 1;
          const isConfirmed = ["COMPLETED", "SUCCESS", "confirmed", "completed", "success"].includes(t.status.toLowerCase()) || t.status === "SUCCESS" || t.status === "COMPLETED";
          if (isConfirmed) c.totalSpent += t.total;
          if (new Date(t.createdAt) > new Date(c.lastBooking)) {
            c.lastBooking = t.createdAt;
          }
        });
        setCustomers(Array.from(customerMap.values()));
      }

      // 2. Fetch pending bookings for verification
      const bookingsRes = await getBookings();
      if (bookingsRes.data) {
        setPendingBookings(bookingsRes.data.filter((b: any) => b.status === "pending") as PendingBooking[]);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard reports data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleConfirmBooking = async (bookingId: string, newStatus: "confirmed" | "cancelled") => {
    setUpdatingStatus(bookingId + newStatus);
    const result = await updateBookingStatus(bookingId, newStatus);
    if (result.success) {
      toast.success(newStatus === "confirmed" ? "✅ Pemesanan dikonfirmasi!" : "❌ Pemesanan ditolak.");
      fetchData();
    } else {
      toast.error("Gagal memperbarui status pemesanan.");
    }
    setUpdatingStatus(null);
  };

  const exportToExcel = () => {
    if (activeTab === "finance") {
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
      XLSX.utils.book_append_sheet(wb, ws, "Laporan Keuangan");
      XLSX.writeFile(wb, `LinkProductive_Finance_Report_${filters.startDate}_to_${filters.endDate}.xlsx`);
    } else {
      const exportData = customers.map((c) => ({
        "Nama Pelanggan": c.name,
        "WhatsApp/HP": c.phone,
        "Jumlah Booking": c.totalBookings,
        "Total Pengeluaran": c.totalSpent,
        "Kunjungan Terakhir": new Date(c.lastBooking).toLocaleDateString("id-ID")
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Daftar Pelanggan");
      XLSX.writeFile(wb, `LinkProductive_Customer_Directory_${new Date().toISOString().split("T")[0]}.xlsx`);
    }
  };

  const normalizePhone = (phone: string) => {
    if (!phone || phone === "-") return null;
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("62")) return "0" + digits.slice(2);
    if (digits.startsWith("0")) return digits;
    return "0" + digits;
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* ── Header Section ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-[0.4em]">Integrated Audit Console</p>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-white shadow-xl shadow-[#1e293b]/20">
               {activeTab === "finance" ? <BarChart3 size={24} /> : <Users size={24} />}
             </div>
             <h1 className="text-4xl font-black text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
               {activeTab === "finance" ? "Laporan Keuangan" : "Direktori Pelanggan"}
             </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium max-w-md">
            {activeTab === "finance" 
              ? "Metrik presisi untuk analisis pendapatan dan performa bisnis strategis." 
              : "Kelola data pelanggan aktif, analisis behavior, dan antrean konfirmasi pendaftaran."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {/* Tab Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("finance")}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === "finance" ? "bg-white text-near-black shadow-sm" : "text-gray-400 hover:text-near-black"}`}
            >
              Wawasan Keuangan
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === "customers" ? "bg-white text-near-black shadow-sm" : "text-gray-400 hover:text-near-black"}`}
            >
              Pelanggan & Booking
              {pendingBookings.length > 0 && (
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              )}
            </button>
          </div>

          <button 
            onClick={exportToExcel}
            className="flex items-center gap-3 px-8 py-4 bg-[#1e293b] !text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[#1e293b]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download size={16} />
            Ekspor {activeTab === "finance" ? "Laporan" : "Pelanggan"}
          </button>
        </div>
      </div>

      {/* ── Metric Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: `Rp ${data?.summary?.totalRevenue.toLocaleString("id-ID") || 0}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Transaksi", value: data?.summary?.totalCount || 0, icon: ShoppingBag, color: "text-[#1e293b]", bg: "bg-gray-100" },
          { label: "Pelanggan Unik", value: customers.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pendaftaran Menunggu", value: pendingBookings.length || 0, icon: CalendarDays, color: pendingBookings.length > 0 ? "text-amber-600 animate-pulse" : "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-7 bg-white rounded-2xl border border-white shadow-sm flex flex-col justify-between group hover:shadow-xl hover:shadow-[#1e293b]/5 transition-all duration-500"
          >
             <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black text-[#1e293b] tracking-tighter">{stat.value}</span>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {activeTab === "finance" ? (
        <>
          {/* ── Finance Filters ── */}
          <div className="bg-white p-8 rounded-2xl border border-white shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Dari Tanggal</label>
              <input 
                type="date" 
                value={filters.startDate}
                onChange={e => setFilters({...filters, startDate: e.target.value})}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sampai Tanggal</label>
              <input 
                type="date" 
                value={filters.endDate}
                onChange={e => setFilters({...filters, endDate: e.target.value})}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tipe Transaksi</label>
              <select 
                value={filters.type}
                onChange={e => setFilters({...filters, type: e.target.value as any})}
                className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e293b]/5 appearance-none cursor-pointer"
              >
                <option value="ALL">Semua Transaksi</option>
                <option value="POS">Penjualan POS</option>
                <option value="BOOKING">Booking Online</option>
              </select>
            </div>
          </div>

          {/* ── Finance Table Ledger ── */}
          <div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-[#1e293b]/5 flex items-center justify-center text-[#1e293b]">
                   <FileText size={16} />
                 </div>
                 <h3 className="text-sm font-black text-[#1e293b] uppercase tracking-widest">Buku Besar Transaksi</h3>
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
                  <tr className="bg-[#f0f7ff]/50 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                    <th className="px-8 py-5 font-black">ID Transaksi</th>
                    <th className="px-8 py-5 font-black">Pelanggan</th>
                    <th className="px-8 py-5 font-black">Layanan</th>
                    <th className="px-8 py-5 text-right font-black">Total</th>
                    <th className="px-8 py-5 font-black text-center">Status</th>
                    <th className="px-8 py-5 text-right font-black">Metode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f7ff] text-sm">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={6} className="px-8 py-6"><div className="h-10 bg-[#f0f7ff] rounded-lg w-full" /></td>
                        </tr>
                      ))
                    ) : data?.transactions?.map((t: any) => (
                      <motion.tr 
                        key={t.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group hover:bg-[#f0f7ff]/30 transition-colors"
                      >
                        <td className="px-8 py-6">
                          <p className="font-black text-[#1e293b] tracking-widest">#{t.invoiceNumber}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(t.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="px-8 py-6 font-bold text-[#1e293b]">{t.customer}</td>
                        <td className="px-8 py-6">
                           <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${t.type === "BOOKING" ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"}`}>
                             {t.type}
                           </span>
                           <span className="text-xs text-gray-500 font-semibold ml-2">{t.details}</span>
                        </td>
                        <td className="px-8 py-6 text-right font-black text-[#1e293b]">
                           Rp {t.total.toLocaleString()}
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex justify-center">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${t.status === "SUCCESS" || t.status === "COMPLETED" || t.status === "CONFIRMED" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-amber-50 border-amber-100 text-amber-600"}`}>
                               <div className={`w-1 h-1 rounded-full ${t.status === "SUCCESS" || t.status === "COMPLETED" || t.status === "CONFIRMED" ? "bg-emerald-600" : "bg-amber-600"}`} />
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
        </>
      ) : (
        <>
          {/* ── Customers Search & Tools ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full md:w-[400px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari nama atau nomor WhatsApp..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-near-black/5 shadow-sm transition-all"
              />
            </div>
            <button 
              onClick={fetchData}
              className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-400 hover:text-[#1e293b] active:scale-95 transition-all shadow-sm"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* ── Booking Approval Queue Dashboard (Always on top under Customers Tab) ── */}
          {pendingBookings.length > 0 && (
            <div className="bg-amber-50/20 border border-amber-200/50 rounded-3xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-amber-200/30 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center animate-pulse">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-amber-800 uppercase tracking-wider">Antrean Konfirmasi Kelas</h3>
                  <p className="text-[10px] text-amber-700/60 font-semibold uppercase tracking-widest mt-0.5">{pendingBookings.length} Pendaftaran Menunggu Verifikasi</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    layout
                    className="bg-white rounded-2xl p-5 border border-amber-200/30 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-50 rounded-xl">
                        <Package size={20} className="text-amber-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[#1e293b] truncate">{booking.package_name}</p>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">#{booking.invoice_no}</p>
                        
                        <div className="mt-3 space-y-1.5 text-xs text-gray-500 font-semibold">
                          <p className="flex items-center gap-1.5">
                            <Users size={12} className="text-amber-500" />
                            {booking.customer_name} ({booking.customer_phone})
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Clock size={12} className="text-amber-500" />
                            {new Date(booking.session_date).toLocaleDateString("id-ID")} · {booking.session_time}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Wallet size={12} className="text-amber-500" />
                            Bayar: <span className="font-bold text-amber-700">{booking.payment_method.toUpperCase()}</span> (Rp {booking.final_price.toLocaleString("id-ID")})
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleConfirmBooking(booking.id, "confirmed")}
                        disabled={updatingStatus !== null}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {updatingStatus === booking.id + "confirmed" ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                        Konfirmasi
                      </button>
                      <button
                        onClick={() => handleConfirmBooking(booking.id, "cancelled")}
                        disabled={updatingStatus !== null}
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {updatingStatus === booking.id + "cancelled" ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
                        Tolak
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Customers Directory Table Ledger ── */}
          <div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#f0f7ff]/50 text-xs text-gray-500 uppercase tracking-[0.15em]">
                    <th className="px-8 py-5 font-black">Pelanggan</th>
                    <th className="px-8 py-5 font-black">Frekuensi</th>
                    <th className="px-8 py-5 font-black">Total Transaksi</th>
                    <th className="px-8 py-5 font-black">Terakhir Sesi</th>
                    <th className="px-8 py-5 text-right font-black">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f7ff] text-sm">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={5} className="px-8 py-6"><div className="h-10 bg-[#f0f7ff] rounded-lg w-full" /></td>
                        </tr>
                      ))
                    ) : filteredCustomers.map((c, idx) => {
                      const normalizedCPhone = normalizePhone(c.phone);
                      const customerPending = pendingBookings.filter(b => {
                        const normalizedBPhone = normalizePhone(b.customer_phone);
                        return normalizedBPhone && normalizedCPhone && normalizedBPhone === normalizedCPhone;
                      });
                      const isExpanded = expandedCustomer === c.phone;
                      const hasPending = customerPending.length > 0;

                      return (
                        <React.Fragment key={c.phone || idx}>
                          <motion.tr
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`group transition-colors ${hasPending ? "bg-amber-50/40 hover:bg-amber-50/70" : "hover:bg-[#f0f7ff]/30"}`}
                          >
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs relative ${hasPending ? "bg-amber-100 text-amber-800" : "bg-[#1e293b]/5 text-[#1e293b]"}`}>
                                  {c.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-[#1e293b]">{c.name}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-xs text-gray-500 font-semibold">{c.phone}</p>
                                    {c.phone && c.phone !== "-" && (
                                      <a
                                        href={`https://wa.me/${c.phone.replace(/^0/, "62").replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`WhatsApp ${c.name}`}
                                        className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-md transition-all duration-200"
                                        onClick={e => e.stopPropagation()}
                                      >
                                        <Phone size={10} />
                                        <span className="text-[9px] font-black uppercase tracking-wide">WA</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-md">
                                  {c.totalBookings} Transaksi
                                </span>
                                {hasPending && (
                                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 bg-amber-100 text-amber-700 rounded-md animate-pulse">
                                    ⏳ {customerPending.length} Pending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-8 py-6 font-black text-[#1e293b] text-base">
                              Rp {c.totalSpent.toLocaleString()}
                            </td>
                            <td className="px-8 py-6 text-gray-600 text-sm font-semibold">
                              {new Date(c.lastBooking).toLocaleDateString("id-ID")}
                            </td>
                            <td className="px-8 py-6 text-right">
                              {hasPending ? (
                                <button
                                  onClick={() => setExpandedCustomer(isExpanded ? null : c.phone)}
                                  className={`flex items-center gap-1.5 ml-auto px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isExpanded
                                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                                      : "bg-amber-100 text-amber-700 hover:bg-amber-500 hover:text-white"
                                    }`}
                                >
                                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                  Konfirmasi ({customerPending.length})
                                </button>
                              ) : (
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Selesai</span>
                              )}
                            </td>
                          </motion.tr>

                          {/* Expanded Pending Bookings Detail */}
                          <AnimatePresence>
                            {isExpanded && hasPending && (
                              <motion.tr
                                key={`expand-${c.phone}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <td colSpan={5} className="px-8 pb-6 pt-0 bg-amber-50/20">
                                  <div className="border border-amber-200/40 rounded-2xl overflow-hidden bg-white shadow-sm divide-y divide-amber-50">
                                    {customerPending.map((booking) => (
                                      <div
                                        key={booking.id}
                                        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                                      >
                                        <div className="flex items-start gap-4">
                                          <div className="p-2 bg-amber-50 rounded-xl">
                                            <Package size={14} className="text-amber-700" />
                                          </div>
                                          <div>
                                            <p className="text-xs font-black text-[#1e293b]">{booking.package_name}</p>
                                            <p className="text-[10px] text-gray-400">#{booking.invoice_no} · {booking.session_time}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <p className="text-xs font-black text-[#1e293b]">Rp {booking.final_price.toLocaleString("id-ID")}</p>
                                          <button
                                            onClick={() => handleConfirmBooking(booking.id, "confirmed")}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                                          >
                                            Setuju
                                          </button>
                                          <button
                                            onClick={() => handleConfirmBooking(booking.id, "cancelled")}
                                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all"
                                          >
                                            Tolak
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                        </React.Fragment>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

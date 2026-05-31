"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Search,
  Calendar,
  Download,
  Filter,
  DollarSign,
  Wallet,
  ArrowRight,
  UserPlus,
  Star,
  Award,
  Crown,
  History,
  Phone,
  Target,
  AlertCircle,
  Zap,
  RefreshCw,
  ChevronDown,
  ShieldCheck,
  Command,
  Activity,
  Layers,
  Check,
  XCircle,
  Loader2,
  Clock,
  Package,
  ChevronUp,
} from "lucide-react";
import { getTransactionReports } from "@/app/actions/reports";
import { getBookings, updateBookingStatus } from "@/app/actions/bookings";
import { toast } from "sonner";

// Custom script loader for SheetJS
const loadSheetJS = () => {
  return new Promise((resolve) => {
    if ((window as any).XLSX) return resolve((window as any).XLSX);
    const script = document.createElement("script");
    script.src = "https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js";
    script.onload = () => resolve((window as any).XLSX);
    document.head.appendChild(script);
  });
};

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

interface Transaction {
  id: string;
  date: string;
  customer: string;
  phone: string;
  service: string;
  method: string;
  referral: string;
  discount: number;
  total: number;
  status: string;
  type: string;
}

export default function CustomersAndRevenue() {
  const [customers, setCustomers] = useState<CustomerStats[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("month");
  const [view, setView] = useState<"customers" | "revenue">("customers");
  const [error, setError] = useState<string | null>(null);
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [dateFilter]);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      let start = "";
      if (dateFilter === "today") {
        start = new Date().toISOString().split("T")[0];
      } else if (dateFilter === "week") {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        start = d.toISOString().split("T")[0];
      } else if (dateFilter === "month") {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        start = d.toISOString().split("T")[0];
      }

      const res = await getTransactionReports({ startDate: start });
      if (!res.success) {
        setError(res.error || "Gagal mengambil data dari database");
        return;
      }

      // Fix #2: Fetch semua pending booking dari semua waktu — bukan cuma yang sessionDate >= hari ini
      // Supaya booking yang sesi-nya sudah lewat tapi belum dikonfirmasi tetap muncul di sini
      const bookingsRes = await getBookings();
      if (bookingsRes.data) {
        setPendingBookings(bookingsRes.data.filter((b: any) => b.status === "pending") as PendingBooking[]);
      }

      const combinedData = res.data?.transactions || [];

      setTransactions(combinedData.map((t: any) => ({
        id: t.invoiceNumber,
        date: t.createdAt,
        customer: t.customer,
        phone: t.phone,
        service: t.service,
        method: t.method,
        referral: t.referral,
        discount: t.discount,
        total: t.total,
        status: t.status,
        type: t.type
      })));

      // Fix #3: Normalisasi nomor HP sebelum jadi key — handles 0812 vs 812 vs +62812 vs spasi
      const normalizePhone = (phone: string) => {
        if (!phone || phone === "-") return null;
        const digits = phone.replace(/\D/g, ""); // strip non-digit
        if (digits.startsWith("62")) return "0" + digits.slice(2);
        if (digits.startsWith("0")) return digits;
        return "0" + digits;
      };

      const customerMap = new Map();
      combinedData.forEach((t: any) => {
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
        // Fix #1: totalSpent hanya dari transaksi confirmed/completed — pending tidak dihitung
        const isConfirmed = ["COMPLETED", "SUCCESS", "confirmed", "completed", "success"].includes(t.status);
        if (isConfirmed) c.totalSpent += t.total;
        if (new Date(t.createdAt) > new Date(c.lastBooking)) {
          c.lastBooking = t.createdAt;
        }
      });
      setCustomers(Array.from(customerMap.values()));
    } catch (err: any) {
      console.error(err);
      setError("Terjadi kesalahan sistem saat memproses data");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmBooking(bookingId: string, newStatus: "confirmed" | "cancelled") {
    setUpdatingStatus(bookingId + newStatus);
    const result = await updateBookingStatus(bookingId, newStatus);
    if (result.success) {
      toast.success(newStatus === "confirmed" ? "✅ Pemesanan dikonfirmasi!" : "❌ Pemesanan ditolak.");
      fetchData();
    } else {
      toast.error("Gagal memperbarui status pemesanan.");
    }
    setUpdatingStatus(null);
  }

  const exportToExcel = async () => {
    const XLSX = await loadSheetJS() as any;
    const ws = XLSX.utils.json_to_sheet(view === "customers" ? customers : transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, view === "customers" ? "Pelanggan" : "Pendapatan");
    XLSX.writeFile(wb, `Sneapici_${view === "customers" ? "Pelanggan" : "Pendapatan"}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Fix #3: Phone normalization juga dipakai saat matching pending → customer
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

  // Fix #1: Total Revenue hanya dari confirmed/completed/success
  const confirmedStatuses = ["COMPLETED", "SUCCESS", "confirmed", "completed", "success"];
  const totalRevenue = transactions
    .filter(t => confirmedStatuses.includes(t.status))
    .reduce((acc, t) => acc + t.total, 0);

  // Fix #4: Avg Ticket = revenue ÷ jumlah customer unik (bukan jumlah transaksi)
  const avgTicket = customers.length > 0 ? Math.floor(totalRevenue / customers.length) : 0;

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* ── Header Section ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#3B2211]/5 pb-10">
        <div className="space-y-2">
          <p className="text-xs font-black text-[#C88A58] uppercase tracking-[0.3em]">Analytics Engine</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3B2211] flex items-center justify-center text-white shadow-xl shadow-[#3B2211]/20">
              <Activity size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#3B2211] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Data Pelanggan</h1>
          </div>
          <p className="text-sm text-gray-500 font-medium max-w-md">Analisis metrik perilaku pelanggan dan retensi pendapatan studio.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setView("customers")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === "customers" ? "bg-white text-[#3B2211] shadow-sm" : "text-gray-400 hover:text-[#3B2211]"}`}
            >
              Pelanggan
            </button>
            <button
              onClick={() => setView("revenue")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${view === "revenue" ? "bg-white text-[#3B2211] shadow-sm" : "text-gray-400 hover:text-[#3B2211]"}`}
            >
              Pendapatan
            </button>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-3 px-8 py-4 bg-[#3B2211] !text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download size={16} />
            Ekspor
          </button>
        </div>
      </div>

      {/* ── Metric Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: `Rp ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Clients", value: customers.length, icon: Users, color: "text-[#3B2211]", bg: "bg-gray-100" },
          // Fix #4: Avg Ticket dibagi unique customers, bukan jumlah transaksi
          { label: "Avg Ticket", value: `Rp ${avgTicket.toLocaleString()}`, icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
          // Fix #6: Conversion Rate tidak bisa dihitung — tampilkan N/A daripada hardcode bohong
          { label: "Conversion Rate", value: "N/A", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" }
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
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-[#3B2211] tracking-tighter">{stat.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari Pelanggan / ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2211]/5 shadow-sm transition-all"
          />
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          {["today", "week", "month"].map((f) => (
            <button
              key={f}
              onClick={() => setDateFilter(f)}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.15em] transition-all ${dateFilter === f ? "bg-[#3B2211] !text-white shadow-sm" : "text-gray-400 hover:text-[#3B2211]"}`}
            >
              {f === "today" ? "Hari Ini" : f === "week" ? "7 Hari" : "30 Hari"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table Ledger ── */}
      <div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden flex-1">
        {error ? (
          <div className="p-20 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-sm font-black text-[#3B2211] uppercase tracking-widest">Koneksi Bermasalah</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">{error}</p>
            <button onClick={fetchData} className="px-6 py-3 bg-[#3B2211] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-[#3B2211]/20">Refresh Data</button>
          </div>
        ) : view === "customers" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8F6F4]/50 text-xs text-gray-500 uppercase tracking-[0.15em]">
                  <th className="px-8 py-5 font-black">Pelanggan</th>
                  <th className="px-8 py-5 font-black">Aktivitas</th>
                  <th className="px-8 py-5 font-black">Total Transaksi</th>
                  <th className="px-8 py-5 font-black">Terakhir Kunjungan</th>
                  <th className="px-8 py-5 text-right font-black">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F6F4] text-sm">
                <AnimatePresence mode="popLayout">
                  {filteredCustomers.map((c, idx) => {
                    // Fix #3: Pakai normalizePhone saat matching pending ke customer
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
                          className={`group transition-colors ${hasPending ? "bg-amber-50/40 hover:bg-amber-50/70" : "hover:bg-[#F8F6F4]/30"}`}
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs relative ${hasPending ? "bg-amber-100 text-amber-800" : "bg-[#3B2211]/5 text-[#3B2211]"}`}>
                                {c.name.slice(0, 2).toUpperCase()}
                                {hasPending && (
                                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[8px] font-black text-white">
                                    {customerPending.length}
                                  </span>
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-[#3B2211]">{c.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <p className="text-xs text-gray-500 font-semibold">{c.phone}</p>
                                  {c.phone && c.phone !== "-" && (
                                    <a
                                      href={`https://wa.me/${c.phone.replace(/^0/, "62").replace(/\D/g, "")}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title={`WhatsApp ${c.name}`}
                                      className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-md transition-all duration-200 group/wa"
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
                          <td className="px-8 py-6 font-black text-[#3B2211] text-base">
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
                                Konfirmasi
                              </button>
                            ) : (
                              <button className="p-2 hover:bg-[#3B2211] hover:text-white rounded-lg transition-all text-gray-300">
                                <ArrowRight size={16} />
                              </button>
                            )}
                          </td>
                        </motion.tr>

                        {/* ── Expanded Pending Bookings Panel ── */}
                        <AnimatePresence>
                          {isExpanded && hasPending && (
                            <motion.tr
                              key={`expand-${c.phone}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <td colSpan={5} className="px-8 pb-6 pt-0 bg-amber-50/40">
                                <div className="border border-amber-200/60 rounded-2xl overflow-hidden bg-white shadow-sm">
                                  {/* Panel header */}
                                  <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
                                    <AlertCircle size={15} className="text-amber-600" />
                                    <p className="text-xs font-black text-amber-700 uppercase tracking-widest">
                                      Pemesanan Menunggu Konfirmasi — {c.name}
                                    </p>
                                  </div>

                                  {/* Booking cards */}
                                  <div className="divide-y divide-amber-50">
                                    {customerPending.map((booking) => (
                                      <div
                                        key={booking.id}
                                        className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-amber-50/30 transition-colors"
                                      >
                                        {/* Booking info */}
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                          <div className="p-2.5 bg-amber-100 rounded-xl shrink-0">
                                            <Package size={16} className="text-amber-700" />
                                          </div>
                                          <div className="min-w-0">
                                            <p className="text-sm font-black text-[#3B2211] truncate">{booking.package_name}</p>
                                            <p className="text-xs font-bold text-gray-400 mt-0.5">#{booking.invoice_no}</p>
                                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                                              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                                                <Calendar size={11} className="text-amber-500" />
                                                {new Date(booking.session_date + "T00:00:00").toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                              </span>
                                              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                                                <Clock size={11} className="text-amber-500" />
                                                {booking.session_time}
                                              </span>
                                              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                                                <Wallet size={11} className="text-amber-500" />
                                                {booking.payment_method.toUpperCase()}
                                              </span>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Price + actions */}
                                        <div className="flex items-center gap-3 shrink-0">
                                          <div className="text-right hidden md:block">
                                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total</p>
                                            <p className="text-base font-black text-[#3B2211]">
                                              Rp {booking.final_price.toLocaleString("id-ID")}
                                            </p>
                                          </div>
                                          <button
                                            onClick={() => handleConfirmBooking(booking.id, "confirmed")}
                                            disabled={updatingStatus !== null}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                          >
                                            {updatingStatus === booking.id + "confirmed"
                                              ? <Loader2 size={13} className="animate-spin" />
                                              : <Check size={13} />
                                            }
                                            Konfirmasi
                                          </button>
                                          <button
                                            onClick={() => handleConfirmBooking(booking.id, "cancelled")}
                                            disabled={updatingStatus !== null}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                          >
                                            {updatingStatus === booking.id + "cancelled"
                                              ? <Loader2 size={13} className="animate-spin" />
                                              : <XCircle size={13} />
                                            }
                                            Tolak
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8F6F4]/50 text-xs text-gray-500 uppercase tracking-[0.15em]">
                  <th className="px-8 py-5 font-black">ID Transaksi</th>
                  <th className="px-8 py-5 font-black">Pelanggan</th>
                  <th className="px-8 py-5 font-black">Metode</th>
                  <th className="px-8 py-5 text-right font-black">Jumlah</th>
                  <th className="px-8 py-5 text-center font-black">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F6F4] text-sm">
                {transactions.map((t, idx) => (
                  <tr key={t.id || idx} className="group hover:bg-[#F8F6F4]/30 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-[#3B2211] tracking-widest">#{t.id}</p>
                      <p className="text-xs text-gray-500 font-semibold">{new Date(t.date).toLocaleDateString("id-ID")}</p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-bold text-[#3B2211]">{t.customer}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-gray-500 font-semibold">{t.phone}</p>
                        {t.phone && t.phone !== "-" && (
                          <a
                            href={`https://wa.me/${t.phone.replace(/^0/, "62").replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`WhatsApp ${t.customer}`}
                            className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white rounded-md transition-all duration-200"
                          >
                            <Phone size={10} />
                            <span className="text-[9px] font-black uppercase tracking-wide">WA</span>
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Wallet size={14} className="text-gray-300" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{t.method}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-[#3B2211] text-base">
                      Rp {t.total.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <div className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black uppercase tracking-widest border border-emerald-100">
                          {t.status}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
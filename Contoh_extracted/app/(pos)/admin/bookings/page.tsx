"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Search,
  ChevronRight,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Package,
  CreditCard,
  Check,
  Zap,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  X,
  Loader2,
  User,
  Hash,
  Tag,
  FileText,
  ArrowUpRight,
  RefreshCw,
  Filter,
  SlidersHorizontal,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { getBookings, updateBookingStatus, createBooking, updateBooking, deleteBooking } from "@/app/actions/bookings";
import { getProducts } from "@/app/actions/products";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Booking {
  id: string;
  invoice_no: string;
  customer_name: string;
  customer_phone: string;
  package_name: string;
  session_date: string;
  session_time: string;
  original_price: number;
  final_price: number;
  status: string;
  payment_method: string;
  referral_code?: string;
  discount_pct?: number;
  notes?: string;
  created_at: string;
}

/* ─── Status Definitions ─── */
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: any; glow: string }> = {
  "pending": {
    label: "Menunggu",
    color: "#D97706", bg: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.15)",
    icon: Clock, glow: "shadow-amber-500/10",
  },
  "confirmed": {
    label: "Dikonfirmasi",
    color: "#2563EB", bg: "rgba(59, 130, 246, 0.08)", border: "rgba(59, 130, 246, 0.15)",
    icon: Zap, glow: "shadow-blue-500/10",
  },
  "completed": {
    label: "Selesai",
    color: "#059669", bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.15)",
    icon: CheckCircle2, glow: "shadow-emerald-500/10",
  },
  "cancelled": {
    label: "Dibatalkan",
    color: "#DC2626", bg: "rgba(239, 68, 68, 0.08)", border: "rgba(239, 68, 68, 0.15)",
    icon: XCircle, glow: "shadow-red-500/10",
  },
};

function StatusBadge({ status, size = "sm" }: { status: string; size?: "sm" | "lg" }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: "#888", bg: "#F5F5F0", border: "#E0E0DA", icon: AlertCircle, glow: "" };
  const Icon = cfg.icon;
  const isLg = size === "lg";
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full transition-all ${isLg ? "px-4 py-2" : "px-3 py-1.5"}`}
      style={{ backgroundColor: cfg.bg, border: `1.5px solid ${cfg.border}` }}
    >
      <Icon size={isLg ? 14 : 11} style={{ color: cfg.color }} />
      <span className={`font-black uppercase tracking-widest ${isLg ? "text-[11px]" : "text-[9px]"}`} style={{ color: cfg.color }}>
        {cfg.label}
      </span>
    </div>
  );
}

function formatRupiah(val: number) {
  return "Rp " + val.toLocaleString("id-ID");
}

function formatSessionDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function formatSessionDateLong(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/* ─── Main Component ─── */
export default function BookingManagement() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    customer_name: "",
    customer_phone: "",
    package_name: "",
    session_date: "",
    session_time: "",
    notes: "",
    payment_method: "cash",
    original_price: 0,
    final_price: 0,
    status: "",
    discount_pct: 0,
    referral_code: ""
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    customer_name: "",
    customer_phone: "",
    package_name: "",
    session_date: "",
    session_time: "",
    notes: "",
    payment_method: "cash",
    original_price: 0,
    final_price: 0,
    status: "confirmed",
    discount_pct: 0,
    referral_code: ""
  });

  const supabase = createClient();

  useEffect(() => {
    if (selectedBooking) {
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    };
  }, [selectedBooking]);

  useEffect(() => {
    fetchBookings();
    fetchProducts();

    const channel = supabase
      .channel("booking-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => fetchBookings()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const { data, error } = await getBookings();
      if (error) throw new Error(error);
      setBookings(data || []);
    } catch (err: any) {
      console.error("Gagal mengambil data booking:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProducts() {
    try {
      const res = await getProducts();
      if (res.success && res.data) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data produk/paket:", err);
    }
  }

  async function handleUpdateStatus(id: string, newStatus: string) {
    setUpdatingStatus(true);
    try {
      const result = await updateBookingStatus(id, newStatus);
      if (!result.success) throw new Error(result.error);

      toast.success(
        newStatus === "confirmed"
          ? "✅ Pembayaran berhasil dikonfirmasi!"
          : newStatus === "completed"
          ? "✅ Sesi ditandai selesai!"
          : "❌ Booking telah dibatalkan."
      );

      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
      );
      setSelectedBooking(prev => prev?.id === id ? { ...prev, status: newStatus } : prev);
    } catch (err: any) {
      toast.error("Gagal memperbarui status: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  }

  const startEditing = (booking: Booking) => {
    setEditForm({
      customer_name: booking.customer_name,
      customer_phone: booking.customer_phone,
      package_name: booking.package_name,
      session_date: booking.session_date,
      session_time: booking.session_time,
      notes: booking.notes || "",
      payment_method: booking.payment_method,
      original_price: booking.original_price,
      final_price: booking.final_price,
      status: booking.status,
      discount_pct: booking.discount_pct || 0,
      referral_code: booking.referral_code || ""
    });
    setIsEditing(true);
  };

  const handlePackageChange = (pkgName: string, isEdit: boolean) => {
    const foundProduct = products.find(p => p.name === pkgName);
    const price = foundProduct ? foundProduct.price : 0;
    
    if (isEdit) {
      setEditForm(prev => {
        const discPct = prev.discount_pct || 0;
        const finalPrice = price * (1 - discPct / 100);
        return {
          ...prev,
          package_name: pkgName,
          original_price: price,
          final_price: finalPrice
        };
      });
    } else {
      setCreateForm(prev => {
        const discPct = prev.discount_pct || 0;
        const finalPrice = price * (1 - discPct / 100);
        return {
          ...prev,
          package_name: pkgName,
          original_price: price,
          final_price: finalPrice
        };
      });
    }
  };

  const handleDiscountChange = (pct: number, isEdit: boolean) => {
    if (isEdit) {
      setEditForm(prev => ({
        ...prev,
        discount_pct: pct,
        final_price: prev.original_price * (1 - pct / 100)
      }));
    } else {
      setCreateForm(prev => ({
        ...prev,
        discount_pct: pct,
        final_price: prev.original_price * (1 - pct / 100)
      }));
    }
  };

  async function handleSaveEdit() {
    if (!selectedBooking) return;
    setUpdatingStatus(true);
    try {
      const res = await updateBooking(selectedBooking.id, {
        customer_name: editForm.customer_name,
        customer_phone: editForm.customer_phone,
        package_name: editForm.package_name,
        session_date: editForm.session_date,
        session_time: editForm.session_time,
        notes: editForm.notes,
        payment_method: editForm.payment_method,
        original_price: Number(editForm.original_price),
        final_price: Number(editForm.final_price),
        status: editForm.status
      });

      if (!res.success || !res.data) throw new Error(res.error || "Data tidak ditemukan");

      const updatedBooking = res.data as any as Booking;

      toast.success("✅ Data booking berhasil diperbarui!");
      setIsEditing(false);
      
      setBookings(prev =>
        prev.map(b => b.id === selectedBooking.id ? updatedBooking : b)
      );
      setSelectedBooking(updatedBooking);
    } catch (err: any) {
      toast.error("Gagal memperbarui booking: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDeleteBooking(id: string) {
    if (!confirm("Apakah Anda yakin ingin menghapus booking ini? Data komisi afiliasi terkait juga akan terhapus.")) return;
    setUpdatingStatus(true);
    try {
      const res = await deleteBooking(id);
      if (!res.success) throw new Error(res.error);

      toast.success("🗑️ Booking berhasil dihapus!");
      setSelectedBooking(null);
      setIsEditing(false);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err: any) {
      toast.error("Gagal menghapus booking: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleCreateBooking() {
    if (!createForm.customer_name || !createForm.customer_phone || !createForm.package_name || !createForm.session_date || !createForm.session_time) {
      toast.error("Mohon lengkapi data wajib (Nama, No. HP, Paket, Tanggal, Jam)");
      return;
    }
    
    setUpdatingStatus(true);
    try {
      const randHex = Math.floor(100000 + Math.random() * 900000).toString();
      const invoiceNo = `SNF-M-${randHex}`;

      const selectedProd = products.find(p => p.name === createForm.package_name);
      const packageId = selectedProd ? selectedProd.id : "custom";

      const res = await createBooking({
        invoice_no: invoiceNo,
        package_id: packageId,
        package_name: createForm.package_name,
        customer_name: createForm.customer_name,
        customer_phone: createForm.customer_phone,
        session_date: createForm.session_date,
        session_time: createForm.session_time,
        notes: createForm.notes || "",
        referral_code: createForm.referral_code || null,
        discount_pct: Number(createForm.discount_pct) || 0,
        original_price: Number(createForm.original_price),
        final_price: Number(createForm.final_price),
        payment_method: createForm.payment_method,
        status: createForm.status
      });

      if (!res.success || !res.data) throw new Error(res.error || "Gagal membuat booking");

      const newBooking = res.data as any as Booking;

      toast.success(`➕ Booking ${invoiceNo} berhasil dibuat!`);
      setIsCreateModalOpen(false);
      
      setCreateForm({
        customer_name: "",
        customer_phone: "",
        package_name: "",
        session_date: "",
        session_time: "",
        notes: "",
        payment_method: "cash",
        original_price: 0,
        final_price: 0,
        status: "confirmed",
        discount_pct: 0,
        referral_code: ""
      });

      setBookings(prev => [newBooking, ...prev]);
    } catch (err: any) {
      toast.error("Gagal membuat booking: " + err.message);
    } finally {
      setUpdatingStatus(false);
    }
  }

  function buildWhatsAppUrl(booking: Booking) {
    const phone = booking.customer_phone.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Halo ${booking.customer_name}! 👋\n\nKami mengonfirmasi bahwa pembayaran untuk booking Anda telah kami terima.\n\n📋 *Detail Booking*\n• Paket: ${booking.package_name}\n• Tanggal: ${formatSessionDateLong(booking.session_date)}\n• Jam: ${booking.session_time} WIB\n• Invoice: ${booking.invoice_no}\n\nSampai jumpa di Snapp.frame Studio! 📸`
    );
    return `https://wa.me/${phone}?text=${msg}`;
  }

  const FILTER_TABS = [
    { key: "all", label: "Semua", count: bookings.length },
    { key: "pending", label: "Menunggu", count: bookings.filter(b => b.status === "pending").length },
    { key: "confirmed", label: "Dikonfirmasi", count: bookings.filter(b => b.status === "confirmed").length },
    { key: "completed", label: "Selesai", count: bookings.filter(b => b.status === "completed").length },
    { key: "cancelled", label: "Dibatalkan", count: bookings.filter(b => b.status === "cancelled").length },
  ];

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
                          b.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
                          b.package_name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = bookings.filter(b => b.status === "pending").length;

  // Revenue from confirmed + completed bookings
  const totalRevenue = bookings
    .filter(b => b.status === "confirmed" || b.status === "completed")
    .reduce((sum, b) => sum + b.final_price, 0);

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gold/10 rounded-lg">
              <CalendarDays size={20} className="text-gold" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold">Studio Reservations</p>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-black text-near-black tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Kelola <span className="text-gold italic">Booking</span>
            </h1>
            {pendingCount > 0 && (
              <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full animate-pulse">
                {pendingCount} baru
              </span>
            )}
          </div>
          <p className="text-near-black/40 font-bold mt-2 max-w-md">Pantau dan kelola jadwal pemotretan pelanggan secara real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-near-black/20 group-focus-within:text-gold transition-colors" size={16} />
            <input
              type="text"
              placeholder="Cari invoice / nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-6 py-3.5 bg-white border border-near-black/5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-gold/10 focus:border-gold/30 w-full md:w-72 transition-all shadow-sm placeholder:text-near-black/25"
            />
          </div>
          <button
            onClick={fetchBookings}
            className={`p-3.5 rounded-2xl bg-white border border-near-black/5 text-near-black/40 hover:text-gold hover:border-gold/20 transition-all shadow-sm ${loading ? "animate-spin" : ""}`}
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-near-black text-white hover:bg-gold hover:text-near-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <Plus size={14} />
            Tambah Booking
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Booking", val: bookings.length, icon: CalendarIcon, color: "text-near-black", bg: "bg-near-black/5" },
          { label: "Menunggu", val: pendingCount, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Dikonfirmasi", val: bookings.filter(b => b.status === "confirmed").length, icon: Zap, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pendapatan", val: formatRupiah(totalRevenue), icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="group relative bg-white p-6 rounded-[2rem] border border-near-black/5 shadow-sm hover:shadow-xl hover:shadow-near-black/5 transition-all duration-500 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-5">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform duration-500 group-hover:scale-110`}>
                <stat.icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            <p className="text-[9px] font-black text-near-black/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <span className="text-xl font-black text-near-black tracking-tight">{stat.val}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <SlidersHorizontal size={14} className="text-near-black/20 mr-1 flex-shrink-0" />
        {FILTER_TABS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`relative px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
              filter === f.key
              ? "bg-near-black text-white shadow-lg shadow-near-black/20"
              : "bg-white text-near-black/40 border border-near-black/5 hover:border-gold/20 hover:text-gold"
            }`}
          >
            {f.label}
            {f.count > 0 && (
              <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[8px] ${
                filter === f.key ? "bg-white/20 text-white" : "bg-near-black/5 text-near-black/30"
              }`}>
                {f.count}
              </span>
            )}
            {f.key === "pending" && f.count > 0 && filter !== "pending" && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* ── Booking List ── */}
      <div className="bg-white rounded-[2.5rem] border border-near-black/5 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 border-b border-near-black/5">
          <div className="col-span-1 text-[9px] font-black uppercase tracking-widest text-near-black/30">Invoice</div>
          <div className="col-span-3 text-[9px] font-black uppercase tracking-widest text-near-black/30">Pelanggan</div>
          <div className="col-span-2 text-[9px] font-black uppercase tracking-widest text-near-black/30">Paket</div>
          <div className="col-span-2 text-[9px] font-black uppercase tracking-widest text-near-black/30">Jadwal</div>
          <div className="col-span-1 text-[9px] font-black uppercase tracking-widest text-near-black/30 text-right">Total</div>
          <div className="col-span-2 text-[9px] font-black uppercase tracking-widest text-near-black/30 text-center">Status</div>
          <div className="col-span-1" />
        </div>

        {/* Table Body */}
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="px-8 py-6 border-b border-near-black/3">
                <div className="h-12 bg-near-black/[0.02] animate-pulse rounded-xl" />
              </div>
            ))
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking, idx) => {
              const cfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG["pending"];
              return (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => setSelectedBooking(booking)}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center px-6 lg:px-8 py-5 border-b border-near-black/3 hover:bg-gold/[0.03] cursor-pointer transition-all duration-300 relative"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: cfg.color }} />

                  {/* Invoice */}
                  <div className="col-span-1 flex items-center gap-2 lg:block">
                    <Hash size={10} className="text-near-black/15 lg:hidden" />
                    <span className="text-[11px] font-black text-near-black/30 font-mono">{booking.invoice_no}</span>
                  </div>

                  {/* Customer */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-near-black/[0.04] flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-near-black/25" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-near-black truncate">{booking.customer_name}</p>
                      <p className="text-[10px] font-medium text-near-black/30 flex items-center gap-1">
                        <Phone size={8} /> {booking.customer_phone}
                      </p>
                    </div>
                  </div>

                  {/* Package */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <Package size={12} className="text-gold/60 flex-shrink-0" />
                      <span className="text-xs font-bold text-near-black/60 truncate">{booking.package_name}</span>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="col-span-2">
                    <p className="text-xs font-bold text-near-black/70">{formatSessionDate(booking.session_date)}</p>
                    <p className="text-[10px] font-medium text-near-black/30 flex items-center gap-1 mt-0.5">
                      <Clock size={8} /> {booking.session_time} WIB
                    </p>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 text-right">
                    <span className="text-sm font-black text-near-black">{formatRupiah(booking.final_price)}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex justify-center">
                    <StatusBadge status={booking.status} />
                  </div>

                  {/* Detail Arrow */}
                  <div className="col-span-1 flex justify-end">
                    <div className="w-8 h-8 rounded-xl bg-near-black/[0.03] flex items-center justify-center text-near-black/20 group-hover:bg-gold/10 group-hover:text-gold transition-all duration-300">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-24 flex flex-col items-center justify-center space-y-5 text-center">
              <div className="w-20 h-20 rounded-[2rem] bg-near-black/[0.03] flex items-center justify-center">
                <CalendarDays size={36} className="text-near-black/15" />
              </div>
              <div>
                <h3 className="text-lg font-black text-near-black">Tidak Ada Reservasi</h3>
                <p className="text-sm text-near-black/30 max-w-xs mt-1">
                  {search ? "Coba kata kunci lain atau ubah filter." : "Belum ada booking masuk."}
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedBooking(null); setIsEditing(false); }}
              className="absolute inset-0 bg-near-black/30 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-near-black/20 relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              {/* Modal Top Accent */}
              <div className="h-1.5 w-full" style={{ backgroundColor: (STATUS_CONFIG[selectedBooking.status] ?? STATUS_CONFIG["pending"]).color }} />

              <div className="p-8 space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-near-black flex items-center justify-center text-white shadow-xl shadow-near-black/20">
                      {isEditing ? <Edit size={24} /> : <ShieldCheck size={24} />}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-near-black" style={{ fontFamily: "var(--font-playfair)" }}>
                        {isEditing ? "Edit Reservasi" : "Detail Reservasi"}
                      </h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-near-black/30 font-mono mt-0.5">
                        #{selectedBooking.invoice_no}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedBooking(null); setIsEditing(false); }}
                    className="w-10 h-10 rounded-full bg-near-black/5 flex items-center justify-center text-near-black/30 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                {isEditing ? (
                  /* ── EDIT FORM ── */
                  <div className="space-y-4 text-left">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Nama Pelanggan *</label>
                        <input
                          type="text"
                          value={editForm.customer_name}
                          onChange={e => setEditForm({ ...editForm, customer_name: e.target.value })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">No. WhatsApp *</label>
                        <input
                          type="text"
                          value={editForm.customer_phone}
                          onChange={e => setEditForm({ ...editForm, customer_phone: e.target.value })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Paket *</label>
                        <select
                          value={products.some(p => p.name === editForm.package_name) ? editForm.package_name : "Custom"}
                          onChange={e => {
                            if (e.target.value === "Custom") {
                              setEditForm({ ...editForm, package_name: "" });
                            } else {
                              handlePackageChange(e.target.value, true);
                            }
                          }}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        >
                          <option value="">-- Pilih Paket --</option>
                          {products.map(p => (
                            <option key={p.id} value={p.name}>{p.name} ({formatRupiah(p.price)})</option>
                          ))}
                          <option value="Custom">Custom...</option>
                        </select>
                      </div>
                      {(!products.some(p => p.name === editForm.package_name) || editForm.package_name === "") && (
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Nama Paket Custom</label>
                          <input
                            type="text"
                            value={editForm.package_name}
                            onChange={e => setEditForm({ ...editForm, package_name: e.target.value })}
                            placeholder="Ketik nama paket custom..."
                            className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Metode Bayar</label>
                        <select
                          value={editForm.payment_method}
                          onChange={e => setEditForm({ ...editForm, payment_method: e.target.value })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        >
                          <option value="cash">Tunai (Cash)</option>
                          <option value="transfer">Bank Transfer</option>
                          <option value="qris">QRIS</option>
                          <option value="ewallet">E-Wallet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Status Booking</label>
                        <select
                          value={editForm.status}
                          onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        >
                          <option value="pending">Menunggu (Pending)</option>
                          <option value="confirmed">Dikonfirmasi (Confirmed)</option>
                          <option value="completed">Selesai (Completed)</option>
                          <option value="cancelled">Dibatalkan (Cancelled)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Tanggal Sesi *</label>
                        <input
                          type="date"
                          value={editForm.session_date}
                          onChange={e => setEditForm({ ...editForm, session_date: e.target.value })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Jam Sesi (e.g. 10:00) *</label>
                        <input
                          type="text"
                          value={editForm.session_time}
                          onChange={e => setEditForm({ ...editForm, session_time: e.target.value })}
                          placeholder="HH:MM"
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Harga Asli (Rp)</label>
                        <input
                          type="number"
                          value={editForm.original_price}
                          onChange={e => setEditForm({ ...editForm, original_price: Number(e.target.value), final_price: Number(e.target.value) * (1 - (editForm.discount_pct || 0) / 100) })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Diskon (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editForm.discount_pct}
                          onChange={e => handleDiscountChange(Number(e.target.value), true)}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Harga Akhir (Rp)</label>
                        <input
                          type="number"
                          value={editForm.final_price}
                          onChange={e => setEditForm({ ...editForm, final_price: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Kode Referral</label>
                        <input
                          type="text"
                          value={editForm.referral_code}
                          onChange={e => setEditForm({ ...editForm, referral_code: e.target.value })}
                          placeholder="KODE"
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Catatan Khusus</label>
                      <textarea
                        value={editForm.notes}
                        onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <button
                        onClick={handleSaveEdit}
                        disabled={updatingStatus}
                        className="flex items-center justify-center gap-2 py-4 bg-near-black hover:bg-near-black/90 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-near-black/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                      >
                        {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                        Simpan Perubahan
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center justify-center gap-2 py-4 bg-near-black/5 hover:bg-near-black/10 text-near-black/60 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── STATIC DETAIL VIEW ── */
                  <>
                    {/* Current Status */}
                    <div className="flex items-center justify-between p-4 bg-near-black/[0.02] rounded-2xl">
                      <span className="text-[9px] font-black uppercase tracking-widest text-near-black/30">Status Saat Ini</span>
                      <StatusBadge status={selectedBooking.status} size="lg" />
                    </div>

                    {/* Customer & Payment Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 bg-near-black/[0.02] rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-near-black/30">
                          <User size={12} />
                          <span className="text-[8px] font-black uppercase tracking-widest">Pelanggan</span>
                        </div>
                        <div>
                          <p className="text-base font-black text-near-black">{selectedBooking.customer_name}</p>
                          <p className="text-xs text-near-black/40 mt-0.5">{selectedBooking.customer_phone}</p>
                        </div>
                      </div>
                      <div className="p-5 bg-near-black/[0.02] rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-near-black/30">
                          <CreditCard size={12} />
                          <span className="text-[8px] font-black uppercase tracking-widest">Pembayaran</span>
                        </div>
                        <div>
                          <p className="text-base font-black text-near-black">{formatRupiah(selectedBooking.final_price)}</p>
                          <p className="text-xs text-near-black/40 uppercase mt-0.5">{selectedBooking.payment_method === "qris" ? "QRIS" : selectedBooking.payment_method === "cash" ? "Tunai (Cash)" : selectedBooking.payment_method === "ewallet" ? "E-Wallet" : "Transfer Bank"}</p>
                          {selectedBooking.discount_pct && selectedBooking.discount_pct > 0 && (
                            <div className="flex items-center gap-1 mt-1.5">
                              <Tag size={9} className="text-gold" />
                              <span className="text-[10px] font-bold text-gold">
                                Diskon {selectedBooking.discount_pct}% {selectedBooking.referral_code ? `(${selectedBooking.referral_code})` : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="p-5 bg-near-black rounded-2xl space-y-4 text-white">
                      <div className="flex items-center gap-2 text-white/40">
                        <CalendarIcon size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Detail Sesi</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white/40">Paket</span>
                          <span className="text-xs font-black text-gold">{selectedBooking.package_name}</span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white/40">Tanggal</span>
                          <span className="text-xs font-black text-white">{formatSessionDateLong(selectedBooking.session_date)}</span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white/40">Waktu</span>
                          <span className="text-xs font-black text-white">{selectedBooking.session_time} WIB</span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white/40">Dibuat</span>
                          <span className="text-[10px] font-bold text-white/50">
                            {new Date(selectedBooking.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {selectedBooking.notes && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-near-black/30">
                          <FileText size={12} />
                          <span className="text-[8px] font-black uppercase tracking-widest">Catatan Khusus</span>
                        </div>
                        <p className="text-xs text-near-black/60 leading-relaxed italic p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl">
                          &ldquo;{selectedBooking.notes}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* ── Action Buttons ── */}
                    <div className="space-y-3 pt-2">
                      {/* PENDING → confirmed or cancelled */}
                      {selectedBooking.status === "pending" && (
                        <>
                          <div className="p-3.5 bg-amber-50 border border-amber-200/50 rounded-xl text-center">
                            <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider">⏳ Menunggu verifikasi pembayaran</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => handleUpdateStatus(selectedBooking.id, "confirmed")}
                              disabled={updatingStatus}
                              className="flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                              {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                              Konfirmasi
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(selectedBooking.id, "cancelled")}
                              disabled={updatingStatus}
                              className="flex items-center justify-center gap-2 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                              {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                              Tolak
                            </button>
                          </div>
                        </>
                      )}

                      {/* CONFIRMED → completed or cancelled */}
                      {selectedBooking.status === "confirmed" && (
                        <>
                          <div className="p-3.5 bg-blue-50 border border-blue-200/50 rounded-xl text-center">
                            <p className="text-[10px] font-black text-blue-700 uppercase tracking-wider">✅ Pembayaran dikonfirmasi — tandai setelah sesi selesai</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => handleUpdateStatus(selectedBooking.id, "completed")}
                              disabled={updatingStatus}
                              className="flex items-center justify-center gap-2 py-4 bg-near-black hover:bg-near-black/90 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-near-black/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                              {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                              Selesai
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(selectedBooking.id, "cancelled")}
                              disabled={updatingStatus}
                              className="flex items-center justify-center gap-2 py-4 bg-near-black/5 hover:bg-red-50 text-near-black/40 hover:text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                            >
                              {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                              Batalkan
                            </button>
                          </div>
                        </>
                      )}

                      {/* COMPLETED → info only */}
                      {selectedBooking.status === "completed" && (
                        <div className="p-5 bg-emerald-50 border border-emerald-200/50 rounded-2xl text-center space-y-2">
                          <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                          <p className="text-sm font-black text-emerald-700">Sesi foto telah selesai</p>
                          <p className="text-[10px] text-emerald-600/70">Komisi afiliasi (jika ada) sudah dihitung otomatis.</p>
                        </div>
                      )}

                      {/* CANCELLED → info only */}
                      {selectedBooking.status === "cancelled" && (
                        <div className="p-5 bg-red-50 border border-red-200/50 rounded-2xl text-center space-y-2">
                          <XCircle size={24} className="text-red-500 mx-auto" />
                          <p className="text-sm font-black text-red-600">Reservasi dibatalkan</p>
                          <p className="text-[10px] text-red-400">Hubungi pelanggan jika ada pertanyaan.</p>
                        </div>
                      )}

                      {/* WhatsApp Button — always visible */}
                      <a
                        href={buildWhatsAppUrl(selectedBooking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#25D366]/20"
                      >
                        <MessageCircle size={14} />
                        Hubungi via WhatsApp
                      </a>
                    </div>

                    {/* Admin Actions (Edit/Delete) */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-near-black/5">
                      <button
                        onClick={() => startEditing(selectedBooking)}
                        className="flex items-center justify-center gap-2 py-3.5 border border-near-black/10 hover:border-gold/30 hover:bg-gold/5 text-near-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
                      >
                        <Edit size={12} />
                        Edit Booking
                      </button>
                      <button
                        onClick={() => handleDeleteBooking(selectedBooking.id)}
                        disabled={updatingStatus}
                        className="flex items-center justify-center gap-2 py-3.5 border border-red-200/50 hover:bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                      >
                        <Trash2 size={12} />
                        Hapus Booking
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Create Booking Modal ── */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-near-black/30 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-near-black/20 relative z-10 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="h-1.5 w-full bg-near-black" />

              <div className="p-8 space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-near-black flex items-center justify-center text-white shadow-xl shadow-near-black/20">
                      <Plus size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-near-black" style={{ fontFamily: "var(--font-playfair)" }}>
                        Tambah Booking
                      </h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-near-black/30 mt-0.5">
                        Buat Reservasi Baru secara Manual
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-near-black/5 flex items-center justify-center text-near-black/30 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Nama Pelanggan *</label>
                      <input
                        type="text"
                        placeholder="Nama Pelanggan"
                        value={createForm.customer_name}
                        onChange={e => setCreateForm({ ...createForm, customer_name: e.target.value })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">No. WhatsApp *</label>
                      <input
                        type="text"
                        placeholder="62812xxxx"
                        value={createForm.customer_phone}
                        onChange={e => setCreateForm({ ...createForm, customer_phone: e.target.value })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Paket *</label>
                      <select
                        value={products.some(p => p.name === createForm.package_name) ? createForm.package_name : "Custom"}
                        onChange={e => {
                          if (e.target.value === "Custom") {
                            setCreateForm({ ...createForm, package_name: "" });
                          } else {
                            handlePackageChange(e.target.value, false);
                          }
                        }}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      >
                        <option value="">-- Pilih Paket --</option>
                        {products.map(p => (
                          <option key={p.id} value={p.name}>{p.name} ({formatRupiah(p.price)})</option>
                        ))}
                        <option value="Custom">Custom...</option>
                      </select>
                    </div>
                    {(!products.some(p => p.name === createForm.package_name) || createForm.package_name === "") && (
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Nama Paket Custom</label>
                        <input
                          type="text"
                          placeholder="Nama paket custom"
                          value={createForm.package_name}
                          onChange={e => setCreateForm({ ...createForm, package_name: e.target.value })}
                          className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Metode Bayar</label>
                      <select
                        value={createForm.payment_method}
                        onChange={e => setCreateForm({ ...createForm, payment_method: e.target.value })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      >
                        <option value="cash">Tunai (Cash)</option>
                        <option value="transfer">Bank Transfer</option>
                        <option value="qris">QRIS</option>
                        <option value="ewallet">E-Wallet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Status Awal</label>
                      <select
                        value={createForm.status}
                        onChange={e => setCreateForm({ ...createForm, status: e.target.value })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      >
                        <option value="pending">Menunggu (Pending)</option>
                        <option value="confirmed">Dikonfirmasi (Confirmed)</option>
                        <option value="completed">Selesai (Completed)</option>
                        <option value="cancelled">Dibatalkan (Cancelled)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Tanggal Sesi *</label>
                      <input
                        type="date"
                        value={createForm.session_date}
                        onChange={e => setCreateForm({ ...createForm, session_date: e.target.value })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Jam Sesi (e.g. 10:00) *</label>
                      <input
                        type="text"
                        placeholder="13:00"
                        value={createForm.session_time}
                        onChange={e => setCreateForm({ ...createForm, session_time: e.target.value })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Harga Asli (Rp)</label>
                      <input
                        type="number"
                        value={createForm.original_price}
                        onChange={e => setCreateForm({ ...createForm, original_price: Number(e.target.value), final_price: Number(e.target.value) * (1 - (createForm.discount_pct || 0) / 100) })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Diskon (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={createForm.discount_pct}
                        onChange={e => handleDiscountChange(Number(e.target.value), false)}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Harga Akhir (Rp)</label>
                      <input
                        type="number"
                        value={createForm.final_price}
                        onChange={e => setCreateForm({ ...createForm, final_price: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Kode Referral</label>
                      <input
                        type="text"
                        value={createForm.referral_code}
                        onChange={e => setCreateForm({ ...createForm, referral_code: e.target.value })}
                        placeholder="KODE"
                        className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-near-black/40 mb-1.5">Catatan Khusus</label>
                    <textarea
                      placeholder="Catatan reservasi..."
                      value={createForm.notes}
                      onChange={e => setCreateForm({ ...createForm, notes: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 bg-near-black/[0.02] border border-near-black/5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold/30 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <button
                      onClick={handleCreateBooking}
                      disabled={updatingStatus}
                      className="flex items-center justify-center gap-2 py-4 bg-near-black hover:bg-near-black/90 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-near-black/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                      {updatingStatus ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                      Buat Booking
                    </button>
                    <button
                      onClick={() => setIsCreateModalOpen(false)}
                      className="flex items-center justify-center gap-2 py-4 bg-near-black/5 hover:bg-near-black/10 text-near-black/60 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

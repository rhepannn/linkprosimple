"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Plus,
  Trash2,
  Copy,
  Search,
  Calendar,
  Sparkles,
  RefreshCw,
  X,
  Pencil,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Wallet,
  Users,
  Activity,
  ChevronRight,
  CreditCard,
  Banknote,
  Hash,
} from "lucide-react";
import {
  getReferrals,
  createReferral,
  updateReferral,
  toggleReferralStatus,
  deleteReferral,
} from "@/app/actions/referrals";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ReferralCode {
  id: string;
  code: string;
  marketerName: string;
  discountPct: number;
  maxDiscountAmount: number;
  feePercentage: number;
  bankName: string | null;
  bankAccount: string | null;
  usageCount: number;
  usageLimit: number | null;
  expiryDate: string | null;
  isActive: boolean;
  createdAt: string;
  totalTransactions: number;
  totalDiscountAmount: number;
  totalMarketingFee: number;
}

const emptyForm = {
  code: "",
  marketerName: "",
  discountPercentage: 10,
  maxDiscountAmount: 0,
  feePercentage: 0,
  bankName: "",
  bankAccount: "",
  usageLimit: "",
  expiryDate: "",
  isActive: true,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRp(n: number) {
  return "Rp " + Math.round(n).toLocaleString("id-ID");
}

function StatusBadge({ isActive, expiryDate }: { isActive: boolean; expiryDate: string | null }) {
  const expired = expiryDate && new Date(expiryDate) < new Date();
  if (!isActive || expired) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-red-50 text-red-600 border border-red-100">
        <XCircle size={10} />
        {expired ? "Kadaluarsa" : "Nonaktif"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
      <CheckCircle2 size={10} />
      Aktif
    </span>
  );
}

// ─── Custom Toast ─────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "info";
interface Toast { message: string; type: ToastType }

function ToastPopup({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const colors: Record<ToastType, string> = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error:   "bg-red-50 border-red-200 text-red-800",
    info:    "bg-blue-50 border-blue-200 text-blue-800",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-xl text-sm font-bold ${colors[toast.type]}`}
    >
      <span>{toast.message}</span>
      <button onClick={onClose} className="opacity-50 hover:opacity-100">
        <X size={14} />
      </button>
    </motion.div>
  );
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────

function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 bg-white rounded-[28px] p-8 max-w-sm w-full shadow-2xl border border-[#3B2211]/5"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <Trash2 size={24} className="text-red-500" />
        </div>
        <p className="text-center text-sm font-bold text-[#3B2211] mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-2xl border border-[#3B2211]/10 text-[#3B2211]/60 text-[11px] font-black uppercase tracking-widest hover:bg-[#F8F6F4] transition-all"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
          >
            Hapus
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReferralManagement() {
  const [referrals, setReferrals] = useState<ReferralCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReferral, setEditingReferral] = useState<ReferralCode | null>(null);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const supabase = createClient();

  // ─── Toast helpers ──────────────────────────────────────────────────────────

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ─── Scroll lock ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  // ─── Real-time ──────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchReferrals();
    const channel = supabase
      .channel("referral-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "referral_codes" }, () => fetchReferrals())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  // ─── Fetch ──────────────────────────────────────────────────────────────────

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const result = await getReferrals();
      if (result.success) setReferrals(result.data as any[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Filter ─────────────────────────────────────────────────────────────────

  const filteredReferrals = useMemo(() => {
    if (!search.trim()) return referrals;
    const q = search.toLowerCase();
    return referrals.filter(
      r => r.code.toLowerCase().includes(q) || r.marketerName.toLowerCase().includes(q)
    );
  }, [referrals, search]);

  // ─── Stats ──────────────────────────────────────────────────────────────────

  const totalActive = referrals.filter(r => r.isActive).length;
  const totalUsage  = referrals.reduce((s, r) => s + (r.usageCount ?? 0), 0);
  const totalFee    = referrals.reduce((s, r) => s + (r.totalMarketingFee ?? 0), 0);

  const stats = [
    {
      label: "Total Kode / Aktif",
      val: `${referrals.length} / ${totalActive}`,
      icon: Ticket,
      color: "text-[#3B2211]",
      bg: "bg-[#3B2211]/5",
    },
    {
      label: "Total Penggunaan",
      val: totalUsage,
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Komisi Diberikan",
      val: formatRp(totalFee),
      icon: Wallet,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "High Impact (> 5 pakai)",
      val: referrals.filter(r => r.usageCount > 5).length,
      icon: TrendingUp,
      color: "text-[#C88A58]",
      bg: "bg-[#C88A58]/10",
    },
  ];

  // ─── Form helpers ────────────────────────────────────────────────────────────

  const openCreate = () => {
    setEditingReferral(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (r: ReferralCode) => {
    setEditingReferral(r);
    setFormData({
      code: r.code,
      marketerName: r.marketerName,
      discountPercentage: r.discountPct,
      maxDiscountAmount: r.maxDiscountAmount,
      feePercentage: r.feePercentage,
      bankName: r.bankName ?? "",
      bankAccount: r.bankAccount ?? "",
      usageLimit: r.usageLimit !== null ? String(r.usageLimit) : "",
      expiryDate: r.expiryDate ? r.expiryDate.split("T")[0] : "",
      isActive: r.isActive,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReferral(null);
    setFormData(emptyForm);
  };

  const generateCode = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(p => ({ ...p, code: `PROMO-${random}` }));
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        code: formData.code,
        marketerName: formData.marketerName,
        discountPercentage: formData.discountPercentage,
        maxDiscountAmount: formData.maxDiscountAmount,
        feePercentage: formData.feePercentage,
        bankName: formData.bankName || null,
        bankAccount: formData.bankAccount || null,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
        expiryDate: formData.expiryDate || null,
        isActive: formData.isActive,
      };

      const res = editingReferral
        ? await updateReferral(editingReferral.id, payload)
        : await createReferral(payload);

      if (res.success) {
        showToast(editingReferral ? "Kode berhasil diperbarui!" : "Kode baru berhasil dibuat!", "success");
        closeModal();
        fetchReferrals();
      } else {
        showToast(res.error ?? "Gagal menyimpan data", "error");
      }
    } catch {
      showToast("Terjadi kesalahan sistem.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Toggle ─────────────────────────────────────────────────────────────────

  const handleToggle = async (id: string, current: boolean) => {
    try {
      const res = await toggleReferralStatus(id, !current);
      if (res.success) {
        showToast(`Kode ${!current ? "diaktifkan" : "dinonaktifkan"}.`, "info");
        fetchReferrals();
      }
    } catch { /* noop */ }
  };

  // ─── Delete ─────────────────────────────────────────────────────────────────

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteReferral(id);
      if (res.success) {
        showToast("Kode berhasil dihapus.", "success");
        fetchReferrals();
      } else {
        showToast("Gagal menghapus data.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan sistem.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto min-h-screen">

      {/* Toast */}
      <AnimatePresence>
        {toast && <ToastPopup key="toast" toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Confirm Dialog */}
      <AnimatePresence>
        {deletingId && (
          <ConfirmDialog
            key="confirm"
            message="Apakah Anda yakin ingin menghapus kode ini secara permanen? Jika sudah pernah digunakan, pertimbangkan untuk menonaktifkan saja."
            onConfirm={() => handleDelete(deletingId)}
            onCancel={() => setDeletingId(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.4em] mb-1.5">Marketing & Promotions</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3B2211] flex items-center justify-center shadow-xl shadow-[#3B2211]/20">
              <Ticket size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#3B2211] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                Manajemen Referral
              </h1>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Kelola kode diskon promosi dan komisi marketer
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3B2211]/25 pointer-events-none" size={14} />
            <input
              type="text"
              placeholder="Cari kode atau marketer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 h-10 bg-[#F8F6F4] border border-[#3B2211]/10 rounded-2xl text-[13px] font-medium text-[#3B2211] placeholder:text-[#3B2211]/30 focus:outline-none focus:bg-white focus:border-[#3B2211]/25 focus:ring-0 w-56 md:w-72 transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3B2211]/30 hover:text-[#3B2211]/60 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* New Code */}
          <button
            onClick={openCreate}
            className="flex items-center gap-2 h-10 px-5 bg-[#3B2211] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.97] transition-all whitespace-nowrap"
          >
            <Plus size={14} />
            Buat Kode
          </button>
        </div>
      </div>

      {/* ── Stats Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="p-6 bg-white rounded-2xl border border-[#3B2211]/5 shadow-sm flex flex-col gap-4 hover:shadow-lg hover:shadow-[#3B2211]/5 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-black text-[#3B2211] tracking-tight">{s.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Table ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#3B2211]/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F6F4]/80 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-[#3B2211]/5">
                <th className="px-6 py-5">Kode &amp; Marketer</th>
                <th className="px-6 py-5">Diskon (Customer)</th>
                <th className="px-6 py-5">Fee (Marketer)</th>
                <th className="px-6 py-5 text-center">Performa</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F6F4]">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-6 py-5">
                        <div className="h-10 bg-[#F8F6F4] rounded-xl w-full" />
                      </td>
                    </tr>
                  ))
                ) : filteredReferrals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-24 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-25">
                        <Ticket size={44} className="stroke-1" />
                        <p className="text-[11px] font-black uppercase tracking-widest">Belum ada kode referral</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredReferrals.map(r => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`group hover:bg-[#FAFAF8] transition-colors ${r.isActive ? "" : "opacity-60"}`}
                    >
                      {/* Kode & Marketer */}
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-[#3B2211] font-mono tracking-widest">{r.code}</p>
                        <p className="text-[11px] font-semibold text-gray-500 mt-0.5">{r.marketerName}</p>
                        {(r.bankName || r.bankAccount) && (
                          <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                            <CreditCard size={10} />
                            {r.bankName} {r.bankAccount}
                          </span>
                        )}
                      </td>

                      {/* Diskon Customer */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 font-black text-[#3B2211] bg-[#3B2211]/5 px-2.5 py-1 rounded-lg text-sm">
                          {r.discountPct}%
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          Maks: {r.maxDiscountAmount > 0 ? formatRp(r.maxDiscountAmount) : "Tanpa Batas"}
                        </p>
                      </td>

                      {/* Fee Marketer */}
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-1 font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg text-sm">
                          {r.feePercentage}%
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          Total: {formatRp(r.totalMarketingFee ?? 0)}
                        </p>
                      </td>

                      {/* Performa */}
                      <td className="px-6 py-5 text-center">
                        <p className="text-sm font-black text-[#3B2211]">
                          {r.usageCount ?? 0}
                          <span className="text-xs font-normal text-gray-400 ml-1">dipakai</span>
                        </p>
                        {r.usageLimit != null && (
                          <p className="text-[10px] text-gray-400 font-medium">Maks: {r.usageLimit}</p>
                        )}
                        <p className="text-[10px] text-gray-300 font-medium mt-0.5">
                          Berakhir: {r.expiryDate
                            ? new Date(r.expiryDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                            : "∞"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <StatusBadge isActive={r.isActive} expiryDate={r.expiryDate} />
                          <button
                            onClick={() => handleToggle(r.id, r.isActive)}
                            className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#3B2211] transition-colors"
                          >
                            {r.isActive ? "Nonaktifkan" : "Aktifkan"}
                          </button>
                        </div>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Copy */}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(r.code);
                              showToast(`Kode ${r.code} disalin!`, "info");
                            }}
                            title="Salin Kode"
                            className="w-9 h-9 rounded-xl bg-[#F8F6F4] text-[#3B2211]/40 hover:bg-[#3B2211] hover:text-white flex items-center justify-center transition-all"
                          >
                            <Copy size={13} />
                          </button>
                          {/* Edit */}
                          <button
                            onClick={() => openEdit(r)}
                            title="Edit"
                            className="w-9 h-9 rounded-xl bg-[#F8F6F4] text-[#3B2211]/40 hover:bg-[#C88A58] hover:text-white flex items-center justify-center transition-all"
                          >
                            <Pencil size={13} />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => setDeletingId(r.id)}
                            title="Hapus"
                            className="w-9 h-9 rounded-xl bg-red-50 text-red-300 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal Buat / Edit ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#3B2211]/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative z-10 w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-y-auto max-h-[85vh] border border-white/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#3B2211]/8 flex items-center justify-center text-[#3B2211]">
                      {editingReferral ? <Pencil size={18} /> : <Sparkles size={18} />}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-[#3B2211]" style={{ fontFamily: "var(--font-playfair)" }}>
                        {editingReferral ? "Edit Referral" : "Buat Kode Baru"}
                      </h2>
                      <p className="text-[10px] font-bold text-[#3B2211]/30 uppercase tracking-widest">
                        Atur diskon dan komisi
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-8 h-8 rounded-full bg-[#F8F6F4] border border-[#3B2211]/5 flex items-center justify-center text-[#3B2211]/40 hover:text-[#3B2211] transition-all"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="space-y-3.5">
                  {/* Row 1: Kode & Nama Marketer */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                        Kode Referral
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          maxLength={12}
                          value={formData.code}
                          onChange={e => setFormData(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                          className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#3B2211]/12 font-black tracking-widest text-[#3B2211] text-sm pr-10"
                          placeholder="Contoh: PROMO10"
                        />
                        <button
                          type="button"
                          onClick={generateCode}
                          title="Generate acak"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-white rounded-lg border border-[#3B2211]/8 text-[#3B2211]/40 hover:text-[#3B2211] transition-all shadow-sm"
                        >
                          <RefreshCw size={11} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                        Nama Marketer
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.marketerName}
                        onChange={e => setFormData(p => ({ ...p, marketerName: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-[#3B2211]/12 font-bold text-[#3B2211] text-sm"
                        placeholder="Masukkan nama"
                      />
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[#3B2211]/5 pt-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3B2211]/30 mb-3">
                      💰 Konfigurasi Diskon &amp; Komisi
                    </p>

                    {/* Diskon & Maks Diskon */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1 flex items-center gap-1">
                          Diskon (%)
                        </label>
                        <input
                          required
                          type="number"
                          min={0}
                          max={100}
                          step={0.5}
                          value={formData.discountPercentage}
                          onChange={e => setFormData(p => ({ ...p, discountPercentage: parseFloat(e.target.value) || 0 }))}
                          className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[14px] focus:outline-none font-bold text-[#3B2211] text-sm"
                          placeholder="Contoh: 10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                          Maks Potongan (Rp)
                        </label>
                        <input
                          required
                          type="number"
                          min={0}
                          value={formData.maxDiscountAmount}
                          onChange={e => setFormData(p => ({ ...p, maxDiscountAmount: parseInt(e.target.value) || 0 }))}
                          className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[14px] focus:outline-none font-bold text-[#3B2211] text-sm"
                          placeholder="0 = Tanpa batas"
                        />
                      </div>
                    </div>

                    {/* Fee Marketer */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 ml-1 flex items-center gap-1">
                        Komisi Marketer (%)
                      </label>
                      <input
                        required
                        type="number"
                        min={0}
                        max={100}
                        step={0.5}
                        value={formData.feePercentage}
                        onChange={e => setFormData(p => ({ ...p, feePercentage: parseFloat(e.target.value) || 0 }))}
                        className="w-full px-4 py-2.5 bg-emerald-50/60 border border-emerald-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-200 font-bold text-emerald-800 text-sm"
                        placeholder="Contoh: 5"
                      />
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[#3B2211]/5 pt-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3B2211]/30 mb-3">
                      🏦 Data Rekening Marketer
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                          Nama Bank
                        </label>
                        <input
                          type="text"
                          value={formData.bankName}
                          onChange={e => setFormData(p => ({ ...p, bankName: e.target.value }))}
                          className="w-full px-5 py-3.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[16px] focus:outline-none font-bold text-[#3B2211] text-sm"
                          placeholder="Contoh: BCA"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                          Nomor Rekening / HP
                        </label>
                        <input
                          type="text"
                          value={formData.bankAccount}
                          onChange={e => setFormData(p => ({ ...p, bankAccount: e.target.value }))}
                          className="w-full px-5 py-3.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[16px] focus:outline-none font-bold text-[#3B2211] text-sm"
                          placeholder="Masukkan nomor"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[#3B2211]/5 pt-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3B2211]/30 mb-3">
                      📅 Batas &amp; Masa Berlaku
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                          Limit Penggunaan
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={formData.usageLimit}
                          onChange={e => setFormData(p => ({ ...p, usageLimit: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[14px] focus:outline-none font-bold text-[#3B2211] text-sm"
                          placeholder="Kosongkan = tak terbatas"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]/40 ml-1">
                          Tanggal Berakhir
                        </label>
                        <input
                          type="date"
                          value={formData.expiryDate}
                          onChange={e => setFormData(p => ({ ...p, expiryDate: e.target.value }))}
                          className="w-full px-4 py-2.5 bg-[#FAFAF8] border border-[#3B2211]/8 rounded-[14px] focus:outline-none font-bold text-[#3B2211] text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status Aktif + Submit — row */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-3 flex-1 p-3 rounded-2xl bg-[#FAFAF8] border border-[#3B2211]/5">
                      <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, isActive: !p.isActive }))}
                        className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors duration-200 ${
                          formData.isActive ? "bg-emerald-500" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                            formData.isActive ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <div>
                        <p className="text-[11px] font-black text-[#3B2211]">{formData.isActive ? "Aktif" : "Nonaktif"}</p>
                        <p className="text-[10px] text-gray-400">Kasir &amp; Booking</p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3 bg-[#3B2211] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-lg shadow-[#3B2211]/25 hover:scale-[1.01] active:scale-[0.97] transition-all disabled:opacity-50"
                    >
                      {isSubmitting
                        ? "Memproses..."
                        : editingReferral
                        ? "Simpan Perubahan"
                        : "Simpan & Aktifkan"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

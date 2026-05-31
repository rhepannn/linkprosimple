"use client";

// app/(pos)/admin/affiliators/page.tsx
// Manage Affiliate Partners + Instagram-like Post Feed — Admin Panel

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartHandshake,
  Search,
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  AtSign,
  Users,
  DollarSign,
  Edit2,
  Trash2,
  X,
  Save,
  Copy,
  Check,
  AlertCircle,
  ImageIcon,
  Hash,
  Heart,
  Send,
  Eye,
  EyeOff,
  Sparkles,
  Camera,
  FileText,
  Layers,
} from "lucide-react";
import Image from "next/image";
import {
  getAffiliatePosts,
  createAffiliatePost,
  updateAffiliatePost,
  deleteAffiliatePost,
  togglePostPublish,
} from "@/app/actions/affiliate-posts";
import {
  getAffiliateApplications,
  updateApplicationStatus,
  deleteAffiliateApplication,
} from "@/app/actions/affiliate-applications";
import {
  getAffiliators,
  updateAffiliator,
  createAffiliator,
  deleteAffiliator,
} from "@/app/actions/affiliators";
import {
  getAffiliateLeads,
  updateAffiliateLeadStatus,
  deleteAffiliateLead,
} from "@/app/actions/affiliate-leads";
import { toast } from "sonner";

/* ─────────────────────────── Types ─────────────────────────── */

interface Affiliator {
  id: string;
  name: string;
  phone: string;
  instagram: string;
  email: string;
  joinDate: string;
  referralCode: string;
  status: "active" | "pending" | "inactive";
  totalReferrals: number;
  totalEarnings: number;
  notes: string;
  bankName?: string;
  bankAccount?: string;
  feePercentage?: number;
  discountPct?: number;
}

interface AffiliatePost {
  id: string;
  imageUrl: string;
  caption: string;
  hashtags: string[];
  likeCount: number;
  isPublished: boolean;
  postedBy: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AffiliateApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  instagram: string | null;
  tiktok: string | null;
  occupation: string | null;
  city: string | null;
  motivation: string | null;
  experience: string | null;
  status: string;
  notes: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AffiliateLead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  city: string | null;
  occupation: string | null;
  productSku: string | null;
  productName: string | null;
  referralCode: string | null;
  snapperId: string | null;
  notes: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const APP_STATUS_CONFIG = {
  pending: { label: "Menunggu", icon: Clock, className: "text-amber-600 bg-amber-50 border-amber-200" },
  approved: { label: "Disetujui", icon: CheckCircle2, className: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  rejected: { label: "Ditolak", icon: XCircle, className: "text-rose-600 bg-rose-50 border-rose-200" },
};

/* ─────────────────────────── Mock Data ─────────────────────── */

const MOCK_DATA: Affiliator[] = [
  {
    id: "AFF-001",
    name: "Ridwan Maulana",
    phone: "08123456789",
    instagram: "@ridwan.m",
    email: "ridwan@gmail.com",
    joinDate: "2025-01-15",
    referralCode: "RIDWAN10",
    status: "active",
    totalReferrals: 24,
    totalEarnings: 840000,
    notes: "Top performer bulan ini",
  },
  {
    id: "AFF-002",
    name: "Siti Rahma",
    phone: "08234567890",
    instagram: "@siti.rahma_",
    email: "siti@gmail.com",
    joinDate: "2025-02-01",
    referralCode: "SITI10",
    status: "active",
    totalReferrals: 12,
    totalEarnings: 420000,
    notes: "",
  },
  {
    id: "AFF-003",
    name: "Budi Santoso",
    phone: "08345678901",
    instagram: "@budisantoso",
    email: "budi@gmail.com",
    joinDate: "2025-03-10",
    referralCode: "BUDI10",
    status: "pending",
    totalReferrals: 0,
    totalEarnings: 0,
    notes: "Menunggu verifikasi data",
  },
];

const STATUS_CONFIG = {
  active: {
    label: "Aktif",
    icon: CheckCircle2,
    className: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-amber-600 bg-amber-50 border-amber-200",
  },
  inactive: {
    label: "Nonaktif",
    icon: XCircle,
    className: "text-rose-600 bg-rose-50 border-rose-200",
  },
};

/* ─────────────────────────── Helper Components ─────────────── */

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 p-1 text-gray-300 hover:text-[#3B2211] transition-colors"
    >
      {copied ? (
        <Check size={12} className="text-emerald-500" />
      ) : (
        <Copy size={12} />
      )}
      {label && (
        <span className="text-[9px] font-black uppercase tracking-widest">
          {copied ? "Tersalin!" : label}
        </span>
      )}
    </button>
  );
}

function HashtagInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");
  const addTag = () => {
    const tag = input.trim().replace(/^#/, "");
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-[#F8F6F4] rounded-xl border border-transparent">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-3 py-1 bg-[#3B2211]/10 text-[#3B2211] rounded-full text-[10px] font-black"
          >
            #{tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="hover:text-rose-500 transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Hash
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="snappframe, fotobooth, promo..."
            className="w-full pl-8 pr-4 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10"
          />
        </div>
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2.5 bg-[#3B2211]/10 text-[#3B2211] rounded-xl text-[10px] font-black hover:bg-[#3B2211]/20 transition-colors"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}

/* ─── Instagram Post Card ─── */
function PostCard({
  post,
  onEdit,
  onDelete,
  onTogglePublish,
}: {
  post: AffiliatePost;
  onEdit: (p: AffiliatePost) => void;
  onDelete: (id: string) => void;
  onTogglePublish: (id: string, current: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likeCount);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const timeAgo = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}d yang lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}j yang lalu`;
    return `${Math.floor(diff / 86400)}h yang lalu`;
  };

  const handleLike = () => {
    setLiked((prev) => {
      setLocalLikes((l) => (prev ? l - 1 : l + 1));
      return !prev;
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border border-[#F0EBE5] shadow-sm overflow-hidden hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
    >
      {/* ── Card Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F8F6F4]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C88A58] to-[#3B2211] flex items-center justify-center text-white font-black text-xs shadow-md">
            SF
          </div>
          <div>
            <p className="text-[11px] font-black text-[#3B2211]">
              snapp.frame
            </p>
            <p className="text-[9px] text-gray-400 font-bold">
              {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!post.isPublished && (
            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-400 rounded-full text-[8px] font-black uppercase tracking-widest">
              <EyeOff size={9} /> Draft
            </span>
          )}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="p-1.5 text-gray-300 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-lg transition-colors"
            >
              <MoreVertical size={15} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -6 }}
                  className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-2xl shadow-[#3B2211]/10 border border-[#3B2211]/5 z-50 overflow-hidden"
                >
                  <button
                    onClick={() => { onEdit(post); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-left hover:bg-[#F8F6F4] text-[#3B2211] tracking-widest transition-colors"
                  >
                    <Edit2 size={12} /> Edit Post
                  </button>
                  <button
                    onClick={() => { onTogglePublish(post.id, post.isPublished); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-left hover:bg-amber-50 text-amber-600 tracking-widest transition-colors"
                  >
                    {post.isPublished ? (
                      <><EyeOff size={12} /> Jadikan Draft</>
                    ) : (
                      <><Eye size={12} /> Publikasikan</>
                    )}
                  </button>
                  <div className="h-px bg-[#3B2211]/5 mx-3" />
                  <button
                    onClick={() => { onDelete(post.id); setMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase text-left hover:bg-rose-50 text-rose-500 tracking-widest transition-colors"
                  >
                    <Trash2 size={12} /> Hapus Post
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Image ── */}
      <div className="relative aspect-square bg-[#F8F6F4] overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt="Post preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#3B2211]/10">
            <Camera size={40} />
            <p className="text-[9px] font-black uppercase tracking-widest">
              Tidak ada gambar
            </p>
          </div>
        )}
        {!post.isPublished && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/20">
              Draft — Belum Dipublikasi
            </span>
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className="transition-transform active:scale-75"
          >
            <Heart
              size={22}
              className={`transition-colors ${
                liked
                  ? "fill-rose-500 text-rose-500"
                  : "text-gray-400 hover:text-rose-400"
              }`}
            />
          </button>
          <CopyButton
            text={`${post.caption}\n\n${post.hashtags.map((h) => `#${h}`).join(" ")}`}
            label="Copy Caption"
          />
        </div>
        <button className="text-gray-300 hover:text-[#3B2211] transition-colors">
          <Send size={20} />
        </button>
      </div>

      {/* ── Likes ── */}
      <div className="px-4 pt-1">
        <p className="text-[11px] font-black text-[#3B2211]">
          {localLikes.toLocaleString("id-ID")} suka
        </p>
      </div>

      {/* ── Caption ── */}
      <div className="px-4 pt-1 pb-3">
        <p className="text-[12px] text-gray-700 leading-relaxed line-clamp-3">
          <span className="font-black text-[#3B2211] mr-1">snapp.frame</span>
          {post.caption}
        </p>
        {post.hashtags.length > 0 && (
          <p className="text-[11px] text-[#C88A58] font-bold mt-1 line-clamp-2">
            {post.hashtags.map((h) => `#${h}`).join(" ")}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Post Modal (Create / Edit) ─── */
function PostModal({
  editing,
  onClose,
  onSaved,
}: {
  editing: AffiliatePost | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    imageUrl: editing?.imageUrl ?? "",
    caption: editing?.caption ?? "",
    hashtags: editing?.hashtags ?? [] as string[],
    isPublished: editing?.isPublished ?? true,
  });
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSave = async () => {
    if (!form.imageUrl || !form.caption) return;
    setSaving(true);
    let res;
    if (editing) {
      res = await updateAffiliatePost(editing.id, form);
    } else {
      res = await createAffiliatePost({ ...form, postedBy: "Admin" });
    }
    setSaving(false);
    if (res.success) {
      toast.success(editing ? "Post berhasil diperbarui!" : "Post berhasil dibuat!");
      onSaved();
      onClose();
    } else {
      toast.error(res.error ?? "Terjadi kesalahan");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden"
          style={{ maxHeight: "calc(100vh - 3rem)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-[#3B2211]/5 flex-shrink-0">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C88A58] to-[#3B2211] flex items-center justify-center">
                  <Camera size={15} className="text-white" />
                </div>
                <h2 className="text-lg font-black text-[#3B2211]">
                  {editing ? "Edit Post" : "Buat Post Baru"}
                </h2>
              </div>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 ml-11">
                Konten akan ditampilkan di feed affiliator
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview((p) => !p)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  preview
                    ? "bg-[#3B2211] text-white"
                    : "bg-[#3B2211]/5 text-[#3B2211]"
                }`}
              >
                <Eye size={13} />
                Preview
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-300 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className={`grid ${preview ? "grid-cols-2" : "grid-cols-1"} h-full`}>
              {/* Form */}
              <div className="p-8 space-y-6 border-r border-[#F8F6F4]">
                {/* Image URL */}
                <div>
                  <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                    URL Gambar *
                  </label>
                  <div className="relative">
                    <ImageIcon
                      size={15}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="url"
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, imageUrl: e.target.value }))
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all"
                    />
                  </div>
                  {form.imageUrl && (
                    <div className="mt-3 relative aspect-video rounded-xl overflow-hidden bg-[#F8F6F4]">
                      <img
                        src={form.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                    Caption *
                  </label>
                  <div className="relative">
                    <FileText
                      size={15}
                      className="absolute left-4 top-4 text-gray-400"
                    />
                    <textarea
                      value={form.caption}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, caption: e.target.value }))
                      }
                      placeholder="Tulis caption yang menarik untuk para affiliator share..."
                      rows={5}
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all resize-none"
                    />
                  </div>
                  <p className="text-right text-[9px] text-gray-400 font-bold mt-1">
                    {form.caption.length} karakter
                  </p>
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                    Hashtags
                  </label>
                  <HashtagInput
                    value={form.hashtags}
                    onChange={(tags) => setForm((f) => ({ ...f, hashtags: tags }))}
                  />
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center justify-between p-4 bg-[#F8F6F4] rounded-xl">
                  <div>
                    <p className="text-[11px] font-black text-[#3B2211] uppercase tracking-widest">
                      Status Publikasi
                    </p>
                    <p className="text-[9px] text-gray-400 font-bold mt-0.5">
                      {form.isPublished
                        ? "Post akan langsung dipublikasi"
                        : "Post disimpan sebagai draft"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({ ...f, isPublished: !f.isPublished }))
                    }
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      form.isPublished ? "bg-emerald-500" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
                        form.isPublished ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Preview Panel */}
              {preview && (
                <div className="p-8 bg-[#F8F6F4]/50">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4 text-center">
                    Preview
                  </p>
                  <div className="bg-white rounded-2xl border border-[#F0EBE5] shadow-sm overflow-hidden max-w-[280px] mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#F8F6F4]">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C88A58] to-[#3B2211] flex items-center justify-center text-white font-black text-[9px]">
                        SF
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#3B2211]">
                          snapp.frame
                        </p>
                        <p className="text-[8px] text-gray-400 font-bold">
                          Baru saja
                        </p>
                      </div>
                    </div>
                    {/* Image */}
                    <div className="aspect-square bg-[#F8F6F4] overflow-hidden">
                      {form.imageUrl ? (
                        <img
                          src={form.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#3B2211]/10">
                          <Camera size={32} />
                        </div>
                      )}
                    </div>
                    {/* Footer */}
                    <div className="px-3 pt-2 pb-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Heart size={16} className="text-gray-300" />
                        <Send size={16} className="text-gray-300" />
                      </div>
                      <p className="text-[9px] font-black text-[#3B2211]">
                        0 suka
                      </p>
                      <p className="text-[9px] text-gray-600 mt-0.5 line-clamp-2">
                        <span className="font-black text-[#3B2211]">
                          snapp.frame{" "}
                        </span>
                        {form.caption || "Caption akan muncul di sini..."}
                      </p>
                      {form.hashtags.length > 0 && (
                        <p className="text-[8px] text-[#C88A58] font-bold mt-0.5 line-clamp-1">
                          {form.hashtags.map((h) => `#${h}`).join(" ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-8 py-5 border-t border-[#3B2211]/5 bg-[#F8F6F4]/50 flex-shrink-0 rounded-b-3xl">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl border border-[#3B2211]/10 text-[11px] font-black uppercase tracking-widest text-[#3B2211]/40 hover:text-[#3B2211] hover:border-[#3B2211]/20 transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              disabled={!form.imageUrl || !form.caption || saving}
              className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#3B2211] text-white text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-xl shadow-[#3B2211]/20"
            >
              {saving ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>
                  <Sparkles size={14} />
                  {editing ? "Simpan Perubahan" : "Publikasikan Post"}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ─────────────────────────── Main Page ─────────────────────── */

export default function AffiliatorsPage() {
  // ── Affiliator state ──
  const [affiliators, setAffiliators] = useState<Affiliator[]>([]);
  const [affiliatorsLoading, setAffiliatorsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "pending" | "inactive"
  >("all");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Affiliator | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Affiliator>>({
    name: "",
    phone: "",
    instagram: "",
    email: "",
    referralCode: "",
    status: "pending",
    bankName: "",
    bankAccount: "",
    feePercentage: 10.0,
    discountPct: 10.0,
    notes: "",
  });

  // ── Post state ──
  const [tab, setTab] = useState<"affiliators" | "posts" | "pendaftaran" | "permintaan">("pendaftaran");
  const [posts, setPosts] = useState<AffiliatePost[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState<AffiliatePost | null>(null);
  const [postSearch, setPostSearch] = useState("");

  // ── Application state ──
  const [applications, setApplications] = useState<AffiliateApplication[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AffiliateApplication | null>(null);
  const [appStatusFilter, setAppStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  // ── Lead state ──
  const [leads, setLeads] = useState<AffiliateLead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<AffiliateLead | null>(null);

  // ── Affiliator actions ──
  const fetchAffiliators = async () => {
    setAffiliatorsLoading(true);
    const res = await getAffiliators();
    if (res.success && res.data) {
      setAffiliators(res.data as any);
    } else {
      toast.error(res.error || "Gagal memuat data affiliator.");
    }
    setAffiliatorsLoading(false);
  };

  // ── Affiliator computed ──
  const filtered = affiliators.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.referralCode.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: affiliators.length,
    active: affiliators.filter((a) => a.status === "active").length,
    pending: affiliators.filter((a) => a.status === "pending").length,
    totalEarnings: affiliators.reduce((s, a) => s + a.totalEarnings, 0),
  };

  // ── Affiliator actions ──
  const openAdd = () => {
    setEditingItem(null);
    setForm({
      name: "",
      phone: "",
      instagram: "",
      email: "",
      referralCode: "",
      status: "active",
      bankName: "",
      bankAccount: "",
      feePercentage: 10.0,
      discountPct: 10.0,
      notes: "",
    });
    setShowModal(true);
  };

  const openEdit = (a: Affiliator) => {
    setEditingItem(a);
    setForm({ ...a });
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus affiliator ini secara permanen beserta datanya?")) return;
    const res = await deleteAffiliator(id);
    if (res.success) {
      toast.success("Affiliator berhasil dihapus!");
      fetchAffiliators();
    } else {
      toast.error(res.error || "Gagal menghapus.");
    }
    setActiveMenu(null);
  };

  const handleStatusChange = async (id: string, status: "active" | "inactive") => {
    const aff = affiliators.find(a => a.id === id);
    if (!aff) return;

    const res = await updateAffiliator(id, {
      name: aff.name,
      phone: aff.phone,
      email: aff.email,
      referralCode: aff.referralCode,
      status: status,
      bankName: aff.bankName,
      bankAccount: aff.bankAccount,
      feePercentage: aff.feePercentage,
      discountPct: aff.discountPct,
    });

    if (res.success) {
      toast.success(status === "active" ? "Affiliator diaktifkan!" : "Affiliator dinonaktifkan.");
      fetchAffiliators();
    } else {
      toast.error(res.error || "Gagal memperbarui status.");
    }
    setActiveMenu(null);
  };

  const handleSave = async () => {
    if (!form.name || !form.phone || !form.referralCode || !form.email) {
      toast.error("Nama, email, WhatsApp, dan kode referral wajib diisi.");
      return;
    }
    
    let res;
    if (editingItem) {
      res = await updateAffiliator(editingItem.id, {
        name: form.name,
        phone: form.phone,
        email: form.email,
        referralCode: form.referralCode,
        status: (form.status as any) === "active" ? "active" : "inactive",
        bankName: form.bankName || "",
        bankAccount: form.bankAccount || "",
        feePercentage: form.feePercentage ? Number(form.feePercentage) : undefined,
        discountPct: form.discountPct ? Number(form.discountPct) : undefined,
      });
    } else {
      res = await createAffiliator({
        name: form.name,
        phone: form.phone,
        email: form.email,
        referralCode: form.referralCode,
        status: (form.status as any) === "active" ? "active" : "inactive",
        bankName: form.bankName || "",
        bankAccount: form.bankAccount || "",
        password: (form as any).password || undefined,
        feePercentage: form.feePercentage ? Number(form.feePercentage) : undefined,
        discountPct: form.discountPct ? Number(form.discountPct) : undefined,
      });
    }

    if (res.success) {
      toast.success(editingItem ? "Data berhasil disimpan!" : "Affiliator baru berhasil ditambahkan!");
      setShowModal(false);
      fetchAffiliators();
    } else {
      toast.error(res.error || "Terjadi kesalahan.");
    }
  };

  // ── Post actions ──
  const fetchPosts = async () => {
    setPostsLoading(true);
    const res = await getAffiliatePosts();
    if (res.success) setPosts((res.data as AffiliatePost[]) ?? []);
    setPostsLoading(false);
  };

  // ── Application actions ──
  const fetchApplications = async () => {
    setAppsLoading(true);
    const res = await getAffiliateApplications();
    if (res.success) setApplications((res.data as AffiliateApplication[]) ?? []);
    setAppsLoading(false);
  };

  const handleAppStatus = async (id: string, status: "approved" | "rejected" | "pending") => {
    const res = await updateApplicationStatus(id, status);
    if (res.success) {
      toast.success(
        status === "approved" ? "Pendaftaran disetujui!" :
        status === "rejected" ? "Pendaftaran ditolak." : "Status dikembalikan ke pending."
      );
      setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
      if (selectedApp?.id === id) setSelectedApp((a) => a ? { ...a, status } : null);
      fetchAffiliators();
    } else {
      toast.error(res.error || "Gagal mengubah status.");
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Hapus pendaftaran ini?")) return;
    const res = await deleteAffiliateApplication(id);
    if (res.success) {
      toast.success("Pendaftaran dihapus.");
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } else {
      toast.error("Gagal menghapus.");
    }
  };

  // ── Lead actions ──
  const fetchLeads = async () => {
    setLeadsLoading(true);
    const res = await getAffiliateLeads(leadStatusFilter !== "all" ? leadStatusFilter : undefined);
    if (res.success) setLeads((res.data as AffiliateLead[]) ?? []);
    setLeadsLoading(false);
  };

  const handleLeadStatus = async (id: string, status: string) => {
    const res = await updateAffiliateLeadStatus(id, status);
    if (res.success) {
      toast.success("Status permintaan diperbarui.");
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    } else {
      toast.error(res.error || "Gagal mengubah status.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Hapus permintaan ini?")) return;
    const res = await deleteAffiliateLead(id);
    if (res.success) {
      toast.success("Permintaan dihapus.");
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } else {
      toast.error("Gagal menghapus.");
    }
  };

  useEffect(() => {
    if (tab === "posts") fetchPosts();
    if (tab === "pendaftaran") fetchApplications();
    if (tab === "affiliators") fetchAffiliators();
    if (tab === "permintaan") fetchLeads();
  }, [tab]);

  useEffect(() => {
    if (tab === "permintaan") fetchLeads();
  }, [leadStatusFilter]);

  // Auto-load applications and affiliators on first mount
  useEffect(() => {
    fetchApplications();
    fetchAffiliators();
  }, []);

  const handleDeletePost = async (id: string) => {
    if (!confirm("Hapus post ini?")) return;
    const res = await deleteAffiliatePost(id);
    if (res.success) {
      toast.success("Post berhasil dihapus");
      setPosts((p) => p.filter((post) => post.id !== id));
    } else {
      toast.error("Gagal menghapus post");
    }
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    const res = await togglePostPublish(id, current);
    if (res.success) {
      toast.success(current ? "Post dijadikan draft" : "Post dipublikasikan");
      setPosts((p) =>
        p.map((post) =>
          post.id === id ? { ...post, isPublished: !current } : post
        )
      );
    } else {
      toast.error("Gagal mengubah status post");
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.caption.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.hashtags.some((h) => h.toLowerCase().includes(postSearch.toLowerCase()))
  );
  const publishedCount = posts.filter((p) => p.isPublished).length;
  const draftCount = posts.filter((p) => !p.isPublished).length;

  // Lock body scroll when modal open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#3B2211]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.4em]">
            Partnership Engine
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3B2211] flex items-center justify-center text-white shadow-xl shadow-[#3B2211]/20">
              <HeartHandshake size={24} />
            </div>
            <h1
              className="text-4xl font-black text-[#3B2211] tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Kelola Affiliasi
            </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">
            Kelola partner affiliate, kode referral, dan konten promosi untuk di-share.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {tab === "affiliators" ? (
            <button
              onClick={openAdd}
              className="flex items-center gap-3 px-8 py-4 bg-[#3B2211] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus size={16} />
              Tambah Affiliator
            </button>
          ) : (
            <button
              onClick={() => { setEditingPost(null); setShowPostModal(true); }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C88A58] to-[#3B2211] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Camera size={16} />
              Buat Post Baru
            </button>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-[#F8F6F4] p-1.5 rounded-2xl w-fit flex-wrap">
        <button
          onClick={() => setTab("pendaftaran")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === "pendaftaran"
              ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
              : "text-gray-400 hover:text-[#3B2211]"
          }`}
        >
          <AlertCircle size={14} />
          Pendaftaran Baru
          {applications.filter((a) => a.status === "pending").length > 0 && (
            <span className={`ml-1 px-2 py-0.5 rounded-full text-[8px] font-black ${
              tab === "pendaftaran" ? "bg-white/20 text-white" : "bg-amber-500 text-white"
            }`}>
              {applications.filter((a) => a.status === "pending").length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("affiliators")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === "affiliators"
              ? "bg-[#3B2211] text-white shadow-lg shadow-[#3B2211]/20"
              : "text-gray-400 hover:text-[#3B2211]"
          }`}
        >
          <Users size={14} />
          Daftar Affiliator
        </button>
        <button
          onClick={() => setTab("posts")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === "posts"
              ? "bg-gradient-to-r from-[#C88A58] to-[#3B2211] text-white shadow-lg shadow-[#3B2211]/20"
              : "text-gray-400 hover:text-[#3B2211]"
          }`}
        >
          <Layers size={14} />
          Konten Post
          {posts.length > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-[8px]">
              {posts.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab("permintaan")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            tab === "permintaan"
              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
              : "text-gray-400 hover:text-[#3B2211]"
          }`}
        >
          <Send size={14} />
          Permintaan
          {leads.filter((l) => l.status === "pending").length > 0 && (
            <span className={`ml-1 px-2 py-0.5 rounded-full text-[8px] font-black ${
              tab === "permintaan" ? "bg-white/20 text-white" : "bg-blue-500 text-white"
            }`}>
              {leads.filter((l) => l.status === "pending").length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* ════════════ AFFILIATORS TAB ════════════ */}
        {tab === "affiliators" && (
          <motion.div
            key="affiliators"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* ── Stats ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Affiliator", value: stats.total, icon: Users, color: "text-[#3B2211]", bg: "bg-gray-100" },
                { label: "Aktif", value: stats.active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Pending Review", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                {
                  label: "Total Komisi Dibayar",
                  value: `Rp ${stats.totalEarnings.toLocaleString("id-ID")}`,
                  icon: DollarSign,
                  color: "text-[#C88A58]",
                  bg: "bg-[#C88A58]/10",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-7 bg-white rounded-2xl border border-white shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
                >
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4`}>
                    <stat.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <span className="text-3xl font-black text-[#3B2211] tracking-tighter">
                      {stat.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Filters ── */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-[380px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari nama, nomor, atau kode referral..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2211]/5 shadow-sm"
                />
              </div>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                {(["all", "active", "pending", "inactive"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                      statusFilter === s
                        ? "bg-[#3B2211] text-white shadow-sm"
                        : "text-gray-400 hover:text-[#3B2211]"
                    }`}
                  >
                    {s === "all" ? "Semua" : STATUS_CONFIG[s].label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Table ── */}
            <div className="bg-white rounded-2xl border border-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F8F6F4]/50 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                      <th className="px-8 py-5 font-black">Affiliator</th>
                      <th className="px-8 py-5 font-black">Kontak</th>
                      <th className="px-8 py-5 font-black">Kode Referral</th>
                      <th className="px-8 py-5 font-black text-center">Referrals</th>
                      <th className="px-8 py-5 font-black text-right">Total Komisi</th>
                      <th className="px-8 py-5 font-black text-center">Status</th>
                      <th className="px-8 py-5 font-black text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F8F6F4] text-sm">
                    <AnimatePresence mode="popLayout">
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <AlertCircle size={32} className="text-gray-200" />
                              <p className="text-sm font-black text-gray-300 uppercase tracking-widest">
                                Tidak ada data affiliator
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filtered.map((a) => {
                          const status = STATUS_CONFIG[a.status];
                          const StatusIcon = status.icon;
                          return (
                            <motion.tr
                              key={a.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="group hover:bg-[#F8F6F4]/30 transition-colors"
                            >
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-[#3B2211]/5 flex items-center justify-center text-[#3B2211] font-black text-xs">
                                    {a.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#3B2211]">{a.name}</p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase">
                                      Bergabung{" "}
                                      {new Date(a.joinDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                    {a.notes && (
                                      <p className="text-[9px] text-[#C88A58] font-bold italic mt-0.5">
                                        {a.notes}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-5">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                                    <Phone size={11} className="text-gray-300" />
                                    {a.phone}
                                  </div>
                                  {a.instagram && (
                                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                                      <AtSign size={11} className="text-gray-300" />
                                      {a.instagram}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-1">
                                  <span className="font-black text-[#3B2211] tracking-widest text-sm bg-[#3B2211]/5 px-3 py-1.5 rounded-lg">
                                    {a.referralCode}
                                  </span>
                                  <CopyButton text={a.referralCode} />
                                </div>
                              </td>
                              <td className="px-8 py-5 text-center">
                                <span className="text-lg font-black text-[#3B2211]">
                                  {a.totalReferrals}
                                </span>
                                <span className="block text-[9px] text-gray-400 font-bold uppercase">
                                  transaksi
                                </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <span className="font-black text-[#3B2211]">
                                  Rp {a.totalEarnings.toLocaleString("id-ID")}
                                </span>
                              </td>
                              <td className="px-8 py-5">
                                <div className="flex justify-center">
                                  <div
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${status.className}`}
                                  >
                                    <StatusIcon size={11} />
                                    {status.label}
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className="relative flex justify-end">
                                  <button
                                    onClick={() =>
                                      setActiveMenu(activeMenu === a.id ? null : a.id)
                                    }
                                    className="p-2 hover:bg-[#3B2211]/5 rounded-xl transition-colors text-gray-300 hover:text-[#3B2211]"
                                  >
                                    <MoreVertical size={16} />
                                  </button>
                                  <AnimatePresence>
                                    {activeMenu === a.id && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: -8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -8 }}
                                        className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-2xl shadow-[#3B2211]/15 border border-[#3B2211]/5 z-50 overflow-hidden"
                                      >
                                        <button
                                          onClick={() => openEdit(a)}
                                          className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase text-left hover:bg-[#F8F6F4] text-[#3B2211] transition-colors tracking-widest"
                                        >
                                          <Edit2 size={13} /> Edit Data
                                        </button>
                                        {a.status !== "active" && (
                                          <button
                                            onClick={() => handleStatusChange(a.id, "active")}
                                            className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase text-left hover:bg-emerald-50 text-emerald-600 transition-colors tracking-widest"
                                          >
                                            <CheckCircle2 size={13} /> Aktifkan
                                          </button>
                                        )}
                                        {a.status !== "inactive" && (
                                          <button
                                            onClick={() => handleStatusChange(a.id, "inactive")}
                                            className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase text-left hover:bg-amber-50 text-amber-600 transition-colors tracking-widest"
                                          >
                                            <XCircle size={13} /> Nonaktifkan
                                          </button>
                                        )}
                                        <div className="h-px bg-[#3B2211]/5 mx-4" />
                                        <button
                                          onClick={() => handleDelete(a.id)}
                                          className="w-full flex items-center gap-3 px-5 py-3.5 text-[11px] font-black uppercase text-left hover:bg-rose-50 text-rose-500 transition-colors tracking-widest"
                                        >
                                          <Trash2 size={13} /> Hapus
                                        </button>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* ════════════ PENDAFTARAN TAB ════════════ */}
        {tab === "pendaftaran" && (
          <motion.div
            key="pendaftaran"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {([
                { label: "Total Masuk", value: applications.length, icon: Users, color: "text-[#3B2211]", bg: "bg-[#3B2211]/5" },
                { label: "Menunggu Review", value: applications.filter(a => a.status === "pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Disetujui", value: applications.filter(a => a.status === "approved").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              ] as const).map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 bg-white rounded-2xl border border-white shadow-sm flex items-center gap-5"
                >
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">{s.label}</p>
                    <span className="text-3xl font-black text-[#3B2211] tracking-tighter">{s.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Filter */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
              {(["all", "pending", "approved", "rejected"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setAppStatusFilter(s)}
                  className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    appStatusFilter === s
                      ? "bg-[#3B2211] text-white shadow-sm"
                      : "text-gray-400 hover:text-[#3B2211]"
                  }`}
                >
                  {s === "all" ? "Semua" : APP_STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>

            {/* Table & Detail Split View */}
            <div className={`grid ${selectedApp ? "grid-cols-5" : "grid-cols-1"} gap-6`}>
              {/* Table */}
              <div className={`${selectedApp ? "col-span-3" : "col-span-1"} bg-white rounded-2xl border border-white shadow-sm overflow-hidden`}>
                {appsLoading ? (
                  <div className="py-20 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#F8F6F4]/50 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                          <th className="px-6 py-5 font-black">Pendaftar</th>
                          <th className="px-6 py-5 font-black">Kontak</th>
                          <th className="px-6 py-5 font-black">Tanggal Daftar</th>
                          <th className="px-6 py-5 font-black text-center">Status</th>
                          <th className="px-6 py-5 font-black text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F8F6F4] text-sm">
                        {applications
                          .filter(a => appStatusFilter === "all" || a.status === appStatusFilter)
                          .length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-8 py-20 text-center">
                              <div className="flex flex-col items-center gap-3">
                                <AlertCircle size={32} className="text-gray-200" />
                                <p className="text-sm font-black text-gray-300 uppercase tracking-widest">Tidak ada pendaftaran</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          applications
                            .filter(a => appStatusFilter === "all" || a.status === appStatusFilter)
                            .map((app) => {
                              const cfg = APP_STATUS_CONFIG[app.status as keyof typeof APP_STATUS_CONFIG] ?? APP_STATUS_CONFIG.pending;
                              const StatusIcon = cfg.icon;
                              const isSelected = selectedApp?.id === app.id;
                              return (
                                <tr
                                  key={app.id}
                                  onClick={() => setSelectedApp(isSelected ? null : app)}
                                  className={`cursor-pointer transition-colors ${
                                    isSelected ? "bg-amber-50 border-l-4 border-l-amber-500" : "hover:bg-[#F8F6F4]/30"
                                  }`}
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl bg-[#3B2211]/5 flex items-center justify-center text-[#3B2211] font-black text-xs flex-shrink-0">
                                        {app.name.slice(0, 2).toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-bold text-[#3B2211] text-sm">{app.name}</p>
                                        {app.occupation && (
                                          <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">{app.occupation.replace("_", " ")}</p>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                                        <Phone size={10} className="text-gray-300" />
                                        {app.phone}
                                      </div>
                                      {app.instagram && (
                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                                          <AtSign size={10} className="text-gray-300" />
                                          {app.instagram}
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="text-[10px] text-gray-500 font-bold">
                                      {new Date(app.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest ${cfg.className}`}>
                                        <StatusIcon size={10} />
                                        {cfg.label}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                      {app.status === "pending" && (
                                        <>
                                          <button
                                            onClick={() => handleAppStatus(app.id, "approved")}
                                            className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                            title="Setujui"
                                          >
                                            <CheckCircle2 size={15} />
                                          </button>
                                          <button
                                            onClick={() => handleAppStatus(app.id, "rejected")}
                                            className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-colors"
                                            title="Tolak"
                                          >
                                            <XCircle size={15} />
                                          </button>
                                        </>
                                      )}

                                      <button
                                        onClick={() => handleDeleteApp(app.id)}
                                        className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Hapus"
                                      >
                                        <Trash2 size={15} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Detail Panel */}
              <AnimatePresence>
                {selectedApp && (
                  <motion.div
                    key={selectedApp.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="col-span-2 bg-white rounded-2xl border border-white shadow-sm p-6 space-y-5 self-start sticky top-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-[#3B2211]/5 flex items-center justify-center text-[#3B2211] font-black text-lg mb-3">
                          {selectedApp.name.slice(0, 2).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-black text-[#3B2211]">{selectedApp.name}</h3>
                        {selectedApp.occupation && (
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {selectedApp.occupation.replace("_", " ")}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedApp(null)}
                        className="p-2 text-gray-300 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-xl"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {([
                        { label: "Email", value: selectedApp.email },
                        { label: "WhatsApp", value: selectedApp.phone },
                        { label: "Instagram", value: selectedApp.instagram },
                        { label: "TikTok", value: selectedApp.tiktok },
                        { label: "Kota", value: selectedApp.city },
                      ] as const).filter(i => i.value).map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between gap-3">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest w-20 flex-shrink-0">{label}</span>
                          <span className="text-xs font-bold text-[#3B2211] text-right">{value}</span>
                        </div>
                      ))}
                    </div>

                    {selectedApp.motivation && (
                      <div className="bg-[#F8F6F4] rounded-xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Motivasi</p>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{selectedApp.motivation}</p>
                      </div>
                    )}
                    {selectedApp.experience && (
                      <div className="bg-[#F8F6F4] rounded-xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Pengalaman</p>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{selectedApp.experience}</p>
                      </div>
                    )}

                    {selectedApp.status === "pending" && (
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleAppStatus(selectedApp.id, "approved")}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          <CheckCircle2 size={13} /> Setujui
                        </button>
                        <button
                          onClick={() => handleAppStatus(selectedApp.id, "rejected")}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          <XCircle size={13} /> Tolak
                        </button>
                      </div>
                    )}
                    <a
                      href={`https://wa.me/${selectedApp.phone.replace(/^0/, "62").replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Phone size={13} /> Hubungi via WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ════════════ POSTS TAB ════════════ */}
        {tab === "posts" && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Post Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                {
                  label: "Total Post",
                  value: posts.length,
                  icon: Layers,
                  color: "text-[#3B2211]",
                  bg: "bg-[#3B2211]/5",
                },
                {
                  label: "Dipublikasi",
                  value: publishedCount,
                  icon: Eye,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Draft",
                  value: draftCount,
                  icon: EyeOff,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 bg-white rounded-2xl border border-white shadow-sm flex items-center gap-5 hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
                >
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {s.label}
                    </p>
                    <span className="text-3xl font-black text-[#3B2211] tracking-tighter">
                      {s.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Cari caption atau hashtag..."
                  value={postSearch}
                  onChange={(e) => setPostSearch(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#3B2211]/5 shadow-sm"
                />
              </div>
            </div>

            {/* Posts Grid */}
            {postsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl overflow-hidden animate-pulse"
                  >
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F8F6F4]">
                      <div className="w-9 h-9 rounded-full bg-gray-100" />
                      <div className="space-y-1 flex-1">
                        <div className="h-2.5 bg-gray-100 rounded w-2/3" />
                        <div className="h-2 bg-gray-100 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="aspect-square bg-gray-100" />
                    <div className="p-4 space-y-2">
                      <div className="h-2.5 bg-gray-100 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-32 flex flex-col items-center gap-6 text-center bg-white rounded-3xl border border-[#3B2211]/5">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#C88A58]/10 to-[#3B2211]/10 flex items-center justify-center">
                  <Camera size={36} className="text-[#3B2211]/20" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3B2211]/30 uppercase tracking-widest">
                    {postSearch ? "Tidak ada post ditemukan" : "Belum ada konten post"}
                  </p>
                  <p className="text-xs text-gray-300 font-medium mt-2">
                    {postSearch
                      ? "Coba kata kunci lain"
                      : "Klik \"Buat Post Baru\" untuk membuat konten pertama"}
                  </p>
                </div>
                {!postSearch && (
                  <button
                    onClick={() => { setEditingPost(null); setShowPostModal(true); }}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C88A58] to-[#3B2211] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] transition-all"
                  >
                    <Camera size={15} />
                    Buat Post Pertama
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onEdit={(p) => { setEditingPost(p); setShowPostModal(true); }}
                      onDelete={handleDeletePost}
                      onTogglePublish={handleTogglePublish}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* ════════════ PERMINTAAN (LEADS) TAB ════════════ */}
        {tab === "permintaan" && (
          <motion.div
            key="permintaan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Leads Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Permintaan", value: leads.length, icon: Send, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Menunggu Follow-up", value: leads.filter(l => l.status === "pending").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Sedang Dihubungi", value: leads.filter(l => l.status === "followed_up").length, icon: AtSign, color: "text-indigo-600", bg: "bg-indigo-50" },
                { label: "Closed / Deal", value: leads.filter(l => l.status === "closed").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 bg-white rounded-2xl border border-white shadow-sm flex items-center gap-5 hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
                >
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
                    <s.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {s.label}
                    </p>
                    <span className="text-3xl font-black text-[#3B2211] tracking-tighter">
                      {s.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Filter Buttons */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
              {(["all", "pending", "followed_up", "closed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setLeadStatusFilter(s)}
                  className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    leadStatusFilter === s
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-400 hover:text-[#3B2211]"
                  }`}
                >
                  {s === "all" ? "Semua" : s === "pending" ? "Menunggu" : s === "followed_up" ? "Followed Up" : "Closed / Deal"}
                </button>
              ))}
            </div>

            {/* Table & Detail Split View */}
            <div className={`grid ${selectedLead ? "grid-cols-5" : "grid-cols-1"} gap-6`}>
              {/* Table */}
              <div className={`${selectedLead ? "col-span-3" : "col-span-1"} bg-white rounded-2xl border border-white shadow-sm overflow-hidden`}>
                {leadsLoading ? (
                  <div className="py-20 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#F8F6F4]/50 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
                          <th className="px-6 py-5 font-black">Lead / Calon</th>
                          <th className="px-6 py-5 font-black">Program / Tipe</th>
                          <th className="px-6 py-5 font-black">Referral</th>
                          <th className="px-6 py-5 font-black text-center">Status</th>
                  <th className="px-6 py-5 font-black text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F8F6F4] text-sm">
                        {leads
                          .filter(l => leadStatusFilter === "all" || l.status === leadStatusFilter)
                          .length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-8 py-20 text-center">
                              <div className="flex flex-col items-center gap-3">
                                <AlertCircle size={32} className="text-gray-200" />
                                <p className="text-sm font-black text-gray-300 uppercase tracking-widest">Tidak ada permintaan</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          leads
                            .filter(l => leadStatusFilter === "all" || l.status === leadStatusFilter)
                            .map((lead) => {
                              const isAffProduct = lead.productSku && !lead.productSku.startsWith("pkg-");
                              const leadTypeLabel = isAffProduct ? "Pelatihan" : "Foto Studio";
                              const leadTypeColor = isAffProduct 
                                ? "bg-purple-50 text-purple-600 border-purple-200" 
                                : "bg-orange-50 text-orange-600 border-orange-200";

                              const cfg = lead.status === "closed"
                                ? { label: "Closed", icon: CheckCircle2, className: "text-emerald-600 bg-emerald-50 border-emerald-200" }
                                : lead.status === "followed_up"
                                ? { label: "Followed Up", icon: AtSign, className: "text-blue-600 bg-blue-50 border-blue-200" }
                                : { label: "Menunggu", icon: Clock, className: "text-amber-600 bg-amber-50 border-amber-200" };

                              const StatusIcon = cfg.icon;
                              const isSelected = selectedLead?.id === lead.id;

                              return (
                                <tr
                                  key={lead.id}
                                  onClick={() => setSelectedLead(isSelected ? null : lead)}
                                  className={`cursor-pointer transition-colors ${
                                    isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-[#F8F6F4]/30"
                                  }`}
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs flex-shrink-0">
                                        {lead.name.slice(0, 2).toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-bold text-[#3B2211] text-sm">{lead.name}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{lead.phone}</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div>
                                      <p className="font-bold text-[#3B2211] text-xs max-w-[180px] truncate">{lead.productName || "General Link"}</p>
                                      <span className={`inline-block px-1.5 py-0.5 rounded border text-[8px] font-black uppercase mt-1 ${leadTypeColor}`}>
                                        {leadTypeLabel}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    {lead.referralCode ? (
                                      <span className="font-black text-[#C88A58] bg-[#C88A58]/5 px-2 py-1 rounded text-xs font-mono">
                                        @{lead.referralCode}
                                      </span>
                                    ) : (
                                      <span className="text-gray-400 text-xs font-medium">-</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${cfg.className}`}>
                                        <StatusIcon size={9} />
                                        {cfg.label}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                                      {lead.status !== "closed" && (
                                        <button
                                          onClick={() => handleLeadStatus(lead.id, "closed")}
                                          className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                                          title="Mark Closed / Deal"
                                        >
                                          <CheckCircle2 size={14} />
                                        </button>
                                      )}
                                      {lead.status === "pending" && (
                                        <button
                                          onClick={() => handleLeadStatus(lead.id, "followed_up")}
                                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                          title="Mark Followed Up"
                                        >
                                          <AtSign size={14} />
                                        </button>
                                      )}
                                      <button
                                        onClick={() => handleDeleteLead(lead.id)}
                                        className="p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Hapus"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Detail Panel */}
              <AnimatePresence>
                {selectedLead && (
                  <motion.div
                    key={selectedLead.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="col-span-2 bg-white rounded-2xl border border-white shadow-sm p-6 space-y-5 self-start sticky top-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg mb-3">
                          {selectedLead.name.slice(0, 2).toUpperCase()}
                        </div>
                        <h3 className="text-lg font-black text-[#3B2211]">{selectedLead.name}</h3>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                          Permintaan Masuk: {new Date(selectedLead.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedLead(null)}
                        className="p-2 text-gray-300 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-xl"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {([
                        { label: "Nomor WhatsApp", value: selectedLead.phone },
                        { label: "Email", value: selectedLead.email || "-" },
                        { label: "Kota Domisili", value: selectedLead.city || "-" },
                        { label: "Pekerjaan", value: selectedLead.occupation || "-" },
                        { label: "Kode Referral", value: selectedLead.referralCode ? `@${selectedLead.referralCode}` : "-" },
                        { label: "Layanan/Paket", value: selectedLead.productName || "General Link" },
                        { label: "SKU Produk", value: selectedLead.productSku || "-" },
                      ] as const).map(({ label, value }) => (
                        <div key={label} className="flex items-center justify-between gap-3 text-xs">
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest w-24 flex-shrink-0">{label}</span>
                          <span className="text-xs font-bold text-[#3B2211] text-right">{value}</span>
                        </div>
                      ))}
                    </div>

                    {selectedLead.notes && (
                      <div className="bg-[#F8F6F4] rounded-xl p-4">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Catatan Pendaftar</p>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{selectedLead.notes}</p>
                      </div>
                    )}

                    <div className="space-y-2 pt-2">
                      {/* Update Status Actions */}
                      <div className="flex gap-2">
                        {selectedLead.status === "pending" && (
                          <button
                            onClick={() => handleLeadStatus(selectedLead.id, "followed_up")}
                            className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            <AtSign size={13} /> Followed Up
                          </button>
                        )}
                        {selectedLead.status !== "closed" && (
                          <button
                            onClick={() => handleLeadStatus(selectedLead.id, "closed")}
                            className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            <CheckCircle2 size={13} /> Closed / Deal
                          </button>
                        )}
                      </div>

                      {/* WhatsApp Quick Action */}
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/^0/, "62").replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Halo ${selectedLead.name}! Saya Admin Snapp.frame ingin menindaklanjuti pendaftaran Anda untuk program ${selectedLead.productName || "kemitraan"}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#22c55e] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-center"
                      >
                        <Phone size={13} /> Hubungi via WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Affiliator Add/Edit Modal ── */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col"
                style={{ maxHeight: "calc(100vh - 3rem)" }}
              >
                <div className="flex items-center justify-between px-8 py-5 border-b border-[#3B2211]/5 flex-shrink-0">
                  <div>
                    <h2 className="text-lg font-black text-[#3B2211]">
                      {editingItem ? "Edit Affiliator" : "Tambah Affiliator Baru"}
                    </h2>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                      {editingItem ? `ID: ${editingItem.id}` : "Data affiliator baru"}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-300 hover:text-[#3B2211] hover:bg-[#3B2211]/5 rounded-xl transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-4">
                  {[
                    { label: "Nama Lengkap *", key: "name", placeholder: "Nama lengkap affiliator" },
                    { label: "Nomor WhatsApp *", key: "phone", placeholder: "08xxxxxxxxxx" },
                    { label: "Email *", key: "email", placeholder: "email@gmail.com" },
                    { label: "Kode Referral *", key: "referralCode", placeholder: "NAMA10" },
                    { label: "Nama Bank", key: "bankName", placeholder: "Contoh: BCA, Mandiri" },
                    { label: "Nomor Rekening", key: "bankAccount", placeholder: "1234567890" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={(form as any)[key] || ""}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-5 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                        Komisi Marketer (%)
                      </label>
                      <input
                        type="number"
                        value={(form as any).feePercentage ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, feePercentage: parseFloat(e.target.value) || 0 }))}
                        placeholder="10"
                        className="w-full px-5 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                        Diskon Customer (%)
                      </label>
                      <input
                        type="number"
                        value={(form as any).discountPct ?? ""}
                        onChange={(e) => setForm((f) => ({ ...f, discountPct: parseFloat(e.target.value) || 0 }))}
                        placeholder="10"
                        className="w-full px-5 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all"
                      />
                    </div>
                  </div>
                  {!editingItem && (
                    <div>
                      <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                        Kata Sandi Login *
                      </label>
                      <input
                        type="password"
                        value={(form as any).password || ""}
                        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        placeholder="Minimal 6 karakter"
                        className="w-full px-5 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                      Status
                    </label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                      className="w-full px-5 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all"
                    >
                      <option value="active">Aktif</option>
                      <option value="inactive">Nonaktif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-[#3B2211] uppercase tracking-widest mb-2">
                      Catatan
                    </label>
                    <textarea
                      value={form.notes || ""}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      placeholder="Catatan internal..."
                      rows={3}
                      className="w-full px-5 py-3.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#3B2211]/10 transition-all resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 px-8 py-5 border-t border-[#3B2211]/5 bg-[#F8F6F4]/50 flex-shrink-0 rounded-b-3xl">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-[#3B2211]/10 text-[11px] font-black uppercase tracking-widest text-[#3B2211]/40 hover:text-[#3B2211] hover:border-[#3B2211]/20 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!form.name || !form.phone || !form.referralCode || !form.email || (!editingItem && !(form as any).password)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#3B2211] text-white text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-xl shadow-[#3B2211]/20"
                  >
                    <Save size={14} />
                    {editingItem ? "Simpan Perubahan" : "Tambah Affiliator"}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Post Create/Edit Modal ── */}
      <AnimatePresence>
        {showPostModal && (
          <PostModal
            editing={editingPost}
            onClose={() => { setShowPostModal(false); setEditingPost(null); }}
            onSaved={fetchPosts}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

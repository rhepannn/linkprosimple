"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Coffee, Presentation, Recycle, MonitorPlay, GraduationCap,
  Users, Building, ShoppingBag, Handshake, BadgeDollarSign,
  TrendingUp, Award, CheckCircle2, ArrowRight, X, Search,
  ArrowLeft, MessageCircle, Heart, Copy, Check, Share2,
  Calendar, Sparkles, Package, Eye, EyeOff, ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getAffiliatePosts } from "@/app/actions/affiliate-posts";
import { getSiteSettings } from "@/app/actions/settings";
import { getProducts } from "@/app/actions/products";
import { toast } from "sonner";

// ─── ICON MAP BY KEYWORD ─────────────────────────────────────────────────────
const ICON_MAP: Record<string, any> = {
  academic: GraduationCap, career: Award, entrepreneur: TrendingUp,
  launchpad: TrendingUp, bisapreneur: Building, barista: Coffee,
  cuan: MonitorPlay, tekno: Presentation, mental: Users, bahasa: Users,
  green: Recycle, brand: ShoppingBag, standara: Handshake,
};

function getIcon(programName: string) {
  const lower = programName.toLowerCase();
  for (const [key, Icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return Icon;
  }
  return Package;
}

// ─── GROUP DB PRODUCTS BY PROGRAM NAME ───────────────────────────────────────
function groupProducts(dbProducts: any[]) {
  const grouped: Record<string, {
    name: string; icon: any; desc: string; image: string | null;
    packages: { name: string; price: string; commission: string; duration: string; features: string[] }[];
  }> = {};

  const sorted = [...dbProducts].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  for (const p of sorted) {
    let programName: string;
    let packageName: string;

    if (p.name.includes(" - ")) {
      const idx = p.name.indexOf(" - ");
      programName = p.name.substring(0, idx).trim();
      packageName = p.name.substring(idx + 3).trim();
    } else {
      programName = p.name.trim();
      packageName = "Paket Utama";
    }

    if (!grouped[programName]) {
      grouped[programName] = {
        name: programName,
        icon: getIcon(programName),
        desc: p.details || `Program unggulan ${programName} untuk pengembangan profesional.`,
        image: p.image || null,
        packages: [],
      };
    }

    // Prefer first non-null image
    if (!grouped[programName].image && p.image) {
      grouped[programName].image = p.image;
    }

    grouped[programName].packages.push({
      name: packageName,
      price: `Rp ${Number(p.price).toLocaleString("id-ID")}`,
      commission: p.photoCount || "Sesuai Ketentuan",
      duration: p.duration || "",
      features: Array.isArray(p.features) ? p.features : [],
    });
  }

  return Object.values(grouped);
}

// ─── REGISTER MODAL ───────────────────────────────────────────────────────────
function RegisterModal({ onClose, settings = {} }: { onClose: () => void; settings?: Record<string, string> }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "",
    instagram: "", tiktok: "", occupation: "", city: "",
    motivation: "", experience: "",
  });

  const set = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Nama, email, nomor WhatsApp, dan kata sandi wajib diisi.");
      return;
    }
    if (form.password.length < 6) { setError("Kata sandi minimal 6 karakter."); return; }
    setError("");
    setLoading(true);
    const { submitAffiliateApplication } = await import("@/app/actions/affiliate-applications");
    const res = await submitAffiliateApplication(form);
    setLoading(false);
    if (res.success) setStep("success");
    else setError(res.error ?? "Terjadi kesalahan. Coba lagi.");
  };

  const cls = "w-full px-4 py-3 bg-white border border-near-black/10 rounded-xl text-xs font-bold text-near-black focus:outline-none focus:ring-2 focus:ring-[#004aad]/30 focus:border-[#004aad] transition-all placeholder:text-near-black/30";
  const lbl = "block text-[10px] font-black uppercase tracking-wider text-near-black/60 mb-1.5";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-near-black/80 backdrop-blur-sm" />
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-near-black/10 overflow-hidden shadow-2xl text-near-black flex flex-col"
        style={{ maxHeight: "92vh" }}>
        <div className="flex-shrink-0 flex justify-between items-center px-6 pt-6 pb-4 border-b border-near-black/5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-near-black">Formulir Pendaftaran Affiliate</h3>
            <p className="text-[10px] text-near-black/40 font-bold mt-0.5">Isi data diri kamu untuk bergabung sebagai partner</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-near-black/5 flex items-center justify-center text-near-black/40 hover:text-near-black transition-all"><X size={16} /></button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {step === "success" ? (
            <div className="flex flex-col items-center justify-center gap-5 px-8 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-black text-near-black mb-2">Pendaftaran Berhasil! 🎉</h4>
                <p className="text-xs text-near-black/60 font-bold leading-relaxed max-w-xs">
                  Data kamu sudah kami terima. Tim kami akan menghubungi kamu via WhatsApp dalam 1×24 jam.
                </p>
              </div>
              <div className="flex gap-3 w-full">
                <button onClick={onClose} className="flex-1 py-3 border border-near-black/10 text-near-black/50 rounded-xl text-xs font-black uppercase tracking-wider hover:border-near-black/20 transition-all">Tutup</button>
                <a href={`https://wa.me/${settings.affiliate_whatsapp || settings.contact_wa || ""}?text=${encodeURIComponent(`Halo Link Productive! Saya ${form.name} baru saja mendaftar sebagai affiliate partner.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-[2] flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all">
                  <MessageCircle size={14} /> Hubungi via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4 px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#004aad]">Data Diri</p>
              <div>
                <label className={lbl}>Nama Lengkap <span className="text-rose-400">*</span></label>
                <input type="text" placeholder="Masukkan nama lengkap" value={form.name} onChange={(e) => set("name", e.target.value)} className={cls} />
              </div>
              <div>
                <label className={lbl}>Email <span className="text-rose-400">*</span></label>
                <input type="email" placeholder="nama@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={cls} />
              </div>
              <div>
                <label className={lbl}>No. WhatsApp <span className="text-rose-400">*</span></label>
                <input type="tel" placeholder="081234567890" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={cls} />
              </div>
              <div>
                <label className={lbl}>Kata Sandi Akun <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Minimal 6 karakter" value={form.password} onChange={(e) => set("password", e.target.value)} className={cls + " pr-10"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-near-black/30 hover:text-near-black cursor-pointer">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Kota</label>
                  <input type="text" placeholder="Contoh: Serang" value={form.city} onChange={(e) => set("city", e.target.value)} className={cls} />
                </div>
                <div>
                  <label className={lbl}>Pekerjaan</label>
                  <select value={form.occupation} onChange={(e) => set("occupation", e.target.value)} className={cls + " cursor-pointer"}>
                    <option value="">Pilih pekerjaan</option>
                    {["pelajar", "mahasiswa", "karyawan", "freelancer", "wirausaha", "konten_kreator", "lainnya"].map(o => (
                      <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1).replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#004aad] pt-2">Media Sosial</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Instagram</label>
                  <input type="text" placeholder="@username" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} className={cls} />
                </div>
                <div>
                  <label className={lbl}>TikTok</label>
                  <input type="text" placeholder="@username" value={form.tiktok} onChange={(e) => set("tiktok", e.target.value)} className={cls} />
                </div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#004aad] pt-2">Latar Belakang</p>
              <div>
                <label className={lbl}>Mengapa ingin bergabung?</label>
                <textarea placeholder="Ceritakan alasanmu..." value={form.motivation} onChange={(e) => set("motivation", e.target.value)} rows={3} className={cls + " resize-none"} />
              </div>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <X size={14} className="text-rose-500 flex-shrink-0" />
                  <p className="text-xs font-bold text-rose-600">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {step === "form" && (
          <div className="flex-shrink-0 px-6 pb-6 pt-4 border-t border-near-black/5">
            <button onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.phone || !form.password}
              className="w-full py-3.5 bg-near-black hover:bg-near-black/90 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-near-black/10 cursor-pointer flex items-center justify-center gap-2">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight size={14} /> Daftar Sekarang — Gratis!</>}
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── PROGRAM DETAIL FULL PAGE ─────────────────────────────────────────────────
function ProgramDetail({ program, onClose, onRegister }: { program: any; onClose: () => void; onRegister: () => void }) {
  const Icon = program.icon;
  return (
    <motion.div key="detail" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] bg-near-black overflow-y-auto">
      {/* Back Bar */}
      <div className="sticky top-0 z-10 bg-near-black/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={onClose} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-black text-[11px] uppercase tracking-widest">
          <ArrowLeft size={16} /> Kembali ke Daftar Program
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#004aad]/20 flex items-center justify-center text-[#004aad] flex-shrink-0">
            <Icon size={26} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-tight">{program.name}</h1>
            <p className="text-[11px] text-white/40 font-bold mt-1">{program.packages.length} Paket Tersedia</p>
          </div>
        </div>

        {/* Poster */}
        {program.image && (
          <div className="mb-8 max-w-xs mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <img src={program.image} alt={program.name} className="w-full object-cover" />
          </div>
        )}

        <div className="space-y-8">
          {/* Description */}
          {program.desc && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <p className="text-[13px] text-white/75 leading-relaxed whitespace-pre-line">{program.desc}</p>
            </div>
          )}

          {/* Packages */}
          <div>
            <h2 className="text-[11px] font-black text-[#004aad] uppercase tracking-widest mb-4">📦 Detail Paket & Komisi</h2>
            <div className="space-y-4">
              {program.packages.map((pkg: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-[13px] font-black text-white mb-4">{pkg.name}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-[9px] text-white/40 font-bold uppercase mb-1">Harga Program</p>
                      <p className="text-[12px] font-black text-white">{pkg.price}</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                      <p className="text-[9px] text-emerald-400 font-bold uppercase mb-1">Komisi Affiliate</p>
                      <p className="text-[12px] font-black text-emerald-400">{pkg.commission}</p>
                    </div>
                  </div>
                  {(pkg.duration || pkg.features?.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                      {pkg.duration && (
                        <p className="text-[11px] text-white/50 font-bold">⏱ Durasi: {pkg.duration}</p>
                      )}
                      {pkg.features?.length > 0 && (
                        <ul className="space-y-1.5">
                          {pkg.features.map((f: string, fi: number) => (
                            <li key={fi} className="flex items-start gap-2">
                              <CheckCircle2 size={12} className="text-[#004aad] flex-shrink-0 mt-0.5" />
                              <span className="text-[11px] text-white/60 font-medium">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button onClick={() => { onClose(); onRegister(); }}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#004aad] hover:bg-[#003984] text-white text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#004aad]/30">
            Daftar Affiliate Sekarang <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
function AffiliateContent() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [activeProgram, setActiveProgram] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"semua" | "kegiatan" | "promo">("semua");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const searchParams = useSearchParams();

  const filteredPrograms = programs.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-open program from URL param
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    if (pkg && programs.length > 0) {
      const found = programs.find((p) =>
        p.name.toLowerCase().replace(/\s+/g, "-") === pkg.toLowerCase() ||
        p.name.toLowerCase() === pkg.toLowerCase().replace(/-/g, " ")
      );
      if (found) setActiveProgram(found);
    }
  }, [searchParams, programs]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, settingsRes, productsRes] = await Promise.all([
          getAffiliatePosts(), getSiteSettings(), getProducts(),
        ]);

        if (settingsRes) setSettings(settingsRes);

        const raw = productsRes.success && Array.isArray(productsRes.data)
          ? productsRes.data.filter((p: any) => p.isActive)
          : [];
        setPrograms(groupProducts(raw));

        if (postsRes.success && Array.isArray(postsRes.data) && postsRes.data.length > 0) {
          const published = (postsRes.data as any[]).filter((p: any) => p.isPublished).map((p: any) => ({
            ...p,
            category: (p.hashtags || []).some((t: string) =>
              ["kegiatan", "gathering", "event"].includes(t.toLowerCase())
            ) || p.caption.toLowerCase().includes("kegiatan") ? "kegiatan" : "promo",
          }));
          setPosts(published);
        }
      } catch (err) {
        console.error("Gagal memuat data affiliate:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPosts((cur) => cur.map((p) => p.id === postId ? { ...p, likeCount: p.likeCount + (isLiked ? 1 : -1) } : p));
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleCopyCaption = (post: any) => {
    const text = `${post.caption}\n\n${(post.hashtags || []).map((h: string) => `#${h}`).join(" ")}`;
    navigator.clipboard.writeText(text);
    setCopiedPostId(post.id);
    toast.success("Caption berhasil disalin!");
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  const filteredPosts = posts.filter((p) => activeFilter === "semua" || p.category === activeFilter);

  return (
    <>
      <AnimatePresence>{showModal && <RegisterModal onClose={() => setShowModal(false)} settings={settings} />}</AnimatePresence>
      <AnimatePresence>
        {activeProgram && (
          <ProgramDetail program={activeProgram} onClose={() => setActiveProgram(null)} onRegister={() => setShowModal(true)} />
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-slate-50 overflow-x-hidden w-full">

        {/* ── Hero ── */}
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-gradient-to-br from-white via-sky-50/50 to-white text-slate-800 w-full border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.12),transparent_55%)] z-0 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-bold uppercase tracking-[0.15em]">
                <Sparkles size={12} className="animate-pulse" /> Program Kemitraan & Karir Mandiri
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Affiliate <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">Partner Portal</span>
              </h1>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                Bergabunglah bersama ekosistem <span className="text-sky-600 font-bold">Link Productive</span> dan bangun potensi penghasilan pasif tak terbatas setiap bulan.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="#programs" className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold uppercase tracking-wider text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-sky-500/20">
                  Lihat Program <ArrowRight size={14} />
                </a>
                <div className="flex items-center gap-3 bg-white border border-sky-100/60 rounded-2xl px-5 py-3 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider">Potensi Komisi</span>
                    <span className="text-lg font-black text-sky-600">Hingga Rp10 Juta/Bulan</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[420px] grid grid-cols-2 gap-4">
              {[
                { icon: Handshake, title: "Kerja Fleksibel", desc: "Mulai kapan saja, dari mana saja" },
                { icon: BadgeDollarSign, title: "Penghasilan Menarik", desc: "Komisi langsung cair per transaksi" },
                { icon: TrendingUp, title: "Pengembangan Karir", desc: "Asah kemampuan promosi digital" },
                { icon: Award, title: "Sertifikat Mitra", desc: "Sertifikat resmi affiliate partner" },
              ].map((f, i) => (
                <div key={i} className="bg-white border border-sky-100/60 rounded-3xl p-5 flex flex-col items-start text-left hover:border-sky-300 hover:shadow-xl transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 mb-4"><f.icon size={18} /></div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{f.title}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Program Cards (from DB) ── */}
        <section id="programs" className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#004aad]/10 border border-[#004aad]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#004aad]">
                <Sparkles size={12} /> Katalog Program Pelatihan
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Program yang Bisa Kamu <span className="text-sky-500">Promosikan</span>
              </h2>
              <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">Pilih program yang sesuai dengan audiensmu dan mulai raih komisi menarik.</p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-10 relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari program..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300 transition-all placeholder:text-slate-400" />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#004aad] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredPrograms.length === 0 ? (
              <div className="text-center py-16 text-slate-400 font-bold text-sm">
                {searchQuery ? "Program tidak ditemukan." : "Belum ada program aktif. Tambahkan dari halaman Admin → Manajemen Program."}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((prog, i) => {
                  const Icon = prog.icon;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      onClick={() => setActiveProgram(prog)}
                      className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 cursor-pointer group">
                      {prog.image ? (
                        <div className="aspect-video bg-slate-100 overflow-hidden">
                          <img src={prog.image} alt={prog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center">
                          <Icon size={40} className="text-sky-300" />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl bg-[#004aad]/10 flex items-center justify-center text-[#004aad] flex-shrink-0">
                            <Icon size={17} />
                          </div>
                          <h3 className="text-sm font-black text-slate-900 leading-tight">{prog.name}</h3>
                        </div>
                        {prog.desc && (
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 mb-4">{prog.desc}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{prog.packages.length} Paket</span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-sky-500 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                            Lihat Detail <ArrowRight size={10} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA Daftar ── */}
        <section className="bg-white text-slate-800 py-20 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="text-left flex-1 space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-outfit)" }}>
                Yuk, Gabung <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">Sekarang Juga!</span>
              </h2>
              <p className="text-slate-500 font-medium text-base leading-relaxed max-w-md">Bangun penghasilan pasif tambahan dan kembangkan skill pemasaran digitalmu bersama Link Productive!</p>
              <button onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold uppercase tracking-wider text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-sky-500/20 cursor-pointer">
                Daftar Gratis Sekarang <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex-1 bg-sky-50/20 border border-sky-100/60 rounded-[2rem] p-8 w-full shadow-sm">
              <div className="text-center mb-6">
                <span className="bg-sky-100 text-sky-600 border border-sky-200/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Cara Bergabung</span>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-between gap-4 sm:gap-2">
                {["Daftar via Formulir", "Dapatkan kode referral", "Promosikan program", "Terima komisi!"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                    <div className="w-10 h-10 bg-white border border-sky-100 rounded-full flex items-center justify-center font-black text-sky-500 mb-3 text-sm shadow-sm">{i + 1}</div>
                    <span className="text-[10px] font-bold text-slate-600 max-w-[90px]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Galeri & Materi Promosi ── */}
        <section className="py-20 bg-slate-50 border-y border-border/40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Galeri Kegiatan <span className="text-[#004aad]">& Materi</span>
              </h2>
              <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">Salin caption dan foto di bawah untuk dibagikan ke media sosialmu!</p>
            </div>
            <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
              {[{ id: "semua", label: "Semua" }, { id: "kegiatan", label: "Kegiatan" }, { id: "promo", label: "Promo" }].map((t) => (
                <button key={t.id} onClick={() => setActiveFilter(t.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${activeFilter === t.id ? "bg-near-black text-white border-near-black" : "bg-white text-near-black/60 border-near-black/10 hover:border-near-black/20 hover:text-near-black"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-slate-400 font-bold text-sm">Belum ada materi promosi.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const isLiked = likedPosts[post.id];
                  const isCopied = copiedPostId === post.id;
                  return (
                    <motion.div key={post.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-3xl border border-border/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#004aad] to-near-black flex items-center justify-center text-white font-black text-xs">LP</div>
                          <div>
                            <p className="text-xs font-black text-near-black leading-none">Link Productive</p>
                            <p className="text-[9px] text-near-black/40 font-bold mt-1 flex items-center gap-1">
                              <Calendar size={10} />
                              {post.createdAt ? new Date(post.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : ""}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-[#004aad]/10 text-[#004aad] rounded-full text-[9px] font-black uppercase tracking-wider">
                          {post.category === "kegiatan" ? "Kegiatan" : "Materi Promo"}
                        </span>
                      </div>
                      <div className="relative aspect-square bg-white overflow-hidden group">
                        <img src={post.imageUrl} alt="Materi" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button onClick={() => handleCopyCaption(post)} className="bg-white text-near-black p-3 rounded-full hover:scale-110 transition-all shadow-lg cursor-pointer">
                            {isCopied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="px-5 pt-4 pb-2 flex items-center justify-between border-t border-slate-100">
                        <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 group/like cursor-pointer">
                          <Heart size={20} className={`transition-all group-hover/like:scale-110 ${isLiked ? "fill-rose-500 text-rose-500" : "text-near-black/40 hover:text-rose-500"}`} />
                          <span className="text-xs font-black text-near-black/70">{post.likeCount}</span>
                        </button>
                        <button onClick={() => handleCopyCaption(post)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${isCopied ? "bg-green-50 text-green-700 border border-green-200" : "bg-[#004aad]/10 text-[#004aad] hover:bg-[#004aad]/20"}`}>
                          {isCopied ? <><Check size={12} /> Tersalin</> : <><Copy size={12} /> Salin Caption</>}
                        </button>
                      </div>
                      <div className="px-5 pb-5 flex-1">
                        <p className="text-xs text-near-black/80 font-bold leading-relaxed line-clamp-3 mt-2">
                          <span className="font-black text-near-black mr-1">Link Productive</span>{post.caption}
                        </p>
                        {post.hashtags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.hashtags.map((tag: string) => <span key={tag} className="text-[10px] font-black text-[#004aad]">#{tag}</span>)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Info Columns ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Tugas Affiliate Partner", bg: "bg-near-black", textColor: "text-white", items: ["Promosikan semua program pelatihan", "Bagikan link / kode referral", "Dapatkan peserta / customer", "Capai target & raih komisi", "Buat konten promosi di medsos"] },
              { title: "Benefit Affiliate Partner", bg: "bg-[#004aad]", textColor: "text-white", items: ["Penghasilan tanpa batas", "Komisi dari setiap penjualan", "Bonus target bulanan & reward", "Materi promosi & support marketing", "Sertifikat resmi Affiliate Partner", "Komunitas partner aktif"] },
              { title: "Syarat Pendaftaran", bg: "bg-near-black", textColor: "text-white", items: ["Usia minimal 17 tahun", "Punya smartphone & internet", "Aktif di media sosial", "Komunikatif & semangat belajar", "Bersedia bekerja dengan target"] },
            ].map((col, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-near-black/10 shadow-sm">
                <span className={`${col.bg} ${col.textColor} px-4 py-2 rounded-lg inline-block font-black uppercase text-xs mb-6`}>{col.title}</span>
                <ul className="space-y-3">
                  {col.items.map((text, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#004aad] flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-bold text-near-black/70">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default function AffiliatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#0ea5e9]/20 border-t-[#0ea5e9] animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Memuat Halaman Affiliate...</p>
      </div>
    }>
      <AffiliateContent />
    </Suspense>
  );
}
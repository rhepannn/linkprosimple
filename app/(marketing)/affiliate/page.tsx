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
  ChevronRight, Download,
} from "lucide-react";
import { getAffiliatePosts } from "@/app/actions/affiliate-posts";
import { getSiteSettings } from "@/app/actions/settings";
import { getProducts } from "@/app/actions/products";
import { toast } from "sonner";
import { brandProducts } from "@/data/brand-products";

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

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
function AffiliateContent() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"semua" | "kegiatan" | "promo">("semua");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, settingsRes, productsRes] = await Promise.all([
          getAffiliatePosts(), getSiteSettings(), getProducts(),
        ]);

        if (settingsRes) setSettings(settingsRes);

        let rawProducts = productsRes.success && Array.isArray(productsRes.data)
          ? productsRes.data.filter((p: any) => p.isActive)
          : [];

        const productPosts = rawProducts
          .filter((p: any) => p.image)
          .map((p: any, i: number) => ({
            id: 'prod-' + (p.id || i),
            imageUrl: p.image,
            caption: p.details ? `Ayo tingkatkan skill kamu dengan bergabung di program unggulan: ${p.name}! Daftar sekarang dan dapatkan penawaran spesial.` : `Daftar sekarang untuk program ${p.name}!`,
            category: 'promo',
            likeCount: Math.floor(Math.random() * 50) + 10,
            hashtags: ['linkproductive', p.name.split('-')[0].trim().toLowerCase().replace(/\s+/g, ''), 'pelatihan'],
            createdAt: p.createdAt || new Date().toISOString(),
          }));

        let published = [];
        if (postsRes.success && Array.isArray(postsRes.data) && postsRes.data.length > 0) {
          published = (postsRes.data as any[]).filter((p: any) => p.isPublished).map((p: any) => ({
            ...p,
            category: (p.hashtags || []).some((t: string) =>
              ["kegiatan", "gathering", "event"].includes(t.toLowerCase())
            ) || p.caption.toLowerCase().includes("kegiatan") ? "kegiatan" : "promo",
          }));
        }
        
        setPosts([...productPosts, ...published]);
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
                <a onClick={(e) => { e.preventDefault(); setShowModal(true); }} className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold uppercase tracking-wider text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-sky-500/20">
                  Daftar Sekarang <ArrowRight size={14} />
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
                          <button onClick={() => handleCopyCaption(post)} className="bg-white text-near-black p-3 rounded-full hover:scale-110 transition-all shadow-lg cursor-pointer" title="Salin Caption">
                            {isCopied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                          </button>
                          <button onClick={(e) => {
                            e.stopPropagation();
                            const a = document.createElement("a");
                            a.href = `/api/download-image?url=${encodeURIComponent(post.imageUrl)}`;
                            a.download = `promo-${post.id}.jpg`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }} className="bg-white text-near-black p-3 rounded-full hover:scale-110 transition-all shadow-lg cursor-pointer" title="Unduh Gambar">
                            <Download size={18} />
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
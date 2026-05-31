"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Phone, MapPin, Briefcase, Sparkles,
  CheckCircle2, ArrowLeft, Send, MessageCircle, Loader2,
  User, Hash
} from "lucide-react";
import { getProducts } from "@/app/actions/products";
import { createAffiliateLead } from "@/app/actions/affiliate-leads";
import { getSiteSettings } from "@/app/actions/settings";
import { affiliateDetails } from "@/data/affiliate";
import { brandProducts } from "@/data/brand-products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { btn } from "@/lib/button-classes";

interface ProductInfo {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  features: string[];
  duration?: string;
  photoCount?: string;
}

function DaftarForm() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";
  const pkgSku = searchParams.get("pkg") || "";

  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [siteSettings, setSiteSettings] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    occupation: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load site settings
  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        if (data) {
          setSiteSettings(data);
        }
      } catch (err) {
        console.error("Gagal memuat pengaturan website:", err);
      }
    }
    loadSettings();
  }, []);

  // Load product info
  useEffect(() => {
    async function load() {
      try {
        if (pkgSku) {
          const res = await getProducts(true);
          if (res.success && res.data) {
            const found = res.data.find(
              (p: any) => p.sku === pkgSku || p.id === pkgSku
            );
            if (found) {
              setProduct(found as any);
            } else {
              // fallback ke brand-products static
              const bp = brandProducts.find(
                (b) => b.sku === pkgSku
              );
              if (bp) {
                setProduct({
                  id: bp.sku,
                  name: bp.name,
                  sku: bp.sku,
                  price: bp.price,
                  category: bp.categoryName,
                  features: bp.features,
                });
              }
            }
          }
        }
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pkgSku]);

  // Find program details from affiliate data
  const programKey =
    Object.keys(affiliateDetails).find((key) =>
      brandProducts.some(
        (bp) =>
          bp.sku === pkgSku &&
          bp.name.toLowerCase().includes(key.toLowerCase())
      )
    ) || "";

  const prog = programKey ? affiliateDetails[programKey] : null;

  // Determine WhatsApp number - per program or admin settings or default
  const waNumber =
    (prog as any)?.consultWa?.replace("https://wa.me/", "") ||
    siteSettings.affiliate_whatsapp ||
    siteSettings.contact_wa ||
    site.contact.whatsapp;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Nama wajib diisi";
    if (!form.phone.trim()) errs.phone = "Nomor WhatsApp wajib diisi";
    else if (!/^08\d{8,12}$/.test(form.phone.replace(/[-\s]/g, "")))
      errs.phone = "Format nomor tidak valid (08xx)";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await createAffiliateLead({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        city: form.city || undefined,
        occupation: form.occupation || undefined,
        productSku: pkgSku || undefined,
        productName: product?.name || undefined,
        referralCode: refCode || undefined,
        notes: form.notes || undefined,
      });

      if (res.success) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-[#E0E0DA] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#C0C0BC] focus:outline-none focus:ring-2 focus:ring-[#C88A58]/20 focus:border-[#C88A58]/30 transition-all";
  const labelClass =
    "block text-[10px] font-black uppercase tracking-widest text-[#888888] mb-1.5";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#C88A58]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="pt-28 pb-20 lg:pt-36 max-w-xl mx-auto px-5 sm:px-8">
        <AnimatePresence mode="wait">
          {success ? (
            /* ── Success State ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="flex justify-center"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-white shadow-xl flex items-center justify-center">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
              </motion.div>

              <div>
                <h2 className="text-2xl font-black text-[#3B2211] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Tim kami akan segera menghubungi Anda melalui WhatsApp untuk informasi selanjutnya.
                </p>
              </div>

              {product && (
                <div className="bg-white rounded-2xl border border-[#E0E0DA] p-5 text-left space-y-2">
                  <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-widest">Program Dipilih</p>
                  <p className="text-sm font-bold text-[#3B2211]">{product.name}</p>
                  <p className="text-lg font-black text-[#3B2211]">{formatPrice(product.price)}</p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Halo! Saya ${form.name} ingin info lebih lanjut tentang program ${product?.name || ""}.${refCode ? ` Kode referral: ${refCode}` : ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[btn.whatsapp, "w-full justify-center rounded-xl py-4 text-xs font-black uppercase tracking-widest"].join(" ")}
                >
                  <MessageCircle size={18} />
                  Hubungi via WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            /* ── Form State ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Back */}
              <a
                href="/affiliate"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#888888] hover:text-[#3B2211] mb-8 transition-colors"
              >
                <ArrowLeft size={14} />
                Kembali
              </a>

              {/* Header */}
              <div className="mb-8">
                <p className="text-[10px] font-black tracking-[0.3em] text-[#C88A58] uppercase mb-2">
                  {refCode ? "Referral Partner" : "Pendaftaran Program"}
                </p>
                <h1 className="text-3xl sm:text-4xl font-black text-[#3B2211] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Daftar Program
                </h1>
                <p className="text-sm text-gray-500 font-medium">
                  Isi data diri Anda dan tim kami akan menghubungi untuk informasi lengkap.
                </p>
              </div>

              {/* Product Card */}
              {product && (
                <div className="bg-white rounded-2xl border border-[#E0E0DA] p-5 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C88A58]/5 rounded-bl-full" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#3B2211] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#3B2211]/10">
                      <GraduationCap size={22} className="text-[#C88A58]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-widest mb-0.5">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-black text-[#3B2211] mb-1">{product.name}</h3>
                      <p className="text-2xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-heading)" }}>
                        {formatPrice(product.price)}
                      </p>
                      {product.features && product.features.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {product.features.slice(0, 4).map((f, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-[#5A5A5A]">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C88A58] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Program Overview & Benefits */}
              {prog && (
                <div className="bg-white rounded-2xl border border-[#E0E0DA] p-6 mb-8 space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.2em] mb-2 font-black">Tentang Program</h4>
                    <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line">{prog.intro}</p>
                  </div>
                  
                  {prog.whyInteresting && prog.whyInteresting.length > 0 && (
                    <div className="border-t border-[#E0E0DA] pt-5">
                      <h4 className="text-[10px] font-black text-[#3B2211] uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5 font-black">
                        <Sparkles size={12} className="text-[#C88A58]" /> Benefit Pelatihan
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {prog.whyInteresting.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {prog.targetMarket && prog.targetMarket.length > 0 && (
                    <div className="border-t border-[#E0E0DA] pt-5">
                      <h4 className="text-[10px] font-black text-[#3B2211] uppercase tracking-[0.2em] mb-3 flex items-center gap-1.5 font-black">
                        🎯 Target Peserta
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {prog.targetMarket.map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-gray-100 rounded-lg text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* WhatsApp Card Prominent */}
              <div className="bg-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-[#1E110A] flex items-center gap-1.5">
                    <MessageCircle size={15} className="text-[#25D366]" /> Ada Pertanyaan Sebelum Daftar?
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Hubungi kami langsung via WhatsApp untuk respon instan dan bimbingan pendaftaran.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Halo! Saya ingin tanya tentang program ${product?.name || ""}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#22c55e] text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/10 text-center"
                >
                  <MessageCircle size={14} />
                  Tanya via WA
                </a>
              </div>

              {/* Referral Code Badge */}
              {refCode && (
                <div className="mb-6 p-3 bg-[#C88A58]/5 border border-[#C88A58]/20 rounded-xl flex items-center gap-2">
                  <Hash size={14} className="text-[#C88A58]" />
                  <span className="text-xs font-bold text-[#3B2211]">
                    Kode Referral: <span className="font-black text-[#C88A58] tracking-wider">{refCode}</span>
                  </span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={labelClass}>Nama Lengkap *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0BC]" size={14} />
                      <input
                        type="text"
                        placeholder="Masukkan nama lengkap Anda"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`${inputClass} pl-9 ${errors.name ? "border-red-300 ring-red-100" : ""}`}
                      />
                    </div>
                    {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name}</p>}
                  </div>

                  <div className="col-span-2">
                    <label className={labelClass}>Nomor WhatsApp *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0BC]" size={14} />
                      <input
                        type="text"
                        placeholder="08xxxxxxxxxx"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`${inputClass} pl-9 ${errors.phone ? "border-red-300 ring-red-100" : ""}`}
                      />
                    </div>
                    {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      placeholder="contoh@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Kota / Domisili</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0BC]" size={14} />
                      <input
                        type="text"
                        placeholder="Contoh: Jakarta"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Pekerjaan / Status</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0BC]" size={14} />
                      <select
                        value={form.occupation}
                        onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                        className={`${inputClass} pl-9 appearance-none`}
                      >
                        <option value="">Pilih status</option>
                        <option value="pelajar">Pelajar</option>
                        <option value="mahasiswa">Mahasiswa</option>
                        <option value="karyawan">Karyawan</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="wirausaha">Wirausaha</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className={labelClass}>Catatan / Pertanyaan</label>
                    <textarea
                      placeholder="Tulis pertanyaan atau kebutuhan khusus Anda..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#3B2211] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-[#3B2211]/20 hover:bg-[#C88A58] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Kirim Pendaftaran
                    </>
                  )}
                </button>
              </form>

              {/* WhatsApp Alternative */}
              <div className="mt-6 text-center">
                <p className="text-[10px] text-[#888888] font-bold uppercase tracking-wider mb-3">
                  Atau langsung hubungi via WhatsApp
                </p>
                <a
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[btn.whatsapp, "rounded-xl py-3 px-6 text-[11px] font-black uppercase tracking-widest inline-flex mx-auto"].join(" ")}
                >
                  <MessageCircle size={16} />
                  Chat WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function DaftarPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#C88A58]" />
        </div>
      }
    >
      <DaftarForm />
    </Suspense>
  );
}

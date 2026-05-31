"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Phone, MapPin, Briefcase, Sparkles,
  CheckCircle2, ArrowLeft, Send, MessageCircle, Loader2,
  User, CreditCard, Copy, Check
} from "lucide-react";
import { getProducts } from "@/app/actions/products";
import { createAffiliateLead, getAffiliateLeadStatus } from "@/app/actions/affiliate-leads";
import { getSiteSettings } from "@/app/actions/settings";
import { brandProducts } from "@/data/brand-products";
import { formatPrice } from "@/lib/utils";
import { btn } from "@/lib/button-classes";
import { toast } from "sonner";

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

function DaftarPelatihanForm() {
  const searchParams = useSearchParams();
  const pkgSku = searchParams.get("pkg") || "";

  const [productsList, setProductsList] = useState<ProductInfo[]>([]);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [refCode, setRefCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState("");
  const [leadStatus, setLeadStatus] = useState("pending");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedDana, setCopiedDana] = useState(false);
  const [copiedGopay, setCopiedGopay] = useState(false);
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

  // Prefill referral code from query params
  useEffect(() => {
    const urlRef = searchParams.get("ref");
    if (urlRef) {
      setRefCode(urlRef);
    }
  }, [searchParams]);

  // Load site settings & products list
  useEffect(() => {
    async function load() {
      try {
        const settingsData = await getSiteSettings();
        if (settingsData) {
          setSiteSettings(settingsData);
        }

        const res = await getProducts(true);
        let list: ProductInfo[] = [];
        if (res.success && res.data) {
          const dbProducts = res.data
            .filter((p: any) => p.sku !== "pkg-vinyl" && p.sku !== "pkg-elevator" && p.sku !== "pkg-kaset")
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              sku: p.sku,
              price: p.price,
              category: p.category,
              features: p.features,
            }));
          list = [...dbProducts];
        }

        // Add brand products that are not already in DB by SKU
        brandProducts.forEach(bp => {
          if (!list.some(p => p.sku === bp.sku)) {
            list.push({
              id: bp.sku,
              name: bp.name,
              sku: bp.sku,
              price: bp.price,
              category: bp.categoryName,
              features: bp.features,
            });
          }
        });

        setProductsList(list);

        // Set initial selected product
        const initialPkg = list.find(p => p.sku === pkgSku || p.id === pkgSku) || list[0] || null;
        setProduct(initialPkg);
      } catch (err) {
        console.error("Gagal memuat data pendaftaran:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pkgSku]);

  // Poll affiliate lead status when lead is created
  useEffect(() => {
    if (!success || !createdLeadId) return;

    const interval = setInterval(async () => {
      try {
        const res = await getAffiliateLeadStatus(createdLeadId);
        if (res.success && res.status) {
          setLeadStatus(res.status);
        }
      } catch (err) {
        console.error("Error polling lead status:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [success, createdLeadId]);

  // Handle lead status confirmation
  useEffect(() => {
    if (leadStatus === "followed_up" || leadStatus === "closed") {
      setShowSuccessOverlay(true);
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [leadStatus]);

  // Determine WhatsApp number for sending payment confirmation
  const waNumber =
    siteSettings.training_payment_wa ||
    siteSettings.affiliate_whatsapp ||
    siteSettings.contact_wa ||
    "6287778059221";

  const handleCopy = (text: string, type: "bank" | "dana" | "gopay") => {
    navigator.clipboard.writeText(text);
    if (type === "bank") {
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2000);
    } else if (type === "dana") {
      setCopiedDana(true);
      setTimeout(() => setCopiedDana(false), 2000);
    } else if (type === "gopay") {
      setCopiedGopay(true);
      setTimeout(() => setCopiedGopay(false), 2000);
    }
  };

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
        productSku: product?.sku || undefined,
        productName: product?.name || undefined,
        referralCode: refCode || undefined,
        notes: form.notes || undefined,
      });

      if (res.success && res.data) {
        setCreatedLeadId(res.data.id);
        setSuccess(true);
        toast.success("Pendaftaran berhasil disimpan!");
      } else {
        toast.error(res.error || "Gagal menyimpan pendaftaran. Silakan coba lagi.");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err.message || "Terjadi kesalahan koneksi.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white border border-[#E0E0DA] rounded-xl text-sm text-[#1A1A1A] placeholder:text-[#C0C0BC] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all";
  const labelClass =
    "block text-[10px] font-black uppercase tracking-widest text-[#888888] mb-1.5";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-purple-600" />
      </div>
    );
  }

  // Wa text template
  const waText = `Halo Admin! Saya *${form.name}* telah mendaftar program pelatihan *${product?.name || ""}*.\n\nBerikut bukti pembayaran pendaftaran saya.\n\nDetail Pendaftar:\n- Nama: ${form.name}\n- HP: ${form.phone}\n- Email: ${form.email || "-"}\n- Kota: ${form.city || "-"}\n- Pekerjaan: ${form.occupation || "-"}\n${refCode ? `- Referral: ${refCode}\n` : ""}- Total Transfer: *${formatPrice(product?.price || 0)}*`;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="pt-28 pb-20 lg:pt-36 max-w-xl mx-auto px-5 sm:px-8">
        <AnimatePresence mode="wait">
          {success ? (
            /* ── Step 2: Payment Instructions State ── */
            <motion.div
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="flex justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-purple-50 border-4 border-white shadow-xl flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-purple-600" />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-heading)" }}>
                  Pendaftaran Disimpan!
                  <span className="block text-xs font-black text-purple-600 uppercase tracking-widest mt-1">Langkah Terakhir: Pembayaran</span>
                </h2>
                <p className="text-xs text-gray-500 font-bold max-w-sm mx-auto leading-relaxed">
                  Silakan lakukan pembayaran pendaftaran ke nomor rekening admin di bawah, lalu kirim bukti pembayaran via WhatsApp.
                </p>
              </div>

              {/* Package Detail Box */}
              {product && (
                <div className="bg-white rounded-2xl border border-[#E0E0DA] p-5 space-y-2">
                  <p className="text-[9px] font-black text-purple-600 uppercase tracking-widest">Program Pelatihan Yang Dipilih</p>
                  <div className="flex justify-between items-center gap-4">
                    <p className="text-sm font-black text-[#3B2211]">{product.name}</p>
                    <p className="text-lg font-black text-purple-600">{formatPrice(product.price)}</p>
                  </div>
                </div>
              )}

              {/* Payment Methods Accounts Box */}
              <div className="bg-white rounded-3xl border border-[#E0E0DA] p-6 space-y-4 shadow-sm">
                <h3 className="text-xs font-black text-[#3B2211] uppercase tracking-widest border-b border-gray-100 pb-3 flex items-center gap-2">
                  <CreditCard size={14} className="text-purple-600" /> Pilihan Rekening Pembayaran
                </h3>

                <div className="space-y-4">
                  {/* Bank Transfer BCA/etc */}
                  <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                        {siteSettings.payment_bank_name || "BANK BCA"}
                      </p>
                      <p className="text-sm font-black text-[#3B2211] tracking-wide font-mono">
                        {siteSettings.payment_bank_account || "7771234567"}
                      </p>
                      <p className="text-[10px] text-gray-500 font-medium">
                        a.n. {siteSettings.payment_bank_owner || "Snapp.frame Owner"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(siteSettings.payment_bank_account || "7771234567", "bank")}
                      className="p-2 text-gray-400 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all flex items-center justify-center"
                      title="Salin No Rekening"
                    >
                      {copiedBank ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* DANA */}
                  {siteSettings.payment_dana_number && (
                    <div className="flex justify-between items-start gap-4 pb-4 border-b border-gray-50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">DANA E-Wallet</p>
                        <p className="text-sm font-black text-[#3B2211] tracking-wide font-mono">
                          {siteSettings.payment_dana_number}
                        </p>
                        {siteSettings.payment_dana_owner && (
                          <p className="text-[10px] text-gray-500 font-medium">a.n. {siteSettings.payment_dana_owner}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleCopy(siteSettings.payment_dana_number, "dana")}
                        className="p-2 text-gray-400 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all flex items-center justify-center"
                        title="Salin No Dana"
                      >
                        {copiedDana ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}

                  {/* GOPAY */}
                  {siteSettings.payment_gopay_number && (
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">GOPAY E-Wallet</p>
                        <p className="text-sm font-black text-[#3B2211] tracking-wide font-mono">
                          {siteSettings.payment_gopay_number}
                        </p>
                        {siteSettings.payment_gopay_owner && (
                          <p className="text-[10px] text-gray-500 font-medium">a.n. {siteSettings.payment_gopay_owner}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleCopy(siteSettings.payment_gopay_number, "gopay")}
                        className="p-2 text-gray-400 hover:text-purple-600 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all flex items-center justify-center"
                        title="Salin No GoPay"
                      >
                        {copiedGopay ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* QRIS Image if available */}
              {siteSettings.payment_qris_image && (
                <div className="bg-white rounded-3xl border border-[#E0E0DA] p-6 text-center space-y-3 shadow-sm">
                  <p className="text-[10px] font-black text-[#3B2211] uppercase tracking-widest">Atau Scan QRIS Merchant</p>
                  <div className="flex justify-center">
                    <img
                      src={siteSettings.payment_qris_image}
                      alt="QRIS Pembayaran"
                      className="w-48 h-48 object-contain border rounded-2xl p-2 bg-[#F8F6F4]"
                    />
                  </div>
                </div>
              )}

              {/* Send Payment Confirmation via WA */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${waNumber.replace(/^0/, "62").replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-green-500/20 hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                >
                  <MessageCircle size={18} />
                  Kirim Bukti Pembayaran via WA
                </a>
              </div>
            </motion.div>
          ) : (
            /* ── Step 1: Registration Form State ── */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Back Button */}
              <div className="flex justify-between items-center">
                <a
                  href="/packages"
                  className="inline-flex items-center gap-2 text-[10px] font-black text-[#888888] hover:text-[#3B2211] uppercase tracking-widest transition-colors"
                >
                  <ArrowLeft size={12} />
                  Kembali ke Paket
                </a>
                <span className="text-[9px] font-black tracking-[0.2em] bg-purple-100 text-purple-700 px-3 py-1 rounded-full uppercase border border-purple-200">
                  Formulir Pelatihan
                </span>
              </div>

              {/* Heading */}
              <div>
                <h1
                  className="text-3xl font-black text-[#3B2211] leading-tight tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Pendaftaran <span className="text-purple-600">Pelatihan</span>
                </h1>
                <p className="text-xs text-gray-500 font-bold leading-relaxed">
                  Lengkapi data pendaftaran Anda di bawah untuk mendapatkan akses modul dan kelas eksklusif kami.
                </p>
              </div>

              {/* Program Selection Dropdown */}
              <div>
                <label className={labelClass}>Program Pelatihan *</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600" size={16} />
                  <select
                    value={product?.sku || ""}
                    onChange={(e) => {
                      const selected = productsList.find(p => p.sku === e.target.value);
                      if (selected) setProduct(selected);
                    }}
                    className={`${inputClass} pl-9 appearance-none font-bold text-[#3B2211]`}
                  >
                    {productsList.map((p) => (
                      <option key={p.sku} value={p.sku}>
                        {p.name} — {formatPrice(p.price)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="bg-white rounded-3xl border border-[#E0E0DA] p-6 sm:p-8 space-y-5 shadow-sm">
                  <div>
                    <label className={labelClass}>Nama Lengkap *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0BC]" size={14} />
                      <input
                        type="text"
                        placeholder="Masukkan nama lengkap Anda"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[10px] text-rose-500 font-bold uppercase mt-1 tracking-wider">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Nomor WhatsApp *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C0C0BC]" size={14} />
                      <input
                        type="text"
                        placeholder="Contoh: 081234567890"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-rose-500 font-bold uppercase mt-1 tracking-wider">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className={labelClass}>Kode Referral (Opsional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600 font-black text-xs">@</span>
                      <input
                        type="text"
                        placeholder="Masukkan kode referral jika ada"
                        value={refCode}
                        onChange={(e) => setRefCode(e.target.value)}
                        className={`${inputClass} pl-8 font-bold text-purple-700`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email (Opsional)</label>
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
                          placeholder="Contoh: Surabaya"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className={`${inputClass} pl-9`}
                        />
                      </div>
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

                  <div>
                    <label className={labelClass}>Catatan Tambahan (Opsional)</label>
                    <textarea
                      placeholder="Tulis pesan atau kebutuhan khusus Anda..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting || !product}
                  className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-purple-600/20 hover:bg-purple-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Simpan & Lanjut Pembayaran
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Success Overlay (Green Flash + Checkmark Animation) */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
          >
            {/* Green Flash Effect */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-[#22C55E]"
            />

            {/* Checkmark Animation Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.3
                }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="currentColor"
                  className="w-12 h-12 text-[#22C55E]"
                  initial={{ strokeDasharray: 50, strokeDashoffset: 50 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </motion.svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-2xl font-black text-[#3B2211] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pendaftaran Dikonfirmasi!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-xs text-gray-500 font-bold"
              >
                Terima kasih, pendaftaran Anda berhasil diverifikasi oleh admin.
                <span className="block mt-2 font-medium text-purple-600 animate-pulse">Mengalihkan ke beranda...</span>
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function DaftarPelatihanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-purple-600" />
        </div>
      }
    >
      <DaftarPelatihanForm />
    </Suspense>
  );
}
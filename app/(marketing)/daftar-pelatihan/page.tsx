"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Coffee, Camera, Presentation, Recycle, MonitorPlay,
  GraduationCap, Users, Building, ShoppingBag, Handshake,
  TrendingUp, Award, CheckCircle2, ChevronRight, ChevronLeft,
  ChevronDown, ArrowRight, X, Search, ArrowLeft, MessageCircle,
  Sparkles, CreditCard, Copy, Check, Eye
} from "lucide-react";
import { getProducts } from "@/app/actions/products";
import { createAffiliateLead } from "@/app/actions/affiliate-leads";
import { getSiteSettings } from "@/app/actions/settings";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

// --- CUSTOM SPINNER COMPONENT ---
function Spinner({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface ProductInfo {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  desc?: string;
  features: string[];
}

// --- DYNAMIC DATABASE DRIVEN SYSTEM ---

const POSTER_KEYS: Record<string, string> = {
  "LP Academic Partner": "training_poster_academic",
  "LP Career Ready": "training_poster_career",
  "LP Entrepreneur Launchpad": "training_poster_entrepreneur",
  "Bisapreneur Academy": "training_poster_bisapreneur",
  "Baristara Academy": "training_poster_baristara",
  "Cuan Creator Academy": "training_poster_cuan_creator",
  "Tekno AI Academy": "training_poster_tekno_ai",
  "Mental Bahasa Academy": "training_poster_mental_bahasa",
  "Green Productive Academy": "training_poster_green_productive",
};

const DEFAULT_POSTERS: Record<string, string> = {
  "LP Academic Partner": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
  "LP Career Ready": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
  "LP Entrepreneur Launchpad": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  "Bisapreneur Academy": "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop",
  "Baristara Academy": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
  "Cuan Creator Academy": "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
  "Tekno AI Academy": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
  "Mental Bahasa Academy": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
  "Green Productive Academy": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function ProgramPosterCarousel({ urls, productName, onImageClick }: { urls: string[]; productName: string; onImageClick?: (url: string) => void }) {
  const [[page, direction], setPage] = useState([0, 0]);

  if (urls.length === 0) return null;

  const currentIndex = ((page % urls.length) + urls.length) % urls.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(1);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(-1);
  };

  return (
    <div className="overflow-hidden rounded-t-[1.8rem] rounded-b-none border-0 aspect-[16/9] bg-[#004aad]/5 relative group/carousel shadow-sm">
      <div className="w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={urls[currentIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={urls.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            alt={`${productName} poster ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-contain bg-[#1A1A1A] select-none touch-pan-y cursor-zoom-in"
            onClick={() => onImageClick?.(urls[currentIndex])}
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {urls.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10 cursor-pointer border border-white/10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10 cursor-pointer border border-white/10"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
            {urls.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  const dir = idx > currentIndex ? 1 : -1;
                  setPage([idx, dir]);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-[#004aad] w-3" : "bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const pkgSlugMap: Record<string, string> = {
  "lp-academic-partner": "LP Academic Partner",
  "lp-career-ready": "LP Career Ready",
  "lp-entrepreneur-launchpad": "LP Entrepreneur Launchpad",
  "bisapreneur-academy": "Bisapreneur Academy",
  "baristara-academy": "Baristara Academy",
  "cuan-creator-academy": "Cuan Creator Academy",
  "tekno-ai-academy": "Tekno AI Academy",
  "mental-bahasa-academy": "Mental Bahasa Academy",
  "green-productive-academy": "Green Productive Academy",
  "brand-siap": "Brand Siap",
  "standara-consulting": "Standara Consulting",
};

// --- ENROLLMENT REGISTER MODAL ---
function EnrollModal({
  product,
  onClose,
  siteSettings
}: {
  product: any;
  onClose: () => void;
  siteSettings: Record<string, string>;
}) {
  const searchParams = useSearchParams();
  const refCodeParam = searchParams.get("ref") || "";

  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    occupation: "",
    notes: "",
  });
  const [refCode, setRefCode] = useState(refCodeParam);
  const [copiedBank, setCopiedBank] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(() => {
    if (!product.packages || product.packages.length === 0) return "";
    const targetSku = searchParams.get("pkg");
    if (targetSku) {
      const match = product.packages.find((p: any) => p.sku === targetSku);
      if (match) return match.id;
    }
    return product.packages[0].id;
  });

  const selectedPkg = product.packages?.find((pkg: any) => pkg.id === selectedPackageId);
  const originalPrice = selectedPkg?.rawPrice || 0;
  const basePrice = selectedPkg?.discountedPrice || originalPrice;
  const productDiscountAmount = originalPrice - basePrice;
  
  const [referralInfo, setReferralInfo] = useState<{ discountPct: number; maxDiscountAmount: number } | null>(null);

  useEffect(() => {
    async function checkRef() {
      if (refCodeParam) {
        try {
          const res = await fetch(`/api/referrals/validate?code=${encodeURIComponent(refCodeParam)}`);
          if (res.ok) {
            const data = await res.json();
            setReferralInfo({ discountPct: data.discountPct || 0, maxDiscountAmount: data.maxDiscountAmount || 0 });
          }
        } catch (err) {}
      }
    }
    checkRef();
  }, [refCodeParam]);

  const discountPct = referralInfo ? referralInfo.discountPct : 0;
  const maxDiscountAmount = referralInfo ? referralInfo.maxDiscountAmount : 0;
  let refDiscountAmount = basePrice * (discountPct / 100);
  if (maxDiscountAmount > 0 && refDiscountAmount > maxDiscountAmount) {
    refDiscountAmount = maxDiscountAmount;
  }
  const finalPrice = basePrice - refDiscountAmount;

  const occupations = [
    { value: "pelajar", label: "Pelajar / Siswa" },
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "karyawan", label: "Karyawan / Pegawai" },
    { value: "freelancer", label: "Freelancer" },
    { value: "wirausaha", label: "Wirausaha" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const set = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const waNumber = siteSettings.training_payment_wa || siteSettings.affiliate_whatsapp || siteSettings.contact_wa || "";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError("Nama Lengkap dan Nomor WhatsApp wajib diisi.");
      return;
    }
    if (!selectedPackageId) {
      setError("Pilih program / tingkatan kelas terlebih dahulu.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const targetSku = selectedPkg ? selectedPkg.sku : (Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === product.name) || "lp-academic-partner");
      const targetName = selectedPkg ? `${product.name} - ${selectedPkg.name}` : product.name;

      const res = await createAffiliateLead({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        city: form.city || undefined,
        occupation: form.occupation || undefined,
        productSku: targetSku,
        productName: targetName,
        referralCode: refCode || undefined,
        notes: form.notes || undefined,
        originalPrice,
        finalPrice,
      });

      setLoading(false);
      if (res.success) {
        setStep("success");
      } else {
        setError(res.error ?? "Terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (err) {
      setLoading(false);
      setError("Masalah jaringan. Silakan coba lagi.");
    }
  };

  const inputCls = "w-full px-4 py-3 bg-white border border-[#004aad]/10 rounded-xl text-xs font-bold text-[#004aad] focus:outline-none focus:ring-2 focus:ring-[#004aad]/30 focus:border-[#004aad] transition-all placeholder:text-sky-400";
  const labelCls = "block text-[10px] font-black uppercase tracking-wider text-sky-600 mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#004aad]/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-[#004aad]/10 overflow-hidden shadow-2xl text-[#004aad] flex flex-col"
        style={{ maxHeight: "92vh" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center px-6 pt-6 pb-4 border-b border-[#004aad]/5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#004aad]">
              Formulir Pendaftaran Kelas
            </h3>
            <p className="text-[10px] text-sky-500 font-bold mt-0.5">
              Silakan lengkapi data diri Anda untuk bergabung program {product.name}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#004aad]/5 flex items-center justify-center text-sky-500 hover:text-[#004aad] transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {step === "success" ? (
            <div className="flex flex-col items-center justify-center gap-5 px-8 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-sky-50 border-2 border-sky-200 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-black text-[#004aad] mb-2">Pendaftaran Berhasil! ??</h4>
                <p className="text-xs text-sky-600 font-bold leading-relaxed max-w-xs">
                  Data pendaftaran Anda telah kami simpan. Selesaikan proses pendaftaran dengan mentransfer total pembayaran ke rekening resmi kami di bawah ini:
                </p>
              </div>

              {/* Total Pembayaran to Transfer */}
              {finalPrice > 0 && (
                <div className="w-full p-4 bg-sky-50 border border-sky-100 rounded-2xl text-center space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">Total Pembayaran Yang Perlu Ditransfer</p>
                  <p className="text-xl font-black text-[#004aad] font-sans">
                    Rp {finalPrice.toLocaleString("id-ID")}
                  </p>
                  {discountPct > 0 && (
                    <p className="text-[8px] text-sky-600 font-bold uppercase tracking-wider">
                      Sudah termasuk diskon referral {discountPct}%!
                    </p>
                  )}
                </div>
              )}

              {/* Payment Methods (Bank Transfer & QRIS) */}
              <div className="w-full space-y-3">
                {/* Bank Transfer */}
                <div className="p-4 bg-white border border-[#004aad]/5 rounded-2xl flex justify-between items-center w-full text-left">
                  <div>
                    <p className="text-[9px] text-sky-500 uppercase font-black">BCA TRANSFER</p>
                    <p className="text-sm font-black text-[#004aad] tracking-wider font-mono mt-0.5">
                      {siteSettings.payment_bank_account || "8882047811"}
                    </p>
                    <p className="text-[10px] text-sky-600 font-bold mt-0.5">
                      a.n. {siteSettings.payment_bank_owner || "PT Link Productive Indonesia"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(siteSettings.payment_bank_account || "8882047811")}
                    className="p-2.5 bg-[#004aad]/5 hover:bg-[#004aad]/10 text-[#004aad] rounded-lg border border-[#004aad]/10 transition-colors"
                  >
                    {copiedBank ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* QRIS Code */}
                {siteSettings.payment_qris_image && (
                  <div className="p-4 bg-white border border-[#004aad]/5 rounded-2xl flex flex-col items-center justify-center gap-3 w-full">
                    <p className="text-[9px] text-sky-500 uppercase font-black text-center w-full">ATAU SCAN QRIS RESMI</p>
                    <div className="w-44 h-44 border border-[#004aad]/5 rounded-xl overflow-hidden bg-white p-2">
                      <img
                        src={siteSettings.payment_qris_image}
                        alt="QRIS Pembayaran"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[8px] text-sky-500 font-bold uppercase tracking-widest text-center leading-normal">
                      Pindai QR di atas menggunakan aplikasi e-wallet atau mobile banking Anda
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Halo Admin! Saya *${form.name}* baru saja mendaftar program kelas *${product.name}* (${selectedPkg ? selectedPkg.name : ""}).\n\nTotal pembayaran: Rp ${finalPrice.toLocaleString("id-ID")}\n\nMohon informasi verifikasi pendaftaran saya.\n\nDetail:\n- Nama: ${form.name}\n- HP: ${form.phone}\n${refCode ? `- Kode Ref: ${refCode}` : ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#004aad] hover:bg-[#003984] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  <MessageCircle size={14} />
                  Konfirmasi Pembayaran via WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-[#004aad]/10 text-sky-500 rounded-xl text-xs font-black uppercase tracking-wider hover:border-[#004aad]/20 transition-all"
                >
                  Tutup Portal
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#004aad]">Lengkapi Data Diri</p>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCls}>Pilih Program / Tingkatan Kelas <span className="text-sky-500">*</span></label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                    className={inputCls + " cursor-pointer font-bold text-xs"}
                  >
                    {product.packages && product.packages.filter((pkg: any) => searchParams.get("pkg") === pkg.sku ? true : !searchParams.get("pkg") || !product.packages.some((p: any) => p.sku === searchParams.get("pkg"))).map((pkg: any) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.afterDiscount || pkg.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Nama Lengkap <span className="text-sky-500">*</span></label>
                  <input type="text" placeholder="Masukkan nama lengkap Anda" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>No. WhatsApp <span className="text-sky-500">*</span></label>
                  <input type="tel" placeholder="Contoh: 081234567890" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email (Opsional)</label>
                  <input type="email" placeholder="nama@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Kota Domisili</label>
                    <input type="text" placeholder="Contoh: Cilegon" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pekerjaan</label>
                    <select value={form.occupation} onChange={(e) => set("occupation", e.target.value)} className={inputCls + " cursor-pointer"}>
                      <option value="">Pilih Pekerjaan</option>
                      {occupations.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Kode Referral Affiliate (Jika Ada)</label>
                  {/* Info banner diskon referral */}
                  {!referralInfo && (
                    <div className="mb-2 px-3 py-2 bg-sky-50 border border-sky-100 rounded-xl flex items-center gap-2">
                      <span className="text-sky-500 text-lg">🎁</span>
                      <p className="text-[10px] font-bold text-sky-700">
                        Punya kode referral? Dapatkan <strong>diskon spesial</strong> untuk biaya pendaftaran!
                      </p>
                    </div>
                  )}
                  {referralInfo && (
                    <div className="mb-2 px-3 py-2 bg-sky-50 border border-sky-200 rounded-xl flex items-center gap-2">
                      <span className="text-sky-500 text-lg">✅</span>
                      <p className="text-[10px] font-black text-sky-700 uppercase tracking-wide">
                        Kode valid! Diskon <strong>{referralInfo.discountPct}%</strong> berhasil diterapkan.
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Masukkan kode referral dari affiliate partner"
                      value={refCode}
                      onChange={(e) => setRefCode(e.target.value)}
                      className={inputCls}
                    />
                    <button 
                      type="button"
                      onClick={async () => {
                        if (!refCode.trim()) {
                          setReferralInfo(null);
                          return;
                        }
                        try {
                          const res = await fetch(`/api/referrals/validate?code=${encodeURIComponent(refCode)}`);
                          if (res.ok) {
                            const data = await res.json();
                            setReferralInfo({ discountPct: data.discountPct || 0, maxDiscountAmount: data.maxDiscountAmount || 0 });
                          } else {
                            setReferralInfo(null);
                            alert("Kode referral tidak valid atau tidak ditemukan");
                          }
                        } catch (err) {
                          setReferralInfo(null);
                        }
                      }}
                      className="px-4 py-2 bg-[#004aad] text-white text-xs font-bold rounded-xl whitespace-nowrap"
                    >
                      Cek
                    </button>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Catatan Tambahan (Opsional)</label>
                  <textarea
                    placeholder="Tuliskan catatan khusus terkait minat atau preferensi program Anda..."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    className={inputCls + " resize-none"}
                  />
                </div>

                <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl space-y-2 text-left">
                  <p className="text-[9px] font-black uppercase tracking-wider text-sky-600">Rincian Pembayaran &amp; Biaya</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-sky-600 font-medium">Harga Normal Kelas:</span>
                    <span className={productDiscountAmount > 0 || discountPct > 0 ? "font-bold text-sky-500 line-through" : "font-bold text-[#1a6fd4]"}>Rp {originalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  {productDiscountAmount > 0 && (
                    <div className="flex justify-between text-xs text-sky-600">
                      <span className="font-bold flex items-center gap-1">Diskon Promo Kelas:</span>
                      <span className="font-black">-Rp {productDiscountAmount.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  {discountPct > 0 ? (
                    <div className="flex justify-between text-xs text-sky-600">
                      <span className="font-bold flex items-center gap-1">🎁 Diskon Referral ({discountPct}%):</span>
                      <span className="font-black">-Rp {refDiscountAmount.toLocaleString("id-ID")}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-xs text-sky-500/60">
                      <span className="font-medium italic flex items-center gap-1">🎁 Diskon Referral (belum dipakai):</span>
                      <span className="font-medium italic">-Rp 0</span>
                    </div>
                  )}
                  <div className="h-px bg-sky-100 my-1" />
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-[#1a6fd4]">Total Biaya Akhir:</span>
                    <span className="text-[#004aad] text-sm">Rp {finalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  {discountPct > 0 ? (
                    <p className="text-[8px] text-sky-600 font-bold leading-normal mt-1 uppercase tracking-wider">
                      ✅ Kode Referral Terpasang! Diskon {discountPct}% berhasil diterapkan.
                    </p>
                  ) : (
                    <p className="text-[8px] text-sky-500 font-medium leading-normal mt-1">
                      💡 Masukkan kode referral di atas untuk mendapatkan diskon.
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <X size={14} className="text-red-500 flex-shrink-0" />
                  <p className="text-xs font-bold text-red-600">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Submit */}
        {step === "form" && (
          <div className="flex-shrink-0 px-6 pb-6 pt-4 border-t border-[#004aad]/5">
            <button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.phone}
              className="w-full py-3.5 bg-[#004aad] hover:bg-[#004aad]/90 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-sky-900/10 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <Spinner size={16} className="text-white" />
              ) : (
                <>
                  <ArrowRight size={14} />
                  Kirim Formulir Pendaftaran Kelas
                </>
              )}
            </button>
            <p className="text-[9px] text-sky-400 font-bold text-center mt-2.5 uppercase tracking-wider">
              Pembayaran Aman via Rekening Resmi PT Link Productive Indonesia
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function parseProductsFromDb(dbProducts: any[]) {
  const grouped: Record<string, {
    name: string;
    fee: string;
    unit: string;
    icon: any;
    desc: string;
    image: string | null;
    startingPrice?: number;
    startingDiscountedPrice?: number;
    url: string;
    packages: any[];
    dbDetails?: any;
  }> = {};

  const iconMap: Record<string, any> = {
    "LP Academic Partner": GraduationCap,
    "LP Career Ready": Award,
    "LP Entrepreneur Launchpad": TrendingUp,
    "Bisapreneur Academy": Building,
    "Baristara Academy": Coffee,
    "Cuan Creator Academy": MonitorPlay,
    "Tekno AI Academy": Presentation,
    "Mental Bahasa Academy": Users,
    "Green Productive Academy": Recycle,
    "Brand Siap": ShoppingBag,
    "Standara Consulting": Handshake,
  };

  const parsePriceString = (priceStr: string): number => {
    if (!priceStr || priceStr.toLowerCase().includes("menyesuaikan")) return 0;
    const clean = priceStr.replace(/[^0-9]/g, "");
    return parseInt(clean, 10) || 0;
  };

  // Group database products by program/category for matching
  const dbProdsByProgram: Record<string, any[]> = {};
  dbProducts.forEach((p) => {
    let programName = "";
    if (p.name.includes(" - ")) {
      programName = p.name.split(" - ")[0].trim();
    } else {
      // Nama produk tanpa " - " berarti produk itu sendiri adalah program
      programName = p.name;
    }
    if (!dbProdsByProgram[programName]) {
      dbProdsByProgram[programName] = [];
    }
    dbProdsByProgram[programName].push(p);
  });

  // Iterate dari DB — semua produk aktif di DB pasti muncul
  Object.keys(dbProdsByProgram).forEach((programName) => {
    const dbProds = dbProdsByProgram[programName];
    if (!dbProds || dbProds.length === 0) return;

    let IconComp = GraduationCap;
    for (const key of Object.keys(iconMap)) {
      if (programName.toLowerCase().includes(key.toLowerCase())) {
        IconComp = iconMap[key];
        break;
      }
    }

    // Resolve subtitle/desc
    // Parse DB details if present on the first product in the group
    let dbDetails: any = null;
    const firstProd = dbProds[0];
    if (firstProd && firstProd.details) {
      try {
        dbDetails = typeof firstProd.details === "string" ? JSON.parse(firstProd.details) : firstProd.details;
      } catch (e) {
        console.error("Failed to parse product details JSON:", e);
      }
    }

    const parsedPackages: any[] = dbProds.map((p: any, index: number) => {
      let packageName = p.name;
      if (p.name.includes(" - ")) {
        packageName = p.name.split(" - ").slice(1).join(" - ").trim();
      }

      const originalPrice = p.discount ? parseFloat(p.discount) : p.price;
      const finalPrice = p.price;

      // Check if custom package parameters are stored in parsed dbDetails
      let dbPkg = null;
      if (dbDetails && Array.isArray(dbDetails.packages)) {
        dbPkg = dbDetails.packages.find((dp: any) => dp.sku === p.sku || dp.name === packageName);
      }

      return {
        id: `${p.id}-${index}`,
        sku: p.sku,
        name: packageName,
        price: `Rp ${finalPrice.toLocaleString("id-ID")}`,
        rawPrice: originalPrice,
        discountedPrice: finalPrice,
        discount: p.discount || "",
        afterDiscount: p.discount ? `Rp ${finalPrice.toLocaleString("id-ID")}` : undefined,
        suitableFor: dbPkg?.suitableFor || (p.duration ? `Durasi: ${p.duration}` : undefined),
        services: dbPkg?.services || p.features || [],
        goal: dbPkg?.goal || (p.photoCount ? `Sertifikasi: ${p.photoCount}` : undefined),
        imageUrl: dbPkg?.imageUrl || null,
      };
    });

    // Resolve subtitle/desc
    let desc = dbDetails?.subtitle || `Program unggulan ${programName} untuk mempersiapkan keahlian profesional Anda.`;

    const startingPrice = parsedPackages.length > 0 
      ? Math.min(...parsedPackages.map((p: any) => p.rawPrice))
      : 0;

    const startingDiscountedPrice = parsedPackages.length > 0 
      ? Math.min(...parsedPackages.map((p: any) => p.discountedPrice))
      : 0;

    // Resolve poster URLs priority: dbDetails.posterUrls -> dbProds[0].image
    let posterImageStr = null;
    if (dbDetails && Array.isArray(dbDetails.posterUrls) && dbDetails.posterUrls.length > 0) {
      posterImageStr = dbDetails.posterUrls.join(",");
    }

    grouped[programName] = {
      name: programName,
      fee: "Sesuai Ketentuan",
      unit: "pendaftaran",
      icon: IconComp,
      desc,
      image: posterImageStr || dbProds[0].image || null,
      startingPrice,
      startingDiscountedPrice,
      url: `/daftar-pelatihan?pkg=${programName.toLowerCase().replace(/\s+/g, "-")}`,
      packages: parsedPackages,
      dbDetails: dbDetails,
    };
  });

  return Object.values(grouped);
}

// --- MAIN PAGE COMPONENT ---
function DaftarPelatihanContent() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [activeProduct, setActiveProduct] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-open detailed program modal if pkg is passed in URL
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    if (pkg && productsList.length > 0) {
      let found: any = null;
      let targetPackageId = "";

      // Try finding exact match by sku
      for (const product of productsList) {
        const pkgMatch = product.packages?.find((p: any) => p.sku === pkg);
        if (pkgMatch) {
          found = product;
          targetPackageId = pkgMatch.id;
          break;
        }
      }

      if (!found) {
        const targetName = pkgSlugMap[pkg.toLowerCase()];
        found = productsList.find((p) => p.name === (targetName || pkg) || p.name.toLowerCase() === pkg.toLowerCase().replace(/-/g, " "));
      }

      if (found) {
        setActiveProduct(found);
        if (targetPackageId) {
          setShowEnrollModal(true);
        }
      }
    }
  }, [searchParams, productsList]);

  // Reset expanded package when active product changes
  useEffect(() => {
    setExpandedPkg(null);
  }, [activeProduct]);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const settingsRes = await getSiteSettings();
        if (settingsRes) {
          setSettings(settingsRes);
        }

        const productsRes = await getProducts();
        let dbData: any[] = [];
        if (productsRes.success && Array.isArray(productsRes.data)) {
          dbData = productsRes.data.filter((p: any) => p.isActive);
        }

        // Gunakan DB sebagai sumber utama.
        const sourceProducts = dbData;
        const parsed = parseProductsFromDb(sourceProducts);
        setProductsList(parsed);
      } catch (err) {
        console.error("Gagal memuat portal pelatihan data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#004aad] flex flex-col items-center justify-center space-y-4 text-white">
        <Spinner size={32} className="text-[#004aad]" />
        <p className="text-xs text-white/40 font-bold uppercase tracking-wider font-mono">Memuat Halaman Pelatihan...</p>
      </div>
    );
  }

  // Active product details resolution
  const details = activeProduct ? (() => {
    const dbD = activeProduct.dbDetails || {};
    return {
      subtitle: dbD.subtitle || "Pelatihan Kompetensi & Keahlian Terintegrasi",
      intro: dbD.intro || "Tingkatkan keahlian kompetensi Anda bersama mentor industri ahli melalu kurikulum berbasis praktik nyata.",
      packages: activeProduct.packages || [],
      whyInteresting: dbD.whyInteresting || [],
      targetMarket: dbD.targetMarket || [],
      disclaimer: dbD.disclaimer || "Jadwal dan materi kelas diatur setelah konfirmasi pendaftaran selesai."
    };
  })() : null;

  return (
    <>
      {/* Enroll Form Modal (popup) */}
      <AnimatePresence>
        {showEnrollModal && activeProduct && (
          <EnrollModal
            product={activeProduct}
            siteSettings={settings}
            onClose={() => setShowEnrollModal(false)}
          />
        )}
      </AnimatePresence>

      {/* FULL PAGE DETAIL VIEW */}
      <AnimatePresence>
        {activeProduct && details && (
          <motion.div
            key="detail-fullpage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-[#004aad] overflow-y-auto"
          >
            {/* Back Bar */}
            <div className="sticky top-0 z-10 bg-[#004aad]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
              <button
                onClick={() => setActiveProduct(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-black text-[11px] uppercase tracking-widest cursor-pointer"
              >
                <ArrowLeft size={16} />
                Kembali ke Daftar Program
              </button>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 pb-24">
              {/* Program Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad]/25 border border-[#004aad]/40 flex items-center justify-center text-[#004aad] flex-shrink-0">
                  <activeProduct.icon size={26} />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-tight">{activeProduct.name}</h1>
                  <p className="text-[11px] text-white/40 font-bold mt-1 uppercase tracking-wider">{details.subtitle}</p>
                </div>
              </div>

              {/* Poster */}
              {(() => {
                // Prioritas: image dari DB → settings poster → DEFAULT_POSTERS fallback
                const posterKeyCi2 = POSTER_KEYS[activeProduct.name]
                  || POSTER_KEYS[Object.keys(POSTER_KEYS).find(k => k.toLowerCase() === activeProduct.name.toLowerCase()) || ""]
                  || `training_poster_${activeProduct.name.toLowerCase().replace(/\s+/g, "_")}`;
                const defaultPosterCi2 = DEFAULT_POSTERS[activeProduct.name]
                  || DEFAULT_POSTERS[Object.keys(DEFAULT_POSTERS).find(k => k.toLowerCase() === activeProduct.name.toLowerCase()) || ""]
                  || "";
                const rawPosters = activeProduct.image || settings[posterKeyCi2] || defaultPosterCi2 || "";
                const posterUrls = rawPosters.split(",").map((u: string) => u.trim()).filter(Boolean);
                return posterUrls.length > 0 ? (
                  <div className="mb-8 max-w-xs mx-auto">
                    <ProgramPosterCarousel
                      urls={posterUrls}
                      productName={activeProduct.name}
                      onImageClick={(url) => setLightboxUrl(url)}
                    />
                  </div>
                ) : null;
              })()}

              {details ? (
                <div className="space-y-8 mt-6">
                  {/* Intro */}
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-6">{details.intro}</p>

                  {/* Dynamic Packages */}
                  {activeProduct.packages && activeProduct.packages.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em]">Pilihan Paket & Investasi</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {activeProduct.packages.map((pkg: any, idx: number) => (
                          <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#004aad]/40 transition-colors flex flex-col md:flex-row gap-6 justify-between">
                            {pkg.imageUrl && (
                              <div className="w-full md:w-80 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-slate-900/10">
                                <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="text-xs font-black text-white uppercase tracking-wide">{pkg.name}</h4>
                                {pkg.suitableFor && (
                                  <p className="text-[9px] text-white/50 mt-1 font-medium leading-relaxed">{pkg.suitableFor}</p>
                                )}
                                {pkg.services && pkg.services.length > 0 && (
                                  <ul className="mt-4 space-y-1.5">
                                    {pkg.services.map((srv: string, sIdx: number) => (
                                      <li key={sIdx} className="text-[10px] text-white/75 font-bold flex items-start gap-2">
                                        <CheckCircle2 size={12} className="text-[#004aad] flex-shrink-0 mt-0.5" />
                                        <span>{srv}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {pkg.goal && (
                                  <p className="text-[9px] text-[#004aad] uppercase font-black tracking-wider mt-4">{pkg.goal}</p>
                                )}
                              </div>
                              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                <div>
                                  <span className="block text-[8px] text-white/40 font-black uppercase tracking-wider">Investasi</span>
                                  <span className="text-xs font-black text-white font-sans">{pkg.price}</span>
                                </div>
                                {pkg.afterDiscount && (
                                  <div className="text-right">
                                    <span className="block text-[8px] text-sky-400 font-black uppercase tracking-wider">Promo Khusus</span>
                                    <span className="text-xs font-black text-sky-400 font-sans">{pkg.afterDiscount}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why Interesting */}
                  {details.whyInteresting && details.whyInteresting.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em]">Mengapa Memilih Program Ini?</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {details.whyInteresting.map((item: string, idx: number) => (
                          <li key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-bold flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#004aad]/25 border border-[#004aad]/40 flex items-center justify-center text-[#004aad] text-[10px] font-black">{idx + 1}</div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Target Market */}
                  {details.targetMarket && details.targetMarket.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em]">Siapa Yang Cocok Mengikuti?</h3>
                      <div className="flex flex-wrap gap-2">
                        {details.targetMarket.map((m: string, idx: number) => (
                          <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white/70 uppercase tracking-wider">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer */}
                  {details.disclaimer && (
                    <p className="text-[10px] text-white/30 italic font-medium leading-relaxed border-t border-white/5 pt-6">{details.disclaimer}</p>
                  )}
                </div>
              ) : (
                <p className="text-white/40 text-sm text-center py-16">Detail silabus dan kurikulum program belum tersedia.</p>
              )}

              {/* Bottom CTA to Enroll */}
              <div className="mt-12">
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#004aad] hover:bg-[#003984] text-white text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#004aad]/20 cursor-pointer"
                >
                  Daftar Kelas Pelatihan Sekarang
                  <GraduationCap size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Poster Lightbox */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxUrl(null)}
          >
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightboxUrl}
              alt="Poster Lightbox Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#f0f7ff] overflow-x-hidden w-full">
        {/* -- Premium Asymmetrical White-Dominant Hero Banner for Training -- */}
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-gradient-to-br from-white via-sky-50/50 to-white text-[#1a6fd4] w-full border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.12),transparent_55%)] z-0 pointer-events-none" />

          {/* Animated subtle background orbs */}
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-sky-400/10 blur-[100px] z-0 animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[80px] z-0 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-bold uppercase tracking-[0.15em]">
                <Sparkles size={12} className="animate-pulse" />
                Portal Pembelajaran & Karir
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#004aad] leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Katalog Kelas & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">Pelatihan Premium</span>
              </h1>
              <p className="text-slate-505 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                Tingkatkan kompetensi Anda melalui program pelatihan intensif, bimbingan tugas akhir privat, serta sertifikasi keahlian berstandar industri bersama mentor senior.
              </p>
              <div className="pt-2">
                <a
                  href="#program-list"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold uppercase tracking-wider text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-sky-500/20"
                >
                  Jelajahi Program Pelatihan
                  <ArrowRight size={14} className="hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[420px] grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, title: "Privat Intensif", desc: "Bimbingan satu-satu terarah" },
                { icon: Sparkles, title: "Praktisi Ahli", desc: "Didampingi mentor industri senior" },
                { icon: TrendingUp, title: "Karir Akseleratif", desc: "Persiapan matang ke dunia kerja" },
                { icon: Award, title: "Sertifikat Resmi", desc: "Kredensial berharga portofolio" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-sky-100/60 rounded-3xl p-5 flex flex-col items-start text-left hover:border-sky-300 hover:shadow-xl transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 mb-4">
                    <f.icon size={18} />
                  </div>
                  <h3 className="font-bold text-[#1a6fd4] text-sm mb-1">{f.title}</h3>
                  <p className="text-[10px] text-sky-500 font-semibold leading-normal">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Products Grid -- */}
        <section id="program-list" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[#004aad] uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Pilihan Kelas & <span className="text-[#004aad]">Pelatihan</span>
              </h2>
              <p className="text-sky-500 font-bold max-w-xl mx-auto text-sm">
                Klik <span className="text-[#004aad] font-black">Lihat Detail Program</span> pada katalog di bawah ini untuk melihat rincian silabus kelas, skema investasi, dan formulir pendaftaran.
              </p>
            </div>

            {/* Search Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-[#f0f7ff]/50 p-4 rounded-3xl border border-[#004aad]/5">
              <div className="text-xs font-black uppercase tracking-widest text-[#1e293b]/50 pl-2">
                Daftar Program ({filteredProducts.length})
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" size={16} />
                <input
                  type="text"
                  placeholder="Cari kelas pelatihan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-[#004aad]/10 rounded-2xl text-xs font-bold text-[#004aad] focus:outline-none focus:ring-2 focus:ring-[#004aad]/30 focus:border-[#004aad] transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 hover:text-[#004aad]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-16 text-center text-sky-500 font-bold uppercase tracking-widest text-xs">
                  Tidak ada kelas pelatihan ditemukan
                </div>
              ) : (
                filteredProducts.map((prod, i) => {
                  // Prioritas: image dari DB → settings poster → DEFAULT_POSTERS fallback
                  const posterKeyExact = POSTER_KEYS[prod.name];
                  const posterKeyCi = !posterKeyExact
                    ? POSTER_KEYS[Object.keys(POSTER_KEYS).find(k => k.toLowerCase() === prod.name.toLowerCase()) || ""] || ""
                    : posterKeyExact;
                  const defaultPosterCi = DEFAULT_POSTERS[prod.name]
                    || DEFAULT_POSTERS[Object.keys(DEFAULT_POSTERS).find(k => k.toLowerCase() === prod.name.toLowerCase()) || ""]
                    || "";
                  const rawPosters = prod.image || settings[posterKeyCi] || defaultPosterCi || "";
                  const posterUrls = rawPosters
                    .split(",")
                    .map((url: string) => url.trim())
                    .filter(Boolean);

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group overflow-hidden rounded-[2rem] border border-[#004aad]/5 bg-slate-50/50 hover:bg-white hover:border-[#004aad]/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Poster Image Carousel - di atas card */}
                      <ProgramPosterCarousel urls={posterUrls} productName={prod.name} />

                      <div className="p-2">
                        <div className="flex items-start justify-between gap-4 mb-4 mt-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#004aad]/10 flex items-center justify-center text-[#004aad] group-hover:scale-110 transition-transform border border-[#004aad]/20">
                            <prod.icon size={22} />
                          </div>
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-sky-600 border border-emerald-100">
                            Pendaftaran Aktif
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-[#004aad] uppercase mb-2 tracking-wide line-clamp-1 group-hover:text-[#004aad] transition-colors">{prod.name}</h3>
                        <p className="text-[11px] text-sky-600 font-medium leading-relaxed mb-6 line-clamp-3">{prod.desc}</p>
                      </div>

                      <div className="px-6 pb-6 pt-4 border-t border-[#004aad]/5 flex items-center justify-between gap-4 mt-auto">
                        <div>
                          <span className="block text-[8px] text-sky-500 font-black uppercase tracking-wider">Mulai Dari</span>
                          {prod.startingDiscountedPrice < prod.startingPrice ? (
                            <>
                              <span className="block text-[10px] text-sky-500 font-bold line-through mt-0.5">
                                {formatPrice(prod.startingPrice)}
                              </span>
                              <span className="block text-sm font-black text-[#004aad] tracking-wide font-sans">
                                {formatPrice(prod.startingDiscountedPrice)}
                              </span>
                            </>
                          ) : (
                            <span className="block text-sm font-black text-[#004aad] tracking-wide font-sans mt-0.5">
                              {formatPrice(prod.startingPrice || 699000)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setActiveProduct(prod)}
                          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#004aad] hover:bg-[#003984] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          Detail Program
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function DaftarPelatihanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#004aad] flex flex-col items-center justify-center space-y-4 text-white">
        <Spinner size={32} className="text-[#004aad]" />
        <p className="text-xs text-white/40 font-bold uppercase tracking-wider font-mono">Memuat Halaman...</p>
      </div>
    }>
      <DaftarPelatihanContent />
    </Suspense>
  );
}

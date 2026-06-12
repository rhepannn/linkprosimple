"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Coffee, Camera, Presentation, Recycle, MonitorPlay,
  GraduationCap, Users, Building, ShoppingBag, Handshake,
  TrendingUp, Award, CheckCircle2, ChevronRight, ChevronLeft,
  ChevronDown, ArrowRight, X, Search, ArrowLeft, MessageCircle,
  Sparkles, Star, Clock, Phone, ExternalLink, Trophy, Check, Copy,
} from "lucide-react";
import { getProducts } from "@/app/actions/products";
import { createAffiliateLead } from "@/app/actions/affiliate-leads";
import { getSiteSettings } from "@/app/actions/settings";
import { getSuccessStories } from "@/app/actions/success-stories";
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

function ProgramPosterCarousel({ 
  urls, 
  productName, 
  onImageClick,
  aspectRatio = "aspect-[16/9]",
  roundedClass = "rounded-t-[1.8rem] rounded-b-none",
  showThumbnails = false
}: { 
  urls: string[]; 
  productName: string; 
  onImageClick?: (url: string) => void;
  aspectRatio?: string;
  roundedClass?: string;
  showThumbnails?: boolean;
}) {
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

  const isAutoAspect = aspectRatio === "aspect-auto";

  return (
    <div className="space-y-3">
      <div className={`overflow-hidden border-0 relative group/carousel shadow-sm ${roundedClass} bg-slate-50 ${isAutoAspect ? "" : aspectRatio}`}>
        <div className={`w-full relative overflow-hidden ${isAutoAspect ? "" : "h-full"}`}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
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
              className={`w-full select-none touch-pan-y cursor-zoom-in ${isAutoAspect ? "relative block h-auto object-contain" : "absolute inset-0 h-full object-cover object-center"}`}
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
          </>
        )}
      </div>

      {/* Thumbnails below the image */}
      {showThumbnails && urls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-1 custom-scrollbar">
          {urls.map((url, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                const dir = idx > currentIndex ? 1 : -1;
                setPage([idx, dir]);
              }}
              className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                currentIndex === idx ? "border-[#004aad] scale-105" : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <img src={url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
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
  siteSettings,
  defaultPackageId
}: {
  product: any;
  onClose: () => void;
  siteSettings: Record<string, string>;
  defaultPackageId?: string;
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
    if (defaultPackageId) return defaultPackageId;
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
                    {product.packages && product.packages.filter((pkg: any) => searchParams.get("pkg") === pkg.sku ? true : !searchParams.get("pkg") || !product.packages.some((p: any) => p.sku === searchParams.get("pkg"))).map((pkg: any) => {
                      const formatOptionPrice = (priceVal: any) => {
                        if (!priceVal) return "-";
                        const priceStr = String(priceVal);
                        if (priceStr.toLowerCase().includes("menyesuaikan")) return priceStr;
                        const numsOnly = priceStr.replace(/[^0-9]/g, "");
                        if (!numsOnly) return priceStr;
                        return "Rp " + parseInt(numsOnly, 10).toLocaleString("id-ID");
                      };

                      return (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({formatOptionPrice(pkg.afterDiscount || pkg.price)})
                        </option>
                      );
                    })}
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
      programName = p.name;
    }
    if (!dbProdsByProgram[programName]) {
      dbProdsByProgram[programName] = [];
    }
    dbProdsByProgram[programName].push(p);
  });

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

    let dbDetails: any = null;
    const firstProd = dbProds[0];
    if (firstProd && firstProd.details) {
      try {
        dbDetails = typeof firstProd.details === "string" ? JSON.parse(firstProd.details) : firstProd.details;
      } catch (e) {
        console.error("Failed to parse product details JSON:", e);
      }
    }

    let parsedPackages: any[] = [];
    if (dbDetails && Array.isArray(dbDetails.packages) && dbDetails.packages.length > 0) {
      parsedPackages = dbDetails.packages.map((dp: any, index: number) => {
        const rawPrice = parsePriceString(dp.price || "0");
        const discountedPrice = parsePriceString(dp.afterDiscount || dp.price || "0");
        return {
          id: dp.id || `${firstProd.id}-pkg-${index}`,
          sku: firstProd.sku,
          name: dp.name,
          price: dp.price || `Rp ${discountedPrice.toLocaleString("id-ID")}`,
          rawPrice: rawPrice || firstProd.price,
          discountedPrice: discountedPrice || firstProd.price,
          discount: dp.price && dp.afterDiscount && rawPrice > discountedPrice ? `${Math.round((1 - discountedPrice / rawPrice) * 100)}%` : "",
          afterDiscount: dp.afterDiscount && dp.afterDiscount !== dp.price ? dp.afterDiscount : undefined,
          suitableFor: dp.suitableFor,
          services: dp.services || [],
          goal: dp.goal,
          imageUrl: dp.imageUrl || null,
        };
      });
    } else {
      parsedPackages = dbProds.map((p: any, index: number) => {
        let packageName = p.name;
        if (p.name.includes(" - ")) {
          packageName = p.name.split(" - ").slice(1).join(" - ").trim();
        }

        const originalPrice = p.discount ? parseFloat(p.discount) : p.price;
        const finalPrice = p.price;

        return {
          id: `${p.id}-${index}`,
          sku: p.sku,
          name: packageName,
          price: `Rp ${finalPrice.toLocaleString("id-ID")}`,
          rawPrice: originalPrice,
          discountedPrice: finalPrice,
          discount: p.discount || "",
          afterDiscount: p.discount ? `Rp ${finalPrice.toLocaleString("id-ID")}` : undefined,
          suitableFor: p.duration ? `Durasi: ${p.duration}` : undefined,
          services: p.features || [],
          goal: p.photoCount ? `Sertifikasi: ${p.photoCount}` : undefined,
          imageUrl: null,
        };
      });
    }

    let desc = dbDetails?.subtitle || `Program unggulan ${programName} untuk mempersiapkan keahlian profesional Anda.`;

    const startingPrice = parsedPackages.length > 0 
      ? Math.min(...parsedPackages.map((p: any) => p.rawPrice))
      : 0;

    const startingDiscountedPrice = parsedPackages.length > 0 
      ? Math.min(...parsedPackages.map((p: any) => p.discountedPrice))
      : 0;

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
  const [enrollPackageId, setEnrollPackageId] = useState<string>("");
  const [urlPackageSku, setUrlPackageSku] = useState<string | null>(null);
  const [successStories, setSuccessStories] = useState<any[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);

  const searchParams = useSearchParams();

  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-open detailed program modal if pkg is passed in URL
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    if (pkg && productsList.length > 0) {
      setUrlPackageSku(pkg);
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
          setEnrollPackageId(targetPackageId);
        }
      }
    }
  }, [searchParams, productsList]);

  // Reset expanded package and handle url package sku matching
  useEffect(() => {
    setExpandedPkg(null);
    const pkg = searchParams.get("pkg");
    if (activeProduct && activeProduct.packages) {
      const isUrlProduct = activeProduct.packages.some((p: any) => p.sku === pkg);
      if (!isUrlProduct) {
        setEnrollPackageId("");
      }
    } else if (!activeProduct) {
      setEnrollPackageId("");
    }
  }, [activeProduct, searchParams]);

  // Fetch success stories when product detail opens
  useEffect(() => {
    if (!activeProduct) return;
    setStoriesLoading(true);
    getSuccessStories(activeProduct.id).then((res) => {
      if (res.success && res.data) setSuccessStories(res.data);
      else setSuccessStories([]);
    }).finally(() => setStoriesLoading(false));
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
            defaultPackageId={enrollPackageId}
            onClose={() => {
              setShowEnrollModal(false);
              setEnrollPackageId("");
            }}
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
            className="fixed inset-0 z-[90] bg-[#f8fafc] overflow-y-auto"
          >
            {/* Back Bar */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
              <button
                onClick={() => setActiveProduct(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-[#004aad] transition-colors font-black text-[11px] uppercase tracking-widest cursor-pointer"
              >
                <ArrowLeft size={16} />
                Kembali ke Daftar Program
              </button>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 pb-24 text-slate-800">
              {/* Program Header */}
              <div className="flex items-center gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad]/10 border border-[#004aad]/25 flex items-center justify-center text-[#004aad] flex-shrink-0">
                  <activeProduct.icon size={26} />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-wide leading-tight">{activeProduct.name}</h1>
                  <p className="text-[11px] text-slate-500 font-bold mt-1 uppercase tracking-wider">{details.subtitle}</p>
                </div>
              </div>

              {details ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
                  {/* Left Column: Poster, Info & Registration Workflow — Sticky */}
                  <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-5">
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
                        <div className="bg-white p-3 rounded-3xl border border-slate-100 shadow-sm">
                          <ProgramPosterCarousel
                            urls={posterUrls}
                            productName={activeProduct.name}
                            onImageClick={(url) => setLightboxUrl(url)}
                            aspectRatio="aspect-auto"
                            roundedClass="rounded-2xl"
                            showThumbnails={posterUrls.length > 1}
                          />
                        </div>
                      ) : null;
                    })()}

                    {/* Quick Program Stats */}
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                      <div className="grid grid-cols-2 gap-3">
                        {activeProduct.packages && activeProduct.packages.length > 0 && (
                          <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 rounded-2xl p-4 text-center">
                            <span className="block text-2xl font-black text-[#004aad]">{activeProduct.packages.length}</span>
                            <span className="block text-[9px] font-bold text-sky-600 uppercase tracking-wider mt-1">Pilihan Paket</span>
                          </div>
                        )}
                        {details.targetMarket && details.targetMarket.length > 0 && (
                          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4 text-center">
                            <span className="block text-2xl font-black text-emerald-600">{details.targetMarket.length}</span>
                            <span className="block text-[9px] font-bold text-emerald-600 uppercase tracking-wider mt-1">Segmen Peserta</span>
                          </div>
                        )}
                        {details.whyInteresting && details.whyInteresting.length > 0 && (
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 text-center">
                            <span className="block text-2xl font-black text-amber-600">{details.whyInteresting.length}</span>
                            <span className="block text-[9px] font-bold text-amber-600 uppercase tracking-wider mt-1">Keunggulan</span>
                          </div>
                        )}
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-4 text-center">
                          <span className="block text-2xl font-black text-violet-600">✓</span>
                          <span className="block text-[9px] font-bold text-violet-600 uppercase tracking-wider mt-1">Bersertifikat</span>
                        </div>
                      </div>
                    </div>

                    {/* Registration Workflow Card */}
                    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                      <h3 className="text-xs font-black text-[#004aad] uppercase tracking-[0.2em] flex items-center gap-1.5">
                        ⚡ Cara Pendaftaran
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex gap-3 items-start">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-100 text-[#004aad] flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">{settings.training_step_1_title || "Pilih Paket Belajar"}</h4>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{settings.training_step_1_desc || "Tentukan tingkat kompetensi yang ingin Anda ikuti di tabel sebelah kanan."}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-100 text-[#004aad] flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">{settings.training_step_2_title || "Isi Formulir"}</h4>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{settings.training_step_2_desc || "Klik tombol \"Pilih Paket\" pada paket tersebut dan lengkapi data diri Anda."}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-100 text-[#004aad] flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">3</div>
                          <div>
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">{settings.training_step_3_title || "Transfer Investasi"}</h4>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{settings.training_step_3_desc || "Lakukan pembayaran sesuai nominal paket ke rekening bank resmi atau scan QRIS yang tampil."}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 items-start">
                          <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-100 text-[#004aad] flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">4</div>
                          <div>
                            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">{settings.training_step_4_title || "Konfirmasi WhatsApp"}</h4>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-0.5">{settings.training_step_4_desc || "Kirim bukti transfer ke admin via WhatsApp untuk verifikasi kelas & aktivasi akun."}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Target Market */}
                    {details.targetMarket && details.targetMarket.length > 0 && (
                      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                        <h3 className="text-xs font-black text-[#004aad] uppercase tracking-[0.2em] flex items-center gap-1.5">🎯 Target Peserta</h3>
                        <div className="flex flex-wrap gap-2">
                          {details.targetMarket.map((m: string, idx: number) => (
                            <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[9px] font-black text-slate-600 uppercase tracking-wider">{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Intro, Advantages & Packages */}
                  <div className="lg:col-span-7 space-y-6">
                    {/* Intro */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                      <h3 className="text-xs font-black text-sky-600 uppercase tracking-[0.2em]">Tentang Program</h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">{details.intro}</p>
                    </div>

                    {/* Why Interesting */}
                    {details.whyInteresting && details.whyInteresting.length > 0 && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <h3 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">Mengapa Memilih Program Ini?</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {details.whyInteresting.map((item: string, idx: number) => (
                            <li key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-bold flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black">{idx + 1}</div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Dynamic Packages */}
                    {activeProduct.packages && activeProduct.packages.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-[0.2em] pl-1">Pilihan Paket & Biaya Pelatihan</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {activeProduct.packages.map((pkg: any, idx: number) => {
                            const formatDisplayPrice = (priceVal: any) => {
                              if (!priceVal) return "-";
                              const priceStr = String(priceVal);
                              if (priceStr.toLowerCase().includes("menyesuaikan")) return priceStr;
                              const numsOnly = priceStr.replace(/[^0-9]/g, "");
                              if (!numsOnly) return priceStr;
                              return "Rp " + parseInt(numsOnly, 10).toLocaleString("id-ID");
                            };
                            const isSelected = enrollPackageId === pkg.id;

                            return (
                              <div 
                                key={idx} 
                                className={`relative p-5 rounded-3xl bg-white border transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start shadow-sm ${
                                  isSelected ? "border-[#004aad] ring-2 ring-[#004aad]/10 shadow-[#004aad]/5" : "border-slate-100 hover:border-sky-500/30"
                                }`}
                              >
                                {pkg.imageUrl && (
                                  <div className="w-full md:w-44 rounded-2xl overflow-hidden border border-slate-100 flex-shrink-0 relative">
                                    <img 
                                      src={pkg.imageUrl} 
                                      alt={pkg.name} 
                                      className="w-full h-auto block" 
                                    />
                                  </div>
                                )}
                                <div className="flex-1 flex flex-col justify-between py-1 w-full">
                                  <div>
                                    {isSelected && (
                                      <div className="inline-flex items-center gap-1 mb-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-sm">
                                        <span>✨</span> Pilihan Rekomendasi
                                      </div>
                                    )}
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">{pkg.name}</h4>
                                    {pkg.suitableFor && (
                                      <p className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">{pkg.suitableFor}</p>
                                    )}
                                    {pkg.services && pkg.services.length > 0 && (
                                      <ul className="mt-4 space-y-2">
                                        {pkg.services.map((srv: string, sIdx: number) => (
                                          <li key={sIdx} className="text-[10px] text-slate-600 font-bold flex items-start gap-2.5">
                                            <CheckCircle2 size={13} className="text-sky-500 flex-shrink-0 mt-0.5" />
                                            <span>{srv}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                    {pkg.goal && (
                                      <p className="text-[9px] text-[#004aad] uppercase font-black tracking-wider mt-4 bg-[#004aad]/5 border border-[#004aad]/10 px-2.5 py-1 rounded-md inline-block">{pkg.goal}</p>
                                    )}
                                  </div>
                                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex gap-6">
                                      <div>
                                        <span className="block text-[8px] text-slate-400 font-black uppercase tracking-wider">Biaya</span>
                                        <span className={`text-xs font-black font-sans ${pkg.afterDiscount ? "line-through text-slate-400 text-[10px]" : "text-slate-800"}`}>{formatDisplayPrice(pkg.price)}</span>
                                      </div>
                                      {pkg.afterDiscount && (
                                        <div>
                                          <span className="block text-[8px] text-sky-500 font-black uppercase tracking-wider">Promo Khusus</span>
                                          <span className="text-xs font-black text-sky-500 font-sans">{formatDisplayPrice(pkg.afterDiscount)}</span>
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => {
                                        setEnrollPackageId(pkg.id);
                                        setShowEnrollModal(true);
                                      }}
                                      className="flex items-center gap-1.5 px-4.5 py-2.5 bg-[#004aad] hover:bg-[#003984] text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-[#004aad]/10"
                                    >
                                      Pilih Paket <ArrowRight size={10} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Disclaimer */}
                    {details.disclaimer && (
                      <p className="text-[10px] text-slate-400 italic font-medium leading-relaxed border-t border-slate-200/60 pt-6">{details.disclaimer}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-slate-400 text-sm text-center py-16">{settings.training_empty_text || "Detail silabus dan kurikulum program belum tersedia."}</p>
              )}

              {/* ── Success Stories ── */}
              {successStories.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-black text-[#004aad] uppercase tracking-[0.2em] flex items-center gap-1.5">
                    <Trophy size={14} /> Cerita Sukses Alumni
                  </h3>
                  <div className="space-y-4">
                    {successStories.map((s: any) => (
                      <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-start gap-4">
                          {s.photoUrl ? (
                            <img src={s.photoUrl} alt={s.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-400 font-black text-sm flex-shrink-0">
                              {s.name?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div>
                                <p className="text-[11px] font-black text-slate-800">{s.name}</p>
                                {s.role && <p className="text-[9px] text-slate-400 font-medium">{s.role}</p>}
                              </div>
                              {s.achievement && (
                                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[8px] font-black uppercase flex-shrink-0">{s.achievement}</span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{s.story}</p>

                            {/* Before / After */}
                            {(s.beforeLabel || s.afterLabel) && (
                              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-50">
                                {s.beforeLabel && (
                                  <div className="bg-rose-50/50 rounded-xl p-3 border border-rose-100">
                                    <p className="text-[8px] font-black text-rose-400 uppercase tracking-wider mb-0.5">Sebelum</p>
                                    <p className="text-[10px] font-bold text-rose-600">{s.beforeLabel}</p>
                                  </div>
                                )}
                                {s.afterLabel && (
                                  <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100">
                                    <p className="text-[8px] font-black text-emerald-400 uppercase tracking-wider mb-0.5">Sesudah</p>
                                    <p className="text-[10px] font-bold text-emerald-600">{s.afterLabel}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Consultation CTA */}
              <div className="mt-12 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">{settings.training_cta_title || "Masih Bingung Memilih Paket?"}</h4>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">{settings.training_cta_desc || "Konsultasikan kebutuhan belajar atau pertanyaan Anda secara gratis dengan tim admin kami."}</p>
                </div>
                <a
                  href={`https://wa.me/${settings.training_payment_wa || settings.affiliate_whatsapp || settings.contact_wa || "628138298543"}?text=${encodeURIComponent(
                    `Halo Admin! Saya tertarik dengan program *${activeProduct.name}* tetapi ingin berkonsultasi terlebih dahulu mengenai pilihan paket yang paling cocok untuk saya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-emerald-500/10 cursor-pointer"
                >
                  {settings.training_cta_btn || "Tanya Admin via WhatsApp"}
                  <MessageCircle size={14} />
                </a>
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
                {settings.training_hero_badge || "Portal Pembelajaran & Karir"}
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#004aad] leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {settings.training_hero_title || "Katalog Kelas & Pelatihan Premium"}
              </h1>
              <p className="text-slate-505 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                {settings.training_hero_desc || "Tingkatkan kompetensi Anda melalui program pelatihan intensif, bimbingan tugas akhir privat, serta sertifikasi keahlian berstandar industri bersama mentor senior."}
              </p>
              <div className="pt-2">
                <a
                  href="#program-list"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold uppercase tracking-wider text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-sky-500/20"
                >
                  {settings.training_hero_btn || "Jelajahi Program Pelatihan"}
                  <ArrowRight size={14} className="hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[420px] grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, title: settings.training_feature_1_title || "Privat Intensif", desc: settings.training_feature_1_desc || "Bimbingan satu-satu terarah" },
                { icon: Sparkles, title: settings.training_feature_2_title || "Praktisi Ahli", desc: settings.training_feature_2_desc || "Didampingi mentor industri senior" },
                { icon: TrendingUp, title: settings.training_feature_3_title || "Karir Akseleratif", desc: settings.training_feature_3_desc || "Persiapan matang ke dunia kerja" },
                { icon: Award, title: settings.training_feature_4_title || "Sertifikat Resmi", desc: settings.training_feature_4_desc || "Kredensial berharga portofolio" },
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
                {settings.training_section_title || "Pilihan Kelas & Pelatihan"}
              </h2>
              <p className="text-sky-500 font-bold max-w-xl mx-auto text-sm">
                {settings.training_section_desc || "Klik Lihat Detail Program pada katalog di bawah ini untuk melihat rincian silabus kelas, skema investasi, dan formulir pendaftaran."}
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
                  placeholder={settings.training_search_placeholder || "Cari kelas pelatihan..."}
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
                            {settings.training_card_badge || "Pendaftaran Aktif"}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-[#004aad] uppercase mb-2 tracking-wide line-clamp-1 group-hover:text-[#004aad] transition-colors">{prod.name}</h3>
                        <p className="text-[11px] text-sky-600 font-medium leading-relaxed mb-6 line-clamp-3">{prod.desc}</p>
                      </div>

                      <div className="px-6 pb-6 pt-4 border-t border-[#004aad]/5 mt-auto">
                        <button
                          onClick={() => setActiveProduct(prod)}
                          className="w-full flex items-center justify-center gap-1.5 px-4 py-3 bg-[#004aad] hover:bg-[#003984] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
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

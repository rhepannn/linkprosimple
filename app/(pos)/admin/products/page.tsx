"use client";

import React, { useState, useEffect } from "react";
import { getProducts, updateProductDetails } from "@/app/actions/products";
import {
  Package,
  Plus,
  Trash2,
  Save,
  Loader2,
  X,
  Edit3,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  GripVertical,
  Coffee,
  GraduationCap,
  Award,
  TrendingUp,
  Building,
  MonitorPlay,
  Presentation,
  Users,
  Recycle,
  ShoppingBag,
  Handshake,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────

interface PackageItem {
  id: string;
  name: string;
  price: string;
  afterDiscount: string;
  services: string[];
  suitableFor: string;
  goal: string;
}

interface ProductDetail {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  isActive: boolean;
  subtitle: string;
  intro: string;
  packages: PackageItem[];
  whyInteresting: string[];
  targetMarket: string[];
  disclaimer: string;
  posterUrls: string[];
}

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

const formatPrice = (p: number) => "Rp " + p.toLocaleString("id-ID");

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
    <div className="overflow-hidden rounded-t-[1.8rem] rounded-b-none border-0 aspect-[16/9] bg-slate-900/5 relative group/carousel shadow-sm">
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
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10 cursor-pointer border border-white/10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10 cursor-pointer border border-white/10"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
            {urls.map((_, idx) => (
              <button
                key={idx}
                type="button"
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

// ─── Helpers ────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

function emptyPackage(): PackageItem {
  return {
    id: uid(),
    name: "",
    price: "",
    afterDiscount: "",
    services: [""],
    suitableFor: "",
    goal: "",
  };
}

const inputCls =
  "w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 " +
  "focus:outline-none focus:ring-2 focus:ring-[#004aad]/20 focus:border-[#004aad] transition-all placeholder:text-slate-300";

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
      {children} {required && <span className="text-rose-400">*</span>}
    </label>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#0ea5e9] mb-3">
      {children}
    </p>
  );
}

// ─── Package Editor ─────────────────────────────────────────────────────────

function PackageEditor({
  pkg,
  idx,
  onChange,
  onRemove,
}: {
  pkg: PackageItem;
  idx: number;
  onChange: (p: PackageItem) => void;
  onRemove: () => void;
}) {
  const update = (field: keyof PackageItem, val: any) =>
    onChange({ ...pkg, [field]: val });
  const updateSrv = (i: number, val: string) => {
    const s = [...pkg.services];
    s[i] = val;
    onChange({ ...pkg, services: s });
  };
  const addSrv = () => onChange({ ...pkg, services: [...pkg.services, ""] });
  const removeSrv = (i: number) =>
    onChange({ ...pkg, services: pkg.services.filter((_, si) => si !== i) });

  return (
    <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50/60">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <GripVertical size={12} /> Paket #{idx + 1}
        </span>
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-rose-400 hover:bg-rose-50 border border-rose-100 transition-colors"
        >
          <Trash2 size={13} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <FieldLabel required>Nama Paket</FieldLabel>
          <input
            type="text"
            value={pkg.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="cth: ?? Promo H-21 dan Seterusnya"
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel>Harga Asli</FieldLabel>
          <input
            type="text"
            value={pkg.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="cth: Rp 699.000"
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel>Harga Setelah Promo</FieldLabel>
          <input
            type="text"
            value={pkg.afterDiscount}
            onChange={(e) => update("afterDiscount", e.target.value)}
            placeholder="cth: Rp 199.000"
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel>Cocok Untuk / Durasi</FieldLabel>
          <input
            type="text"
            value={pkg.suitableFor}
            onChange={(e) => update("suitableFor", e.target.value)}
            placeholder="cth: Durasi 2 hari intensif"
            className={inputCls}
          />
        </div>
        <div className="md:col-span-2">
          <FieldLabel>Target / Goal Paket</FieldLabel>
          <input
            type="text"
            value={pkg.goal}
            onChange={(e) => update("goal", e.target.value)}
            placeholder="cth: Sertifikasi Resmi Termasuk"
            className={inputCls}
          />
        </div>
      </div>
      <div>
        <FieldLabel>Daftar Layanan / Fitur Paket</FieldLabel>
        <div className="space-y-2">
          {pkg.services.map((srv, si) => (
            <div key={si} className="flex gap-2">
              <input
                type="text"
                value={srv}
                onChange={(e) => updateSrv(si, e.target.value)}
                placeholder={`Fitur ${si + 1}`}
                className={inputCls}
              />
              {pkg.services.length > 1 && (
                <button
                  onClick={() => removeSrv(si)}
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-rose-400 hover:bg-rose-50 border border-rose-100 transition-colors"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSrv}
            className="text-[10px] font-black text-[#004aad] uppercase tracking-wider flex items-center gap-1.5 hover:opacity-70 transition-opacity mt-1"
          >
            <Plus size={12} /> Tambah Fitur
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Poster Manager — gambar ADAPTIVE ───────────────────────────────────────

function PosterManager({
  urls,
  onChange,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const add = () => onChange([...urls, ""]);
  const update = (i: number, val: string) => {
    const n = [...urls];
    n[i] = val;
    onChange(n);
  };
  const remove = (i: number) => onChange(urls.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-2">
      <FieldLabel>URL Gambar Poster</FieldLabel>
      <p className="text-[9px] text-slate-400 font-medium mb-2">
        Bisa lebih dari satu (carousel). Bingkai otomatis menyesuaikan ukuran
        gambar asli.
      </p>
      {urls.map((url, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1.5">
            <input
              type="text"
              value={url}
              onChange={(e) => update(i, e.target.value)}
              placeholder="https://example.com/poster.jpg"
              className={inputCls}
            />
            {url && (
              <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                {/* Adaptive: w-full h-auto, ukuran bingkai ikut rasio gambar */}
                <img
                  src={url}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-auto object-contain block max-h-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => remove(i)}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-rose-400 hover:bg-rose-50 border border-rose-100 transition-colors mt-0.5"
          >
            <X size={13} />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="text-[10px] font-black text-[#004aad] uppercase tracking-wider flex items-center gap-1.5 hover:opacity-70 transition-opacity"
      >
        <Plus size={12} /> Tambah Gambar
      </button>
    </div>
  );
}

// ─── String List Editor ──────────────────────────────────────────────────────

function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, val: string) => {
    const n = [...items];
    n[i] = val;
    onChange(n);
  };
  const add = () => onChange([...items, ""]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder || `Item ${i + 1}`}
              className={inputCls}
            />
            {items.length > 1 && (
              <button
                onClick={() => remove(i)}
                className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-rose-400 hover:bg-rose-50 border border-rose-100 transition-colors"
              >
                <X size={13} />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={add}
          className="text-[10px] font-black text-[#004aad] uppercase tracking-wider flex items-center gap-1.5 hover:opacity-70 transition-opacity"
        >
          <Plus size={12} /> Tambah Item
        </button>
      </div>
    </div>
  );
}

// ─── Product Detail Form ─────────────────────────────────────────────────────

function ProductDetailForm({
  product,
  onBack,
  onSaved,
}: {
  product: ProductDetail;
  onBack: () => void;
  onSaved: (updated: ProductDetail) => void;
}) {
  const [form, setForm] = useState<ProductDetail>({ ...product });
  const [saving, setSaving] = useState(false);

  const update = (field: keyof ProductDetail, val: any) =>
    setForm((f) => ({ ...f, [field]: val }));

  const updatePackage = (idx: number, pkg: PackageItem) =>
    setForm((f) => {
      const packages = [...f.packages];
      packages[idx] = pkg;
      return { ...f, packages };
    });

  const removePackage = (idx: number) =>
    setForm((f) => ({
      ...f,
      packages: f.packages.filter((_, i) => i !== idx),
    }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await updateProductDetails(form.id, {
        subtitle: form.subtitle,
        intro: form.intro,
        packages: form.packages,
        whyInteresting: form.whyInteresting,
        targetMarket: form.targetMarket,
        disclaimer: form.disclaimer,
        posterUrls: form.posterUrls,
      });
      if (res?.success) {
        toast.success("Detail produk berhasil disimpan!");
        onSaved(form);
      } else {
        toast.error(res?.error ?? "Gagal menyimpan.");
      }
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-700 text-xs font-black uppercase tracking-wider transition-colors"
      >
        <ArrowLeft size={14} /> Kembali ke Daftar Produk
      </button>

      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-[#1e293b] flex items-center justify-center text-white">
          <Package size={22} />
        </div>
        <div>
          <h2 className="text-xl font-black text-[#1e293b] tracking-tight">
            {form.name}
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            SKU: {form.sku} · {form.category}
          </p>
        </div>
      </div>

      {/* Info Dasar */}
      <div className="space-y-4">
        <SectionLabel>Informasi Dasar Program</SectionLabel>
        <div>
          <FieldLabel required>Subtitle / Tagline Program</FieldLabel>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => update("subtitle", e.target.value)}
            placeholder="cth: Program Perencanaan Karier Mahasiswa Menuju Dunia Kerja"
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel required>Deskripsi / Intro Program</FieldLabel>
          <textarea
            value={form.intro}
            onChange={(e) => update("intro", e.target.value)}
            rows={6}
            placeholder="Tuliskan deskripsi lengkap program..."
            className={inputCls + " resize-y"}
          />
        </div>
        <div>
          <FieldLabel>Disclaimer / Catatan Penutup</FieldLabel>
          <textarea
            value={form.disclaimer}
            onChange={(e) => update("disclaimer", e.target.value)}
            rows={2}
            placeholder="cth: Jadwal kelas diatur setelah konfirmasi pendaftaran selesai."
            className={inputCls + " resize-none"}
          />
        </div>
      </div>

      {/* Gambar Poster */}
      <div className="pt-4 border-t border-slate-100">
        <SectionLabel>Gambar Poster Program</SectionLabel>
        <PosterManager
          urls={form.posterUrls}
          onChange={(urls) => update("posterUrls", urls)}
        />
      </div>

      {/* Paket & Harga */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <SectionLabel>Pilihan Paket & Investasi</SectionLabel>
          <button
            onClick={() =>
              setForm((f) => ({
                ...f,
                packages: [...f.packages, emptyPackage()],
              }))
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#004aad] hover:bg-[#003984] text-white text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors"
          >
            <Plus size={12} /> Tambah Paket
          </button>
        </div>
        {form.packages.length === 0 && (
          <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-2xl">
            <Package size={24} className="text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-300 font-bold">
              Belum ada paket. Klik "Tambah Paket".
            </p>
          </div>
        )}
        <div className="space-y-4">
          {form.packages.map((pkg, idx) => (
            <PackageEditor
              key={pkg.id}
              pkg={pkg}
              idx={idx}
              onChange={(p) => updatePackage(idx, p)}
              onRemove={() => removePackage(idx)}
            />
          ))}
        </div>
      </div>

      {/* Keunggulan */}
      <div className="pt-4 border-t border-slate-100">
        <SectionLabel>Mengapa Memilih Program Ini?</SectionLabel>
        <StringListEditor
          label="Poin Keunggulan"
          items={form.whyInteresting.length > 0 ? form.whyInteresting : [""]}
          onChange={(items) => update("whyInteresting", items)}
          placeholder="cth: Modul CV & LinkedIn review berstandar internasional"
        />
      </div>

      {/* Target Market */}
      <div className="pt-4 border-t border-slate-100">
        <SectionLabel>Siapa Yang Cocok Mengikuti?</SectionLabel>
        <StringListEditor
          label="Target Peserta"
          items={form.targetMarket.length > 0 ? form.targetMarket : [""]}
          onChange={(items) => update("targetMarket", items)}
          placeholder="cth: ?? Mahasiswa semester awal hingga akhir"
        />
      </div>

      {/* Save */}
      <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-60 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {saving ? "Menyimpan..." : "Simpan Detail Produk"}
        </button>
        <button
          onClick={onBack}
          className="px-4 py-3 border border-slate-200 text-slate-400 text-xs font-black uppercase tracking-wider rounded-xl hover:border-slate-300 transition-colors"
        >
          Batal
        </button>
      </div>
    </div>
  );
}

// ─── Product List Item ───────────────────────────────────────────────────────

function ProductListItem({
  product,
  onEdit,
}: {
  product: ProductDetail;
  onEdit: () => void;
}) {
  const hasDetail =
    product.subtitle || product.intro || product.packages.length > 0;
  
  // Resolve poster URLs
  const posterKeyExact = POSTER_KEYS[product.name];
  const posterKeyCi = !posterKeyExact
    ? POSTER_KEYS[Object.keys(POSTER_KEYS).find(k => k.toLowerCase() === product.name.toLowerCase()) || ""] || ""
    : posterKeyExact;
  const defaultPosterCi = DEFAULT_POSTERS[product.name]
    || DEFAULT_POSTERS[Object.keys(DEFAULT_POSTERS).find(k => k.toLowerCase() === product.name.toLowerCase()) || ""]
    || "";
  const posterUrls = product.posterUrls.length > 0 ? product.posterUrls : (defaultPosterCi ? [defaultPosterCi] : []);

  // Icon mapping
  let IconComp = Package;
  for (const key of Object.keys(iconMap)) {
    if (product.name.toLowerCase().includes(key.toLowerCase())) {
      IconComp = iconMap[key];
      break;
    }
  }

  // Prices calculation
  const parsedPrices = product.packages.map((pkg) => {
    const cleanPrice = (priceStr: string) => {
      if (!priceStr || priceStr.toLowerCase().includes("menyesuaikan")) return 0;
      const clean = priceStr.replace(/[^0-9]/g, "");
      return parseInt(clean, 10) || 0;
    };
    return {
      rawPrice: cleanPrice(pkg.price),
      discountedPrice: cleanPrice(pkg.afterDiscount || pkg.price),
    };
  });

  const startingPrice = parsedPrices.length > 0 
    ? Math.min(...parsedPrices.map((p) => p.rawPrice))
    : product.price;

  const startingDiscountedPrice = parsedPrices.length > 0 
    ? Math.min(...parsedPrices.map((p) => p.discountedPrice))
    : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white hover:border-[#004aad]/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Poster Image Carousel */}
      {posterUrls.length > 0 ? (
        <ProgramPosterCarousel urls={posterUrls} productName={product.name} />
      ) : (
        <div className="aspect-[16/9] bg-slate-100 flex flex-col items-center justify-center text-slate-300 border-b border-slate-100">
          <ImageIcon size={32} />
          <span className="text-[10px] uppercase tracking-wider font-bold mt-2">Belum Ada Poster</span>
        </div>
      )}

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#004aad]/10 flex items-center justify-center text-[#004aad] group-hover:scale-110 transition-transform border border-[#004aad]/20 flex-shrink-0">
              <IconComp size={22} />
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                product.isActive
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              {product.isActive ? "Aktif" : "Nonaktif"}
            </span>
          </div>
          
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2 tracking-wide line-clamp-1 group-hover:text-[#004aad] transition-colors">
            {product.name}
          </h3>
          
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">
            SKU: {product.sku}
          </p>

          <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4 line-clamp-3">
            {product.subtitle || product.intro || "Belum ada deskripsi untuk program pelatihan ini."}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {hasDetail ? (
              <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-500 uppercase tracking-wider">
                <CheckCircle2 size={10} /> Detail Lengkap
              </span>
            ) : (
              <span className="text-[9px] font-black text-amber-500 uppercase tracking-wider">
                Belum Ada Detail
              </span>
            )}
            {product.posterUrls.length > 0 && (
              <span className="flex items-center gap-0.5 text-[9px] font-black text-sky-500 uppercase tracking-wider">
                <ImageIcon size={10} /> {product.posterUrls.length} Foto
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
        <div>
          <span className="block text-[8px] text-slate-400 font-black uppercase tracking-wider">Mulai Dari</span>
          {startingDiscountedPrice < startingPrice ? (
            <>
              <span className="block text-[10px] text-slate-400 font-bold line-through mt-0.5">
                {formatPrice(startingPrice)}
              </span>
              <span className="block text-sm font-black text-[#004aad] tracking-wide font-sans">
                {formatPrice(startingDiscountedPrice)}
              </span>
            </>
          ) : (
            <span className="block text-sm font-black text-[#004aad] tracking-wide font-sans mt-0.5">
              {formatPrice(startingPrice || 699000)}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#004aad] hover:bg-[#003984] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
        >
          Edit Detail
          <Edit3 size={11} />
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductDetail | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.success && Array.isArray(res.data)) {
        const mapped: ProductDetail[] = res.data.map((p: any) => {
          let detail: any = {};
          try {
            detail =
              typeof p.details === "string"
                ? JSON.parse(p.details)
                : p.details || {};
          } catch {}
          return {
            id: p.id,
            name: p.name,
            sku: p.sku,
            category: p.category || "Umum",
            price: p.price || 0,
            isActive: p.isActive ?? true,
            subtitle: detail.subtitle || "",
            intro: detail.intro || "",
            packages: detail.packages || [],
            whyInteresting: detail.whyInteresting || [],
            targetMarket: detail.targetMarket || [],
            disclaimer: detail.disclaimer || "",
            posterUrls: detail.posterUrls || [],
          };
        });
        setProducts(mapped);
      }
    } catch {
      toast.error("Gagal memuat produk.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaved = (updated: ProductDetail) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingProduct(null);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (editingProduct) {
    return (
      <div className="p-8 lg:p-12 max-w-[900px] mx-auto min-h-screen">
        <ProductDetailForm
          product={editingProduct}
          onBack={() => setEditingProduct(null)}
          onSaved={handleSaved}
        />
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1200px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-[0.4em]">
            Inventory Management
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1e293b] flex items-center justify-center text-white shadow-xl shadow-[#1e293b]/20">
              <Package size={24} />
            </div>
            <h1
              className="text-4xl font-black text-[#1e293b] tracking-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Katalog Program Pelatihan
            </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium max-w-md">
            Klik <strong className="text-[#004aad]">Edit Detail</strong> untuk
            mengubah subtitle, deskripsi, paket harga, foto poster, dan info
            lainnya per produk.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-2.5 shadow-sm max-w-sm">
        <Package size={16} className="text-slate-300 flex-shrink-0" />
        <input
          type="text"
          placeholder="Cari nama produk atau SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 text-xs font-semibold text-slate-700 bg-transparent focus:outline-none placeholder:text-slate-300"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-slate-300 hover:text-slate-500"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Memuat produk...
          </span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-300 font-bold uppercase tracking-wider text-xs">
          {searchQuery ? "Tidak ada produk yang cocok." : "Belum ada produk."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prod) => (
            <ProductListItem
              key={prod.id}
              product={prod}
              onEdit={() => setEditingProduct(prod)}
            />
          ))}
        </div>
      )}

      {/* Stats */}
      {!loading && products.length > 0 && (
        <div className="flex gap-6 pt-4 border-t border-slate-100">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
              Total Produk
            </p>
            <p className="text-xl font-black text-slate-700">
              {products.length}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
              Sudah Berdetail
            </p>
            <p className="text-xl font-black text-emerald-500">
              {
                products.filter((p) => p.subtitle || p.packages.length > 0)
                  .length
              }
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
              Ada Foto
            </p>
            <p className="text-xl font-black text-sky-500">
              {products.filter((p) => p.posterUrls.length > 0).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

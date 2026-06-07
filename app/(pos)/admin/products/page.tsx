"use client";

import React, { useState, useEffect } from "react";
import { getProducts, updateProductDetails, createProduct, deleteProduct, updateProduct } from "@/app/actions/products";
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
  Upload,
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
  imageUrl?: string;
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
            drag="x"
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
            onClick={() => onImageClick?.(urls[currentIndex])}
            className="absolute w-full h-full object-cover cursor-zoom-in"
            alt={productName}
          />
        </AnimatePresence>
      </div>

      {urls.length > 1 && (
        <>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
            onClick={prevSlide}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
            onClick={nextSlide}
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
    imageUrl: "",
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
  const [uploading, setUploading] = useState(false);
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

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      toast.loading("Mengunggah gambar paket...", { id: `upload-pkg-${pkg.id}` });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        update("imageUrl", data.url);
        toast.success("Gambar paket berhasil diunggah!", { id: `upload-pkg-${pkg.id}` });
      } else {
        toast.error("Gagal mengunggah gambar paket.", { id: `upload-pkg-${pkg.id}` });
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat mengunggah.", { id: `upload-pkg-${pkg.id}` });
    } finally {
      setUploading(false);
    }
  };

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
            placeholder="cth: 🎁 Promo H-21 dan Seterusnya"
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

      {/* Package Image URL and Upload */}
      <div className="pt-2 border-t border-slate-200/60 space-y-2">
        <FieldLabel>Gambar Paket (Opsional)</FieldLabel>
        <div className="flex gap-2">
          <input
            type="text"
            value={pkg.imageUrl || ""}
            onChange={(e) => update("imageUrl", e.target.value)}
            placeholder="https://example.com/package-image.jpg atau unggah file..."
            className={inputCls}
          />
          <label className="flex items-center gap-1.5 px-3.5 py-2.5 bg-sky-50 hover:bg-sky-100 text-[#004aad] rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border border-sky-100 transition-all whitespace-nowrap">
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            Unggah Gambar
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {pkg.imageUrl && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative group">
            <img src={pkg.imageUrl} alt="Package image preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => update("imageUrl", "")}
              className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X size={10} />
            </button>
          </div>
        )}
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

// ─── Poster Manager ───────────────────────────────────────

function PosterManager({
  urls,
  onChange,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const add = () => onChange([...urls, ""]);
  const update = (i: number, val: string) => {
    const n = [...urls];
    n[i] = val;
    onChange(n);
  };
  const remove = (i: number) => onChange(urls.filter((_, idx) => idx !== i));

  const handleFileUpload = async (i: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploadingIdx(i);
    try {
      toast.loading("Mengunggah gambar...", { id: `upload-${i}` });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        update(i, data.url);
        toast.success("Gambar berhasil diunggah!", { id: `upload-${i}` });
      } else {
        toast.error("Gagal mengunggah gambar.", { id: `upload-${i}` });
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat mengunggah.", { id: `upload-${i}` });
    } finally {
      setUploadingIdx(null);
    }
  };

  return (
    <div className="space-y-2">
      <FieldLabel>URL Gambar Poster</FieldLabel>
      <p className="text-[9px] text-slate-400 font-medium mb-2">
        Bisa berupa link URL langsung atau unggah file gambar dari perangkat Anda.
      </p>
      {urls.map((url, i) => (
        <div key={i} className="flex gap-2 items-start border border-slate-100 p-3 rounded-2xl bg-slate-50/40">
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => update(i, e.target.value)}
                placeholder="https://example.com/poster.jpg atau unggah file..."
                className={inputCls}
              />
              <label className="flex items-center gap-1.5 px-3.5 py-2.5 bg-sky-50 hover:bg-sky-100 text-[#004aad] rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border border-sky-100 transition-all whitespace-nowrap">
                {uploadingIdx === i ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Upload className="w-3.5 h-3.5" />
                )}
                Unggah File
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(i, file);
                  }}
                  className="hidden"
                  disabled={uploadingIdx !== null}
                />
              </label>
            </div>
            {url && (
              <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={url}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-auto object-contain block max-h-80 mx-auto"
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
    if (!form.name.trim()) {
      toast.error("Nama produk wajib diisi.");
      return;
    }
    if (form.price <= 0) {
      toast.error("Harga dasaran wajib lebih dari 0.");
      return;
    }

    setSaving(true);
    try {
      let activeId = form.id;
      if (activeId === "new") {
        // Create base product first
        const baseRes = await createProduct({
          name: form.name,
          sku: form.sku || `PROD-${Date.now()}`,
          price: Number(form.price),
          categoryName: form.category || "Layanan",
        });
        if (baseRes.success && baseRes.data?.id) {
          activeId = baseRes.data.id;
        } else {
          toast.error(baseRes.error || "Gagal membuat produk baru.");
          setSaving(false);
          return;
        }
      } else {
        // Update existing base product attributes
        const baseRes = await updateProduct(activeId, {
          name: form.name,
          sku: form.sku,
          price: Number(form.price),
          categoryName: form.category,
        });
        if (!baseRes.success) {
          toast.error(baseRes.error || "Gagal memperbarui info dasar produk.");
          setSaving(false);
          return;
        }
      }

      // Update details metadata JSON
      const res = await updateProductDetails(activeId, {
        subtitle: form.subtitle,
        intro: form.intro,
        packages: form.packages,
        whyInteresting: form.whyInteresting,
        targetMarket: form.targetMarket,
        disclaimer: form.disclaimer,
        posterUrls: form.posterUrls,
      });

      if (res?.success) {
        toast.success(form.id === "new" ? "Produk baru berhasil ditambahkan!" : "Detail produk berhasil disimpan!");
        onSaved({ ...form, id: activeId });
      } else {
        toast.error(res?.error ?? "Gagal menyimpan detail.");
      }
    } catch (err: any) {
      console.error(err);
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
            {form.id === "new" ? "Tambah Produk Baru" : form.name}
          </h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            {form.id === "new" ? "Mengisi data produk baru" : `SKU: ${form.sku} · ${form.category}`}
          </p>
        </div>
      </div>

      {/* Info Utama / Dasar */}
      <div className="space-y-4">
        <SectionLabel>Info Utama Produk</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Nama Produk / Program</FieldLabel>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="cth: LP Academic Partner"
              className={inputCls}
            />
          </div>
          <div>
            <FieldLabel>SKU Produk (Opsional)</FieldLabel>
            <input
              type="text"
              value={form.sku}
              onChange={(e) => update("sku", e.target.value)}
              placeholder="Auto-generated jika dikosongkan"
              className={inputCls}
            />
          </div>
          <div>
            <FieldLabel required>Harga Dasaran (Rp)</FieldLabel>
            <input
              type="number"
              value={form.price || ""}
              onChange={(e) => update("price", Number(e.target.value))}
              placeholder="cth: 1500000"
              className={inputCls}
            />
          </div>
          <div>
            <FieldLabel>Kategori</FieldLabel>
            <input
              type="text"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="Default: Layanan"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Info Dasar */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <SectionLabel>Informasi Detail Program</SectionLabel>
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
          placeholder="cth: 🎓 Mahasiswa semester awal hingga akhir"
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
  onDelete,
}: {
  product: ProductDetail;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const hasDetail =
    product.subtitle || product.intro || product.packages.length > 0;

  // Resolve poster URLs
  const posterKeyExact = POSTER_KEYS[product.name];
  const posterKeyCi = !posterKeyExact
    ? POSTER_KEYS[Object.keys(POSTER_KEYS).find(k => k.toLowerCase() === product.name.toLowerCase()) || ""] || ""
    : posterKeyExact;

  const posters = product.posterUrls.length > 0
    ? product.posterUrls
    : (DEFAULT_POSTERS[product.name] || DEFAULT_POSTERS[Object.keys(DEFAULT_POSTERS).find(k => k.toLowerCase() === product.name.toLowerCase()) || ""]
      ? [DEFAULT_POSTERS[product.name] || DEFAULT_POSTERS[Object.keys(DEFAULT_POSTERS).find(k => k.toLowerCase() === product.name.toLowerCase()) || ""]]
      : []);

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div>
        {posters.length > 0 ? (
          <ProgramPosterCarousel urls={posters} productName={product.name} />
        ) : (
          <div className="aspect-[16/9] bg-slate-50 flex flex-col items-center justify-center text-slate-300 rounded-t-[1.8rem]">
            <ImageIcon size={28} strokeWidth={1.5} />
            <p className="text-[10px] font-black uppercase tracking-wider mt-2">
              Tidak ada poster
            </p>
          </div>
        )}

        <div className="p-6 pb-2 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="inline-block text-[8px] font-black tracking-widest text-[#0ea5e9] uppercase bg-[#0ea5e9]/5 px-2.5 py-1 rounded-full border border-[#0ea5e9]/10">
                {product.category}
              </span>
              <h3 className="font-black text-[#1e293b] leading-tight text-base pt-1">
                {product.name}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                SKU: {product.sku}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-slate-700 block">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {product.subtitle && (
            <p
              className="text-xs text-slate-400 italic line-clamp-2 leading-relaxed"
            >
              "{product.subtitle}"
            </p>
          )}

          {/* Badge indicator detail */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {hasDetail ? (
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1 flex items-center gap-1">
                <CheckCircle2 size={10} /> Detail Lengkap
              </span>
            ) : (
              <span className="text-[9px] font-black text-amber-500 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1">
                ⚠️ Butuh Detail
              </span>
            )}
            {product.packages.length > 0 && (
              <span className="text-[9px] font-black text-slate-500 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1">
                📦 {product.packages.length} Paket
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-[#004aad] rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border border-sky-100/50"
        >
          <Edit3 size={12} />
          Edit Detail
        </button>
        <button
          onClick={onDelete}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-rose-400 hover:bg-rose-50 border border-rose-100 transition-colors cursor-pointer"
          title="Hapus Produk"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProductManagement() {
  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      try {
        const res = await deleteProduct(id);
        if (res.success) {
          toast.success("Produk berhasil dihapus!");
          loadProducts();
        } else {
          toast.error(res.error || "Gagal menghapus produk.");
        }
      } catch (err) {
        toast.error("Terjadi kesalahan saat menghapus produk.");
      }
    }
  };

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
    loadProducts(); // Reload all to get updated base fields and fresh sort orders correctly
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
            >
              Katalog Program Pelatihan
            </h1>
          </div>
        </div>
        <button
          onClick={() => setEditingProduct({
            id: "new",
            name: "",
            sku: "",
            category: "Layanan",
            price: 0,
            isActive: true,
            subtitle: "",
            intro: "",
            packages: [],
            whyInteresting: [],
            targetMarket: [],
            disclaimer: "",
            posterUrls: [],
          })}
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer select-none"
        >
          <Plus size={14} />
          Tambah Produk Baru
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prod) => (
            <ProductListItem
              key={prod.id}
              product={prod}
              onEdit={() => setEditingProduct(prod)}
              onDelete={() => handleDeleteProduct(prod.id, prod.name)}
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

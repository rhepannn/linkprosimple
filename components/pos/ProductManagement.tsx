"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit, 
  MoreVertical,
  Package,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Image as ImageIcon,
  Tag,
  Archive,
  RefreshCw,
  X,
  Check,
  ChevronDown,
  LayoutGrid,
  Zap,
  Target,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/app/actions/products";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string | { name: string };
  image: string | null;
  isActive: boolean;
  stock: number;
  duration?: string;
  photoCount?: string;
  features?: string[];
  isPopular?: boolean;
  sortOrder?: number;
}

export default function ProductManagement({ hideHeader = false }: { hideHeader?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const supabase = createClient();

  // Custom Toast State
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Custom Confirmation Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type: "danger" | "warning" | "info" | "success";
    onConfirm: () => void;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Layanan",
    isActive: true,
    image: "",
    duration: "",
    photoCount: "",
    features: "",
    isPopular: false,
    sortOrder: "0"
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file di client
    if (!file.type.startsWith("image/")) {
      showToast("Hanya file gambar yang diperbolehkan (JPG, PNG, WEBP, dll)", "error");
      return;
    }

    // Validasi ukuran (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran file maksimal 5MB", "error");
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "products");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah gambar");
      }

      setFormData(prev => ({ ...prev, image: data.url }));
      setUploadError(null);
    } catch (error: any) {
      const msg = error.message || "Gagal mengunggah gambar";
      setUploadError(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };


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

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await getProducts(true);
      if (res.success) {
        setProducts((res.data as any) || []);
      } else {
        // Fallback ke Supabase jika server action gagal (misal koneksi lokal mati)
        const { data: rawData, error } = await supabase.from("products").select("*, category:categories(name)").order("name");
        if (!error) {
           const transformed = (rawData as any[]).map(p => ({
             ...p,
             category: Array.isArray(p.category) ? p.category[0] : (p.category || { name: "Umum" })
           }));
           setProducts(transformed);
        }
      }
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const featuresList = formData.features.split(",").map(f => f.trim()).filter(Boolean);

    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, {
        name: formData.name,
        price: parseFloat(formData.price),
        categoryName: formData.category,
        image: formData.image || undefined,
        isActive: formData.isActive,
        duration: formData.duration || undefined,
        photoCount: formData.photoCount || undefined,
        features: featuresList,
        isPopular: formData.isPopular,
        sortOrder: parseInt(formData.sortOrder) || 0
      });

      if (!res.success) {
        showToast("Gagal memperbarui produk: " + (res.error || "Error tidak diketahui"), "error");
        return;
      }
    } else {
      const res = await createProduct({
        name: formData.name,
        sku: `STUDIO-${Date.now()}`,
        price: parseFloat(formData.price),
        categoryName: formData.category,
        image: formData.image || undefined,
        duration: formData.duration || undefined,
        photoCount: formData.photoCount || undefined,
        features: featuresList,
        isPopular: formData.isPopular,
        sortOrder: parseInt(formData.sortOrder) || 0
      });

      if (!res.success) {
        showToast("Gagal menambahkan produk: " + (res.error || "Error tidak diketahui"), "error");
        return;
      }
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ 
      name: "", price: "", category: "Layanan", isActive: true, image: "",
      duration: "", photoCount: "", features: "", isPopular: false, sortOrder: "0"
    });
    showToast(editingProduct ? "Produk berhasil diperbarui!" : "Produk baru berhasil ditambahkan!", "success");
    fetchProducts();
  }

  const handleDelete = (p: Product) => {
    setConfirmDialog({
      isOpen: true,
      title: "Hapus Produk?",
      message: `Apakah Anda yakin ingin menghapus "${p.name}" dari katalog? Tindakan ini tidak dapat dibatalkan.`,
      confirmText: "Hapus",
      cancelText: "Batal",
      type: "danger",
      onConfirm: async () => {
        setConfirmDialog(null);
        const res = await deleteProduct(p.id);
        if (res.success) {
          showToast("Produk berhasil dihapus!", "success");
          fetchProducts();
        } else {
          setConfirmDialog({
            isOpen: true,
            title: "Gagal Menghapus",
            message: "Produk yang sudah memiliki riwayat transaksi atau booking tidak bisa dihapus demi menjaga integritas data. Silakan ubah status ketersediaan produk menjadi 'Nonaktif' saja.",
            confirmText: "Mengerti",
            type: "warning",
            onConfirm: () => setConfirmDialog(null)
          });
        }
      }
    });
  };

  const filteredProducts = products.filter(p => {
    const categoryName = typeof p.category === 'string' ? p.category : p.category?.name || "";
    return p.name.toLowerCase().includes(search.toLowerCase()) || 
           categoryName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className={`space-y-12 relative ${!hideHeader ? 'min-h-screen bg-[#FAFAF8] p-6 lg:p-12' : ''}`}>
      {!hideHeader && (
        <>
          {/* ── Background Protocol ── */}
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#3B2211]/5 to-transparent pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3B2211]/3 blur-[120px] rounded-full pointer-events-none" />

          {/* ── Header System ── */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[22px] bg-[#3B2211] flex items-center justify-center text-white shadow-2xl shadow-[#3B2211]/20">
                  <Package size={28} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-[#3B2211] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                      Manajemen Produk
                    </h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3B2211]/40">Katalog Layanan & Inventaris Studio</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-wrap items-center gap-6"
            >
              <button 
                onClick={fetchProducts}
                className="p-4 bg-white border border-[#3B2211]/5 rounded-[20px] text-[#3B2211]/40 hover:text-[#3B2211] hover:shadow-xl transition-all active:scale-90"
              >
                <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
              </button>

              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({ 
                    name: "", price: "", category: "Layanan", isActive: true, image: "",
                    duration: "", photoCount: "", features: "", isPopular: false, sortOrder: "0"
                  });
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-4 px-8 py-5 bg-[#3B2211] !text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#3B2211]/20 hover:scale-105 active:scale-95 transition-all select-none"
              >
                <Plus size={20} />
                Tambah Produk Baru
              </button>

              <button 
                onClick={async () => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "Impor Data?",
                    message: "Apakah Anda yakin ingin mengimpor data produk dari file statis?",
                    confirmText: "Impor",
                    cancelText: "Batal",
                    type: "info",
                    onConfirm: async () => {
                      setConfirmDialog(null);
                      const { seedProductsFromStatic } = await import("@/app/actions/products");
                      const res = await seedProductsFromStatic();
                      if(res.success) {
                        showToast(res.message ?? "Berhasil mengimpor data", "success");
                        fetchProducts();
                      } else {
                        showToast("Gagal mengimpor data", "error");
                      }
                    }
                  });
                }}
                className="flex items-center gap-4 px-6 py-5 bg-amber-500 !text-white rounded-[24px] text-[11px] font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all select-none"
              >
                <Zap size={20} />
                Seed dari Statis
              </button>
            </motion.div>
          </div>
        </>
      )}

      {/* ── Control Bar ── */}
      <div className="flex flex-col xl:flex-row gap-8 relative z-10">
        <div className="relative flex-1 group">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-[#3B2211]/20 group-focus-within:text-[#3B2211] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Cari paket atau SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-16 pr-8 py-6 bg-white border border-[#3B2211]/5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#3B2211]/2 shadow-sm transition-all"
          />
        </div>
        
        <div className="flex items-center gap-4">
          {hideHeader && (
             <button 
              onClick={() => {
                setEditingProduct(null);
                setFormData({ 
                  name: "", price: "", category: "Layanan", isActive: true, image: "",
                  duration: "", photoCount: "", features: "", isPopular: false, sortOrder: "0"
                });
                setIsModalOpen(true);
              }}
              className="flex items-center gap-3 px-8 py-4.5 bg-[#3B2211] !text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3B2211]/10 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <Plus size={16} />
              Tambah Paket
            </button>
          )}
        </div>
      </div>

      {/* ── Product Matrix ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-[420px] bg-white/60 animate-pulse rounded-3xl border border-white shadow-sm" />
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500 group relative overflow-hidden flex flex-col"
              >
                {/* Status Badge */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border z-20 ${
                  p.isActive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  {p.isActive ? 'Active' : 'Inactive'}
                </div>

                <div className="space-y-6 flex-1">
                   <div className="w-full aspect-[4/3] bg-[#F8F6F4] rounded-2xl flex items-center justify-center border border-[#3B2211]/2 overflow-hidden relative">
                     {p.image ? (
                       <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     ) : (
                       <div className="flex flex-col items-center gap-3 text-[#3B2211]/10">
                         <Package size={48} strokeWidth={1} />
                       </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   
                    <div className="space-y-4 px-2">
                       <div className="flex items-center justify-between">
                          {/* SKU removed for simplified studio workflow */}
                       </div>
                      <h3 className="text-lg font-bold text-[#3B2211] leading-tight line-clamp-1 group-hover:text-[#C88A58] transition-colors">{p.name}</h3>
                      
                      {/* Marketing Info Mini */}
                      {(p.duration || p.photoCount) && (
                        <div className="flex gap-2 text-[9px] font-medium text-gray-400">
                          {p.duration && <span>{p.duration}</span>}
                          {p.photoCount && <span>• {p.photoCount}</span>}
                        </div>
                      )}

                      <p className="text-2xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-playfair)" }}>
                        Rp {p.price.toLocaleString('id-ID')}
                      </p>
                   </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F8F6F4] flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Inventory</span>
                      <span className="text-xs font-bold text-[#3B2211]">{p.stock} Units</span>
                   </div>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingProduct(p);
                          setFormData({
                            name: p.name,
                            price: p.price.toString(),
                            category: typeof p.category === 'string' ? p.category : p.category?.name || "Layanan",
                            isActive: p.isActive,
                            image: p.image || "",
                            duration: p.duration || "",
                            photoCount: p.photoCount || "",
                            features: p.features?.join(", ") || "",
                            isPopular: p.isPopular || false,
                            sortOrder: (p.sortOrder || 0).toString()
                          });
                          setIsModalOpen(true);
                        }}
                        className="w-10 h-10 flex items-center justify-center bg-[#F8F6F4] text-[#3B2211]/60 hover:bg-[#3B2211] hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p)}
                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center space-y-8">
               <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center text-[#3B2211]/5 mx-auto border border-[#3B2211]/2 shadow-2xl shadow-[#3B2211]/5">
                 <Search size={64} strokeWidth={1} />
               </div>
               <div>
                  <h3 className="text-2xl font-bold text-[#3B2211]">Produk tidak ditemukan</h3>
                  <p className="text-sm text-[#3B2211]/40 mt-2 tracking-widest uppercase font-black text-[10px]">Coba sesuaikan kata kunci atau filter Anda</p>
               </div>
            </div>
          )}
        </AnimatePresence>
      </div>


      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#3B2211]/20 backdrop-blur-md"
            />
            <motion.div 
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-2xl bg-white rounded-[40px] shadow-5xl relative z-10 overflow-hidden border border-white max-h-[90vh] overflow-y-auto"
            >
               <form onSubmit={handleSubmit} className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-bold text-[#3B2211]" style={{ fontFamily: "var(--font-playfair)" }}>
                        {editingProduct ? 'Modifikasi Produk' : 'Entri Produk Baru'}
                      </h2>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#3B2211]/30">Isi detail katalog dengan presisi</p>
                    </div>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center bg-[#FAFAF8] hover:bg-[#3B2211] hover:text-white rounded-2xl text-[#3B2211]/30 transition-all">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-5">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2 flex items-center gap-2">
                          <Tag size={12} /> Nama Paket / Ruangan
                        </label>
                        <input 
                         type="text" 
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full px-8 py-5 bg-[#FAFAF8] border border-transparent focus:border-[#3B2211]/10 focus:bg-white rounded-[24px] text-sm font-bold outline-none transition-all shadow-inner" 
                         placeholder="Contoh: Vintage Room, Vinyl Record, Elevator"
                        />
                     </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2">Harga (Rp)</label>
                        <input 
                          type="number" 
                          required
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full px-6 py-4 bg-[#FAFAF8] border border-transparent focus:border-[#3B2211]/10 focus:bg-white rounded-[20px] text-sm font-bold outline-none transition-all shadow-inner" 
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2">Status Ketersediaan</label>
                        <div className="relative group">
                          <select 
                            value={formData.isActive ? "Tersedia" : "Kosong"}
                            onChange={(e) => setFormData({...formData, isActive: e.target.value === "Tersedia"})}
                            className="w-full px-6 py-4 bg-[#FAFAF8] border border-transparent focus:border-[#3B2211]/10 focus:bg-white rounded-[20px] text-sm font-bold outline-none appearance-none cursor-pointer shadow-inner"
                          >
                            <option value="Tersedia">Tersedia</option>
                            <option value="Kosong">Nonaktif</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#3B2211]/20 pointer-events-none" size={18} />
                        </div>
                      </div>
                    </div>

                     <div className="space-y-3">
                        <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2 flex items-center gap-2">
                          <ImageIcon size={12} /> Gambar Ruangan / Studio
                        </label>
                        <div className="relative group">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden" 
                            id="room-image-upload"
                          />
                          <label 
                            htmlFor="room-image-upload"
                            className="flex flex-col items-center justify-center w-full min-h-[160px] bg-[#FAFAF8] border-2 border-dashed border-[#3B2211]/5 rounded-[32px] cursor-pointer hover:bg-white hover:border-[#3B2211]/10 transition-all overflow-hidden relative group"
                          >
                            {uploading ? (
                              <div className="flex flex-col items-center gap-3">
                                <RefreshCw size={24} className="animate-spin text-[#3B2211]/30" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#3B2211]/30">Mengunggah...</span>
                              </div>
                            ) : formData.image ? (
                              <div className="w-full h-full absolute inset-0">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-[#3B2211]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Ganti Gambar</span>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-3 p-8">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3B2211]/20 shadow-sm">
                                  <Plus size={20} />
                                </div>
                                <div className="text-center">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-[#3B2211]">Klik untuk Upload Foto</span>
                                  <p className="text-[9px] text-[#3B2211]/30 mt-1 uppercase tracking-wider">Format: JPG, PNG, WEBP (Max 5MB)</p>
                                </div>
                              </div>
                            )}
                          </label>
                          {uploadError && (
                            <div className="mt-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                              <p className="text-[10px] font-bold text-red-600 mb-2">⚠️ Upload Gagal</p>
                              <p className="text-[9px] text-red-500 leading-relaxed">{uploadError}</p>
                              {uploadError.includes("Bucket not found") || uploadError.includes("bucket") ? (
                                <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                                  <p className="text-[9px] font-black text-amber-700 uppercase tracking-wider mb-1">📋 Langkah Setup Supabase Storage:</p>
                                  <ol className="text-[9px] text-amber-600 space-y-1 list-decimal list-inside">
                                    <li>Buka <strong>app.supabase.com</strong> → project Anda</li>
                                    <li>Klik menu <strong>Storage</strong> di sidebar kiri</li>
                                    <li>Klik <strong>New Bucket</strong></li>
                                    <li>Name: <code className="bg-amber-100 px-1 rounded">products</code>, centang <strong>Public bucket</strong></li>
                                    <li>Klik <strong>Create bucket</strong> → selesai!</li>
                                  </ol>
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                     </div>

                     <div className="p-6 bg-[#3B2211]/5 rounded-3xl space-y-5 border border-[#3B2211]/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#3B2211]">Marketing Details (Landing Page)</p>
                        
                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2">Durasi Sesi</label>
                            <input 
                              type="text" 
                              value={formData.duration}
                              onChange={(e) => setFormData({...formData, duration: e.target.value})}
                              className="w-full px-6 py-4 bg-white border border-transparent focus:border-[#3B2211]/10 rounded-[20px] text-sm font-bold outline-none shadow-sm" 
                              placeholder="Contoh: 10 menit"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2">Hasil Foto / Includes</label>
                            <input 
                              type="text" 
                              value={formData.photoCount}
                              onChange={(e) => setFormData({...formData, photoCount: e.target.value})}
                              className="w-full px-6 py-4 bg-white border border-transparent focus:border-[#3B2211]/10 rounded-[20px] text-sm font-bold outline-none shadow-sm" 
                              placeholder="Contoh: 2 strap + soft file"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2">Fasilitas & Bonus (Pisahkan dengan koma)</label>
                          <textarea 
                            value={formData.features}
                            onChange={(e) => setFormData({...formData, features: e.target.value})}
                            className="w-full px-6 py-4 bg-white border border-transparent focus:border-[#3B2211]/10 rounded-[20px] text-sm font-bold outline-none shadow-sm min-h-[100px]" 
                            placeholder="In our studio, Free accessoris, Props unik..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-[0.4em] ml-2">Urutan Tampil</label>
                            <input 
                              type="number" 
                              value={formData.sortOrder}
                              onChange={(e) => setFormData({...formData, sortOrder: e.target.value})}
                              className="w-full px-6 py-4 bg-white border border-transparent focus:border-[#3B2211]/10 rounded-[20px] text-sm font-bold outline-none shadow-sm" 
                            />
                          </div>
                          <div className="flex items-center gap-4 mt-6 ml-4">
                            <input 
                              type="checkbox"
                              id="isPopular"
                              checked={formData.isPopular}
                              onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                              className="w-5 h-5 rounded-lg border-[#3B2211]/20 accent-[#3B2211]"
                            />
                            <label htmlFor="isPopular" className="text-[10px] font-black uppercase tracking-widest text-[#3B2211]">Badge Terpopuler</label>
                          </div>
                        </div>
                     </div>

                    <button 
                      type="submit"
                      className="w-full py-5 bg-[#3B2211] !text-white rounded-[22px] font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 select-none"
                    >
                      {editingProduct ? 'Perbarui Katalog' : 'Simpan Produk Baru'}
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CUSTOM TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[150] pointer-events-none flex items-center justify-center"
          >
            <div className="bg-[#1A110B] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
              {toast.type === "success" && <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />}
              {toast.type === "error" && <XCircle className="text-red-400 shrink-0" size={18} />}
              {toast.type === "info" && <AlertCircle className="text-amber-400 shrink-0" size={18} />}
              <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CUSTOM CONFIRMATION DIALOG ── */}
      <AnimatePresence>
        {confirmDialog && confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (confirmDialog.cancelText) setConfirmDialog(null);
              }}
              className="absolute inset-0 bg-[#1A110B]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-white rounded-[32px] p-6 shadow-2xl relative z-10 border border-[#3B2211]/5 flex flex-col items-center text-center space-y-5"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-md ${
                confirmDialog.type === "danger" ? "bg-red-50 text-red-500" :
                confirmDialog.type === "warning" ? "bg-amber-50 text-amber-500" :
                confirmDialog.type === "success" ? "bg-emerald-50 text-emerald-500" :
                "bg-blue-50 text-blue-500"
              }`}>
                {confirmDialog.type === "danger" && <Trash2 size={28} />}
                {confirmDialog.type === "warning" && <AlertCircle size={28} />}
                {confirmDialog.type === "success" && <CheckCircle2 size={28} />}
                {confirmDialog.type === "info" && <AlertCircle size={28} />}
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-playfair)" }}>
                  {confirmDialog.title}
                </h3>
                <p className="text-[11px] font-medium text-gray-400 leading-relaxed px-2">
                  {confirmDialog.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex w-full gap-3 pt-2">
                {confirmDialog.cancelText && (
                  <button
                    onClick={() => setConfirmDialog(null)}
                    className="flex-1 py-3.5 bg-[#FAFAF8] text-[#3B2211]/60 border border-[#3B2211]/5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#F0EDE9] hover:text-[#3B2211] transition-all"
                  >
                    {confirmDialog.cancelText}
                  </button>
                )}
                <button
                  onClick={confirmDialog.onConfirm}
                  className={`flex-1 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-lg transition-all ${
                    confirmDialog.type === "danger" ? "bg-red-500 hover:bg-red-600 shadow-red-500/10" :
                    confirmDialog.type === "warning" ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/10" :
                    confirmDialog.type === "success" ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10" :
                    "bg-[#3B2211] hover:bg-[#C88A58] shadow-[#3B2211]/10"
                  }`}
                >
                  {confirmDialog.confirmText || "OK"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

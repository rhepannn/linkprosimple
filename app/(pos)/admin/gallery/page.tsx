"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit2, 
  Star, 
  Layout, 
  ArrowLeft,
  RefreshCw,
  Search,
  Filter,
  Check,
  X,
  Upload,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getGalleryPhotos, createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto, seedGalleryFromStatic } from "@/app/actions/gallery";
import { toast } from "sonner";

export default function GalleryManagement() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    src: "",
    alt: "",
    width: 1200,
    height: 1600,
    category: "solo",
    isFeatured: false,
    isHero: false,
    sortOrder: 0
  });

  const fetchPhotos = async () => {
    setLoading(true);
    const res = await getGalleryPhotos();
    if (res.success) {
      setPhotos(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    const res = await seedGalleryFromStatic();
    if (res.success) {
      toast.success(res.message || "Data galeri berhasil disinkronisasi");
      fetchPhotos();
    } else {
      toast.error(res.error || "Gagal sinkronisasi");
    }
    setIsSyncing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingPhoto) {
      const res = await updateGalleryPhoto(editingPhoto.id, formData);
      if (res.success) {
        toast.success("Foto berhasil diperbarui");
        setIsModalOpen(false);
        fetchPhotos();
      } else {
        toast.error(res.error || "Gagal memperbarui foto");
      }
    } else {
      const res = await createGalleryPhoto(formData);
      if (res.success) {
        toast.success("Foto berhasil ditambahkan");
        setIsModalOpen(false);
        fetchPhotos();
      } else {
        toast.error(res.error || "Gagal menambahkan foto");
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;
    
    const res = await deleteGalleryPhoto(id);
    if (res.success) {
      toast.success("Foto berhasil dihapus");
      fetchPhotos();
    } else {
      toast.error(res.error || "Gagal menghapus foto");
    }
  };

  const openAddModal = () => {
    setEditingPhoto(null);
    setFormData({
      src: "",
      alt: "",
      width: 1200,
      height: 1600,
      category: "solo",
      isFeatured: false,
      isHero: false,
      sortOrder: photos.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (photo: any) => {
    setEditingPhoto(photo);
    setFormData({
      src: photo.src,
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
      category: photo.category,
      isFeatured: photo.isFeatured,
      isHero: photo.isHero,
      sortOrder: photo.sortOrder
    });
    setIsModalOpen(true);
  };

  const filteredPhotos = photos.filter(p => {
    const matchesSearch = p.alt.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "solo", "couple", "family", "birthday", "graduation"];

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#3B2211]/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin" className="text-[#C88A58] hover:underline flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft size={12} /> Dashboard
            </Link>
          </div>
          <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.4em]">Visual Management</p>
          <h1 className="text-4xl font-black text-[#3B2211] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Kelola Galeri</h1>
          <p className="text-sm text-gray-400 font-medium max-w-md">Atur koleksi foto yang ditampilkan pada halaman Landing Page dan Galeri publik.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSync} 
            disabled={isSyncing}
            className="px-6 py-4 bg-white border border-[#3B2211]/10 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
            Sync Static
          </button>
          <button 
            onClick={openAddModal}
            className="px-8 py-4 bg-[#3B2211] !text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus size={16} />
            Tambah Foto
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex bg-[#F8F6F4] p-1.5 rounded-2xl border border-[#3B2211]/5 overflow-x-auto max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${filterCategory === cat ? "bg-[#3B2211] text-white shadow-md" : "text-gray-400 hover:text-[#3B2211]"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari foto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#3B2211]/10 rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] outline-none transition-all"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white rounded-2xl border border-white shadow-sm overflow-hidden flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                  <Image 
                    src={photo.src} 
                    alt={photo.alt} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {photo.isFeatured && (
                      <div className="bg-[#C88A58] text-white p-1.5 rounded-lg shadow-lg" title="Featured">
                        <Star size={12} fill="currentColor" />
                      </div>
                    )}
                    {photo.isHero && (
                      <div className="bg-[#3B2211] text-white p-1.5 rounded-lg shadow-lg" title="Hero Background">
                        <Layout size={12} />
                      </div>
                    )}
                    <div className="bg-white/80 backdrop-blur-md text-[#3B2211] px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm">
                      {photo.category}
                    </div>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-[#3B2211]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => openEditModal(photo)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#3B2211] hover:scale-110 active:scale-95 transition-all shadow-xl"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(photo.id)}
                      className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{photo.alt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-[#3B2211]/40 uppercase tracking-tighter">Order: {photo.sortOrder}</span>
                    <span className="text-[9px] font-black text-[#C88A58] uppercase tracking-tighter">{photo.width}x{photo.height}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-32 text-center bg-white rounded-3xl border border-[#3B2211]/5">
          <ImageIcon size={48} className="mx-auto mb-4 text-[#3B2211]/10" />
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#3B2211]/30">Tidak ada foto ditemukan</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#3B2211]/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-playfair)" }}>
                      {editingPhoto ? "Perbarui Foto" : "Tambah Foto Baru"}
                    </h2>
                    <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-widest mt-1">
                      {editingPhoto ? "Modify existing entry" : "Create new gallery item"}
                    </p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">URL Sumber (SRC)</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                          required
                          type="text" 
                          value={formData.src}
                          onChange={(e) => setFormData({...formData, src: e.target.value})}
                          placeholder="/photos/example.png"
                          className="w-full pl-12 pr-4 py-4 bg-[#F8F6F4] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kategori</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-4 bg-[#F8F6F4] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] outline-none transition-all"
                      >
                        {categories.filter(c => c !== 'all').map(c => (
                          <option key={c} value={c}>{c.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi (Alt Text)</label>
                    <textarea 
                      required
                      value={formData.alt}
                      onChange={(e) => setFormData({...formData, alt: e.target.value})}
                      placeholder="Deskripsi foto untuk SEO..."
                      className="w-full px-4 py-4 bg-[#F8F6F4] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] transition-all h-24 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Width</label>
                      <input 
                        type="number" 
                        value={formData.width}
                        onChange={(e) => setFormData({...formData, width: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 bg-[#F8F6F4] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Height</label>
                      <input 
                        type="number" 
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 bg-[#F8F6F4] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                      <input 
                        type="number" 
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 bg-[#F8F6F4] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#C88A58] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isFeatured ? "bg-[#C88A58]" : "bg-gray-200"}`}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                        />
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? "left-5" : "left-1"}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#3B2211]">Featured</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isHero ? "bg-[#3B2211]" : "bg-gray-200"}`}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.isHero}
                          onChange={(e) => setFormData({...formData, isHero: e.target.checked})}
                        />
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isHero ? "left-5" : "left-1"}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#3B2211]">Hero Background</span>
                    </label>
                  </div>

                  <div className="pt-8 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-8 py-4 bg-gray-100 text-gray-400 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-gray-200 transition-all"
                    >
                      Batal
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-[2] px-8 py-4 bg-[#3B2211] !text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3B2211]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {loading ? <RefreshCw className="animate-spin mx-auto" size={16} /> : (editingPhoto ? "Simpan Perubahan" : "Tambahkan Foto")}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

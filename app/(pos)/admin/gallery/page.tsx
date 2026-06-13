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
import { useConfirm } from "@/components/ui/confirm-dialog";

export default function GalleryManagement() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any>(null);
  const confirm = useConfirm();

  // Form state
  const [formData, setFormData] = useState({
    src: "",
    alt: "",
    width: 1200,
    height: 1600,
    category: "general",
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
    const ok = await confirm({ title: "Hapus Foto?", message: "Foto akan dihapus secara permanen.", danger: true, confirmText: "Ya, Hapus" });
    if (!ok) return;
    
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
      category: "general",
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
      category: photo.category || "general",
      isFeatured: photo.isFeatured,
      isHero: photo.isHero,
      sortOrder: photo.sortOrder
    });
    setIsModalOpen(true);
  };

  const filteredPhotos = photos.filter(p => {
    const matchesSearch = p.alt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const categories: string[] = [];

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin" className="text-[#0ea5e9] hover:underline flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft size={12} /> Dashboard
            </Link>
          </div>
          <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-[0.4em]">Visual Management</p>
          <h1 className="text-4xl font-black text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Kelola Kegiatan</h1>
          <p className="text-sm text-gray-400 font-medium max-w-md">Atur dokumentasi kegiatan dan inovasi sosial yang ditampilkan pada halaman publik.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSync} 
            disabled={isSyncing}
            className="px-6 py-4 bg-white border border-[#1e293b]/10 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
            Sync Static
          </button>
          <button 
            onClick={openAddModal}
            className="px-8 py-4 bg-[#1e293b] !text-white rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-[#1e293b]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus size={16} />
            Tambah Kegiatan
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-start">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari kegiatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#1e293b]/10 rounded-2xl text-sm focus:ring-2 focus:ring-[#0ea5e9] outline-none transition-all"
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
                      <div className="bg-[#0ea5e9] text-white p-1.5 rounded-lg shadow-lg" title="Featured">
                        <Star size={12} fill="currentColor" />
                      </div>
                    )}
                    {photo.isHero && (
                      <div className="bg-[#1e293b] text-white p-1.5 rounded-lg shadow-lg" title="Hero Background">
                        <Layout size={12} />
                      </div>
                    )}
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-[#1e293b]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => openEditModal(photo)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1e293b] hover:scale-110 active:scale-95 transition-all shadow-xl"
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
                    <span className="text-[9px] font-black text-[#1e293b]/40 uppercase tracking-tighter">Order: {photo.sortOrder}</span>
                    <span className="text-[9px] font-black text-[#0ea5e9] uppercase tracking-tighter">{photo.width}x{photo.height}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-32 text-center bg-white rounded-3xl border border-[#1e293b]/5">
          <ImageIcon size={48} className="mx-auto mb-4 text-[#1e293b]/10" />
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1e293b]/30">Tidak ada foto ditemukan</p>
        </div>
      )}

       {/* Add/Edit Modal */}
       <AnimatePresence>
         {isModalOpen && (
           <div className="fixed inset-0 z-[100] flex items-start justify-center p-6 overflow-y-auto md:items-center">
             <motion.div 
               initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-[#1e293b]/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[32px] shadow-2xl overflow-hidden my-auto z-10"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-[#1e293b]" style={{ fontFamily: "var(--font-playfair)" }}>
                      {editingPhoto ? "Perbarui Kegiatan" : "Tambah Kegiatan Baru"}
                    </h2>
                    <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest mt-1">
                      {editingPhoto ? "Modify existing entry" : "Create new activity item"}
                    </p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih File Foto dari Perangkat</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({
                              ...formData,
                              src: reader.result as string,
                              alt: formData.alt || file.name.split(".")[0]
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                      id="file-upload"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="w-full flex flex-col items-center justify-center border-2 border-dashed border-[#0ea5e9]/30 rounded-[2rem] p-8 bg-[#f0f7ff]/40 hover:bg-[#f0f7ff]/80 cursor-pointer transition-all duration-300 group"
                    >
                      <Upload className="text-[#0ea5e9] mb-3 group-hover:scale-110 transition-transform duration-300" size={28} />
                      <span className="text-xs font-black uppercase tracking-wider text-slate-600">Klik untuk Unggah Gambar</span>
                      <span className="text-[10px] text-slate-400 mt-2 font-medium">Format PNG, JPG, atau JPEG</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi Kegiatan (Alt Text)</label>
                    <textarea 
                      required
                      value={formData.alt}
                      onChange={(e) => setFormData({...formData, alt: e.target.value})}
                      placeholder="Deskripsi kegiatan atau judul berita..."
                      className="w-full px-4 py-4 bg-[#f0f7ff] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#0ea5e9] transition-all h-24 resize-none"
                    />
                  </div>

                  {formData.src && (
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-sky-100/50 flex items-center justify-center bg-sky-50/10 p-2 transition-all duration-300">
                      <img 
                        src={formData.src} 
                        alt="Pratinjau Foto" 
                        className="h-full object-contain rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, src: "" })}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 shadow-lg transition-all"
                        title="Hapus foto"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kategori Kegiatan</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-4 bg-[#f0f7ff] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#0ea5e9] transition-all cursor-pointer font-bold"
                    >
                      <option value="general">Umum (General)</option>
                      <option value="inovasi-sosial">Inovasi Sosial</option>
                      <option value="pelatihan-kelas">Pelatihan & Kelas</option>
                      <option value="kemitraan">Kemitraan Pentahelix</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Width</label>
                      <input 
                        type="number" 
                        value={formData.width}
                        onChange={(e) => setFormData({...formData, width: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 bg-[#f0f7ff] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#0ea5e9] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Height</label>
                      <input 
                        type="number" 
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 bg-[#f0f7ff] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#0ea5e9] transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sort Order</label>
                      <input 
                        type="number" 
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                        className="w-full px-4 py-4 bg-[#f0f7ff] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#0ea5e9] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isFeatured ? "bg-[#0ea5e9]" : "bg-gray-200"}`}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.isFeatured}
                          onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                        />
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isFeatured ? "left-5" : "left-1"}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1e293b]">Featured</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-10 h-6 rounded-full transition-all relative ${formData.isHero ? "bg-[#1e293b]" : "bg-gray-200"}`}>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={formData.isHero}
                          onChange={(e) => setFormData({...formData, isHero: e.target.checked})}
                        />
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isHero ? "left-5" : "left-1"}`} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1e293b]">Hero Background</span>
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
                      className="flex-[2] px-8 py-4 bg-[#1e293b] !text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#1e293b]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      {loading ? <RefreshCw className="animate-spin mx-auto" size={16} /> : (editingPhoto ? "Simpan Perubahan" : "Tambahkan Kegiatan")}
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

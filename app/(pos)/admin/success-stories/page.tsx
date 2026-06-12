"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Edit2, Search, X, Upload, Trophy, Eye, EyeOff, ChevronDown
} from "lucide-react";
import { getAllSuccessStories, createSuccessStory, updateSuccessStory, deleteSuccessStory, toggleSuccessStoryActive } from "@/app/actions/success-stories";
import { getProducts } from "@/app/actions/products";
import { toast } from "sonner";

export default function SuccessStoriesManagement() {
  const [stories, setStories] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProduct, setFilterProduct] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const emptyForm = {
    productId: "",
    name: "",
    role: "",
    photoUrl: "",
    achievement: "",
    story: "",
    beforeLabel: "",
    afterLabel: "",
    sortOrder: 0,
  };
  const [form, setForm] = useState({ ...emptyForm });

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllSuccessStories();
    if (res.success) setStories(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    getProducts(false).then((res) => {
      if (res.success && res.data) setPrograms(res.data);
    });
  }, []);

  const filtered = stories.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.achievement || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.story.toLowerCase().includes(searchQuery.toLowerCase());
    const matchProduct = filterProduct === "all" || s.productId === filterProduct;
    return matchSearch && matchProduct;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setIsModalOpen(true);
  };

  const openEdit = (s: any) => {
    setEditingId(s.id);
    setForm({
      productId: s.productId || "",
      name: s.name || "",
      role: s.role || "",
      photoUrl: s.photoUrl || "",
      achievement: s.achievement || "",
      story: s.story || "",
      beforeLabel: s.beforeLabel || "",
      afterLabel: s.afterLabel || "",
      sortOrder: s.sortOrder ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    try {
      toast.loading("Mengunggah foto...", { id: "upload" });
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, photoUrl: data.url }));
        toast.success("Foto berhasil diunggah!", { id: "upload" });
      } else {
        toast.error("Gagal mengunggah.", { id: "upload" });
      }
    } catch {
      toast.error("Terjadi kesalahan.", { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.productId) { toast.error("Pilih program dulu."); return; }
    if (!form.name.trim()) { toast.error("Nama wajib diisi."); return; }
    if (!form.story.trim()) { toast.error("Cerita sukses wajib diisi."); return; }

    setLoading(true);
    if (editingId) {
      const res = await updateSuccessStory(editingId, form);
      if (res.success) toast.success("Diperbarui!");
      else toast.error(res.error || "Gagal.");
    } else {
      const res = await createSuccessStory(form);
      if (res.success) toast.success("Ditambahkan!");
      else toast.error(res.error || "Gagal.");
    }
    setLoading(false);
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus success story "${name}"?`)) return;
    await deleteSuccessStory(id);
    toast.success("Dihapus.");
    fetchData();
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleSuccessStoryActive(id, !current);
    toast.success(current ? "Dinonaktifkan." : "Diaktifkan.");
    fetchData();
  };

  const inputCls = "w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all";

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Alumni Highlights</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
              <Trophy size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#1e293b] tracking-tight">Success Story</h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">Kelola cerita sukses alumni per program yang tampil di halaman daftar pelatihan.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-3 bg-[#1e293b] hover:bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer">
          <Plus size={14} /> Tambah Success Story
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input type="text" placeholder="Cari nama, achievement, cerita..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1e293b]/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-300/30 transition-all" />
        </div>
        <select value={filterProduct} onChange={(e) => setFilterProduct(e.target.value)}
          className="px-3 py-2.5 bg-white border border-[#1e293b]/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-300/30">
          <option value="all">Semua Program</option>
          {programs.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-wider ml-auto">
          <span>{stories.length} Total</span>
          <span className="text-emerald-500">{stories.filter((s) => s.isActive).length} Aktif</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-[#1e293b]/5 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <Trophy size={32} className="text-gray-200 mx-auto" />
            <p className="text-sm font-bold text-gray-300 uppercase">Belum ada success story</p>
            <button onClick={openAdd} className="text-[10px] font-black text-amber-500 uppercase tracking-wider hover:underline">+ Tambah Pertama</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-black text-[9px]">
                  <th className="py-4 pl-8">Foto</th>
                  <th className="py-4">Nama</th>
                  <th className="py-4">Program</th>
                  <th className="py-4">Achievement</th>
                  <th className="py-4">Cerita</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 pr-8 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => (
                  <motion.tr key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${!s.isActive ? "opacity-50" : ""}`}>
                    <td className="py-4 pl-8">
                      {s.photoUrl ? <img src={s.photoUrl} alt={s.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                        : <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-400 font-black text-xs">{s.name?.charAt(0)?.toUpperCase() || "?"}</div>}
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-[#1e293b]">{s.name}</p>
                      {s.role && <p className="text-[9px] text-gray-400 font-medium">{s.role}</p>}
                    </td>
                    <td className="py-4 text-gray-500 font-medium">{s.product?.name || "-"}</td>
                    <td className="py-4">
                      {s.achievement ? <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[9px] font-black uppercase">{s.achievement}</span> : "-"}
                    </td>
                    <td className="py-4 text-gray-500 max-w-[180px]">
                      <button onClick={() => setExpandedStory(expandedStory === s.id ? null : s.id)}
                        className="text-left text-gray-500 hover:text-[#1e293b] transition-colors">
                        <span className={expandedStory === s.id ? "" : "line-clamp-2"}>{s.story}</span>
                        <span className="block text-[9px] text-amber-500 font-bold mt-0.5">{expandedStory === s.id ? "Sembunyikan" : "Baca..."}</span>
                      </button>
                    </td>
                    <td className="py-4">
                      <button onClick={() => handleToggle(s.id, s.isActive)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${s.isActive ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                        {s.isActive ? <><Eye size={10} /> Aktif</> : <><EyeOff size={10} /> Nonaktif</>}
                      </button>
                    </td>
                    <td className="py-4 pr-8 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-amber-500 hover:bg-amber-50 transition-colors">
                          <Edit2 size={13} /></button>
                        <button onClick={() => handleDelete(s.id, s.name)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                          <Trash2 size={13} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500"><Trophy size={18} /></div>
                    <div>
                      <h2 className="text-base font-black text-[#1e293b]">{editingId ? "Edit" : "Tambah"} Success Story</h2>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{editingId ? "Perbarui data" : "Cerita sukses alumni program"}</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-300 hover:text-[#1e293b] hover:bg-gray-100 rounded-xl"><X size={18} /></button>
                </div>

                <div className="px-8 py-6 space-y-5">
                  {/* Program Select */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Program *</label>
                    <select value={form.productId} onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all">
                      <option value="">-- Pilih Program --</option>
                      {programs.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>

                  {/* Name + Role */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Nama *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="cth: Budi Santoso" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Role / Jabatan</label>
                      <input type="text" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="cth: Product Manager" className={inputCls} />
                    </div>
                  </div>

                  {/* Photo */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Foto (URL atau Upload)</label>
                    <div className="flex gap-2">
                      <input type="text" value={form.photoUrl} onChange={(e) => setForm((f) => ({ ...f, photoUrl: e.target.value }))}
                        placeholder="https://..." className={`${inputCls} flex-1 text-xs font-mono`} />
                      <label className="flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer border border-amber-100 whitespace-nowrap">
                        {uploading ? "..." : <Upload size={12} />} Unggah
                        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} className="hidden" />
                      </label>
                    </div>
                    {form.photoUrl && <img src={form.photoUrl} alt="Preview" className="mt-2 w-14 h-14 rounded-xl object-cover border" />}
                  </div>

                  {/* Achievement */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Achievement (Highlight Singkat)</label>
                    <input type="text" value={form.achievement} onChange={(e) => setForm((f) => ({ ...f, achievement: e.target.value }))}
                      placeholder="cth: Naik gaji 3x lipat setelah lulus" className={inputCls} />
                  </div>

                  {/* Story */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Cerita Sukses *</label>
                    <textarea value={form.story} onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                      rows={5} placeholder="Tulis cerita lengkap perjalanan alumni..." className={`${inputCls} resize-y`} />
                  </div>

                  {/* Before / After */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Sebelum (Label)</label>
                      <input type="text" value={form.beforeLabel} onChange={(e) => setForm((f) => ({ ...f, beforeLabel: e.target.value }))}
                        placeholder="cth: Kerja serabutan" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Sesudah (Label)</label>
                      <input type="text" value={form.afterLabel} onChange={(e) => setForm((f) => ({ ...f, afterLabel: e.target.value }))}
                        placeholder="cth: Product Manager di Startup" className={inputCls} />
                    </div>
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Urutan Tampil</label>
                    <input type="number" value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                      className={`${inputCls} w-24`} />
                  </div>
                </div>

                <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex gap-3 rounded-b-3xl">
                  <button onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 rounded-xl border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#1e293b] transition-all">Batal</button>
                  <button onClick={handleSubmit} disabled={loading}
                    className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer">
                    {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : editingId ? "Simpan Perubahan" : "Tambah Success Story"}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

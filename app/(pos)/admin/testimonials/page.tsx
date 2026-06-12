"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Plus, Trash2, Edit2, Search, X, Upload, MessageSquareText, Check, Eye, EyeOff
} from "lucide-react";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialActive } from "@/app/actions/testimonials";
import { getProducts } from "@/app/actions/products";
import { toast } from "sonner";

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);

  const emptyForm = {
    name: "",
    role: "",
    photoUrl: "",
    programName: "",
    rating: 5,
    text: "",
    date: "",
    sortOrder: 0,
  };
  const [form, setForm] = useState({ ...emptyForm });

  const fetchData = async () => {
    setLoading(true);
    const res = await getTestimonials(false);
    if (res.success) setTestimonials(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    getProducts(false).then((res) => {
      if (res.success && res.data) setPrograms(res.data);
    });
  }, []);

  const filtered = testimonials.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.programName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setIsModalOpen(true);
  };

  const openEdit = (t: any) => {
    setEditingId(t.id);
    setForm({
      name: t.name || "",
      role: t.role || "",
      photoUrl: t.photoUrl || "",
      programName: t.programName || "",
      rating: t.rating || 5,
      text: t.text || "",
      date: t.date || "",
      sortOrder: t.sortOrder ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    try {
      toast.loading("Mengunggah foto...", { id: "upload-photo" });
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setForm((f) => ({ ...f, photoUrl: data.url }));
        toast.success("Foto berhasil diunggah!", { id: "upload-photo" });
      } else {
        toast.error("Gagal mengunggah foto.", { id: "upload-photo" });
      }
    } catch {
      toast.error("Terjadi kesalahan.", { id: "upload-photo" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { toast.error("Nama wajib diisi."); return; }
    if (!form.text.trim()) { toast.error("Teks testimoni wajib diisi."); return; }

    setLoading(true);
    if (editingId) {
      const res = await updateTestimonial(editingId, form);
      if (res.success) toast.success("Testimoni berhasil diperbarui!");
      else toast.error(res.error || "Gagal memperbarui.");
    } else {
      const res = await createTestimonial(form);
      if (res.success) toast.success("Testimoni berhasil ditambahkan!");
      else toast.error(res.error || "Gagal menambah.");
    }
    setLoading(false);
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus testimoni dari "${name}"?`)) return;
    const res = await deleteTestimonial(id);
    if (res.success) toast.success("Testimoni dihapus.");
    else toast.error(res.error || "Gagal menghapus.");
    fetchData();
  };

  const handleToggle = async (id: string, current: boolean) => {
    const res = await toggleTestimonialActive(id, !current);
    if (res.success) {
      toast.success(current ? "Testimoni dinonaktifkan." : "Testimoni diaktifkan.");
      fetchData();
    } else {
      toast.error(res.error || "Gagal mengubah status.");
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => interactive && setForm((f) => ({ ...f, rating: i + 1 }))}
        className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
      >
        <Star size={interactive ? 20 : 14} className={i < rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
      </button>
    ));
  };

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-[0.4em]">Social Proof</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
              <MessageSquareText size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#1e293b] tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
              Cerita Alumni
            </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">Kelola testimoni dan cerita sukses alumni yang tampil di halaman utama.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-3 bg-[#1e293b] hover:bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
        >
          <Plus size={14} /> Tambah Testimoni
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Cari nama, program, atau teks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1e293b]/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/30 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
          <span>{testimonials.length} Total</span>
          <span className="text-emerald-500">{testimonials.filter((t) => t.isActive).length} Aktif</span>
          <span className="text-gray-300">{testimonials.filter((t) => !t.isActive).length} Nonaktif</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border border-[#1e293b]/5 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-[#0ea5e9]/20 border-t-[#0ea5e9] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <MessageSquareText size={32} className="text-gray-200 mx-auto" />
            <p className="text-sm font-bold text-gray-300 uppercase">Belum ada testimoni</p>
            <button onClick={openAdd} className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-wider hover:underline">
              + Tambah Testimoni Pertama
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-black text-[9px]">
                  <th className="py-4 pl-8">Foto</th>
                  <th className="py-4">Nama / Role</th>
                  <th className="py-4">Program</th>
                  <th className="py-4">Rating</th>
                  <th className="py-4">Teks</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 pr-8 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, idx) => (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${!t.isActive ? "opacity-50" : ""}`}
                  >
                    <td className="py-4 pl-8">
                      {t.photoUrl ? (
                        <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-400 font-black text-xs">
                          {t.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      <p className="font-bold text-[#1e293b]">{t.name}</p>
                      {t.role && <p className="text-[10px] text-gray-400 font-medium">{t.role}</p>}
                    </td>
                    <td className="py-4 text-gray-500 font-medium">{t.programName || "-"}</td>
                    <td className="py-4">
                      <div className="flex gap-0.5">{renderStars(t.rating)}</div>
                    </td>
                    <td className="py-4 text-gray-500 max-w-[200px] truncate">{t.text}</td>
                    <td className="py-4">
                      <button
                        onClick={() => handleToggle(t.id, t.isActive)}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${t.isActive ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}
                      >
                        {t.isActive ? <><Eye size={10} /> Aktif</> : <><EyeOff size={10} /> Nonaktif</>}
                      </button>
                    </td>
                    <td className="py-4 pr-8 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(t)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#0ea5e9] hover:bg-sky-50 transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.name)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              >
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                      <MessageSquareText size={18} />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-[#1e293b]">{editingId ? "Edit Testimoni" : "Tambah Testimoni"}</h2>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                        {editingId ? "Perbarui data testimoni" : "Isi data testimoni baru"}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-300 hover:text-[#1e293b] hover:bg-gray-100 rounded-xl">
                    <X size={18} />
                  </button>
                </div>

                <div className="px-8 py-6 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Nama Alumni *</label>
                    <input
                      type="text" value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="cth: Rina Amelia"
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                    />
                  </div>

                  {/* Role + Program */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Role / Jabatan</label>
                      <input
                        type="text" value={form.role}
                        onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="cth: Mahasiswa UI"
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Program</label>
                      <select
                        value={form.programName}
                        onChange={(e) => setForm((f) => ({ ...f, programName: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                      >
                        <option value="">-- Pilih Program --</option>
                        {programs.map((p: any) => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Photo */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Foto Profil (URL atau Upload)</label>
                    <div className="flex gap-2">
                      <input
                        type="text" value={form.photoUrl}
                        onChange={(e) => setForm((f) => ({ ...f, photoUrl: e.target.value }))}
                        placeholder="https://..."
                        className="flex-1 px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                      />
                      <label className="flex items-center gap-1.5 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer border border-amber-100 transition-all whitespace-nowrap">
                        {uploading ? "..." : <Upload size={12} />}
                        Unggah
                        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} className="hidden" />
                      </label>
                    </div>
                    {form.photoUrl && (
                      <img src={form.photoUrl} alt="Preview" className="mt-2 w-16 h-16 rounded-xl object-cover border" />
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Rating</label>
                    <div className="flex gap-1">{renderStars(form.rating, true)}</div>
                  </div>

                  {/* Text */}
                  <div>
                    <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Teks Testimoni *</label>
                    <textarea
                      value={form.text}
                      onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                      rows={4}
                      placeholder="Tulis cerita sukses atau testimoni alumni..."
                      className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-medium resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                    />
                  </div>

                  {/* Date + Sort Order */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Tanggal (tampilan)</label>
                      <input
                        type="text" value={form.date}
                        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                        placeholder="cth: Desember 2024"
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-[#1e293b] uppercase tracking-widest mb-1.5">Urutan</label>
                      <input
                        type="number" value={form.sortOrder}
                        onChange={(e) => setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3.5 py-2.5 bg-[#F8F6F4] border border-transparent rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex gap-3 rounded-b-3xl">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3.5 rounded-xl border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-[#1e293b] transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1e293b] hover:bg-[#0f172a] disabled:opacity-50 text-white text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer"
                  >
                    {loading ? (
                      <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <>{editingId ? "Simpan Perubahan" : "Tambah Testimoni"}</>
                    )}
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

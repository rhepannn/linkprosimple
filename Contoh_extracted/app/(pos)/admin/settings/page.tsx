"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/app/actions/settings";
import { Save, Loader2, Globe, Mail, Phone, Clock, Type, Upload, Image as ImageIcon, X, CreditCard, QrCode } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await getSiteSettings();
      // Set defaults if empty
      setSettings({
        contact_email: data.contact_email || "hello@snappframe.com",
        contact_phone: data.contact_phone || "+62 812 3456 7890",
        contact_wa: data.contact_wa || "6287778059221",
        affiliate_whatsapp: data.affiliate_whatsapp || data.contact_wa || "6287778059221",
        contact_ig: data.contact_ig || "@snapp.frame",
        contact_address: data.contact_address || "Jl. Sudirman No. 123, Jakarta Selatan",
        operational_hours: data.operational_hours || "Setiap Hari: 09:00 - 21:00",
        hero_eyebrow: data.hero_eyebrow || "Snapp.frame Studio",
        hero_text_1: data.hero_text_1 || "Yang Kamu Lihat",
        hero_highlight_1: data.hero_highlight_1 || "Hari Ini",
        hero_text_2: data.hero_text_2 || "Akan Kamu Rindukan",
        hero_highlight_2: data.hero_highlight_2 || "Nanti",
        hero_desc: data.hero_desc || "Abadikan momen paling berhargamu dengan sentuhan editorial yang abadi. Sebuah pengalaman fotografi eksklusif yang dirancang khusus untuk menceritakan kisahmu.",
        affiliate_poster_academic: data.affiliate_poster_academic || "",
        affiliate_poster_career: data.affiliate_poster_career || "",
        affiliate_poster_entrepreneur: data.affiliate_poster_entrepreneur || "",
        affiliate_poster_bisapreneur: data.affiliate_poster_bisapreneur || "",
        affiliate_poster_baristara: data.affiliate_poster_baristara || "",
        affiliate_poster_cuan_creator: data.affiliate_poster_cuan_creator || "",
        affiliate_poster_tekno_ai: data.affiliate_poster_tekno_ai || "",
        affiliate_poster_mental_bahasa: data.affiliate_poster_mental_bahasa || "",
        payment_bank_name: data.payment_bank_name || "BCA (Bank Central Asia)",
        payment_bank_account: data.payment_bank_account || "7771234567",
        payment_bank_owner: data.payment_bank_owner || "Snapp.frame Owner",
        payment_qris_image: data.payment_qris_image || "",
        training_payment_wa: data.training_payment_wa || "6287778059221",
        payment_dana_number: data.payment_dana_number || "",
        payment_dana_owner: data.payment_dana_owner || "",
        payment_gopay_number: data.payment_gopay_number || "",
        payment_gopay_owner: data.payment_gopay_owner || "",
      });
    } catch (error) {
      toast.error("Gagal memuat pengaturan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (key: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      toast.loading("Mengunggah poster...", { id: "upload" });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const currentVal = settings[key] || "";
        const urls = currentVal.split(",").map(u => u.trim()).filter(Boolean);
        urls.push(data.url);
        const newValue = urls.join(",");
        handleChange(key, newValue);
        const saveRes = await updateSiteSettings({ [key]: newValue });
        if (saveRes.success) {
          toast.success("Poster berhasil diunggah!", { id: "upload" });
        } else {
          toast.error("Poster terunggah tapi gagal disimpan. Klik Simpan.", { id: "upload" });
        }
      } else {
        toast.error("Gagal mengunggah gambar.", { id: "upload" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat mengunggah.", { id: "upload" });
    }
  };

  const handleQrisUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      toast.loading("Mengunggah QRIS...", { id: "upload_qris" });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        handleChange("payment_qris_image", data.url);
        toast.success("QRIS berhasil diunggah!", { id: "upload_qris" });
      } else {
        toast.error("Gagal mengunggah QRIS.", { id: "upload_qris" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat mengunggah QRIS.", { id: "upload_qris" });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateSiteSettings(settings);
      if (res.success) {
        toast.success("Pengaturan berhasil disimpan!");
      } else {
        toast.error(res.error || "Gagal menyimpan pengaturan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-near-black/50" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-near-black tracking-tight mb-1">
            Pengaturan Website
          </h1>
          <p className="text-sm font-medium text-near-black/60">
            Ubah teks, kontak, dan informasi yang tampil di website pelanggan.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-near-black text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-near-black/90 disabled:opacity-50 transition-colors shadow-lg shadow-near-black/10"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Informasi Kontak</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Email, Telepon, dan Lokasi</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Email Publik</label>
                <input
                  type="text"
                  value={settings.contact_email}
                  onChange={(e) => handleChange("contact_email", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor Telepon (Tampilan)</label>
                <input
                  type="text"
                  value={settings.contact_phone}
                  onChange={(e) => handleChange("contact_phone", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor WhatsApp (Untuk Tombol/Link, tanpa +)</label>
                <input
                  type="text"
                  value={settings.contact_wa}
                  onChange={(e) => handleChange("contact_wa", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="6287778059221"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor WhatsApp Affiliate (tanpa +)</label>
                <input
                  type="text"
                  value={settings.affiliate_whatsapp || ""}
                  onChange={(e) => handleChange("affiliate_whatsapp", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="6287778059221"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Username Instagram</label>
                <input
                  type="text"
                  value={settings.contact_ig}
                  onChange={(e) => handleChange("contact_ig", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Alamat Studio</label>
                <textarea
                  value={settings.contact_address}
                  onChange={(e) => handleChange("contact_address", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Informasi Pembayaran</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Rekening Bank & Gambar QRIS</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nama Bank</label>
                <input
                  type="text"
                  value={settings.payment_bank_name || ""}
                  onChange={(e) => handleChange("payment_bank_name", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Contoh: BCA (Bank Central Asia)"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor Rekening</label>
                <input
                  type="text"
                  value={settings.payment_bank_account || ""}
                  onChange={(e) => handleChange("payment_bank_account", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Contoh: 7771234567"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  value={settings.payment_bank_owner || ""}
                  onChange={(e) => handleChange("payment_bank_owner", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Contoh: Snapp.frame Studio Owner"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor WA Konfirmasi Pembayaran Pelatihan (tanpa +)</label>
                <input
                  type="text"
                  value={settings.training_payment_wa || ""}
                  onChange={(e) => handleChange("training_payment_wa", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Contoh: 6287778059221"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor DANA</label>
                  <input
                    type="text"
                    value={settings.payment_dana_number || ""}
                    onChange={(e) => handleChange("payment_dana_number", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Pemilik DANA</label>
                  <input
                    type="text"
                    value={settings.payment_dana_owner || ""}
                    onChange={(e) => handleChange("payment_dana_owner", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="Contoh: Nama Pemilik"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor GOPAY</label>
                  <input
                    type="text"
                    value={settings.payment_gopay_number || ""}
                    onChange={(e) => handleChange("payment_gopay_number", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Pemilik GOPAY</label>
                  <input
                    type="text"
                    value={settings.payment_gopay_owner || ""}
                    onChange={(e) => handleChange("payment_gopay_owner", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="Contoh: Nama Pemilik"
                  />
                </div>
              </div>

              <div className="border-t border-near-black/5 pt-4">
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Gambar Kode QRIS</label>
                <div className="space-y-3">
                  {settings.payment_qris_image ? (
                    <div className="relative w-36 h-36 rounded-xl bg-near-black/5 border border-near-black/10 overflow-hidden group shadow-sm flex items-center justify-center">
                      <img src={settings.payment_qris_image} alt="QRIS Merchant" className="w-full h-full object-contain p-2" />
                      <button
                        type="button"
                        onClick={() => handleChange("payment_qris_image", "")}
                        className="absolute top-1.5 right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer flex items-center justify-center"
                        title="Hapus QRIS"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-36 h-36 rounded-xl bg-near-black/5 border border-near-black/10 flex items-center justify-center text-near-black/25">
                      <QrCode className="w-8 h-8 animate-pulse" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={settings.payment_qris_image || ""}
                      onChange={(e) => handleChange("payment_qris_image", e.target.value)}
                      placeholder="Link Gambar URL QRIS..."
                      className="w-full px-3 py-2 bg-warm-white/50 border border-near-black/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                    />
                    <div>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-near-black/5 hover:bg-near-black/10 text-near-black text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer">
                        <Upload className="w-3 h-3" /> Unggah QRIS Baru
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleQrisUpload(file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operational & General */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Jam Operasional</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Tampil di footer / info kontak</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Jam Buka Studio</label>
              <input
                type="text"
                value={settings.operational_hours}
                onChange={(e) => handleChange("operational_hours", e.target.value)}
                className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                placeholder="Contoh: Setiap Hari: 09:00 - 21:00"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Teks Hero (Halaman Utama)</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Tulisan besar pertama kali dilihat pengunjung</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Teks Eyebrow (Kecil di atas)</label>
                <input
                  type="text"
                  value={settings.hero_eyebrow}
                  onChange={(e) => handleChange("hero_eyebrow", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Baris 1: Normal</label>
                  <input
                    type="text"
                    value={settings.hero_text_1}
                    onChange={(e) => handleChange("hero_text_1", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-gold">Baris 1: Aksen/Warna</label>
                  <input
                    type="text"
                    value={settings.hero_highlight_1}
                    onChange={(e) => handleChange("hero_highlight_1", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Baris 2: Normal</label>
                  <input
                    type="text"
                    value={settings.hero_text_2}
                    onChange={(e) => handleChange("hero_text_2", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-gold">Baris 2: Aksen/Warna</label>
                  <input
                    type="text"
                    value={settings.hero_highlight_2}
                    onChange={(e) => handleChange("hero_highlight_2", e.target.value)}
                    className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi Pendek</label>
                <textarea
                  value={settings.hero_desc}
                  onChange={(e) => handleChange("hero_desc", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Poster Program Affiliate */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Poster Program Affiliate</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Ubah gambar poster promosi tiap program affiliate (bisa banyak poster per program)</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "LP Academic Partner", key: "affiliate_poster_academic" },
                { label: "LP Career Ready", key: "affiliate_poster_career" },
                { label: "LP Entrepreneur Launchpad", key: "affiliate_poster_entrepreneur" },
                { label: "Bisapreneur Academy", key: "affiliate_poster_bisapreneur" },
                { label: "Baristara Academy", key: "affiliate_poster_baristara" },
                { label: "Cuan Creator Academy", key: "affiliate_poster_cuan_creator" },
                { label: "Tekno AI Academy", key: "affiliate_poster_tekno_ai" },
                { label: "Mental Bahasa Academy", key: "affiliate_poster_mental_bahasa" },
              ].map((prog) => {
                const urls = (settings[prog.key] || "").split(",").map(u => u.trim()).filter(Boolean);
                return (
                  <div key={prog.key} className="space-y-3 border-b border-near-black/5 pb-4 last:border-b-0 last:pb-0">
                    <label className="block text-xs font-bold text-near-black uppercase tracking-wide">{prog.label}</label>

                    {/* Poster Previews Grid */}
                    <div className="space-y-3">
                      {urls.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {urls.map((url, idx) => (
                            <div key={idx} className="relative w-24 h-32 rounded-xl bg-near-black/5 border border-near-black/10 overflow-hidden flex-shrink-0 group shadow-sm">
                              <img src={url} alt={`${prog.label} ${idx + 1}`} className="w-full h-full object-contain bg-[#1a1a1a]" />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = urls.filter((_, i) => i !== idx);
                                  handleChange(prog.key, updated.join(","));
                                }}
                                className="absolute top-1.5 right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer flex items-center justify-center"
                                title="Hapus Poster"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <div className="absolute bottom-1 left-1 bg-black/60 px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase">
                                #{idx + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-24 h-32 rounded-xl bg-near-black/5 border border-near-black/10 flex items-center justify-center text-near-black/25">
                          <ImageIcon className="w-6 h-6 animate-pulse" />
                        </div>
                      )}

                      {/* Inputs & Buttons */}
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={settings[prog.key] || ""}
                          onChange={(e) => handleChange(prog.key, e.target.value)}
                          placeholder="Link Gambar URL Poster (pisahkan dengan koma jika banyak)..."
                          className="w-full px-3 py-2 bg-warm-white/50 border border-near-black/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                        />
                        <div className="flex gap-2">
                          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-near-black/5 hover:bg-near-black/10 text-near-black text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer">
                            <Upload className="w-3 h-3" /> Unggah Poster Baru
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(prog.key, file);
                              }}
                              className="hidden"
                            />
                          </label>
                          {urls.length > 0 && (
                            <button
                              type="button"
                              onClick={() => handleChange(prog.key, "")}
                              className="px-3 py-1.5 text-rose-500 hover:bg-rose-50 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer border border-transparent"
                            >
                              Hapus Semua
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
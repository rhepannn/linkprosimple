"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/app/actions/settings";
import { Save, Loader2, Globe, Mail, Phone, Clock, Type, Upload, Image as ImageIcon, X, CreditCard, QrCode, Layers, ArrowUp, ArrowDown, HelpCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { faqs as defaultFaqs } from "@/data/faq";
import { site } from "@/data/site";

interface SectionItem {
  id: string;
  name: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"contact" | "content" | "layout" | "faq">("contact");
  const [sections, setSections] = useState<SectionItem[]>([]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await getSiteSettings();
      // Set defaults if empty
      const initialSettings = {
        contact_email: data.contact_email || "hello@linkproductive.com",
        contact_phone: data.contact_phone || "+62 877 7805 9221",
        contact_wa: data.contact_wa || "6287778059221",
        affiliate_whatsapp: data.affiliate_whatsapp || data.contact_wa || "6287778059221",
        contact_ig: data.contact_ig || "@linkproductive",
        contact_address: data.contact_address || "Jl. Inovasi Sosial No. 42, Jakarta Selatan",
        operational_hours: data.operational_hours || "Senin�Sabtu: 09:00 - 18:00",
        hero_eyebrow: data.hero_eyebrow || "Link Productive",
        hero_text_1: data.hero_text_1 || "Inovasi Sosial &",
        hero_highlight_1: data.hero_highlight_1 || "Pendidikan Terintegrasi",
        hero_text_2: data.hero_text_2 || "",
        hero_highlight_2: data.hero_highlight_2 || "",
        hero_desc: data.hero_desc || "Platform program pelatihan unggulan, inovasi sosial, dan pengembangan karir yang mempersiapkan talenta masa depan untuk dunia kerja yang kompetitif.",
        affiliate_poster_academic: data.affiliate_poster_academic || "",
        affiliate_poster_career: data.affiliate_poster_career || "",
        affiliate_poster_entrepreneur: data.affiliate_poster_entrepreneur || "",
        affiliate_poster_bisapreneur: data.affiliate_poster_bisapreneur || "",
        affiliate_poster_baristara: data.affiliate_poster_baristara || "",
        affiliate_poster_cuan_creator: data.affiliate_poster_cuan_creator || "",
        affiliate_poster_tekno_ai: data.affiliate_poster_tekno_ai || "",
        affiliate_poster_mental_bahasa: data.affiliate_poster_mental_bahasa || "",
        payment_bank_name: data.payment_bank_name || "BCA (Bank Central Asia)",
        payment_bank_account: data.payment_bank_account || "8882047811",
        payment_bank_owner: data.payment_bank_owner || "PT Link Productive Indonesia",
        payment_qris_image: data.payment_qris_image || "",
        training_payment_wa: data.training_payment_wa || "6287778059221",
        payment_dana_number: data.payment_dana_number || "",
        payment_dana_owner: data.payment_dana_owner || "",
        payment_gopay_owner: data.payment_gopay_owner || "",
        homepage_section_order: data.homepage_section_order || "hero,about,kegiatans,youtube,packages,testimonials,how-it-works,faq,contact",
        faqs: data.faqs || JSON.stringify(defaultFaqs),
        about_title: data.about_title || "Mengenal Lebih Dekat",
        about_highlight: data.about_highlight || "Link Productive",
        about_desc: data.about_desc || site.description,
        about_card_title: data.about_card_title || "Link Productive",
        about_card_desc: data.about_card_desc || "Inovasi Sosial & Pendidikan Terintegrasi untuk Masa Depan Indonesia",
        kegiatan_eyebrow: data.kegiatan_eyebrow || "Kategori Kegiatan",
        kegiatan_title: data.kegiatan_title || "Program Utama",
        kegiatan_highlight: data.kegiatan_highlight || "",
        kegiatan_desc: data.kegiatan_desc || "Pilihan kegiatan dan program pelatihan reguler maupun bootcamp intensif yang diselenggarakan oleh Link Productive untuk masyarakat umum dan partner B2B.",
        youtube_eyebrow: data.youtube_eyebrow || "Video Profile",
        youtube_title: data.youtube_title || "Keseruan di",
        youtube_highlight: data.youtube_highlight || "Link Productive",
        youtube_desc: data.youtube_desc || "Tonton berbagai kegiatan, pelatihan, dan keseruan para peserta di berbagai program Link Productive melalui channel YouTube resmi kami.",
        youtube_url: data.youtube_url || "https://www.youtube.com/embed/9G6k18N1dIQ?autoplay=1&mute=1&loop=1&playlist=9G6k18N1dIQ",
        packages_eyebrow: data.packages_eyebrow || "Program Kami",
        packages_title: data.packages_title || "Pilihan",
        packages_highlight: data.packages_highlight || "Program",
        packages_desc: data.packages_desc || "Berbagai program pelatihan dan sertifikasi yang dirancang untuk meningkatkan skill dan siap menghadapi dunia kerja.",
        testimonial_eyebrow: data.testimonial_eyebrow || "Testimoni",
        testimonial_title: data.testimonial_title || "Apa Kata",
        testimonial_highlight: data.testimonial_highlight || "Mereka",
        testimonial_desc: data.testimonial_desc || "Cerita sukses dan pengalaman berharga dari para alumni program pelatihan Link Productive.",
        how_eyebrow: data.how_eyebrow || "Langkah Mudah",
        how_title: data.how_title || "Cara",
        how_highlight: data.how_highlight || "Kerja",
        how_desc: data.how_desc || "Langkah mudah untuk mulai mengikuti program pelatihan dan sertifikasi bersama Link Productive.",
        contact_title: data.contact_title || "Tetap Terhubung",
        contact_desc: data.contact_desc || "Punya pertanyaan seputar program atau ingin menjalin kerjasama? Tim kami siap membantu Anda.",
        // ── Halaman Daftar Pelatihan ──
        training_hero_badge: data.training_hero_badge || "Portal Pembelajaran & Karir",
        training_hero_title: data.training_hero_title || "Katalog Kelas & Pelatihan Premium",
        training_hero_desc: data.training_hero_desc || "Tingkatkan kompetensi Anda melalui program pelatihan intensif, bimbingan tugas akhir privat, serta sertifikasi keahlian berstandar industri bersama mentor senior.",
        training_hero_btn: data.training_hero_btn || "Jelajahi Program Pelatihan",
        training_feature_1_title: data.training_feature_1_title || "Privat Intensif",
        training_feature_1_desc: data.training_feature_1_desc || "Bimbingan satu-satu terarah",
        training_feature_2_title: data.training_feature_2_title || "Praktisi Ahli",
        training_feature_2_desc: data.training_feature_2_desc || "Didampingi mentor industri senior",
        training_feature_3_title: data.training_feature_3_title || "Karir Akseleratif",
        training_feature_3_desc: data.training_feature_3_desc || "Persiapan matang ke dunia kerja",
        training_feature_4_title: data.training_feature_4_title || "Sertifikat Resmi",
        training_feature_4_desc: data.training_feature_4_desc || "Kredensial berharga portofolio",
        training_section_title: data.training_section_title || "Pilihan Kelas & Pelatihan",
        training_section_desc: data.training_section_desc || "Klik Lihat Detail Program pada katalog di bawah ini untuk melihat rincian silabus kelas, skema investasi, dan formulir pendaftaran.",
        training_search_placeholder: data.training_search_placeholder || "Cari kelas pelatihan...",
        training_step_1_title: data.training_step_1_title || "Pilih Paket Belajar",
        training_step_1_desc: data.training_step_1_desc || "Tentukan tingkat kompetensi yang ingin Anda ikuti di tabel sebelah kanan.",
        training_step_2_title: data.training_step_2_title || "Isi Formulir",
        training_step_2_desc: data.training_step_2_desc || "Klik tombol \"Pilih Paket\" pada paket tersebut dan lengkapi data diri Anda.",
        training_step_3_title: data.training_step_3_title || "Transfer Investasi",
        training_step_3_desc: data.training_step_3_desc || "Lakukan pembayaran sesuai nominal paket ke rekening bank resmi atau scan QRIS yang tampil.",
        training_step_4_title: data.training_step_4_title || "Konfirmasi WhatsApp",
        training_step_4_desc: data.training_step_4_desc || "Kirim bukti transfer ke admin via WhatsApp untuk verifikasi kelas & aktivasi akun.",
        training_cta_title: data.training_cta_title || "Masih Bingung Memilih Paket?",
        training_cta_desc: data.training_cta_desc || "Konsultasikan kebutuhan belajar atau pertanyaan Anda secara gratis dengan tim admin kami.",
        training_cta_btn: data.training_cta_btn || "Tanya Admin via WhatsApp",
        training_card_badge: data.training_card_badge || "Pendaftaran Aktif",
        training_empty_text: data.training_empty_text || "Detail silabus dan kurikulum program belum tersedia.",
      };

      setSettings(initialSettings);

      const defaultSections: Record<string, string> = {
        hero: "Hero Banner (Sliding Carousel)",
        about: "Tentang Kami (About Us)",
        kegiatans: "Galeri Kategori Kegiatan",
        youtube: "Official YouTube Channel Highlight",
        packages: "Pilihan Program Pelatihan",
        testimonials: "Testimoni Pelanggan",
        "how-it-works": "Cara Kerja Platform",
        faq: "Tanya Jawab (FAQ)",
        contact: "Informasi Kontak & Lokasi"
      };

      const orderedKeys = initialSettings.homepage_section_order.split(",");
      const sectionList = orderedKeys.map(key => ({
        id: key,
        name: defaultSections[key] || key
      })).filter(s => defaultSections[s.id]);

      setSections(sectionList);
    } catch (error) {
      toast.error("Gagal memuat pengaturan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const updated = [...sections];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;

    // Swap
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setSections(updated);

    // Update setting string
    const keysString = updated.map(s => s.id).join(",");
    handleChange("homepage_section_order", keysString);
  };

  const handleSingleImageUpload = async (key: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      toast.loading("Mengunggah gambar...", { id: "upload_single" });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        handleChange(key, data.url);
        const saveRes = await updateSiteSettings({ [key]: data.url });
        if (saveRes.success) {
          toast.success("Gambar berhasil diunggah!", { id: "upload_single" });
        } else {
          toast.error("Gambar terunggah tapi gagal disimpan.", { id: "upload_single" });
        }
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat mengunggah gambar.", { id: "upload_single" });
    }
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

  const InputRow = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-near-black/60 uppercase tracking-wide">{label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-warm-white/50 border border-near-black/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
      />
    </div>
  );

  const InputRowTextarea = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-near-black/60 uppercase tracking-wide">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-warm-white/50 border border-near-black/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all min-h-[60px]"
      />
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-near-black/50" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-near-black/5 pb-6">
        <div>
          <h1 className="text-2xl font-black text-near-black tracking-tight mb-1">
            Pengaturan Website
          </h1>
          <p className="text-sm font-medium text-near-black/60">
            Ubah tata letak sections, teks hero, poster promosi, dan informasi kontak website.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Tab Selector */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === "contact" ? "bg-white text-near-black shadow-sm" : "text-gray-400 hover:text-near-black"}`}
            >
              Kontak & Rekening
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === "content" ? "bg-white text-near-black shadow-sm" : "text-gray-400 hover:text-near-black"}`}
            >
              Konten Website
            </button>
            <button
              onClick={() => setActiveTab("layout")}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === "layout" ? "bg-white text-near-black shadow-sm" : "text-gray-400 hover:text-near-black"}`}
            >
              Urutan Section
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${activeTab === "faq" ? "bg-white text-near-black shadow-sm" : "text-gray-400 hover:text-near-black"}`}
            >
              FAQ (Tanya Jawab)
            </button>
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
            Simpan
          </button>
        </div>
      </div>

      {activeTab === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
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
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor WhatsApp (Tampilan Utama, tanpa +)</label>
                <input
                  type="text"
                  value={settings.contact_wa}
                  onChange={(e) => handleChange("contact_wa", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="6287778059221"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor WhatsApp Partner Affiliate (tanpa +)</label>
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
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Link TikTok</label>
                <input
                  type="text"
                  value={settings.contact_tiktok}
                  onChange={(e) => handleChange("contact_tiktok", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="https://tiktok.com/@linkproductive"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Link YouTube</label>
                <input
                  type="text"
                  value={settings.contact_youtube}
                  onChange={(e) => handleChange("contact_youtube", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="https://www.youtube.com/@link.productive"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Google Maps Embed URL</label>
                <input
                  type="text"
                  value={settings.contact_maps_embed}
                  onChange={(e) => handleChange("contact_maps_embed", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="https://www.google.com/maps/embed?pb=..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Alamat Kantor</label>
                <textarea
                  value={settings.contact_address}
                  onChange={(e) => handleChange("contact_address", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all min-h-[80px]"
                />
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Informasi Pembayaran</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Rekening Bank & QRIS Instansi</p>
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
                  placeholder="Contoh: PT Link Productive Indonesia"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Nomor WA Konfirmasi Pendaftaran (tanpa +)</label>
                <input
                  type="text"
                  value={settings.training_payment_wa || ""}
                  onChange={(e) => handleChange("training_payment_wa", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Contoh: 6287778059221"
                />
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
      )}

      {activeTab === "content" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Teks Hero Landing Page */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Teks Hero (Halaman Utama)</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Ubah headline utama landing page Anda</p>
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
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Jam Operasional (Footer)</label>
                <input
                  type="text"
                  value={settings.operational_hours}
                  onChange={(e) => handleChange("operational_hours", e.target.value)}
                  className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                  placeholder="Contoh: Senin–Sabtu: 09:00 - 18:00"
                />
              </div>
            </div>
          </div>

          {/* Tentang Kami */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Tentang Kami</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                  <input type="text" value={settings.about_title} onChange={(e) => handleChange("about_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-sky-500">Judul Warna</label>
                  <input type="text" value={settings.about_highlight} onChange={(e) => handleChange("about_highlight", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.about_desc} onChange={(e) => handleChange("about_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Teks Kartu Visual</label>
                <input type="text" value={settings.about_card_title} onChange={(e) => handleChange("about_card_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 mb-3" placeholder="Judul Kartu" />
                <input type="text" value={settings.about_card_desc} onChange={(e) => handleChange("about_card_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Deskripsi Kartu" />
              </div>
            </div>
          </div>

          {/* Kegiatan */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Kategori Kegiatan</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Eyebrow</label>
                <input type="text" value={settings.kegiatan_eyebrow} onChange={(e) => handleChange("kegiatan_eyebrow", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                  <input type="text" value={settings.kegiatan_title} onChange={(e) => handleChange("kegiatan_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-indigo-500">Judul Warna</label>
                  <input type="text" value={settings.kegiatan_highlight} onChange={(e) => handleChange("kegiatan_highlight", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.kegiatan_desc} onChange={(e) => handleChange("kegiatan_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* YouTube */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Video YouTube</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Eyebrow</label>
                <input type="text" value={settings.youtube_eyebrow} onChange={(e) => handleChange("youtube_eyebrow", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                  <input type="text" value={settings.youtube_title} onChange={(e) => handleChange("youtube_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-red-500">Judul Warna</label>
                  <input type="text" value={settings.youtube_highlight} onChange={(e) => handleChange("youtube_highlight", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.youtube_desc} onChange={(e) => handleChange("youtube_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Link Embed YouTube</label>
                <input type="text" value={settings.youtube_url} onChange={(e) => handleChange("youtube_url", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 mb-3" placeholder="https://www.youtube.com/embed/..." />

                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide mt-4">Atau Gambar Thumbnail (Jika Bukan Video)</label>
                <div className="flex gap-3">
                  <input type="text" value={settings.youtube_thumbnail || ""} onChange={(e) => handleChange("youtube_thumbnail", e.target.value)} className="flex-1 px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="https://..." />
                  <label className="flex items-center gap-2 px-6 py-3 bg-near-black text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-near-black/90 cursor-pointer transition-colors shadow-sm whitespace-nowrap">
                    <Upload className="w-4 h-4" /> Unggah Gambar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleSingleImageUpload("youtube_thumbnail", file);
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Program Pelatihan */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Program Pelatihan</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Eyebrow</label>
                <input type="text" value={settings.packages_eyebrow} onChange={(e) => handleChange("packages_eyebrow", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                  <input type="text" value={settings.packages_title} onChange={(e) => handleChange("packages_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-orange-500">Judul Warna</label>
                  <input type="text" value={settings.packages_highlight} onChange={(e) => handleChange("packages_highlight", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.packages_desc} onChange={(e) => handleChange("packages_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* Testimoni */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Testimoni</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Eyebrow</label>
                <input type="text" value={settings.testimonial_eyebrow} onChange={(e) => handleChange("testimonial_eyebrow", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                  <input type="text" value={settings.testimonial_title} onChange={(e) => handleChange("testimonial_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-yellow-500">Judul Warna</label>
                  <input type="text" value={settings.testimonial_highlight} onChange={(e) => handleChange("testimonial_highlight", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.testimonial_desc} onChange={(e) => handleChange("testimonial_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* Cara Kerja */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Cara Kerja</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Eyebrow</label>
                <input type="text" value={settings.how_eyebrow} onChange={(e) => handleChange("how_eyebrow", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                  <input type="text" value={settings.how_title} onChange={(e) => handleChange("how_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide text-green-500">Judul Warna</label>
                  <input type="text" value={settings.how_highlight} onChange={(e) => handleChange("how_highlight", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.how_desc} onChange={(e) => handleChange("how_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Bagian Kontak</h2>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Judul Normal</label>
                <input type="text" value={settings.contact_title} onChange={(e) => handleChange("contact_title", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-near-black mb-2 uppercase tracking-wide">Deskripsi</label>
                <textarea value={settings.contact_desc} onChange={(e) => handleChange("contact_desc", e.target.value)} className="w-full px-4 py-3 bg-warm-white/50 border border-near-black/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* Poster Program Promosi */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Poster Program</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Ubah gambar poster promosi tiap program akademis/affiliate</p>
              </div>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
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
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-24 h-32 rounded-xl bg-near-black/5 border border-near-black/10 flex items-center justify-center text-near-black/25">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={settings[prog.key] || ""}
                          onChange={(e) => handleChange(prog.key, e.target.value)}
                          placeholder="Link URL Poster (pisahkan dengan koma jika banyak)..."
                          className="w-full px-3 py-2 bg-warm-white/50 border border-near-black/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all font-mono"
                        />
                        <div className="flex gap-2">
                          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-near-black/5 hover:bg-near-black/10 text-near-black text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer">
                            <Upload className="w-3 h-3" /> Unggah Poster
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
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Halaman Daftar Pelatihan ── */}
          <div className="bg-white p-6 rounded-2xl border border-near-black/5 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                <Type className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Halaman Daftar Pelatihan</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Atur teks hero banner, kartu fitur, langkah pendaftaran, dan CTA</p>
              </div>
            </div>

            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Hero Section */}
              <div className="space-y-3 border-b border-near-black/5 pb-5">
                <h3 className="text-[11px] font-black text-near-black uppercase tracking-wider">Hero Banner</h3>
                <InputRow label="Badge" value={settings.training_hero_badge} onChange={(v) => handleChange("training_hero_badge", v)} />
                <InputRow label="Judul Utama" value={settings.training_hero_title} onChange={(v) => handleChange("training_hero_title", v)} />
                <InputRowTextarea label="Deskripsi" value={settings.training_hero_desc} onChange={(v) => handleChange("training_hero_desc", v)} />
                <InputRow label="Tombol CTA" value={settings.training_hero_btn} onChange={(v) => handleChange("training_hero_btn", v)} />
              </div>

              {/* Feature Cards */}
              <div className="space-y-3 border-b border-near-black/5 pb-5">
                <h3 className="text-[11px] font-black text-near-black uppercase tracking-wider">Kartu Fitur (4 Kolom)</h3>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="space-y-2 p-3 bg-near-black/[0.02] rounded-xl">
                    <p className="text-[10px] font-bold text-near-black/60 uppercase">Fitur #{n}</p>
                    <InputRow label="Judul" value={settings[`training_feature_${n}_title`]} onChange={(v) => handleChange(`training_feature_${n}_title`, v)} />
                    <InputRow label="Deskripsi" value={settings[`training_feature_${n}_desc`]} onChange={(v) => handleChange(`training_feature_${n}_desc`, v)} />
                  </div>
                ))}
              </div>

              {/* Program Section */}
              <div className="space-y-3 border-b border-near-black/5 pb-5">
                <h3 className="text-[11px] font-black text-near-black uppercase tracking-wider">Heading Program</h3>
                <InputRow label="Judul Section" value={settings.training_section_title} onChange={(v) => handleChange("training_section_title", v)} />
                <InputRowTextarea label="Subtitle" value={settings.training_section_desc} onChange={(v) => handleChange("training_section_desc", v)} />
                <InputRow label="Placeholder Search" value={settings.training_search_placeholder} onChange={(v) => handleChange("training_search_placeholder", v)} />
                <InputRow label="Badge Kartu" value={settings.training_card_badge} onChange={(v) => handleChange("training_card_badge", v)} />
                <InputRow label="Teks Kosong" value={settings.training_empty_text} onChange={(v) => handleChange("training_empty_text", v)} />
              </div>

              {/* Registration Steps */}
              <div className="space-y-3 border-b border-near-black/5 pb-5">
                <h3 className="text-[11px] font-black text-near-black uppercase tracking-wider">Langkah Pendaftaran (4 Step)</h3>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="space-y-2 p-3 bg-near-black/[0.02] rounded-xl">
                    <p className="text-[10px] font-bold text-near-black/60 uppercase">Step #{n}</p>
                    <InputRow label="Judul" value={settings[`training_step_${n}_title`]} onChange={(v) => handleChange(`training_step_${n}_title`, v)} />
                    <InputRow label="Deskripsi" value={settings[`training_step_${n}_desc`]} onChange={(v) => handleChange(`training_step_${n}_desc`, v)} />
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-3 pb-2">
                <h3 className="text-[11px] font-black text-near-black uppercase tracking-wider">CTA Konsultasi (Bawah Detail)</h3>
                <InputRow label="Judul" value={settings.training_cta_title} onChange={(v) => handleChange("training_cta_title", v)} />
                <InputRowTextarea label="Deskripsi" value={settings.training_cta_desc} onChange={(v) => handleChange("training_cta_desc", v)} />
                <InputRow label="Tombol" value={settings.training_cta_btn} onChange={(v) => handleChange("training_cta_btn", v)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "layout" && (
        <div className="bg-white p-8 rounded-2xl border border-near-black/5 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-near-black/5">
            <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#004aad] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Urutan Bagian Halaman Utama (Homepage)</h2>
              <p className="text-[11px] text-near-black/50 font-medium">Ubah letak dan urutan tampilan sections di landing page secara interaktif.</p>
            </div>
          </div>

          {/* Section positioning manager */}
          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className="flex items-center justify-between p-4 bg-[#f8fafc] border border-near-black/5 rounded-2xl hover:bg-white hover:border-[#004aad]/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#004aad]/10 text-[#004aad] text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-near-black">{sec.name}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => moveSection(idx, "up")}
                    disabled={idx === 0}
                    className="p-2.5 rounded-xl border border-near-black/5 hover:border-near-black/10 hover:bg-near-black/5 text-near-black/50 hover:text-near-black transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Pindahkan Ke Atas"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(idx, "down")}
                    disabled={idx === sections.length - 1}
                    className="p-2.5 rounded-xl border border-near-black/5 hover:border-near-black/10 hover:bg-near-black/5 text-near-black/50 hover:text-near-black transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Pindahkan Ke Bawah"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200/50 rounded-2xl flex gap-3 text-amber-800">
            <Layers className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold leading-relaxed">
              <p className="font-bold mb-1">?? Tips Pengaturan Tata Letak:</p>
              Gunakan tombol panah di atas untuk menyesuaikan susunan urutan visual landing page utama. Setelah selesai menyusun urutan, pastikan Anda menekan tombol <strong>Simpan</strong> di bagian atas halaman untuk menerapkan susunan tata letak baru ini secara publik.
            </div>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <div className="bg-white p-8 rounded-2xl border border-near-black/5 shadow-sm max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-near-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0f7ff] text-[#004aad] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-near-black uppercase tracking-widest">Tanya Jawab (FAQ)</h2>
                <p className="text-[11px] text-near-black/50 font-medium">Ubah, tambah, atau hapus pertanyaan dan jawaban di website utama.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const currentFaqs = settings.faqs ? JSON.parse(settings.faqs) : [];
                currentFaqs.push({ question: "Pertanyaan Baru", answer: "Jawaban Baru" });
                handleChange("faqs", JSON.stringify(currentFaqs));
              }}
              className="flex items-center gap-2 px-4 py-2 bg-near-black/5 hover:bg-near-black/10 text-near-black rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah FAQ
            </button>
          </div>

          <div className="space-y-4">
            {settings.faqs ? (
              (() => {
                try {
                  const parsedFaqs = JSON.parse(settings.faqs);
                  return parsedFaqs.map((faq: any, idx: number) => (
                    <div key={idx} className="p-4 border border-near-black/10 rounded-2xl space-y-3 relative group bg-warm-white/20 hover:border-near-black/20 transition-all">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...parsedFaqs];
                          updated.splice(idx, 1);
                          handleChange("faqs", JSON.stringify(updated));
                        }}
                        className="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div>
                        <label className="block text-[10px] font-bold text-near-black/70 uppercase tracking-widest mb-1.5">Pertanyaan {idx + 1}</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...parsedFaqs];
                            updated[idx].question = e.target.value;
                            handleChange("faqs", JSON.stringify(updated));
                          }}
                          className="w-full px-4 py-2 bg-white border border-near-black/10 rounded-xl text-sm font-bold focus:outline-none focus:border-near-black/30 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-near-black/70 uppercase tracking-widest mb-1.5">Jawaban</label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...parsedFaqs];
                            updated[idx].answer = e.target.value;
                            handleChange("faqs", JSON.stringify(updated));
                          }}
                          rows={3}
                          className="w-full px-4 py-2 bg-white border border-near-black/10 rounded-xl text-sm text-near-black/80 focus:outline-none focus:border-near-black/30 transition-all resize-none"
                        />
                      </div>
                    </div>
                  ));
                } catch (e) {
                  return <p className="text-sm text-rose-500">Data FAQ rusak, silakan simpan ulang pengaturan ini.</p>;
                }
              })()
            ) : (
              <div className="text-center p-8 border border-dashed border-near-black/20 rounded-2xl">
                <p className="text-sm font-medium text-near-black/50">Belum ada FAQ. Gunakan FAQ bawaan sistem atau buat baru.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
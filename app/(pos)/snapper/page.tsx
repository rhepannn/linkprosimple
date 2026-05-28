"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import {
  DollarSign, Gift, Copy, Check, Landmark, CreditCard,
  TrendingUp, Users, Share2, ExternalLink, Sparkles, Clock,
  CheckCircle2, Calendar, ImageIcon, BookOpen, AlertCircle, Phone,
  GraduationCap, Award, Building, Coffee, MonitorPlay, Presentation,
  Recycle, ShoppingBag, Camera, Handshake, ChevronDown, ChevronUp, ChevronRight,
  Download, Megaphone
} from "lucide-react";
import { getSnapperDashboardData, updateSnapperReferralProduct } from "@/app/actions/snapper";
import { getAffiliatePosts } from "@/app/actions/affiliate-posts";
import { getProducts } from "@/app/actions/products";
import { getSiteSettings } from "@/app/actions/settings";
import { toast } from "sonner";

interface Commission {
  id: string;
  bookingId: string;
  amount: number;
  status: string;
  createdAt: string;
  booking: {
    invoiceNo: string;
    customerName: string;
    packageName: string;
    sessionDate: string;
    finalPrice: number;
  };
}

interface AffiliatePost {
  id: string;
  imageUrl: string;
  caption: string;
  hashtags: string[];
  likeCount: number;
  isPublished: boolean;
  postedBy: string;
  createdAt: Date | string;
}

const AFFILIATE_PROGRAMS = [
  { sku: "lp-academic-starter", name: "LP Academic Partner - Starter Consultation" },
  { sku: "lp-academic-regular", name: "LP Academic Partner - Regular Partner" },
  { sku: "lp-academic-premium", name: "LP Academic Partner - Premium Partner" },
  { sku: "lp-academic-intensive", name: "LP Academic Partner - Intensive Sidang" },
  { sku: "lp-career-ready", name: "LP Career Ready" },
  { sku: "lp-entrepreneur-launchpad", name: "LP Entrepreneur Launchpad" },
  { sku: "bisapreneur-academy", name: "Bisapreneur Academy" },
  { sku: "baristara-profesional", name: "Baristara Academy - Barista Profesional" },
  { sku: "baristara-bisnis", name: "Baristara Academy - Barista & Bisnis Kopi" },
  { sku: "cuan-creator-academy", name: "Cuan Creator Academy" },
  { sku: "tekno-ai-productivity", name: "Tekno AI Academy - AI Business Productivity" },
  { sku: "tekno-ai-webdev", name: "Tekno AI Academy - Web Developer" },
  { sku: "tekno-ai-office", name: "Tekno AI Academy - AI for Office" },
  { sku: "tekno-ai-industry", name: "Tekno AI Academy - AI Industry" },
  { sku: "mental-public-speaking", name: "Mental Bahasa Academy - Public Speaking" },
  { sku: "mental-english", name: "Mental Bahasa Academy - English Speaking" },
  { sku: "mental-self-growth", name: "Mental Bahasa Academy - Self Growth" },
  { sku: "green-tech-dasar", name: "Green Productive Academy - Teknologi Hijau" },
  { sku: "green-tech-inovasi", name: "Green Productive Academy - Inovasi" },
  { sku: "brand-siap-logo", name: "Brand Siap - Logo & Brand Identity" },
  { sku: "brand-siap-packaging", name: "Brand Siap - Packaging Design" },
  { sku: "brand-siap-lengkap", name: "Brand Siap - Paket Lengkap" },
  { sku: "standara-basic", name: "Standara Consulting - Basic" },
  { sku: "standara-growth", name: "Standara Consulting - Growth" },
  { sku: "standara-professional", name: "Standara Consulting - Professional" },
];

// ─── Package pricing data per product (dari poster) ───────────────────────
const PROGRAM_PACKAGES: Record<string, { name: string; price: string; discount: string; afterDiscount?: string; commission: string }[]> = {
  "lp-academic-starter": [
    { name: "🥉 Paket Starter Consultation", price: "Rp 799.000", discount: "Rp 250.000", commission: "Rp 100.000 / transaksi" },
  ],
  "lp-academic-regular": [
    { name: "🥈 Paket Regular Academic Partner", price: "Rp 2.499.000", discount: "Rp 600.000", commission: "Rp 150.000 / transaksi" },
  ],
  "lp-academic-premium": [
    { name: "🥇 Paket Premium Academic Partner", price: "Rp 4.999.000", discount: "Rp 1.300.000", commission: "Rp 250.000 / transaksi" },
  ],
  "lp-academic-intensive": [
    { name: "🚀 Paket Intensive Sidang & Revisi", price: "Rp 1.499.000", discount: "Rp 400.000", commission: "Rp 100.000 / transaksi" },
  ],
  "lp-career-ready": [
    { name: "📌 Pembelian H-1 Minggu", price: "Rp 699.000", discount: "-", afterDiscount: "Rp 699.000", commission: "Rp 50.000 / peserta" },
    { name: "🚀 Promo H-7 s/d H-20", price: "Rp 699.000", discount: "Rp 400.000", afterDiscount: "Rp 299.000", commission: "Rp 50.000 / peserta" },
    { name: "🚀 Promo H-21 & Seterusnya", price: "Rp 699.000", discount: "Rp 500.000", afterDiscount: "Rp 199.000", commission: "Rp 50.000 / peserta" },
  ],
  "lp-entrepreneur-launchpad": [
    { name: "⏳ H-1 Minggu Sebelum Acara", price: "Rp 750.000", discount: "-", commission: "Rp 75.000 / peserta" },
    { name: "⏳ H-7 s/d H-20", price: "Rp 750.000", discount: "Rp 400.000", afterDiscount: "Rp 350.000", commission: "Rp 75.000 / peserta" },
    { name: "⏳ H-21 & Seterusnya", price: "Rp 750.000", discount: "Rp 500.000", afterDiscount: "Rp 250.000", commission: "Rp 75.000 / peserta" },
  ],
  "bisapreneur-academy": [
    { name: "💼 Kelas Wirausaha Pemula", price: "Rp 1.250.000", discount: "Rp 250.000", afterDiscount: "Rp 1.000.000", commission: "Rp 100.000 / peserta" },
  ],
  "baristara-profesional": [
    { name: "☕ Program Barista Profesional", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / peserta" },
  ],
  "baristara-bisnis": [
    { name: "☕ Program Barista & Bisnis Kopi", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000", commission: "Rp 200.000 / peserta" },
  ],
  "cuan-creator-academy": [
    { name: "🎓 Cuan Creator Academy", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000", commission: "Rp 200.000 / peserta" },
  ],
  "tekno-ai-productivity": [
    { name: "🤖 AI Business Productivity Class", price: "Rp 2.700.000", discount: "Rp 1.000.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / transaksi" },
  ],
  "tekno-ai-webdev": [
    { name: "🌐 Web Developer for Business", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000", commission: "Rp 200.000 / transaksi" },
  ],
  "tekno-ai-office": [
    { name: "🏢 AI for Office & Administration", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / transaksi" },
  ],
  "tekno-ai-industry": [
    { name: "🏭 AI Industry & Smart Manufacturing", price: "Rp 2.800.000", discount: "Rp 900.000", afterDiscount: "Rp 1.900.000", commission: "Rp 150.000 / transaksi" },
  ],
  "mental-public-speaking": [
    { name: "🎤 Public Speaking & Confidence", price: "Rp 1.500.000", discount: "Rp 700.000", afterDiscount: "Rp 800.000", commission: "Rp 50.000 / peserta" },
  ],
  "mental-english": [
    { name: "🌐 English Speaking & Confidence", price: "Rp 2.000.000", discount: "Rp 1.000.000", afterDiscount: "Rp 1.000.000", commission: "Rp 100.000 / peserta" },
  ],
  "mental-self-growth": [
    { name: "🧠 Self Growth & Mental Health", price: "Rp 1.500.000", discount: "Rp 700.000", afterDiscount: "Rp 800.000", commission: "Rp 50.000 / peserta" },
  ],
  "green-tech-dasar": [
    { name: "🌱 Program Teknologi Hijau Dasar", price: "Rp 1.500.000", discount: "Rp 500.000", afterDiscount: "Rp 1.000.000", commission: "Rp 100.000 / peserta" },
  ],
  "green-tech-inovasi": [
    { name: "♻️ Program Inovasi Produk Berkelanjutan", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / peserta" },
  ],
  "brand-siap-logo": [
    { name: "🎨 Paket Logo & Brand Identity", price: "Rp 500.000", discount: "Rp 100.000", afterDiscount: "Rp 400.000", commission: "Rp 50.000 / proyek" },
  ],
  "brand-siap-packaging": [
    { name: "📦 Paket Kemasan & Packaging Design", price: "Rp 750.000", discount: "Rp 150.000", afterDiscount: "Rp 600.000", commission: "Rp 75.000 / proyek" },
  ],
  "brand-siap-lengkap": [
    { name: "🚀 Paket Brand Siap Lengkap", price: "Rp 1.500.000", discount: "Rp 300.000", afterDiscount: "Rp 1.200.000", commission: "Rp 150.000 / proyek" },
  ],
  "snapp-frame": [
    { name: "🤳 Paket Solo (10 foto)", price: "Rp 75.000", discount: "Rp 15.000", afterDiscount: "Rp 60.000", commission: "Rp 35.000 / booking" },
    { name: "📸 Paket Duo (15 foto)", price: "Rp 100.000", discount: "Rp 20.000", afterDiscount: "Rp 80.000", commission: "Rp 52.500 / booking" },
    { name: "👨‍👩‍👧‍👦 Paket Group (20 foto)", price: "Rp 130.000", discount: "Rp 25.000", afterDiscount: "Rp 105.000", commission: "Rp 70.000 / booking" },
  ],
  "standara-basic": [
    { name: "📋 Paket Basic Business Improvement", price: "Menyesuaikan", discount: "Sesuai Proyek", commission: "Komisi Menarik / Closing" },
  ],
  "standara-growth": [
    { name: "📋 Paket Standard Growth Business", price: "Menyesuaikan", discount: "Sesuai Proyek", commission: "Komisi Menarik / Closing" },
  ],
  "standara-professional": [
    { name: "📋 Paket Professional Management System", price: "Menyesuaikan", discount: "Sesuai Proyek", commission: "Komisi Menarik / Closing" },
  ],
};

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
  "snapp-frame": "Snapp Frame",
  "standara-consulting": "Standara Consulting",
};

const POSTER_KEYS: Record<string, string> = {
  "LP Academic Partner": "affiliate_poster_academic",
  "LP Career Ready": "affiliate_poster_career",
  "LP Entrepreneur Launchpad": "affiliate_poster_entrepreneur",
  "Bisapreneur Academy": "affiliate_poster_bisapreneur",
  "Baristara Academy": "affiliate_poster_baristara",
  "Cuan Creator Academy": "affiliate_poster_cuan_creator",
  "Tekno AI Academy": "affiliate_poster_tekno_ai",
  "Mental Bahasa Academy": "affiliate_poster_mental_bahasa",
  "Green Productive Academy": "affiliate_poster_green_productive",
  "Brand Siap": "affiliate_poster_brand_siap",
  "Snapp Frame": "affiliate_poster_snapp_frame",
  "Standara Consulting": "affiliate_poster_standara",
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
  "Brand Siap": "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=600&auto=format&fit=crop",
  "Snapp Frame": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  "Standara Consulting": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
};

const skuIconMap: Record<string, React.ComponentType<any>> = {
  "lp-academic-partner": GraduationCap,
  "lp-career-ready": Award,
  "lp-entrepreneur-launchpad": TrendingUp,
  "bisapreneur-academy": Building,
  "baristara-academy": Coffee,
  "cuan-creator-academy": MonitorPlay,
  "tekno-ai-academy": Presentation,
  "mental-bahasa-academy": Users,
  "green-productive-academy": Recycle,
  "brand-siap": ShoppingBag,
  "snapp-frame": Camera,
  "standara-consulting": Handshake,
};

const generatePromoText = (progName: string, refCode: string) => {
  const codeText = refCode ? `@${refCode.trim().replace("@", "")}` : "[KODE_REFERRAL_KAMU]";
  const origin = typeof window !== "undefined" ? window.location.origin : "https://snappframe.id";
  const slug = Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === progName) || "";
  const linkText = refCode 
    ? `${origin}/booking?ref=${refCode.trim().replace("@", "")}&pkg=${slug}`
    : `${origin}/booking?pkg=${slug}`;

  switch (progName) {
    case "LP Academic Partner":
      return `Bantu teman mahasiswa menyelesaikan Tugas Akhir secara terarah dan profesional! 🎓\nDapatkan pendampingan konsultasi terbaik dari Link Productive dengan potongan diskon khusus menggunakan kode: ${codeText}\n\nSelengkapnya dan pendaftaran di: ${linkText}\n#LPAcademicPartner #KonsultasiTA #Skripsi`;
    case "LP Career Ready":
      return `Mau lulus kuliah langsung dilirik HRD BUMN & Swasta Nasional? 💼\nPersiapkan kariermu secara matang di LP Career Ready. CV & LinkedIn review, mock interview, dan strategi karier. Gunakan kode diskon: ${codeText}\n\nDaftar sekarang: ${linkText}\n#LPCareerReady #PersiapanKerja #CVReview`;
    case "LP Entrepreneur Launchpad":
      return `Belajar bisnis dari nol bareng mentor berpengalaman di LP Entrepreneur Launchpad! 🚀\nBuat rancangan bisnis yang solid untuk pelajar & mahasiswa. Masukkan kode referral ini untuk potongan khusus: ${codeText}\n\nInfo detail: ${linkText}\n#LPEntrepreneurLaunchpad #BelajarBisnis #BootcampBisnis`;
    case "Bisapreneur Academy":
      return `Mulai langkah wirausaha pertamamu dengan percaya diri di Bisapreneur Academy! 🏪\nKelas bisnis praktis dari nol untuk pemula & UMKM. Dapatkan harga promo khusus dengan kode: ${codeText}\n\nDaftar di: ${linkText}\n#BisapreneurAcademy #WirausahaPemula #KelasBisnis`;
    case "Baristara Academy":
      return `Ingin jago meracik kopi dan punya bisnis coffee shop sendiri? ☕\nIkuti pelatihan barista profesional di Baristara Academy. Dapatkan diskon khusus menggunakan kode referral: ${codeText}\n\nInfo selengkapnya: ${linkText}\n#BaristaraAcademy #SekolahBarista #BisnisKopi`;
    case "Cuan Creator Academy":
      return `Mulai hasilkan income nyata dari keahlian Digital Marketing! 📈\nBelajar praktis berbasis project nyata di Cuan Creator Academy. Gunakan kode referral saya untuk promo khusus: ${codeText}\n\nDaftar di sini: ${linkText}\n#CuanCreatorAcademy #DigitalMarketing #BelajarDigital`;
    case "Tekno AI Academy":
      return `Jangan tertinggal di era kecerdasan buatan! Belajar coding & AI productivity untuk bisnis di Tekno AI Academy 🤖\nUbah caramu bekerja & dapatkan diskon khusus dengan kode: ${codeText}\n\nInfo pendaftaran: ${linkText}\n#TeknoAIAcademy #BelajarCoding #AIBusiness`;
    case "Mental Bahasa Academy":
      return `Tingkatkan kepercayaan diri, public speaking, & kemampuan bahasa Inggris di Mental Bahasa Academy! 🎤\nGabungan self-growth & komunikasi interaktif. Gunakan kode diskon saya: ${codeText}\n\nDaftar di: ${linkText}\n#MentalBahasaAcademy #PublicSpeaking #EnglishSpeaking`;
    case "Green Productive Academy":
      return `Pelajari teknologi hijau dasar dan inovasi produk ramah lingkungan di Green Productive Academy! 🌿\nMari berkontribusi pada masa depan berkelanjutan. Gunakan kode diskon khusus: ${codeText}\n\nDaftar kelas: ${linkText}\n#GreenProductiveAcademy #EcoTechnology #GreenInnovation`;
    case "Brand Siap":
      return `Butuh logo, identitas visual, atau desain kemasan produk super cepat dan profesional? 🎨\nPercayakan pada Brand Siap! Gunakan kode diskon referral saya untuk potongan harga: ${codeText}\n\nOrder layanan di: ${linkText}\n#BrandSiap #DesainLogo #JasaBranding`;
    case "Snapp Frame":
      return `Mau foto studio portrait premium, minimalis, dan cetak kilat? 📸\nBooking sesi fotomu di Snapp.frame Studio dan nikmati potongan harga khusus dengan kode: ${codeText}\n\nBooking sekarang: ${linkText}\n#SnappFrame #StudioFoto #SelfPhotoStudio`;
    case "Standara Consulting":
      return `Tingkatkan tata kelola bisnis, SOP, dan standardisasi industri Anda bersama Standara Consulting! 💼\nKonsultan mutu senior siap mendampingi UMKM & industri. Dapatkan penawaran khusus dengan kode: ${codeText}\n\nAjukan konsultasi: ${linkText}\n#StandaraConsulting #StandardisasiBisnis #SOPPerusahaan`;
    default:
      return `Yuk gabung program affiliate dan dapatkan produk/layanan terbaik dengan potongan harga spesial menggunakan kode referral saya: ${codeText}\n\nInfo selengkapnya: ${linkText}`;
  }
};

export default function SnapperDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "dashboard";

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [posts, setPosts] = useState<AffiliatePost[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Referral campaign States
  const [productsList, setProductsList] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [referralType, setReferralType] = useState<"foto" | "affiliate">("foto");
  const [savingProduct, setSavingProduct] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [activeKitSku, setActiveKitSku] = useState<string>("lp-academic-partner");

  // Auto-redirect if not logged in or wrong role
  useEffect(() => {
    getSession().then((s) => {
      if (!s) {
        router.push("/login");
        return;
      }
      const role = (s.user as any)?.role;
      if (role !== "SNAPPER" && role !== "ADMIN") {
        router.push("/login");
        return;
      }
      setSession(s);
    });
  }, [router]);

  // Fetch dashboard data & affiliate posts & products
  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      setLoading(true);
      try {
        const userId = session.user.id;
        const [dashRes, postsRes, prodRes, settingsRes] = await Promise.all([
          getSnapperDashboardData(userId),
          getAffiliatePosts(),
          getProducts(),
          getSiteSettings()
        ]);

        if (dashRes.success && dashRes.data) {
          setDashboardData(dashRes.data);
          const initialTarget = dashRes.data.referralCode?.targetProductId || "";
          setSelectedProductId(initialTarget);
          const isAff = AFFILIATE_PROGRAMS.some((p) => p.sku === initialTarget);
          setReferralType(isAff ? "affiliate" : "foto");
        } else {
          toast.error(dashRes.error || "Gagal memuat data dashboard.");
        }

        if (postsRes.success && postsRes.data) {
          // Only show published posts to snappers
          const published = postsRes.data.filter((p: any) => p.isPublished);
          setPosts(published);
        }

        if (prodRes.success && prodRes.data) {
          setProductsList(prodRes.data);
        }

        if (settingsRes) {
          setSettings(settingsRes);
        }
      } catch (err) {
        console.error(err);
        toast.error("Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!dashboardData || !dashboardData.commissions) {
      return { totalEarnings: 0, pendingPayout: 0, paidPayout: 0, count: 0 };
    }
    const commissions: Commission[] = dashboardData.commissions;
    const totalEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);
    const pendingPayout = commissions.filter(c => c.status === "pending").reduce((sum, c) => sum + c.amount, 0);
    const paidPayout = commissions.filter(c => c.status === "paid").reduce((sum, c) => sum + c.amount, 0);
    return {
      totalEarnings,
      pendingPayout,
      paidPayout,
      count: dashboardData.referralCode?.usageCount || 0
    };
  }, [dashboardData]);

  // Copy referral code
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast.success("Kode referral berhasil disalin!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Copy referral link
  const handleCopyLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://snappframe.id";
    const target = dashboardData?.referralCode?.targetProductId || "";
    
    const isAffiliate = AFFILIATE_PROGRAMS.some((p) => p.sku === target);
    const path = isAffiliate ? "/daftar" : "/booking";
    
    let shareUrl = `${origin}${path}?ref=${code}`;
    if (target) {
      shareUrl += `&pkg=${target}`;
    }

    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    toast.success("Link referral berhasil disalin!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveTargetProduct = async () => {
    if (!session || !dashboardData?.referralCode) return;
    setSavingProduct(true);
    try {
      const res = await updateSnapperReferralProduct(session.user.id, selectedProductId || null);
      if (res.success) {
        toast.success("Target produk campaign berhasil diperbarui!");
        // Update local state
        setDashboardData((prev: any) => ({
          ...prev,
          referralCode: {
            ...prev.referralCode,
            targetProductId: selectedProductId || null
          }
        }));
      } else {
        toast.error(res.error || "Gagal memperbarui target campaign.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setSavingProduct(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#C88A58]/20 border-t-[#C88A58] animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Memuat Dashboard Snapper...</p>
      </div>
    );
  }

  const referralCode = dashboardData.referralCode?.code || "";
  const discountPct = dashboardData.referralCode?.discountPct || 10;
  const feePercentage = dashboardData.referralCode?.feePercentage || 10;

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      
      {/* ── Heading ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#3B2211]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.4em]">Snapper Affiliate Partner</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C88A58] to-[#3B2211] flex items-center justify-center text-white shadow-xl shadow-[#C88A58]/20">
              <Gift size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#3B2211] tracking-tight font-[family-name:var(--font-syne)]">
              Halo, {dashboardData.name}!
            </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">Selamat datang di portal kemitraan Snapp.frame Anda. Bagikan dan dapatkan penghasilan tambahan.</p>
        </div>

        {/* Info Box */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#3B2211]/5 shadow-sm">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Skema Komisi Anda</p>
            <p className="text-sm font-black text-[#3B2211]">
              Diskon {discountPct}% &bull; Fee {feePercentage}%
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* ── Tab Content Switcher ── */}
      {tabParam === "dashboard" && (
        <div className="space-y-10">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Pendapatan", val: `Rp ${stats.totalEarnings.toLocaleString("id-ID")}`, desc: "Akumulasi seluruh komisi", icon: DollarSign, color: "text-[#3B2211]", bg: "bg-gray-100" },
              { label: "Komisi Cair", val: `Rp ${stats.paidPayout.toLocaleString("id-ID")}`, desc: "Sudah ditransfer ke rekening", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Komisi Pending", val: `Rp ${stats.pendingPayout.toLocaleString("id-ID")}`, desc: "Menunggu pembayaran/verifikasi", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Total Referral", val: `${stats.count} Penggunaan`, desc: "Jumlah pemesanan selesai", icon: Users, color: "text-blue-600", bg: "bg-blue-50" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-7 bg-white rounded-3xl border border-white shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={22} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
                  <span className="text-2xl font-black text-[#3B2211] tracking-tighter">{stat.val}</span>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Referral Link Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 md:p-10 bg-gradient-to-br from-[#1E110A] to-[#120703] text-white rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              {/* Background Orbs */}
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-[#C88A58]/20 blur-[80px] pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-bold text-[#E5AB7A]">
                  <Sparkles size={12} /> Link & Kode Referral
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
                  Undang Teman & Dapatkan Komisinya!
                </h3>
                <p className="text-white/60 text-xs md:text-sm max-w-xl leading-relaxed">
                  Bagikan kode atau link referral Anda kepada calon pelanggan. Mereka akan mendapatkan potongan harga otomatis senilai <strong className="text-white font-bold">{discountPct}%</strong> ketika melakukan pemesanan, dan Anda akan langsung memperoleh komisi sebesar <strong className="text-white font-bold">{feePercentage}%</strong> dari nilai pesanan yang mereka bayar.
                </p>
              </div>

              {/* Target Campaign Selector */}
              <div className="mt-6 p-5 bg-white/5 rounded-2xl border border-white/10 space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E5AB7A]">Pilih Tipe Referral Campaign</span>
                  {selectedProductId && (
                    <button 
                      onClick={() => {
                        setSelectedProductId("");
                        setReferralType("foto");
                      }} 
                      className="text-[9px] font-bold text-rose-400 hover:underline"
                    >
                      Reset ke Link Umum
                    </button>
                  )}
                </div>

                {/* 2 Visual Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card Foto */}
                  <button
                    type="button"
                    onClick={() => {
                      setReferralType("foto");
                      setSelectedProductId(""); // default to general photo link
                    }}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-start gap-3.5 ${
                      referralType === "foto"
                        ? "bg-white/10 border-[#C88A58] ring-1 ring-[#C88A58]"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg flex-shrink-0 ${referralType === "foto" ? "bg-[#C88A58] text-[#1E110A]" : "bg-white/5 text-white/60"}`}>
                      <Camera size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">📸 Referral Foto Studio</h4>
                      <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
                        Mengarahkan pelanggan ke halaman booking foto studio Snapp.frame (Solo, Duo, Group, etc).
                      </p>
                    </div>
                  </button>

                  {/* Card Affiliate */}
                  <button
                    type="button"
                    onClick={() => {
                      setReferralType("affiliate");
                      setSelectedProductId("lp-academic-starter"); // default to first affiliate package
                    }}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 flex items-start gap-3.5 ${
                      referralType === "affiliate"
                        ? "bg-white/10 border-[#C88A58] ring-1 ring-[#C88A58]"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg flex-shrink-0 ${referralType === "affiliate" ? "bg-[#C88A58] text-[#1E110A]" : "bg-white/5 text-white/60"}`}>
                      <Handshake size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">🤝 Referral Pelatihan (Affiliate)</h4>
                      <p className="text-[10px] text-white/50 mt-1 leading-relaxed">
                        Mengarahkan calon peserta ke form pendaftaran kelas pelatihan & program kemitraan kami.
                      </p>
                    </div>
                  </button>
                </div>

                {/* Specific Dropdown */}
                <div className="flex flex-col sm:flex-row gap-3 items-end pt-1">
                  <div className="flex-1 space-y-1.5 w-full">
                    <label className="text-[9px] font-black uppercase tracking-wider text-white/40">
                      Pilih Detail Paket / Program Spesifik
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-[#C88A58] transition-colors"
                    >
                      {referralType === "foto" ? (
                        <>
                          <option value="" className="bg-[#1E110A] text-white/50">Semua Paket Foto (General booking link)</option>
                          {productsList.map((p) => (
                            <option key={p.id} value={p.sku} className="bg-[#1E110A] text-white font-normal">
                              {p.name} - Rp {p.price.toLocaleString("id-ID")}
                            </option>
                          ))}
                        </>
                      ) : (
                        <>
                          {AFFILIATE_PROGRAMS.map((prog) => (
                            <option key={prog.sku} value={prog.sku} className="bg-[#1E110A] text-white font-normal">
                              {prog.name}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                  <button
                    onClick={handleSaveTargetProduct}
                    disabled={savingProduct || (dashboardData.referralCode?.targetProductId || "") === selectedProductId}
                    className="w-full sm:w-auto px-5 py-3 bg-gold hover:bg-gold/90 text-near-black text-[10px] font-black uppercase tracking-wider rounded-xl transition-all disabled:opacity-40 flex-shrink-0"
                  >
                    {savingProduct ? "Menyimpan..." : "Simpan Target"}
                  </button>
                </div>
                <p className="text-[9px] text-white/40 leading-normal">
                  * Klik <strong>Simpan Target</strong> setelah memilih di atas. Link referral otomatis disesuaikan menuju booking form studio foto atau pendaftaran program affiliate yang tepat.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 relative z-10">
                {/* Code Card */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Kode Referral Anda</p>
                    <p className="text-lg font-black tracking-wider text-[#E5AB7A]">@{referralCode}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(referralCode)}
                    className="p-2.5 bg-white/10 hover:bg-[#C88A58] rounded-xl transition-all"
                  >
                    {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Link Card */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div className="truncate mr-2">
                    <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Link Tautan Otomatis</p>
                    <p className="text-xs font-bold text-white/80 truncate">
                      {(() => {
                        const target = dashboardData.referralCode?.targetProductId;
                        const isAffiliate = AFFILIATE_PROGRAMS.some((p) => p.sku === target);
                        const path = isAffiliate ? "daftar" : "booking";
                        return target
                          ? `${path}?ref=${referralCode}&pkg=${target}`
                          : `booking?ref=${referralCode}`;
                      })()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyLink(referralCode)}
                    className="p-2.5 bg-white/10 hover:bg-[#C88A58] rounded-xl transition-all flex-shrink-0"
                  >
                    {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Rules / Tips */}
            <div className="bg-white p-8 rounded-[2rem] border border-[#3B2211]/5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#3B2211] flex items-center gap-2">
                  <BookOpen size={16} className="text-[#C88A58]" /> Panduan Singkat
                </h4>
                <ul className="space-y-3.5 text-xs text-gray-500 font-medium">
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58] mt-1.5 flex-shrink-0" />
                    Pelanggan wajib menyelesaikan pembayaran agar komisi tercatat.
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58] mt-1.5 flex-shrink-0" />
                    Komisi dihitung dari total harga setelah diskon referral.
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88A58] mt-1.5 flex-shrink-0" />
                    Pencairan/payout diproses ke rekening Anda setiap akhir bulan.
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#3B2211]/5 flex items-center gap-4">
                <Landmark size={28} className="text-gray-300" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Rekening Payout</p>
                  <p className="text-xs font-black text-[#3B2211]">{dashboardData.bankName} - {dashboardData.bankAccount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Commission Table */}
          <div className="bg-white rounded-[2rem] border border-[#3B2211]/5 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-black text-[#3B2211]">Riwayat Penggunaan Referral & Komisi</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Daftar booking yang menggunakan kode Anda</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              {dashboardData.commissions && dashboardData.commissions.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-black text-[9px]">
                      <th className="py-4">Invoice</th>
                      <th className="py-4">Customer</th>
                      <th className="py-4">Tanggal Sesi</th>
                      <th className="py-4">Paket</th>
                      <th className="py-4">Total Bayar</th>
                      <th className="py-4 text-right">Fee Komisi (10%)</th>
                      <th className="py-4 text-right pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.commissions.map((comm: Commission) => (
                      <tr key={comm.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-mono font-bold text-gray-400">#{comm.booking.invoiceNo}</td>
                        <td className="py-4 font-bold text-[#3B2211]">{comm.booking.customerName}</td>
                        <td className="py-4 text-gray-500 font-medium">
                          {new Date(comm.booking.sessionDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="py-4 text-gray-500 font-medium">{comm.booking.packageName}</td>
                        <td className="py-4 font-bold text-[#3B2211]">Rp {comm.booking.finalPrice.toLocaleString("id-ID")}</td>
                        <td className="py-4 font-black text-emerald-600 text-right">Rp {comm.amount.toLocaleString("id-ID")}</td>
                        <td className="py-4 text-right pr-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            comm.status === "paid"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-amber-50 text-amber-600"
                          }`}>
                            {comm.status === "paid" ? (
                              <><CheckCircle2 size={10} /> Cair</>
                            ) : (
                              <><Clock size={10} /> Pending</>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#3B2211]">Belum Ada Riwayat</h5>
                    <p className="text-gray-400 text-xs mt-1">Bagikan link referral Anda untuk mendapatkan transaksi pertama!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tabParam === "feed" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-syne)" }}>Media Promosi Affiliator</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Salin bahan promosi (gambar, caption, hashtags) untuk media sosial Anda</p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const textToCopy = `${post.caption}\n\n${post.hashtags.map((h) => `#${h}`).join(" ")}\n\nGunain kode referral saya untuk diskon tambahan: @${referralCode}`;
                
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl border border-[#F0EBE5] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#3B2211]/5 transition-all duration-500"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F8F6F4]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C88A58] to-[#3B2211] flex items-center justify-center text-white font-black text-[10px]">
                        SF
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-[#3B2211]">snapp.frame</p>
                        <p className="text-[8px] text-gray-400 font-bold">Materi Promosi Resmi</p>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="aspect-square bg-[#F8F6F4] relative overflow-hidden">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt="Promo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                          <ImageIcon size={40} />
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">
                          Siap Share ke Medsos
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(textToCopy);
                            toast.success("Caption & kode referral berhasil disalin ke clipboard!");
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#3B2211] hover:bg-[#C88A58] text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                        >
                          <Copy size={11} /> Salin Caption
                        </button>
                      </div>

                      <div className="h-px bg-gray-100" />

                      <div className="space-y-1.5">
                        <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-3">
                          {post.caption}
                        </p>
                        <p className="text-[10px] text-[#C88A58] font-bold">
                          {post.hashtags.map((h) => `#${h}`).join(" ")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-[#3B2211]/5 py-24 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300">
                <ImageIcon size={32} />
              </div>
              <div>
                <h5 className="font-bold text-[#3B2211]">Belum Ada Media Promosi</h5>
                <p className="text-gray-400 text-xs mt-1">Admin belum memposting bahan promosi. Silakan periksa kembali nanti.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tabParam === "kit" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-syne)" }}>Kit Promosi Affiliate</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              Materi promosi copywriting & poster untuk dibagikan ke media sosial Anda
            </p>
          </div>

          {/* Referral Info Bar */}
          <div className="p-6 bg-gradient-to-br from-[#1E110A] to-[#120703] text-white rounded-[2rem] shadow-xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-bold text-[#E5AB7A] uppercase tracking-wider">
                <Sparkles size={11} /> Kode Referral Aktif Anda
              </span>
              <h4 className="text-xl md:text-2xl font-black text-[#E5AB7A] tracking-wider">@{referralCode}</h4>
              <p className="text-[11px] text-white/50 max-w-xl">
                Semua tautan & copywriting di bawah ini otomatis tersemat dengan kode referral Anda. Cukup salin dan sebarkan untuk mulai mendapatkan komisi!
              </p>
            </div>
            <button
              onClick={() => handleCopyCode(referralCode)}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#C88A58] hover:bg-[#C88A58]/95 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all shadow-lg shadow-[#C88A58]/20"
            >
              <Copy size={12} />
              Salin Kode Anda
            </button>
          </div>

          {/* Master-Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Master List of 12 Programs */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-[#F0EBE5] p-5 space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3">Daftar Program ({AFFILIATE_PROGRAMS.length})</p>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
                {AFFILIATE_PROGRAMS.map((prog) => {
                  const SkuIcon = skuIconMap[prog.sku] || Sparkles;
                  const isActive = activeKitSku === prog.sku;
                  return (
                    <button
                      key={prog.sku}
                      onClick={() => setActiveKitSku(prog.sku)}
                      className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all duration-300 ${
                        isActive
                          ? "bg-[#3B2211] text-white shadow-lg shadow-[#3B2211]/15"
                          : "hover:bg-gray-50 text-[#3B2211] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-white/10 text-white" : "bg-[#C88A58]/10 text-[#C88A58]"
                        }`}>
                          <SkuIcon size={16} />
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-wide truncate ${
                          isActive ? "text-white" : "text-[#3B2211]"
                        }`}>
                          {prog.name}
                        </span>
                      </div>
                      <ChevronRight size={14} className={isActive ? "text-white" : "text-gray-400 flex-shrink-0"} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Spacious Promotion Kit Details */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-[#F0EBE5] p-6 lg:p-8">
              {(() => {
                const prog = AFFILIATE_PROGRAMS.find(p => p.sku === activeKitSku);
                if (!prog) return null;

                const SkuIcon = skuIconMap[prog.sku] || Sparkles;
                const posterKey = POSTER_KEYS[prog.name];
                const rawPosters = settings[posterKey] || DEFAULT_POSTERS[prog.name] || "";
                const posterUrls = rawPosters.split(",").map((u) => u.trim()).filter(Boolean);
                const posterUrl = posterUrls[0] || "";

                return (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                      <div className="w-12 h-12 rounded-2xl bg-[#C88A58]/10 flex items-center justify-center text-[#C88A58]">
                        <SkuIcon size={24} />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-[#3B2211] uppercase tracking-wide">{prog.name}</h4>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Bahan Promosi & Tautan Afiliasi</p>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      {/* Left: Poster Image Preview */}
                      <div className="md:col-span-5 space-y-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Poster Kemitraan</span>
                        {posterUrl ? (
                          <div className="aspect-[3/4] w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden border border-[#F0EBE5] bg-gray-50 relative group shadow-sm">
                            <img
                              src={posterUrl}
                              alt={`${prog.name} Poster`}
                              className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <a
                                href={posterUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 bg-white rounded-xl text-[#3B2211] hover:bg-gold transition-colors shadow-lg flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider"
                              >
                                <ImageIcon size={14} /> Lihat Poster
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="aspect-[3/4] rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                            <ImageIcon size={28} />
                            <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Belum Ada Poster</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Caption Copywriting & Referral Links */}
                      <div className="md:col-span-7 space-y-6">
                        {/* Copywriting */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                              Materi Copywriting
                            </span>
                            <button
                              onClick={() => {
                                const text = generatePromoText(prog.name, referralCode);
                                navigator.clipboard.writeText(text);
                                toast.success(`Caption promosi ${prog.name} disalin!`);
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B2211] hover:bg-[#C88A58] text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-all"
                            >
                              <Copy size={11} /> Salin Caption
                            </button>
                          </div>
                          <textarea
                            readOnly
                            value={generatePromoText(prog.name, referralCode)}
                            className="w-full bg-gray-50/70 border border-gray-200 rounded-2xl p-4 text-[11px] text-gray-600 font-medium leading-relaxed resize-none h-[180px] focus:outline-none focus:border-[#C88A58] custom-scrollbar"
                          />
                        </div>

                        {/* Package Pricing Table */}
                        {PROGRAM_PACKAGES[prog.name] && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Daftar Paket &amp; Harga</span>
                            <div className="rounded-2xl border border-[#F0EBE5] overflow-hidden">
                              {/* Table Header */}
                              <div className="grid grid-cols-4 gap-2 px-3 py-2 bg-[#F8F5F2] border-b border-[#F0EBE5]">
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider col-span-1">Paket</span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-center">Harga</span>
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider text-center">Setelah Diskon</span>
                                <span className="text-[9px] font-black text-[#C88A58] uppercase tracking-wider text-right">Komisi Anda</span>
                              </div>
                              {/* Rows */}
                              {PROGRAM_PACKAGES[prog.name].map((pkg, i) => (
                                <div key={i} className={`grid grid-cols-4 gap-2 px-3 py-2.5 items-center ${
                                  i < PROGRAM_PACKAGES[prog.name].length - 1 ? "border-b border-[#F8F5F2]" : ""
                                }`}>
                                  <span className="text-[10px] font-bold text-[#3B2211] col-span-1 leading-tight">{pkg.name}</span>
                                  <div className="text-center">
                                    <span className="text-[10px] font-bold text-gray-400 line-through block">{pkg.price}</span>
                                    {pkg.discount !== "-" && (
                                      <span className="text-[9px] font-black text-emerald-600">-{pkg.discount}</span>
                                    )}
                                  </div>
                                  <span className="text-[10px] font-black text-[#3B2211] text-center">
                                    {pkg.afterDiscount || (pkg.discount === "-" ? pkg.price : "—")}
                                  </span>
                                  <span className="text-[10px] font-black text-[#C88A58] text-right">{pkg.commission}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Referral Links */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Tautan Khusus Anda</span>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button
                              onClick={() => {
                                const slug = Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === prog.name) || "";
                                const origin = typeof window !== "undefined" ? window.location.origin : "https://snappframe.id";
                                const linkUrl = `${origin}/booking?ref=${referralCode}&pkg=${slug}`;
                                navigator.clipboard.writeText(linkUrl);
                                toast.success("Tautan khusus Anda berhasil disalin!");
                              }}
                              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-white border border-[#E5DFD9] hover:bg-gray-50 text-[#3B2211] text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                            >
                              <Share2 size={13} /> Salin Link Referral
                            </button>
                            <a
                              href={`/booking?pkg=${Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === prog.name) || ""}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-white border border-[#E5DFD9] hover:bg-gray-50 text-[#3B2211] text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                            >
                              <ExternalLink size={13} /> Pratinjau Halaman
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {tabParam === "bank" && (
        <div className="space-y-8 max-w-2xl">
          <div>
            <h3 className="text-xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-syne)" }}>Rekening & Pembayaran Payout</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Kelola data perbankan Anda untuk pencairan komisi bulanan</p>
          </div>

          <div className="bg-white rounded-[2rem] border border-[#3B2211]/5 p-8 md:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-4 bg-[#F8F6F4] p-5 rounded-2xl border border-[#3B2211]/5">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <Landmark size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Akun Rekening Terdaftar</p>
                <h4 className="text-base font-black text-[#3B2211] mt-0.5">{dashboardData.bankName}</h4>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-bold uppercase">Nama Pemegang Rekening</span>
                <span className="text-xs font-bold text-[#3B2211]">{dashboardData.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-bold uppercase">Nomor Rekening / E-Wallet</span>
                <span className="text-xs font-mono font-bold text-[#3B2211]">{dashboardData.bankAccount}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-bold uppercase">Nomor Telepon Partner</span>
                <span className="text-xs font-bold text-[#3B2211] flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" />
                  {dashboardData.phone || "-"}
                </span>
              </div>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed font-medium">
                <strong>Ingin mengubah data rekening?</strong> Silakan hubungi admin studio melalui WhatsApp untuk melakukan perubahan data bank. Hal ini demi alasan keamanan pencairan komisi Anda.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

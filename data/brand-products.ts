// data/brand-products.ts — Produk untuk setiap brand/program pelatihan

export interface BrandProduct {
  sku: string;
  name: string;
  price: number;
  categoryName: string;
  duration?: string;
  photoCount?: string;
  features: string[];
  isPopular?: boolean;
  sortOrder: number;
}

export const brandProducts: BrandProduct[] = [
  // ── LP Academic Partner ──────────────────────────────
  {
    sku: "lp-academic-starter",
    name: "LP Academic Partner - Starter Consultation",
    price: 799000,
    categoryName: "Pelatihan Akademik",
    features: ["Konsultasi tugas akhir mahasiswa", "Pendampingan akademik", "1 sesi konsultasi"],
    sortOrder: 1,
  },
  {
    sku: "lp-academic-regular",
    name: "LP Academic Partner - Regular Partner",
    price: 2499000,
    categoryName: "Pelatihan Akademik",
    features: ["Konsultasi tugas akhir intensif", "Pendampingan akademik", "Review berkala", "Support via chat"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "lp-academic-premium",
    name: "LP Academic Partner - Premium Partner",
    price: 4999000,
    categoryName: "Pelatihan Akademik",
    features: ["Full konsultasi tugas akhir", "Pendampingan akademik intensif", "Review & revisi menyeluruh", "Support prioritas", "Bimbingan sidang"],
    sortOrder: 3,
  },
  {
    sku: "lp-academic-intensive",
    name: "LP Academic Partner - Intensive Sidang & Revisi",
    price: 1499000,
    categoryName: "Pelatihan Akademik",
    features: ["Persiapan sidang akhir", "Simulasi sidang", "Revisi cepat", "Konsultasi intensif"],
    sortOrder: 4,
  },

  // ── LP Career Ready ──────────────────────────────────
  {
    sku: "lp-career-ready",
    name: "LP Career Ready - Program Perencanaan Karier",
    price: 699000,
    categoryName: "Pelatihan Karier",
    features: ["Roadmap karier personal", "CV & LinkedIn profesional", "Persiapan interview", "Strategi magang & project nyata"],
    isPopular: true,
    sortOrder: 1,
  },

  // ── LP Entrepreneur Launchpad ────────────────────────
  {
    sku: "lp-entrepreneur-launchpad",
    name: "LP Entrepreneur Launchpad - Business Planning Bootcamp",
    price: 750000,
    categoryName: "Pelatihan Bisnis",
    features: ["Panduan memulai bisnis", "Strategi bisnis praktis", "Mentoring entrepreneur", "Networking & kolaborasi"],
    isPopular: true,
    sortOrder: 1,
  },

  // ── Bisapreneur Academy ──────────────────────────────
  {
    sku: "bisapreneur-academy",
    name: "Bisapreneur Academy - Kelas Wirausaha Pemula",
    price: 1250000,
    categoryName: "Pelatihan Bisnis",
    features: ["Praktik langsung memulai usaha", "Strategi penjualan", "Pengembangan bisnis bertahap", "Cocok untuk UMKM & pemula"],
    isPopular: true,
    sortOrder: 2,
  },

  // ── Baristara Academy ────────────────────────────────
  {
    sku: "baristara-profesional",
    name: "Baristara Academy - Program Barista Profesional",
    price: 2500000,
    categoryName: "Pelatihan Barista",
    features: ["Skill barista profesional", "Teknik brewing & latte art", "Pengenalan alat kopi", "Sertifikat pelatihan"],
    isPopular: true,
    sortOrder: 1,
  },
  {
    sku: "baristara-bisnis",
    name: "Baristara Academy - Program Barista & Bisnis Kopi",
    price: 3500000,
    categoryName: "Pelatihan Barista",
    features: ["Skill barista profesional", "Manajemen kedai kopi", "Strategi bisnis kopi", "Peluang kerja & magang"],
    sortOrder: 2,
  },

  // ── Cuan Creator Academy ─────────────────────────────
  {
    sku: "cuan-creator-academy",
    name: "Cuan Creator Academy - Digital Marketing",
    price: 3500000,
    categoryName: "Pelatihan Digital",
    features: ["Digital marketing berbasis project", "Social media strategy", "Content creation", "Portofolio & pengalaman nyata"],
    isPopular: true,
    sortOrder: 1,
  },

  // ── Tekno AI Academy ─────────────────────────────────
  {
    sku: "tekno-ai-productivity",
    name: "Tekno AI Academy - AI Business Productivity",
    price: 2700000,
    categoryName: "Pelatihan Teknologi",
    features: ["AI untuk produktivitas bisnis", "Automasi proses kerja", "Tools AI terkini", "Project based learning"],
    sortOrder: 1,
  },
  {
    sku: "tekno-ai-webdev",
    name: "Tekno AI Academy - Web Developer for Business",
    price: 3500000,
    categoryName: "Pelatihan Teknologi",
    features: ["Web development untuk bisnis", "Full-stack development", "Project portfolio", "Deployment & maintenance"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "tekno-ai-office",
    name: "Tekno AI Academy - AI for Office & Administration",
    price: 2500000,
    categoryName: "Pelatihan Teknologi",
    features: ["AI untuk administrasi kantor", "Otomatisasi dokumen", "Data processing", "Efisiensi kerja"],
    sortOrder: 3,
  },
  {
    sku: "tekno-ai-industry",
    name: "Tekno AI Academy - AI Industry & Smart Manufacturing",
    price: 2800000,
    categoryName: "Pelatihan Teknologi",
    features: ["AI untuk industri manufaktur", "Smart manufacturing", "IoT & automasi", "Quality control AI"],
    sortOrder: 4,
  },

  // ── Mental Bahasa Academy ────────────────────────────
  {
    sku: "mental-public-speaking",
    name: "Mental Bahasa Academy - Public Speaking & Confidence",
    price: 1500000,
    categoryName: "Pelatihan Pengembangan Diri",
    features: ["Public speaking profesional", "Kepercayaan diri", "Teknik presentasi", "Praktik langsung"],
    isPopular: true,
    sortOrder: 1,
  },
  {
    sku: "mental-english",
    name: "Mental Bahasa Academy - English Speaking & Confidence",
    price: 2000000,
    categoryName: "Pelatihan Pengembangan Diri",
    features: ["English speaking practice", "Conversation confidence", "Grammar & vocabulary", "Native speaker practice"],
    sortOrder: 2,
  },
  {
    sku: "mental-self-growth",
    name: "Mental Bahasa Academy - Self Growth & Mental Health",
    price: 1500000,
    categoryName: "Pelatihan Pengembangan Diri",
    features: ["Self growth coaching", "Mental health awareness", "Social confidence", "Personal development plan"],
    sortOrder: 3,
  },

  // ── Green Productive Academy ─────────────────────────
  {
    sku: "green-tech-dasar",
    name: "Green Productive Academy - Teknologi Hijau Dasar",
    price: 1500000,
    categoryName: "Pelatihan Lingkungan",
    features: ["Teknologi ramah lingkungan", "Sustainability basics", "Green product design", "Eco-friendly innovation"],
    sortOrder: 1,
  },
  {
    sku: "green-tech-inovasi",
    name: "Green Productive Academy - Inovasi Produk Berkelanjutan",
    price: 2500000,
    categoryName: "Pelatihan Lingkungan",
    features: ["Inovasi produk berkelanjutan", "Circular economy", "Green business model", "SDGs implementation"],
    isPopular: true,
    sortOrder: 2,
  },

  // ── Brand Siap ───────────────────────────────────────
  {
    sku: "brand-siap-logo",
    name: "Brand Siap - Logo & Brand Identity",
    price: 500000,
    categoryName: "Branding & Desain",
    features: ["Desain logo profesional", "Brand identity guidelines", "Color palette & typography", "3 revisi"],
    sortOrder: 1,
  },
  {
    sku: "brand-siap-packaging",
    name: "Brand Siap - Kemasan & Packaging Design",
    price: 750000,
    categoryName: "Branding & Desain",
    features: ["Desain kemasan produk", "Packaging concept", "3D mockup", "Print-ready file"],
    sortOrder: 2,
  },
  {
    sku: "brand-siap-lengkap",
    name: "Brand Siap - Paket Branding Lengkap",
    price: 1500000,
    categoryName: "Branding & Desain",
    features: ["Logo & brand identity", "Kemasan produk", "Social media kit", "Brand guidelines lengkap"],
    isPopular: true,
    sortOrder: 3,
  },

  // ── Standara Consulting ──────────────────────────────
  {
    sku: "standara-basic",
    name: "Standara Consulting - Basic Business Improvement",
    price: 5000000,
    categoryName: "Konsultasi Bisnis",
    features: ["Konsultasi bisnis dasar", "Penyusunan SOP sederhana", "Evaluasi tata kelola", "Pelatihan manajemen bisnis"],
    sortOrder: 1,
  },
  {
    sku: "standara-growth",
    name: "Standara Consulting - Standard Growth Business",
    price: 10000000,
    categoryName: "Konsultasi Bisnis",
    features: ["Penyusunan SOP & sistem kerja", "Pelatihan SDM & produktivitas", "KPI & monitoring", "Business coaching"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "standara-professional",
    name: "Standara Consulting - Professional Management System",
    price: 20000000,
    categoryName: "Konsultasi Bisnis",
    features: ["Sistem manajemen mutu", "SOP lengkap", "Audit internal", "Leadership training", "Sertifikasi & akreditasi"],
    sortOrder: 3,
  },
];

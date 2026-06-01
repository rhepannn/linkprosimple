/**
 * scratch/force-seed-brand.js
 * Seed semua produk pelatihan Link Productive ke database.
 * Bersihkan produk lama, lalu upsert semua dari daftar di bawah.
 *
 * Cara pakai:
 *   node scratch/force-seed-brand.js
 *
 * Pastikan sudah install: npm install pg @prisma/adapter-pg dotenv
 */

require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../prisma/generated/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── DATA PRODUK (sesuai linkproductive.com) ─────────────────────────────────
// price       = harga bayar customer (setelah diskon)
// discount    = harga normal / harga coret
// programGroup = nama program induk untuk grouping di daftar-pelatihan
const brandProducts = [

  // ── LP Academic Partner ──────────────────────────────────────────────────
  {
    sku: "lp-academic-starter",
    name: "LP Academic Partner - Starter Consultation",
    price: 799000,
    discount: null,
    categoryName: "Pelatihan Akademik",
    programGroup: "LP Academic Partner",
    duration: "Starter",
    photoCount: "Sertifikat Digital",
    description: "1 sesi konsultasi intensif bersama mentor ahli untuk tugas akhir.",
    features: ["1 sesi konsultasi tugas akhir", "Pendampingan akademik terarah", "Review awal draf & topik penelitian", "Support via chat"],
    isPopular: false,
    sortOrder: 1,
  },
  {
    sku: "lp-academic-regular",
    name: "LP Academic Partner - Regular Academic Partner",
    price: 2499000,
    discount: null,
    categoryName: "Pelatihan Akademik",
    programGroup: "LP Academic Partner",
    duration: "Regular",
    photoCount: "Sertifikat Digital",
    description: "Pendampingan akademik berkelanjutan hingga sidang akhir.",
    features: ["Konsultasi tugas akhir intensif berkala", "Pendampingan dan review rutin", "Feedback komprehensif draf tulisan", "Support via chat prioritas", "Latihan tanya-jawab pra-sidang"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "lp-academic-premium",
    name: "LP Academic Partner - Premium Academic Partner",
    price: 4999000,
    discount: null,
    categoryName: "Pelatihan Akademik",
    programGroup: "LP Academic Partner",
    duration: "Premium",
    photoCount: "Sertifikat + Rekam Sesi",
    description: "Pendampingan penuh mulai riset hingga lulus sidang.",
    features: ["Full konsultasi & pendampingan tugas akhir", "Review & revisi menyeluruh semua bab", "Bimbingan persiapan & simulasi sidang", "Support prioritas 7 hari seminggu", "Akses mentor berpengalaman industri"],
    isPopular: false,
    sortOrder: 3,
  },
  {
    sku: "lp-academic-intensive",
    name: "LP Academic Partner - Intensive Sidang & Revisi",
    price: 1499000,
    discount: null,
    categoryName: "Pelatihan Akademik",
    programGroup: "LP Academic Partner",
    duration: "Intensive",
    photoCount: "Sertifikat Digital",
    description: "Fokus persiapan sidang dan revisi cepat dalam waktu singkat.",
    features: ["Simulasi sidang akhir interaktif", "Revisi cepat terstruktur", "Coaching pertanyaan sidang", "Pendampingan intensif pra-sidang"],
    isPopular: false,
    sortOrder: 4,
  },

  // ── LP Career Ready ──────────────────────────────────────────────────────
  {
    sku: "lp-career-ready-reguler",
    name: "LP Career Ready - Paket Reguler (H-1 Minggu)",
    price: 699000,
    discount: null,
    categoryName: "Pelatihan Karier",
    programGroup: "LP Career Ready",
    duration: "Reguler",
    photoCount: "Sertifikat + Modul Digital",
    description: "Pembelian sepekan sebelum acara — harga penuh.",
    features: ["Roadmap karier personal terstruktur", "Review CV & LinkedIn berstandar industri", "Simulasi wawancara kerja (Mock Interview)", "Strategi magang & project nyata", "Jaringan alumni profesional"],
    isPopular: false,
    sortOrder: 1,
  },
  {
    sku: "lp-career-ready-promo7",
    name: "LP Career Ready - Promo H-7 s/d H-20",
    price: 299000,
    discount: 699000,
    categoryName: "Pelatihan Karier",
    programGroup: "LP Career Ready",
    duration: "Early Bird",
    photoCount: "Sertifikat + Modul Digital",
    description: "Daftar 7–20 hari sebelum acara, hemat Rp400.000.",
    features: ["Roadmap karier personal terstruktur", "Review CV & LinkedIn berstandar industri", "Simulasi wawancara kerja (Mock Interview)", "Strategi magang & project nyata", "Jaringan alumni profesional"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "lp-career-ready-promo21",
    name: "LP Career Ready - Promo H-21 dan Seterusnya",
    price: 199000,
    discount: 699000,
    categoryName: "Pelatihan Karier",
    programGroup: "LP Career Ready",
    duration: "Super Early Bird",
    photoCount: "Sertifikat + Modul Digital",
    description: "Daftar lebih dari 21 hari sebelum acara, hemat Rp500.000.",
    features: ["Roadmap karier personal terstruktur", "Review CV & LinkedIn berstandar industri", "Simulasi wawancara kerja (Mock Interview)", "Strategi magang & project nyata", "Jaringan alumni profesional"],
    isPopular: false,
    sortOrder: 3,
  },

  // ── LP Entrepreneur Launchpad ────────────────────────────────────────────
  {
    sku: "lp-entrepreneur-reguler",
    name: "LP Entrepreneur Launchpad - Paket Reguler (1 Minggu Sebelum)",
    price: 750000,
    discount: null,
    categoryName: "Pelatihan Bisnis",
    programGroup: "LP Entrepreneur Launchpad",
    duration: "Reguler",
    photoCount: "Sertifikat + Materi Digital",
    description: "Pembelian sepekan sebelum bootcamp — harga penuh.",
    features: ["Panduan memulai bisnis dari nol", "Validasi ide & Lean Canvas bisnis", "Mentoring wirausahawan berpengalaman", "Simulasi pitch deck sederhana", "Ekosistem kolaborasi founder muda"],
    isPopular: false,
    sortOrder: 1,
  },
  {
    sku: "lp-entrepreneur-promo7",
    name: "LP Entrepreneur Launchpad - Promo H-7 s/d H-20",
    price: 350000,
    discount: 750000,
    categoryName: "Pelatihan Bisnis",
    programGroup: "LP Entrepreneur Launchpad",
    duration: "Early Bird",
    photoCount: "Sertifikat + Materi Digital",
    description: "Daftar 7–20 hari sebelum acara, hemat Rp400.000.",
    features: ["Panduan memulai bisnis dari nol", "Validasi ide & Lean Canvas bisnis", "Mentoring wirausahawan berpengalaman", "Simulasi pitch deck sederhana", "Ekosistem kolaborasi founder muda"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "lp-entrepreneur-promo21",
    name: "LP Entrepreneur Launchpad - Promo H-21 dan Seterusnya",
    price: 250000,
    discount: 750000,
    categoryName: "Pelatihan Bisnis",
    programGroup: "LP Entrepreneur Launchpad",
    duration: "Super Early Bird",
    photoCount: "Sertifikat + Materi Digital",
    description: "Daftar lebih dari 21 hari sebelum acara, hemat Rp500.000.",
    features: ["Panduan memulai bisnis dari nol", "Validasi ide & Lean Canvas bisnis", "Mentoring wirausahawan berpengalaman", "Simulasi pitch deck sederhana", "Ekosistem kolaborasi founder muda"],
    isPopular: false,
    sortOrder: 3,
  },

  // ── Bisapreneur Academy ──────────────────────────────────────────────────
  {
    sku: "bisapreneur-wirausaha-pemula",
    name: "Bisapreneur Academy - Kelas Wirausaha Pemula",
    price: 1000000,
    discount: 1250000,
    categoryName: "Pelatihan Bisnis",
    programGroup: "Bisapreneur Academy",
    duration: "Reguler",
    photoCount: "Sertifikat Resmi + Modul",
    description: "Kelas bisnis praktis untuk UMKM, koperasi, dan calon pengusaha.",
    features: ["Praktik langsung memulai usaha", "Penyusunan SOP sederhana & operasional", "Strategi penjualan & pemasaran digital", "Konsultasi perizinan legalitas usaha", "Studi kasus peningkatan omzet nyata"],
    isPopular: true,
    sortOrder: 1,
  },

  // ── Baristara Academy ────────────────────────────────────────────────────
  {
    sku: "baristara-profesional",
    name: "Baristara Academy - Program Barista Profesional",
    price: 1700000,
    discount: 2500000,
    categoryName: "Pelatihan Barista",
    programGroup: "Baristara Academy",
    duration: "Profesional",
    photoCount: "Sertifikat + Materi Kopi",
    description: "Kuasai skill barista profesional dari manual brewing hingga latte art.",
    features: ["Teknik manual brewing & espresso", "Latte art estetis berstandar kafe", "Pengenalan mesin kopi komersial", "Materi bahan praktik tersedia", "Sertifikat pelatihan resmi"],
    isPopular: true,
    sortOrder: 1,
  },
  {
    sku: "baristara-bisnis",
    name: "Baristara Academy - Program Barista & Bisnis Kopi",
    price: 2300000,
    discount: 3500000,
    categoryName: "Pelatihan Barista",
    programGroup: "Baristara Academy",
    duration: "Bisnis",
    photoCount: "Sertifikat + Magang Mitra",
    description: "Skill barista plus manajemen bisnis coffee shop lengkap.",
    features: ["Semua materi Barista Profesional", "Manajemen keuangan & HPP kedai kopi", "Strategi bisnis & menu signature", "Peluang magang di kedai mitra", "Sertifikat pelatihan resmi"],
    isPopular: false,
    sortOrder: 2,
  },

  // ── Cuan Creator Academy ─────────────────────────────────────────────────
  {
    sku: "cuan-creator-academy",
    name: "Cuan Creator Academy - Digital Marketing Intensif",
    price: 2300000,
    discount: 3500000,
    categoryName: "Pelatihan Digital Marketing",
    programGroup: "Cuan Creator Academy",
    duration: "Intensif",
    photoCount: "Sertifikat + Portofolio Digital",
    description: "Kuasai SEO, Meta/TikTok Ads, dan strategi konten dari praktisi agensi.",
    features: ["SEO & optimasi konten digital", "Meta Ads & TikTok Ads praktis", "Copywriting konversi tinggi", "Analisis kampanye & reporting", "Portofolio project nyata siap kerja"],
    isPopular: true,
    sortOrder: 1,
  },

  // ── Tekno AI Academy ─────────────────────────────────────────────────────
  {
    sku: "tekno-ai-productivity",
    name: "Tekno AI Academy - AI Business Productivity Class",
    price: 1700000,
    discount: 2700000,
    categoryName: "Pelatihan Teknologi AI",
    programGroup: "Tekno AI Academy",
    duration: "AI Productivity",
    photoCount: "Sertifikat Digital",
    description: "Belajar AI untuk produktivitas kerja dan bisnis dari nol.",
    features: ["AI untuk administrasi & produktivitas kerja", "Tools AI modern (ChatGPT, Copilot, dll)", "Otomasi workflow kerja berbasis AI", "Praktik langsung proyek nyata", "Cocok untuk non-IT background"],
    isPopular: true,
    sortOrder: 1,
  },
  {
    sku: "tekno-ai-webdev",
    name: "Tekno AI Academy - Web Developer for Business",
    price: 2300000,
    discount: 3500000,
    categoryName: "Pelatihan Teknologi AI",
    programGroup: "Tekno AI Academy",
    duration: "Web Developer",
    photoCount: "Sertifikat + Portfolio",
    description: "Buat website bisnis dan landing page profesional dari nol.",
    features: ["HTML, CSS, JavaScript dasar", "Landing page & UI/UX bisnis", "Integrasi AI ke website", "Portfolio freelance siap jual", "Cocok untuk bisnis digital & freelance"],
    isPopular: false,
    sortOrder: 2,
  },
  {
    sku: "tekno-ai-office",
    name: "Tekno AI Academy - AI for Office & Administration",
    price: 1700000,
    discount: 2500000,
    categoryName: "Pelatihan Teknologi AI",
    programGroup: "Tekno AI Academy",
    duration: "AI for Office",
    photoCount: "Sertifikat Digital",
    description: "AI untuk staf HR, finance, purchasing, dan administrasi kantor.",
    features: ["AI untuk HR & administrasi kantor", "AI untuk finance & purchasing", "Workflow kerja modern berbasis AI", "Automatisasi dokumen & laporan", "Smart dashboard operasional"],
    isPopular: false,
    sortOrder: 3,
  },
  {
    sku: "tekno-ai-industry",
    name: "Tekno AI Academy - AI Industry & Smart Manufacturing",
    price: 1900000,
    discount: 2800000,
    categoryName: "Pelatihan Teknologi AI",
    programGroup: "Tekno AI Academy",
    duration: "AI Industry",
    photoCount: "Sertifikat Digital",
    description: "AI untuk industri manufaktur, produksi, QC, dan supply chain.",
    features: ["AI untuk produksi & quality control", "AI supply chain & efisiensi operasional", "Smart dashboard industri", "Implementasi AI di lingkungan pabrik", "Studi kasus industri manufaktur nyata"],
    isPopular: false,
    sortOrder: 4,
  },

  // ── Mental Bahasa Academy ────────────────────────────────────────────────
  {
    sku: "mental-public-speaking",
    name: "Mental Bahasa Academy - Public Speaking & Confidence",
    price: 800000,
    discount: 1500000,
    categoryName: "Pelatihan Pengembangan Diri",
    programGroup: "Mental Bahasa Academy",
    duration: "Public Speaking",
    photoCount: "Sertifikat + Modul",
    description: "Tingkatkan kepercayaan diri dan kemampuan bicara di depan umum.",
    features: ["Teknik public speaking profesional", "Latihan kepercayaan diri intensif", "Presentasi & storytelling efektif", "Ruang belajar aman (safe space)", "Praktik langsung & feedback mentor"],
    isPopular: true,
    sortOrder: 1,
  },
  {
    sku: "mental-english",
    name: "Mental Bahasa Academy - English Speaking & Confidence",
    price: 1000000,
    discount: 2000000,
    categoryName: "Pelatihan Pengembangan Diri",
    programGroup: "Mental Bahasa Academy",
    duration: "English Speaking",
    photoCount: "Sertifikat + Modul",
    description: "Percakapan Bahasa Inggris aktif dengan pendampingan penutur ahli.",
    features: ["English speaking practice aktif", "Grammar & vocabulary kontekstual", "Conversation confidence building", "Pendampingan mentor komunikasi", "Project luar ruangan interaktif"],
    isPopular: false,
    sortOrder: 2,
  },
  {
    sku: "mental-self-growth",
    name: "Mental Bahasa Academy - Self Growth & Mental Health",
    price: 800000,
    discount: 1500000,
    categoryName: "Pelatihan Pengembangan Diri",
    programGroup: "Mental Bahasa Academy",
    duration: "Self Growth",
    photoCount: "Sertifikat + Modul",
    description: "Coaching personal dan kesehatan mental bersama psikolog.",
    features: ["Self growth & personal development", "Mental health awareness coaching", "Social confidence & interpersonal skill", "Pendampingan psikolog & praktisi", "Safe space & komunitas suportif"],
    isPopular: false,
    sortOrder: 3,
  },

  // ── Green Productive Academy ─────────────────────────────────────────────
  {
    sku: "green-tech-dasar",
    name: "Green Productive Academy - Teknologi Hijau Dasar",
    price: 1000000,
    discount: 1500000,
    categoryName: "Pelatihan Lingkungan",
    programGroup: "Green Productive Academy",
    duration: "Dasar",
    photoCount: "Sertifikat Digital",
    description: "Pengenalan teknologi berkelanjutan dan produk ramah lingkungan.",
    features: ["Teknologi ramah lingkungan dasar", "Sustainability & circular economy", "Green product design praktis", "Eco-friendly innovation", "SDGs awareness & implementasi"],
    isPopular: false,
    sortOrder: 1,
  },
  {
    sku: "green-tech-inovasi",
    name: "Green Productive Academy - Inovasi Produk Berkelanjutan",
    price: 1700000,
    discount: 2500000,
    categoryName: "Pelatihan Lingkungan",
    programGroup: "Green Productive Academy",
    duration: "Inovasi",
    photoCount: "Sertifikat + Project Portfolio",
    description: "Rancang produk inovatif berbasis green economy untuk pasar.",
    features: ["Inovasi produk berkelanjutan", "Model bisnis hijau (green business model)", "Circular economy implementasi", "Akses jaringan mitra lingkungan", "Portfolio proyek inovasi nyata"],
    isPopular: true,
    sortOrder: 2,
  },

  // ── Brand Siap ───────────────────────────────────────────────────────────
  {
    sku: "brand-siap-logo",
    name: "Brand Siap - Logo & Brand Identity",
    price: 500000,
    discount: null,
    categoryName: "Branding & Desain",
    programGroup: "Brand Siap",
    duration: "Logo",
    photoCount: "File Desain (AI/PNG/PDF)",
    description: "Desain logo profesional dan panduan identitas brand.",
    features: ["Desain logo profesional", "Brand identity guidelines", "Color palette & typography", "3 kali revisi", "File siap cetak & digital"],
    isPopular: false,
    sortOrder: 1,
  },
  {
    sku: "brand-siap-packaging",
    name: "Brand Siap - Kemasan & Packaging Design",
    price: 750000,
    discount: null,
    categoryName: "Branding & Desain",
    programGroup: "Brand Siap",
    duration: "Packaging",
    photoCount: "File Desain + 3D Mockup",
    description: "Desain kemasan produk menarik siap cetak.",
    features: ["Desain kemasan produk kreatif", "Packaging concept & layout", "3D mockup presentasi", "File print-ready", "3 kali revisi"],
    isPopular: false,
    sortOrder: 2,
  },
  {
    sku: "brand-siap-lengkap",
    name: "Brand Siap - Paket Branding Lengkap",
    price: 1500000,
    discount: null,
    categoryName: "Branding & Desain",
    programGroup: "Brand Siap",
    duration: "Lengkap",
    photoCount: "File Lengkap + Social Media Kit",
    description: "Semua kebutuhan branding dalam satu paket terintegrasi.",
    features: ["Logo & brand identity", "Kemasan produk", "Social media kit (template konten)", "Brand guidelines lengkap", "Semua file siap pakai"],
    isPopular: true,
    sortOrder: 3,
  },

  // ── Standara Consulting ──────────────────────────────────────────────────
  {
    sku: "standara-basic",
    name: "Standara Consulting - Basic Business Improvement",
    price: 5000000,
    discount: null,
    categoryName: "Konsultasi Bisnis",
    programGroup: "Standara Consulting",
    duration: "Basic",
    photoCount: "Laporan + Sertifikat",
    description: "Konsultasi dan evaluasi tata kelola bisnis dasar.",
    features: ["Konsultasi bisnis dasar", "Penyusunan SOP sederhana", "Evaluasi tata kelola organisasi", "Pelatihan manajemen bisnis"],
    isPopular: false,
    sortOrder: 1,
  },
  {
    sku: "standara-growth",
    name: "Standara Consulting - Standard Growth Business",
    price: 10000000,
    discount: null,
    categoryName: "Konsultasi Bisnis",
    programGroup: "Standara Consulting",
    duration: "Growth",
    photoCount: "Laporan Lengkap + Sertifikasi",
    description: "Sistem kerja, KPI, dan coaching bisnis untuk pertumbuhan stabil.",
    features: ["Penyusunan SOP & sistem kerja", "Pelatihan SDM & produktivitas", "KPI setting & monitoring", "Business coaching berkelanjutan"],
    isPopular: true,
    sortOrder: 2,
  },
  {
    sku: "standara-professional",
    name: "Standara Consulting - Professional Management System",
    price: 20000000,
    discount: null,
    categoryName: "Konsultasi Bisnis",
    programGroup: "Standara Consulting",
    duration: "Professional",
    photoCount: "Sertifikasi + Audit Internal",
    description: "Implementasi sistem manajemen mutu dan kepemimpinan level profesional.",
    features: ["Sistem manajemen mutu terintegrasi", "SOP lengkap semua divisi", "Audit internal & compliance", "Leadership training eksekutif", "Pendampingan sertifikasi & akreditasi"],
    isPopular: false,
    sortOrder: 3,
  },
];

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Memulai force-seed brand products...\n");

  // 1. Hapus semua produk yang SKU-nya tidak ada dalam daftar (produk lama/STUDIO-xxx)
  const validSkus = brandProducts.map(p => p.sku);
  const deleted = await prisma.product.deleteMany({
    where: { sku: { notIn: validSkus } }
  });
  console.log(`🗑  Dihapus ${deleted.count} produk non-pelatihan.\n`);

  // 2. Upsert semua produk brand
  let created = 0;
  let updated = 0;

  for (const p of brandProducts) {
    // Cari/buat kategori
    let category = await prisma.category.findFirst({ where: { name: p.categoryName } });
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: p.categoryName,
          slug: p.categoryName.toLowerCase().replace(/\s+/g, '-')
        }
      });
    }

    const existing = await prisma.product.findUnique({ where: { sku: p.sku } });

    if (existing) {
      await prisma.product.update({
        where: { sku: p.sku },
        data: {
          name: p.name,
          price: p.price,
          discount: p.discount ?? null,
          categoryId: category.id,
          duration: p.duration || null,
          photoCount: p.photoCount || null,
          features: p.features,
          description: p.description || null,
          programGroup: p.programGroup || null,
          isPopular: p.isPopular || false,
          sortOrder: p.sortOrder,
          isActive: true,
        }
      });
      updated++;
      console.log(`  ✏️  Updated: ${p.name}`);
    } else {
      await prisma.product.create({
        data: {
          sku: p.sku,
          name: p.name,
          price: p.price,
          discount: p.discount ?? null,
          stock: 999,
          categoryId: category.id,
          duration: p.duration || null,
          photoCount: p.photoCount || null,
          features: p.features,
          description: p.description || null,
          programGroup: p.programGroup || null,
          isPopular: p.isPopular || false,
          sortOrder: p.sortOrder,
          isActive: true,
        }
      });
      created++;
      console.log(`  ✅  Created: ${p.name}`);
    }
  }

  console.log(`\n🎉 Selesai! Ditambahkan: ${created}, Diperbarui: ${updated}`);
}

main()
  .catch(e => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
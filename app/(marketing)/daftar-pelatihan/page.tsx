"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Coffee, Camera, Presentation, Recycle, MonitorPlay,
  GraduationCap, Users, Building, ShoppingBag, Handshake,
  TrendingUp, Award, CheckCircle2, ChevronRight, ChevronLeft,
  ChevronDown, ArrowRight, X, Search, ArrowLeft, MessageCircle,
  Sparkles, CreditCard, Copy, Check, Eye
} from "lucide-react";
import { getProducts } from "@/app/actions/products";
import { createAffiliateLead } from "@/app/actions/affiliate-leads";
import { getSiteSettings } from "@/app/actions/settings";
import { brandProducts } from "@/data/brand-products";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

// --- CUSTOM SPINNER COMPONENT ---
function Spinner({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface ProductInfo {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  desc?: string;
  features: string[];
}

// --- TRAINING DETAIL DATA (EXACT COPY OF AFFILIATE BUT WITHOUT COMMISSION/AFFILIATE WORDING) ---
const trainingDetails: Record<string, { subtitle: string; intro: string; packages: { name: string; price: string; discount: string; afterDiscount?: string; suitableFor?: string; services?: string[]; goal?: string }[]; whyInteresting: string[]; targetMarket: string[]; disclaimer: string; consultWa?: string }> = {
  "LP Academic Partner": {
    subtitle: "Pendamping Konsultan Tugas Akhir Mahasiswa",
    intro: "Bangun peluang penyelesaian Tugas Akhir lebih terarah, privat, & profesional bersama praktisi ahli ??\n\nMelalui Program Pelatihan Academic Partner, kamu akan mendapatkan:\n? Bimbingan Intensif satu-satu bersama Mentor Ahli\n? Kurikulum terstruktur sesuai topik penelitian\n? Pendampingan persiapan sidang akhir & latihan tanya-jawab\n? Review & masukan komprehensif untuk draf tulisan",
    packages: [
      { name: "?? Paket Starter Consultation", price: "Rp 799.000", discount: "Rp 250.000" },
      { name: "?? Paket Regular Academic Partner", price: "Rp 2.499.000", discount: "Rp 600.000" },
      { name: "?? Paket Premium Academic Partner", price: "Rp 4.999.000", discount: "Rp 1.300.000" },
      { name: "?? Paket Intensive Sidang & Revisi", price: "Rp 1.499.000", discount: "Rp 400.000" },
    ],
    whyInteresting: [
      "Modul bimbingan yang sangat spesifik dan praktis",
      "Membantu mahasiswa lebih siap menghadapi sidang & karier",
      "Pendampingan berbasis studi kasus nyata",
      "Didukung AI & ekosistem mitra industri",
      "Fleksibilitas jadwal konsultasi",
    ],
    targetMarket: ["?? Mahasiswa tingkat akhir", "?? Akademisi muda", "????? Peneliti pemula"],
    disclaimer: "Program promo, diskon, bonus, maupun skema penawaran dalam Program Pelatihan Link Productive dapat berubah sewaktu-waktu pada setiap periode pendaftaran yang berlaku.",
  },
  "LP Career Ready": {
    subtitle: "Program Perencanaan Karier Mahasiswa Menuju Dunia Kerja",
    intro: "LP Career Ready membantu mempersiapkan masa depan karier profesional Anda agar memiliki daya saing tinggi di bursa kerja Swasta & BUMN.\n\nProgram ini dirancang khusus untuk:\n? Mahasiswa & Fresh Graduate yang bingung membuat CV\n? Ingin mengoptimalkan profil LinkedIn untuk headhunter\n? Membutuhkan simulasi interview (Mock Interview) interaktif\n? Memperluas relasi dengan jejaring profesional industri",
    packages: [
      { name: "?? Pembelian H-1 Minggu Sebelum Acara", price: "Rp 699.000", discount: "-", afterDiscount: "Rp 699.000" },
      { name: "?? Promo H-7 s/d H-20", price: "Rp 699.000", discount: "Rp 400.000", afterDiscount: "Rp 299.000" },
      { name: "?? Promo H-21 dan Seterusnya", price: "Rp 699.000", discount: "Rp 500.000", afterDiscount: "Rp 199.000" },
    ],
    whyInteresting: [
      "Roadmap karier personal yang terstruktur",
      "Modul CV & LinkedIn review berstandar internasional",
      "Simulasi wawancara kerja interaktif dengan praktisi HRD",
      "Alumni berkarier di BCA, BI, Paragon Corp, Krakatau Steel, dll",
    ],
    targetMarket: ["?? Mahasiswa semester awal hingga akhir", "?? Fresh graduate", "?? Pencari kerja (Job seekers)"],
    disclaimer: "Jadwal kelas interaktif dan bimbingan karir diatur setelah konfirmasi administrasi pendaftaran selesai.",
  },
  "LP Entrepreneur Launchpad": {
    subtitle: "Program Perencanaan Bisnis untuk Siswa SMA/SMK & Mahasiswa",
    intro: "Wujudkan ide bisnis impian Anda menjadi model bisnis yang valid, terukur, dan siap diluncurkan ke pasar ??\n\nLP Business Planning Bootcamp hadir sebagai solusi praktis bagi Anda yang:\n? Bingung cara memulai langkah bisnis awal\n? Takut mengalami kegagalan modal usaha\n? Memiliki ide kreatif tapi belum tahu eksekusinya\n? Ingin belajar menyusun Pitch Deck bisnis sederhana",
    packages: [
      { name: "? Pembelian 1 Minggu Sebelum Acara", price: "Rp 750.000", discount: "-" },
      { name: "? Pembelian H-7 s/d H-20", price: "Rp 750.000", discount: "Rp 400.000", afterDiscount: "Rp 350.000" },
      { name: "? Pembelian H-21 dan Seterusnya", price: "Rp 750.000", discount: "Rp 500.000", afterDiscount: "Rp 250.000" },
    ],
    whyInteresting: [
      "Metodologi validasi ide bisnis praktis minim risiko",
      "Penyusunan model kanvas bisnis komprehensif (Lean Canvas)",
      "Akses mentoring dari wirausahawan berpengalaman",
      "Ekosistem kolaborasi sesama founder muda",
    ],
    targetMarket: ["?? Siswa SMA/SMK", "?? Mahasiswa", "?? Rintisan wirausaha muda"],
    disclaimer: "Kuota peserta bootcamp per batch dibatasi demi efektivitas interaksi pendampingan kelompok.",
  },
  "Bisapreneur Academy": {
    subtitle: "Kelas Wirausaha Pemula � Mulai Usaha Dari Nol",
    intro: "Tingkatkan tata kelola operasional, legalitas, serta pemasaran digital bisnis Anda bersama Bisapreneur Academy ??\n\nProgram pembelajaran bisnis berbasis praktik nyata yang dirancang khusus untuk pelaku usaha pemula, UMKM, koperasi, dan calon entrepreneur agar lebih terarah dalam mengelola keuangan, meningkatkan penjualan, dan mengembangkan usahanya secara berkelanjutan.",
    packages: [
      { name: "?? Kelas Wirausaha Pemula", price: "Rp 1.250.000", discount: "Rp 250.000", afterDiscount: "Rp 1.000.000" },
    ],
    whyInteresting: [
      "Kurikulum aplikatif yang mudah dipraktikkan langsung",
      "Materi penyusunan Standard Operating Procedure (SOP) praktis",
      "Konsultasi perizinan legalitas usaha & izin edar produk",
      "Studi kasus nyata peningkatan produktivitas tim & omzet usaha",
    ],
    targetMarket: ["?? Pelaku UMKM", "?? Calon wirausaha mandiri", "?? Pengelola bisnis lokal / koperasi"],
    disclaimer: "Pendaftaran kelas wirausaha pemula dilakukan secara berkala sesuai jadwal batch akademik terbaru.",
  },
  "Baristara Academy": {
    subtitle: "Sekolah Barista & Bisnis Kopi by Link Productive",
    intro: "Pelajari seni meracik kopi berkualitas dan kuasai strategi operasional bisnis coffee shop profesional ?\n\nProgram pelatihan terlengkap yang mencakup teknik manual brewing, pengoperasian mesin espresso komersial, pembuatan latte art estetis, hingga manajemen keuangan dan HPP kedai kopi secara menyeluruh.",
    packages: [
      { name: "? Program Barista Profesional", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000" },
      { name: "? Program Barista & Bisnis Kopi", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000" },
    ],
    whyInteresting: [
      "Praktik langsung menggunakan peralatan bar berstandar kafe",
      "Penyusunan menu signature kreatif berdaya jual tinggi",
      "Modul hitungan investasi awal & operasional coffee shop",
      "Peluang magang bersertifikat di kedai kopi jaringan mitra kami",
    ],
    targetMarket: ["? Barista enthusiast", "?? Calon pengusaha kedai kopi", "?? Mahasiswa & alumni yang ingin memiliki skill tambahan"],
    disclaimer: "Seluruh bahan praktik pembuatan kopi, modul belajar, dan sertifikat resmi kelulusan telah tercakup di dalam biaya pendaftaran.",
  },
  "Cuan Creator Academy": {
    subtitle: "Sekolah Digital Marketing � Belajar dari Nol Hingga Bisa Menghasilkan",
    intro: "Kuasai keahlian pemasaran digital berbasis project nyata bersama Cuan Creator Academy ??\n\nProgram pelatihan digital marketing intensif yang membantu peserta menguasai keterampilan Search Engine Optimization (SEO), periklanan media sosial (Meta/TikTok Ads), optimasi konten, copy writing, hingga analisis kampanye promosi digital secara profesional.",
    packages: [
      { name: "?? Cuan Creator Academy", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000" },
    ],
    whyInteresting: [
      "Pembelajaran berbasis portofolio dan proyek nyata",
      "Modul lengkap dari dasar hingga taktik periklanan lanjutan",
      "Bimbingan langsung dari praktisi agensi digital terkemuka",
      "Membantu membangun portofolio karier digital mumpuni",
    ],
    targetMarket: ["????? Mahasiswa & fresh graduate", "?? Content creator pemula", "?? Pemilik bisnis online / freelancer"],
    disclaimer: "Jadwal pendaftaran batch baru dibuka setiap bulan dengan kuota kelas terbatas demi menjaga kualitas belajar.",
  },
  "Tekno AI Academy": {
    subtitle: "Sekolah Coding & AI Business � Skill Digital untuk Dunia Kerja & Bisnis",
    intro: "Mulai pelajari teknologi pemrograman web terkini dan pemanfaatan kecerdasan buatan (AI) untuk meningkatkan produktivitas operasional kerja & bisnis ??\n\nTekno AI Academy menyajikan kurikulum praktis yang menggabungkan kemampuan rekayasa perangkat lunak dengan implementasi sistem cerdas berbasis AI untuk kebutuhan administrasi, manufaktur, dan bisnis digital.",
    packages: [
      { name: "?? AI Business Productivity Class", price: "Rp 2.700.000", discount: "Rp 1.000.000", afterDiscount: "Rp 1.700.000" },
      { name: "?? Web Developer for Business", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000" },
      { name: "?? AI for Office & Administration", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000" },
      { name: "?? AI Industry & Smart Manufacturing", price: "Rp 2.800.000", discount: "Rp 900.000", afterDiscount: "Rp 1.900.000" },
    ],
    whyInteresting: [
      "Kurikulum modern yang selalu mengikuti tren perkembangan teknologi AI",
      "Pembelajaran berbasis proyek siap pakai untuk kebutuhan industri",
      "Sangat cocok untuk staf kantor, administrator, maupun pemilik UMKM",
      "Materi disajikan secara sederhana tanpa latar belakang IT yang rumit",
    ],
    targetMarket: ["?? Mahasiswa & fresh graduate IT/Non-IT", "?? Staf administrasi & operasional kantor", "?? Pemilik usaha & profesional industri"],
    disclaimer: "Biaya pendaftaran dapat disesuaikan dengan skema paket promo khusus korporat atau kelompok akademik.",
  },
  "Mental Bahasa Academy": {
    subtitle: "Sekolah Bahasa & Mental Health � Bangun Kepercayaan Diri",
    intro: "Gabungkan peningkatan keahlian komunikasi bahasa asing premium dengan penguatan kesehatan mental serta kepercayaan diri interaktif ??\n\nProgram pengembangan diri revolusioner yang memadukan latihan percakapan bahasa Inggris aktif (English Speaking), teknik berbicara di depan umum (Public Speaking), serta coaching interpersonal terarah bersama psikolog & praktisi komunikasi ahli.",
    packages: [
      { name: "?? Public Speaking & Confidence Project Class", price: "Rp 1.500.000", discount: "Rp 700.000", afterDiscount: "Rp 800.000" },
      { name: "?? English Speaking & Confidence Experience", price: "Rp 2.000.000", discount: "Rp 1.000.000", afterDiscount: "Rp 1.000.000" },
      { name: "?? Self Growth, Mental Health & Social Confidence", price: "Rp 1.500.000", discount: "Rp 700.000", afterDiscount: "Rp 800.000" },
    ],
    whyInteresting: [
      "Metodologi belajar aktif yang interaktif tanpa tekanan",
      "Ruang belajar yang aman (safe space) untuk melatih kepercayaan diri",
      "Pendampingan langsung oleh mentor psikologi & penutur asing",
      "Pengalaman belajar berbasis proyek luar ruangan yang menyenangkan",
    ],
    targetMarket: ["?? Mahasiswa & fresh graduate", "?? Pekerja profesional", "?? Siapa saja yang ingin meningkatkan rasa percaya diri berbicara"],
    disclaimer: "Skema program penggabungan ini dilakukan secara luring dan daring sesuai modul kesepakatan akademik.",
  },
  "Green Productive Academy": {
    subtitle: "Sekolah Teknologi Hijau � Inovasi Produk Berbasis Lingkungan",
    intro: "Pelajari inovasi teknologi berkelanjutan dan rancang produk ramah lingkungan untuk berkontribusi pada kelestarian bumi ??\n\nProgram edukasi hijau ini menyajikan kurikulum mendalam seputar prinsip ekonomi sirkular (Circular Economy), pemanfaatan energi bersih skala praktis, pengolahan limbah mandiri, serta penciptaan model bisnis hijau untuk pelaku wirausaha ramah lingkungan.",
    packages: [
      { name: "?? Program Teknologi Hijau Dasar", price: "Rp 1.500.000", discount: "Rp 500.000", afterDiscount: "Rp 1.000.000" },
      { name: "?? Program Inovasi Produk Berkelanjutan", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000" },
    ],
    whyInteresting: [
      "Modul komprehensif berbasis standar pembangunan berkelanjutan (SDGs)",
      "Peluang kolaborasi dengan berbagai aktivis & organisasi lingkungan",
      "Cocok dipromosikan bagi mahasiswa teknik, sains, dan pegiat sosial",
      "Membantu merancang inovasi produk bernilai jual tinggi berwawasan hijau",
    ],
    targetMarket: ["?? Aktivis & penggerak sosial lingkungan", "?? Mahasiswa sains/teknik", "?? Pelaku industri & wirausaha ramah lingkungan"],
    disclaimer: "Kurikulum pembelajaran disesuaikan dengan studi kasus dan peraturan lingkungan terkini di Indonesia.",
  },

};

const products = [
  {
    name: "LP Academic Partner",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: GraduationCap,
    desc: "Program pendampingan dan akselerasi akademik premium bagi mahasiswa dan akademisi.",
    url: "/daftar-pelatihan?pkg=lp-academic-partner",
  },
  {
    name: "LP Career Ready",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Award,
    desc: "Program bimbingan karier profesional, optimasi CV/LinkedIn, dan simulasi interview kerja.",
    url: "/daftar-pelatihan?pkg=lp-career-ready",
  },
  {
    name: "LP Entrepreneur Launchpad",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: TrendingUp,
    desc: "Bootcamp intensif inkubasi ide bisnis baru dan penyusunan proposal bisnis profesional.",
    url: "/daftar-pelatihan?pkg=lp-entrepreneur-launchpad",
  },
  {
    name: "Bisapreneur Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Building,
    desc: "Edukasi & pendampingan tata kelola serta digitalisasi bisnis untuk UMKM dan Koperasi.",
    url: "/daftar-pelatihan?pkg=bisapreneur-academy",
  },
  {
    name: "Baristara Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Coffee,
    desc: "Sekolah barista terlengkap untuk menguasai teknik pembuatan kopi dan manajemen bisnis kedai kopi.",
    url: "/daftar-pelatihan?pkg=baristara-academy",
  },
  {
    name: "Cuan Creator Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: MonitorPlay,
    desc: "Pusat belajar digital marketing, optimalisasi sosial media, dan keahlian content creation.",
    url: "/daftar-pelatihan?pkg=cuan-creator-academy",
  },
  {
    name: "Tekno AI Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Presentation,
    desc: "Sekolah coding terintegrasi dengan implementasi teknologi kecerdasan buatan (AI) untuk bisnis.",
    url: "/daftar-pelatihan?pkg=tekno-ai-academy",
  },
  {
    name: "Mental Bahasa Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Users,
    desc: "Program integrasi kelas bahasa asing premium dengan pendampingan kesehatan mental terarah.",
    url: "/daftar-pelatihan?pkg=mental-bahasa-academy",
  },
  {
    name: "Green Productive Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Recycle,
    desc: "Program edukasi dan akselerator produk inovatif berbasis kelestarian lingkungan hidup.",
    url: "/daftar-pelatihan?pkg=green-productive-academy",
  },
];

const POSTER_KEYS: Record<string, string> = {
  "LP Academic Partner": "training_poster_academic",
  "LP Career Ready": "training_poster_career",
  "LP Entrepreneur Launchpad": "training_poster_entrepreneur",
  "Bisapreneur Academy": "training_poster_bisapreneur",
  "Baristara Academy": "training_poster_baristara",
  "Cuan Creator Academy": "training_poster_cuan_creator",
  "Tekno AI Academy": "training_poster_tekno_ai",
  "Mental Bahasa Academy": "training_poster_mental_bahasa",
  "Green Productive Academy": "training_poster_green_productive",
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
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function ProgramPosterCarousel({ urls, productName, onImageClick }: { urls: string[]; productName: string; onImageClick?: (url: string) => void }) {
  const [[page, direction], setPage] = useState([0, 0]);

  if (urls.length === 0) return null;

  const currentIndex = ((page % urls.length) + urls.length) % urls.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(1);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    paginate(-1);
  };

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-near-black/5 aspect-[3/4] bg-near-black/5 relative group/carousel shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={urls[currentIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={urls.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            alt={`${productName} poster ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-contain bg-[#1A1A1A] select-none touch-pan-y cursor-zoom-in"
            onClick={() => onImageClick?.(urls[currentIndex])}
            loading="lazy"
          />
        </AnimatePresence>
      </div>

      {urls.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10 cursor-pointer border border-white/10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 z-10 cursor-pointer border border-white/10"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
            {urls.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  const dir = idx > currentIndex ? 1 : -1;
                  setPage([idx, dir]);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-[#004aad] w-3" : "bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
  "standara-consulting": "Standara Consulting",
};

// --- ENROLLMENT REGISTER MODAL ---
function EnrollModal({
  product,
  onClose,
  siteSettings
}: {
  product: any;
  onClose: () => void;
  siteSettings: Record<string, string>;
}) {
  const searchParams = useSearchParams();
  const refCodeParam = searchParams.get("ref") || "";

  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    occupation: "",
    notes: "",
  });
  const [refCode, setRefCode] = useState(refCodeParam);
  const [copiedBank, setCopiedBank] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(
    product.packages && product.packages.length > 0 ? product.packages[0].id : ""
  );

  const selectedPkg = product.packages?.find((pkg: any) => pkg.id === selectedPackageId);
  const originalPrice = selectedPkg?.rawPrice || 0;
  const discountPct = refCode.trim() ? 10 : 0;
  const discountAmount = originalPrice * (discountPct / 100);
  const finalPrice = originalPrice - discountAmount;

  const occupations = [
    { value: "pelajar", label: "Pelajar / Siswa" },
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "karyawan", label: "Karyawan / Pegawai" },
    { value: "freelancer", label: "Freelancer" },
    { value: "wirausaha", label: "Wirausaha" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const set = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const waNumber = siteSettings.training_payment_wa || siteSettings.affiliate_whatsapp || siteSettings.contact_wa || "";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      setError("Nama Lengkap dan Nomor WhatsApp wajib diisi.");
      return;
    }
    if (!selectedPackageId) {
      setError("Pilih program / tingkatan kelas terlebih dahulu.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const targetSku = selectedPkg ? selectedPkg.sku : (Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === product.name) || "lp-academic-partner");
      const targetName = selectedPkg ? `${product.name} - ${selectedPkg.name}` : product.name;

      const res = await createAffiliateLead({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        city: form.city || undefined,
        occupation: form.occupation || undefined,
        productSku: targetSku,
        productName: targetName,
        referralCode: refCode || undefined,
        notes: form.notes || undefined,
        originalPrice,
        finalPrice,
      });

      setLoading(false);
      if (res.success) {
        setStep("success");
      } else {
        setError(res.error ?? "Terjadi kesalahan. Silakan coba lagi.");
      }
    } catch (err) {
      setLoading(false);
      setError("Masalah jaringan. Silakan coba lagi.");
    }
  };

  const inputCls = "w-full px-4 py-3 bg-white border border-near-black/10 rounded-xl text-xs font-bold text-near-black focus:outline-none focus:ring-2 focus:ring-[#004aad]/30 focus:border-[#004aad] transition-all placeholder:text-near-black/30";
  const labelCls = "block text-[10px] font-black uppercase tracking-wider text-near-black/60 mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-near-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-near-black/10 overflow-hidden shadow-2xl text-near-black flex flex-col"
        style={{ maxHeight: "92vh" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center px-6 pt-6 pb-4 border-b border-near-black/5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-near-black">
              Formulir Pendaftaran Kelas
            </h3>
            <p className="text-[10px] text-near-black/40 font-bold mt-0.5">
              Silakan lengkapi data diri Anda untuk bergabung program {product.name}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-near-black/5 flex items-center justify-center text-near-black/40 hover:text-near-black transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {step === "success" ? (
            <div className="flex flex-col items-center justify-center gap-5 px-8 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-black text-near-black mb-2">Pendaftaran Berhasil! ??</h4>
                <p className="text-xs text-near-black/60 font-bold leading-relaxed max-w-xs">
                  Data pendaftaran Anda telah kami simpan. Selesaikan proses pendaftaran dengan mentransfer total pembayaran ke rekening resmi kami di bawah ini:
                </p>
              </div>

              {/* Total Pembayaran to Transfer */}
              {finalPrice > 0 && (
                <div className="w-full p-4 bg-sky-50 border border-sky-100 rounded-2xl text-center space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">Total Pembayaran Yang Perlu Ditransfer</p>
                  <p className="text-xl font-black text-[#004aad] font-sans">
                    Rp {finalPrice.toLocaleString("id-ID")}
                  </p>
                  {discountPct > 0 && (
                    <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider">
                      Sudah termasuk diskon referral {discountPct}%!
                    </p>
                  )}
                </div>
              )}

              {/* Payment Methods (Bank Transfer & QRIS) */}
              <div className="w-full space-y-3">
                {/* Bank Transfer */}
                <div className="p-4 bg-white border border-near-black/5 rounded-2xl flex justify-between items-center w-full text-left">
                  <div>
                    <p className="text-[9px] text-near-black/40 uppercase font-black">BCA TRANSFER</p>
                    <p className="text-sm font-black text-near-black tracking-wider font-mono mt-0.5">
                      {siteSettings.payment_bank_account || "8882047811"}
                    </p>
                    <p className="text-[10px] text-near-black/60 font-bold mt-0.5">
                      a.n. {siteSettings.payment_bank_owner || "PT Link Productive Indonesia"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(siteSettings.payment_bank_account || "8882047811")}
                    className="p-2.5 bg-near-black/5 hover:bg-near-black/10 text-near-black rounded-lg border border-near-black/10 transition-colors"
                  >
                    {copiedBank ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* QRIS Code */}
                {siteSettings.payment_qris_image && (
                  <div className="p-4 bg-white border border-near-black/5 rounded-2xl flex flex-col items-center justify-center gap-3 w-full">
                    <p className="text-[9px] text-near-black/40 uppercase font-black text-center w-full">ATAU SCAN QRIS RESMI</p>
                    <div className="w-44 h-44 border border-near-black/5 rounded-xl overflow-hidden bg-white p-2">
                      <img
                        src={siteSettings.payment_qris_image}
                        alt="QRIS Pembayaran"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-[8px] text-near-black/40 font-bold uppercase tracking-widest text-center leading-normal">
                      Pindai QR di atas menggunakan aplikasi e-wallet atau mobile banking Anda
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full">
                <a
                  href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                    `Halo Admin! Saya *${form.name}* baru saja mendaftar program kelas *${product.name}* (${selectedPkg ? selectedPkg.name : ""}).\n\nTotal pembayaran: Rp ${finalPrice.toLocaleString("id-ID")}\n\nMohon informasi verifikasi pendaftaran saya.\n\nDetail:\n- Nama: ${form.name}\n- HP: ${form.phone}\n${refCode ? `- Kode Ref: ${refCode}` : ""}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  <MessageCircle size={14} />
                  Konfirmasi Pembayaran via WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 border border-near-black/10 text-near-black/50 rounded-xl text-xs font-black uppercase tracking-wider hover:border-near-black/20 transition-all"
                >
                  Tutup Portal
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 px-6 py-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#004aad]">Lengkapi Data Diri</p>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCls}>Pilih Program / Tingkatan Kelas <span className="text-rose-400">*</span></label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => setSelectedPackageId(e.target.value)}
                    className={inputCls + " cursor-pointer font-bold text-xs"}
                  >
                    {product.packages && product.packages.map((pkg: any) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.afterDiscount || pkg.price})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Nama Lengkap <span className="text-rose-400">*</span></label>
                  <input type="text" placeholder="Masukkan nama lengkap Anda" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>No. WhatsApp <span className="text-rose-400">*</span></label>
                  <input type="tel" placeholder="Contoh: 081234567890" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email (Opsional)</label>
                  <input type="email" placeholder="nama@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Kota Domisili</label>
                    <input type="text" placeholder="Contoh: Cilegon" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pekerjaan</label>
                    <select value={form.occupation} onChange={(e) => set("occupation", e.target.value)} className={inputCls + " cursor-pointer"}>
                      <option value="">Pilih Pekerjaan</option>
                      {occupations.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Kode Referral Affiliate (Jika Ada)</label>
                  <input type="text" placeholder="Masukkan kode referral dari affiliate partner" value={refCode} onChange={(e) => setRefCode(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Catatan Tambahan (Opsional)</label>
                  <textarea
                    placeholder="Tuliskan catatan khusus terkait minat atau preferensi program Anda..."
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    rows={3}
                    className={inputCls + " resize-none"}
                  />
                </div>

                <div className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl space-y-2 text-left">
                  <p className="text-[9px] font-black uppercase tracking-wider text-sky-600">Rincian Pembayaran &amp; Biaya</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Biaya Pendaftaran Kelas:</span>
                    <span className="font-bold text-slate-800">Rp {originalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  {discountPct > 0 && (
                    <div className="flex justify-between text-xs text-emerald-600">
                      <span className="font-bold flex items-center gap-1">? Diskon Referral ({discountPct}%):</span>
                      <span className="font-black">-Rp {discountAmount.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                  <div className="h-px bg-sky-100 my-1" />
                  <div className="flex justify-between text-xs font-black">
                    <span className="text-slate-800">Total Biaya Akhir:</span>
                    <span className="text-[#004aad] text-sm">Rp {finalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  {discountPct > 0 && (
                    <p className="text-[8px] text-emerald-600 font-bold leading-normal mt-1 uppercase tracking-wider">
                      ?? Kode Referral Terpasang! Diskon {discountPct}% berhasil diterapkan.
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <X size={14} className="text-rose-500 flex-shrink-0" />
                  <p className="text-xs font-bold text-rose-600">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Submit */}
        {step === "form" && (
          <div className="flex-shrink-0 px-6 pb-6 pt-4 border-t border-near-black/5">
            <button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.phone}
              className="w-full py-3.5 bg-near-black hover:bg-near-black/90 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-near-black/10 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <Spinner size={16} className="text-white" />
              ) : (
                <>
                  <ArrowRight size={14} />
                  Kirim Formulir Pendaftaran Kelas
                </>
              )}
            </button>
            <p className="text-[9px] text-near-black/30 font-bold text-center mt-2.5 uppercase tracking-wider">
              Pembayaran Aman via Rekening Resmi PT Link Productive Indonesia
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function parseProductsFromDb(dbProducts: any[]) {
  const grouped: Record<string, {
    name: string;
    fee: string;
    unit: string;
    icon: any;
    desc: string;
    url: string;
    packages: any[];
  }> = {};

  const iconMap: Record<string, any> = {
    "LP Academic Partner": GraduationCap,
    "LP Career Ready": Award,
    "LP Entrepreneur Launchpad": TrendingUp,
    "Bisapreneur Academy": Building,
    "Baristara Academy": Coffee,
    "Cuan Creator Academy": MonitorPlay,
    "Tekno AI Academy": Presentation,
    "Mental Bahasa Academy": Users,
    "Green Productive Academy": Recycle,
    "Brand Siap": ShoppingBag,
    "Standara Consulting": Handshake,
  };

  const parsePriceString = (priceStr: string): number => {
    if (!priceStr || priceStr.toLowerCase().includes("menyesuaikan")) return 0;
    const clean = priceStr.replace(/[^0-9]/g, "");
    return parseInt(clean, 10) || 0;
  };

  // Group database products by program/category for matching
  const dbProdsByProgram: Record<string, any[]> = {};
  dbProducts.forEach((p) => {
    let programName = "";
    if (p.name.includes(" - ")) {
      programName = p.name.split(" - ")[0].trim();
    } else {
      programName = p.category || "Umum";
    }
    if (!dbProdsByProgram[programName]) {
      dbProdsByProgram[programName] = [];
    }
    dbProdsByProgram[programName].push(p);
  });

  // Now, iterate through trainingDetails to build the parsed programs with correct pricing
  Object.keys(trainingDetails).forEach((programName) => {
    const details = trainingDetails[programName];
    const dbProds = dbProdsByProgram[programName] || [];

    if (dbProds.length === 0) return; // Skip if no products in database for this program

    let IconComp = GraduationCap;
    for (const key of Object.keys(iconMap)) {
      if (programName.toLowerCase().includes(key.toLowerCase())) {
        IconComp = iconMap[key];
        break;
      }
    }

    const firstDbProd = dbProds[0];
    const parsedPackages: any[] = [];

    details.packages.forEach((staticPkg, index) => {
      // Find matching db product
      const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
      const sClean = clean(staticPkg.name);

      const matchedDbProd = dbProds.find((dp) => {
        const dpParts = dp.name.split(" - ");
        const dpPkgName = dpParts[1] ? dpParts[1].trim() : dp.name;
        const dpClean = clean(dpPkgName);
        return sClean.includes(dpClean) || dpClean.includes(sClean);
      }) || firstDbProd;

      const basePrice = parsePriceString(staticPkg.price);
      let discAmount = 0;
      let afterDiscStr = staticPkg.afterDiscount;
      let afterDiscVal = 0;

      if (afterDiscStr) {
        afterDiscVal = parsePriceString(afterDiscStr);
        discAmount = basePrice - afterDiscVal;
      } else if (staticPkg.discount && staticPkg.discount !== "-" && staticPkg.discount.toLowerCase() !== "sesuai proyek") {
        discAmount = parsePriceString(staticPkg.discount);
        afterDiscVal = basePrice - discAmount;
        afterDiscStr = `Rp ${afterDiscVal.toLocaleString("id-ID")}`;
      } else {
        afterDiscVal = basePrice;
      }

      parsedPackages.push({
        id: `${matchedDbProd.id}-${index}`, // unique ID for package selection
        sku: matchedDbProd.sku,
        name: staticPkg.name,
        price: staticPkg.price,
        rawPrice: afterDiscVal > 0 ? afterDiscVal : matchedDbProd.price, // use calculated after-discount promo price as rawPrice for checkout
        discount: discAmount > 0 ? `Rp ${discAmount.toLocaleString("id-ID")}` : staticPkg.discount,
        afterDiscount: afterDiscVal > 0 && afterDiscVal < basePrice ? afterDiscStr : undefined,
        suitableFor: staticPkg.suitableFor || (matchedDbProd.duration ? `Durasi: ${matchedDbProd.duration}` : undefined),
        services: staticPkg.services || matchedDbProd.features || [],
        goal: staticPkg.goal || (matchedDbProd.photoCount ? `Sertifikasi: ${matchedDbProd.photoCount}` : undefined)
      });
    });

    grouped[programName] = {
      name: programName,
      fee: "Sesuai Ketentuan",
      unit: firstDbProd.sku.startsWith("pkg-") ? "pendaftaran" : "paket",
      icon: IconComp,
      desc: `Program unggulan ${programName} terintegrasi untuk mempersiapkan keahlian profesional masa depan Anda.`,
      url: `/daftar-pelatihan?pkg=${programName.toLowerCase().replace(/\s+/g, "-")}`,
      packages: parsedPackages
    };
  });

  // Handle any other programs in DB not explicitly in trainingDetails
  dbProducts.forEach((p) => {
    let programName = "";
    let packageName = "";

    if (p.name.includes(" - ")) {
      const parts = p.name.split(" - ");
      programName = parts[0].trim();
      packageName = parts[1].trim();
    } else {
      programName = p.category || "Umum";
      packageName = p.name;
    }

    if (trainingDetails[programName]) return; // already handled

    if (!grouped[programName]) {
      let IconComp = GraduationCap;
      for (const key of Object.keys(iconMap)) {
        if (programName.toLowerCase().includes(key.toLowerCase())) {
          IconComp = iconMap[key];
          break;
        }
      }

      grouped[programName] = {
        name: programName,
        fee: "Sesuai Ketentuan",
        unit: p.sku.startsWith("pkg-") ? "pendaftaran" : "paket",
        icon: IconComp,
        desc: `Program unggulan ${programName} terintegrasi untuk mempersiapkan keahlian profesional masa depan Anda.`,
        url: `/daftar-pelatihan?pkg=${programName.toLowerCase().replace(/\s+/g, "-")}`,
        packages: []
      };
    }

    grouped[programName].packages.push({
      id: p.id,
      sku: p.sku,
      name: packageName,
      price: `Rp ${p.price.toLocaleString("id-ID")}`,
      rawPrice: p.price,
      discount: "Diskon Khusus",
      afterDiscount: p.price > 100000 ? `Rp ${(p.price - 100000).toLocaleString("id-ID")}` : undefined,
      suitableFor: p.duration ? `Durasi: ${p.duration}` : undefined,
      services: p.features || [],
      goal: p.photoCount ? `Sertifikasi: ${p.photoCount}` : undefined
    });
  });

  return Object.values(grouped);
}

// --- MAIN PAGE COMPONENT ---
function DaftarPelatihanContent() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [activeProduct, setActiveProduct] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const filteredProducts = productsList.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-open detailed program modal if pkg is passed in URL
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    if (pkg && productsList.length > 0) {
      const targetName = pkgSlugMap[pkg.toLowerCase()];
      const found = productsList.find((p) => p.name === (targetName || pkg) || p.name.toLowerCase() === pkg.toLowerCase().replace(/-/g, " "));
      if (found) {
        setActiveProduct(found);
      }
    }
  }, [searchParams, productsList]);

  // Reset expanded package when active product changes
  useEffect(() => {
    setExpandedPkg(null);
  }, [activeProduct]);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const settingsRes = await getSiteSettings();
        if (settingsRes) {
          setSettings(settingsRes);
        }

        const productsRes = await getProducts();
        let dbData: any[] = [];
        if (productsRes.success && Array.isArray(productsRes.data)) {
          dbData = productsRes.data.filter((p: any) => p.isActive);
        }

        const dbSkus = new Set(dbData.map(p => p.sku));
        const mergedProducts = [
          ...dbData,
          ...brandProducts.filter(p => !dbSkus.has(p.sku))
        ];

        const parsed = parseProductsFromDb(mergedProducts);
        setProductsList(parsed);
      } catch (err) {
        console.error("Gagal memuat portal pelatihan data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPageData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-near-black flex flex-col items-center justify-center space-y-4 text-white">
        <Spinner size={32} className="text-[#004aad]" />
        <p className="text-xs text-white/40 font-bold uppercase tracking-wider font-mono">Memuat Halaman Pelatihan...</p>
      </div>
    );
  }

  // Active product details resolution
  const details = activeProduct ? (trainingDetails[activeProduct.name] || {
    subtitle: "Pelatihan Kompetensi & Keahlian Terintegrasi",
    intro: "Tingkatkan keahlian kompetensi Anda bersama mentor industri ahli melalu kurikulum berbasis praktik nyata.",
    whyInteresting: ["Modul belajar praktis", "Mentor berpengalaman", "Sertifikat resmi", "Akses jaringan industri"],
    targetMarket: ["?? Mahasiswa & alumni", "?? Profesional muda", "?? Wirausaha rintisan"],
    disclaimer: "Jadwal dan materi kelas diatur setelah konfirmasi pendaftaran selesai."
  }) : null;

  return (
    <>
      {/* Enroll Form Modal (popup) */}
      <AnimatePresence>
        {showEnrollModal && activeProduct && (
          <EnrollModal
            product={activeProduct}
            siteSettings={settings}
            onClose={() => setShowEnrollModal(false)}
          />
        )}
      </AnimatePresence>

      {/* FULL PAGE DETAIL VIEW */}
      <AnimatePresence>
        {activeProduct && details && (
          <motion.div
            key="detail-fullpage"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-near-black overflow-y-auto"
          >
            {/* Back Bar */}
            <div className="sticky top-0 z-10 bg-near-black/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
              <button
                onClick={() => setActiveProduct(null)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-black text-[11px] uppercase tracking-widest cursor-pointer"
              >
                <ArrowLeft size={16} />
                Kembali ke Daftar Program
              </button>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 pb-24">
              {/* Program Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad]/25 border border-[#004aad]/40 flex items-center justify-center text-[#004aad] flex-shrink-0">
                  <activeProduct.icon size={26} />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-tight">{activeProduct.name}</h1>
                  <p className="text-[11px] text-white/40 font-bold mt-1 uppercase tracking-wider">{details.subtitle}</p>
                </div>
              </div>

              {/* Poster */}
              {(() => {
                const posterKey = POSTER_KEYS[activeProduct.name] || `training_poster_${activeProduct.name.toLowerCase().replace(/\s+/g, "_")}`;
                const rawPosters = settings[posterKey] || DEFAULT_POSTERS[activeProduct.name] || "";
                const posterUrls = rawPosters.split(",").map((u) => u.trim()).filter(Boolean);
                return posterUrls.length > 0 ? (
                  <div className="mb-8 max-w-xs mx-auto">
                    <ProgramPosterCarousel
                      urls={posterUrls}
                      productName={activeProduct.name}
                      onImageClick={(url) => setLightboxUrl(url)}
                    />
                  </div>
                ) : null;
              })()}

              {details ? (
                <div className="space-y-8 mt-6">
                  {/* Intro */}
                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-6">{details.intro}</p>

                  {/* Dynamic Packages */}
                  {activeProduct.packages && activeProduct.packages.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em]">Pilihan Paket & Investasi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeProduct.packages.map((pkg: any, idx: number) => (
                          <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#004aad]/40 transition-colors flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-black text-white uppercase tracking-wide">{pkg.name}</h4>
                              {pkg.suitableFor && (
                                <p className="text-[9px] text-white/50 mt-1 font-medium leading-relaxed">{pkg.suitableFor}</p>
                              )}
                              {pkg.services && pkg.services.length > 0 && (
                                <ul className="mt-4 space-y-1.5">
                                  {pkg.services.map((srv: string, sIdx: number) => (
                                    <li key={sIdx} className="text-[10px] text-white/75 font-bold flex items-start gap-2">
                                      <CheckCircle2 size={12} className="text-[#004aad] flex-shrink-0 mt-0.5" />
                                      <span>{srv}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              {pkg.goal && (
                                <p className="text-[9px] text-[#004aad] uppercase font-black tracking-wider mt-4">{pkg.goal}</p>
                              )}
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                              <div>
                                <span className="block text-[8px] text-white/40 font-black uppercase tracking-wider">Investasi</span>
                                <span className="text-xs font-black text-white font-sans">{pkg.price}</span>
                              </div>
                              {pkg.afterDiscount && (
                                <div className="text-right">
                                  <span className="block text-[8px] text-emerald-400 font-black uppercase tracking-wider">Promo Khusus</span>
                                  <span className="text-xs font-black text-emerald-400 font-sans">{pkg.afterDiscount}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Why Interesting */}
                  {details.whyInteresting && details.whyInteresting.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em]">Mengapa Memilih Program Ini?</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {details.whyInteresting.map((item, idx) => (
                          <li key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 font-bold flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#004aad]/25 border border-[#004aad]/40 flex items-center justify-center text-[#004aad] text-[10px] font-black">{idx + 1}</div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Target Market */}
                  {details.targetMarket && details.targetMarket.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em]">Siapa Yang Cocok Mengikuti?</h3>
                      <div className="flex flex-wrap gap-2">
                        {details.targetMarket.map((m, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-white/70 uppercase tracking-wider">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer */}
                  {details.disclaimer && (
                    <p className="text-[10px] text-white/30 italic font-medium leading-relaxed border-t border-white/5 pt-6">{details.disclaimer}</p>
                  )}
                </div>
              ) : (
                <p className="text-white/40 text-sm text-center py-16">Detail silabus dan kurikulum program belum tersedia.</p>
              )}

              {/* Bottom CTA to Enroll */}
              <div className="mt-12">
                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#004aad] hover:bg-[#003984] text-white text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#004aad]/20 cursor-pointer"
                >
                  Daftar Kelas Pelatihan Sekarang
                  <GraduationCap size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Poster Lightbox */}
      <AnimatePresence>
        {lightboxUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxUrl(null)}
          >
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightboxUrl}
              alt="Poster Lightbox Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-slate-50 overflow-x-hidden w-full">
        {/* -- Premium Asymmetrical White-Dominant Hero Banner for Training -- */}
        <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-gradient-to-br from-white via-sky-50/50 to-white text-slate-800 w-full border-b border-slate-100">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.12),transparent_55%)] z-0 pointer-events-none" />

          {/* Animated subtle background orbs */}
          <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-sky-400/10 blur-[100px] z-0 animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[80px] z-0 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-bold uppercase tracking-[0.15em]">
                <Sparkles size={12} className="animate-pulse" />
                Portal Pembelajaran & Karir
              </div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Katalog Kelas & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">Pelatihan Premium</span>
              </h1>
              <p className="text-slate-505 text-base md:text-lg leading-relaxed max-w-xl font-medium">
                Tingkatkan kompetensi Anda melalui program pelatihan intensif, bimbingan tugas akhir privat, serta sertifikasi keahlian berstandar industri bersama mentor senior.
              </p>
              <div className="pt-2">
                <a
                  href="#program-list"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold uppercase tracking-wider text-xs rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-lg shadow-sky-500/20"
                >
                  Jelajahi Program Pelatihan
                  <ArrowRight size={14} className="hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[420px] grid grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, title: "Privat Intensif", desc: "Bimbingan satu-satu terarah" },
                { icon: Sparkles, title: "Praktisi Ahli", desc: "Didampingi mentor industri senior" },
                { icon: TrendingUp, title: "Karir Akseleratif", desc: "Persiapan matang ke dunia kerja" },
                { icon: Award, title: "Sertifikat Resmi", desc: "Kredensial berharga portofolio" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-sky-100/60 rounded-3xl p-5 flex flex-col items-start text-left hover:border-sky-300 hover:shadow-xl transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 mb-4">
                    <f.icon size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{f.title}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold leading-normal">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -- Products Grid -- */}
        <section id="program-list" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-near-black uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Pilihan Kelas & <span className="text-[#004aad]">Pelatihan</span>
              </h2>
              <p className="text-near-black/50 font-bold max-w-xl mx-auto text-sm">
                Klik <span className="text-[#004aad] font-black">Lihat Detail Program</span> pada katalog di bawah ini untuk melihat rincian silabus kelas, skema investasi, dan formulir pendaftaran.
              </p>
            </div>

            {/* Search Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-[#f0f7ff]/50 p-4 rounded-3xl border border-near-black/5">
              <div className="text-xs font-black uppercase tracking-widest text-[#1e293b]/50 pl-2">
                Daftar Program ({filteredProducts.length})
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-near-black/30" size={16} />
                <input
                  type="text"
                  placeholder="Cari kelas pelatihan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-near-black/10 rounded-2xl text-xs font-bold text-near-black focus:outline-none focus:ring-2 focus:ring-[#004aad]/30 focus:border-[#004aad] transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-near-black/30 hover:text-near-black"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-16 text-center text-near-black/40 font-bold uppercase tracking-widest text-xs">
                  Tidak ada kelas pelatihan ditemukan
                </div>
              ) : (
                filteredProducts.map((prod, i) => {
                  const posterKey = POSTER_KEYS[prod.name];
                  const rawPosters = settings[posterKey] || DEFAULT_POSTERS[prod.name] || "";
                  const posterUrls = rawPosters
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean);

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-6 rounded-[2rem] border border-near-black/5 bg-slate-50/50 hover:bg-white hover:border-[#004aad]/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#004aad]/10 flex items-center justify-center text-[#004aad] group-hover:scale-110 transition-transform border border-[#004aad]/20">
                            <prod.icon size={22} />
                          </div>
                          <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                            Pendaftaran Aktif
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-near-black uppercase mb-2 tracking-wide line-clamp-1 group-hover:text-[#004aad] transition-colors">{prod.name}</h3>
                        <p className="text-[11px] text-near-black/60 font-medium leading-relaxed mb-6 line-clamp-3">{prod.desc}</p>
                      </div>

                      {/* Poster Image Carousel */}
                      <ProgramPosterCarousel urls={posterUrls} productName={prod.name} />

                      <div className="pt-4 border-t border-near-black/5 flex items-center justify-between gap-4 mt-auto">
                        <div>
                          <span className="block text-[8px] text-near-black/40 font-black uppercase tracking-wider">Mulai Dari</span>
                          <span className="block text-sm font-black text-[#004aad] tracking-wide font-sans mt-0.5">
                            {formatPrice(prod.name === "Standara Consulting" ? 5000000 : 699000)}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveProduct(prod)}
                          className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-[#004aad] hover:bg-[#003984] text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                        >
                          Detail Program
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function DaftarPelatihanPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-near-black flex flex-col items-center justify-center space-y-4 text-white">
        <Spinner size={32} className="text-[#004aad]" />
        <p className="text-xs text-white/40 font-bold uppercase tracking-wider font-mono">Memuat Halaman...</p>
      </div>
    }>
      <DaftarPelatihanContent />
    </Suspense>
  );
}
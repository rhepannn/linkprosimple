"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  Coffee, Camera, Presentation, Recycle, MonitorPlay,
  GraduationCap, Users, Building, ShoppingBag, Handshake,
  BadgeDollarSign, TrendingUp, Award, CheckCircle2,
  ChevronRight, ChevronLeft, ChevronDown, Gift, ArrowRight, X,
  Search, ArrowLeft, MessageCircle, ImageIcon,
  Heart, Copy, Check, Share2, Calendar, Sparkles, Eye, EyeOff,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getAffiliatePosts } from "@/app/actions/affiliate-posts";
import { getSiteSettings } from "@/app/actions/settings";
import { toast } from "sonner";

// ─── AFFILIATE DETAIL DATA ────────────────────────────────────────────────────
const affiliateDetails: Record<string, { subtitle: string; intro: string; packages: { name: string; price: string; discount: string; afterDiscount?: string; commission: string; suitableFor?: string; services?: string[]; goal?: string }[]; whyInteresting: string[]; targetMarket: string[]; disclaimer: string; consultWa?: string }> = {
  "LP Academic Partner": {
    subtitle: "Pendamping Konsultan Tugas Akhir Mahasiswa",
    intro: "Bangun peluang penghasilan tambahan sambil membantu mahasiswa menyelesaikan Tugas Akhir lebih terarah & profesional 🎓\n\nSebagai Affiliate Partner, kamu akan mendapatkan:\n✅ Kode Referral Affiliate Khusus\n✅ Komisi Cash setiap transaksi berhasil\n✅ Customer mendapatkan potongan harga spesial\n✅ Bisa dijalankan online & fleksibel\n✅ Cocok untuk mahasiswa, alumni, mentor, komunitas, dan creator edukasi",
    packages: [
      { name: "🥉 Paket Starter Consultation", price: "Rp 799.000", discount: "Rp 250.000", commission: "Rp 100.000 / transaksi" },
      { name: "🥈 Paket Regular Academic Partner", price: "Rp 2.499.000", discount: "Rp 600.000", commission: "Rp 150.000 / transaksi" },
      { name: "🥇 Paket Premium Academic Partner", price: "Rp 4.999.000", discount: "Rp 1.300.000", commission: "Rp 250.000 / transaksi" },
      { name: "🚀 Paket Intensive Sidang & Revisi", price: "Rp 1.499.000", discount: "Rp 400.000", commission: "Rp 100.000 / transaksi" },
    ],
    whyInteresting: [
      "Produk edukasi yang sangat dibutuhkan mahasiswa",
      "Membantu mahasiswa lebih siap sidang & karier",
      "Pendampingan berbasis kasus nyata",
      "Didukung AI & ekosistem mitra industri",
      "Potensi repeat referral tinggi",
      "Sistem mudah dijalankan",
    ],
    targetMarket: ["🎓 Mahasiswa", "👨‍🏫 Dosen & mentor", "📚 Komunitas akademik", "📱 Content creator edukasi", "🤝 Partner komunitas kampus"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Partner Link Productive dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku.",
  },
  "LP Career Ready": {
    subtitle: "Program Perencanaan Karier Mahasiswa Menuju Dunia Kerja",
    intro: "LP Career Ready membuka kesempatan untuk kamu menjadi Affiliate Partner resmi Link Productive dan mendapatkan komisi dari setiap mahasiswa yang bergabung menggunakan kode referral milikmu.\n\nProgram ini sangat mudah dipasarkan karena:\n✔ Dibutuhkan banyak mahasiswa\n✔ Masalahnya nyata & relevan\n✔ Memiliki banyak success story\n✔ Harga promo sangat menarik\n✔ Ada webinar & mentoring karier profesional",
    packages: [
      { name: "📌 Pembelian H-1 Minggu Sebelum Acara", price: "Rp 699.000", discount: "-", afterDiscount: "Rp 699.000", commission: "Rp 50.000 / peserta" },
      { name: "🚀 Promo H-7 s/d H-20", price: "Rp 699.000", discount: "Rp 400.000", afterDiscount: "Rp 299.000", commission: "Rp 50.000 / peserta" },
      { name: "🚀 Promo H-21 dan Seterusnya", price: "Rp 699.000", discount: "Rp 500.000", afterDiscount: "Rp 199.000", commission: "Rp 50.000 / peserta" },
    ],
    whyInteresting: [
      "Roadmap karier personal yang dibutuhkan mahasiswa",
      "CV & LinkedIn profesional",
      "Persiapan interview & psikotest",
      "Strategi magang & project nyata",
      "Alumni berkarier di BCA, BI, Paragon Corp, Krakatau Steel, dan lainnya",
    ],
    targetMarket: ["🎓 Mahasiswa semester awal hingga akhir", "🎓 Fresh graduate", "🎓 Organisasi kampus", "🎓 Komunitas mahasiswa", "🎓 Career center kampus"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Partner Link Productive dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku.",
  },
  "LP Entrepreneur Launchpad": {
    subtitle: "Program Perencanaan Bisnis untuk Siswa SMA/SMK & Mahasiswa",
    intro: "Bantu Anak Muda Belajar Bisnis — Sekaligus Bangun Penghasilan Tambahan 🚀\n\nLP Business Planning Bootcamp hadir sebagai solusi praktis bagi pelajar & mahasiswa yang:\n❌ Bingung memulai bisnis\n❌ Takut gagal usaha\n❌ Punya ide tapi tidak tahu langkahnya\n❌ Ingin belajar bisnis dengan cara sederhana",
    packages: [
      { name: "⏳ Pembelian 1 Minggu Sebelum Acara", price: "Rp 750.000", discount: "-", commission: "Rp 75.000 / peserta" },
      { name: "⏳ Pembelian H-7 s/d H-20", price: "Rp 750.000", discount: "Rp 400.000", afterDiscount: "Rp 350.000", commission: "Rp 75.000 / peserta" },
      { name: "⏳ Pembelian H-21 dan Seterusnya", price: "Rp 750.000", discount: "Rp 500.000", afterDiscount: "Rp 250.000", commission: "Rp 75.000 / peserta" },
    ],
    whyInteresting: [
      "Produk edukasi yang relevan & mudah dipasarkan",
      "Banyak pelajar & mahasiswa butuh panduan bisnis",
      "Sistem referral sederhana",
      "Komisi cash per transaksi",
      "Bisa dikerjakan dari mana saja",
      "Potensi networking & kolaborasi",
    ],
    targetMarket: ["🏫 Siswa SMA/SMK", "🎓 Mahasiswa", "🚀 Komunitas entrepreneur muda", "👨‍💻 Organisasi kampus", "📚 Program kewirausahaan sekolah"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Partner Link Productive dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku.",
  },
  "Bisapreneur Academy": {
    subtitle: "Kelas Wirausaha Pemula — Mulai Usaha Dari Nol",
    intro: "Punya relasi, komunitas, audience, atau aktif di media sosial? Sekarang kamu bisa bantu lebih banyak orang belajar bisnis sambil mendapatkan penghasilan tambahan 💰\n\nProgram pembelajaran bisnis berbasis praktik untuk pemula, UMKM, koperasi, dan calon entrepreneur agar lebih berani memulai usaha, meningkatkan penjualan, dan mengembangkan bisnis secara bertahap.",
    packages: [
      { name: "💼 Kelas Wirausaha Pemula", price: "Rp 1.250.000", discount: "Rp 250.000", afterDiscount: "Rp 1.000.000", commission: "Rp 100.000 / peserta" },
    ],
    whyInteresting: [
      "Tidak perlu membuat produk sendiri",
      "Materi promosi disediakan",
      "Program mudah dipromosikan",
      "Dibutuhkan banyak orang",
      "Sistem referral sederhana",
      "Bisa dijalankan dari mana saja",
    ],
    targetMarket: ["📱 Content creator", "🎓 Mahasiswa", "💻 Freelancer", "👥 Admin komunitas", "🏪 Pegiat UMKM", "🧑‍🏫 Trainer / mentor"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Partner Link Productive dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku.",
  },
  "Baristara Academy": {
    subtitle: "Sekolah Barista & Bisnis Kopi by Link Productive",
    intro: "Punya audience? Suka dunia kopi? Atau mau punya penghasilan tambahan?\n\nSekarang kamu bisa dapat income dari promosi program pelatihan barista & bisnis kopi! Program mencakup skill barista, bisnis kopi, sampai punya peluang menghasilkan penghasilan dari dunia coffee shop.",
    packages: [
      { name: "☕ Program Barista Profesional", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / peserta" },
      { name: "☕ Program Barista & Bisnis Kopi", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000", commission: "Rp 200.000 / peserta" },
    ],
    whyInteresting: [
      "Produk mudah dijual (skill + kerja + bisnis kopi)",
      "Banyak peminat (anak muda & pecinta kopi)",
      "Sudah terbukti (ada alumni magang & kerja)",
      "Disediakan materi promosi",
      "Bisa jualan tanpa stok & tanpa modal",
    ],
    targetMarket: ["☕ Pecinta kopi", "🎓 Mahasiswa", "👨‍🍳 Calon barista profesional", "🏪 Calon pemilik kedai kopi", "📱 Content creator kuliner"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Partner Link Productive dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku.",
  },
  "Cuan Creator Academy": {
    subtitle: "Sekolah Digital Marketing — Belajar dari Nol Hingga Bisa Menghasilkan",
    intro: "Link Productive membuka kesempatan bagi Anda untuk menjadi Affiliate Partner Cuan Creator Academy, program pelatihan digital marketing berbasis project nyata yang membantu peserta memiliki skill, pengalaman, portofolio, hingga peluang income dari dunia digital.\n\nSebagai Affiliate Partner, Anda tidak hanya membantu orang berkembang, tetapi juga mendapatkan komisi dari setiap peserta yang berhasil bergabung.",
    packages: [
      { name: "🎓 Cuan Creator Academy", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000", commission: "Rp 200.000 / peserta" },
    ],
    whyInteresting: [
      "Banyak orang ingin punya skill digital yang menghasilkan",
      "Solusi nyata berbasis praktik & project langsung",
      "Komisi fee cash setiap closing",
      "Materi promosi siap pakai",
      "Support tim & pendampingan promosi",
      "Potensi income Rp10.000.000 dari 50 peserta",
    ],
    targetMarket: ["👨‍🎓 Mahasiswa", "📱 Content creator", "💻 Freelancer", "🏢 Komunitas kampus", "📈 Digital enthusiast", "🚀 Anak muda produktif"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Partner Link Productive dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku. Periode promo: 25 Mei 2026 – 22 Juni 2026.",
  },
  "Tekno AI Academy": {
    subtitle: "Sekolah Coding & AI Business — Skill Digital untuk Dunia Kerja & Bisnis",
    intro: "Sekarang banyak orang mulai belajar AI, coding, dan skill digital untuk kebutuhan kerja maupun bisnis. Melalui Program Affiliate Partner Link Productive, kamu bisa membantu mempromosikan program pelatihan sekaligus mendapatkan komisi dari setiap pendaftaran.",
    packages: [
      { name: "🤖 AI Business Productivity Class", price: "Rp 2.700.000", discount: "Rp 1.000.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / transaksi" },
      { name: "🌐 Web Developer for Business", price: "Rp 3.500.000", discount: "Rp 1.200.000", afterDiscount: "Rp 2.300.000", commission: "Rp 200.000 / transaksi" },
      { name: "🏢 AI for Office & Administration", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / transaksi" },
      { name: "🏭 AI Industry & Smart Manufacturing", price: "Rp 2.800.000", discount: "Rp 900.000", afterDiscount: "Rp 1.900.000", commission: "Rp 150.000 / transaksi" },
    ],
    whyInteresting: [
      "AI & digital skill sedang trending",
      "Banyak orang takut tertinggal teknologi",
      "Cocok untuk mahasiswa, pekerja & UMKM",
      "Program berbasis praktik & project nyata",
      "Bisa dipromosikan lewat TikTok, Instagram & WhatsApp",
    ],
    targetMarket: ["🎓 Mahasiswa & fresh graduate", "🏢 Staff kantor", "💻 Freelancer", "🏪 UMKM & pebisnis", "📱 Content creator", "🏭 Profesional industri"],
    disclaimer: "Harga layanan sewaktu-waktu dapat berubah mengikuti paket promo yang sedang berjalan. Komisi affiliate diberikan untuk setiap transaksi valid menggunakan kode referral affiliate partner yang terdaftar.",
  },
  "Mental Bahasa Academy": {
    subtitle: "Sekolah Bahasa & Mental Health — Bangun Kepercayaan Diri",
    intro: "Bangun Penghasilan Sambil Membantu Banyak Orang Lebih Percaya Diri, Jago Komunikasi, dan Bertumbuh.\n\nProgram pengembangan diri yang menggabungkan pembelajaran bahasa Inggris, public speaking, komunikasi interpersonal, dan penguatan mental melalui praktik langsung dan pengalaman berbasis project.",
    packages: [
      { name: "🎤 Public Speaking & Confidence Project Class", price: "Rp 1.500.000", discount: "Rp 700.000", afterDiscount: "Rp 800.000", commission: "Rp 50.000 / peserta" },
      { name: "🌏 English Speaking & Confidence Experience", price: "Rp 2.000.000", discount: "Rp 1.000.000", afterDiscount: "Rp 1.000.000", commission: "Rp 100.000 / peserta" },
      { name: "🧠 Self Growth, Mental Health & Social Confidence", price: "Rp 1.500.000", discount: "Rp 700.000", afterDiscount: "Rp 800.000", commission: "Rp 50.000 / peserta" },
    ],
    whyInteresting: [
      "Mendapatkan komisi fee cash",
      "Bisa dijalankan hanya melalui HP & media sosial",
      "Mendapatkan kode referral affiliate pribadi",
      "Mendapatkan materi promosi siap pakai",
      "Mendapatkan support tim & mentor",
      "Cocok untuk tambahan penghasilan mahasiswa & fresh graduate",
    ],
    targetMarket: ["🎓 Mahasiswa", "👔 Fresh Graduate", "📱 Content Creator", "💻 Freelancer", "👥 Organisasi & Komunitas", "🚀 Entrepreneur Muda"],
    disclaimer: "Harga layanan sewaktu-waktu dapat berubah sesuai promo yang sedang berjalan. Komisi affiliate dihitung dari transaksi yang valid & terdata menggunakan kode referral affiliate.",
  },
  "Green Productive Academy": {
    subtitle: "Sekolah Teknologi Hijau — Inovasi Produk Berbasis Lingkungan",
    intro: "Jadilah bagian dari gerakan edukasi hijau dan dapatkan penghasilan sambil membantu banyak orang belajar teknologi ramah lingkungan 🌿\n\nSebagai Affiliate Partner, kamu akan mendapatkan:\n✅ Kode Referral Affiliate Khusus\n✅ Komisi Cash setiap transaksi berhasil\n✅ Customer mendapatkan potongan harga spesial\n✅ Bisa dijalankan online & fleksibel\n✅ Cocok untuk aktivis lingkungan, mahasiswa teknik, dan komunitas hijau",
    packages: [
      { name: "🌱 Program Teknologi Hijau Dasar", price: "Rp 1.500.000", discount: "Rp 500.000", afterDiscount: "Rp 1.000.000", commission: "Rp 100.000 / peserta" },
      { name: "♻️ Program Inovasi Produk Berkelanjutan", price: "Rp 2.500.000", discount: "Rp 800.000", afterDiscount: "Rp 1.700.000", commission: "Rp 150.000 / peserta" },
    ],
    whyInteresting: [
      "Topik green tech sedang naik daun & relevan",
      "Mendukung SDGs & keberlanjutan lingkungan",
      "Cocok dipromosikan ke komunitas kampus & aktivis",
      "Materi promosi siap pakai dari tim",
      "Komisi cash per transaksi valid",
      "Potensi kolaborasi dengan komunitas hijau",
    ],
    targetMarket: ["🌿 Aktivis lingkungan", "🎓 Mahasiswa teknik & sains", "🏭 Pelaku industri", "📱 Content creator eco", "♻️ Komunitas hijau & UMKM green"],
    disclaimer: "Program promo, diskon, fee referral, bonus, maupun skema penawaran dalam Program Affiliate Green Productive Academy dapat berubah sewaktu-waktu pada setiap periode promo yang berlaku.",
  },
  "Brand Siap": {
    subtitle: "Layanan Branding Cepat — Identitas Visual & Kemasan Produk",
    intro: "Bantu pelaku usaha tampil profesional dan dapatkan komisi menarik setiap referral berhasil! 🎨\n\nBrand Siap menyediakan layanan super cepat pembuatan identitas visual, logo, kemasan produk, dan kesiapan branding usaha untuk UMKM dan pebisnis yang ingin tampil keren tanpa ribet.\n\nSebagai Affiliate Partner kamu bisa:\n✅ Promosikan layanan branding ke teman/klien yang butuh branding\n✅ Dapatkan komisi setiap proyek berhasil closing\n✅ Fleksibel, bisa dari mana saja",
    packages: [
      { name: "🎨 Paket Logo & Brand Identity", price: "Rp 500.000", discount: "Rp 100.000", afterDiscount: "Rp 400.000", commission: "Rp 50.000 / proyek" },
      { name: "📦 Paket Kemasan & Packaging Design", price: "Rp 750.000", discount: "Rp 150.000", afterDiscount: "Rp 600.000", commission: "Rp 75.000 / proyek" },
      { name: "🚀 Paket Brand Siap Lengkap", price: "Rp 1.500.000", discount: "Rp 300.000", afterDiscount: "Rp 1.200.000", commission: "Rp 150.000 / proyek" },
    ],
    whyInteresting: [
      "Semua UMKM butuh branding yang kuat",
      "Layanan cepat, hasil profesional",
      "Mudah dipromosikan ke pelaku usaha",
      "Komisi per proyek closing",
      "Support tim desain berpengalaman",
      "Bisa dikerjakan tanpa keahlian desain",
    ],
    targetMarket: ["🏪 UMKM & pebisnis", "🎓 Mahasiswa wirausaha", "📱 Content creator", "💻 Freelancer marketing", "🤝 Komunitas pebisnis muda"],
    disclaimer: "Harga layanan Brand Siap sewaktu-waktu dapat berubah mengikuti paket promo yang sedang berjalan. Komisi affiliate diberikan untuk setiap transaksi valid menggunakan kode referral affiliate partner yang terdaftar.",
  },
  "Snapp Frame": {
    subtitle: "Studio Foto Minimalis Premium — Cetak Kilat & Dokumentasi Visual",
    intro: "Jadilah Affiliate Partner Snapp.frame Studio dan dapatkan komisi dari setiap pelanggan yang booking sesi foto menggunakan kode referral kamu! 📸\n\nSnapp.frame Studio adalah studio foto minimalis modern dengan konsep photobooth premium. Cocok untuk foto portrait, wisuda, ulang tahun, dan momen spesial lainnya.\n\nSebagai Affiliate Partner kamu bisa:\n✅ Bagikan link referral ke teman, keluarga, atau followers\n✅ Dapat komisi Rp3.500 per foto yang tercetak\n✅ Customer dapat diskon khusus pakai kode referralmu\n✅ Bisa dijalankan via WhatsApp, Instagram, TikTok",
    packages: [
      { name: "📸 Paket Solo (10 foto)", price: "Rp 75.000", discount: "Rp 15.000", afterDiscount: "Rp 60.000", commission: "Rp 35.000 / booking" },
      { name: "👫 Paket Duo (15 foto)", price: "Rp 100.000", discount: "Rp 20.000", afterDiscount: "Rp 80.000", commission: "Rp 52.500 / booking" },
      { name: "👨‍👩‍👧‍👦 Paket Group (20 foto)", price: "Rp 130.000", discount: "Rp 25.000", afterDiscount: "Rp 105.000", commission: "Rp 70.000 / booking" },
    ],
    whyInteresting: [
      "Studio langsung di kotamu — dekat & terjangkau",
      "Produk premium yang mudah dijual",
      "Banyak event (wisuda, ultah, gathering) jadi peluang",
      "Komisi per booking langsung",
      "Materi promosi & konten siap pakai",
      "Sistem tracking referral otomatis",
    ],
    targetMarket: ["📸 Pecinta foto", "🎓 Mahasiswa & pelajar", "💒 Pasangan & keluarga", "📱 Content creator", "🎉 Event organizer", "🏫 Organisasi kampus"],
    disclaimer: "Komisi affiliate Snapp.frame dihitung per foto yang tercetak dari booking valid menggunakan kode referral terdaftar. Harga dan komisi dapat berubah sesuai promo yang sedang berjalan.",
  },
  "Standara Consulting": {
    subtitle: "Konsultan & Pelatihan Standar, Mutu, dan Pengembangan Bisnis",
    intro: "Standara Consulting hadir sebagai layanan konsultasi, pelatihan, dan pendampingan profesional yang membantu organisasi, UMKM, IKM, koperasi, LPK, hingga industri dalam meningkatkan tata kelola bisnis yang lebih profesional, terstruktur, dan berkelanjutan. 💼\n\nSebagai Affiliate Partner, kamu akan mendapatkan:\n✅ Peluang komisi menarik dari setiap proyek konsultasi B2B\n✅ Kode Referral Affiliate Khusus\n✅ Dukungan tim konsultan senior untuk presentasi ke prospek\n✅ Membantu industri lokal berkembang & terstandardisasi\n✅ Sistem tracking & pelaporan komisi transparan",
    packages: [
      {
        name: "🥉 Paket Basic Business Improvement",
        price: "Menyesuaikan",
        discount: "Sesuai Proyek",
        commission: "Komisi Menarik / Closing",
        suitableFor: "Cocok untuk UMKM, usaha rintisan, dan koperasi yang ingin mulai membangun sistem bisnis yang lebih rapi dan profesional.",
        services: [
          "Konsultasi bisnis dasar",
          "Penyusunan SOP sederhana",
          "Evaluasi tata kelola usaha",
          "Pelatihan dasar manajemen bisnis",
          "Pendampingan branding & pemasaran dasar",
          "Monitoring dan evaluasi usaha",
        ],
        goal: "Membantu bisnis lebih tertata, produktif, dan siap berkembang.",
      },
      {
        name: "🥈 Paket Standard Growth Business",
        price: "Menyesuaikan",
        discount: "Sesuai Proyek",
        commission: "Komisi Menarik / Closing",
        suitableFor: "Cocok untuk UMKM, IKM, LPK, dan koperasi yang ingin meningkatkan performa bisnis dan pendapatan.",
        services: [
          "Penyusunan SOP & sistem kerja",
          "Pelatihan SDM dan produktivitas",
          "Penyusunan KPI sederhana",
          "Konsultasi pemasaran & pengembangan pasar",
          "Pendampingan legalitas & administrasi bisnis",
          "Business coaching dan mentoring",
          "Pendampingan peningkatan omzet usaha",
        ],
        goal: "Meningkatkan efektivitas operasional, kualitas SDM, serta pertumbuhan bisnis dan pendapatan.",
      },
      {
        name: "🥇 Paket Professional Management System",
        price: "Menyesuaikan",
        discount: "Sesuai Proyek",
        commission: "Komisi Menarik / Closing",
        suitableFor: "Cocok untuk perusahaan, lembaga, dan industri yang ingin memiliki sistem kerja profesional dan siap bersaing.",
        services: [
          "Implementasi sistem manajemen mutu",
          "Penyusunan SOP lengkap",
          "Audit internal & evaluasi kinerja",
          "Pelatihan leadership & management",
          "Penyusunan KPI perusahaan",
          "Konsultasi efisiensi operasional",
          "Pendampingan pengembangan organisasi",
          "Persiapan sertifikasi atau akreditasi",
        ],
        goal: "Membantu organisasi memiliki tata kelola yang profesional, efisien, dan berdaya saing tinggi.",
      },
      {
        name: "🤝 Paket Business Expansion & Partnership",
        price: "Menyesuaikan",
        discount: "Sesuai Proyek",
        commission: "Komisi Menarik / Closing",
        suitableFor: "Cocok untuk bisnis yang ingin memperluas jaringan pasar dan mendapatkan peluang kolaborasi strategis.",
        services: [
          "Business matching dengan mitra potensial",
          "Pendampingan kerja sama bisnis",
          "Pengembangan strategi kemitraan",
          "Konsultasi branding & positioning",
          "Penyusunan proposal kerja sama",
          "Pengembangan jaringan industri & komunitas",
          "Pendampingan akses program CSR & kolaborasi",
        ],
        goal: "Membantu bisnis memperluas relasi, pasar, dan peluang pertumbuhan usaha.",
      },
      {
        name: "🚀 Paket Integrated Business Transformation",
        price: "Menyesuaikan",
        discount: "Sesuai Proyek",
        commission: "Komisi Menarik / Closing",
        suitableFor: "Paket pendampingan lengkap dan menyeluruh untuk meningkatkan tata kelola, produktivitas, dan pertumbuhan bisnis secara berkelanjutan.",
        services: [
          "Analisa kebutuhan dan kondisi bisnis",
          "Penyusunan sistem manajemen & SOP",
          "Pelatihan SDM dan leadership",
          "Pendampingan produktivitas dan efisiensi bisnis",
          "Penyusunan KPI dan monitoring kinerja",
          "Pendampingan branding & pemasaran",
          "Konsultasi pengembangan usaha",
          "Business matching dan kemitraan strategis",
          "Evaluasi perkembangan bisnis berkala",
        ],
        goal: "Membantu organisasi dan pelaku usaha meningkatkan kualitas tata kelola, pertumbuhan pendapatan, serta memperluas pasar dan ekosistem bisnis.",
      },
    ],
    whyInteresting: [
      "Layanan B2B premium dengan nilai kontrak tinggi",
      "Kebutuhan krusial bagi UMKM & industri (sertifikasi & standardisasi)",
      "Didukung oleh portofolio industri nasional (Mitsubishi Chemical, Krakatau Steel, dsb.)",
      "Materi promosi & support konsultasi disediakan penuh",
      "Skema bagi hasil komisi yang sangat prospektif",
    ],
    targetMarket: ["🏪 Pemilik UMKM & IKM", "👥 Pengurus Koperasi", "🏢 Pengelola LPK / Sekolah", "🏭 Manajemen Pabrik / Industri", "📈 Pelaku Bisnis Menengah-Atas"],
    disclaimer: "Biaya dan skema proyek disesuaikan secara khusus berdasarkan analisis skala bisnis dan kebutuhan operasional perusahaan. Komisi kemitraan dihitung secara persentase/nilai tetap yang disepakati untuk setiap kontrak kerja sama valid yang berhasil ditandatangani.",
    consultWa: "https://wa.me/628138298543",
  },
};

const products = [
  {
    name: "LP Academic Partner",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: GraduationCap,
    desc: "Program pendampingan dan akselerasi akademik premium bagi mahasiswa dan akademisi.",
    url: "https://www.linkproductive.com/services/lp-academic-partner/affiliate-lp-academic-partner",
  },
  {
    name: "LP Career Ready",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Award,
    desc: "Program bimbingan karier profesional, optimasi CV/LinkedIn, dan simulasi interview kerja.",
    url: "https://www.linkproductive.com/services/lp-career-ready/affiliate-lp-career-ready",
  },
  {
    name: "LP Entrepreneur Launchpad",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: TrendingUp,
    desc: "Bootcamp intensif inkubasi ide bisnis baru dan penyusunan proposal bisnis profesional.",
    url: "https://www.linkproductive.com/services/lp-business-planning-bootcamp/affiliate-lp-business-planning-bootcamp",
  },
  {
    name: "Bisapreneur Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Building,
    desc: "Edukasi & pendampingan tata kelola serta digitalisasi bisnis untuk UMKM dan Koperasi.",
    url: "https://www.linkproductive.com/services/sekolah-bisnis-koperasi-umkm/affiliate-sekolah-bisnis-koperasi-umkm",
  },
  {
    name: "Baristara Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Coffee,
    desc: "Sekolah barista terlengkap untuk menguasai teknik pembuatan kopi dan manajemen bisnis kedai kopi.",
    url: "https://www.linkproductive.com/services/sekolah-barista-bisnis-kopi/affiliate-sekolah-barista-bisnis-kopi",
  },
  {
    name: "Cuan Creator Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: MonitorPlay,
    desc: "Pusat belajar digital marketing, optimalisasi sosial media, dan keahlian content creation.",
    url: "https://www.linkproductive.com/services/sekolah-digital-marketing/affiliate-sekolah-digital-marketing",
  },
  {
    name: "Tekno AI Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Presentation,
    desc: "Sekolah coding terintegrasi dengan implementasi teknologi kecerdasan buatan (AI) untuk bisnis.",
    url: "https://www.linkproductive.com/services/sekolah-coding-ai-business/affiliate-sekolah-coding-ai-business",
  },
  {
    name: "Mental Bahasa Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Users,
    desc: "Program integrasi kelas bahasa asing premium dengan pendampingan kesehatan mental terarah.",
    url: "https://www.linkproductive.com/services/sekolah-bahasa-mental-health/affiliate-sekolah-bahasa-mental-health",
  },
  {
    name: "Green Productive Academy",
    fee: "Sesuai Ketentuan",
    unit: "pendaftaran",
    icon: Recycle,
    desc: "Program edukasi dan akselerator produk inovatif berbasis kelestarian lingkungan hidup.",
    url: "https://sites.google.com/view/link-productive/services/sekolah-teknologi-hijau/affiliate-sekolah-teknologi-hijau",
  },
  {
    name: "Brand Siap",
    fee: "Sesuai Ketentuan",
    unit: "paket",
    icon: ShoppingBag,
    desc: "Layanan super cepat pembuatan identitas visual, logo, kemasan produk, dan kesiapan branding usaha.",
    url: "https://sites.google.com/view/link-productive/services/brand-siap/affiliate-brand-siap",
  },
  {
    name: "Snapp Frame",
    fee: "Rp3.500",
    unit: "foto",
    icon: Camera,
    desc: "Layanan fotografi studio modern, foto portrait, cetak kilat, dan dokumentasi visual premium.",
    url: "https://www.linkproductive.com/marketplace/snapp-frame/affiliate-snapp-frame",
  },
  {
    name: "Standara Consulting",
    fee: "Sesuai Ketentuan",
    unit: "layanan",
    icon: Handshake,
    desc: "Konsultasi profesional penyusunan SOP standardisasi bisnis, legalitas usaha, dan sertifikasi.",
    url: "https://www.linkproductive.com/services/standara-consulting",
  },
  {
    name: "Rata Coffee",
    fee: "Rp1.000",
    unit: "gelas",
    icon: Coffee,
    desc: "Varian kopi susu kekinian berkualitas tinggi dengan racikan barista berpengalaman.",
    url: "",
  },
];

const discountData = [
  { name: "LP Academic Partner", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "LP Career Ready", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "LP Entrepreneur Launchpad", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Bisapreneur Academy", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Baristara Academy", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Cuan Creator Academy", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Tekno AI Academy", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Mental Bahasa Academy", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Green Productive Academy", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Standara Consulting", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Brand Siap", maxDiscount: "Menyesuaikan", fee: "Komisi Menarik" },
  { name: "Snapp Frame", maxDiscount: "Rp5.000", fee: "Rp3.500" },
  { name: "Rata Coffee", maxDiscount: "Rp2.000", fee: "Rp1.000" },
];

const fallbackPosts = [
  {
    id: "fb-1",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    caption: "Keseruan photobooth Snapp.frame di acara Rata Coffee! 📸 Temen-temen seneng banget bisa langsung cetak foto strip kece dengan warna sepia khas kita. Buruan share kode referral-mu biar temen-temen dapet diskon dan kamu dapet cuan!",
    hashtags: ["snappframe", "ratacoffee", "photoboothhits", "cuanbareng"],
    likeCount: 142,
    postedBy: "Snapp.frame Studio",
    category: "kegiatan",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "fb-2",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop",
    caption: "Affiliate Partners Gathering #1! 🤝 Tempat di mana kita bertukar ide, sharing tips cara promosi kreatif di Instagram & Tiktok, dan tentunya ngerayain bonus pencapaian bulanan. Ingin gabung komunitas seru ini? Daftar gratis sekarang!",
    hashtags: ["snappframe", "affiliatepartner", "gatheringseru", "belajardigital"],
    likeCount: 98,
    postedBy: "Snapp.frame Studio",
    category: "kegiatan",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
  },
  {
    id: "fb-3",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    caption: "📢 PROMO BUNDLING SPESIAL KELOMPOK! Buat kalian yang mau foto grup bareng sahabat, gunakan kode referral dari affiliate partner kami untuk mendapatkan potongan langsung Rp20.000 + cetakan tambahan gratis!",
    hashtags: ["promostudio", "fotogrup", "graduationphoto", "diskonspesial"],
    likeCount: 215,
    postedBy: "Marketing Snapp.frame",
    category: "promo",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    instagram: "",
    tiktok: "",
    occupation: "",
    city: "",
    motivation: "",
    experience: "",
  });

  const occupations = [
    { value: "pelajar", label: "Pelajar / Siswa" },
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "karyawan", label: "Karyawan / Pegawai" },
    { value: "freelancer", label: "Freelancer" },
    { value: "wirausaha", label: "Wirausaha / Pebisnis" },
    { value: "konten_kreator", label: "Konten Kreator" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const set = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Nama, email, nomor WhatsApp, dan kata sandi wajib diisi.");
      return;
    }
    if (form.password.length < 6) {
      setError("Kata sandi harus minimal 6 karakter.");
      return;
    }
    setError("");
    setLoading(true);

    const { submitAffiliateApplication } = await import("@/app/actions/affiliate-applications");
    const res = await submitAffiliateApplication(form);

    setLoading(false);
    if (res.success) {
      setStep("success");
    } else {
      setError(res.error ?? "Terjadi kesalahan. Coba lagi.");
    }
  };

  const inputCls = "w-full px-4 py-3 bg-white border border-near-black/10 rounded-xl text-xs font-bold text-near-black focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all placeholder:text-near-black/30";
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
        className="relative w-full sm:max-w-lg bg-warm-white rounded-t-3xl sm:rounded-3xl border border-near-black/10 overflow-hidden shadow-2xl text-near-black flex flex-col"
        style={{ maxHeight: "92vh" }}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center px-6 pt-6 pb-4 border-b border-near-black/5">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-near-black">
              Formulir Pendaftaran Affiliate
            </h3>
            <p className="text-[10px] text-near-black/40 font-bold mt-0.5">
              Isi data diri kamu untuk bergabung sebagai partner
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-near-black/5 flex items-center justify-center text-near-black/40 hover:text-near-black transition-all">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {step === "success" ? (
            /* ── Success Screen ── */
            <div className="flex flex-col items-center justify-center gap-5 px-8 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <CheckCircle2 size={36} className="text-emerald-500" />
              </div>
              <div>
                <h4 className="text-lg font-black text-near-black mb-2">Pendaftaran Berhasil! 🎉</h4>
                <p className="text-xs text-near-black/60 font-bold leading-relaxed max-w-xs">
                  Data kamu sudah kami terima. Tim kami akan menghubungi kamu via WhatsApp dalam 1×24 jam untuk proses selanjutnya.
                </p>
              </div>
              <div className="bg-gold/10 border border-gold/20 rounded-2xl p-4 w-full text-left">
                <p className="text-[10px] font-black uppercase tracking-wider text-gold mb-2">Info Selanjutnya</p>
                <ul className="space-y-1.5">
                  {[
                    "Verifikasi data oleh tim kami",
                    "Kamu akan menerima kode referral pribadi",
                    "Akses materi promosi & dukungan tim",
                  ].map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-near-black/70">
                      <CheckCircle2 size={12} className="text-gold flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-near-black/10 text-near-black/50 rounded-xl text-xs font-black uppercase tracking-wider hover:border-near-black/20 transition-all"
                >
                  Tutup
                </button>
                <a
                  href={`https://wa.me/6287778059221?text=${encodeURIComponent(`Halo Snapp.frame! Saya ${form.name} baru saja mendaftar sebagai affiliate partner. Mohon informasi lebih lanjut.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-[2] flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  <MessageCircle size={14} />
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            /* ── Form ── */
            <div className="space-y-4 px-6 py-5">
              {/* Section: Data Diri */}
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gold">Data Diri</p>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className={labelCls}>Nama Lengkap <span className="text-rose-400">*</span></label>
                  <input type="text" placeholder="Masukkan nama lengkap" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email <span className="text-rose-400">*</span></label>
                  <input type="email" placeholder="nama@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>No. WhatsApp <span className="text-rose-400">*</span></label>
                  <input type="tel" placeholder="081234567890" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Kata Sandi Akun <span className="text-rose-400">*</span></label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter untuk masuk dashboard"
                      value={form.password}
                      onChange={(e) => set("password", e.target.value)}
                      className={inputCls + " pr-10"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-near-black/30 hover:text-near-black cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Kota / Domisili</label>
                    <input type="text" placeholder="Contoh: Cilegon" value={form.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pekerjaan</label>
                    <select value={form.occupation} onChange={(e) => set("occupation", e.target.value)} className={inputCls + " cursor-pointer"}>
                      <option value="">Pilih pekerjaan</option>
                      {occupations.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Media Sosial */}
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gold pt-2">Media Sosial</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Instagram</label>
                  <input type="text" placeholder="@username" value={form.instagram} onChange={(e) => set("instagram", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>TikTok</label>
                  <input type="text" placeholder="@username" value={form.tiktok} onChange={(e) => set("tiktok", e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* Section: Motivasi */}
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gold pt-2">Latar Belakang</p>
              <div>
                <label className={labelCls}>Mengapa ingin bergabung?</label>
                <textarea
                  placeholder="Ceritakan alasanmu ingin menjadi affiliate partner Snapp.frame..."
                  value={form.motivation}
                  onChange={(e) => set("motivation", e.target.value)}
                  rows={3}
                  className={inputCls + " resize-none"}
                />
              </div>
              <div>
                <label className={labelCls}>Pengalaman promosi / marketing (jika ada)</label>
                <textarea
                  placeholder="Contoh: pernah jadi reseller, konten kreator, atau endorser..."
                  value={form.experience}
                  onChange={(e) => set("experience", e.target.value)}
                  rows={2}
                  className={inputCls + " resize-none"}
                />
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
              disabled={loading || !form.name || !form.email || !form.phone || !form.password}
              className="w-full py-3.5 bg-near-black hover:bg-near-black/90 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-near-black/10 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ArrowRight size={14} />
                  Daftar Sekarang — Gratis!
                </>
              )}
            </button>
            <p className="text-[9px] text-near-black/30 font-bold text-center mt-3">
              Dengan mendaftar, kamu menyetujui syarat & ketentuan program affiliate Snapp.frame.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────
function AffiliateDetailModal({
  product,
  onClose,
  onRegister,
}: {
  product: (typeof products)[0];
  onClose: () => void;
  onRegister: () => void;
}) {
  const detail = affiliateDetails[product.name];
  const ProgramIcon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-near-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-near-black rounded-t-[2rem] sm:rounded-[2rem] border border-white/10 flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-white/10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                <ProgramIcon size={20} />
              </div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-wide leading-tight">{product.name}</h2>
                {detail && <p className="text-[10px] text-white/40 font-bold mt-0.5">{detail.subtitle}</p>}
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/40 hover:text-red-400 transition-all flex-shrink-0"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {detail ? (
            <>
              {/* Intro */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[11px] text-white/70 leading-relaxed whitespace-pre-line">{detail.intro}</p>
              </div>

              {/* Packages */}
              <div>
                <h3 className="text-[10px] font-black text-gold uppercase tracking-widest mb-3">📦 Detail Program & Komisi</h3>
                <div className="space-y-3">
                  {detail.packages.map((pkg, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-[11px] font-black text-white mb-3">{pkg.name}</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/5 rounded-lg p-2 text-center">
                          <p className="text-[8px] text-white/40 font-bold uppercase mb-1">Harga Normal</p>
                          <p className="text-[10px] font-black text-white/60 line-through">{pkg.price}</p>
                        </div>
                        <div className="bg-gold/10 border border-gold/20 rounded-lg p-2 text-center">
                          <p className="text-[8px] text-gold font-bold uppercase mb-1">Diskon Customer</p>
                          <p className="text-[10px] font-black text-gold">{pkg.discount}</p>
                          {pkg.afterDiscount && (
                            <p className="text-[9px] text-white/60 font-bold mt-0.5">→ {pkg.afterDiscount}</p>
                          )}
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 text-center">
                          <p className="text-[8px] text-emerald-400 font-bold uppercase mb-1">Komisi Affiliate</p>
                          <p className="text-[10px] font-black text-emerald-400">{pkg.commission}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Interesting */}
              <div>
                <h3 className="text-[10px] font-black text-gold uppercase tracking-widest mb-3">🎯 Kenapa Program Ini Menarik?</h3>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2">
                  {detail.whyInteresting.map((reason, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] text-white/70 font-medium">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Market */}
              <div>
                <h3 className="text-[10px] font-black text-gold uppercase tracking-widest mb-3">💼 Cocok Untuk</h3>
                <div className="flex flex-wrap gap-2">
                  {detail.targetMarket.map((target, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60 font-bold">
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4">
                <p className="text-[9px] text-amber-400/80 font-bold uppercase tracking-widest mb-2">📢 Info Penting</p>
                <p className="text-[10px] text-white/50 leading-relaxed">{detail.disclaimer}</p>
              </div>
            </>
          ) : (
            <p className="text-white/40 text-sm text-center py-8">Detail program belum tersedia.</p>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/10 flex gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
          >
            <ArrowLeft size={12} />
            Kembali
          </button>
          <button
            onClick={() => { onClose(); onRegister(); }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold/90 text-near-black text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/20"
          >
            Daftar Affiliate Sekarang
            <ArrowRight size={12} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
      {/* Images Slider Container */}
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

      {/* Navigation Arrows */}
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

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
            {urls.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  const dir = idx > currentIndex ? 1 : -1;
                  setPage([idx, dir]);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-gold w-3" : "bg-white/40 hover:bg-white/70"
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
  "snapp-frame": "Snapp Frame",
  "standara-consulting": "Standara Consulting",
};

const generatePromoText = (progName: string, refCode: string) => {
  const codeText = refCode ? `@${refCode.trim().replace("@", "")}` : "[KODE_REFERRAL_KAMU]";
  const origin = typeof window !== "undefined" ? window.location.origin : "https://snappframe.id";
  const slug = Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === progName) || "";
  const linkText = refCode
    ? `${origin}/affiliate?ref=${refCode.trim().replace("@", "")}&pkg=${slug}`
    : `${origin}/affiliate?pkg=${slug}`;

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

// ─── MAIN PAGE CONTENT ────────────────────────────────────────────────────────
function AffiliateContent() {
  const [activeProduct, setActiveProduct] = useState<(typeof products)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"semua" | "kegiatan" | "promo">("semua");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [expandedPkg, setExpandedPkg] = useState<number | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-open detailed program modal if pkg is passed in URL
  useEffect(() => {
    const pkg = searchParams.get("pkg");
    if (pkg) {
      const targetName = pkgSlugMap[pkg.toLowerCase()];
      if (targetName) {
        const found = products.find((p) => p.name === targetName);
        if (found) {
          setActiveProduct(found);
        }
      }
    }
  }, [searchParams]);

  // Reset expanded package when active product changes
  useEffect(() => {
    setExpandedPkg(null);
  }, [activeProduct]);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const [postsRes, settingsRes] = await Promise.all([
          getAffiliatePosts(),
          getSiteSettings()
        ]);

        if (settingsRes) {
          setSettings(settingsRes);
        }

        if (postsRes.success && postsRes.data && postsRes.data.length > 0) {
          const published = postsRes.data.filter((p: any) => p.isPublished);
          const formatted = published.map((p: any) => {
            let category = "promo";
            const tagsLower = (p.hashtags || []).map((t: string) => t.toLowerCase());
            if (
              tagsLower.includes("kegiatan") ||
              tagsLower.includes("gathering") ||
              tagsLower.includes("event") ||
              p.caption.toLowerCase().includes("gathering") ||
              p.caption.toLowerCase().includes("kegiatan") ||
              p.caption.toLowerCase().includes("keseruan")
            ) {
              category = "kegiatan";
            }
            return {
              ...p,
              category,
            };
          });
          setPosts(formatted);
        } else {
          setPosts(fallbackPosts);
        }
      } catch (err) {
        console.error("Gagal memuat affiliate data:", err);
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchPageData();
  }, []);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId];
      setPosts((currentPosts) =>
        currentPosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              likeCount: isLiked ? p.likeCount + 1 : p.likeCount - 1,
            };
          }
          return p;
        })
      );
      return { ...prev, [postId]: isLiked };
    });
  };

  const handleCopyCaption = (post: any) => {
    const fullText = `${post.caption}\n\n${(post.hashtags || []).map((h: string) => `#${h}`).join(" ")}`;
    navigator.clipboard.writeText(fullText);
    setCopiedPostId(post.id);
    toast.success("Caption & Hashtags berhasil disalin!");
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };

  const handleShare = (post: any) => {
    const text = encodeURIComponent(
      `Yuk gabung Snapp.frame Affiliate! Lihat materi promosi ini:\n\n"${post.caption}"`
    );
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  };

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "semua") return true;
    return post.category === activeFilter;
  });

  return (
    <>
      {/* Register Modal (popup) */}
      <AnimatePresence>
        {showModal && <RegisterModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {/* FULL PAGE DETAIL VIEW */}
      <AnimatePresence>
        {activeProduct && (
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
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-black text-[11px] uppercase tracking-widest"
              >
                <ArrowLeft size={16} />
                Kembali ke Daftar Program
              </button>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 pb-24">
              {/* Program Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                  <activeProduct.icon size={26} />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide leading-tight">{activeProduct.name}</h1>
                  {affiliateDetails[activeProduct.name] && (
                    <p className="text-[11px] text-white/40 font-bold mt-1">{affiliateDetails[activeProduct.name].subtitle}</p>
                  )}
                </div>
              </div>

              {/* Poster */}
              {(() => {
                const posterKey = POSTER_KEYS[activeProduct.name];
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

              {affiliateDetails[activeProduct.name] ? (
                <div className="space-y-8">
                  {/* Intro */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <p className="text-[13px] text-white/75 leading-relaxed whitespace-pre-line">{affiliateDetails[activeProduct.name].intro}</p>
                  </div>

                  {/* Packages */}
                  <div>
                    <h2 className="text-[11px] font-black text-gold uppercase tracking-widest mb-4">📦 Detail Program & Komisi</h2>
                    <div className="space-y-4">
                      {affiliateDetails[activeProduct.name].packages.map((pkg, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                          <p className="text-[13px] font-black text-white mb-4">{pkg.name}</p>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/5 rounded-xl p-3 text-center">
                              <p className="text-[9px] text-white/40 font-bold uppercase mb-1">Harga Normal</p>
                              <p className="text-[11px] font-black text-white/60 line-through">{pkg.price}</p>
                            </div>
                            <div className="bg-gold/10 border border-gold/20 rounded-xl p-3 text-center">
                              <p className="text-[9px] text-gold font-bold uppercase mb-1">Diskon Customer</p>
                              <p className="text-[11px] font-black text-gold">{pkg.discount}</p>
                              {pkg.afterDiscount && <p className="text-[10px] text-white/60 font-bold mt-0.5">→ {pkg.afterDiscount}</p>}
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                              <p className="text-[9px] text-emerald-400 font-bold uppercase mb-1">Komisi Affiliate</p>
                              <p className="text-[11px] font-black text-emerald-400">{pkg.commission}</p>
                            </div>
                          </div>
                          {/* Per-package accordion — Lihat Detail (content built within snapp.frame) */}
                          {(pkg.services || pkg.suitableFor) && (
                            <>
                              <button
                                onClick={() => setExpandedPkg(expandedPkg === i ? null : i)}
                                className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 text-white/60 hover:text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                              >
                                {expandedPkg === i ? "Tutup Detail" : "Lihat Detail"}
                                <ChevronDown
                                  size={12}
                                  className={`transition-transform duration-300 ${expandedPkg === i ? "rotate-180" : ""}`}
                                />
                              </button>
                              <AnimatePresence>
                                {expandedPkg === i && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-3 space-y-3 border-t border-white/10 pt-4">
                                      {pkg.suitableFor && (
                                        <p className="text-[11px] text-white/50 italic leading-relaxed">{pkg.suitableFor}</p>
                                      )}
                                      {pkg.services && pkg.services.length > 0 && (
                                        <div>
                                          <p className="text-[9px] text-gold font-black uppercase tracking-widest mb-2">Layanan dalam Paket</p>
                                          <ul className="space-y-1.5">
                                            {pkg.services.map((svc, si) => (
                                              <li key={si} className="flex items-start gap-2">
                                                <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-[11px] text-white/60 font-medium">{svc}</span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                      {pkg.goal && (
                                        <div className="bg-gold/5 border border-gold/20 rounded-xl p-3">
                                          <p className="text-[9px] text-gold font-black uppercase tracking-widest mb-1">Tujuan</p>
                                          <p className="text-[11px] text-white/60 font-medium leading-relaxed">{pkg.goal}</p>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Interesting */}
                  <div>
                    <h2 className="text-[11px] font-black text-gold uppercase tracking-widest mb-4">🎯 Kenapa Program Ini Menarik?</h2>
                    <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-3">
                      {affiliateDetails[activeProduct.name].whyInteresting.map((reason, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={14} className="text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-[13px] text-white/70 font-medium">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Market */}
                  <div>
                    <h2 className="text-[11px] font-black text-gold uppercase tracking-widest mb-4">💼 Cocok Untuk</h2>
                    <div className="flex flex-wrap gap-2">
                      {affiliateDetails[activeProduct.name].targetMarket.map((target, i) => (
                        <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/60 font-bold">
                          {target}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                    <p className="text-[10px] text-amber-400/80 font-bold uppercase tracking-widest mb-2">📢 Info Penting</p>
                    <p className="text-[12px] text-white/50 leading-relaxed">{affiliateDetails[activeProduct.name].disclaimer}</p>
                  </div>

                  {/* Konsultasi Lebih Lanjut — WhatsApp CTA (matches linkproductive.com) */}
                  {affiliateDetails[activeProduct.name].consultWa && (
                    <a
                      href={affiliateDetails[activeProduct.name].consultWa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <MessageCircle size={16} />
                      Konsultasi Lebih Lanjut
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-white/40 text-sm text-center py-16">Detail program belum tersedia.</p>
              )}

              {/* Bottom CTA */}
              <div className="mt-12">
                {activeProduct.name === "Snapp Frame" ? (
                  <a
                    href="/booking"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold hover:bg-gold/90 text-near-black text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-gold/20"
                  >
                    Booking Sesi Foto Sekarang
                    <Camera size={14} />
                  </a>
                ) : (
                  <a
                    href={`/daftar-pelatihan?pkg=${Object.keys(pkgSlugMap).find(key => pkgSlugMap[key] === activeProduct.name) || ""
                      }`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#C4956A] hover:bg-[#B07D52] text-white text-[11px] font-black uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#C4956A]/30"
                  >
                    Ikut / Daftar Pelatihan
                    <GraduationCap size={14} />
                  </a>
                )}
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
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
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

      <main className="min-h-screen bg-warm-white overflow-x-hidden w-full">

        {/* ── Hero ── */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-near-black text-white border-b border-near-black/5 w-full">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gold/20 border border-gold/40">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.2em] text-gold uppercase">Lowongan Kerja</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                Affiliate <br /><span className="text-gold">Partner</span>
              </h1>
              <p className="text-white/80 text-lg font-bold max-w-xl leading-relaxed mb-8">
                Bergabunglah bersama <span className="text-gold">Snapp.frame Studio</span> dan dapatkan penghasilan jutaan rupiah setiap bulan!
              </p>
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-white/60 font-black uppercase tracking-wider">Contoh Sukses</span>
                  <span className="text-sm font-bold text-white/90">Penghasilan per bulan hingga</span>
                  <span className="text-2xl font-black text-gold">Rp10.000.000</span>
                </div>
              </div>
              <div>
                <a
                  href="#program-affiliate"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-near-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gold/30"
                >
                  Lihat Program Affiliate
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            <div className="w-full md:w-[380px] grid grid-cols-2 gap-4">
              {[
                { icon: Handshake, title: "Kerja Fleksibel", desc: "Kapan saja, di mana saja" },
                { icon: BadgeDollarSign, title: "Penghasilan", desc: "Tanpa batas, makin banyak makin cuan!" },
                { icon: TrendingUp, title: "Pengembangan Diri", desc: "Bangun relasi & skill marketing" },
                { icon: Award, title: "Sertifikat Partner", desc: "Sertifikat resmi dari Snapp.frame" },
              ].map((f, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-3"><f.icon size={22} /></div>
                  <h3 className="font-black text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-[10px] text-white/60 font-bold leading-tight">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Products Grid ── */}
        <section id="program-affiliate" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-near-black uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Pilihan Layanan & <span className="text-gold">Program Affiliate</span>
              </h2>
              <p className="text-near-black/50 font-bold max-w-xl mx-auto text-sm">
                Klik <span className="text-gold font-black">Lihat Detail</span> pada program untuk melihat informasi lengkap, paket, & komisi affiliate.
              </p>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-[#F8F6F4]/50 p-4 rounded-3xl border border-near-black/5">
              <div className="text-xs font-black uppercase tracking-widest text-[#3B2211]/50 pl-2">
                Daftar Program ({filteredProducts.length})
              </div>
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-near-black/30" size={16} />
                <input
                  type="text"
                  placeholder="Cari layanan atau program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-white border border-near-black/10 rounded-2xl text-xs font-bold text-near-black focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all shadow-sm"
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
                  Tidak ada program partner ditemukan
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
                      className="group p-6 rounded-[2rem] border border-near-black/5 bg-warm-white/30 hover:bg-white hover:border-gold/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                            <prod.icon size={22} />
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${prod.url
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-near-black/5 text-near-black/40"
                            }`}>
                            {prod.url ? "Link Aktif" : "Segera Hadir"}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-near-black uppercase mb-2 tracking-wide line-clamp-1">{prod.name}</h3>
                        <p className="text-[11px] text-near-black/60 font-medium leading-relaxed mb-6 line-clamp-3">{prod.desc}</p>
                      </div>

                      {/* Poster Image Carousel */}
                      <ProgramPosterCarousel urls={posterUrls} productName={prod.name} />

                      <div className="pt-4 border-t border-near-black/5 flex items-center justify-between gap-4 mt-auto">
                        <div>
                          <span className="block text-[8px] text-near-black/40 font-black uppercase tracking-wider mb-0.5">ESTIMASI FEE</span>
                          <span className="block text-xs font-black text-gold uppercase">{prod.fee}</span>
                        </div>
                        {prod.url ? (
                          <button
                            id={`affiliate-btn-${i}`}
                            onClick={() => setActiveProduct(prod)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-near-black text-near-black hover:text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-gold/10"
                          >
                            Lihat Detail
                            <ChevronRight size={12} />
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-near-black/5 text-near-black/30 text-[10px] font-black uppercase tracking-wider rounded-xl cursor-default">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* ── Discount Table ── */}
        <section className="py-20 bg-near-black text-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-[#122e4d] rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold via-yellow-300 to-gold" />
              <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <div className="w-20 h-20 flex-shrink-0 bg-gold rounded-full flex flex-col items-center justify-center text-near-black rotate-[-12deg] shadow-lg">
                  <Gift size={28} />
                  <span className="text-[8px] font-black uppercase mt-0.5 text-center leading-tight">Special<br />Discount</span>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-white mb-2 uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                    Affiliate Partner Dapat Memberikan <span className="text-gold">Discount</span> Kepada Customer!
                  </h2>
                  <p className="text-white/70 text-sm font-bold">Discount khusus sesuai ketentuan — fee affiliate tetap diterima penuh.</p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-white/5 text-[10px] text-white/90 font-black uppercase tracking-wider border-b border-white/10">
                      <th className="px-6 py-4">Produk / Jasa</th>
                      <th className="px-6 py-4 text-center">Maks. Discount<br /><span className="text-gold/70 font-normal text-[8px]">(untuk customer)</span></th>
                      <th className="px-6 py-4 text-center">Fee Affiliate<br /><span className="text-white/40 font-normal text-[8px]">(tetap diterima)</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {discountData.map((item, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-3 font-bold text-white/90">{item.name}</td>
                        <td className="px-6 py-3 text-center text-gold font-black">{item.maxDiscount}</td>
                        <td className="px-6 py-3 text-center text-white font-bold">{item.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center gap-4 mt-8 bg-white/5 rounded-xl p-6 border border-white/10">
                <span className="text-[10px] text-white/50 font-bold uppercase">Contoh Cara Kerja:</span>
                <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-3 justify-center w-full">
                  <div className="bg-white/10 px-4 py-2 rounded-lg text-center">
                    <span className="block text-[9px] text-white/60">Harga Normal</span>
                    <span className="block text-sm font-bold line-through text-white/40">Rp99.000</span>
                  </div>
                  <ChevronRight className="text-gold/40 hidden sm:block" size={16} />
                  <div className="bg-gold/20 border border-gold/30 px-4 py-2 rounded-lg text-center">
                    <span className="block text-[9px] text-gold">Kode Referral</span>
                    <span className="block text-sm font-black text-gold">NAMA10</span>
                    <span className="block text-[9px] text-white/70">Diskon Rp10.000</span>
                  </div>
                  <ChevronRight className="text-gold/40 hidden sm:block" size={16} />
                  <div className="bg-white/10 px-4 py-2 rounded-lg text-center">
                    <span className="block text-[9px] text-white/60">Customer Bayar</span>
                    <span className="block text-sm font-black text-white">Rp89.000</span>
                  </div>
                  <ChevronRight className="text-gold/40 hidden sm:block" size={16} />
                  <div className="col-span-2 sm:col-span-1 bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-center">
                    <span className="block text-[9px] text-green-400">Affiliate Dapat</span>
                    <span className="block text-sm font-black text-green-400">Rp10.000 ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Daftar Affiliate ── */}
        <section className="bg-near-black text-white py-16 border-t-4 border-gold">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                Yuk, Gabung <span className="text-gold">Sekarang!</span>
              </h2>
              <p className="text-white/70 font-bold mb-8 max-w-md">Bangun penghasilan, relasi, dan masa depan bersama Snapp.frame Studio!</p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-near-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gold/30"
              >
                Daftar Gratis! <ArrowRight size={18} />
              </button>
            </div>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-8 w-full">
              <div className="text-center mb-6">
                <span className="bg-gold text-near-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Cara Bergabung</span>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-between gap-4 sm:gap-2">
                {["Daftar via WhatsApp", "Dapatkan kode referral", "Promosikan produk", "Dapat komisi!"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center flex-1 relative">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-black text-gold mb-3 text-lg">{i + 1}</div>
                    <span className="text-[10px] font-bold text-white/80 max-w-[90px]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Galeri Kegiatan & Materi Promosi ── */}
        <section className="py-20 bg-warm-light/40 border-y border-border/40">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                <Sparkles size={12} className="animate-pulse" />
                <span>Galeri & Bahan Promosi</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-near-black uppercase tracking-wider mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Galeri Kegiatan <span className="text-gold">& Materi</span>
              </h2>
              <p className="text-near-black/60 text-sm font-bold max-w-xl leading-relaxed text-center">
                Lihat keseruan event kami atau langsung salin materi promosi (foto & caption) di bawah ini untuk dibagikan ke media sosial Anda!
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
              {[
                { id: "semua", label: "Semua Materi" },
                { id: "kegiatan", label: "Kegiatan Studio" },
                { id: "promo", label: "Materi Promo" },
              ].map((tabItem) => (
                <button
                  key={tabItem.id}
                  onClick={() => setActiveFilter(tabItem.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${activeFilter === tabItem.id
                      ? "bg-near-black text-white border-near-black shadow-md scale-[1.02]"
                      : "bg-white text-near-black/60 border-near-black/10 hover:border-near-black/20 hover:text-near-black"
                    }`}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>

            {/* Grid Materi Promosi */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-near-black/40 font-bold uppercase tracking-widest text-xs">
                Tidak ada materi promosi ditemukan
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => {
                  const isLiked = likedPosts[post.id];
                  const isCopied = copiedPostId === post.id;
                  const formattedDate = post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    : "";

                  return (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl border border-border/30 shadow-sm hover:shadow-xl hover:shadow-near-black/5 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Header Card */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-warm-white">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-near-black flex items-center justify-center text-white font-black text-xs shadow-sm">
                            SF
                          </div>
                          <div>
                            <p className="text-xs font-black text-near-black leading-none">snapp.frame</p>
                            <p className="text-[9px] text-near-black/40 font-bold mt-1 flex items-center gap-1">
                              <Calendar size={10} />
                              {formattedDate}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[9px] font-black uppercase tracking-wider">
                          {post.category === "kegiatan" ? "Kegiatan" : "Materi Promo"}
                        </span>
                      </div>

                      {/* Image Area */}
                      <div className="relative aspect-square bg-warm-white overflow-hidden group">
                        <img
                          src={post.imageUrl}
                          alt="Materi Promosi"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleCopyCaption(post)}
                            className="bg-white text-near-black p-3 rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                            title="Salin Caption"
                          >
                            {isCopied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                          </button>
                          <button
                            onClick={() => handleShare(post)}
                            className="bg-white text-near-black p-3 rounded-full hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                            title="Bagikan ke WhatsApp"
                          >
                            <Share2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-5 pt-4 pb-2 flex items-center justify-between border-t border-warm-white">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-1.5 group/like cursor-pointer"
                          >
                            <Heart
                              size={20}
                              className={`transition-all duration-300 group-hover/like:scale-110 ${isLiked ? "fill-rose-500 text-rose-500" : "text-near-black/40 hover:text-rose-500"
                                }`}
                            />
                            <span className="text-xs font-black text-near-black/70">
                              {post.likeCount}
                            </span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleCopyCaption(post)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${isCopied
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-gold/10 text-gold hover:bg-gold/20 border border-transparent"
                            }`}
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} />
                              Tersalin
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Salin Caption
                            </>
                          )}
                        </button>
                      </div>

                      {/* Caption / Content */}
                      <div className="px-5 pb-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-2 mt-2">
                          <p className="text-xs text-near-black/80 font-bold leading-relaxed line-clamp-3">
                            <span className="font-black text-near-black mr-1">snapp.frame</span>
                            {post.caption}
                          </p>
                          {post.hashtags && post.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {post.hashtags.map((tag: string) => (
                                <span key={tag} className="text-[10px] font-black text-gold/95">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── Info Columns ── */}
        <section className="py-20 bg-warm-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tugas Affiliate Partner", bg: "bg-near-black", textColor: "text-white",
                items: ["Promosikan semua produk & layanan", "Bagikan link / kode referral", "Dapatkan peserta / customer", "Capai target & raih komisi", "Buat konten promosi di medsos"],
              },
              {
                title: "Benefit Affiliate Partner", bg: "bg-gold", textColor: "text-near-black",
                items: ["Penghasilan tanpa batas", "Komisi dari setiap penjualan", "Bonus target bulanan & reward", "Materi promosi & support marketing", "Sertifikat resmi Affiliate Partner", "Komunitas partner aktif", "Peluang jadi Ambassador"],
              },
              {
                title: "Syarat Pendaftaran", bg: "bg-near-black", textColor: "text-white",
                items: ["Usia minimal 17 tahun", "Punya smartphone & internet", "Aktif di media sosial", "Komunikatif & semangat belajar", "Bersedia bekerja dengan target"],
              },
            ].map((col, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-near-black/10 shadow-sm">
                <span className={`${col.bg} ${col.textColor} px-4 py-2 rounded-lg inline-block font-black uppercase text-xs mb-6`}>{col.title}</span>
                <ul className="space-y-3">
                  {col.items.map((text, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-bold text-near-black/70">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>


      </main>
    </>
  );
}

export default function AffiliatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090503] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#C88A58]/20 border-t-[#C88A58] animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Memuat Halaman Affiliate...</p>
      </div>
    }>
      <AffiliateContent />
    </Suspense>
  );
}
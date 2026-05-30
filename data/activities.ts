// data/activities.ts

export type ActivityCategory = "inovasi-sosial" | "pelatihan-kelas" | "kemitraan";

export interface Activity {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: ActivityCategory;
  categoryLabel: string;
  author: string;
  date: string;
  readTime: string;
}

export const activities: Activity[] = [
  {
    id: "act-1",
    title: "Link Productive Hadirkan Sinergi Inovasi Sosial Terintegrasi di Banten",
    summary: "Kolaborasi Pentahelix bersama pemerintah daerah untuk memperkuat digitalisasi UMKM dan hilirisasi produk inovatif lokal.",
    content: `Cilegon — Link Productive secara resmi meluncurkan program pendampingan Inovasi Sosial Terintegrasi yang ditujukan untuk mengakselerasi digitalisasi pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di wilayah Cilegon dan sekitarnya. 

Program yang mengadopsi sinergi Pentahelix ini menggabungkan dukungan penuh dari Pemerintah Daerah, sektor swasta (Dunia Usaha), akademisi (Dunia Pendidikan), serta komunitas lokal. Melalui program ini, Link Productive menyalurkan pendampingan branding, standarisasi mutu SOP bisnis, serta implementasi kecerdasan buatan (AI) guna mendongkrak omzet penjualan UMKM binaan secara signifikan.

"Inovasi sosial bukan sekadar tentang teknologi baru, tetapi bagaimana teknologi tersebut dapat memberdayakan masyarakat dan meningkatkan kemandirian ekonomi daerah," ujar Direktur Kemitraan Link Productive.`,
    imageUrl: "/photos/hero-001.png",
    category: "inovasi-sosial",
    categoryLabel: "Inovasi Sosial",
    author: "Tim Media Link Productive",
    date: "28 Mei 2026",
    readTime: "4 menit baca",
  },
  {
    id: "act-2",
    title: "Akselerasi Karir Mahasiswa: LP Career Ready Angkatan 5 Sukses Digelar",
    summary: "Bootcamp persiapan karir intensif mencakup bimbingan kurikulum profesional, review CV/LinkedIn, dan simulasi wawancara.",
    content: `Jakarta — Menjawab tantangan tingginya angka persaingan kerja di era pasca-pandemi, Link Productive kembali sukses menyelenggarakan program unggulan LP Career Ready untuk Angkatan ke-5. 

Selama tiga pekan penuh, para peserta yang terdiri dari mahasiswa tingkat akhir dan fresh graduate dari berbagai universitas di Indonesia mendapatkan bimbingan intensif langsung dari para HR Practitioner industri multinasional. Materi utama difokuskan pada optimasi CV ATS-Friendly, personal branding di LinkedIn, serta teknik menjawab wawancara dengan metode STAR.

Sebanyak 85% alumni dari angkatan sebelumnya terbukti berhasil terserap di pasar kerja nasional maupun regional dalam waktu kurang dari tiga bulan setelah menyelesaikan program ini.`,
    imageUrl: "/photos/couple-001.png",
    category: "pelatihan-kelas",
    categoryLabel: "Pelatihan & Kelas",
    author: "Karir Humas LP",
    date: "25 Mei 2026",
    readTime: "3 menit baca",
  },
  {
    id: "act-3",
    title: "Penandatanganan Nota Kesepahaman Program Magang Bersama Industri Nasional",
    summary: "Langkah nyata Link Productive menyalurkan talenta muda berpotensi ke jaringan korporasi terstandardisasi.",
    content: `Yogyakarta — Link Productive terus memperluas jaringan ekosistemnya dengan menandatangani Nota Kesepahaman (MoU) kemitraan magang bersertifikat bersama lima korporasi manufaktur dan teknologi nasional. 

Melalui kesepakatan strategis ini, para peserta terbaik dari program akademi Link Productive (seperti Tekno AI Academy dan Baristara Academy) mendapatkan akses prioritas untuk mengikuti program magang industri berbayar dengan peluang rekrutmen langsung sebagai karyawan tetap.

"Ini merupakan bukti komitmen nyata kami dalam menjembatani gap kompetensi antara dunia akademisi dengan ekspektasi nyata yang dibutuhkan oleh industri saat ini," tegas perwakilan Link Productive Office Jogja.`,
    imageUrl: "/photos/family-001.png",
    category: "kemitraan",
    categoryLabel: "Kemitraan Pentahelix",
    author: "Humas Ekosistem LP",
    date: "20 Mei 2026",
    readTime: "5 menit baca",
  },
  {
    id: "act-4",
    title: "Inisiasi Program Teknologi Hijau: Hilirisasi Produk Eco-Inovatif Bersama Koperasi",
    summary: "Green Productive Academy bekerja sama dengan koperasi lokal mengolah limbah organik menjadi produk bernilai ekonomi tinggi.",
    content: `Tangerang — Green Productive Academy, pilar inovasi keberlanjutan dari Link Productive, secara resmi menjalin kerja sama dengan Koperasi Bina Sejahtera guna menginisiasi hilirisasi produk eco-inovatif ramah lingkungan. 

Dalam program berjangka 6 bulan ini, para peneliti muda dan anggota koperasi dibekali dengan teknologi pengolahan dasar terstandardisasi untuk mengonversi limbah organik perkotaan menjadi bio-komposit bernilai ekonomi tinggi.

Langkah nyata ini merupakan sumbangsih nyata Link Productive dalam menyukseskan program Sustainable Development Goals (SDGs) nasional di tingkat akar rumput.`,
    imageUrl: "/photos/hero-001.png",
    category: "inovasi-sosial",
    categoryLabel: "Inovasi Sosial",
    author: "Tim Eco LP",
    date: "15 Mei 2026",
    readTime: "4 menit baca",
  },
];

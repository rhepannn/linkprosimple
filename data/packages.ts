// data/packages.ts — Array paket & harga + types

export type Package = {
  id: string;
  name: string;
  price: number;        // Rupiah, tanpa desimal
  duration: string;     // e.g. "60 menit"
  photoCount: string;   // e.g. "30 foto soft file"
  features: string[];   // Daftar fitur yang termasuk
  isPopular?: boolean;  // Tampil dengan highlight gold + badge "Terpopuler"
  sortOrder: number;
};

export const packages: Package[] = [
  {
    id: "pkg-academic",
    name: "Academic Partner",
    price: 299000,
    duration: "4 Minggu",
    photoCount: "Sertifikat Resmi",
    features: [
      "Pelatihan Soft Skills & Tech",
      "E-Certificate & Modul",
      "1x Sesi Mentoring Kelompok",
      "Akses Komunitas Selamanya",
    ],
    sortOrder: 1,
  },
  {
    id: "pkg-career",
    name: "Career Ready",
    price: 499000,
    duration: "8 Minggu",
    photoCount: "Mentoring & Portofolio",
    features: [
      "Kurikulum Persiapan Karir Industri",
      "E-Certificate & Portfolio Project",
      "3x Sesi Mentoring 1-on-1",
      "Review CV & Simulasi Interview",
      "Peluang Penyaluran Kerja",
    ],
    isPopular: true,
    sortOrder: 2,
  },
  {
    id: "pkg-social",
    name: "Social Innovation",
    price: 799000,
    duration: "12 Minggu",
    photoCount: "Inkubasi & Pendanaan",
    features: [
      "Inkubasi Proyek Inovasi Sosial",
      "E-Certificate & Pitch Deck Review",
      "Mentoring Intensif Mingguan",
      "Akses Jaringan Investor/Mitra",
      "Pendanaan Stimulus Proyek Terbaik",
    ],
    sortOrder: 3,
  },
];

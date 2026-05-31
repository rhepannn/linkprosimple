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
    id: "pkg-vinyl",
    name: "Vinyl",
    price: 15000,
    duration: "15 menit",
    photoCount: "3 foto soft file",
    features: [
      "1 latar belakang",
      "Akses properti studio",
      "File resolusi tinggi",
      "Pengiriman via Google Drive",
    ],
    sortOrder: 1,
  },
  {
    id: "pkg-elevator",
    name: "Elevator",
    price: 20000,
    duration: "15 menit",
    photoCount: "5 foto soft file",
    features: [
      "1 latar belakang",
      "Akses properti studio",
      "File resolusi tinggi",
      "Free 1 cetak foto",
      "Pengiriman via Google Drive",
    ],
    isPopular: true,
    sortOrder: 2,
  },
  {
    id: "pkg-kaset",
    name: "Kaset",
    price: 25000,
    duration: "15 menit",
    photoCount: "8 foto soft file",
    features: [
      "2 latar belakang",
      "Akses properti studio penuh",
      "File resolusi tinggi",
      "Free 2 cetak foto",
      "Pengiriman via Google Drive",
    ],
    sortOrder: 3,
  },
];

// data/photos.ts — Array foto portfolio + types

export type PhotoCategory =
  | "solo"
  | "couple"
  | "family"
  | "birthday"
  | "graduation";

export type Photo = {
  id: string;
  src: string;       // Path ke /public/photos/ atau URL CDN
  alt: string;       // Deskripsi untuk aksesibilitas & SEO
  width: number;     // Lebar asli dalam pixel — wajib untuk next/image + masonry
  height: number;    // Tinggi asli dalam pixel
  category: PhotoCategory;
  isFeatured?: boolean; // Tampil di gallery preview landing page (max 9)
  isHero?: boolean;     // Digunakan sebagai hero background (pilih 1)
  sortOrder?: number;
};

export const photos: Photo[] = [
  {
    id: "photo-hero-new",
    src: "/photos/studio-bg.jpg",
    alt: "Latar belakang foto studio hitam putih",
    width: 1920,
    height: 1080,
    category: "solo",
    isHero: true,
  },
  {
    id: "photo-001",
    src: "/photos/hero-001.png",
    alt: "Sesi foto solo dengan latar belakang studio minimalis",
    width: 1200,
    height: 1600,
    category: "solo",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "photo-002",
    src: "/photos/couple-001.png",
    alt: "Sesi foto couple dengan latar putih minimalis",
    width: 1200,
    height: 1600,
    category: "couple",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: "photo-003",
    src: "/photos/family-001.png",
    alt: "Sesi foto keluarga dengan properti studio",
    width: 1200,
    height: 900,
    category: "family",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: "photo-004",
    src: "/photos/birthday-001.png",
    alt: "Sesi foto birthday dengan dekorasi balloon",
    width: 800,
    height: 1200,
    category: "birthday",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    id: "photo-005",
    src: "/photos/graduation-001.png",
    alt: "Sesi foto wisuda dengan toga formal",
    width: 1200,
    height: 1600,
    category: "graduation",
    isFeatured: true,
    sortOrder: 5,
  },
  {
    id: "photo-006",
    src: "/photos/solo-002.png",
    alt: "Sesi foto solo ekspresi natural",
    width: 800,
    height: 1200,
    category: "solo",
    isFeatured: true,
    sortOrder: 6,
  },
];

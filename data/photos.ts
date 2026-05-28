// data/photos.ts — Array foto portfolio + types

export type PhotoCategory =
  | "academic"
  | "career"
  | "social"
  | "bootcamp"
  | "workshop";

export type Photo = {
  id: string;
  src: string;       // Path ke /public/photos/ atau URL CDN
  alt: string;       // Deskripsi untuk aksesibilitas & SEO
  width: number;     // Lebar asli dalam pixel
  height: number;    // Tinggi asli dalam pixel
  category: PhotoCategory;
  isFeatured?: boolean; // Tampil di gallery preview landing page
  isHero?: boolean;     // Digunakan sebagai hero background
  sortOrder?: number;
};

export const photos: Photo[] = [
  {
    id: "photo-hero-new",
    src: "/photos/studio-bg.jpg",
    alt: "Link Productive digital network banner background",
    width: 1920,
    height: 1080,
    category: "career",
    isHero: true,
  },
  {
    id: "photo-001",
    src: "/photos/hero-001.png",
    alt: "Program pelatihan Academic Partner Link Productive bersama mahasiswa",
    width: 1200,
    height: 900,
    category: "academic",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "photo-002",
    src: "/photos/couple-001.png",
    alt: "Konsultasi karir intensif Career Ready Program Link Productive",
    width: 1200,
    height: 900,
    category: "career",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: "photo-003",
    src: "/photos/family-001.png",
    alt: "Kolaborasi dampak nyata dalam Social Innovation Bootcamp",
    width: 1200,
    height: 900,
    category: "social",
    isFeatured: true,
    sortOrder: 3,
  },
];

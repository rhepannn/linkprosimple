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

// Static fallback photos — leave empty until real content uploaded via admin
export const photos: Photo[] = [];

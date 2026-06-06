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

// Static fallback — empty until activities uploaded via admin panel
export const activities: Activity[] = [];

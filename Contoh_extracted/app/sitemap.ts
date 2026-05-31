// app/sitemap.ts — Sitemap otomatis untuk semua halaman publik
// Tidak ada admin routes, tidak ada halaman private

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://snappframe.id";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

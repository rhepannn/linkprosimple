// app/robots.ts — robots.txt: allow semua halaman publik
// Tidak ada admin route untuk di-disallow

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://snappframe.id/sitemap.xml",
  };
}

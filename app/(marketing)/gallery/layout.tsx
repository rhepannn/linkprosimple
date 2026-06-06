import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Jelajahi dokumentasi program, kegiatan sosial, dan pelatihan Link Productive.",
  openGraph: {
    title: `Kegiatan | ${site.name}`,
    description:
      "Jelajahi dokumentasi program, kegiatan sosial, dan pelatihan Link Productive.",
    url: "https://linkproductive.com/gallery",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://linkproductive.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

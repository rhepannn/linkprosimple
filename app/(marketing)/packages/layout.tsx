import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Program Pelatihan & Harga",
  description:
    "Lihat semua program pelatihan Link Productive. Pendaftaran mudah, program berkualitas untuk inovasi sosial dan peningkatan skill profesional.",
  openGraph: {
    title: `Program & Pelatihan | ${site.name}`,
    description:
      "Daftar program pelatihan dan peningkatan skill di Link Productive.",
    url: "https://linkproductive.com/packages",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://linkproductive.com/packages",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

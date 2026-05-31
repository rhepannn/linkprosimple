// app/layout.tsx — Root layout dengan font premium, metadata, WA button
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { Toaster } from "sonner";

/* ─── Fonts ─────────────────────────────────────────────── */

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* ─── Metadata ────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://linkproductive.com"),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s │ ${site.name}`,
  },
  description: site.description,
  keywords: [
    "program pelatihan",
    "inovasi sosial",
    "link productive",
    "affiliate",
    "pelatihan karir",
  ],
  openGraph: {
    type: "website",
    url: "https://linkproductive.com",
    title: `${site.name} — Program Pelatihan & Inovasi Sosial`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Program Pelatihan & Inovasi Sosial`,
      },
    ],
    siteName: site.name,
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Program Pelatihan & Inovasi Sosial`,
    description: site.description,
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://linkproductive.com" },
  robots: { index: true, follow: true },
};

/* ─── Root Layout ─────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-[#f8faff] text-[#0a0e1a] font-[family-name:var(--font-inter)] antialiased cursor-default min-h-screen overflow-x-hidden w-full">
        {/* Viewport lock wrapper */}
        <div className="relative flex min-h-screen flex-col w-full">
          {children}
          <Toaster position="top-center" richColors />
        </div>
      </body>
    </html>
  );
}

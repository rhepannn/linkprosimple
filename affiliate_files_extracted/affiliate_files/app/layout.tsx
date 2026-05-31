// app/layout.tsx — Root layout dengan font, metadata, navbar, footer, WA button

import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Toaster } from "sonner";

/* ─── Fonts ─────────────────────────────────────────────── */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-syne",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* ─── Metadata ────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://snappframe.id"),
  title: {
    default: `${site.name} — Studio Foto Minimalis Modern`,
    template: `%s │ ${site.name}`,
  },
  description: site.description,
  keywords: [
    "studio foto",
    "photobooth",
    "foto minimalis",
    "foto portrait",
    "Snapp.frame Studio",
  ],
  openGraph: {
    type: "website",
    url: "https://snappframe.id",
    title: `${site.name} — Studio Foto Minimalis Modern`,
    description: site.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Studio Foto Minimalis Modern`,
      },
    ],
    siteName: site.name,
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Studio Foto Minimalis Modern`,
    description: site.description,
    images: ["/og-image.png"],
  },
  alternates: { canonical: "https://snappframe.id" },
  robots: { index: true, follow: true },
};

/* ─── Root Layout ─────────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${lato.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-[#FAFAF8] text-[#1A1A1A] font-[family-name:var(--font-lato)] antialiased cursor-default min-h-screen overflow-x-hidden w-full">
        {/* Viewport lock wrapper */}
        <div className="relative flex min-h-screen flex-col w-full">
          <CustomCursor />
          {children}
          <Toaster position="top-center" richColors />
        </div>
      </body>
    </html>
  );
}

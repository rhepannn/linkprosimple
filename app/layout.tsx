// app/layout.tsx — Root layout dengan font, metadata, navbar, footer, WA button

import type { Metadata } from "next";
import { Roboto, Open_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Toaster } from "sonner";

/* ─── Fonts ─────────────────────────────────────────────── */

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* ─── Metadata ────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL("https://linkproductive.com"),
  title: {
    default: `${site.name} — Program Pelatihan & Inovasi Sosial`,
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
    <html lang="id" className={`${roboto.variable} ${openSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-[#F5F8FC] text-[#111E38] font-[family-name:var(--font-open-sans)] antialiased cursor-default min-h-screen overflow-x-hidden w-full">
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

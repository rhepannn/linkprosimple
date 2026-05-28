// app/page.tsx — Landing Page lengkap (FASE 2 + FASE 3) + JSON-LD LocalBusiness schema

import type { Metadata } from "next";
import Script from "next/script";
import { site } from "@/data/site";
import { HeroSection } from "@/components/home/hero-section";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { PackagesPreview } from "@/components/home/packages-preview";
import { AboutSection } from "@/components/home/about-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { ContactSection } from "@/components/home/contact-section";
import { FaqSection } from "@/components/home/faq-section";
import { getFeaturedPhotos, getGalleryPhotos } from "@/app/actions/gallery";
import { getProducts } from "@/app/actions/products";
import { packages } from "@/data/packages";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: `${site.name} — Studio Foto Minimalis Modern`,
  description: site.description,
  openGraph: {
    url: "https://snappframe.id",
  },
  alternates: {
    canonical: "https://snappframe.id",
  },
};

/* ─── JSON-LD LocalBusiness Schema ───────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://snappframe.id",
  name: site.name,
  description: site.description,
  url: "https://snappframe.id",
  image: "https://snappframe.id/og-image.png",
  logo: "https://snappframe.id/logo.svg",
  telephone: `+${site.contact.whatsapp}`,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address,
    addressCountry: "ID",
  },
  openingHoursSpecification: site.operatingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    name: h.day,
    description: h.hours,
  })),
  sameAs: [site.contact.instagram, site.contact.tiktok],
  priceRange: "Rp 150.000 – Rp 300.000",
};

/* ─── Page ───────────────────────────────────────────────── */

export default async function HomePage() {
  const [featuredRes, allRes, productsRes] = await Promise.all([
    getFeaturedPhotos(6),
    getGalleryPhotos(),
    getProducts()
  ]);

  const featuredPhotos = (featuredRes.success && Array.isArray(featuredRes.data)) ? featuredRes.data : [];
  const heroPhoto = (allRes.success && Array.isArray(allRes.data)) ? allRes.data.find((p: any) => p.isHero) : null;
  const packagesData = (productsRes.success && Array.isArray(productsRes.data)) 
    ? (productsRes.data as any[]).filter((p: any) => {
        const cat = p.category.toLowerCase();
        return cat.includes("foto") || cat === "layanan" || p.sku.startsWith("pkg-") || p.sku.startsWith("STUDIO-");
      })
    : packages;
  return (
    <>
      {/* JSON-LD Schema untuk SEO lokal */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      {/* Section 1 — Hero */}
      <HeroSection initialHeroPhoto={heroPhoto as any} />

      {/* Section 2 — Gallery Preview */}
      <GalleryPreview initialPhotos={featuredPhotos as any} />

      {/* Section 3 — Packages Preview */}
      <PackagesPreview initialPackages={packagesData} />

      {/* Section 4 — About */}
      <AboutSection />

      {/* Section 5 — Testimonials */}
      <TestimonialsSection />

      {/* Section 6 — How It Works */}
      <HowItWorksSection />

      {/* Section 7 — FAQ */}
      <FaqSection />

      {/* Section 8 — Contact & Location */}
      <ContactSection />
    </>
  );
}

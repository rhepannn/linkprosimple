// app/page.tsx — Landing Page lengkap (FASE 2 + FASE 3) + JSON-LD LocalBusiness schema

import type { Metadata } from "next";
import Script from "next/script";
import { site } from "@/data/site";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { KegiatansSection } from "@/components/home/kegiatans-section";
import { YoutubeSection } from "@/components/home/youtube-section";
import { PackagesPreview } from "@/components/home/packages-preview";
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
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  openGraph: {
    url: "https://linkproductive.com",
  },
  alternates: {
    canonical: "https://linkproductive.com",
  },
};

/* ─── JSON-LD LocalBusiness Schema ───────────────────────── */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://linkproductive.com",
  name: site.name,
  description: site.description,
  url: "https://linkproductive.com",
  image: "https://linkproductive.com/og-image.png",
  logo: "https://linkproductive.com/logo.svg",
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

import { getSiteSettings } from "@/app/actions/settings";

export default async function HomePage() {
  const [featuredRes, allRes, productsRes, settings] = await Promise.all([
    getFeaturedPhotos(6),
    getGalleryPhotos(),
    getProducts(),
    getSiteSettings()
  ]);

  const packagesData = (productsRes.success && Array.isArray(productsRes.data)) 
    ? (productsRes.data as any[]).filter((p: any) => {
        const cat = p.category.toLowerCase();
        return cat.includes("foto") || cat === "layanan" || p.sku.startsWith("pkg-") || p.sku.startsWith("STUDIO-");
      })
    : packages;

  let faqsData = null;
  try {
    if (settings.faqs) {
      faqsData = JSON.parse(settings.faqs);
    }
  } catch (e) {}

  // Resolve section rendering order
  const orderString = settings.homepage_section_order || "hero,about,kegiatans,youtube,packages,testimonials,how-it-works,faq,contact";
  const sectionKeys = orderString.split(",");

  const renderSection = (key: string) => {
    switch (key.trim()) {
      case "hero":
        return <HeroSection key="hero" />;
      case "about":
        return <AboutSection key="about" settings={settings} />;
      case "kegiatans":
        return <KegiatansSection key="kegiatans" settings={settings} />;
      case "youtube":
        return <YoutubeSection key="youtube" settings={settings} />;
      case "packages":
        return <PackagesPreview key="packages" initialPackages={packagesData} settings={settings} />;
      case "testimonials":
        return <TestimonialsSection key="testimonials" settings={settings} />;
      case "how-it-works":
        return <HowItWorksSection key="how-it-works" settings={settings} />;
      case "faq":
        return <FaqSection key="faq" initialFaqs={faqsData} />;
      case "contact":
        return <ContactSection key="contact" settings={settings} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* JSON-LD Schema untuk SEO lokal */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />

      {/* Render sections in the precise order specified by settings */}
      {sectionKeys.map(key => renderSection(key))}
    </>
  );
}

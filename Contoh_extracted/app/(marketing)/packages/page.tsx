"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, CalendarCheck, Camera, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { btn } from "@/lib/button-classes";
import { getProducts } from "@/app/actions/products";
import { packages as staticPackages } from "@/data/packages";
import { faqs } from "@/data/faq";
import { FaqAccordion } from "@/components/packages/faq-accordion";

/* ─── Package Card ───────────────────────────────────────── */
interface PkgProps {
  id: string;
  name: string;
  price: number;
  duration?: string;
  photoCount?: string;
  features: string[];
  isPopular?: boolean;
  category: string;
  sku?: string;
}

function PackageCard({ pkg }: { pkg: PkgProps }) {
  return (
    <div
      className={[
        "relative flex flex-col rounded-[2.5rem] border transition-all duration-500 h-full group overflow-hidden",
        pkg.isPopular
          ? "border-[#C88A58]/40 bg-white shadow-[0_24px_60px_rgba(93,64,55,0.08)] ring-1 ring-[#C88A58]/10"
          : "border-[#E0E0DA] bg-white/50 hover:bg-white hover:border-[#3B2211]/20 hover:shadow-[0_15px_40px_rgba(93,64,55,0.04)]",
      ].join(" ")}
    >
      {/* Popular Decorator */}
      {pkg.isPopular && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C88A58]/10 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />
      )}

      {/* Popular Badge */}
      {pkg.isPopular && (
        <div className="absolute top-6 right-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[9px] font-black tracking-[0.2em] bg-[#3B2211] text-white uppercase rounded-full shadow-lg shadow-[#3B2211]/20 transform-gpu transition-transform group-hover:scale-105">
            ★ Terpopuler
          </span>
        </div>
      )}

      <div className="p-8 sm:p-10 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200/50">
              📸 Studio Foto
            </span>
          </div>
          
          <h2
            className="text-xl sm:text-2xl font-black text-[#3B2211] mb-4 leading-tight group-hover:text-black transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {pkg.name}
          </h2>
          <div className="flex items-baseline gap-2">
            <span
              className="text-3xl sm:text-4xl font-black text-[#3B2211] tracking-tighter"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formatPrice(pkg.price)}
            </span>
          </div>
          
          {/* Subtitle / Details */}
          {(pkg.duration || pkg.photoCount) && (
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2.5">
              {[pkg.duration, pkg.photoCount].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-12 bg-[#3B2211]/10 mb-8 transition-all duration-500 group-hover:w-full group-hover:bg-[#3B2211]/5" />

        {/* Features List */}
        <div className="flex-1 mb-8">
          <div className="space-y-3.5">
            {pkg.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-xs text-gray-600"
              >
                <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#C88A58]/10 flex items-center justify-center">
                  <Check size={10} className="text-[#C88A58] stroke-[3]" />
                </div>
                <span className="leading-relaxed font-bold">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={`/booking?pkg=${pkg.id}`}
            className={[
              btn.primary,
              "w-full rounded-2xl py-4 overflow-hidden group font-black uppercase tracking-widest text-[10px] justify-center",
            ].join(" ")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer" />
            <CalendarCheck size={16} className="transition-transform group-hover:rotate-12" />
            Booking Studio
          </a>

          <a
            href={getWhatsAppUrl("package", pkg.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={[btn.secondary, "w-full rounded-2xl py-3.5 font-black uppercase tracking-widest text-[10px] justify-center"].join(" ")}
          >
            <MessageCircle size={15} />
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */

export default function PackagesPage() {
  const [loading, setLoading] = useState(true);
  const [studioPackages, setStudioPackages] = useState<PkgProps[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getProducts();
        if (res.success && res.data) {
          const dbProducts = res.data;
          
          // Only show studio packages: categories containing "foto", "layanan", or starting with "pkg-"/"STUDIO-"
          const studio = dbProducts
            .filter((p: any) => {
              const cat = p.category.toLowerCase();
              return cat.includes("foto") || cat === "layanan" || p.sku.startsWith("pkg-") || p.sku.startsWith("STUDIO-");
            })
            .map((p: any) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              duration: p.duration,
              photoCount: p.photoCount,
              features: p.features,
              isPopular: p.isPopular,
              category: p.category,
              sku: p.sku
            }));

          setStudioPackages(studio.length > 0 ? studio : (staticPackages as any[]).map(p => ({ ...p, category: "Paket Foto" })));
        } else {
          // Fallback to static
          setStudioPackages((staticPackages as any[]).map(p => ({ ...p, category: "Paket Foto" })));
        }
      } catch (err) {
        console.error("Gagal load packages:", err);
        setStudioPackages((staticPackages as any[]).map(p => ({ ...p, category: "Paket Foto" })));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAF8] font-[family-name:var(--font-lato)]">
      {/* ── Premium Packages Header ── */}
      <section className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden border-b border-[#3B2211]/5 bg-[#F8F6F4]/50">
        <div className="absolute inset-0 bg-[radial-gradient(#C88A58_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.03]" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C88A58]/10 border border-[#C88A58]/20">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C88A58] animate-pulse" />
            <span className="text-[9px] font-black tracking-[0.3em] text-[#C88A58] uppercase">
              Pricing & Packages
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3B2211] leading-[1.1] tracking-tighter"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Abadikan Momen <br />
            <span className="text-[#C88A58] italic underline decoration-[#C88A58]/30 underline-offset-8">Terbaikmu</span>
          </h1>

          <p className="text-gray-500 text-sm sm:text-base font-bold max-w-2xl mx-auto leading-relaxed">
            Pilih paket Studio Foto yang cocok untuk mengabadikan momen terbaikmu bersama Snapp.frame.
          </p>
        </div>
      </section>

      {/* ── Packages Grid ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/60 border border-[#E0E0DA] rounded-[2.5rem] p-10 h-[400px] space-y-6">
                <div className="w-1/3 h-5 bg-gray-200 rounded-md" />
                <div className="w-2/3 h-8 bg-gray-200 rounded-md" />
                <div className="w-1/2 h-10 bg-gray-200 rounded-md" />
                <div className="h-px bg-gray-100" />
                <div className="space-y-3">
                  <div className="w-5/6 h-4 bg-gray-200 rounded-md" />
                  <div className="w-4/5 h-4 bg-gray-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-[#3B2211]/5 pb-4">
              <div className="w-9 h-9 rounded-xl bg-[#C88A58]/10 text-[#C88A58] flex items-center justify-center">
                <Camera size={18} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#3B2211]" style={{ fontFamily: "var(--font-heading)" }}>
                  Layanan Studio Foto Snapp.frame
                </h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Paket Foto Studio Modern & Minimalis
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studioPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── FAQ Section ── */}
      <div className="bg-[#F8F6F4]/30 border-t border-[#3B2211]/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto">
            {/* FAQ Header */}
            <div className="text-center mb-12">
              <p className="text-[9px] font-black tracking-[0.3em] text-[#C88A58] uppercase mb-4">
                FAQ
              </p>
              <h2
                className="text-3xl sm:text-4xl font-black text-[#3B2211]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pertanyaan <span className="text-[#C88A58]">Umum</span>
              </h2>
              <p className="text-gray-500 font-bold text-sm mt-3">
                Tidak menemukan jawaban yang dicari? Hubungi kami via WhatsApp.
              </p>
            </div>

            {/* FAQ Accordion — client component */}
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <div className="bg-white border-t border-[#3B2211]/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="rounded-[3rem] border border-[#3B2211]/5 bg-[#F8F6F4]/30 px-8 py-12 lg:px-16 lg:py-16 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C88A58]/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3B2211] mb-3 relative z-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Masih ada pertanyaan?
            </h2>
            <p className="text-gray-500 font-bold text-sm mb-8 max-w-md mx-auto relative z-10">
              Tim kami siap membantu Anda menemukan paket yang tepat dan
              merencanakan sesi foto yang berkesan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppUrl("general")}
                target="_blank"
                rel="noopener noreferrer"
                className={btn.whatsapp}
              >
                <MessageCircle size={18} />
                Chat via WhatsApp
              </a>
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={btn.secondary}
              >
                Instagram DM
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

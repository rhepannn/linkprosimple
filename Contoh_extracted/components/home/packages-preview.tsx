// components/home/packages-preview.tsx
// Section preview 3 paket — mobile-first, fitur truncatable

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { btn } from "@/lib/button-classes";
import { ExpandableFeatures } from "@/components/ui/expandable-features";
import { Check, CalendarCheck, MessageCircle } from "lucide-react";

/* ─── Package Card ───────────────────────────────────────── */

function PackageCard({ pkg }: { pkg: (typeof packages)[0] }) {
  return (
    <div
      className={[
        "relative flex flex-col rounded-[2rem] border transition-all duration-500 h-full group overflow-hidden",
        pkg.isPopular
          ? "border-gold/30 bg-white shadow-[0_20px_50px_rgba(93,64,55,0.08)] ring-1 ring-gold/10"
          : "border-border/60 bg-white/40 hover:bg-white hover:border-near-black/20 hover:shadow-[0_10px_30px_rgba(93,64,55,0.05)]",
      ].join(" ")}
    >
      {/* Badge Terpopuler */}
      {pkg.isPopular && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-near-black text-white text-[8px] font-black tracking-[0.2em] uppercase rounded-full shadow-lg shadow-near-black/20">
            ★ Best
          </span>
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="mb-6">
          <p className="text-[9px] font-black tracking-[0.2em] text-gold uppercase mb-2">
            {pkg.duration || pkg.photoCount || ""}
          </p>
          <h3
            className="text-lg sm:text-xl font-black text-near-black mb-3 leading-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {pkg.name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl sm:text-3xl font-black text-near-black tracking-tighter"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {formatPrice(pkg.price)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-8 bg-near-black/10 mb-6 transition-all duration-500 group-hover:w-full group-hover:bg-near-black/5" />

        {/* Features - Simplified for Preview */}
        <div className="flex-1 mb-8">
          <div className="space-y-3">
            {pkg.features.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-near-black/60 font-bold">
                <div className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check size={8} className="text-gold" />
                </div>
                <span className="leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2">
          <a
            href={`/booking?pkg=${pkg.id}`}
            className={[
              btn.primary,
              "w-full rounded-xl py-3 text-[10px] font-black uppercase tracking-widest",
            ].join(" ")}
          >
            Pesan Sekarang
          </a>
          <a
            href={getWhatsAppUrl("package", pkg.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              btn.secondary,
              "w-full rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest",
            ].join(" ")}
          >
            <MessageCircle size={14} />
            Tanya WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */

export function PackagesPreview({ initialPackages }: { initialPackages?: (typeof packages) }) {
  const displayPackages = initialPackages && initialPackages.length > 0 
    ? initialPackages 
    : packages;

  const previewPackages = [...displayPackages]
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .slice(0, 3);

  return (
    <section
      id="packages"
      className="relative bg-white py-20 lg:py-28"
      aria-labelledby="packages-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 lg:mb-12">
          <p className="text-[10px] sm:text-xs font-black text-gold tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: "var(--font-heading)" }}>
            {displayPackages.length} Paket Tersedia
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
            <h2
              id="packages-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-near-black"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pilih Paket Foto
            </h2>
            <p className="text-near-black/60 text-xs sm:text-sm max-w-xs leading-relaxed flex-shrink-0 font-bold">
              Semua paket sudah termasuk editing profesional dan file resolusi tinggi.
            </p>
          </div>
        </div>

        {/* Cards — 1 kolom di mobile kecil, 2 di sm, 3 di lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {previewPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg as any} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/packages"
            className={`group ${btn.secondary} rounded-full px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em]`}
          >
            Lihat Semua Paket
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

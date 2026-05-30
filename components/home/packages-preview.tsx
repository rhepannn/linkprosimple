// components/home/packages-preview.tsx
// Ultra-premium program pricing cards with glassmorphism & gradient accents

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Sparkles, Crown, Rocket } from "lucide-react";
import { packages } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";

/* ─── Card Icons per tier ─────────────────────────────────── */

const tierConfig = [
  {
    icon: Sparkles,
    accent: "from-sky-400 to-sky-500",
    accentBg: "bg-sky-100",
    checkBg: "bg-sky-100",
    checkColor: "text-sky-500",
    borderHover: "hover:border-sky-200",
    shadowHover: "hover:shadow-sky-100/40",
    btnClass: "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white shadow-lg shadow-sky-400/20",
  },
  {
    icon: Crown,
    accent: "from-sky-400 to-cyan-400",
    accentBg: "bg-sky-100",
    checkBg: "bg-sky-100",
    checkColor: "text-sky-500",
    borderHover: "hover:border-sky-200",
    shadowHover: "hover:shadow-sky-100/40",
    btnClass: "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white shadow-lg shadow-sky-400/20",
  },
  {
    icon: Rocket,
    accent: "from-sky-400 to-cyan-400",
    accentBg: "bg-sky-100",
    checkBg: "bg-sky-100",
    checkColor: "text-sky-500",
    borderHover: "hover:border-sky-200",
    shadowHover: "hover:shadow-sky-100/40",
    btnClass: "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white shadow-lg shadow-sky-400/20",
  },
];

/* ─── Package Card ───────────────────────────────────────── */

function PackageCard({ pkg, index }: { pkg: (typeof packages)[0]; index: number }) {
  const config = tierConfig[index] || tierConfig[0];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="h-full"
    >
      <div
        className={[
          "relative flex flex-col rounded-3xl border transition-all duration-500 h-full group overflow-hidden",
          pkg.isPopular
            ? "border-sky-200 bg-white shadow-2xl shadow-sky-100/30 ring-1 ring-sky-100 scale-[1.02]"
            : `border-slate-100 bg-white ${config.borderHover} hover:shadow-xl ${config.shadowHover}`,
          "hover:-translate-y-2",
        ].join(" ")}
      >
        {/* Popular badge */}
        {pkg.isPopular && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500" />
        )}

        <div className="p-7 sm:p-8 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl ${config.accentBg} flex items-center justify-center`}>
                <Icon size={22} className="text-sky-500" />
              </div>
              {pkg.isPopular && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-sky-400 to-sky-500 text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-md shadow-sky-400/20">
                  <Crown size={12} />
                  Paling Diminati
                </span>
              )}
            </div>

            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-2">
              {pkg.duration} · {pkg.photoCount}
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
              {pkg.name}
            </h3>

            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r ${config.accent} bg-clip-text text-transparent`}>
                {formatPrice(pkg.price)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-7" />

          {/* Features */}
          <div className="flex-1 mb-8">
            <div className="space-y-3.5">
              {pkg.features.slice(0, 5).map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg ${config.checkBg} flex items-center justify-center`}>
                    <Check size={11} className={config.checkColor} strokeWidth={3} />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2.5">
            <Link
              href={`/daftar-pelatihan?pkg=${pkg.id}`}
              className={`group/btn w-full rounded-2xl py-3.5 text-sm font-bold text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${config.btnClass}`}
            >
              Daftar Sekarang
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <a
              href={getWhatsAppUrl("package", pkg.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-2xl py-3.5 text-sm font-semibold text-center flex items-center justify-center gap-2 bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 transition-all duration-300"
            >
              <MessageCircle size={14} />
              Konsultasi Program
            </a>
          </div>
        </div>
      </div>
    </motion.div>
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
      className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-24 lg:py-32 overflow-hidden"
      aria-labelledby="packages-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-sky-50/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-0 w-[400px] h-[400px] bg-cyan-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 lg:mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase bg-sky-50 px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {displayPackages.length} Program Tersedia
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-5 tracking-tight leading-[1.1]">
            Pilih Program{" "}
            <span className="text-gradient-cyan">Pelatihan</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Tingkatkan skill dan persiapkan karir Anda dengan program pelatihan terstruktur bersama mentor industri.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {previewPackages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg as any} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/daftar-pelatihan"
            className="group inline-flex items-center justify-center px-9 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 text-white font-bold text-sm hover:from-sky-500 hover:to-sky-400 transition-all duration-300 shadow-xl shadow-sky-400/15 hover:shadow-2xl hover:shadow-sky-400/25 hover:scale-[1.03] active:scale-[0.98]"
          >
            Lihat Semua Program
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

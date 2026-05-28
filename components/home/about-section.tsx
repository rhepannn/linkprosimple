"use client";

// components/home/about-section.tsx
// Section 4 — Tentang Studio: dua kolom (foto kiri + teks kanan)
// Fase B: warm white background, no gold accents

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";

const ABOUT_POINTS = [
  {
    title: "Ekosistem Terintegrasi",
    desc: "Menyatukan program pelatihan intensif, bimbingan karir terarah, dan inisiasi proyek dampak sosial dalam satu platform.",
  },
  {
    title: "Kurikulum Relevan Industri",
    desc: "Materi pembelajaran dirancang langsung bersama praktisi industri terkemuka agar sesuai dengan kebutuhan bursa kerja modern.",
  },
  {
    title: "Kolaborasi Dampak Nyata",
    desc: "Setiap program berorientasi pada hasil nyata melalui pengerjaan proyek sosial yang membawa perubahan positif bagi masyarakat.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-white py-24 lg:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Kolom Kiri: Foto ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {/* Frame utama */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#CBD8E9]">
              <Image
                src="/photos/hero-001.png"
                alt="Suasana pelatihan Link Productive"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay tipis */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Stats card ── */}
            <div className="mt-4 flex items-center gap-6 bg-warm-white/50 rounded-xl border border-border/60 px-5 py-4">
              {[
                { value: site.stats.sessions, label: "Peserta" },
                { value: site.stats.rating + "★", label: "Rating" },
                { value: site.stats.yearsActive + " Th", label: "Aktif" },
              ].map((s) => (
                <div key={s.label} className="text-center flex-1">
                  <p
                    className="text-xl font-black text-near-black"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] text-near-black/40 uppercase tracking-[0.2em] font-black mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Kolom Kanan: Teks ── */}
          <motion.div
            className="lg:pt-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >

            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-near-black mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Tentang Link Productive
            </h2>

            <p className="text-near-black/60 text-base leading-relaxed mb-8 font-bold">
              {site.description}
            </p>

            {/* Key points */}
            <ul className="space-y-5">
              {ABOUT_POINTS.map((point, i) => (
                <li key={i} className="flex gap-4">
                  {/* Number circle */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border/60 flex items-center justify-center mt-0.5">
                    <span
                      className="text-xs font-black text-gold"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-near-black mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm text-near-black/60 leading-relaxed font-bold">
                      {point.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

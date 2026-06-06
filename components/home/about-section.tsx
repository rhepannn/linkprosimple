"use client";

import { motion } from "framer-motion";
import { Users, Star, Calendar, Zap } from "lucide-react";
import { site } from "@/data/site";

const stats = [
  {
    value: site.stats.sessions,
    label: "Alumni Terdaftar",
    icon: Users,
    color: "from-sky-400 to-sky-500",
    bg: "bg-sky-100",
  },
  {
    value: `${site.stats.yearsActive} Th`,
    label: "Pengalaman",
    icon: Calendar,
    color: "from-sky-400 to-blue-500",
    bg: "bg-sky-50",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function AboutSection({ settings = {} }: { settings?: Record<string, string> }) {
  const about_title = settings.about_title || "Mengenal Lebih Dekat";
  const about_highlight = settings.about_highlight || "Link Productive";
  const about_desc = settings.about_desc || site.description;
  const about_card_title = settings.about_card_title || "Link Productive";
  const about_card_desc = settings.about_card_desc || "Inovasi Sosial & Pendidikan Terintegrasi untuk Masa Depan Indonesia";

  return (
    <section
      id="about"
      className="relative bg-white py-24 lg:py-32 overflow-hidden w-full max-w-full"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-50/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">

          {/* ── Left: Visual Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Main card — light blue gradient */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-white" />

                {/* Decorative orbs */}
                <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-sky-300/20 rounded-full blur-[60px]" />
                <div className="absolute bottom-[15%] right-[10%] w-40 h-40 bg-sky-200/25 rounded-full blur-[70px]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-200/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <span className="text-2xl font-black text-sky-500 tracking-tighter">LP</span>
                  </div>
                  <p className="text-sky-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">
                    {about_card_title}
                  </p>
                  <p className="text-sky-500 text-xs leading-relaxed max-w-[240px]">
                    {about_card_desc}
                  </p>
                </div>

                {/* Grid overlay */}
                <div
                  className="absolute inset-0 z-[5] opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(14,165,233,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.3) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Right: Text & Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 space-y-7"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase bg-sky-50 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Tentang Kami
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a6fd4] mb-6 tracking-tight leading-[1.15]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {about_title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                {about_highlight}
              </span>
            </h2>

            <p className="text-sky-700 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {about_desc}
            </p>


          </motion.div>

        </div>
      </div>
    </section>
  );
}

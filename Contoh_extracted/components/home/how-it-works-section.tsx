"use client";

// components/home/how-it-works-section.tsx
// Section 6 — Cara Memesan: 4 langkah horizontal (desktop) / vertikal (mobile)
// Fase B: warm white background, no gold accents

import { motion } from "framer-motion";
import { MessageCircle, CalendarCheck, Camera, ImageIcon } from "lucide-react";

const STEPS = [
  {
    icon: ImageIcon,
    number: "01",
    title: "Pilih Paket",
    desc: "Tentukan paket sesuai kebutuhan dan jumlah orang. Cek detail paket di halaman Paket.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Hubungi Kami",
    desc: "Chat via WhatsApp atau Instagram DM untuk konfirmasi ketersediaan dan diskusi konsep.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Tentukan Jadwal",
    desc: "Pilih tanggal dan waktu sesi yang sesuai. Lakukan DP 50% untuk konfirmasi booking.",
  },
  {
    icon: Camera,
    number: "04",
    title: "Sesi Foto",
    desc: "Datang ke studio, berpose, dan kami yang urus sisanya. Foto siap dalam 2–3 hari kerja.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-white py-24 lg:py-32"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header — tanpa eyebrow */}
        <motion.div
          className="mb-14 lg:mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-near-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cara Memesan
          </h2>
          <p className="text-near-black/60 text-sm mt-3 max-w-md mx-auto font-bold">
            Proses booking yang mudah — hanya 4 langkah dan Anda siap sesi foto.
          </p>
        </motion.div>

        {/* ── Desktop: Horizontal Steps ── */}
        <motion.div
          className="hidden lg:grid grid-cols-4 gap-0 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Garis penghubung horizontal — muted, tidak gold */}
          <div
            className="absolute top-9 left-[12.5%] right-[12.5%] h-px bg-border/40"
            aria-hidden="true"
          />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center px-6 relative"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                  },
                }}
              >
                {/* Icon circle — warm light bg, near-black icon */}
                <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-warm-white/80 border-2 border-border/60 flex items-center justify-center mb-6 flex-shrink-0 group-hover:border-gold transition-all duration-500">
                  <Icon size={28} className="text-near-black" strokeWidth={1.5} />
                </div>

                {/* Number — dekoratif, sangat subtle */}
                <span
                  className="text-[10px] font-black text-gold tracking-[0.4em] mb-2 uppercase"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.number}
                </span>

                <h3
                  className="text-base font-black text-near-black mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-near-black/60 leading-relaxed font-bold">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Mobile: Vertical Steps ── */}
        <motion.div
          className="lg:hidden space-y-0 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Garis penghubung vertikal — muted */}
          <div
            className="absolute left-9 top-9 bottom-9 w-px bg-border/40"
            aria-hidden="true"
          />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="flex gap-6 relative pb-10 last:pb-0"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                  },
                }}
              >
                {/* Icon circle */}
                <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-warm-white/80 border-2 border-border/60 flex items-center justify-center flex-shrink-0">
                  <Icon size={26} className="text-near-black" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="pt-4">
                  <span
                    className="text-[10px] font-black text-gold tracking-[0.4em] uppercase"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-base font-black text-near-black mt-1 mb-1.5"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-near-black/60 leading-relaxed font-bold">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

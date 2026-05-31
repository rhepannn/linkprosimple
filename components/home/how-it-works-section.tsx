"use client";

// components/home/how-it-works-section.tsx
// Light blue + white � 4 steps with gradient numbers

import { motion } from "framer-motion";
import { BookOpen, UserCheck, CreditCard, GraduationCap } from "lucide-react";

const STEPS = [
  {
    icon: BookOpen,
    number: "01",
    title: "Pilih Program",
    desc: "Tentukan program pelatihan/kemitraan yang paling sesuai untuk karir atau institusi Anda di halaman Program.",
    gradient: "from-sky-400 to-sky-500",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "Isi Pendaftaran",
    desc: "Lakukan pendaftaran online melalui website dengan data diri lengkap dan sertakan kode referral jika ada.",
    gradient: "from-sky-400 to-cyan-400",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Selesaikan Pembayaran",
    desc: "Selesaikan pembayaran program melalui transfer bank ke rekening resmi PT Link Productive Indonesia.",
    gradient: "from-cyan-400 to-sky-400",
  },
  {
    icon: GraduationCap,
    number: "04",
    title: "Mulai Pelatihan",
    desc: "Akses portal belajar, bergabung dengan komunitas eksklusif, dan mulailah sesi mentoring bersama praktisi industri!",
    gradient: "from-sky-500 to-sky-400",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative bg-gradient-to-b from-sky-50 via-sky-50/50 to-white py-24 lg:py-32 overflow-hidden"
      aria-labelledby="how-it-works-heading"
    >
      {/* Background orbs */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] bg-sky-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-sky-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14 lg:mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase bg-white px-4 py-2 rounded-full border border-sky-100 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Cara Bergabung
          </span>
          <h2
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight"
          >
            Langkah{" "}
            <span className="text-gradient-cyan">Bergabung</span>
          </h2>
          <p className="text-slate-400 text-base mt-5 max-w-lg mx-auto leading-relaxed">
            Proses pendaftaran yang cepat dan mudah � ikuti 4 langkah ini untuk memulai transformasi karir Anda.
          </p>
        </motion.div>

        {/* -- Desktop: Horizontal Steps -- */}
        <motion.div
          className="hidden lg:grid grid-cols-4 gap-6 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Connecting line */}
          <div
            className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent"
            aria-hidden="true"
          />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center px-4 relative group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                  },
                }}
              >
                {/* Icon circle */}
                <div className="relative z-10 w-[80px] h-[80px] rounded-3xl bg-white border border-sky-100 shadow-sm flex items-center justify-center mb-7 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-sky-100/50 group-hover:border-sky-200 transition-all duration-300">
                  <Icon size={28} className="text-sky-500" strokeWidth={1.5} />
                </div>

                {/* Number */}
                <span className={`text-3xl font-extrabold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-3`}>
                  {step.number}
                </span>

                <h3 className="text-lg font-bold text-slate-700 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-[250px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* -- Mobile: Vertical Steps -- */}
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
          <div
            className="absolute left-[38px] top-10 bottom-10 w-px bg-gradient-to-b from-sky-200 via-sky-100 to-transparent"
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
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-white border border-sky-100 shadow-sm flex items-center justify-center flex-shrink-0">
                  <Icon size={26} className="text-sky-500" strokeWidth={1.5} />
                </div>

                <div className="pt-2">
                  <span className={`text-xl font-extrabold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold text-slate-700 mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
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

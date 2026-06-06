"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users, Briefcase, GraduationCap, Target, Lightbulb } from "lucide-react";

interface GalleryPreviewProps {
  initialPhotos?: any[]; // Kept for compatibility but unused visually
}

const features = [
  {
    icon: <BookOpen className="text-blue-600" size={24} />,
    title: "Program Akademik",
    description: "Kurikulum terstruktur berbasis industri dengan pengajar praktisi ahli.",
    delay: 0.1,
  },
  {
    icon: <Users className="text-sky-600" size={24} />,
    title: "Inovasi Sosial",
    description: "Proyek kolaboratif yang memberikan dampak nyata bagi masyarakat.",
    delay: 0.2,
  },
  {
    icon: <Briefcase className="text-sky-600" size={24} />,
    title: "Persiapan Karir",
    description: "Mentorship eksklusif, review CV, dan simulasi interview kerja.",
    delay: 0.3,
  },
  {
    icon: <GraduationCap className="text-blue-600" size={24} />,
    title: "Sertifikasi Profesi",
    description: "Validasi skill Anda dengan sertifikasi yang diakui industri global.",
    delay: 0.4,
  },
  {
    icon: <Target className="text-sky-600" size={24} />,
    title: "Pelatihan Korporat",
    description: "Upskill tim Anda dengan materi khusus sesuai kebutuhan perusahaan.",
    delay: 0.5,
  },
  {
    icon: <Lightbulb className="text-sky-600" size={24} />,
    title: "Inkubator Bisnis",
    description: "Wujudkan ide startup Anda dari validasi hingga tahap pendanaan awal.",
    delay: 0.6,
  },
];

export function GalleryPreview({ initialPhotos }: GalleryPreviewProps) {
  return (
    <section
      id="programs"
      className="relative bg-slate-50 py-24 lg:py-32 overflow-hidden w-full max-w-full"
      aria-labelledby="programs-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-12 lg:mb-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-blue-600 mb-3 font-bold">
            Program Unggulan
          </p>
          <h2
            id="programs-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4 tracking-tight"
          >
            Pilih Jalur Kesuksesan Anda
          </h2>
          <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
            Dari pelatihan intensif hingga inkubasi bisnis, kami menyediakan ekosistem lengkap untuk pertumbuhan karir Anda.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: feature.delay }}
              className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {feature.description}
              </p>
              <Link
                href="/packages"
                className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700"
              >
                Pelajari Lebih Lanjut
                <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/packages"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md"
          >
            Lihat Semua Program
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

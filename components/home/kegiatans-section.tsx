"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff } from "lucide-react";

export function KegiatansSection({ settings = {} }: { settings?: Record<string, string> }) {
  const kegiatan_eyebrow = settings.kegiatan_eyebrow || "Kategori Kegiatan";
  const kegiatan_title = settings.kegiatan_title || "Program Utama";
  const kegiatan_highlight = settings.kegiatan_highlight || "";
  const kegiatan_desc = settings.kegiatan_desc || "Pilihan kegiatan dan program pelatihan reguler maupun bootcamp intensif yang diselenggarakan oleh Link Productive untuk masyarakat umum dan partner B2B.";
  const categories = [
    {
      title: "Kegiatan Inovasi Sosial",
      desc: "Menampilkan kolaborasi hilirisasi program dan kontribusi kemasyarakatan.",
      slug: "inovasi-sosial",
    },
    {
      title: "Pelatihan & Kelas",
      desc: "Dokumentasi intensif program upskilling, review, dan bootcamp.",
      slug: "pelatihan-kelas",
    },
    {
      title: "Kemitraan Pentahelix",
      desc: "Sinergi penandatanganan dan pengerjaan program bersama instansi.",
      slug: "kemitraan",
    },
  ];

  return (
    <section
      id="kegiatan"
      className="relative bg-slate-50 py-20 lg:py-28 overflow-hidden w-full max-w-full border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#004aad]">{kegiatan_eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {kegiatan_title}{" "}
            {kegiatan_highlight && <span className="text-[#004aad]">{kegiatan_highlight}</span>}
          </h2>
          <p className="text-slate-500 text-sm font-medium">{kegiatan_desc}</p>
        </div>

        {/* 3 Columns Kategori Kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Aspect box visual error placeholder */}
              <div className="relative aspect-[16/10] bg-slate-100 border-b border-slate-100 flex flex-col items-center justify-center p-4 text-slate-400">
                <ImageOff size={24} className="mb-2" />
                <span className="text-[9px] uppercase tracking-wider font-bold">Album {cat.title}</span>
              </div>

              {/* Text Card */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div className="space-y-2 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#004aad]">{cat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{cat.desc}</p>
                </div>

                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004aad] hover:underline"
                >
                  Buka Album Kegiatan
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

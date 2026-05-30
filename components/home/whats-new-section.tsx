"use client";

import { motion } from "framer-motion";
import { MessageSquare, ShieldAlert, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export function WhatsNewSection() {
  return (
    <section
      id="whats-new"
      className="relative bg-slate-50 py-20 lg:py-28 overflow-hidden border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Info (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-orange-700 uppercase tracking-wider"
            >
              <Award size={12} /> What's New?
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Program Inovasi Sosial Terbaru
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-600 leading-relaxed font-medium text-base"
            >
              Link Productive berkolaborasi secara strategis dalam membangun ekosistem terintegrasi melalui kemitraan Pentahelix yang menyatukan peran **Pemerintah, Dunia Usaha, dan Dunia Pendidikan**. Program terbaru kami berfokus pada hilirisasi teknologi ramah lingkungan, sertifikasi kompetensi mahasiswa, dan peningkatan kapasitas wirausaha muda nasional.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              <div className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Pentahelix Synergy</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Penggabungan resources akademisi & dukungan legalitas.</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Social Innovation</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Berdampak sosial langsung pada peningkatan ekonomi UMKM.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <Link 
                href="/daftar-pelatihan"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#004aad] hover:underline"
              >
                Pelajari program kolaborasi terbaru kami <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Right Visual Placeholder Box (Col 5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 bg-slate-100/50 flex flex-col items-center justify-center p-6 text-center group hover:border-[#004aad]/30 transition-colors duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:border-[#004aad]/30 transition-all duration-300 mb-4 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-off"><line x1="2" y1="2" x2="22" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><path d="M9 3h10a2 2 0 0 1 2 2v10c0 .34-.07.66-.19.96"/><path d="M19 13l-4-4-3 3"/><path d="M5 21a2 2 0 0 1-2-2V5c0-.34.07-.66.19-.96"/><path d="M3 19l5-5 1.5 1.5"/></svg>
              </div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-1">Poster Program Terbaru</p>
              <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                Poster infografis "What's New?" dapat diedit secara dinamis melalui Admin Panel settings.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

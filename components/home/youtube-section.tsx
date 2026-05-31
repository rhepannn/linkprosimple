"use client";

import { motion } from "framer-motion";
import { Video, ExternalLink } from "lucide-react";

import { site } from "@/data/site";

export function YoutubeSection({ settings = {} }: { settings?: Record<string, string> }) {
  const youtube_eyebrow = settings.youtube_eyebrow || "Video Profile";
  const youtube_title = settings.youtube_title || "Tonton Dokumentasi & Inkubasi Kemitraan Kami";
  const youtube_highlight = settings.youtube_highlight || "";
  const youtube_desc = settings.youtube_desc || "Ikuti keseruan program, testimonial eksklusif alumni pelatihan, dokumentasi inisiasi proyek dampak sosial, serta informasi wawasan kewirausahaan secara visual melalui kanal YouTube resmi Link Productive.";
  const youtube_url = settings.youtube_url || "";
  
  let embedUrl = youtube_url.trim();
  if (embedUrl.includes("watch?v=")) {
    embedUrl = embedUrl.replace("watch?v=", "embed/");
    embedUrl = embedUrl.split("&")[0];
  } else if (embedUrl.includes("youtu.be/")) {
    embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
    embedUrl = embedUrl.split("?")[0];
  }
  
  // If the user pasted a channel link instead of a video, it can't be embedded in an iframe.
  const isEmbeddable = embedUrl.includes("/embed/");

  return (
    <section
      id="youtube-profile"
      className="relative bg-white py-20 lg:py-28 overflow-hidden w-full max-w-full border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Kolom Kiri: Teks & Informasi Saluran Youtube (Col 7) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] font-black tracking-widest text-[#FF0000] uppercase bg-[#FF0000]/5 px-3 py-1.5 rounded-full w-fit flex items-center gap-1.5">
              <Video size={14} className="stroke-[#FF0000]" /> {youtube_eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {youtube_title}{" "}
              {youtube_highlight && <span className="text-[#FF0000]">{youtube_highlight}</span>}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {youtube_desc}
            </p>
            <div className="pt-2">
              <a
                href={site.contact.youtube || "https://www.youtube.com/@link.productive"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF0000] hover:bg-[#D90000] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FF0000]/10 hover:scale-[1.02]"
              >
                Kunjungi YouTube Kami <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          {/* ── Kolom Kanan: Visual Mockup Video / Placeholder (Col 5) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            {isEmbeddable ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <iframe
                  className="w-full h-full absolute top-0 left-0"
                  src={embedUrl}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : settings.youtube_thumbnail ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 group cursor-pointer">
                <a href={site.contact.youtube || "https://www.youtube.com/@link.productive"} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <Video size={28} className="ml-1" />
                  </div>
                </a>
                <img src={settings.youtube_thumbnail} alt="YouTube Highlight" className="w-full h-full object-contain bg-slate-50" />
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-6 text-center group hover:border-[#FF0000]/30 transition-colors duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:bg-[#FF0000]/5 group-hover:text-[#FF0000] transition-all duration-300 mb-4 shadow-sm">
                  <Video size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-700 mb-1">Video Belum Tersedia</h3>
                <p className="text-xs text-slate-500 max-w-[250px]">Atur tautan video YouTube di Pengaturan Admin untuk menampilkannya di sini.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

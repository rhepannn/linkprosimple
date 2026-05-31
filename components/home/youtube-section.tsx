"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Video, ExternalLink } from "lucide-react";

import { site } from "@/data/site";

export function YoutubeSection({ settings = {} }: { settings?: Record<string, string> }) {
  const youtube_eyebrow = settings.youtube_eyebrow || "Video Profile";
  const youtube_title = settings.youtube_title || "Tonton Dokumentasi & Inkubasi Kemitraan Kami";
  const youtube_highlight = settings.youtube_highlight || "";
  const youtube_desc = settings.youtube_desc || "Ikuti keseruan program, testimonial eksklusif alumni pelatihan, dokumentasi inisiasi proyek dampak sosial, serta informasi wawasan kewirausahaan secara visual melalui kanal YouTube resmi Link Productive.";
  const youtube_url = settings.youtube_url || "";
  
  const [videoOverlayTitle, setVideoOverlayTitle] = useState("");

  let finalThumbnail = settings.youtube_thumbnail || "";
  let extractedId = "";

  if (youtube_url.includes("watch?v=")) extractedId = youtube_url.split("watch?v=")[1].split("&")[0];
  else if (youtube_url.includes("youtu.be/")) extractedId = youtube_url.split("youtu.be/")[1].split("?")[0];
  else if (youtube_url.includes("/shorts/")) extractedId = youtube_url.split("/shorts/")[1].split("?")[0];
  
  if (!extractedId && finalThumbnail && (finalThumbnail.includes("youtube.com") || finalThumbnail.includes("youtu.be"))) {
    if (finalThumbnail.includes("watch?v=")) extractedId = finalThumbnail.split("watch?v=")[1].split("&")[0];
    else if (finalThumbnail.includes("youtu.be/")) extractedId = finalThumbnail.split("youtu.be/")[1].split("?")[0];
    else if (finalThumbnail.includes("/shorts/")) extractedId = finalThumbnail.split("/shorts/")[1].split("?")[0];
  }

  if (extractedId) {
    finalThumbnail = `https://img.youtube.com/vi/${extractedId}/maxresdefault.jpg`;
  }
  
  useEffect(() => {
    if (extractedId) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${extractedId}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data && data.title) {
            setVideoOverlayTitle(data.title);
          }
        })
        .catch(err => console.error("Gagal mengambil judul video:", err));
    } else {
      if (!settings.youtube_thumbnail && site.name) {
        setVideoOverlayTitle(`${site.name} Official Channel`);
      }
    }
  }, [extractedId, settings.youtube_thumbnail]);

  const targetLink = extractedId ? `https://www.youtube.com/watch?v=${extractedId}` : (youtube_url || site.contact.youtube || "https://www.youtube.com/@link.productive");

  return (
    <section
      id="youtube-profile"
      className="relative bg-white py-20 lg:py-28 overflow-hidden w-full max-w-full border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── Kolom Kiri: Teks & Informasi Saluran Youtube ── */}
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

          {/* ── Kolom Kanan: Visual Mockup Video / Placeholder ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            {finalThumbnail ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 group cursor-pointer bg-slate-50">
                <a href={targetLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <Video size={28} className="ml-1" />
                  </div>
                </a>
                
                {/* Overlay Judul mirip YouTube */}
                {videoOverlayTitle && (
                  <div className="absolute top-0 left-0 right-0 p-4 pt-5 pb-8 bg-gradient-to-b from-black/80 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1 drop-shadow-md pr-8">
                      {videoOverlayTitle}
                    </h3>
                  </div>
                )}

                <img 
                  src={finalThumbnail} 
                  alt="YouTube Highlight" 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x450/f8fafc/94a3b8?text=Image+Not+Found";
                  }}
                />
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

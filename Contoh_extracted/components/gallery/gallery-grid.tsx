"use client";

// components/gallery/gallery-grid.tsx
// Client component — filter, masonry, lightbox dengan desain yang hangat dan estetik

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Photo, PhotoCategory } from "@/data/photos";

/* ─── Filter tabs ─────────────────────────────────────────── */

const FILTERS: { label: string; value: PhotoCategory | "all"; emoji: string }[] = [
  { label: "Semua", value: "all", emoji: "✦" },
  { label: "Solo", value: "solo", emoji: "①" },
  { label: "Couple", value: "couple", emoji: "②" },
  { label: "Family", value: "family", emoji: "③" },
  { label: "Birthday", value: "birthday", emoji: "④" },
  { label: "Graduation", value: "graduation", emoji: "⑤" },
];

/* ─── Photo Card ──────────────────────────────────────────── */

function PhotoCard({
  photo,
  index,
  onOpen,
}: {
  photo: Photo;
  index: number;
  onOpen: (i: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isPortrait = photo.width / photo.height < 1;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="relative overflow-hidden rounded-[2rem] cursor-pointer group break-inside-avoid mb-6"
      style={{ aspectRatio: isPortrait ? "3/4" : "4/3" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(index);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Buka foto: ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className="object-cover"
        style={{
          filter: hovered ? "brightness(0.68) saturate(1.1)" : "brightness(0.97)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
          transition: "filter 0.4s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Gradient dasar — selalu ada sedikit untuk kedalaman */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
        style={{ opacity: hovered ? 1 : 0.35, transition: "opacity 0.4s ease" }}
      />

      {/* Expand icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-14 h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl border border-gold/20">
          <Expand size={20} className="text-gold" />
        </div>
      </motion.div>

      {/* Nomor kecil editorial di pojok kiri atas */}
      <div
        className="absolute top-3 left-3 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <span
          className="text-[10px] font-black text-white/60 tracking-[0.2em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Category badge + alt text saat hover */}
      <div
        className="absolute bottom-0 left-0 right-0 px-6 py-6"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <span className="inline-block text-[9px] font-black tracking-[0.2em] uppercase bg-gold text-white px-3 py-1 rounded-full mb-3 shadow-lg shadow-gold/20">
          {photo.category}
        </span>
        <p className="text-sm text-white font-bold leading-snug line-clamp-2">
          {photo.alt}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── GalleryGrid Component ──────────────────────────────── */

interface GalleryGridProps {
  photos: Photo[];
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<PhotoCategory | "all">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? photos
        : photos.filter((p) => p.category === activeFilter),
    [photos, activeFilter]
  );

  const slides = useMemo(
    () => filtered.map((p) => ({ src: p.src, alt: p.alt, width: p.width, height: p.height })),
    [filtered]
  );

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      {/* ── Filter Tabs ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10">
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
          role="tablist"
          aria-label="Filter kategori foto"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
              className={[
                "flex-shrink-0 px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 min-h-[44px]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-near-black",
                activeFilter === f.value
                  ? "bg-near-black text-white shadow-xl shadow-near-black/20"
                  : "bg-white border border-border/60 text-near-black/40 hover:border-gold hover:text-gold hover:bg-white",
              ].join(" ")}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Jumlah foto */}
        <p className="text-[10px] text-near-black/40 font-black uppercase tracking-[0.2em] mt-6">
          Menampilkan{" "}
          <span className="text-gold">{filtered.length}</span>{" "}
          karya terbaik
          {activeFilter !== "all" && (
            <> · kategori <span className="text-near-black">{activeFilter}</span></>
          )}
        </p>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-28">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4"
            >
              {filtered.map((photo, i) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  index={i}
                  onOpen={openLightbox}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-warm-white flex items-center justify-center mb-6 border border-border/60 shadow-inner">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-near-black/20">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <circle cx="8.5" cy="8.5" r="2" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
              </div>
              <p
                className="text-xl font-black text-near-black mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Belum ada foto di kategori ini
              </p>
              <p className="text-sm text-near-black/40 mb-8 font-bold italic">
                Coba pilih kategori lain untuk melihat koleksi kami.
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="text-[10px] font-black text-near-black border border-near-black rounded-full px-10 py-4 uppercase tracking-[0.2em] hover:bg-near-black hover:text-white transition-all duration-300"
              >
                Lihat semua foto
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{ container: { backgroundColor: "rgba(10,10,10,0.97)" } }}
      />
    </>
  );
}

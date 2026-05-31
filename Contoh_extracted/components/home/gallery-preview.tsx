"use client";

// components/home/gallery-preview.tsx
// Bento editorial grid — 6 foto, ukuran bervariasi, tanpa ruang kosong
// Desain: hangat, manusiawi, dan estetik

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Expand, ArrowRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { photos } from "@/data/photos";
import type { Photo } from "@/data/photos";
import { btn } from "@/lib/button-classes";

/* ─── Props ─────────────────────────────────────────────────── */

interface GalleryPreviewProps {
  initialPhotos?: Photo[];
}

/* ─── Bento Layout Config ───────────────────────────────────
   Grid: 12 kolom, 3 baris.
   Setiap foto mendapat kolom + baris span yang tetap
   agar tidak ada celah kosong dan terlihat editorial.
   Layout visual:
   [  Foto 1 (4×2)  ] [  Foto 2 (4×1)  ] [  Foto 3 (4×2)  ]
                      [  Foto 4 (4×1)  ]
   [  Foto 5 (6×1)  ] [         Foto 6 (6×1)               ]
   ─────────────────────────────────────────────────────────── */

const bentoConfig = [
  { colSpan: "lg:col-span-4", rowSpan: "lg:row-span-2" }, // besar kiri
  { colSpan: "lg:col-span-4", rowSpan: "lg:row-span-1" }, // kecil tengah atas
  { colSpan: "lg:col-span-4", rowSpan: "lg:row-span-2" }, // besar kanan
  { colSpan: "lg:col-span-4", rowSpan: "lg:row-span-1" }, // kecil tengah bawah
  { colSpan: "lg:col-span-6", rowSpan: "lg:row-span-1" }, // landscape kiri
  { colSpan: "lg:col-span-6", rowSpan: "lg:row-span-1" }, // landscape kanan
];

/* ─── Animation Variants ────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ─── Photo Card ─────────────────────────────────────────────── */

interface PhotoCardProps {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
  className?: string;
}

function PhotoCard({ photo, index, onOpen, className = "" }: PhotoCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${className}`}
      style={{ minHeight: "200px" }}
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
      aria-label={`Lihat foto: ${photo.alt}`}
    >
      {/* Foto */}
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{
          filter: hovered ? "brightness(0.72)" : "brightness(0.96)",
          transition: "filter 0.4s ease, transform 0.7s ease",
        }}
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = "none";
          const parent = img.parentElement;
          if (parent) {
            parent.style.background =
              "linear-gradient(145deg, #E8E8E4 0%, #D4D3CD 100%)";
          }
        }}
      />

      {/* Gradient bawah — selalu sedikit ada untuk memberikan depth */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
        style={{ opacity: hovered ? 0.9 : 0.5, transition: "opacity 0.4s ease" }}
      />

      {/* Expand icon saat hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.22 }}
      >
        <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
          <Expand size={17} color="#1A1A1A" />
        </div>
      </motion.div>

      {/* Nomor urut kecil di pojok kiri atas — gaya editorial */}
      <div
        className="absolute top-3 left-3 transition-opacity duration-300"
        style={{ opacity: hovered ? 0 : 1 }}
      >
        <span
          className="text-[10px] font-black text-white/60 tracking-widest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Caption hover */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 py-4 transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(6px)" }}
      >
        <p className="text-xs text-white/90 leading-snug line-clamp-2 font-medium">
          {photo.alt}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────────── */

export function GalleryPreview({ initialPhotos }: GalleryPreviewProps) {
  // Use initialPhotos from props or fallback to static data if empty (for dev/initial state)
  const displayPhotos = initialPhotos && initialPhotos.length > 0 
    ? initialPhotos 
    : photos.filter(p => p.isFeatured).slice(0, 6);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const slides = displayPhotos.map((p) => ({
    src: p.src,
    alt: p.alt,
    width: p.width,
    height: p.height,
  }));

  return (
    <section
      id="gallery-preview"
      className="relative bg-warm-white py-24 lg:py-32 overflow-hidden w-full max-w-full"
      aria-labelledby="gallery-preview-heading"
    >
      {/* Dekoratif teks besar di background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <span
          className="text-[18vw] sm:text-[15vw] font-black text-near-black/[0.03] leading-none whitespace-nowrap block"
          style={{ fontFamily: "var(--font-heading)" }}
          aria-hidden="true"
        >
          GALLERY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-12 lg:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8">
            <div>
              {/* Eyebrow */}
              <p
                className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3 font-black"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Portfolio
              </p>
              <h2
                id="gallery-preview-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-near-black leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Karya Terbaik Kami
              </h2>
            </div>
            <p className="text-near-black/60 text-sm max-w-xs leading-relaxed flex-shrink-0 font-bold">
              Setiap foto adalah cerita. Kami mengabadikan momen Anda dengan
              sentuhan estetik minimalis yang timeless.
            </p>
          </div>
        </motion.div>

        {/* ── Bento Grid ── */}
        {displayPhotos.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-12 auto-rows-[220px] gap-3 lg:gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {displayPhotos.map((photo, i) => {
              const config = bentoConfig[i] ?? { colSpan: "lg:col-span-4", rowSpan: "lg:row-span-1" };
              return (
                <PhotoCard
                  key={photo.id}
                  photo={photo as any}
                  index={i}
                  onOpen={openLightbox}
                  className={`${config.colSpan} ${config.rowSpan}`}
                />
              );
            })}
          </motion.div>
        ) : (
          /* Skeleton placeholder */
          <div className="grid grid-cols-2 lg:grid-cols-12 auto-rows-[220px] gap-3 lg:gap-4">
            {bentoConfig.map((config, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-[#E0E0DA] animate-pulse ${config.colSpan} ${config.rowSpan}`}
              />
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          className="mt-12 lg:mt-14 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Kiri: info kecil */}
          <p className="text-[10px] text-near-black/40 tracking-[0.2em] font-black uppercase">
            {photos.filter(p => p.isFeatured).length}+ FOTO TERSEDIA DI GALERI LENGKAP
          </p>

          <Link
            href="/gallery"
            className={`group ${btn.secondary} rounded-full px-10 py-4 font-black uppercase tracking-[0.2em] text-[10px]`}
          >
            Lihat Semua Foto
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: "rgba(10,10,10,0.96)" },
        }}
      />
    </section>
  );
}

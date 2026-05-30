"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/photos/hero-001.png",
      title: "KUNJUNGAN UMKM PASCA PROGRAM INKUBATOR BISNIS BERKELANJUTAN DI UMKM DIMAJOPA CRAFT",
    },
    {
      image: "/photos/couple-001.png",
      title: "KONSULTASI KARIR INTENSIF CAREER READY PROGRAM LINK PRODUCTIVE",
    },
    {
      image: "/photos/family-001.png",
      title: "KOLABORASI DAMPAK NYATA DALAM SOCIAL INNOVATION BOOTCAMP",
    },
    {
      image: "/photos/studio-bg.jpg",
      title: "AKSELERASI KOMPETENSI INDUSTRI MASA DEPAN BERSAMA MITRA STRATEGIS",
    },
  ];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const slide = slides[currentIndex];

  return (
    <section
      id="hero"
      className="relative h-[85vh] min-h-[580px] md:h-[90vh] w-full overflow-hidden flex flex-col justify-between"
      aria-label="Hero Carousel — Link Productive"
    >
      {/* ── Background Slides with Framer Motion Cross-fade ── */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Beautiful deep blue/cyan modern gradient overlay to match mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#021f4a] via-[#052b61]/45 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-[1]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation Chevron Arrows (Left/Right Sides) ── */}
      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 shadow-md border border-white/10"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 shadow-md border border-white/10"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* ── Bottom Section: Headline/Caption overlay ── */}
      <div className="relative z-20 w-full mt-auto flex flex-col items-center px-6 pb-12 md:pb-16">
        <div className="max-w-4xl text-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-wide leading-snug font-sans [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]"
            >
              {slide.title}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


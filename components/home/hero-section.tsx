"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function HeroSection({ heroPhotos = [] }: { heroPhotos?: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "inovasi-sosial": return "Inovasi Sosial";
      case "pelatihan-kelas": return "Pelatihan & Kelas";
      case "kemitraan": return "Kemitraan Pentahelix";
      case "general":
      default:
        return "Umum";
    }
  };

  const defaultSlides = [
    {
      image: "",
      category: "Ekosistem Inovasi",
      title: "Membangun Ekosistem Inovasi Sosial Terintegrasi Bersama Link Productive",
    },
    {
      image: "",
      category: "Kemitraan Pentahelix",
      title: "Sinergi Kolaboratif Antara Pemerintah, Industri, dan Akademisi",
    },
    {
      image: "",
      category: "Akselerasi Kompetensi",
      title: "Akselerasi Kompetensi Masa Depan Melalui Program Pelatihan Profesional",
    },
  ];

  const slides = heroPhotos.length > 0
    ? heroPhotos.map(p => ({
        image: p.src,
        category: getCategoryLabel(p.category),
        title: p.alt,
      }))
    : defaultSlides;

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
      <div className="absolute inset-0 z-0 bg-[#003494]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {slide.image ? (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover object-center"
              />
            ) : (
              /* Premium bright blue gradient fallback — shown when no DB images uploaded yet */
              <div className="absolute inset-0 bg-gradient-to-br from-[#004aad] via-[#1a6fd4] to-sky-400">
                <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-sky-200/20 blur-[100px]" />
                <div className="absolute top-[40%] left-[30%] w-[600px] h-[300px] rounded-full bg-white/5 blur-[80px]" />
              </div>
            )}
            {/* Subtle overlay to keep text readable over photos */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#004aad]/70 via-sky-900/20 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#004aad]/30 via-transparent to-transparent z-[1]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation Chevron Arrows (Left/Right Sides) ── */}
      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={18} className="md:w-6 md:h-6" />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 pointer-events-auto hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight size={18} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* ── Bottom Section: Headline/Caption overlay ── */}
      <div className="relative z-20 w-full mt-auto flex flex-col items-center px-6 pb-20 md:pb-24">
        <div className="max-w-4xl text-center space-y-4">
          
          {/* Subtitle Category Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cat-${currentIndex}`}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <Sparkles size={11} className="animate-pulse" />
              {slide.category}
            </motion.div>
          </AnimatePresence>

          {/* Premium Headline */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-wide leading-relaxed font-sans max-w-3xl mx-auto uppercase [text-shadow:_0_2px_12px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              {slide.title}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* ── Slide Indicators / Dots ── */}
        <div className="flex gap-2.5 mt-8 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx ? "w-7 bg-sky-400" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}



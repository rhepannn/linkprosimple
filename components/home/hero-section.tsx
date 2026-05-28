"use client";

// components/home/hero-section.tsx
// Hero 3D interaktif: background training network blurred + scroll parallax + mouse parallax
// Tema Dark Navy dengan transisi mulus ke section bawah
import { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useSpring,
  useTransform,
  useScroll,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { photos, type Photo } from "@/data/photos";

interface HeroSectionProps {
  initialHeroPhoto?: Photo | null;
}

/* ─── Types ──────────────────────────────────────────────────── */

type Shape = "education" | "globe" | "rocket" | "certificate" | "briefcase" | "dot";

interface ElDef {
  id: string;
  depth: number;
  x: number;
  y: number;
  rot: number;
  size: number;
  shape: Shape;
  op: number;
  delay: number;
}

/* ─── Element definitions ────────────────────────────────────── */

const ELEMENTS: ElDef[] = [
  { id: "edu1",   depth: 0.90, x: 75, y: 22, rot: -14, size: 90,  shape: "education",   op: 0.85, delay: 0.1 },
  { id: "glb1",   depth: 0.55, x: 12, y: 26, rot:  18, size:  70, shape: "globe",       op: 0.65, delay: 0.2 },
  { id: "rkt1",   depth: 0.35, x: 85, y: 68, rot:   8, size:  65, shape: "rocket",      op: 0.45, delay: 0.3 },
  { id: "crt1",   depth: 0.70, x:  8, y: 72, rot:  -5, size:  80, shape: "certificate", op: 0.45, delay: 0.15 },
  { id: "brf1",   depth: 0.80, x: 55, y: 85, rot:  15, size:  55, shape: "briefcase",   op: 0.60, delay: 0.25 },
  { id: "glb2",   depth: 0.45, x: 60, y: 12, rot: -30, size:  50, shape: "globe",       op: 0.40, delay: 0.35 },
  { id: "dot1",   depth: 0.25, x: 92, y: 38, rot:   0, size:  18, shape: "dot",         op: 0.70, delay: 0.40 },
  { id: "dot2",   depth: 0.40, x: 25, y: 85, rot:   0, size:  12, shape: "dot",         op: 0.60, delay: 0.10 },
];

/* ─── SVG Shapes ─────────────────────────────────────────────── */

const SHAPE_COLOR = "rgba(200, 220, 255, 0.8)"; // Cool light blue

function EducationShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={SHAPE_COLOR} strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12.5V18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-5.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GlobeShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={SHAPE_COLOR} strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RocketShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={SHAPE_COLOR} strokeWidth="1.5">
      <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 3.5s2-1 3.5-2.5M12 5l-8 8v3l3 1 1-3 4-4z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5l4 4-4 4-4-4zM9 15l-1.5-1.5M19 5l-7 7M19 5a3 3 0 11-4-4c1.5.5 3.5 1.5 4 4z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CertificateShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={SHAPE_COLOR} strokeWidth="1.5">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BriefcaseShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={SHAPE_COLOR} strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DotShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" fill={SHAPE_COLOR} />
    </svg>
  );
}

function ShapeEl({ shape, size }: { shape: Shape; size: number }) {
  switch (shape) {
    case "education":   return <EducationShape s={size} />;
    case "globe":       return <GlobeShape s={size} />;
    case "rocket":      return <RocketShape s={size} />;
    case "certificate": return <CertificateShape s={size} />;
    case "briefcase":   return <BriefcaseShape s={size} />;
    case "dot":         return <DotShape s={size} />;
  }
}

/* ─── Single floating element ────────────────────────────────── */

function FloatingEl({
  el,
  mx,
  my,
  scrollY,
}: {
  el: ElDef;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const mouseTX = useTransform(mx, [0, 1], [-el.depth * 55, el.depth * 55]);
  const mouseTY = useTransform(my, [0, 1], [-el.depth * 40, el.depth * 40]);
  const scrollTY = useTransform(scrollY, [0, 700], [0, -el.depth * 200]);

  const combinedY = useTransform(
    [mouseTY, scrollTY] as [MotionValue<number>, MotionValue<number>],
    ([mVal, sVal]: number[]) => mVal + sVal
  );

  const shadow = el.depth > 0.65
    ? "drop-shadow(0 14px 32px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(0,74,173,0.2))"
    : "drop-shadow(0 6px 16px rgba(0,0,0,0.3))";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: el.op, scale: 1 }}
      transition={{
        opacity: { duration: 1.2, delay: el.delay + 0.6, ease: "easeOut" },
        scale:   { duration: 1.4, delay: el.delay + 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
      }}
      style={{
        position: "absolute",
        left: `${el.x}%`,
        top: `${el.y}%`,
        x: mouseTX,
        y: combinedY,
        rotate: el.rot,
        filter: shadow,
        zIndex: Math.round(el.depth * 12),
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <ShapeEl shape={el.shape} size={el.size} />
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────── */

export function HeroSection({ initialHeroPhoto }: HeroSectionProps) {
  const heroPhoto = initialHeroPhoto || photos.find((p) => p.isHero) || photos[0];
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse
  const rawMX = useMotionValue(0.5);
  const rawMY = useMotionValue(0.5);
  const mx = useSpring(rawMX, { stiffness: 50, damping: 18 });
  const my = useSpring(rawMY, { stiffness: 50, damping: 18 });

  // Scroll
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], ["0%", "22%"]);

  // Tilt konten mengikuti mouse
  const tiltX = useTransform(my, [0, 1], [3.5, -3.5]);
  const tiltY = useTransform(mx, [0, 1], [-5, 5]);

  // Blue glow ikut mouse
  const glowX = useTransform(mx, [0, 1], ["-20%", "20%"]);
  const glowY = useTransform(my, [0, 1], ["-12%", "12%"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawMX.set((e.clientX - rect.left) / rect.width);
    rawMY.set((e.clientY - rect.top) / rect.height);
  }, [rawMX, rawMY]);

  const handleMouseLeave = useCallback(() => {
    rawMX.set(0.5);
    rawMY.set(0.5);
  }, [rawMX, rawMY]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
      style={{ perspective: "1100px", backgroundColor: "#111E38" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero — Link Productive"
    >
      {/* ── Background foto (parallax scroll, blurred) ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {heroPhoto && (
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt}
            fill priority quality={85}
            className="object-cover object-center"
            sizes="100vw"
            style={{ filter: "blur(4px) saturate(0.9) brightness(0.75)", transform: "scale(1.05)" }}
          />
        )}
        {/* Navy professional overlay yang elegan & premium */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(17,30,56,0.92) 0%, rgba(0,74,173,0.7) 45%, rgba(17,30,56,0.98) 100%)" }}
        />
        {/* Soft Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 100%)" }}
        />
      </motion.div>

      {/* ── Blue glow ikut mouse ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: "55vw", height: "55vw",
            background: "radial-gradient(circle, rgba(0,74,173,0.15) 0%, transparent 70%)",
            x: glowX, y: glowY, left: "22%", top: "10%",
          }}
        />
      </div>

      {/* ── 3D Floating Elements ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10" style={{ transformStyle: "preserve-3d" }}>
        {ELEMENTS.map((el) => (
          <FloatingEl key={el.id} el={el} mx={mx} my={my} scrollY={scrollY} />
        ))}
      </div>

      <motion.div
        className="relative z-20 text-center px-6 sm:px-10 pt-32 md:pt-48 max-w-4xl w-full group mx-4"
        style={{ 
          rotateX: tiltX, 
          rotateY: tiltY, 
          transformStyle: "preserve-3d",
          translateY: "0%"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-6 flex items-center justify-center gap-4"
          style={{ transform: "translateZ(30px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#004AAD]" />
          <span className="text-[#8bb0f5] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] uppercase">Link Productive</span>
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#004AAD]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-6"
          style={{
            fontFamily: "var(--font-roboto), sans-serif",
            color: "#FFF",
            letterSpacing: "-0.02em",
            textShadow: "0 10px 40px rgba(0,0,0,0.8)",
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        >
          {/* Watermark Quote Tipis di Belakang Teks */}
          <span className="absolute -top-16 sm:-top-24 left-1/2 -translate-x-1/2 text-[120px] sm:text-[180px] text-white/[0.03] pointer-events-none select-none font-serif leading-none">
            &ldquo;
          </span>
          
          <span className="inline-block">Inovasi Sosial &</span>{" "}
          <br />
          <em className="italic font-medium text-[#8bb0f5]">Pendidikan Terintegrasi</em>
        </motion.h1>

        <motion.p
          className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed"
          style={{ transform: "translateZ(35px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Platform program pelatihan unggulan, inovasi sosial, dan pengembangan karir yang mempersiapkan talenta masa depan untuk dunia kerja yang kompetitif.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
          style={{ transform: "translateZ(28px)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          <Link href="/packages"
            className="group/btn inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 active:scale-95 relative overflow-hidden"
            style={{
              background: "var(--color-gold)",
              color: "white",
              boxShadow: "0 10px 30px rgba(0,74,173,0.3)",
            }}
          >
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Lihat Program</span>
            <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </Link>
          <Link href="/affiliate"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white/10 active:scale-95"
            style={{
              border: "1.5px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
            }}
          >
            Gabung Affiliate
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <span className="text-[9px] tracking-[0.35em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-roboto), sans-serif" }}>
          Scroll
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-white/40 to-transparent"
          animate={{ height: [10, 28, 10], opacity: [0.3, 0.75, 0.3] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* ── Soft Fade Overlay ke Section Bawah ── */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--color-warm-white) 0%, transparent 100%)" }}
      />
    </section>
  );
}

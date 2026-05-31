"use client";

// components/home/hero-section.tsx
// Hero 3D interaktif: background foto studio blurred + scroll parallax + mouse parallax
// Tema Dark/Warm elegann (ramah mata) dengan transisi mulus ke section bawah (#FAFAF8)
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

type Shape = "camera" | "aperture" | "frame" | "ring" | "shutter" | "dot";

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
  { id: "cam1",   depth: 0.90, x: 70, y: 20, rot: -14, size: 100, shape: "camera",   op: 0.85, delay: 0.1 },
  { id: "apt1",   depth: 0.55, x: 14, y: 24, rot:  18, size:  80, shape: "aperture", op: 0.65, delay: 0.2 },
  { id: "frm1",   depth: 0.35, x: 82, y: 64, rot:   8, size:  58, shape: "frame",    op: 0.45, delay: 0.3 },
  { id: "ring1",  depth: 0.70, x:  8, y: 68, rot:  -5, size:  90, shape: "ring",     op: 0.45, delay: 0.15 },
  { id: "sht1",   depth: 0.80, x: 52, y: 82, rot:  15, size:  48, shape: "shutter",  op: 0.60, delay: 0.25 },
  { id: "apt2",   depth: 0.45, x: 57, y: 10, rot: -30, size:  44, shape: "aperture", op: 0.40, delay: 0.35 },
  { id: "dot1",   depth: 0.25, x: 90, y: 35, rot:   0, size:  18, shape: "dot",      op: 0.70, delay: 0.40 },
  { id: "dot2",   depth: 0.40, x: 22, y: 82, rot:   0, size:  12, shape: "dot",      op: 0.60, delay: 0.10 },
  { id: "frm2",   depth: 0.30, x:  4, y: 42, rot: -12, size:  36, shape: "frame",    op: 0.35, delay: 0.45 },
  { id: "ring2",  depth: 0.85, x: 36, y: 88, rot:  45, size:  64, shape: "ring",     op: 0.30, delay: 0.50 },
];

/* ─── SVG Shapes ─────────────────────────────────────────────── */

const SHAPE_COLOR = "rgba(255, 245, 235, 0.9)"; // Soft warm white

function CameraShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s * 0.78} viewBox="0 0 100 78" fill="none">
      <rect x="4" y="18" width="92" height="52" rx="7" stroke={SHAPE_COLOR} strokeWidth="3" />
      <circle cx="50" cy="44" r="18" stroke={SHAPE_COLOR} strokeWidth="3" />
      <circle cx="50" cy="44" r="10" stroke={SHAPE_COLOR} strokeWidth="2" opacity="0.6" />
      <circle cx="50" cy="44" r="3.5" fill={SHAPE_COLOR} opacity="0.9" />
      <rect x="32" y="8" width="28" height="12" rx="4" stroke={SHAPE_COLOR} strokeWidth="2.5" />
      <rect x="7" y="22" width="13" height="9" rx="2.5" stroke={SHAPE_COLOR} strokeWidth="2" opacity="0.55" />
      <circle cx="80" cy="15" r="5" stroke={SHAPE_COLOR} strokeWidth="2.5" />
      <line x1="44" y1="44" x2="56" y2="44" stroke={SHAPE_COLOR} strokeWidth="1.5" opacity="0.4" />
      <line x1="50" y1="38" x2="50" y2="50" stroke={SHAPE_COLOR} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

function ApertureShape({ s }: { s: number }) {
  const c = Math.round(s / 2);
  const r = c - 4;
  const round2 = (n: number) => Math.round(n * 100) / 100;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <circle cx={c} cy={c} r={r} stroke={SHAPE_COLOR} strokeWidth="2.5" />
      <circle cx={c} cy={c} r={round2(r * 0.42)} stroke={SHAPE_COLOR} strokeWidth="1.8" opacity="0.5" />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <line key={i}
            x1={round2(c + Math.cos(a) * r * 0.4)} y1={round2(c + Math.sin(a) * r * 0.4)}
            x2={round2(c + Math.cos(a) * r)}        y2={round2(c + Math.sin(a) * r)}
            stroke={SHAPE_COLOR} strokeWidth="2" strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

function FrameShape({ s }: { s: number }) {
  const p = s * 0.18;
  const corners: [number, number][] = [[p, p], [s - p, p], [s - p, s - p], [p, s - p]];
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <rect x="4" y="4" width={s - 8} height={s - 8} rx="4" stroke={SHAPE_COLOR} strokeWidth="2.5" />
      {corners.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill={SHAPE_COLOR} opacity="0.75" />
      ))}
      <line x1={s/2-7} y1={s/2} x2={s/2+7} y2={s/2} stroke={SHAPE_COLOR} strokeWidth="1.8" opacity="0.45" />
      <line x1={s/2} y1={s/2-7} x2={s/2} y2={s/2+7} stroke={SHAPE_COLOR} strokeWidth="1.8" opacity="0.45" />
    </svg>
  );
}

function RingShape({ s }: { s: number }) {
  const c = s / 2;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <circle cx={c} cy={c} r={c - 3} stroke={SHAPE_COLOR} strokeWidth="2" strokeDasharray="5 3.5" />
      <circle cx={c} cy={c} r={c * 0.58} stroke={SHAPE_COLOR} strokeWidth="1.5" opacity="0.45" />
    </svg>
  );
}

function ShutterShape({ s }: { s: number }) {
  const c = s / 2, r = c - 3;
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <circle cx={c} cy={c} r={r} stroke={SHAPE_COLOR} strokeWidth="2.5" />
      <circle cx={c} cy={c} r={r * 0.5} fill={SHAPE_COLOR} opacity="0.2" />
      <circle cx={c} cy={c} r={r * 0.25} fill={SHAPE_COLOR} opacity="0.7" />
    </svg>
  );
}

function DotShape({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none">
      <circle cx={s/2} cy={s/2} r={s/2 - 1} fill={SHAPE_COLOR} />
    </svg>
  );
}

function ShapeEl({ shape, size }: { shape: Shape; size: number }) {
  switch (shape) {
    case "camera":   return <CameraShape s={size} />;
    case "aperture": return <ApertureShape s={size} />;
    case "frame":    return <FrameShape s={size} />;
    case "ring":     return <RingShape s={size} />;
    case "shutter":  return <ShutterShape s={size} />;
    case "dot":      return <DotShape s={size} />;
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
    ? "drop-shadow(0 14px 32px rgba(0,0,0,0.6)) drop-shadow(0 0 10px rgba(255,210,120,0.1))"
    : "drop-shadow(0 6px 16px rgba(0,0,0,0.4))";

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

  // Warm glow ikut mouse
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
      style={{ perspective: "1100px", backgroundColor: "var(--color-near-black)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero — Snapp.frame Studio"
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
            style={{ filter: "blur(6px) saturate(0.8) brightness(0.9)", transform: "scale(1.1)" }}
          />
        )}
        {/* Dark overlay yang elegan & ramah mata */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(93,64,55,0.85) 0%, rgba(93,64,55,0.6) 45%, rgba(93,64,55,0.95) 100%)" }}
        />
        {/* Soft Vignette */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)" }}
        />
      </motion.div>

      {/* ── Warm glow ikut mouse ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        <motion.div aria-hidden="true"
          className="absolute rounded-full"
          style={{
            width: "55vw", height: "55vw",
            background: "radial-gradient(circle, rgba(255,200,100,0.1) 0%, transparent 70%)",
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
          <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#D4A373]" />
          <span className="text-[#D4A373] text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.3em] uppercase">Snapp.frame Studio</span>
          <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#D4A373]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-6"
          style={{
            fontFamily: "var(--font-playfair), serif",
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
          
          <span className="inline-block">Yang Kamu Lihat</span>{" "}
          <em className="italic font-medium text-[#D4A373]">Hari Ini</em>
          <br />
          <span className="inline-block mt-2 sm:mt-4">Akan Kamu Rindukan</span>{" "}
          <em className="italic font-medium text-[#D4A373]">Nanti</em>
        </motion.h1>

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
              boxShadow: "0 10px 30px rgba(212,163,115,0.3)",
            }}
          >
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10">Lihat Paket</span>
            <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </Link>
          <Link href="/gallery"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 hover:bg-white/10 active:scale-95"
            style={{
              border: "1.5px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
            }}
          >
            Jelajahi Galeri
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
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-playfair), serif" }}>
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

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { getActiveTestimonials } from "@/app/actions/testimonials";

const MAX = 9;

/* ─── Star Rating ────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < rating ? "currentColor" : "transparent"}
          stroke={i < rating ? "currentColor" : "var(--color-slate-200)"}
          strokeWidth={1.5}
          className={i < rating ? "text-sky-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}

/* ─── Testimonial Card ───────────────────────────────────── */

function TestimonialCard({ t }: { t: any }) {
  return (
    <div className="flex flex-col h-full bg-white border border-slate-100 rounded-3xl p-8 hover:border-sky-100 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-sky-50/50 group hover:-translate-y-1">
      {/* Quote icon */}
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Quote size={16} className="text-sky-400" />
      </div>

      <p className="flex-1 text-sm text-sky-700 leading-relaxed mb-6 line-clamp-5 font-medium">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-50">
        <div className="flex items-center gap-3">
          {t.photoUrl ? (
            <img
              src={t.photoUrl}
              alt={t.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-sky-100 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-sky-500 uppercase">
                {t.name?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-[#004aad] leading-tight">
              {t.name}
            </p>
            {(t.role || t.programName) && (
              <p className="text-[10px] text-sky-500 font-medium uppercase tracking-wider mt-0.5">
                {t.role}{t.role && t.programName ? " · " : ""}{t.programName}
                {t.date ? ` · ${t.date}` : ""}
              </p>
            )}
          </div>
        </div>
        <StarRating rating={t.rating} />
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */

export function TestimonialsSection({ settings = {} }: { settings?: Record<string, string> }) {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getActiveTestimonials(MAX).then((res) => {
      if (res.success && res.data) {
        const shuffled = [...res.data].sort(() => Math.random() - 0.5);
        setTestimonials(shuffled);
      }
    });
  }, []);

  const testimonial_eyebrow = settings.testimonial_eyebrow || "Testimoni";
  const testimonial_title = settings.testimonial_title || "Apa Kata";
  const testimonial_highlight = settings.testimonial_highlight || "Alumni Kami";
  const testimonial_desc = settings.testimonial_desc || "Cerita sukses dan pengalaman berharga dari para alumni program pelatihan Link Productive.";

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  if (testimonials.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-b from-white via-slate-50/30 to-white py-24 lg:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-sky-50/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 lg:mb-16 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase bg-sky-50 px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            {testimonial_eyebrow}
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1a6fd4] tracking-tight mb-4"
          >
            {testimonial_title}{" "}
            {testimonial_highlight && <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">{testimonial_highlight}</span>}
          </h2>
          <p className="text-sky-600 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            {testimonial_desc}
          </p>
        </motion.div>

        {/* ── Desktop: Grid 3 kolom ── */}
        <motion.div
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {testimonials.slice(0, MAX).map((t) => (
            <motion.div
              key={t.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                },
              }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile: Carousel ── */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <TestimonialCard t={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-2xl bg-white border border-sky-100 shadow-sm flex items-center justify-center text-sky-600 hover:border-sky-200 hover:text-sky-500 transition-all duration-300"
              aria-label="Testimoni sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.slice(0, 6).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-7 bg-gradient-to-r from-sky-400 to-sky-500"
                      : "w-1.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Testimoni ${i + 1}`}
                />
              ))}
              {testimonials.length > 6 && (
                <span className="text-[10px] text-sky-500 font-bold px-1">
                  +{testimonials.length - 6}
                </span>
              )}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-sky-600 hover:border-blue-200 hover:text-blue-600 transition-all duration-300"
              aria-label="Testimoni berikutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

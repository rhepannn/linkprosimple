"use client";

import { motion } from "framer-motion";
import { FaqAccordion } from "@/components/packages/faq-accordion";
import { faqs } from "@/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="relative bg-gradient-to-b from-white to-slate-50/50 py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-sky-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase bg-sky-50 px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pertanyaan{" "}
            <span className="text-gradient-cyan">Umum</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Jawaban untuk pertanyaan yang paling sering ditanyakan seputar program pelatihan dan ekosistem di Link Productive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaqAccordion faqs={faqs} />
        </motion.div>
      </div>
    </section>
  );
}

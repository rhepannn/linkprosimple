"use client";

import { motion } from "framer-motion";
import { FaqAccordion } from "@/components/packages/faq-accordion";
import { faqs } from "@/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="relative bg-[#FDFBF7] py-24 lg:py-32 border-t border-border/40">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-near-black mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pertanyaan Umum
          </h2>
          <p className="text-near-black/60 font-bold max-w-lg mx-auto text-sm sm:text-base">
            Jawaban untuk pertanyaan yang paling sering ditanyakan seputar layanan dan sesi foto di Snapp.frame Studio.
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

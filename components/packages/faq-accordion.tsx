"use client";

// components/packages/faq-accordion.tsx
// Client component untuk FAQ accordion di halaman /packages
// Dipisah dari page.tsx agar page bisa jadi Server Component

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/data/faq";

/* ─── Accordion Item ─────────────────────────────────────── */

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-[#E8E8E4] last:border-0">
      <button
        onClick={onToggle}
        className="flex items-start justify-between w-full gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 focus-visible:ring-offset-white min-h-[56px]"
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="text-sm font-medium text-[#1A1A1A] leading-snug pr-2">
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-[#5A5A5A] mt-0.5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? "500px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="text-sm text-[#5A5A5A] leading-relaxed pb-5 pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ──────────────────────────────────────── */

interface FaqAccordionProps {
  faqs: Faq[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  // Default null — semua tertutup saat pertama dimuat
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-[#E0E0DA] px-6 lg:px-8">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          index={i}
          question={faq.question}
          answer={faq.answer}
          isOpen={openFaq === i}
          onToggle={() => setOpenFaq(openFaq === i ? null : i)}
        />
      ))}
    </div>
  );
}

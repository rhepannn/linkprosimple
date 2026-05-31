"use client";

// components/home/contact-section.tsx
// Section 7 — Kontak & Lokasi: info kontak kiri + Google Maps kanan
// Fase B: warm light background, no gold accents, icon containers putih

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/whatsapp"; //whatsapp

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-warm-white py-24 lg:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >

          {/* ── Kolom Kiri: Info Kontak ── */}
          <div>

            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-near-black mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Temukan Kami
            </h2>

            <p className="text-near-black/60 text-sm leading-relaxed mb-10 max-w-sm font-bold">
              Kami siap membantu Anda merencanakan sesi foto yang sempurna.
              Hubungi kami atau langsung kunjungi studio.
            </p>

            {/* Contact items */}
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4">
                {/* Icon container — putih bukan dark */}
                <div className="w-10 h-10 rounded-lg bg-white border border-border/60 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-near-black" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-near-black/40 uppercase tracking-[0.2em] font-black mb-1">
                    Alamat
                  </p>
                  <p className="text-sm text-near-black/80 leading-relaxed font-bold">
                    {site.contact.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-border/60 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-near-black" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-near-black/40 uppercase tracking-[0.2em] font-black mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-sm text-near-black/80 hover:text-gold transition-colors font-bold"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-border/60 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-near-black" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-near-black/40 uppercase tracking-[0.2em] font-black mb-2">
                    Jam Operasional
                  </p>
                  <ul className="space-y-1">
                    {site.operatingHours.map((h) => (
                      <li key={h.day} className="flex gap-3 text-sm font-bold">
                        <span className="text-near-black/40 w-28">{h.day}</span>
                        <span className="text-near-black/80">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppUrl("general")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-[#20bc5a] hover:-translate-y-1 shadow-lg shadow-green-500/20"
            >
              <MessageCircle size={18} />
              Chat via WhatsApp
            </a>
          </div>

          {/* ── Kolom Kanan: Google Maps ── */}
          <div className="rounded-[2.5rem] overflow-hidden border border-border/60 bg-warm-white aspect-[4/3] lg:aspect-auto lg:h-[500px] shadow-2xl shadow-near-black/5">
            {site.mapsEmbedUrl ? (
              <iframe
                src={site.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                sandbox="allow-scripts allow-same-origin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Snapp.frame Studio di Google Maps"
                aria-label="Peta lokasi Snapp.frame Studio"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 rounded-2xl">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[#C0C0BB]"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-sm text-[#888888] text-center px-4">
                  Peta lokasi akan segera tersedia.<br />
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(site.contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5A5A5A] hover:text-[#1A1A1A] underline mt-1 inline-block"
                  >
                    Buka di Google Maps →
                  </a>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

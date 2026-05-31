"use client";

// components/home/contact-section.tsx
// Premium Contact section with refined styling

import { motion } from "framer-motion";
import { MapPin, Mail, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { site } from "@/data/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactSection({ settings = {} }: { settings?: Record<string, string> }) {
  const contact_title = settings.contact_title || "Temukan Kami";
  const contact_desc = settings.contact_desc || "Kami siap membantu Anda merencanakan program pelatihan terstruktur atau kemitraan. Hubungi kami atau langsung kunjungi kantor kami.";

  return (
    <section
      id="contact"
      className="relative bg-white py-24 lg:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-50/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >

          {/* ── Left: Contact Info ── */}
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase bg-sky-50 px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Hubungi Kami
            </span>

            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 leading-tight tracking-tight"
            >
              {contact_title}
            </h2>

            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-sm">
              {contact_desc}
            </p>

            {/* Contact items */}
            <ul className="space-y-6 mb-10">
              <li className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300">
                  <MapPin size={18} className="text-slate-500 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">
                    Alamat
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                    {settings.contact_address || site.contact.address}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 group-hover:border-sky-200 group-hover:bg-sky-100 transition-all duration-300">
                  <Mail size={18} className="text-slate-500 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${settings.contact_email || site.contact.email}`}
                    className="text-sm text-slate-700 hover:text-sky-500 transition-colors font-semibold"
                  >
                    {settings.contact_email || site.contact.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-300">
                  <Clock size={18} className="text-slate-500 group-hover:text-blue-500 transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-2">
                    Jam Operasional
                  </p>
                  <ul className="space-y-1">
                    {site.operatingHours.map((h) => (
                      <li key={h.day} className="flex gap-3 text-sm font-semibold">
                        <span className="text-slate-400 w-28">{h.day}</span>
                        <span className="text-slate-700">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppUrl("general", undefined, settings?.contact_wa)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-bold text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 hover:bg-[#20bc5a] hover:-translate-y-1 hover:scale-[1.02] shadow-lg shadow-green-400/20 hover:shadow-xl hover:shadow-green-400/25 active:scale-[0.98]"
            >
              <MessageCircle size={18} />
              Chat via WhatsApp
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* ── Right: Google Maps ── */}
          <div className="rounded-3xl overflow-hidden border border-sky-100 bg-sky-50/30 aspect-[4/3] lg:aspect-auto lg:h-[500px] shadow-2xl shadow-sky-100/30">
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
                title="Lokasi Link Productive di Google Maps"
                aria-label="Peta lokasi Link Productive"
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
                  className="text-slate-300"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <p className="text-sm text-slate-400 text-center px-4">
                  Peta lokasi akan segera tersedia.<br />
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(settings.contact_address || site.contact.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline mt-1 inline-block"
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

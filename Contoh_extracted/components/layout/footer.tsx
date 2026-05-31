"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { MapPin, Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 16, fill = "currentColor" }: { size?: number, fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ size = 16, fill = "currentColor" }: { size?: number, fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Galeri Foto", href: "/gallery" },
  { label: "Paket & Harga", href: "/packages" },
  { label: "Tentang Kami", href: "/#about" },
  { label: "Kontak", href: "/#contact" },
];

const muted = { color: "#A7846A" } as const;
const normal = { color: "#5A371F" } as const;
const bright = { color: "#3B2211" } as const;

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer on POS routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/kasir")) {
    return null;
  }

  return (
    <footer style={{ backgroundColor: "#F3EBE3", borderTop: "1px solid rgba(59,34,17,0.1)" }} role="contentinfo">

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

          {/* Col 1: Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Snapp.frame Studio — Beranda"
              className="block mb-6">
              <Logo height={120} textColor="#3B2211" />
            </Link>
            <p className="text-xs leading-relaxed mb-4 max-w-[240px] relative z-10" style={normal}>
              {site.subTagline}
            </p>
            <div className="flex items-center gap-2">
              <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer"
                aria-label="Instagram Snapp.frame"
                className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200"
                style={{ backgroundColor: "rgba(59,34,17,0.05)", border: "1px solid rgba(59,34,17,0.12)" }}>
                <InstagramIcon size={13} fill="#3B2211" />
              </a>
              <a href={site.contact.tiktok} target="_blank" rel="noopener noreferrer"
                aria-label="TikTok Snapp.frame"
                className="flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200"
                style={{ backgroundColor: "rgba(59,34,17,0.05)", border: "1px solid rgba(59,34,17,0.12)" }}>
                <TikTokIcon size={13} fill="#3B2211" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigasi */}
          <div>
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ ...muted, fontFamily: "var(--font-heading)" }}>
              Halaman
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-xs hover:text-[#C88A58] transition-colors duration-200"
                    style={normal}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kontak */}
          <div>
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ ...muted, fontFamily: "var(--font-heading)" }}>
              Kontak
            </h3>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin size={11} className="mt-0.5 flex-shrink-0" style={muted} />
                <span className="text-xs leading-relaxed" style={normal}>{site.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={11} className="flex-shrink-0" style={muted} />
                <a href={`mailto:${site.contact.email}`}
                  className="text-xs hover:text-[#C88A58] transition-colors duration-200 break-all"
                  style={normal}>
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={11} className="flex-shrink-0" style={muted} />
                <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs hover:text-[#C88A58] transition-colors duration-200"
                  style={normal}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Jam Buka */}
          <div>
            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ ...muted, fontFamily: "var(--font-heading)" }}>
              Jam Buka
            </h3>
            <ul className="space-y-2">
              {site.operatingHours.map((oh) => (
                <li key={oh.day}>
                  <p className="text-[10px]" style={muted}>{oh.day}</p>
                  <p className="text-xs font-semibold" style={bright}>{oh.hours}</p>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                style={{ backgroundColor: "#1D9E75" }} />
              <span className="text-[10px] font-medium" style={{ color: "#1D9E75" }}>Buka hari ini</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Copyright ── */}
      <div style={{ borderTop: "1px solid rgba(59,34,17,0.1)" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <p className="text-[10px]" style={{ color: "#8B6145" }}>
              © {currentYear} {site.name}. All rights reserved.
            </p>
            <p className="text-[10px] hidden sm:block" style={{ color: "#8B6145" }}>
              Studio foto minimalis · {site.contact.address}
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
}

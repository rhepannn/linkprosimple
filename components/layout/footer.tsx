"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageSquare, PhoneCall, MapPin, Sparkles, ArrowRight } from "lucide-react";

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function Footer({ settings = {} }: { settings?: Record<string, string> }) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname.startsWith("/admin") || pathname.startsWith("/kasir") || pathname.startsWith("/snapper")) {
    return null;
  }

  return (
    <footer className="bg-white text-slate-700" role="contentinfo">

      {/* ── CTA Banner ── */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[300px] h-[300px] bg-sky-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[250px] h-[250px] bg-sky-50/40 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 py-14 px-6 sm:px-8 lg:px-12 border-b border-sky-100">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={24} className="text-sky-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Hi Productivers,</h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">Masih Bingung Tentang Layanan di Link Productive?</p>
              </div>
            </div>
            <a
              href={settings.contact_wa ? `https://wa.me/${settings.contact_wa}?text=Halo%20Link%20Productive,%20saya%20ingin%20bertanya%20tentang%20layanan%20program.` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-bold text-sm rounded-2xl transition-all duration-300 shadow-lg shadow-sky-400/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              <PhoneCall size={16} /> Kami Siap Membantu Anda
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-extrabold text-sm shadow-lg shadow-sky-400/20">
                LP
              </div>
              <div>
                <h4 className="text-base font-extrabold text-slate-800 uppercase tracking-wider">Link Productive</h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">#1 Integrated Tech to Increase Your Productivity</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm">
              Part of **PT. INTEGRASI PRODUKTIVITAS INDONESIA**. Platform program pelatihan unggulan, inovasi sosial, dan pengembangan karir.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { name: "Instagram", icon: InstagramIcon, href: settings.contact_ig || "#", color: "from-pink-400 to-purple-400" },
                { name: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com/company/linkproductive", color: "from-sky-400 to-sky-500" },
                { name: "YouTube", icon: YoutubeIcon, href: settings.contact_youtube || "#", color: "from-red-400 to-red-500" },
                { name: "TikTok", icon: TikTokIcon, href: settings.contact_tiktok || "#", color: "from-slate-500 to-slate-600" },
              ].map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${soc.color} text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm`}
                    aria-label={soc.name}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Offices */}
          <div className="md:col-span-4 space-y-5">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Kantor Kami</h5>
            <ul className="space-y-4 text-xs text-slate-500 font-medium">
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Head Office Cilegon, Banten :</p>
                  <p className="mt-0.5 leading-relaxed">Office Business BBS III Blok B3, No 9, Cilegon, Banten</p>
                </div>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin size={16} className="text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Office Jogja :</p>
                  <p className="mt-0.5 leading-relaxed">Jl. Daradasih No. 28A, Patangpuluhan, Wirobrajan, Yogyakarta</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Download */}
          <div className="md:col-span-3 space-y-5">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Unduh Aplikasi</h5>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3 p-3 bg-sky-50/60 border border-sky-100 rounded-2xl group hover:bg-sky-50 transition-all duration-300 cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors shadow-sm">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Unduh di</p>
                  <p className="text-xs font-bold text-slate-700">Google Play Store</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-sky-50/60 border border-sky-100 rounded-2xl group hover:bg-sky-50 transition-all duration-300 cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors shadow-sm">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Unduh di</p>
                  <p className="text-xs font-bold text-slate-700">Apple App Store</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Copyright ── */}
      <div className="border-t border-sky-100 py-6 text-center bg-sky-50/30">
        <div className="max-w-7xl mx-auto px-6 text-xs text-slate-400 font-semibold">
          © {currentYear} LinkProductive · All Right Reserved
        </div>
      </div>

    </footer>
  );
}
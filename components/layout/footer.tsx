"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { site } from "@/data/site";
import { MessageSquare, PhoneCall, MapPin, Sparkles, ArrowRight, Instagram, Linkedin, Youtube } from "lucide-react";

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
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
              href={`https://wa.me/${site.contact.whatsapp}?text=Halo%20Link%20Productive,%20saya%20ingin%20bertanya%20tentang%20layanan%20program.`}
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
                { name: "Instagram", icon: Instagram, href: site.contact.instagram, color: "from-pink-400 to-purple-400" },
                { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/linkproductive", color: "from-sky-400 to-sky-500" },
                { name: "YouTube", icon: Youtube, href: "https://youtube.com/@linkproductive", color: "from-red-400 to-red-500" },
                { name: "TikTok", icon: TikTokIcon, href: site.contact.tiktok, color: "from-slate-500 to-slate-600" },
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

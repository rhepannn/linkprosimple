"use client";

// components/layout/navbar.tsx
// Premium Navbar: Floating glass desktop / Bottom tab mobile
// Updated for Outfit + Inter font system

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogIn,
  Image as ImageIcon,
  Package,
  MessageCircle,
  User,
  HeartHandshake,
} from "lucide-react";

/* ─── Nav Links ────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "/", icon: User, isHidden: false },
  { label: "Kegiatan", href: "/gallery", icon: ImageIcon, isHidden: false },
  { label: "Pelatihan", href: "/daftar-pelatihan", icon: Package, isHidden: false },
  { label: "Affiliate", href: "/affiliate", icon: HeartHandshake, isHidden: false },
  { label: "Login", href: "/login", icon: LogIn, isHidden: false },
] as const;

/* ─── Component ────────────────────────────────────────────── */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Track scroll threshold for bubble effect
  const handleScroll = useCallback(() => {
    const threshold = window.innerHeight * 0.8;
    setScrolled(window.scrollY > threshold);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (pathname.startsWith("/admin") || pathname.startsWith("/kasir")) {
    return null;
  }

  return (
    <>
      {/* ── Desktop Navbar ─────────────────────────────────── */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 justify-center pointer-events-none">
        <motion.div
          layout
          initial={false}
          animate={{
            height: scrolled ? "6rem" : "8.5rem",
            width: scrolled ? "min(1400px, 92%)" : "100%",
            marginTop: scrolled ? "1.25rem" : "0rem",
            paddingLeft: scrolled ? "2.5rem" : "0rem",
            paddingRight: scrolled ? "2.5rem" : "0rem",
            borderRadius: scrolled ? "100px" : "0px",
            backgroundColor: scrolled
              ? "rgba(248, 250, 255, 0.88)"
              : "rgba(248, 250, 255, 1)",
            backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
            boxShadow: scrolled
              ? "0 20px 40px -15px rgba(10, 14, 26, 0.1), 0 0 0 1px rgba(0, 74, 173, 0.05)"
              : "0 0 0 0 rgba(10, 14, 26, 0)",
            border: scrolled
              ? "1px solid rgba(0, 74, 173, 0.06)"
              : "1px solid rgba(0, 74, 173, 0)",
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
          }}
          className="relative pointer-events-auto overflow-visible group w-auto"
        >
          <nav className="max-w-[1600px] mx-auto px-12 flex items-center justify-between h-full">
            <Link
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex-shrink-0 focus:outline-none transition-all duration-300 ml-8"
              aria-label="Link Productive"
            >
              <Logo height={scrolled ? 120 : 180} />
            </Link>

            <ul className="flex items-center gap-10" role="menubar">
              {NAV_LINKS.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={[
                      "relative text-xs md:text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-300",
                      "font-[family-name:var(--font-heading)]",
                      link.isHidden
                        ? "opacity-0 hover:opacity-100 !text-near-black"
                        : isActive(link.href)
                          ? "text-near-black"
                          : "text-near-black/50 hover:text-near-black",
                      "group/link",
                    ].join(" ")}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"
                      />
                    )}
                    {!isActive(link.href) && (
                      <span className="absolute -bottom-1.5 left-0 h-0.5 bg-near-black/15 w-0 group-hover/link:w-full transition-all duration-300 ease-out rounded-full" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </header>



      {/* ── Mobile Bottom Navbar ──────────────── */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/85 backdrop-blur-2xl border border-slate-200/60 rounded-[2.5rem] px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-around w-full max-w-[480px] shadow-2xl shadow-slate-900/8 pointer-events-auto"
        >
          {NAV_LINKS.filter((l) => !l.isHidden).map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative flex flex-col items-center gap-0.5 px-1 sm:px-2.5 py-0.5 transition-all duration-300 group"
              >
                <div
                  className={[
                    "w-9 h-7 sm:w-12 sm:h-8 flex items-center justify-center rounded-2xl transition-all duration-300",
                    active
                      ? "bg-sky-50 text-sky-500"
                      : "text-slate-400 group-active:scale-90",
                  ].join(" ")}
                >
                  <Icon size={18} className="sm:w-[22px] sm:h-[22px]" strokeWidth={active ? 2.5 : 2} />
                </div>
                <span
                  className={[
                    "text-[8px] sm:text-[10px] font-bold uppercase tracking-wide transition-colors duration-300 mt-0.5",
                    active ? "text-sky-500" : "text-slate-400",
                  ].join(" ")}
                >
                  {link.label}
                </span>

                {active && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-1 w-1 h-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}

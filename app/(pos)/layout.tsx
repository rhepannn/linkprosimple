"use client";

import React, { useState, useEffect, Suspense } from "react";
import { site } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import {
  LayoutDashboard,
  ShoppingBag,
  Ticket,
  Settings,
  LogOut,
  Users,
  ChevronRight,
  Calendar,
  ShoppingCart,
  Menu,
  X,
  Package,
  History,
  Image as ImageIcon,
  HeartHandshake,
  Megaphone,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signOut, getSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Manajemen Program", icon: Package, href: "/admin/products" },
  { label: "Kelola Galeri", icon: ImageIcon, href: "/admin/gallery" },
  { label: "Data Peserta", icon: Users, href: "/admin/bookings" },
  { label: "Promo & Referral", icon: Ticket, href: "/admin/referrals" },
  { label: "Kelola Affiliasi", icon: HeartHandshake, href: "/admin/affiliators" },
  { label: "Laporan & Pelanggan", icon: History, href: "/admin/reports" },
  { label: "Pengaturan Web", icon: Settings, href: "/admin/settings" },
];

function POSLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat("id-ID", options);
      setTimeStr(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    getSession().then((s) => {
      setSession(s);
      setLoadingSession(false);
    });
  }, []);

  useEffect(() => {
    const handleOpenSidebar = () => setIsSidebarOpen(true);
    window.addEventListener("open-sidebar", handleOpenSidebar);
    return () => window.removeEventListener("open-sidebar", handleOpenSidebar);
  }, []);

  const role = session?.user?.role || "ADMIN";

  const activeNavItems = (() => {
    if (loadingSession) return [];
    if (role === "ADMIN") return navItems;
    if (role === "SNAPPER") {
      return [
        { label: "Dashboard Affiliate", icon: LayoutDashboard, href: "/snapper" },
        { label: "Kit Promosi", icon: Megaphone, href: "/snapper?tab=kit" },
        { label: "Feed Promosi", icon: ImageIcon, href: "/snapper?tab=feed" },
        { label: "Rekening Payout", icon: Settings, href: "/snapper?tab=bank" },
      ];
    }
    return [];
  })();

  const currentTab = searchParams.get("tab");

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#f5f8fc] text-near-black border-r border-near-black/5 relative">
      {/* ── Logo Section ────────────────────────────────── */}
      <div className="pt-8 pb-4 flex flex-col items-center px-4">
        <Link href={loadingSession ? "#" : role === "SNAPPER" ? "/snapper" : "/admin"} className="w-full flex justify-center group">
          <img 
            src="/logo-linkpro.png" 
            alt="Link Productive Logo" 
            style={{ width: "220px", height: "auto" }}
            className="object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </Link>
      </div>

      {/* ── Navigation ──────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto pt-0 pb-4 px-4 custom-scrollbar space-y-1">
        {activeNavItems.map((item) => {
          const Icon = item.icon;
          const itemTab = item.href.includes("?tab=") ? item.href.split("?tab=")[1] : null;
          
          const isActive = itemTab 
            ? (pathname === "/snapper" && currentTab === itemTab)
            : (pathname === item.href.split("?")[0] && !currentTab);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-gold/10 text-near-black ring-1 ring-gold/20"
                    : "text-near-black/60 hover:bg-near-black/5 hover:text-near-black"
                }
              `}
            >
              <div
                className={`transition-transform duration-300 ${isActive ? "scale-105" : "group-hover:scale-105"}`}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? "text-near-black" : ""}
                />
              </div>
              <span
                className={`text-[11px] tracking-wide uppercase font-black`}
              >
                {item.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="sidebar-active-line"
                  className="absolute left-0 w-1 h-4 bg-gold rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Profile Section ──────────────────────────────── */}
      <div className="p-4 border-t border-near-black/5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-near-black/5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-near-black flex items-center justify-center text-white font-black text-[10px]">
              {session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "US"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-near-black truncate uppercase tracking-wider">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[8px] text-muted font-bold truncate uppercase tracking-widest">
                {loadingSession ? "Loading..." : role === "ADMIN" ? "Administrator" : "Affiliate Partner"}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-near-black/5 text-near-black/30 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all text-[9px] font-black uppercase tracking-[0.2em]"
          >
            <LogOut size={12} />
            Keluar Sistem
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#111e38] font-sans flex overflow-hidden h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col z-50 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#0f172a] z-[70] lg:hidden shadow-2xl"
            >
              <div className="absolute right-4 top-4 z-50">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Header */}
        <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-[#111e38]/5 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm shadow-[#111e38]/2">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2.5 -ml-2 text-[#111e38] hover:bg-[#111e38]/5 rounded-xl transition-colors"
              >
                <Menu size={22} />
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg font-black text-[#111e38] tracking-tight">
                  {activeNavItems.find((i) => {
                    const itemTab = i.href.includes("?tab=") ? i.href.split("?tab=")[1] : null;
                    return itemTab 
                      ? (pathname === "/snapper" && currentTab === itemTab)
                      : (pathname === i.href.split("?")[0] && !currentTab);
                  })?.label || "Dashboard"}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Server Operational
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden md:flex items-center gap-4 mr-4">
                {timeStr && (
                  <div className="flex items-center gap-2 bg-[#f5f8fc] px-3.5 py-1.5 rounded-xl border border-[#111e38]/5 mr-2">
                    <Clock size={12} className="text-[#004aad] animate-pulse" />
                    <div className="text-right">
                      <p className="text-[10px] font-black text-[#111e38] tracking-wider font-mono leading-none">
                        {timeStr} WIB
                      </p>
                      <p className="text-[7px] text-[#111e38]/40 font-black uppercase tracking-widest mt-0.5 leading-none">
                        REALTIME
                      </p>
                    </div>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-[11px] font-black text-[#111e38] uppercase tracking-wider">
                    Platform Status
                  </p>
                  <p className="text-[9px] text-green-600 font-bold uppercase">
                    Online & Synced
                  </p>
                </div>
                <div className="w-px h-8 bg-[#111e38]/10" />
              </div>
            </div>
          </header>

        <main className="flex-1 overflow-hidden relative">
          <div id="main-scroll-container" className="h-full overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f8fc] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#004aad]/20 border-t-[#004aad] animate-spin" />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Loading Console System...</p>
      </div>
    }>
      <POSLayoutContent>{children}</POSLayoutContent>
    </Suspense>
  );
}

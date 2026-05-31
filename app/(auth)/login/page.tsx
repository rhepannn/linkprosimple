"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Mail, Lock, Loader2, Zap, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { loginUser } from "@/app/actions/auth";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      if (res && !res.success) {
        setError(res.error || "Email atau password salah. Silakan coba lagi.");
      }
    } catch (err: any) {
      console.error("Login client error:", err);
      setError("Terjadi kesalahan sistem. Coba lagi sebentar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-[#f0f7ff] to-white flex items-start md:items-center justify-center p-6 relative overflow-hidden font-[family-name:var(--font-heading)]">
      
      {/* ── Background Mesh & Ambient Glow Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft background grid pattern in sky blue */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{
            backgroundImage: "linear-gradient(#e0f2fe 1px, transparent 1px), linear-gradient(90deg, #e0f2fe 1px, transparent 1px)",
            backgroundSize: "45px 45px"
          }}
        />

        {/* Elegant floating light-blue ambient lights */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-15%] left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/20 via-sky-300/10 to-transparent blur-[120px]"
        />
        
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-15%] right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#004aad]/12 via-sky-200/20 to-transparent blur-[140px]"
        />

        {/* Decorative subtle glass bubble */}
        <div className="absolute top-[20%] right-[15%] w-32 h-32 rounded-full bg-white/40 border border-white/60 backdrop-blur-sm pointer-events-none shadow-sm opacity-50" />
        <div className="absolute bottom-[20%] left-[10%] w-24 h-24 rounded-full bg-white/30 border border-white/40 backdrop-blur-[2px] pointer-events-none shadow-sm opacity-40 animate-bounce" style={{ animationDuration: '6s' }} />
      </div>

      {/* ── Top Back Button ── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="absolute top-6 left-6 md:top-8 md:left-8 z-50"
      >
        <Link
          href="/"
          className="group flex items-center justify-center rounded-full bg-white hover:bg-sky-50/50 border border-sky-100 text-slate-500 hover:text-[#004aad] transition-all duration-300 shadow-md shadow-sky-100/10 active:scale-95 w-11 h-11 md:w-auto md:h-auto md:px-5 md:py-2.5"
          aria-label="Kembali ke Beranda"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform text-[#004aad] flex-shrink-0" />
          <span className="hidden md:inline ml-2 text-xs font-black tracking-widest uppercase">
            Kembali ke Beranda
          </span>
        </Link>
      </motion.div>

      {/* ── Main Container ── */}
      <div className="w-full max-w-[440px] relative z-10 pt-12 md:pt-16">

        {/* ── Branding Header ── */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative mb-4"
          >
            <div className="relative group flex justify-center w-full">
              <Logo height={140} className="opacity-100 text-[#004aad] transition-transform duration-500 group-hover:scale-[1.02] max-w-full" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase" 
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Link Productive
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[10px] font-black text-[#004aad] uppercase tracking-[0.2em] mt-3"
          >
            Silakan masuk untuk melanjutkan
          </motion.p>
        </div>

        {/* ── Login Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,74,173,0.06)] overflow-hidden"
        >
          {/* Card subtle top border highlight with sky to deep blue gradient */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-sky-400 via-sky-300 to-[#004aad]" />
          
          <div className="mb-8">
            <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">
              Login Akun
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">
                Alamat Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300 group-focus-within:text-[#004aad] transition-colors duration-300"
                  size={15}
                />
                <input
                  type="email"
                  required
                  placeholder="Masukkan alamat email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-sky-50/30 border border-sky-100 hover:border-sky-200 focus:border-[#004aad] rounded-2xl py-4 pl-11 pr-4 text-xs font-bold text-slate-800 placeholder:text-slate-400/50 focus:outline-none focus:ring-4 focus:ring-[#004aad]/5 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">
                Kata Sandi
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300 group-focus-within:text-[#004aad] transition-colors duration-300"
                  size={15}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Masukkan kata sandi Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-sky-50/30 border border-sky-100 hover:border-sky-200 focus:border-[#004aad] rounded-2xl py-4 pl-11 pr-11 text-xs font-bold text-slate-800 placeholder:text-slate-400/50 focus:outline-none focus:ring-4 focus:ring-[#004aad]/5 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300 hover:text-slate-600 transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 text-rose-500 text-xs font-bold text-center leading-normal"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Registration Notification */}
            <AnimatePresence>
              {isRegistered && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-emerald-600 text-xs font-bold text-center leading-normal"
                >
                  Registrasi berhasil! Silakan masuk dengan email dan kata sandi Anda.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-4 bg-gradient-to-r from-sky-400 to-[#004aad] hover:from-[#004aad] hover:to-sky-400 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-md shadow-sky-500/10 hover:shadow-lg hover:shadow-sky-500/20 flex items-center justify-center gap-3 disabled:opacity-60 transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin text-white" />
              ) : (
                <>
                  <LogIn size={14} />
                  Masuk
                </>
              )}
            </motion.button>

            <p className="text-center text-[10px] text-slate-400 font-bold pt-2.5">
              Ingin mendaftar kemitraan?{" "}
              <Link href="/affiliate" className="text-[#004aad] hover:underline font-black">
                Informasi Kemitraan
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Footer Credits */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8 text-slate-500 text-[8px] font-black uppercase tracking-[0.3em]"
        >
          © {new Date().getFullYear()} Link Productive · All Rights Reserved
        </motion.p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 rounded-full border-4 border-[#004aad]/10 border-t-[#004aad] animate-spin" />
        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Memuat Halaman...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

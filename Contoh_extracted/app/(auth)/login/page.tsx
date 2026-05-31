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
    <div className="min-h-screen bg-[#090503] flex items-center justify-center p-6 relative overflow-hidden font-[family-name:var(--font-lato)]">
      
      {/* ── Background Mesh & Ambient Glow Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1F120A] via-[#090503] to-[#050302]" />
        
        {/* Elegant floating abstract ambient lights */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#C88A58]/12 to-transparent blur-[130px]"
        />
        
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-20%] right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#9B5F34]/8 to-transparent blur-[140px]"
        />

        <motion.div
          animate={{
            y: [0, -30, 20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#C88A58]/5 blur-[90px]"
        />

        {/* Premium Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200, 138, 88, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 138, 88, 0.15) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
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
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-white/50 hover:text-white transition-all duration-300 text-xs font-bold tracking-wider uppercase backdrop-blur-md"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </Link>
      </motion.div>

      {/* ── Main Container ── */}
      <div className="w-full max-w-[450px] relative z-10">

        {/* ── Branding Header ── */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative mb-5"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#C88A58]/20 rounded-[30px] blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-24 h-24 rounded-[30px] bg-[#120B07] border border-white/[0.08] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 transition-transform duration-500 group-hover:scale-[1.03]">
                <Logo height={56} className="brightness-0 invert opacity-95" />
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 15 }}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-gradient-to-br from-[#D49A6E] to-[#B07043] rounded-full flex items-center justify-center shadow-lg border border-black/30 z-20"
            >
              <Zap size={12} className="text-white fill-white" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-extrabold text-white tracking-tight leading-none" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Snapp.frame Studio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[10px] font-black text-white uppercase tracking-[0.4em] mt-3"
          >
            Admin & Kasir Gatekeeper
          </motion.p>
        </div>

        {/* ── Glassmorphic Login Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[32px] p-8 md:p-10 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Card subtle lighting border reflex */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C88A58]/20 to-transparent" />
          
          <div className="mb-7">
            <span className="text-[9px] font-black text-[#C88A58] uppercase tracking-[0.3em] block mb-1">
              Secure Auth
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Masuk ke Portal
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1 block">
                Alamat Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C88A58] transition-colors duration-300"
                  size={16}
                />
                <input
                  type="email"
                  required
                  placeholder="admin@snappframe.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] focus:border-[#C88A58] rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-[#C88A58]/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1 block">
                Kata Sandi
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C88A58] transition-colors duration-300"
                  size={16}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] focus:border-[#C88A58] rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-4 focus:ring-[#C88A58]/10 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors duration-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                  className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 text-rose-400 text-xs font-semibold text-center leading-normal"
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
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-emerald-400 text-xs font-semibold text-center leading-normal"
                >
                  Registrasi berhasil! Silakan masuk dengan email dan kata sandi Anda.
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, translateY: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-gradient-to-r from-[#B57545] via-[#C88A58] to-[#D99A68] hover:from-[#C88A58] hover:to-[#E5AB7A] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-[0_12px_24px_-8px_rgba(200,138,88,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(200,138,88,0.5)] flex items-center justify-center gap-3 disabled:opacity-60 transition-all duration-300 relative overflow-hidden"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <LogIn size={15} />
                  Akses Dashboard
                </>
              )}
            </motion.button>

            <p className="text-center text-[10px] text-white/30 font-medium pt-3">
              Ingin menjadi affiliator?{" "}
              <Link href="/register" className="text-[#C88A58] font-bold hover:underline">
                Daftar Sebagai Snapper
              </Link>
            </p>
          </form>
        </motion.div>

        {/* Footer Credits */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-8 text-white text-[9px] font-bold uppercase tracking-[0.3em]"
        >
          © {new Date().getFullYear()} Snapp.Frame Studio · All Rights Reserved
        </motion.p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#090503] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#C88A58]/20 border-t-[#C88A58] animate-spin" />
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Loading Login Portal...</p>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

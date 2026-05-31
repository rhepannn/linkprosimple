"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Lock, Loader2, Zap, Eye, EyeOff, ArrowLeft, 
  Phone, Landmark, CreditCard, Gift, Sparkles, CheckCircle2 
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { registerSnapper } from "@/app/actions/register";
import { toast } from "sonner";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bankName: "",
    bankAccount: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "referralCode" ? value.toUpperCase().trim() : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (form.password.length < 6) {
      setError("Kata sandi harus minimal 6 karakter.");
      return;
    }
    if (!/^[A-Z0-9]+$/.test(form.referralCode)) {
      setError("Kode referral hanya boleh berisi huruf dan angka.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await registerSnapper(form);

      if (!res.success) {
        setError(res.error || "Pendaftaran gagal.");
      } else {
        toast.success("Registrasi Snapper Berhasil!");
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?registered=true");
        }, 3000);
      }
    } catch {
      setError("Terjadi kesalahan sistem. Coba lagi sebentar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090503] flex items-center justify-center p-6 relative overflow-y-auto font-[family-name:var(--font-lato)] py-12">
      
      {/* ── Background Mesh & Ambient Glow Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1F120A] via-[#090503] to-[#050302]" />
        
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-5%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#C88A58]/10 to-transparent blur-[120px]"
        />
        
        <motion.div
          animate={{
            x: [0, -20, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#9B5F34]/8 to-transparent blur-[130px]"
        />

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200, 138, 88, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 138, 88, 0.15) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ── Main Container ── */}
      <div className="w-full max-w-[550px] relative z-10 my-auto">
        
        {/* ── Top Back Button ── */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 flex justify-start"
        >
          <Link
            href="/login"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] text-white/50 hover:text-white transition-all duration-300 text-xs font-bold tracking-wider uppercase"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Login
          </Link>
        </motion.div>

        {/* ── Branding Header ── */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block relative mb-3"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#C88A58]/20 rounded-[24px] blur-sm opacity-50" />
              <div className="w-16 h-16 rounded-[24px] bg-[#120B07] border border-white/[0.08] flex items-center justify-center relative z-10">
                <Logo height={36} className="brightness-0 invert opacity-95" />
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#D49A6E] to-[#B07043] rounded-full flex items-center justify-center shadow-lg border border-black/30 z-20"
            >
              <Sparkles size={10} className="text-white fill-white" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-extrabold text-white tracking-tight" 
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Gabung Sebagai Snapper
          </motion.h1>
          <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] mt-1.5">
            Dapatkan Fee Affiliasi Snapp.frame
          </p>
        </div>

        {/* ── Glassmorphic Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[28px] p-6 md:p-8 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C88A58]/20 to-transparent" />
          
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-white">Pendaftaran Berhasil!</h3>
                <p className="text-sm text-white/60 max-w-sm">
                  Selamat, akun Snapper Anda sudah aktif. Anda akan dialihkan ke halaman login untuk masuk ke dashboard Anda...
                </p>
                <Loader2 className="animate-spin text-[#C88A58] mt-4" size={24} />
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Section: Akun & Kontak */}
                <div>
                  <h3 className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.25em] mb-3 border-b border-white/5 pb-1">
                    Informasi Profil & Akun
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama Lengkap */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Nama Lengkap
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Budi Santoso"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="budi@example.com"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        No. WhatsApp (Aktif)
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="62812345678"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Preferred Referral Code */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
                        Kode Referral Kustom <Gift size={10} className="text-[#C88A58]" />
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#C88A58]">@</span>
                        <input
                          type="text"
                          name="referralCode"
                          required
                          value={form.referralCode}
                          onChange={handleChange}
                          placeholder="BUDI10"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-9 pr-4 text-xs font-bold text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Rekening Payout */}
                <div className="pt-2">
                  <h3 className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.25em] mb-3 border-b border-white/5 pb-1">
                    Informasi Pembayaran Payout
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Bank Name */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Nama Bank
                      </label>
                      <div className="relative">
                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type="text"
                          name="bankName"
                          required
                          value={form.bankName}
                          onChange={handleChange}
                          placeholder="BCA / Mandiri / GoPay"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Bank Account Number */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Nomor Rekening / E-Wallet
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type="text"
                          name="bankAccount"
                          required
                          value={form.bankAccount}
                          onChange={handleChange}
                          placeholder="1234567890"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section: Kata Sandi */}
                <div className="pt-2">
                  <h3 className="text-[10px] font-black text-[#C88A58] uppercase tracking-[0.25em] mb-3 border-b border-white/5 pb-1">
                    Kata Sandi Keamanan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Password */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Kata Sandi
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={form.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-11 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 focus:outline-none"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">
                        Konfirmasi Kata Sandi
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          required
                          value={form.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full bg-white/[0.03] border border-white/[0.06] focus:border-[#C88A58] rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-rose-400 text-xs font-semibold text-center leading-normal"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.01, translateY: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#B57545] via-[#C88A58] to-[#D99A68] hover:from-[#C88A58] hover:to-[#E5AB7A] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] shadow-[0_12px_24px_-8px_rgba(200,138,88,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(200,138,88,0.5)] flex items-center justify-center gap-3 disabled:opacity-60 transition-all duration-300 relative overflow-hidden"
                >
                  {loading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <Sparkles size={13} />
                      Daftar Akun Snapper
                    </>
                  )}
                </motion.button>

                <p className="text-center text-[10px] text-white/30 font-medium pt-2">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="text-[#C88A58] font-bold hover:underline">
                    Masuk Portal
                  </Link>
                </p>

              </form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer Credits */}
        <p className="text-center mt-6 text-white text-[8px] font-bold uppercase tracking-[0.3em] opacity-20">
          © {new Date().getFullYear()} Snapp.Frame Studio · All Rights Reserved
        </p>
      </div>
    </div>
  );
}

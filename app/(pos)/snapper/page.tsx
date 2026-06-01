"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import {
  DollarSign, Gift, Copy, Check, Landmark, CreditCard,
  TrendingUp, Users, Share2, ExternalLink, Sparkles, Clock,
  CheckCircle2, Calendar, ImageIcon, BookOpen, AlertCircle, Phone,
  GraduationCap, Award, Building, Coffee, MonitorPlay, Presentation,
  Recycle, ShoppingBag, Camera, Handshake, ChevronDown, ChevronUp, ChevronRight,
  Download, Megaphone, Send, ChevronLeft, X
} from "lucide-react";
import { getSnapperDashboardData, updateSnapperReferralProduct } from "@/app/actions/snapper";
import { getAffiliatePosts } from "@/app/actions/affiliate-posts";
import { getProducts } from "@/app/actions/products";
import { getSiteSettings } from "@/app/actions/settings";
import { toast } from "sonner";

interface Commission {
  id: string;
  bookingId: string;
  amount: number;
  status: string;
  createdAt: string;
  booking: {
    invoiceNo: string;
    customerName: string;
    packageName: string;
    sessionDate: string;
    finalPrice: number;
  };
}

interface AffiliatePost {
  id: string;
  imageUrl: string;
  caption: string;
  hashtags: string[];
  likeCount: number;
  isPublished: boolean;
  postedBy: string;
  createdAt: Date | string;
}

const skuIconMap: Record<string, React.ComponentType<any>> = {
  "lp-academic": GraduationCap,
  "lp-career": Award,
  "lp-entrepreneur": TrendingUp,
  "bisapreneur": Building,
  "baristara": Coffee,
  "cuan-creator": MonitorPlay,
  "tekno-ai": Presentation,
  "mental-bahasa": Users,
  "green": Recycle,
  "brand-siap": ShoppingBag,
  "standara": Handshake,
};

function getSkuIcon(sku: string) {
  for (const [key, Icon] of Object.entries(skuIconMap)) {
    if (sku.includes(key)) return Icon;
  }
  return Sparkles;
}

// Share to platform
async function shareToSocial(platform: string, posterUrls: string[], caption: string, referralLink: string) {
  const fullText = `${caption}\n\n${referralLink}`;
  const encodedText = encodeURIComponent(fullText);
  const encodedLink = encodeURIComponent(referralLink);

  // Try native Web Share API first (mobile — can share files)
  if (platform === "native" && typeof navigator !== "undefined" && navigator.share) {
    try {
      // If we have poster images, try to fetch and share as files
      if (posterUrls.length > 0) {
        try {
          const filePromises = posterUrls.slice(0, 3).map(async (url, i) => {
            const resp = await fetch(url);
            const blob = await resp.blob();
            const ext = blob.type.includes("png") ? "png" : "jpg";
            return new File([blob], `poster-${i + 1}.${ext}`, { type: blob.type });
          });
          const files = await Promise.all(filePromises);
          if (navigator.canShare && navigator.canShare({ files })) {
            await navigator.share({ files, title: "Kit Promosi Affiliate", text: fullText });
            return;
          }
        } catch (_) { }
      }
      // Fallback: share text + link only
      await navigator.share({ title: "Kit Promosi Affiliate", text: fullText, url: referralLink });
    } catch (e: any) {
      if (e?.name !== "AbortError") toast.error("Gagal share native.");
    }
    return;
  }

  // Platform-specific deep links
  switch (platform) {
    case "whatsapp":
      window.open(`https://wa.me/?text=${encodedText}`, "_blank");
      break;
    case "instagram":
      // Instagram doesn't allow direct text/image share via URL
      // Copy caption + link to clipboard, then open Instagram
      navigator.clipboard.writeText(fullText);
      toast.success("Caption + link disalin! Buka Instagram dan paste sebagai caption.");
      window.open("https://www.instagram.com/", "_blank");
      break;
    case "tiktok":
      navigator.clipboard.writeText(fullText);
      toast.success("Caption + link disalin! Buka TikTok dan paste sebagai caption.");
      window.open("https://www.tiktok.com/upload", "_blank");
      break;
    case "facebook":
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encodeURIComponent(caption)}`, "_blank");
      break;
    case "twitter":
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, "_blank");
      break;
    default:
      navigator.clipboard.writeText(fullText);
      toast.success("Caption & link disalin ke clipboard!");
  }
}

export default function SnapperDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") || "dashboard";

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [posts, setPosts] = useState<AffiliatePost[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Referral campaign States
  const [productsList, setProductsList] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [savingProduct, setSavingProduct] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [activeKitProductId, setActiveKitProductId] = useState<string>("");

  // Share modal state
  const [shareModal, setShareModal] = useState<{ open: boolean; product: any | null }>({ open: false, product: null });
  const [activePosterIdx, setActivePosterIdx] = useState(0);

  // Auto-redirect if not logged in or wrong role
  useEffect(() => {
    getSession().then((s) => {
      if (!s) {
        router.push("/login");
        return;
      }
      const role = (s.user as any)?.role;
      if (role !== "SNAPPER" && role !== "ADMIN") {
        router.push("/login");
        return;
      }
      setSession(s);
    });
  }, [router]);

  // Fetch dashboard data & affiliate posts & products
  useEffect(() => {
    if (!session) return;

    async function fetchData() {
      setLoading(true);
      try {
        const userId = session.user.id;
        const [dashRes, postsRes, prodRes, settingsRes] = await Promise.all([
          getSnapperDashboardData(userId),
          getAffiliatePosts(),
          getProducts(true),
          getSiteSettings()
        ]);

        if (dashRes.success && dashRes.data) {
          setDashboardData(dashRes.data);
          const initialTarget = dashRes.data.referralCode?.targetProductId || "";
          setSelectedProductId(initialTarget);
        } else {
          toast.error(dashRes.error || "Gagal memuat data dashboard.");
        }

        if (postsRes.success && postsRes.data) {
          const published = postsRes.data.filter((p: any) => p.isPublished);
          setPosts(published);
        }

        if (prodRes.success && prodRes.data) {
          setProductsList(prodRes.data);
          // Set first active kit
          if (prodRes.data.length > 0) {
            setActiveKitProductId(prodRes.data[0].id);
          }
        }

        if (settingsRes) {
          setSettings(settingsRes);
        }
      } catch (err) {
        console.error(err);
        toast.error("Terjadi kesalahan saat memuat data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!dashboardData || !dashboardData.commissions) {
      return { totalEarnings: 0, pendingPayout: 0, paidPayout: 0, count: 0 };
    }
    const commissions: Commission[] = dashboardData.commissions;
    const totalEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);
    const pendingPayout = commissions.filter(c => c.status === "pending").reduce((sum, c) => sum + c.amount, 0);
    const paidPayout = commissions.filter(c => c.status === "paid").reduce((sum, c) => sum + c.amount, 0);
    return {
      totalEarnings,
      pendingPayout,
      paidPayout,
      count: dashboardData.referralCode?.usageCount || 0
    };
  }, [dashboardData]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    toast.success("Kode referral berhasil disalin!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = (code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://linkproductive.com";
    const target = dashboardData?.referralCode?.targetProductId || "";
    let shareUrl = `${origin}/daftar-pelatihan?ref=${code}`;
    if (target) shareUrl += `&pkg=${target}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    toast.success("Link referral berhasil disalin!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveTargetProduct = async () => {
    if (!session || !dashboardData?.referralCode) return;
    setSavingProduct(true);
    try {
      const res = await updateSnapperReferralProduct(session.user.id, selectedProductId || null);
      if (res.success) {
        toast.success("Target produk campaign berhasil diperbarui!");
        setDashboardData((prev: any) => ({
          ...prev,
          referralCode: {
            ...prev.referralCode,
            targetProductId: selectedProductId || null
          }
        }));
      } else {
        toast.error(res.error || "Gagal memperbarui target campaign.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setSavingProduct(false);
    }
  };

  // Get poster URLs and caption from product details
  function getProductKit(product: any) {
    const details = (product.details as Record<string, any>) || {};
    const posterUrls: string[] = details.posterUrls
      ? (Array.isArray(details.posterUrls) ? details.posterUrls : String(details.posterUrls).split(",").map((u: string) => u.trim()).filter(Boolean))
      : product.image ? [product.image] : [];
    const caption: string = details.affiliateCaption || `Yuk gabung program affiliate dan dapatkan produk/layanan terbaik dengan potongan harga spesial menggunakan kode referral saya: @${referralCode || "[KODE_REFERRAL]"}\n\nInfo selengkapnya: ${typeof window !== "undefined" ? window.location.origin : ""}/daftar-pelatihan?ref=${referralCode || ""}&pkg=${product.sku}`;
    return { posterUrls, caption };
  }

  if (loading || !dashboardData) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#0ea5e9]/20 border-t-[#0ea5e9] animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Memuat Dashboard Affiliate...</p>
      </div>
    );
  }

  const referralCode = dashboardData.referralCode?.code || "";
  const discountPct = dashboardData.referralCode?.discountPct || 10;
  const feePercentage = dashboardData.referralCode?.feePercentage || 10;
  const activeKitProduct = productsList.find(p => p.id === activeKitProductId) || productsList[0];

  return (
    <div className="p-8 lg:p-12 space-y-10 max-w-[1600px] mx-auto min-h-screen">

      {/* ── Heading ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1e293b]/5 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-[0.4em]">Affiliate Partner</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#1e293b] flex items-center justify-center text-white shadow-xl shadow-[#0ea5e9]/20">
              <Gift size={24} />
            </div>
            <h1 className="text-4xl font-black text-[#1e293b] tracking-tight font-[family-name:var(--font-outfit)]">
              Halo, {dashboardData.name}!
            </h1>
          </div>
          <p className="text-sm text-gray-400 font-medium">Selamat datang di portal affiliate Link Productive. Bagikan dan dapatkan penghasilan tambahan.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#1e293b]/5 shadow-sm">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Skema Komisi Anda</p>
            <p className="text-sm font-black text-[#1e293b]">
              Diskon {discountPct}% &bull; Fee {feePercentage}%
            </p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            <TrendingUp size={20} />
          </div>
        </div>
      </div>

      {/* ── Tab Content Switcher ── */}
      {tabParam === "dashboard" && (
        <div className="space-y-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Pendapatan", val: `Rp ${stats.totalEarnings.toLocaleString("id-ID")}`, desc: "Akumulasi seluruh komisi", icon: DollarSign, color: "text-[#1e293b]", bg: "bg-gray-100" },
              { label: "Komisi Cair", val: `Rp ${stats.paidPayout.toLocaleString("id-ID")}`, desc: "Sudah ditransfer ke rekening", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Komisi Pending", val: `Rp ${stats.pendingPayout.toLocaleString("id-ID")}`, desc: "Menunggu pembayaran/verifikasi", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Total Referral", val: `${stats.count} Penggunaan`, desc: "Jumlah pemesanan selesai", icon: Users, color: "text-blue-600", bg: "bg-blue-50" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-7 bg-white rounded-3xl border border-white shadow-sm flex flex-col justify-between hover:shadow-xl hover:shadow-[#1e293b]/5 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                    <stat.icon size={22} />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{stat.label}</p>
                  <span className="text-2xl font-black text-[#1e293b] tracking-tighter">{stat.val}</span>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Referral Link Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 md:p-10 bg-white border border-sky-100 text-slate-800 rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-sky-400/10 blur-[80px] pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-full border border-sky-100 text-xs font-bold text-sky-600">
                  <Sparkles size={12} /> Link & Kode Referral
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  Undang Teman & Dapatkan Komisinya!
                </h3>
                <p className="text-slate-500 text-xs md:text-sm max-w-xl leading-relaxed">
                  Bagikan kode atau link referral Anda kepada calon pelanggan. Mereka akan mendapatkan potongan harga otomatis senilai <strong className="text-sky-600 font-bold">{discountPct}%</strong> ketika melakukan pemesanan, dan Anda akan langsung memperoleh komisi sebesar <strong className="text-sky-600 font-bold">{feePercentage}%</strong> dari nilai pesanan yang mereka bayar.
                </p>
              </div>

              {/* Target Campaign Selector */}
              <div className="mt-6 p-5 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">Pilih Target Referral Campaign</span>
                  {selectedProductId && (
                    <button
                      onClick={() => setSelectedProductId("")}
                      className="text-[9px] font-bold text-rose-500 hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Reset Target
                    </button>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-end pt-1">
                  <div className="flex-1 space-y-1.5 w-full">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Pilih Program Pelatihan / Produk
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      <option value="">Semua Program (General Link)</option>
                      {productsList.map((prod) => (
                        <option key={prod.id} value={prod.sku}>{prod.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSaveTargetProduct}
                    disabled={savingProduct || (dashboardData.referralCode?.targetProductId || "") === selectedProductId}
                    className="w-full sm:w-auto px-6 py-3.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex-shrink-0 cursor-pointer border-none shadow-md shadow-sky-500/10"
                  >
                    {savingProduct ? "Menyimpan..." : "Simpan Target"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 relative z-10">
                <div className="p-4 bg-sky-50/40 rounded-2xl border border-sky-100 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Kode Referral Anda</p>
                    <p className="text-lg font-black tracking-wider text-sky-600">@{referralCode}</p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(referralCode)}
                    className="p-2.5 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-xl transition-all cursor-pointer border-none"
                  >
                    {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <div className="p-4 bg-sky-50/40 rounded-2xl border border-sky-100 flex items-center justify-between">
                  <div className="truncate mr-2">
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Link Tautan Otomatis</p>
                    <p className="text-xs font-bold text-slate-700 truncate font-mono">
                      {(() => {
                        const target = dashboardData.referralCode?.targetProductId;
                        return target
                          ? `daftar-pelatihan?ref=${referralCode}&pkg=${target}`
                          : `daftar-pelatihan?ref=${referralCode}`;
                      })()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyLink(referralCode)}
                    className="p-2.5 bg-sky-50 hover:bg-sky-100 text-sky-600 rounded-xl transition-all flex-shrink-0 cursor-pointer border-none"
                  >
                    {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Rules */}
            <div className="bg-white p-8 rounded-[2rem] border border-[#1e293b]/5 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1e293b] flex items-center gap-2">
                  <BookOpen size={16} className="text-[#0ea5e9]" /> Panduan Singkat
                </h4>
                <ul className="space-y-3.5 text-xs text-gray-500 font-medium">
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-1.5 flex-shrink-0" />
                    Pelanggan wajib menyelesaikan pembayaran agar komisi tercatat.
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-1.5 flex-shrink-0" />
                    Komisi dihitung dari total harga setelah diskon referral.
                  </li>
                  <li className="flex gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] mt-1.5 flex-shrink-0" />
                    Pencairan/payout diproses ke rekening Anda setiap akhir bulan.
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-[#1e293b]/5 flex items-center gap-4">
                <Landmark size={28} className="text-gray-300" />
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Rekening Payout</p>
                  <p className="text-xs font-black text-[#1e293b]">{dashboardData.bankName} - {dashboardData.bankAccount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Commission Table */}
          <div className="bg-white rounded-[2rem] border border-[#1e293b]/5 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-black text-[#1e293b]">Riwayat Penggunaan Referral & Komisi</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Daftar booking yang menggunakan kode Anda</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              {dashboardData.commissions && dashboardData.commissions.length > 0 ? (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider font-black text-[9px]">
                      <th className="py-4">Invoice</th>
                      <th className="py-4">Customer</th>
                      <th className="py-4">Tanggal Sesi</th>
                      <th className="py-4">Paket</th>
                      <th className="py-4">Total Bayar</th>
                      <th className="py-4 text-right">Fee Komisi</th>
                      <th className="py-4 text-right pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.commissions.map((comm: Commission) => (
                      <tr key={comm.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 font-mono font-bold text-gray-400">#{comm.booking.invoiceNo}</td>
                        <td className="py-4 font-bold text-[#1e293b]">{comm.booking.customerName}</td>
                        <td className="py-4 text-gray-500 font-medium">
                          {new Date(comm.booking.sessionDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="py-4 text-gray-500 font-medium">{comm.booking.packageName}</td>
                        <td className="py-4 font-bold text-[#1e293b]">Rp {comm.booking.finalPrice.toLocaleString("id-ID")}</td>
                        <td className="py-4 font-black text-emerald-600 text-right">Rp {comm.amount.toLocaleString("id-ID")}</td>
                        <td className="py-4 text-right pr-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${comm.status === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                            {comm.status === "paid" ? <><CheckCircle2 size={10} /> Cair</> : <><Clock size={10} /> Pending</>}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1e293b]">Belum Ada Riwayat</h5>
                    <p className="text-gray-400 text-xs mt-1">Bagikan link referral Anda untuk mendapatkan transaksi pertama!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tabParam === "feed" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-black text-[#1e293b]" style={{ fontFamily: "var(--font-outfit)" }}>Media Promosi Affiliator</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Salin bahan promosi (gambar, caption, hashtags) untuk media sosial Anda</p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const textToCopy = `${post.caption}\n\n${post.hashtags.map((h) => `#${h}`).join(" ")}\n\nGunain kode referral saya untuk diskon tambahan: @${referralCode}`;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#1e293b]/5 transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f7ff]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#1e293b] flex items-center justify-center text-white font-black text-[10px]">LP</div>
                      <div>
                        <p className="text-[11px] font-black text-[#1e293b]">Link Productive</p>
                        <p className="text-[8px] text-gray-400 font-bold">Materi Promosi Resmi</p>
                      </div>
                    </div>
                    <div className="aspect-square bg-[#f0f7ff] relative overflow-hidden">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt="Promo" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                          <ImageIcon size={40} />
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Siap Share ke Medsos</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(textToCopy);
                            toast.success("Caption & kode referral berhasil disalin!");
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#1e293b] hover:bg-[#0ea5e9] text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                        >
                          <Copy size={11} /> Salin Caption
                        </button>
                      </div>
                      <div className="h-px bg-gray-100" />
                      <div className="space-y-1.5">
                        <p className="text-[11px] text-gray-700 leading-relaxed line-clamp-3">{post.caption}</p>
                        <p className="text-[10px] text-[#0ea5e9] font-bold">{post.hashtags.map((h) => `#${h}`).join(" ")}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-[2rem] border border-[#1e293b]/5 py-24 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300">
                <ImageIcon size={32} />
              </div>
              <div>
                <h5 className="font-bold text-[#1e293b]">Belum Ada Media Promosi</h5>
                <p className="text-gray-400 text-xs mt-1">Admin belum memposting bahan promosi. Silakan periksa kembali nanti.</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tabParam === "kit" && (
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-black text-[#1e293b]" style={{ fontFamily: "var(--font-outfit)" }}>Kit Promosi Affiliate</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              Materi promosi copywriting & poster dari admin — bagikan langsung ke media sosial
            </p>
          </div>

          {/* Referral Info Bar */}
          <div className="p-6 bg-gradient-to-br from-[#0f172a] to-[#020617] text-white rounded-[2rem] shadow-xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-bold text-[#7dd3fc] uppercase tracking-wider">
                <Sparkles size={11} /> Kode Referral Aktif Anda
              </span>
              <h4 className="text-xl md:text-2xl font-black text-[#7dd3fc] tracking-wider">@{referralCode}</h4>
              <p className="text-[11px] text-white/50 max-w-xl">
                Semua konten di bawah bisa langsung dibagikan ke Instagram, WhatsApp, TikTok & Facebook — caption + poster sudah siap!
              </p>
            </div>
            <button
              onClick={() => handleCopyCode(referralCode)}
              className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0ea5e9] hover:bg-[#0ea5e9]/95 text-white rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all shadow-lg shadow-[#0ea5e9]/20"
            >
              <Copy size={12} />
              Salin Kode Anda
            </button>
          </div>

          {/* Master-Detail Layout */}
          {productsList.length === 0 ? (
            <div className="bg-white rounded-[2rem] border border-[#1e293b]/5 py-24 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto text-gray-300">
                <Sparkles size={32} />
              </div>
              <div>
                <h5 className="font-bold text-[#1e293b]">Belum Ada Program</h5>
                <p className="text-gray-400 text-xs mt-1">Admin belum menambahkan program. Silakan cek kembali nanti.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Product List */}
              <div className="lg:col-span-4 bg-white rounded-3xl border border-[#e2e8f0] p-5 space-y-2">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 mb-3">Daftar Program ({productsList.length})</p>
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
                  {productsList.map((prod) => {
                    const SkuIcon = getSkuIcon(prod.sku);
                    const isActive = activeKitProductId === prod.id;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => { setActiveKitProductId(prod.id); setActivePosterIdx(0); }}
                        className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between gap-3 transition-all duration-300 ${isActive
                          ? "bg-[#1e293b] text-white shadow-lg shadow-[#1e293b]/15"
                          : "hover:bg-gray-50 text-[#1e293b] border border-transparent"
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? "bg-white/10 text-white" : "bg-[#0ea5e9]/10 text-[#0ea5e9]"}`}>
                            <SkuIcon size={16} />
                          </div>
                          <span className={`text-[11px] font-black uppercase tracking-wide truncate ${isActive ? "text-white" : "text-[#1e293b]"}`}>
                            {prod.name}
                          </span>
                        </div>
                        <ChevronRight size={14} className={isActive ? "text-white" : "text-gray-400 flex-shrink-0"} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Kit Detail */}
              {activeKitProduct && (() => {
                const { posterUrls, caption } = getProductKit(activeKitProduct);
                const posterUrl = posterUrls[activePosterIdx] || "";
                const origin = typeof window !== "undefined" ? window.location.origin : "https://linkproductive.com";
                const referralLink = `${origin}/daftar-pelatihan?ref=${referralCode}&pkg=${activeKitProduct.sku}`;
                const fullCaption = `${caption}\n\n${referralLink}`;

                return (
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-[#e2e8f0] p-6 lg:p-8">
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                        <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9]">
                          {React.createElement(getSkuIcon(activeKitProduct.sku), { size: 24 })}
                        </div>
                        <div>
                          <h4 className="text-base font-black text-[#1e293b] uppercase tracking-wide">{activeKitProduct.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Bahan Promosi & Tautan Afiliasi</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        {/* Left: Poster with navigation */}
                        <div className="md:col-span-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Poster Kemitraan</span>
                            {posterUrls.length > 1 && (
                              <span className="text-[9px] text-gray-400 font-bold">{activePosterIdx + 1} / {posterUrls.length}</span>
                            )}
                          </div>

                          {posterUrl ? (
                            <div className="relative">
                              <div className="aspect-[3/4] w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden border border-[#e2e8f0] bg-gray-50 shadow-sm">
                                <img
                                  src={posterUrl}
                                  alt={`${activeKitProduct.name} Poster`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              {/* Poster navigation */}
                              {posterUrls.length > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-3">
                                  <button
                                    onClick={() => setActivePosterIdx(i => Math.max(0, i - 1))}
                                    disabled={activePosterIdx === 0}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-600 transition-all"
                                  >
                                    <ChevronLeft size={14} />
                                  </button>
                                  <div className="flex gap-1.5">
                                    {posterUrls.map((_, i) => (
                                      <button
                                        key={i}
                                        onClick={() => setActivePosterIdx(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === activePosterIdx ? "bg-[#0ea5e9] w-4" : "bg-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                  <button
                                    onClick={() => setActivePosterIdx(i => Math.min(posterUrls.length - 1, i + 1))}
                                    disabled={activePosterIdx === posterUrls.length - 1}
                                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-gray-600 transition-all"
                                  >
                                    <ChevronRight size={14} />
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="aspect-[3/4] rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                              <ImageIcon size={28} />
                              <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Belum Ada Poster</span>
                              <span className="text-[9px] text-gray-300 mt-1">Admin belum upload poster</span>
                            </div>
                          )}

                          {/* Download poster button */}
                          {posterUrl && (
                            <button
                              onClick={() => {
                                const ext = posterUrl.includes(".png") ? "png" : posterUrl.includes(".webp") ? "webp" : "jpg";
                                const filename = `poster-${activeKitProduct.sku}-${activePosterIdx + 1}.${ext}`;
                                const proxyUrl = `/api/download-image?url=${encodeURIComponent(posterUrl)}&filename=${encodeURIComponent(filename)}`;
                                const a = document.createElement("a");
                                a.href = proxyUrl;
                                a.download = filename;
                                a.click();
                              }}
                              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                            >
                              <Download size={12} /> Unduh Poster
                            </button>
                          )}
                        </div>

                        {/* Right: Caption + Share */}
                        <div className="md:col-span-7 space-y-6">
                          {/* Caption */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Materi Copywriting</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(fullCaption);
                                  toast.success(`Caption promosi ${activeKitProduct.name} disalin!`);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] hover:bg-[#0ea5e9] text-white rounded-xl text-[9px] font-black uppercase tracking-wider transition-all"
                              >
                                <Copy size={11} /> Salin Caption
                              </button>
                            </div>
                            <textarea
                              readOnly
                              value={fullCaption}
                              className="w-full bg-gray-50/70 border border-gray-200 rounded-2xl p-4 text-[11px] text-gray-600 font-medium leading-relaxed resize-none h-[180px] focus:outline-none focus:border-[#0ea5e9] custom-scrollbar"
                            />
                          </div>

                          {/* Referral link */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Tautan Khusus Anda</span>
                            <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                              <p className="text-[10px] font-mono text-gray-600 truncate flex-1">{referralLink}</p>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(referralLink);
                                  toast.success("Link disalin!");
                                }}
                                className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-[#0ea5e9] transition-all flex-shrink-0"
                              >
                                <Copy size={12} />
                              </button>
                            </div>
                          </div>

                          {/* ─── Share to Social ─── */}
                          <div className="space-y-3">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Bagikan Sebagai Postingan</span>
                            <div className="grid grid-cols-2 gap-2.5">
                              {/* WhatsApp */}
                              <button
                                onClick={() => shareToSocial("whatsapp", posterUrls, caption, referralLink)}
                                className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#128C7E] rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                WhatsApp
                              </button>

                              {/* Instagram */}
                              <button
                                onClick={() => shareToSocial("instagram", posterUrls, caption, referralLink)}
                                className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-pink-100 text-pink-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                              >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                Instagram
                              </button>

                              {/* TikTok */}
                              <button
                                onClick={() => shareToSocial("tiktok", posterUrls, caption, referralLink)}
                                className="flex items-center gap-2.5 px-4 py-3 bg-gray-900/5 hover:bg-gray-900/10 border border-gray-200 text-gray-800 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                              >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.2 8.2 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z" /></svg>
                                TikTok
                              </button>

                              {/* Facebook */}
                              <button
                                onClick={() => shareToSocial("facebook", posterUrls, caption, referralLink)}
                                className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                              >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                Facebook
                              </button>
                            </div>

                            {/* Native share (mobile) */}
                            {typeof navigator !== "undefined" && (navigator as any).share && (
                              <button
                                onClick={() => shareToSocial("native", posterUrls, caption, referralLink)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-md shadow-[#0ea5e9]/20"
                              >
                                <Share2 size={14} />
                                Bagikan via Share Sheet (+ Gambar)
                              </button>
                            )}

                            <p className="text-[9px] text-gray-400 leading-relaxed">
                              * Instagram & TikTok: caption + link otomatis disalin ke clipboard, lalu halaman platform akan terbuka. Paste saat upload konten.
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <a
                              href={`/daftar-pelatihan?pkg=${activeKitProduct.sku}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-white border border-[#cbd5e1] hover:bg-gray-50 text-[#1e293b] text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
                            >
                              <ExternalLink size={13} /> Pratinjau Halaman
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {tabParam === "bank" && (
        <div className="space-y-8 max-w-2xl">
          <div>
            <h3 className="text-xl font-black text-[#1e293b]" style={{ fontFamily: "var(--font-outfit)" }}>Rekening & Pembayaran Payout</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Kelola data perbankan Anda untuk pencairan komisi bulanan</p>
          </div>
          <div className="bg-white rounded-[2rem] border border-[#1e293b]/5 p-8 md:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-4 bg-[#f0f7ff] p-5 rounded-2xl border border-[#1e293b]/5">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <Landmark size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Akun Rekening Terdaftar</p>
                <h4 className="text-base font-black text-[#1e293b] mt-0.5">{dashboardData.bankName}</h4>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-bold uppercase">Nama Pemegang Rekening</span>
                <span className="text-xs font-bold text-[#1e293b]">{dashboardData.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-bold uppercase">Nomor Rekening / E-Wallet</span>
                <span className="text-xs font-mono font-bold text-[#1e293b]">{dashboardData.bankAccount}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-bold uppercase">Nomor Telepon Partner</span>
                <span className="text-xs font-bold text-[#1e293b] flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" />
                  {dashboardData.phone || "-"}
                </span>
              </div>
            </div>
            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-3 text-amber-800">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed font-medium">
                <strong>Ingin mengubah data rekening?</strong> Silakan hubungi admin studio melalui WhatsApp untuk melakukan perubahan data bank. Hal ini demi alasan keamanan pencairan komisi Anda.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, GraduationCap, Sparkles, ChevronRight, Users, BookOpen, Star, Building2 } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/app/actions/products";
import { getSuccessStories } from "@/app/actions/success-stories";

const iconMap: Record<string, any> = {
  "LP Academic Partner": GraduationCap,
  "LP Career Ready": Sparkles,
  "LP Entrepreneur Launchpad": Sparkles,
  "Bisapreneur Academy": Sparkles,
  "Baristara Academy": Sparkles,
  "Cuan Creator Academy": Sparkles,
  "Tekno AI Academy": Sparkles,
  "Mental Bahasa Academy": Sparkles,
  "Green Productive Academy": Sparkles,
  "Brand Siap": Sparkles,
  "Standara Consulting": Sparkles,
};

function getIcon(name: string) {
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (name.includes(key)) return Icon;
  }
  return Trophy;
}

export default function SuccessStoriesPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [storiesByProduct, setStoriesByProduct] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const [prodRes, storiesRes] = await Promise.all([
          getProducts(false),
          getSuccessStories(),
        ]);

        const prods = prodRes.success ? (prodRes.data || []) : [];
        const allStories = storiesRes.success ? (storiesRes.data || []) : [];

        const grouped: Record<string, any[]> = {};
        for (const s of allStories) {
          if (!grouped[s.productId]) grouped[s.productId] = [];
          grouped[s.productId].push(s);
        }

        const activeProds = prods.filter((p: any) => grouped[p.id]?.length > 0);
        setPrograms(activeProds);
        setStoriesByProduct(grouped);
      } catch (err) {
        console.error("Failed to load success stories:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const allStories = useMemo(
    () => Object.values(storiesByProduct).flat(),
    [storiesByProduct]
  );

  const totalAlumni = allStories.length;

  const uniqueCompanies = useMemo(() => {
    const names = allStories
      .map((s: any) => s.companyName)
      .filter(Boolean) as string[];
    return [...new Set(names)];
  }, [allStories]);

  const visiblePrograms = activeTab === "all"
    ? programs
    : programs.filter((p) => p.id === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin" />
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex flex-col items-center justify-center space-y-4">
        <Trophy size={48} className="text-gray-200" />
        <p className="text-sm font-bold text-gray-300 uppercase">Belum ada success story</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f7ff]">
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-16 lg:pt-44 lg:pb-20 overflow-hidden bg-gradient-to-br from-white via-amber-50/30 to-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.1),transparent_55%)] z-0 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold uppercase tracking-[0.15em]">
            <Trophy size={12} /> Alumni Success Stories
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1e293b] leading-tight tracking-tight">
            Cerita Sukses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Alumni</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto font-medium">
            Bukti nyata transformasi karir alumni setelah mengikuti program pelatihan di Link Productive.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-3xl font-extrabold text-[#1e293b]">
                <Users size={22} className="text-amber-500" />
                {totalAlumni}+
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alumni Sukses</p>
            </div>
            <div className="w-px h-10 bg-slate-200 hidden sm:block" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-3xl font-extrabold text-[#1e293b]">
                <BookOpen size={22} className="text-sky-500" />
                {programs.length}
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program Aktif</p>
            </div>
            <div className="w-px h-10 bg-slate-200 hidden sm:block" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5 text-3xl font-extrabold text-[#1e293b]">
                <Star size={22} className="text-emerald-500" />
                4.9
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating Alumni</p>
            </div>
            {uniqueCompanies.length > 0 && (
              <>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-3xl font-extrabold text-[#1e293b]">
                    <Building2 size={22} className="text-violet-500" />
                    {uniqueCompanies.length}+
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Perusahaan</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === "all"
                  ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                  : "text-slate-500 hover:text-[#004aad] hover:bg-[#004aad]/5"
              }`}
            >
              Semua Program
            </button>
            {programs.map((p: any) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === p.id
                    ? "bg-[#004aad] text-white shadow-md shadow-[#004aad]/20"
                    : "text-slate-500 hover:text-[#004aad] hover:bg-[#004aad]/5"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Programs & Stories ── */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {visiblePrograms.map((program: any) => {
          const stories = storiesByProduct[program.id] || [];
          if (stories.length === 0) return null;
          const ProgramIcon = getIcon(program.name);

          return (
            <section key={program.id}>
              {/* Program header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#004aad]/10 flex items-center justify-center text-[#004aad] border border-[#004aad]/20">
                  <ProgramIcon size={28} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Program</p>
                  <h2 className="text-2xl font-black text-[#1e293b]">{program.name}</h2>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    {stories.length} Alumni Sukses
                  </span>
                </div>
              </div>

              {/* Cards grid — max 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.slice(0, 3).map((story: any, i: number) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
                  >
                    {story.photoUrl ? (
                      <div className="w-full aspect-[3/4] overflow-hidden bg-slate-100">
                        <img src={story.photoUrl} alt={story.name} className="w-full h-full object-cover object-top" />
                      </div>
                    ) : (
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-amber-300 font-black text-6xl">
                        {story.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}

                    <div className="p-5 flex flex-col flex-1">
                      {story.achievement && (
                        <div className="inline-flex items-center gap-1.5 mb-3 text-[10px] font-black text-amber-600 uppercase tracking-wider">
                          🌟 {story.achievement}
                        </div>
                      )}
                      <h3 className="text-sm font-black text-slate-900 mb-0.5">{story.name}</h3>
                      {story.role && (
                        <p className="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1">
                          <GraduationCap size={10} className="text-sky-400 flex-shrink-0" />
                          {story.role}
                        </p>
                      )}
                      {story.companyName && (
                        <span className="inline-flex items-center gap-1 mb-3 px-2 py-0.5 rounded-full bg-[#004aad]/8 text-[#004aad] text-[9px] font-black uppercase tracking-wider w-fit">
                          <Building2 size={9} />
                          {story.companyName}
                        </span>
                      )}
                      <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-4 flex-1">{story.story}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA per program */}
              <Link
                href={`/success-stories/${program.id}`}
                className="mt-8 w-full flex items-center justify-center gap-2 py-4 bg-[#004aad] hover:bg-[#003984] text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md"
              >
                Lihat Detail Success Story {program.name}
                <ChevronRight size={14} />
              </Link>
            </section>
          );
        })}
      </div>

      {/* ── Alumni Direkrut Oleh ── */}
      {uniqueCompanies.length > 0 && (
        <section className="border-t border-slate-200 bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
            <div>
              <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] mb-2">Dipercaya oleh perusahaan terkemuka</p>
              <h3 className="text-xl font-black text-[#1e293b]">Alumni Kami Direkrut Oleh</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {uniqueCompanies.map((company) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-black text-slate-600 hover:border-[#004aad]/30 hover:text-[#004aad] transition-all"
                >
                  <Building2 size={12} className="text-slate-400" />
                  {company}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

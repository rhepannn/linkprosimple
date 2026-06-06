"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { activities, Activity, ActivityCategory } from "@/data/activities";
import { getGalleryPhotos } from "@/app/actions/gallery";

export default function GalleryPage() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeFilter, setActiveFilter] = useState<ActivityCategory | "all">("all");
  const [dbActivities, setDbActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getGalleryPhotos();
        if (res.success && Array.isArray(res.data)) {
          const mapped: Activity[] = res.data.map((p: any) => {
            const catLabelMap: Record<string, string> = {
              "inovasi-sosial": "Inovasi Sosial",
              "pelatihan-kelas": "Pelatihan & Kelas",
              "kemitraan": "Kemitraan Pentahelix",
            };
            const dateStr = p.createdAt 
              ? new Date(p.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
              : "Baru saja";
            return {
              id: p.id,
              title: p.alt || "Dokumentasi Kegiatan",
              summary: p.alt || "Dokumentasi kegiatan ekosistem Link Productive.",
              content: p.alt || "Dokumentasi kegiatan ekosistem Link Productive.",
              imageUrl: p.src,
              category: (p.category === "general" || !p.category ? "inovasi-sosial" : p.category) as any,
              categoryLabel: catLabelMap[p.category] || "Inovasi Sosial",
              author: "Tim Media Link Productive",
              date: dateStr,
              readTime: "2 menit baca",
            };
          });
          setDbActivities(mapped);
        }
      } catch (err) {
        console.error("Failed to load db activities:", err);
      }
    }
    load();
  }, []);

  // Filtered List
  const filteredActivities = useMemo(() => {
    const list = dbActivities.length > 0 ? dbActivities : activities;
    return activeFilter === "all"
      ? list
      : list.filter((act) => act.category === activeFilter);
  }, [activeFilter, dbActivities]);

  // Related Activities (exclude selected, same category)
  const relatedActivities = useMemo(() => {
    if (!selectedActivity) return [];
    const list = dbActivities.length > 0 ? dbActivities : activities;
    return list.filter(
      (act) => act.category === selectedActivity.category && act.id !== selectedActivity.id
    );
  }, [selectedActivity, dbActivities]);

  return (
    <main className="min-h-screen bg-[#f8faff] pb-24 font-[family-name:var(--font-inter)]">
      {/* ── Premium Asymmetrical Hero Banner for Gallery ── */}
      <div className="relative bg-slate-950 pt-36 pb-20 md:pt-40 md:pb-24 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.15),transparent_50%)] z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-0" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-3xl space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-bold uppercase tracking-[0.15em]">
              <Sparkles size={12} />
              Kanal Dokumentasi & Berita
            </div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Kegiatan & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Inovasi Sosial</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl font-medium">
              Jelajahi kumpulan dokumentasi, inisiasi inovasi sosial, sinergi pentahelix, serta liputan berita terhangat langsung dari ekosistem Link Productive.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <AnimatePresence mode="wait">
          {!selectedActivity ? (
            /* ── VIEW 1: NEWS/ACTIVITIES FEED GRID ── */
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Filter Tabs */}
              <div className="flex gap-2.5 pb-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {[
                  { label: "Semua Kegiatan", value: "all" },
                  { label: "Inovasi Sosial", value: "inovasi-sosial" },
                  { label: "Pelatihan & Kelas", value: "pelatihan-kelas" },
                  { label: "Kemitraan Pentahelix", value: "kemitraan" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value as any)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeFilter === tab.value
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-[1.02]"
                        : "bg-white border border-slate-200/80 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Activities News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                {filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => setSelectedActivity(act)}
                    className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full"
                  >
                    {/* Visual documentation image using actual file */}
                    <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                      <Image
                        src={act.imageUrl}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    </div>

                    {/* News Content Preview */}
                    <div className="p-7 flex flex-col flex-grow justify-between space-y-5">
                      <div className="space-y-3">
                        <span className="inline-block text-[9px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-lg">
                          {act.categoryLabel}
                        </span>
                        <h3 
                          className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight"
                          style={{ fontFamily: "var(--font-outfit)" }}
                        >
                          {act.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                          {act.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-4 border-t border-slate-100/60">
                        <span className="flex items-center gap-1.5"><Clock size={12} /> {act.date}</span>
                        <span className="inline-flex items-center gap-1 text-sky-600 font-bold group-hover:translate-x-0.5 transition-transform">
                          Baca Detail <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ── VIEW 2: EDITORIAL NEWS DETAIL ── */
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Back button */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 uppercase tracking-wider transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} /> Kembali ke Kegiatan
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Side: Article Editorial Column (Col 8) */}
                <article className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="space-y-4">
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest text-sky-600 bg-sky-50 border border-sky-100 px-3.5 py-1.5 rounded-lg">
                      {selectedActivity.categoryLabel}
                    </span>
                    <h1 
                      className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {selectedActivity.title}
                    </h1>
                    
                    {/* Meta information */}
                    <div className="flex flex-wrap gap-4 items-center text-xs text-slate-400 font-bold pt-2 border-b border-slate-100 pb-4">
                      <span className="flex items-center gap-1.5"><User size={13} /> {selectedActivity.author}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> {selectedActivity.date}</span>
                      <span>&bull;</span>
                      <span>{selectedActivity.readTime}</span>
                    </div>
                  </div>

                  {/* Banner Image using real photo */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 shadow-md">
                    <Image
                      src={selectedActivity.imageUrl}
                      alt={selectedActivity.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>

                  {/* Full detailed contents */}
                  <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium space-y-4">
                    {selectedActivity.content}
                  </div>
                </article>

                {/* Right Side: Related Activities (Col 4) (1 Kategori yang sama) */}
                <aside className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 border-b border-slate-100 pb-3">
                      Kegiatan Terkait
                    </h3>

                    {relatedActivities.length > 0 ? (
                      <div className="space-y-5">
                        {relatedActivities.map((rel) => (
                          <div
                            key={rel.id}
                            onClick={() => setSelectedActivity(rel)}
                            className="group flex gap-4 cursor-pointer"
                          >
                            {/* Tiny real photo thumbnail */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 relative border border-slate-100 shadow-sm">
                              <Image
                                src={rel.imageUrl}
                                alt={rel.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div className="space-y-1 flex-1">
                              <h4 
                                className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 leading-snug"
                                style={{ fontFamily: "var(--font-outfit)" }}
                              >
                                {rel.title}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-bold">{rel.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 font-bold italic py-4">Belum ada kegiatan terkait di kategori ini.</p>
                    )}
                  </div>
                </aside>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}


"use client";

import { motion } from "framer-motion";
import { ExternalLink, GraduationCap, Building2 } from "lucide-react";

function parseStory(text: string) {
  return text.split("\n").filter(Boolean).map((para, i) => {
    const trimmed = para.trim();
    const isCheck = trimmed.startsWith("✓") || trimmed.startsWith("✔");
    if (isCheck) {
      return (
        <div key={i} className="flex items-start gap-2">
          <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">✓</span>
          <p className="text-sm text-slate-700 leading-relaxed">
            {trimmed.replace(/^[✓✔]\s*/, "")}
          </p>
        </div>
      );
    }
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-sm text-slate-700 leading-relaxed">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j}>{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export default function StoriesDisplay({ stories }: { stories: any[] }) {
  return (
    <>
      {stories.map((story, i) => (
        <motion.article
          key={story.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`space-y-6 ${i > 0 ? "pt-20 border-t border-slate-100" : ""}`}
        >
          {story.linkedinScreenshot && (
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={story.linkedinScreenshot}
                alt={`LinkedIn ${story.name}`}
                className="w-full h-auto block"
              />
            </div>
          )}

          <div className="flex items-start gap-4">
            {story.photoUrl ? (
              <img
                src={story.photoUrl}
                alt={story.name}
                className="w-20 h-24 rounded-2xl object-cover object-top border border-slate-100 flex-shrink-0 shadow-sm"
              />
            ) : (
              <div className="w-20 h-24 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-400 font-black text-2xl flex-shrink-0">
                {story.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            <div className="flex-1 pt-1">
              {story.achievement && (
                <div className="inline-flex items-center gap-1.5 mb-2 text-[11px] font-black text-amber-600 uppercase tracking-wider">
                  🌟 {story.achievement}
                </div>
              )}
              <h2 className="text-lg font-black text-slate-900 leading-tight">{story.name}</h2>
              {story.role && (
                <p className="text-xs text-slate-500 font-bold mt-1 flex items-center gap-1">
                  <GraduationCap size={11} className="text-sky-400 flex-shrink-0" />
                  {story.role}
                </p>
              )}
              {story.companyName && (
                <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#004aad]/8 text-[#004aad] text-[9px] font-black uppercase tracking-wider w-fit">
                  <Building2 size={9} />
                  {story.companyName}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4 pl-1">
            {parseStory(story.story)}
          </div>

          {(story.beforeLabel || story.afterLabel) && (
            <div className="grid grid-cols-2 gap-4">
              {story.beforeLabel && (
                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                  <p className="text-[9px] font-black text-rose-400 uppercase tracking-wider mb-1">Sebelum</p>
                  <p className="text-xs font-bold text-rose-600">{story.beforeLabel}</p>
                </div>
              )}
              {story.afterLabel && (
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <p className="text-[9px] font-black text-emerald-400 uppercase tracking-wider mb-1">Sesudah</p>
                  <p className="text-xs font-bold text-emerald-600">{story.afterLabel}</p>
                </div>
              )}
            </div>
          )}

          {story.linkedinUrl && (
            <a
              href={story.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-md"
            >
              <ExternalLink size={14} />
              LinkedIn Profile
            </a>
          )}
        </motion.article>
      ))}
    </>
  );
}

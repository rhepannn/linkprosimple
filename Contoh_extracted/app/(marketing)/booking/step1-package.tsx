"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Camera, Users, Star, Cake } from "lucide-react";
import { Package } from "@/data/packages";
import { formatPrice } from "@/lib/utils";
import { btn } from "@/lib/button-classes";

const PKG_ICONS: Record<string, React.ReactNode> = {
  "pkg-solo": <Camera size={20} />,
  "pkg-couple": <Users size={20} />,
  "pkg-family": <Users size={20} />,
  "pkg-birthday": <Cake size={20} />,
};

interface Step1Props {
  packagesList: Package[];
  loading: boolean;
  selected: Package | null;
  onSelect: (pkg: Package) => void;
  onNext: () => void;
}

export default function Step1Package({ packagesList, loading, selected, onSelect, onNext }: Step1Props) {
  const searchParams = useSearchParams();
  const sortedPackages = [...packagesList].sort((a, b) => a.sortOrder - b.sortOrder);

  useEffect(() => {
    if (loading) return;
    const pkgId = searchParams.get("pkg");
    if (pkgId && !selected) {
      const found = sortedPackages.find((p) => p.id === pkgId || (p as any).sku === pkgId);
      if (found) onSelect(found);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, packagesList]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-medium tracking-[0.15em] text-[#888888] uppercase mb-2">
          Langkah 1 dari 5
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-heading)" }}>
          Pilih Paket Foto
        </h2>
        <p className="text-[#5A5A5A] text-sm mt-2">
          Semua paket sudah termasuk editing profesional dan file resolusi tinggi.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-[#E0E0DA] rounded-2xl p-5 sm:p-6 space-y-4 animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-[#F0EFE9] rounded-lg" />
                <div className="w-16 h-5 bg-[#F0EFE9] rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="w-2/3 h-5 bg-[#F0EFE9] rounded-md" />
                <div className="w-1/2 h-6 bg-[#F0EFE9] rounded-md" />
              </div>
              <div className="h-px bg-[#E0E0DA]" />
              <div className="space-y-2">
                <div className="w-5/6 h-3 bg-[#F0EFE9] rounded-md" />
                <div className="w-4/5 h-3 bg-[#F0EFE9] rounded-md" />
                <div className="w-3/4 h-3 bg-[#F0EFE9] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {sortedPackages.map((pkg) => {
            const isSelected = selected?.id === pkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => onSelect(pkg)}
                className={[
                  "relative flex flex-col text-left rounded-2xl border p-5 sm:p-6 transition-all duration-200 w-full group",
                  isSelected
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FAFAF8]"
                    : "bg-white border-[#E0E0DA] hover:border-[#1A1A1A]/30 hover:shadow-sm hover:-translate-y-0.5",
                ].join(" ")}
              >
                {pkg.isPopular && (
                  <span className={[
                    "absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-md whitespace-nowrap",
                    isSelected ? "bg-[#FAFAF8] text-[#1A1A1A]" : "bg-[#1A1A1A] text-[#FAFAF8]"
                  ].join(" ")}>
                    ★ Terpopuler
                  </span>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={[
                    "p-2 rounded-lg transition-colors",
                    isSelected ? "bg-white/10" : "bg-[#F0EFE9]"
                  ].join(" ")}>
                    <span className={isSelected ? "text-[#FAFAF8]" : "text-[#5A5A5A]"}>
                      {PKG_ICONS[pkg.id] ?? <Camera size={20} />}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <Check size={14} className="text-[#FAFAF8]" />
                    </div>
                  )}
                </div>

                <h3 className={[
                  "text-base font-semibold mb-1",
                  isSelected ? "text-[#FAFAF8]" : "text-[#1A1A1A]"
                ].join(" ")} style={{ fontFamily: "var(--font-heading)" }}>
                  {pkg.name}
                </h3>

                <p className={[
                  "text-2xl font-bold mb-3",
                  isSelected ? "text-[#FAFAF8]" : "text-[#1A1A1A]"
                ].join(" ")} style={{ fontFamily: "var(--font-heading)" }}>
                  {formatPrice(pkg.price)}
                </p>

                <div className={[
                  "flex flex-wrap gap-x-3 gap-y-1 text-xs mb-4",
                  isSelected ? "text-[#FAFAF8]/70" : "text-[#888888]"
                ].join(" ")}>
                  {pkg.duration && <span>{pkg.duration}</span>}
                  {pkg.duration && pkg.photoCount && <span>·</span>}
                  {pkg.photoCount && <span>{pkg.photoCount}</span>}
                </div>

                <div className={[
                  "h-px mb-4",
                  isSelected ? "bg-white/10" : "bg-[#E0E0DA]"
                ].join(" ")} />

                <ul className="space-y-1.5">
                  {pkg.features.slice(0, 3).map((f, i) => (
                    <li key={i} className={[
                      "flex items-start gap-2 text-xs",
                      isSelected ? "text-[#FAFAF8]/80" : "text-[#5A5A5A]"
                    ].join(" ")}>
                      <Check size={12} className={[
                        "mt-0.5 flex-shrink-0",
                        isSelected ? "text-[#FAFAF8]/60" : "text-[#888888]"
                      ].join(" ")} />
                      {f}
                    </li>
                  ))}
                  {pkg.features.length > 3 && (
                    <li className={["text-xs", isSelected ? "text-[#FAFAF8]/50" : "text-[#888888]"].join(" ")}>
                      +{pkg.features.length - 3} fitur lainnya
                    </li>
                  )}
                </ul>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selected}
          className={[
            btn.primary,
            "rounded-xl px-8 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
          ].join(" ")}
        >
          Lanjut
        </button>
      </div>
    </div>
  );
}

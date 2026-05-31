"use client";

// components/ui/expandable-features.tsx
// Komponen reusable: tampilkan fitur dengan opsi "Lihat semua" di mobile

import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableFeaturesProps {
  features: string[];
  /** Jumlah item yang tampil sebelum "Lihat semua" — default 3 */
  collapseAt?: number;
}

export function ExpandableFeatures({ features, collapseAt = 3 }: ExpandableFeaturesProps) {
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = features.length > collapseAt;
  const visible = shouldTruncate && !expanded ? features.slice(0, collapseAt) : features;
  const hiddenCount = features.length - collapseAt;

  return (
    <div>
      <ul className="space-y-2.5 mb-1">
        {visible.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check
              size={13}
              className="flex-shrink-0 mt-0.5 text-[#1D9E75]"
              strokeWidth={2.5}
            />
            <span className="text-xs sm:text-sm text-[#3A3A3A] leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {shouldTruncate && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#888888] hover:text-[#1A1A1A] transition-colors duration-200 mt-2 group"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp size={13} className="transition-transform duration-200" />
              Lebih sedikit
            </>
          ) : (
            <>
              <ChevronDown size={13} className="transition-transform duration-200" />
              +{hiddenCount} fitur lainnya...
            </>
          )}
        </button>
      )}
    </div>
  );
}

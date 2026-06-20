"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { INDONESIAN_CITIES } from "@/lib/indonesian-cities";

interface CityAutocompleteProps {
  value: string;
  onChange: (city: string) => void;
  className?: string;
  placeholder?: string;
}

export function CityAutocomplete({ value, onChange, className, placeholder }: CityAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filter = useCallback((q: string) => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    const exact: string[] = [];
    const rest: string[] = [];
    for (const city of INDONESIAN_CITIES) {
      const cityLower = city.toLowerCase();
      if (cityLower.startsWith(lower)) exact.push(city);
      else if (cityLower.includes(lower)) rest.push(city);
    }
    return [...exact, ...rest].slice(0, 8);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    onChange(q);
    setSuggestions(filter(q));
    setOpen(true);
    setHighlighted(-1);
  };

  const select = (city: string) => {
    setQuery(city);
    onChange(city);
    setSuggestions([]);
    setOpen(false);
    setHighlighted(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      select(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (query.trim()) {
            setSuggestions(filter(query));
            setOpen(true);
          }
        }}
        placeholder={placeholder || "Contoh: Cilegon"}
        autoComplete="off"
        className={className}
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-[#004aad]/10 rounded-xl shadow-lg overflow-hidden max-h-56 overflow-y-auto">
          {suggestions.map((city, idx) => (
            <li
              key={city}
              onMouseDown={() => select(city)}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                idx === highlighted
                  ? "bg-[#004aad] text-white"
                  : "text-[#004aad] hover:bg-[#004aad]/5"
              }`}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

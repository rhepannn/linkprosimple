"use client";

import { Landmark, Phone, Smartphone, Check } from "lucide-react";
import { btn } from "@/lib/button-classes";

export type PaymentMethod = "transfer" | "dana" | "gopay";

interface Step4Props {
  selected: PaymentMethod | null;
  onSelect: (m: PaymentMethod) => void;
  onNext: () => void;
  onBack: () => void;
}

const METHODS: { id: PaymentMethod; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: "transfer",
    label: "Transfer Bank",
    desc: "Transfer langsung ke rekening Bank resmi kami",
    icon: <Landmark size={28} />,
  },
  {
    id: "dana",
    label: "DANA",
    desc: "Kirim saldo secara instan ke akun DANA kami",
    icon: <Smartphone size={28} />,
  },
  {
    id: "gopay",
    label: "GoPay",
    desc: "Kirim saldo secara instan ke akun GoPay kami",
    icon: <Phone size={28} />,
  },
];

export default function Step4Payment({ selected, onSelect, onNext, onBack }: Step4Props) {
  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-medium tracking-[0.15em] text-[#888888] uppercase mb-2">Langkah 4 dari 5</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#3B2211]" style={{ fontFamily: "var(--font-heading)" }}>
          Pilih Metode Bayar
        </h2>
        <p className="text-gray-500 text-sm mt-2">Pembayaran dikonfirmasi manual via WhatsApp setelah pengisian formulir selesai.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {METHODS.map((m) => {
          const isSelected = selected === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={[
                "relative flex flex-col items-start text-left rounded-2xl border p-6 transition-all duration-200 w-full",
                isSelected
                  ? "bg-[#3B2211] border-[#3B2211] text-white"
                  : "bg-white border-[#E0E0DA] hover:border-[#3B2211]/30 hover:shadow-sm hover:-translate-y-0.5",
              ].join(" ")}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              )}
              <div className={[
                "mb-4 p-3 rounded-xl",
                isSelected ? "bg-white/10" : "bg-[#F8F6F4]"
              ].join(" ")}>
                <span className={isSelected ? "text-white" : "text-[#C88A58]"}>{m.icon}</span>
              </div>
              <h3 className={[
                "text-base font-semibold mb-1",
                isSelected ? "text-white" : "text-[#3B2211]"
              ].join(" ")} style={{ fontFamily: "var(--font-heading)" }}>
                {m.label}
              </h3>
              <p className={["text-xs leading-relaxed", isSelected ? "text-white/70" : "text-gray-400"].join(" ")}>
                {m.desc}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between gap-3">
        <button onClick={onBack} className={[btn.secondary, "rounded-xl"].join(" ")}>Kembali</button>
        <button
          onClick={onNext}
          disabled={!selected}
          className={[btn.primary, "rounded-xl px-8 disabled:opacity-40 disabled:cursor-not-allowed"].join(" ")}
        >
          Lihat Struk
        </button>
      </div>
    </div>
  );
}

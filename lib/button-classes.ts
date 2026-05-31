// lib/button-classes.ts
// Sistem tombol standar Link Productive — 3 varian saja
// Import di komponen manapun yang butuh tombol konsisten

export const btn = {
  // Tombol primer — aksi utama, warna Warm Tan premium
  primary: [
    "inline-flex items-center justify-center gap-2",
    "px-8 py-4 bg-[#0ea5e9] text-white", // Diubah ke Warm Tan yang lebih cerah
    "text-sm font-bold rounded-xl tracking-wide",
    "transition-all duration-300 transform-gpu",
    "hover:bg-[#0284c7] hover:shadow-xl hover:shadow-[#0ea5e9]/20 hover:-translate-y-0.5",
    "active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] focus-visible:ring-offset-2",
  ].join(" "),

  // Tombol sekunder — outline minimalis premium
  secondary: [
    "inline-flex items-center justify-center gap-2",
    "px-8 py-4 border border-[#E0E0DA] text-[#1A1A1A]",
    "text-sm font-bold rounded-xl tracking-wide bg-transparent",
    "transition-all duration-300 transform-gpu",
    "hover:border-[#0ea5e9] hover:text-[#0ea5e9] hover:bg-[#0ea5e9]/5 hover:-translate-y-0.5",
    "active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0ea5e9] focus-visible:ring-offset-2",
  ].join(" "),

  // Tombol WhatsApp — brand WA premium
  whatsapp: [
    "inline-flex items-center justify-center gap-2",
    "px-8 py-4 bg-[#25D366] text-white",
    "text-sm font-bold rounded-xl tracking-wide",
    "transition-all duration-300 transform-gpu",
    "hover:bg-[#20BC5A] hover:shadow-xl hover:shadow-[#25D366]/20 hover:-translate-y-0.5",
    "active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
  ].join(" "),
} as const;
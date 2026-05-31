// lib/button-classes.ts
// Sistem tombol standar Snapp.frame Studio — 3 varian saja
// Import di komponen manapun yang butuh tombol konsisten

export const btn = {
  // Tombol primer — aksi utama, warna Warm Tan premium
  primary: [
    "inline-flex items-center justify-center gap-2",
    "px-8 py-4 bg-[#C88A58] text-white", // Diubah ke Warm Tan yang lebih cerah
    "text-sm font-bold rounded-xl tracking-wide",
    "transition-all duration-300 transform-gpu",
    "hover:bg-[#B0764A] hover:shadow-xl hover:shadow-[#C88A58]/20 hover:-translate-y-0.5",
    "active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88A58] focus-visible:ring-offset-2",
  ].join(" "),

  // Tombol sekunder — outline minimalis premium
  secondary: [
    "inline-flex items-center justify-center gap-2",
    "px-8 py-4 border border-[#E0E0DA] text-[#1A1A1A]",
    "text-sm font-bold rounded-xl tracking-wide bg-transparent",
    "transition-all duration-300 transform-gpu",
    "hover:border-[#C88A58] hover:text-[#C88A58] hover:bg-[#C88A58]/5 hover:-translate-y-0.5",
    "active:scale-[0.98]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C88A58] focus-visible:ring-offset-2",
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

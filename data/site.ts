// data/site.ts — Konfigurasi statis aplikasi
// SEMUA info kontak, pembayaran, dan operasional dikelola via Admin > Pengaturan Web
// Nilai di sini hanya fallback terakhir jika database belum pernah diisi

export const site = {
  name: "Link Productive",
  tagline: "PT Integritas Produktivitas Indonesia",
  subTagline: "Platform program pelatihan unggulan, inovasi sosial, dan pengembangan karir.",
  description:
    "Link Productive adalah platform inovasi sosial dan pendidikan terintegrasi yang menghadirkan program pelatihan berkualitas tinggi untuk mempersiapkan karir masa depan serta menginisiasi kolaborasi dampak sosial.",
  heroDescription:
    "Ikuti program pelatihan intensif bersama mentor industri, bangun portofolio berdampak, dan tingkatkan karir Anda.",
  stats: {
    sessions: "15K+",
    rating: "4.9",
    yearsActive: "5",
  },
  contact: {
    address: "",         // → Admin > Pengaturan > contact_address
    email: "",           // → Admin > Pengaturan > contact_email
    whatsapp: "",        // → Admin > Pengaturan > contact_wa
    instagram: "",       // → Admin > Pengaturan > contact_ig
    tiktok: "",          // → Admin > Pengaturan > contact_tiktok
    youtube: "",         // → Admin > Pengaturan > contact_youtube
  },
  payment: {
    bankName: "",        // → Admin > Pengaturan > payment_bank_name
    bankAccount: "",     // → Admin > Pengaturan > payment_bank_account
    bankOwner: "",       // → Admin > Pengaturan > payment_bank_owner
  },
  operatingHours: [] as { day: string; hours: string }[], // → Admin > Pengaturan > operational_hours
  mapsEmbedUrl: "",      // → Admin > Pengaturan > contact_maps_embed
};

export type Site = typeof site;
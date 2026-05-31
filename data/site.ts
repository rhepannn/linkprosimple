// data/site.ts — Info studio, kontak, jam operasional

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
    address: "Jl. Inovasi Sosial No. 42, Jakarta Selatan",
    email: "hello@linkproductive.com",
    whatsapp: "6287778059221", // WA number
    instagram: "https://instagram.com/linkproductive",
    tiktok: "https://tiktok.com/@linkproductive", youtube: "https://www.youtube.com/@link.productive",
  },
  payment: {
    bankName: "BCA (Bank Central Asia)",
    bankAccount: "8882047811",
    bankOwner: "PT Integritas Produktivitas Indonesia",
  },
  operatingHours: [
    { day: "Senin–Jumat", hours: "09.00–18.00" },
    { day: "Sabtu", hours: "09.00–14.00" },
  ],
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009279584!2d106.758748!3d-6.229746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
};

export type Site = typeof site;

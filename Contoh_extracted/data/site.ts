// data/site.ts — Info studio, kontak, jam operasional

export const site = {
  name: "Snapp.frame Studio",
  tagline: "Abadikan Momen, Rayakan Diri.",
  subTagline: "Studio foto minimalis untuk momen yang tak terlupakan.",
  description:
    "Snapp.frame Studio adalah studio foto minimalis yang menghadirkan pengalaman sesi foto premium dengan konsep photobooth modern. Kami membantu Anda mengabadikan momen berharga dengan hasil foto berkualitas tinggi.",
  heroDescription:
    "Sesi foto premium dengan latar minimalis yang bersih. Hasil foto siap share dan siap cetak.",
  stats: {
    sessions: "500+",
    rating: "4.9",
    yearsActive: "3",
  },
  contact: {
    address: "Jl. Snapp.frame No. 1, Kota",
    email: "hello@snappframe.id",
    whatsapp: "6287778059221", // Update with real Snapp.frame Studio WA number when ready
    instagram: "https://instagram.com/snapp.frame",
    tiktok: "https://tiktok.com/@snapp.frame",
  },
  payment: {
    bankName: "BCA (Bank Central Asia)",
    bankAccount: "7771234567",
    bankOwner: "Snapp.frame Studio Owner",
  },
  operatingHours: [
    { day: "Senin–Jumat", hours: "10.00–20.00" },
    { day: "Sabtu–Minggu", hours: "09.00–21.00" },
  ],
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009279584!2d106.758748!3d-6.229746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5e82dd4b820!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
};

export type Site = typeof site;

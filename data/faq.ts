// data/faq.ts — Frequently asked questions + types

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Apa itu Link Productive?",
    answer:
      "Link Productive adalah platform inovasi sosial dan pendidikan terintegrasi yang menyediakan program pelatihan intensif, pendampingan karir, serta peluang kemitraan berdampak untuk menyiapkan talenta masa depan.",
  },
  {
    question: "Program pelatihan apa saja yang tersedia?",
    answer:
      "Kami menyediakan program pelatihan unggulan seperti Academic Partner (untuk institusi pendidikan), Career Ready Program (persiapan karir industri), Social Innovation Bootcamps, dan berbagai webinar/workshop interaktif.",
  },
  {
    question: "Apakah pemula tanpa latar belakang khusus bisa bergabung?",
    answer:
      "Tentu saja! Kurikulum program kami dirancang secara komprehensif mulai dari tingkat dasar hingga lanjutan. Mentor kami akan membimbing Anda langkah demi langkah hingga siap bersaing di industri.",
  },
  {
    question: "Bagaimana sistem pelatihannya dijalankan?",
    answer:
      "Pelatihan dilakukan secara hybrid (kombinasi online live session via Zoom dan offline workshop interaktif) dengan fokus utama pada praktikum, mentoring 1-on-1, serta pengerjaan real project industri.",
  },
  {
    question: "Bagaimana sistem program Referral/Affiliate Link Productive?",
    answer:
      "Anda dapat bergabung secara gratis sebagai mitra affiliate. Setelah terdaftar, Anda akan mendapatkan kode referral unik. Setiap kali ada peserta yang mendaftar menggunakan kode Anda, Anda akan mendapatkan komisi yang dapat dicairkan setiap bulan.",
  },
  {
    question: "Bagaimana cara melakukan pendaftaran dan pembayaran?",
    answer:
      "Pendaftaran dapat dilakukan langsung melalui halaman 'Program' di website ini. Pembayaran dapat diselesaikan dengan mudah via transfer bank ke rekening PT Link Productive Nusantara yang tertera setelah pengisian formulir pendaftaran.",
  },
];

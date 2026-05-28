// data/testimonials.ts — Array testimoni pelanggan + types

export type Testimonial = {
  id: string;
  name: string;           // Nama klien (bisa disingkat untuk privasi)
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;           // Teks testimoni
  sessionType?: string;   // e.g. "Couple", "Family"
  date?: string;          // e.g. "November 2024"
};

export const testimonials: Testimonial[] = [
  {
    id: "t-001",
    name: "Rina A.",
    rating: 5,
    text: "Materi pelatihannya sangat relevan dengan kebutuhan industri saat ini! Mentornya sabar dan sangat berpengalaman. Berkat Career Ready Program, saya berhasil diterima magang di tech company impian saya.",
    sessionType: "Career Ready",
    date: "Desember 2024",
  },
  {
    id: "t-002",
    name: "Budi & Team",
    rating: 5,
    text: "Mengikuti Social Innovation Bootcamp di Link Productive membuka wawasan baru tentang socio-preneurship. Proyek dampak sosial kami mendapat pendanaan stimulasi dan kini berjalan lancar.",
    sessionType: "Social Innovation",
    date: "November 2024",
  },
  {
    id: "t-003",
    name: "Universitas Indonesia",
    rating: 5,
    text: "Kolaborasi program Academic Partner sangat membantu mahasiswa kami memperoleh sertifikasi industri. Kurikulumnya terstruktur dan penyampaian materinya sangat profesional.",
    sessionType: "Academic Partner",
    date: "Oktober 2024",
  },
  {
    id: "t-004",
    name: "Dewi R.",
    rating: 5,
    text: "Sebagai pemula, awalnya saya ragu belajar UI/UX. Namun berkat panduan mentoring 1-on-1 dari Link Productive, portofolio saya kini terlihat matang dan saya percaya diri melamar kerja.",
    sessionType: "Career Ready",
    date: "September 2024",
  },
  {
    id: "t-005",
    name: "Maya K.",
    rating: 4,
    text: "Sangat menyukai ekosistem belajarnya yang aktif dan suportif. Jaringan komunitas alumninya sangat luas dan kami saling berbagi info lowongan kerja secara konsisten.",
    sessionType: "Academic Partner",
    date: "Agustus 2024",
  },
  {
    id: "t-006",
    name: "Andre S.",
    rating: 5,
    text: "Sesi simulasi interview-nya benar-benar mirip dengan aslinya! Masukan dari mentor sangat tajam dan membongkar kekurangan saya. Sangat berharga untuk karir saya.",
    sessionType: "Career Ready",
    date: "Juli 2024",
  },
];

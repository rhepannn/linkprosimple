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
    text: "Hasilnya di luar ekspektasi! Studionya bersih, fotografernya sabar banget, dan editannya natural — nggak over-edit. Langsung save semua fotonya.",
    sessionType: "Solo",
    date: "Desember 2024",
  },
  {
    id: "t-002",
    name: "Budi & Sari",
    rating: 5,
    text: "Kita berdua yang awkward di depan kamera tapi mas fotografernya pandai banget bikin kita rileks. Hasilnya bagus semua, susah pilihnya!",
    sessionType: "Couple",
    date: "November 2024",
  },
  {
    id: "t-003",
    name: "Keluarga Wijaya",
    rating: 5,
    text: "Anak-anak umur 4 dan 7 tahun, keduanya bisa diajak kerjasama. Tempatnya nyaman, nggak panas, dan fotonya natural banget. Recommended buat foto keluarga!",
    sessionType: "Family",
    date: "Oktober 2024",
  },
  {
    id: "t-004",
    name: "Dewi R.",
    rating: 5,
    text: "Foto wisuda di sini jauh lebih berkesan dari foto formal di kampus. Background minimalisnya justru bikin wajah dan toga lebih stand out.",
    sessionType: "Graduation",
    date: "September 2024",
  },
  {
    id: "t-005",
    name: "Maya K.",
    rating: 4,
    text: "Suka banget sama hasilnya, tone fotonya konsisten dan estetik. Agak nunggu sedikit di awal tapi worth it. Tim-nya ramah dan profesional.",
    sessionType: "Birthday",
    date: "Agustus 2024",
  },
  {
    id: "t-006",
    name: "Andre S.",
    rating: 5,
    text: "Baru pertama kali foto studio, nervous banget. Tapi fotografernya tenang dan sabar, jadi lama-lama nyaman sendiri. Hasilnya keren dan natural.",
    sessionType: "Solo",
    date: "Juli 2024",
  },
  {
    id: "t-007",
    name: "Tiara M.",
    rating: 5,
    text: "Konsep latar putihnya simple tapi hasilnya clean dan elegan. Cocok buat konten sosmed. Sudah rekomendasiin ke beberapa teman dan mereka juga puas!",
    sessionType: "Solo",
    date: "Juni 2024",
  },
  {
    id: "t-008",
    name: "Raka & Ninda",
    rating: 5,
    text: "Paket couple-nya worth it banget. Dapet banyak foto dengan beberapa latar, dan editannya dikirim cepat. Proses bookingnya juga gampang via WA.",
    sessionType: "Couple",
    date: "Mei 2024",
  },
  {
    id: "t-009",
    name: "Ibu Hendra",
    rating: 5,
    text: "Foto ulang tahun ke-50 suami saya jadi sangat spesial. Tim Snapp.frame sangat membantu dan sabar. Kami bawa 8 orang dan semuanya teratur.",
    sessionType: "Family",
    date: "April 2024",
  },
];

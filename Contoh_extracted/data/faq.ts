// data/faq.ts — Frequently asked questions + types

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Apakah perlu booking terlebih dahulu?",
    answer:
      "Ya, Anda dapat melakukan booking langsung melalui website ini dengan menekan tombol 'Booking Studio' atau menghubungi kami via WhatsApp. Kami menyarankan untuk melakukan booking minimal 1-2 hari sebelum sesi foto untuk memastikan slot waktu yang Anda inginkan tersedia.",
  },
  {
    question: "Berapa lama hasil foto siap?",
    answer:
      "Hasil foto berupa soft file biasanya akan kami kirimkan dalam waktu 1-2 hari kerja setelah sesi foto selesai. Seluruh file foto akan dikirimkan dengan resolusi tinggi melalui link Google Drive.",
  },
  {
    question: "Apakah bisa memilih latar belakang saat sesi?",
    answer:
      "Tentu saja! Kami memiliki beberapa pilihan latar belakang modern dan minimalis di studio kami. Anda dapat mendiskusikan konsep background yang diinginkan dengan fotografer kami sebelum sesi foto dimulai.",
  },
  {
    question: "Bolehkah membawa properti sendiri?",
    answer:
      "Tentu saja boleh! Selain properti aesthetic gratis yang sudah kami sediakan di dalam studio, Anda sangat diperbolehkan untuk membawa properti pribadi tambahan agar sesi foto Anda terasa lebih personal dan berkesan.",
  },
  {
    question: "Berapa kapasitas maksimal orang di dalam studio?",
    answer:
      "Untuk kenyamanan dan kualitas foto terbaik, area studio kami sangat ideal untuk 1 hingga 5 orang. Jika Anda berencana melakukan foto grup dengan jumlah anggota lebih banyak, silakan koordinasikan dengan admin kami via WhatsApp terlebih dahulu.",
  },
  {
    question: "Apakah foto yang dikirimkan sudah diedit?",
    answer:
      "Ya, semua paket sudah termasuk basic color grading dan photo enhancement agar hasil foto Anda terlihat profesional dan siap dibagikan ke media sosial.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Kami menerima pembayaran mudah melalui transfer bank atau dompet digital (DANA, GoPay, dll). Instruksi pembayaran dan nomor rekening admin akan ditampilkan setelah Anda menyelesaikan pengisian formulir booking di website ini.",
  },
];

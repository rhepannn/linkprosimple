"use server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STORIES = [
  {
    name: "Muhammad Ansyori",
    role: "Teknik Informatika – Universitas Serang Raya",
    achievement: "Alumni Sukses Berbasis Mitra Nyata",
    story: `Muhammad Ansyori menyelesaikan Tugas Akhirnya dengan mengambil studi kasus di salah satu Industri Kecil Menengah (IKM) binaan Link Productive, dengan fokus pada pengembangan **Software Digital Management System**.

Melalui riset dan implementasi sistem tersebut, ia berhasil membantu IKM dalam:

✓ Meningkatkan efisiensi pengelolaan operasional
✓ Mempermudah proses pencatatan dan monitoring bisnis
✓ Mengoptimalkan sistem manajemen berbasis digital

Tugas akhir yang ia kerjakan tidak hanya memenuhi standar akademik, tetapi juga memberikan **solusi nyata terhadap permasalahan bisnis yang dihadapi oleh IKM**.

Pengalaman mengerjakan proyek berbasis kasus nyata ini menjadi nilai tambah besar dalam perjalanan kariernya. Saat proses **interview kerja**, Muhammad Ansyori diminta untuk menceritakan pengalaman dan keberhasilan dalam pelaksanaan Tugas Akhirnya, termasuk bagaimana sistem yang ia bangun mampu memberikan dampak langsung bagi operasional bisnis mitra.

Penjelasan tersebut menjadi salah satu faktor yang memperkuat penilaiannya sebagai kandidat yang memiliki **pengalaman implementasi nyata, bukan sekadar teori**.

Kini, Muhammad Ansyori telah berkarier sebagai **Full Stack Developer di salah satu perusahaan IT di Jakarta**, membuktikan bahwa Tugas Akhir berbasis kasus nyata dapat menjadi pijakan kuat untuk memasuki dunia profesional.`,
    beforeLabel: "Mahasiswa bingung menentukan topik TA",
    afterLabel: "Full Stack Developer di perusahaan IT Jakarta",
    sortOrder: 1,
  },
  {
    name: "Achmad Rodhi",
    role: "Teknik Informatika – Universitas Serang Raya",
    achievement: "Alumni Sukses Berbasis Mitra Nyata",
    story: `Achmad Rodhi menyelesaikan Tugas Akhirnya di salah satu UMKM binaan Link Productive dengan mengembangkan **Aplikasi Pemesanan Makanan Berbasis Android**.

Melalui pendampingan dari LP Academic Partner, ia berhasil mengimplementasikan sistem digital yang langsung digunakan oleh mitra UMKM untuk mengelola pesanan secara lebih efisien.

✓ Mengembangkan aplikasi Android fungsional untuk mitra nyata
✓ Meningkatkan efisiensi pemesanan di UMKM binaan
✓ Tugas akhir diakui secara akademik dan langsung berdampak di lapangan

Pengalaman ini memberikan nilai tambah nyata dalam portofolio profesional Achmad Rodhi sebagai pengembang aplikasi mobile.`,
    beforeLabel: "Mahasiswa mencari mitra TA yang relevan",
    afterLabel: "Pengembang aplikasi Android berpengalaman",
    sortOrder: 2,
  },
  {
    name: "Ahmad Rohyuli",
    role: "Teknik Industri – Universitas Serang Raya",
    achievement: "Alumni Sukses Berbasis Mitra Nyata",
    story: `Ahmad Rohyuli menyelesaikan Tugas Akhirnya di salah satu Industri Kecil Menengah (IKM) binaan Link Productive dengan mengangkat topik **Analisa PPIC & Production di IKM Workshop Industri**.

Melalui analisis mendalam terhadap proses produksi dan perencanaan di IKM, ia memberikan rekomendasi yang berdampak langsung pada efisiensi operasional mitra.

✓ Menganalisis dan mengoptimalkan alur PPIC di industri nyata
✓ Memberikan solusi perencanaan produksi berbasis data
✓ Hasil penelitian langsung diterapkan oleh IKM mitra

Pengalaman riset berbasis industri nyata ini memperkuat kompetensi Ahmad Rohyuli di bidang Teknik Industri dan manajemen produksi.`,
    beforeLabel: "Mahasiswa teknik industri mencari studi kasus nyata",
    afterLabel: "Ahli PPIC & Production dengan pengalaman lapangan",
    sortOrder: 3,
  },
];

export async function GET() {
  try {
    // Cari product LP Academic Partner
    const product = await prisma.product.findFirst({
      where: { name: { contains: "LP Academic Partner" } },
      orderBy: { createdAt: "asc" },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product 'LP Academic Partner' tidak ditemukan. Buat dulu di admin panel." },
        { status: 404 }
      );
    }

    const results: string[] = [];

    for (const s of STORIES) {
      const existing = await prisma.successStory.findFirst({
        where: { productId: product.id, name: s.name },
      });

      if (existing) {
        results.push(`SKIP: ${s.name} (sudah ada)`);
        continue;
      }

      await prisma.successStory.create({
        data: {
          productId: product.id,
          name: s.name,
          role: s.role,
          achievement: s.achievement,
          story: s.story,
          beforeLabel: s.beforeLabel,
          afterLabel: s.afterLabel,
          sortOrder: s.sortOrder,
          isActive: true,
        },
      });

      results.push(`OK: ${s.name}`);
    }

    return NextResponse.json({
      success: true,
      product: `${product.name} (${product.id})`,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

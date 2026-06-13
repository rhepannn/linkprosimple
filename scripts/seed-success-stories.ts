/**
 * Seed success stories LP Academic Partner
 *
 * Cara pakai:
 *   npx tsx scripts/seed-success-stories.ts
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import pg from "pg";

const stories = [
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
    sort_order: 1,
  },
  {
    name: "Achmad Rodhi",
    role: "Teknik Informatika – Universitas Serang Raya",
    achievement: "Alumni Sukses Berbasis Mitra Nyata",
    story: `Achmad Rodhi menyelesaikan Tugas Akhirnya di salah satu UMKM binaan Link Productive dengan mengembangkan **Aplikasi Pemesanan Makanan Berbasis Android**.

Melalui pendampingan dari LP Academic Partner, ia berhasil mengimplementasikan sistem digital yang langsung digunakan oleh mitra UMKM untuk mengelola pesanan secara lebih efisien.

✓ Mengembangkan aplikasi Android fungsional untuk mitra nyata
✓ Meningkatkan efisiensi pemesanan di UMKM binaan
✓ Tugas akhir yang diakui secara akademik dan praktis di lapangan

Pengalaman ini memberikan nilai tambah nyata dalam portofolio profesional Achmad Rodhi sebagai pengembang aplikasi mobile.`,
    beforeLabel: "Mahasiswa mencari mitra TA yang relevan",
    afterLabel: "Pengembang aplikasi Android berpengalaman",
    sort_order: 2,
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
    sort_order: 3,
  },
];

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 15000,
  });

  const client = await pool.connect();

  try {
    console.log("🔗 Terhubung ke database...\n");

    // Pastikan kolom linkedin sudah ada
    await client.query(`
      ALTER TABLE success_stories ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
      ALTER TABLE success_stories ADD COLUMN IF NOT EXISTS linkedin_screenshot TEXT;
    `);
    console.log("✅ Kolom linkedin_url & linkedin_screenshot siap\n");

    // Cari product LP Academic Partner
    const productRes = await client.query(`
      SELECT id, name FROM products
      WHERE name ILIKE '%LP Academic Partner%'
      ORDER BY created_at ASC
      LIMIT 1
    `);

    if (productRes.rows.length === 0) {
      console.error("❌ Product 'LP Academic Partner' tidak ditemukan di database.");
      console.error("   Pastikan product sudah dibuat di admin panel terlebih dahulu.");
      process.exit(1);
    }

    const productId = productRes.rows[0].id;
    const productName = productRes.rows[0].name;
    console.log(`📦 Product ditemukan: "${productName}" (id: ${productId})\n`);

    let inserted = 0;
    let skipped = 0;

    for (const s of stories) {
      // Cek apakah sudah ada
      const existing = await client.query(
        `SELECT id FROM success_stories WHERE product_id = $1 AND name = $2 LIMIT 1`,
        [productId, s.name]
      );

      if (existing.rows.length > 0) {
        console.log(`⚠️  Skip "${s.name}" — sudah ada.`);
        skipped++;
        continue;
      }

      await client.query(
        `INSERT INTO success_stories
          (id, product_id, name, role, achievement, story, before_label, after_label, sort_order, is_active, created_at, updated_at)
         VALUES
          (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, true, now(), now())`,
        [productId, s.name, s.role, s.achievement, s.story, s.beforeLabel, s.afterLabel, s.sort_order]
      );

      console.log(`✅ Ditambahkan: ${s.name}`);
      inserted++;
    }

    console.log(`\n========================================`);
    console.log(`  SELESAI: ${inserted} ditambahkan, ${skipped} di-skip`);
    console.log(`========================================\n`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});

/**
 * seed-training-programs.js
 * Compatible dengan Prisma v7 (engine "client" + @prisma/adapter-pg)
 *
 * Cara pakai:
 *   node scratch/seed-training-programs.js
 *
 * Pastikan sudah install:
 *   npm install pg @prisma/adapter-pg
 */

const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

// Load env manual (karena ini bukan Next.js runtime)
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" });

const { PrismaClient } = require("./prisma/generated/client");

// ── Koneksi pakai pg adapter (wajib di Prisma v7 engine "client") ──────────
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── Data seed ─────────────────────────────────────────────────────────────
const trainingPrograms = [
  {
    name: "Tekno AI Academy – Starter",
    sku: "TAA-STARTER",
    price: 299000,
    discount: 499000,
    stock: 100,
    duration: "3 bulan",
    photoCount: null,
    features: [
      "Akses materi dasar AI",
      "Komunitas Discord",
      "Sertifikat digital",
    ],
    details: "Program pengenalan AI untuk pemula.",
    programGroup: "Tekno AI Academy",
    description: "Mulai perjalanan AI-mu dengan kurikulum yang terstruktur.",
    isPopular: false,
    sortOrder: 10,
    isActive: true,
  },
  {
    name: "Tekno AI Academy – Pro",
    sku: "TAA-PRO",
    price: 799000,
    discount: 1200000,
    stock: 50,
    duration: "6 bulan",
    photoCount: null,
    features: [
      "Semua fitur Starter",
      "Mentoring 1-on-1",
      "Project portofolio",
      "Job referral",
    ],
    details: "Program intensif untuk yang serius berkarir di bidang AI.",
    programGroup: "Tekno AI Academy",
    description: "Tingkatkan skill AI-mu ke level profesional.",
    isPopular: true,
    sortOrder: 11,
    isActive: true,
  },
];

async function main() {
  console.log("🌱 Mulai seed training programs...\n");

  // Cari atau buat kategori "Training"
  let category = await prisma.category.findFirst({
    where: { slug: "training" },
  });

  if (!category) {
    category = await prisma.category.create({
      data: { name: "Training", slug: "training" },
    });
    console.log(`✅ Kategori dibuat: ${category.name} (${category.id})`);
  } else {
    console.log(`ℹ️  Kategori sudah ada: ${category.name} (${category.id})`);
  }

  // Upsert tiap produk berdasarkan SKU
  for (const program of trainingPrograms) {
    const product = await prisma.product.upsert({
      where: { sku: program.sku },
      update: {
        name: program.name,
        price: program.price,
        discount: program.discount,
        stock: program.stock,
        duration: program.duration,
        features: program.features,
        details: program.details,
        programGroup: program.programGroup,
        description: program.description,
        isPopular: program.isPopular,
        sortOrder: program.sortOrder,
        isActive: program.isActive,
      },
      create: {
        ...program,
        categoryId: category.id,
      },
    });
    console.log(`✅ Product upserted: ${product.name} (SKU: ${product.sku})`);
  }

  console.log("\n🎉 Seed selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
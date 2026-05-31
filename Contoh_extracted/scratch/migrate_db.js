const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const sqlQueries = [
  // 1. Buat tabel affiliate_applications jika belum ada
  `CREATE TABLE IF NOT EXISTS "affiliate_applications" (
      "id"           TEXT NOT NULL,
      "name"         TEXT NOT NULL,
      "email"        TEXT NOT NULL,
      "phone"        TEXT NOT NULL,
      "password"     TEXT NOT NULL DEFAULT '',
      "instagram"    TEXT,
      "tiktok"       TEXT,
      "occupation"   TEXT,
      "city"         TEXT,
      "motivation"   TEXT,
      "experience"   TEXT,
      "status"       TEXT NOT NULL DEFAULT 'pending',
      "notes"        TEXT,
      "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT "affiliate_applications_pkey" PRIMARY KEY ("id")
  );`,

  // 2. Pastikan kolom password ada jika tabel dibuat di versi sebelumnya
  `ALTER TABLE "affiliate_applications" ADD COLUMN IF NOT EXISTS "password" TEXT NOT NULL DEFAULT '';`,

  // 3. Ubah semua user CASHIER menjadi ADMIN (Role cleanup)
  `UPDATE "users" SET "role" = 'ADMIN' WHERE "role"::text = 'CASHIER';`,

  // 4. Tambah kolom target_product_id ke tabel referral_codes jika belum ada
  `ALTER TABLE "referral_codes" ADD COLUMN IF NOT EXISTS "target_product_id" TEXT;`
];

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ DATABASE_URL is not configured in .env.local");
    process.exit(1);
  }

  console.log("⏳ Connecting to Database...");
  const pool = new Pool({ connectionString: dbUrl });

  try {
    const client = await pool.connect();
    console.log("✅ Connected! Executing migrations...");

    for (let i = 0; i < sqlQueries.length; i++) {
      console.log(`Executing step ${i + 1}/${sqlQueries.length}...`);
      await client.query(sqlQueries[i]);
    }

    console.log("🎉 Database migrations completed successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Migration failed:");
    console.error(err);
  } finally {
    await pool.end();
  }
}

migrate();

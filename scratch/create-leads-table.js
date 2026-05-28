const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const query = `
CREATE TABLE IF NOT EXISTS "affiliate_leads" (
    "id"            TEXT NOT NULL,
    "name"          TEXT NOT NULL,
    "phone"         TEXT NOT NULL,
    "email"         TEXT,
    "city"          TEXT,
    "occupation"    TEXT,
    "product_sku"   TEXT,
    "product_name"  TEXT,
    "referral_code" TEXT,
    "snapper_id"    TEXT,
    "notes"         TEXT,
    "status"        TEXT NOT NULL DEFAULT 'pending',
    "created_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "affiliate_leads_pkey" PRIMARY KEY ("id")
);
`;

async function run() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("❌ DATABASE_URL is not configured in .env.local");
    process.exit(1);
  }

  console.log("⏳ Connecting to Database...");
  const pool = new Pool({ connectionString: dbUrl });

  try {
    const client = await pool.connect();
    console.log("✅ Connected! Creating affiliate_leads table...");
    await client.query(query);
    console.log("🎉 Table created/verified successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Action failed:");
    console.error(err);
  } finally {
    await pool.end();
  }
}

run();

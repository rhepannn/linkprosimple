require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require("../prisma/generated/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000 
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ["error", "warn"] });

async function main() {
  try {
    const count = await prisma.affiliateLead.count();
    console.log("AffiliateLead table exists, count:", count);
  } catch (err) {
    console.error("AffiliateLead table error:", err.message);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

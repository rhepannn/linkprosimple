const { PrismaClient } = require("../prisma/generated/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

async function test() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("Attempting to fetch products...");
    const products = await prisma.product.findMany();
    console.log("Success! Products count:", products.length);
  } catch (err) {
    console.error("Prisma Error Details:");
    console.error(err);
  } finally {
    await pool.end();
  }
}

test();

// Config dotenv
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require("../prisma/generated/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const pg = require("pg");

const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000 
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ["error", "warn"],
});

async function main() {
  const products = await prisma.product.findMany({
    include: { category: true }
  });
  console.log(JSON.stringify(products, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

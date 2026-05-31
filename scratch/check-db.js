const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const categories = await prisma.category.findMany();
  console.log('Categories:', categories);
  const products = await prisma.product.findMany();
  console.log('Products:', products);
}
check().finally(() => pool.end());

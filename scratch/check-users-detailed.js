const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;
console.log("DATABASE_URL:", connectionString ? "Set" : "Not Set");

if (!connectionString) {
  console.log("No connection string found. Exiting.");
  process.exit(1);
}

const pool = new pg.Pool({ 
  connectionString,
  connectionTimeoutMillis: 15000 
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("=== DB Users ===");
    console.log(users.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role })));
  } catch (error) {
    console.error("Prisma query error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();

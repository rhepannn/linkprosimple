const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
const bcrypt = require('bcryptjs');

const connectionString = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("=== Verifying Passwords ===");
    for (const u of users) {
      const match = await bcrypt.compare('adminpassword123', u.password);
      console.log(`Email: ${u.email}, Name: ${u.name}, Role: ${u.role}, Password Match 'adminpassword123': ${match}`);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();

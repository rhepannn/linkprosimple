/**
 * Script untuk membuat user baru (Admin / Cashier)
 * 
 * Cara pakai:
 *   npx tsx scripts/create-user.ts
 * 
 * User yang dibuat:
 *   - Admin:   admin@snappframe.com   / Admin@123
 *   - Kasir:   kasir@snappframe.com   / Kasir@123
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";
import bcrypt from "bcryptjs";

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 15000,
  });

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const users = [
    {
      name: "Admin SnappFrame",
      email: "admin@snappframe.com",
      password: "Admin@123",
      role: "ADMIN" as const,
    },
    {
      name: "Kasir SnappFrame",
      email: "kasir@snappframe.com",
      password: "Kasir@123",
      role: "ADMIN" as const,
    },
  ];

  for (const u of users) {
    const existing = await prisma.user.findUnique({
      where: { email: u.email },
    });

    if (existing) {
      console.log(`⚠️  User "${u.email}" sudah ada, skip.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(u.password, 10);

    const created = await prisma.user.create({
      data: {
        name: u.name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
      },
    });

    console.log(`✅ User dibuat: ${created.email} (${created.role})`);
  }

  console.log("\n========================================");
  console.log("  LOGIN CREDENTIALS");
  console.log("========================================");
  console.log("  👤 Admin:");
  console.log("     Email:    admin@snappframe.com");
  console.log("     Password: Admin@123");
  console.log("----------------------------------------");
  console.log("  👤 Kasir:");
  console.log("     Email:    kasir@snappframe.com");
  console.log("     Password: Kasir@123");
  console.log("========================================\n");

  await pool.end();
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 15000,
  });

  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const deleted = await prisma.user.deleteMany({
      where: {
        email: "admin@linkpro.id",
      },
    });
    console.log(`✅ Berhasil menghapus ${deleted.count} akun admin lama (admin@linkpro.id).`);
  } catch (err) {
    console.error("❌ Error menghapus user:", err);
  } finally {
    await pool.end();
  }
}

main();

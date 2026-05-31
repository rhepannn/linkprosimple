const { prisma } = require("../prisma/generated/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

async function check() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const db = new (require("../prisma/generated/client").PrismaClient)({ adapter });

  try {
    console.log("Fetching affiliate applications...");
    const apps = await db.affiliateApplication.findMany();
    console.log("Applications in DB:", JSON.stringify(apps, null, 2));

    if (apps.length > 0) {
      const app = apps[0];
      console.log("Checking if email is already in users table:", app.email);
      const existingUser = await db.user.findUnique({
        where: { email: app.email }
      });
      console.log("Existing user associated with email:", existingUser);
    }
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    await pool.end();
  }
}

check();

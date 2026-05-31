const { PrismaClient } = require("../prisma/generated/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

async function testApprove() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const id = "4db62ec8-ef3c-4d08-8fd0-cc3f4919c48f"; // pending app
    const application = await prisma.affiliateApplication.findUnique({ where: { id } });
    console.log("App details:", application);
    
    // Hash password pendaftar
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(application.password || "default123", 10);
    console.log("Password hashed.");

    const baseCode = "RHPM10";
    console.log("Running transaction...");

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: application.name,
          email: application.email,
          phone: application.phone,
          password: hashedPassword,
          role: "SNAPPER",
        }
      });
      console.log("User created:", user.id);

      const ref = await tx.referralCode.create({
        data: {
          code: baseCode,
          marketerName: application.name,
          discountPct: 10.0,
          maxDiscountAmount: 50000,
          feePercentage: 10.0,
          ownerId: user.id,
          isActive: true,
        }
      });
      console.log("Referral created:", ref.id);
    });

    console.log("Transaction completed! Updating status...");
    const updated = await prisma.affiliateApplication.update({
      where: { id },
      data: { status: "approved" }
    });
    console.log("Updated application status:", updated);

  } catch (err) {
    console.error("Prisma error occurred during simulation:", err);
  } finally {
    await pool.end();
  }
}

testApprove();

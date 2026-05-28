require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require("../prisma/generated/client");
const bcrypt = require("bcryptjs");

async function main() {
  // Karena project ini pakai adapter-pg, kita perlu inisialisasi yang sama atau 
  // pastikan env DATABASE_URL terbaca.
  
  const prisma = new PrismaClient();

  const email = "admin@snappframe.id";
  const password = "adminpassword123";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: "ADMIN",
      },
      create: {
        email,
        name: "Admin Snappframe",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin user created/updated:");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: ${user.role}`);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();

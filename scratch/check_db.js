const { PrismaClient } = require('../prisma/generated/client');
require('dotenv').config({ path: '.env.local' });

async function test() {
  console.log('Testing connection with DATABASE_URL from .env.local...');
  console.log('URL Host:', process.env.DATABASE_URL?.split('@')[1]);
  
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });

  try {
    await prisma.$connect();
    console.log('✅ Connection successful!');
    const categories = await prisma.category.findFirst();
    console.log('✅ Query successful! Category:', categories);
  } catch (err) {
    console.error('❌ Connection failed!');
    console.error(err.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();

require('dotenv').config();
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Attempting to connect to database...');
    const count = await prisma.user.count();
    console.log('Connected! User count:', count);
  } catch (error) {
    console.error('Connection failed:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

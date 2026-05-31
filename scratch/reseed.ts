import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const { seedProductsFromStatic } = await import('../app/actions/products');
  const { prisma } = await import('../lib/prisma');

  console.log('Seeding products...');
  const res = await seedProductsFromStatic();
  console.log('Result:', res);
  await prisma.$disconnect();
}

main().catch(console.error);

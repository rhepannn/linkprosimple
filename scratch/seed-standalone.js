// Standalone seed script - bypasses Next.js module graph
require('dotenv').config({ path: '.env.local' });

const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '..', 'prisma', 'generated', 'client'));
const prisma = new PrismaClient();

async function main() {
  // Dynamically import the packages data
  // We need to use require with ts compilation workaround
  const tsx = require('tsx/cjs/api');
  const { packages } = tsx.require('./data/packages.ts', __filename);

  console.log(`Found ${packages.length} packages to seed`);

  // Ensure category exists
  let category = await prisma.category.findFirst({
    where: { name: "Program Pelatihan" }
  });

  if (!category) {
    category = await prisma.category.create({
      data: { 
        name: "Program Pelatihan",
        slug: "program-pelatihan"
      }
    });
  }

  // Deactivate all old products
  await prisma.product.updateMany({
    data: { isActive: false }
  });
  console.log('Deactivated old products');

  for (const p of packages) {
    const product = await prisma.product.upsert({
      where: { sku: p.id },
      update: {
        name: p.name,
        price: p.price,
        duration: p.duration,
        photoCount: p.photoCount,
        features: p.features,
        isPopular: p.isPopular || false,
        sortOrder: p.sortOrder || 0,
        image: p.image,
        isActive: true,
      },
      create: {
        sku: p.id,
        name: p.name,
        price: p.price,
        stock: 999,
        categoryId: category.id,
        duration: p.duration,
        photoCount: p.photoCount,
        features: p.features,
        isPopular: p.isPopular || false,
        sortOrder: p.sortOrder || 0,
        image: p.image,
        isActive: true,
      }
    });

    // Handle sub-packages
    if (p.packages && p.packages.length > 0) {
      await prisma.productPackage.deleteMany({
        where: { productId: product.id }
      });
      
      await prisma.productPackage.createMany({
        data: p.packages.map(pkg => ({
          productId: product.id,
          name: pkg.name,
          price: pkg.price,
          features: pkg.features || []
        }))
      });
      console.log(`  ✅ ${p.name} — ${p.packages.length} sub-packages`);
    } else {
      console.log(`  ✅ ${p.name} — no sub-packages`);
    }
  }

  console.log(`\nDone! Seeded ${packages.length} products.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());

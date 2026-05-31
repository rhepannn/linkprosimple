// scratch/seed-brand.js
const { PrismaClient } = require('../prisma/generated/client');
const prisma = new PrismaClient();
const { brandProducts } = require('../data/brand-products');

async function main() {
  console.log('Seeding brand products...');
  // Ensure categories exist
  const categories = [...new Set(brandProducts.map(p => p.categoryName))];
  const catMap = {};
  for (const catName of categories) {
    let cat = await prisma.category.findFirst({ where: { name: catName } });
    if (!cat) {
      cat = await prisma.category.create({
        data: {
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-')
        }
      });
    }
    catMap[catName] = cat.id;
  }

  // Seed products
  for (const p of brandProducts) {
    await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        price: p.price,
        duration: p.duration || null,
        photoCount: p.photoCount || null,
        features: p.features,
        isPopular: p.isPopular || false,
        sortOrder: p.sortOrder || 0,
        isActive: true
      },
      create: {
        sku: p.sku,
        name: p.name,
        price: p.price,
        stock: 999,
        categoryId: catMap[p.categoryName],
        duration: p.duration || null,
        photoCount: p.photoCount || null,
        features: p.features,
        isPopular: p.isPopular || false,
        sortOrder: p.sortOrder || 0,
        isActive: true
      }
    });
  }
  console.log('Seeding finished!');
}

main().catch(console.error).finally(() => prisma.$disconnect());

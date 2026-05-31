// Script to:
// 1. Delete all products in "Paket Foto" category from DB
// 2. Rename "Paket Foto" category to "Pelatihan" (if not empty) or delete it
// Run with: node --env-file=.env scratch/cleanup-paketfoto.js

const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString, connectionTimeoutMillis: 15000 });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔍 Fetching all products with categories...');
  const allProducts = await prisma.product.findMany({ include: { category: true } });
  console.log(`📦 Total produk: ${allProducts.length}`);
  allProducts.forEach(p => console.log(`  - [${p.category.name}] ${p.name} (SKU: ${p.sku})`));

  // Find products whose category name or product name contains "foto"
  const keywords = ['foto', 'photo', 'paket foto'];
  const toDelete = allProducts.filter(p => {
    const catName = p.category.name.toLowerCase();
    const prodName = p.name.toLowerCase();
    const sku = p.sku.toLowerCase();
    return keywords.some(kw => catName.includes(kw) || prodName.includes(kw) || sku.includes(kw));
  });

  if (toDelete.length > 0) {
    console.log(`\n🗑️  Akan menghapus ${toDelete.length} produk:`);
    toDelete.forEach(p => console.log(`  ❌ [${p.category.name}] ${p.name}`));
    const ids = toDelete.map(p => p.id);
    const deleted = await prisma.product.deleteMany({ where: { id: { in: ids } } });
    console.log(`✅ Berhasil menghapus ${deleted.count} produk.`);
  } else {
    console.log('\n✅ Tidak ada produk foto yang perlu dihapus.');
  }

  // Delete or rename "Paket Foto" category
  const allCategories = await prisma.category.findMany();
  for (const cat of allCategories) {
    if (cat.name.toLowerCase().includes('foto') || cat.name.toLowerCase().includes('photo')) {
      const remaining = await prisma.product.count({ where: { categoryId: cat.id } });
      if (remaining === 0) {
        await prisma.category.delete({ where: { id: cat.id } });
        console.log(`🗂️  Kategori "${cat.name}" dihapus (kosong).`);
      } else {
        // Rename to Pelatihan
        await prisma.category.update({
          where: { id: cat.id },
          data: { name: 'Pelatihan', slug: 'pelatihan' }
        });
        console.log(`📝 Kategori "${cat.name}" diubah menjadi "Pelatihan".`);
      }
    }
  }

  console.log('\n🎉 Selesai!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

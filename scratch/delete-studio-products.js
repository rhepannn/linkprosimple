// Script to delete all products & categories related to Studio/Foto/Snapp Frame
// Run with: node --env-file=.env scratch/delete-studio-products.js

const { PrismaClient } = require('../prisma/generated/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ DATABASE_URL is not set.");
  process.exit(1);
}

const pool = new pg.Pool({ 
  connectionString,
  connectionTimeoutMillis: 15000 
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔍 Fetching all products...');

  const allProducts = await prisma.product.findMany({
    include: { category: true }
  });

  console.log(`📦 Total produk ditemukan: ${allProducts.length}`);
  allProducts.forEach(p => console.log(`  - [${p.category.name}] ${p.name} (SKU: ${p.sku})`));

  // Keywords to match for deletion
  const keywords = ['foto', 'studio', 'snapp', 'paket foto', 'photo'];

  const toDelete = allProducts.filter(p => {
    const catName = p.category.name.toLowerCase();
    const prodName = p.name.toLowerCase();
    const sku = p.sku.toLowerCase();
    return keywords.some(kw =>
      catName.includes(kw) || prodName.includes(kw) || sku.includes(kw) ||
      sku.startsWith('pkg-') || sku.startsWith('studio-')
    );
  });

  if (toDelete.length === 0) {
    console.log('\n✅ Tidak ada produk Studio/Foto yang perlu dihapus.');
    return;
  }

  console.log(`\n🗑️  Akan menghapus ${toDelete.length} produk:`);
  toDelete.forEach(p => console.log(`  ❌ [${p.category.name}] ${p.name}`));

  // Delete products
  const ids = toDelete.map(p => p.id);
  const deleted = await prisma.product.deleteMany({
    where: { id: { in: ids } }
  });
  console.log(`\n✅ Berhasil menghapus ${deleted.count} produk.`);

  // Also delete "Paket Foto" category if now empty
  const studioCategories = ['paket foto', 'foto', 'studio', 'snapp'];
  const allCategories = await prisma.category.findMany();
  for (const cat of allCategories) {
    const catLower = cat.name.toLowerCase();
    if (studioCategories.some(kw => catLower.includes(kw))) {
      const remaining = await prisma.product.count({ where: { categoryId: cat.id } });
      if (remaining === 0) {
        await prisma.category.delete({ where: { id: cat.id } });
        console.log(`🗂️  Kategori "${cat.name}" dihapus (kosong).`);
      } else {
        console.log(`⚠️  Kategori "${cat.name}" masih punya ${remaining} produk, dilewati.`);
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

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { prisma } from "../lib/prisma";
import { brandProducts } from "../data/brand-products";

async function main() {
  console.log("Seeding brand training products into the database...");
  
  // Group by categoryName
  const categories = [...new Set(brandProducts.map((p) => p.categoryName))];
  const catMap: Record<string, string> = {};

  for (const catName of categories) {
    let cat = await prisma.category.findFirst({ where: { name: catName } });
    if (!cat) {
      cat = await prisma.category.create({
        data: {
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, "-"),
        },
      });
    }
    catMap[catName] = cat.id;
  }

  // Seed products
  let count = 0;
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
        isActive: true,
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
        isActive: true,
      },
    });
    count++;
  }

  console.log(`Successfully upserted ${count} brand training products!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

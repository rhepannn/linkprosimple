"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

// ── Helper: revalidate semua path terkait products ──────────────────────────
function revalidateProductPaths() {
  revalidatePath("/admin/products");
  revalidatePath("/kasir");
  revalidatePath("/packages");
  revalidatePath("/booking");
  revalidatePath("/daftar-pelatihan");
  revalidatePath("/");
}

// ── GET PRODUCTS ─────────────────────────────────────────────────────────────
export async function getProducts(includeInactive: boolean = false) {
  noStore();
  try {
    const products = await prisma.product.findMany({
      where: includeInactive ? {} : { isActive: true },
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    return {
      success: true,
      data: products.map((p) => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        price: p.price,
        discount: p.discount ?? null,
        image: p.image,
        stock: p.stock,                       // FIX: was missing, ProductManagement needs it
        category: p.category.name,
        duration: p.duration || "",
        photoCount: p.photoCount || "",
        features: p.features || [],
        description: p.description || null,
        details: p.details || null,
        programGroup: p.programGroup || null,
        isPopular: p.isPopular || false,
        sortOrder: p.sortOrder || 0,
        isActive: p.isActive,
      })),
    };
  } catch (error: any) {
    console.error("Prisma getProducts Error:", error);
    return { success: false, error: error.message };
  }
}

// ── CREATE PRODUCT ────────────────────────────────────────────────────────────
export async function createProduct(data: {
  name: string;
  sku: string;
  price: number;
  discount?: number;
  categoryName: string;
  image?: string;
  duration?: string;
  photoCount?: string;
  features?: string[];
  description?: string;
  details?: string;
  programGroup?: string;
  isPopular?: boolean;
  sortOrder?: number;
}) {
  try {
    let category = await prisma.category.findFirst({
      where: { name: data.categoryName },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: data.categoryName,
          slug: data.categoryName.toLowerCase().replace(/\s+/g, "-"),
        },
      });
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku || `PROD-${Date.now()}`,
        price: data.price,
        discount: data.discount ?? null,
        stock: 999,
        categoryId: category.id,
        image: data.image ?? null,
        duration: data.duration ?? null,
        photoCount: data.photoCount ?? null,
        features: data.features || [],
        description: data.description ?? null,
        details: data.details ?? null,
        programGroup: data.programGroup ?? null,
        isPopular: data.isPopular || false,
        sortOrder: data.sortOrder || 0,
        isActive: true,
      },
      include: { category: true },
    });

    revalidateProductPaths();
    return { success: true, data: product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── UPDATE PRODUCT ────────────────────────────────────────────────────────────
export async function updateProduct(
  id: string,
  data: {
    name?: string;
    sku?: string;
    price?: number;
    discount?: number | null;  // null = hapus harga coret
    categoryName?: string;
    image?: string;
    isActive?: boolean;
    duration?: string;
    photoCount?: string;
    features?: string[];
    description?: string;
    details?: string;
    programGroup?: string;
    isPopular?: boolean;
    sortOrder?: number;
  }
) {
  try {
    let categoryId: string | undefined;

    if (data.categoryName) {
      let category = await prisma.category.findFirst({
        where: { name: data.categoryName },
      });

      if (!category) {
        category = await prisma.category.create({
          data: {
            name: data.categoryName,
            slug: data.categoryName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }
      categoryId = category.id;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.sku !== undefined && { sku: data.sku }),
        ...(data.price !== undefined && { price: data.price }),
        // FIX: support explicit null to clear discount (harga coret)
        ...("discount" in data && { discount: data.discount ?? null }),
        ...(categoryId && { categoryId }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.photoCount !== undefined && { photoCount: data.photoCount }),
        ...(data.features !== undefined && { features: data.features }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.details !== undefined && { details: data.details }),
        ...(data.programGroup !== undefined && { programGroup: data.programGroup }),
        ...(data.isPopular !== undefined && { isPopular: data.isPopular }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
    });

    revalidateProductPaths();
    return { success: true, data: product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── TOGGLE PRODUCT STATUS ─────────────────────────────────────────────────────
export async function toggleProductStatus(id: string, isActive: boolean) {
  try {
    await prisma.product.update({ where: { id }, data: { isActive } });
    revalidateProductPaths();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── DELETE PRODUCT ────────────────────────────────────────────────────────────
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidateProductPaths();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ── SEED FROM STATIC PACKAGES (legacy) ───────────────────────────────────────
export async function seedProductsFromStatic() {
  try {
    const { packages } = await import("@/data/packages");

    const count = await prisma.product.count();
    if (count > 5) return { success: true, message: "Already seeded or products exist" };

    let category = await prisma.category.findFirst({ where: { name: "Paket Foto" } });
    if (!category) {
      category = await prisma.category.create({
        data: { name: "Paket Foto", slug: "paket-foto" },
      });
    }

    for (const p of packages) {
      await prisma.product.upsert({
        where: { sku: p.id },
        update: {
          name: p.name,
          price: p.price,
          duration: p.duration,
          photoCount: p.photoCount,
          features: p.features,
          isPopular: p.isPopular || false,
          sortOrder: p.sortOrder || 0,
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
        },
      });
    }

    revalidateProductPaths();
    return { success: true, message: "Products seeded successfully" };
  } catch (error: any) {
    console.error("seedProducts Error:", error);
    return { success: false, error: error.message };
  }
}

// ── SEED BRAND PRODUCTS ───────────────────────────────────────────────────────
export async function seedBrandProducts() {
  try {
    const { brandProducts } = await import("@/data/brand-products");

    const existingSkus = await prisma.product.findMany({
      where: { sku: { in: brandProducts.map((p) => p.sku) } },
      select: { sku: true },
    });
    const existingSkuSet = new Set(existingSkus.map((p) => p.sku));

    const newProducts = brandProducts.filter((p) => !existingSkuSet.has(p.sku));

    if (newProducts.length === 0) {
      return { success: true, message: "All brand products already seeded", count: 0 };
    }

    const categoryNames = [...new Set(newProducts.map((p) => p.categoryName))];
    const categoryMap: Record<string, string> = {};

    for (const catName of categoryNames) {
      let category = await prisma.category.findFirst({ where: { name: catName } });
      if (!category) {
        category = await prisma.category.create({
          data: {
            name: catName,
            slug: catName.toLowerCase().replace(/\s+/g, "-"),
          },
        });
      }
      categoryMap[catName] = category.id;
    }

    let created = 0;
    for (const p of newProducts) {
      await prisma.product.create({
        data: {
          sku: p.sku,
          name: p.name,
          price: p.price,
          discount: p.discount ?? null,
          stock: 999,
          categoryId: categoryMap[p.categoryName],
          duration: p.duration || null,
          photoCount: p.photoCount || null,
          features: p.features,
          description: p.description || null,
          programGroup: p.programGroup || null,
          isPopular: p.isPopular || false,
          sortOrder: p.sortOrder || 0,
          isActive: true,
        },
      });
      created++;
    }

    revalidateProductPaths();
    return { success: true, message: `Seeded ${created} brand products`, count: created };
  } catch (error: any) {
    console.error("seedBrandProducts Error:", error);
    return { success: false, error: error.message };
  }
}

// ── UPDATE PRODUCT DETAILS (JSON dalam Text field) ────────────────────────────
// FIX: schema.prisma `details` adalah String? @db.Text — bukan JSON column.
// Kita serialisasi ke JSON string dan parse saat baca.
export async function updateProductDetails(
  id: string,
  details: Record<string, unknown>
) {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return { success: false, error: "Produk tidak ditemukan" };

    // Parse existing JSON string (kalau ada)
    let existingDetails: Record<string, unknown> = {};
    if (product.details) {
      try {
        existingDetails = JSON.parse(product.details);
      } catch {
        // Kalau bukan JSON valid, abaikan saja
        existingDetails = {};
      }
    }

    const mergedDetails = { ...existingDetails, ...details };

    await prisma.product.update({
      where: { id },
      data: { details: JSON.stringify(mergedDetails) },
    });

    revalidatePath("/snapper");
    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
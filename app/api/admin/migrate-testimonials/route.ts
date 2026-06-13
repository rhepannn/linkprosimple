import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/admin/migrate-testimonials
// Moves testimonials → success_stories. Matches by programName ↔ product name/sku.
// Pass { deleteAfter: true } in body to also delete migrated testimonials.
export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const deleteAfter: boolean = body.deleteAfter === true;

  const [testimonials, products] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.product.findMany({ select: { id: true, name: true, sku: true } }),
  ]);

  const migrated: any[] = [];
  const unmatched: any[] = [];
  const skipped: any[] = [];

  for (const t of testimonials) {
    // Check for duplicates already in success_stories
    const dupe = await prisma.successStory.findFirst({
      where: { name: t.name, story: t.text },
    });
    if (dupe) {
      skipped.push({ name: t.name, reason: "already exists in success_stories" });
      continue;
    }

    // Fuzzy match programName → product
    let matchedProduct: { id: string; name: string } | null = null;
    if (t.programName?.trim()) {
      const lower = t.programName.toLowerCase();
      matchedProduct =
        products.find(
          (p) =>
            p.name.toLowerCase().includes(lower) ||
            lower.includes(p.name.toLowerCase()) ||
            p.sku.toLowerCase().includes(lower) ||
            lower.includes(p.sku.toLowerCase())
        ) ?? null;
    }

    if (!matchedProduct) {
      unmatched.push({ id: t.id, name: t.name, programName: t.programName ?? "(kosong)" });
      continue;
    }

    await prisma.successStory.create({
      data: {
        productId: matchedProduct.id,
        name: t.name,
        role: t.role ?? null,
        photoUrl: t.photoUrl ?? null,
        story: t.text,
        sortOrder: t.sortOrder,
        isActive: t.isActive,
      },
    });

    migrated.push({ id: t.id, name: t.name, product: matchedProduct.name });

    if (deleteAfter) {
      await prisma.testimonial.delete({ where: { id: t.id } });
    }
  }

  return NextResponse.json({
    ok: true,
    migrated,
    skipped,
    unmatched,
    note: unmatched.length > 0
      ? "Unmatched testimonials were NOT moved — programName tidak cocok dengan nama/SKU produk manapun. Edit dulu programName-nya di admin testimonials lalu jalankan lagi."
      : undefined,
  });
}

// GET — preview saja (dry run, tidak mengubah data)
export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [testimonials, products] = await Promise.all([
    prisma.testimonial.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.product.findMany({ select: { id: true, name: true, sku: true } }),
  ]);

  const preview = testimonials.map((t) => {
    const lower = (t.programName ?? "").toLowerCase();
    const match =
      lower.trim() === ""
        ? null
        : products.find(
            (p) =>
              p.name.toLowerCase().includes(lower) ||
              lower.includes(p.name.toLowerCase()) ||
              p.sku.toLowerCase().includes(lower) ||
              lower.includes(p.sku.toLowerCase())
          ) ?? null;

    return {
      id: t.id,
      name: t.name,
      programName: t.programName ?? "(kosong)",
      matchedProduct: match ? `${match.name} (${match.sku})` : null,
      willMigrate: !!match,
    };
  });

  const available_products = products.map((p) => `${p.name} — SKU: ${p.sku}`);

  return NextResponse.json({ preview, available_products });
}

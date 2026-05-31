"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGalleryPhotos() {
  try {
    const photos = await prisma.galleryPhoto.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    return { success: true, data: photos };
  } catch (error: any) {
    console.error("getGalleryPhotos Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getFeaturedPhotos(limit: number = 6) {
  try {
    const photos = await prisma.galleryPhoto.findMany({
      where: { isFeatured: true },
      take: limit,
      orderBy: { sortOrder: 'asc' }
    });
    return { success: true, data: photos };
  } catch (error: any) {
    console.error("getFeaturedPhotos Error:", error);
    return { success: false, error: error.message };
  }
}

export async function createGalleryPhoto(data: {
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  isFeatured?: boolean;
  isHero?: boolean;
  sortOrder?: number;
}) {
  try {
    const photo = await prisma.galleryPhoto.create({
      data: {
        ...data,
        isFeatured: data.isFeatured ?? false,
        isHero: data.isHero ?? false,
        sortOrder: data.sortOrder ?? 0
      }
    });
    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true, data: photo };
  } catch (error: any) {
    console.error("createGalleryPhoto Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateGalleryPhoto(id: string, data: any) {
  try {
    const photo = await prisma.galleryPhoto.update({
      where: { id },
      data
    });
    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true, data: photo };
  } catch (error: any) {
    console.error("updateGalleryPhoto Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryPhoto(id: string) {
  try {
    await prisma.galleryPhoto.delete({
      where: { id }
    });
    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error: any) {
    console.error("deleteGalleryPhoto Error:", error);
    return { success: false, error: error.message };
  }
}

export async function seedGalleryFromStatic() {
  try {
    const { photos } = await import("@/data/photos");
    
    // Check if already seeded
    const count = await prisma.galleryPhoto.count();
    if (count > 0) return { success: true, message: "Already seeded" };

    for (const p of photos) {
      await prisma.galleryPhoto.create({
        data: {
          src: p.src,
          alt: p.alt,
          width: p.width,
          height: p.height,
          category: p.category,
          isFeatured: p.isFeatured ?? false,
          isHero: p.isHero ?? false,
          sortOrder: p.sortOrder ?? 0
        }
      });
    }

    revalidatePath("/");
    revalidatePath("/gallery");
    return { success: true, message: "Seeded successfully" };
  } catch (error: any) {
    console.error("seedGallery Error:", error);
    return { success: false, error: error.message };
  }
}

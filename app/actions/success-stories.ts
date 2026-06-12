"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface SuccessStoryInput {
  productId: string;
  name: string;
  role?: string;
  photoUrl?: string;
  achievement?: string;
  story: string;
  beforeLabel?: string;
  afterLabel?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export async function getSuccessStories(productId?: string) {
  try {
    const where: any = productId ? { productId, isActive: true } : {};
    const stories = await prisma.successStory.findMany({
      where,
      include: { product: { select: { name: true, sku: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return { success: true, data: stories };
  } catch (error: any) {
    console.error("getSuccessStories error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function getAllSuccessStories() {
  try {
    const stories = await prisma.successStory.findMany({
      include: { product: { select: { name: true, sku: true } } },
      orderBy: [{ productId: "asc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return { success: true, data: stories };
  } catch (error: any) {
    console.error("getAllSuccessStories error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function createSuccessStory(data: SuccessStoryInput) {
  try {
    if (!data.productId) return { success: false, error: "Program wajib dipilih." };
    if (!data.name?.trim()) return { success: false, error: "Nama wajib diisi." };
    if (!data.story?.trim()) return { success: false, error: "Cerita sukses wajib diisi." };

    await prisma.successStory.create({
      data: {
        productId: data.productId,
        name: data.name.trim(),
        role: data.role?.trim() || null,
        photoUrl: data.photoUrl?.trim() || null,
        achievement: data.achievement?.trim() || null,
        story: data.story.trim(),
        beforeLabel: data.beforeLabel?.trim() || null,
        afterLabel: data.afterLabel?.trim() || null,
        sortOrder: data.sortOrder ?? 0,
        isActive: data.isActive ?? true,
      },
    });

    revalidatePath("/admin/success-stories");
    revalidatePath("/daftar-pelatihan");
    return { success: true };
  } catch (error: any) {
    console.error("createSuccessStory error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateSuccessStory(id: string, data: Partial<SuccessStoryInput>) {
  try {
    const existing = await prisma.successStory.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Success story tidak ditemukan." };

    const updateData: any = {};
    if (data.productId !== undefined) updateData.productId = data.productId;
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.role !== undefined) updateData.role = data.role?.trim() || null;
    if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl?.trim() || null;
    if (data.achievement !== undefined) updateData.achievement = data.achievement?.trim() || null;
    if (data.story !== undefined) updateData.story = data.story.trim();
    if (data.beforeLabel !== undefined) updateData.beforeLabel = data.beforeLabel?.trim() || null;
    if (data.afterLabel !== undefined) updateData.afterLabel = data.afterLabel?.trim() || null;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    await prisma.successStory.update({ where: { id }, data: updateData });

    revalidatePath("/admin/success-stories");
    revalidatePath("/daftar-pelatihan");
    return { success: true };
  } catch (error: any) {
    console.error("updateSuccessStory error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSuccessStory(id: string) {
  try {
    await prisma.successStory.delete({ where: { id } });
    revalidatePath("/admin/success-stories");
    revalidatePath("/daftar-pelatihan");
    return { success: true };
  } catch (error: any) {
    console.error("deleteSuccessStory error:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleSuccessStoryActive(id: string, isActive: boolean) {
  try {
    await prisma.successStory.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/success-stories");
    revalidatePath("/daftar-pelatihan");
    return { success: true };
  } catch (error: any) {
    console.error("toggleSuccessStoryActive error:", error);
    return { success: false, error: error.message };
  }
}

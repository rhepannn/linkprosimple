"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface TestimonialInput {
  name: string;
  role?: string;
  photoUrl?: string;
  programName?: string;
  rating: number;
  text: string;
  date?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export async function getTestimonials(activeOnly: boolean = true) {
  try {
    const where = activeOnly ? { isActive: true } : {};
    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return { success: true, data: testimonials };
  } catch (error: any) {
    console.error("getTestimonials error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function getActiveTestimonials(limit: number = 9) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: limit,
    });
    return { success: true, data: testimonials };
  } catch (error: any) {
    console.error("getActiveTestimonials error:", error);
    return { success: false, error: error.message, data: [] };
  }
}

export async function createTestimonial(data: TestimonialInput) {
  try {
    if (!data.name?.trim()) return { success: false, error: "Nama wajib diisi." };
    if (!data.text?.trim()) return { success: false, error: "Teks testimoni wajib diisi." };

    await prisma.testimonial.create({
      data: {
        name: data.name.trim(),
        role: data.role?.trim() || null,
        photoUrl: data.photoUrl?.trim() || null,
        programName: data.programName?.trim() || null,
        rating: Math.min(5, Math.max(1, data.rating || 5)),
        text: data.text.trim(),
        date: data.date?.trim() || null,
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder ?? 0,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("createTestimonial error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTestimonial(id: string, data: Partial<TestimonialInput>) {
  try {
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Testimoni tidak ditemukan." };

    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.role !== undefined) updateData.role = data.role?.trim() || null;
    if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl?.trim() || null;
    if (data.programName !== undefined) updateData.programName = data.programName?.trim() || null;
    if (data.rating !== undefined) updateData.rating = Math.min(5, Math.max(1, data.rating));
    if (data.text !== undefined) updateData.text = data.text.trim();
    if (data.date !== undefined) updateData.date = data.date?.trim() || null;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

    await prisma.testimonial.update({ where: { id }, data: updateData });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("updateTestimonial error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("deleteTestimonial error:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleTestimonialActive(id: string, isActive: boolean) {
  try {
    await prisma.testimonial.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("toggleTestimonialActive error:", error);
    return { success: false, error: error.message };
  }
}

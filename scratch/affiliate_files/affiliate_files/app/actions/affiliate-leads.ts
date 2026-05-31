"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAffiliateLead(data: {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  occupation?: string;
  productSku?: string;
  productName?: string;
  referralCode?: string;
  snapperId?: string;
  notes?: string;
}) {
  try {
    const lead = await prisma.affiliateLead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        city: data.city || null,
        occupation: data.occupation || null,
        productSku: data.productSku || null,
        productName: data.productName || null,
        referralCode: data.referralCode || null,
        snapperId: data.snapperId || null,
        notes: data.notes || null,
        status: "pending",
      },
    });

    revalidatePath("/admin/affiliators");
    return { success: true, data: lead };
  } catch (error: any) {
    console.error("createAffiliateLead Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getAffiliateLeadStatus(id: string) {
  try {
    const lead = await prisma.affiliateLead.findUnique({
      where: { id }
    });
    if (!lead) return { success: false, error: "Pendaftaran tidak ditemukan" };
    return { success: true, status: lead.status };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAffiliateLeads(statusFilter?: string) {
  try {
    const where: any = {};
    if (statusFilter && statusFilter !== "all") {
      where.status = statusFilter;
    }

    const leads = await prisma.affiliateLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: leads.map((l) => ({
        ...l,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateAffiliateLeadStatus(
  id: string,
  status: string
) {
  try {
    await prisma.affiliateLead.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteAffiliateLead(id: string) {
  try {
    await prisma.affiliateLead.delete({
      where: { id },
    });

    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

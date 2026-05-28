"use server";

// app/actions/affiliate-posts.ts
// CRUD for Instagram-like affiliate posts

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAffiliatePosts() {
  try {
    const posts = await prisma.affiliatePost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (error: any) {
    console.error("getAffiliatePosts Error:", error);
    return { success: false, error: error.message };
  }
}

export async function createAffiliatePost(data: {
  imageUrl: string;
  caption: string;
  hashtags: string[];
  isPublished?: boolean;
  postedBy: string;
}) {
  try {
    const post = await prisma.affiliatePost.create({
      data: {
        imageUrl: data.imageUrl,
        caption: data.caption,
        hashtags: data.hashtags,
        isPublished: data.isPublished ?? true,
        postedBy: data.postedBy,
        likeCount: 0,
      },
    });
    revalidatePath("/admin/affiliators");
    return { success: true, data: post };
  } catch (error: any) {
    console.error("createAffiliatePost Error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateAffiliatePost(
  id: string,
  data: {
    imageUrl?: string;
    caption?: string;
    hashtags?: string[];
    isPublished?: boolean;
  }
) {
  try {
    const post = await prisma.affiliatePost.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/affiliators");
    return { success: true, data: post };
  } catch (error: any) {
    console.error("updateAffiliatePost Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteAffiliatePost(id: string) {
  try {
    await prisma.affiliatePost.delete({ where: { id } });
    revalidatePath("/admin/affiliators");
    return { success: true };
  } catch (error: any) {
    console.error("deleteAffiliatePost Error:", error);
    return { success: false, error: error.message };
  }
}

export async function togglePostPublish(id: string, current: boolean) {
  try {
    const post = await prisma.affiliatePost.update({
      where: { id },
      data: { isPublished: !current },
    });
    revalidatePath("/admin/affiliators");
    return { success: true, data: post };
  } catch (error: any) {
    console.error("togglePostPublish Error:", error);
    return { success: false, error: error.message };
  }
}

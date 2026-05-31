"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Convert array of { key, value } to an object
    return settings.reduce((acc: Record<string, string>, setting: { key: string; value: string }) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {};
  }
}

export async function updateSiteSettings(settings: Record<string, string>) {
  try {
    // We update sequentially to handle multiple keys
    // Could use a transaction if there are many keys
    
    // Clean up settings object to ensure all values are strings
    const cleanSettings: Record<string, string> = {};
    for (const [key, value] of Object.entries(settings)) {
      if (value !== null && value !== undefined) {
        cleanSettings[key] = String(value);
      }
    }

    await prisma.$transaction(
      Object.entries(cleanSettings).map(([key, value]) => 
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    
    // Revalidate paths that might use these settings
    revalidatePath("/");
    revalidatePath("/admin/settings");
    revalidatePath("/affiliate");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating site settings:", error);
    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    }
    return { success: false, error: "Gagal menyimpan pengaturan website" };
  }
}

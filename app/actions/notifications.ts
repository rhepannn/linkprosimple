"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPendingCounts() {
  try {
    const pendingBookings = await prisma.booking.count({
      where: { status: "pending" }
    });
    
    const pendingAffiliates = await prisma.affiliateApplication.count({
      where: { status: "pending" }
    });

    return {
      bookings: pendingBookings,
      affiliates: pendingAffiliates
    };
  } catch (error) {
    console.error("Error fetching pending counts:", error);
    return {
      bookings: 0,
      affiliates: 0
    };
  }
}

/* ── Affiliate Notifications ── */

export interface AffiliateNotificationItem {
  id: string;
  type: "new_referral" | "commission_paid" | "payout_processed";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  timeAgo: string;
}

export async function getAffiliateNotifications(userId: string) {
  try {
    const notifications = await prisma.affiliateNotification.findMany({
      where: { snapperId: userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const unreadCount = await prisma.affiliateNotification.count({
      where: { snapperId: userId, isRead: false },
    });

    const items: AffiliateNotificationItem[] = notifications.map((n) => ({
      id: n.id,
      type: n.type as AffiliateNotificationItem["type"],
      title: n.title,
      message: n.message,
      isRead: n.isRead,
      createdAt: n.createdAt.toISOString(),
      timeAgo: getTimeAgo(n.createdAt),
    }));

    return { success: true, data: { notifications: items, unreadCount } };
  } catch (error: any) {
    console.error("getAffiliateNotifications error:", error);
    return { success: false, error: error.message, data: { notifications: [], unreadCount: 0 } };
  }
}

export async function markNotificationRead(notificationId: string) {
  try {
    await prisma.affiliateNotification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
    return { success: true };
  } catch (error: any) {
    console.error("markNotificationRead error:", error);
    return { success: false, error: error.message };
  }
}

export async function markAllNotificationsRead(userId: string) {
  try {
    await prisma.affiliateNotification.updateMany({
      where: { snapperId: userId, isRead: false },
      data: { isRead: true },
    });
    revalidatePath("/snapper");
    return { success: true };
  } catch (error: any) {
    console.error("markAllNotificationsRead error:", error);
    return { success: false, error: error.message };
  }
}

export async function createAffiliateNotification(
  snapperId: string,
  type: "new_referral" | "commission_paid" | "payout_processed",
  title: string,
  message: string
) {
  try {
    await prisma.affiliateNotification.create({
      data: { snapperId, type, title, message },
    });
    return { success: true };
  } catch (error: any) {
    console.error("createAffiliateNotification error:", error);
    return { success: false, error: error.message };
  }
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHr < 24) return `${diffHr} jam lalu`;
  if (diffDay < 7) return `${diffDay} hari lalu`;
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

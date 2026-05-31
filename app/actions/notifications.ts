"use server";

import { prisma } from "@/lib/prisma";

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

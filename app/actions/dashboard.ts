"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      transactionsToday,
      bookingsToday,
      activeProducts,
      activeReferrals,
      posRevenue,
      bookingRevenue
    ] = await Promise.all([
      // Transactions count today (POS)
      prisma.transaction.count({
        where: { 
          createdAt: { gte: today },
          status: "COMPLETED"
        }
      }),
      // Bookings count today (Online)
      prisma.booking.count({
        where: {
          sessionDate: today.toISOString().split("T")[0],
          status: { in: ["confirmed", "completed", "success"] }
        }
      }),
      // Active products
      prisma.product.count({
        where: { isActive: true }
      }),
      // Active referrals
      prisma.referralCode.count({
        where: { isActive: true }
      }),
      // POS Revenue today
      prisma.transaction.aggregate({
        _sum: { total: true },
        where: { 
          createdAt: { gte: today },
          status: "COMPLETED"
        }
      }),
      // Booking Revenue today
      prisma.booking.aggregate({
        _sum: { finalPrice: true },
        where: {
          sessionDate: today.toISOString().split("T")[0],
          status: { in: ["confirmed", "completed", "success"] }
        }
      })
    ]);

    const totalRevenueToday = (posRevenue._sum.total || 0) + (bookingRevenue._sum.finalPrice || 0);

    return {
      success: true,
      data: {
        posToday: transactionsToday,
        bookingsToday: bookingsToday,
        revenue: totalRevenueToday,
        activeProducts,
        referrals: activeReferrals
      }
    };
  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getBookingCategoryStats() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        status: { in: ["confirmed", "completed", "success"] }
      },
      select: { packageName: true }
    });

    const categoryCounts: Record<string, number> = {};
    bookings.forEach(b => {
      categoryCounts[b.packageName] = (categoryCounts[b.packageName] || 0) + 1;
    });

    const data = Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value).slice(0, 5);

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getRecentTransactions() {
  try {
    const [transactions, bookings] = await Promise.all([
      prisma.transaction.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          cashier: { select: { name: true } },
          referralCode: { select: { code: true } }
        }
      }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" }
      })
    ]);

    const normalizedBookings = bookings.map(b => ({
      id: b.id,
      invoiceNumber: b.invoiceNo,
      total: b.finalPrice,
      status: b.status.toUpperCase(),
      paymentMethod: b.paymentMethod.toUpperCase(),
      createdAt: b.createdAt.toISOString(),
      subject: b.customerName,
      referralCode: b.referralCode ? { code: b.referralCode } : null,
      type: "BOOKING"
    }));

    const normalizedPos = transactions.map(t => ({ 
      id: t.id,
      invoiceNumber: t.invoiceNumber,
      total: t.total,
      status: t.status,
      paymentMethod: t.paymentMethod,
      createdAt: t.createdAt.toISOString(),
      subject: t.cashier?.name || "Admin",
      referralCode: t.referralCode,
      type: "POS" 
    }));

    const combined = [...normalizedPos, ...normalizedBookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    return { success: true, data: combined };
  } catch (error: any) {
    console.error("Recent Transactions Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getUpcomingBookings() {
  try {
    const today = new Date().toISOString().split("T")[0];
    
    const bookings = await prisma.booking.findMany({
      where: {
        sessionDate: { gte: today },
        status: { in: ["pending", "confirmed"] }
      },
      orderBy: [
        { sessionDate: "asc" },
        { sessionTime: "asc" }
      ],
      take: 10
    });

    // Serialize DateTime fields to strings so they can cross the server→client boundary
    const serialized = bookings.map((b) => ({
      id: b.id,
      invoiceNo: b.invoiceNo,
      packageId: b.packageId,
      packageName: b.packageName,
      customerName: b.customerName,
      customerPhone: b.customerPhone,
      sessionDate: b.sessionDate,
      sessionTime: b.sessionTime,
      notes: b.notes,
      status: b.status,
      finalPrice: b.finalPrice,
      paymentMethod: b.paymentMethod,
      createdAt: b.createdAt.toISOString(),
    }));

    return { success: true, data: serialized };
  } catch (error: any) {
    console.error("Upcoming Bookings Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getChartData(period: "daily" | "weekly" | "monthly" = "daily") {
  try {
    const now = new Date();
    let startDate = new Date();
    let days = 7;

    if (period === "weekly") {
      startDate.setDate(now.getDate() - 28); // 4 weeks
      days = 28;
    } else if (period === "monthly") {
      startDate.setMonth(now.getMonth() - 6); // 6 months
      days = 180;
    } else {
      startDate.setDate(now.getDate() - 7);
      days = 7;
    }

    const [transactions, bookings] = await Promise.all([
      prisma.transaction.findMany({
        where: { createdAt: { gte: startDate }, status: "COMPLETED" },
        select: { createdAt: true, total: true }
      }),
      prisma.booking.findMany({
        where: { createdAt: { gte: startDate }, status: { in: ["confirmed", "completed", "success"] } },
        select: { createdAt: true, finalPrice: true }
      })
    ]);

    const dailyTrends = Array.from({ length: days }).map((_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i + 1);
      const dateKey = date.toISOString().split("T")[0];
      const label = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      
      const posTotal = transactions
        .filter(t => t.createdAt.toISOString().split("T")[0] === dateKey)
        .reduce((sum, t) => sum + t.total, 0);
      
      const bookingTotal = bookings
        .filter(b => b.createdAt.toISOString().split("T")[0] === dateKey)
        .reduce((sum, b) => sum + b.finalPrice, 0);

      return { name: label, revenue: posTotal + bookingTotal };
    });

    // Group by period if needed
    let finalTrends = dailyTrends;
    if (period === "weekly") {
      // Logic to group by week
    } else if (period === "monthly") {
      // Logic to group by month
    }

    return {
      success: true,
      data: {
        trends: finalTrends,
        hasTrendData: finalTrends.some(t => t.revenue > 0)
      }
    };
  } catch (error: any) {
    console.error("Chart Data Error:", error);
    return { success: false, error: error.message };
  }
}



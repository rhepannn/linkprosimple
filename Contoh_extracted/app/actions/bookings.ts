"use server";

import { prisma } from "@/lib/prisma";

// Helper to map Prisma Booking model (camelCase) to snake_case structure expected by frontend
function mapPrismaBookingToSnakeCase(b: any) {
  return {
    id: b.id,
    invoice_no: b.invoiceNo,
    package_id: b.packageId,
    package_name: b.packageName,
    customer_name: b.customerName,
    customer_phone: b.customerPhone,
    session_date: b.sessionDate,
    session_time: b.sessionTime,
    notes: b.notes,
    referral_code: b.referralCode,
    discount_pct: b.discountPct,
    original_price: b.originalPrice,
    final_price: b.finalPrice,
    payment_method: b.paymentMethod,
    status: b.status,
    created_at: b.createdAt ? b.createdAt.toISOString() : null,
    updated_at: b.updatedAt ? b.updatedAt.toISOString() : null,
  };
}

export async function getBookings() {
  try {
    // Fix #2: Fetch semua booking (untuk halaman bookings management)
    // Untuk customers page, gunakan getTransactionReports yang sudah difilter by status
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { data: bookings.map(mapPrismaBookingToSnakeCase), error: null };
  } catch (error: any) {
    console.error("Error fetching bookings via Prisma:", error);
    return { data: [], error: error.message };
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status }
    });

    // Calculate and award commission if status becomes completed ("completed")
    if (status === "completed") {
      try {
        const booking = await prisma.booking.findUnique({
          where: { id },
        });

        if (booking && booking.referralCode) {
          const code = booking.referralCode.trim().toUpperCase();
          const ref = await prisma.referralCode.findUnique({
            where: { code },
            include: { owner: true }
          });

          // Award fee if referral code is owned by a SNAPPER
          if (ref && ref.ownerId && ref.owner && ref.owner.role === "SNAPPER") {
            // Prevent duplicate commission entries for same booking
            const existingCommission = await prisma.affiliateCommission.findFirst({
              where: { bookingId: id }
            });

            if (!existingCommission) {
              const commissionAmount = booking.finalPrice * (ref.feePercentage / 100);

              await prisma.affiliateCommission.create({
                data: {
                  snapperId: ref.ownerId,
                  bookingId: id,
                  amount: commissionAmount,
                  status: "pending"
                }
              });
              console.log(`[Commission] Successfully awarded Rp ${commissionAmount} to Snapper ${ref.owner.name} (Code: ${code})`);
            }
          }
        }
      } catch (err) {
        console.error("Failed to reward commission on booking completion:", err);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating booking status via Prisma:", error);
    return { success: false, error: error.message };
  }
}

// Fix #5: Dedicated function untuk fetch hanya pending bookings — lebih efisien
// daripada getBookings() yang tarik semua data
export async function getPendingBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "desc" }
    });
    return { data: bookings.map(mapPrismaBookingToSnakeCase), error: null };
  } catch (error: any) {
    console.error("Error fetching pending bookings via Prisma:", error);
    return { data: [], error: error.message };
  }
}

export async function getBookingStatus(invoiceNo: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { invoiceNo }
    });
    if (!booking) return { success: false, error: "Booking tidak ditemukan" };
    return { success: true, status: booking.status };
  } catch (error: any) {
    console.error("Error fetching booking status:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBookingStatusByInvoice(invoiceNo: string, status: string) {
  try {
    const booking = await prisma.booking.findUnique({ where: { invoiceNo } });
    if (!booking) return { success: false, error: "Booking tidak ditemukan" };
    return await updateBookingStatus(booking.id, status);
  } catch (error: any) {
    console.error("Error updating booking status by invoice:", error);
    return { success: false, error: error.message };
  }
}

export async function createBooking(data: any) {
  try {
    // Map snake_case payload to camelCase fields for Prisma input
    const newBooking = await prisma.booking.create({
      data: {
        invoiceNo: data.invoice_no,
        packageId: data.package_id,
        packageName: data.package_name,
        customerName: data.customer_name,
        customerPhone: data.customer_phone,
        sessionDate: data.session_date,
        sessionTime: data.session_time,
        notes: data.notes,
        referralCode: data.referral_code,
        discountPct: data.discount_pct || 0,
        originalPrice: data.original_price,
        finalPrice: data.final_price,
        paymentMethod: data.payment_method,
        status: data.status || "pending",
      }
    });

    // Increment referral usage if applicable
    if (data.referral_code) {
      try {
        const normalizedCode = data.referral_code.trim().toUpperCase();
        await prisma.referralCode.update({
          where: { code: normalizedCode },
          data: { usageCount: { increment: 1 } }
        });
      } catch (err) {
        console.error("Failed to increment referral usage:", err);
        // Don't fail the booking if only referral increment fails
      }
    }

    return { success: true, data: mapPrismaBookingToSnakeCase(newBooking) };
  } catch (error: any) {
    console.error("Error creating booking via Prisma:", error);
    return { success: false, error: error.message };
  }
}

export async function updateBooking(id: string, data: {
  customer_name?: string;
  customer_phone?: string;
  package_name?: string;
  session_date?: string;
  session_time?: string;
  notes?: string;
  payment_method?: string;
  original_price?: number;
  final_price?: number;
  status?: string;
}) {
  try {
    const updated = await prisma.booking.update({
      where: { id },
      data: {
        ...(data.customer_name !== undefined && { customerName: data.customer_name }),
        ...(data.customer_phone !== undefined && { customerPhone: data.customer_phone }),
        ...(data.package_name !== undefined && { packageName: data.package_name }),
        ...(data.session_date !== undefined && { sessionDate: data.session_date }),
        ...(data.session_time !== undefined && { sessionTime: data.session_time }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.payment_method !== undefined && { paymentMethod: data.payment_method }),
        ...(data.original_price !== undefined && { originalPrice: data.original_price }),
        ...(data.final_price !== undefined && { finalPrice: data.final_price }),
        ...(data.status !== undefined && { status: data.status }),
      },
    });
    return { success: true, data: mapPrismaBookingToSnakeCase(updated) };
  } catch (error: any) {
    console.error("Error updating booking:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBooking(id: string) {
  try {
    // Remove commissions first to avoid FK constraint errors
    await prisma.affiliateCommission.deleteMany({ where: { bookingId: id } });
    await prisma.booking.delete({ where: { id } });
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting booking:", error);
    return { success: false, error: error.message };
  }
}
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import crypto from "crypto";

export async function saveTransaction(data: {
  invoiceNumber: string;
  items: { id: string; qty: number; price: number; name: string }[];
  paymentMethod: "CASH" | "TRANSFER" | "QRIS" | "EWALLET";
  referralCodeId?: string | null;
  total: number;
  discount: number;
  tax: number;
  customerName?: string;
  customerPhone?: string;
  bookingDate?: string;
  bookingTime?: string;
  paymentRef?: string;
}) {
  console.log("Saving transaction data:", JSON.stringify(data, null, 2));
  try {
    const session = await auth();
    let userId = (session?.user as any)?.id;

    const fs = require("fs");
    fs.writeFileSync("prisma_keys.txt", Object.keys(prisma).filter(k => !k.startsWith("_") && !k.startsWith("$")).join("\n"));

    if (!userId) {
      console.warn("SaveTransaction: No session found, attempting fallback user");
      
      // Cari admin (harus huruf besar sesuai Enum)
      let fallbackUser = await prisma.user.findFirst({
        where: { role: "ADMIN" }
      });

      // Jika tidak ada admin, ambil user pertama mana saja
      if (!fallbackUser) {
        fallbackUser = await prisma.user.findFirst();
      }

      // Jika database benar-benar kosong, buat user sistem baru
      if (!fallbackUser) {
        console.log("Database empty, creating auto-system-user");
        fallbackUser = await prisma.user.create({
          data: {
            id: crypto.randomUUID(),
            name: "System Admin",
            email: "admin@system.com",
            password: "system_admin_pass", // Wajib diisi sesuai skema
            role: "ADMIN",
            updatedAt: new Date()
          }
        });
      }

      userId = fallbackUser.id;
      console.log("Using Fallback User ID:", userId);
    }

    // 1. Validasi Produk & Filter Custom Items
    // Jika ID produk diawali dengan 'custom-', kita tidak bisa simpan ke TransactionItem 
    // karena productId adalah Foreign Key ke tabel Product.
    // Kita akan memisahkan item valid dan item custom.
    const validItems: any[] = [];
    const customItemsNotes: string[] = [];

    for (const item of data.items) {
      if (item.id.startsWith("custom-")) {
        customItemsNotes.push(`${item.name} (${item.qty}x Rp${item.price})`);
      } else {
        const exists = await prisma.product.findUnique({ where: { id: item.id } });
        if (exists) {
          validItems.push({
            productId: item.id,
            qty: item.qty,
            price: item.price,
            subtotal: item.qty * item.price
          });
        } else {
          customItemsNotes.push(`${item.name} [ID Hilang] (${item.qty}x Rp${item.price})`);
        }
      }
    }

    // 2. Process referral code
    let referralCodeId = data.referralCodeId;
    let normalizedReferralCode: string | null = null;

    if (referralCodeId) {
      const ref = await prisma.referralCode.update({
        where: { id: referralCodeId },
        data: { usageCount: { increment: 1 } }
      });
      normalizedReferralCode = ref.code;
    }

    // 3. Pastikan invoiceNumber unik untuk menghindari error duplikasi
    const existingTx = await prisma.transaction.findUnique({
      where: { invoiceNumber: data.invoiceNumber }
    });
    
    const finalInvoice = existingTx 
      ? `${data.invoiceNumber}-${Math.floor(Math.random() * 1000)}` 
      : data.invoiceNumber;

    // 4. Create Transaction
    const transactionId = crypto.randomUUID();
    const transaction = await prisma.transaction.create({
      data: {
        id: transactionId,
        invoiceNumber: finalInvoice,
        cashierId: userId,
        total: data.total,
        tax: data.tax,
        discount: data.discount,
        paymentMethod: data.paymentMethod as any,
        referralCodeId: referralCodeId,
        status: "COMPLETED",
        updatedAt: new Date(),
        items: {
          create: validItems.map(item => ({
            id: crypto.randomUUID(),
            productId: item.productId,
            qty: item.qty,
            price: item.price,
            subtotal: item.subtotal
          }))
        }
      }
    });

    // 5. Create Referral Usage
    if (referralCodeId) {
      await prisma.referralUsage.create({
        data: {
          id: crypto.randomUUID(),
          referralCodeId: referralCodeId,
          transactionId: transaction.id,
          userId: userId,
        }
      });
    }

    // 6. Create Booking if applicable (Wrapped in try-catch to not block transaction)
    if (data.customerName && (data.bookingDate || data.customerPhone)) {
      const notes = customItemsNotes.length > 0 
        ? `Item Custom: ${customItemsNotes.join(", ")}` 
        : "";

      try {
        // Hitung discountPct untuk record booking
        const subtotal = data.total + data.discount;
        const discountPct = subtotal > 0 ? (data.discount / subtotal) * 100 : 0;

        await prisma.booking.create({
          data: {
            invoiceNo: finalInvoice,
            customerName: data.customerName,
            customerPhone: data.customerPhone || "-",
            sessionDate: data.bookingDate || new Date().toISOString().split('T')[0],
            sessionTime: data.bookingTime || new Date().toTimeString().split(' ')[0].substring(0, 5),
            packageName: data.items.map(i => i.name).join(", "),
            packageId: data.items[0]?.id || "unknown",
            originalPrice: subtotal,
            finalPrice: data.total,
            paymentMethod: data.paymentMethod.toLowerCase(),
            status: "confirmed",
            referralCode: normalizedReferralCode,
            discountPct: discountPct,
            notes: notes
          }
        });
      } catch (bookingError: any) {
        console.error("Booking creation failed, but transaction is saved:", bookingError.message);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/admin/customers");
    revalidatePath("/kasir");

    return { success: true, data: transaction };
  } catch (error: any) {
    console.error("CRITICAL ERROR saving transaction:", error);
    // Tampilkan detail error agar bisa diperbaiki
    return { 
      success: false, 
      error: `Database Error: ${error.message || "Unknown error"}` 
    };
  }
}

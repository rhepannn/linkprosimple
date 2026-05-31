// app/api/payment/webhook/route.ts
// Webhook endpoint untuk menerima notifikasi dari Midtrans

import { NextRequest, NextResponse } from "next/server";
import { verifyMidtransSignature } from "@/lib/midtrans";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = body;

    // Verifikasi signature hash
    const isValid = await verifyMidtransSignature(
      order_id,
      status_code,
      gross_amount,
      signature_key
    );

    if (!isValid) {
      console.error("[Midtrans Webhook] Invalid signature for order:", order_id);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Tentukan status booking baru berdasarkan transaction_status Midtrans
    let newStatus: string | null = null;

    if (transaction_status === "capture") {
      if (fraud_status === "challenge") {
        newStatus = "pending"; // Perlu direview manual
      } else if (fraud_status === "accept") {
        newStatus = "confirmed";
      }
    } else if (transaction_status === "settlement") {
      newStatus = "confirmed";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      newStatus = "cancelled";
    } else if (transaction_status === "pending") {
      newStatus = "pending";
    }

    // Update status di Supabase jika ada perubahan
    if (newStatus) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabaseAdmin.from("bookings") as any)
        .update({ status: newStatus })
        .eq("invoice_no", order_id);

      if (error) {
        console.error("[Midtrans Webhook] Failed to update Supabase:", error.message);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
      }
      
      console.log(`[Midtrans Webhook] Order ${order_id} status updated to ${newStatus}`);
    }

    // Beri response 200 OK ke Midtrans
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Midtrans Webhook] Error processing notification:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

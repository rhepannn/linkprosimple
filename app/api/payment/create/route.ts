// app/api/payment/create/route.ts
// Buat Snap token Midtrans — dipanggil dari client step5-receipt
// Server-side only; MIDTRANS_SERVER_KEY tidak pernah ke browser

import { NextRequest, NextResponse } from "next/server";
import { createSnapToken, SnapPaymentGroup } from "@/lib/midtrans";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      orderId: string;
      grossAmount: number;
      customerName: string;
      customerPhone: string;
      itemName: string;
      itemId: string;
      paymentGroup: SnapPaymentGroup;
    };

    const { orderId, grossAmount, customerName, customerPhone, itemName, itemId, paymentGroup } = body;

    if (!orderId || !grossAmount || !customerName) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const snapToken = await createSnapToken({
      orderId,
      grossAmount,
      customerName,
      customerPhone,
      itemName,
      itemId,
      paymentGroup,
    });

    return NextResponse.json({ snapToken });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal membuat token pembayaran";
    console.error("[Midtrans] create token error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

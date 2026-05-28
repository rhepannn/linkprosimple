// lib/midtrans.ts — Midtrans Snap helper (SERVER-SIDE ONLY)
// Menggunakan fetch langsung ke Midtrans API — tidak ada extra dependency.
// ⚠️  Jangan import file ini di "use client" komponen manapun.

import { env } from "@/lib/env";

export type SnapPaymentGroup = "qris" | "bank_transfer" | "all";

export interface SnapTransactionParams {
  orderId: string;
  grossAmount: number;
  customerName: string;
  customerPhone: string;
  itemName: string;
  itemId: string;
  paymentGroup: SnapPaymentGroup;
}

// Midtrans enabled_payments berdasarkan pilihan user
const PAYMENT_MAP: Record<SnapPaymentGroup, string[]> = {
  qris: ["gopay", "qris", "shopeepay", "dana", "linkaja"],
  bank_transfer: ["bca_va", "bni_va", "bri_va", "permata_va", "mandiri_bill", "echannel"],
  all: [], // kosong = semua metode ditampilkan
};

/**
 * Buat Snap token dari Midtrans.
 * Dipanggil hanya dari server (API route).
 *
 * @returns snap_token string untuk dikirim ke client
 */
export async function createSnapToken(params: SnapTransactionParams): Promise<string> {
  const serverKey = env.MIDTRANS_SERVER_KEY;
  const isProduction = env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION;
  const baseUrl = isProduction
    ? "https://app.midtrans.com/snap/v1/transactions"
    : "https://app.sandbox.midtrans.com/snap/v1/transactions";

  const auth = Buffer.from(`${serverKey}:`).toString("base64");

  const body: Record<string, unknown> = {
    transaction_details: {
      order_id: params.orderId,
      gross_amount: params.grossAmount,
    },
    customer_details: {
      first_name: params.customerName,
      phone: params.customerPhone,
    },
    item_details: [
      {
        id: params.itemId,
        price: params.grossAmount,
        quantity: 1,
        name: params.itemName.slice(0, 50), // Midtrans max 50 char
      },
    ],
  };

  // Set enabled_payments hanya jika bukan "all"
  const enabledPayments = PAYMENT_MAP[params.paymentGroup];
  if (enabledPayments.length > 0) {
    body.enabled_payments = enabledPayments;
  }

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Midtrans Snap error ${res.status}: ${errBody}`);
  }

  const data = (await res.json()) as { token: string };
  return data.token;
}

/**
 * Verifikasi notifikasi dari Midtrans menggunakan signature hash.
 * SHA512(order_id + status_code + gross_amount + server_key)
 */
export async function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  incomingHash: string
): Promise<boolean> {
  const serverKey = env.MIDTRANS_SERVER_KEY;
  const raw = `${orderId}${statusCode}${grossAmount}${serverKey}`;

  // Use Web Crypto API (available in Next.js Edge & Node 18+)
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const computed = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return computed === incomingHash;
}

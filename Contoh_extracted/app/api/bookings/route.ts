// app/api/bookings/route.ts — Admin API untuk manage booking
// Akses dilindungi oleh header Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { env } from "@/lib/env";

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  return token === env.SUPABASE_SERVICE_ROLE_KEY;
}


/**
 * GET /api/bookings
 * Query params: ?status=pending|confirmed|completed|cancelled&date=YYYY-MM-DD
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const date = searchParams.get("date");

  let query = supabaseAdmin
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (date) query = query.eq("session_date", date);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data, count: data?.length ?? 0 });
}

/**
 * PATCH /api/bookings
 * Body: { invoice_no: string, status: "pending"|"confirmed"|"completed"|"cancelled" }
 */
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { invoice_no?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { invoice_no, status } = body;

  if (!invoice_no || !status) {
    return NextResponse.json({ error: "invoice_no dan status wajib diisi" }, { status: 400 });
  }

  const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json(
      { error: `Status tidak valid. Pilih salah satu: ${validStatuses.join(", ")}` },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabaseAdmin.from("bookings") as any)
    .update({ status })
    .eq("invoice_no", invoice_no)
    .select("invoice_no, status, customer_name")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, booking: data });
}

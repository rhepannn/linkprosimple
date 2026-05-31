// lib/supabase/types.ts — TypeScript types sesuai schema Supabase

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PaymentMethodDB = "qris" | "transfer";

export interface BookingRow {
  id: string;
  invoice_no: string;
  package_id: string;
  package_name: string;
  customer_name: string;
  customer_phone: string;
  session_date: string;       // ISO date string: "2026-05-10"
  session_time: string;       // "09:00"
  notes: string | null;
  referral_code: string | null;
  discount_pct: number;
  original_price: number;
  final_price: number;
  payment_method: PaymentMethodDB;
  status: BookingStatus;
  created_at: string;
}

export type BookingInsert = Omit<BookingRow, "id" | "created_at">;

export interface ReferralCodeRow {
  id: string;
  code: string;
  discount_pct: number;
  owner_name: string;
  is_active: boolean;
  usage_count: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: BookingRow;
        Insert: BookingInsert;
        Update: Partial<BookingInsert>;
      };
      referral_codes: {
        Row: ReferralCodeRow;
        Insert: Omit<ReferralCodeRow, "id" | "created_at">;
        Update: Partial<Omit<ReferralCodeRow, "id" | "created_at">>;
      };
    };
  };
}

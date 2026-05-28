// lib/supabase/admin.ts — Supabase Admin client (service role)
// ⚠️  HANYA boleh diimport di Server Components, API routes, atau Server Actions.
// JANGAN pernah import file ini di komponen "use client" atau file yang diakses browser.

import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "./types";

/**
 * Supabase client dengan service role key.
 * Bypass Row Level Security — gunakan hanya untuk operasi admin.
 */
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

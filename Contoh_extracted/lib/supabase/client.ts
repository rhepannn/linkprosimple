// lib/supabase/client.ts — Browser-side Supabase client
// Gunakan di komponen "use client" saja

import { createBrowserClient } from "@supabase/ssr";
import { env } from "@/lib/env";

export function createClient() {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    console.warn("⚠️ [Supabase Client] NEXT_PUBLIC_SUPABASE_URL is missing or invalid. Falling back to placeholder.");
    url = "https://placeholder.supabase.co";
  }
  return createBrowserClient(
    url,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );
}


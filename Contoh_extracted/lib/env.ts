import { z } from "zod";

const isServer = typeof window === "undefined";

const envSchema = z.object({
  // Database (Server Only)
  DATABASE_URL: isServer ? z.string().url().or(z.literal("")) : z.string().optional(),

  // Auth (Server Only)
  AUTH_SECRET: isServer ? z.string().min(1) : z.string().optional(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: isServer ? z.string().min(1) : z.string().optional(),

  // Midtrans
  NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: z.string().min(1),
  MIDTRANS_SERVER_KEY: isServer ? z.string().min(1) : z.string().optional(),
  NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION: z.preprocess(
    (val) => val === "true" || val === true,
    z.boolean()
  ),

  // WhatsApp
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().min(10),

  // Node Environment
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
}).refine((data) => {
  if (data.DATABASE_URL && data.DATABASE_URL.includes("[PASSWORD]")) {
    return false;
  }
  return true;
}, {
  message: "DATABASE_URL masih berisi placeholder '[PASSWORD]'. Silakan ganti dengan password database Anda.",
  path: ["DATABASE_URL"],
});

// Validation
const parsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
  NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION: process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NODE_ENV: process.env.NODE_ENV,
});

if (!parsed.success) {
  const errors = parsed.error.flatten().fieldErrors;
  console.error("❌ Invalid environment variables:", errors);
  if (Object.keys(errors).length === 0) {
    console.error("Full Zod Error:", parsed.error.format());
  }
  if (isServer && process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment variables: " + JSON.stringify(errors));
  }
}

export const env = (parsed.success ? parsed.data : { ...process.env }) as any;
// In a real project, you'd want better types for client/server separation

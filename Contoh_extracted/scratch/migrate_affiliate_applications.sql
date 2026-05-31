-- ============================================================
-- JALANKAN QUERY INI DI SUPABASE SQL EDITOR
-- https://supabase.com/dashboard → Project → SQL Editor
-- ============================================================

-- 1. Buat tabel affiliate_applications
CREATE TABLE IF NOT EXISTS "affiliate_applications" (
    "id"           TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name"         TEXT NOT NULL,
    "email"        TEXT NOT NULL,
    "phone"        TEXT NOT NULL,
    "password"     TEXT NOT NULL DEFAULT '',
    "instagram"    TEXT,
    "tiktok"       TEXT,
    "occupation"   TEXT,
    "city"         TEXT,
    "motivation"   TEXT,
    "experience"   TEXT,
    "status"       TEXT NOT NULL DEFAULT 'pending',
    "notes"        TEXT,
    "created_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "affiliate_applications_pkey" PRIMARY KEY ("id")
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_affiliate_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_affiliate_applications_updated_at ON "affiliate_applications";
CREATE TRIGGER set_affiliate_applications_updated_at
    BEFORE UPDATE ON "affiliate_applications"
    FOR EACH ROW
    EXECUTE FUNCTION update_affiliate_applications_updated_at();

-- 2. Ubah semua user CASHIER menjadi ADMIN (Role cleanup)
UPDATE "users" SET "role" = 'ADMIN' WHERE "role"::text = 'CASHIER';

-- 3. Tambah kolom target_product_id ke tabel referral_codes
ALTER TABLE "referral_codes" ADD COLUMN IF NOT EXISTS "target_product_id" TEXT;

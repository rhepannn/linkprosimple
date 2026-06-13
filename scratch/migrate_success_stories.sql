-- Migration: add success_stories table
-- Run this manually on Supabase SQL Editor

CREATE TABLE IF NOT EXISTS success_stories (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id   TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  role         TEXT,
  photo_url    TEXT,
  achievement  TEXT,
  story        TEXT NOT NULL DEFAULT '',
  before_label TEXT,
  after_label  TEXT,
  linkedin_url TEXT,
  linkedin_screenshot TEXT,
  sort_order   INT NOT NULL DEFAULT 0,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_success_stories_product ON success_stories(product_id, is_active, sort_order);

-- Jika tabel SUDAH ADA, jalankan ini aja:
-- ALTER TABLE success_stories ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
-- ALTER TABLE success_stories ADD COLUMN IF NOT EXISTS linkedin_screenshot TEXT;

-- Migration: add testimonials table
-- Run this manually on Supabase SQL Editor

CREATE TABLE IF NOT EXISTS testimonials (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name         TEXT NOT NULL,
  role         TEXT,
  photo_url    TEXT,
  program_name TEXT,
  rating       INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text         TEXT NOT NULL DEFAULT '',
  date         TEXT,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  sort_order   INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for active testimonials sorted by order
CREATE INDEX IF NOT EXISTS idx_testimonials_active_sort ON testimonials(is_active, sort_order, created_at DESC);

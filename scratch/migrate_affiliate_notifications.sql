-- Migration: add affiliate_notifications table
-- Run this manually on Supabase SQL Editor

CREATE TABLE IF NOT EXISTS affiliate_notifications (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  snapper_id  TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('new_referral', 'commission_paid', 'payout_processed')),
  title       TEXT NOT NULL,
  message     TEXT NOT NULL DEFAULT '',
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast queries by snapper
CREATE INDEX IF NOT EXISTS idx_affiliate_notifications_snapper_id ON affiliate_notifications(snapper_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_notifications_unread ON affiliate_notifications(snapper_id, is_read) WHERE is_read = false;

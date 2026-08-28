-- ============================================================
-- 008_remove_owner_unique.sql
-- Allow multiple stores per user by dropping the UNIQUE
-- constraint on stores.owner_id. Keep slug UNIQUE.
-- ============================================================

ALTER TABLE public.stores DROP CONSTRAINT IF EXISTS stores_owner_id_key;

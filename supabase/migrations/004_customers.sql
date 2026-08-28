-- ============================================================
-- 004_customers.sql
-- Customers table. Each customer belongs to a store.
-- UNIQUE(store_id, email) prevents duplicate emails per store.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text,
  city text,
  postal_code text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(store_id, email)
);

CREATE INDEX IF NOT EXISTS idx_customers_store_id ON public.customers(store_id);

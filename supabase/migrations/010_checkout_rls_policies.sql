-- ============================================================
-- 010_checkout_rls_policies.sql
-- Allow public (anon) users to place orders on active stores.
-- Customers, orders, and order_items can be inserted by anon
-- only when the parent store is active. No read/update/delete
-- access is granted to anon.
-- ============================================================

-- Customers: anon can insert for active stores
CREATE POLICY customers_insert_public ON public.customers
  FOR INSERT TO anon
  WITH CHECK (
    store_id IN (SELECT id FROM public.stores WHERE active = true)
  );

-- Orders: anon can insert for active stores
CREATE POLICY orders_insert_public ON public.orders
  FOR INSERT TO anon
  WITH CHECK (
    store_id IN (SELECT id FROM public.stores WHERE active = true)
  );

-- Order items: anon can insert for orders in active stores
CREATE POLICY order_items_insert_public ON public.order_items
  FOR INSERT TO anon
  WITH CHECK (
    order_id IN (
      SELECT id FROM public.orders
      WHERE store_id IN (SELECT id FROM public.stores WHERE active = true)
    )
  );

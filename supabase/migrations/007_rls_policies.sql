-- ============================================================
-- 007_rls_policies.sql
-- Row Level Security policies for all application tables.
-- ============================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PROFILES
-- ============================================================

CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT TO authenticated
  USING (auth_id = auth.uid());

CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth_id = auth.uid());

-- ============================================================
-- STORES
-- ============================================================

-- Public can view active stores
CREATE POLICY stores_select_public ON public.stores
  FOR SELECT TO anon
  USING (active = true);

-- Owner can view their own store
CREATE POLICY stores_select_owner ON public.stores
  FOR SELECT TO authenticated
  USING (owner_id = auth.uid());

-- Owner can insert their own store
CREATE POLICY stores_insert_owner ON public.stores
  FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid());

-- Owner can update their own store
CREATE POLICY stores_update_owner ON public.stores
  FOR UPDATE TO authenticated
  USING (owner_id = auth.uid());

-- Owner can delete their own store
CREATE POLICY stores_delete_owner ON public.stores
  FOR DELETE TO authenticated
  USING (owner_id = auth.uid());

-- ============================================================
-- PRODUCTS
-- ============================================================

-- Public can view active products in active stores
CREATE POLICY products_select_public ON public.products
  FOR SELECT TO anon
  USING (
    active = true
    AND store_id IN (SELECT id FROM public.stores WHERE active = true)
  );

-- Owner can view products in their stores
CREATE POLICY products_select_owner ON public.products
  FOR SELECT TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can insert products into their stores
CREATE POLICY products_insert_owner ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can update products in their stores
CREATE POLICY products_update_owner ON public.products
  FOR UPDATE TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can delete products in their stores
CREATE POLICY products_delete_owner ON public.products
  FOR DELETE TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- ============================================================
-- CUSTOMERS
-- ============================================================

-- Owner can view customers in their stores
CREATE POLICY customers_select_owner ON public.customers
  FOR SELECT TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can insert customers into their stores
CREATE POLICY customers_insert_owner ON public.customers
  FOR INSERT TO authenticated
  WITH CHECK (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can update customers in their stores
CREATE POLICY customers_update_owner ON public.customers
  FOR UPDATE TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can delete customers in their stores
CREATE POLICY customers_delete_owner ON public.customers
  FOR DELETE TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- ============================================================
-- ORDERS
-- ============================================================

-- Owner can view orders in their stores
CREATE POLICY orders_select_owner ON public.orders
  FOR SELECT TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can insert orders into their stores
CREATE POLICY orders_insert_owner ON public.orders
  FOR INSERT TO authenticated
  WITH CHECK (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can update orders in their stores
CREATE POLICY orders_update_owner ON public.orders
  FOR UPDATE TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- Owner can delete orders in their stores
CREATE POLICY orders_delete_owner ON public.orders
  FOR DELETE TO authenticated
  USING (
    store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
  );

-- ============================================================
-- ORDER_ITEMS
-- ============================================================

-- Owner can view order items belonging to orders in their stores
CREATE POLICY order_items_select_owner ON public.order_items
  FOR SELECT TO authenticated
  USING (
    order_id IN (
      SELECT id FROM public.orders
      WHERE store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
    )
  );

-- Owner can insert order items into orders in their stores
CREATE POLICY order_items_insert_owner ON public.order_items
  FOR INSERT TO authenticated
  WITH CHECK (
    order_id IN (
      SELECT id FROM public.orders
      WHERE store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
    )
  );

-- Owner can update order items in orders in their stores
CREATE POLICY order_items_update_owner ON public.order_items
  FOR UPDATE TO authenticated
  USING (
    order_id IN (
      SELECT id FROM public.orders
      WHERE store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
    )
  );

-- Owner can delete order items in orders in their stores
CREATE POLICY order_items_delete_owner ON public.order_items
  FOR DELETE TO authenticated
  USING (
    order_id IN (
      SELECT id FROM public.orders
      WHERE store_id IN (SELECT id FROM public.stores WHERE owner_id = auth.uid())
    )
  );

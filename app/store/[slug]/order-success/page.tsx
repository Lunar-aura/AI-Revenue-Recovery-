"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { OrderSuccess } from "@/components/store/order-success";
import { getOrdersForStore, getStoreBySlug } from "@/lib/store-data";
import { createClient } from "@/lib/supabase";
import type { Order, Store } from "@/lib/store-data";

export default function OrderSuccessPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setMounted(true);
    const foundStore = getStoreBySlug(params.slug);
    setStore(foundStore ?? null);
    const orderId = searchParams.get("order");

    if (!orderId) {
      setOrder(null);
      return;
    }

    const localOrder = getOrdersForStore(foundStore?.id ?? "").find((o) => o.id === orderId);
    if (localOrder) {
      setOrder(localOrder);
      return;
    }

    const supabase = createClient();
    (async () => {
      try {
        const { data } = await supabase
          .from("orders")
          .select("*, customers(*), order_items(*)")
          .eq("id", orderId)
          .maybeSingle();

        if (!data || !foundStore) {
          setOrder(null);
          return;
        }

        const supabaseOrder: Order = {
          id: data.id,
          storeId: data.store_id,
          customer: {
            name: data.customers?.name ?? "Customer",
            email: data.customers?.email ?? "",
            phone: data.customers?.phone ?? "",
            address: data.customers?.address ?? "",
            city: data.customers?.city ?? "",
            postalCode: data.customers?.postal_code ?? "",
          },
          items: (data.order_items ?? []).map((item: Record<string, unknown>) => ({
            product: {
              id: item.product_id as string,
              storeId: "",
              name: "",
              description: "",
              price: String(item.unit_price ?? 0),
              image: "",
              stock: item.quantity as number,
              active: true,
            },
            quantity: item.quantity as number,
          })),
          subtotal: Number(data.subtotal ?? 0),
          shipping: Number(data.shipping ?? 0),
          total: Number(data.total ?? 0),
          status: data.status,
          createdAt: data.created_at,
        };

        setOrder(supabaseOrder);
      } catch (err) {
        console.error("Failed to fetch order from Supabase:", err);
        setOrder(null);
      }
    })();
  }, [params.slug, searchParams]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading order...</p>
      </div>
    );
  }

  if (!store || !order) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-950">Order not found</p>
          <p className="mt-1 text-sm text-slate-500">
            We could not find the order you are looking for.
          </p>
        </div>
      </div>
    );
  }

  return <OrderSuccess store={store} order={order} />;
}
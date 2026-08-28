"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckoutForm } from "@/components/store/checkout-form";
import { OrderSummary } from "@/components/store/order-summary";
import { useCart } from "@/lib/cart-context";
import { getStoreBySlug } from "@/lib/store-data";
import type { Store } from "@/lib/store-data";

export default function CheckoutPage() {
  const params = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const { items, subtotal } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    setMounted(true);
    setStore(getStoreBySlug(params.slug) ?? null);
  }, [params.slug]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading checkout...</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-950">Store not found</p>
          <p className="mt-1 text-sm text-slate-500">
            The store you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">
          {store.name}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Checkout
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[24px] border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-950">Your cart is empty</p>
          <p className="mt-1 text-sm text-slate-500">
            Add some products before checking out.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
            <CheckoutForm store={store} />
          </div>
          <div className="h-fit">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      )}
    </div>
  );
}
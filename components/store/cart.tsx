"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { CartItem } from "@/components/store/cart-item";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/store-data";
import type { Store } from "@/lib/store-data";

type CartProps = {
  store: Store;
};

export function Cart({ store }: CartProps) {
  const { items, subtotal } = useCart();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">
          {store.name}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Shopping Cart
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center gap-4 rounded-[24px] border border-slate-200 bg-white p-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <ShoppingBag className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-950">Your cart is empty</p>
            <p className="mt-1 text-sm text-slate-500">
              Add some products to get started.
            </p>
          </div>
          <Link
            href={`/store/${store.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] transition hover:bg-violet-700"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
            <Link
              href={`/store/${store.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          <div className="h-fit rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Order Summary
            </h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-950">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-semibold text-slate-950">
                  {formatPrice(shipping)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-950">Total</span>
                  <span className="text-lg font-semibold text-slate-950">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href={`/store/${store.slug}/checkout`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] transition hover:bg-violet-700"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
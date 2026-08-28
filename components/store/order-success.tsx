"use client";

import Link from "next/link";
import { CheckCircle2, Package } from "lucide-react";
import { formatPrice } from "@/lib/store-data";
import type { Order, Store } from "@/lib/store-data";

type OrderSuccessProps = {
  store: Store;
  order: Order;
};

export function OrderSuccess({ store, order }: OrderSuccessProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Order Successful
          </h1>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Thank you for your order, {order.customer.name}!
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Order ID
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Status
            </p>
            <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
              {order.status}
            </span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {order.items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between gap-4 text-sm">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-slate-100">
                  <Package className="h-5 w-5 text-slate-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">{item.product.name}</p>
                  <p className="text-xs text-slate-500">Qty {item.quantity}</p>
                </div>
              </div>
              <p className="shrink-0 font-semibold text-slate-950">
                {formatPrice(Number(item.product.price) * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-950">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Shipping</span>
            <span className="font-semibold text-slate-950">{formatPrice(order.shipping)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="font-semibold text-slate-950">Total</span>
            <span className="text-lg font-semibold text-slate-950">{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={`/store/${store.slug}`}
          className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] transition hover:bg-violet-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
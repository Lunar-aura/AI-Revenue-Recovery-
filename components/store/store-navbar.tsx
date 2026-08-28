"use client";

import Link from "next/link";
import { ShoppingCart, Store as StoreIcon } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Store } from "@/lib/store-data";

type StoreNavbarProps = {
  store: Store;
};

export function StoreNavbar({ store }: StoreNavbarProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={`/store/${store.slug}`} className="flex items-center gap-3">
          {store.logo ? (
            <img
              src={store.logo}
              alt={store.name}
              className="h-9 w-9 rounded-[12px] object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-violet-600 text-white">
              <StoreIcon className="h-5 w-5" />
            </div>
          )}
          <span className="text-lg font-semibold tracking-tight text-slate-950">
            {store.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={`/store/${store.slug}`}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Home
          </Link>
          <Link
            href={`/store/${store.slug}#products`}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Products
          </Link>
        </nav>

        <Link
          href={`/store/${store.slug}/cart`}
          className="relative inline-flex items-center justify-center rounded-[14px] border border-slate-200 bg-white p-2.5 text-slate-700 transition hover:bg-slate-50"
          aria-label="Cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-semibold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
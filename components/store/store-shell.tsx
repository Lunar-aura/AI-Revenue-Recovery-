"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CartProvider } from "@/lib/cart-context";
import { getStoreBySlug } from "@/lib/store-data";
import { StoreNavbar } from "@/components/store/store-navbar";
import { StoreFooter } from "@/components/store/store-footer";

export function StoreShell({ children }: { children: React.ReactNode }) {
  const params = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [store, setStore] = useState<ReturnType<typeof getStoreBySlug>>(undefined);

  useEffect(() => {
    setMounted(true);
    setStore(getStoreBySlug(params.slug));
  }, [params.slug]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-sm text-slate-500">Loading store...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
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
    <CartProvider storeId={store.id}>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <StoreNavbar store={store} />
        <main className="flex-1">{children}</main>
        <StoreFooter store={store} />
      </div>
    </CartProvider>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Cart } from "@/components/store/cart";
import { getStoreBySlug } from "@/lib/store-data";
import type { Store } from "@/lib/store-data";

export default function CartPage() {
  const params = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    setMounted(true);
    setStore(getStoreBySlug(params.slug) ?? null);
  }, [params.slug]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading cart...</p>
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

  return <Cart store={store} />;
}
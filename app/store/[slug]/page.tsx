"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StoreHero } from "@/components/store/store-hero";
import { ProductGrid } from "@/components/store/product-grid";
import { getProductsForStore, getStoreBySlug } from "@/lib/store-data";
import type { Store, StoreProduct } from "@/lib/store-data";

export default function StorePage() {
  const params = useParams<{ slug: string }>();
  const [mounted, setMounted] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);

  useEffect(() => {
    setMounted(true);
    const found = getStoreBySlug(params.slug);
    setStore(found ?? null);
    if (found) {
      setProducts(getProductsForStore(found.id));
    }
  }, [params.slug]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading store...</p>
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
    <>
      <StoreHero store={store} />
      <ProductGrid products={products} storeSlug={store.slug} />
    </>
  );
}
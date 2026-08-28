"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductDetails } from "@/components/store/product-details";
import { getProductById, getStoreBySlug } from "@/lib/store-data";
import type { Store, StoreProduct } from "@/lib/store-data";

export default function ProductPage() {
  const params = useParams<{ slug: string; id: string }>();
  const [mounted, setMounted] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [product, setProduct] = useState<StoreProduct | null>(null);

  useEffect(() => {
    setMounted(true);
    const foundStore = getStoreBySlug(params.slug);
    const foundProduct = getProductById(params.id);
    setStore(foundStore ?? null);
    setProduct(
      foundProduct && foundProduct.storeId === foundStore?.id
        ? foundProduct
        : null,
    );
  }, [params.slug, params.id]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">Loading product...</p>
      </div>
    );
  }

  if (!store || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-950">Product not found</p>
          <p className="mt-1 text-sm text-slate-500">
            The product you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetails store={store} product={product} />;
}
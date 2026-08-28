"use client";

import Link from "next/link";
import { Check, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/store-data";
import type { StoreProduct } from "@/lib/store-data";

type ProductCardProps = {
  product: StoreProduct;
  storeSlug: string;
};

export function ProductCard({ product, storeSlug }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/store/${storeSlug}/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.3)]"
    >
      <div className="relative flex h-52 items-center justify-center bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Package className="h-12 w-12 text-slate-300" />
        )}
        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-slate-950">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-slate-950">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-slate-500">
              {outOfStock ? "Unavailable" : `${product.stock} in stock`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`inline-flex items-center justify-center gap-2 rounded-[14px] px-3.5 py-2.5 text-sm font-medium transition ${
              added
                ? "bg-emerald-600 text-white"
                : outOfStock
                  ? "cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
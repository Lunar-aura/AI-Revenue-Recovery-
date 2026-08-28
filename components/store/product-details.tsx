"use client";

import Link from "next/link";
import { ArrowLeft, Check, Minus, Package, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/store-data";
import type { Store, StoreProduct } from "@/lib/store-data";

type ProductDetailsProps = {
  store: Store;
  product: StoreProduct;
};

export function ProductDetails({ store, product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  function handleAddToCart() {
    if (outOfStock) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={`/store/${store.slug}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to store
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="flex h-96 items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Package className="h-24 w-24 text-slate-300" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">
              {store.name}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-3xl font-semibold tracking-tight text-slate-950">
              {formatPrice(product.price)}
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                outOfStock
                  ? "bg-rose-50 text-rose-700"
                  : product.stock <= 10
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {outOfStock ? "Out of stock" : `${product.stock} in stock`}
            </span>
          </div>

          {!outOfStock && (
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-[14px] border border-slate-200 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-slate-600 transition hover:text-slate-950"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-slate-950">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-3 text-slate-600 transition hover:text-slate-950"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`inline-flex items-center justify-center gap-2 rounded-[14px] px-6 py-3 text-sm font-medium text-white transition ${
                  added
                    ? "bg-emerald-600"
                    : "bg-violet-600 shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] hover:bg-violet-700"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          )}

          {added && (
            <div className="rounded-[14px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <p className="font-medium">Added to cart!</p>
              <p className="mt-1">
                <Link
                  href={`/store/${store.slug}/cart`}
                  className="font-semibold text-emerald-700 underline underline-offset-2"
                >
                  View cart
                </Link>{" "}
                or continue shopping.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { Minus, Package, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/store-data";
import type { CartItem as CartItemType } from "@/lib/store-data";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 rounded-[20px] border border-slate-200 bg-white p-4">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-slate-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <Package className="h-8 w-8 text-slate-300" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-950">{product.name}</p>
        <p className="mt-0.5 text-sm text-slate-500">
          {formatPrice(product.price)} each
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center rounded-[12px] border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="p-2 text-slate-600 transition hover:text-slate-950"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-slate-950">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="p-2 text-slate-600 transition hover:text-slate-950"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-rose-600 transition hover:text-rose-700"
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-slate-950">
          {formatPrice(Number(product.price) * quantity)}
        </p>
      </div>
    </div>
  );
}
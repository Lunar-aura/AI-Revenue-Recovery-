"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, StoreProduct } from "@/lib/store-data";

type CartContextValue = {
  items: CartItem[];
  addItem: (product: StoreProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY_PREFIX = "app_cart_";

function cartKey(storeId: string) {
  return `${CART_KEY_PREFIX}${storeId}`;
}

function readCart(storeId: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(cartKey(storeId));
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({
  children,
  storeId,
}: {
  children: React.ReactNode;
  storeId: string;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart(storeId));
  }, [storeId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(cartKey(storeId), JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, storeId]);

  function addItem(product: StoreProduct, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
            : i,
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.product.stock)) }
          : i,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, i) => sum + Number(i.product.price) * i.quantity,
        0,
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [items, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
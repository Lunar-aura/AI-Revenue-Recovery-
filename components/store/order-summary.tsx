import { formatPrice } from "@/lib/store-data";
import type { CartItem } from "@/lib/store-data";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

export function OrderSummary({ items, subtotal, shipping, total }: OrderSummaryProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between gap-4 text-sm">
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-900">{item.product.name}</p>
              <p className="text-xs text-slate-500">
                Qty {item.quantity} × {formatPrice(item.product.price)}
              </p>
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
          <span className="font-semibold text-slate-950">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Shipping</span>
          <span className="font-semibold text-slate-950">{formatPrice(shipping)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3">
          <span className="font-semibold text-slate-950">Total</span>
          <span className="text-lg font-semibold text-slate-950">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
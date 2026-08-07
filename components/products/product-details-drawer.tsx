import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, X, ShoppingCart, MapPin, BarChart3, FileText, DollarSign } from "lucide-react";
import type { ProductDetail } from "@/lib/products-data";

type ProductDetailsDrawerProps = {
  open: boolean;
  product: ProductDetail | null;
  onClose: () => void;
};

export function ProductDetailsDrawer({ open, product, onClose }: ProductDetailsDrawerProps) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 p-4" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-[14px] ${product.imageColor}`}>
              <Package className="h-7 w-7 text-slate-600/40" />
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-violet-600">Product details</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">{product.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{product.category}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="violet">{product.conversion} conversion</Badge>
          <Badge tone="amber">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-current" />
              {product.rating} ★ ({product.reviews} reviews)
            </span>
          </Badge>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-600">{product.description}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <DollarSign className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Price</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{product.price ?? "$149.99"}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <ShoppingCart className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Units sold</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{product.unitsSold}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <BarChart3 className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Revenue</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{product.revenue}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <MapPin className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-semibold text-slate-900">Inventory</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {product.inventory.inStock} in stock · {product.inventory.reserved} reserved
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900">Favorite among customers</p>
          </div>
          <div className="mt-4 space-y-2.5">
            {product.favoriteProducts.map((item) => (
              <div key={item} className="flex items-center justify-between rounded-[14px] bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                <span>{item}</span>
                <Badge tone="neutral">paired often</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900">Sales history</p>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {product.timeline.map((step) => (
              <div key={step.event + step.time} className="flex justify-between">
                <div>
                  <span className="text-slate-600">{step.event}</span>
                  {step.amount ? <span className="ml-2 text-slate-500">({step.amount})</span> : null}
                </div>
                <span className="font-medium text-slate-900">{step.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[18px] border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-semibold text-slate-900">Product notes</p>
          </div>
          <div className="mt-4 space-y-3">
            {product.notes.map((note) => (
              <div key={note.time} className="rounded-[14px] bg-slate-50 px-3 py-2.5">
                <p className="text-sm text-slate-600">{note.text}</p>
                <p className="mt-1 text-xs text-slate-500">— {note.author}, {note.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
          <Button variant="primary">Promote product</Button>
          <Button variant="secondary">Discount price</Button>
          <Button variant="secondary">Add to campaign</Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles } from "lucide-react";
import type { BestSeller } from "@/lib/products-data";

export function BestSellerCard({ product, onView }: { product: BestSeller; onView?: () => void }) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_35px_-20px_rgba(15,23,42,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.26)]">
      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-[14px] ${product.color}`}>
          <Star className="h-7 w-7 text-slate-600/40" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-slate-900">{product.name}</p>
            <Badge tone="amber">
              <Sparkles className="h-3 w-3" />
              {product.trend}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-slate-500">{product.category} · {product.rating} ★ ({product.reviews})</p>
          <p className="mt-3 font-semibold text-slate-900">{product.revenue}</p>
          <p className="mt-1 text-sm text-slate-500">{product.units} units sold</p>
        </div>
      </div>
      <div className="mt-5">
        <Button variant="ghost" size="sm" className="w-full" onClick={onView}>
          Quick view
        </Button>
      </div>
    </div>
  );
}

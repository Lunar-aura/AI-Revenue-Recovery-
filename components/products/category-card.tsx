import { TrendingUp } from "lucide-react";

type CategoryCardProps = {
  label: string;
  productCount: string;
  revenue: string;
  growth: string;
  conversion: string;
  tone: "violet" | "sky" | "emerald" | "amber" | "rose" | "slate";
};

const tones: Record<CategoryCardProps["tone"], string> = {
  violet: "bg-violet-50 text-violet-700",
  sky: "bg-sky-50 text-sky-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  rose: "bg-rose-50 text-rose-700",
  slate: "bg-slate-100 text-slate-700",
};

export function CategoryCard({ label, productCount, revenue, growth, conversion, tone }: CategoryCardProps) {
  return (
    <div className="group rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{productCount}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500">Revenue</p>
          <p className="mt-1 font-semibold text-slate-900">{revenue}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Conversion</p>
          <p className="mt-1 font-semibold text-slate-900">{conversion}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-700">
        <TrendingUp className="h-3.5 w-3.5" />
        {growth}
      </div>
    </div>
  );
}

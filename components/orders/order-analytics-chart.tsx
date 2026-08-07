type OrderAnalyticsChartProps = {
  range: "Daily" | "Weekly" | "Monthly";
};

const ranges: OrderAnalyticsChartProps["range"][] = ["Daily", "Weekly", "Monthly"];

export function OrderAnalyticsChart({ range }: OrderAnalyticsChartProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Order analytics</h2>
          <p className="mt-1 text-sm text-slate-500">How order volume is changing over time.</p>
        </div>
        <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {ranges.map((item) => (
            <button key={item} className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${range === item ? "bg-violet-600 text-white" : "text-slate-600 hover:text-slate-900"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-slate-200 bg-slate-50/70 p-4">
        <svg viewBox="0 0 420 220" className="h-64 w-full">
          <path d="M15 160 C70 138, 90 105, 135 98 S210 125, 250 92 S315 60, 360 78 S405 90, 405 72" fill="none" stroke="#7C5CFC" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M15 190 C70 166, 95 140, 140 130 S220 150, 260 121 S328 98, 405 100" fill="none" stroke="#74B9FF" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

type CustomerAnalyticsChartProps = {
  range: "Daily" | "Weekly" | "Monthly";
};

const ranges: CustomerAnalyticsChartProps["range"][] = ["Daily", "Weekly", "Monthly"];

export function CustomerAnalyticsChart({ range }: CustomerAnalyticsChartProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Customer analytics</h2>
          <p className="mt-1 text-sm text-slate-500">New vs returning growth and retention over time.</p>
        </div>
        <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {ranges.map((item) => (
            <button
              key={item}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                range === item ? "bg-violet-600 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-slate-200 bg-slate-50/70 p-4">
        <svg viewBox="0 0 420 220" className="h-64 w-full">
          <path d="M15 170 C70 148, 90 115, 135 108 S210 135, 250 102 S315 70, 360 88 S405 100, 405 82" fill="none" stroke="#7C5CFC" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M15 200 C70 176, 95 150, 140 140 S220 160, 260 131 S328 108, 405 110" fill="none" stroke="#74B9FF" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

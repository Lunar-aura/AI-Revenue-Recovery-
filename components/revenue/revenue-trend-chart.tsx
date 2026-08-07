type RevenueTrendChartProps = {
  activeRange: "Daily" | "Weekly" | "Monthly" | "Yearly";
};

const ranges: RevenueTrendChartProps["activeRange"][] = ["Daily", "Weekly", "Monthly", "Yearly"];

export function RevenueTrendChart({ activeRange }: RevenueTrendChartProps) {
  const points = [24, 34, 31, 46, 41, 58, 66];

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">Revenue trend</h2>
          <p className="mt-1 text-sm text-slate-500">Performance across your selected time horizon.</p>
        </div>
        <div className="flex rounded-full border border-slate-200 bg-slate-50 p-1">
          {ranges.map((range) => (
            <button
              key={range}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${activeRange === range ? "bg-violet-600 text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[20px] border border-slate-200 bg-slate-50/70 p-4">
        <div className="flex items-end justify-between gap-2 border-b border-slate-200 pb-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          {activeRange === "Daily" ? <span>Mon</span> : null}
          {activeRange === "Daily" ? <span>Tue</span> : null}
          {activeRange === "Daily" ? <span>Wed</span> : null}
          {activeRange === "Daily" ? <span>Thu</span> : null}
          {activeRange === "Daily" ? <span>Fri</span> : null}
          {activeRange === "Daily" ? <span>Sat</span> : null}
          {activeRange === "Daily" ? <span>Sun</span> : null}
          {activeRange !== "Daily" ? <span>Jan</span> : null}
          {activeRange !== "Daily" ? <span>Feb</span> : null}
          {activeRange !== "Daily" ? <span>Mar</span> : null}
          {activeRange !== "Daily" ? <span>Apr</span> : null}
          {activeRange !== "Daily" ? <span>May</span> : null}
          {activeRange !== "Daily" ? <span>Jun</span> : null}
          {activeRange !== "Daily" ? <span>Jul</span> : null}
        </div>
        <div className="relative mt-6 h-64">
          <svg viewBox="0 0 400 220" className="h-full w-full">
            <path d="M10 170 C50 150, 70 120, 100 120 S160 150, 190 110 S250 70, 280 70 S340 90, 390 44" fill="none" stroke="#7C5CFC" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M10 190 C50 180, 70 160, 100 155 S150 170, 190 135 S260 110, 290 115 S360 140, 390 110" fill="none" stroke="#74B9FF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-end gap-2 px-2 pb-2">
            {points.map((value, index) => (
              <div key={index} className="flex-1 rounded-t-[999px] bg-gradient-to-t from-violet-500 to-sky-400" style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

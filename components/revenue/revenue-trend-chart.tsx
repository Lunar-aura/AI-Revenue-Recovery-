type RevenueTrendChartProps = {
  activeRange: "Daily" | "Weekly" | "Monthly" | "Yearly";
  points?: number[];
};

const ranges: RevenueTrendChartProps["activeRange"][] = ["Daily", "Weekly", "Monthly", "Yearly"];

export function RevenueTrendChart({ activeRange, points = [24, 34, 31, 46, 41, 58, 66] }: RevenueTrendChartProps) {
  const max = Math.max(...points, 1);
  const barHeights = points.map((value) => Math.max(4, (value / max) * 100));

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
            <path d={`M10 ${170 - (barHeights[0] / 100) * 140} C50 ${170 - (barHeights[1] / 100) * 140}, 70 ${170 - (barHeights[2] / 100) * 140}, 100 ${170 - (barHeights[2] / 100) * 140} S160 ${170 - (barHeights[4] / 100) * 140}, 190 ${170 - (barHeights[4] / 100) * 140} S250 ${170 - (barHeights[6] / 100) * 70}, 280 ${170 - (barHeights[6] / 100) * 70} S340 ${170 - (barHeights[6] / 100) * 90}, 390 ${170 - (barHeights[6] / 100) * 44}`} fill="none" stroke="#7C5CFC" strokeWidth="3.5" strokeLinecap="round" />
            <path d={`M10 ${190 - (barHeights[0] / 100) * 140} C50 ${190 - (barHeights[1] / 100) * 140}, 70 ${190 - (barHeights[2] / 100) * 140}, 100 ${190 - (barHeights[2] / 100) * 140} S150 ${190 - (barHeights[4] / 100) * 170}, 190 ${190 - (barHeights[4] / 100) * 135} S260 ${190 - (barHeights[6] / 100) * 110}, 290 ${190 - (barHeights[6] / 100) * 115} S360 ${190 - (barHeights[6] / 100) * 140}, 390 ${190 - (barHeights[6] / 100) * 110}`} fill="none" stroke="#74B9FF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-end gap-2 px-2 pb-2">
            {barHeights.map((height, index) => (
              <div key={index} className="flex-1 rounded-t-[999px] bg-gradient-to-t from-violet-500 to-sky-400" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

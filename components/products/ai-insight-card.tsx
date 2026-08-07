import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { AIInsight } from "@/lib/products-data";

export function ProductAIInsightCard({ title, description, impact, actions }: AIInsight) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-violet-100 bg-gradient-to-br from-violet-600 via-violet-500 to-sky-500 p-6 text-white shadow-[0_20px_45px_-22px_rgba(124,92,252,0.6)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-violet-100">AI product insights</p>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        </div>
        <div className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-violet-50">Live signal</div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="max-w-2xl text-sm leading-7 text-violet-50">{description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Investigate
            </Button>
            <Button variant="secondary" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              Generate action plan
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="rounded-[18px] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
          <p className="text-sm text-violet-100">Potential revenue opportunity</p>
          <p className="mt-2 text-2xl font-semibold text-white">{impact}</p>
          <ul className="mt-4 space-y-2 text-sm text-violet-50">
            {actions.map((action) => (
              <li key={action} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

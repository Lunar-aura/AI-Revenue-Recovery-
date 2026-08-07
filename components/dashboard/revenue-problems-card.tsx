import { ArrowUpRight } from "lucide-react";
import type { RevenueProblem } from "@/lib/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

type RevenueProblemsCardProps = {
  problems: RevenueProblem[];
};

export function RevenueProblemsCard({ problems }: RevenueProblemsCardProps) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_16px_42px_-24px_rgba(15,23,42,0.24)]">
      <SectionHeader
        eyebrow="Priority focus"
        title="Revenue problems"
        description="The most urgent issues affecting revenue recovery today."
        action={<Button variant="secondary" size="sm">View all</Button>}
      />

      <div className="mt-6 space-y-4">
        {problems.map((problem) => (
          <div
            key={problem.title}
            className="flex flex-col gap-4 rounded-[18px] border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-violet-200 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <Badge
                tone={problem.severity === "High" ? "rose" : problem.severity === "Medium" ? "amber" : "emerald"}
              >
                {problem.severity}
              </Badge>
              <div>
                <h3 className="font-semibold text-slate-900">{problem.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{problem.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:justify-end">
              <div className="text-right">
                <p className="text-sm text-slate-500">Estimated impact</p>
                <p className="font-semibold text-slate-900">{problem.impact}</p>
              </div>
              <Button variant="secondary" size="sm" className="border-violet-100 bg-white">
                Investigate
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

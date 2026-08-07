import { BrainCircuit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type RecommendationCardProps = {
  title: string;
  description: string;
  impact: string;
};

export function RecommendationCard({ title, description, impact }: RecommendationCardProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-violet-100 bg-gradient-to-br from-violet-600 via-violet-500 to-sky-500 p-6 text-white shadow-[0_20px_45px_-22px_rgba(124,92,252,0.6)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-violet-100">AI recommendation</p>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        </div>
        <Button variant="secondary" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
          Take action
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <p className="max-w-2xl text-sm leading-7 text-violet-50">{description}</p>
        <div className="rounded-[18px] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
          <p className="text-sm text-violet-100">Business impact</p>
          <p className="mt-2 text-lg font-semibold text-white">{impact}</p>
        </div>
      </div>
    </div>
  );
}

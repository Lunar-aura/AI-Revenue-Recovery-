import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.24)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.32)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

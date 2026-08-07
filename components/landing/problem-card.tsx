type ProblemCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function ProblemCard({ title, description, icon }: ProblemCardProps) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.24)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.32)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">{icon}</div>
      <h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

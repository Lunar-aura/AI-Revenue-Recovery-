type TestimonialCardProps = {
  name: string;
  role: string;
  company: string;
  quote: string;
};

export function TestimonialCard({ name, role, company, quote }: TestimonialCardProps) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.24)]">
      <p className="text-sm leading-7 text-slate-600">“{quote}”</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">{name.slice(0, 2).toUpperCase()}</div>
        <div>
          <p className="font-semibold text-slate-950">{name}</p>
          <p className="text-sm text-slate-500">{role} · {company}</p>
        </div>
      </div>
    </div>
  );
}

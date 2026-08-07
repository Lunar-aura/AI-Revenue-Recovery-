type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-[14px] px-4 py-2.5 text-sm font-medium transition-all duration-200";
  const variants = {
    primary: "bg-violet-600 text-white shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] hover:bg-violet-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  } as const;

  return <button className={`${base} ${variants[variant]} ${className ?? ""}`.trim()} {...props} />;
}

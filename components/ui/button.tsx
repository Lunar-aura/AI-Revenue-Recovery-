type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-violet-600 text-white shadow-[0_10px_30px_-16px_rgba(124,92,252,0.65)] hover:bg-violet-700",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  } as const;

  const sizeClasses = {
    md: "h-10 px-4 py-2.5 text-sm",
    sm: "h-9 px-3 py-2 text-xs",
  } as const;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[14px] font-medium transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`.trim()}
      {...props}
    />
  );
}

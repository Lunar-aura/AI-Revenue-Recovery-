import type { InputHTMLAttributes, ReactNode } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconTrailing?: ReactNode;
};

function generateId(label?: string, id?: string) {
  if (id) return id;
  if (label) {
    return `input-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  }
  return undefined;
}

export function Input({ className, label, error, icon, iconTrailing, id, ...props }: InputProps) {
  const paddingLeft = icon ? "pl-10" : "pl-4";
  const paddingRight = iconTrailing ? "pr-12" : "pr-4";
  const borderColor = error ? "focus:border-rose-500" : "focus:border-violet-600";
  const inputId = generateId(label, id);

  return (
    <div className={`w-full ${className ?? ""}`.trim()}>
      {label ? (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">{label}</label>
      ) : null}
      <div className="relative mt-2">
        {icon ? <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</span> : null}
        <input
          id={inputId}
          className={`block w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 ${paddingLeft} ${paddingRight} ${borderColor} focus:outline-none focus:ring-2 focus:ring-violet-100`}
          {...props}
        />
        {iconTrailing ? <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{iconTrailing}</span> : null}
      </div>
      {error ? <p className="mt-1.5 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

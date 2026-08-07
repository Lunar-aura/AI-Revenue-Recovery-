import { Sparkles } from "lucide-react";

type LogoProps = {
  variant?: "default" | "icon";
  className?: string;
};

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`.trim()}>
      <div className="rounded-[14px] bg-violet-600 p-2 text-white shadow-[0_10px_24px_-16px_rgba(124,92,252,0.75)]">
        <Sparkles className="h-4 w-4" />
      </div>
      {variant === "default" ? (
        <div>
          <p className="text-sm font-semibold text-slate-950">AI Revenue Recovery</p>
          <p className="text-xs text-slate-500">Revenue intelligence</p>
        </div>
      ) : null}
    </div>
  );
}

import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/ui/logo";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(124,92,252,0.18),_transparent_55%)]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(116,185,255,0.14),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,_transparent_0_10px,_rgba(15,23,42,0.03)_10px_20px)]" />
      </div>

      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
          <div className="flex flex-col items-center gap-2">
            <Logo />
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Welcome back
            </h1>
            <p className="mt-1 text-center text-sm leading-6 text-slate-600">
              Sign in to continue to AI Revenue Recovery.
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 rounded-[14px] border border-slate-200 bg-slate-50/80 px-4 py-3.5">
            <p className="text-xs font-medium text-slate-500">Demo credentials</p>
            <div className="mt-2 grid grid-cols-[auto_1fr] gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-slate-400" />Email:</span>
              <span className="font-mono text-slate-700">demo@airevenue.com</span>
              <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-slate-400" />Password:</span>
              <span className="font-mono text-slate-700">12345678</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          By signing in, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

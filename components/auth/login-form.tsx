"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase";

type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 1;
  const canSubmit = emailValid && passwordValid && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!emailValid || !passwordValid) {
      setError("Please enter a valid email and password.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (onSuccess) {
      onSuccess();
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="h-5 w-5" />}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        required
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock className="h-5 w-5" />}
        iconTrailing={
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            className="rounded-full p-1 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-700">
          Forgot password?
        </a>
      </div>

      {error ? (
        <p role="alert" className="rounded-[10px] bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        disabled={!canSubmit}
        className="w-full disabled:opacity-60"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

type SignUpFormProps = {
  onSuccess?: () => void;
};

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const passwordsMatch = password === confirmPassword;
  const canSubmit = name.trim() && emailValid && passwordValid && passwordsMatch && !loading;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setLoading(false);
    onSuccess?.();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Full Name"
        type="text"
        autoComplete="name"
        required
        placeholder="Jane Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={<User className="h-5 w-5" />}
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="h-5 w-5" />}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        required
        placeholder="••••••••"
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

      <Input
        label="Confirm Password"
        type={showConfirm ? "text" : "password"}
        autoComplete="new-password"
        required
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={<Lock className="h-5 w-5" />}
        iconTrailing={
          <button
            type="button"
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            onClick={() => setShowConfirm((v) => !v)}
            className="rounded-full p-1 text-slate-400 hover:text-slate-600"
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

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
            Creating account…
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { createClient } from "@/lib/supabase";

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
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordsMatch = password === confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate on submit so every click produces VISIBLE feedback.
    // (Previously the button was disabled when invalid, so these
    // messages were unreachable and clicking appeared to do nothing.)
    const errors: typeof fieldErrors = {};
    if (!name.trim()) {
      errors.name = "Please enter your full name.";
    }
    if (!emailValid) {
      errors.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (!passwordsMatch) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user && !data.user.email_confirmed_at) {
        setError("Account created! Please check your email to confirm your account before signing in.");
        return;
      }

      onSuccess?.();
    } catch (err) {
      // Surface unexpected failures (network down, client init, etc.)
      // instead of failing silently.
      console.error("Signup failed:", err);
      setError(
        err instanceof Error
          ? `Signup failed: ${err.message}`
          : "Signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <Input
        label="Full Name"
        type="text"
        autoComplete="name"
        required
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={<User className="h-5 w-5" />}
        error={fieldErrors.name}
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        required
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="h-5 w-5" />}
        error={fieldErrors.email}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
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
        error={fieldErrors.password}
      />

      <Input
        label="Confirm Password"
        type={showConfirm ? "text" : "password"}
        autoComplete="new-password"
        required
        placeholder="Confirm your password"
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
        error={fieldErrors.confirmPassword}
      />

      {error ? (
        <p role="alert" className="rounded-[10px] bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      {/* Only disabled while a request is in flight — clicking with invalid
          input must always show visible validation errors instead of doing
          nothing. */}
      <Button
        type="submit"
        variant="primary"
        disabled={loading}
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
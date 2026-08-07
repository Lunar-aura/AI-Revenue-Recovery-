"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { LoginForm } from "@/components/auth/login-form";
import { SignUpForm } from "@/components/auth/signup-form";

type Props = {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
};

export function AuthModal({ open, onClose, initialMode = "login" }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setVisible(true);
    }
  }, [open, initialMode]);

  function switchMode(newMode: "login" | "signup") {
    setVisible(false);
    setTimeout(() => {
      setMode(newMode);
      setVisible(true);
    }, 200);
  }

  function handleLoginSuccess() {
    onClose();
    router.push("/dashboard");
  }

  function handleSignUpSuccess() {
    onClose();
    router.push("/dashboard");
  }

  return (
    <Modal open={open} onClose={onClose} title={mode === "login" ? "Welcome back" : "Create your account"}>
      <div className="transition-all duration-300" key={mode}>
        {visible ? (
          <div className={`transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {mode === "login" ? (
              <div>
                <LoginForm onSuccess={handleLoginSuccess} />
                <div className="mt-4 text-center text-sm text-slate-600">
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => switchMode("signup")} className="font-medium text-violet-600 hover:text-violet-700">
                    Sign Up
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <SignUpForm onSuccess={handleSignUpSuccess} />
                <div className="mt-4 text-center text-sm text-slate-600">
                  Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("login")} className="font-medium text-violet-600 hover:text-violet-700">
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
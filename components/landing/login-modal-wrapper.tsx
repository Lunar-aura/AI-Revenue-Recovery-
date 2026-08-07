"use client";

import { useEffect, useState } from "react";
import { AuthModal } from "@/components/AuthModal";
import { Navbar } from "./navbar";

type Props = {
  children?: React.ReactNode;
};

export function LoginModalWrapper({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialMode, setInitialMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const params = new URLSearchParams(window.location.search);
    const modal = params.get("modal");
    if (modal === "login" || modal === "signup") {
      setInitialMode(modal);
      setOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("modal");
      window.history.replaceState({}, "", url.toString());
    }
  }, [mounted]);

  if (!mounted) {
    return <Navbar />;
  }

  return (
    <>
      <Navbar
        onLoginClick={() => {
          setInitialMode("login");
          setOpen(true);
        }}
        onSignUpClick={() => {
          setInitialMode("signup");
          setOpen(true);
        }}
      />
      <AuthModal open={open} onClose={() => setOpen(false)} initialMode={initialMode} />
    </>
  );
}

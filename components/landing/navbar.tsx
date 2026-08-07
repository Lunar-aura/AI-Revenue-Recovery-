"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
];

type NavbarProps = {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
};

export function Navbar({ onLoginClick, onSignUpClick }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-3">
          <div className="rounded-[14px] bg-violet-600 p-2 text-white shadow-[0_10px_24px_-16px_rgba(124,92,252,0.75)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">AI Revenue Recovery</p>
            <p className="text-xs text-slate-500">Revenue intelligence</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
              {link.label}
            </a>
          ))}
          {onLoginClick && (
            <button
              onClick={onLoginClick}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Login
            </button>
          )}
          {onSignUpClick && (
            <button
              onClick={onSignUpClick}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              Sign Up
            </button>
          )}
          <a href="#cta" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
            Get Started
          </a>
        </nav>

        <button className="rounded-full border border-slate-200 p-2 text-slate-600 lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600" onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            {onLoginClick && (
              <button
                onClick={() => {
                  onLoginClick();
                  setOpen(false);
                }}
                className="text-left text-sm font-medium text-slate-600"
              >
                Login
              </button>
            )}
            {onSignUpClick && (
              <button
                onClick={() => {
                  onSignUpClick();
                  setOpen(false);
                }}
                className="text-left text-sm font-medium text-slate-600"
              >
                Sign Up
              </button>
            )}
            <a href="#cta" className="rounded-full bg-slate-950 px-4 py-2 text-center text-sm font-medium text-white" onClick={() => setOpen(false)}>
              Get Started
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

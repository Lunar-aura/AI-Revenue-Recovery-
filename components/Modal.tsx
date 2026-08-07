"use client";

import React, { useEffect, useRef, useState } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const ANIM_MS = 200;

export function Modal({ open, onClose, children, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // allow mount then animate in
      requestAnimationFrame(() => setVisible(true));
    } else {
      // animate out then unmount
      setVisible(false);
      const t = setTimeout(() => setMounted(false), ANIM_MS + 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (mounted) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", onKey);
      // focus dialog for accessibility
      setTimeout(() => dialogRef.current?.focus(), 0);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [mounted, onClose]);

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  function onFocusTrap(e: React.FocusEvent) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.contains(e.target as Node)) {
      e.stopPropagation();
      dialog.focus();
    }
  }

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      onClick={onOverlayClick}
      onFocus={onFocusTrap}
      role="presentation"
      aria-hidden={!visible}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
    >
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
        ref={dialogRef}
        tabIndex={-1}
        className={`relative z-10 w-full max-w-md rounded-[20px] bg-white p-6 shadow-xl focus:outline-none transform transition-all duration-200 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

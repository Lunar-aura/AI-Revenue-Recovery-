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
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  // Keep the latest onClose available to handlers without making it a
  // dependency of the focus-management effect below. Without this, an
  // inline onClose (a new function on every parent render, e.g. because the
  // parent form re-renders on every keystroke) would cause that effect to
  // tear down and re-run on every keystroke, repeatedly yanking focus back
  // to whatever element was focused when the modal first mounted.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), ANIM_MS + 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!mounted) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCloseRef.current();
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", onKey);
    const focusTimeout = setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      if (!dialog.contains(document.activeElement)) {
        dialog.focus();
      }
    }, 0);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
    // Only re-run this effect when the modal actually opens/closes, not on
    // every render of the parent (which can happen on every keystroke while
    // typing in a form inside the modal).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current || e.target === backdropRef.current) {
      onClose();
    }
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
        ref={backdropRef}
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

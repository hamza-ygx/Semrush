"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  onClose,
  title,
  children,
  width = 635,
  className = "",
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  width?: number;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div
      className="fixed top-0 left-0 z-[100] flex h-screen w-screen flex-col items-center overflow-y-auto bg-[rgba(25,27,35,0.37)] py-10"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" style={{ width }} className={`relative my-auto shrink-0 rounded-xl bg-white px-10 pt-9 pb-10 shadow-popover ${className}`}>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-[12px] right-[12px] flex h-8 w-8 items-center justify-center rounded text-rk-text-2 hover:bg-rk-bg"
        >
          <svg viewBox="0 0 20 20" width={20} height={20}>
            <path d="M1.5 1.5l17 17M18.5 1.5l-17 17" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          </svg>
        </button>
        {title && <h2 className="mb-6 text-[24px] leading-8 font-semibold">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  );
}

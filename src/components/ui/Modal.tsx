"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "./icons";

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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(25,27,35,0.5)] pt-[177px] pb-10"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{ width }} className={`relative rounded-xl bg-white px-10 pt-10 pb-10 shadow-popover ${className}`}>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-[18px] right-[18px] flex h-8 w-8 items-center justify-center rounded text-rk-text-2 hover:bg-rk-bg"
        >
          <CloseIcon width={20} height={20} />
        </button>
        {title && <h2 className="mb-6 text-[24px] leading-8 font-semibold">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  );
}

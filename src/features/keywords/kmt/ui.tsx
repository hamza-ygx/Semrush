"use client";

import { useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useOutsideClose } from "@/components/ui/Popover";

const wideQuery = "(min-width: 1280px)";

function subscribeWide(cb: () => void) {
  const m = window.matchMedia(wideQuery);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

export function useWide(): boolean | null {
  return useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(wideQuery).matches,
    () => null,
  );
}

export function Drop({
  trigger,
  children,
  className = "",
  panelClassName = "",
  panelStyle,
  onOpen,
}: {
  trigger: (s: { open: boolean; toggle: () => void }) => ReactNode;
  children: (close: () => void) => ReactNode;
  className?: string;
  panelClassName?: string;
  panelStyle?: CSSProperties;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      {trigger({
        open,
        toggle: () => {
          if (!open) onOpen?.();
          setOpen(!open);
        },
      })}
      {open && (
        <div style={panelStyle} className={`absolute z-50 rounded-md bg-white shadow-popover ${panelClassName}`}>
          {children(close)}
        </div>
      )}
    </div>
  );
}

export function Tip({
  children,
  tip,
  className = "",
  width = 226,
  align = "center",
  gap = 10,
  bleed = false,
  portal = false,
}: {
  children: ReactNode;
  tip: ReactNode;
  className?: string;
  width?: number;
  align?: "center" | "right";
  gap?: number;
  bleed?: boolean;
  portal?: boolean;
}) {
  const [show, setShow] = useState<CSSProperties | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const open = () => {
    const r = ref.current?.getBoundingClientRect();
    if (!portal || !r) return setShow({ width, bottom: `calc(100% + ${gap}px)`, ...(align === "center" ? { left: "50%", marginLeft: -width / 2 } : { right: 0 }) });
    setShow({
      width,
      top: r.top + window.scrollY - gap,
      left: align === "center" ? r.left + window.scrollX + r.width / 2 - width / 2 : r.right + window.scrollX - width,
      transform: "translateY(-100%)",
    });
  };
  const body = show && (
    <span
      role="tooltip"
      style={show}
      className={`pointer-events-none absolute rounded-md bg-white px-3 py-3 text-left text-[14px] leading-5 font-normal whitespace-normal text-rk-text shadow-popover ${portal ? "z-[65]" : "z-50"}`}
    >
      {tip}
      {bleed && <span aria-hidden className="absolute top-0 left-0 h-px w-screen" />}
      <span
        className="absolute -bottom-[5px] h-[10px] w-[10px] rotate-45 bg-white shadow-[2px_2px_2px_rgba(25,27,35,0.08)]"
        style={align === "center" ? { left: "50%", marginLeft: -5 } : { right: 14 }}
      />
    </span>
  );
  return (
    <span ref={ref} className={`relative inline-flex ${className}`} onMouseEnter={open} onMouseLeave={() => setShow(null)}>
      {children}
      {body && (portal ? createPortal(body, document.body) : body)}
    </span>
  );
}

export function Check({
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  className = "",
  label,
}: {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  className?: string;
  label?: string;
}) {
  const on = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border align-middle ${
        on ? (disabled ? "border-[#a9abaa] bg-[#a9abaa]" : "border-rk-btn-dark bg-rk-btn-dark") : "border-[#d1d3da] bg-white"
      } ${className}`}
    >
      {checked && !indeterminate && (
        <svg viewBox="0 0 16 16" width={12} height={12}>
          <path d="m3.5 8.2 3 3 6-6.4" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && <span className="h-[2px] w-2 rounded-full bg-white" />}
    </button>
  );
}

export const ChevronDownSm = ({ className = "text-rk-text", size = 16 }: { className?: string; size?: number }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} className={className}>
    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ItalicInfo = ({ className = "text-rk-faint" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={className}>
    <circle cx="9.3" cy="3.6" r="1" fill="currentColor" />
    <path d="M7 6.8h1.8L7.6 12.4c-.1.5.1.8.6.8h1.1" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ApplyButton({ onClick, className = "", disabled = false }: { onClick?: () => void; className?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`h-7 rounded-md px-[10px] text-[14px] font-semibold text-white ${disabled ? "bg-[#b5b6b9]" : "bg-rk-btn-dark hover:bg-[#2b2e38]"} ${className}`}
    >
      Apply
    </button>
  );
}

export const SparkleLg = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M6.1 4.6c.5 3 1.6 4.3 4.9 5-3.3.7-4.4 2-4.9 5-.5-3-1.6-4.3-4.9-5 3.3-.7 4.4-2 4.9-5z" fill="#7a2edc" />
    <path d="M12.3.8c.3 1.8 1 2.5 2.9 2.9-1.9.4-2.6 1.1-2.9 2.9-.3-1.8-1-2.5-2.9-2.9 1.9-.4 2.6-1.1 2.9-2.9z" fill="#6a4fb0" />
  </svg>
);

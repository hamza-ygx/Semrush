"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Align = "left" | "right";

export function useOutsideClose<T extends HTMLElement>(open: boolean, close: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);
  return ref;
}

export function Popover({
  trigger,
  children,
  align = "left",
  className = "",
  panelClassName = "",
  offset = 4,
  defaultOpen = false,
}: {
  trigger: (state: { open: boolean; toggle: () => void }) => ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  align?: Align;
  className?: string;
  panelClassName?: string;
  offset?: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const close = () => setOpen(false);
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          style={{ top: `calc(100% + ${offset}px)` }}
          className={`absolute z-50 rounded-md bg-white py-1 shadow-popover ${align === "right" ? "right-0" : "left-0"} ${panelClassName}`}
        >
          {typeof children === "function" ? children(close) : children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  children,
  onClick,
  href,
  active,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  className?: string;
}) {
  const cls = `flex w-full items-center gap-2 px-2 py-[6px] text-left text-[14px] leading-5 text-rk-text hover:bg-rk-bg ${
    active ? "bg-[#e9f7ff]" : ""
  } ${className}`;
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/** Blue link-style dropdown trigger used across report headers ("Sweden ⌄", "Desktop ⌄"). */
export function LinkSelect<T extends string>({
  value,
  options,
  onChange,
  icon,
  label,
  align = "left",
  className = "",
  panelClassName = "min-w-[160px]",
  renderOption,
}: {
  value: T;
  options: readonly T[];
  onChange?: (v: T) => void;
  icon?: ReactNode;
  label?: ReactNode;
  align?: Align;
  className?: string;
  panelClassName?: string;
  renderOption?: (v: T) => ReactNode;
}) {
  const [current, setCurrent] = useState(value);
  return (
    <Popover
      align={align}
      className={className}
      panelClassName={panelClassName}
      trigger={({ toggle, open }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
          {label}
          {icon}
          <span>{renderOption ? renderOption(current) : current}</span>
          <svg viewBox="0 0 16 16" width={16} height={16} className={open ? "rotate-180" : ""}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <MenuItem
            key={o}
            active={o === current}
            onClick={() => {
              setCurrent(o);
              onChange?.(o);
              close();
            }}
          >
            {renderOption ? renderOption(o) : o}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

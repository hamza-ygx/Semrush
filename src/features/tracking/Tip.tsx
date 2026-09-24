"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type Place = "top" | "top-end" | "top-start" | "bottom" | "bottom-start" | "bottom-end";

const pos: Record<Place, string> = {
  top: "bottom-[calc(100%+var(--tip-gap))] left-1/2 -translate-x-1/2",
  "top-end": "bottom-[calc(100%+var(--tip-gap))] right-[var(--tip-shift)]",
  "top-start": "bottom-[calc(100%+var(--tip-gap))] left-[var(--tip-shift)]",
  bottom: "top-[calc(100%+var(--tip-gap))] left-1/2 -translate-x-1/2",
  "bottom-start": "top-[calc(100%+var(--tip-gap))] left-[var(--tip-shift)]",
  "bottom-end": "top-[calc(100%+var(--tip-gap))] right-[var(--tip-shift)]",
};

export function TipBox({
  children,
  dark,
  place = "top",
  gap = 10,
  shift = 0,
  arrow,
  className = "",
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  place?: Place;
  gap?: number;
  shift?: number;
  arrow?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const up = place.startsWith("top");
  return (
    <span
      role="tooltip"
      style={{ "--tip-gap": `${gap}px`, "--tip-shift": `${shift}px`, ...style } as CSSProperties}
      className={`pointer-events-none absolute ${dark ? "z-[61]" : "z-[60]"} block text-left whitespace-normal ${pos[place]} ${
        dark
          ? "rounded-[4px] bg-[#191b23] px-2 py-1 text-[12px] leading-4 text-white"
          : "rounded-md bg-white px-3 py-[10px] text-[14px] leading-5 font-normal text-rk-text shadow-popover"
      } ${className}`}
    >
      {children}
      {arrow !== -1 && (
        <span
          style={arrow === undefined ? { left: "50%" } : { left: arrow }}
          className={`absolute h-[9px] w-[9px] -translate-x-1/2 rotate-45 ${dark ? "bg-[#191b23]" : "bg-white shadow-[1px_1px_1px_rgba(25,27,35,0.08)]"} ${
            up ? "-bottom-[4px]" : "-top-[4px] shadow-none"
          }`}
        />
      )}
    </span>
  );
}

export function Tip({
  tip,
  children,
  className = "",
  focus = true,
  ...box
}: {
  tip: ReactNode;
  children: ReactNode;
  className?: string;
  focus?: boolean;
  dark?: boolean;
  place?: Place;
  gap?: number;
  shift?: number;
  arrow?: number;
  style?: CSSProperties;
} & { boxClassName?: string }) {
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const { boxClassName, ...rest } = box;
  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => focus && setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
      {(hover || focused) && (
        <TipBox {...rest} className={boxClassName}>
          {tip}
        </TipBox>
      )}
    </span>
  );
}

export function useScrollLock(on: boolean) {
  useEffect(() => {
    if (!on) return;
    const root = document.documentElement;
    const w = window.innerWidth - root.clientWidth;
    const prev = [root.style.overflow, document.body.style.paddingRight];
    root.style.overflow = "hidden";
    document.body.style.paddingRight = `${w}px`;
    return () => {
      root.style.overflow = prev[0];
      document.body.style.paddingRight = prev[1];
    };
  }, [on]);
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Thumb = { top: number; height: number; left: number; width: number };

export function ScrollArea({
  children,
  className = "",
  innerClassName = "",
  initial,
  vInset = { right: 2, top: 0, bottom: 0 },
  hInset,
  thumbClassName = "bg-[#d8d8d8]",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  initial?: { top?: number; left?: number };
  vInset?: { right: number; top: number; bottom: number };
  hInset?: { bottom: number; left: number; right: number };
  thumbClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<Thumb | null>(null);
  const iTop = initial?.top ?? 0;
  const iLeft = initial?.left ?? 0;
  const vTop = vInset.top;
  const vBottom = vInset.bottom;
  const hLeft = hInset?.left ?? 0;
  const hRight = hInset?.right ?? 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (iTop) el.scrollTop = iTop;
    if (iLeft) el.scrollLeft = iLeft;
    const update = () => {
      const trackV = el.clientHeight - vTop - vBottom;
      const trackH = el.clientWidth - hLeft - hRight;
      setT({
        height: el.scrollHeight > el.clientHeight ? Math.max(24, (trackV * el.clientHeight) / el.scrollHeight) : 0,
        top: vTop + (trackV * el.scrollTop) / el.scrollHeight,
        width: el.scrollWidth > el.clientWidth ? (trackH * el.clientWidth) / el.scrollWidth : 0,
        left: hLeft + (trackH * el.scrollLeft) / el.scrollWidth,
      });
    };
    update();
    el.addEventListener("scroll", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [iTop, iLeft, vTop, vBottom, hLeft, hRight]);

  return (
    <div className={`relative ${className}`}>
      <div ref={ref} className={`no-scrollbar h-full w-full overflow-auto ${innerClassName}`}>
        {children}
      </div>
      {t && t.height > 0 && (
        <div className={`pointer-events-none absolute w-[6px] rounded-full ${thumbClassName}`} style={{ right: vInset.right, top: t.top, height: t.height }} />
      )}
      {t && hInset && t.width > 0 && (
        <div className={`pointer-events-none absolute h-[6px] rounded-full ${thumbClassName}`} style={{ bottom: hInset.bottom, left: t.left, width: t.width }} />
      )}
    </div>
  );
}

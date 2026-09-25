"use client";

import { useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { BarChart } from "./ui";

export function FluidBarChart(props: Omit<ComponentProps<typeof BarChart>, "width">) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(Math.floor(el.clientWidth)));
    ro.observe(el);
    setW(Math.floor(el.clientWidth));
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="w-full" style={{ height: props.height }}>
      {w > 0 && <BarChart {...props} width={w} />}
    </div>
  );
}

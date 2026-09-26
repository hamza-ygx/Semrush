"use client";

import { useEffect } from "react";

export function ScrollToTool({ index }: { index: number }) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(`[data-feature="${index}"]`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY + 113;
    window.scrollTo({ top: y });
  }, [index]);
  return null;
}

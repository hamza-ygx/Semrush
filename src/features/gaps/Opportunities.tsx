"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { Checkbox, D1, D2, Dot, Segmented, SerpIcon, YouTag } from "./common";
import { overlap, rival, topOpportunities, weakOpportunities, you } from "./data";

export function TopOpportunities({ variant, height }: { variant: "cd" | "kg"; height: number }) {
  const [tab, setTab] = useState<"missing" | "weak">("missing");
  const rows = tab === "missing" ? topOpportunities : weakOpportunities;
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-card" style={{ height }}>
      <div className="flex h-[40px] items-center gap-2 border-b border-[#e8e9ec] px-5">
        <h3 className="text-[16px] leading-6 font-bold">Top Opportunities</h3>
        {variant === "kg" && <YouTag />}
      </div>
      <div className="px-5 pt-5">
        <Segmented
          items={[
            { key: "missing", label: "Missing" },
            { key: "weak", label: "Weak" },
          ]}
          value={tab}
          onChange={setTab}
        />
        {variant === "cd" && (
          <div className="mt-[19px] flex items-center gap-[5px] text-[14px] leading-5">
            <Dot color={D1} size={11} />
            {you}
          </div>
        )}
      </div>
      <div className={variant === "cd" ? "mt-[30px]" : "mt-[27px]"}>
        <div className="flex h-[26px] items-start justify-between border-b border-[#dfe0e3] px-5 text-[12px] leading-4 text-rk-text-2">
          <span>Keyword</span>
          <span>Volume</span>
        </div>
        {rows.map((r) => (
          <div key={r.keyword} className="flex h-[37.3px] items-center justify-between border-b border-[#ecedf0] px-5 text-[14px]">
            <span className="flex items-center gap-[5px]">
              <Link href={routes.keywordOverview} className="text-rk-link hover:text-rk-link-hover">
                {r.keyword}
              </Link>
              <SerpIcon />
            </span>
            <span className="text-rk-text">{r.volume}</span>
          </div>
        ))}
        <Link
          href={`${routes.keywordGap}?q=${you}&compareWith=${rival}`}
          className="mx-5 mt-5 inline-flex h-[26px] items-center rounded-[5px] bg-[#191b1c] px-[9px] text-[14px] font-medium text-white hover:bg-[#2b2e38]"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export function KeywordOverlap({
  height,
  venn,
  legendLeft,
  legendRight,
  mutedValues,
}: {
  height: number;
  venn: { cx: number; cy: number };
  legendLeft: number;
  legendRight: number;
  mutedValues?: boolean;
}) {
  const [on, setOn] = useState({ a: true, b: true });
  const r1 = 126;
  const r2 = 55;
  const d = 139;
  const cx2 = venn.cx + d;
  return (
    <div className="relative flex-1 rounded-lg bg-white shadow-card" style={{ height }}>
      <div className="flex h-[40px] items-center border-b border-[#e8e9ec] px-5">
        <h3 className="text-[16px] leading-6 font-bold">Keyword Overlap</h3>
      </div>
      <div className="absolute top-[61px] flex flex-col gap-2" style={{ left: legendLeft, right: legendRight }}>
        {[
          { k: "a" as const, c: D1, name: you, v: overlap[you] },
          { k: "b" as const, c: D2, name: rival, v: overlap[rival] },
        ].map((it) => (
          <div key={it.k} className="flex h-5 items-center justify-between">
            <Checkbox color={it.c} checked={on[it.k]} onChange={() => setOn((o) => ({ ...o, [it.k]: !o[it.k] }))} label={it.name} />
            <span className={`text-[14px] ${mutedValues ? "text-rk-muted" : "text-rk-text"}`}>{it.v}</span>
          </div>
        ))}
      </div>
      <svg className="absolute top-0 left-0" width="100%" height={height}>
        <defs>
          <clipPath id={`vc-${height}`}>
            <circle cx={venn.cx} cy={venn.cy} r={r1} />
          </clipPath>
        </defs>
        {on.a && <circle cx={venn.cx} cy={venn.cy} r={r1} fill="#b1b3ec" />}
        {on.b && <circle cx={cx2} cy={venn.cy} r={r2} fill="#9befd9" />}
        {on.a && on.b && <circle cx={cx2} cy={venn.cy} r={r2} fill="#75c9d2" clipPath={`url(#vc-${height})`} />}
        {on.a && on.b && (
          <>
            <circle cx={venn.cx} cy={venn.cy} r={r1} fill="none" stroke="#fff" strokeWidth={2} clipPath={`url(#vc2-${height})`} />
            <clipPath id={`vc2-${height}`}>
              <circle cx={cx2} cy={venn.cy} r={r2} />
            </clipPath>
            <circle cx={cx2} cy={venn.cy} r={r2} fill="none" stroke="#fff" strokeWidth={2} clipPath={`url(#vc-${height})`} />
          </>
        )}
      </svg>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { ExportIcon } from "@/components/ui/icons";
import { BubbleMap } from "./charts";
import { bubbles, competitors, latest } from "./data";
import { BubbleLegend, Delta } from "./OverviewView";
import { CardTitle, ExtLink, Pagination, SortIcon, domainHref } from "./ui";
import { useOrganicLive } from "./context";

const Q = "&db=se&searchType=domain";

function Metric({ label, value, delta, className = "" }: { label: string; value: string; delta: string; className?: string }) {
  return (
    <div className={`shrink-0 whitespace-nowrap ${className}`}>
      <div className="text-[14px] leading-5">{label}</div>
      <div className="mt-[2px] flex items-baseline">
        <span className="text-[24px] leading-8 font-bold">{value}</span>
        <Delta v={delta} />
      </div>
    </div>
  );
}

const Sep = () => <div className="mx-6 mt-[1px] h-[52px] w-px shrink-0 bg-rk-border" />;

type Key = "level" | "common" | "se" | "traffic" | "costs" | "paid";

const num = (v: string | number) => {
  if (typeof v === "number") return v;
  const m = parseFloat(v);
  return v.endsWith("K") ? m * 1e3 : v.endsWith("M") ? m * 1e6 : m;
};

export function CompetitorsView() {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "level", dir: -1 });
  const live = useOrganicLive();
  const lc = live?.competitors;
  const source = lc ? lc.rows : competitors;
  const name = live?.domain ?? "rkjh.se";
  const rows = sort.key === "level" && sort.dir === -1 ? source : [...source].sort((a, b) => (num(a[sort.key]) - num(b[sort.key])) * sort.dir);
  const onSort = (k: Key) => setSort((s) => (s.key === k ? { key: k, dir: s.dir === 1 ? -1 : 1 } : { key: k, dir: -1 }));
  const th = (k: Key, label: string, cls = "text-right") => (
    <th className={`text-[12px] font-normal ${cls} ${sort.key === k ? "bg-[#ececf0]" : ""}`}>
      <button type="button" onClick={() => onSort(k)} className="inline-flex items-center gap-1 hover:text-rk-link">
        {label}
        {sort.key === k && <SortIcon className={`text-rk-text-2 ${sort.dir === 1 ? "rotate-180" : ""}`} />}
      </button>
    </th>
  );
  return (
    <div className="flex flex-col gap-4 px-8 pt-4">
      <div className="flex h-[91px] rounded-lg bg-white px-5 pt-[19px] shadow-card">
        <Metric label="Keywords" {...(live?.summary.keywords ?? latest.keywords)} className="w-[89px]" />
        <Sep />
        <Metric label="Traffic" {...(live?.summary.traffic ?? latest.traffic)} className="w-[81px]" />
        <Sep />
        <Metric label="Traffic Cost" {...(live?.summary.cost ?? latest.cost)} />
      </div>
      <div className="h-[324px] rounded-lg bg-white shadow-card">
        <CardTitle>Competitive Positioning Map</CardTitle>
        <BubbleLegend className="px-5 pt-[19px]" gap={15} items={lc?.bubbles} />
        <div className="mt-[10px]">
          {lc ? (
            <BubbleMap items={lc.bubbles.map((b) => ({ ...b, keywords: b.kx, r: b.cr }))} height={212} pad={{ top: 57, right: 20, bottom: 43, left: 99 }} xMax={lc.map.xMax} yMax={lc.map.yMax} xTicks={lc.map.xTicks} yTicks={lc.map.yTicks} tickGap={16} labelGap={65} />
          ) : (
            <BubbleMap items={bubbles.map((b) => ({ ...b, keywords: b.kx, r: b.cr }))} height={212} pad={{ top: 57, right: 20, bottom: 43, left: 99 }} xMax={144.3} yMax={400} tickGap={16} labelGap={65} />
          )}
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-card">
        <div className="flex h-11 items-center justify-between px-5">
          <h2 className="text-[16px] leading-6 font-semibold">
            Organic Competitors <span className="font-normal text-rk-muted">{lc ? lc.total : 249}</span>
          </h2>
          <button type="button" className="flex h-[26px] items-center gap-[6px] rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export
          </button>
        </div>
        <table className="w-full table-fixed text-[14px]">
          <colgroup>
            <col />
            <col className="w-[160px]" />
            <col className="w-[152px]" />
            <col className="w-[100px]" />
            <col className="w-[100px]" />
            <col className="w-[100px]" />
            <col className="w-[128px]" />
          </colgroup>
          <thead>
            <tr className="h-10 border-y border-rk-border bg-[#f8f8fa] text-left">
              <th className="pl-5 text-[12px] font-normal">Domain</th>
              {th("level", "Com. Level", "pl-2 text-left")}
              {th("common", "Common Keywords")}
              {th("se", "SE Keywords")}
              {th("traffic", "Traffic")}
              {th("costs", "Costs")}
              <th className={`pr-5 text-right text-[12px] font-normal ${sort.key === "paid" ? "bg-[#ececf0]" : ""}`}>
                <button type="button" onClick={() => onSort("paid")} className="hover:text-rk-link">
                  Paid Keywords
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.domain} className="h-[45px] border-b border-rk-border hover:bg-[#fafafb]">
                <td className="pl-5">
                  <span className="flex items-center gap-1">
                    <Link href={domainHref(c.domain)} className="truncate text-rk-link hover:text-rk-link-hover">
                      {c.domain}
                    </Link>
                    <ExtLink href={c.domain} />
                  </span>
                </td>
                <td className="pl-2">
                  <span className="flex items-center gap-[10px]">
                    <span className="h-[7px] w-[107px] rounded-full bg-[#edefef]">
                      <span className="block h-full rounded-full bg-[#6167e6]" style={{ width: `${c.level}%` }} />
                    </span>
                    <span className="w-[27px] text-right text-[13px] text-rk-text-2">{c.level}%</span>
                  </span>
                </td>
                <td className="text-right">
                  <Link href={`${routes.keywordGap}?q=${name}&compareWith=${c.domain}${Q}`} className="text-rk-link hover:text-rk-link-hover">
                    {c.common}
                  </Link>
                </td>
                <td className="text-right">
                  <Link href={`${routes.organic.positions}?q=${c.domain}${Q}`} className="text-rk-link hover:text-rk-link-hover">
                    {c.se}
                  </Link>
                </td>
                <td className="text-right">{c.traffic}</td>
                <td className="text-right">{c.costs}</td>
                <td className="pr-5 text-right">
                  {c.paid === "0" ? (
                    c.paid
                  ) : (
                    <Link href={`${routes.compareDomains}?q=${name},${c.domain}${Q}`} className="text-rk-link hover:text-rk-link-hover">
                      {c.paid}
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 pt-[20px] pb-[21px]">
          <Pagination pages={lc ? Math.max(1, Math.ceil(lc.total / 100)) : 3} />
        </div>
      </div>
    </div>
  );
}

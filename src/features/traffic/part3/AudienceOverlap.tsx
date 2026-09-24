"use client";

import { useState } from "react";
import { TrafficFrame, DomainDot } from "../TrafficFrame";
import { DomainSwitch, OutlineButton, SampleCard } from "../ui";
import { SmallChevron } from "../icons";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronsLeft, SearchIcon } from "@/components/ui/icons";
import { doms, lightColors, venn, visited } from "./data";
import { CatIcon, LinkOut, SortIcon, Toggle } from "./ui";

const light = [lightColors.zara, lightColors.asos, lightColors.hm];
const lens: Record<string, string> = { "0-1": "#74c9d0", "0-2": "#b79ff5", "1-2": "#8fd3e8" };

function Venn({ a, b, ra, rb, d }: { a: number; b: number; ra: number; rb: number; d: number }) {
  const W = 590;
  const left = -ra;
  const right = d + rb;
  const off = W / 2 - (left + right) / 2;
  const ax = off;
  const bx = off + d;
  const cy = 102;
  const x = (d * d - rb * rb + ra * ra) / (2 * d);
  const h = Math.sqrt(Math.max(ra * ra - x * x, 0));
  const px = (ax + x).toFixed(1);
  const lensPath = `M${px} ${(cy - h).toFixed(1)}A${rb} ${rb} 0 0 0 ${px} ${(cy + h).toFixed(1)}A${ra} ${ra} 0 0 0 ${px} ${(cy - h).toFixed(1)}Z`;
  const key = [a, b].sort().join("-");
  return (
    <svg width={W} height={205} className="block bg-[#f8f8f8]">
      <circle cx={ax} cy={cy} r={ra} fill={light[a]} />
      <circle cx={bx} cy={cy} r={rb} fill={light[b]} />
      <path d={lensPath} fill={lens[key]} stroke="#fff" strokeWidth={2} />
    </svg>
  );
}

function Pair({ base, other }: { base: number; other: number }) {
  const v = venn.find((p) => (p.a === base && p.b === other) || (p.a === other && p.b === base))!;
  const swap = v.a !== base;
  const ra = swap ? v.rb : v.ra;
  const rb = swap ? v.ra : v.rb;
  const av = swap ? v.bv : v.av;
  const bv = swap ? v.av : v.bv;
  return (
    <div className="w-[590px] shrink-0">
      <Venn a={base} b={other} ra={ra} rb={rb} d={v.d} />
      <div className="mt-[12px] flex flex-col gap-[9px] border-b border-[#c4c7cf] pb-[13px] text-[14px]">
        {[
          [base, av],
          [other, bv],
        ].map(([i, val]) => (
          <div key={i} className="flex h-5 items-center">
            <DomainDot color={doms[i as number].color} size={12} className="mr-[8px]" />
            <span>{doms[i as number].name}</span>
            <span className="ml-auto">{val}</span>
          </div>
        ))}
      </div>
      <div className="mt-[12px] flex flex-col gap-[5px] text-[14px]">
        <div className="flex h-5 items-center justify-between">
          <span className="text-rk-muted">Total Audience</span>
          <span>{v.total}</span>
        </div>
        <div className="flex h-5 items-center justify-between">
          <span className="text-rk-muted">Potential Audience</span>
          <span>{v.potential}</span>
        </div>
        <div className="flex h-5 items-center justify-between">
          <span className="text-rk-muted">Overlap</span>
          <span>
            <span className="mr-[10px] text-rk-muted">{v.overlapPct}</span>
            {v.overlap}
          </span>
        </div>
      </div>
    </div>
  );
}

function DomainTag({ i }: { i: number }) {
  return <span className={`inline-flex h-[20px] items-center rounded-full px-[9px] text-[12px] ${doms[i].tag}`}>{doms[i].name}</span>;
}

function OverlapBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="relative h-[8px] w-[94px] rounded-full bg-[#eef0f2]">
        <span className="absolute inset-y-0 left-0 rounded-full bg-[#5a5ec9]" style={{ width: Math.max(2, pct) }} />
      </span>
      <span className="text-[14px]">{pct.toFixed(2)}%</span>
    </div>
  );
}

export function AudienceOverlap() {
  const [base, setBase] = useState(0);
  const [safe, setSafe] = useState(true);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const others = [0, 1, 2].filter((i) => i !== base);
  const rows = visited.filter((r) => r.domain.includes(q.trim().toLowerCase()));
  return (
    <TrafficFrame title="Audience Overlap" filters={["geo", "date", "device"]}>
      <div className="flex flex-col gap-4 pt-[15px]">
        <SampleCard
          title="Audience Overlap"
          link={
            <button type="button" className="text-[14px] text-rk-link hover:underline">
              How to use it
            </button>
          }
          bodyClassName="pt-[21px] pb-[20px]"
        >
          <div className="px-5">
            <DomainSwitch onChange={(n) => setBase(doms.findIndex((d) => d.name === n))} />
            <div className="mt-[13px] flex gap-4">
              {others.map((o) => (
                <Pair key={`${base}-${o}`} base={base} other={o} />
              ))}
            </div>
            <div className="mt-[37px] flex items-center gap-[8px] text-[14px] font-semibold">
              All Overlaps for: <DomainTag i={base} />
            </div>
          </div>
          <table className="mt-[20px] w-full border-collapse text-[14px]">
            <thead>
              <tr className="h-[40px] bg-[#f7f7f8] text-[13px] text-rk-text-2">
                <th className="pl-[12px] text-left font-normal">Overlaps</th>
                <th className="w-[130px] pr-[12px] text-right font-normal">Total Audience</th>
                <th className="w-[134px] pr-[12px] text-right font-normal">Potential Audience</th>
                <th className="w-[265px] bg-[#ebecee] pr-[12px] text-right font-normal">
                  <span className="inline-flex items-center gap-[4px]">
                    Overlap <SortIcon width={14} height={14} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[46px] border-b border-[#e0e1e9]">
                <td className="pl-[12px]">
                  <span className="flex gap-[4px]">
                    {[base, ...others].map((i) => (
                      <DomainTag key={i} i={i} />
                    ))}
                  </span>
                </td>
                <td className="pr-[12px] text-right">83.9M</td>
                <td className="pr-[12px] text-right">51.6M</td>
                <td className="pl-[12px]">
                  <OverlapBar pct={2.92} />
                </td>
              </tr>
            </tbody>
          </table>
        </SampleCard>

        <SampleCard
          title={
            <>
              Visited domains <span className="font-normal text-rk-muted">1-50 (455)</span>
            </>
          }
          info
          bodyClassName="pt-[21px] pb-[20px]"
        >
          <div className="px-5">
            <div className="flex items-center gap-[8px] text-[14px]">
              <span>Total Audience</span>
              <Popover
                trigger={({ toggle }) => (
                  <OutlineButton onClick={toggle} className="bg-white">
                    <span className="relative h-[14px] w-[22px] rounded-full border border-[#c4c7cf] bg-[#e0e1e9]">
                      <span className="absolute top-[1px] left-[1px] h-[10px] w-[10px] rounded-full bg-white" />
                    </span>
                    Of
                    <SmallChevron width={14} height={14} />
                  </OutlineButton>
                )}
                panelClassName="min-w-[140px]"
              >
                {(close) =>
                  ["Of", "Not of"].map((o) => (
                    <MenuItem key={o} onClick={close} active={o === "Of"}>
                      {o}
                    </MenuItem>
                  ))
                }
              </Popover>
              <Popover
                trigger={({ toggle }) => (
                  <OutlineButton onClick={toggle} className="gap-[8px] bg-white">
                    {doms.map((d) => (
                      <span key={d.name} className="flex items-center gap-[8px] pr-[2px]">
                        <DomainDot color={d.color} />
                        {d.name}
                      </span>
                    ))}
                    <SmallChevron width={14} height={14} />
                  </OutlineButton>
                )}
                panelClassName="min-w-[200px]"
              >
                {(close) =>
                  doms.map((d) => (
                    <MenuItem key={d.name} onClick={close} active>
                      <DomainDot color={d.color} />
                      {d.name}
                    </MenuItem>
                  ))
                }
              </Popover>
            </div>
            <div className="mt-[11px] flex items-center gap-[8px] text-[14px]">
              <label className="flex h-[30px] w-[224px] items-center gap-[8px] rounded-[6px] border border-[#c4c7cf] bg-white px-[8px]">
                <SearchIcon className="text-rk-faint" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by domain" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-rk-faint" />
              </label>
              <Popover
                trigger={({ toggle }) => (
                  <OutlineButton onClick={toggle} className="h-[30px] w-[102px] justify-between bg-white text-rk-faint!">
                    Category
                    <SmallChevron width={14} height={14} className="text-rk-text" />
                  </OutlineButton>
                )}
                panelClassName="min-w-[180px]"
              >
                {(close) =>
                  ["Apparel & Fashion", "Travel", "Online Services", "News & Media", "Finance"].map((o) => (
                    <MenuItem key={o} onClick={close}>
                      {o}
                    </MenuItem>
                  ))
                }
              </Popover>
              <span className="flex items-center gap-[8px] text-[13px]">
                <Toggle on={safe} onClick={() => setSafe(!safe)} dark />
                Safe mode
              </span>
            </div>
          </div>
          <table className="mt-[16px] w-full border-collapse text-[14px]">
            <thead className="sticky top-[48px] z-10">
              <tr className="h-[40px] bg-[#f7f7f8] text-[13px] text-rk-text-2">
                <th className="pl-[12px] text-left font-normal">Domain</th>
                <th className="w-[120px] pl-[4px] text-left font-normal">Category</th>
                <th className="w-[124px] pr-[12px] text-right font-normal">Total Audience</th>
                <th className="w-[132px] pr-[12px] text-right font-normal">Potential Audience</th>
                <th className="w-[210px] bg-[#ebecee] pr-[12px] text-right font-normal">
                  <span className="inline-flex items-center gap-[4px]">
                    Overlap <SortIcon width={14} height={14} />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.domain} className="h-[45px] border-b border-[#e0e1e9]">
                  <td className="pl-[12px]">
                    <a href={`https://${r.domain}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-[4px] hover:text-rk-link">
                      {r.domain}
                      <LinkOut className="text-rk-faint" />
                    </a>
                  </td>
                  <td className="pl-[4px]">
                    {r.cats ? (
                      <span className="flex gap-[2px]">
                        {r.cats.map((c, i) => (
                          <CatIcon key={i} c={c} />
                        ))}
                      </span>
                    ) : (
                      <span className="text-rk-muted">No category</span>
                    )}
                  </td>
                  <td className="pr-[12px] text-right">{r.total}</td>
                  <td className="pr-[12px] text-right">{r.potential}</td>
                  <td className="pl-[12px]">
                    <span className="flex items-center gap-[10px]">
                      <span className="relative h-[8px] w-[40px] rounded-full bg-[#eef0f2]">
                        <span className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-[#5a5ec9]" />
                      </span>
                      <span className="ml-[40px]">{r.pct.toFixed(2)}%</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-[20px] flex items-center gap-[8px] px-5 text-[14px]">
            <button type="button" aria-label="First page" disabled={page === 1} onClick={() => setPage(1)} className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-[#e0e1e9] text-rk-faint">
              <ChevronsLeft width={14} height={14} />
            </button>
            <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="h-7 rounded-[6px] border border-[#e0e1e9] px-[8px] text-rk-faint enabled:text-rk-text">
              Prev
            </button>
            <button type="button" onClick={() => setPage((p) => Math.min(10, p + 1))} className="h-7 rounded-[6px] bg-rk-btn-dark px-[9px] font-semibold text-white hover:bg-[#2b2e38]">
              Next
            </button>
            <span className="ml-[8px]">Page:</span>
            <input aria-label="Page" value={page} onChange={(e) => setPage(Math.min(10, Math.max(1, +e.target.value || 1)))} className="h-7 w-[68px] rounded-[6px] border border-[#c4c7cf] px-[8px] outline-none" />
            <span className="ml-[1px]">
              of{" "}
              <button type="button" onClick={() => setPage(10)} className="text-rk-link">
                10
              </button>
            </span>
          </div>
        </SampleCard>
      </div>
    </TrafficFrame>
  );
}

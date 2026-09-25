"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tabHref } from "./BacklinksPage";
import { backlinkRows, newBacklinkRows } from "./data";
import { DateChip } from "./DateRange";
import { AddFilter, BrokenIcon, FilterSelect, Card, CardHead, Checkbox, Chip, ExportBtn, ExtLink, Pager, SearchBox, Seg, Th, ext } from "./ui";

const tiles = [
  { key: "all", title: "All", count: 375 },
  { key: "best", title: "Best", count: 53, sub: "Backlinks with follow attribute", fire: true },
  { key: "new", title: "Top New", count: 89, sub: "Recently acquired backlinks" },
  { key: "lost", title: "Lost and Vital", count: 17, sub: "Restore these backlinks first" },
];

const Fire = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M8.2 1.5c.4 2.3-1 3.4-2.2 4.8C4.8 7.6 4 8.9 4 10.4 4 12.9 5.8 14.5 8 14.5s4-1.6 4-4c0-1.9-1-3.2-1.8-4-.1 1-.5 1.7-1.2 2.1.3-2.7-.3-5.3-.8-7.1z" fill="none" stroke="#ff642d" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);

const placementOptions: Record<string, string[]> = {
  "Link placement": ["Content", "Header", "Footer", "Sitewide"],
  "Lost issues": ["Broken domain", "Removed link", "Page not found", "Redirected"],
  "Mobile optimization": ["Mobile friendly", "Not mobile friendly"],
  "Ref. page platform": ["Blog", "CMS", "Forum", "Wiki", "Message board"],
};

const cols = [40, 95, 0, 80, 80, 212, 118, 118];
const newCols = [40, 95, 328, 80, 80, 220, 110, 110];

export function BacklinksTable({ mode }: { mode?: "new" }) {
  const isNew = mode === "new";
  const pt = isNew ? "pt-[12px]" : "pt-[10px]";
  const rows = isNew ? newBacklinkRows : backlinkRows;
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isNew || !cardRef.current) return;
    window.scrollTo(0, cardRef.current.getBoundingClientRect().top + window.scrollY - 14);
  }, [isNew]);
  const [tile, setTile] = useState("all");
  const [sel, setSel] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<string[]>([]);
  const addFilter = (o: string) => !filters.includes(o) && setFilters([...filters, o]);
  const toggle = (i: number) => {
    const n = new Set(sel);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setSel(n);
  };
  return (
    <>
      <div className="flex h-[72px] rounded-md border border-[#d5d9e2] bg-white">
        {tiles.map((t, i) => {
          const on = t.key === tile;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTile(t.key)}
              className={`relative flex flex-1 flex-col items-start justify-start px-5 pt-[12px] text-left ${i ? "border-l border-[#d5d9e2]" : ""} ${i === 0 ? "rounded-l-md" : ""} ${i === 3 ? "rounded-r-md" : ""} ${on ? "bg-[#ebedf6] outline outline-1 -outline-offset-1 outline-[#a3abcc]" : "hover:bg-[#f7f8fa]"}`}
            >
              <span className="flex items-center gap-[8px] text-[16px] leading-6 font-medium text-rk-text">
                {t.fire && <Fire />}
                {t.title}
                <span className="-ml-[1px] font-normal text-rk-muted">{t.count}</span>
              </span>
              {t.sub && <span className="mt-[2px] block text-[14px] leading-5 text-rk-muted">{t.sub}</span>}
            </button>
          );
        })}
      </div>
      <div ref={cardRef} className="mt-4">
      <Card>
        <CardHead title="Backlinks" count={isNew ? "1 - 2 (2)" : "1 - 100 (375)"} right={<ExportBtn />} />
        <div className={`flex flex-wrap items-center gap-x-[8px] ${isNew ? "gap-y-[12px] pt-[19px] pb-[20px]" : `gap-y-[13px] pt-[21px] ${filters.length ? "pb-[20px]" : "pb-[21px]"}`} px-5`}>
          <SearchBox placeholder="Filter by title or URL" width={260} />
          <Seg options={["All", "Active", "New", "Lost"]} initial={isNew ? "New" : undefined} />
          {isNew && <DateChip />}
          <Seg options={["All", "Follow", "Nofollow", "Sponsored", "UGC"]} />
          {filters.map((f) => (
            <FilterSelect key={f} label={f} options={placementOptions[f] ?? ["Yes", "No"]} defaultOpen />
          ))}
          <div className={`-ml-[1px] ${filters.length || isNew ? "flex basis-full items-center justify-between" : ""}`}>
            <div className="inline-block">
              <AddFilter onPick={addFilter} />
            </div>
            {isNew && (
              <Link href={tabHref("backlinks")} className="flex items-center gap-[8px] text-[14px] text-[#6c6e79] hover:text-rk-text">
                <svg viewBox="0 0 16 16" width={14} height={14}>
                  <path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
                </svg>
                Clear filters
              </Link>
            )}
          </div>
        </div>
        <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
          <colgroup>
            {(isNew ? newCols : cols).map((w, i) => (
              <col key={i} style={w ? { width: w } : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <Th className="!pr-0">
                <Checkbox checked={sel.size === rows.length} onChange={() => setSel(sel.size === rows.length ? new Set() : new Set(rows.map((_, i) => i)))} />
              </Th>
              <Th align="right" sorted={!isNew}>
                Page AS
              </Th>
              <Th>Source page Title and URL</Th>
              <Th>Ext. Links</Th>
              <Th>Int. Links</Th>
              <Th>Anchor and Target URL</Th>
              <Th sorted={isNew}>First Seen</Th>
              <Th>Last Seen</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[#f0f0f2] align-top hover:bg-[#fafafb]">
                <td className={`${isNew ? "pt-[14px]" : "pt-[12px]"} pl-3`}>
                  <Checkbox checked={sel.has(i)} onChange={() => toggle(i)} />
                </td>
                <td className={`px-3 ${pt} text-right`}>{r.as}</td>
                <td className={`${isNew ? "pr-[10px] pl-3" : "px-3"} ${pt} pb-[12px]`}>
                  <div className="truncate">{r.title}</div>
                  <div className="break-all">
                    {r.broken && <BrokenIcon className="mr-[4px] inline-block align-[-3px] text-[#a9abb6]" />}
                    <a href={ext(r.url)} target="_blank" rel="noreferrer" className={`${isNew ? "" : "tracking-[0.2px]"} text-rk-link hover:text-rk-link-hover`}>
                      {isNew
                        ? r.url.split("-").map((part, k) => (
                            <span key={k}>
                              {k > 0 && <span className="px-[1px]">-</span>}
                              {part}
                            </span>
                          ))
                        : r.url}
                    </a>
                    <ExtLink href={r.url} className="ml-[4px]" />
                  </div>
                  <div className="mt-[5px] flex flex-wrap gap-x-[4px] gap-y-[5px]">
                    {r.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </td>
                <td className={`px-3 ${pt}`}>{r.ext}</td>
                <td className={`px-3 ${pt}`}>{r.int}</td>
                <td className={`px-3 ${pt} pb-[12px]`}>
                  <div className="truncate">{r.anchor}</div>
                  <div>
                    {r.targetBroken && <BrokenIcon className="mr-[4px] inline-block align-[-3px] text-[#a9abb6]" />}
                    <a href={ext(r.target)} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                      {r.target}
                    </a>
                    <ExtLink href={r.target} className="ml-[4px]" />
                  </div>
                  <div className="mt-[5px] flex flex-wrap gap-x-[4px] gap-y-[5px]">
                    {r.ltags.map((t) => (
                      <Chip key={t.label} tone={t.tone}>
                        {t.label}
                      </Chip>
                    ))}
                  </div>
                </td>
                <td className={`px-3 ${pt} whitespace-nowrap ${isNew ? "text-[#00875a]" : ""}`}>{r.first}</td>
                <td className={`px-3 ${pt} whitespace-nowrap`}>{r.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager pages={isNew ? 1 : 4} />
      </Card>
      </div>
    </>
  );
}

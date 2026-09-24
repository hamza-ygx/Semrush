"use client";

import { useState } from "react";
import { backlinkRows } from "./data";
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

export function BacklinksTable() {
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
      <Card className="mt-4">
        <CardHead title="Backlinks" count="1 - 100 (375)" right={<ExportBtn />} />
        <div className={`flex flex-wrap items-center gap-x-[8px] gap-y-[13px] px-5 pt-[21px] ${filters.length ? "pb-[20px]" : "pb-[21px]"}`}>
          <SearchBox placeholder="Filter by title or URL" width={260} />
          <Seg options={["All", "Active", "New", "Lost"]} />
          <Seg options={["All", "Follow", "Nofollow", "Sponsored", "UGC"]} />
          {filters.map((f) => (
            <FilterSelect key={f} label={f} options={placementOptions[f] ?? ["Yes", "No"]} defaultOpen />
          ))}
          <div className={filters.length ? "ml-[1px] basis-full" : "ml-[2px]"}>
            <div className="inline-block">
              <AddFilter onPick={addFilter} />
            </div>
          </div>
        </div>
        <table className="w-full table-fixed text-[14px] leading-5 text-rk-text">
          <colgroup>
            <col style={{ width: 40 }} />
            <col style={{ width: 95 }} />
            <col />
            <col style={{ width: 80 }} />
            <col style={{ width: 80 }} />
            <col style={{ width: 212 }} />
            <col style={{ width: 118 }} />
            <col style={{ width: 118 }} />
          </colgroup>
          <thead>
            <tr>
              <Th className="!pr-0">
                <Checkbox checked={sel.size === backlinkRows.length} onChange={() => setSel(sel.size === backlinkRows.length ? new Set() : new Set(backlinkRows.map((_, i) => i)))} />
              </Th>
              <Th align="right" sorted>
                Page AS
              </Th>
              <Th>Source page Title and URL</Th>
              <Th>Ext. Links</Th>
              <Th>Int. Links</Th>
              <Th>Anchor and Target URL</Th>
              <Th>First Seen</Th>
              <Th>Last Seen</Th>
            </tr>
          </thead>
          <tbody>
            {backlinkRows.map((r, i) => (
              <tr key={i} className="border-b border-[#f0f0f2] align-top hover:bg-[#fafafb]">
                <td className="pt-[12px] pl-3">
                  <Checkbox checked={sel.has(i)} onChange={() => toggle(i)} />
                </td>
                <td className="px-3 pt-[10px] text-right">{r.as}</td>
                <td className="px-3 pt-[10px] pb-[12px]">
                  <div className="max-w-[228px] truncate">{r.title}</div>
                  <div className="break-all">
                    {r.broken && <BrokenIcon className="mr-[4px] inline-block align-[-3px] text-[#a9abb6]" />}
                    <a href={ext(r.url)} target="_blank" rel="noreferrer" className="tracking-[0.3px] text-rk-link hover:text-rk-link-hover">
                      {r.url}
                    </a>
                    <ExtLink href={r.url} className="ml-[4px]" />
                  </div>
                  <div className="mt-[5px] flex flex-wrap gap-x-[4px] gap-y-[5px]">
                    {r.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </td>
                <td className="px-3 pt-[10px]">{r.ext}</td>
                <td className="px-3 pt-[10px]">{r.int}</td>
                <td className="px-3 pt-[10px] pb-[12px]">
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
                <td className="px-3 pt-[10px] whitespace-nowrap">{r.first}</td>
                <td className="px-3 pt-[10px] whitespace-nowrap">{r.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pager pages={4} />
      </Card>
    </>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { ExportIcon, PlusIcon } from "@/components/ui/icons";
import { MenuItem, Popover, useOutsideClose } from "@/components/ui/Popover";
import { brand } from "@/config/brand";
import { forvarvKeywords, positionRows, topicKeywords } from "./data";
import { topicGroups, treemapHeight, treemapWidth, type Tile } from "./topicsData";
import { Checkbox, ExtLink, IntentBadge, Kd, KeywordLink, ext } from "./ui";

const pct = (v: number) => `${(v / treemapWidth) * 100}%`;

function Sparkle() {
  return (
    <svg viewBox="0 0 16 16" width={16} height={16}>
      <defs>
        <linearGradient id="tp-sp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c43ee8" />
          <stop offset="1" stopColor="#7b5cf5" />
        </linearGradient>
      </defs>
      <path d="M6.5 3c.4 2.8 1.6 4.2 4.5 4.8-2.9.6-4.1 2-4.5 4.8C6.1 9.8 4.9 8.4 2 7.8 4.9 7.2 6.1 5.8 6.5 3z" fill="url(#tp-sp)" />
      <path d="M12.5 1c.2 1.3.7 1.9 2 2.2-1.3.3-1.8.9-2 2.2-.2-1.3-.7-1.9-2-2.2 1.3-.3 1.8-.9 2-2.2z" fill="url(#tp-sp)" />
    </svg>
  );
}

function Loader() {
  return (
    <div className="flex flex-col items-center pt-[134px] pb-[90px]">
      <div className="text-[16px] leading-6 font-semibold">Finding rkjh.se topics</div>
      <div className="mt-2 text-[16px] leading-6">It may take a couple of minutes.</div>
      <svg width="120" height="120" viewBox="0 0 120 120" className="mt-[23px] animate-spin [animation-duration:3s]">
        <ellipse cx="72" cy="17" rx="18" ry="7" transform="rotate(12 72 17)" fill="#8b4fe0" />
        <ellipse cx="20" cy="37" rx="7" ry="20" transform="rotate(22 20 37)" fill="#8b4fe0" />
        <ellipse cx="106" cy="55" rx="7" ry="12" transform="rotate(-10 106 55)" fill="#8b4fe0" />
        <ellipse cx="62" cy="110" rx="24" ry="9" transform="rotate(-6 62 110)" fill="#8b4fe0" />
        <ellipse cx="53" cy="90" rx="9" ry="7" fill="#9b4fd2" />
        <ellipse cx="32" cy="60" rx="8" ry="10" fill="#b0508e" />
        <circle cx="62" cy="47" r="8" fill="#d6546b" />
        <circle cx="80" cy="70" r="7" fill="#c9506e" />
      </svg>
      <div className="mt-[32px] text-[14px] text-rk-muted">Analyzing domain...</div>
    </div>
  );
}

function TileView({ tile, selected, onSelect }: { tile: Tile; selected: boolean; onSelect: () => void }) {
  const [x, y, w, h] = tile.r;
  const showName = w >= 60 && h >= 34;
  const showStats = w >= 100 && h >= 60;
  return (
    <button
      type="button"
      title={`${tile.name} · Traffic: ${tile.traffic} · Keywords: ${tile.keywords}`}
      onClick={onSelect}
      className="absolute flex flex-col items-stretch justify-start overflow-hidden rounded-[3px] px-[11px] py-[9px] text-left transition-[filter] hover:brightness-95"
      style={{
        left: pct(x),
        top: y,
        width: pct(w),
        height: h,
        background: selected ? "linear-gradient(90deg, #4999fe 0%, #6d92fe 45%, #a583ff 100%)" : tile.color ?? "#ddd5fe",
        color: selected ? "#fff" : "#1b1e1a",
      }}
    >
      {showName && <span className={`block truncate text-[14px] leading-4 font-semibold ${w < 100 ? "-mx-[1px]" : ""}`}>{tile.name}</span>}
      {showStats && (
        <span className="mt-[3px] block text-[12px] leading-4">
          Traffic: {tile.traffic}
          <br />
          Keywords: {tile.keywords}
        </span>
      )}
    </button>
  );
}

function Treemap({ selected, onSelect }: { selected: string; onSelect: (n: string) => void }) {
  return (
    <div className="relative mx-5 mt-5" style={{ height: treemapHeight }}>
      {topicGroups.map((g) => {
        const [x, y, w, h] = g.r;
        return (
          <div key={g.name} className="absolute rounded-md bg-[#f0f3ff]" style={{ left: pct(x), top: y, width: pct(w), height: h }}>
            <div className="flex items-baseline gap-[6px] truncate px-3 pt-[12px] text-[16px] leading-6 font-semibold whitespace-nowrap">
              <span className="truncate">{g.name}</span>
              {w > 400 && (
                <>
                  <span className="text-[14px] font-normal">
                    Traffic: <b className="text-[16px] font-semibold">{g.traffic}</b>
                  </span>
                  <span className="text-[14px] font-normal">
                    Volume: <b className="text-[16px] font-semibold">{g.volume}</b>
                  </span>
                </>
              )}
            </div>
          </div>
        );
      })}
      {topicGroups.flatMap((g) => g.tiles).map((t) => (
        <TileView key={t.name} tile={t} selected={t.name === selected} onSelect={() => onSelect(t.name)} />
      ))}
    </div>
  );
}

function HowItWorks() {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-7 items-center gap-[6px] rounded-md px-[9px] text-[14px] text-rk-link hover:bg-[#e6edfd] hover:text-rk-link-hover ${open ? "bg-[#e6edfd]" : ""}`}
      >
        <svg viewBox="0 0 16 16" width={16} height={16}>
          <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth={1.5} />
          <path d="M6.3 6.3a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.6-.7 1.1v.3" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          <circle cx="8" cy="11.4" r=".8" fill="currentColor" />
        </svg>
        How it works
      </button>
      {open && (
        <div className="absolute top-[calc(100%+5px)] right-0 z-50 w-[342px] rounded-md bg-white pt-[16px] pr-4 pb-[16px] pl-4 text-[14px] leading-5 text-rk-text shadow-popover">
          <ul className="flex list-disc flex-col gap-2 pl-[16px] marker:text-[#6a6c6a]">
            <li>{brand.name} is looking for domain&apos;s well-performing and non-branded content.</li>
            <li>AI evaluates this data and categorizes keywords into topics.</li>
            <li>As a result, you get a list of key topics and related pages.</li>
          </ul>
          <button type="button" onClick={() => setOpen(false)} className="mt-[16px] text-rk-link hover:text-rk-link-hover">
            Learn more
          </button>
        </div>
      )}
    </div>
  );
}

function KeywordsTable({ subtopic }: { subtopic: string }) {
  const [sel, setSel] = useState<Set<number>>(new Set());
  const rows = useMemo(() => {
    if (subtopic === "redovisningsbyrå halmstad") return topicKeywords;
    if (subtopic === "fastställd förvärvsinkomst") return forvarvKeywords;
    const words = subtopic.split(" ").filter((w) => w.length > 3);
    const list = positionRows.filter((r) => r.keyword === subtopic || words.some((w) => r.keyword.includes(w)));
    return (list.length ? list : positionRows.slice(10, 14)).slice(0, 10).map((r) => ({ keyword: r.keyword, intent: r.intent, position: r.position, traffic: r.traffic, volume: r.volume, kd: r.kd, url: r.url }));
  }, [subtopic]);
  const all = rows.length > 0 && rows.every((_, i) => sel.has(i));
  const th = "text-[12px] font-normal";
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="flex h-11 items-center justify-between px-5">
        <div className="text-[14px]">
          Top keywords for page: <b>{subtopic}</b>
        </div>
        <Popover
          align="right"
          panelClassName="w-[200px]"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              <PlusIcon />
              Add to list
            </button>
          )}
        >
          {(close) => <MenuItem onClick={close}>Create new list</MenuItem>}
        </Popover>
      </div>
      <table className="w-full table-fixed text-[14px]">
        <colgroup>
          <col className="w-[56px]" />
          <col />
          <col className="w-[72px]" />
          <col className="w-[65px]" />
          <col className="w-[86px]" />
          <col className="w-[86px]" />
          <col className="w-[86px]" />
          <col className="w-[310px]" />
        </colgroup>
        <thead>
          <tr className="h-10 border-y border-rk-border bg-[#f8f8fa] text-left">
            <th className="pl-5">
              <Checkbox checked={all} onChange={() => setSel(all ? new Set() : new Set(rows.map((_, i) => i)))} />
            </th>
            <th className={th}>Keyword</th>
            <th className={th}>Intent</th>
            <th className={`${th} text-right`}>Position</th>
            <th className={`${th} text-right`}>Traffic</th>
            <th className={`${th} text-right`}>Volume</th>
            <th className={`${th} text-right`}>KD %</th>
            <th className={`${th} pl-4`}>URL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r.keyword}${i}`} className="h-12 border-b border-rk-border last:border-b-0 hover:bg-[#fafafb]">
              <td className="pl-5">
                <Checkbox
                  checked={sel.has(i)}
                  onChange={() =>
                    setSel((s) => {
                      const n = new Set(s);
                      if (n.has(i)) n.delete(i);
                      else n.add(i);
                      return n;
                    })
                  }
                />
              </td>
              <td>
                <KeywordLink keyword={r.keyword} plus />
              </td>
              <td className="pl-[19px]">
                <span className="flex">
                  <IntentBadge intent={r.intent} />
                </span>
              </td>
              <td className="text-right">{r.position}</td>
              <td className="text-right">{r.traffic}</td>
              <td className="text-right">{r.volume}</td>
              <td className="text-right">
                <Kd kd={r.kd} />
              </td>
              <td className="pl-4">
                <span className="flex items-center gap-[6px]">
                  <a href={ext(r.url)} target="_blank" rel="noreferrer" className="truncate text-rk-link hover:text-rk-link-hover">
                    {r.url}
                  </a>
                  <ExtLink href={r.url} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TopicsView({ initial = "redovisningsbyrå halmstad" }: { initial?: string }) {
  const [loading, setLoading] = useState(true);
  const [subtopic, setSubtopic] = useState(initial);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(id);
  }, []);
  const select = (n: string) => {
    setSubtopic(n);
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("subtopic", n);
      window.history.replaceState(null, "", u);
    } catch {}
  };
  return (
    <div className="flex flex-col gap-4 px-8 pt-4">
      <div className="rounded-lg bg-white shadow-card">
        <div className="flex h-[63px] items-start justify-between border-b border-rk-border px-5 pt-[9px]">
          <div>
            <h2 className="flex items-center gap-1 text-[16px] leading-6 font-semibold">
              <Sparkle />
              Best-Performing Topics
            </h2>
            <div className="mt-[1px] flex items-center text-[14px] leading-5 text-rk-muted">
              rkjh.se
              <span className="mx-[9px] h-4 w-px bg-rk-border" />
              {loading ? (
                <span className="ml-[4px] h-[11px] w-[125px] rounded-full bg-[#e0e2e1]" />
              ) : (
                <>
                  Aug 2026
                  <span className="mx-[9px] h-4 w-px bg-rk-border" />9 topics, 54 pages
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[9px] -mt-[2px]">
            <HowItWorks />
            <button type="button" className="flex h-7 items-center gap-[6px] rounded-md border border-rk-border-strong bg-[#f5f6f6] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
              <svg viewBox="0 0 16 16" width={14} height={14}>
                <path d="M9.4 7 14 1.8h-1.1l-4 4.5-3.2-4.5H2l4.8 6.9L2 14.2h1.1l4.2-4.8 3.4 4.8h3.7zm-1.5 1.7-.5-.7L3.5 2.6h1.7l3.1 4.4.5.7 4.1 5.8h-1.7z" fill="currentColor" />
              </svg>
              Share
            </button>
            <button
              type="button"
              disabled={loading}
              className={`flex h-7 items-center gap-[6px] rounded-md border px-[9px] text-[14px] ${loading ? "border-rk-border bg-[#f7f7f9] text-[#b9bbc4]" : "border-rk-border-strong bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover"}`}
            >
              <ExportIcon />
              Export to XLSX
            </button>
          </div>
        </div>
        {loading ? <Loader /> : <Treemap selected={subtopic} onSelect={select} />}
        {!loading && <div className="h-5" />}
      </div>
      {!loading && <KeywordsTable subtopic={subtopic} />}
    </div>
  );
}

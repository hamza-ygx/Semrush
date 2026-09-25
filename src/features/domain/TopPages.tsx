"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChatGptIcon, ExportIcon, GeminiIcon, GoogleIcon, SearchIcon } from "@/components/ui/icons";
import { AdvancedFilters, CheckFilter, ExportPopover } from "@/features/organic/filters";
import { topPages, type TopPage } from "./data";
import { tpCited, tpPages, tpTraffic } from "./series";
import { Plot, linePath, pts, smoothPath, Stroke, VBW } from "./charts";
import { Check, ExtIcon, IntentBadge, Seg, SerpIcon, SortIcon } from "./ui";

const MONTHS = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026"];
const monthAt = [0, 0.0866, 0.171, 0.258, 0.345, 0.423, 0.51, 0.594, 0.681, 0.765, 0.852, 0.94];

const Chevrons = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d={open ? "M5 3.5 8 6.5l3-3M5 12.5 8 9.5l3 3" : "M5 6.5 8 3.5l3 3M5 9.5 8 12.5l3-3"} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Metric({ label, value, delta, tone = "danger", className = "" }: { label: string; value: string; delta: string; tone?: "danger" | "muted"; className?: string }) {
  return (
    <div className={className}>
      <div className="text-[14px] leading-5">{label}</div>
      <div className="mt-[4.5px] flex items-baseline gap-[6px]">
        <span className="text-[24px] leading-[30px] font-bold">{value}</span>
        <span className={`text-[12px] ${tone === "danger" ? "text-rk-danger" : "text-rk-muted"}`}>{delta}</span>
      </div>
    </div>
  );
}

function Summary() {
  const [open, setOpen] = useState(true);
  const [range, setRange] = useState<"6M" | "1Y" | "2Y" | "All time">("1Y");
  const [on, setOn] = useState({ traffic: true, pages: true, cited: true });
  const H = 124;
  const cut = range === "6M" ? Math.round(tpTraffic.length / 2) : 0;
  const s = (a: number[]) => a.slice(cut);
  const labels = range === "6M" ? MONTHS.slice(6).map((l, i) => ({ at: (monthAt[i + 6] - 0.5) / 0.5, label: l })) : MONTHS.map((l, i) => ({ at: monthAt[i], label: l }));
  return (
    <section className="rounded-lg bg-white shadow-card">
      <header className={`flex h-[42px] items-center justify-between px-5 ${open ? "border-b border-rk-border" : ""}`}>
        <h3 className="text-[16px] leading-6 font-bold">Summary</h3>
        <button type="button" onClick={() => setOpen(!open)} className="mr-[8px] flex items-center gap-[6px] text-[14px] text-rk-muted hover:text-rk-text">
          {open ? "Hide" : "Show"}
          <Chevrons open={open} />
        </button>
      </header>
      {open && (
        <div className="px-5 pt-[21px] pb-[20px]">
          <div className="flex">
            <Metric label="Organic Traffic" value="59" delta="-9.23%" className="w-[122px]" />
            <Metric label="Organic Pages" value="45" delta="-18.18%" className="w-[146px] border-l border-rk-border pl-[25px]" />
            <Metric label="Cited Pages" value="1" delta="no changes" tone="muted" className="border-l border-rk-border pl-[25px]" />
          </div>
          <div className="mt-[23.5px] flex items-center justify-between">
            <div className="flex gap-[15px]">
              <Check color="#6167e6" label={<span className="ml-[3.5px]">Organic Traffic</span>} checked={on.traffic} onToggle={() => setOn({ ...on, traffic: !on.traffic })} />
              <Check color="#3ed4a4" label={<span className="ml-[3.5px]">Organic Pages</span>} checked={on.pages} onToggle={() => setOn({ ...on, pages: !on.pages })} />
              <Check color="#c28bf5" label={<span className="ml-[3.5px]">Cited Pages</span>} checked={on.cited} onToggle={() => setOn({ ...on, cited: !on.cited })} />
            </div>
            <div className="flex gap-[17px]">
              {(["6M", "1Y", "2Y", "All time"] as const).map((r) => (
                <button key={r} type="button" onClick={() => setRange(r)} className="relative text-[14px] leading-5 hover:text-rk-link">
                  {r}
                  {r === range && <span className="absolute right-0 -bottom-[5px] left-0 h-[3px] rounded-sm bg-rk-tab" />}
                </button>
              ))}
            </div>
          </div>
          <div className="relative mt-[31px]">
            <span className="absolute top-[62px] left-[8px] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[12px] text-rk-muted">Pages</span>
            <span className="absolute top-[62px] left-[68px] -translate-x-1/2 -translate-y-1/2 -rotate-90 text-[12px] whitespace-nowrap text-rk-muted">Cited Pages</span>
            <span className="absolute top-[62px] right-[10px] translate-x-1/2 -translate-y-1/2 -rotate-90 text-[12px] text-rk-muted">Traffic</span>
            <Plot
              height={H}
              ticks={[0, 1 / 3, 2 / 3, 1]}
              left={["0", "36", "71", "107"]}
              right={["0", "44", "88", "132"]}
              leftW={80}
              rightW={80}
              gap={15}
              xGap={9}
              bottomH={30}
              x={labels}
              labelClass="text-[13px] leading-4 text-rk-muted"
              overlay={<div className="absolute top-0 bottom-0 left-0 border-l border-dashed border-[#d6d8d7]" />}
            >
              <rect x={VBW * 0.989} width={VBW * 0.011} y={0} height={H} fill="#e9ecee" />
              {on.cited && <Stroke d={smoothPath(pts(s(tpCited), 107, H))} color="#c28bf5" width={2.5} />}
              {on.pages && <Stroke d={smoothPath(pts(s(tpPages), 107, H))} color="#3ed4a4" width={2.5} />}
              {on.traffic && <Stroke d={smoothPath(pts(s(tpTraffic), 132, H))} color="#6167e6" width={2.5} />}
              <path d={linePath([[0, H], [VBW, H]])} stroke="#d6d8d7" vectorEffect="non-scaling-stroke" />
            </Plot>
          </div>
        </div>
      )}
    </section>
  );
}

const cols = [68, 255, 59, 120, 76, 80, 119, 99, 140, 95];
const Colgroup = () => (
  <colgroup>
    {cols.map((w, i) => (
      <col key={i} style={{ width: w }} />
    ))}
  </colgroup>
);
const tableW = cols.reduce((a, b) => a + b, 0);

function Row({ p }: { p: TopPage }) {
  const num = "pt-[12px] pr-3 text-right align-top";
  return (
    <tr className="border-b border-rk-border text-[14px] leading-5">
      <td className="pt-[10px] pl-[32px] align-top">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0_0_0_1px_#e0e2e1,0_1px_2px_rgba(25,27,35,0.12)]">
          <GoogleIcon width={16} height={16} />
        </span>
      </td>
      <td className="pt-[12px] pb-[45px] pl-4 align-top">
        <span className="block max-w-[146.5px] leading-[19.4px] break-all tabular-nums">
          <Link href={routes.organic.pages} className="text-rk-link hover:text-rk-link-hover">
            {p.url}
          </Link>
          <a href={`https://${p.url}`} target="_blank" rel="noreferrer" aria-label="Open page" className="ml-[4px] inline-block align-[-3px] text-[#a9abaa] hover:text-rk-muted">
            <ExtIcon width={16} height={16} />
          </a>
        </span>
      </td>
      <td className={num}>
        {p.traffic ? (
          <Link href={routes.organic.positions} className="text-rk-link">
            {p.traffic}
          </Link>
        ) : (
          0
        )}
      </td>
      <td className={num}>{p.diff ? <span className="text-rk-danger">{p.diff} ↓</span> : 0}</td>
      <td className={num}>{p.pct}</td>
      <td className={num}>
        {p.keywords ? (
          <Link href={routes.organic.positions} className="text-rk-link">
            {p.keywords}
          </Link>
        ) : (
          0
        )}
      </td>
      <td className={num}>{p.prompts}</td>
      <td className={num}>
        {p.refDomains ? (
          <Link href={routes.backlinks} className="text-rk-link">
            {p.refDomains}
          </Link>
        ) : (
          0
        )}
      </td>
      <td className="pt-[12px] pr-[16px] pl-3 align-top">
        {p.keyword ? (
          <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(p.keyword)}&db=se`} className="text-rk-link hover:text-rk-link-hover">
            {p.keyword}
            <SerpIcon width={14} height={14} className="ml-[5px] inline-block align-[-2px] text-[#a9abaa]" />
          </Link>
        ) : (
          <span className="text-rk-muted">n/a</span>
        )}
      </td>
      <td className="pt-[12px] pl-3 align-top">{p.intent ? <IntentBadge intent={p.intent} /> : <span className="text-rk-muted">n/a</span>}</td>
    </tr>
  );
}

const sources = ["Google Search", "ChatGPT", "AI Overview", "AI Mode", "Gemini"];
const sourceIcons: Record<string, ReactNode> = {
  "Google Search": <GoogleIcon width={16} height={16} />,
  ChatGPT: <ChatGptIcon width={16} height={16} />,
  "AI Overview": <GoogleIcon width={16} height={16} />,
  "AI Mode": <GoogleIcon width={16} height={16} />,
  Gemini: <GeminiIcon width={16} height={16} />,
};

function AllPages() {
  const [filter, setFilter] = useState("");
  const [kind, setKind] = useState<"All URLs" | "New" | "Lost">("All URLs");
  const head = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string[]>([]);
  const [adv, setAdv] = useState<{ mode: string; field: string; op: string; text: string }[]>([]);
  const rows =
    kind === "All URLs"
      ? topPages.filter(
          (p) =>
            p.url.includes(filter.trim()) &&
            (!src.length || src.includes("Google Search")) &&
            adv.every((c) => {
              const hay = ((c.field === "URL" ? p.url : p.keyword) ?? "").toLowerCase();
              const hit = c.op === "Not containing" ? !hay.includes(c.text.toLowerCase()) : c.op === "Begins with" ? hay.startsWith(c.text.toLowerCase()) : c.op === "Ends with" ? hay.endsWith(c.text.toLowerCase()) : c.op === "Exact match" ? hay === c.text.toLowerCase() : hay.includes(c.text.toLowerCase());
              return c.mode === "Include" ? hit : !hit;
            }),
        )
      : [];
  const th = "h-10 text-[12px] font-normal text-rk-text-2";
  const thr = `${th} pr-3 text-right`;
  return (
    <section className="mt-5 rounded-lg bg-white shadow-card">
      <header className="flex h-[43px] items-center justify-between border-b border-rk-border px-5">
        <h3 className="flex items-center gap-[10px] text-[16px] leading-6 font-bold">
          All Pages <span className="font-normal text-rk-muted">66</span>
        </h3>
        <ExportPopover
          total={66}
          trigger={(open, toggle) => (
            <button
              type="button"
              aria-label="Export pages"
              onClick={toggle}
              className={`inline-flex h-7 items-center gap-[7px] rounded-md border border-[#d4d6d5] px-[9px] text-[14px] text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f7f8f9]"}`}
            >
              <ExportIcon width={16} height={16} />
              Export
            </button>
          )}
        />
      </header>
      <div className="sticky top-0 z-20 rounded-t-lg bg-white">
        <div className="flex h-[69px] items-center gap-[9px] px-5">
          <div className="flex">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by URL"
              className="h-7 w-[195px] rounded-l-md border border-[#d4d6d5] px-[9px] text-[14px] outline-none placeholder:text-[#8b8d8c] focus:border-[#7a86f2]"
            />
            <button type="button" aria-label="Search" className="flex h-7 w-8 items-center justify-center rounded-r-md border border-l-0 border-[#d4d6d5] bg-white text-rk-text-2 hover:bg-rk-bg">
              <SearchIcon />
            </button>
          </div>
          <Seg items={["All URLs", "New", "Lost"] as const} value={kind} onChange={setKind} itemClassName="px-[7.5px]" className="ml-[1px]" />
          <span className="inline-flex">
            <CheckFilter label="Source" compact width={222} options={sources} icons={sourceIcons} value={src} onChange={setSrc} />
          </span>
          <AdvancedFilters compact clearAll={false} fields={["Top Keyword", "URL"]} onApply={setAdv} />
        </div>
        <div ref={head} className="overflow-hidden border-b border-rk-border">
          <table className="table-fixed bg-[#f9f9f9]" style={{ width: tableW }}>
            <Colgroup />
            <thead>
              <tr>
                <th className={`${th} pl-5 text-left`}>Source</th>
                <th className={`${th} pl-4 text-left`}>URL</th>
                <th className={`${thr} bg-[#e9ebee]`}>
                  <span className="inline-flex items-center">
                    Tr..
                    <SortIcon className="ml-[1px] text-rk-muted" />
                  </span>
                </th>
                <th className={thr}>Traffic Diff.</th>
                <th className={thr}>Traffic %</th>
                <th className={thr}>Keywords</th>
                <th className={thr}>LLM Prompts</th>
                <th className={thr}>Ref. Domains</th>
                <th className={`${th} pl-3 text-left`}>Top Keyword</th>
                <th className={`${th} pl-3 text-left`}>Intent</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div
        className="overflow-x-auto [&::-webkit-scrollbar]:h-[8px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d8d7] [&::-webkit-scrollbar-track]:bg-transparent"
        onScroll={(e) => {
          if (head.current) head.current.scrollLeft = e.currentTarget.scrollLeft;
        }}
      >
        <table className="table-fixed" style={{ width: tableW }}>
          <Colgroup />
          <tbody>
            {rows.map((p, i) => (
              <Row key={`${p.url}${i}`} p={p} />
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={cols.length} className="h-[160px] text-center text-[14px] text-rk-muted">
                  Nothing found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex h-[69px] items-center gap-[6px] border-t border-rk-border px-5 text-[14px]">
        Page:
        <input defaultValue="1" className="h-7 w-[66px] rounded-md border border-[#d4d6d5] px-[8px] text-[#a9abaa] outline-none" />
        <span className="ml-[2px]">of 1</span>
      </div>
    </section>
  );
}

export function TopPagesReport() {
  return (
    <>
      <Summary />
      <AllPages />
    </>
  );
}

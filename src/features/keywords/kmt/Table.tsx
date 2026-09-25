"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { ChevronsLeft, ExportIcon, GearIcon, RefreshIcon } from "@/components/ui/icons";
import { KdDot, SendIcon, SerpIcon, SfIcon, SortIcon } from "../common";
import type { KwRow } from "../data";
import { AddToList } from "./KoPopovers";
import { ApplyButton, Check, Drop, ItalicInfo, Tip } from "./ui";
import { currencies, intentInfo, kdInfo, kmtColumns, sfFeatures, sfLabels, type Currency, type KmtColumn, type SfKind } from "./data";

type Stats = { all: string; total?: string; volume: string; kd: string; pages: number };

const narrowCols: KmtColumn[] = ["intent", "kd", "cpc", "sf", "results"];
const wideCols: KmtColumn[] = ["intent", "kd", "cpc", "sf", "updated"];
const lockedCols: KmtColumn[] = ["updated"];

const intentStyle: Record<string, string> = {
  C: "bg-[#fcd96b] text-[#8a5a00] group-hover/i:bg-[#f5b400] group-hover/i:text-white",
  I: "bg-[#c4d8fd] text-[#2b53b8] group-hover/i:bg-[#97a2f6] group-hover/i:text-white",
  N: "bg-[#e7d3fb] text-[#8a3fcf] group-hover/i:bg-[#b57cf0] group-hover/i:text-white",
  T: "bg-[#9ef2c9] text-[#00785f] group-hover/i:bg-[#2bc48d] group-hover/i:text-white",
};

const RefreshGlyph = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="text-[#9a9ca4]">
    <path d="M14.4 8.4A6.5 6.5 0 1 1 12.6 3.5M13.2 1V4H10.2" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const fullVolume = (v: string) => (/K$/.test(v) ? Math.round(parseFloat(v) * 1000).toLocaleString("en-US") : v);

function TipBody({ title, text }: { title: string; text: string }) {
  return (
    <>
      <span className="block font-semibold">{title}</span>
      <span className="block">{text}</span>
    </>
  );
}

function Intents({ intents, selected }: { intents: string[]; selected: boolean }) {
  if (!intents.length) return <span className="text-rk-muted">n/a</span>;
  return (
    <span className="inline-flex gap-1">
      {intents.map((i) => (
        <Tip key={i} tip={<TipBody title={intentInfo[i].name} text={intentInfo[i].text} />} className="group/i">
          <span
            data-intent={i}
            className={`inline-flex h-4 w-4 cursor-default items-center justify-center rounded-[3px] text-[11px] leading-4 font-semibold ${selected ? "bg-white text-[#2b53b8]" : intentStyle[i]}`}
          >
            {i}
          </span>
        </Tip>
      ))}
    </span>
  );
}

export const sfGlyph: Record<SfKind, ReactNode> = {
  ai: <path d="M8 .5C8.9 5 11 7.1 15.5 8 11 8.9 8.9 11 8 15.5 7.1 11 5 8.9.5 8 5 7.1 7.1 5 8 .5z" fill="currentColor" />,
  video: (
    <>
      <circle cx="8" cy="8" r="5.6" fill="none" stroke="currentColor" strokeWidth={1.4} />
      <path d="M6.7 5.8 10.2 8l-3.5 2.2z" fill="currentColor" />
    </>
  ),
  paa: <path d="M2.5 2.5h11v8h-6l-3 2.8v-2.8h-2zM7.2 5.3c.2-.7 1.5-.8 1.7 0 .2.9-1 .9-1 1.8M7.9 8.5v.1" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />,
  related: <path d="M1.5 3.5h5M1.5 6.5h5M1.5 9.5h5M1.5 12.5h5M8.5 3.5h6M8.5 6.5h6M8.5 9.5h6M8.5 12.5h6" stroke="currentColor" strokeWidth={1.3} />,
  local: <path d="M8 14.5s-4.5-4-4.5-7.5a4.5 4.5 0 0 1 9 0c0 3.5-4.5 7.5-4.5 7.5zM8 5.5v.1" fill="none" stroke="currentColor" strokeWidth={1.4} />,
  sitelinks: <path d="M6.5 9.5 9.5 6.5M5.5 7.5l-1.5 1.5a2.1 2.1 0 0 0 3 3l1.5-1.5M10.5 8.5 12 7a2.1 2.1 0 0 0-3-3L7.5 5.5" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />,
  reviews: <path d="m8 2.2 1.8 3.7 4 .6-2.9 2.8.7 4L8 11.4l-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />,
  images: <path d="M2.5 3.5h11v9h-11zM2.5 10.5l3-3 3 3 2-2 3 3" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />,
};

function SfCount({ row }: { row: KwRow }) {
  const feats = row.sfList ?? sfFeatures(row.sf ?? 0, !!row.sfIcon);
  return (
    <Drop
      panelStyle={{ top: "calc(100% + 7px)", right: 2, width: 200 }}
      panelClassName="py-1"
      trigger={({ toggle }) => (
        <button type="button" data-sf onClick={toggle} className="text-rk-text-2 underline decoration-rk-faint decoration-dotted underline-offset-4 hover:text-rk-text">
          {row.sf}
        </button>
      )}
    >
      {() =>
        feats.map((f) => (
          <div key={f} className="flex h-8 items-center gap-2 px-[9px] text-[14px] text-rk-text">
            <svg viewBox="0 0 16 16" width={18} height={18} className="-mx-px shrink-0 text-[#9c9e9d]">
              {sfGlyph[f]}
            </svg>
            {sfLabels[f]}
          </div>
        ))
      }
    </Drop>
  );
}

function Trend({ seed }: { seed: string }) {
  const h = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return (
    <span className="inline-flex h-4 items-end gap-px">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="w-[3px] bg-[#8f9bf0]" style={{ height: 3 + ((h >>> i) % 13) }} />
      ))}
    </span>
  );
}

function Row({
  row,
  relevance,
  plus,
  cols,
  wide,
  selected,
  toggle,
  rate,
  onQuick,
}: {
  row: KwRow;
  relevance: boolean;
  plus: boolean;
  cols: KmtColumn[];
  wide: boolean;
  selected: boolean;
  toggle: () => void;
  rate: number;
  onQuick?: (r: KwRow) => void;
}) {
  const noData = row.kd == null && row.sf == null;
  const tailCols = cols.filter((c) => c === "sf" || c === "results" || c === "updated");
  const merged = wide && noData && cols.includes("sf");
  const cut = row.keyword.lastIndexOf(" ") + 1;
  const td = "pt-3 pb-[11px] align-top leading-5";
  const kd = row.kd;
  return (
    <tr className={`border-b border-rk-border ${selected ? "bg-[#e8f1ff]" : "hover:bg-[#f9f9f9]"}`}>
      <td className="w-[44px] pl-5 align-top">
        <div className="pt-3">
          <Check checked={selected} onChange={toggle} label={`Select ${row.keyword}`} />
        </div>
      </td>
      <td className={`${td} pr-4 pl-2`}>
        <span className="flex items-start gap-1">
          {row.added || plus || wide ? (
            <AddToList className="mt-[2px] shrink-0" gap={10} wideInput />
          ) : (
            <span className="mt-[2px] h-4 w-4 shrink-0 rounded-full bg-[#e8e9ed]" />
          )}
          <span className="group/kw">
            {cut > 0 && (
              <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(row.keyword)}&db=se`} className="text-rk-link group-hover/kw:underline group-has-[button:hover]/kw:no-underline">
                {row.keyword.slice(0, cut)}
              </Link>
            )}
            <span className="whitespace-nowrap">
              <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(row.keyword)}&db=se`} className="text-rk-link group-hover/kw:underline group-has-[button:hover]/kw:no-underline">
                {row.keyword.slice(cut)}
              </Link>
              <button type="button" aria-label="Keyword quick view" onClick={() => onQuick?.(row)} className="ml-[6px] inline-block align-[-3px] text-[#9c9e9d] hover:text-rk-text-2">
                <SerpIcon />
              </button>
            </span>
          </span>
        </span>
      </td>
      {cols.includes("intent") && (
        <td className={`${td} pl-2 text-left`}>
          <Intents intents={row.intents} selected={selected} />
        </td>
      )}
      {relevance && <td className={`${td} pr-2 text-right`}>{row.relevance ?? "n/a"}</td>}
      <td className={`${td} pr-2 text-right`}>{wide ? fullVolume(row.volume) : row.volume}</td>
      {cols.includes("trend") && (
        <td className={`${td} pl-4`}>
          <Trend seed={row.keyword} />
        </td>
      )}
      {cols.includes("kd") && (
        <td className={td}>
          <span className="flex items-center justify-end gap-2 pr-[9px]">
            {kd == null ? (
              <span className="text-rk-muted">n/a</span>
            ) : (
              <Tip tip={<TipBody {...{ title: kdInfo(kd).name, text: kdInfo(kd).text }} />}>
                <span data-kd>{kd}</span>
              </Tip>
            )}
            <KdDot kd={kd} size={12} />
          </span>
        </td>
      )}
      {cols.includes("cpc") && <td className={`${td} pr-2 text-right`}>{(parseFloat(row.cpc) * rate).toFixed(2)}</td>}
      {cols.includes("density") && <td className={`${td} pr-2 text-right`}>{noData ? "n/a" : ((row.keyword.length % 9) / 10 + 0.1).toFixed(2)}</td>}
      {merged && (
        <td colSpan={tailCols.length} className={`${td} pr-5 text-right whitespace-nowrap`}>
          <span className="inline-flex items-center gap-[6px] text-rk-text-2">
            For metrics, refresh
            <RefreshGlyph />
          </span>
        </td>
      )}
      {!merged && cols.includes("sf") && (
        <td className={`${td} pl-[9px] whitespace-nowrap ${noData ? "overflow-hidden" : ""}`}>
          {noData ? (
            <span className="ml-[21px] text-rk-muted">For new keywords</span>
          ) : (
            <span className="flex items-center">
              {row.sfIcon && (
                <>
                  <SfIcon className="text-rk-muted" />
                  <span className="mx-[8px] h-4 w-px bg-rk-border" />
                </>
              )}
              <SfCount row={row} />
            </span>
          )}
        </td>
      )}
      {!merged && cols.includes("results") && <td className={`${td} pr-5 text-right`}>{noData ? "n/a" : `${(((row.keyword.length * 37) % 90) / 10 + 0.4).toFixed(1)}M`}</td>}
      {!merged && cols.includes("updated") && (
        <td className={`${td} pr-5 text-right whitespace-nowrap`}>
          <span className="inline-flex items-center gap-[6px]">
            {noData ? "n/a" : "1 month"}
            <RefreshGlyph />
          </span>
        </td>
      )}
    </tr>
  );
}

function Th({ children, className = "", sorted }: { children?: ReactNode; className?: string; sorted?: boolean }) {
  return (
    <th className={`h-[42px] text-[12px] font-normal text-rk-text ${sorted ? "bg-[#eaebeb]" : ""} ${className}`}>
      {sorted ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <SortIcon className="text-rk-muted" />
        </span>
      ) : (
        children
      )}
    </th>
  );
}

function Pagination({ pages }: { pages: number }) {
  const [page, setPage] = useState(1);
  const btn = "flex h-7 items-center rounded-md border px-2 text-[14px]";
  return (
    <div className="flex items-center gap-2 px-5 pt-5 pb-5">
      <button type="button" disabled={page === 1} onClick={() => setPage(1)} className={`${btn} w-7 justify-center border-rk-border px-0 text-rk-faint`}>
        <ChevronsLeft />
      </button>
      <button type="button" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className={`${btn} border-rk-border ${page === 1 ? "text-rk-faint" : "text-rk-text-2"}`}>
        Prev
      </button>
      <button type="button" onClick={() => setPage((p) => Math.min(pages, p + 1))} className={`${btn} border-rk-btn-dark bg-rk-btn-dark font-semibold text-white`}>
        Next
      </button>
      <span className="ml-[7px] text-[14px]">Page:</span>
      <input value={page} onChange={(e) => setPage(Math.max(1, Math.min(pages, +e.target.value || 1)))} className="h-7 w-[67px] rounded-md border border-rk-border-strong px-2 text-[14px] outline-none" />
      <span className="text-[14px]">
        of <span className="text-rk-link">{pages}</span>
      </span>
    </div>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${on ? "border-rk-btn-dark bg-rk-btn-dark" : "border-[#d1d3da] bg-white"}`}>
      {on && <span className="h-[6px] w-[6px] rounded-full bg-white" />}
    </span>
  );
}

function SendKeywords({ count }: { count: number }) {
  const [target, setTarget] = useState<"ksb" | "pt">("ksb");
  const off = count === 0;
  const options = [
    { key: "ksb" as const, title: "Keyword Strategy Builder", text: "Build your SEO strategy around the selected keywords." },
    { key: "pt" as const, title: "Position Tracking", text: "Track website’s daily rankings for your custom set of target keywords." },
  ];
  return (
    <Drop
      className="ml-auto"
      panelStyle={{ top: "calc(100% + 5px)", right: 2, width: 280 }}
      panelClassName="overflow-hidden text-left font-normal"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-2 font-semibold text-white hover:bg-[#2b2e38]">
          <SendIcon />
          Send keywords
        </button>
      )}
    >
      {(close) => (
        <>
          {off && (
            <div className="flex h-11 items-center gap-1 bg-[#ecf0ff] px-4 text-[14px] text-rk-text">
              <ItalicInfo className="text-rk-muted" />
              You first need to select keywords.
            </div>
          )}
          <div className="px-4 pt-[11px] pb-4">
            <div className="text-[16px] leading-6 font-semibold">Send:</div>
            <div className={`mt-[10px] text-[14px] leading-5 ${off ? "text-[#d6d8d7]" : "text-rk-text"}`}>{off ? "Keywords" : `${count} keyword${count > 1 ? "s" : ""}`}</div>
            <div className="mt-[14px] text-[16px] leading-6 font-semibold">To:</div>
            <div className={off ? "opacity-[0.32]" : ""}>
              {options.map((o) => (
                <button key={o.key} type="button" role="radio" aria-checked={target === o.key} disabled={off} onClick={() => setTarget(o.key)} className="mt-3 flex w-full gap-2 text-left first:mt-[16px]">
                  <span className="pt-[2px]">
                    <Radio on={target === o.key} />
                  </span>
                  <span className="text-[14px] leading-5">
                    <span className="block text-rk-text">{o.title}</span>
                    <span className="mt-[3px] block text-rk-muted">{o.text}</span>
                  </span>
                </button>
              ))}
              <div className="mt-[17px] border-t border-rk-border pt-[15px]">
                <label className="flex items-center gap-2 text-[14px] leading-5">
                  <Check disabled={off} label="Clear selection after sending" />
                  Clear selection after sending
                </label>
              </div>
            </div>
            <ApplyButton disabled={off} onClick={close} className="mt-[17px]" />
          </div>
        </>
      )}
    </Drop>
  );
}

function download(rows: KwRow[], format: "xlsx" | "csv" | "csv-semicolon", currency: Currency, rate: number) {
  const sep = format === "csv" ? "," : format === "csv-semicolon" ? ";" : "\t";
  const head = ["Keyword", "Intent", "Volume", "Keyword Difficulty", `CPC (${currency})`, "SERP Features"];
  const body = rows.map((r) => [r.keyword, r.intents.join(" "), fullVolume(r.volume).replace(/,/g, ""), r.kd ?? "", (parseFloat(r.cpc) * rate).toFixed(2), r.sf ?? ""]);
  const text = [head, ...body].map((l) => l.map((v) => (String(v).includes(sep) ? `"${v}"` : v)).join(sep)).join("\n");
  const url = URL.createObjectURL(new Blob([text], { type: format === "xlsx" ? "application/vnd.ms-excel" : "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `keyword_magic_tool.${format === "xlsx" ? "xls" : "csv"}`;
  a.click();
  URL.revokeObjectURL(url);
}

function ExportDrop({
  total,
  rows,
  picked,
  groupSelected,
  currency,
  rate,
  wide,
}: {
  total: string;
  rows: KwRow[];
  picked: KwRow[];
  groupSelected: boolean;
  currency: Currency;
  rate: number;
  wide: boolean;
}) {
  const [scope, setScope] = useState<"all" | "group" | "selected">("all");
  const [keep, setKeep] = useState(false);
  const options = [
    { key: "all" as const, label: "All", count: `(${total})`, disabled: false },
    { key: "group" as const, label: "This group", count: "", disabled: !groupSelected },
    { key: "selected" as const, label: "Selected", count: `(${picked.length})`, disabled: picked.length === 0 },
  ];
  const formats = [
    { key: "xlsx" as const, label: "XLSX" },
    { key: "csv" as const, label: "CSV" },
    { key: "csv-semicolon" as const, label: "CSV Semicolon" },
  ];
  return (
    <Drop
      className={wide ? "ml-2" : "ml-3"}
      panelStyle={{ top: "calc(100% + 8px)", right: 2, width: 280 }}
      panelClassName="px-4 pt-[14px] pb-4 text-left font-normal"
      trigger={({ toggle, open }) =>
        wide ? (
          <button
            type="button"
            aria-label="Export"
            onClick={toggle}
            className={`flex h-7 w-8 items-center justify-center rounded-md border border-[#d6d7db] text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f8f8f9]"}`}
          >
            <ExportIcon />
          </button>
        ) : (
          <button type="button" onClick={toggle} className="flex h-7 items-center gap-[6px] rounded-md border border-rk-border-strong bg-[#f5f6f6] px-[14px] font-normal text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export
          </button>
        )
      }
    >
      {(close) => (
        <>
          <div className="text-[16px] leading-6 font-semibold text-rk-text">Export data</div>
          <div className="mt-[12px]">
            {options.map((o) => (
              <button
                key={o.key}
                type="button"
                role="radio"
                aria-checked={scope === o.key}
                disabled={o.disabled}
                onClick={() => setScope(o.key)}
                className={`flex h-7 w-full items-center gap-2 text-[14px] ${o.disabled ? "text-[#d6d8d7]" : "text-rk-text"}`}
              >
                <span className={o.disabled ? "opacity-40" : ""}>
                  <Radio on={scope === o.key && !o.disabled} />
                </span>
                <span>
                  {o.label}
                  {o.count && <span className={o.disabled ? "" : "text-rk-muted"}> {o.count}</span>}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-[12px] border-t border-rk-border pt-[11px]">
            <label className="flex h-7 items-center gap-2 text-[14px] text-rk-text">
              <Check checked={keep} onChange={() => setKeep((k) => !k)} label="Keep grouping" />
              Keep grouping
            </label>
          </div>
          <div className="mt-[11px] flex gap-2">
            {formats.map((f, i) => (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  download(scope === "selected" ? picked : rows, f.key, currency, rate);
                  close();
                }}
                className={`h-7 rounded-md px-2 text-[14px] ${
                  i === 0 ? "bg-rk-btn-dark font-semibold text-white hover:bg-[#2b2e38]" : "border border-[#d6d7db] bg-white text-rk-text-2 hover:bg-rk-hover"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </>
      )}
    </Drop>
  );
}

function ManageColumns({
  cols,
  setCols,
  reset,
  currency,
}: {
  cols: KmtColumn[];
  setCols: (c: KmtColumn[]) => void;
  reset: (() => void) | null;
  currency: Currency;
}) {
  return (
    <Drop
      className="ml-2"
      panelStyle={{ top: "calc(100% + 6px)", right: 0, width: 221 }}
      panelClassName="pt-[9px] pb-2 text-left font-normal"
      trigger={({ open, toggle }) => (
        <Tip tip="Manage columns" width={138} gap={11} bleed>
          <button
            type="button"
            aria-label="Manage columns"
            onClick={toggle}
            className={`flex h-7 w-7 items-center justify-center rounded-md border border-[#d6d7db] text-rk-text-2 hover:bg-rk-hover ${open ? "bg-rk-hover" : "bg-[#f8f8f9]"}`}
          >
            <GearIcon width={20} height={20} />
          </button>
        </Tip>
      )}
    >
      {() => (
        <>
          <div className="px-2 text-[14px] leading-5 font-semibold">Columns</div>
          <button type="button" disabled={!reset} onClick={() => reset?.()} className="mt-3 block px-2 text-[14px] leading-5 text-rk-link disabled:text-[#a9c0f0]">
            Reset to default
          </button>
          <div className="mt-[6px]">
            {kmtColumns.map((c) => {
              const locked = c.locked || lockedCols.includes(c.key as KmtColumn);
              const on = locked || cols.includes(c.key as KmtColumn);
              const label = c.key === "cpc" ? `CPC (${currency})` : c.label;
              return (
                <label key={c.key} className={`flex h-8 items-center gap-2 px-2 text-[14px] ${locked ? "text-rk-faint" : "cursor-pointer text-rk-text hover:bg-rk-bg"}`}>
                  <Check
                    checked={on}
                    disabled={locked}
                    label={label}
                    onChange={() => setCols(on ? cols.filter((k) => k !== c.key) : [...cols, c.key as KmtColumn])}
                  />
                  {label}
                </label>
              );
            })}
          </div>
        </>
      )}
    </Drop>
  );
}

export function KmtTable({
  rows,
  stats,
  relevance,
  plus,
  wide,
  loading = false,
  currency = "USD",
  groupSelected = false,
  onQuick,
}: {
  rows: KwRow[];
  stats: Stats;
  relevance: boolean;
  plus: boolean;
  wide: boolean;
  loading?: boolean;
  currency?: Currency;
  groupSelected?: boolean;
  onQuick?: (r: KwRow) => void;
}) {
  const rate = currencies.find((c) => c.code === currency)?.rate ?? 1;
  const [userCols, setUserCols] = useState<KmtColumn[] | null>(null);
  const [sel, setSel] = useState<string[]>([]);
  const defaults = wide ? wideCols : narrowCols;
  const cols = [...(userCols ?? defaults), ...(wide ? lockedCols : [])].filter((c, i, a) => a.indexOf(c) === i);
  const order = kmtColumns.map((c) => c.key);
  cols.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const picked = rows.filter((r) => sel.includes(r.keyword));
  const all = sel.length > 0 && sel.length === rows.length;
  const toggle = (k: string) => setSel((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));
  const width: Record<KmtColumn, string> = {
    intent: "w-[52px]",
    trend: "w-[90px]",
    kd: "w-[81px]",
    cpc: "w-[84px]",
    density: "w-[96px]",
    sf: wide ? "w-[72px]" : "w-[80px]",
    results: wide ? "w-[100px]" : "w-[122px]",
    updated: "w-[127px]",
  };
  const span = 3 + cols.length + (relevance ? 1 : 0);
  const pickedVolume = picked.reduce((a, r) => a + (parseInt(fullVolume(r.volume).replace(/,/g, ""), 10) || 0), 0);
  const pickedKd = picked.length ? Math.round(picked.reduce((a, r) => a + (r.kd ?? 0), 0) / picked.length) : 0;
  return (
    <div className="relative min-w-0 flex-1">
      {loading && (
        <svg viewBox="0 0 50 50" width={50} height={50} role="progressbar" aria-label="Loading" className="absolute top-[255px] left-[calc(50%-35px)] z-10 animate-spin text-[#d1d3d8]">
          <path d="M25 3a22 22 0 1 0 22 22" fill="none" stroke="currentColor" strokeWidth={5} strokeLinecap="round" />
        </svg>
      )}
      <table className="w-full table-fixed border-collapse text-[14px]">
        <colgroup>
          <col className="w-[44px]" />
          <col />
          {cols.includes("intent") && <col className={width.intent} />}
          {relevance && <col className="w-[95px]" />}
          <col className="w-[120px]" />
          {cols
            .filter((c) => c !== "intent")
            .map((c) => (
              <col key={c} className={width[c]} />
            ))}
        </colgroup>
        <thead className="sticky top-0 z-20 bg-white">
          <tr>
            <th colSpan={span} className="h-[43px] border-b border-rk-border px-5 text-left font-normal">
              <div className="flex items-center">
                {picked.length ? (
                  <>
                    <span>
                      Total Volume: <b>{pickedVolume.toLocaleString("en-US")}</b>
                    </span>
                    <span className="ml-3">
                      Average KD: <b>{pickedKd}%</b>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      All keywords: <b>{wide && stats.total ? stats.total : stats.all}</b>
                    </span>
                    <span className="ml-3">
                      Total Volume: <b>{stats.volume}</b>
                    </span>
                    <span className="ml-3">
                      Average KD: <b>{stats.kd}</b>
                    </span>
                  </>
                )}
                <SendKeywords count={picked.length} />
                {wide ? (
                  <>
                    <button
                      type="button"
                      disabled
                      className="ml-2 flex h-7 items-center gap-[6px] rounded-md border border-[#d6d7db] bg-[#f8f8f9] pr-[7px] pl-[5px] text-[14px] font-normal text-[#85878f]"
                    >
                      <RefreshIcon width={18} height={18} className="text-rk-text-2" />
                      Update
                      <span className="ml-1 rounded-full border border-[#d6d7db] px-[6px] text-[12px] leading-[16px]">0/1,000</span>
                    </button>
                    <ManageColumns cols={cols} setCols={setUserCols} reset={userCols ? () => setUserCols(null) : null} currency={currency} />
                  </>
                ) : null}
                <ExportDrop
                  total={stats.total ?? stats.all}
                  rows={rows}
                  picked={picked}
                  groupSelected={groupSelected}
                  currency={currency}
                  rate={rate}
                  wide={wide}
                />
              </div>
            </th>
          </tr>
          <tr className="border-b border-rk-border bg-[#f9f9f9]">
            <Th className="w-[44px] pl-5 text-left">
              <Check
                checked={all}
                indeterminate={picked.length > 0 && !all}
                label="Select all"
                onChange={() => setSel(picked.length ? [] : rows.map((r) => r.keyword))}
              />
            </Th>
            <Th className="pl-2 text-left">Keyword</Th>
            {cols.includes("intent") && <Th className={`text-left ${wide ? "pl-[10px]" : "pl-2"}`}>Intent</Th>}
            {relevance && (
              <Th className="pr-2 pl-[9px] text-left" sorted>
                Relevance
              </Th>
            )}
            <Th className="pr-2 text-right" sorted={!relevance}>
              Volume
            </Th>
            {cols.includes("trend") && <Th className="pl-4 text-left">Trend</Th>}
            {cols.includes("kd") && <Th className="pr-[9px] text-right">KD %</Th>}
            {cols.includes("cpc") && <Th className="pr-2 text-right">CPC ({currency})</Th>}
            {cols.includes("density") && <Th className="pr-2 text-right">Com.</Th>}
            {cols.includes("sf") && <Th className={`text-left ${wide ? "pl-3" : "pl-[22px]"}`}>SF</Th>}
            {cols.includes("results") && <Th className="pr-5 text-right">Results</Th>}
            {cols.includes("updated") && <Th className="pr-5 text-right">Updated</Th>}
          </tr>
          {picked.length > 0 && (
            <tr className="border-b border-rk-border bg-[#f9f9f9]">
              <th colSpan={span} className="h-[44px] px-5 text-left text-[14px] font-normal">
                <span className="text-rk-text-2">
                  Selected: <b className="font-semibold text-rk-text">{picked.length}</b>
                </span>
                <button type="button" onClick={() => setSel([])} className="ml-[34px] text-rk-link hover:underline">
                  Deselect all
                </button>
                <button type="button" onClick={() => navigator.clipboard?.writeText(picked.map((r) => r.keyword).join("\n")).catch(() => {})} className="ml-6 text-rk-link hover:underline">
                  Copy
                </button>
              </th>
            </tr>
          )}
        </thead>
        <tbody className={loading ? "pointer-events-none opacity-30" : ""}>
          {rows.map((row) => (
            <Row
              key={row.keyword}
              row={row}
              relevance={relevance}
              plus={plus}
              cols={cols}
              wide={wide}
              selected={sel.includes(row.keyword)}
              toggle={() => toggle(row.keyword)}
              rate={rate}
              onQuick={onQuick}
            />
          ))}
        </tbody>
      </table>
      <Pagination pages={stats.pages} />
    </div>
  );
}

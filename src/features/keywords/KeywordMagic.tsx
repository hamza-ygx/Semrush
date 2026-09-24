"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { LinkSelect, MenuItem, Popover } from "@/components/ui/Popover";
import { ChevronRight, ChevronsLeft, ClockIcon, ExportIcon, FlagSE } from "@/components/ui/icons";
import { CirclePlus, EyeIcon, IntentBadges, KdDot, KwHeader, OnboardingTip, SegButtons, SendIcon, SerpIcon, SfIcon, SortIcon, SparkleIcon } from "./common";
import { allGroups, groupRows, kmStats, questionGroups, questionRows, topicRows, topics, type KwRow } from "./data";

type Mode = "topics" | "groups";
type Type = "all" | "questions";

const inputCls = "h-7 w-full border border-rk-border-strong bg-white px-2 text-[14px] outline-none placeholder:text-rk-faint focus:border-[#7a86f2]";

function RangeInputs({ className = "w-[134px]" }: { className?: string }) {
  return (
    <div className={`flex ${className}`}>
      <input placeholder="From" className={`${inputCls} rounded-l-md`} />
      <input placeholder="To" className={`${inputCls} -ml-px rounded-r-md`} />
    </div>
  );
}

function PanelButtons({ close, clear = "Clear all fields" }: { close: () => void; clear?: string }) {
  return (
    <div className="mt-[10px] flex gap-2">
      <button type="button" onClick={close} className="h-7 rounded-md bg-rk-btn-dark px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
        Apply
      </button>
      <button type="button" onClick={close} className="h-7 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
        {clear}
      </button>
    </div>
  );
}

function FilterDrop({ label, children, align = "left", panel = "w-[240px]" }: { label: string; children: (close: () => void) => ReactNode; align?: "left" | "right"; panel?: string }) {
  return (
    <Popover
      align={align}
      offset={6}
      panelClassName={`px-4 pt-3 pb-4 ${panel}`}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex h-7 items-center gap-[7.5px] rounded-md border bg-white px-2 text-[14px] text-rk-muted ${open ? "border-[#9ea6f5]" : "border-rk-border hover:border-rk-border-strong"}`}
        >
          {label}
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {children}
    </Popover>
  );
}

function OptionList({ items, close }: { items: string[]; close: () => void }) {
  return (
    <div className="-mx-4 -mt-2 mb-1">
      {items.map((i) => (
        <MenuItem key={i} onClick={close} className="px-4">
          {i}
        </MenuItem>
      ))}
    </div>
  );
}

function Filters() {
  return (
    <div className="flex items-center gap-2">
      <FilterDrop label="Volume">
        {(close) => (
          <>
            <OptionList close={close} items={["100,001+", "10,001-100,000", "1,001-10,000", "101-1,000", "11-100", "1-10"]} />
            <div className="text-[14px] font-semibold">Custom range</div>
            <RangeInputs className="mt-2 w-full" />
            <PanelButtons close={close} clear="Clear" />
          </>
        )}
      </FilterDrop>
      <FilterDrop label="KD %">
        {(close) => (
          <>
            <OptionList close={close} items={["Very hard 85-100%", "Hard 70-84%", "Difficult 50-69%", "Possible 30-49%", "Easy 15-29%", "Very easy 0-14%"]} />
            <div className="text-[14px] font-semibold">Custom range</div>
            <RangeInputs className="mt-2 w-full" />
            <PanelButtons close={close} clear="Clear" />
          </>
        )}
      </FilterDrop>
      <FilterDrop label="Intent" panel="w-[200px]">
        {(close) => (
          <>
            {["Informational", "Navigational", "Commercial", "Transactional"].map((i) => (
              <label key={i} className="flex h-7 items-center gap-2 text-[14px]">
                <input type="checkbox" className="h-4 w-4 accent-[#6167e6]" />
                {i}
              </label>
            ))}
            <PanelButtons close={close} clear="Clear" />
          </>
        )}
      </FilterDrop>
      <FilterDrop label="CPC (USD)">
        {(close) => (
          <>
            <div className="text-[14px] font-semibold">Custom range</div>
            <RangeInputs className="mt-2 w-full" />
            <PanelButtons close={close} clear="Clear" />
          </>
        )}
      </FilterDrop>
      <FilterDrop label="Include keywords" panel="w-[300px]">
        {(close) => (
          <>
            <div className="flex gap-4 text-[14px]">
              <label className="flex items-center gap-1">
                <input type="radio" name="inc" defaultChecked className="accent-[#6167e6]" /> Any keywords
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="inc" className="accent-[#6167e6]" /> All keywords
              </label>
            </div>
            <textarea placeholder="Add keywords by comma or new line" className="mt-2 h-20 w-full resize-none rounded-md border border-rk-border-strong p-2 text-[14px] outline-none placeholder:text-rk-faint" />
            <PanelButtons close={close} clear="Clear" />
          </>
        )}
      </FilterDrop>
      <FilterDrop label="Exclude keywords" panel="w-[300px]">
        {(close) => (
          <>
            <textarea placeholder="Add keywords by comma or new line" className="h-20 w-full resize-none rounded-md border border-rk-border-strong p-2 text-[14px] outline-none placeholder:text-rk-faint" />
            <PanelButtons close={close} clear="Clear" />
          </>
        )}
      </FilterDrop>
      <Popover
        align="right"
        offset={6}
        panelClassName="w-[592px] px-4 pt-4 pb-[18px]"
        trigger={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className={`flex h-7 items-center gap-[7.5px] rounded-md border bg-white px-2 text-[14px] text-rk-muted ${open ? "border-[#9ea6f5]" : "border-rk-border hover:border-rk-border-strong"}`}
          >
            Advanced filters
            <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text">
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      >
        {(close) => (
          <>
            <div className="flex gap-2">
              {["Word count", "Competitive Density"].map((l) => (
                <div key={l}>
                  <div className="text-[14px] leading-5">{l}</div>
                  <RangeInputs className="mt-[6px] w-[134px]" />
                </div>
              ))}
              <div>
                <div className="text-[14px] leading-5">SERP Features</div>
                <button type="button" className="mt-[6px] flex h-7 w-[134px] items-center justify-between rounded-md border border-rk-border-strong bg-white px-2 text-[14px] text-rk-faint">
                  Any
                  <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text">
                    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div>
                <div className="text-[14px] leading-5">Results in SERP</div>
                <RangeInputs className="mt-[6px] w-[134px]" />
              </div>
            </div>
            <PanelButtons close={close} />
          </>
        )}
      </Popover>
    </div>
  );
}

function Toolbar({ type, setType }: { type: Type; setType: (t: Type) => void }) {
  const [match, setMatch] = useState("all");
  return (
    <div className="px-8 pt-4">
      <div className="flex items-center gap-2">
        <SegButtons
          items={[
            { value: "all", label: "All" },
            { value: "questions", label: "Questions" },
          ]}
          value={type}
          onChange={setType}
        />
        <SegButtons
          items={[
            { value: "all", label: "All Keywords" },
            { value: "broad", label: "Broad Match" },
            { value: "phrase", label: "Phrase Match" },
            { value: "exact", label: "Exact Match" },
            { value: "related", label: "Related" },
          ]}
          value={match}
          onChange={setMatch}
        />
        <LangSelect />
      </div>
      <label className="mt-3 flex h-7 w-[274px] items-center gap-2 rounded-md border border-[#d7c5fb] bg-white px-2">
        <SparkleIcon />
        <input placeholder="Enter domain for personalized data" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-rk-muted" />
      </label>
      <div className="mt-3">
        <Filters />
      </div>
    </div>
  );
}

function LangSelect() {
  return (
    <Popover
      panelClassName="w-[180px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex h-7 items-center gap-[10px] rounded-md border border-rk-border bg-white px-2 text-[14px] text-rk-muted">
          Languages
          <svg viewBox="0 0 16 16" width={16} height={16} className="text-rk-text">
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) =>
        ["Swedish", "English", "Finnish", "Norwegian", "Danish"].map((l) => (
          <MenuItem key={l} onClick={close}>
            {l}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function Sidebar({ mode, setMode, type, onTip }: { mode: Mode; setMode: (m: Mode) => void; type: Type; onTip: ReactNode }) {
  const [sel, setSel] = useState(0);
  const groups = type === "questions" ? questionGroups : allGroups;
  const total = type === "questions" ? kmStats.questions.total : kmStats.groups.total;
  return (
    <div className="sticky top-0 z-30 flex h-screen w-[240px] shrink-0 flex-col self-start border-r border-rk-border bg-white">
      <div className="relative flex h-11 shrink-0 items-center px-3">
        <SegButtons
          items={[
            {
              value: "topics",
              label: (
                <span className="flex items-center gap-[6px]">
                  Topics
                  <span className="rounded-full bg-[#009f81] px-[5px] text-[11px] leading-[14px] font-semibold text-white">new</span>
                </span>
              ),
            },
            { value: "groups", label: "Groups" },
          ]}
          value={mode}
          onChange={(m) => {
            setMode(m);
            setSel(0);
          }}
        />
        {onTip}
      </div>
      {mode === "topics" ? (
        <div className="flex h-[42px] shrink-0 items-center justify-between border-y border-rk-border px-3 text-[13px] text-rk-muted">
          <span>Topic</span>
          <span>Keywords</span>
        </div>
      ) : (
        <div className="flex h-[42px] shrink-0 items-center border-y border-rk-border px-3 text-[14px] text-rk-muted">
          Sort by
          <LinkSelect value="keywords" options={["keywords", "volume"] as const} className="ml-1" />
        </div>
      )}
      <div className="kmt-scroll min-h-0 flex-1 overflow-y-scroll" style={{ scrollbarWidth: "thin", scrollbarColor: "#c4c7cf transparent" }}>
        {mode === "topics"
          ? topics.map((t, i) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setSel(i)}
                className={`flex w-full items-start justify-between gap-3 pt-3 pb-3 pr-[3px] pl-3 text-left font-[Arial,sans-serif] text-[14px] leading-5 ${sel === i ? "bg-[#e8eaee]" : "hover:bg-rk-bg"}`}
              >
                <span className="max-w-[176px]">{i === 0 && type === "questions" ? "All" : t.label}</span>
                <span className="shrink-0">{i === 0 && type === "questions" ? kmStats.questions.total : t.count}</span>
              </button>
            ))
          : [{ label: "All keywords", count: total }, ...groups].map((gr, i) => (
              <button
                key={gr.label}
                type="button"
                onClick={() => setSel(i)}
                className={`flex h-11 w-full items-center gap-[6px] pr-1 pl-3 text-left text-[14px] ${sel === i ? "bg-[#e8eaee]" : "hover:bg-rk-bg"}`}
              >
                {i > 0 && <ChevronRight className="mr-[2px] text-rk-muted" width={14} height={14} />}
                <span className="flex-1">{gr.label}</span>
                <span>{gr.count}</span>
                {i > 0 && <EyeIcon className="text-rk-muted" />}
              </button>
            ))}
      </div>
    </div>
  );
}

function Checkbox() {
  return <input type="checkbox" className="h-4 w-4 appearance-none rounded-[4px] border border-[#d1d3da] bg-white align-middle checked:border-[#6167e6] checked:bg-[#6167e6]" />;
}

function Row({ row, relevance, plus }: { row: KwRow; relevance: boolean; plus: boolean }) {
  const noData = row.kd == null && row.sf == null;
  return (
    <tr className="border-b border-rk-border hover:bg-[#f7f8fa]">
      <td className="w-[44px] pl-5 align-top">
        <div className="pt-3">
          <Checkbox />
        </div>
      </td>
      <td className="pt-3 pb-[11px] pr-4 pl-2 align-top leading-5">
        <span className="flex items-start gap-1">
          {row.added || plus ? <CirclePlus className="mt-[2px] shrink-0 text-rk-faint" /> : <span className="mt-[2px] h-4 w-4 shrink-0 rounded-full bg-[#e8e9ed]" />}
          <span>
            <Link href={`${routes.keywordOverview}?q=${encodeURIComponent(row.keyword)}&db=se`} className="text-rk-link hover:underline">
              {row.keyword}
            </Link>
            <SerpIcon className="ml-[6px] inline-block align-[-2px] text-rk-muted" width={14} height={14} />
          </span>
        </span>
      </td>
      <td className="pt-3 pb-[11px] text-center align-top leading-5">
        <IntentBadges intents={row.intents} />
      </td>
      {relevance && <td className="pt-3 pb-[11px] pr-2 text-right align-top leading-5">{row.relevance}</td>}
      <td className="pt-3 pb-[11px] pr-2 text-right align-top leading-5">{row.volume}</td>
      <td className="pt-3 pb-[11px] align-top leading-5">
        <span className="flex items-center justify-end gap-2 pr-[9px]">
          {row.kd ?? <span className="text-rk-muted">n/a</span>}
          <KdDot kd={row.kd} />
        </span>
      </td>
      <td className="pt-3 pb-[11px] pr-2 text-right align-top leading-5">{row.cpc}</td>
      <td className="overflow-hidden pt-3 pb-[11px] pl-[9px] align-top leading-5 whitespace-nowrap">
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
            <span className="text-rk-text-2 underline decoration-rk-faint decoration-dotted underline-offset-4">{row.sf}</span>
          </span>
        )}
      </td>
      <td className="pt-3 pb-[11px] pr-5 text-right align-top leading-5">{noData ? "n/a" : `${(((row.keyword.length * 37) % 90) / 10 + 0.4).toFixed(1)}M`}</td>
    </tr>
  );
}

function Th({ children, className = "", sorted }: { children?: ReactNode; className?: string; sorted?: boolean }) {
  return (
    <th className={`h-[42px] text-[13px] font-normal text-rk-text-2 ${sorted ? "bg-[#f0f0f3]" : ""} ${className}`}>
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

export function KeywordMagic({ q, initialMode, initialType }: { q: string; initialMode: Mode; initialType: Type }) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [type, setTypeState] = useState<Type>(initialType);
  const [tip, setTip] = useState(initialMode === "topics");

  const sync = (m: Mode, t: Type) => {
    const u = new URL(window.location.href);
    u.searchParams.set("mode", m === "topics" ? "0" : "1");
    if (t === "questions") u.searchParams.set("questions", "true");
    else u.searchParams.delete("questions");
    window.history.replaceState(null, "", u.toString());
  };
  const setMode = (m: Mode) => {
    setModeState(m);
    if (m === "groups") setTip(false);
    sync(m, type);
  };
  const setType = (t: Type) => {
    setTypeState(t);
    sync(mode, t);
  };

  const rows = type === "questions" ? questionRows : mode === "topics" ? topicRows : groupRows;
  const stats = type === "questions" ? kmStats.questions : mode === "topics" ? kmStats.topics : kmStats.groups;
  const relevance = mode === "topics" && type === "all";

  return (
    <>
      <KwHeader
        tool="Keyword Magic Tool"
        subject={q}
        right={
          <Link href="#" className="flex items-center gap-[5px] hover:text-rk-link-hover">
            Send feedback
          </Link>
        }
        titleRight={
          <button type="button" className="flex h-[29px] items-center gap-2 rounded-md border border-rk-border-strong bg-[#f4f5f9] px-3 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ClockIcon />
            Search history
          </button>
        }
        meta={
          <>
            <span className="flex items-center gap-1">
              Database:
              <LinkSelect value="Sweden" options={["Sweden", "United States", "United Kingdom"] as const} icon={<FlagSE width={16} height={12} />} />
            </span>
            <span className="flex items-center gap-1">
              Currency:
              <LinkSelect value="USD" options={["USD", "EUR", "SEK"] as const} />
            </span>
          </>
        }
      />
      <Toolbar type={type} setType={setType} />
      <div className="mx-8 mt-4 flex rounded-lg bg-white shadow-card">
        <Sidebar
          mode={mode}
          setMode={setMode}
          type={type}
          onTip={
            tip && (
              <>
                <span className="absolute top-[28px] left-[103px] z-40 h-[10px] w-[10px] rounded-full bg-[#c9adfb] ring-4 ring-[#c9adfb]/40" />
                <OnboardingTip
                  className="top-[48px] left-[100px] w-[360px] gap-[18px]"
                  title="Explore keyword topics"
                  onClose={() => setTip(false)}
                  actions={
                    <button type="button" onClick={() => setTip(false)} className="h-7 rounded-md bg-white px-[9px] text-[14px] text-rk-text hover:bg-[#f4f5f9]">
                      Got it
                    </button>
                  }
                >
                  Smart grouping by topic helps discover new ideas and speed up your research.
                </OnboardingTip>
              </>
            )
          }
        />
        <div className="min-w-0 flex-1">
          <table className="w-full table-fixed border-collapse text-[14px]">
            <colgroup>
              <col className="w-[44px]" />
              <col />
              <col className="w-[52px]" />
              {relevance && <col className="w-[95px]" />}
              <col className="w-[120px]" />
              <col className="w-[81px]" />
              <col className="w-[84px]" />
              <col className="w-[80px]" />
              <col className="w-[122px]" />
            </colgroup>
            <thead className="sticky top-0 z-20 bg-white">
              <tr>
                <th colSpan={relevance ? 9 : 8} className="h-[43px] border-b border-rk-border px-5 text-left font-normal">
                  <div className="flex items-center">
                    <span>
                      All keywords: <b>{stats.all}</b>
                    </span>
                    <span className="ml-3">
                      Total Volume: <b>{stats.volume}</b>
                    </span>
                    <span className="ml-3">
                      Average KD: <b>{stats.kd}</b>
                    </span>
                    <button type="button" className="ml-auto flex h-7 items-center gap-2 rounded-md bg-rk-btn-dark px-2 font-semibold text-white hover:bg-[#2b2e38]">
                      <SendIcon />
                      Send keywords
                    </button>
                    <button type="button" className="ml-3 flex h-7 items-center gap-[6px] rounded-md border border-rk-border-strong bg-[#f4f5f9] px-[14px] text-rk-text-2 hover:bg-rk-hover">
                      <ExportIcon />
                      Export
                    </button>
                  </div>
                </th>
              </tr>
              <tr className="border-b border-rk-border">
                <Th className="w-[44px] pl-5 text-left">
                  <Checkbox />
                </Th>
                <Th className="pl-2 text-left">Keyword</Th>
                <Th className="w-[52px]">Intent</Th>
                {relevance && (
                  <Th className="w-[95px] pr-2 pl-[9px] text-left" sorted>
                    Relevance
                  </Th>
                )}
                {relevance ? (
                  <Th className="w-[120px] pr-2 text-right">Volume</Th>
                ) : (
                  <Th className="w-[120px] pr-2 text-right" sorted>
                    Volume
                  </Th>
                )}
                <Th className="w-[81px] pr-[9px] text-right">KD %</Th>
                <Th className="w-[84px] pr-2 text-right">CPC (USD)</Th>
                <Th className="w-[80px] pl-[22px] text-left">SF</Th>
                <Th className="w-[122px] pr-5 text-right">Results</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <Row key={row.keyword} row={row} relevance={relevance} plus={mode === "topics" || type === "questions"} />
              ))}
            </tbody>
          </table>
          <Pagination pages={stats.pages} />
        </div>
      </div>
    </>
  );
}

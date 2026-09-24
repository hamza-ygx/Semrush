"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/ui/primitives";
import { LinkSelect, MenuItem, Popover } from "@/components/ui/Popover";
import { BookIcon, ChevronDown, DesktopIcon, ExportIcon, FlagSE, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { D1, D2, Dot, DomainField, ScopeSelect, Segmented, SelectButton, YouTag } from "./common";
import { kgOther, kgShared, kgTabs, rival, you, type KgRow, type KgTab } from "./data";
import { KeywordOverlap, TopOpportunities } from "./Opportunities";

const colors = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];

export function useStuck<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => {
      if (ref.current) setStuck(ref.current.getBoundingClientRect().top <= 0.5);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return [ref, stuck] as const;
}

export function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex items-center gap-[5px] text-[14px] text-rk-text-2">
      {label}
      {children}
    </span>
  );
}

function FilterBar() {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter by keyword"
          className="h-7 w-[178px] rounded-l-md border border-[#dfe2e2] bg-white px-2 text-[14px] outline-none placeholder:text-[#8a8e9b] focus:border-[#7a86f2]"
        />
        <button type="button" aria-label="Search" className="-ml-px flex h-7 w-[33px] items-center justify-center rounded-r-md border border-[#dfe2e2] bg-[#e9ebeb] text-rk-text-2 hover:bg-rk-hover">
          <SearchIcon width={15} height={15} />
        </button>
      </div>
      <SelectButton value="Position" options={["Position", "Top 3", "Top 10", "Top 20", "Top 100"]} className="w-[94px]" />
      <SelectButton value="Volume" options={["Volume", "10,001+", "1,001-10,000", "101-1,000", "11-100", "1-10"]} className="w-[91px]" />
      <SelectButton value="KD" options={["KD", "Very hard", "Hard", "Difficult", "Possible", "Easy", "Very easy"]} className="w-[61px]" />
      <SelectButton value="Intent" options={["Intent", "Informational", "Navigational", "Commercial", "Transactional"]} className="w-[79px]" />
      <SelectButton value="Advanced filters" options={["Advanced filters", "Include keywords", "Exclude keywords", "CPC", "Competition"]} className="w-[151px]" />
    </div>
  );
}

const intentTone: Record<string, string> = {
  C: "bg-[#fce081] text-[#8c5a00]",
  I: "bg-[#c4e5fe] text-[#0a5ac2]",
  N: "bg-[#e2dcff] text-[#5a50c8]",
  T: "bg-[#9ef2c9] text-[#006c52]",
};

const kdColor = (kd: number) => (kd < 15 ? "#009f81" : kd < 30 ? "#3fe0b0" : kd < 50 ? "#fdc23c" : "#ff8e29");

function KeywordTable() {
  const [tab, setTab] = useState<KgTab>("shared");
  const [sel, setSel] = useState<Set<string>>(new Set());
  const rows: KgRow[] = tab === "shared" ? kgShared : kgOther[tab];
  const all = rows.length > 0 && rows.every((r) => sel.has(r.keyword));
  const toggle = (k: string) =>
    setSel((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  const box = (on: boolean, onClick: () => void) => (
    <button
      type="button"
      onClick={onClick}
      aria-label="Select"
      className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${on ? "border-[#2359d6] bg-[#2359d6]" : "border-[#d6d8dd] bg-white"}`}
    >
      {on && (
        <svg viewBox="0 0 16 16" width={12} height={12}>
          <path d="m3.5 8.5 3 3 6-6.5" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
  return (
    <div className="rounded-lg bg-white pb-5 shadow-card">
      <div className="flex h-[44px] items-center gap-2 border-b border-[#e8e9ec] px-5">
        <h3 className="text-[16px] leading-6 font-bold">All keyword details for:</h3>
        <Popover
          panelClassName="min-w-[140px]"
          trigger={({ toggle: t }) => (
            <button type="button" onClick={t} className="flex h-7 items-center gap-[6px] rounded-md border border-[#dfe2e2] bg-white px-2 text-[14px]">
              {you}
              <ChevronDown width={14} height={14} strokeWidth={2.4} />
            </button>
          )}
        >
          {(close) =>
            [you, rival].map((d) => (
              <MenuItem key={d} active={d === you} onClick={close}>
                {d}
              </MenuItem>
            ))
          }
        </Popover>
        <YouTag />
      </div>
      <div className="flex h-[68px] items-center justify-between px-5">
        <Segmented
          items={kgTabs.map((t) => ({
            key: t.key,
            label: (
              <>
                {t.label}
                <span className="ml-[2px] text-rk-muted">{t.count}</span>
              </>
            ),
          }))}
          value={tab}
          onChange={setTab}
        />
        <div className="flex items-center gap-2">
          <button type="button" className="flex h-7 items-center gap-2 rounded-md bg-[#191b1c] px-[10px] text-[14px] font-medium text-white hover:bg-[#2b2e38]">
            <PlusIcon width={14} height={14} strokeWidth={2} />
            Add to list
          </button>
          <button type="button" aria-label="Export" className="flex h-7 w-7 items-center justify-center rounded-md border border-[#dfe2e2] bg-white text-rk-text-2 hover:bg-rk-bg">
            <ExportIcon />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1063px] table-fixed text-[14px]">
          <colgroup>
            <col style={{ width: 56 }} />
            <col style={{ width: 226 }} />
            <col style={{ width: 70 }} />
            <col style={{ width: 120 }} />
            <col style={{ width: 120 }} />
            <col style={{ width: 120 }} />
            <col style={{ width: 84 }} />
            <col style={{ width: 103 }} />
            <col style={{ width: 74 }} />
            <col style={{ width: 90 }} />
          </colgroup>
          <thead>
            <tr className="h-[41px] border-b border-[#e8e9ec] bg-[#f7f8f8] text-[12px] font-normal text-rk-text-2">
              <th className="pl-4 font-normal">{box(all, () => setSel(all ? new Set() : new Set(rows.map((r) => r.keyword))))}</th>
              <th className="text-left font-normal">Keyword</th>
              <th className="pr-[28px] text-right font-normal">Intent</th>
              <th className="pl-2 text-left font-normal">
                <span className="flex items-center gap-[5px]">
                  <Dot color={D1} size={11} />
                  {you}
                </span>
              </th>
              <th className="pl-2 text-left font-normal">
                <span className="flex items-center gap-[5px]">
                  <Dot color={D2} size={11} />
                  {rival}
                </span>
              </th>
              <th className="bg-[#e8e9ea] pr-4 text-right font-normal">
                <span className="inline-flex items-center gap-[5px]">
                  Volume
                  <svg viewBox="0 0 16 16" width={14} height={14}>
                    <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" stroke="#6c6e79" strokeWidth={1.5} strokeLinecap="round" />
                  </svg>
                </span>
              </th>
              <th className="pr-[11px] text-right font-normal">KD%</th>
              <th className="pr-3 text-right font-normal">CPC</th>
              <th className="pr-[11px] text-right font-normal">Com.</th>
              <th className="pr-[9px] text-right font-normal">Results</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const aBest = r.a > 0 && (r.b === 0 || r.a < r.b);
              const bBest = r.b > 0 && (r.a === 0 || r.b < r.a);
              return (
                <tr key={r.keyword} className="border-b border-[#ecedf0] align-top">
                  <td className="pt-[14px] pl-4">{box(sel.has(r.keyword), () => toggle(r.keyword))}</td>
                  <td className="py-[12px] pr-2">
                    <span className="flex items-start gap-[5px]">
                      <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[2px] shrink-0 text-[#a9abb6]">
                        <circle cx="8" cy="8" r="6.3" fill="none" stroke="currentColor" strokeWidth={1.3} />
                        <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth={1.3} />
                      </svg>
                      <span className="break-all">
                        <Link href={routes.keywordOverview} className="text-rk-link hover:text-rk-link-hover">
                          {r.keyword}
                        </Link>{" "}
                        <svg viewBox="0 0 16 16" width={16} height={16} className="inline-block align-[-3px] text-[#a9abb6]">
                          <path d="M2.5 3h11v10h-11zM2.5 7h11" fill="none" stroke="currentColor" strokeWidth={1.4} />
                        </svg>
                      </span>
                    </span>
                  </td>
                  <td className="pt-[12px] pr-[25px] text-right">
                    {r.intent.map((i) => (
                      <span key={i} className={`inline-flex h-[18px] w-[17px] items-center justify-center rounded-[4px] text-[11px] font-semibold ${intentTone[i]}`}>
                        {i}
                      </span>
                    ))}
                  </td>
                  <td className={`py-[12px] pr-3 text-right ${aBest ? "bg-[#dcfdf8]" : ""}`}>{r.a || "–"}</td>
                  <td className={`py-[12px] pr-2 text-right ${bBest ? "bg-[#dcfdf8]" : ""}`}>{r.b || "–"}</td>
                  <td className="py-[12px] pr-2 text-right">{r.volume}</td>
                  <td className="py-[12px] pr-[11px] text-right">
                    <span className="inline-flex items-center gap-[6px]">
                      {r.kd}
                      <Dot color={kdColor(r.kd)} size={12} />
                    </span>
                  </td>
                  <td className="py-[12px] pr-3 text-right">{r.cpc}</td>
                  <td className="py-[12px] pr-[11px] text-right">{r.com}</td>
                  <td className="py-[12px] pr-[9px] text-right">{r.results}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function KeywordGapReport({ q, competitors }: { q: string; competitors: string[] }) {
  const router = useRouter();
  const [domains, setDomains] = useState<string[]>(() => [q, ...competitors, "", "", ""].slice(0, 5));
  const [kwType, setKwType] = useState<"organic" | "paid" | "pla">("organic");
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  const [barRef, stuck] = useStuck<HTMLDivElement>();
  return (
    <div>
      <div className="border-b border-[#dfe2e2] px-8 pt-4 pb-[22px]">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: routes.home },
              { label: "SEO", href: routes.seoDashboard },
              { label: "Domain Overview", href: routes.domainOverview },
              { label: "Keyword Gap" },
            ]}
          />
          <div className="flex items-center gap-5">
            <HeaderLink icon={<BookIcon />}>User manual</HeaderLink>
            <SendFeedback />
          </div>
        </div>
        <div className="mt-[9px] flex items-start justify-between">
          <h1 className="text-[20px] leading-7 font-semibold">Keyword Gap</h1>
          <button type="button" className="flex h-7 items-center gap-[6px] rounded-md border border-[#d6d8d8] bg-[#e9ebeb] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
            <ExportIcon />
            Export to PDF
          </button>
        </div>
        <div className="mt-[7px] flex items-center gap-[26px]">
          <Meta label="Database:">
            <LinkSelect value="Sweden" options={["Sweden", "United States", "United Kingdom", "Norway", "Denmark"]} icon={<FlagSE />} />
          </Meta>
          <Meta label="Device:">
            <LinkSelect value="Desktop" options={["Desktop", "Mobile"]} icon={<DesktopIcon />} />
          </Meta>
          <Meta label="Date:">
            <LinkSelect value="Sep 23, 2026" options={["Sep 23, 2026", "Sep 15, 2026", "Aug 15, 2026"]} />
          </Meta>
          <Meta label="Currency:">
            <LinkSelect value="USD" options={["USD", "EUR", "SEK"]} />
          </Meta>
        </div>
      </div>

      <div className="px-8">
        <div className="pt-4">
          <div className="flex gap-2">
            {domains.map((d, i) => (
              <div key={i} className="w-[170px]">
                <ScopeSelect label="Root domain" lower className="mb-[7px]" />
                <DomainField value={d} onChange={(v) => set(i, v)} color={colors[i]} you={i === 0} className="h-[28px]!" />
              </div>
            ))}
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => {
                  const c = domains.slice(1).filter(Boolean);
                  router.push(`${routes.keywordGap}?q=${encodeURIComponent(domains[0] || you)}&compareWith=${encodeURIComponent((c.length ? c : [rival]).join(","))}`);
                }}
                className="h-7 rounded-md bg-[#191b1c] px-[13px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
              >
                Compare
              </button>
              <Link href={routes.keywordGap} className="flex h-7 items-center rounded-md border border-[#d6d8d8] bg-[#e9ebeb] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
                Cancel
              </Link>
            </div>
          </div>
          <div className="mt-[8px] flex items-center gap-2 pb-[14px]">
            <Segmented
              items={[
                { key: "organic", label: "Organic keywords" },
                { key: "paid", label: "Paid keywords" },
                { key: "pla", label: "PLA keywords" },
              ]}
              value={kwType}
              onChange={setKwType}
            />
            <button type="button" className="dotted-underline text-[14px] text-rk-muted decoration-[#a9abb6] hover:text-rk-text">
              Select keyword type for each domain
            </button>
          </div>
        </div>

        <div ref={barRef} className={`sticky top-0 z-30 bg-[#f3f5f5] py-4 ${stuck ? "border-b border-[#d4d6d9]" : "border-t border-[#dfe2e2]"}`}>
          <FilterBar />
        </div>

        <div className="mt-[3px] flex gap-4">
          <div className="w-[318px] shrink-0">
            <TopOpportunities variant="kg" height={394} />
          </div>
          <KeywordOverlap height={394} venn={{ cx: 156, cy: 214 }} legendLeft={388} legendRight={116} />
        </div>

        <div className="mt-4">
          <KeywordTable />
        </div>
      </div>
    </div>
  );
}

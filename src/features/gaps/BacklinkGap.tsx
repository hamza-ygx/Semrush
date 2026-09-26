"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/ui/primitives";
import { Popover } from "@/components/ui/Popover";
import { ChevronDown, ChevronRight, ChevronsLeft, CloseIcon, ExportIcon, ExternalIcon, PlusIcon } from "@/components/ui/icons";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { Info } from "@/components/ui/primitives";
import { useWide } from "@/features/keywords/kmt/ui";
import { Checkbox, D1, D2, Dot, DomainField, DomainPicker, OPEN_BORDER, Opt, ScopeSelect, Segmented, SelectButton, YouTag } from "./common";
import { bgAuthority, bgBacklinkFor, bgMonthLabels, bgRefDomains, bgRows, bgTabs, rival, you, type BgRow, type BgTab } from "./data";
import { useStuck } from "./KeywordGapReport";
import { TrendChart } from "./TrendChart";

const colors = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];

const ManualIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path
      d="M1 2.5h5.2c.8 0 1.4.4 1.8 1 .4-.6 1-1 1.8-1H15v11H9.8c-.8 0-1.4.3-1.8.9-.4-.6-1-.9-1.8-.9H1z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
    <path d="M8 3.5v10.5M3.5 6H6M3.5 8.5H6M10 6h2.5M10 8.5h2.5" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);

const MegaphoneIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path
      d="M1.5 6v4h2.5l7.5 4V2L4 6zM4 10l1.2 4.2h2.3L6.4 10.5M13.3 5.3c1.1 1 1.1 4.4 0 5.4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

function ChartBlock({ title, data, ticks, top }: { title: string; data: Record<string, number[]>; ticks: number[]; top: number }) {
  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between text-[14px] leading-5">
        <span className="flex items-center gap-[6px] font-bold">
          {title}
          <Info />
        </span>
        <span className="text-rk-muted">Last 12 months</span>
      </div>
      <div className="mt-[17px]">
        <TrendChart
          series={[
            { color: "#6b6ee8", data: data[you] },
            { color: "#3ee0b5", data: data[rival] },
          ]}
          labels={bgMonthLabels}
          labelAt={[70, 141, 212, 283, 354, 425]}
          ticks={ticks}
          width={492}
          height={200}
          plot={{ left: 53, right: 472, top, bottom: 170 }}
          x0={61}
          x1={472}
          axis="left"
          labelY={193}
          curve="linear"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}

function Charts({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [on, setOn] = useState({ a: true, b: true });
  const pick = (d: Record<string, number[]>) => ({
    [you]: on.a ? d[you] : [],
    [rival]: on.b ? d[rival] : [],
  });
  return (
    <div className="rounded-lg bg-white shadow-card">
      <button type="button" onClick={onToggle} className={`flex h-10 w-full items-center gap-2 px-5 ${open ? "border-b border-[#e8e9ec]" : ""}`}>
        <ChevronRight width={14} height={14} strokeWidth={2} className={`text-rk-text-2 transition-transform ${open ? "rotate-90" : ""}`} />
        <span className="text-[16px] leading-6 font-bold">Charts</span>
      </button>
      {open && (
        <div className="px-5 pt-[19px] pb-[20px]">
          <div className="flex gap-10">
            <ChartBlock title="Authority Score" data={pick(bgAuthority)} ticks={[0, 25, 50, 75, 100]} top={21} />
            <ChartBlock title="Referring Domains" data={pick(bgRefDomains)} ticks={[84, 127, 170, 213, 256]} top={28} />
          </div>
          <div className="mt-[26px] flex justify-center gap-4 pr-[14px]">
            <Checkbox color={D1} checked={on.a} onChange={() => setOn((o) => ({ ...o, a: !o.a }))} label={you} />
            <Checkbox color={D2} checked={on.b} onChange={() => setOn((o) => ({ ...o, b: !o.b }))} label={rival} />
          </div>
        </div>
      )}
    </div>
  );
}

const asRanges = ["0–10", "11–20", "21–30", "31–40", "41–50", "51–60", "61–70", "71–80", "81–90", "91–100"];

function FilterTrigger({ label, open, onClick, width, testId }: { label: string; open: boolean; onClick: () => void; width: number; testId: string }) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      style={{ width }}
      className={`flex h-7 items-center justify-between gap-2 rounded-md border bg-white px-2 text-[14px] text-[#8b8d8c] ${open ? OPEN_BORDER : "border-[#dfe2e2]"}`}
    >
      <span className="truncate">{label}</span>
      <ChevronDown width={14} height={14} className="shrink-0 text-rk-text" strokeWidth={2.4} />
    </button>
  );
}

function AsFilter() {
  const [v, setV] = useState<string | null>(null);
  return (
    <Popover
      offset={5}
      panelClassName="w-[176px] py-0!"
      trigger={({ toggle, open }) => <FilterTrigger testId="bg-as-filter" label={v ? `AS: ${v}` : "Authority Score"} open={open} onClick={toggle} width={145} />}
    >
      {(close) => (
        <div>
          <div className="max-h-[199px] overflow-y-auto py-1 [scrollbar-width:thin]">
            {asRanges.map((r) => (
              <Opt
                key={r}
                active={r === v}
                onClick={() => {
                  setV(r);
                  close();
                }}
              >
                {r}
              </Opt>
            ))}
          </div>
          <div className="border-t border-[#e8e9ec] px-2 pt-[7px] pb-2">
            <div className="text-[14px] leading-5 font-bold">Custom range</div>
            <div className="mt-[14px] flex h-7">
              <input placeholder="from" className="w-1/2 min-w-0 rounded-l-md border border-[#dfe2e2] px-2 text-[14px] outline-none placeholder:text-[#a9abaa] focus:border-[#7a86f2]" />
              <input placeholder="to" className="-ml-px w-1/2 min-w-0 rounded-r-md border border-[#dfe2e2] px-2 text-[14px] outline-none placeholder:text-[#a9abaa] focus:border-[#7a86f2]" />
            </div>
            <button type="button" onClick={close} className="mt-2 h-7 w-full rounded-md bg-[#191b1c] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              Apply
            </button>
          </div>
        </div>
      )}
    </Popover>
  );
}

function AdvancedFilters() {
  const [rows, setRows] = useState(1);
  return (
    <Popover
      align="right"
      offset={5}
      panelClassName="w-[572px] py-0!"
      trigger={({ toggle, open }) => <FilterTrigger testId="bg-adv-filters" label="Advanced filters" open={open} onClick={toggle} width={150} />}
    >
      {(close) => (
        <div>
          <div className="px-4 pt-4 pb-4">
            {Array.from({ length: rows }, (_, i) => (
              <div key={i} className={`flex gap-4 ${i ? "mt-2" : ""}`}>
                <SelectButton value="Include" options={["Include", "Exclude"]} muted={false} className="w-[152px]" />
                <SelectButton value="Country (by IP)" options={["Country (by IP)", "Domain zone", "Monthly visits", "Category"]} muted={false} className="w-[152px]" />
                <SelectButton value="Select country" options={["Select country", "Sweden", "United States", "United Kingdom", "Germany"]} className="w-[160px]" />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setRows((n) => Math.min(n + 1, 4))}
              className="mt-5 flex h-7 items-center gap-[7px] pl-3 text-[14px] text-rk-link hover:text-rk-link-hover"
            >
              <PlusIcon width={14} height={14} strokeWidth={2} />
              Add condition
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-[#e8e9ec] px-4 py-4">
            <button type="button" onClick={close} className="h-7 rounded-md bg-[#191b1c] px-2 text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
              Apply
            </button>
            <button type="button" onClick={() => setRows(1)} className="mr-[9px] flex items-center gap-[7px] text-[14px] text-[#6a6c6a] hover:text-rk-text">
              <CloseIcon width={12} height={12} strokeWidth={2} />
              Clear all
            </button>
          </div>
        </div>
      )}
    </Popover>
  );
}

const Pill = ({ children, tone = "gray" }: { children: ReactNode; tone?: "gray" | "orange" }) => (
  <span
    className={`inline-flex h-5 items-center rounded-full px-2 text-[12px] ${tone === "orange" ? "bg-[#ffe1cc] text-[#c24b00]" : "bg-[#e9ebed] text-[#6a6c6a]"}`}
  >
    {children}
  </span>
);

const BrokenLinkIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#a9abaa]">
    <path d="M6.5 9.5 9.5 6.5M7.3 4.2l1.2-1.2a3 3 0 0 1 4.3 4.3l-1.2 1.2M8.7 11.8l-1.2 1.2a3 3 0 0 1-4.3-4.3l1.2-1.2M2.5 13.5l11-11" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
  </svg>
);

function BacklinkDetails({ row, onHide }: { row: BgRow; onHide: () => void }) {
  const d = bgBacklinkFor(row.domain);
  const th = "pb-[8px] pl-2 text-left font-normal";
  return (
    <div className="border-b border-[#ecedf0] px-[11px] pb-[12px]">
      <div className="flex h-[44px] items-center gap-6 px-[1px] text-[14px]">
        {["New", "Lost", "Follow"].map((l) => (
          <label key={l} className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 appearance-none rounded-[4px] border border-[#d6d8d7] bg-white checked:border-[#235fe2] checked:bg-[#235fe2]" />
            {l}
            {l !== "Follow" && <span className="-ml-[1px] font-serif text-[13px] text-[#a9abaa] italic">i</span>}
          </label>
        ))}
      </div>
      <table className="mt-[7px] w-full table-fixed text-[14px] leading-5">
        <colgroup>
          <col style={{ width: 96 }} />
          <col style={{ width: 402 }} />
          <col style={{ width: 80 }} />
          <col style={{ width: 80 }} />
          <col style={{ width: 162 }} />
          <col style={{ width: 110 }} />
          <col />
        </colgroup>
        <thead>
          <tr className="border-b border-[#e0e1e4] text-[12px] leading-4 text-rk-text-2">
            <th className="pr-2 pb-[8px] text-right font-normal">
              <span className="inline-flex items-center gap-[5px]">
                Page AS
                <svg viewBox="0 0 16 16" width={14} height={14}>
                  <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" stroke="#6a6c6a" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </span>
            </th>
            <th className={th}>Source page Title and URL</th>
            <th className={th}>Ext. Links</th>
            <th className={th}>Int. Links</th>
            <th className={th}>Anchor and Target URL</th>
            <th className={th}>First Seen</th>
            <th className={th}>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#e0e1e4] align-top">
            <td className="pt-[12px] pr-2 pb-[12px] text-right">{d.pageAs}</td>
            <td className="pt-[12px] pb-[12px] pl-2">
              <div>{d.title}</div>
              <a href={`https://${d.url}`} target="_blank" rel="noreferrer" className="break-all tracking-[0.25px] text-rk-link hover:text-rk-link-hover">
                {d.url}
              </a>
              <ExternalIcon className="ml-[5px] inline-block align-[-2px] text-[#a9abaa]" />
              <div className="mt-[3px] flex gap-[6px]">
                {d.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </td>
            <td className="pt-[12px] pl-2">{d.ext}</td>
            <td className="pt-[12px] pl-2">{d.int}</td>
            <td className="pt-[12px] pl-2">
              <div>{d.anchor}</div>
              <div className="flex items-center gap-[5px]">
                <BrokenLinkIcon />
                <a href={`https://${d.target}`} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                  {d.target}
                </a>
                <ExternalIcon className="text-[#a9abaa]" />
              </div>
              <div className="mt-[3px] flex gap-[6px]">
                <Pill>Text</Pill>
                <Pill tone="orange">Nofollow</Pill>
              </div>
            </td>
            <td className="pt-[12px] pl-2">{d.first}</td>
            <td className="pt-[12px] pl-2">{d.last}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-[12px] flex items-center">
        <Link
          href={routes.backlinksToolkit.backlinks}
          className="flex h-7 items-center rounded-md border border-[#d6d8d8] bg-[#f4f5f5] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover"
        >
          View full report
        </Link>
        <span className="mx-5 h-5 w-px bg-[#e0e1e4]" />
        <button type="button" onClick={onHide} className="dotted-underline text-[14px] text-rk-muted decoration-[#a9abaa] hover:text-rk-text">
          Hide
        </button>
      </div>
    </div>
  );
}

function Prospects() {
  const [tab, setTab] = useState<BgTab>("Best");
  const [open, setOpen] = useState<string | null>(null);
  const [ref, stuck] = useStuck<HTMLDivElement>();
  const rows = tab === "Best" || tab === "Unique" || tab === "All" ? bgRows : [];
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="flex h-[43px] items-center gap-2 border-b border-[#e8e9ec] px-5">
        <h3 className="mr-[3px] text-[16px] leading-6 font-bold">Prospects for:</h3>
        <DomainPicker domains={[you, rival]} testId="bg-prospects-for" offset={8} />
        <YouTag />
      </div>
      <div ref={ref} className={`sticky top-0 z-20 rounded-t-lg bg-white ${stuck ? "shadow-[0_1px_0_#e8e9ec]" : ""}`}>
        <div className="flex h-[68px] items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <Segmented items={bgTabs.map((t) => ({ key: t, label: t }))} value={tab} onChange={setTab} />
            <div className="ml-[3px]">
              <AsFilter />
            </div>
            <AdvancedFilters />
          </div>
          <button
            type="button"
            className="flex h-7 items-center gap-[6px] rounded-md border border-[#dfe2e2] bg-white px-2 text-[14px] text-rk-text-2 hover:bg-rk-bg"
          >
            <ExportIcon />
            Export
          </button>
        </div>
        <div className="flex h-[61px] items-stretch border-b border-[#e0e1e4] bg-[#f7f8f8] text-[12px] leading-4 text-rk-text-2">
          <div className="flex flex-1 flex-col justify-center gap-[3px] pl-5">
            <span>Referring Domain</span>
            <span className="text-rk-muted">{rows.length ? `1 – ${rows.length} (${rows.length})` : "0"}</span>
          </div>
          <div className="flex w-[100px] items-center justify-end pr-[4px]">AS</div>
          <div className="flex w-[112px] items-center justify-end pr-[12px]">Monthly Visits</div>
          <div className="flex w-[93px] items-center gap-[6px] bg-[#e8e9ea] pl-3">
            Matches
            <svg viewBox="0 0 16 16" width={14} height={14}>
              <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" stroke="#6a6c6a" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex w-[110px] items-center justify-end gap-[5px] pr-[8px]">
            <Dot color={D1} size={11} />
            {you}
          </div>
          <div className="flex w-[137px] items-center gap-[5px] pr-5 pl-[16px]">
            <Dot color={D2} size={11} />
            <span className="truncate xl:overflow-visible">{rival}</span>
          </div>
        </div>
      </div>
      {rows.length === 0 && <div className="py-10 text-center text-[14px] text-rk-muted">No prospects found for this filter</div>}
      {rows.map((r, ri) => (
        <Fragment key={r.domain}>
          <div
            className={`flex items-start border-b border-[#ecedf0] text-[14px] leading-5 ${r.category ? "h-[64px]" : "h-[48px]"} ${open === r.domain ? "bg-[#f7f8f8]" : ""}`}
          >
            <div className="flex min-w-0 flex-1 flex-col pt-[12px] pl-5">
              <span className="flex items-center gap-[5px]">
                <a href={`https://${r.domain}`} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                  {r.domain}
                </a>
                <ExternalIcon className="text-[#a9abaa]" />
              </span>
              {r.category && <span className="text-rk-text-2">{r.category}</span>}
            </div>
            <div className="flex w-[100px] justify-end pt-[12px] pr-[4px]">
              <Popover
                align="right"
                panelClassName="w-[220px] px-3 py-2 text-[13px]"
                trigger={({ toggle }) => (
                  <button type="button" onClick={toggle} className="flex items-center gap-[6px] text-rk-link hover:text-rk-link-hover">
                    {r.as}
                    <ChevronDown width={14} height={14} strokeWidth={2.2} />
                  </button>
                )}
              >
                <div className="font-semibold">Authority Score {r.as}</div>
                <div className="mt-1 text-rk-muted">Based on link power, organic traffic and natural profile of {r.domain}.</div>
              </Popover>
            </div>
            <div className="flex w-[112px] justify-end pt-[12px] pr-[12px]">
              {r.visits === "n/a" ? (
                <span className="text-rk-muted">n/a</span>
              ) : (
                <Link href={routes.domainOverview} className="text-rk-link hover:text-rk-link-hover">
                  {r.visits}
                </Link>
              )}
            </div>
            <div className="w-[93px] pt-[12px] pr-3 text-right text-rk-text">1/2</div>
            <div className="w-[110px] pt-[12px] pr-[8px] text-right text-rk-muted">{r.a}</div>
            <div className={`flex w-[137px] justify-end self-stretch pt-[12px] pr-5 ${open === r.domain ? "bg-[linear-gradient(to_right,transparent_4px,#e6e7ea_4px)]" : ""}`}>
              <button
                type="button"
                data-testid={`bg-row-toggle-${ri}`}
                onClick={() => setOpen((o) => (o === r.domain ? null : r.domain))}
                className="flex h-5 items-center gap-[3px] text-rk-text hover:text-rk-link"
              >
                <ChevronRight width={14} height={14} className={`text-rk-muted transition-transform ${open === r.domain ? "rotate-90" : ""}`} />
                {r.b}
              </button>
            </div>
          </div>
          {open === r.domain && <BacklinkDetails row={r} onHide={() => setOpen(null)} />}
        </Fragment>
      ))}
      <div className="flex h-[65px] items-center gap-2 px-5">
        <button
          type="button"
          disabled
          aria-label="First page"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e3e5e5] text-[#d6d8d7]"
        >
          <ChevronsLeft />
        </button>
        <button type="button" disabled className="h-7 rounded-md border border-[#e3e5e5] px-2 text-[14px] text-[#d6d8d7]">
          Prev
        </button>
        <button type="button" disabled className="h-7 rounded-md bg-[#a3a5a8] px-2 text-[14px] font-semibold text-white">
          Next
        </button>
        <span className="ml-2 text-[14px]">Page:</span>
        <input defaultValue="1" className="h-7 w-[64px] rounded-md border border-[#e3e5e5] px-2 text-[14px] text-[#a9abaa] outline-none" />
        <span className="text-[14px]">of 1</span>
      </div>
    </div>
  );
}

export function BacklinkGap({ q, competitors, chartsOpen }: { q: string; competitors: string[]; chartsOpen: boolean }) {
  const router = useRouter();
  const wide = useWide();
  const [domains, setDomains] = useState<string[]>(() => [q, ...competitors, "", "", ""].slice(0, 5));
  const [charts, setCharts] = useState(chartsOpen);
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  return (
    <div>
      <div className="border-b border-[#dfe2e2] px-8 pt-[17px] pb-[22px]">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Backlink Gap" }]} />
          <div className="flex items-center gap-5">
            <HeaderLink icon={<MegaphoneIcon />}>Link building ideas</HeaderLink>
            <HeaderLink icon={<ManualIcon />}>User manual</HeaderLink>
            <SendFeedback />
          </div>
        </div>
        <h1 className="mt-[5px] text-[20px] leading-7 font-semibold">Backlink Gap</h1>
      </div>

      <div className="px-8 pt-[17px]">
        <div className="flex gap-2">
          {domains.map((d, i) => (
            <div key={i} className="w-[165px] xl:w-auto xl:min-w-[165px] xl:flex-1">
              <ScopeSelect testId={`bg-scope-${i}`} options={["Root Domain", "Subdomain", "URL"]} className="mb-[9px]" />
              <DomainField
                value={d}
                onChange={(v) => set(i, v)}
                color={colors[i]}
                you={i === 0}
                placeholder="Add domain"
                truncate={i === 0 || wide ? undefined : 9}
                wide
                className="h-[28px]!"
              />
            </div>
          ))}
          <div className="flex shrink-0 items-end gap-2 whitespace-nowrap">
            <button
              type="button"
              onClick={() => {
                const c = domains.slice(1).filter(Boolean);
                router.push(
                  `${routes.backlinkGap}?q=${encodeURIComponent(domains[0] || you)}&compareWith=${encodeURIComponent((c.length ? c : [rival]).join(","))}`,
                );
              }}
              className="h-7 rounded-md bg-[#191b1c] px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
            >
              Find prospects
            </button>
            <button
              type="button"
              onClick={() => setDomains(["", "", "", "", ""])}
              className="flex h-7 items-center rounded-md border border-[#d6d8d8] bg-[#e9ebeb] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover"
            >
              Clear all
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Charts
            open={charts}
            onToggle={() => {
              const next = !charts;
              setCharts(next);
              const url = new URL(window.location.href);
              if (next) url.searchParams.set("ba_ct", "1");
              else url.searchParams.delete("ba_ct");
              window.history.replaceState(null, "", url.toString());
            }}
          />
        </div>

        <div className="mt-4 pb-[96px]">
          <Prospects />
        </div>
      </div>
    </div>
  );
}

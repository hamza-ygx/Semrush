"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/ui/primitives";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { BookIcon, ChevronDown, ChevronRight, ChevronsLeft, ExportIcon, ExternalIcon } from "@/components/ui/icons";
import { HeaderLink, SendFeedback } from "@/components/shell/PageHeader";
import { Info } from "@/components/ui/primitives";
import { Checkbox, D1, D2, Dot, DomainField, ScopeSelect, Segmented, SelectButton, YouTag } from "./common";
import { bgAuthority, bgMonthLabels, bgRefDomains, bgRows, bgTabs, rival, you, type BgTab } from "./data";
import { useStuck } from "./KeywordGapReport";
import { TrendChart } from "./TrendChart";

const colors = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];

const MegaphoneIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M2.5 6.5v3h2l6 3.5v-10l-6 3.5zM4.5 9.5l1 4h2l-1-3.2M12.8 6.2c.6.5.6 3.1 0 3.6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" strokeLinecap="round" />
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
  const pick = (d: Record<string, number[]>) => ({ [you]: on.a ? d[you] : [], [rival]: on.b ? d[rival] : [] });
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

function Prospects() {
  const [tab, setTab] = useState<BgTab>("Best");
  const [open, setOpen] = useState<string | null>(null);
  const [ref, stuck] = useStuck<HTMLDivElement>();
  const rows = tab === "Best" || tab === "Unique" || tab === "All" ? bgRows : [];
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="flex h-[43px] items-center gap-2 border-b border-[#e8e9ec] px-5">
        <h3 className="mr-[3px] text-[16px] leading-6 font-bold">Prospects for:</h3>
        <Popover
          panelClassName="min-w-[140px]"
          trigger={({ toggle }) => (
            <button type="button" onClick={toggle} className="flex h-7 items-center gap-[6px] rounded-md border border-[#dfe2e2] bg-white px-2 text-[14px]">
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
      <div ref={ref} className={`sticky top-0 z-20 rounded-t-lg bg-white ${stuck ? "shadow-[0_1px_0_#e8e9ec]" : ""}`}>
        <div className="flex h-[68px] items-center justify-between px-5">
          <div className="flex items-center gap-2">
            <Segmented items={bgTabs.map((t) => ({ key: t, label: t }))} value={tab} onChange={setTab} />
            <SelectButton value="Authority Score" options={["Authority Score", "0-20", "21-40", "41-60", "61-80", "81-100"]} className="w-[145px]" />
            <SelectButton value="Advanced filters" options={["Advanced filters", "Monthly visits", "Category", "Domain zone"]} className="w-[150px]" />
          </div>
          <button type="button" className="flex h-7 items-center gap-[6px] rounded-md border border-[#dfe2e2] bg-white px-2 text-[14px] text-rk-text-2 hover:bg-rk-bg">
            <ExportIcon />
            Export
          </button>
        </div>
        <div className="flex h-[61px] items-stretch border-b border-[#e0e1e4] bg-[#f7f8f8] text-[12px] leading-4 text-rk-text-2">
          <div className="flex flex-1 flex-col justify-center gap-[3px] pl-5">
            <span>Referring Domain</span>
            <span className="text-rk-muted">
              {rows.length ? `1 – ${rows.length} (${rows.length})` : "0"}
            </span>
          </div>
          <div className="flex w-[100px] items-center justify-end pr-[4px]">AS</div>
          <div className="flex w-[112px] items-center justify-end pr-[12px]">Monthly Visits</div>
          <div className="flex w-[93px] items-center gap-[6px] bg-[#e8e9ea] pl-3">
            Matches
            <svg viewBox="0 0 16 16" width={14} height={14}>
              <path d="M2.5 4h11M2.5 8h7M2.5 12h3.5" stroke="#6c6e79" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex w-[110px] items-center justify-end gap-[5px] pr-[8px]">
            <Dot color={D1} size={11} />
            {you}
          </div>
          <div className="flex w-[137px] items-center gap-[5px] pr-5 pl-[16px]">
            <Dot color={D2} size={11} />
            <span className="truncate">{rival}</span>
          </div>
        </div>
      </div>
      {rows.length === 0 && <div className="py-10 text-center text-[14px] text-rk-muted">No prospects found for this filter</div>}
      {rows.map((r) => (
        <Fragment key={r.domain}>
          <div className={`flex items-start border-b border-[#ecedf0] text-[14px] leading-5 ${r.category ? "h-[64px]" : "h-[48px]"}`}>
            <div className="flex min-w-0 flex-1 flex-col pt-[12px] pl-5">
              <span className="flex items-center gap-[5px]">
                <a href={`https://${r.domain}`} target="_blank" rel="noreferrer" className="text-rk-link hover:text-rk-link-hover">
                  {r.domain}
                </a>
                <ExternalIcon className="text-[#a9abb6]" />
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
              {r.visits === "n/a" ? <span className="text-rk-muted">n/a</span> : <Link href={routes.domainOverview} className="text-rk-link hover:text-rk-link-hover">{r.visits}</Link>}
            </div>
            <div className="w-[93px] pt-[12px] pr-3 text-right text-rk-text">1/2</div>
            <div className="w-[110px] pt-[12px] pr-[8px] text-right text-rk-muted">{r.a}</div>
            <div className="flex w-[137px] justify-end pt-[12px] pr-5">
              <button type="button" onClick={() => setOpen((o) => (o === r.domain ? null : r.domain))} className="flex items-center gap-[3px] text-rk-text hover:text-rk-link">
                <ChevronRight width={14} height={14} className={`text-rk-muted transition-transform ${open === r.domain ? "rotate-90" : ""}`} />
                {r.b}
              </button>
            </div>
          </div>
          {open === r.domain && (
            <div className="border-b border-[#ecedf0] bg-[#f7f8f8] px-5 py-3 text-[13px] text-rk-text-2">
              {r.b} backlink{r.b > 1 ? "s" : ""} from <span className="text-rk-link">{r.domain}</span> point to {rival}. None point to {you} yet.
            </div>
          )}
        </Fragment>
      ))}
      <div className="flex h-[65px] items-center gap-2 px-5">
        <button type="button" disabled aria-label="First page" className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e3e5e5] text-[#c4c7cf]">
          <ChevronsLeft />
        </button>
        <button type="button" disabled className="h-7 rounded-md border border-[#e3e5e5] px-2 text-[14px] text-[#c4c7cf]">
          Prev
        </button>
        <button type="button" disabled className="h-7 rounded-md bg-[#a3a5a8] px-2 text-[14px] font-semibold text-white">
          Next
        </button>
        <span className="ml-2 text-[14px]">Page:</span>
        <input defaultValue="1" className="h-7 w-[68px] rounded-md border border-[#e3e5e5] px-2 text-[14px] text-[#a9abb6] outline-none" />
        <span className="text-[14px]">of 1</span>
      </div>
    </div>
  );
}

export function BacklinkGap({ q, competitors, chartsOpen }: { q: string; competitors: string[]; chartsOpen: boolean }) {
  const router = useRouter();
  const [domains, setDomains] = useState<string[]>(() => [q, ...competitors, "", "", ""].slice(0, 5));
  const [charts, setCharts] = useState(chartsOpen);
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  return (
    <div>
      <div className="border-b border-[#dfe2e2] px-8 pt-[18px] pb-[21px]">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: routes.home },
              { label: "SEO", href: routes.seoDashboard },
              { label: "Backlink Gap" },
            ]}
          />
          <div className="flex items-center gap-5">
            <HeaderLink icon={<MegaphoneIcon />}>Link building ideas</HeaderLink>
            <HeaderLink icon={<BookIcon />}>User manual</HeaderLink>
            <SendFeedback />
          </div>
        </div>
        <h1 className="mt-[6px] text-[20px] leading-7 font-semibold">Backlink Gap</h1>
      </div>

      <div className="px-8 pt-4">
        <div className="flex gap-2">
          {domains.map((d, i) => (
            <div key={i} className="w-[165px]">
              <ScopeSelect className="mb-[9px]" />
              <DomainField value={d} onChange={(v) => set(i, v)} color={colors[i]} you={i === 0} placeholder="Add domain" truncate={i === 0 ? undefined : 9} wide className="h-[28px]!" />
            </div>
          ))}
          <div className="flex shrink-0 items-end gap-2 whitespace-nowrap">
            <button
              type="button"
              onClick={() => {
                const c = domains.slice(1).filter(Boolean);
                router.push(`${routes.backlinkGap}?q=${encodeURIComponent(domains[0] || you)}&compareWith=${encodeURIComponent((c.length ? c : [rival]).join(","))}`);
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

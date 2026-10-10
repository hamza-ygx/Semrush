"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/ui/primitives";
import { MenuItem, Popover, LinkSelect } from "@/components/ui/Popover";
import { ChevronDown, DesktopIcon, DotsIcon, ExportIcon, ExternalIcon, FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";
import { SendFeedback } from "@/components/shell/PageHeader";
import { Checkbox, D1, D2, DemoTag, Dot, DomainField, ScopeSelect, Segmented } from "./common";
import { backlinksTrend, cdRows, organicTraffic, paidTraffic, rival, trafficMonths, trafficShare, you, type CdRow } from "./data";
import { KeywordOverlap, TopOpportunities } from "./Opportunities";
import { TrendChart } from "./TrendChart";
import { niceTicks, type CdLive } from "./live";
import { DemoMark } from "@/features/organic/ui";

const palette = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];

const WorldIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="8" cy="8" r="6.3" fill="none" stroke="#6a6c6a" strokeWidth={1.4} />
    <path
      d="M4.2 4.5c1.4.4 2.2 1.4 2 2.6-.2 1 .9 1.4.9 2.4M9.5 2.2c-.4 1.1.2 2 1.3 2.2 1 .2 1.5 1 1 2.1M10.5 10c.7.2 1.5.6 2.1 1.2"
      fill="none"
      stroke="#6a6c6a"
      strokeWidth={1.2}
    />
  </svg>
);

function DbTabs() {
  const [db, setDb] = useState("SE");
  const items: { k: string; icon: ReactNode; label: string }[] = [
    { k: "WW", icon: <WorldIcon />, label: "Worldwide" },
    { k: "US", icon: <FlagUS />, label: "US" },
    { k: "UK", icon: <FlagUK />, label: "UK" },
    { k: "SE", icon: <FlagSE />, label: "SE" },
  ];
  return (
    <div className="flex h-8">
      {items.map((it, i) => {
        const on = db === it.k;
        return (
          <button
            key={it.k}
            type="button"
            onClick={() => setDb(it.k)}
            className={`relative flex items-center gap-2 border px-2 text-[14px] ${i === 0 ? "rounded-l-md" : "-ml-px"} ${
              on ? "z-10 border-[#8ea4f5] bg-[#e6ecfb]" : "border-[#dfe2e2] bg-white hover:bg-rk-bg"
            }`}
          >
            {it.icon}
            {it.label}
          </button>
        );
      })}
      <Popover
        className="-ml-px"
        panelClassName="min-w-[160px]"
        trigger={({ toggle }) => (
          <button
            type="button"
            aria-label="More databases"
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-r-md border border-[#dfe2e2] bg-white text-rk-text hover:bg-rk-bg"
          >
            <DotsIcon />
          </button>
        )}
      >
        {(close) =>
          ["Germany", "France", "Norway", "Denmark", "Finland"].map((c) => (
            <MenuItem key={c} onClick={close}>
              {c}
            </MenuItem>
          ))
        }
      </Popover>
    </div>
  );
}

const Arrow = ({ dir }: { dir?: "up" | "down" }) =>
  dir ? (
    <svg viewBox="0 0 12 12" width={12} height={12} className={`ml-[3px] inline-block ${dir === "down" ? "rotate-180" : ""}`}>
      <path
        d="M6 10.5V2M2.8 5.2 6 2l3.2 3.2"
        fill="none"
        stroke={dir === "up" ? "#00a37a" : "#e0253f"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : null;

const cols: {
  key: keyof CdRow;
  label: string;
  w: number;
  delta?: keyof CdRow;
}[] = [
  { key: "as", label: "Authority score", w: 112 },
  { key: "rank", label: `${brand.name} Rank`, w: 112, delta: "rankDelta" },
  { key: "traffic", label: "Org. Traffic", w: 112, delta: "trafficDelta" },
  { key: "keywords", label: "Org. Keywords", w: 110, delta: "keywordsDelta" },
  { key: "backlinks", label: "Backlinks", w: 110 },
  { key: "refDomains", label: "Ref. Domains", w: 111 },
  { key: "paidKeywords", label: "Paid Keywords", w: 112 },
  { key: "paidCost", label: "Paid Traffic Cost", w: 133 },
];

function CompareTable({ rows }: { rows: CdRow[] }) {
  const colors = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-card">
      <table className="w-full table-fixed text-[14px]">
        <colgroup>
          <col style={{ width: 151 }} />
          {cols.map((c) => (
            <col key={c.key} style={{ width: c.w }} />
          ))}
        </colgroup>
        <thead>
          <tr className="h-[33px] border-b border-[#e8e9ec] text-[12px] text-rk-text-2">
            <th className="pl-5 text-left font-normal">Domain</th>
            {cols.map((c, i) => (
              <th key={c.key} title={c.label} className={`truncate text-right font-normal ${i === cols.length - 1 ? "pr-5" : i === 0 ? "pr-[5px]" : "pr-2"}`}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={r.domain} className={`h-[37px] ${ri ? "" : "border-b border-[#ecedf0]"}`}>
              <td className="pl-5">
                <span className="flex items-center gap-[9px]">
                  <Dot color={colors[ri]} size={11} />
                  <Link href={routes.domainOverview} className="truncate text-rk-link hover:text-rk-link-hover">
                    {r.domain}
                  </Link>
                  {r.demo && <DemoMark className="!-ml-[5px]" />}
                </span>
              </td>
              {cols.map((c, i) => (
                <td
                  key={c.key}
                  className={`text-right whitespace-nowrap text-rk-text ${i === cols.length - 1 ? "pr-6" : i === 0 ? "pr-[5px]" : c.key === "paidKeywords" ? "pr-[24px]" : "pr-2"} ${r.best.includes(c.key as never) ? "bg-[#dcfdf8]" : ""}`}
                >
                  {r[c.key] as ReactNode}
                  {c.delta && <Arrow dir={r[c.delta] as "up" | "down" | undefined} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SmallCard({ title, children, demo = false }: { title: string; children: ReactNode; demo?: boolean }) {
  return (
    <div className="h-[150px] min-w-0 flex-1 rounded-lg bg-white shadow-card">
      <div className="flex h-[40px] items-center border-b border-[#e8e9ec] px-5">
        <h3 className="text-[16px] leading-6 font-bold">{title}</h3>
        {demo && <DemoTag />}
      </div>
      {children}
    </div>
  );
}

function TrafficShare({ share = trafficShare }: { share?: { domain: string; pct: number }[] }) {
  const r = 29;
  const c = 2 * Math.PI * r;
  const a = (share[0].pct / 100) * c;
  const starts = share.map((_, i) => share.slice(0, i).reduce((s, t) => s + (t.pct / 100) * c, 0));
  return (
    <div className="flex items-center pt-[16px] pl-5">
      <svg width={70} height={70} className="-rotate-90">
        <circle cx={35} cy={35} r={r} fill="none" stroke={D2} strokeWidth={12} />
        {share.slice(2).map((t, j) => (
          <circle key={t.domain} cx={35} cy={35} r={r} fill="none" stroke={palette[j + 2]} strokeWidth={12} strokeDasharray={`${(t.pct / 100) * c} ${c}`} strokeDashoffset={-starts[j + 2]} />
        ))}
        <circle cx={35} cy={35} r={r} fill="none" stroke={D1} strokeWidth={12} strokeDasharray={`${a} ${c}`} />
        <circle cx={35} cy={35} r={r} fill="none" stroke="#fff" strokeWidth={12} strokeDasharray={`1.5 ${a - 1.5} 1.5 ${c}`} strokeDashoffset={0.75} />
      </svg>
      <div className="ml-[20px] flex flex-1 flex-col gap-2 pr-[73px] text-[12px]">
        {share.map((t, i) => (
          <div key={t.domain} className="flex h-5 items-center justify-between">
            <span className="flex items-center gap-[9px]">
              <Dot color={palette[i]} size={11} />
              {t.domain}
            </span>
            <span className="text-rk-muted">{t.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitBars({
  left,
  right,
  color,
  pctW = 36,
  barW = 125,
  gap = 12,
  domains = [you, rival],
}: {
  domains?: string[];
  left: string[];
  right: string[];
  color: string;
  pctW?: number;
  barW?: number;
  gap?: number;
}) {
  return (
    <div className="flex flex-col gap-2 pt-[18px] pr-5 pl-5 text-[12px]">
      {domains.map((d, i) => (
        <div key={d} className="flex h-5 items-center">
          <span className="w-[98px] shrink-0">{d}</span>
          <span className="shrink-0 text-right text-rk-muted" style={{ width: pctW }}>
            {left[i]}
          </span>
          <span
            className="h-4 shrink-0"
            style={{
              background: color,
              width: barW,
              marginLeft: gap,
              marginRight: 12,
            }}
          />
          <span className="text-rk-muted">{right[i]}</span>
        </div>
      ))}
    </div>
  );
}

const seriesColors = [D1, "#3ee0b5", "#ff8e29", "#ff6b70", "#b58af2"];

function TrafficChart({ live }: { live?: CdLive | null }) {
  const [tab, setTab] = useState<"organic" | "paid" | "backlinks">("organic");
  const [period, setPeriod] = useState<"days" | "months">("months");
  const domains = live ? live.rows.map((r) => r.domain) : [you, rival];
  const [on, setOn] = useState<boolean[]>(() => domains.map(() => true));
  const mock: Record<string, number[]> = tab === "organic" ? organicTraffic : tab === "paid" ? paidTraffic : backlinksTrend;
  const real = live ? (tab === "organic" ? live.organic : tab === "paid" ? live.paid : live.backlinks) : {};
  const data = domains.map((d) => real[d] ?? mock[d]);
  const series = domains
    .map((_, i) => on[i] && data[i] && { color: seriesColors[i], data: data[i] })
    .filter(Boolean) as {
    color: string;
    data: number[];
  }[];
  const fixed = tab === "organic" ? [0, 115, 230, 345, 460] : tab === "paid" ? [0, 1, 2, 3, 4] : [0, 75, 150, 225, 300];
  const ticks = live ? niceTicks(Math.max(0, ...data.flatMap((d) => d ?? []))) : fixed;
  const title = tab === "organic" ? "Organic Traffic" : tab === "paid" ? "Paid Traffic" : "Backlinks";
  const demo = !!live && domains.some((d) => !real[d] && !!mock[d]);
  return (
    <div className="rounded-lg bg-white shadow-card">
      <div className="flex h-[44px] items-center justify-between border-b border-[#e8e9ec] px-5">
        <Segmented
          items={[
            { key: "organic", label: "Organic" },
            { key: "paid", label: "Paid" },
            {
              key: "backlinks",
              label: (
                <>
                  Backlinks <WorldIcon />
                </>
              ),
            },
          ]}
          value={tab}
          onChange={setTab}
        />
        <div className="flex items-center gap-2">
          <Segmented
            items={[
              { key: "days", label: "Days" },
              { key: "months", label: "Months" },
            ]}
            value={period}
            onChange={setPeriod}
          />
          <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-[#dfe2e2] bg-white px-[10px] text-[14px] hover:bg-rk-bg">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3" fill="none" stroke="#484a49" strokeWidth={1.4} />
            </svg>
            {live?.range[0] ?? "Sep 2025"} <span className="mr-[2px] ml-[4px]">–</span> {live?.range[1] ?? "Sep 2026"}
          </button>
          <button
            type="button"
            className="flex h-7 items-center gap-[6px] rounded-md border border-[#dfe2e2] bg-white px-[9px] text-[14px] text-rk-muted hover:bg-rk-bg"
          >
            <ExportIcon />
            Export
          </button>
        </div>
      </div>
      <div className="px-5 pt-[19px] pb-[50px]">
        <h3 className={`${demo ? "flex items-center " : ""}text-[16px] leading-6 font-bold`}>
          {title}
          {demo && <DemoTag />}
        </h3>
        <div className="mt-[21px] flex gap-4">
          {domains.map((d, i) => (
            <Checkbox key={d} color={palette[i]} checked={on[i]} onChange={() => setOn((o) => o.map((x, j) => (j === i ? !x : x)))} label={d} />
          ))}
        </div>
        <div className="mt-[30px]">
          <TrendChart
            series={series}
            labels={live?.months ?? trafficMonths}
            ticks={ticks}
            width={1023}
            height={194}
            plot={{ left: 0, right: 958, top: 10, bottom: 161 }}
            x0={28}
            x1={929}
            labelY={183}
          />
        </div>
      </div>
    </div>
  );
}

export function CompareDomainsReport({ competitors, live, demo }: { competitors: string[]; live?: CdLive | null; demo?: boolean }) {
  const router = useRouter();
  const [domains, setDomains] = useState<string[]>(() => [you, ...competitors, "", "", ""].slice(0, 5));
  const set = (i: number, v: string) => setDomains((d) => d.map((x, j) => (j === i ? v : x)));
  const rows = live ? live.rows : cdRows.filter((r) => r.domain === you || competitors.includes(r.domain));
  const names = live ? live.rows.map((r) => r.domain) : undefined;
  const colors = [D1, D2, "#ff8e29", "#ff6b70", "#b58af2"];
  return (
    <div>
      <div className="border-b border-[#dfe2e2] px-8 pt-4 pb-[23px]">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: routes.home },
              { label: "SEO", href: routes.seoDashboard },
              { label: "Domain Overview", href: routes.domainOverview },
              { label: "Compare Domains" },
            ]}
          />
          <SendFeedback />
        </div>
        <h1 className="mt-[10px] flex items-center gap-[7px] text-[20px] leading-7 font-semibold">
          Compare Domains: <span className="text-[#6a6c6a]">{you}</span>
          <a href={`https://${you}`} target="_blank" rel="noreferrer" className="text-[#a9abaa] hover:text-rk-link">
            <ExternalIcon />
          </a>
          {demo && <DemoTag className="ml-[3px]!" />}
        </h1>
        <div className="mt-[4px] flex items-center gap-[26px]">
          <DbTabs />
          <LinkSelect value="Desktop" options={["Desktop", "Mobile"]} icon={<DesktopIcon />} />
          <LinkSelect value={live?.date ?? "Sep 23, 2026"} options={[live?.date ?? "Sep 23, 2026", "Sep 15, 2026", "Aug 15, 2026", "Jul 15, 2026"]} />
          <LinkSelect value="USD" options={["USD", "EUR", "SEK"]} />
        </div>
      </div>

      <div className="px-8 pt-4">
        <div className="flex gap-2">
          {domains.map((d, i) => (
            <div key={i} className="w-[174px]">
              {i < 2 ? <ScopeSelect className="mb-[7px]" /> : <div className="h-[27px]" />}
              <DomainField value={d} onChange={(v) => set(i, v)} color={colors[i]} className="h-[28px]!" />
            </div>
          ))}
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => {
                const c = domains.slice(1).filter(Boolean);
                router.push(`${routes.compareDomains}?q=${encodeURIComponent(domains[0] || you)}&compareWith=${encodeURIComponent((c.length ? c : [rival]).join(","))}`);
              }}
              className="h-7 rounded-md bg-[#191b1c] px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]"
            >
              Compare
            </button>
            <Link
              href={routes.compareDomains}
              className="flex h-7 items-center rounded-md border border-[#d6d8d8] bg-[#e9ebeb] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <CompareTable rows={rows.length ? rows : cdRows} />
        </div>

        <div className="mt-4 flex gap-4">
          <SmallCard title="Traffic share">
            <TrafficShare share={live?.share} />
          </SmallCard>
          <SmallCard title="Non-branded / Branded" demo={!!live}>
            <SplitBars left={names ? names.map(() => "100%") : ["100%", "100%"]} right={names ? names.map(() => "0%") : ["0%", "0%"]} color="#6167e6" domains={names} />
          </SmallCard>
          <SmallCard title="Paid / Organic">
            <SplitBars left={live?.paidOrganic.left ?? ["0%", "0%"]} right={live?.paidOrganic.right ?? ["100%", "100%"]} color="#8ef5dc" pctW={23} barW={127} gap={11} domains={names} />
          </SmallCard>
        </div>

        <div className="mt-4">
          <TrafficChart live={live} />
        </div>

        <div className="mt-[17px] flex gap-4">
          <div className="w-[401px] shrink-0">
            <TopOpportunities variant="cd" height={455} live={live?.gap} />
          </div>
          <KeywordOverlap height={455} venn={{ cx: 157, cy: 234 }} legendLeft={381} legendRight={20} mutedValues live={live?.gap} />
        </div>

        <div className="mt-4 flex h-[232px] flex-col items-center justify-center rounded-lg bg-white text-center shadow-card">
          <h3 className="text-[16px] leading-6 font-bold">Add Your Widget</h3>
          <p className="mt-px text-[14px] leading-5 text-rk-text">
            We want to improve our {brand.name} Domain Overview to provide you with
            <br />
            more information. Let us know what widgets you’d like us to add.
          </p>
          <SuggestWidget />
        </div>
      </div>
    </div>
  );
}

function SuggestWidget() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <Popover
      className="mt-[17px]"
      panelClassName="min-w-[200px] text-left"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex h-7 items-center gap-[10px] rounded-md border border-[#dfe2e2] bg-[#f4f5f5] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover"
        >
          {sent ? "Thanks for your feedback!" : "Suggest widget"}
          <ChevronDown width={14} height={14} strokeWidth={2.2} className="text-rk-text" />
        </button>
      )}
    >
      {(close) =>
        ["Top pages", "Traffic by country", "Branded keywords", "SERP features", "Other"].map((w) => (
          <MenuItem
            key={w}
            onClick={() => {
              setSent(w);
              close();
            }}
          >
            {w}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

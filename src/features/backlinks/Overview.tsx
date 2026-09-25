"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ChevronDown, PlusIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { routes } from "@/config/routes";
import { tabHref } from "./BacklinksPage";
import { AreaChart, NewLostChart } from "./charts";
import {
  allTimeLabels,
  authorityBuckets,
  backlinkTypes,
  blAllTime,
  blTrend,
  categories,
  cloud,
  countries,
  domain,
  linkAttributes,
  newLostBl,
  newLostRd,
  rdAllTime,
  rdTrend,
  summary,
  tlds,
  topPages,
  trendLabels,
  weeks,
} from "./data";
import { GraphSvg } from "./Graph";
import { AuthorityTrend, OrganicDbSelect, ScopeSelect, SuspiciousBadge } from "./OverviewPopups";
import { DarkBtn, ExtLink, Flag } from "./ui";

function CompareBar() {
  const [extra, setExtra] = useState(0);
  return (
    <div className="flex gap-2">
      <div>
        <ScopeSelect testid="scope-0" />
        <div className="mt-[8px] flex h-7 w-[174px] items-center gap-[8px] rounded-md border border-[#d3d5db] bg-[#f4f5f9] px-2 text-[14px]">
          <span className="rounded-full bg-[#e2e3fb] px-[8px] text-[12px] leading-[18px] text-[#5a50c8]">You</span>
          {domain}
        </div>
      </div>
      {Array.from({ length: 1 + extra }, (_, i) => (
        <div key={i}>
          <ScopeSelect testid={`scope-${i + 1}`} />
          <div className="mt-[8px] flex h-7 w-[174px] items-center gap-[8px] rounded-md border border-[#d3d5db] bg-white px-[9px] text-[14px]">
            <span className={`h-[12px] w-[12px] shrink-0 rounded-full ${["bg-[#c4c7cf]", "bg-[#3ed4a4]", "bg-[#ffb200]", "bg-[#ff6b70]"][i]}`} />
            <input placeholder="Add competitor" className="w-full bg-transparent outline-none placeholder:text-[#8a8e9b]" />
          </div>
        </div>
      ))}
      <div className="flex items-end gap-4 pl-[1px]">
        <button type="button" className="h-7 rounded-md bg-rk-btn-dark px-[8.5px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
          Compare
        </button>
        {extra < 3 && (
          <button type="button" onClick={() => setExtra(extra + 1)} className="flex h-7 items-center gap-[6px] text-[14px] text-rk-link hover:text-rk-link-hover">
            <PlusIcon width={14} height={14} />
            Add up to 3 competitors
          </button>
        )}
      </div>
    </div>
  );
}

const summaryHref: Record<string, string> = {
  "Referring Domains": routes.referringDomains,
  Backlinks: tabHref("backlinks"),
  "Outbound Domains": tabHref("outboundDomains"),
};

function SummaryBar() {
  return (
    <section className="mt-[16px] flex h-[92px] rounded-lg bg-white px-5 pt-[19px] shadow-card">
      {summary.map((m, i) => {
        const value = (
          <span className="flex items-center gap-[2px] text-[24px] leading-[30px] font-semibold text-rk-number">
            <span className={m.chevron ? "group-hover:underline" : ""}>{m.value}</span>
            {m.chevron && <ChevronDown width={16} height={16} />}
          </span>
        );
        const href = summaryHref[m.label];
        return (
          <div key={m.label} className={`${i ? "border-l border-rk-border pl-[16px]" : ""} h-[52px]`} style={{ width: m.w }}>
            <div className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text-2">
              {m.label}
              <Info />
            </div>
            <div className="mt-[2px] flex items-baseline gap-1">
              {m.chevron ? (
                <OrganicDbSelect value={value} />
              ) : href ? (
                <Link href={href} className="hover:opacity-80">
                  {value}
                </Link>
              ) : (
                value
              )}
              {m.delta && <span className="text-[12px] text-rk-success">{m.delta}</span>}
            </div>
          </div>
        );
      })}
      <div className="h-[52px] flex-1 border-l border-rk-border pl-[16px]">
        <div className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text-2">
          Overall Toxicity Score
          <Info />
        </div>
        <Link href={routes.backlinkAudit} className="mt-[13px] block text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
          Set up Backlink Audit
        </Link>
      </div>
    </section>
  );
}

function W({ title, info = true, children, className = "", body = "", testid }: { title: string; info?: boolean; children: ReactNode; className?: string; body?: string; testid?: string }) {
  return (
    <section data-testid={testid} className={`flex flex-col rounded-lg bg-white shadow-card ${className}`}>
      <header className="flex h-[40px] shrink-0 items-center border-b border-[#ecedf0] px-5">
        <h3 className="flex items-center gap-[8px] text-[16px] leading-6 font-bold">
          {title}
          {info && <Info />}
        </h3>
      </header>
      <div className={`relative flex-1 ${body}`}>{children}</div>
    </section>
  );
}

function Radar() {
  const cx = 172;
  const cy = 127;
  const rd = (v: number) => Math.round(v * 10) / 10;
  return (
    <div className="relative h-[250px]">
      <svg width={344} height={250} className="absolute inset-0">
        {[90, 72, 54, 36, 18].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#e6e8eb" strokeDasharray={r === 90 ? undefined : "1.5 2.5"} />
        ))}
        {[-150, -30, 90].map((a) => (
          <line key={a} x1={cx} y1={cy} x2={rd(cx + 90 * Math.cos((a * Math.PI) / 180))} y2={rd(cy + 90 * Math.sin((a * Math.PI) / 180))} stroke="#e6e8eb" strokeDasharray="1.5 2.5" />
        ))}
        <path d={`M${cx} ${cy + 89}C${cx - 3} ${cy + 60} ${cx - 2} ${cy - 30} ${cx + 5} ${cy - 34}C${cx + 9} ${cy - 30} ${cx + 5} ${cy + 60} ${cx} ${cy + 89}Z`} fill="#dfe3fb" stroke="#b3bcf5" strokeWidth={2.5} />
        <circle cx={cx - 1} cy={cy - 2} r={4.5} fill="#b3bcf5" />
        <circle cx={cx + 9} cy={cy - 7} r={4.5} fill="#b3bcf5" />
        <circle cx={cx} cy={cy + 89} r={4.5} fill="#b3bcf5" />
      </svg>
      <span className="absolute top-[55px] left-[43px] text-center text-[12px] leading-4 text-rk-text-2">
        Link
        <br />
        Power
      </span>
      <span className="absolute top-[55px] left-[259px] text-center text-[12px] leading-4 text-rk-text-2">
        Organic
        <br />
        Traffic
      </span>
      <span className="absolute top-[227px] left-[131px] text-[12px] leading-4 text-rk-text-2">Natural Profile</span>
    </div>
  );
}

function PeriodToggle({ value, onChange }: { value: "1Y" | "All Time"; onChange: (v: "1Y" | "All Time") => void }) {
  return (
    <div className="absolute top-[23px] right-5 flex gap-[16px]">
      {(["1Y", "All Time"] as const).map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)} className="relative h-5 text-[14px] leading-5 text-rk-text hover:text-rk-link">
          {o}
          {o === value && <span className="absolute -right-[1px] -bottom-[4px] -left-[1px] h-[3px] rounded-sm bg-rk-tab" />}
        </button>
      ))}
    </div>
  );
}

function TrendWidget({ title, oneYear, all, testid }: { title: string; oneYear: { data: number[]; ticks: string[] }; all: { data: number[]; ticks: string[] }; testid?: string }) {
  const [p, setP] = useState<"1Y" | "All Time">("1Y");
  const d = p === "1Y" ? oneYear : all;
  const span = +d.ticks[0] - +d.ticks[d.ticks.length - 1];
  const tickPx = title === "Backlinks" && p === "1Y" ? 103 : 110;
  return (
    <W title={title} className="h-[319px]" testid={testid}>
      <PeriodToggle value={p} onChange={setP} />
      <AreaChart data={d.data} ticks={d.ticks} labels={p === "1Y" ? trendLabels : allTimeLabels} base={199} ppu={tickPx / span} />
    </W>
  );
}

function NewLostWidget({ title, d, href }: { title: string; d: typeof newLostRd; href: string }) {
  return (
    <W title={title} className="h-[347px]" body="px-5 pt-[20px]">
      <NewLostChart newV={d.newV} lostV={d.lostV} max={d.max} ticks={d.ticks} labels={weeks} every={4} left={90} right={40} zero={174} unit={101 / d.max} />
      <div className="absolute top-[259px] left-5">
        <DarkBtn href={href}>View full report</DarkBtn>
      </div>
    </W>
  );
}

function Bar({ w, color = "#6167e6", h = 16, min = 3 }: { w: number; color?: string; h?: number; min?: number }) {
  return (
    <div className="flex-1 rounded-[2px] bg-[#f2f2f2]" style={{ height: h }}>
      {w > 0 && <div className="h-full rounded-[2px]" style={{ width: `max(${w}%, ${min}px)`, background: color }} />}
    </div>
  );
}

function Num({ v, className = "" }: { v: number; className?: string }) {
  return v ? (
    <Link href={routes.referringDomains} className={`text-rk-link hover:text-rk-link-hover ${className}`}>
      {v}
    </Link>
  ) : (
    <span className={className}>{v}</span>
  );
}

function CategoriesWidget() {
  return (
    <W title="Categories of Referring Domains" info={false} className="h-[440px]" body="px-5 pt-[20px]">
      {categories.map((c) => (
        <div key={c.label} className="mb-[20px]">
          <div className="flex h-5 items-center text-[14px] leading-5">
            <span className="flex-1">{c.label}</span>
            <span className="text-rk-muted">{c.pct}</span>
            <Num v={c.count} className="ml-[7px]" />
          </div>
          <div className="mt-[8px] flex">
            <Bar w={c.w} />
          </div>
        </div>
      ))}
      <div className="absolute top-[352px] left-5">
        <DarkBtn href={routes.referringDomains}>View full report</DarkBtn>
      </div>
    </W>
  );
}

function AnchorsWidget() {
  return (
    <W title="Top Anchors" className="h-[440px]">
      {cloud.map((c) => (
        <Link
          key={c.text}
          href={tabHref("anchors")}
          className={`absolute leading-none font-semibold whitespace-nowrap text-[#6167e6] hover:text-[#4e53c9] ${c.italic ? "italic" : ""}`}
          style={{ left: c.x, top: c.y - c.size * 0.5 - 37, fontSize: c.size }}
        >
          {c.text}
        </Link>
      ))}
      <div className="absolute top-[353px] left-5">
        <DarkBtn href={tabHref("anchors")}>View full report</DarkBtn>
      </div>
    </W>
  );
}

function AuthorityWidget() {
  return (
    <W title="Referring Domains by Authority Score" className="h-[432px]" body="px-5 pt-[13px]">
      {authorityBuckets.map((b) => (
        <div key={b.label} className="flex h-[32px] items-center text-[14px]">
          <span className="w-[68px]">{b.label}</span>
          <Bar w={b.w} color={b.color} />
          <span className="w-[47px] text-right text-rk-muted">{b.pct}</span>
          <Num v={b.count} className="w-[35px] text-right" />
        </div>
      ))}
      <div className="absolute top-[345px] left-5">
        <DarkBtn href={routes.referringDomains}>View full report</DarkBtn>
      </div>
    </W>
  );
}

function TypesWidget() {
  const row = (r: { label: string; pct: string; w: number; count: number; color?: string }, lw: number) => (
    <div key={r.label} className="flex h-[40px] items-center text-[14px]">
      <span style={{ width: lw }}>{r.label}</span>
      <Bar w={r.w} color={r.color} />
      <span className="w-[47px] text-right text-rk-muted">{r.pct}</span>
      {r.count ? (
        <Link href={tabHref("backlinks")} className="w-[43px] text-right text-rk-link hover:text-rk-link-hover">
          {r.count}
        </Link>
      ) : (
        <span className="w-[43px] text-right">{r.count}</span>
      )}
    </div>
  );
  return (
    <section className="flex h-[432px] flex-col rounded-lg bg-white shadow-card">
      <header className="flex h-[40px] shrink-0 items-center border-b border-[#ecedf0] px-5">
        <h3 className="text-[16px] leading-6 font-bold">Backlink Types</h3>
      </header>
      <div className="px-5 pt-[9px] pb-[8px]">{backlinkTypes.map((r) => row(r, 76))}</div>
      <header className="flex h-[40px] shrink-0 items-center border-y border-[#ecedf0] px-5">
        <h3 className="text-[16px] leading-6 font-bold">Link Attributes</h3>
      </header>
      <div className="px-5 pt-[8px]">{linkAttributes.map((r) => row(r, 87))}</div>
    </section>
  );
}

function Donut() {
  const total = tlds.reduce((a, t) => a + t.v, 0);
  const R = 76;
  const C = 2 * Math.PI * R;
  const segs = tlds.filter((t) => t.v).map((t, i, arr) => ({ ...t, len: (t.v / total) * C, off: (arr.slice(0, i).reduce((a, x) => a + x.v, 0) / total) * C }));
  return (
    <svg width={180} height={180} viewBox="0 0 180 180" className="shrink-0">
      <g transform="rotate(-90 90 90)">
        {segs.map((t) => (
          <circle key={t.label} cx={90} cy={90} r={R} fill="none" stroke={t.color} strokeWidth={24} strokeDasharray={`${Math.max(t.len - 1.5, 0)} ${C}`} strokeDashoffset={-t.off} />
        ))}
      </g>
    </svg>
  );
}

function TldWidget() {
  return (
    <W title="TLD Distribution" className="h-[334px]" body="flex px-5 pt-[20px]">
      <Donut />
      <table className="ml-[24px] h-fit flex-1 text-[14px]">
        <thead>
          <tr className="h-[32px] border-b border-[#e1e3e5] text-[12px] text-rk-text">
            <th className="pl-[8px] text-left font-normal">TLD</th>
            <th className="pr-[8px] text-right font-normal" colSpan={2}>
              Referring Domains
            </th>
          </tr>
        </thead>
        <tbody>
          {tlds.map((t) => (
            <tr key={t.label} className="h-[37px] border-b border-[#eeeff1] last:border-0">
              <td className="pl-[8px]">
                <span className="flex items-center gap-[6px]">
                  <span className="h-3 w-3 rounded-full" style={{ background: t.color }} />
                  {t.label}
                </span>
              </td>
              <td className="w-[80px] text-rk-muted">{t.pct}</td>
              <td className="pr-[8px] text-right">
                <Num v={t.v} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </W>
  );
}

function CountriesWidget() {
  return (
    <W title="Top Countries" className="h-[334px]" body="pt-[20px]">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="h-[32px] border-b border-[#e1e3e5] text-[12px] text-rk-text">
            <th className="pl-5 text-left font-normal">Country</th>
            <th className="pr-5 text-right font-normal" colSpan={3}>
              Referring Domains
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map((c) => (
            <tr key={c.name} className="h-[37px] border-b border-[#eeeff1] last:border-0">
              <td className="pl-5">
                <span className="flex items-center gap-[4px]">
                  <Flag code={c.flag} />
                  {c.name}
                </span>
              </td>
              <td className="w-[88px]">
                <div className="flex">
                  <Bar w={c.w} h={8} min={2} />
                </div>
              </td>
              <td className="w-[48px] text-right text-rk-muted">{c.pct}</td>
              <td className="w-[54px] pr-5 text-right">
                <Num v={c.v} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </W>
  );
}

function ProfileWidget() {
  const rows: { label: string; v: number; dark?: boolean }[] = [
    { label: "Ref. Domains", v: 263 },
    { label: "Ref. IPs", v: 181 },
    { label: "Ref. Subnets", v: 138, dark: true },
  ];
  const bars = [
    { l: 159, w: 344, t: 21, color: "#6167e6" },
    { l: 213, w: 237, t: 127, color: "#8a8ee8" },
    { l: 241, w: 180, t: 233, color: "#a4a7ed" },
  ];
  return (
    <W title="Link Profile distribution" className="h-[369px]">
      <svg className="absolute top-0 left-0" width={524} height={270}>
        <path d="M159 49 L503 49 L450 127 L213 127 Z" fill="#f2f2f2" />
        <path d="M213 155 L450 155 L421 233 L241 233 Z" fill="#f2f2f2" />
      </svg>
      {bars.map((b) => (
        <div key={b.t} className="absolute h-[28px]" style={{ left: b.l, width: b.w, top: b.t, background: b.color }} />
      ))}
      {rows.map((r, i) => (
        <div key={r.label} className="absolute left-5" style={{ top: 20 + i * 94 }}>
          <div className="flex h-5 items-center gap-[7px] text-[14px] text-rk-text">
            {r.label}
            <Info />
          </div>
          <div className={`mt-[4px] text-[24px] leading-[30px] font-bold ${r.dark ? "text-rk-text" : "text-[#6167e6]"}`}>{r.v}</div>
        </div>
      ))}
      <div className="absolute top-[281px] left-5">
        <DarkBtn href={tabHref("refIps")}>View full report</DarkBtn>
      </div>
    </W>
  );
}

function EmptyIllustration() {
  return (
    <svg width={76} height={72} viewBox="0 0 76 72">
      <path d="M10 18c6-12 26-16 40-12 14 3 24 12 25 26 1 16-8 30-24 34-15 4-34 2-44-8C-1 49 3 30 10 18z" fill="#e4e5ea" />
      <g transform="rotate(-8 38 36)">
        <rect x="14" y="14" width="50" height="42" rx="3" fill="#fff" stroke="#6c6e79" strokeWidth="1.6" />
        <path d="M14 17a3 3 0 0 1 3-3h44a3 3 0 0 1 3 3v6H14z" fill="#6c6e79" />
        <circle cx="19" cy="19" r="1.4" fill="#fff" />
        <circle cx="24" cy="19" r="1.4" fill="#fff" />
        <path d="M34 23v33M14 39h50" stroke="#6c6e79" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

function SimilarWidget() {
  return (
    <W title="Similar Profiles" className="h-[369px]" body="flex flex-col items-center pt-[110px]">
      <EmptyIllustration />
      <div className="mt-[13px] text-[16px] leading-6 font-semibold text-rk-muted">We have no data to show</div>
    </W>
  );
}

function TopPagesWidget() {
  return (
    <W title="Top Pages" className="h-[350px]" body="pt-[20px]">
      <table className="w-full text-[14px]">
        <thead>
          <tr className="h-[32px] border-b border-[#e1e3e5] text-[12px] text-rk-text">
            <th className="pl-5 text-left font-normal">URL</th>
            <th className="pr-5 text-right font-normal">Referring Domains</th>
          </tr>
        </thead>
        <tbody>
          {topPages.map((p) => (
            <tr key={p.url} className="h-[37px] border-b border-[#eeeff1] last:border-0">
              <td className="pl-5">
                <span className="inline-flex items-center gap-[4px]">
                  <Link href={tabHref("pages")} className="text-rk-link hover:text-rk-link-hover">
                    {p.url}
                  </Link>
                  <ExtLink href={p.url} />
                </span>
              </td>
              <td className="pr-5 text-right">
                <Num v={p.v} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute top-[262px] left-5">
        <DarkBtn href={tabHref("pages")}>View full report</DarkBtn>
      </div>
    </W>
  );
}

function CourseCard() {
  return (
    <section className="h-[175px] rounded-lg bg-white p-5 shadow-card">
      <div className="relative h-[88px] overflow-hidden bg-[#f07586]">
        <div className="absolute top-[20px] left-[19px] text-[16px] leading-6 font-bold text-white">
          Backlink Management
          <br />
          Course with an SEO expert
        </div>
        <svg className="absolute right-[12px] bottom-0" width={110} height={88} viewBox="0 0 110 88">
          <path d="M18 88c2-22 16-34 37-34s35 12 37 34z" fill="#3b3f4a" />
          <ellipse cx="55" cy="36" rx="20" ry="23" fill="#f1c7a8" />
          <path d="M36 32c0-14 8-22 19-22s19 8 19 22c-4-6-10-9-19-9s-15 3-19 9z" fill="#e9b894" />
          <path d="M40 54c4 9 26 9 30 0-2 12-28 12-30 0z" fill="#b98a6a" />
          <circle cx="47" cy="36" r="6" fill="none" stroke="#1d1f26" strokeWidth="2" />
          <circle cx="63" cy="36" r="6" fill="none" stroke="#1d1f26" strokeWidth="2" />
          <path d="M53 36h4" stroke="#1d1f26" strokeWidth="2" />
          <path d="M8 88 30 60h52l20 28z" fill="#f4c34c" />
          <path d="M55 60v28" stroke="#b58a1d" strokeWidth="2" />
        </svg>
      </div>
      <DarkBtn className="mt-[20px]">Start learning</DarkBtn>
    </section>
  );
}

function SuggestCard() {
  return (
    <section className="h-[157px] rounded-lg bg-white shadow-card">
      <header className="flex h-[40px] items-center border-b border-[#ecedf0] px-5">
        <h3 className="text-[16px] leading-6 font-bold">Add your widget</h3>
      </header>
      <div className="px-5 pt-[19px] text-[14px] leading-[19px] text-rk-text">
        We want to improve our Overview report.
        <br />
        Let us know what widgets you’d like us to add.
      </div>
      <button type="button" className="mx-5 mt-[11px] h-7 rounded-md border border-[#d3d5db] bg-[#f4f5f9] px-[8px] text-[14px] text-rk-text-2 hover:bg-rk-hover">
        Suggest widget
      </button>
    </section>
  );
}

export function OverviewBody() {
  return (
    <>
      <CompareBar />
      <SummaryBar />
      <div className="mt-[17px] grid grid-cols-3 gap-4">
        <W title="Authority Score" className="h-[369px]" body="pt-[16px]">
          <div className="flex items-center gap-[8px] px-5">
            <span className="text-[20px] leading-6 font-bold">8</span>
            <span className="rounded-full bg-[#e7e5fb] px-[9px] text-[12px] leading-[20px] text-[#5a50c8]">Low authority</span>
          </div>
          <Radar />
        </W>
        <W title="Authority Score Trend" className="h-[369px]">
          <AuthorityTrend />
        </W>
        <W title="Network Graph" className="h-[369px]" body="px-5 pt-[19px]">
          <SuspiciousBadge />
          <GraphSvg scale={0.407} x={60} y={31} label={13} />
          <div className="absolute top-[280px] left-5">
            <DarkBtn href={tabHref("networkGraph")}>View full report</DarkBtn>
          </div>
        </W>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <TrendWidget title="Referring Domains" oneYear={rdTrend} all={rdAllTime} testid="w-rd" />
        <TrendWidget title="Backlinks" oneYear={blTrend} all={blAllTime} />
        <NewLostWidget title="New and Lost Referring Domains" d={newLostRd} href={routes.referringDomains} />
        <NewLostWidget title="New and Lost Backlinks" d={newLostBl} href={tabHref("backlinks")} />
        <CategoriesWidget />
        <AnchorsWidget />
        <AuthorityWidget />
        <TypesWidget />
        <TldWidget />
        <CountriesWidget />
        <ProfileWidget />
        <SimilarWidget />
        <TopPagesWidget />
        <div className="flex flex-col gap-[18px]">
          <CourseCard />
          <SuggestCard />
        </div>
      </div>
    </>
  );
}

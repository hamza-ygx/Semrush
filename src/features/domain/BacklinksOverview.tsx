"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronDown, DotsIcon, PlusIcon } from "@/components/ui/icons";
import { Info } from "@/components/ui/primitives";
import { anchors, authorityTrend, backlinkSummary, backlinkTabs, backlinksTrend, categories, domain, newLostDomains, refDomains, refDomainsTrend, tldDistribution } from "./data";
import { Plot, VBW, linePath, pts, smoothPath, Stroke } from "./charts";
import { DarkButton, Dot, ExportButton, ExtLink, Flag } from "./ui";

export function BacklinkTabs() {
  const [active, setActive] = useState("Overview");
  return (
    <div className="-mx-8 flex items-end gap-[25px] border-b-2 border-[#c4c5cb] px-8">
      {backlinkTabs.map((t) => {
        const on = t === active;
        const cls = `relative -mb-[2px] pb-[10px] text-[16px] leading-6 whitespace-nowrap ${on ? "text-rk-text" : "text-rk-text hover:text-rk-link"}`;
        const bar = on && <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-sm bg-rk-tab" />;
        return t === "Overview" ? (
          <Link key={t} href={routes.backlinks} className={cls} onClick={() => setActive(t)}>
            {t}
            {bar}
          </Link>
        ) : (
          <button key={t} type="button" className={cls} onClick={() => setActive(t)}>
            {t}
            {bar}
          </button>
        );
      })}
      <Popover
        className="mb-[12px]"
        panelClassName="min-w-[200px]"
        trigger={({ toggle }) => (
          <button type="button" aria-label="More reports" onClick={toggle} className="-ml-[6px] flex h-5 w-7 items-center justify-center text-rk-text hover:text-rk-link">
            <DotsIcon width={18} height={18} />
          </button>
        )}
      >
        <MenuItem href={routes.referringDomains}>Referring Domains</MenuItem>
        <MenuItem href={routes.backlinkAudit}>Backlink Audit</MenuItem>
        <MenuItem href={routes.backlinkGap}>Backlink Gap</MenuItem>
        <MenuItem>Referring IPs</MenuItem>
      </Popover>
    </div>
  );
}

const scopes = ["Root Domain", "Subdomain", "Subfolder", "Exact URL"] as const;

function ScopeSelect() {
  return (
    <Popover
      panelClassName="min-w-[150px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex items-center gap-1 text-[14px] leading-5 text-rk-text">
          Root Domain
          <ChevronDown width={14} height={14} className="text-rk-text" />
        </button>
      )}
    >
      {(close) =>
        scopes.map((s) => (
          <MenuItem key={s} onClick={close} active={s === "Root Domain"}>
            {s}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function CompareBar() {
  const [extra, setExtra] = useState(0);
  return (
    <div className="flex gap-2">
      <div>
        <ScopeSelect />
        <div className="mt-[8px] flex h-7 w-[174px] items-center gap-[8px] rounded-md border border-[#d4d6d5] bg-[#f5f6f6] px-2 text-[14px]">
          <span className="rounded-full bg-[#e2e3fb] px-[8px] text-[12px] leading-[18px] text-[#5a50c8]">You</span>
          {domain}
        </div>
      </div>
      {Array.from({ length: 1 + extra }, (_, i) => (
        <div key={i}>
          <ScopeSelect />
          <div className="mt-[8px] flex h-7 w-[174px] items-center gap-[8px] rounded-md border border-[#d4d6d5] bg-white px-[9px] text-[14px]">
            <span className={`h-[12px] w-[12px] rounded-full ${["bg-[#d6d8d7]", "bg-[#3ed4a4]", "bg-[#ffb200]", "bg-[#ff6b70]"][i]}`} />
            <input placeholder="Add competitor" className="w-full bg-transparent outline-none placeholder:text-[#8b8d8c]" />
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

function SummaryBar() {
  const widths = ["w-[158px]", "w-[115px]", "w-[145px]", "w-[150px]", "w-[180px]"];
  return (
    <section className="mt-[17px] flex h-[91px] rounded-lg bg-white px-5 pt-[19px] shadow-card">
      {backlinkSummary.map((m, i) => {
        const value = (
          <span className="flex items-center gap-[2px] text-[24px] leading-[30px] font-semibold text-rk-number">
            {m.value}
            {m.chevron && <ChevronDown width={16} height={16} />}
          </span>
        );
        return (
          <div key={m.label} className={`${widths[i]} ${i ? "border-l border-rk-border pl-[16px]" : ""} h-[52px]`}>
            <div className="flex items-center gap-[6px] text-[14px] leading-5 text-rk-text-2">
              {m.label}
              <Info />
            </div>
            <div className="mt-[2px] flex items-baseline gap-1">
              {m.href ? (
                <Link href={m.href} className="hover:opacity-80">
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
        <Link href={routes.backlinkAudit} className="mt-[6px] block text-[14px] leading-5 text-rk-link hover:text-rk-link-hover">
          Set up Backlink Audit
        </Link>
      </div>
    </section>
  );
}

function Card({ title, children, right, className = "", bodyClassName = "" }: { title: string; children: ReactNode; right?: ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <section className={`flex flex-col rounded-lg bg-white shadow-card ${className}`}>
      <header className="flex h-[41px] shrink-0 items-center justify-between border-b border-rk-border px-5">
        <h3 className="flex items-center gap-[6px] text-[16px] leading-6 font-bold">
          {title}
          <Info />
        </h3>
        {right}
      </header>
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

function Radar() {
  const cx = 172;
  const cy = 127;
  return (
    <div className="relative h-[250px]">
      <svg width={344} height={250} className="absolute inset-0">
        {[90, 72, 54, 36, 18].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#eceef1" />
        ))}
        {[-150, -30, 90].map((a) => (
          <line key={a} x1={cx} y1={cy} x2={rd(cx + 90 * Math.cos((a * Math.PI) / 180))} y2={rd(cy + 90 * Math.sin((a * Math.PI) / 180))} stroke="#eceef1" />
        ))}
        <path d={`M${cx} ${cy + 89}C${cx - 5} ${cy + 60} ${cx - 4} ${cy - 30} ${cx + 4} ${cy - 33}C${cx + 10} ${cy - 30} ${cx + 8} ${cy + 60} ${cx} ${cy + 89}Z`} fill="#dfe3fb" stroke="#b3bcf5" strokeWidth={2.5} />
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

function AuthorityTrend() {
  const H = 209;
  const p = pts(authorityTrend, 100, H, 0.02, 0.9);
  return (
    <div className="px-5 pt-[16px]">
      <div className="text-right text-[14px] text-rk-text-2">Last 12 months</div>
      <Plot
        className="mt-[31px]"
        height={H}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        left={["0", "25", "50", "75", "100"]}
        leftW={40}
        rightW={20}
        gap={16}
        xGap={9}
        bottomH={26}
        baseColor="#e7e8e8"
        x={[
          { at: 0.02, label: "Oct 2025" },
          { at: 0.375, label: "Feb 2026" },
          { at: 0.725, label: "May 2026" },
        ]}
        labelClass="text-[12px] leading-4 text-rk-text-2"
        overlay={
          <svg viewBox="0 0 12 12" width={12} height={12} className="absolute -bottom-[9px]" style={{ left: "82%" }}>
            <path d="M1 1h10v7H4l-3 3z" fill="#ff4953" />
          </svg>
        }
      >
        <Stroke d={linePath(p)} color="#6167e6" width={2.5} />
        <Stroke d={linePath([p[p.length - 1], [VBW * 0.98, p[p.length - 1][1]]])} color="#6167e6" width={2.5} dash="4 4" />
      </Plot>
    </div>
  );
}

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rd = (v: number) => Math.round(v * 10) / 10;

const graph = (() => {
  const r = rng(42);
  const nodes: { x: number; y: number; s: number }[] = [];
  for (let i = 0; i < 110; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    nodes.push({ x: rd(160 + Math.cos(a) * d * 105 + (r() - 0.5) * 20), y: rd(150 + Math.sin(a) * d * 80), s: r() < 0.15 ? 3.4 : r() < 0.5 ? 2.4 : 1.6 });
  }
  for (let i = 0; i < 28; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    nodes.push({ x: rd(212 + Math.cos(a) * d * 30), y: rd(35 + Math.sin(a) * d * 26), s: r() < 0.3 ? 2.6 : 1.8 });
  }
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    const k = 2 + Math.floor(r() * 2);
    for (let j = 0; j < k; j++) edges.push([i, Math.floor(r() * nodes.length)]);
  });
  return { nodes, edges: edges.filter(([a, b]) => Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) < 90) };
})();

function NetworkGraph() {
  return (
    <div className="relative px-5 pt-[20px]">
      <span className="inline-flex h-[21px] items-center rounded-full bg-[#fde6cf] px-[9px] text-[12px] text-[#b04a00]">Suspicious</span>
      <svg width={300} height={250} className="absolute top-[9px] left-[2px]">
        {graph.edges.map(([a, b], i) => (
          <line key={i} x1={graph.nodes[a].x} y1={graph.nodes[a].y} x2={graph.nodes[b].x} y2={graph.nodes[b].y} stroke="#d5d6da" strokeWidth={0.6} />
        ))}
        {graph.nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.s} fill="#c4c5c9" />
        ))}
        <text x={158} y={142} textAnchor="middle" fontSize={13} fontWeight={600} fill="#5c5cc4" stroke="#fff" strokeWidth={3} paintOrder="stroke">
          {domain}
        </text>
      </svg>
      <div className="absolute top-[280px] left-5">
        <DarkButton>View full report</DarkButton>
      </div>
    </div>
  );
}

function TrendCard() {
  const [metric, setMetric] = useState<"Referring Domains" | "Backlinks">("Referring Domains");
  const data = metric === "Backlinks" ? backlinksTrend : refDomainsTrend;
  const max = metric === "Backlinks" ? 400 : 300;
  const H = 180;
  const p = pts(data, max, H);
  return (
    <Card title="Backlink Profile Trend" className="mt-4" bodyClassName="px-5 pt-4 pb-5">
      <div className="flex gap-4">
        {(["Referring Domains", "Backlinks"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMetric(m)} className="relative pb-[4px] text-[14px] hover:text-rk-link">
            {m}
            {m === metric && <span className="absolute right-0 -bottom-[1px] left-0 h-[3px] rounded-sm bg-rk-tab" />}
          </button>
        ))}
      </div>
      <Plot
        className="mt-6"
        height={H}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        right={[0, 0.25, 0.5, 0.75, 1].map((t) => String(Math.round(t * max)))}
        rightW={40}
        gap={12}
        x={newLostDomains.labels.map((l, i) => ({ at: i / 11, label: l }))}
      >
        <path d={`${smoothPath(p)}L${VBW} ${H}L0 ${H}Z`} fill="#6167e6" opacity={0.08} />
        <Stroke d={smoothPath(p)} color="#6167e6" width={2.5} />
      </Plot>
    </Card>
  );
}

function NewLostCard() {
  const H = 150;
  const max = 25;
  const n = newLostDomains.newD.length;
  return (
    <Card title="New & Lost Referring Domains" bodyClassName="px-5 pt-5 pb-5">
      <div className="flex gap-5 text-[14px]">
        <span className="flex items-center gap-[6px]">
          <Dot color="#00c78f" />
          New
        </span>
        <span className="flex items-center gap-[6px]">
          <Dot color="#ff6b70" />
          Lost
        </span>
      </div>
      <Plot
        className="mt-5"
        height={H}
        ticks={[0, 0.5, 1]}
        right={["0", "13", "25"]}
        rightW={28}
        x={newLostDomains.labels.map((l, i) => ({ at: (i + 0.5) / n, label: i % 3 === 0 ? l : "" })).filter((l) => l.label)}
        overlay={newLostDomains.newD.flatMap((v, i) => [
          <span key={`n${i}`} className="absolute bottom-0 w-[9px] -translate-x-[10px] bg-[#00c78f]" style={{ left: `${((i + 0.5) / n) * 100}%`, height: `${(v / max) * 100}%` }} />,
          <span key={`l${i}`} className="absolute bottom-0 w-[9px] translate-x-[1px] bg-[#ff6b70]" style={{ left: `${((i + 0.5) / n) * 100}%`, height: `${(newLostDomains.lostD[i] / max) * 100}%` }} />,
        ])}
      />
    </Card>
  );
}

function CategoriesCard() {
  return (
    <Card title="Categories of Referring Domains" bodyClassName="px-5 pt-4 pb-5">
      {categories.map((c) => (
        <div key={c.label} className="py-[7px]">
          <div className="flex justify-between text-[14px] leading-5">
            <span className="truncate pr-4">{c.label}</span>
            <span className="text-rk-muted">{c.pct}%</span>
          </div>
          <div className="mt-[5px] h-[6px] rounded-full bg-[#eceef1]">
            <div className="h-full rounded-full bg-[#6167e6]" style={{ width: `${c.pct * 3}%` }} />
          </div>
        </div>
      ))}
    </Card>
  );
}

function TopAnchorsCard() {
  return (
    <Card title="Top Anchors" right={<ExportButton />} bodyClassName="pt-[18px] pb-5">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className="h-[33px] border-b border-rk-border text-[12px] text-rk-text-2">
            <th className="pl-5 text-left font-normal">Anchor</th>
            <th className="w-[90px] text-right font-normal">Domains</th>
            <th className="w-[100px] pr-5 text-right font-normal">Backlinks</th>
          </tr>
        </thead>
        <tbody>
          {anchors.map((a) => (
            <tr key={a.anchor} className="h-[37px] border-b border-rk-border">
              <td className={`pl-5 ${a.empty ? "text-rk-text-2 italic" : ""}`}>
                <span className="block truncate">{a.anchor}</span>
              </td>
              <td className="text-right">{a.domains}</td>
              <td className="pr-5 text-right">{a.backlinks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 px-5">
        <DarkButton>View details</DarkButton>
      </div>
    </Card>
  );
}

function TopRefDomainsCard() {
  return (
    <Card title="Top Referring Domains" right={<ExportButton />} bodyClassName="pt-[18px] pb-5">
      <table className="w-full table-fixed text-[14px] leading-5">
        <thead>
          <tr className="h-[33px] border-b border-rk-border text-[12px] text-rk-text-2">
            <th className="pl-5 text-left font-normal">Root Domain</th>
            <th className="w-[160px] text-left font-normal">Country/IP</th>
            <th className="w-[100px] pr-5 text-right font-normal">Backlinks</th>
          </tr>
        </thead>
        <tbody>
          {refDomains.map((d) => (
            <tr key={d.domain} className="h-[37px] border-b border-rk-border">
              <td className="pl-5">
                <span className="flex items-center gap-1">
                  <Link href={routes.referringDomains} className="text-rk-link hover:text-rk-link-hover">
                    {d.domain}
                  </Link>
                  <ExtLink href={`https://${d.domain}`} />
                </span>
              </td>
              <td>
                <span className="flex items-center gap-[6px]">
                  <Flag code={d.flag} />
                  {d.ip}
                </span>
              </td>
              <td className="pr-5 text-right">{d.backlinks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-5 px-5">
        <DarkButton href={routes.referringDomains}>View details</DarkButton>
      </div>
    </Card>
  );
}

function TldCard() {
  return (
    <Card title="TLD Distribution" bodyClassName="px-5 pt-5 pb-5">
      <div className="flex h-4 gap-[2px] overflow-hidden rounded-sm">
        {tldDistribution.map((t) => (
          <div key={t.label} style={{ width: `${t.pct}%`, background: t.color }} />
        ))}
      </div>
      <div className="mt-4">
        {tldDistribution.map((t) => (
          <div key={t.label} className="flex h-9 items-center border-b border-rk-border text-[14px] last:border-0">
            <Dot color={t.color} />
            <span className="ml-[6px] flex-1">{t.label}</span>
            <span className="text-rk-muted">{t.pct}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function BacklinksOverviewBody() {
  return (
    <>
      <CompareBar />
      <SummaryBar />
      <div className="mt-[17px] grid grid-cols-3 gap-4">
        <Card title="Authority Score" className="h-[386px]" bodyClassName="relative pt-[16px]">
          <div className="flex items-center gap-[8px] px-5">
            <span className="text-[20px] leading-6 font-bold">8</span>
            <span className="rounded-full bg-[#e7e5fb] px-[9px] text-[12px] leading-[20px] text-[#5a50c8]">Low authority</span>
          </div>
          <Radar />
        </Card>
        <Card title="Authority Score Trend" className="h-[386px]">
          <AuthorityTrend />
        </Card>
        <Card title="Network Graph" className="h-[386px]">
          <NetworkGraph />
        </Card>
      </div>
      <TrendCard />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <NewLostCard />
        <CategoriesCard />
        <TopAnchorsCard />
        <TopRefDomainsCard />
      </div>
      <div className="mt-4">
        <TldCard />
      </div>
    </>
  );
}

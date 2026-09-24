import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { AppShell } from "@/components/shell/AppShell";
import { SiteAuditHeader } from "../SiteAuditHeader";
import { BarChart, Dot, InfoI, Ring, Venn } from "./ui";
import {
  C,
  canonicalization,
  crawlDepth,
  hreflangUsage,
  httpStatus,
  incomingLinks,
  markupTypes,
  statTiles,
} from "./data";

const TileIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path
      d="M2.5 2.5h4v4h-4zM9.5 2.5h4v4h-4zM2.5 9.5h4v4h-4zM9.5 9.5h4v4h-4z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    />
  </svg>
);

const GraphIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M1.5 1.5v13h13M4.5 12V7M7.5 12V3.5M10.5 12V8.5M13.5 12V5.5" fill="none" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);

function ViewToggle({ view }: { view: "tile" | "graph" }) {
  const item = (on: boolean, first: boolean) =>
    `flex h-7 items-center gap-2 border px-[9px] text-[14px] ${first ? "rounded-l-md" : "-ml-px rounded-r-md"} ${
      on
        ? "relative z-10 border-[#8fa6f2] bg-[#e5ebfc] text-rk-text-2"
        : "border-rk-border-strong bg-white text-rk-text-2 hover:bg-rk-bg"
    }`;
  return (
    <div className="flex">
      <Link
        href={routes.siteAuditCampaign.statisticsTile}
        className={item(view === "tile", true)}
      >
        <TileIcon />
        Tile
      </Link>
      <Link
        href={routes.siteAuditCampaign.statisticsGraph}
        className={item(view === "graph", false)}
      >
        <GraphIcon />
        Graph
      </Link>
    </div>
  );
}

function StatsPage({
  view,
  children,
}: {
  view: "tile" | "graph";
  children: ReactNode;
}) {
  return (
    <AppShell section="seo">
      <SiteAuditHeader tab="statistics" looker={false} />
      <div className="px-8 pt-3 pb-[152px]">
        <ViewToggle view={view} />
        {children}
      </div>
    </AppShell>
  );
}

export function StatisticsTile() {
  return (
    <StatsPage view="tile">
      <div className="mt-4 grid grid-cols-3 gap-4">
        {statTiles.map((t) => (
          <div
            key={t.title}
            className="rounded-md bg-white shadow-card px-5 pt-5 pb-[18px]"
          >
            <h3 className="text-[16px] leading-6 font-semibold">{t.title}</h3>
            <div className="mt-2 text-[24px] leading-7 font-semibold text-rk-number">
              {t.value}
            </div>
            <div className="text-[14px] leading-5">{t.caption}</div>
            <div className="mt-[10px]">
              {t.rows.map(([k, v]) => (
                <div key={k} className="text-[14px] leading-6 text-rk-muted">
                  {k}: <span className="text-rk-success">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-md bg-white shadow-card px-5 pt-5 pb-[18px]">
          <h3 className="text-[16px] leading-6 font-semibold">AMP Links</h3>
          <div className="mt-2 grid grid-cols-[161px_1fr] gap-5">
            <div>
              <div className="text-[24px] leading-7 font-semibold text-rk-number">
                100%
              </div>
              <div className="text-[14px] leading-5">
                pages have no AMP link
              </div>
            </div>
            <div>
              <div className="text-[24px] leading-7 font-semibold text-rk-success">
                0%
              </div>
              <div className="text-[14px] leading-5">pages have AMP link</div>
            </div>
          </div>
        </div>
      </div>
    </StatsPage>
  );
}

function GraphCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-md bg-white shadow-card ${className}`}>
      <div className="flex h-10 items-center gap-2 border-b border-rk-border px-5">
        <h3 className="text-[16px] leading-6 font-semibold">{title}</h3>
        <InfoI />
      </div>
      {children}
    </div>
  );
}

function DonutLegend({ items }: { items: { label: string; value: number; color: string }[] }) {
  return (
    <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-2 text-[14px] leading-5">
      {items.map((i) => (
        <Fragment key={i.label}>
          <span className="flex items-center whitespace-nowrap">
            <Dot color={i.color} className="mr-2" />
            {i.label}
          </span>
          <span className={`text-right ${i.value ? "" : "text-rk-muted"}`}>{i.value}</span>
        </Fragment>
      ))}
    </div>
  );
}

export function StatisticsGraph() {
  return (
    <StatsPage view="graph">
      <div className="mt-4 grid grid-cols-2 items-start gap-4">
        <div className="flex flex-col gap-4">
          <GraphCard title="HTTP Status Code">
            <div className="flex h-[221px] items-center gap-6 px-5">
              <Ring segments={httpStatus} size={180} thickness={28} />
              <DonutLegend items={httpStatus} />
            </div>
          </GraphCard>
          <GraphCard title="Pages Crawl Depth">
            <div className="flex h-[221px] items-center gap-6 px-5">
              <Ring segments={crawlDepth} size={180} thickness={28} />
              <DonutLegend items={crawlDepth} />
            </div>
          </GraphCard>
          <GraphCard title="Markup Types">
            <div className="px-5 pt-[19px] pb-[26px]">
              {markupTypes.map((m) => (
                <div key={m.label} className="mb-[16px] last:mb-0">
                  <div className="flex text-[14px] leading-5">
                    <span className="flex-1">{m.label}</span>
                    <span className="text-rk-muted">{m.pct}%</span>
                    <span className="ml-2 text-rk-link">{m.count}</span>
                  </div>
                  <div className="mt-[7px] h-5" style={{ background: C.track }}>
                    <div
                      className="h-full"
                      style={{ width: `${m.pct}%`, background: C.blue }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GraphCard>
          <GraphCard title="AMP Links">
            <div className="px-5 pt-[20px] pb-[18px]">
              <div className="h-6" style={{ background: C.orange }} />
              <div className="mt-[18px] space-y-2">
                {[
                  ["Pages with AMP link", "0%", 0, C.blue],
                  ["Pages without AMP link", "100%", 100, C.orange],
                ].map(([l, p, v, c]) => (
                  <div
                    key={l}
                    className="flex items-center text-[14px] leading-5"
                  >
                    <Dot color={c as string} className="mr-2" />
                    <span className="w-[172px]">{l}</span>
                    <span className="w-[44px] text-right text-rk-muted">
                      {p}
                    </span>
                    <span className="w-[44px] text-right text-rk-link">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </GraphCard>
        </div>
        <div className="flex flex-col gap-4">
          <GraphCard title="Sitemap vs. Crawled Pages">
            <div className="flex h-[221px] items-center gap-[30px] px-[33px]">
              <Venn size={160} big={160} small={124} offset={54} />
              <div className="space-y-2">
                {[
                  ["Pages in sitemap", 170, C.blue],
                  ["Crawled pages", 100, C.green],
                ].map(([l, v, c]) => (
                  <div
                    key={l}
                    className="flex items-center text-[14px] leading-5"
                  >
                    <Dot color={c as string} className="mr-2" />
                    <span className="w-[129px]">{l}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </GraphCard>
          <GraphCard title="Incoming Internal Links">
            <div className="h-[221px] px-5 pt-[18px]">
              <BarChart
                data={incomingLinks}
                width={536}
                height={188}
                max={50}
                ticks={[0, 25, 50]}
                left={55}
                top={8}
                bottom={46}
                barGap={4}
                xTitle="Links"
              />
            </div>
          </GraphCard>
          <GraphCard title="Canonicalization">
            <div className="flex h-[235px] items-center gap-6 px-5">
              <Ring segments={canonicalization} size={180} thickness={28} />
              <DonutLegend items={canonicalization} />
            </div>
          </GraphCard>
          <GraphCard title="Hreflang Usage">
            <div className="flex h-[235px] items-center gap-6 px-5">
              <Ring segments={hreflangUsage} size={180} thickness={28} />
              <DonutLegend items={hreflangUsage} />
            </div>
          </GraphCard>
        </div>
      </div>
    </StatsPage>
  );
}

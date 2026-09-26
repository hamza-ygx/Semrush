"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/primitives";
import { ExternalIcon } from "@/components/ui/icons";
import { ThematicPage, Panel } from "./Thematic";
import { BarChart, Dot, InfoI, IssuesCard, Ring } from "./ui";
import { crawlDepth, incomingLinks, linkDistribution, linkingIssues, linkRankPages } from "./data";
import type { SiteAuditHead } from "../load";
import { niceScale, type Bar, type Seg } from "../live";

export type LinkingLive = { score: number; pages: number; crawlDepth: Seg[]; outgoing: Bar[]; counts: Record<string, number>; topLinked: { url: string; display: string; links: number }[] };

const outgoingLinks = [
  { label: "0", value: 0 },
  { label: "1", value: 0 },
  { label: "2-5", value: 2 },
  { label: "6-15", value: 1 },
  { label: "16-50", value: 12 },
  { label: "51-150", value: 68 },
  { label: "151-500", value: 0 },
  { label: "500+", value: 0 },
];

function LinksToggle({ value, onChange }: { value: "in" | "out"; onChange: (v: "in" | "out") => void }) {
  const cls = (on: boolean, first: boolean) =>
    `flex h-7 items-center border px-2 text-[14px] ${first ? "rounded-l-md" : "-ml-px rounded-r-md"} ${
      on ? "relative z-10 border-[#8fa6f2] bg-[#e5ebfc] text-rk-text" : "border-rk-border-strong bg-white text-rk-text-2 hover:bg-rk-bg"
    }`;
  return (
    <div className="flex">
      <button type="button" className={cls(value === "in", true)} onClick={() => onChange("in")}>
        Incoming
      </button>
      <button type="button" className={cls(value === "out", false)} onClick={() => onChange("out")}>
        Outgoing
      </button>
    </div>
  );
}

export function Linking({ head, live }: { head?: SiteAuditHead; live?: LinkingLive | null }) {
  const [dir, setDir] = useState<"in" | "out">("in");
  const depth: Seg[] = live?.crawlDepth ?? crawlDepth;
  const out = live?.outgoing ?? outgoingLinks;
  const outScale = live ? niceScale(Math.max(...out.map((b) => b.value)), 3) : { max: 75, ticks: [0, 25, 50, 75] };
  const top: { ilr?: number; url: string; display?: string; links: number }[] = live?.topLinked ?? linkRankPages;
  return (
    <ThematicPage title="Internal Linking" score={live?.score ?? 90} head={head}>
      <div className="grid grid-cols-[480px_minmax(0,1fr)] items-start gap-4">
        <div className="flex flex-col gap-4">
          <Panel title="Pages Crawl Depth">
            <div className="flex h-[220px] items-center gap-6 px-5">
              <Ring segments={depth} size={180} thickness={28} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">{live?.pages ?? 100}</span>
                <span className="text-[12px] leading-4 text-rk-muted">pages</span>
              </Ring>
              <div className="w-[162px] space-y-2 text-[14px] leading-5">
                {depth.map((s) => (
                  <div key={s.label} className="flex items-center">
                    <Dot color={s.color} className="mr-2" />
                    <span className="flex-1 whitespace-nowrap">{s.label}</span>
                    <span className="w-[40px] text-right text-rk-muted">{s.pct ?? s.value}%</span>
                    <span className="w-[34px] text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
          <Panel title="Internal Links" info head={<LinksToggle value={dir} onChange={setDir} />}>
            <div className="px-5 pt-[20px] pb-[19px]">
              <BarChart data={dir === "in" ? incomingLinks : out} width={440} height={134} max={dir === "in" ? 50 : outScale.max} ticks={dir === "in" ? [0, 25, 50] : outScale.ticks} left={55} top={8} bottom={44} barGap={2} tickGap={15} titleGap={43} xTitle="Links" />
            </div>
          </Panel>
          <Panel title="Internal Link Distribution" info>
            <div className="px-5 pt-[16px] pb-[18px]">
              <div className="flex text-[12px] leading-4">
                <span className="w-[144px]">Links</span>
                <span>Pages</span>
              </div>
              <div className="mt-[9px] space-y-3">
                {linkDistribution.map((d) => (
                  <div key={d.label} className="flex items-center">
                    <div className="relative h-10 w-20 overflow-hidden bg-[#d6e2fb]">
                      <div className="absolute inset-y-0 left-0 bg-[#a7bdf5]" style={{ width: `${Math.max(d.linksPct, 10)}%` }} />
                      <span className="absolute inset-y-0 right-[6px] flex items-center text-[14px] font-semibold">{d.links}</span>
                    </div>
                    <span className="mx-[10px] text-[16px] text-rk-muted">→</span>
                    <div className="relative h-10 w-20 overflow-hidden bg-[#ecdcfb]">
                      <div className="absolute inset-y-0 right-0 bg-[#d3aef7]" style={{ width: `${d.pagesPct}%` }} />
                      <span className="absolute inset-y-0 left-[8px] flex items-center text-[14px] font-semibold">{d.pages}</span>
                    </div>
                    <div className="ml-3 text-[14px] leading-5">
                      <Link href={routes.siteAuditCampaign.crawledPages} className="flex items-center gap-1 text-rk-link hover:text-rk-link-hover">
                        {d.label} <InfoI />
                      </Link>
                      <div>{d.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </div>
        <div className="flex flex-col gap-4">
          <IssuesCard title="Internal Link Issues" groups={linkingIssues} info counts={live?.counts} />
          <Panel title="Pages passing most Internal LinkRank" info>
            <div className="grid h-[69px] grid-cols-[27px_1fr_101px_65px] items-start border-b border-rk-border px-5 pt-[29px] text-[12px] leading-4 text-rk-text-2">
              <span className="text-right">ILR</span>
              <span className="pl-4">URL</span>
              <span>
                Unique
                <br />
                Pageviews
              </span>
              <span className="text-right">
                Outgoing
                <br />
                Links
              </span>
            </div>
            {top.map((p) => (
              <div key={p.url + p.ilr} className="grid h-[37px] grid-cols-[27px_1fr_101px_65px] items-center border-b border-rk-border px-5 text-[14px]">
                <span className="text-right">{p.ilr ?? "—"}</span>
                <span className="pl-4">
                  <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-rk-link hover:text-rk-link-hover">
                    {p.display ?? p.url}
                    <ExternalIcon className="text-rk-muted" />
                  </a>
                </span>
                <span className="pr-[6px] text-right text-rk-muted">—</span>
                <span className="text-right">{p.links}</span>
              </div>
            ))}
            <div className="px-5 pt-[20px] pb-[20px]">
              <Button variant="primary" href={routes.siteAuditCampaign.crawledPages} className="h-[28px] px-[9px] font-medium">
                View full report
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </ThematicPage>
  );
}

import Link from "next/link";
import { routes } from "@/config/routes";
import { ThematicPage, SubCard } from "./Thematic";
import { BarChart, Dot, InfoI, Ring, Venn } from "./ui";
import { C, crawlBudget, crawlDepth, httpStatus, incomingLinks, issueCounts, issueId } from "./data";

function LegendTable({ items }: { items: { label: string; value: number; color: string }[] }) {
  return (
    <div className="space-y-[6px] text-[14px] leading-5">
      {items.map((i) => (
        <div key={i.label} className="flex items-center">
          <Dot color={i.color} className="mr-[6px]" size={14} />
          <span className="w-[100px]">{i.label}</span>
          <span className="text-rk-text-2">{i.value}</span>
        </div>
      ))}
    </div>
  );
}

function PagesCrawledChart() {
  const left = 86;
  const top = 8;
  const H = 120;
  const W = 389;
  const y = (v: number) => top + H - (v / 150) * H;
  return (
    <svg width={475} height={176} className="block">
      {[0, 50, 100, 150].map((t) => (
        <g key={t}>
          <line x1={left} x2={left + W} y1={y(t)} y2={y(t)} stroke={t ? "none" : "#c4c7cf"} />
          <text x={left - 14} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
            {t}
          </text>
        </g>
      ))}
      <text transform={`translate(${left - 46} ${top + H / 2}) rotate(-90)`} textAnchor="middle" fontSize={12} fill="#6c6e79">
        Pages
      </text>
      <circle cx={left + W / 2} cy={y(100)} r={4} fill={C.blue} />
      <text x={left + W / 2} y={top + H + 20} textAnchor="middle" fontSize={12} fill="#6c6e79">
        Wed, Jul 22, 2026 4:11 PM
      </text>
      <text x={left + W / 2} y={top + H + 40} textAnchor="middle" fontSize={12} fill="#6c6e79">
        Crawl Date
      </text>
    </svg>
  );
}

export function Crawlability() {
  const budgetMax = 12;
  return (
    <ThematicPage title="Crawlability" score={92} ringFirst={false} pdf>
      <div className="rounded-md bg-white p-5 pt-[39px] shadow-card">
        <div className="grid grid-cols-2 gap-5">
          <SubCard className="h-[310px] px-4 pt-[18px]">
            <h3 className="text-[16px] leading-5 font-semibold">Site Indexability</h3>
            <div className="mt-[30px] flex items-center gap-11 pl-[20px]">
              <Ring segments={[{ value: 12, color: "#e89a12" }, { value: 88, color: C.green }]} size={190} thickness={24} sep={false}>
                <span className="text-[24px] leading-7 font-semibold">100</span>
                <span className="text-[12px] leading-4 text-rk-muted">pages</span>
              </Ring>
              <div className="-mt-3">
                <Link href={routes.siteAuditCampaign.crawledPages} className="block text-[24px] leading-7 font-semibold text-[#e89a12]">
                  12
                </Link>
                <div className="text-[14px] leading-5">Non-indexable pages</div>
                <Link href={routes.siteAuditCampaign.crawledPages} className="mt-[13px] block text-[24px] leading-7 font-semibold text-[#10c791]">
                  88
                </Link>
                <div className="text-[14px] leading-5">Indexable pages</div>
              </div>
            </div>
          </SubCard>
          <SubCard className="h-[310px] px-4 pt-[18px]">
            <h3 className="flex items-center gap-2 text-[16px] leading-5 font-semibold">
              Crawl Budget Waste <InfoI />
            </h3>
            <div className="mt-[11px] pl-[5px]">
              {crawlBudget.map((r) => {
                const n = r.value;
                const lbl = (
                  <span className="w-[235px] text-[14px] leading-[24.5px]">{r.label}</span>
                );
                return (
                  <div key={r.label} className="flex items-center">
                    {n && issueCounts[r.label] ? (
                      <Link href={routes.siteAuditCampaign.issueDetail(issueId(r.label))} className="flex w-[235px] hover:text-rk-link">
                        {lbl}
                      </Link>
                    ) : (
                      lbl
                    )}
                    <span className="w-5 text-[14px]">{n}</span>
                    <span className="h-3 w-[165px] bg-[#dcdede]">
                      <span className="block h-full bg-[#eb9503]" style={{ width: `${(n / budgetMax) * 100}%` }} />
                    </span>
                  </div>
                );
              })}
            </div>
          </SubCard>
          <SubCard className="h-[254px] px-[26px] pt-[21px]">
            <h3 className="text-[16px] leading-5 font-semibold">Pages Crawled</h3>
            <div className="-ml-[26px] mt-[12px]">
              <PagesCrawledChart />
            </div>
          </SubCard>
          <SubCard className="h-[254px] px-[26px] pt-[21px]">
            <h3 className="text-[16px] leading-5 font-semibold">Incoming Internal Links</h3>
            <div className="-ml-[26px] mt-[12px]">
              <BarChart data={incomingLinks} width={475} height={167} max={50} ticks={[0, 25, 50]} left={75} top={8} bottom={67} barGap={27} tickGap={15} titleGap={38} xTitle="Links" rotate />
            </div>
          </SubCard>
          <SubCard className="h-[261px] px-[26px] pt-[21px]">
            <h3 className="text-[16px] leading-5 font-semibold">Pages Crawl Depth</h3>
            <div className="mt-[28px] flex items-start gap-[30px] pl-[10px]">
              <Ring segments={crawlDepth} size={138} thickness={13} sep={false} />
              <div className="mt-[10px]">
                <LegendTable items={crawlDepth.filter((d) => d.value)} />
              </div>
            </div>
          </SubCard>
          <SubCard className="h-[261px] px-[26px] pt-[21px]">
            <h3 className="text-[16px] leading-5 font-semibold">Sitemap vs. Crawled Pages</h3>
            <div className="mt-[27px] flex items-start gap-[80px] pl-[24px]">
              <Venn size={112} big={111} small={84} offset={27} />
              <div className="mt-[6px] space-y-2 text-[14px] leading-5">
                {[
                  ["Pages in sitemap", 170, C.blue],
                  ["Crawled pages", 100, C.green],
                ].map(([l, v, c]) => (
                  <div key={l} className="flex items-center">
                    <Dot color={c as string} className="mr-[6px]" size={14} />
                    <span className="mr-[6px]">{l}</span>
                    <span className="text-rk-text-2">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </SubCard>
          <SubCard className="h-[294px] px-[26px] pt-[21px]">
            <h3 className="text-[16px] leading-5 font-semibold">HTTP Status Code</h3>
            <div className="mt-[50px] flex items-start gap-[30px] pl-[10px]">
              <Ring segments={httpStatus} size={138} thickness={13} sep={false} />
              <div className="-mt-[10px]">
                <LegendTable items={httpStatus} />
              </div>
            </div>
          </SubCard>
        </div>
      </div>
    </ThematicPage>
  );
}

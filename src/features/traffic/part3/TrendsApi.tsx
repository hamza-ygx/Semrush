"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { CheckIcon, ChevronRight } from "@/components/ui/icons";
import {
  Blob,
  ClaudeMark,
  CsvIcon,
  CursorMark,
  Diamond,
  EsomarMark,
  ExcelIcon,
  Heart,
  HeroArt,
  LaLigaWhite,
  logos,
  MsSquaresIcon,
  PowerBiIcon,
  SalesforceIcon,
  SheetsIcon,
  Star,
  SynapticMark,
  TableauIcon,
  VsCodeIcon,
} from "./trendsArt";
import { trendsFaq } from "./data";

const h2 = "text-center text-[32px] leading-[40px] font-semibold text-[#1b1e1a] tracking-[-0.2px]";

function ToolCard({ title, sub, icons }: { title: string; sub: string; icons: React.ReactNode }) {
  return (
    <div className="flex h-[144px] flex-col items-center rounded-lg bg-white pt-[20px]">
      <div className="text-[20px] leading-7 font-semibold">{title}</div>
      <div className="mt-[4px] flex h-[42px] items-center gap-[14px]">{icons}</div>
      <div className="mt-[3px] text-[16px] leading-6">{sub}</div>
    </div>
  );
}

function Stat({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex h-[70px] items-start gap-[20px]">
      <div className="flex w-[70px] shrink-0 justify-center">{icon}</div>
      <div className="pt-[4px]">
        <div className="text-[24px] leading-8 font-semibold">{title}</div>
        <div className="text-[16px] leading-6">{sub}</div>
      </div>
    </div>
  );
}

export function TrendsApi() {
  const [open, setOpen] = useState(0);
  const bullet = (t: React.ReactNode) => (
    <li className="flex gap-[10px] text-[14px] leading-5">
      <CheckIcon className="mt-[1px] shrink-0 text-[#009f81]" width={16} height={16} />
      <span>{t}</span>
    </li>
  );
  return (
    <AppShell section="traffic" search={{ kind: "none" }} footerPb={37}>
      <div className="mx-auto w-[980px] pt-[25px] pb-[155px] text-rk-text">
        <section className="relative h-[279px] overflow-hidden rounded-lg bg-white">
          <HeroArt />
          <span className="absolute top-[20px] left-0 flex h-[27px] w-[107px] items-center rounded-r-md bg-[#ead6ff] pl-[24px] text-[14px] text-[#8a3fcf]">Trends API</span>
          <div className="relative pt-[51px] pl-[40px]">
            <h1 className="text-[36px] leading-[48px] font-semibold tracking-[-0.2px]">Get Market Data with API</h1>
            <p className="mt-[8px] text-[16px] leading-6">Get robust market traffic data inside your own tools and reports</p>
            <a href="#pricing" className="mt-[25px] inline-flex h-[40px] items-center rounded-md bg-[#00a87b] px-[13px] text-[16px] font-medium text-white hover:bg-[#008a65]">
              Buy API access
            </a>
          </div>
        </section>

        <p className="mt-[49px] text-center text-[16px] leading-6 text-rk-muted">Trusted by</p>
        <div className="mt-[29px] flex h-[40px] items-center justify-between px-[35px]">
          {logos.map((l) => (
            <span key={l.key} className="flex items-center justify-center" style={{ width: l.w }}>
              {l.el}
            </span>
          ))}
        </div>

        <h2 className={`${h2} mt-[56px]`}>Bring data into your workflow</h2>

        <section className="relative mt-[33px] h-[279px] overflow-hidden rounded-lg bg-white">
          <div className="absolute inset-y-0 right-0 w-[420px] bg-[radial-gradient(circle_at_75%_55%,#ecf1ff_0%,#f6f3ff_35%,#fff_70%)]" />
          <div className="absolute top-[74px] left-[845px] flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-[0_6px_24px_rgba(97,103,230,0.12)]">
            <VsCodeIcon />
          </div>
          <div className="absolute top-[144px] left-[792px] flex h-[94px] w-[94px] items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgba(217,119,87,0.14)]">
            <ClaudeMark />
          </div>
          <div className="absolute top-[142px] left-[893px] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.2)]">
            <CursorMark width={36} height={36} />
          </div>
          <div className="relative pt-[39px] pl-[40px]">
            <h3 className="text-[32px] leading-[40px] font-semibold tracking-[-0.2px]">
              <span className="bg-gradient-to-r from-[#b36ef7] to-[#8b5cf6] bg-clip-text text-transparent">Power your AI</span> with Traffic &amp; Market&nbsp; data
            </h3>
            <p className="mt-[16px] w-[530px] text-[17px] leading-6 text-rk-muted">
              Connect Trends API via MCP to Claude, Cursor or VS Code for on-demand charts, summaries, and insights. No code required — set up in minutes.
            </p>
            <button type="button" className="mt-[32px] flex h-[40px] items-center gap-[8px] rounded-md bg-gradient-to-r from-[#a95ff7] to-[#6f6fdd] px-[12px] text-[16px] font-medium text-white hover:opacity-90">
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <path d="M6 2l1.2 3.3L10.5 6.5 7.2 7.7 6 11 4.8 7.7 1.5 6.5l3.3-1.2zM12 9l.7 1.8 1.8.7-1.8.7L12 14l-.7-1.8-1.8-.7 1.8-.7z" fill="#fff" />
              </svg>
              Connect now
            </button>
          </div>
        </section>

        <div className="mt-[16px] grid grid-cols-2 gap-[16px]">
          <ToolCard title="Spreadsheets" sub="Google Sheets, Excel" icons={<><ExcelIcon /><SheetsIcon /></>} />
          <ToolCard title="Dashboards" sub="Enterprise Portals, CRM, ERP" icons={<><SalesforceIcon /><MsSquaresIcon /></>} />
          <ToolCard title="Custom reports" sub="Tableau, Power BI, and more" icons={<><TableauIcon /><PowerBiIcon /></>} />
          <ToolCard title="Custom reports" sub="Choose your own way" icons={<CsvIcon />} />
        </div>

        <section className="mt-[16px] h-[334px] rounded-lg bg-white px-[33px] pt-[40px]">
          <h2 className={h2}>Discover data with unmatched depth and scale</h2>
          <div className="mt-[34px] grid grid-cols-[478px_1fr] gap-y-[40px]">
            <Stat icon={<Heart />} title="7+ years" sub="Consistent historical data coverage" />
            <Stat icon={<Diamond />} title="3B domains" sub="Broadest digital coverage" />
            <Stat icon={<Star />} title="190+ markets" sub="Global insights by country and region" />
            <Stat icon={<Blob />} title="Daily updates" sub="Always-fresh traffic data" />
          </div>
        </section>

        <section id="pricing" className="relative mt-[17px] h-[455px] overflow-hidden rounded-lg bg-[#8028ec]">
          <div className="absolute -top-[190px] -left-[150px] h-[390px] w-[390px] rounded-full bg-[#a05ef0]" />
          <div className="absolute top-[180px] right-[-170px] h-[420px] w-[420px] rounded-[45%] bg-[#a05ef0]" />
          <h2 className="relative pt-[31px] text-center text-[32px] leading-[40px] font-semibold text-white">Unlock growth with the power of Trends API</h2>
          <div className="relative mt-[33px] flex justify-center gap-[20px]">
            <div className="w-[309px] overflow-hidden rounded-lg bg-white shadow-[0_8px_24px_rgba(25,27,35,0.2)]">
              <div className="flex h-[35px] items-center justify-center bg-[#d3fef6] text-[14px] font-semibold text-[#007c65]">Start right away</div>
              <div className="px-[20px] pt-[24px] pb-[28px]">
                <div className="text-[20px] leading-7 font-semibold">Basic</div>
                <ul className="mt-[12px] flex flex-col gap-[8px]">
                  {bullet("Access to Traffic Summary")}
                  {bullet("10K monthly API units")}
                  {bullet(<><button type="button" className="text-rk-link hover:underline">API documentation</button> and setup guide</>)}
                </ul>
                <div className="mt-[12px] flex items-baseline">
                  <span className="text-[36px] leading-[48px] font-semibold tracking-[-0.5px]">$1000</span>
                  <span className="text-[14px] text-rk-text-2">/mo</span>
                </div>
                <button type="button" className="mt-[11px] h-[40px] w-full rounded-md bg-[#00a87b] text-[16px] font-medium text-white hover:bg-[#008a65]">
                  Buy API access
                </button>
              </div>
            </div>
            <div className="mt-[32px] h-[289px] w-[310px] rounded-lg bg-white px-[20px] pt-[22px] shadow-[0_8px_24px_rgba(25,27,35,0.2)]">
              <div className="text-[20px] leading-7 font-semibold">Premium</div>
              <ul className="mt-[15px] flex flex-col gap-[8px]">
                {bullet("Custom packages and pricing")}
                {bullet("16 additional data types for deeper analysis")}
                {bullet("Daily and weekly traffic data")}
                {bullet("Purchase conversion insights")}
              </ul>
              <button type="button" className="mt-[27px] h-[40px] w-full rounded-md border border-[#dcdde2] bg-[#f7f7f8] text-[16px] text-rk-muted hover:bg-rk-hover">
                Contact sales
              </button>
            </div>
          </div>
        </section>

        <h2 className={`${h2} mt-[16px]`}>Trends API data drives business wins</h2>
        <div className="mt-[33px] grid grid-cols-3 gap-[24px] px-[24px]">
          {[
            { bg: "#40107c", logo: <LaLigaWhite />, title: "La Liga Protects $6M in Revenue" },
            { bg: "#656adb", logo: <span className="font-serif text-[46px] leading-none font-bold tracking-[-0.5px] text-white">Flippa.</span>, title: "Flippa Generates +$200K in Annual Revenue Growth" },
            { bg: "#6920c5", logo: <SynapticMark />, title: "Synaptic Expands Domain Coverage by 300K" },
          ].map((c) => (
            <div key={c.title} className="group block cursor-pointer">
              <div className="flex h-[120px] items-center justify-center rounded-sm" style={{ background: c.bg }}>
                {c.logo}
              </div>
              <div className="mt-[24px] w-[280px] text-[20px] leading-6 font-semibold text-[#333] group-hover:text-rk-link">{c.title}</div>
              <div className="mt-[12px] flex items-center gap-1 text-[14px] text-rk-link">
                Read case study <ChevronRight width={14} height={14} />
              </div>
            </div>
          ))}
        </div>

        <section className="mt-[48px] rounded-lg bg-white px-[20px] pt-[36px] pb-[45px]">
          <h2 className={h2}>Frequently asked questions</h2>
          <div className="mt-[28px] flex flex-col gap-[2px]">
            {trendsFaq.map((f, i) => {
              const on = open === i;
              return (
                <div key={f.q} className="rounded-[4px] bg-[#f9f9f9]">
                  <button type="button" onClick={() => setOpen(on ? -1 : i)} className="flex h-[40px] w-full items-center gap-[8px] pl-[16px] text-left text-[16px] font-semibold text-[#6a6c6a] hover:text-rk-text">
                    <ChevronRight width={12} height={12} className={on ? "rotate-90" : ""} strokeWidth={2.4} />
                    {f.q}
                  </button>
                  {on && (
                    <div className="max-w-[800px] bg-white px-[32px] pt-[8px] pb-[24px] text-[14px] leading-5 text-rk-text">
                      {f.a}{" "}
                      {f.link && (
                        <>
                          <button type="button" className="text-rk-link hover:underline">
                            {f.link}
                          </button>
                          .
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-[35px] flex items-center justify-center gap-[6px] text-[16px]">
            An <EsomarMark /> partner
          </div>
        </section>
      </div>
    </AppShell>
  );
}

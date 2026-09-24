"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/shell/AppShell";
import { CenteredFooter } from "@/features/gaps/common";
import { ChevronDown, FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";
import { useOutsideClose } from "@/components/ui/Popover";
import { PricingModal } from "./PricingModal";
import { ResearchArt } from "./ResearchArt";
import { databases, researchConfig } from "./data";

const flags = { SE: FlagSE, US: FlagUS, UK: FlagUK } as const;

function DbSelect() {
  const [open, setOpen] = useState(false);
  const [db, setDb] = useState("SE");
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const Flag = flags[db as keyof typeof flags];
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Database"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-[89px] items-center gap-2 rounded-md border border-rk-border-strong bg-white pl-3 text-[16px] hover:bg-rk-bg"
      >
        <Flag width={16} height={12} />
        {db}
        <ChevronDown strokeWidth={2.2} className="-ml-[2px]" />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-40 w-[200px] rounded-md bg-white py-1 text-left shadow-popover">
          {databases.map((d) => {
            const F = flags[d.code as keyof typeof flags];
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => {
                  setDb(d.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-[6px] text-[14px] hover:bg-rk-bg ${d.code === db ? "bg-[#e9f7ff]" : ""}`}
              >
                <F width={16} height={12} />
                {d.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ResearchLanding({ kind }: { kind: "research" | "pla" }) {
  const c = researchConfig[kind];
  const [q, setQ] = useState("ikea.se");
  const [modal, setModal] = useState(false);
  const pad = kind === "pla" ? 24 : 40;
  return (
    <AppShell
      section="ad"
      search={{ kind: "analyze", value: "ikea.se", scope: kind === "research", inputClassName: kind === "pla" ? "w-[342px]" : undefined }}
      footer={false}
    >
      <div className="mx-auto w-[980px] pt-6">
        <section className="rounded-lg bg-white pt-[38px] pb-[42px] text-center shadow-card">
          <h1 className="text-[36px] leading-[44px] font-bold">{c.title}</h1>
          <p className="mt-[10px] text-[16px] leading-6">
            {c.lines[0]}
            <br />
            {c.lines[1].replace("{brand}", brand.name)}
          </p>
          <form
            className="mt-[33px] flex justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              setModal(true);
            }}
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Domain"
              placeholder="Enter domain"
              className="h-10 w-[515px] rounded-md border border-rk-border-strong bg-white px-3 text-[16px] outline-none focus:border-[#7a86f2]"
            />
            <span className="ml-3">
              <DbSelect />
            </span>
            <button type="submit" className="ml-[13px] h-10 w-[102px] rounded-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
              Search
            </button>
          </form>
          <div className="mt-[21px] ml-[124px] flex gap-3 text-left text-[16px] leading-5">
            <span className="mr-[1px]">Examples:</span>
            {c.examples.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => {
                  setQ(e);
                  setModal(true);
                }}
                className="text-rk-link hover:text-rk-link-hover"
              >
                {e}
              </button>
            ))}
          </div>
        </section>
        <section className="mt-4 rounded-lg bg-white pt-[41px] pb-[20px] shadow-card" style={{ paddingLeft: pad, paddingRight: pad }}>
          {c.features.map((f, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={f.title} className={`flex h-[328px] ${flip ? "flex-row-reverse" : ""}`}>
                <div className={flip ? (kind === "pla" ? "ml-auto w-[453px] pt-[1px]" : "-mr-[9px] ml-auto w-[430px] pt-[1px]") : "w-[440px]"}>
                  <h2 className="text-[24px] leading-7 font-bold">{f.title}</h2>
                  <ul className={`mt-3 flex ${kind === "pla" ? "w-[440px]" : "w-[410px]"} flex-col gap-2`}>
                    {f.bullets.map((b) => (
                      <li key={b} className="flex text-[16px] leading-6">
                        <span className="mr-[7px] ml-[2px] text-[#6c6e79]">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={flip ? "-mt-[10px]" : `-mt-[10px] ml-auto ${kind === "pla" ? "-mr-[9px]" : "-mr-[30px]"}`}>
                  <ResearchArt kind={f.art} />
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <CenteredFooter />
      <PricingModal open={modal} onClose={() => setModal(false)} />
    </AppShell>
  );
}

"use client";

import { useRef, useState } from "react";
import { routes } from "@/config/routes";
import { TrafficFrame } from "../TrafficFrame";
import { SampleCard, SegTabs } from "../ui";
import { CloseIcon, PlusIcon } from "@/components/ui/icons";
import { bulkRows } from "./data";
import { LinkOut, SortIcon } from "./ui";
import { Paywall } from "./Paywall";

const cols = ["Visits", "Unique Visitors", "Purchase Conversion", "Pages / Visit", "Avg. Visit Duration", "Bounce Rate"] as const;
const keys = ["visits", "uv", "conv", "ppv", "dur", "bounce"] as const;

function Form({ locked }: { locked: boolean }) {
  const [text, setText] = useState(locked ? "" : "zara.com\nasos.com\nhm.com");
  const file = useRef<HTMLInputElement>(null);
  const lines = text.split("\n").filter((l) => l.trim());
  const shown = text.split("\n");
  return (
    <SampleCard header={false} bodyClassName="px-5 pt-5 pb-5">
      <SegTabs
        items={["Bulk Analysis", "Business Categories"] as const}
        className="h-10 [&_button]:px-[12px] [&_button]:text-[16px] [&_button:not(:first-child)]:text-rk-faint"
      />
      <div className="mt-[16px] flex items-center gap-[8px] text-[14px]">
        Competitors
        <span className="rounded-full border border-[#d8dad9] px-[5px] text-[10px] leading-[14px] text-rk-muted">{lines.length}/100</span>
      </div>
      <div className="mt-[9px] flex gap-4">
        <div className="relative h-[252px] w-[590px] shrink-0 rounded-[6px] border border-[#e0e2e1] bg-white">
          <div className="pointer-events-none absolute top-[9px] left-[16px] flex flex-col text-[14px] leading-6 text-rk-faint">
            {(text ? shown : [""]).map((_, i) => (
              <span key={i}>{i + 1}.</span>
            ))}
          </div>
          <textarea
            aria-label="Competitors"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter domain, subdomain or subfolder"
            className="absolute inset-0 resize-none bg-transparent pt-[9px] pl-[32px] text-[14px] leading-6 text-[#a9abaa] outline-none placeholder:text-rk-faint"
          />
        </div>
        <button
          type="button"
          onClick={() => file.current?.click()}
          className="flex h-[254px] flex-1 flex-col items-center rounded-[6px] border border-dashed border-[#d8dad9] pt-[92px] text-[14px] leading-6 text-[#a9abaa]"
        >
          <PlusIcon width={20} height={20} className="text-[#a9abaa]" strokeWidth={1.2} />
          <span className="mt-[4px] font-semibold">
            Drop file here or <span className="text-[#7da3ee]">browse</span>
          </span>
          <span>CSV or TXT less than 5MB</span>
          <span className="mt-auto mb-[18px]">The file must contain one URL per row</span>
        </button>
        <input ref={file} type="file" accept=".csv,.txt" className="hidden" />
      </div>
      <div className="flex w-[581px] justify-end">
        <button type="button" onClick={() => setText("")} className="mt-[11px] flex items-center gap-[6px] text-[14px] text-rk-faint hover:text-rk-text">
          <CloseIcon width={12} height={12} />
          Clear all
        </button>
      </div>
      <button
        type="button"
        disabled={locked || !lines.length}
        className={`mt-[14px] h-10 rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38] ${locked ? "disabled:bg-[#767979]" : "disabled:bg-[#d6d8d7]"}`}
      >
        Analyze
      </button>
    </SampleCard>
  );
}

function Results() {
  const [asc, setAsc] = useState(false);
  const rows = [...bulkRows].sort((a, b) => (parseFloat(b.visits) - parseFloat(a.visits)) * (asc ? -1 : 1));
  return (
    <SampleCard
      title={
        <>
          Bulk Analysis <span className="font-normal text-rk-muted">(3)</span>
        </>
      }
      bodyClassName=""
    >
      <table className="w-full table-fixed border-collapse text-[14px]">
        <thead>
          <tr className="h-[42px] bg-[#f7f7f8] text-[12px] text-rk-text-2">
            <th className="pl-[20px] text-left font-normal">Target</th>
            {cols.map((c, i) => (
              <th key={c} className={`w-[154px] pr-[12px] text-right font-normal ${i === 0 ? "bg-[#ebecee]" : ""}`}>
                {i === 0 ? (
                  <button type="button" onClick={() => setAsc(!asc)} className="inline-flex items-center gap-[4px]">
                    {c}
                    <SortIcon width={14} height={14} className={asc ? "rotate-180" : ""} />
                  </button>
                ) : (
                  c
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.domain} className="h-[60px] border-b border-[#e0e2e1] last:border-0">
              <td className="pl-[12px]">
                <a href={`https://${r.domain}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-[4px] leading-5 hover:text-rk-link">
                  {r.domain}
                  <LinkOut className="text-rk-faint" />
                </a>
                <div className="text-[12px] leading-4 text-rk-muted">root domain</div>
              </td>
              {keys.map((k) => (
                <td key={k} className="pr-[12px] pb-[18px] text-right">
                  {r[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SampleCard>
  );
}

function Promo() {
  return (
    <SampleCard header={false} bodyClassName="relative flex h-[360px] overflow-hidden px-8 pt-[30px]">
      <div>
        <h2 className="text-[24px] leading-8 font-semibold text-rk-text">Uncover trends across the market</h2>
        <ul className="mt-[18px] flex flex-col gap-[10px] text-[16px] text-rk-text-2">
          {["View traffic and engagement for all key players in one table", "Compare up to 100 competitors at once", "Discover top websites by business category"].map((b) => (
            <li key={b} className="flex items-center gap-[10px]">
              <span className="h-[4px] w-[4px] rounded-full bg-rk-muted" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute top-0 right-0 left-[1015px] h-full bg-[#fdf1c7]" />
      <div className="absolute top-[14px] left-[841px] w-[202px] rounded-lg bg-white px-[18px] pt-[34px] pb-4 shadow-card">
        <div className="text-[16px] font-semibold">Bulk Analysis</div>
        <div className="mt-[10px] flex justify-between text-[10px] text-rk-muted">
          <span>Page</span>
          <span>Visits</span>
        </div>
        {["amazon.com", "ebay.com", "walmart.com"].map((d, i) => (
          <div key={d} className="flex items-center justify-between py-[6px] text-[11px]">
            <span className="flex items-center gap-[6px]">
              <b className="text-[12px]">{d[0]}</b>
              {d}
            </span>
            <span className="text-rk-muted">{[45, 22, 13][i]}%</span>
          </div>
        ))}
      </div>
      <div className="absolute top-[25px] left-[1040px] flex h-[34px] w-[34px] items-center justify-center rounded-md bg-white text-[28px] leading-none font-bold text-[#1b1e1a]">a</div>
      <div className="absolute top-[36px] left-[1091px] text-[20px] font-semibold text-rk-muted">a</div>
      <div className="absolute top-[88px] left-[1038px] text-[44px] leading-none font-medium text-rk-muted">750</div>
    </SampleCard>
  );
}

export function IndustryBulk({ sample }: { sample: boolean }) {
  const hide = sample ? "[&_main>div>div:nth-child(2)]:hidden" : "[&_main>div>div:nth-child(1)]:hidden [&_main>div>div:nth-child(2)]:hidden";
  return (
    <div className={hide}>
      <TrafficFrame title="Industry & Bulk Analysis" filters={["geo", "date", "device"]}>
        {sample ? (
          <div className="flex flex-col gap-4">
            <Form locked={false} />
            <Results />
          </div>
        ) : (
          <div className="relative">
            <div aria-hidden className="pointer-events-none flex flex-col gap-4 opacity-35 select-none">
              <Form locked />
              <Promo />
            </div>
            <Paywall sampleHref={`${routes.traffic.industryBulk}?sample=1`} className="absolute top-[40px] left-[308px]" />
          </div>
        )}
      </TrafficFrame>
    </div>
  );
}

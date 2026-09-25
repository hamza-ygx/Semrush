import { ChatGptIcon, GoogleIcon } from "@/components/ui/icons";
import type { Block } from "./homeData";

const line = "rounded-full bg-[#e9eaea]";

function Chat() {
  return (
    <div className="flex h-full overflow-hidden rounded-xl bg-white text-[14px] leading-5">
      <div className="flex-1 px-[15px] pt-[12px]">
        <div className="inline-block rounded-xl bg-[#eef0fe] px-3 py-[9px] text-[14px]">
          How do my CPA compare to
          <br />
          industry benchmarks?
        </div>
        <p className="mt-[18px]">Fetched campaign metrics (last 30 days). Note: conversion value used as a proxy for CPA benchmarks.</p>
        <div className="mt-3 flex flex-col gap-2">
          {["Search · CPA $18.40", "Performance Max · CPA $22.10", "Display · CPA $31.75"].map((r) => (
            <div key={r} className="rounded-md border border-[#ececf0] px-3 py-2 text-[13px]">
              {r}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[187px] border-l border-[#ececf0]">
        <div className="px-4 pt-[9px] pb-[11px]">
          <div className="font-semibold">Recent chats</div>
          <div className="mt-2 inline-flex h-6 items-center rounded-md bg-[#1b1e1a] px-2 text-[13px] text-white">Start new chat</div>
        </div>
        <div className="bg-[#f4f5f7] px-4 pt-[10px] pb-3">
          <div className="text-[13px] text-[#8b8d8c]">active now</div>
          <div className="text-[14px]">How do my CPA compare to industry...</div>
        </div>
        {["Top keywords last week", "Budget pacing check"].map((c) => (
          <div key={c} className="border-t border-[#ececf0] px-4 py-3 text-[13px] text-[#484a49]">
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

function Research() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl bg-white p-4">
      {["competitor-one.com", "competitor-two.com", "competitor-three.com"].map((d, i) => (
        <div key={d} className="rounded-lg border border-[#ececf0] p-3">
          <div className="text-[12px] text-[#6a6c6a]">Sponsored · {d}</div>
          <div className="mt-1 text-[15px] font-semibold text-[#1a0dab]">{["Modern furniture sale – up to 40% off", "Design your dream kitchen", "Free delivery on all orders"][i]}</div>
          <div className={`${line} mt-2 h-[6px] w-[80%]`} />
          <div className={`${line} mt-[6px] h-[6px] w-[60%]`} />
        </div>
      ))}
    </div>
  );
}

function Keywords() {
  const rows = [
    ["modern lighting", "189,000", "0.67", "0.23", "Exact"],
    ["basement renovation", "102,000", "0.89", "1.76", "Phrase"],
    ["living room design", "98,000", "1.45", "2.43", "Broad"],
    ["new home build", "234,000", "0.65", "1.98", "Exact"],
    ["home organization", "123,000", "0.78", "0.92", "Phrase"],
    ["window replacement", "65,000", "1.12", "2.34", "Broad"],
    ["outdoor furniture", "143,000", "0.93", "1.27", "Exact"],
  ];
  return (
    <div className="h-full">
      <div className="flex items-center">
        <span className="flex h-[43px] items-center rounded-lg border border-[#c9cdf5] bg-[#eef0fe] px-[15px] text-[16px] text-[#484a49]">Keywords</span>
        <span className="px-[15px] text-[16px] text-[#8b8d8c]">Negatives</span>
        <span className="ml-auto flex h-[43px] items-center rounded-lg bg-[#8f8f8f] px-[18px] text-[16px] font-medium text-white">+ Keywords</span>
      </div>
      <div className="mt-[14px] overflow-hidden rounded-lg border border-[#ececf0] bg-white text-[14px]">
        <div className="grid h-[45px] grid-cols-[150px_70px_55px_65px_1fr] items-center px-[15px] text-[#8b8d8c]">
          <span>Keywords</span>
          <span className="text-right">Volume</span>
          <span className="text-right">CPC</span>
          <span className="text-right">Comp.</span>
          <span className="text-right">Match type</span>
        </div>
        {rows.map((r) => (
          <div key={r[0]} className="grid h-[45px] grid-cols-[150px_70px_55px_65px_1fr] items-center border-t border-[#f0f1f1] px-[15px] text-[#484a49]">
            <span className="font-medium">{r[0]}</span>
            <span className="text-right">{r[1]}</span>
            <span className="text-right">{r[2]}</span>
            <span className="text-right">{r[3]}</span>
            <span className="text-right">{r[4]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Creative() {
  return (
    <div className="relative flex h-full overflow-hidden rounded-xl">
      <div className="flex-1 bg-[#e6ddd2] p-[30px] text-[18px] leading-[21px] font-medium text-white/80">
        autumn
        <br />
        collection
      </div>
      <div className="relative w-[182px] bg-[#e0a08c]">
        <div className="absolute right-[18px] top-[28px] h-[32px] w-[32px] rounded-full border-[3px] border-[#f6e3d6]" />
        <div className="absolute right-0 bottom-0 left-0 h-[55%] rounded-tl-[80px] bg-[#f1e7d8]" />
      </div>
    </div>
  );
}

function Launch() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-xl bg-white p-5 text-[14px]">
      <div className="font-semibold">New campaign</div>
      {["Campaign name", "Daily budget", "Locations", "Audience"].map((l, i) => (
        <div key={l}>
          <div className="text-[12px] text-[#6a6c6a]">{l}</div>
          <div className="mt-1 flex h-9 items-center rounded-md border border-[#e0e2e1] px-3">{["Spring sale 2026", "$50.00", "Sweden, Norway", "Home decor lovers"][i]}</div>
        </div>
      ))}
      <div className="mt-auto flex gap-2">
        <span className="flex h-9 flex-1 items-center justify-center gap-2 rounded-md border border-[#e0e2e1]">
          <GoogleIcon /> Google Ads
        </span>
        <span className="flex h-9 flex-1 items-center justify-center rounded-md border border-[#e0e2e1]">Meta Ads</span>
      </div>
    </div>
  );
}

function Optimize() {
  return (
    <div className="flex h-full flex-col rounded-xl bg-white p-5 text-[14px]">
      <div className="font-semibold">Cost per conversion</div>
      <svg viewBox="0 0 440 200" className="mt-4 w-full" aria-hidden>
        {[40, 80, 120, 160].map((y) => (
          <path key={y} d={`M0 ${y}h440`} stroke="#f0f1f1" />
        ))}
        <path d="M0 50 60 60 120 45 180 90 240 110 300 120 360 150 440 160" fill="none" stroke="#a25eff" strokeWidth={3} />
      </svg>
      <div className="mt-4 rounded-lg bg-[#f4f0fe] p-3">
        <div className="font-semibold text-[#6f4bfc]">AI recommendation</div>
        <div className="mt-1">Move $120 from Display to Search to lower CPA by 14%.</div>
      </div>
    </div>
  );
}

function Report() {
  return (
    <div className="grid h-full grid-cols-2 gap-3 rounded-xl bg-white p-5 text-[14px]">
      {[
        ["Clicks", "12.4K"],
        ["Impressions", "388K"],
        ["Conversions", "1,021"],
        ["ROAS", "4.2x"],
      ].map(([k, v]) => (
        <div key={k} className="rounded-lg border border-[#ececf0] p-4">
          <div className="text-[#6a6c6a]">{k}</div>
          <div className="mt-2 text-[28px] font-semibold">{v}</div>
          <div className={`${line} mt-4 h-[6px] w-full`} />
        </div>
      ))}
    </div>
  );
}

function Integrations() {
  return (
    <div className="flex h-full flex-wrap content-center items-center justify-center gap-6 rounded-xl bg-white p-6">
      {[
        { n: "Google Ads", i: <GoogleIcon width={28} height={28} /> },
        { n: "Meta Ads", i: <span className="text-[26px] font-bold text-[#0866ff]">∞</span> },
        { n: "Google Analytics", i: <span className="text-[22px] font-bold text-[#f9ab00]">▮▮</span> },
        { n: "ChatGPT", i: <ChatGptIcon width={28} height={28} /> },
      ].map((x) => (
        <div key={x.n} className="flex h-[120px] w-[180px] flex-col items-center justify-center gap-3 rounded-xl border border-[#ececf0] text-[14px]">
          {x.i}
          {x.n}
        </div>
      ))}
    </div>
  );
}

export function HomeMock({ kind }: { kind: Block["mock"] }) {
  const m = { chat: Chat, research: Research, keywords: Keywords, creative: Creative, launch: Launch, optimize: Optimize, report: Report, integrations: Integrations }[kind];
  const C = m;
  return (
    <div className="h-[438px] w-[517px] rounded-2xl bg-[#f8f8f8] p-5 shadow-[0_2px_12px_rgba(25,27,35,0.08)]">
      <C />
    </div>
  );
}

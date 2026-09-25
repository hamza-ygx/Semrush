"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { routes } from "@/config/routes";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";

const dbs = [
  { code: "US", flag: <FlagUS width={16} height={12} /> },
  { code: "UK", flag: <FlagUK width={16} height={12} /> },
  { code: "SE", flag: <FlagSE width={16} height={12} /> },
];

function Callout({ title, children, className }: { title: string; children: ReactNode; className: string }) {
  return (
    <div className={`absolute z-10 rounded-md bg-white px-4 pt-[13px] pb-[14px] text-left shadow-[0_2px_8px_rgba(25,27,35,0.14)] ${className}`}>
      <div className="text-[14px] leading-5 text-[#8e44d8]">{title}</div>
      <div className="mt-[3px] text-[12px] leading-4 text-rk-text">{children}</div>
    </div>
  );
}

const Arrow = ({ d, className }: { d: string; className: string }) => (
  <svg className={`absolute z-10 overflow-visible ${className}`} width={10} height={10}>
    <path d={d} fill="none" stroke="#b46cf0" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function MockCard({ title, x }: { title: string; x: number }) {
  return (
    <div className="absolute top-[82px] h-[140px] w-[177px] rounded-sm bg-[#b8e3fb] px-[9px] pt-[10px]" style={{ left: x }}>
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-bold">{title}</span>
        <span className="text-[10px] tracking-[1px] text-[#8fb4cc]">🔍 ···</span>
      </div>
      <div className="mt-[2px] text-[9px]">Topic Efficiency: High</div>
    </div>
  );
}

function Illustration() {
  return (
    <div className="relative mt-[22px] h-[300px]">
      <Callout title="Design high-performing content plans" className="top-[-4px] left-[1px] w-[320px]">
        Simply enter any keyword or phrase to explore dozens of related subtopics and build powerful topic clusters.
      </Callout>
      <Callout title="Find content ideas for specific locations" className="top-[15px] left-[396px] w-[280px]">
        Discover what’s trending on the country, region, or city level, making your content more targeted to your customers’ needs.
      </Callout>
      <Arrow d="M60 92c-10 30-6 56 18 70l-5-8m5 8-9 1" className="top-0 left-0" />
      <Arrow d="M397 94c-30 4-50 22-52 52l-5-6m5 6 5-6" className="top-0 left-0" />
      <Arrow d="M642 178c16 6 26 22 24 60" className="top-0 left-0" />
      <div className="absolute top-[122px] left-[60px] h-[260px] w-[599px] overflow-hidden rounded-sm bg-[#eef0f5] px-6 pt-[14px]">
        <div className="flex items-center text-[11px]">
          <span className="rounded-l-sm border border-[#56a5f0] bg-white px-[5px] py-[2px]">content trends ×</span>
          <span className="flex items-center gap-2 border border-l-0 border-[#d6d8d7] bg-[#e8eaee] px-[5px] py-[2px]">United States ⌄</span>
        </div>
        <div className="mt-[10px] flex items-center justify-between text-[11px]">
          <span className="flex">
            <span className="rounded-l-sm border border-[#56a5f0] bg-[#d9ecfc] px-[5px] py-[2px]">▣ Cards</span>
            <span className="border border-l-0 border-[#d6d8d7] bg-white px-[5px] py-[2px]">⊞ Explorer</span>
          </span>
          <span className="flex items-center gap-1">
            Sort by: <span className="rounded-sm border border-[#d6d8d7] bg-white px-[5px] py-[2px]">Topic Efficiency ⌄</span>
          </span>
        </div>
        <MockCard title="Virtual Reality" x={24} />
        <MockCard title="Content Creators" x={398} />
        <div className="absolute top-[36px] left-[134px] w-[166px] rounded-sm bg-white px-[6px] pt-[8px] pb-2 text-[9px] shadow-[0_2px_8px_rgba(25,27,35,0.18)]">
          <div>Country</div>
          <div className="mt-[2px] rounded-sm border border-[#d6d8d7] px-1 py-[1px]">United States</div>
          <div className="mt-[8px]">Region</div>
          <div className="mt-[2px] rounded-sm border border-[#d6d8d7] px-1 py-[1px]">Massachusetts</div>
          <div className="mt-[8px]">City</div>
          <div className="mt-[2px] rounded-sm border border-[#d6d8d7] px-1 py-[1px]">Boston</div>
        </div>
      </div>
    </div>
  );
}

export function TopicLanding() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [db, setDb] = useState(dbs[0]);
  const [domain, setDomain] = useState(false);
  const go = () => router.push(`${routes.topicResearchProject.cards}?new=1`);
  return (
    <div className="mx-auto w-[719px] pt-[41px]">
      <form
        className="rounded-md bg-white px-[26px] pt-[33px] pb-10 text-center shadow-[0_1px_2px_rgba(25,27,35,0.12)]"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <h1 className="text-[36px] leading-[44px] font-semibold">Topic Research</h1>
        <p className="mx-auto mt-[18px] max-w-[645px] text-[16px] leading-6 text-[#333]">Win your readers’ hearts and minds with a topic finder that helps you generate ideas for engaging content.</p>
        <div className="mt-[31px] flex">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter topic"
            className="h-10 flex-1 rounded-l-md border border-[#d6d8d7] px-3 text-[16px] outline-none placeholder:text-[#8b8d8c] focus:border-[#008ff8]"
          />
          <Popover
            align="right"
            panelClassName="w-[176px]"
            trigger={({ toggle }) => (
              <button type="button" onClick={toggle} className="-ml-px flex h-10 w-[177px] items-center gap-2 rounded-r-md border border-[#d6d8d7] bg-white px-3 text-[16px]">
                {db.flag}
                {db.code}
                <svg viewBox="0 0 16 16" width={16} height={16} className="ml-auto">
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          >
            {(close) =>
              dbs.map((d) => (
                <MenuItem
                  key={d.code}
                  active={d.code === db.code}
                  onClick={() => {
                    setDb(d);
                    close();
                  }}
                >
                  {d.flag}
                  {d.code}
                </MenuItem>
              ))
            }
          </Popover>
        </div>
        {domain && <input placeholder="Enter domain" className="mt-3 h-10 w-full rounded-md border border-[#d6d8d7] px-3 text-[16px] outline-none placeholder:text-[#8b8d8c]" />}
        <div className="mt-[14px] flex items-start justify-between">
          <button type="button" onClick={() => setDomain((d) => !d)} className="mt-[3px] ml-[1px] flex items-center gap-[6px] text-[16px] text-[#006dca] hover:underline">
            <span className="text-[20px] leading-5">{domain ? "−" : "+"}</span>
            {domain ? "Remove domain" : "Enter domain to find content on"}
          </button>
          <button type="submit" className="h-10 rounded-md bg-[#009f81] px-[13px] text-[16px] font-semibold text-white hover:bg-[#008a70]">
            Get content ideas
          </button>
        </div>
      </form>
      <div className="mt-4 rounded-md bg-white pt-[37px] pb-10 text-center shadow-[0_1px_2px_rgba(25,27,35,0.12)]">
        <h2 className="mx-auto max-w-[640px] text-[24px] leading-[28px] font-semibold">Get Thousands of Untapped, Instant Ideas for Valuable Content</h2>
        <Illustration />
      </div>
    </div>
  );
}

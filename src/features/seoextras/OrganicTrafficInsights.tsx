import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import { Bullets, DomainForm, LandingCard, LandingPage } from "./landing";
import { otiKeywords } from "./data";

const Box = () => <span className="block h-[16px] w-[16px] shrink-0 rounded-[3px] border border-[#c4c7cf] bg-white" />;

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative h-[279px] w-[429px] shrink-0 overflow-hidden rounded-md bg-[#f3f5f8] ${className}`}>{children}</div>;
}

const Chevron = () => (
  <svg viewBox="0 0 16 16" width={14} height={14} className="ml-auto">
    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Filters() {
  return (
    <div className="flex gap-3 px-5 text-[14px] text-[#2b2e38]">
      <div>
        <div className="leading-5">Keyword</div>
        <div className="mt-[4px] flex h-[27px] w-[200px] items-center gap-[6px] rounded-[4px] border border-[#c4c7cf] px-[9px] text-[#a9abb6]">
          <svg viewBox="0 0 16 16" width={14} height={14}>
            <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" strokeWidth={1.8} />
            <path d="m10 10 4 4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
          </svg>
          Search
        </div>
      </div>
      <div>
        <div className="leading-5">Type</div>
        <div className="mt-[4px] flex h-[27px] w-[129px] items-center rounded-[4px] border border-[#c4c7cf] px-3">
          All
          <Chevron />
        </div>
      </div>
      <div>
        <div className="leading-5">Pos</div>
        <div className="mt-[4px] flex h-[27px] w-[60px] items-center rounded-l-[4px] border border-r-0 border-[#c4c7cf] px-[9px] text-[#c4c7cf]">Fr</div>
      </div>
    </div>
  );
}

function KeywordTable({ rows }: { rows: number }) {
  return (
    <div className="text-[14px]">
      <div className="flex h-[40px] items-center bg-[#f4f5f9] text-[13px] text-[#2b2e38]">
        <span className="flex h-full w-[42px] items-center border-r border-[#e6e7ec] pl-[14px]">
          <Box />
        </span>
        <span className="flex w-[322px] items-center gap-[6px] pl-[45px]">
          Keyword
          <svg viewBox="0 0 16 16" width={15} height={15} className="text-[#a9abb6]">
            <path d="M2 5h5M3 8h4M4 11h3M11 13V3M8.5 5.5 11 3l2.5 2.5" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
          </svg>
        </span>
        <span className="flex h-full items-center border-l border-[#e6e7ec] pl-[9px]">Pos</span>
      </div>
      {otiKeywords.slice(0, rows).map((k, i) => (
        <div key={k} className="flex h-[45px] items-center border-b border-[#e6e7ec]">
          <span className="w-[42px] pl-[14px]">
            <Box />
          </span>
          <span className="w-[46px] pl-[10px] text-[#2b2e38]">{i + 1}</span>
          <span className="text-[#1f78c6]">{k}</span>
        </div>
      ))}
    </div>
  );
}

function KeywordsArt() {
  return (
    <Frame>
      <div className="absolute top-[32px] left-[31px] h-[260px] w-[420px] rounded-tl-md bg-white">
        <div className="flex h-[46px] items-center gap-3 border-b border-[#eceef2] pl-[21px]">
          <span className="text-[17px] font-semibold text-[#191b23]">Keywords</span>
          <span className="flex h-[27px] shrink-0 text-[14px] whitespace-nowrap text-[#191b23]">
            <span className="flex items-center rounded-l-[4px] border border-[#56a5f0] bg-[#d9ecfc] px-[9px]">{brand.name}</span>
            <span className="flex items-center rounded-r-[4px] border border-l-0 border-[#c4c7cf] px-[5px]">Google Search Console</span>
          </span>
        </div>
        <div className="pt-[10px]">
          <Filters />
        </div>
        <div className="mt-[17px]">
          <KeywordTable rows={2} />
        </div>
      </div>
    </Frame>
  );
}

function SessionsArt() {
  const y = (v: number) => 184 - v * 3.65;
  const pts: [number, number][] = [
    [83, 20],
    [207, 10.7],
    [344, 35],
    [420, 32.3],
  ];
  return (
    <Frame>
      <div className="absolute top-[32px] left-0 h-[248px] w-[399px] rounded-tr-md border border-l-0 border-[#eceef2] bg-white">
        <div className="flex h-[40px] items-center border-b border-[#eceef2] pl-5 text-[16px] font-semibold text-[#191b23]">Sessions</div>
        <svg width={399} height={210} className="absolute top-[40px] left-0 overflow-visible">
          {[40, 20, 0].map((v) => (
            <g key={v}>
              <text x={56} y={y(v) + 4} textAnchor="end" fontSize={12} fill="#6c6e79">
                {v}
              </text>
              <line x1={64} x2={399} y1={y(v)} y2={y(v)} stroke={v === 0 ? "#c4c7cf" : "#e6e7ec"} />
            </g>
          ))}
          <polyline points={pts.map(([x, v]) => `${x},${y(v)}`).join(" ")} fill="none" stroke="#2bb3ff" strokeWidth={3} strokeLinejoin="round" />
          {pts.slice(0, 3).map(([x, v]) => (
            <circle key={x} cx={x} cy={y(v)} r={4.5} fill="#2bb3ff" stroke="white" strokeWidth={1.5} />
          ))}
          <path d="M338 76v8c0 1 1 2 2 2l3 4h7l1-7c0-1-1-2-2-2h-4v-5c0-1-1-1.5-1.8-1.5S342 74 342 75v6l-1-1c-1-1-3 0-3 1z" transform="translate(2 -2)" fill="white" stroke="#191b23" strokeWidth={1.1} strokeLinejoin="round" />
        </svg>
        <div className="absolute top-[63px] left-[191px] w-[137px] rounded-[4px] bg-white px-[9px] pt-[6px] pb-[7px] text-[12px] shadow-[0_1px_8px_rgba(25,27,35,0.18)]">
          <div className="text-[#6c6e79]">November 15, 2015</div>
          <div className="mt-[3px] flex items-center gap-[6px] text-[#2b2e38]">
            <span className="h-2 w-2 rounded-full bg-[#2bb3ff]" />
            Sessions
            <b className="ml-auto font-semibold">23</b>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function SendArt() {
  return (
    <Frame>
      <div className="absolute top-[35px] left-[30px] h-[260px] w-[420px] rounded-tl-md bg-white pt-[26px] pl-[29px] text-[12px]">
        <div className="text-[20px] leading-6 font-semibold text-[#191b23]">Send to Position Tracking</div>
        <div className="mt-[10px] flex items-center gap-[8px] text-[#2b2e38]">
          <span className="flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#008ff8]">
            <span className="h-[5px] w-[5px] rounded-full bg-white" />
          </span>
          All (349)
        </div>
        <div className="mt-[8px] flex items-center gap-[8px] text-[#c4c7cf]">
          <span className="h-[13px] w-[13px] rounded-full border border-[#e0e1e9]" />
          Selected (0)
        </div>
        <div className="mt-[14px] h-[76px] rounded-l-md bg-[#f4f5f9] pt-[11px] pl-4">
          <div className="text-[#2b2e38]">Project</div>
          <div className="mt-[4px] flex h-[23px] items-center gap-[10px] rounded-l-[4px] border border-r-0 border-[#c4c7cf] bg-white pl-2 whitespace-nowrap text-[#2b2e38]">
            <b className="font-semibold">billsnotary.com (billsnotary.com)</b>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" width={13} height={13} className="text-[#8a8e9b]">
                <path d="M2 3h12v8H2zM6 14h4M8 11v3" fill="none" stroke="currentColor" strokeWidth={1.4} />
              </svg>
              United States • English
            </span>
          </div>
        </div>
        <div className="mt-[12px] flex gap-[7px]">
          <span className="flex h-[23px] items-center rounded-[4px] bg-[#009f81] px-[7px] text-white">Send keywords</span>
          <span className="flex h-[23px] items-center rounded-[4px] border border-[#c4c7cf] bg-[#f4f5f9] px-[6px] text-[#8a8e9b]">Cancel</span>
        </div>
      </div>
    </Frame>
  );
}

function FilterArt() {
  return (
    <Frame>
      <div className="absolute top-[32px] left-0 h-[260px] w-[383px] rounded-tr-md bg-white pt-[14px]">
        <Filters />
        <div className="mt-[13px]">
          <KeywordTable rows={3} />
        </div>
      </div>
      <div className="absolute top-[101px] left-[234px] w-[174px] rounded-md bg-white py-[5px] text-[14px] text-[#191b23] shadow-[0_1px_12px_rgba(25,27,35,0.15)]">
        {["All", "New", "Lost", "Winner", "Loser"].map((o) => (
          <div key={o} className="flex h-[32px] items-center px-3">
            {o}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Section({ art, artLeft, title, children, first }: { art: ReactNode; artLeft?: boolean; title: ReactNode; children: ReactNode; first?: boolean }) {
  const text = (
    <div className="w-[405px] pt-[31px]">
      <h3 className="text-[24px] leading-7 font-bold text-rk-text">{title}</h3>
      <div className="mt-[12px] text-[16px] leading-6 text-rk-text">{children}</div>
    </div>
  );
  return (
    <div className={`flex h-[279px] justify-between ${first ? "" : "mt-[98px]"}`}>
      {artLeft ? (
        <>
          {art}
          {text}
        </>
      ) : (
        <>
          {text}
          {art}
        </>
      )}
    </div>
  );
}

export function OrganicTrafficInsights() {
  const sub = (
    <>
      An easy “not provided” keyword solution combining Google Analytics,
      <br />
      Search Console and {brand.name} data
    </>
  );
  return (
    <LandingPage>
      <LandingCard className="h-[276px] pt-[49px] text-center">
        <h1 className="text-[36px] leading-[44px] font-bold text-rk-text">Organic Traffic Insights</h1>
        <p className="mt-[10px] text-[16px] leading-6 text-rk-text">{sub}</p>
        <DomainForm button="Get Insights" className="mt-[33px]" inputClassName="w-[600px]" />
      </LandingCard>
      <LandingCard className="mt-4 pt-10 pr-[49px] pb-[42px] pl-[47px]">
        <Section first art={<KeywordsArt />} title="Discover “not provided” keywords">
          Connect your GA and Google Search Console accounts to get a list of keywords that actually drive organic traffic to your top performing pages.
        </Section>
        <Section artLeft art={<SessionsArt />} title="Analyze your traffic at the keyword level">
          Check your impressions, CTR, position and get more data for each keyword to assess how your optimization efforts are affecting your website’s traffic and user behavior.
        </Section>
        <Section art={<SendArt />} title="Export keywords to other tools or Excel">
          <Bullets
            className=""
            items={[
              "Send them to Position Tracking to compare your performance with your competitors",
              "Type them in Keyword Magic to get more keyword ideas",
              "Import them to SEO Ideas to find out how to get to the top",
              "Export them to Excel",
            ]}
          />
        </Section>
        <Section artLeft art={<FilterArt />} title="Monitor keyword changes">
          Filter by new, lost, winning and losing keywords to spot what changed and adjust your
          <br />
          SEO strategy and immediately track your results.
        </Section>
      </LandingCard>
      <LandingCard className="mt-4 h-[264px] pt-[52px] text-center">
        <h2 className="text-[24px] leading-7 font-bold text-rk-text">Get Started!</h2>
        <p className="mt-[12px] text-[16px] leading-6 text-rk-text">{sub}</p>
        <DomainForm button="Get Insights" className="mt-[32px]" inputClassName="w-[600px]" />
      </LandingCard>
    </LandingPage>
  );
}

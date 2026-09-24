import type { ReactNode } from "react";
import { account, brand } from "@/config/brand";
import { GearIcon } from "@/components/ui/icons";
import { Bullets, DomainForm, Faq, LandingCard, LandingPage } from "./landing";
import { baFaq, baFeatures, baKeyFeatures } from "./data";

const PINK = "#f4718a";
const ORANGE = "#ff9200";
const MINT = "#43e0a6";
const SKY = "#27b3f3";

function Callout({ title, children, className }: { title: string; children: ReactNode; className: string }) {
  return (
    <div className={`absolute z-10 bg-white px-4 pt-[13px] pb-[14px] shadow-[0_2px_10px_rgba(25,27,35,0.10)] ${className}`}>
      <div className="text-[14px] leading-5 text-[#8e44d8]">{title}</div>
      <div className="mt-[3px] text-[12px] leading-4 text-[#191b23]">{children}</div>
    </div>
  );
}

const Bolt = ({ color }: { color: string }) => (
  <svg viewBox="0 0 12 18" width={13} height={20} className="shrink-0">
    <path d="M7.5 0 1 10h4.2L3.8 18 11 7H6.6z" fill={color} />
  </svg>
);

function Insight({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div className="flex h-[49px] flex-1 items-center gap-[10px] rounded-md bg-white pl-4 text-[15px] font-medium text-[#2b2e38] shadow-[0_2px_6px_rgba(25,27,35,0.05)]">
      <Bolt color={color} />
      {children}
    </div>
  );
}

function ToxBar({ className = "", h = 20 }: { className?: string; h?: number }) {
  return (
    <div className={`flex gap-[1px] overflow-hidden rounded-[3px] shadow-[0_3px_8px_rgba(244,113,138,0.25)] ${className}`} style={{ height: h }}>
      <div className="w-[65%]" style={{ background: PINK }} />
      <div className="w-[17.5%]" style={{ background: ORANGE }} />
      <div className="flex-1" style={{ background: MINT }} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[15px] font-medium text-[#2b2e38]">{label}</div>
      <div className="mt-[11px] text-[22px] leading-6 font-semibold" style={{ color: SKY }}>
        {value}
      </div>
      <div className="mt-[16px] flex gap-[18px] text-[12px] text-[#a0a3ac]">
        <span>New</span>
        <span>Broken</span>
        <span>Lost</span>
      </div>
    </div>
  );
}

const Chip = ({ children, tone, small }: { children: ReactNode; tone: "money" | "text" | "branded"; small?: boolean }) => (
  <span
    className={`inline-flex items-center gap-[5px] rounded-full ${small ? "h-[18px] px-[9px] text-[11px]" : "h-[23px] px-[11px] text-[13px]"} ${
      tone === "money" ? "bg-[#ffe6ec] text-[#f06c86]" : tone === "branded" ? "bg-[#f1f2f5] text-[#8a8e9b]" : "border border-[#d6d8de] text-[#a9abb6]"
    }`}
  >
    {children}
    {tone !== "text" && (
      <svg viewBox="0 0 12 12" width={11} height={11}>
        <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
      </svg>
    )}
  </span>
);

const ActionBtn = ({ kind }: { kind: "doc" | "send" | "ban" }) => (
  <span
    className={`flex h-[44px] w-[44px] items-center justify-center rounded-md ${kind === "doc" ? "border border-[#c4c7cf] bg-[#f4f5f9] text-[#8a8e9b]" : "text-white"}`}
    style={kind === "doc" ? undefined : { background: SKY }}
  >
    <svg viewBox="0 0 20 20" width={20} height={20}>
      {kind === "doc" && <path d="M5 3h7l3 3v11H5zM8 12l2 2 3-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />}
      {kind === "send" && <path d="M16 4 3.5 9.5l5 1.5L10 16zM8.5 11 16 4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />}
      {kind === "ban" && (
        <>
          <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth={2} />
          <path d="m5.5 14.5 9-9" stroke="currentColor" strokeWidth={2} />
        </>
      )}
    </svg>
  </span>
);

const TrafficGlyph = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <rect x="2" y="11" width="3" height="4" rx="1" fill="#f7b500" />
    <rect x="6.5" y="7" width="3" height="8" rx="1" fill="#f7b500" />
    <rect x="11" y="1" width="3" height="14" rx="1" fill="#f58a1f" />
  </svg>
);

const Arrow = ({ d, className = "" }: { d: string; className?: string }) => (
  <svg className={`pointer-events-none absolute top-0 left-0 z-20 overflow-visible ${className}`} width={10} height={10}>
    <path d={d} fill="none" stroke="#b46cf0" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Hero() {
  return (
    <div className="relative h-[739px]">
      <Callout title="Toxicity score" className="top-[40px] left-[23px] w-[280px]">
        This score is based on the number of suspicious domains linking to your website
      </Callout>
      <Callout title="Insights" className="top-[40px] left-[675px] w-[280px]">
        Personal recommendations to improve your backlink profile
      </Callout>
      <Callout title="Actions" className="top-[549px] left-[442px] w-[281px]">
        Check the quality of every link. Create a list of links to remove or disavow and reach out from the tool
      </Callout>
      <Arrow d="M47 119C20 160 18 250 76 295M76 295l-13-3M76 295l-5-12" />
      <Arrow d="M675 91C590 70 500 88 478 155M478 155l-7-11M478 155l10-8" />
      <Arrow d="M734 114l4 4" />
      <Arrow d="M722 565C768 556 800 530 801 490M801 490l-8 10M801 490l8 9" />
      <Arrow d="M486 549c8 1 14 3 20 6" />
      <div className="absolute top-[148px] left-[57px] h-[366px] w-[865px] rounded-[16px] bg-[#f1f2f6]">
        <div className="absolute top-[25px] left-[25px] flex w-[815px] gap-[13px]">
          <Insight color={PINK}>New toxic backlinks</Insight>
          <Insight color={PINK}>Potential link networks</Insight>
          <Insight color={ORANGE}>Too many money anchors</Insight>
        </div>
        <div className="absolute top-[88px] left-[26px] flex h-[127px] w-[814px] rounded-md bg-white shadow-[0_2px_6px_rgba(25,27,35,0.05)]">
          <div className="w-[405px] border-r border-[#f0f1f4] pt-[18px] pl-5">
            <div className="text-[15px] font-medium text-[#2b2e38]">Toxicity score</div>
            <div className="mt-[11px] text-[22px] leading-6 font-semibold" style={{ color: PINK }}>
              High
            </div>
            <ToxBar className="mt-[14px] w-[365px]" />
          </div>
          <div className="w-[204px] pt-[18px] pl-5">
            <Stat label="Referring Domains" value="1,589" />
          </div>
          <div className="my-4 border-l border-[#f0f1f4] pt-[2px] pl-5">
            <Stat label="Analyzed Backlinks" value="10,130" />
          </div>
        </div>
        <div className="absolute top-[227px] left-[26px] w-[814px] overflow-hidden rounded-md bg-white shadow-[0_2px_6px_rgba(25,27,35,0.05)]">
          <div className="flex h-[42px] items-center bg-[#f4f5f8] text-[13px] text-[#6c6e79]">
            <span className="flex h-full w-[167px] items-center border-r-2 border-white pl-5">Page Title and URL</span>
            <span className="flex h-full w-[178px] items-center border-r-2 border-white pl-5">Anchor</span>
            <span className="flex h-full w-[160px] items-center gap-[6px] border-r-2 border-white pl-[22px]">
              <TrafficGlyph />
              Referral Traffic
            </span>
            <span className="flex h-full w-[124px] items-center border-r-2 border-white pl-[18px]">Toxicity Score</span>
            <span className="flex h-full flex-1 items-center justify-end pr-5">Actions</span>
          </div>
          <div className="flex h-[73px] items-start pt-[17px] text-[13px]">
            <span className="flex w-[167px] gap-2 pl-5 leading-[19px] text-[#6c6e79]">
              <svg viewBox="0 0 16 16" width={16} height={16} className="mt-[3px] shrink-0 text-[#c4c7cf]">
                <path d="M7 9.5 9.5 7M7.3 5.1l1-1a2.6 2.6 0 0 1 3.7 3.7l-1 1M8.7 11l-1 1a2.6 2.6 0 0 1-3.7-3.7l1-1" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
              </svg>
              <span>
                suspicious.com/
                <br />
                remove-me/
              </span>
            </span>
            <span className="flex w-[178px] gap-[6px] pl-[18px]">
              <Chip tone="money">Money</Chip>
              <Chip tone="text">Text</Chip>
            </span>
            <span className="w-[160px] pr-[25px] text-right text-[20px] font-semibold text-[#c4c7cf]">139</span>
            <span className="flex w-[124px] items-center gap-2 pl-[57px] text-[20px] font-semibold" style={{ color: PINK }}>
              87
              <svg viewBox="0 0 12 12" width={12} height={12}>
                <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </span>
            <span className="-mt-[1px] flex flex-1 justify-end gap-[9px] pr-[18px]">
              <ActionBtn kind="doc" />
              <ActionBtn kind="send" />
              <ActionBtn kind="ban" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const Skel = ({ w, className = "" }: { w: number; className?: string }) => <div className={`h-[9px] rounded-full bg-[#eef0f3] ${className}`} style={{ width: w }} />;

function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative h-[279px] overflow-hidden rounded-md bg-[#f4f5f8] ${className}`}>{children}</div>;
}

function AuditArt() {
  const row = (anchor: "branded" | "money", traffic: string, score: number, color: string) => (
    <div className="flex h-[98px] border-t border-[#eceef2] pt-[18px] text-[12px]">
      <div className="w-[125px] pl-4">
        <Skel w={88} />
        <Skel w={38} className="mt-2" />
        <span className="mt-[10px] inline-block rounded-full bg-[#c9f5dd] px-[9px] py-[1px] text-[11px] text-[#0b8a5c]">New</span>
      </div>
      <div className="w-[104px] space-y-[8px] pl-[14px]">
        <Chip small tone={anchor}>{anchor === "money" ? "Money" : "Branded"}</Chip>
        <div>
          <span className="inline-flex h-[18px] items-center rounded-full border border-[#dcdee3] px-[9px] text-[11px] text-[#a9abb6]">Text</span>
        </div>
      </div>
      <div className="w-[94px] pr-4 text-right text-[16px] font-semibold text-[#a9abb6]">{traffic}</div>
      <div className="flex w-[76px] items-start justify-end gap-1 pr-4 text-[16px] font-semibold" style={{ color }}>
        {score}
        <svg viewBox="0 0 12 12" width={11} height={11} className="mt-[5px]">
          <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
  return (
    <Frame>
      <div className="absolute top-[33px] left-[30px] w-[420px] bg-white">
        <div className="flex h-[50px] items-center border-b border-[#eceef2] text-[11px] leading-4 text-[#484a54]">
          <span className="w-[125px] pl-4">Page Title and URL</span>
          <span className="flex h-full w-[104px] items-center border-l border-[#eceef2] pl-[14px]">Anchor</span>
          <span className="flex h-full w-[94px] items-center justify-end gap-1 border-l border-[#eceef2] pr-4 text-right">
            <TrafficGlyph />
            <span>
              Refferal
              <br />
              Traffic
            </span>
          </span>
          <span className="flex h-full w-[76px] items-center justify-end border-l border-[#eceef2] pr-4 text-right">
            Toxicity
            <br />
            Score
          </span>
        </div>
        <div className="px-[15px]">
          <div className="-mx-[15px] px-[15px] [&>div:first-child]:border-t-0">
            {row("branded", "139", 54, "#ff9200")}
            {row("money", "1.4K", 44, "#12c78b")}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function DisavowArt() {
  return (
    <Frame>
      <div className="absolute top-[31px] left-[30px] h-[260px] w-[160px] bg-white text-[11px]">
        <div className="px-4 pt-[13px] pb-[9px] text-[14px] font-medium text-[#484a54]">Remove</div>
        <div className="flex">
          <div className="h-[200px] w-[114px] bg-[#f4f5f8]">
            <div className="h-[62px] bg-[#e8e9ef] px-4 pt-[9px] leading-[14px] text-[#6c6e79]">
              Source Domain, Anchor Text, Status
            </div>
            <div className="px-4 pt-5">
              <Skel w={82} className="bg-white" />
              <Skel w={48} className="mt-[10px] bg-white" />
              <div className="mt-[18px] flex items-center">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="flex items-center">
                    <span className="h-[9px] w-[9px] rounded-full bg-[#12c78b]" />
                    <span className="h-[2px] w-[16px] bg-[#12c78b]" />
                  </span>
                ))}
                <span className="h-[9px] w-[9px] rounded-full border-2 border-[#c4c7cf]" />
              </div>
              <span className="mt-[21px] flex h-[25px] w-[86px] items-center justify-center rounded-sm bg-[#1bc68b] text-[12px] text-white">Send email</span>
            </div>
          </div>
          <div className="pt-[13px] pl-4">
            <div className="h-[28px] w-[40px] rounded-[3px] border border-[#e0e1e9]" />
            <div className="mt-[11px] h-[28px] w-[40px] rounded-[3px] border border-[#e0e1e9]" />
          </div>
        </div>
      </div>
      <div className="absolute top-[51px] left-[178px] h-[228px] w-[251px] rounded-l-md bg-white text-[11px] shadow-[0_2px_10px_rgba(25,27,35,0.08)]">
        <div className="px-4 pt-[12px] pb-[8px] text-[14px] font-medium text-[#484a54]">Disavow</div>
        <div className="flex h-[32px] items-center bg-[#f4f5f8] text-[#6c6e79]">
          <span className="w-[118px] border-r border-white pl-4">URL</span>
          <span className="pl-4">Disavowed</span>
        </div>
        {[
          ["check", "Exported"],
          ["export", "Ready\nto be exported"],
          ["ban", "Not upload\nto Google"],
        ].map(([k, t]) => (
          <div key={k} className="flex h-[40px] items-center">
            <div className="w-[118px] pl-4">
              <Skel w={90} />
              {k !== "check" && <Skel w={62} className="mt-[5px]" />}
            </div>
            <div className="flex items-center gap-[6px] pl-[18px] leading-[14px] whitespace-pre text-[#484a54]">
              <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
                {k === "check" && <path d="m3 8.5 3 3 7-7" fill="none" stroke="#12c78b" strokeWidth={1.8} strokeLinecap="round" />}
                {k === "export" && <path d="M6 3H3v10h3M7 8h7M11 5l3 3-3 3" fill="none" stroke="#2bb3ff" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />}
                {k === "ban" && (
                  <>
                    <circle cx="8" cy="8" r="6" fill="none" stroke="#ff4953" strokeWidth={1.6} />
                    <path d="m4 12 8-8" stroke="#ff4953" strokeWidth={1.6} />
                  </>
                )}
              </svg>
              {t}
            </div>
          </div>
        ))}
        <span className="-mt-[4px] ml-4 flex h-[25px] w-[94px] items-center justify-center rounded-sm text-[12px] text-white" style={{ background: SKY }}>
          Export to file
        </span>
      </div>
    </Frame>
  );
}

function ImportArt() {
  return (
    <Frame>
      <div className="absolute top-[33px] left-[30px] h-[260px] w-[400px] rounded-l-md bg-white">
        <div className="absolute top-[13px] left-[141px] flex gap-[6px]">
          <span className="flex h-[26px] items-center gap-[6px] rounded-[3px] bg-[#0fb58a] px-[9px] text-[12px] font-medium text-white">
            <svg viewBox="0 0 12 12" width={11} height={11}>
              <path d="M6 1.5v6M3.5 5 6 7.5 8.5 5M1.5 9.5v1h9v-1" fill="none" stroke="currentColor" strokeWidth={1.4} />
            </svg>
            Import backlinks
          </span>
          <span className="flex h-[26px] items-center gap-[6px] rounded-[3px] border border-[#c4c7cf] bg-[#eef0f3] px-[9px] text-[12px] font-medium text-[#484a54]">
            <span className="text-[16px] leading-none">+</span>
            Integrations
          </span>
        </div>
        <Skel w={72} className="absolute top-[58px] left-[30px]" />
        <div className="absolute top-[79px] left-[30px] text-[22px] font-semibold text-[#ffa633]">Medium</div>
        <div className="absolute top-[117px] left-[30px] flex gap-[36px] text-[17px] font-semibold text-[#f4718a]">
          <span>651</span>
          <span className="text-[#ff9f3a]">1.2K</span>
        </div>
        <Skel w={32} className="absolute top-[146px] left-[30px]" />
        <Skel w={48} className="absolute top-[146px] left-[107px]" />
        <div className="absolute top-[168px] left-[30px] flex h-[24px] w-[260px] gap-[1px]">
          <div className="w-[51px]" style={{ background: PINK }} />
          <div className="w-[97px]" style={{ background: "#ffa633" }} />
          <div className="flex-1" style={{ background: MINT }} />
        </div>
      </div>
      <div className="absolute top-[81px] left-[234px] h-[188px] w-[184px] rounded-md bg-white px-4 pt-[12px] text-[12px] text-[#2b2e38] shadow-[0_2px_12px_rgba(25,27,35,0.14)]">
        <div className="flex items-center gap-[8px]">
          <TrafficGlyph />
          Google Analytics
        </div>
        <div className="mt-[2px] text-[10px] text-[#a9abb6]">{account.email}</div>
        <div className="mt-[14px]">Google Search Console</div>
        <div className="mt-[2px] text-[10px] text-[#a9abb6]">{brand.domain}</div>
        <div className="mt-[14px]">Majestic</div>
        <div className="mt-[20px] flex items-center gap-2 text-[#008ff8]">
          <span className="text-[16px] leading-none">+</span>
          Connect
        </div>
      </div>
    </Frame>
  );
}

function MonitorArt() {
  const bars = [
    [7, 0, 0],
    [54, 20, 0],
    [0, 46, 8],
    [0, 50, 0],
  ];
  return (
    <Frame>
      <div className="absolute top-[34px] left-[30px] h-[260px] w-[400px] rounded-l-md bg-white">
        <span className="absolute top-[13px] right-[12px] flex h-[26px] items-center gap-[6px] rounded-[3px] border border-[#c4c7cf] bg-[#eef0f3] px-[9px] text-[12px] font-medium text-[#484a54]">
          <GearIcon width={14} height={14} />
          Setting
        </span>
        <div className="absolute top-[58px] left-[30px] h-[1px] w-[110px] bg-[#e0e1e9]" />
        <div className="absolute top-[117px] left-[30px] h-[1px] w-[110px] bg-[#e0e1e9]" />
        {bars.map(([up, down, red], i) => (
          <div key={i} className="absolute" style={{ left: 40 + i * 32, top: 117 - up }}>
            {up > 0 && <div className="w-[12px] rounded-t-[2px] bg-[#48b9f7]" style={{ height: up }} />}
            {red > 0 && <div className="w-[12px] rounded-t-[2px] bg-[#ff4d6a]" style={{ height: red }} />}
            <div className="w-[12px] rounded-b-[2px] bg-[#ff9b56]" style={{ height: down }} />
          </div>
        ))}
        <div className="absolute top-[179px] left-[30px] h-[1px] w-[110px] bg-[#e0e1e9]" />
        <div className="absolute top-[191px] left-[30px] flex gap-[30px] text-[11px] text-[#a9abb6]">
          <span>Jan 17</span>
          <span>Jan 19</span>
        </div>
      </div>
      <div className="absolute top-[78px] left-[160px] h-[230px] w-[258px] rounded-md bg-white px-4 pt-[14px] shadow-[0_2px_12px_rgba(25,27,35,0.14)]">
        <div className="text-[14px] font-medium text-[#2b2e38]">Recrawl schedule</div>
        <span className="mt-[17px] inline-flex h-[28px] items-center gap-[6px] rounded-md border border-[#c4c7cf] px-[9px] text-[12px] text-[#2b2e38]">
          Once a week
          <svg viewBox="0 0 12 12" width={10} height={10}>
            <path d="m2.5 4.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
          </svg>
        </span>
        <div className="mt-[14px] flex gap-[9px] text-[12px] leading-[18px] text-[#484a54]">
          <span className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[3px] bg-[#2bb3ff] text-white">
            <svg viewBox="0 0 12 12" width={10} height={10}>
              <path d="m2.5 6 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth={1.8} />
            </svg>
          </span>
          Send an email every time an audit is complete
        </div>
        <span className="mt-[21px] flex h-[24px] w-[64px] items-center justify-center rounded-[3px] bg-[#0fc28b] text-[12px] font-medium text-white">Update</span>
      </div>
    </Frame>
  );
}

function FeaturesArt() {
  const card = "absolute rounded-md bg-white shadow-[0_2px_10px_rgba(25,27,35,0.05)]";
  const nl = [
    [20, 17],
    [16, 21],
    [32, 38],
    [45, 18],
    [27, 13],
  ];
  return (
    <div className="relative h-[572px] w-[429px] rounded-[10px] bg-[#f1f2f6]">
      <div className={`${card} top-[30px] left-[31px] h-[175px] w-[175px] px-[19px] pt-[21px]`}>
        <div className="text-[15px] font-medium text-[#2b2e38]">Toxicity Score</div>
        <div className="mt-[14px] text-[30px] leading-9 font-semibold" style={{ color: PINK }}>
          High
        </div>
        <Skel w={124} className="mt-[20px] h-[14px]" />
        <Skel w={73} className="mt-[12px] h-[14px]" />
      </div>
      <div className={`${card} top-[30px] left-[223px] h-[175px] w-[175px] px-[19px] pt-[21px]`}>
        <div className="text-[15px] font-medium text-[#2b2e38]">New &amp; Lost</div>
        <div className="absolute top-[106px] left-[22px] h-[1px] w-[132px] bg-[#e0e1e9]" />
        {nl.map(([u, d], i) => (
          <div key={i} className="absolute" style={{ left: 34 + i * 25.5, top: 106 - u }}>
            <div className="w-[9px] rounded-t-[2px] bg-[#2bb3ff]" style={{ height: u }} />
            <div className="w-[9px] rounded-b-[2px] bg-[#ff8c43]" style={{ height: d }} />
          </div>
        ))}
      </div>
      <div className={`${card} top-[222px] left-[31px] h-[176px] w-[367px] px-[19px] pt-[21px]`}>
        <div className="text-[15px] font-medium text-[#2b2e38]">Domains by Toxicity Score</div>
        <div className="mt-[34px] flex h-[25px] gap-[1px] overflow-hidden rounded-[4px] shadow-[0_3px_8px_rgba(67,224,166,0.25)]">
          <div className="w-[30%]" style={{ background: PINK }} />
          <div className="w-[27%]" style={{ background: ORANGE }} />
          <div className="flex-1" style={{ background: MINT }} />
        </div>
        <div className="mt-[14px] flex justify-between text-[26px] leading-8 font-semibold">
          <span style={{ color: PINK }}>32%</span>
          <span className="-ml-[32px]" style={{ color: ORANGE }}>
            28%
          </span>
          <span className="text-[#19c38f]">40%</span>
        </div>
      </div>
      <div className={`${card} top-[415px] left-[31px] h-[132px] w-[367px] px-[19px] pt-[21px]`}>
        <div className="flex justify-between">
          <div>
            <div className="text-[15px] font-medium text-[#2b2e38]">Link attributes</div>
            <div className="mt-[22px] flex h-[10px] w-[173px] overflow-hidden rounded-full bg-[#eef0f3]">
              <div className="w-[70%] rounded-full" style={{ background: MINT }} />
            </div>
            <div className="mt-[10px] flex h-[10px] w-[173px] overflow-hidden rounded-full bg-[#eef0f3]">
              <div className="w-[40%] rounded-full bg-[#2bb3ff]" />
            </div>
          </div>
          <div className="pr-[20px]">
            <div className="text-[15px] font-medium text-[#2b2e38]">Disavowed</div>
            <div className="mt-[6px] flex items-center gap-[6px] text-[26px] leading-8 font-semibold" style={{ color: SKY }}>
              12
              <svg viewBox="0 0 20 20" width={22} height={22}>
                <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth={2.4} />
                <path d="m4.5 15.5 11-11" stroke="currentColor" strokeWidth={2.4} />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const arts = [<AuditArt key="a" />, <DisavowArt key="b" />, <ImportArt key="c" />, <MonitorArt key="d" />];

function FeatureRow({ i }: { i: number }) {
  const f = baFeatures[i];
  const imageLeft = i % 2 === 0;
  const text = (
    <div className={`w-[430px] ${imageLeft ? "-mt-[2px]" : "-mt-[2px]"}`}>
      <h3 className="text-[20px] leading-6 font-semibold text-rk-text">{f.title}</h3>
      <Bullets items={f.bullets} className="mt-[12px]" />
    </div>
  );
  return (
    <div className="flex items-start justify-between" style={{ marginTop: i === 0 ? 30 : 49 }}>
      {imageLeft ? (
        <>
          <div className="w-[430px]">{arts[i]}</div>
          <div className="mr-[1px]">{text}</div>
        </>
      ) : (
        <>
          {text}
          <div className="w-[429px]">{arts[i]}</div>
        </>
      )}
    </div>
  );
}

export function BacklinkAudit() {
  return (
    <LandingPage>
      <LandingCard className="h-[228px] pt-[35px] text-center">
        <h1 className="text-[36px] leading-[48px] font-bold text-rk-text">Backlink Audit</h1>
        <p className="mt-[9px] text-[16px] leading-6 text-rk-text">Keep your backlink profile healthy!</p>
        <DomainForm button="Start Backlink Audit" className="mt-[32px]" />
      </LandingCard>
      <LandingCard className="mt-4 px-[23px] pb-[48px]">
        <div className="-mx-[23px]">
          <Hero />
        </div>
        <h2 className="text-center text-[24px] leading-8 font-bold text-rk-text">Everything you need for a complete Backlink Audit</h2>
        {baFeatures.map((_, i) => (
          <FeatureRow key={i} i={i} />
        ))}
        <h2 className="mt-[95px] text-center text-[24px] leading-8 font-bold text-rk-text">Key features of the Backlink Audit tool</h2>
        <div className="mt-[30px] flex justify-between">
          <ul className="text-[16px] leading-6 text-rk-text">
            {baKeyFeatures.map((k, i) => (
              <li key={k} className="flex items-center gap-[9px]" style={{ marginTop: i === 0 ? 0 : i === 5 ? 6 : 12 }}>
                <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#009f81]">
                  <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {k}
              </li>
            ))}
          </ul>
          <FeaturesArt />
        </div>
      </LandingCard>
      <LandingCard className="mt-4 h-[180px] pt-[38px] text-center">
        <h2 className="text-[24px] leading-8 font-bold text-rk-text">Check your backlink profile’s health now!</h2>
        <DomainForm button="Start Backlink Audit" className="mt-[30px]" />
      </LandingCard>
      <LandingCard className="mt-4 pt-[37px] pb-10">
        <h2 className="text-center text-[24px] leading-8 font-bold text-rk-text">FAQ</h2>
        <Faq items={baFaq} className="mx-auto mt-[31px] w-[732px]" />
      </LandingCard>
    </LandingPage>
  );
}

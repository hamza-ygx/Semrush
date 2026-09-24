import type { ReactNode } from "react";
import { Bullets, DomainForm, LandingCard, LandingPage } from "./landing";
import { opscIdeas, opscPages } from "./data";

const idea = (code: string) => opscIdeas.find((i) => i.code === code)!;

function Badge({ code, size = 22, className = "" }: { code: string; size?: number; className?: string }) {
  const i = idea(code);
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[4px] text-white ${className}`}
      style={{ background: i.color, width: size, height: size, fontSize: size > 30 ? 16 : 12, fontWeight: size > 30 ? 600 : 400 }}
    >
      {code}
    </span>
  );
}

function Donut() {
  const order = ["St", "Ba", "Se", "Te", "Co", "Ux", "Sf"];
  const total = order.reduce((s, c) => s + idea(c).count, 0);
  const r = 89;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 200 200" width={200} height={200} className="absolute top-[70px] left-[20px]">
      {order.map((code) => {
        const len = (idea(code).count / total) * c;
        const el = (
          <circle
            key={code}
            cx={100}
            cy={100}
            r={r}
            fill="none"
            stroke={idea(code).color}
            strokeWidth={22}
            strokeDasharray={`${Math.max(len - 1.5, 0)} ${c}`}
            strokeDashoffset={-acc}
            transform="rotate(-90 100 100)"
          />
        );
        acc += len;
        return el;
      })}
    </svg>
  );
}

function IdeasSummary() {
  const cols = [
    ["St", "Ba", "Te", "Ux"],
    ["Sf", "Se", "Co"],
  ];
  return (
    <div className="relative mx-auto mt-[34px] h-[346px] w-[732px] rounded-[10px] bg-[#f3f5f8] pt-[23px]">
      <div className="relative mx-auto h-[299px] w-[684px] rounded-md bg-white">
        <div className="absolute top-[18px] left-[22px] text-[16px] leading-5 text-[#484a54]">Total Ideas</div>
        <Donut />
        <div className="absolute top-[128px] left-[20px] w-[200px] text-center">
          <div className="text-[36px] leading-[44px] font-bold text-[#086dc6]">243</div>
          <div className="mt-[3px] text-[13px] leading-4 text-[#484a54]">for 24 pages</div>
        </div>
        <div className="absolute top-[33px] left-[260px] flex gap-[29px]">
          {cols.map((col, ci) => (
            <div key={ci} className="w-[188px]">
              {col.map((code) => (
                <div key={code} className="flex h-[36px] items-center text-[13px] text-[#484a54]">
                  <Badge code={code} className="mr-[10px]" />
                  <span className="flex-1 text-[12px] whitespace-nowrap">{idea(code).label}</span>
                  <span className="font-medium text-[#086dc6]">{idea(code).count}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute top-[185px] left-[260px] h-[94px] w-[404px] rounded-md bg-[#e8fbf2] px-4 pt-[10px]">
          <div className="text-[12px] leading-4 text-[#484a54]">Our ideas may help you increase your organic traffic</div>
          <div className="mt-[16px] flex items-center">
            <span className="w-[151px] text-[26px] leading-8 font-semibold text-[#189e79]">Over 240%</span>
            <div className="space-y-[8px] text-[12px] leading-4 text-[#484a54]">
              {[
                ["Current", "36%", "300K"],
                ["Potential", "100%", "720K"],
              ].map(([l, w, v]) => (
                <div key={l} className="flex items-center">
                  <span className="w-[58px]">{l}</span>
                  <span className="h-[11px] w-[122px] rounded-[2px] bg-[#dedfe6]">
                    <span className="block h-full rounded-[2px] bg-[#0091ff]" style={{ width: w }} />
                  </span>
                  <span className="ml-[9px]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PagesArt() {
  return (
    <div className="relative h-[259px] w-[429px] overflow-hidden rounded-md bg-[#f3f5f8]">
      <div className="absolute top-[32px] left-0 h-[227px] w-[398px] rounded-tr-md bg-white text-[12px] text-[#484a54]">
        <div className="flex h-[37px] items-center border-b border-[#e6e7ec] pl-3">
          <span className="w-[76px]">Priority</span>
          <span className="w-[235px]">Page</span>
          <span>All ideas</span>
        </div>
        {opscPages.map((p, i) => (
          <div key={i} className={`flex items-center border-b border-[#e6e7ec] pl-3 ${p.url.includes("\n") ? "h-[52px]" : "h-[37px]"}`}>
            <span className="flex w-[76px] gap-[2px]">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-[7px] w-[16px] rounded-[2px]" style={{ background: k < p.prio ? "#ffc400" : "#fdf1b8" }} />
              ))}
            </span>
            <span className="w-[235px] leading-4 whitespace-pre">{p.url}</span>
            <span className="rounded-[3px] bg-[#009f81] px-[6px] text-[12px] leading-[18px] text-white">{p.ideas} ideas</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Skel = ({ w, className = "" }: { w: number; className?: string }) => <div className={`h-[8px] rounded-full bg-[#eef0f3] ${className}`} style={{ width: w }} />;

function ReportArt() {
  const box = (code: string, label: string, body: ReactNode, h: number) => (
    <div className="flex overflow-hidden rounded-[4px] border border-[#e0e1e9]" style={{ height: h }}>
      <div className="flex w-[134px] shrink-0 items-start gap-[8px] bg-[#f4f5f9] px-[7px] pt-[6px] text-[12px] text-[#484a54]">
        <Badge code={code} />
        {label}
      </div>
      <div className="flex-1 px-[13px] pt-[8px] text-[12px] leading-4 text-[#2b2e38]">{body}</div>
    </div>
  );
  return (
    <div className="relative h-[260px] w-[429px] overflow-hidden rounded-md bg-[#f3f5f8]">
      <div className="absolute top-[34px] left-[32px] h-[240px] w-[400px] rounded-tl-md bg-white pt-[14px] pl-4">
        <div className="text-[16px] leading-6 text-[#2b2e38]">https://www.krispykreme.com</div>
        <div className="mt-[10px] w-[365px] space-y-[9px]">
          {box(
            "Sf",
            "SERP Features",
            <>
              • Mark up your aggregate rating
              <Skel w={204} className="mt-[10px]" />
              <Skel w={158} className="mt-[8px]" />
            </>,
            71,
          )}
          {box(
            "Co",
            "Content",
            <>
              • Use target keywords in &lt;title&gt; tag
              <Skel w={204} className="mt-[10px]" />
              <Skel w={178} className="mt-[8px]" />
              <div className="mt-[16px]">• Use target keyword in &lt;h1&gt; tag</div>
            </>,
            110,
          )}
        </div>
      </div>
    </div>
  );
}

function IdeaCard({ code }: { code: string }) {
  const i = idea(code);
  return (
    <div className="relative h-[128px] rounded-md bg-[#f4f5f9] px-5 pt-[32px]">
      <span className="absolute -top-[20px] left-5 flex h-10 w-10 items-center justify-center rounded-md text-[16px] font-semibold text-white shadow-[0_2px_6px_rgba(25,27,35,0.18)]" style={{ background: i.color }}>
        {code}
      </span>
      <div className="text-[16px] leading-6 font-bold text-rk-text">{i.label}</div>
      <p className="mt-[8px] text-[16px] leading-6 text-rk-text">{i.text}</p>
    </div>
  );
}

export function OnPageSeoChecker() {
  const h = "text-[24px] leading-[29px] font-semibold tracking-[-0.2px] text-rk-text";
  return (
    <LandingPage>
      <LandingCard className="h-[263px] pt-[35px] text-center">
        <h1 className="text-[36px] leading-[44px] font-semibold tracking-[-0.3px] text-rk-text">On Page SEO Checker</h1>
        <p className="mx-auto mt-[16px] w-[470px] text-[16px] leading-6 text-rk-text">
          Get an exhaustive list of ideas based on competitive analysis that can improve the organic performance of your website.
        </p>
        <DomainForm button="Get ideas" className="mt-[32px]" inputClassName="w-[623px]" />
      </LandingCard>
      <LandingCard className="mt-4 px-6 pt-[38px] pb-[48px]">
        <h2 className={`mx-auto w-[600px] text-center ${h}`}>Review your report based on the analysis of your competitors and get ideas to optimize your website</h2>
        <IdeasSummary />
        <div className="mt-[97px] flex items-start justify-between">
          <PagesArt />
          <div className="-mt-[2px] w-[424px]">
            <h3 className={h}>Get a report on all pages of your site</h3>
            <Bullets className="mt-[18px]" items={["Get a list of pages with a number of ideas for improvements", "Sort pages by recommendation importance, number of ideas, volume and more"]} />
          </div>
        </div>
        <div className="mt-[65px] flex items-start justify-between">
          <div className="-mt-[2px] w-[430px]">
            <h3 className={h}>Get a comprehensive report on any page of your website</h3>
            <Bullets className="mt-[18px]" items={["Hone into the exact issues that need your attention", "Look into detailed how-tos for improving each area of your site"]} />
          </div>
          <ReportArt />
        </div>
        <h2 className={`mt-[93px] text-center ${h}`}>The ideas you’ll get</h2>
        <div className="mt-[54px] grid grid-cols-2 gap-x-[25px] gap-y-[44px]">
          {["St", "Ba", "Te", "Ux", "Sf", "Se", "Co"].map((c) => (
            <IdeaCard key={c} code={c} />
          ))}
        </div>
      </LandingCard>
      <LandingCard className="mt-4 h-[189px] pt-[38px] text-center">
        <h2 className={h}>Gather new ideas to optimize your website</h2>
        <DomainForm button="Get ideas" className="mt-[34px]" inputClassName="w-[623px]" />
      </LandingCard>
    </LandingPage>
  );
}

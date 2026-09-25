"use client";

import { useState } from "react";
import { ArtChartScreen, ArtShieldHand, ArtStopwatchGear } from "./art";
import { Feature, LandingBg, LandingFooter, aiButton } from "./landing";
import { UpsellModal } from "./UpsellModal";

const features = [
  { art: <ArtShieldHand size={98} />, title: "AI Visibility Benchmarking" },
  { art: <ArtChartScreen size={98} />, title: "Topic Gap Analysis" },
  { art: <ArtStopwatchGear size={98} />, title: "Strategic Recommendations" },
];

const field = "flex h-10 w-full items-center gap-2 rounded-lg border border-[#e4e4ee] bg-white px-3 text-[16px]";

export function CompetitorResearchLanding() {
  const [domain, setDomain] = useState("");
  const [competitors, setCompetitors] = useState([""]);
  const [recent, setRecent] = useState<string[]>([]);
  const [modal, setModal] = useState(false);

  const run = () => {
    const list = [domain, ...competitors].map((d) => d.trim()).filter(Boolean);
    if (list.length) setRecent((r) => [list.join(", "), ...r.filter((x) => x !== list.join(", "))]);
    setModal(true);
  };

  return (
    <>
      <LandingBg>
        <div className={`flex flex-col items-center px-8 pt-[79px] text-center ${recent.length ? "pb-[214px]" : "pb-[264px]"}`}>
          <p className="text-[14px] leading-5 text-rk-text-2">AI Competitor Gap Analysis</p>
          <h1 className="mt-[14px] w-[620px] text-[48px] leading-[58px] font-semibold tracking-[-0.3px] text-rk-text">Find the Gaps in Your AI Visibility</h1>
          <p className="mt-[19px] w-[740px] text-[16px] leading-6 text-rk-text">
            See how AI platforms position your competitors versus your brand. Compare strengths and weaknesses, and uncover the exact topics and prompts where rivals get cited — but you don&apos;t.
          </p>
          <form
            className="mt-[41px] flex w-[738px] flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              run();
            }}
          >
            <label className={field}>
              <span className="rounded-[10px] bg-[#e6e4fa] px-[9px] text-[13px] leading-5 text-[#5a50c8]">You</span>
              <input
                aria-label="Enter your domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain"
                className="min-w-0 flex-1 text-rk-text outline-none placeholder:text-rk-muted"
              />
            </label>
            {competitors.map((c, i) => (
              <label key={i} className={field}>
                <span className="ml-[3px] h-[10px] w-[10px] rounded-full bg-[#edefef]" />
                <input
                  aria-label={`Competitor ${i + 1}`}
                  value={c}
                  onChange={(e) => setCompetitors((all) => all.map((x, j) => (j === i ? e.target.value : x)))}
                  placeholder="Add competitor"
                  className="min-w-0 flex-1 text-rk-text outline-none placeholder:text-rk-muted"
                />
              </label>
            ))}
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={competitors.length >= 3}
                onClick={() => setCompetitors((all) => (all.length < 3 ? [...all, ""] : all))}
                className="flex items-center gap-[10px] pl-[13px] text-[16px] font-medium text-rk-link hover:text-rk-link-hover disabled:opacity-50"
              >
                <svg viewBox="0 0 16 16" width={14} height={14} aria-hidden>
                  <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
                </svg>
                Add up to 3 competitors
              </button>
              <button type="submit" className={`h-10 rounded-md px-3 text-[16px] font-medium ${aiButton}`}>
                Run competitor analysis
              </button>
            </div>
          </form>
          {recent.length > 0 && (
            <section data-testid="recently-analyzed" className="mt-[138px] w-[597px] rounded-xl bg-white/50 pt-[29px] pr-4 pb-[33px] pl-8 text-left">
              <h2 className="text-center text-[20px] leading-7 font-semibold text-rk-text">Recently analyzed</h2>
              <ul className="mt-[20px]">
                {recent.map((r) => (
                  <li key={r} className="flex items-center justify-between text-[16px] leading-6">
                    <button type="button" onClick={() => setModal(true)} className="text-rk-link hover:text-rk-link-hover">
                      {r}
                    </button>
                    <span className="text-rk-text-2">Today</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <h2 className="mt-[99px] text-[32px] leading-10 font-semibold text-rk-text">Competitor gap analysis for AI Search</h2>
          <div className="mt-[38px] grid w-[880px] grid-cols-3">
            {features.map((f) => (
              <Feature key={f.title} art={f.art} title={f.title} className="[&>h3]:mt-[24px] [&>h3]:text-[16px] [&>h3]:leading-6" />
            ))}
          </div>
        </div>
      </LandingBg>
      <LandingFooter gap={0} />
      <UpsellModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}

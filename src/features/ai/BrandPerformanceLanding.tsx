"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { ArtBinoculars, ArtBrowserStars, ArtTargetPin } from "./art";
import { ExampleChip, Feature, LandingBg, LandingFooter, aiButton } from "./landing";

const features = [
  { art: <ArtBrowserStars size={98} />, title: "Review your AI brand visibility", text: "Understand your brand's share in AI conversations and identify top priorities for improvement." },
  { art: <ArtBinoculars size={98} />, title: "Beat your competition in LLMs", text: "Track how AI platforms present you vs. rivals and get tips to strengthen your position." },
  { art: <ArtTargetPin size={98} />, title: "Build a stronger business strategy", text: "Understand how your customers feel and optimize your product and marketing strategy." },
];

export function BrandPerformanceLanding() {
  const router = useRouter();
  const sample = `${routes.ai.brandPerformance}?pid=9`;
  return (
    <>
      <LandingBg>
        <div className="flex flex-col items-center px-8 pt-[82px] pb-[292px] text-center">
          <p className="text-[16px] leading-6 text-rk-muted">AI Brand Narrative Tracking</p>
          <h1 className="mt-[19px] text-[48px] leading-[56px] font-semibold tracking-[-0.3px] text-rk-text">
            See How AI Talks
            <br />
            About Your Brand
          </h1>
          <p className="mt-[19px] max-w-[730px] text-[16px] leading-6 text-rk-text">
            Uncover how AI platforms describe, position, and talk about your brand. Get a full breakdown of your AI presence — from share of voice to narrative and sentiment — across the most
            influential prompts and answers.
          </p>
          <form
            className="mt-[41px] flex h-12 w-[731px] overflow-hidden rounded-lg bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(sample);
            }}
          >
            <input aria-label="Enter your domain" placeholder="Enter your domain" className="min-w-0 flex-1 px-[13px] text-[16px] text-rk-text outline-none placeholder:text-rk-muted" />
            <button type="submit" className={`w-[119px] text-[16px] font-semibold ${aiButton}`}>
              Analyze
            </button>
          </form>
          <ExampleChip href={sample} className="mt-[56px] h-[60px] gap-[40px] px-[26px] text-[16px]" />
          <h2 className="mt-[136px] text-[32px] leading-10 font-semibold text-rk-text">
            Win the Market with AI Insights
            <br />
            Before Your Competitors Do
          </h2>
          <div className="mt-[34px] grid w-[936px] grid-cols-3">
            {features.map((f) => (
              <Feature key={f.title} art={f.art} title={f.title} className="[&>h3]:mt-[13px] [&>h3]:text-[16px] [&>h3]:leading-6">
                <p className="mt-[8px] w-[290px] text-[16px] leading-6 text-rk-text">{f.text}</p>
              </Feature>
            ))}
          </div>
        </div>
      </LandingBg>
      <LandingFooter gap={0} />
    </>
  );
}

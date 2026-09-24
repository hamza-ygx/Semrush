"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { ArtDifficulty, ArtIntent, ArtVolume } from "./art";
import { Feature, LandingBg, LandingFooter, aiButton } from "./landing";

const features = [
  { art: <ArtVolume size={100} />, title: "AI Volume" },
  { art: <ArtDifficulty size={100} />, title: "Topic Difficulty" },
  { art: <ArtIntent size={100} />, title: "Intent Analysis" },
];

export function PromptResearchLanding() {
  const router = useRouter();
  return (
    <>
      <LandingBg tone="light">
        <div className="flex flex-col items-center px-8 pt-[86px] pb-[270px] text-center">
          <p className="text-[14px] leading-5 text-rk-text-2">Discover Trending AI Prompts &amp; Topics</p>
          <h1 className="mt-[23px] text-[48px] leading-[56px] font-semibold tracking-[-0.3px] text-rk-text">
            Uncover the Prompts Where
            <br />
            Your Brand Should Be
          </h1>
          <p className="mt-[19px] w-[740px] text-[16px] leading-6 text-rk-text">
            Conduct prompt research for AI SEO. See what questions people ask AI, analyze demand and difficulty, and uncover opportunities to boost your brand&apos;s visibility in AI-powered conversations.
          </p>
          <form
            className="mt-[41px] flex h-12 w-[740px] rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
              const q = String(new FormData(e.currentTarget).get("topic") ?? "").trim();
              if (q) router.push(routes.topicResearch);
            }}
          >
            <input
              name="topic"
              autoFocus
              aria-label="Enter a topic to analyze"
              placeholder="Enter a topic to analyze"
              className="min-w-0 flex-1 rounded-l-lg border-2 border-[#8f8ee6] bg-white px-[15px] text-[16px] text-rk-text outline-none placeholder:text-rk-muted"
            />
            <button type="submit" className={`w-[117px] rounded-r-lg text-[16px] font-semibold ${aiButton}`}>
              Analyze
            </button>
          </form>
          <h2 className="mt-[147px] text-[32px] leading-10 font-semibold text-rk-text">Topic Research for the AI Era</h2>
          <div className="mt-[55px] grid w-[960px] grid-cols-3">
            {features.map((f) => (
              <Feature key={f.title} art={f.art} title={f.title} className="[&>h3]:mt-[23px] [&>h3]:text-[24px] [&>h3]:leading-8" />
            ))}
          </div>
        </div>
      </LandingBg>
      <LandingFooter gap={0} />
    </>
  );
}

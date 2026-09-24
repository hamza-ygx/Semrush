"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { FlagSE, FlagUS, FlagUK } from "@/components/ui/icons";
import { Chevron, PinIcon, SparkleIcon } from "./common";
import { koKeyword } from "./data";

const examples = ["loans", "movies", "how to buy audible books"];

export function KoLanding() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [db, setDb] = useState("SE");
  const count = q.split(",").filter((s) => s.trim()).length;
  const go = (kw: string) => router.push(`${routes.keywordOverview}?q=${encodeURIComponent(kw.trim() || koKeyword)}&db=${db.toLowerCase()}`);
  const flag = db === "SE" ? <FlagSE width={16} height={12} /> : db === "US" ? <FlagUS width={16} height={12} /> : <FlagUK width={16} height={12} />;

  return (
    <div className="mx-auto max-w-[980px] pt-[25px]">
      <div className="rounded-lg bg-white px-[135px] pt-10 pb-10 text-center shadow-card">
        <div className="text-[16px] leading-6 text-rk-muted">Free Keyword Checker</div>
        <h1 className="-mx-[80px] mt-4 text-[36px] leading-10 font-semibold">Check Keyword Difficulty, Competition, Trends, and More with Keyword Overview</h1>
        <p className="mx-auto mt-[15px] max-w-[540px] text-[16px] leading-6 text-rk-text">
          Instantly evaluate how hard it will be to rank in the top 10 results for a search term. Along with other critical keyword metrics.
        </p>
        <form
          className="mt-[31px] text-left"
          onSubmit={(e) => {
            e.preventDefault();
            go(q);
          }}
        >
          <div className="flex h-6 items-center justify-between text-[14px]">
            <span className="ml-[2px] flex items-center gap-1">
              <span className="dotted-underline text-rk-text-2 [text-decoration-style:dotted] [text-underline-offset:5px]">Keywords</span>
              <span className="rounded-full border border-rk-border-strong px-[5px] text-[13px] leading-[18px] text-rk-text-2">{count}/100</span>
            </span>
            <span className="mr-[3px] flex items-center gap-[7px]">
              <span className="mr-[13px] text-rk-muted">Examples:</span>
              {examples.map((ex) => (
                <button key={ex} type="button" onClick={() => go(ex)} className="text-rk-link hover:text-rk-link-hover">
                  {ex}
                </button>
              ))}
            </span>
          </div>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter keywords separated by commas"
            className="mt-[7px] h-[42px] w-full rounded-md border-2 border-[#8d95ec] bg-white px-3 text-[16px] outline-none ring-2 ring-[#8d95ec] placeholder:text-rk-muted"
          />
          <div className="mt-[15px] flex items-center gap-3">
            <label className="flex h-10 w-[320px] items-center gap-[10px] rounded-md border border-[#d7c5fb] px-3">
              <SparkleIcon />
              <input placeholder="Enter domain for personalized data" className="min-w-0 flex-1 text-[16px] outline-none placeholder:text-rk-muted" />
            </label>
            <Popover
              panelClassName="w-[180px]"
              trigger={({ toggle }) => (
                <button type="button" onClick={toggle} className="flex h-10 w-[89px] items-center gap-2 rounded-md border border-rk-border-strong bg-white px-3 text-[16px]">
                  {flag}
                  {db}
                  <Chevron size={14} className="ml-auto" />
                </button>
              )}
            >
              {(close) =>
                ["SE", "US", "UK"].map((d) => (
                  <MenuItem
                    key={d}
                    active={d === db}
                    onClick={() => {
                      setDb(d);
                      close();
                    }}
                  >
                    {d === "SE" ? "Sweden" : d === "US" ? "United States" : "United Kingdom"}
                  </MenuItem>
                ))
              }
            </Popover>
            <button type="button" className="flex h-10 w-[184px] items-center gap-2 rounded-md border border-rk-border-strong bg-white px-3 text-[16px] text-rk-muted">
              <PinIcon className="text-rk-text-2" />
              Select location
              <Chevron size={14} className="ml-auto text-rk-text" />
            </button>
            <button type="submit" className="ml-auto flex h-10 items-center rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4 rounded-lg bg-white px-12 pt-[38px] pb-12 shadow-card">
        <div className="grid grid-cols-2 gap-x-[33px] text-[16px] leading-6">
          <div>
            <h2 className="text-[24px] leading-8 font-bold">What Is Keyword Overview?</h2>
            <p className="mt-[13px]">
              Keyword Overview is a keyword checker that instantly reveals the most important SEO and marketing metrics for any term. Just enter a word or phrase. The tool will dig
              deep into {brand.name}’s massive database to provide the keyword’s search volume, keyword difficulty, intent, competition level, CPC, 12-month trend, number of
              results, and more.
            </p>
            <p className="mt-3">Use these insights to decide which keywords are worth targeting and to plan content that has a realistic chance to rank.</p>
          </div>
          <div>
            <h2 className="text-[24px] leading-8 font-bold">Why Use a Keyword Checker?</h2>
            <p className="mt-[13px]">
              You should use a keyword checker to gain in-depth insights into each keyword’s difficulty, search volume, and competition, allowing you to make data-driven marketing
              decisions.
            </p>
            <p className="mt-3">
              By identifying which search terms are realistic to target, you can prioritize the most promising opportunities, drive more organic traffic, and ultimately get better
              results from your SEO and PPC campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

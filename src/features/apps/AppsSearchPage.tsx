"use client";

import { useState } from "react";
import { AppsShell } from "./AppsChrome";
import { AppCard } from "./AppsPage";
import { filters, searchResults, type Filter } from "./data";

const chips = ["All", ...filters.filter((f) => f !== "Store")] as const;

export function AppsSearchPage({ query }: { query: string }) {
  const [filter, setFilter] = useState<Filter | "All">("All");
  const results = filter === "All" ? searchResults : searchResults.filter((a) => a.tags.includes(filter));
  return (
    <AppsShell>
      <div className="bg-white px-8 pt-[41px] pb-[145px]">
        <h1 className="text-[36px] leading-[44px] font-bold tracking-[-0.01em] text-rk-text">
          Search results for “{query}”
        </h1>
        <div className="mt-[34px] flex flex-wrap gap-x-[13px] gap-y-3">
          {chips.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`h-8 rounded-full px-[15px] text-[14px] leading-5 ${f === filter ? "bg-[#a063fe] text-white" : "bg-[#f0f2f2] text-rk-text hover:bg-rk-hover"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="mt-[38px] flex items-end justify-between">
          <h2 className="text-[24px] leading-8 font-semibold tracking-[-0.01em] text-rk-text">Toolkits and apps</h2>
          <span className="text-[14px] leading-5 text-rk-muted">
            {results.length} {results.length === 1 ? "result" : "results"}
          </span>
        </div>
        {results.length ? (
          <div className="mt-[48px] grid grid-cols-3 gap-4">
            {results.map((app, i) => (
              <AppCard key={`${app.name}-${i}`} app={app} />
            ))}
          </div>
        ) : (
          <div className="mt-[48px] rounded-xl bg-rk-bg px-5 py-16 text-center text-[16px] leading-6 text-rk-muted">No toolkits or apps match this filter.</div>
        )}
      </div>
    </AppsShell>
  );
}

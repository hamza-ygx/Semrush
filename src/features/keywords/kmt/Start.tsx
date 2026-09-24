"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/config/routes";
import { SparkleIcon } from "../common";
import { ChevronDownSm, Drop } from "./ui";
import { kmtDatabases, recentSearches, startExamples } from "./data";
import { DbFlag } from "./flags";

const resultsHref = (q: string, db = "se") => `${routes.keywordMagic}?db=${db}&q=${encodeURIComponent(q)}&type=all&mode=1`;

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M2.5 4h11M6 4V2.5h4V4M4 4l.7 9.5h6.6L12 4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

function DbCodeSelect({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <Drop
      panelStyle={{ top: "calc(100% + 4px)", left: 0, width: 220 }}
      panelClassName="max-h-[260px] overflow-y-auto py-1"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex h-10 w-[90px] items-center gap-2 rounded-md border bg-white px-3 text-[16px] ${open ? "border-[#9ea6f5]" : "border-rk-border-strong/70 hover:border-rk-border-strong"}`}
        >
          <DbFlag code={value} />
          {value}
          <ChevronDownSm className="ml-auto text-rk-text" />
        </button>
      )}
    >
      {(close) =>
        kmtDatabases.map((d) => (
          <button
            key={d.code}
            type="button"
            onClick={() => {
              onChange(d.code);
              close();
            }}
            className={`flex h-8 w-full items-center gap-2 px-[9px] text-left text-[14px] ${d.code === value ? "bg-[#eef1f6]" : "hover:bg-rk-bg"}`}
          >
            <DbFlag code={d.code} />
            {d.name}
          </button>
        ))
      }
    </Drop>
  );
}

export function KmtStart() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [db, setDb] = useState("SE");
  const [history, setHistory] = useState(recentSearches);
  const go = () => q.trim() && router.push(resultsHref(q.trim(), db.toLowerCase()));
  return (
    <div className="flex flex-col items-center pt-6 pr-[10px] pb-10">
      <section className="w-[980px] rounded-lg bg-white pt-[40px] pb-10 text-center shadow-card">
        <div className="text-[16px] leading-6 text-rk-muted">Free Keyword Research Tool</div>
        <h1 className="mx-auto mt-[17px] w-[720px] text-[36px] leading-10 font-bold tracking-[-0.2px] text-rk-text">Find SEO Keyword Suggestions Instantly with the Keyword Magic Tool</h1>
        <p className="mx-auto mt-[15px] w-[560px] text-[16px] leading-6 text-rk-text-2">
          Discover millions of high-value keywords from popular terms
          <br />
          to long-tail phrases to improve your website’s marketing performance.
        </p>
        <p className="mx-auto mt-4 w-[560px] text-[16px] leading-6 text-rk-text-2">Enter a word or phrase to find related keywords. Add your website URL for personalized, AI-driven suggestions.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
          className="mx-auto mt-[19px] w-[511px] text-left"
        >
          <div className="flex h-5 items-center text-[14px] leading-5">
            <button type="button" className="text-rk-muted underline decoration-dotted underline-offset-[5px] hover:text-rk-text">
              Keyword tips
            </button>
            <span className="ml-auto text-rk-muted">Examples:</span>
            {startExamples.map((e) => (
              <Link key={e} href={resultsHref(e)} className="ml-3 text-rk-link hover:underline">
                {e}
              </Link>
            ))}
          </div>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter keyword"
            className="mt-[10px] h-10 w-full rounded-md border border-rk-border-strong px-3 text-[16px] outline-none placeholder:text-rk-faint focus:border-2 focus:border-[#8e97de] focus:px-[11px]"
          />
          <div className="mt-4 flex gap-3">
            <label className="flex h-10 w-[317px] items-center gap-2 rounded-md border border-[#d7c5fb] bg-white px-3">
              <SparkleIcon />
              <input placeholder="Enter domain for personalized data" className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-rk-faint" />
            </label>
            <DbCodeSelect value={db} onChange={setDb} />
            <button type="submit" className="ml-auto h-10 rounded-md bg-rk-btn-dark px-3 text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
              Search
            </button>
          </div>
        </form>
      </section>
      <section className="mt-4 w-[980px] rounded-lg bg-white px-28 pt-[38px] pb-8 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-[24px] leading-8 font-bold">Your recent searches</h2>
          <button
            type="button"
            disabled={!history.length}
            onClick={() => setHistory([])}
            className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong/70 bg-white px-[10px] text-[14px] text-rk-text-2 hover:bg-rk-hover disabled:text-rk-faint"
          >
            <TrashIcon />
            Delete history
          </button>
        </div>
        {history.length ? (
          history.map((g) => (
            <div key={g.day} className="mt-[38px]">
              <div className="border-b border-rk-border px-2 pb-2 text-[14px] leading-5 font-medium">{g.day}</div>
              {g.items.map((it) => (
                <div key={it.q} className="flex h-[37px] items-center gap-2 border-b border-rk-border px-2">
                  <DbFlag code={it.db} />
                  <Link href={resultsHref(it.q, it.db.toLowerCase())} className="text-[16px] text-rk-link hover:underline">
                    {it.q}
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${it.q}`}
                    onClick={() => setHistory((h) => h.map((x) => ({ ...x, items: x.items.filter((y) => y.q !== it.q) })).filter((x) => x.items.length))}
                    className="ml-auto text-rk-muted hover:text-rk-text"
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="mt-6 text-[14px] text-rk-muted">Your search history is empty.</p>
        )}
      </section>
    </div>
  );
}

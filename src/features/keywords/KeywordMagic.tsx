"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { LinkSelect } from "@/components/ui/Popover";
import { FeedbackIcon } from "@/components/ui/icons";
import { KwHeader, OnboardingTip, SegButtons, SparkleIcon } from "./common";
import { groupRows, kmStats, questionRows, topicRows } from "./data";
import { DatabaseSelect } from "./kmt/DatabaseSelect";
import { Filters, LangSelect } from "./kmt/Filters";
import { Sidebar } from "./kmt/Sidebar";
import { KmtTable } from "./kmt/Table";
import { useWide } from "./kmt/ui";

type Mode = "topics" | "groups";
type Type = "all" | "questions";

function Toolbar({ type, setType }: { type: Type; setType: (t: Type) => void }) {
  const [match, setMatch] = useState("all");
  return (
    <div className="px-8 pt-[15px]">
      <div className="flex items-center gap-2">
        <SegButtons
          items={[
            { value: "all", label: "All" },
            { value: "questions", label: "Questions" },
          ]}
          value={type}
          onChange={setType}
        />
        <SegButtons
          items={[
            { value: "all", label: "All Keywords" },
            { value: "broad", label: "Broad Match" },
            { value: "phrase", label: "Phrase Match" },
            { value: "exact", label: "Exact Match" },
            { value: "related", label: "Related" },
          ]}
          value={match}
          onChange={setMatch}
        />
        <LangSelect />
      </div>
      <label className="mt-[11px] flex h-7 w-[274px] items-center gap-2 rounded-md border border-[#d7c5fb] bg-white px-2">
        <SparkleIcon />
        <input placeholder="Enter domain for personalized data" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-rk-muted" />
      </label>
      <div className="mt-[13px]">
        <Filters />
      </div>
    </div>
  );
}

export function KeywordMagic({ q, initialMode, initialType }: { q: string; initialMode: Mode; initialType: Type }) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [type, setTypeState] = useState<Type>(initialType);
  const [tip, setTip] = useState(initialMode === "topics");

  const sync = (m: Mode, t: Type) => {
    const u = new URL(window.location.href);
    u.searchParams.set("mode", m === "topics" ? "0" : "1");
    if (t === "questions") u.searchParams.set("questions", "true");
    else u.searchParams.delete("questions");
    window.history.replaceState(null, "", u.toString());
  };
  const setMode = (m: Mode) => {
    setModeState(m);
    if (m === "groups") setTip(false);
    sync(m, type);
  };
  const setType = (t: Type) => {
    setTypeState(t);
    sync(mode, t);
  };

  const rows = type === "questions" ? questionRows : mode === "topics" ? topicRows : groupRows;
  const stats = type === "questions" ? kmStats.questions : mode === "topics" ? kmStats.topics : kmStats.groups;
  const relevance = mode === "topics" && type === "all";

  const wide = useWide();

  return (
    <>
      <KwHeader
        tool="Keyword Magic Tool"
        subject={q}
        right={
          <Link href="#" className="flex items-center gap-[5px] hover:text-rk-link-hover">
            <FeedbackIcon />
            Send feedback
          </Link>
        }
        titleRight={
          <Link
            href={`${routes.keywordMagic}/start?db=se&type=all&mode=1`}
            className="flex h-7 items-center rounded-md border border-[#cfd1d3] bg-[#eceeef] px-[9px] text-[14px] text-rk-muted hover:bg-rk-hover"
          >
            View search history
          </Link>
        }
        meta={
          <>
            <DatabaseSelect />
            <span className="flex items-center gap-1">
              Currency:
              <LinkSelect value="USD" options={["USD", "EUR", "SEK"] as const} />
            </span>
          </>
        }
      />
      <Toolbar type={type} setType={setType} />
      <div className="mx-8 mt-4 flex rounded-lg bg-white shadow-card">
        <Sidebar
          mode={mode}
          setMode={setMode}
          type={type}
          onTip={
            tip && (
              <>
                <span className="absolute top-[28px] left-[103px] z-40 h-[10px] w-[10px] rounded-full bg-[#c9adfb] ring-4 ring-[#c9adfb]/40" />
                <OnboardingTip
                  className="top-[48px] left-[100px] w-[360px] gap-[18px]"
                  title="Explore keyword topics"
                  onClose={() => setTip(false)}
                  actions={
                    <button type="button" onClick={() => setTip(false)} className="h-7 rounded-md bg-white px-[9px] text-[14px] text-rk-text hover:bg-[#f4f5f9]">
                      Got it
                    </button>
                  }
                >
                  Smart grouping by topic helps discover new ideas and speed up your research.
                </OnboardingTip>
              </>
            )
          }
        />
        <KmtTable key={`${mode}-${type}`} rows={rows} stats={stats} relevance={relevance} plus={mode === "topics" || type === "questions"} wide={wide} />
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { routes } from "@/config/routes";
import { FeedbackIcon } from "@/components/ui/icons";
import { KwHeader, OnboardingTip, SegButtons } from "./common";
import type { KwRow } from "./data";
import { CurrencySelect } from "./kmt/Currency";
import { DatabaseSelect } from "./kmt/DatabaseSelect";
import { Filters, LangSelect } from "./kmt/Filters";
import { QuickView } from "./kmt/QuickView";
import { Sidebar } from "./kmt/Sidebar";
import { KmtTable } from "./kmt/Table";
import { SparkleLg, Tip, useWide } from "./kmt/ui";
import type { Currency } from "./kmt/data";
import { kmtDataset } from "./kmt/dataset";

type Mode = "topics" | "groups";
type Type = "all" | "questions";

function Toolbar({ type, setType, currency }: { type: Type; setType: (t: Type) => void; currency: Currency }) {
  const [match, setMatch] = useState("all");
  return (
    <div className="px-8 pt-[15px]">
      <div className="flex items-center gap-2">
        <SegButtons
          items={[
            { value: "all", label: "All" },
            {
              value: "questions",
              label: "Questions",
              wrap: (b) => (
                <Tip tip="A list of question-based keywords that contain your seed keyword." gap={12} className="-ml-px" bleed portal>
                  {b}
                </Tip>
              ),
            },
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
        <SparkleLg />
        <input placeholder="Enter domain for personalized data" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-[#a1a3a2]" />
      </label>
      <div className="mt-[13px]">
        <Filters currency={currency} />
      </div>
    </div>
  );
}

export function KeywordMagic({ q, initialMode, initialType }: { q: string; initialMode: Mode; initialType: Type }) {
  const [mode, setModeState] = useState<Mode>(initialMode);
  const [type, setTypeState] = useState<Type>(initialType);
  const [tip, setTip] = useState(initialMode === "topics");
  const [loadingFrom, setLoadingFrom] = useState<KwRow[] | null>(null);
  const [group, setGroup] = useState<number | string>(0);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [quick, setQuick] = useState<KwRow | null>(null);
  const data = useMemo(() => kmtDataset(q), [q]);

  const rowsFor = (m: Mode, t: Type) =>
    t === "questions" ? (m === "topics" ? data.topicQuestionRows : data.questionRows) : m === "topics" ? data.topicRows : data.groupRows;

  useEffect(() => {
    if (!loadingFrom) return;
    const id = window.setTimeout(() => setLoadingFrom(null), 1400);
    return () => window.clearTimeout(id);
  }, [loadingFrom]);

  const sync = (m: Mode, t: Type) => {
    const u = new URL(window.location.href);
    u.searchParams.set("mode", m === "topics" ? "0" : "1");
    if (t === "questions") u.searchParams.set("questions", "true");
    else u.searchParams.delete("questions");
    window.history.replaceState(null, "", u.toString());
  };
  const setMode = (m: Mode) => {
    if (m === mode) return;
    if (m === "topics") setLoadingFrom(rowsFor(mode, type).map((r) => ({ ...r, relevance: undefined })));
    setModeState(m);
    if (m === "groups") setTip(false);
    setGroup(0);
    sync(m, type);
  };
  const setType = (t: Type) => {
    setTypeState(t);
    setGroup(0);
    sync(mode, t);
  };

  const rows = loadingFrom ?? rowsFor(mode, type);
  const stats =
    type === "questions" ? (mode === "topics" ? data.stats.topicQuestions : data.stats.questions) : mode === "topics" ? data.stats.topics : data.stats.groups;
  const relevance = mode === "topics";

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
            <CurrencySelect value={currency} onChange={setCurrency} />
          </>
        }
      />
      <Toolbar type={type} setType={setType} currency={currency} />
      <div className="mx-8 mt-4 flex rounded-lg bg-white shadow-card">
        <Sidebar
          data={data}
          mode={mode}
          setMode={setMode}
          type={type}
          sel={group}
          setSel={setGroup}
          onTip={
            tip && (
              <>
                <span className="absolute top-[28px] left-[103px] z-40 h-[10px] w-[10px] rounded-full bg-[#c9adfb] ring-4 ring-[#c9adfb]/40" />
                <OnboardingTip
                  className="top-[48px] left-[100px] w-[360px] gap-[18px]"
                  title="Explore keyword topics"
                  onClose={() => setTip(false)}
                  actions={
                    <button type="button" onClick={() => setTip(false)} className="h-7 rounded-md bg-white px-[9px] text-[14px] text-rk-text hover:bg-[#f5f6f6]">
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
        {[false, true]
          .filter((w) => wide === null || wide === w)
          .map((w) => (
            <div key={`${w ? "w" : "n"}-${mode}-${type}`} className={`min-w-0 flex-1 ${wide === null ? (w ? "hidden xl:block" : "xl:hidden") : ""}`}>
              <KmtTable
                rows={rows}
                stats={stats}
                relevance={relevance}
                plus={mode === "topics" || type === "questions"}
                wide={w}
                loading={!!loadingFrom}
                currency={currency}
                groupSelected={group !== 0}
                onQuick={setQuick}
              />
            </div>
          ))}
      </div>
      {quick && <QuickView row={quick} onClose={() => setQuick(null)} />}
    </>
  );
}

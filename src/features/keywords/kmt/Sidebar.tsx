"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight } from "@/components/ui/icons";
import { EyeIcon, SegButtons } from "../common";
import { Drop, Tip } from "./ui";
import { subGroups } from "./data";
import type { KmtDataset } from "./dataset";

type Mode = "topics" | "groups";
type Group = { label: string; count: string };

const pool = ["ab", "byrå", "ekonomi", "extern", "kurs", "pris", "online", "stockholm", "göteborg", "malmö", "firma", "tjänster"];

function childrenOf(kind: string, path: string[], count: string): Group[] {
  const known = subGroups[`${kind}:${path.join("/")}`];
  if (known) return known;
  const n = parseInt(count.replace(/[^\d]/g, ""), 10) || 0;
  if (n < 4) return [];
  const words = pool.filter((w) => !path.includes(w));
  const seed = [...path.join("")].reduce((a, c) => a + c.charCodeAt(0), 0);
  return [0, 1, 2].map((i) => ({ label: words[(seed + i * 3) % words.length], count: Math.max(1, Math.round(n / (2 + i * 1.5))).toLocaleString("en-US") }));
}

function SortSelect() {
  const [value, setValue] = useState<"keywords" | "volume">("keywords");
  return (
    <Drop
      className="ml-1"
      panelStyle={{ top: "calc(100% + 2px)", left: 0 }}
      panelClassName="py-1"
      trigger={({ toggle }) => (
        <button type="button" data-sort onClick={toggle} className="group flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
          <span className="group-hover:underline">{value}</span>
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) =>
        (["keywords", "volume"] as const).map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              setValue(o);
              close();
            }}
            className={`flex h-8 w-[83px] items-center px-2 text-left text-[14px] text-rk-text ${o === value ? "bg-[#eef1fb] shadow-[inset_2px_0_0_#191b23]" : "hover:bg-rk-bg"}`}
          >
            {o}
          </button>
        ))
      }
    </Drop>
  );
}

function GroupRow({
  group,
  path,
  depth,
  kind,
  sel,
  setSel,
}: {
  group: Group;
  path: string[];
  depth: number;
  kind: string;
  sel: string;
  setSel: (k: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const key = path.join("/");
  const kids = childrenOf(kind, path, group.count);
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setSel(key)}
        onKeyDown={(e) => e.key === "Enter" && setSel(key)}
        style={{ paddingLeft: 12 + depth * 6 }}
        className={`flex h-11 w-full cursor-pointer items-center gap-[6px] pr-1 text-left text-[14px] ${sel === key ? "bg-[#e8eaee]" : "hover:bg-[#f9f9f9]"}`}
      >
        <button
          type="button"
          aria-label={open ? "Collapse group" : "Expand group"}
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          className="mr-[2px] flex h-4 w-[14px] items-center justify-center text-rk-muted hover:text-rk-text"
        >
          <ChevronRight width={14} height={14} className={open ? "rotate-90" : ""} />
        </button>
        <span className="flex-1">{group.label}</span>
        <span>{group.count}</span>
        <EyeIcon className="text-rk-muted" />
      </div>
      {open && kids.map((k) => <GroupRow key={k.label} group={k} path={[...path, k.label]} depth={depth + 1} kind={kind} sel={sel} setSel={setSel} />)}
    </>
  );
}

export function Sidebar({
  data,
  mode,
  setMode,
  type,
  onTip,
  sel,
  setSel,
}: {
  data: KmtDataset;
  mode: Mode;
  setMode: (m: Mode) => void;
  type: "all" | "questions";
  onTip: ReactNode;
  sel: number | string;
  setSel: (s: number | string) => void;
}) {
  const groups = type === "questions" ? data.questionGroups : data.allGroups;
  const total = type === "questions" ? data.stats.questions.total : data.stats.groups.total;
  return (
    <div className="sticky top-0 z-30 flex h-screen w-[240px] shrink-0 flex-col self-start border-r border-rk-border bg-white">
      <div className="relative flex h-11 shrink-0 items-center px-3">
        <SegButtons
          items={[
            {
              value: "topics",
              label: (
                <span className="flex items-center gap-[6px]">
                  Topics
                  <span className="rounded-full bg-[#009f81] px-[5px] text-[11px] leading-[14px] font-semibold text-white">new</span>
                </span>
              ),
              wrap: (b) => (
                <Tip tip="Keywords with similar meaning, united under broader topics." gap={12} bleed portal>
                  {b}
                </Tip>
              ),
            },
            { value: "groups", label: "Groups" },
          ]}
          value={mode}
          onChange={(m) => {
            setMode(m);
            setSel(0);
          }}
        />
        {onTip}
      </div>
      {mode === "topics" ? (
        <div className="flex h-[42px] shrink-0 items-center justify-between border-y border-rk-border px-3 text-[13px] text-rk-muted">
          <span>Topic</span>
          <span>Keywords</span>
        </div>
      ) : (
        <div className="flex h-[42px] shrink-0 items-center border-y border-rk-border px-3 text-[14px] text-rk-muted">
          Sort by
          <SortSelect />
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-scroll [&::-webkit-scrollbar]:w-[7px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:[border-width:0_2px_0_0] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-[#d4d6da] [&::-webkit-scrollbar-thumb]:bg-clip-padding">
        {mode === "topics" ? (
          data.topics.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setSel(i)}
              className={`flex w-full items-start justify-between gap-[18px] pt-3 pb-3 pr-[3px] pl-3 text-left font-[Arial,sans-serif] text-[14px] leading-5 ${sel === i ? "bg-[#e8eaee]" : "hover:bg-rk-bg"}`}
            >
              <span className="min-w-0">{t.label}</span>
              <span className="shrink-0">{type === "questions" ? t.qCount : t.count}</span>
            </button>
          ))
        ) : (
          <>
            <button
              type="button"
              onClick={() => setSel(0)}
              className={`flex h-11 w-full items-center gap-[6px] pr-1 pl-3 text-left text-[14px] ${sel === 0 ? "bg-[#e8eaee]" : "hover:bg-[#f9f9f9]"}`}
            >
              <span className="flex-1">All keywords</span>
              <span>{total}</span>
            </button>
            {groups.map((gr) => (
              <GroupRow key={gr.label} group={gr} path={[gr.label]} depth={0} kind={type} sel={String(sel)} setSel={setSel} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { routes } from "@/config/routes";
import { ArrowLeft, ChevronsLeft } from "@/components/ui/icons";
import { issueById, ratioRows } from "./data";
import { EyeButton, FixPanel, SendTo } from "./IssuesList";
import { AddCondition, AdvancedFilterPanel, Checkbox, EyeIcon, ExtIcon, HelpCircleIcon, PageSize, SearchBox, SelectButton, SortAscIcon, useToggle } from "./ui";

const c = routes.siteAuditCampaign;

const sevTag = {
  error: { label: "Error", cls: "bg-[#ffe1e6] text-[#c7002c]" },
  warning: { label: "Warning", cls: "bg-[#ffe3d5] text-[#b8490b]" },
  notice: { label: "Notice", cls: "bg-[#e0e5ff] text-[#3d4bc4]" },
};

const StructureIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
    <path d="M5.5 2h5v4h-5zM1.5 10h5v4h-5zM9.5 10h5v4h-5zM8 6v2M4 10V8h8v2" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

function MiniSelect({ value, options, w }: { value: string; options: string[]; w: number }) {
  const { open, setOpen, ref, toggle } = useToggle();
  const [v, setV] = useState(value);
  return (
    <div ref={ref} className="relative" style={{ width: w }}>
      <SelectButton open={open} onClick={toggle} className="w-full">
        {v}
      </SelectButton>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-full rounded-md bg-white py-1 shadow-popover">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                setV(o);
                setOpen(false);
              }}
              className={`block w-full px-2 py-[6px] text-left text-[14px] hover:bg-rk-bg ${o === v ? "bg-[#e9f7ff]" : ""}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AdvancedFilters() {
  const { open, setOpen, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative">
      <SelectButton open={open} onClick={toggle} placeholder className="w-[149px]">
        Advanced filters
      </SelectButton>
      {open && (
        <AdvancedFilterPanel className="left-0 w-[600px]" onApply={() => setOpen(false)}>
          <div className="flex items-center gap-[14px]">
            <MiniSelect value="Include" options={["Include", "Exclude"]} w={119} />
            <MiniSelect value="Page URL" options={["Page URL", "Page Title", "Ratio"]} w={119} />
            <input className="h-7 w-[271px] rounded-md border border-rk-border-strong px-2 text-[14px] outline-none focus:border-[#8e92ec]" />
          </div>
          <div className="pt-[5px] pb-[6px]">
            <AddCondition />
          </div>
        </AdvancedFilterPanel>
      )}
    </div>
  );
}

function FixToggle({ id }: { id: number }) {
  const { open, ref, toggle } = useToggle();
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={toggle} className="flex items-center gap-[6px] text-[14px] text-rk-muted">
        <HelpCircleIcon className="text-rk-text-2" />
        <span className="underline decoration-[#a9abaa] decoration-dashed decoration-1 underline-offset-[5px] hover:text-rk-text">How to fix</span>
      </button>
      {open && <FixPanel issue={issueById(id)} className="top-[calc(100%+6px)] left-0" />}
    </div>
  );
}

export function IssueDetail({ id }: { id: number }) {
  const issue = issueById(id);
  const [tab, setTab] = useState<"issues" | "hidden">("issues");
  const [sel, setSel] = useState<Set<number>>(new Set());
  const ratio = issue.id === 112;
  const title = issue.title ?? `${issue.count} ${issue.unit} ${issue.text}`;
  const pages = Math.max(1, Math.ceil(issue.count / 10));
  const rows = tab === "issues" ? ratioRows.slice(0, Math.min(10, issue.count)) : [];
  const all = rows.length > 0 && sel.size === rows.length;
  const toggle = (i: number) => {
    const n = new Set(sel);
    if (n.has(i)) n.delete(i);
    else n.add(i);
    setSel(n);
  };

  return (
    <div className="px-8 pt-[14px]">
      <Link href={c.issues} className="inline-flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#e9eaee] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
        <ArrowLeft />
        All issues
      </Link>

      <div className="mt-[17px] rounded-lg bg-white shadow-card">
        <div className="flex h-[42px] items-center border-b border-rk-border pr-5 pl-5">
          <h2 className="text-[16px] leading-6 font-semibold">{title}</h2>
          <span className={`ml-[9px] rounded-full px-2 text-[12px] leading-5 ${sevTag[issue.severity].cls}`}>{sevTag[issue.severity].label}</span>
          <div className="ml-auto flex gap-[9px]">
            <SendTo />
            <Link href={`${c.siteStructure}?restrictions=${encodeURIComponent(btoa(JSON.stringify({ triggeredIssue: issue.id })))}`} className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
              <StructureIcon />
              Site Structure
            </Link>
            <button type="button" className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-[#f5f6f6] px-2 text-[14px] text-rk-text-2 hover:bg-rk-hover">
              <EyeIcon />
              Exclude check
            </button>
          </div>
        </div>

        <div className="flex h-[37px] items-start justify-between px-5 pt-[16px]">
          <FixToggle id={issue.id} />
          <div className="flex items-center text-[14px]">
            Failed:&nbsp;<span className="text-rk-danger">{issue.count}</span>
            <span className="ml-[10px]">Successful:&nbsp;</span>
            <span className="text-[#007c65]">2</span>
            <div className="ml-[13px] flex h-[6px] w-[100px] gap-px overflow-hidden rounded-full">
              <div className="h-full rounded-l-full bg-[#ff6b70]" style={{ width: `${(issue.count / (issue.count + 2)) * 100}%` }} />
              <div className="h-full flex-1 rounded-r-full bg-[#00c78f]" />
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-20 rounded-t-lg bg-white">
          <div className="flex items-center px-5 pt-[17px] pb-4">
            <div className="flex">
              {(["issues", "hidden"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={`relative -ml-px flex h-7 items-center gap-2 border px-2 text-[14px] first:ml-0 first:rounded-l-md last:rounded-r-md ${
                    tab === k ? "z-10 border-[#a3aae9] bg-[#e5e8f5]" : "border-rk-border-strong bg-white hover:bg-rk-bg"
                  }`}
                >
                  {k === "issues" ? "Issues" : "Hidden"}
                  <span className="text-rk-muted">{k === "issues" ? issue.count : 0}</span>
                </button>
              ))}
            </div>
            <SearchBox width={231} className="ml-[9px]" />
            <div className="ml-[9px]">
              <AdvancedFilters />
            </div>
          </div>
          <div className="flex h-[42px] border-y border-rk-border text-[13px] text-rk-text-2">
            <div className="flex w-12 shrink-0 items-center justify-end pr-[4px]">
              <Checkbox checked={all} onChange={() => setSel(all ? new Set() : new Set(rows.map((_, i) => i)))} />
            </div>
            <div className="flex flex-1 items-center gap-1 bg-[#e9eaee] pl-3">
              Page URL
              <SortAscIcon />
            </div>
            <div className="flex w-[312px] shrink-0 items-center bg-[#f7f7f8]">
              {ratio && <span className="ml-[15px] w-[53px]">Ratio</span>}
              <span className={ratio ? "" : "ml-[15px]"}>Discovered</span>
            </div>
          </div>
        </div>

        {rows.map((r, i) => (
          <div key={r.url} className="flex h-[65px] border-b border-rk-border text-[14px] leading-5">
            <div className="flex w-12 shrink-0 justify-end pt-[15px] pr-[4px]">
              <Checkbox checked={sel.has(i)} onChange={() => toggle(i)} />
            </div>
            <div className="min-w-0 flex-1 pt-[12px] pl-3">
              <div className="truncate text-rk-text">{r.title}</div>
              <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-[6px] text-rk-link hover:text-rk-link-hover">
                {r.url}
                <ExtIcon className="text-[#8b8d8c]" />
              </a>
            </div>
            <div className="flex w-[312px] shrink-0 items-start pt-[12px]">
              {ratio && <span className="w-[56px] pr-[12px] text-right">{r.ratio}</span>}
              <span className="ml-[12px] whitespace-nowrap">Jul 22, 2026, 4:11</span>
              <span className="ml-[4px] rounded-full bg-[#ffd7df] px-2 text-[13px] leading-5 text-[#d1002f]">New</span>
              <span className="mt-[-2px] mr-5 ml-auto">
                <EyeButton />
              </span>
            </div>
          </div>
        ))}
        {!rows.length && <div className="border-b border-rk-border py-10 text-center text-[14px] text-rk-muted">{tab === "hidden" ? "No hidden issues" : "No issues found"}</div>}

        <div className="flex h-[64px] items-center px-5 pb-[2px] text-[14px]">
          <button type="button" aria-label="First page" disabled className="flex h-7 w-7 items-center justify-center rounded-md border border-rk-border text-[#d6d8d7]">
            <ChevronsLeft />
          </button>
          <button type="button" disabled className="ml-2 h-7 rounded-md border border-rk-border px-2 text-[#d6d8d7]">
            Prev
          </button>
          <button type="button" className="ml-2 h-7 rounded-md bg-rk-btn-dark px-2 font-semibold text-white hover:bg-[#2b2e38]">
            Next
          </button>
          <span className="ml-4">Page:</span>
          <input defaultValue="1" className="ml-[6px] h-7 w-[68px] rounded-md border border-rk-border-strong px-2 outline-none" />
          <span className="ml-[9px]">of</span>
          <span className="ml-[5px] text-rk-link">{pages}</span>
          <div className="ml-4">
            <PageSize value={10} />
          </div>
        </div>
      </div>
      <div className="h-[152px]" />
    </div>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { useOutsideClose } from "@/components/ui/Popover";
import { ChevronDown, ChevronRight, CloseIcon, PlusIcon, SearchIcon } from "@/components/ui/icons";
import { SerpIcon } from "./serpIcons";
import { Checkbox } from "./ui";

const InfoI = ({ className = "" }: { className?: string }) => (
  <span className={`font-serif text-[16px] leading-none text-[#a9abaa] italic ${className}`}>i</span>
);

function FilterPopover({
  label,
  value,
  width,
  fit = false,
  compact = false,
  defaultOpen = false,
  children,
}: {
  label: string;
  value?: string | null;
  width: number;
  fit?: boolean;
  compact?: boolean;
  defaultOpen?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [shift, setShift] = useState(0);
  const close = () => setOpen(false);
  const ref = useOutsideClose<HTMLDivElement>(open, close);
  const toggle = () => {
    if (!open && fit && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setShift(Math.min(0, document.documentElement.clientWidth - 1 - (r.left + width)));
    }
    setOpen((o) => !o);
  };
  return (
    <div ref={ref} className="relative inline-flex">
      <button
        type="button"
        data-filter={label}
        onClick={toggle}
        className={`flex h-7 items-center rounded-md border text-[14px] whitespace-nowrap ${compact ? "gap-[6px] px-[9px]" : "gap-[6.5px] pr-[6px] pl-[11px]"} ${value ? "text-rk-text" : "text-[#a1a3a2]"} ${
          open ? "border-[#9aa2ea] bg-[#fbfcff]" : `${compact ? "border-[#d4d6d5]" : "border-rk-border-strong"} bg-white hover:bg-rk-bg`
        }`}
      >
        {value ? `${label}: ${value}` : label}
        <ChevronDown width={compact ? 14 : 16} height={compact ? 14 : 16} className="text-rk-text" />
      </button>
      {open && (
        <div style={{ width, left: shift }} className="absolute top-[calc(100%+5px)] z-50 rounded-md bg-white shadow-popover">
          {children(close)}
        </div>
      )}
    </div>
  );
}

function ApplyButton({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`h-7 rounded-md bg-rk-btn-dark px-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38] ${className}`}>
      Apply
    </button>
  );
}

function CustomRange({ onApply, compact }: { onApply: (v: string) => void; compact?: boolean }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const input = "h-7 w-1/2 min-w-0 border border-rk-border-strong px-2 text-[14px] outline-none placeholder:text-[#a9abaa] focus:relative focus:border-[#7a86f2]";
  return (
    <div className={`border-t border-rk-border px-[9px] ${compact ? "pt-[6px] pb-3" : "pt-[10px] pb-[11px]"}`}>
      <div className="text-[14px] leading-5 font-semibold">Custom range</div>
      <div className={`${compact ? "mt-[11px]" : "mt-[10px]"} flex`}>
        <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="From" className={`${input} rounded-l-md`} />
        <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" className={`${input} -ml-px rounded-r-md`} />
      </div>
      <ApplyButton onClick={() => onApply(from || to ? `${from || 0}-${to || "∞"}` : "")} className={`${compact ? "mt-[7px]" : "mt-2"} w-full`} />
    </div>
  );
}

export function RangeFilter({
  label,
  groups,
  value,
  onChange,
  right,
  compact = false,
  width = 240,
  defaultOpen,
}: {
  label: string;
  groups: string[][];
  value: string | null;
  onChange: (v: string | null) => void;
  right?: Record<string, string>;
  compact?: boolean;
  width?: number;
  defaultOpen?: boolean;
}) {
  return (
    <FilterPopover label={label} value={value} width={width} defaultOpen={defaultOpen}>
      {(close) => (
        <>
          <div className={`pt-1 ${compact ? "" : "pb-[9px]"}`}>
            {groups.map((g, gi) => (
              <div key={gi} className={gi ? "border-t border-rk-border" : ""}>
                {g.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => {
                      onChange(o === value ? null : o);
                      close();
                    }}
                    className={`flex h-8 w-full items-center px-[9px] text-left text-[14px] leading-5 hover:bg-rk-bg ${o === value ? "bg-[#e9f7ff]" : ""}`}
                  >
                    {o}
                    {right && (
                      <>
                        <InfoI className="ml-[9px]" />
                        <span className="ml-auto text-rk-muted">{right[o]}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <CustomRange
            compact={compact}
            onApply={(v) => {
              onChange(v || null);
              close();
            }}
          />
        </>
      )}
    </FilterPopover>
  );
}

export function CheckFilter({
  label,
  options,
  value,
  onChange,
  width = 200,
  icons,
  info = false,
  compact = false,
  defaultOpen,
  applyPad,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  width?: number;
  icons?: Record<string, ReactNode>;
  info?: boolean;
  compact?: boolean;
  defaultOpen?: boolean;
  applyPad?: string;
}) {
  const [picked, setPicked] = useState<string[]>(value);
  return (
    <FilterPopover label={label} compact={compact} value={value.length ? (value.length > 1 ? `${value.length} selected` : value[0]) : null} width={width} defaultOpen={defaultOpen}>
      {(close) => (
        <>
          <div className="pt-1">
            {options.map((o) => {
              const on = picked.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setPicked(on ? picked.filter((x) => x !== o) : [...picked, o])}
                  className="flex h-8 w-full items-center gap-2 px-2 text-left text-[14px] leading-5 hover:bg-rk-bg"
                >
                  <Checkbox checked={on} />
                  {icons?.[o]}
                  {o}
                  {info && <InfoI className="ml-[5px]" />}
                </button>
              );
            })}
          </div>
          <div className={`px-2 ${applyPad ?? `pt-[13px] ${compact ? "pb-[13px]" : "pb-2"}`}`}>
            <ApplyButton
              className="w-full"
              onClick={() => {
                onChange(picked);
                close();
              }}
            />
          </div>
        </>
      )}
    </FilterPopover>
  );
}

const serpFeatureList: { name: string; icon: string; count: number }[] = [
  { name: "Featured snippet", icon: "crown", count: 0 },
  { name: "Sitelinks", icon: "link", count: 33 },
  { name: "AI Overview", icon: "spark", count: 115 },
  { name: "FAQ", icon: "question", count: 0 },
  { name: "Reviews", icon: "star", count: 42 },
  { name: "Indented", icon: "indent", count: 0 },
  { name: "Image", icon: "image", count: 0 },
  { name: "Image pack", icon: "imagePack", count: 18 },
  { name: "Local pack", icon: "pin", count: 61 },
  { name: "People also ask", icon: "paa", count: 97 },
  { name: "Related searches", icon: "related", count: 102 },
  { name: "Top stories", icon: "stories", count: 0 },
  { name: "Video", icon: "play", count: 12 },
  { name: "Video carousel", icon: "carousel", count: 4 },
];

const serpGroups = ["SERP Features on SERP", "Not on SERP", "Domain ranks", "Domain doesn't rank"];

export function SerpFeaturesFilter({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const [sub, setSub] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const list = serpFeatureList.filter((f) => f.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <FilterPopover label="SERP Features" value={value} width={212}>
      {(close) => (
        <div className="py-1" onMouseLeave={() => setSub(null)}>
          {serpGroups.map((g) => (
            <div key={g} className="relative" onMouseEnter={() => setSub(g)}>
              <button type="button" onClick={() => setSub(g)} className={`flex h-8 w-full items-center pr-[7px] pl-2 text-left text-[14px] leading-5 ${sub === g ? "bg-[#f5f6f6]" : ""}`}>
                {g}
                <InfoI className="ml-[9px]" />
                <ChevronRight className="ml-auto text-rk-text-2" />
              </button>
              {sub === g && (
                <div className="absolute top-[5px] left-[calc(100%-4px)] z-10 w-[240px] rounded-md bg-white shadow-popover">
                  <div className="relative">
                    <SearchIcon className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#8a8d99]" />
                    <input
                      autoFocus
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search"
                      className="h-[35px] w-full rounded-md border-2 border-[#8f9cea] pr-2 pl-8 text-[14px] outline-none placeholder:text-rk-muted"
                    />
                  </div>
                  <div className="mt-[2px] max-h-[196px] overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d8d7]">
                    {list.map((f) => (
                      <button
                        key={f.name}
                        type="button"
                        disabled={!f.count}
                        onClick={() => {
                          onChange(f.name);
                          close();
                        }}
                        className={`flex h-8 w-full items-center gap-2 pr-[4px] pl-[9px] text-left text-[14px] leading-5 ${f.count ? "text-rk-text hover:bg-rk-bg" : "text-[#d6d8d7]"}`}
                      >
                        <span className={`-mx-[2px] ${f.count ? "text-[#a1a3a2]" : "text-[#d4d6d5]"}`}>
                          <SerpIcon name={f.icon} size={20} />
                        </span>
                        {f.name}
                        <span className={`ml-auto ${f.count ? "text-rk-text-2" : ""}`}>{f.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </FilterPopover>
  );
}

function SelectBox({ value, options, onChange, width = "w-[160px]", testId }: { value: string; options: string[]; onChange: (v: string) => void; width?: string; testId?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className={`relative shrink-0 ${width}`}>
      <button
        type="button"
        data-testid={testId}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-7 w-full items-center justify-between rounded-md border bg-white pr-[6px] pl-[8px] text-[14px] text-rk-text ${open ? "border-[#9aa2ea]" : "border-rk-border-strong hover:bg-rk-bg"}`}
      >
        {value}
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-10 max-h-[246px] w-full overflow-y-auto rounded-md bg-white py-1 shadow-popover [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d6d8d7]">
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`block h-8 w-full border-l-2 pr-2 pl-[6px] text-left text-[14px] leading-5 whitespace-nowrap ${o === value ? "border-rk-text bg-[#ebf1ff]" : "border-transparent hover:bg-rk-bg"}`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type Cond = { mode: string; field: string; op: string; text: string };

export function AdvancedFilters({
  fields,
  onApply,
  clearAll = true,
  compact = false,
  defaultOpen,
}: {
  fields: string[];
  onApply?: (c: Cond[]) => void;
  clearAll?: boolean;
  compact?: boolean;
  defaultOpen?: boolean;
}) {
  const blank = (): Cond => ({ mode: "Include", field: fields[0], op: "Containing", text: "" });
  const [conds, setConds] = useState<Cond[]>([blank()]);
  const [applied, setApplied] = useState(0);
  const set = (i: number, c: Partial<Cond>) => setConds(conds.map((x, j) => (j === i ? { ...x, ...c } : x)));
  return (
    <FilterPopover label="Advanced filters" value={applied ? `${applied}` : null} width={716} fit compact={compact} defaultOpen={defaultOpen}>
      {(close) => (
        <>
          <div className={`px-4 ${compact ? "pt-[15px]" : "pt-5"} pb-[17px]`}>
            {conds.map((c, i) => (
              <div key={i} className="mb-3 flex gap-4">
                <SelectBox value={c.mode} options={["Include", "Exclude"]} onChange={(v) => set(i, { mode: v })} />
                <SelectBox testId="adv-field" value={c.field} options={fields} onChange={(v) => set(i, { field: v })} />
                <SelectBox value={c.op} options={["Containing", "Not containing", "Begins with", "Ends with", "Exact match"]} onChange={(v) => set(i, { op: v })} />
                <input
                  value={c.text}
                  onChange={(e) => set(i, { text: e.target.value })}
                  className="h-7 w-[160px] shrink-0 rounded-md border border-rk-border-strong px-2 text-[14px] outline-none focus:border-[#7a86f2]"
                />
              </div>
            ))}
            <button type="button" onClick={() => setConds([...conds, blank()])} className="mt-[15px] flex h-7 items-center gap-[9px] pl-[10px] text-[14px] text-rk-link hover:text-rk-link-hover">
              <PlusIcon />
              Add condition
            </button>
          </div>
          <div className={`flex ${compact ? "h-[61px]" : "h-[60px]"} items-center justify-between border-t border-rk-border px-4`}>
            <ApplyButton
              onClick={() => {
                const n = conds.filter((c) => c.text).length;
                setApplied(n);
                onApply?.(conds.filter((c) => c.text));
                close();
              }}
            />
            {clearAll && (
              <button
                type="button"
                onClick={() => {
                  setConds([blank()]);
                  setApplied(0);
                  onApply?.([]);
                }}
                className="mr-[9px] flex items-center gap-[10px] text-[14px] text-rk-muted hover:text-rk-text"
              >
                <CloseIcon width={14} height={14} />
                Clear all
              </button>
            )}
          </div>
        </>
      )}
    </FilterPopover>
  );
}

export function ExportPopover({
  total,
  selected,
  first,
  trigger,
}: {
  total: number;
  selected?: number;
  first?: number;
  trigger: (open: boolean, toggle: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<"all" | "selected" | "first">("all");
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  const opts: { key: "all" | "selected" | "first"; label: string; count?: number; disabled?: boolean }[] = [
    { key: "all", label: "All", count: total },
    ...(selected != null ? [{ key: "selected" as const, label: "Selected", count: selected, disabled: !selected }] : []),
    { key: "first", label: "First", count: first, disabled: first == null },
  ];
  return (
    <div ref={ref} className="relative inline-flex">
      {trigger(open, () => setOpen((o) => !o))}
      {open && (
        <div className="absolute top-[calc(100%+5px)] right-0 z-50 w-[284px] rounded-md bg-white shadow-popover">
          <div className="px-4 pt-4 pb-4">
            <div className="text-[16px] leading-6 font-semibold">Export data</div>
            <div className="mt-4 flex flex-col gap-2">
              {opts.map((o) => (
                <button
                  key={o.key}
                  type="button"
                  disabled={o.disabled}
                  onClick={() => setPick(o.key)}
                  className={`flex h-5 items-center gap-2 text-[14px] leading-5 ${o.disabled ? "text-[#d6d8d7]" : "text-rk-text"}`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${pick === o.key ? "border-rk-text bg-rk-text" : o.disabled ? "border-[#ebecf0]" : "border-rk-border-strong"}`}
                  >
                    {pick === o.key && <span className="h-[6px] w-[6px] rounded-full bg-white" />}
                  </span>
                  {o.label}
                  {o.count != null && <span className={o.disabled ? "" : "text-rk-muted"}>({o.count})</span>}
                </button>
              ))}
            </div>
            <div className="mt-[12px] flex gap-[6px]">
              {["Excel", "CSV", "CSV Semicolon"].map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`h-7 rounded-md border px-[8px] text-[14px] ${i === 0 ? "border-rk-btn-dark bg-rk-btn-dark font-semibold text-white" : "border-[#d4d6d5] bg-[#f5f6f6] text-rk-text-2 hover:bg-rk-hover"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-rk-border px-4 pt-[14px] pb-[15px] text-[14px] leading-[16.5px]">
            For a full export, please
            <br />
            <button type="button" onClick={() => setOpen(false)} className="text-rk-link hover:text-rk-link-hover">
              order a custom report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

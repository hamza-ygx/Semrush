"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { Drop } from "./ui";
import { kmtDatabases } from "./data";
import { DbFlag } from "./flags";

function DbList({ value, onPick }: { value: string; onPick: (name: string) => void }) {
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const items = kmtDatabases.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()));
  useLayoutEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>("[data-current]");
    if (list && item) list.scrollTop = item.offsetTop + item.offsetHeight - list.clientHeight + 5;
  }, []);
  return (
    <>
      <label className="flex h-[36px] items-center gap-2 rounded-md border-2 border-[#8e97de] bg-white px-[9px]">
        <SearchIcon className="text-rk-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="min-w-0 flex-1 text-[14px] outline-none placeholder:text-rk-faint"
        />
      </label>
      <div ref={listRef} className="relative max-h-[234px] overflow-y-auto pt-[5px]" style={{ scrollbarWidth: "thin", scrollbarColor: "#c4c7cf transparent" }}>
        {items.map((d) => (
          <button
            key={d.code}
            type="button"
            data-current={d.name === value ? "" : undefined}
            onClick={() => onPick(d.name)}
            className={`flex h-8 w-full items-center gap-2 px-[9px] text-left text-[14px] ${d.name === value ? "bg-[#eef1f6] shadow-[inset_2px_0_0_#191b23]" : "hover:bg-rk-bg"}`}
          >
            <DbFlag code={d.code} />
            {d.name}
          </button>
        ))}
        {!items.length && <div className="px-[9px] py-[6px] text-[14px] text-rk-muted">Nothing found</div>}
      </div>
    </>
  );
}

export function DatabaseSelect({ initial = "Sweden" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const code = kmtDatabases.find((d) => d.name === value)?.code ?? "SE";
  return (
    <span className="flex items-center gap-1">
      Database:
      <Drop
        panelStyle={{ top: "calc(100% + 3px)", left: -2, width: 242 }}
        trigger={({ toggle }) => (
          <button type="button" onClick={toggle} className="group flex items-center gap-1 text-[14px] text-rk-link hover:text-rk-link-hover">
            <DbFlag code={code} />
            <span className="group-hover:underline">{value}</span>
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      >
        {(close) => (
          <DbList
            value={value}
            onPick={(n) => {
              setValue(n);
              close();
            }}
          />
        )}
      </Drop>
    </span>
  );
}

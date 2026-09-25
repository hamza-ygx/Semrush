"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { CirclePlus, PinIcon } from "../common";
import { ChevronDownSm, Drop } from "./ui";
import { koLocations } from "./data";

export function AddToList({ className = "", gap = 8, wideInput = false }: { className?: string; gap?: number; wideInput?: boolean }) {
  const [name, setName] = useState("");
  return (
    <Drop
      className={className}
      panelStyle={{ top: `calc(100% + ${gap}px)`, left: wideInput ? 1 : 0, width: wideInput ? 379 : 378 }}
      trigger={({ toggle, open }) => (
        <button type="button" aria-label="Add to keyword list" onClick={toggle} className={`flex hover:text-rk-text-2 ${open ? "text-rk-text-2" : "text-rk-faint"}`}>
          <CirclePlus />
        </button>
      )}
    >
      {(close) => (
        <div className="text-[14px] leading-5 font-normal text-rk-text">
          <div className="flex h-[33px] items-center justify-between border-b border-rk-border px-2">
            <span className="font-semibold">Create a first list</span>
            <a href="#" className="text-rk-muted underline decoration-dotted underline-offset-4 hover:text-rk-text">
              Help
            </a>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) close();
            }}
            className={`flex items-center px-2 pt-2 pb-[9px] ${wideInput ? "gap-[13px]" : "gap-[14px]"}`}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a list name"
              className={`h-7 rounded-md ${wideInput ? "w-[314px]" : "w-[305px]"} border border-rk-border-strong px-2 text-[14px] outline-none placeholder:text-rk-faint focus:border-[#7a86f2]`}
            />
            <button type="submit" aria-label="Create list" className="text-[#009f81] hover:text-[#007c65]">
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" aria-label="Cancel" onClick={close} className={`text-rk-faint ${wideInput ? "-ml-[3px]" : "ml-[4px]"} hover:text-rk-text-2`}>
              <svg viewBox="0 0 16 16" width={16} height={16}>
                <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </Drop>
  );
}

export function LocationSelect() {
  const [value, setValue] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const items = koLocations.filter((l) => l.name.toLowerCase().includes(query.trim().toLowerCase()));
  return (
    <Drop
      panelStyle={{ top: "calc(100% + 4px)", left: -1, width: 383 }}
      panelClassName="overflow-hidden"
      onOpen={() => setQuery("")}
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          className={`flex h-7 items-center gap-2 rounded-md border bg-white px-2 text-[14px] ${value ? "text-rk-text" : "text-rk-muted"} ${open ? "border-[#9ea6f5]" : "border-rk-border-strong"}`}
        >
          <PinIcon className="text-rk-text" />
          <span className="max-w-[220px] truncate">{value ?? "Select location"}</span>
          <ChevronDownSm className="ml-[6px] text-rk-text" size={14} />
        </button>
      )}
    >
      {(close) => (
        <>
          <label className="flex h-[35px] items-center gap-2 rounded-md border-2 border-[#8e97de] bg-white px-2">
            <SearchIcon className="text-rk-muted" />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="min-w-0 flex-1 text-[14px] outline-none placeholder:text-rk-faint" />
          </label>
          <button
            type="button"
            disabled={!value}
            onClick={() => {
              setValue(null);
              close();
            }}
            className="mb-1 block h-[30px] px-[9px] text-[14px] text-rk-link disabled:text-[#a9c0f0]"
          >
            Reset location
          </button>
          <div className="max-h-[233px] overflow-y-auto border-t border-rk-border pt-[8px]" style={{ scrollbarWidth: "thin", scrollbarColor: "#c4c7cf transparent" }}>
            {items.map((l) => (
              <button
                key={l.name}
                type="button"
                onClick={() => {
                  setValue(l.name);
                  close();
                }}
                className={`flex h-8 w-full items-center justify-between gap-2 px-[9px] text-left text-[14px] ${l.name === value ? "bg-[#eef1f6]" : "hover:bg-rk-bg"}`}
              >
                <span className="whitespace-nowrap text-rk-text">{l.name}</span>
                <span className="shrink-0 text-rk-muted">{l.type}</span>
              </button>
            ))}
            {!items.length && <div className="px-[9px] py-[6px] text-[14px] text-rk-muted">Nothing found</div>}
          </div>
          <div className="mt-2 bg-[#eef2fd] px-[9px] pt-[13px] pb-[12px] text-[14px] leading-5 text-rk-text-2">
            Viewing each new location will be counted as one keyword metric update.{" "}
            <a href="#" className="text-rk-link hover:underline">
              Learn more
            </a>
          </div>
        </>
      )}
    </Drop>
  );
}

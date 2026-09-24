"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RkjhFavicon } from "@/components/icons";
import { GoToTool } from "@/components/shell/HeaderSearch";
import { Popover, MenuItem } from "@/components/ui/Popover";
import { ChevronDown, PlusIcon } from "@/components/ui/icons";
import { routes } from "@/config/routes";

export function ProjectGoTo() {
  const [project, setProject] = useState("www.rkjh.se");
  return (
    <div className="absolute -top-[45px] left-[82px] z-30 flex items-center gap-[17px]">
      <Popover
        panelClassName="w-[220px]"
        trigger={({ toggle, open }) => (
          <button
            type="button"
            aria-label="Select project"
            onClick={toggle}
            className={`flex h-[38px] w-[162px] items-center rounded-md border bg-white pr-[10px] pl-3 text-[16px] text-rk-text ${open ? "border-[#7a86f2]" : "border-[#e0e1e9]"}`}
          >
            <RkjhFavicon width={16} height={16} />
            <span className="ml-2 flex-1 text-left">{project}</span>
            <ChevronDown width={16} height={16} strokeWidth={2} />
          </button>
        )}
      >
        {(close) => (
          <>
            {["www.rkjh.se", "rkjh.se"].map((p) => (
              <MenuItem
                key={p}
                active={p === project}
                onClick={() => {
                  setProject(p);
                  close();
                }}
              >
                {p}
              </MenuItem>
            ))}
            <div className="my-1 border-t border-rk-border" />
            <MenuItem onClick={close}>
              <PlusIcon />
              Create project
            </MenuItem>
          </>
        )}
      </Popover>
      <div className="[&_button[type=submit]]:h-[38px]! [&_button[type=submit]]:w-[40px]! [&_input]:h-[38px]! [&_input]:w-[316px]! [&_input]:text-[16px]!">
        <GoToTool />
      </div>
    </div>
  );
}

export function KeywordAnalyze() {
  const [q, setQ] = useState("");
  const router = useRouter();
  return (
    <form
      className="absolute -top-[46px] left-[82px] z-30 flex"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`${routes.domainOverview}?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Enter website or keyword"
        aria-label="Enter website or keyword"
        className="h-10 w-[342px] rounded-l-md border border-r-0 border-[#e0e1e9] bg-white px-3 text-[16px] text-rk-text outline-none placeholder:text-[#6c6e79] focus:border-[#7a86f2]"
      />
      <button type="submit" className="h-10 w-[87px] rounded-r-md bg-rk-btn-dark text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
        Analyze
      </button>
    </form>
  );
}

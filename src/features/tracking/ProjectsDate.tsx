"use client";

import { Popover } from "@/components/ui/Popover";
import { CalendarIcon } from "./icons";
import { project } from "./data";

const options = ["Last 2 days", "Last 7 days", "Last 30 days", "Last 60 days", "Last 90 days"];

export function ProjectsDate() {
  return (
    <Popover
      offset={5}
      className="ml-[22.5px]"
      panelClassName="w-[158px] !py-[4px]"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          onClick={toggle}
          data-testid="pt-projects-date"
          className={`flex h-7 items-center gap-[8.5px] rounded-md border bg-white px-[8px] text-[14px] whitespace-nowrap text-[#6c6e79] ${open ? "border-[#8e9ff0]" : "border-rk-border-strong"}`}
        >
          <CalendarIcon className="text-[#8a8e9b]" />
          {project.periodLong}
        </button>
      )}
    >
      {(close) =>
        options.map((o) => (
          <button key={o} type="button" onClick={close} className="flex h-8 w-full items-center px-2 text-left text-[14px] text-rk-text-2 hover:bg-rk-bg">
            {o}
          </button>
        ))
      }
    </Popover>
  );
}

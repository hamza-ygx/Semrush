"use client";

import type { ReactNode } from "react";
import { RkjhFavicon } from "@/components/icons";
import { ExternalIcon, GearIcon, GoogleIcon, PlusIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/shell/PageHeader";
import { project } from "./data";
import { Chevron, I, MenuPanel, useMenu } from "./ui";

export type ModalKind = "competitors" | "tags" | "rename" | "share" | "create" | null;

const ico = (d: string) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0 text-[#8b8d8c]">
    <path d={d} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const settings: { key: Exclude<ModalKind, null> | "google" | "delete"; label: string; icon: ReactNode }[] = [
  { key: "google", label: "Set up Google account", icon: <GoogleIcon /> },
  { key: "competitors", label: "Manage competitors", icon: ico("M2 14h12M4 11.5V7M8 11.5V3M12 11.5V5.5") },
  { key: "tags", label: "Manage Tags", icon: ico("M8.5 2H14v5.5l-6.5 6.5L2 8.5zM11 5h.01") },
  { key: "rename", label: "Rename project", icon: ico("M10.5 2.5l3 3-8 8H2.5v-3zM9 4l3 3") },
];

function ProjectDropdown({ name, onCreate }: { name: string; onCreate: () => void }) {
  const { open: mOpen, ref: mRef, toggle: mToggle, close: mClose } = useMenu();
  return (
    <span ref={mRef} className="relative inline-flex items-center">
      <button type="button" data-dd="project" onClick={mToggle} className="flex items-center gap-[3px] text-rk-link hover:text-rk-link-hover">
        <span className={mOpen ? "underline decoration-2 underline-offset-[5px]" : ""}>{name}</span>
        <Chevron />
      </button>
      {mOpen && (
        <MenuPanel className="top-[calc(100%+4px)] left-0 w-[280px] text-[14px] leading-5 font-normal">
          <button type="button" onClick={mClose} className="relative mt-[6px] flex w-full items-start gap-2 bg-[#ebf0ff] px-2 pt-[5px] pb-[6px] text-left leading-[19px]">
            <span className="absolute top-0 bottom-0 left-0 w-[2px] bg-rk-text" />
            <RkjhFavicon className="mt-[2px] ml-[-1px]" />
            <span>
              <span className="block text-rk-text">{name}</span>
              <span className="block pl-[5px] text-rk-muted">{project.domain}</span>
            </span>
          </button>
          <div className="mt-[8px] mb-[5px] border-t border-rk-border" />
          <button
            type="button"
            onClick={() => {
              mClose();
              onCreate();
            }}
            className="flex w-full items-center justify-between px-2 py-[3px] pb-[6px] text-rk-link hover:text-rk-link-hover"
          >
            Create new SEO project
            <PlusIcon width={14} height={14} />
          </button>
        </MenuPanel>
      )}
    </span>
  );
}

function SettingsMenu({ onOpen }: { onOpen: (k: Exclude<ModalKind, null>) => void }) {
  const { open: mOpen, ref: mRef, toggle: mToggle, close: mClose } = useMenu();
  return (
    <div ref={mRef} className="relative">
      <button
        type="button"
        aria-label="Settings"
        data-dd="settings"
        onClick={mToggle}
        className={`flex h-7 w-7 items-center justify-center rounded-md border border-rk-border-strong text-rk-text-2 ${mOpen ? "bg-rk-hover" : "bg-rk-bg hover:bg-rk-hover"}`}
      >
        <GearIcon />
      </button>
      {mOpen && (
        <MenuPanel className="top-[calc(100%+6px)] right-0 w-[216px] text-[14px] leading-5 font-normal">
          {settings.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                mClose();
                if (s.key !== "google" && s.key !== "delete") onOpen(s.key);
              }}
              className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-rk-bg"
            >
              {s.icon}
              <span className="flex-1">{s.label}</span>
              {s.key === "google" && <I />}
            </button>
          ))}
          <div className="my-1 border-t border-rk-border" />
          <button type="button" onClick={mClose} className="flex h-8 w-full items-center gap-2 px-2 text-left hover:bg-rk-bg">
            {ico("M2.5 4h11M6 4V2.5h4V4M4 4l.8 9.5h6.4L12 4")}
            Delete project
          </button>
        </MenuPanel>
      )}
    </div>
  );
}

export function DashboardHeader({ name, onOpen }: { name: string; onOpen: (k: Exclude<ModalKind, null>) => void }) {
  return (
    <PageHeader
      crumbs={[{ label: "Home", href: "/" }, { label: "SEO" }]}
      title={
        <span className="flex items-center">
          <span className="mr-[6px]">SEO Dashboard:</span>
          <ProjectDropdown name={name} onCreate={() => onOpen("create")} />
          <a href={`https://${project.domain}`} target="_blank" rel="noreferrer" aria-label="Open website" className="ml-[9px] text-[#8b8d8c] hover:text-rk-text-2">
            <ExternalIcon width={17} height={17} />
          </a>
        </span>
      }
      actions={
        <>
          <button type="button" onClick={() => onOpen("create")} className="flex h-7 items-center gap-[7px] rounded-md bg-rk-btn-dark pr-[8px] pl-[9px] text-[14px] font-semibold text-white hover:bg-[#2b2e38]">
            <PlusIcon />
            Create SEO Project
          </button>
          <button type="button" onClick={() => onOpen("share")} className="flex h-7 items-center rounded-md border border-rk-border-strong bg-rk-bg px-2 text-[14px] text-rk-muted hover:bg-rk-hover">
            Share
          </button>
          <SettingsMenu onOpen={onOpen} />
        </>
      }
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import { galleryTabs, galleryTemplates, type Template, type TemplateIcon } from "./data";
import { DiamondIcon } from "./ConstructorIcons";
import { ScrollArea } from "./ScrollArea";
import { templateIcon } from "./TemplateCard";

const inTab = (tab: string) => (tab === "All" ? galleryTemplates : galleryTemplates.filter((t) => t.tabs.includes(tab)));

function GalleryCard({ t, onPick }: { t: Template; onPick: () => void }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="flex h-[240px] flex-col items-start rounded-md border border-[#eceef1] bg-white px-3 pt-3 text-left transition-shadow hover:shadow-[0_2px_12px_rgba(25,27,35,0.14)]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f1f4]">{templateIcon[t.icon as Exclude<TemplateIcon, "plus">]}</span>
      <div className="mt-[11px] h-12 text-[16px] leading-6 font-bold text-rk-text">
        {t.title}
        {t.premium && <DiamondIcon width={14} height={14} className="ml-[5px] inline-block align-[-1px]" />}
      </div>
      <p className="mt-1 text-[14px] leading-5 text-rk-muted">{t.description}</p>
    </button>
  );
}

export function TemplateGallery({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<(typeof galleryTabs)[number]>("All");
  const list = inTab(tab);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-scroll bg-black/[0.34] pt-10 pb-[46px]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Template gallery" className="relative mx-auto flex h-[724px] w-[939px] flex-col overflow-hidden rounded-lg bg-white">
        <button type="button" aria-label="Close template gallery" onClick={onClose} className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded text-rk-text-2 hover:bg-rk-bg">
          <svg viewBox="0 0 20 20" width={20} height={20}>
            <path d="M3 3l14 14M17 3 3 17" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          </svg>
        </button>
        <div className="shrink-0 px-10 pt-[38px] pb-6">
          <h2 className="text-[24px] leading-8 font-semibold text-rk-text">Template gallery</h2>
          <div role="tablist" className="mt-[14px] inline-flex rounded-md border border-rk-border">
            {galleryTabs.map((g, i) => (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={g === tab}
                onClick={() => setTab(g)}
                className={`flex h-[38px] items-center gap-[7px] px-3 text-[16px] ${i > 0 ? "border-l border-rk-border" : ""} ${
                  g === tab ? "-m-px rounded-md border border-[#9fb6ee] bg-[#f4f7fc] px-[13px]" : "hover:bg-rk-bg"
                }`}
              >
                {g}
                <span className="text-rk-muted">{inTab(g).length}</span>
              </button>
            ))}
          </div>
        </div>
        <ScrollArea key={tab} className="min-h-0 flex-1 bg-[#f9f9f9]" vInset={{ right: 2, top: 5, bottom: 5 }} thumbClassName="bg-[#d0d2d2]">
          <div className="grid grid-cols-4 gap-5 px-10 pt-6 pb-10">
            {list.map((t) => (
              <GalleryCard key={t.title} t={t} onPick={onClose} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

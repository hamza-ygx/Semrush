"use client";

import { useState, type ReactNode } from "react";
import { LogoIcon } from "@/components/icons";
import { SearchIcon } from "@/components/ui/icons";
import { integrationGroups, themes, widgetGroups, type IntegrationItem } from "./data";
import { BrushIcon, ColumnsIcon, DiamondIcon, HeadingIcon, ImageIcon, ScissorsIcon, StarIcon, TextIcon } from "./ConstructorIcons";
import { GaIcon, GoogleGIcon, GscIcon, MatomoIcon, SparkleIcon } from "./ReportIcons";
import { ScrollArea } from "./ScrollArea";

const Chevron = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} className={`ml-auto shrink-0 ${className}`}>
    <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NewBadge = () => <span className="ml-2 rounded-full bg-[#00a67e] px-[5px] text-[11px] leading-[14px] font-semibold text-white">new</span>;

function Search({ placeholder }: { placeholder: string }) {
  return (
    <label className="flex h-7 items-center gap-2 rounded-md border border-rk-border-strong bg-white px-2 text-rk-muted focus-within:border-[#8e92ec]">
      <SearchIcon width={16} height={16} />
      <input placeholder={placeholder} className="min-w-0 flex-1 text-[14px] text-rk-text outline-none placeholder:text-rk-muted" />
    </label>
  );
}

function integrationIcon(i: IntegrationItem): ReactNode {
  switch (i.icon) {
    case "brand":
      return <LogoIcon width={17} height={17} />;
    case "ai":
      return <SparkleIcon width={18} height={18} />;
    case "ga":
      return <GaIcon width={18} height={18} />;
    case "matomo":
      return <MatomoIcon width={18} height={18} />;
    case "gsc":
      return <GscIcon width={18} height={18} />;
    case "google":
      return <GoogleGIcon width={17} height={17} />;
    default:
      return <span className="flex h-[17px] w-[17px] items-center justify-center rounded bg-[#eef0f3] text-[10px] font-bold text-rk-text-2">{i.label.charAt(0)}</span>;
  }
}

export function IntegrationsPanel() {
  return (
    <ScrollArea className="h-full" vInset={{ right: 3, top: 112, bottom: 360 }} thumbClassName="bg-[#c4c7cf]">
      <div className="px-4 pt-[15px] pb-6">
        <h2 className="text-[16px] leading-6 font-bold text-rk-text">Integrations</h2>
        <div className="mt-[13px]">
          <Search placeholder="Search" />
        </div>
        {integrationGroups.map((g, gi) => (
          <div key={g.heading} className={gi === 0 ? "mt-[18px]" : "mt-[12px]"}>
            <div className="text-[12px] leading-5 font-bold text-rk-text">{g.heading}</div>
            <div className="mt-[4px]">
              {g.items.map((it) => (
                <button key={it.label} type="button" className="flex h-[34px] w-full items-center gap-[10px] pl-[3px] text-left text-[14px] text-rk-text hover:text-rk-link">
                  <span className="flex w-[17px] shrink-0 justify-center">{integrationIcon(it)}</span>
                  <span className="truncate">{it.label}</span>
                  {it.isNew && <NewBadge />}
                  {it.premium && <DiamondIcon className="ml-auto" width={13} height={13} />}
                  <Chevron className={`text-rk-muted ${it.premium ? "ml-[3px]" : ""}`} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function WidgetsPanel() {
  return (
    <div className="px-4 pt-4">
      <Search placeholder="Search all widgets" />
      <h2 className="mt-[16px] text-[16px] leading-6 font-bold text-rk-text">Widgets</h2>
      <div className="mt-[8px]">
        {widgetGroups.map((w) => (
          <button
            key={w.label}
            type="button"
            disabled={w.disabled}
            className={`flex h-9 w-full items-center gap-[6px] text-left text-[14px] ${w.disabled ? "text-[#c4c7cf]" : "text-rk-text hover:text-rk-link"}`}
          >
            {w.label}
            {w.star && <StarIcon width={17} height={17} className="-mt-[3px] text-[#ffb400]" />}
            <Chevron className={w.disabled ? "text-[#dcdde2]" : "text-rk-muted"} />
          </button>
        ))}
      </div>
    </div>
  );
}

const objects = [
  { label: "Heading", icon: <HeadingIcon /> },
  { label: "Text", icon: <TextIcon /> },
  { label: "Image", icon: <ImageIcon width={16} height={16} /> },
];
const structure = [
  { label: "Two Columns", icon: <ColumnsIcon n={2} /> },
  { label: "Three Columns", icon: <ColumnsIcon n={3} /> },
  { label: "Page Break", icon: <ScissorsIcon /> },
];

export function FormattingPanel() {
  const row = (x: { label: string; icon: ReactNode }) => (
    <button key={x.label} type="button" draggable className="flex h-[34px] w-full cursor-grab items-center gap-2 text-left text-[14px] text-rk-text hover:text-rk-link">
      <span className="text-rk-muted">{x.icon}</span>
      {x.label}
    </button>
  );
  return (
    <div className="px-4 pt-[15px]">
      <h2 className="text-[16px] leading-6 font-bold text-rk-text">Formatting</h2>
      <div className="mt-[14px] text-[12px] leading-4 font-medium tracking-[0.02em] text-rk-text-2">OBJECTS</div>
      <div className="mt-[10px]">{objects.map(row)}</div>
      <div className="mt-[15px] text-[12px] leading-4 font-medium tracking-[0.02em] text-rk-text-2">PAGE STRUCTURE</div>
      <div className="mt-[9px]">{structure.map(row)}</div>
    </div>
  );
}

function ThemeThumb({ accent, cover }: { accent: string; cover: string }) {
  return (
    <div className="flex justify-center gap-1">
      <div className="relative h-[124px] w-[86px] bg-white shadow-[0_0_2px_rgba(0,0,0,0.12)]">
        {accent ? (
          <>
            <div className="flex items-center gap-[2px] px-[6px] pt-[6px] text-[4px] font-bold">
              <LogoIcon width={6} height={6} />
            </div>
            <div className="px-[6px] pt-[8px] text-[8px] leading-[10px] font-bold text-rk-text">{cover}</div>
            <div className="px-[6px] text-[3px] text-rk-muted">for rkjh.se domain</div>
            <div className="absolute inset-x-0 bottom-0 h-[64px]" style={{ background: accent }} />
          </>
        ) : (
          <div className="flex flex-col items-center pt-[34px]">
            <div className="flex items-center gap-[2px] text-[4px] font-bold">
              <LogoIcon width={7} height={7} />
            </div>
            <div className="mt-[18px] text-[5px] text-rk-text-2">Report Title</div>
            <div className="mt-[2px] h-[2px] w-6 bg-[#eceef0]" />
          </div>
        )}
      </div>
      <div className="relative h-[124px] w-[86px] bg-white shadow-[0_0_2px_rgba(0,0,0,0.12)]">
        <div className="h-[5px]" style={{ background: accent || "transparent" }} />
        <div className="absolute top-[1px] left-[6px]">
          <LogoIcon width={5} height={5} />
        </div>
        <div className="absolute right-[6px] bottom-[4px] left-[6px] h-px bg-[#eceef0]" />
      </div>
    </div>
  );
}

export function ThemesPanel() {
  const [active, setActive] = useState(themes[0].name);
  return (
    <ScrollArea className="h-full" vInset={{ right: 3, top: 58, bottom: 380 }} thumbClassName="bg-[#c4c7cf]">
      <div className="px-4 pt-[15px] pb-6">
        <h2 className="flex items-center gap-2 text-[16px] leading-6 font-bold text-rk-text">
          Themes
          <DiamondIcon width={17} height={17} />
        </h2>
        <div className="mt-[17px] flex flex-col gap-[44px]">
          {themes.map((t) => {
            const on = t.name === active;
            return (
              <div key={t.name} className="relative">
                <button
                  type="button"
                  onClick={() => setActive(t.name)}
                  className={`group relative block h-[148px] w-full rounded-lg pt-3 ${on ? "bg-[#c8c9c9]" : "bg-[#f3f4f4] hover:bg-[#e8eaea]"}`}
                >
                  <div className={on ? "opacity-80" : ""}>
                    <ThemeThumb accent={t.accent} cover={t.cover} />
                  </div>
                  {on && (
                    <span className="absolute top-[108px] right-3 left-3 flex h-7 items-center justify-center gap-2 rounded-md bg-[#191b23]/90 text-[14px] font-medium text-white">
                      <BrushIcon width={16} height={16} />
                      Customize theme
                    </span>
                  )}
                </button>
                <div className="absolute top-[158px] w-full text-center text-[14px] leading-5 text-rk-text">{t.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}

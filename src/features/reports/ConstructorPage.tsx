"use client";

import Link from "next/link";
import { useState, type ComponentType, type SVGProps } from "react";
import { HelpButtonAndPanel } from "@/components/shell/HelpPanel";
import { routes } from "@/config/routes";
import { railTips, settingsTip } from "./data";
import { BrushIcon, GearIcon, HomeIcon, ImageIcon, PencilIcon, PieIcon, PlugIcon } from "./ConstructorIcons";
import { FormattingPanel, IntegrationDetail, IntegrationsPanel, ThemesPanel, WidgetsPanel } from "./ConstructorPanels";
import { ReportCanvas } from "./ReportCanvas";
import { TemplateGallery } from "./TemplateGallery";

type Panel = keyof typeof railTips;

const rail: { key: Panel; icon: ComponentType<SVGProps<SVGSVGElement>>; center: number }[] = [
  { key: "widgets", icon: PieIcon, center: 75 },
  { key: "integrations", icon: PlugIcon, center: 133 },
  { key: "formatting", icon: ImageIcon, center: 187 },
  { key: "themes", icon: BrushIcon, center: 242 },
];

function Onboarding({ onClose }: { onClose: () => void }) {
  const steps = [
    { text: "Choose a tool, then drag and drop its widget into the report", on: true },
    { text: "Add an AI summary to turn your data into clear insights", on: false },
    { text: "Export or schedule your report", on: false },
  ];
  return (
    <>
      <span className="absolute top-[166px] left-[337px] z-30 h-2 w-2 rounded-full bg-[#9d8cf7]" />
      <div role="dialog" aria-label="Onboarding" className="absolute top-[172px] left-[358px] z-30 w-[350px] rounded-md bg-[#1a1b1b] pr-9 pl-4 pt-[17px] pb-[18px] text-white shadow-popover">
        <button type="button" aria-label="Close onboarding" onClick={onClose} className="absolute top-[13px] right-[14px] flex h-5 w-5 items-center justify-center text-white hover:opacity-80">
          <svg viewBox="0 0 12 12" width={10} height={10}>
            <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-[16px] leading-[22px] font-bold">Create your report in 3 quick steps:</div>
        <ul className="mt-[16px] flex flex-col gap-2">
          {steps.map((s) => (
            <li key={s.text} className={`flex gap-2 text-[14px] leading-5 ${s.on ? "text-white" : "text-[#8d8f8f]"}`}>
              <span className={`mt-[2px] h-4 w-4 shrink-0 rounded-[4px] ${s.on ? "bg-white" : "bg-[#56585a]"}`} />
              {s.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function Feedback({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  return (
    <div className="absolute right-0 bottom-0 left-[344px] z-20 flex h-[73px] items-center border-t border-[#dfe3f0] bg-[#eef2fb] pr-[92px] pl-[18px] text-[14px] text-rk-text">
      <svg viewBox="0 0 32 32" width={32} height={32} className="shrink-0">
        <rect x="2" y="2" width="28" height="28" rx="7" fill="#5cc8f5" />
        <path d="M11 24v-9c0-1 1.6-1 1.6 0v-5c0-1 1.6-1 1.6 0v-1.5c0-1 1.6-1 1.6 0V10c0-1 1.6-1 1.6 0v7c1-2 3-2.5 3.6-1.5-1 1.5-2 3.5-2.4 5.5-.6 2.2-2 3-4 3z" fill="#fff" stroke="#1b1e1a" strokeWidth={1.3} strokeLinejoin="round" />
      </svg>
      <span className="ml-[18px]">How would you rate the customization options and Themes?</span>
      <span className="ml-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" aria-label={`${n} stars`} onClick={() => setRating(n)} className="text-[#8b8d8c] hover:text-[#ffb400]">
            <svg viewBox="0 0 24 24" width={24} height={24}>
              <path
                d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.5-4.2 6.1-.8z"
                fill={n <= rating ? "#ffb400" : "none"}
                stroke={n <= rating ? "#ffb400" : "currentColor"}
                strokeWidth={1.3}
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </span>
      <button type="button" aria-label="Close feedback" onClick={onClose} className="ml-auto text-rk-muted hover:text-rk-text">
        <svg viewBox="0 0 12 12" width={11} height={11}>
          <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function ConstructorPage({ view }: { view?: string }) {
  const themesView = view === "themes";
  const [panel, setPanel] = useState<Panel>(themesView ? "themes" : "integrations");
  const [gallery, setGallery] = useState(!themesView);
  const [onboarding, setOnboarding] = useState(!themesView);
  const [tip, setTip] = useState<Panel | null>(null);
  const [tipFading, setTipFading] = useState(false);
  const [themesSeen, setThemesSeen] = useState(themesView);
  const [feedback, setFeedback] = useState(true);
  const [title, setTitle] = useState("Untitled report");
  const [editing, setEditing] = useState(false);
  const [integration, setIntegration] = useState<string | null>(null);
  const [settingsHover, setSettingsHover] = useState(false);
  const tipItem = rail.find((r) => r.key === tip);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f9f9f9] text-rk-text">
      <header className="flex h-12 items-center bg-[#323532] pr-5 pl-5 text-white">
        <Link href={routes.reports.myReports} className="flex items-center gap-[5px] text-[15px] hover:text-[#d9dbdd]">
          <HomeIcon width={17} height={17} />
          Reports list
        </Link>
        <svg viewBox="0 0 16 16" width={16} height={16} className="mx-[9px]">
          <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {editing ? (
          <input
            autoFocus
            aria-label="Report title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
            className="h-7 w-[180px] rounded border border-[#6c6e6c] bg-transparent px-1 text-[15px] text-white outline-none"
          />
        ) : (
          <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-[10px] text-[15px] text-[#a1a3a3] hover:text-white">
            {title}
            <PencilIcon width={17} height={17} />
          </button>
        )}
        <div className="ml-auto flex items-center gap-[9px]">
          <button type="button" disabled className="flex h-7 items-center gap-2 rounded-md border border-[#4a4d4a] px-2 text-[14px] text-[#6f716f]">
            Bulk edit
            <svg viewBox="0 0 16 16" width={14} height={14}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="flex h-7 items-center gap-2 rounded-md bg-gradient-to-r from-[#a45cfd] to-[#7a6cf2] pr-[9px] pl-[10px] text-[14px] font-medium text-white hover:brightness-110">
            <svg viewBox="0 0 20 20" width={20} height={20}>
              <path d="M8 4c.5 3.4 2.1 5 5.5 5.5-3.4.5-5 2.1-5.5 5.5-.5-3.4-2.1-5-5.5-5.5C5.9 9 7.5 7.4 8 4z" fill="#fff" />
              <path d="M15 2.5c.2 1.3.8 1.9 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.1 1.8-.7 2-2z" fill="#fff" />
            </svg>
            Add AI summary
          </button>
          <button type="button" className="flex h-7 items-center rounded-md bg-[#00a67e] px-[9px] text-[14px] font-medium text-white hover:bg-[#008f6c]">
            Generate PDF report
          </button>
          <button
            type="button"
            aria-label="Settings"
            onMouseEnter={() => setSettingsHover(true)}
            onMouseLeave={() => setSettingsHover(false)}
            className="relative flex h-[26px] w-[26px] items-center justify-center rounded-md bg-[#6b6d6d] text-[#1b1e1a] hover:bg-[#7c7e7e]">
            <GearIcon width={17} height={17} />
            <span className="absolute -top-[4px] -right-[4px] h-[9px] w-[9px] rounded-full bg-[#e8811f]" />
          </button>
          {settingsHover && (
            <div
              role="tooltip"
              className="pointer-events-none absolute top-[52px] right-5 z-40 w-[227px] rounded-md bg-white px-3 pt-[10px] pb-[10px] text-[14px] leading-5 text-rk-text shadow-[0_1px_10px_rgba(25,27,35,0.14)]"
            >
              {settingsTip}
            </div>
          )}
        </div>
      </header>

      <div className="absolute top-12 bottom-0 left-0 w-14 bg-rk-bg">
        {rail.map(({ key, icon: Icon }) => {
          const on = key === panel;
          return (
            <button
              key={key}
              type="button"
              aria-label={railTips[key].title}
              onClick={() => {
                setPanel(key);
                setOnboarding(false);
                setTipFading(true);
                if (key === "themes") setThemesSeen(true);
              }}
              onMouseEnter={() => {
                setTip(key);
                setTipFading(false);
              }}
              onMouseLeave={() => setTip(null)}
              className={`relative flex h-14 w-14 items-center justify-center ${on ? "bg-white text-[#ff642d]" : "text-[#6a6c6a] hover:text-rk-text"} ${key === "themes" ? "h-[55px]" : ""}`}
            >
              <Icon width={24} height={24} className={key === "integrations" ? "-mt-[4px]" : ""} />
              {key === "integrations" && (
                <span className="absolute top-[32px] left-[20px] rounded-full bg-[#00a67e] px-[4px] text-[10px] leading-[13px] font-semibold text-white">new</span>
              )}
            </button>
          );
        })}
      </div>

      <aside className="absolute top-12 bottom-0 left-14 w-[288px] border-r border-rk-border bg-white">
        {panel === "widgets" ? (
          <WidgetsPanel />
        ) : panel === "integrations" ? (
          integration ? (
            <IntegrationDetail key={integration} name={integration} onBack={() => setIntegration(null)} />
          ) : (
            <IntegrationsPanel
              onOpen={(label) => {
                setIntegration(label);
                setOnboarding(false);
              }}
            />
          )
        ) : panel === "formatting" ? <FormattingPanel /> : <ThemesPanel />}
      </aside>

      {tipItem && (
        <div
          className={`pointer-events-none absolute left-[62px] z-40 w-[216px] rounded-md bg-white px-3 py-[11px] shadow-[0_2px_10px_rgba(25,27,35,0.12)] ${tipFading ? "opacity-[0.78]" : ""}`}
          style={{ top: Math.max(58, tipItem.center - 44) }}
        >
          <div className="text-[14px] leading-5 font-semibold text-rk-text-2">{railTips[tipItem.key].title}</div>
          <div className="mt-1 text-[14px] leading-5 text-rk-text-2">{railTips[tipItem.key].text}</div>
        </div>
      )}

      <div className="absolute top-12 right-0 bottom-0 left-[344px]">
        <ReportCanvas onChooseTemplate={() => setGallery(true)} />
      </div>

      {(panel === "themes" || themesSeen) && feedback && <Feedback onClose={() => setFeedback(false)} />}
      {onboarding && !gallery && panel === "integrations" && <Onboarding onClose={() => setOnboarding(false)} />}
      {gallery && <TemplateGallery onClose={() => setGallery(false)} />}
      <HelpButtonAndPanel />
    </div>
  );
}

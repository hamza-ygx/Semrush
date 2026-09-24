"use client";

import { useState, type ReactNode } from "react";
import { account, brand } from "@/config/brand";
import { useOutsideClose } from "../ui/Popover";
import { ChevronDown, ChevronRight, LanguageIcon } from "../ui/icons";

const DemoIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="5" r="2" />
      <path d="M1.5 12.5c.3-2 1.6-3 3.5-3 1 0 1.8.3 2.4.8M7 2.5h7.5v7H10M10 9.5l1.5 3" />
    </g>
  </svg>
);
const CourseIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6 8 2.5 15 6 8 9.5z" />
      <path d="M4 7.5v3.5c1 .8 2.4 1.3 4 1.3s3-.5 4-1.3V7.5M15 6v4" />
    </g>
  </svg>
);
const AgencyIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <g fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round">
      <path d="M1.5 4.5h13v9h-13zM5.5 4.5v-2h5v2M1.5 8.5h13M7 8.5v1.5h2V8.5" />
    </g>
  </svg>
);

type Entry = { label: ReactNode; sub?: string[]; icon?: ReactNode } | "divider";

const moreEntries: Entry[] = [
  { label: "Solutions" },
  { label: "Features" },
  { label: "Blog" },
  { label: "Resources", sub: ["Help Center", "What's new", "Webinars", "Insights", "Hire a Trusted Agency", "Academy", "Top Websites", "AI Visibility Index", "Local Marketing Hub"] },
  {
    label: "Company",
    sub: ["About Us", "Newsroom", "Careers", `Compare ${brand.name}`, "Success Stories", "Affiliate Program", "Partner Integrations", "Contacts", "Stats and Facts"],
  },
  { label: `${brand.name} API` },
  { label: `${brand.name} MCP`, sub: ["About MCP", "Prompt Library", "Documentation"] },
  "divider",
  { label: "Request live demo", icon: <DemoIcon /> },
  { label: `Learn with ${brand.name} courses`, icon: <CourseIcon /> },
  { label: "Hire a digital agency", icon: <AgencyIcon /> },
];

const languages = ["English", "Deutsch", "Español", "Français", "Italiano", "Nederlands", "Polski", "Português (Brasil)", "Svenska", "Tiếng Việt", "Türkçe", "中文", "日本語", "한국어"];

function Row({ children, onEnter, active, hasSub, tall }: { children: ReactNode; onEnter?: () => void; active?: boolean; hasSub?: boolean; tall?: boolean }) {
  return (
    <a
      href="#"
      onMouseEnter={onEnter}
      onClick={(e) => e.preventDefault()}
      className={`flex ${tall ? "h-[32.5px]" : "h-[31px]"} items-center gap-2 px-[9px] text-[14px] text-rk-text hover:bg-rk-bg ${active ? "bg-rk-bg" : ""}`}
    >
      <span className="flex flex-1 items-center gap-2 whitespace-nowrap">{children}</span>
      {hasSub && <ChevronRight className="text-rk-text" />}
    </a>
  );
}

function SubPanel({ items, top, width = 234, selected }: { items: string[]; top: number; width?: number; selected?: string }) {
  return (
    <div style={{ top, width, right: "calc(100% + 5px)" }} className="absolute rounded-md bg-white py-1 shadow-popover">
      {items.map((s) => (
        <a
          key={s}
          href="#"
          onClick={(e) => e.preventDefault()}
          className={`relative flex h-8 items-center px-[9px] text-[14px] whitespace-nowrap text-rk-text hover:bg-rk-bg ${s === selected ? "bg-[#ebf0ff]" : ""}`}
        >
          {s === selected && <span className="absolute top-0 bottom-0 left-0 w-[2px] bg-rk-text" />}
          {s}
        </a>
      ))}
    </div>
  );
}

export function MoreMenu() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<number | null>(null);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setSub(null);
        }}
        className={`flex h-8 items-center gap-[6px] rounded-md px-3 text-[14px] -mx-3 ${open ? "bg-rk-hover" : "hover:bg-rk-hover"}`}
      >
        More
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+7px)] right-[-3px] z-50 w-[234px] rounded-md bg-white py-1 shadow-popover">
          {moreEntries.map((e, i) => {
            if (e === "divider") return <div key={i} className="my-1 border-t border-rk-border" />;
            return (
              <div key={i} className="relative">
                <Row hasSub={!!e.sub} active={sub === i} onEnter={() => setSub(e.sub ? i : null)}>
                  {e.icon}
                  {e.label}
                </Row>
                {sub === i && e.sub && <SubPanel items={e.sub} top={-4} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Profile"
        onClick={() => {
          setOpen((o) => !o);
          setLang(false);
        }}
        className={`flex h-8 w-8 items-center justify-center rounded-md ${open ? "bg-rk-hover" : "hover:bg-rk-hover"}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rk-avatar text-[13px] font-medium text-white">{account.initial}</span>
      </button>
      {open && (
        <div className="absolute top-[calc(100%+8px)] right-[-2px] z-50 w-[263px] rounded-md bg-white py-1 shadow-popover">
          <a href="#" onMouseEnter={() => setLang(false)} onClick={(e) => e.preventDefault()} className="block px-[9px] py-[5px] text-[14px] leading-[18px] hover:bg-rk-bg">
            My profile <span className="text-rk-muted">• ID:{account.id}</span>
            <div className="text-rk-muted">{account.email}</div>
          </a>
          <div className="h-[2px]" />
          <Row tall onEnter={() => setLang(false)}>Subscription info</Row>
          <Row tall onEnter={() => setLang(false)}>Manage users</Row>
          <Row tall onEnter={() => setLang(false)}>Log out</Row>
          <div className="my-[3px] border-t border-rk-border" />
          <div className="relative">
            <Row tall hasSub active={lang} onEnter={() => setLang(true)}>
              <LanguageIcon className="text-rk-text-2" />
              <span>
                Language: <b className="font-semibold">English</b>
              </span>
            </Row>
            {lang && <SubPanel items={languages} top={-8} width={139} selected="English" />}
          </div>
        </div>
      )}
    </div>
  );
}

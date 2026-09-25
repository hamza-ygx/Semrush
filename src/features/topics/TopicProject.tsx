"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode, type SVGProps } from "react";
import { routes } from "@/config/routes";
import { Breadcrumbs } from "@/components/ui/primitives";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { CloseIcon, FeedbackIcon } from "@/components/ui/icons";
import { MindMap } from "./MindMap";
import { cardIdeas, cards, explorerRows, overviewHeadlines, overviewQuestions, topic, type CardIdeas, type IdeaTone, type TopicCard } from "./data";

type P = SVGProps<SVGSVGElement>;
export type TopicView = "cards" | "explorer" | "overview" | "mindmap";

const blue = "text-[#006dca]";
const gsearch = (q: string) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

const ThumbIcon = ({ down, ...p }: P & { down?: boolean }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p} style={down ? { transform: "scaleY(-1)" } : undefined}>
    <path
      d="M1.5 7h2.5v7H1.5zM4 7l3-5.2c1 0 1.7.8 1.5 1.8L8 6.5h4.8c.9 0 1.5.8 1.3 1.6l-1.2 4.8c-.2.7-.8 1.1-1.5 1.1H4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  </svg>
);

const PenBadge = () => (
  <svg viewBox="0 0 32 36" width={32} height={36}>
    <path d="M3 5c0-2 1.5-3.5 3.5-3.5h19C27.5 1.5 29 3 29 5v22c0 2-1.5 3.5-3.5 3.5H12L5 35v-4.6C3.8 30 3 28.8 3 27.5z" fill="#6ec4f0" />
    <path d="M8 6.5 20 22l3.5 5.5-5.7-3.2L6 8.8C5 7.6 6.8 5.3 8 6.5z" fill="#fff" stroke="#191b23" strokeWidth={1.4} strokeLinejoin="round" />
    <path d="M17.8 24.3l5.7 3.2-1.5-4.8" fill="#191b23" />
    <path d="M9 10.5 11.5 8.5" stroke="#191b23" strokeWidth={1.2} />
  </svg>
);

function FeedbackBanner() {
  const [open, setOpen] = useState(true);
  const [answered, setAnswered] = useState(false);
  if (!open) return null;
  return (
    <div className="flex h-12 items-center border-b border-[#b5d8ec] bg-[#e9f6fc] pr-6 pl-6 text-[14px]">
      <PenBadge />
      <span className="ml-3">{answered ? "Thank you for your feedback!" : "Help us improve! Do you find our Topic Research tool useful?"}</span>
      {!answered && (
        <>
          <button
            type="button"
            onClick={() => setAnswered(true)}
            className="ml-4 flex h-7 items-center gap-[6px] rounded-md border border-[#c9d3dd] bg-[#dfe6ee] px-2 text-[#6c6e79] hover:bg-[#d3dce6]"
          >
            <ThumbIcon />
            Yes
          </button>
          <button
            type="button"
            onClick={() => setAnswered(true)}
            className="ml-2 flex h-7 items-center gap-[6px] rounded-md border border-[#c9d3dd] bg-[#dfe6ee] px-2 text-[#6c6e79] hover:bg-[#d3dce6]"
          >
            <ThumbIcon down />
            No
          </button>
          <button type="button" onClick={() => setOpen(false)} className={`ml-[18px] ${blue} hover:underline`}>
            Ask me later
          </button>
        </>
      )}
      <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="ml-auto text-[#484a54] hover:text-rk-text">
        <CloseIcon width={14} height={14} strokeWidth={2.4} />
      </button>
    </div>
  );
}

const ExportIco = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path
      d="M8 10.5V2.5M4.8 5.5 8 2.3l3.2 3.2M2 10v3.5h12V10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const EditIco = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M7 2.5H2.5v11h11V9" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 1.8 14.2 3.5 8 9.7l-2.4.7.7-2.4z" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

function ProjectHeader({ loading }: { loading: boolean }) {
  return (
    <div className="border-b border-[#d7dbe0] px-[30px] pt-4">
      <div className="flex h-5 items-center justify-between">
        <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "SEO", href: routes.seoDashboard }, { label: "Topic Research" }]} />
        <button type="button" className={`flex items-center gap-[6px] text-[14px] ${blue} hover:underline`}>
          <FeedbackIcon width={18} height={18} />
          Send feedback
        </button>
      </div>
      <div className="mt-[25px] flex h-7 items-center justify-between">
        <h1 className="text-[20px] leading-7 font-semibold">
          Topic Research: <span className="text-[#898d99]">{topic}</span>
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loading}
            className={`flex h-7 items-center gap-2 rounded-md border px-2 text-[14px] ${loading ? "border-[#e0e3e7] bg-[#f4f5f7] text-[#c4c7cf]" : "border-[#c4c7cf] bg-[#eceff2] text-[#6c6e79] hover:bg-[#e0e3e7]"}`}
          >
            <ExportIco />
            Export topic to XLSX
          </button>
          <button type="button" className="flex h-7 items-center gap-2 rounded-md bg-[#009f81] px-2 text-[14px] font-semibold text-white hover:bg-[#008a70]">
            <EditIco />
            Create AI Content
          </button>
        </div>
      </div>
      <div className="mt-8 flex gap-4 text-[16px] leading-6">
        <span className="relative pb-[10px]">
          Content Ideas
          <span className="absolute inset-x-0 bottom-[-1px] h-[3px] rounded-t-sm bg-[#0865ce]" />
        </span>
        <button type="button" className="pb-[10px] hover:text-[#006dca]">
          Favorite Ideas
        </button>
      </div>
    </div>
  );
}

const CardsIco = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="3.5" y="2.5" width="9" height="11" rx="1.2" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M1 4.5v7M15 4.5v7M6 5.5h4M6 8h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);
const TableIco = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="1.5" y="2.5" width="13" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M1.5 6h13M1.5 9.7h13M6 6v7.5" stroke="currentColor" strokeWidth={1.5} />
  </svg>
);
const OverviewIco = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="1.5" y="2" width="13" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M4 5h4v4H4zM10 5h2M10 7.5h2M4 11h8" stroke="currentColor" strokeWidth={1.3} fill="none" />
  </svg>
);
const MapIco = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="5" y="1.5" width="6" height="4" rx=".8" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <rect x="1" y="10.5" width="5.5" height="4" rx=".8" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <rect x="9.5" y="10.5" width="5.5" height="4" rx=".8" fill="none" stroke="currentColor" strokeWidth={1.4} />
    <path d="M8 5.5v2.5M3.8 10.5V8h8.4v2.5" fill="none" stroke="currentColor" strokeWidth={1.4} />
  </svg>
);
const FireIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path
      d="M8 1.5c.5 2.4 3.8 4 3.8 7.7A3.8 3.8 0 0 1 8 13c-2.1 0-3.8-1.7-3.8-3.8 0-1.7.9-2.8 1.8-3.6 0 1.2.5 2 1.3 2.3C7 5.8 7.2 3.4 8 1.5z"
      fill="none"
      stroke="#f0473c"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

const views: {
  key: TopicView;
  label: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    key: "cards",
    label: "Cards",
    href: routes.topicResearchProject.cards,
    icon: <CardsIco />,
  },
  {
    key: "explorer",
    label: "Explorer",
    href: routes.topicResearchProject.explorer,
    icon: <TableIco />,
  },
  {
    key: "overview",
    label: "Overview",
    href: routes.topicResearchProject.overview,
    icon: <OverviewIco />,
  },
  {
    key: "mindmap",
    label: "Mind Map",
    href: routes.topicResearchProject.mindMap,
    icon: <MapIco />,
  },
];

function ViewSwitch({ view }: { view: TopicView }) {
  return (
    <div className="flex">
      {views.map((v, i) => (
        <Link
          key={v.key}
          href={v.href}
          className={`relative -ml-px flex h-7 items-center gap-2 border px-2 text-[14px] first:ml-0 ${i === 0 ? "rounded-l-md" : ""} ${i === views.length - 1 ? "rounded-r-md" : ""} ${
            v.key === view ? "z-10 border-[#7fb3e8] bg-[#dcecfb] text-rk-text" : "border-[#d7dbe0] bg-white text-rk-text hover:bg-[#f4f5f7]"
          }`}
        >
          <span className="text-[#484a54]">{v.icon}</span>
          {v.label}
        </Link>
      ))}
    </div>
  );
}

function Toggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((o) => !o)}
      className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-[#008ff8]" : "bg-[#a9abb6]"}`}
      aria-pressed={on}
    >
      <span className={`absolute top-[2px] h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-[2px]"}`} />
    </button>
  );
}

function useStuck<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => {
      if (ref.current) setStuck(ref.current.getBoundingClientRect().top <= 0.5 && window.scrollY > 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return [ref, stuck] as const;
}

const optCls = (active: boolean) =>
  `flex h-8 w-full items-center gap-2 px-2 text-left text-[14px] whitespace-nowrap text-rk-text ${active ? "bg-[#d5edfb] shadow-[inset_2px_0_0_#1987da]" : "hover:bg-[#f2f4f8]"}`;

function Prioritize() {
  const [v, setV] = useState("Volume");
  return (
    <Popover
      offset={6}
      panelClassName="-left-[7px]!"
      trigger={({ toggle, open }) => (
        <button
          type="button"
          data-testid="tr-prioritize"
          onClick={toggle}
          className={`flex h-7 items-center gap-[4px] rounded-md border bg-white pr-[6px] pl-[7px] text-rk-text ${open ? "border-[#6b7d8b]" : "border-[#c4c7cf]"}`}
        >
          {v}
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    >
      {(close) =>
        ["Volume", "Difficulty", "Topic Efficiency"].map((c) => (
          <button
            key={c}
            type="button"
            className={optCls(c === v)}
            onClick={() => {
              setV(c);
              close();
            }}
          >
            {c}
          </button>
        ))
      }
    </Popover>
  );
}

function Controls({ view, loading }: { view: TopicView; loading: boolean }) {
  const [q, setQ] = useState(topic);
  const [barRef, stuck] = useStuck<HTMLDivElement>();
  const dis = loading ? "text-[#a9abb6]" : "";
  return (
    <>
      <div ref={barRef} className={`sticky top-0 z-30 bg-[#f3f5f8] px-[30px] pt-[14px] pb-[17px] ${stuck ? "shadow-[0_2px_5px_rgba(25,27,35,0.14)]" : ""}`}>
        {loading && (
          <div className="mb-[25px]">
            <div className="text-[13px] leading-[13px]">Collecting content ideas for topic cards. Cards remaining: 34 of 34</div>
            <div
              className="h-[7px] rounded-full"
              style={{
                background: "repeating-linear-gradient(-45deg, #c4c7cf 0 4px, #e6e8ec 4px 8px)",
              }}
            />
          </div>
        )}
        <div className="flex h-7 items-center">
          <div className={`flex h-7 w-[178px] items-center rounded-l-md border border-[#c4c7cf] bg-white pr-2 pl-2 ${loading ? "border-[#e0e3e7]" : ""}`}>
            <input
              value={q}
              disabled={loading}
              onChange={(e) => setQ(e.target.value)}
              className={`min-w-0 flex-1 bg-transparent text-[14px] outline-none ${dis}`}
            />
            <button type="button" aria-label="Clear" onClick={() => setQ("")} className="text-[#a9abb6] hover:text-[#6c6e79]">
              <CloseIcon width={12} height={12} strokeWidth={2.4} />
            </button>
          </div>
          <Popover
            panelClassName="w-[191px]"
            trigger={({ toggle }) => (
              <button
                type="button"
                disabled={loading}
                onClick={toggle}
                className={`-ml-px flex h-7 w-[192px] items-center justify-between rounded-r-md border bg-white px-2 text-[14px] ${loading ? "border-[#e0e3e7] text-[#a9abb6]" : "border-[#c4c7cf]"}`}
              >
                United States
                <svg viewBox="0 0 16 16" width={16} height={16}>
                  <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          >
            {(close) =>
              ["United States", "United Kingdom", "Sweden", "Germany"].map((c) => (
                <MenuItem key={c} onClick={close}>
                  {c}
                </MenuItem>
              ))
            }
          </Popover>
          <input
            disabled={loading}
            placeholder="Search content on domain"
            className={`ml-3 h-7 w-[192px] rounded-md border bg-white px-2 text-[14px] outline-none placeholder:text-[#a9abb6] ${loading ? "border-[#e0e3e7]" : "border-[#c4c7cf]"}`}
          />
          <button
            type="button"
            disabled={loading}
            className={`ml-[10px] flex h-7 items-center justify-center rounded-md px-2 text-[14px] font-semibold text-white ${loading ? "w-[134px] bg-[#b3d8fb]" : "bg-[#008ff8] hover:bg-[#0071bc]"}`}
          >
            {loading ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Get content ideas"}
          </button>
          <button type="button" className="ml-auto mr-[17px] flex items-center gap-2 text-[14px] text-[#6c6e79] hover:text-rk-text">
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M5.5 4h9M5.5 8h9M5.5 12h9" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              <circle cx="2" cy="4" r="1" fill="currentColor" />
              <circle cx="2" cy="8" r="1" fill="currentColor" />
              <circle cx="2" cy="12" r="1" fill="currentColor" />
            </svg>
            Favorite Ideas
          </button>
        </div>
      </div>
      <div className="flex h-7 items-center px-[30px]">
        <ViewSwitch view={view} />
        {(view === "cards" || view === "explorer") && (
          <span className="ml-4 flex items-center gap-[5px] text-[14px]">
            <FireIco />
            Trending subtopics first
            <span className="ml-[3px]">
              <Toggle />
            </span>
          </span>
        )}
        {view === "cards" && (
          <span className="ml-auto flex items-center gap-[6px] text-[14px] text-[#484a54]">
            Prioritize topics by:
            <Prioritize />
          </span>
        )}
      </div>
    </>
  );
}

const Megaphone = ({ color }: { color: string }) => (
  <svg viewBox="0 0 14 16" width={14} height={16} className="mr-[7px] shrink-0">
    <path d="M1 5.2h3.6L11 1.5h1.6v13H11L4.6 10.8H1z" fill={color} />
    <path d="M2.6 10.8 3.8 15h2.4l-1-4.2z" fill={color} />
  </svg>
);

const SearchIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="6.8" cy="6.8" r="4.3" fill="none" stroke="currentColor" strokeWidth={1.9} />
    <path d="m10 10 4 4" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);
const Dots = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="2.5" cy="8" r="1.8" fill="currentColor" />
    <circle cx="8" cy="8" r="1.8" fill="currentColor" />
    <circle cx="13.5" cy="8" r="1.8" fill="currentColor" />
  </svg>
);

const LockIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <rect x="3" y="7" width="10" height="7.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <path d="M5.3 7V5a2.7 2.7 0 0 1 5.4 0v2" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <circle cx="8" cy="10.7" r="1.1" fill="currentColor" />
  </svg>
);
const TrelloIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="currentColor" />
    <rect x="3.8" y="3.8" width="3.4" height="8" rx=".6" fill="#fff" />
    <rect x="8.8" y="3.8" width="3.4" height="5" rx=".6" fill="#fff" />
  </svg>
);
const DocIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M3 1.8h6.5L13 5.3v8.9H3z" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M9.3 1.8v3.6H13" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" />
  </svg>
);
const HideIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M1.5 8c1.6-2.7 3.8-4 6.5-4s4.9 1.3 6.5 4c-1.6 2.7-3.8 4-6.5 4S3.1 10.7 1.5 8z" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <path d="M2 14 14 2" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

const cardActions: { label: string; icon: ReactNode; sep?: boolean }[] = [
  { label: "Get ideas on this topic", icon: <SearchIco /> },
  { label: "Create AI Content", icon: <LockIco />, sep: true },
  { label: "Send task to Trello", icon: <TrelloIco /> },
  { label: "Create SEO template", icon: <DocIco /> },
  { label: "Dismiss this card", icon: <HideIco />, sep: true },
];

function Card({ card, index, loading, active, onToggle }: { card: TopicCard; index: number; loading: boolean; active: boolean; onToggle: () => void }) {
  const lines = card.headlines.slice(0, 3);
  return (
    <div className={`overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.15)] ${active ? "h-[265px]" : "h-[263px]"}`}>
      <div className={`relative h-[79px] px-[17px] pt-[16px] ${active ? "bg-[#d7ecfd]" : "bg-[#e7f8fe] group-hover/card:bg-[#d7ecfd]"}`}>
        <div className="text-[16px] leading-[22px] font-bold">{card.title}</div>
        <div className="mt-[5px] text-[14px] leading-5">Volume: {card.volume}</div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-[14px] pt-12 pr-[18px] pl-[21px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-[10px]">
              <span className="h-4 w-4 rounded-[3px] bg-[#f0f1f4]" />
              <span className="h-2 flex-1 rounded-full bg-[#f0f1f4]" />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-[33px] pr-[25px] pl-[18px]">
          <div className="flex flex-col gap-[11px]">
            {lines.map((h, i) => (
              <a key={h} href={gsearch(h)} target="_blank" rel="noreferrer" className="flex items-center text-[13px] leading-5 text-rk-text hover:text-[#006dca]">
                <Megaphone color={i === 0 ? "#00b882" : "#2a6ed8"} />
                <span className="truncate">{h}</span>
              </a>
            ))}
          </div>
          <button
            type="button"
            data-testid={`tr-card-more-${index}`}
            onClick={onToggle}
            className={`relative left-[3px] mx-auto mt-[31px] mb-4 flex items-center gap-1 text-[13px] ${blue} group/more`}
          >
            <span className="group-hover/more:underline group-hover/more:underline-offset-[5px]">{active ? "Hide ideas" : "Show more"}</span>
            <svg viewBox="0 0 16 16" width={16} height={16} className={active ? "rotate-180" : ""}>
              <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function CardTools({ card, index, onDismiss }: { card: TopicCard; index: number; onDismiss: () => void }) {
  return (
    <div className="absolute top-[19px] right-6 flex items-center gap-[10px] text-[#6c6e79]">
      <Link href={`${routes.topicResearch}?q=${encodeURIComponent(card.title.toLowerCase())}`} aria-label="Search" className="hover:text-rk-text">
        <SearchIco />
      </Link>
      <Popover
        align="right"
        offset={9}
        panelClassName="w-[187px] -right-[1px]!"
        trigger={({ toggle }) => (
          <button
            type="button"
            data-testid={`tr-card-actions-${index}`}
            aria-label="View actions"
            onClick={toggle}
            className="group/dots relative block hover:text-rk-text"
          >
            <Dots />
            <span className="pointer-events-none absolute bottom-[calc(100%+9px)] left-1/2 z-50 hidden -translate-x-1/2 rounded-md bg-white px-3 py-3 text-[14px] leading-5 whitespace-nowrap text-rk-text shadow-popover group-hover/dots:block">
              View actions
              <span className="absolute top-full left-1/2 -mt-[5px] h-[10px] w-[10px] -translate-x-1/2 rotate-45 bg-white shadow-[2px_2px_2px_rgba(25,27,35,0.08)]" />
            </span>
          </button>
        )}
      >
        {(close) =>
          cardActions.map((a) => (
            <Fragment key={a.label}>
              {a.sep && <div className="h-px bg-[#e0e1e9]" />}
              <button
                type="button"
                onClick={() => {
                  close();
                  if (a.label === "Dismiss this card") onDismiss();
                }}
                className="flex h-8 w-full items-center gap-2 px-2 text-left text-[14px] whitespace-nowrap text-rk-text hover:bg-[#f2f4f8]"
              >
                <span className="text-rk-text">{a.icon}</span>
                {a.label}
              </button>
            </Fragment>
          ))
        }
      </Popover>
    </div>
  );
}

const toneColor: Record<IdeaTone, string> = {
  green: "#00b882",
  blue: "#0a64c2",
  light: "#4fa9e8",
  gray: "#a0a2a5",
};

const IdeaMegaphone = ({ tone }: { tone: IdeaTone }) =>
  tone === "gray" ? (
    <svg viewBox="0 0 14 16" width={14} height={16} className="mr-[5px] shrink-0">
      <path d="M1.7 5.9h3L11 2.3h.9v11.4H11L4.7 10.1h-3z" fill="none" stroke={toneColor.gray} strokeWidth={1.3} strokeLinejoin="round" />
      <path d="M3.2 10.4 4.2 14.2h1.6l-.8-3.6" fill="none" stroke={toneColor.gray} strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 14 16" width={14} height={16} className="mr-[5px] shrink-0">
      <path d="M1 5.2h3.6L11 1.5h1.6v13H11L4.6 10.8H1z" fill={toneColor[tone]} />
      <path d="M2.6 10.8 3.8 15h2.4l-1-4.2z" fill={toneColor[tone]} />
    </svg>
  );

function ideasFor(card: TopicCard): CardIdeas {
  const known = cardIdeas[card.title];
  if (known) return known;
  const n = parseFloat(card.volume) * (card.volume.endsWith("k") ? 1000 : 1);
  const tones: IdeaTone[] = ["green", "blue", "blue", "light", "gray"];
  return {
    volume: String(Math.round(n)),
    difficulty: `${(20 + (card.title.length % 9) * 3.5).toFixed(2)}%`,
    efficiency: n > 9000 ? "High" : "Medium",
    headlines: card.headlines.map((text, i) => ({
      text,
      tone: tones[i] ?? "gray",
    })),
    questions: card.questions,
  };
}

function IdeasPanel({ card, onClose }: { card: TopicCard; onClose: () => void }) {
  const d = ideasFor(card);
  const stats = [
    ["Subtopic Volume", d.volume],
    ["Difficulty", d.difficulty],
    ["Topic Efficiency", d.efficiency],
  ];
  return (
    <div data-testid="tr-ideas" className="relative z-10 mx-[29px] -mt-[7px] overflow-hidden rounded-b-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.15)]">
      <div className="flex h-[70px] items-start bg-[#dceefe] pt-[12px] pl-6">
        <div className="pt-[1px] pr-6 text-[16px] leading-[20px] font-bold">{card.title}</div>
        {stats.map(([k, v]) => (
          <div key={k} className="-mt-[1px] border-l border-[#b8cfe3] px-6 py-[1px]">
            <div className="text-[14px] leading-5 text-[#484a54]">{k}</div>
            <div className="mt-[1px] text-[16px] leading-[22px] font-bold">{v}</div>
          </div>
        ))}
        <button type="button" aria-label="Close" onClick={onClose} className="mt-[7px] mr-[20px] ml-auto text-[#8a8e9b] hover:text-rk-text">
          <CloseIcon width={14} height={14} strokeWidth={2.2} />
        </button>
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="flex h-10 items-center border-b border-[#e0e1e9] px-[22px] text-[16px] font-bold">
            Headlines
            <span className="ml-1 font-normal text-[#898d99]">{d.headlines.length}</span>
          </div>
          <div className="px-[22px] pt-[11px] pb-2">
            {d.headlines.map((h) => (
              <div key={h.text} className="flex h-[45.5px] items-center justify-between border-b border-[#d7dbe0] text-[14px] last:border-0">
                <a href={gsearch(h.text)} target="_blank" rel="noreferrer" className="relative -top-[2px] flex items-center hover:text-[#006dca]">
                  <IdeaMegaphone tone={h.tone} />
                  {h.text}
                  <span className="ml-[6px]">
                    <ExtIco />
                  </span>
                </a>
                <span className="mr-[1px] text-[#a9abb6]">
                  <AddIco />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-px bg-[#e0e1e9]" />
        <div className="flex-1">
          <div className="flex h-10 items-center border-b border-[#e0e1e9] px-[22px] text-[16px] font-bold">
            Questions
            <span className="ml-1 font-normal text-[#898d99]">{d.questions.length}</span>
          </div>
          <div className="px-[22px] pt-[11px] pb-2">
            {d.questions.map((q) => (
              <div key={q} className="flex h-[43.7px] items-center justify-between border-b border-[#d7dbe0] text-[14px] last:border-0">
                <a href={gsearch(q)} target="_blank" rel="noreferrer" className="relative -top-[2px] hover:text-[#006dca]">
                  {q}
                </a>
                <span className="mr-[1px] text-[#a9abb6]">
                  <AddIco />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsView({ loading }: { loading: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  const [gone, setGone] = useState<string[]>([]);
  const list = cards.filter((c) => !gone.includes(c.title));
  const rows: TopicCard[][] = [];
  for (let i = 0; i < list.length; i += 3) rows.push(list.slice(i, i + 3));
  return (
    <div className="mt-4">
      {rows.map((r, i) => {
        const openCard = r.find((c) => c.title === open);
        return (
          <Fragment key={i}>
            <div className={i === 0 ? "bg-[#e9effb] px-[29px] pt-[13px] pb-2" : "px-[29px] pt-[10px]"}>
              <div className="grid grid-cols-3 items-start gap-4">
                {r.map((c) => {
                  const idx = cards.indexOf(c);
                  const dismiss = () => {
                    setGone((g) => [...g, c.title]);
                    if (open === c.title) setOpen(null);
                  };
                  return (
                    <div key={c.title} className="group/card relative">
                      <Card
                        card={c}
                        index={idx}
                        loading={loading}
                        active={open === c.title}
                        onToggle={() => setOpen((o) => (o === c.title ? null : c.title))}
                      />
                      <CardTools card={c} index={idx} onDismiss={dismiss} />
                    </div>
                  );
                })}
              </div>
            </div>
            {openCard && !loading && <IdeasPanel card={openCard} onClose={() => setOpen(null)} />}
          </Fragment>
        );
      })}
    </div>
  );
}

const AddIco = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M1.5 3.5h9M1.5 7.5h9M1.5 11.5h5M12 9.5v5M9.5 12h5" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
  </svg>
);
const ExtIco = () => (
  <svg viewBox="0 0 16 16" width={14} height={14} className="shrink-0 text-[#a9abb6]">
    <path d="M9.5 2.5h4v4M13.5 2.5 8 8M12 9.5v4H2.5V4h4" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ExplorerView() {
  return (
    <div className="mx-[31px] mt-4 overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.15)]">
      <table className="w-full table-fixed text-[14px]">
        <colgroup>
          <col className="w-[201px]" />
          <col />
          <col className="w-[120px]" />
          <col className="w-[128px]" />
          <col className="w-[125px]" />
          <col className="w-[41px]" />
        </colgroup>
        <thead>
          <tr className="h-14 border-b border-[#e0e1e9] bg-[#f5f6f8] text-left align-top text-[12px] leading-4 text-[#484a54]">
            <th className="bg-[#e6e7ec] pt-3 pl-[13px] font-normal">
              <span className="flex items-center gap-1">
                Subtopic
                <svg viewBox="0 0 16 16" width={14} height={14} className="text-[#6c6e79]">
                  <path d="M2.5 4h11M2.5 8h7.5M2.5 12h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                </svg>
              </span>
            </th>
            <th className="pt-3 pl-3 font-normal">Content Idea</th>
            <th className="pt-3 pl-3 font-normal">
              Facebook
              <br />
              Engagements
            </th>
            <th className="pt-3 pr-3 text-right font-normal">Backlinks</th>
            <th className="pt-3 pr-3 text-right font-normal">Total Shares</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {explorerRows.map((r, i) => (
            <tr key={i} className="h-[61px] border-b border-[#e0e1e9] last:border-0 hover:bg-[#f7f8fa]">
              <td className="overflow-hidden pt-3 pl-[13px] align-top leading-[18px] whitespace-nowrap">{r.subtopic}</td>
              <td className="pt-3 pl-3 align-top leading-4">
                <a href={gsearch(r.title)} target="_blank" rel="noreferrer" className="block truncate hover:text-[#006dca]">
                  {r.title}
                </a>
                <span className="flex items-center gap-1 text-[#6c6e79]">
                  {r.url}
                  <ExtIco />
                </span>
              </td>
              <td className="pt-3 pr-2 text-right align-top leading-[18px]">{r.fb}</td>
              <td className="pt-3 pr-3 text-right align-top leading-[18px]">{r.backlinks}</td>
              <td className="pt-3 pr-3 text-right align-top leading-[18px]">{r.shares}</td>
              <td className="pt-3 pl-3 align-top text-[#a9abb6]">
                <button type="button" aria-label="Add to favorites" className="hover:text-[#6c6e79]">
                  <AddIco />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OverviewList({ title, items, ext, rowH }: { title: string; items: string[]; ext?: boolean; rowH: string }) {
  return (
    <div className="flex-1">
      <div className="flex h-10 items-center border-b border-[#e0e1e9] px-5 text-[16px] font-bold">{title}</div>
      <div className="px-5 pt-[11px] pb-2">
        {items.map((t) => (
          <div key={t} className={`flex ${rowH} items-center justify-between border-b border-[#d7dbe0] text-[14px] last:border-0`}>
            <a href={gsearch(t)} target="_blank" rel="noreferrer" className="relative -top-[2px] flex items-center gap-[6px] hover:text-[#006dca]">
              {t}
              {ext && <ExtIco />}
            </a>
            <span className="mr-[1px] text-[#a9abb6]">
              <AddIco />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewView() {
  return (
    <div className="mx-[29px] mt-4 flex rounded-md bg-white shadow-[0_1px_2px_rgba(25,27,35,0.15)]">
      <OverviewList title="Top 10 Headlines by backlinks" items={overviewHeadlines} ext rowH="h-[45.5px]" />
      <div className="w-px bg-[#e0e1e9]" />
      <OverviewList title="10 Interesting Questions" items={overviewQuestions} rowH="h-[43.7px]" />
    </div>
  );
}

export function TopicProject({ view, initialLoading = false }: { view: TopicView; initialLoading?: boolean }) {
  const [loading, setLoading] = useState(initialLoading);
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, [loading]);
  return (
    <div className="relative">
      {view === "mindmap" && <div className="pointer-events-none absolute top-0 left-0 h-px w-[1200px]" />}
      <FeedbackBanner />
      <ProjectHeader loading={loading} />
      <Controls view={view} loading={loading} />
      {view === "cards" && <CardsView loading={loading} />}
      {view === "explorer" && <ExplorerView />}
      {view === "overview" && <OverviewView />}
      {view === "mindmap" && <MindMap />}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { helpArticleSlugs, kbHref } from "@/features/kb/data";
import { LogoIcon } from "../icons";
import { CloseIcon } from "../ui/icons";

type View = "home" | "messages" | "tickets" | "help";

const accent = "#b98cff";

const kb = (title: string) => kbHref(helpArticleSlugs[title]);

const knowledgeBases = [
  { label: "Enterprise AIO Knowledge Base", href: kb("Create winning content") },
  { label: "Enterprise SEO Knowledge Base", href: kb("Conduct keyword research") },
  { label: "Site Intelligence Knowledge Base", href: kb("Run competitive analysis") },
];

const questions = [
  { q: "Would you like to request a demo?", href: kb("Run competitive analysis") },
  { q: "Why is my account disabled?", href: routes.account.subscription },
  { q: "Site Audit Set Up Errors FAQ", href: kb("Audit your website") },
  { q: "How do I track my rankings?", href: kb("Track your rankings") },
];

const collections = [
  { title: "Billing&Account", text: "Adjust your subscription and limits to your liking.", count: 15, href: routes.account.subscription },
  { title: "SEO", text: "Increase traffic and boost search rankings with the help of 20+ tools.", count: 119, href: kb("Conduct keyword research") },
  { title: "Traffic & Market", text: "Analyze traffic, audiences, and market trends to benchmark your performance against competitors.", count: 36, href: kb("Run competitive analysis") },
  { title: "Advertising", text: "Research your competitors’ advertising campaigns and launch your own.", count: 27, href: kb("Run competitive analysis") },
  { title: "Content", text: "Create, optimize, and repurpose content that performs across every channel.", count: 31, href: kb("Create winning content") },
  { title: "Local", text: "Manage listings and reviews, and track your local rankings on Google Maps.", count: 22, href: kb("Track your rankings") },
  { title: "AI Visibility", text: "See how your brand appears in AI search and improve your presence.", count: 18, href: kb("Create winning content") },
  { title: "Social Media", text: "Schedule posts, track competitors, and analyze your social performance.", count: 24, href: kb("Create winning content") },
];

const team = [
  { skin: "#f1d3bd", hair: "#2a211d", shirt: "#e9e3da", bg: "#d8dde3", long: true },
  { skin: "#e8bfa0", hair: "#1b1716", shirt: "#1d2533", bg: "#ffffff", long: false },
  { skin: "#f4d8c4", hair: "#d9c7a4", shirt: "#e4b73c", bg: "#c9c4a8", long: true },
];

function Avatar({ skin, hair, shirt, bg, long, size = 40 }: (typeof team)[number] & { size?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} role="img" aria-label="Support specialist" className="rounded-full">
      <circle cx="20" cy="20" r="20" fill={bg} />
      {long && <path d="M9 20c0-9 5-13 11-13s11 4 11 13v10H9z" fill={hair} />}
      <path d="M6 40c1-8 7-11 14-11s13 3 14 11z" fill={shirt} />
      <rect x="17" y="24" width="6" height="6" rx="2" fill={skin} />
      <ellipse cx="20" cy="18" rx="7" ry="8.5" fill={skin} />
      <path d={long ? "M12.5 17c0-6 3.5-9 7.5-9s7.5 3 7.5 9c-2-3-5-4-7.5-4.5-2.5.5-5.5 1.5-7.5 4.5z" : "M12.5 16c0-5 3.5-8 7.5-8s7.5 3 7.5 8c-1.5-2-4-3-7.5-3s-6 1-7.5 3z"} fill={hair} />
      <circle cx="17.3" cy="18.5" r="0.9" fill="#2b2320" />
      <circle cx="22.7" cy="18.5" r="0.9" fill="#2b2320" />
      <path d="M18 22.5c1.2.8 2.8.8 4 0" fill="none" stroke="#a0584a" strokeWidth={0.9} strokeLinecap="round" />
    </svg>
  );
}

const svg = (children: ReactNode, size = 24) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const tabs: { key: View; label: string; icon: (active: boolean) => ReactNode; badge?: ReactNode }[] = [
  {
    key: "home",
    label: "Home",
    icon: (a) =>
      svg(
        <>
          <path d="M4.5 9.5 12 4l7.5 5.5V17a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3z" fill={a ? "currentColor" : "none"} />
          <path d="M8.5 14c2 1.8 5 1.8 7 0" stroke={a ? "#fff" : "currentColor"} />
        </>,
      ),
  },
  {
    key: "messages",
    label: "Messages",
    icon: (a) =>
      svg(
        <>
          <path d="M4 5h16v11h-8l-4 3.5V16H4z" fill={a ? "currentColor" : "none"} />
          <path d="M8 9h8M8 12.5h5" stroke={a ? "#fff" : "currentColor"} />
        </>,
      ),
    badge: <span className="absolute -top-[8px] left-[14px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#e5173f] px-1 text-[11px] leading-none font-bold text-white">1</span>,
  },
  {
    key: "tickets",
    label: "Tickets",
    icon: (a) => svg(<path d="M3.5 7h17v3a2 2 0 0 0 0 4v3h-17v-3a2 2 0 0 0 0-4z" fill={a ? "currentColor" : "none"} />),
    badge: <span className="absolute -top-[5px] left-[18px] h-[7px] w-[7px] rounded-full bg-[#e5173f]" />,
  },
  {
    key: "help",
    label: "Help",
    icon: (a) =>
      a ? (
        svg(
          <>
            <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" />
            <path d="M9.6 9.5a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.8-.9 1.4v.4" stroke="#fff" strokeWidth={1.9} />
            <circle cx="12" cy="16.6" r="0.6" fill="#fff" stroke="#fff" />
          </>,
        )
      ) : (
        svg(
          <>
            <circle cx="12" cy="12" r="9.5" />
            <path d="M9.6 9.5a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.8-.9 1.4v.4" />
            <circle cx="12" cy="16.6" r="0.4" fill="currentColor" />
          </>,
        )
      ),
  },
];

const Chevron = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0" style={{ color: accent }}>
    <path d="m6.5 4.5 3.5 3.5-3.5 3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Magnifier = () => (
  <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0" style={{ color: accent }}>
    <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

const scroll = "chat-scroll";

function HomeView({ go, onClose }: { go: (v: View) => void; onClose: () => void }) {
  return (
    <div className={`h-full ${scroll}`} style={{ background: "linear-gradient(#c08fff 220px, #fafafa 360px)" }}>
      <div className="flex h-[106px] items-center pr-[21px] pl-[41px]">
        <span className="flex items-center gap-[6px] text-[13px] font-bold tracking-[-0.01em] text-[#1b1e1a]">
          <LogoIcon width={20} height={20} />
          {brand.name}
        </span>
        <div className="ml-auto flex">
          {team.map((m, i) => (
            <span key={i} className="-ml-[2px] rounded-full border-2 border-[#c08fff]">
              <Avatar {...m} size={36} />
            </span>
          ))}
        </div>
        <button type="button" aria-label="Close chat" onClick={onClose} className="ml-[26px] flex h-6 w-6 items-center justify-center text-white hover:opacity-80">
          <CloseIcon width={16} height={16} strokeWidth={1.8} />
        </button>
      </div>
      <h2 className="mt-[39px] pl-[41px] text-[28px] leading-8 font-semibold tracking-[-0.01em] text-white">
        Hi there <span className="text-[24px]">👋</span>
        <br />
        How can we help?
      </h2>
      <div className="flex flex-col gap-[11px] px-5 pt-[26px] pb-5">
        <button type="button" onClick={() => go("messages")} className="flex h-[53px] items-center justify-between rounded-xl bg-white pr-[23px] pl-[21px] text-[14px] font-semibold text-[#1a1a1a] shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:bg-[#fdfbff]">
          Send us a message
          <svg viewBox="0 0 16 16" width={16} height={16} style={{ color: accent }}>
            <path d="M3 2.5 14 8 3 13.5 5 8z" fill="currentColor" />
          </svg>
        </button>
        <div className="rounded-xl bg-white px-5 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
          {knowledgeBases.map((k, i) => (
            <Link key={k.label} href={k.href} onClick={onClose} className={`flex h-[37px] items-center justify-between pl-[1px] text-[14px] text-[#1a1a1a] hover:text-[#7a4fd6] ${i < knowledgeBases.length - 1 ? "border-b border-[#ececec]" : ""}`}>
              {k.label}
              <svg viewBox="0 0 16 16" width={16} height={16} style={{ color: accent }}>
                <path d="M9.5 2.5h4v4M13.5 2.5 8 8M11.5 9.5V13a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h3.5" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ))}
        </div>
        <div className="rounded-xl bg-white p-2 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
          <button type="button" onClick={() => go("help")} className="flex h-[39px] w-full items-center justify-between rounded-[10px] bg-[#f5f5f5] pr-3 pl-[13px] text-[14px] font-semibold text-[#1a1a1a] hover:bg-[#efefef]">
            Search for help
            <Magnifier />
          </button>
          <div className="h-[9px]" />
          {questions.map((q) => (
            <Link key={q.q} href={q.href} onClick={onClose} className="flex h-[37px] items-center justify-between pr-3 pl-[13px] text-[14px] text-[#6d6d73] hover:text-[#1a1a1a]">
              {q.q}
              <Chevron />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaneHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="relative flex h-[52px] shrink-0 items-center justify-center">
      <h2 className="text-[18px] font-semibold text-[#1a1a1a]">{title}</h2>
      <button type="button" aria-label="Close chat" onClick={onClose} className="absolute top-[14px] right-[20px] flex h-6 w-6 items-center justify-center text-[#4a4a4f] hover:text-[#1a1a1a]">
        <CloseIcon width={16} height={16} strokeWidth={1.6} />
      </button>
    </div>
  );
}

function HelpView({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const list = collections.filter((c) => !q || `${c.title} ${c.text}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="flex h-full flex-col bg-white">
      <PaneHeader title="Help" onClose={onClose} />
      <div className="shrink-0 px-[13px] pt-[1px] pb-3">
        <label className="flex h-10 items-center rounded-[10px] bg-[#f3f3f3] pr-[11px] pl-[9px]">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for help" className="min-w-0 flex-1 bg-transparent text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#1a1a1a]" />
          <Magnifier />
        </label>
      </div>
      <div className={`min-h-0 flex-1 border-t border-[#f3f3f3] ${scroll}`}>
        <div className="flex h-[52px] items-center border-b border-[#f0f0f0] pt-[1px] pl-5 text-[16px] font-semibold text-[#1a1a1a]">
          {list.length} collections
        </div>
        <div className="px-5">
          {list.map((c) => (
            <Link key={c.title} href={c.href} onClick={onClose} className="flex items-center gap-4 border-b border-[#f0f0f0] pt-[18px] pb-[15px] last:border-b-0">
              <div className="min-w-0 flex-1 text-[14px]">
                <div className="leading-5 font-semibold text-[#1a1a1a]">{c.title}</div>
                <div className="mt-[4px] text-[13.5px] leading-[21px] tracking-[-0.015em] text-[#1a1a1a]">{c.text}</div>
                <div className="mt-[4px] leading-5 text-[#6d6d73]">{c.count} articles</div>
              </div>
              <Chevron />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesView({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  return (
    <div className="flex h-full flex-col bg-white">
      <PaneHeader title="Messages" onClose={onClose} />
      <div className={`min-h-0 flex-1 border-t border-[#f3f3f3] px-5 pt-4 ${scroll}`}>
        <div className="flex items-start gap-3">
          <Avatar {...team[1]} size={32} />
          <div>
            <div className="text-[12px] text-[#6d6d73]">{brand.name} Support · Support specialist</div>
            <div className="mt-1 rounded-xl bg-[#f3f3f3] px-3 py-2 text-[14px] leading-5 text-[#1a1a1a]">Hi there! Ask us anything, or share some feedback.</div>
          </div>
        </div>
        {sent.map((m, i) => (
          <div key={i} className="mt-3 ml-auto w-fit max-w-[80%] rounded-xl px-3 py-2 text-[14px] leading-5 text-white" style={{ background: accent }}>
            {m}
          </div>
        ))}
      </div>
      <form
        className="flex shrink-0 items-center gap-2 border-t border-[#f0f0f0] px-4 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) setSent((s) => [...s, draft.trim()]);
          setDraft("");
        }}
      >
        <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message…" className="h-10 min-w-0 flex-1 rounded-[10px] bg-[#f3f3f3] px-3 text-[14px] outline-none" />
        <button type="submit" aria-label="Send" className="flex h-10 w-10 items-center justify-center" style={{ color: accent }}>
          <svg viewBox="0 0 16 16" width={16} height={16}>
            <path d="M3 2.5 14 8 3 13.5 5 8z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  );
}

function TicketsView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <PaneHeader title="Tickets" onClose={onClose} />
      <div className="flex flex-1 flex-col items-center justify-center border-t border-[#f3f3f3] px-10 text-center">
        <div className="text-[16px] font-semibold text-[#1a1a1a]">No tickets</div>
        <p className="mt-1 text-[14px] leading-5 text-[#6d6d73]">Tickets you open with our support team will appear here.</p>
      </div>
    </div>
  );
}

export function SupportChat({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("home");
  return (
    <aside
      role="dialog"
      aria-label="Support chat"
      data-testid="support-chat"
      className="fixed right-5 bottom-[84px] z-[100] flex h-[min(704px,calc(100vh-104px))] w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_5px_40px_rgba(0,0,0,0.16)]"
    >
      <div className="min-h-0 flex-1">
        {view === "home" ? (
          <HomeView go={setView} onClose={onClose} />
        ) : view === "help" ? (
          <HelpView onClose={onClose} />
        ) : view === "messages" ? (
          <MessagesView onClose={onClose} />
        ) : (
          <TicketsView onClose={onClose} />
        )}
      </div>
      <nav className="flex h-[79px] shrink-0 border-t border-[#f0f0f0] bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.03)]">
        {tabs.map((t) => {
          const active = t.key === view;
          return (
            <button
              key={t.key}
              type="button"
              aria-label={t.label}
              aria-pressed={active}
              onClick={() => setView(t.key)}
              className="flex flex-1 flex-col items-center pt-[18px] text-[14px] leading-5"
              style={{ color: active ? accent : "#6d6d73" }}
            >
              <span className="relative" style={{ color: active ? accent : "#4a4a4f" }}>
                {t.icon(active)}
                {t.badge}
              </span>
              <span className="mt-[6px]">{t.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

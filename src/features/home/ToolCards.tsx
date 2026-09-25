"use client";

import Link from "next/link";
import { useRef, useState, type ComponentType, type SVGProps } from "react";
import { routes } from "@/config/routes";
import {
  CardAdIcon,
  CardAiIcon,
  CardAiPrIcon,
  CardContentIcon,
  CardLocalIcon,
  CardSocialIcon,
  CardTrafficIcon,
  ChevronRightIcon,
} from "@/components/icons";

type Card = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  fg: string;
  bg: string;
  href: string;
  featured?: boolean;
};

const cards: Card[] = [
  {
    title: "Traffic & Market",
    href: routes.traffic.home,
    description: "Track competitors, analyze markets, uncover growth opportunities.",
    icon: CardTrafficIcon,
    fg: "#5465ff",
    bg: "#eceefe",
    featured: true,
  },
  {
    title: "AI Visibility",
    href: routes.ai.overview,
    description: "Get discovered in ChatGPT, Google AI, and other AI search engines.",
    icon: CardAiIcon,
    fg: "#a35cf6",
    bg: "#f3ecfe",
  },
  {
    title: "Local",
    href: routes.local.start,
    description: "Manage reviews, boost local search visibility, track local competitors.",
    icon: CardLocalIcon,
    fg: "#ff7a00",
    bg: "#fff1e0",
  },
  {
    title: "Content",
    href: routes.content.dashboard,
    description: "Create SEO-friendly content with AI and competitive data.",
    icon: CardContentIcon,
    fg: "#00b596",
    bg: "#dcf9f1",
  },
  {
    title: "Advertising",
    href: routes.ad.home,
    description: "Research competitors, launch and optimize Google and Meta ads.",
    icon: CardAdIcon,
    fg: "#f2a900",
    bg: "#fff5d4",
  },
  {
    title: "AI PR",
    href: routes.aipr.dashboard,
    description: "Get your brand featured in the media and cited by AI answers.",
    icon: CardAiPrIcon,
    fg: "#ff5a79",
    bg: "#ffe9ed",
  },
  {
    title: "Social",
    href: routes.social.dashboard,
    description: "Plan, publish and analyze posts across social networks.",
    icon: CardSocialIcon,
    fg: "#2bb3ff",
    bg: "#e9f7ff",
  },
];

export function ToolCards() {
  const scroller = useRef<HTMLDivElement>(null);
  const [badge, setBadge] = useState(true);

  return (
    <div className="group relative mt-6 max-xl:mt-[26px]">
      <div ref={scroller} className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth">
        {cards.map(({ title, description, icon: Icon, fg, bg, href, featured }) => (
          <Link
            key={title}
            href={href}
            className={`relative h-[128px] shrink-0 rounded-lg bg-white pt-4 pr-4 pl-[13px] shadow-card transition-shadow hover:shadow-[var(--intergalactic-box-shadow-card-hover)] ${
              featured ? "w-[320px]" : "w-[248px]"
            }`}
          >
            {featured && badge && (
              <span className="absolute top-0 right-0 flex h-[23px] items-center gap-[7px] rounded-tr-lg rounded-bl-md rounded-tl-sm bg-[#9d5cf6] pr-[9px] pl-[9px] text-[12px] font-medium text-white">
                For you
                <span
                  role="button"
                  aria-label="Dismiss"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setBadge(false);
                  }}
                  className="flex h-3 w-3 items-center justify-center hover:opacity-80"
                >
                  <svg viewBox="0 0 12 12" width={10} height={10}>
                    <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            )}
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md"
                style={{ background: bg, color: fg }}
              >
                <Icon width={24} height={24} />
              </span>
              <span className="text-[14px] font-medium text-[#1b1e1a]">{title}</span>
            </div>
            <p className="mt-2 text-[14px] leading-5 text-[#484a49]">{description}</p>
          </Link>
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-[42px] bg-gradient-to-r from-[#f3f5f5]/0 to-[#f3f5f5] xl:block" />
      <button
        aria-label="Next"
        onClick={() => scroller.current?.scrollBy({ left: 256, behavior: "smooth" })}
        className="absolute top-1/2 right-[-8px] flex h-7 w-7 max-xl:opacity-0 max-xl:group-hover:opacity-100 -translate-y-1/2 items-center justify-center rounded-full border border-[#d6d8d7] bg-white text-[#1b1e1a] shadow-card hover:bg-[#f5f6f6]"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

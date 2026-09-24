"use client";

import { useRef, type ComponentType, type SVGProps } from "react";
import {
  CardAdIcon,
  CardAiIcon,
  CardAiPrIcon,
  CardContentIcon,
  CardLocalIcon,
  CardSocialIcon,
  CardTrafficIcon,
  ChevronRightIcon,
} from "./icons";

type Card = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  fg: string;
  bg: string;
  featured?: boolean;
};

const cards: Card[] = [
  {
    title: "Traffic & Market",
    description: "Track competitors, analyze markets, uncover growth opportunities.",
    icon: CardTrafficIcon,
    fg: "#5465ff",
    bg: "#eceefe",
    featured: true,
  },
  {
    title: "AI Visibility",
    description: "Get discovered in ChatGPT, Google AI, and other AI search engines.",
    icon: CardAiIcon,
    fg: "#a35cf6",
    bg: "#f3ecfe",
  },
  {
    title: "Local",
    description: "Manage reviews, boost local search visibility, track local competitors.",
    icon: CardLocalIcon,
    fg: "#ff7a00",
    bg: "#fff1e0",
  },
  {
    title: "Content",
    description: "Create SEO-friendly content with AI and competitive data.",
    icon: CardContentIcon,
    fg: "#00b596",
    bg: "#dcf9f1",
  },
  {
    title: "Advertising",
    description: "Research competitors, launch and optimize Google and Meta ads.",
    icon: CardAdIcon,
    fg: "#f2a900",
    bg: "#fff5d4",
  },
  {
    title: "AI PR",
    description: "Get your brand featured in the media and cited by AI answers.",
    icon: CardAiPrIcon,
    fg: "#ff5a79",
    bg: "#ffe9ed",
  },
  {
    title: "Social",
    description: "Plan, publish and analyze posts across social networks.",
    icon: CardSocialIcon,
    fg: "#2bb3ff",
    bg: "#e9f7ff",
  },
];

export function ToolCards() {
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <div className="relative mt-6">
      <div ref={scroller} className="no-scrollbar flex gap-2 overflow-x-auto scroll-smooth">
        {cards.map(({ title, description, icon: Icon, fg, bg, featured }) => (
          <a
            key={title}
            href="#"
            className={`relative h-[128px] shrink-0 rounded-lg bg-white pt-4 pr-4 pl-[13px] shadow-card transition-shadow hover:shadow-[var(--intergalactic-box-shadow-card-hover)] ${
              featured ? "w-[320px]" : "w-[248px]"
            }`}
          >
            {featured && (
              <span className="absolute top-0 right-0 flex h-[22px] w-16 items-center justify-center rounded-tr-lg rounded-bl-md rounded-tl-sm bg-[#9d5cf6] text-[12px] font-medium text-white">
                For you
              </span>
            )}
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-md"
                style={{ background: bg, color: fg }}
              >
                <Icon />
              </span>
              <span className="text-[14px] font-medium text-[#191b23]">{title}</span>
            </div>
            <p className="mt-2 text-[14px] leading-5 text-[#484a54]">{description}</p>
          </a>
        ))}
      </div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[42px] bg-gradient-to-r from-[#f4f5f9]/0 to-[#f4f5f9]" />
      <button
        aria-label="Next"
        onClick={() => scroller.current?.scrollBy({ left: 256, behavior: "smooth" })}
        className="absolute top-1/2 right-[-8px] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#c4c7cf] bg-white text-[#191b23] shadow-card hover:bg-[#f4f5f9]"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

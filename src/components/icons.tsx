import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LogoIcon = (p: P) => (
  <svg viewBox="0 0 32 24" width={32} height={24} {...p}>
    <path
      fill="currentColor"
      d="M2.5 14.2c2.8-4.9 8.4-7.9 15.6-7.9 3.3 0 6.4.7 9.1 1.9-2.4.2-4.2 1-5 2.1 3 .2 5.8 1.3 7.8 3.1-4.2-.5-8.3.4-11.4 2.6-3.2 2.3-7.4 3.4-11.2 2.6 2-.5 3.5-1.5 4.2-2.8-3.3.9-6.6.4-9.1-1.6z"
    />
  </svg>
);

export const SeoIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M17.6 10.6a7 7 0 1 0-2.1 5" />
      <path d="m6.8 12.2 2.6-2.7 2.3 2.2 4.1-4" />
      <path d="m15.5 15.6 4.8 4.8" />
    </g>
  </svg>
);

export const AiIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M12 3.5c.5 3.2 2.1 4.8 5.3 5.3-3.2.5-4.8 2.1-5.3 5.3-.5-3.2-2.1-4.8-5.3-5.3 3.2-.5 4.8-2.1 5.3-5.3z" />
      <path d="m5 15.5 3.5 2.5M19 15.5 15.5 18M7 20.5h10" />
    </g>
  </svg>
);

export const TrafficIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M3.5 20.5h17" />
      <path d="M5.5 20.5v-8h4v8M10 20.5V4.5h4v16M14.5 20.5v-10h4v10" />
    </g>
  </svg>
);

export const LocalIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M12 21s-6.5-5.8-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.2" />
    </g>
  </svg>
);

export const ContentIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M4.5 16.5v-12h11" />
      <path d="M8.5 8.5h11v12h-11z" />
    </g>
  </svg>
);

export const AdIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M19.4 11.2A8 8 0 1 0 11.2 19.4" />
      <path d="M15.4 10.6a4 4 0 1 0-4.8 4.8" />
      <path d="m12.5 12.5 7.5 2.8-3.2 1.5-1.5 3.2z" />
    </g>
  </svg>
);

export const AiPrIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M4 9.5h3l5-4.5v14l-5-4.5H4z" />
      <path d="M15 9.5c.7.7 1 1.5 1 2.5s-.3 1.8-1 2.5" />
    </g>
    <circle cx="19.5" cy="7.5" r="1.1" fill="currentColor" />
    <circle cx="19.5" cy="16.5" r="1.1" fill="currentColor" />
  </svg>
);

export const SocialIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <path
      {...stroke}
      d="M12 20.5a8.5 8.5 0 1 0-7.4-4.3L3.5 20.5l4.3-1.1A8.5 8.5 0 0 0 12 20.5z"
    />
    <circle cx="8" cy="12" r="1.1" fill="currentColor" />
    <circle cx="12" cy="12" r="1.1" fill="currentColor" />
    <circle cx="16" cy="12" r="1.1" fill="currentColor" />
  </svg>
);

export const ReportsIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M3.5 5.5h17v13h-17z" />
      <path d="m3.5 16.5 5-5 3.5 3.5 3-3 5.5 5" />
    </g>
  </svg>
);

export const AppsIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...stroke}>
      <path d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z" />
    </g>
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...stroke} d="M8 2.5v11M2.5 8h11" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...stroke} strokeWidth={1.8} d="m3.5 6 4.5 4.5L12.5 6" />
  </svg>
);

export const ChevronRightIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...stroke} strokeWidth={1.8} d="m6 3.5 4.5 4.5L6 12.5" />
  </svg>
);

export const ChevronUpDownIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...stroke} strokeWidth={1.6} d="m4.5 5.5 3.5-3.5 3.5 3.5M4.5 10.5 8 14l3.5-3.5" />
  </svg>
);

export const ShareUserIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...stroke} strokeWidth={1.4}>
      <circle cx="6" cy="5.5" r="2.5" />
      <path d="M1.5 13.5c.4-2.6 2.2-4 4.5-4s4.1 1.4 4.5 4M12.5 6.5v4M10.5 8.5h4" />
    </g>
  </svg>
);

export const KebabIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="3" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="13" r="1.4" fill="currentColor" />
  </svg>
);

export const FeedbackIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...stroke} strokeWidth={1.4} d="M2.5 2.5h11v8.5H6l-3.5 3z" />
  </svg>
);

export const TranslateIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...stroke} strokeWidth={1.3}>
      <path d="M1.5 3.5h7M5 2v1.5M3 3.5c.6 2.4 2.3 4.2 4.5 5M7 3.5C6.5 6 4.6 8 2 9" />
      <path d="m8 14.5 3-7 3 7M9 12.2h4" />
    </g>
  </svg>
);

export const CardTrafficIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path fill="currentColor" d="M3 9h3.5v8H3zM8.3 3h3.5v14H8.3zM13.5 7h3.5v10h-3.5z" />
  </svg>
);

export const CardAiIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...p}>
    <g {...stroke} strokeWidth={1.8}>
      <path d="M12 3.5c.5 3.2 2.1 4.8 5.3 5.3-3.2.5-4.8 2.1-5.3 5.3-.5-3.2-2.1-4.8-5.3-5.3 3.2-.5 4.8-2.1 5.3-5.3z" />
      <path d="m5 15.5 3.5 2.5M19 15.5 15.5 18M7 20.5h10" />
    </g>
  </svg>
);

export const CardLocalIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...p}>
    <path
      {...stroke}
      strokeWidth={2}
      d="M12 21s-6.5-5.8-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z"
    />
    <circle cx="12" cy="9.8" r="2.6" fill="currentColor" />
  </svg>
);

export const CardContentIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...p}>
    <g {...stroke} strokeWidth={2}>
      <path d="M4.5 16.5v-12h11" />
      <path d="M8.5 8.5h11v12h-11z" />
    </g>
  </svg>
);

export const CardAdIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...p}>
    <g {...stroke} strokeWidth={2}>
      <path d="M19.4 11.2A8 8 0 1 0 11.2 19.4" />
      <path d="M15.4 10.6a4 4 0 1 0-4.8 4.8" />
      <path d="m12.5 12.5 7.5 2.8-3.2 1.5-1.5 3.2z" />
    </g>
  </svg>
);

export const CardAiPrIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...p}>
    <g {...stroke} strokeWidth={2}>
      <path d="M4 9.5h3l5-4.5v14l-5-4.5H4z" />
      <path d="M15 9.5c.7.7 1 1.5 1 2.5s-.3 1.8-1 2.5" />
    </g>
  </svg>
);

export const CardSocialIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={20} height={20} {...p}>
    <path
      {...stroke}
      strokeWidth={2}
      d="M12 20.5a8.5 8.5 0 1 0-7.4-4.3L3.5 20.5l4.3-1.1A8.5 8.5 0 0 0 12 20.5z"
    />
  </svg>
);

export const RkjhFavicon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="0.5" y="1.5" width="15" height="13" rx="3" fill="#191b23" />
    <path d="M3.5 1.5h9a3 3 0 0 1 3 3V8H.5V4.5a3 3 0 0 1 3-3z" fill="#e8132b" />
  </svg>
);

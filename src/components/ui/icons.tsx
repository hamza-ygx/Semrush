import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const I = (d: string, vb = 16) =>
  function Icon(p: P) {
    return (
      <svg viewBox={`0 0 ${vb} ${vb}`} width={16} height={16} {...p}>
        <path {...s} d={d} />
      </svg>
    );
  };

export const CloseIcon = I("M3.5 3.5l9 9M12.5 3.5l-9 9");
export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="7" cy="7" r="4.5" {...s} strokeWidth={1.8} />
    <path d="m10.5 10.5 3.5 3.5" {...s} strokeWidth={2} />
  </svg>
);
export const ChevronDown = I("m4 6 4 4 4-4");
export const ChevronRight = I("m6 4 4 4-4 4");
export const ChevronLeft = I("m10 4-4 4 4 4");
export const ChevronsLeft = I("m8 4-4 4 4 4M13 4 9 8l4 4");
export const ChevronsRight = I("m8 4 4 4-4 4M3 4l4 4-4 4");
export const ArrowLeft = I("M13 8H3m4-4L3 8l4 4");
export const ArrowRight = I("M3 8h10M9 4l4 4-4 4");
export const ArrowUp = I("M8 13V3M4 7l4-4 4 4");
export const ArrowDown = I("M8 3v10M4 9l4 4 4-4");
export const PlusIcon = I("M8 2.5v11M2.5 8h11");
export const CheckIcon = I("m3 8.5 3 3 7-7");
export const HamburgerIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <path {...s} strokeWidth={2} d="M3 5h18M3 12h18M3 19h18" />
  </svg>
);
export const ExternalIcon = I("M9 3h4v4M13 3 7.5 8.5M11 9.5V13H3V5h3.5");
export const ExportIcon = I("M8 10V2.5M5 5.5l3-3 3 3M2.5 9v4.5h11V9");
export const ShareIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.4}>
      <circle cx="6" cy="5.5" r="2.5" />
      <path d="M1.5 13.5c.4-2.6 2.2-4 4.5-4s4.1 1.4 4.5 4M12.5 6.5v4M10.5 8.5h4" />
    </g>
  </svg>
);
export const FeedbackIcon = I("M2.5 2.5h11v8.5H6l-3.5 3z");
export const BookIcon = I("M8 4.5c-1.5-1.3-3.5-1.8-5.5-1.5v9.5c2-.3 4 .2 5.5 1.5 1.5-1.3 3.5-1.8 5.5-1.5V3c-2-.3-4 .2-5.5 1.5zM8 4.5V14M4.5 6h1.5M4.5 8.5h1.5M10 6h1.5M10 8.5h1.5");
export const RefreshIcon = I("M13 8a5 5 0 1 1-1.5-3.5M13 2.5V5h-2.5");
export const ClockIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="6" {...s} strokeWidth={1.3} />
    <path d="M8 4.5V8l2.5 1.5" {...s} strokeWidth={1.3} />
  </svg>
);
export const GearIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="2.2" {...s} strokeWidth={1.4} />
    <path
      {...s}
      strokeWidth={1.4}
      d="M6.8 1.8h2.4l.4 1.7 1.2.7 1.7-.5 1.2 2.1-1.3 1.2v1.4l1.3 1.2-1.2 2.1-1.7-.5-1.2.7-.4 1.7H6.8l-.4-1.7-1.2-.7-1.7.5-1.2-2.1L3.6 8.7V7.3L2.3 6.1l1.2-2.1 1.7.5 1.2-.7z"
    />
  </svg>
);
export const KebabIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="3" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="13" r="1.4" fill="currentColor" />
  </svg>
);
export const DotsIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="3" cy="8" r="1.5" fill="currentColor" />
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <circle cx="13" cy="8" r="1.5" fill="currentColor" />
  </svg>
);
export const InfoIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <text x="8" y="12.5" textAnchor="middle" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fill="currentColor">
      i
    </text>
  </svg>
);
export const WarningIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M8 1.8 15 14H1z" fill="none" stroke="#f57600" strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M8 6.2v3.8" stroke="#f57600" strokeWidth={1.6} strokeLinecap="round" />
    <circle cx="8" cy="12" r=".9" fill="#f57600" />
  </svg>
);
export const DesktopIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} d="M2 3h12v8H2zM6 14h4M8 11v3" />
  </svg>
);
export const MobileIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} d="M4.5 1.5h7v13h-7zM7 12.2h2" />
  </svg>
);
export const LanguageIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.3}>
      <path d="M1.5 3.5h7M5 2v1.5M3 3.5c.6 2.4 2.3 4.2 4.5 5M7 3.5C6.5 6 4.6 8 2 9" />
      <path d="m8 14.5 3-7 3 7M9 12.2h4" />
    </g>
  </svg>
);

export const FlagSE = (p: P) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <rect width="16" height="12" rx="1.5" fill="#006aa7" />
    <path d="M5 0h2.4v12H5zM0 4.8h16v2.4H0z" fill="#fecc00" />
  </svg>
);
export const FlagUS = (p: P) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <rect width="16" height="12" rx="1.5" fill="#fff" />
    <path d="M0 0h16v1.7H0zM0 3.4h16v1.7H0zM0 6.9h16v1.7H0zM0 10.3h16V12H0z" fill="#d22f27" />
    <rect width="7.5" height="6.9" fill="#1e50a0" />
  </svg>
);
export const FlagUK = (p: P) => (
  <svg viewBox="0 0 16 12" width={16} height={12} {...p}>
    <rect width="16" height="12" rx="1.5" fill="#1e50a0" />
    <path d="M0 0l16 12M16 0 0 12" stroke="#fff" strokeWidth="2.4" />
    <path d="M0 0l16 12M16 0 0 12" stroke="#d22f27" strokeWidth=".9" />
    <path d="M8 0v12M0 6h16" stroke="#fff" strokeWidth="3.4" />
    <path d="M8 0v12M0 6h16" stroke="#d22f27" strokeWidth="1.8" />
  </svg>
);
export const GlobeIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="7" fill="#6c6e79" />
    <path d="M3.5 5.5c1.5.5 2.5 1.8 2.3 3.2-.2 1.2 1 1.6 1 2.8M9.5 1.5c-.5 1.3.2 2.3 1.5 2.5 1.2.2 1.8 1.2 1.2 2.5M11 10c.8.2 1.8.8 2.5 1.5" stroke="#fff" strokeWidth="1.2" fill="none" />
  </svg>
);

export const GoogleIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M15.5 8.2c0-.6-.1-1.1-.2-1.6H8v3h4.2a3.6 3.6 0 0 1-1.6 2.4v2h2.6c1.5-1.4 2.3-3.4 2.3-5.8z" fill="#4285f4" />
    <path d="M8 16c2.2 0 4-.7 5.3-2l-2.6-2c-.7.5-1.6.8-2.7.8-2.1 0-3.9-1.4-4.5-3.3H.8v2.1A8 8 0 0 0 8 16z" fill="#34a853" />
    <path d="M3.5 9.5a4.8 4.8 0 0 1 0-3V4.4H.8a8 8 0 0 0 0 7.2z" fill="#fbbc04" />
    <path d="M8 3.2c1.2 0 2.2.4 3 1.2l2.3-2.3A8 8 0 0 0 .8 4.4l2.7 2.1C4.1 4.6 5.9 3.2 8 3.2z" fill="#ea4335" />
  </svg>
);
export const ChatGptIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g fill="none" stroke="currentColor" strokeWidth="1.1">
      <path d="M6.3 5.5V3.6a2.4 2.4 0 0 1 4.6-.9 2.4 2.4 0 0 1 2.6 3.5 2.4 2.4 0 0 1-1.4 4.1" />
      <path d="M9.7 5.5 11.4 6.5a2.4 2.4 0 0 1 .4 4.7 2.4 2.4 0 0 1-4.4 1.8 2.4 2.4 0 0 1-4.2-.6" />
      <path d="M10.4 9.6 8.7 10.6a2.4 2.4 0 0 1-4.1-2.3 2.4 2.4 0 0 1-.2-4.2 2.4 2.4 0 0 1 2.8-2.9" />
      <path d="M6.3 5.5 8 4.5l1.7 1v2l-1.7 1-1.7-1z" />
    </g>
  </svg>
);
export const GeminiIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <defs>
      <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4f8ff7" />
        <stop offset="1" stopColor="#9b6cf0" />
      </linearGradient>
    </defs>
    <path d="M8 1c.5 3.6 2.4 5.5 7 7-4.6 1.5-6.5 3.4-7 7-.5-3.6-2.4-5.5-7-7 4.6-1.5 6.5-3.4 7-7z" fill="url(#gem)" />
  </svg>
);

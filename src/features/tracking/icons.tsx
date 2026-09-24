import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const BellIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} d="M3.5 11.8V7.2a4.5 4.5 0 0 1 9 0v4.6l1.3 1.2H2.2zM6.3 15h3.4" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.6} strokeLinecap="butt" d="M2.5 3.5h11v10h-11zM2.5 6.8h11M5.3 1.5v3M10.7 1.5v3" />
  </svg>
);

export const LookerIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8.3" cy="10" r="3.4" fill="none" stroke="#4285f4" strokeWidth={1.8} />
    <circle cx="6.2" cy="3.6" r="1.6" fill="#34a853" />
    <circle cx="8.8" cy="1.9" r="1" fill="#fbbc04" />
    <circle cx="4.4" cy="5.8" r="1" fill="#ea4335" />
  </svg>
);

export const CopyIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.4} d="M5.5 5.5h8v8h-8zM3 11V2.5h8.5" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
);

export const NoteIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} d="M2 2.5h12v9H6.5L2 14.5z" />
  </svg>
);

export const SortIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} strokeLinecap="butt" d="M2 4h12M2 8h8M2 12h4" />
  </svg>
);

export const SortAscIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.5} strokeLinecap="butt" d="M2 3.5h4M2 7.5h7M2 11.5h11" />
  </svg>
);

export const SparkleIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path fill="#8a3fcf" d="M6.5 1.5 7.8 5.4 11.5 6.8 7.8 8.2 6.5 12 5.2 8.2 1.5 6.8 5.2 5.4z" />
    <path fill="#b56ef0" d="M12 9l.7 1.9 1.8.6-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.6z" />
  </svg>
);

export const XBoldIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={2.2} strokeLinecap="butt" d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
  </svg>
);

export const ChevronBold = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={2} d="m4 6 4 4 4-4" />
  </svg>
);

export const ExternalLinkIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.4} strokeLinecap="butt" d="M9 2.5h4.5V7M13.5 2.5 7 9M11.5 9.5v4h-9v-9h4" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path fill="currentColor" d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
  </svg>
);

export const HotelIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path fill="currentColor" d="M3 4h10v11H9.5v-3h-3v3H3zm2 2v1.5h1.5V6zm2.3 0v1.5h1.4V6zm2.2 0v1.5H11V6zM5 8.8v1.5h1.5V8.8zm2.3 0v1.5h1.4V8.8zm2.2 0v1.5H11V8.8zM1 13h1.5v2H1zm12.5 0H15v2h-1.5zM5.5 1h1.3v2H5.5zm3.7 0h1.3v2H9.2z" />
  </svg>
);

export const DiamondIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path fill="currentColor" d="M8 .8 15.2 8 8 15.2.8 8zm0 3.6L4.4 8 8 11.6 11.6 8z" />
  </svg>
);

export const JobIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path fill="currentColor" d="M5.5 2h5v2H14v10H2V4h3.5zm1.3 1.3V4h2.4v-.7zM3.3 5.3v2.4h9.4V5.3zm0 3.7v3.7h9.4V9H9v1H7V9z" />
  </svg>
);

export const RadioOn = (p: P) => (
  <svg viewBox="0 0 18 18" width={18} height={18} {...p}>
    <circle cx="9" cy="9" r="8" fill="#fff" stroke="#191b23" strokeWidth={1} />
    <circle cx="9" cy="9" r="8" fill="none" stroke="#191b23" strokeWidth={1} />
    <circle cx="9" cy="9" r="5" fill="#191b23" />
    <circle cx="9" cy="9" r="2.5" fill="#fff" />
  </svg>
);

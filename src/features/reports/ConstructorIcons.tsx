import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const PieIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <path d="M10.5 4.2A8.5 8.5 0 1 0 19.8 13.5H10.5z" />
      <path d="M13.5 2.5v8h8a8 8 0 0 0-8-8z" />
    </g>
  </svg>
);

export const PlugIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <path d="M6.5 17.5 4 20M13 5l2.5-2.5M19 11l2.5-2.5M9 8.5l6.5 6.5-2.3 2.3a4.6 4.6 0 0 1-6.5-6.5z" />
      <path d="M13 8.5 16 5.5M15.5 11 18.5 8" />
    </g>
  </svg>
);

export const ImageIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1" />
      <path d="m3.5 17 5-5 4 4 2.5-2.5 5.5 5" />
      <circle cx="15.5" cy="9" r="1.6" />
    </g>
  </svg>
);

export const BrushIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <path d="M4 20c2.5 0 4-1 4.5-3l8.5-8.5-2.5-2.5L6 14.5c-2 .5-2 3.5-2 5.5z" />
      <path d="m12.5 8 2.5 2.5M18.5 13.5v5M16 16h5M19 3.5v3M17.5 5h3" />
    </g>
  </svg>
);

export const HomeIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} d="M2.5 7.5 8 2.5l5.5 5v6h-11z" />
  </svg>
);

export const PencilIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.4} d="M2.5 13.5l.8-3.3 7.5-7.5 2.5 2.5-7.5 7.5zM9.5 4l2.5 2.5M8 13.5h5.5" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.4}>
      <rect x="2.5" y="3.5" width="11" height="10" rx="1" />
      <path d="M2.5 7h11M5.5 2v3M10.5 2v3" />
    </g>
  </svg>
);

export const WarnIcon = (p: P) => (
  <svg viewBox="0 0 18 18" width={18} height={18} {...p}>
    <path d="M9 2.2 16.5 15.5h-15z" fill="none" stroke="#f08a24" strokeWidth={1.6} strokeLinejoin="round" />
    <path d="M9 7v4" stroke="#f08a24" strokeWidth={1.6} strokeLinecap="round" />
    <circle cx="9" cy="13.1" r="0.95" fill="#f08a24" />
  </svg>
);

export const GearIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.3}>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1.8l1.2 1.4 1.8-.3.6 1.7 1.7.6-.3 1.8L14.2 8l-1.2 1.2.3 1.8-1.7.6-.6 1.7-1.8-.3L8 14.2l-1.2-1.2-1.8.3-.6-1.7-1.7-.6.3-1.8L1.8 8 3 6.8l-.3-1.8 1.7-.6.6-1.7 1.8.3z" />
    </g>
  </svg>
);

export const DiamondIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M4 2.5h8l3 4-7 7.5L1 6.5z" fill="#2fa7f3" />
    <path d="M1 6.5h14L8 14z" fill="#1b7fd6" />
    <path d="M4 2.5 6 6.5h4l2-4" fill="#7fd0ff" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="m8 1.5 2 4.2 4.5.6-3.3 3.1.8 4.5L8 11.7l-4 2.2.8-4.5L1.5 6.3 6 5.7z" fill="currentColor" />
  </svg>
);

export const HeadingIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.3} d="M3 3.5h10M8 3.5v10" />
  </svg>
);

export const TextIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path {...s} strokeWidth={1.3} d="M2.5 4h11M2.5 8h11M2.5 12h7" />
  </svg>
);

export const ColumnsIcon = ({ n, ...p }: P & { n: 2 | 3 }) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.2}>
      <rect x="1.5" y="2.5" width="13" height="11" />
      {n === 2 ? <path d="M8 2.5v11" /> : <path d="M5.8 2.5v11M10.2 2.5v11" />}
    </g>
  </svg>
);

export const ScissorsIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.2}>
      <circle cx="3.5" cy="4" r="1.8" />
      <circle cx="3.5" cy="12" r="1.8" />
      <path d="M5 5l9 7M5 11l9-7" />
    </g>
  </svg>
);

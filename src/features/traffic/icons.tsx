import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const GeoIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <circle cx="8" cy="8" r="6.6" fill="none" stroke="currentColor" strokeWidth={1.6} />
    <path d="M2.2 6.2c1.6-.4 3 .3 3.3 1.6.3 1.2-.6 1.7-.3 2.8.3.9 1.2 1.2 1.3 2.8M9.2 1.8c-.6 1.2-.2 2.4 1 2.7 1.3.3 1.4 1.5.8 2.4-.7 1-.1 2.2 1.1 2.3.9.1 1.6.5 2.1 1.1" fill="none" stroke="currentColor" strokeWidth={1.5} />
    <path d="M9.4 2c-.4 1 0 2 1 2.3 1.2.3 1.3 1.4.7 2.3-.6.9-.1 2 1 2.1l2.3 1A6.6 6.6 0 0 0 9.4 2ZM2.3 6.3c1.5-.3 2.9.3 3.2 1.5.3 1.2-.6 1.7-.3 2.8.2.8 1 1.2 1.2 2.5A6.6 6.6 0 0 1 2.3 6.3Z" fill="currentColor" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="2" y="3" width="12" height="11" rx="1.2" {...s} />
    <path d="M2 7h12M5 1.5v3M11 1.5v3" {...s} />
  </svg>
);

export const TrendIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M1.8 1.8v12.4h12.4" {...s} />
    <path d="m4 11 3.2-4 2.6 2.6L14 4.5" {...s} />
  </svg>
);

export const DevicesIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M2 11.5V2.8h9.5M1 11.5h5" {...s} />
    <rect x="8" y="5.5" width="6.5" height="9" rx="1" {...s} />
    <path d="M11.2 12.3h.1" {...s} strokeWidth={2} />
  </svg>
);

export const RobotIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <rect x="2.5" y="5" width="11" height="8.5" rx="1.5" {...s} />
    <path d="M8 5V2.5M1 8.5v2.5M15 8.5v2.5" {...s} />
    <circle cx="8" cy="2" r="1" fill="currentColor" />
    <path d="M6 8.3v1.2M10 8.3v1.2M6.2 11.4h3.6" {...s} />
  </svg>
);

export const SparkleIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M6.5 3.5 7.6 7l3.4 1.1-3.4 1.1-1.1 3.4-1.1-3.4L2 8.1 5.4 7ZM12.2 1l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z" fill="currentColor" />
  </svg>
);

export const ManualIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M1.5 2.5h5c.8 0 1.5.7 1.5 1.5v10c0-.8-.7-1.3-1.5-1.3h-5ZM14.5 2.5h-5c-.8 0-1.5.7-1.5 1.5v10c0-.8.7-1.3 1.5-1.3h5Z" {...s} strokeWidth={1.4} />
    <path d="M3.5 5.5h2M3.5 8h2M10.5 5.5h2M10.5 8h2" {...s} strokeWidth={1.4} />
  </svg>
);

export const DownloadIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M8 2v8M4.5 6.8 8 10.3l3.5-3.5M2.5 13.5h11" {...s} />
  </svg>
);

export const BellOffIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M4.3 6.3A3.8 3.8 0 0 1 11.6 5M11.8 7.6v1.8l1.4 2.3H5.2M4.3 7.2v2.2L2.8 11.7h1M6.5 13.6c.3.5.9.9 1.5.9s1.2-.4 1.5-.9M2 14 14 2" {...s} strokeWidth={1.4} />
  </svg>
);

export const SmallChevron = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="m4 6 4 4 4-4" {...s} strokeWidth={2} />
  </svg>
);

export const CheckSmall = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="m4.5 8.3 2.3 2.3 4.7-4.9" {...s} strokeWidth={1.8} />
  </svg>
);

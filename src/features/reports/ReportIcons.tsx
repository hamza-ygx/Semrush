import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const SparkleIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M11 3.5c.4 2.6 1.7 3.9 4.3 4.3-2.6.4-3.9 1.7-4.3 4.3-.4-2.6-1.7-3.9-4.3-4.3 2.6-.4 3.9-1.7 4.3-4.3z" fill="#6a73f0" />
    <path d="M15.6 11.8c.2 1.1.8 1.7 1.9 1.9-1.1.2-1.7.8-1.9 1.9-.2-1.1-.8-1.7-1.9-1.9 1.1-.2 1.7-.8 1.9-1.9z" fill="#8f96f5" />
    <path d="M3 16.5l3-2.5 1.8 1.5L10 13" fill="none" stroke="#6a73f0" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GaIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="12.5" y="3" width="4" height="14" rx="2" fill="#f9ab00" />
    <rect x="7.5" y="8.5" width="4" height="8.5" rx="2" fill="#e37400" />
    <circle cx="4.5" cy="15" r="2" fill="#e37400" />
  </svg>
);

export const GscIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="3" y="3.5" width="14" height="11" rx="1.5" fill="#fff" stroke="#8b8d8c" strokeWidth={1.2} />
    <rect x="3" y="3.5" width="14" height="3" rx="1.2" fill="#4285f4" />
    <circle cx="10" cy="11" r="3.2" fill="#fff" stroke="#34a853" strokeWidth={1.5} />
    <path d="M12.4 13.3l2.6 2.6" stroke="#ea4335" strokeWidth={1.8} strokeLinecap="round" />
    <path d="M4 17.5h12" stroke="#fbbc04" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const TrafficBarsIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path fill="#00a67e" d="M4 9h3v7H4zM8.5 4h3v12h-3zM13 7h3v9h-3z" />
  </svg>
);

export const MegaphoneIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M4 8h2.5l5-3.5v11l-5-3.5H4z" fill="#00a67e" />
    <path d="M6 12l1 3.5h2L8 12" fill="#00a67e" />
    <path d="M14 7.5c.8.7 1.2 1.5 1.2 2.5s-.4 1.8-1.2 2.5" fill="none" stroke="#00a67e" strokeWidth={1.4} strokeLinecap="round" />
  </svg>
);

export const GoogleGIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M17.6 10.2c0-.6-.1-1.1-.2-1.6H10v3h4.3a3.7 3.7 0 0 1-1.6 2.4v2h2.6c1.5-1.4 2.3-3.4 2.3-5.8z" fill="#4285f4" />
    <path d="M10 18c2.2 0 4-.7 5.3-2l-2.6-2c-.7.5-1.6.8-2.7.8a4.7 4.7 0 0 1-4.4-3.3H2.9v2.1A8 8 0 0 0 10 18z" fill="#34a853" />
    <path d="M5.6 11.5a4.8 4.8 0 0 1 0-3V6.4H2.9a8 8 0 0 0 0 7.2z" fill="#fbbc04" />
    <path d="M10 5.2c1.2 0 2.3.4 3.2 1.2l2.3-2.3A8 8 0 0 0 2.9 6.4l2.7 2.1C6.2 6.6 8 5.2 10 5.2z" fill="#ea4335" />
  </svg>
);

export const MatomoIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M3 14l4-6 3 4" fill="none" stroke="#3152a0" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 12l3-4 4 6" fill="none" stroke="#35bfc0" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="8" r="1.8" fill="#95c748" />
    <circle cx="13" cy="8" r="1.8" fill="#f38334" />
  </svg>
);

export const FirebaseIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M4 16l2-13 3.5 6.5z" fill="#ffa000" />
    <path d="M4 16l8.5-9.5L16 16l-6 3.3z" fill="#ffca28" />
    <path d="M4 16l5.5-6.5L10 19.3z" fill="#f57c00" />
  </svg>
);

const g = "#009f81";
const line = { fill: "none", stroke: g, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const LinkIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path {...line} d="M8 6.5H6.5a3.5 3.5 0 0 0 0 7H8M12 6.5h1.5a3.5 3.5 0 0 1 0 7H12M7 10h6" />
  </svg>
);

export const PulseIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path {...line} d="M3 10.5h3l2-4 3 8 2-4.5h4" />
  </svg>
);

export const HeartPulseIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M10 16.5 4 10.8A3.6 3.6 0 0 1 10 5.6a3.6 3.6 0 0 1 6 5.2z" fill="none" stroke="#f0454f" strokeWidth={1.8} strokeLinejoin="round" />
    <path d="M5 10.2h2.5l1.3-1.8 2.2 3 1.4-1.7H15" fill="none" stroke="#f0454f" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const DocIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="4.5" y="3" width="11" height="14" rx="1.3" fill="none" stroke={g} strokeWidth={1.8} />
    <path d="M7.5 7h5M7.5 10h5M7.5 13h3" stroke={g} strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

export const RankListIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path {...line} d="M9 5h8M9 10h8M9 15h8" />
    <path d="M4.5 3.5v3M3.6 9h1.8l-1.8 2h1.8M3.6 13.5h1.8l-.9 1 .9 1.2H3.6" fill="none" stroke={g} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SearchGreenIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <circle cx="8.5" cy="8.5" r="4" fill="none" stroke={g} strokeWidth={2} />
    <path d="m11.5 11.5 4 4" stroke={g} strokeWidth={2.2} strokeLinecap="round" />
  </svg>
);

export const TelescopeIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M3.5 11.5 14 4.5l2 3-10.5 7z" fill={g} />
    <path {...line} d="M10 12l-3 4.5M10 12l3 4.5M10 12v-1" />
  </svg>
);

export const AdBarsIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" fill="none" stroke={g} strokeWidth={1.7} />
    <path d="M7 13.5v-3M10 13.5v-6M13 13.5v-4.5" stroke={g} strokeWidth={1.8} />
  </svg>
);

export const RankCamIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="3" y="5.5" width="14" height="10.5" rx="2" fill="none" stroke={g} strokeWidth={1.8} />
    <path d="M7 5.5V4h6v1.5" fill="none" stroke={g} strokeWidth={1.6} />
    <circle cx="10" cy="10.7" r="1.7" fill={g} />
  </svg>
);

export const GoogleAdsIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path d="M7.6 4.2 3.3 11.7" stroke="#fbbc04" strokeWidth={3.6} strokeLinecap="round" />
    <path d="M9.2 4.2l4.6 8" stroke="#4285f4" strokeWidth={3.6} strokeLinecap="round" />
    <circle cx="4.6" cy="14.2" r="2" fill="#34a853" />
  </svg>
);

export const MetaIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <path
      d="M3 11.8c0-2.6 1.3-4.8 3-4.8 1.6 0 2.7 1.6 4 3.8 1.3 2.2 2.3 3.6 3.6 3.6 1.3 0 2.2-1.2 2.2-2.8 0-2.3-1.2-4.6-3-4.6-1.2 0-2.1 1-2.8 2.1M9.2 9.6C8 7.8 7.2 7 6 7M3 11.8c0 1.6.8 2.6 2 2.6 1.4 0 2.4-1.5 4.2-4.8"
      fill="none"
      stroke="#0a7cff"
      strokeWidth={1.7}
      strokeLinecap="round"
    />
  </svg>
);

export const FacebookGreenIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <circle cx="10" cy="10" r="6.5" fill={g} />
    <path d="M10.8 16.3v-4.6h1.5l.3-1.8h-1.8V8.8c0-.5.2-.9.9-.9h1V6.3a9 9 0 0 0-1.4-.1c-1.5 0-2.4.9-2.4 2.4v1.3H7.3v1.8h1.6v4.6z" fill="#fff" />
  </svg>
);

export const LinkedInIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" fill="#0a66c2" />
    <path d="M6.3 8.6v5.2M6.3 6.3v.2M9 13.8V8.6M9 11c0-1.6.9-2.5 2-2.5s1.8.7 1.8 2.2v3.1" fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

export const GbpIcon = (p: P) => (
  <svg viewBox="0 0 20 20" width={20} height={20} {...p}>
    <rect x="4" y="4" width="12" height="12" rx="1.5" fill="#4989f5" />
    <path d="M4 4.5h12v3a2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-4 0z" fill="#3c4ba6" />
    <circle cx="12.3" cy="12.2" r="1.8" fill="none" stroke="#fff" strokeWidth={1.1} />
  </svg>
);

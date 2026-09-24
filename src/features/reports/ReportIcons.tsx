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
    <rect x="3" y="3.5" width="14" height="11" rx="1.5" fill="#fff" stroke="#8a8e9b" strokeWidth={1.2} />
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

import type { ReactNode } from "react";
import type { AppLogo as Logo } from "./data";

const tile = (bg: string, children: ReactNode) => (
  <>
    <rect x="1" y="1" width="34" height="34" rx="6" fill={bg} />
    {children}
  </>
);

const logos: Record<Logo, ReactNode> = {
  callrail: (
    <>
      <path d="M18 2a16 16 0 1 1-10.5 28.1L2.5 33l1.8-6.2A16 16 0 0 1 18 2z" fill="#1a6fd8" />
      <path d="M11 13v10M14.5 11v14M18 16h12M18 20h12" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
    </>
  ),
  serpgap: tile(
    "#4b56e8",
    <>
      <path d="M10 10l7 9 9-11-4 14-5 5-3-6z" fill="#ffc83d" />
      <path d="M17 19l9-11-4 14z" fill="#ff5ea8" />
      <path d="M10 10l7 9-3 2z" fill="#39d98a" />
    </>,
  ),
  adclarity: (
    <>
      <path d="M7 15l9 7 12-9" fill="none" stroke="#7a3fe0" strokeWidth={2.4} strokeLinecap="round" />
      <circle cx="7" cy="15" r="3.4" fill="#7a3fe0" />
      <circle cx="16" cy="22" r="3.8" fill="#6a2fd0" />
      <circle cx="28.5" cy="13" r="3.4" fill="#8f55f0" />
    </>
  ),
  influencer: (
    <>
      <circle cx="8.5" cy="11" r="2.4" fill="#6d5cf6" />
      <rect x="6.3" y="15" width="4.4" height="12" rx="1" fill="#191b23" />
      <path d="M21 14.5a6.4 6.4 0 1 0 0 12.8h9.5V21A6.5 6.5 0 0 0 21 14.5zm0 4.1a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z" fill="#191b23" />
    </>
  ),
  exploding: (
    <>
      <path d="M5 26l8-8 5 4 11-11" fill="none" stroke="#2f7de1" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10h8v8" fill="none" stroke="#2f7de1" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  llmgap: tile(
    "#8fd1b3",
    <>
      <path d="M18 9l7.5 13h-15z" fill="#0b0d0f" />
      <circle cx="11" cy="24" r="4.2" fill="#0b0d0f" />
      <circle cx="25" cy="24" r="4.2" fill="#0b0d0f" />
    </>,
  ),
  crazyegg: (
    <>
      <path d="M18 3c5 0 8 6 8 11.5S22.4 24 18 24s-8-4-8-9.5S13 3 18 3z" fill="#9bd229" />
      <circle cx="18" cy="13" r="4.5" fill="#fff" />
      <path d="M20 11.5a2.6 2.6 0 1 0 0 3" fill="none" stroke="#9bd229" strokeWidth={1.6} />
      <path d="M15.5 25h5l-1 8h-3z" fill="#c9e84a" />
    </>
  ),
  voiceassist: tile(
    "#7b4df0",
    <>
      <path
        d="M11 11.5c0-.8.7-1.5 1.5-1.5h2l1.5 4-2 1.5a9 9 0 0 0 4.5 4.5l1.5-2 4 1.5v2c0 .8-.7 1.5-1.5 1.5C16.8 23 11 17.2 11 11.5z"
        fill="none"
        stroke="#fff"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <path d="M24 8l.9 2.1L27 11l-2.1.9L24 14l-.9-2.1L21 11l2.1-.9z" fill="#fff" />
    </>,
  ),
  aimarketing: tile("#0d2320", <path d="M12 9h6.5a9 9 0 0 1 0 18H12z" fill="#2de0b5" />),
  aivideo: tile(
    "#2a2d4a",
    <>
      <path d="M9 10l12 8-12 8z" fill="#ff6a3d" />
      <circle cx="21.5" cy="18" r="7.5" fill="#2f7cff" />
      <path d="M19.5 14.5l6 3.5-6 3.5z" fill="#fff" />
    </>,
  ),
  backlinkbuilder: tile(
    "#2d2bb8",
    <path d="M12 9h7.5a5.5 5.5 0 0 1 1.6 10.8L25 27h-5l-3.4-6.6H16V27h-4zm4 3.6v4.5h3.2a2.25 2.25 0 0 0 0-4.5z" fill="#fff" />,
  ),
  websitetesting: (
    <>
      <rect x="5" y="10" width="26" height="17" rx="8.5" fill="#9aa7b6" />
      <rect x="8" y="12.5" width="20" height="12" rx="6" fill="#dfe6ee" />
      <circle cx="13.5" cy="18.5" r="3.4" fill="#fff" stroke="#51606f" strokeWidth={1.4} />
      <circle cx="22.5" cy="18.5" r="3.4" fill="#fff" stroke="#51606f" strokeWidth={1.4} />
      <circle cx="13.5" cy="18.5" r="1.3" fill="#1f2a36" />
      <circle cx="22.5" cy="18.5" r="1.3" fill="#1f2a36" />
      <path d="M8 10l-2-3M28 10l2-3" stroke="#7c8998" strokeWidth={1.6} strokeLinecap="round" />
    </>
  ),
  mobileinsights: (
    <>
      <path d="M29 6c-6 0-11 4-14 10l5 5c6-3 10-8 10-14z" fill="#0b0d0f" />
      <path d="M15 16l-6 .5-3 4 6 1zM20 21l-.5 6-4 3-1-6z" fill="#0b0d0f" />
      <circle cx="23" cy="13" r="2" fill="#fff" />
      <path d="M11 24l-4 6 6-4" fill="none" stroke="#0b0d0f" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  socialcontent: (
    <>
      <path d="M4 16c6-2 10-1 14 4 3-5 8-8 14-8-5 2-9 7-12 14-3-6-8-9-16-10z" fill="#e2345a" />
      <path d="M4 16c6-2 10-1 14 4-1 2-1.5 4-2 6-2-5-6-8-12-10z" fill="#2f7de1" />
    </>
  ),
  brandmonitoring: tile(
    "#6b5cf6",
    <path d="M10 15h4l8-5v16l-8-5h-4zM14 21l1.5 5" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />,
  ),
  adcreative: (
    <>
      <path d="M18 5l11 6v14l-11 6-11-6V11z" fill="#c2188a" />
      <path d="M7 11l11 6 11-6-11-6z" fill="#ff4fa6" />
      <path d="M7 18l11 6 11-6" fill="none" stroke="#e02a90" strokeWidth={1.2} />
      <path d="M18 17v14" stroke="#9c0f6c" strokeWidth={1} />
    </>
  ),
};

export function AppLogo({ logo }: { logo: Logo }) {
  return (
    <svg viewBox="0 0 36 36" width={36} height={36} className="shrink-0" aria-hidden>
      {logos[logo]}
    </svg>
  );
}

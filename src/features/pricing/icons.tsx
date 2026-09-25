import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const CrownIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <path d="M4 8.5 8.2 12 12 6l3.8 6L20 8.5 18.6 17H5.4z" />
      <path d="M5 20h14" />
    </g>
  </svg>
);

export const EnterpriseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <rect x="3.5" y="4.5" width="17" height="15" />
      <path d="M7 16.5v-6.5h10v6.5M7 16.5h10M9.5 13h5" />
    </g>
  </svg>
);

export const AppCenterIcon = (p: P) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      <rect x="4" y="4" width="6.5" height="6.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" />
    </g>
  </svg>
);

export const ExternalArrow = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <g {...s} strokeWidth={1.7}>
      <path d="M9.5 2.5h4v4M13.5 2.5 7.5 8.5M12 9.5v4H2.5V4h4" />
    </g>
  </svg>
);

export const Check = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="m3 8.4 3.2 3.1L13 4.6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Sparkle = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <defs>
      <linearGradient id="pr-sparkle" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#8b5cf6" />
        <stop offset="1" stopColor="#4f8dfd" />
      </linearGradient>
    </defs>
    <path d="M6 4.5c.4 2.6 1.4 3.6 4 4-2.6.4-3.6 1.4-4 4-.4-2.6-1.4-3.6-4-4 2.6-.4 3.6-1.4 4-4z" fill="url(#pr-sparkle)" />
    <path d="M12 1.5c.2 1.3.7 1.8 2 2-1.3.2-1.8.7-2 2-.2-1.3-.7-1.8-2-2 1.3-.2 1.8-.7 2-2z" fill="url(#pr-sparkle)" />
  </svg>
);

export const PlusThin = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
  </svg>
);

export const Chevron = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LongArrow = ({ dir, ...p }: P & { dir: "left" | "right" }) => (
  <svg viewBox="0 0 44 16" width={44} height={16} {...p}>
    <path
      d={dir === "left" ? "M43 8H2M8 2 2 8l6 6" : "M1 8h41M36 2l6 6-6 6"}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AddonIcon = ({ name, ...p }: P & { name: string }) => (
  <svg viewBox="0 0 24 24" width={24} height={24} {...p}>
    <g {...s}>
      {name === "users" && (
        <>
          <circle cx="9.5" cy="8" r="3.5" />
          <path d="M3.5 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2M15 4.8a3.4 3.4 0 0 1 0 6.4M17.5 14.6c1.6.7 2.7 2.4 3 4.9" />
        </>
      )}
      {name === "megaphone" && <path d="M4 9.5h3.5L17 4.5v15l-9.5-5H4zM7.5 14.5l1.5 5M20 10v4" />}
      {name === "report" && <path d="M6 3.5h12v17H6zM9 8h6M9 11h6M9 14h6M9 17h4" />}
      {name === "reportPro" && <path d="M4.5 5.5h11v15h-11zM7.5 3.5h11v15M7.5 9.5h5M7.5 12.5h5M7.5 15.5h5" />}
    </g>
  </svg>
);

export const MenuLines = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M1.5 3h13M1.5 13h13" fill="none" stroke="currentColor" strokeWidth={2} />
  </svg>
);

export const SocialIcon = ({ name, ...p }: P & { name: string }) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...p}>
    {name === "linkedin" && <path d="M3 8.5h4V21H3zM5 2.5a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6zM9.5 8.5h3.8v1.7c.6-1 1.9-2 4-2 4 0 4.7 2.6 4.7 6V21h-4v-6c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V21h-4z" />}
    {name === "instagram" && (
      <path
        fillRule="evenodd"
        d="M7.5 2.5h9a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3zM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zM17.3 5.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"
      />
    )}
    {name === "tiktok" && <path d="M13 2.5h3.3c.3 2.4 1.8 4 4.2 4.2V10c-1.6 0-3-.5-4.2-1.3v6.8a6 6 0 1 1-6-6h.6v3.4H10.3a2.6 2.6 0 1 0 2.7 2.6z" />}
    {name === "youtube" && <path fillRule="evenodd" d="M2.8 7.2c.2-1.4 1.2-2.4 2.6-2.5C7.5 4.5 9.8 4.4 12 4.4s4.5.1 6.6.3c1.4.1 2.4 1.1 2.6 2.5.2 1.6.3 3.2.3 4.8s-.1 3.2-.3 4.8c-.2 1.4-1.2 2.4-2.6 2.5-2.1.2-4.4.3-6.6.3s-4.5-.1-6.6-.3c-1.4-.1-2.4-1.1-2.6-2.5-.2-1.6-.3-3.2-.3-4.8s.1-3.2.3-4.8zM10 8.8v6.4l5.5-3.2z" />}
    {name === "facebook" && <path d="M13.5 21.5v-8h2.7l.4-3.2h-3.1V8.4c0-.9.3-1.6 1.6-1.6h1.7V4a22 22 0 0 0-2.5-.1c-2.4 0-4.1 1.5-4.1 4.2v2.2H7.5v3.2h2.7v8z" />}
    {name === "x" && <path d="M3 3h5.2l4.3 6 5.2-6h2.1l-6.4 7.4L20.9 21h-5.2l-4.6-6.4L5.5 21H3.4l6.8-7.8zm3 1.5 10.4 15h1.6L7.6 4.5z" />}
  </svg>
);

export const LlmChip = ({ size = 18, count = 4 }: { size?: number; count?: number }) => {
  const logos = [
    <g key="g">
      <path d="M17.6 10.2H10v3.3h4.4c-.4 2-2.1 3.1-4.4 3.1a4.9 4.9 0 0 1 0-9.8c1.2 0 2.3.4 3.2 1.2l2.4-2.4A8.3 8.3 0 1 0 10 18.3c4.2 0 7.9-3 7.9-8.3 0-.6 0-1.2-.3-1.8z" fill="#4285f4" />
      <path d="M2.7 6.4 5.5 8.5A4.9 4.9 0 0 1 10 5.1c1.2 0 2.3.4 3.2 1.2l2.4-2.4A8.3 8.3 0 0 0 2.7 6.4z" fill="#ea4335" />
      <path d="M10 18.3c2.2 0 4.1-.7 5.5-2l-2.6-2.2c-.8.6-1.8 1-2.9 1a4.9 4.9 0 0 1-4.6-3.4l-2.8 2.1A8.3 8.3 0 0 0 10 18.3z" fill="#34a853" />
      <path d="M5.4 11.7a5 5 0 0 1 0-3.2L2.6 6.4a8.3 8.3 0 0 0 0 7.4z" fill="#fbbc05" />
    </g>,
    <path key="c" d="M10 2.5a3.6 3.6 0 0 1 3.5 2.6 3.6 3.6 0 0 1 3.6 5 3.6 3.6 0 0 1-2 5.5 3.6 3.6 0 0 1-6 1.8 3.6 3.6 0 0 1-5.3-3.3 3.6 3.6 0 0 1 .3-6.2A3.6 3.6 0 0 1 10 2.5zM7 7v6l3 1.7 3-1.7V7l-3-1.7z" fill="none" stroke="#6b6b6b" strokeWidth="1.2" />,
    <path key="p" d="M10 2v16M4 6l6 4 6-4M4 6v7l6 4 6-4V6M4 10h12" fill="none" stroke="#20808d" strokeWidth="1.3" />,
    <path key="m" d="M10 2c.6 4.4 3.6 7.4 8 8-4.4.6-7.4 3.6-8 8-.6-4.4-3.6-7.4-8-8 4.4-.6 7.4-3.6 8-8z" fill="#4f7dfb" />,
    <path key="a" d="M4 16 10 4l6 12M6.5 11h7" fill="none" stroke="#d97757" strokeWidth="1.8" />,
    <path key="d" d="M5 10a5 5 0 1 0 10 0 5 5 0 0 0-10 0zm3-1.5h4" fill="none" stroke="#111" strokeWidth="1.6" />,
  ];
  return (
    <span className="inline-flex items-center">
      {logos.slice(0, count).map((l, i) => (
        <span key={i} className="-mr-[5px] flex items-center justify-center rounded-full bg-white" style={{ width: size + 2, height: size + 2 }}>
          <svg viewBox="0 0 20 20" width={size} height={size}>
            {l}
          </svg>
        </span>
      ))}
    </span>
  );
};

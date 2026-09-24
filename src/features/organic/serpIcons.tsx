import type { ReactNode } from "react";

const st = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const paths: Record<string, ReactNode> = {
  pin: (
    <>
      <path {...st} d="M8 14.5s-4.8-4.3-4.8-8a4.8 4.8 0 0 1 9.6 0c0 3.7-4.8 8-4.8 8z" />
      <circle cx="8" cy="6.5" r="1.8" fill="currentColor" />
    </>
  ),
  crown: <path {...st} d="M2.5 5.5 5.5 8 8 3.5 10.5 8l3-2.5-1.2 7H3.7zM4 14h8" />,
  link: <path {...st} d="M6.5 9.5 9.5 6.5M7 4.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M9 11.5l-1 1a2.8 2.8 0 0 1-4-4l1-1" />,
  spark: <path d="M8 1.5c.6 3.4 2.2 5.4 6.5 6.5-4.3 1.1-5.9 3.1-6.5 6.5C7.4 11.1 5.8 9.1 1.5 8 5.8 6.9 7.4 4.9 8 1.5z" fill="currentColor" />,
  question: (
    <>
      <circle {...st} cx="8" cy="8" r="6.2" />
      <path {...st} d="M6.3 6.3a1.8 1.8 0 1 1 2.4 1.7c-.5.2-.7.6-.7 1.1v.4" />
      <circle cx="8" cy="11.4" r=".8" fill="currentColor" />
    </>
  ),
  star: <path d="m8 1.8 1.9 4 4.3.5-3.2 3 .9 4.3L8 11.5l-3.9 2.1.9-4.3-3.2-3 4.3-.5z" fill="currentColor" />,
  indent: <path {...st} d="M2.5 3h11v3.5h-11zM5.5 9.5h8V13h-8zM3 6.5v4.8h2.5" />,
  news: <path {...st} d="M3 2.5h8l2 2v9H3zM5.5 6h5M5.5 8.5h5M5.5 11h3" />,
  image: (
    <>
      <rect {...st} x="2.5" y="2.5" width="11" height="11" rx="1" />
      <path {...st} d="m3 12 3.5-4 2.5 3 1.5-1.5L13 12" />
      <circle cx="10.5" cy="5.5" r="1" fill="currentColor" />
    </>
  ),
  imagePack: (
    <>
      <rect {...st} x="2.5" y="2.5" width="11" height="11" rx="1" />
      <path {...st} d="M2.5 9.5h6v4M8.5 2.5v7M10.5 5h1.5" />
    </>
  ),
  play: (
    <>
      <circle {...st} cx="8" cy="8" r="6.2" />
      <path d="M6.5 5.3v5.4L10.8 8z" fill="currentColor" />
    </>
  ),
  playBox: (
    <>
      <rect {...st} x="2" y="3" width="12" height="10" rx="1" />
      <path d="M6.5 5.8v4.4L10 8z" fill="currentColor" />
    </>
  ),
  paa: (
    <>
      <path {...st} d="M3 2.5h10v9H7.5L5 14v-2.5H3z" />
      <path {...st} d="M6.8 5.4a1.3 1.3 0 1 1 1.7 1.2c-.3.1-.5.4-.5.8" />
      <circle cx="8" cy="9.3" r=".7" fill="currentColor" />
    </>
  ),
  cap: <path {...st} d="M1.5 6.5 8 3.5l6.5 3L8 9.5zM4 8v3.5c1 1 2.5 1.5 4 1.5s3-.5 4-1.5V8M14.5 6.5v4" />,
  stories: <path {...st} d="M3.5 2.5h7v11h-7zM10.5 4.5h2v9h-9M5.5 5h3M5.5 7.5h3M5.5 10h3" />,
  fork: <path {...st} d="M3.5 2v4c0 1 .7 1.7 1.5 1.7S6.5 7 6.5 6V2M5 2v12M11 14V2c-1.5 1-2.5 3-2.5 5.5H11" />,
  bag: <path {...st} d="M2 5.5h12v8H2zM5.5 5.5V3.5h5v2M2 9h12M7 9v1.5h2V9" />,
  calendar: <path {...st} d="M2.5 3.5h11v10h-11zM2.5 6.5h11M5.5 2v3M10.5 2v3M6.5 10l1 1 2-2.5" />,
  hotel: <path {...st} d="M2 13.5V5M2 9.5h12v4M6 9.5V7.5h6a2 2 0 0 1 2 2M4 8.2a.8.8 0 1 0 0-1.6" />,
  plane: <path {...st} d="M14 2 2 7l4.5 1.5M14 2l-4 12-3.5-5.5M14 2 6.5 8.5" />,
  address: <path {...st} d="M2.5 3h7M2.5 6h11M2.5 9h9M2.5 12h5M11 11.5l1.5 1.5 2-2.5" />,
  cart: <path {...st} d="M1.5 2.5h2l1.5 8h7.5l1.5-5.5H4.3M6 13.5h.1M11.5 13.5h.1" />,
  cartDots: <path {...st} d="M1.5 2.5h2l1.5 8h7.5l1.5-5.5H4.3M5 13.5h.1M8.5 13.5h.1M12 13.5h.1" />,
  funnel: <path {...st} d="M2 2.5h12L9.5 8v5.5l-3-1.5V8z" />,
  seeResults: <path {...st} d="M3 2.5h8l2 2v9H3zM5.5 6h5M5.5 8.5h3M9 11l1.2 1.2 2.3-2.7" />,
  carousel: <path {...st} d="M4.5 3h7v10h-7zM2 5v6M14 5v6M6.5 6h3M6.5 8.5h3" />,
  ad: (
    <>
      <rect {...st} x="2" y="3.5" width="12" height="9" rx="1" />
      <text x="8" y="10.4" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="currentColor">
        AD
      </text>
    </>
  ),
  adBottom: (
    <>
      <path {...st} d="M3 2.5h10M3 5h10" />
      <rect {...st} x="2" y="7.5" width="12" height="6.5" rx="1" />
      <text x="8" y="12.6" textAnchor="middle" fontSize="4.8" fontWeight="700" fill="currentColor">
        AD
      </text>
    </>
  ),
  pas: <path {...st} d="M2.5 2.5h11v11h-11zM5 5.5h6M5 8h6M5 10.5h4" />,
  related: <path {...st} d="M2.5 3.5h3M7.5 3.5h6M2.5 6.5h3M7.5 6.5h6M2.5 9.5h3M7.5 9.5h6M2.5 12.5h3M7.5 12.5h6" />,
  x: <path d="M9.4 7 14 1.8h-1.1l-4 4.5-3.2-4.5H2l4.8 6.9L2 14.2h1.1l4.2-4.8 3.4 4.8h3.7zm-1.5 1.7-.5-.7L3.5 2.6h1.7l3.1 4.4.5.7 4.1 5.8h-1.7z" fill="currentColor" />,
  list: <path {...st} d="M2.5 3.5 3.5 4.5 5 3M7 4h6.5M2.5 8l1 1L5 7.5M7 8.5h6.5M2.5 12.5l1 1L5 12M7 13h6.5" />,
  folder: <path {...st} d="M2 4V3h4.5l1.5 1.5h6V13H2zM2 6.5h12" />,
  chat: <path {...st} d="M2.5 3h11v8.5H7l-3 2.5v-2.5H2.5z" />,
  tag: (
    <>
      <path {...st} d="M8.5 2H14v5.5l-6.5 6.5L2 8.5z" />
      <circle cx="11" cy="5" r="1" fill="currentColor" />
    </>
  ),
  findResults: (
    <>
      <circle {...st} cx="8" cy="8" r="6" />
      <path {...st} d="m5.5 8 1.8 1.8L10.8 6.3" />
    </>
  ),
  bullets: <path {...st} d="M3 4h.1M3 8h.1M3 12h.1M6 4h7.5M6 8h7.5M6 12h7.5" />,
};

export function SerpIcon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      {paths[name] ?? paths.news}
    </svg>
  );
}

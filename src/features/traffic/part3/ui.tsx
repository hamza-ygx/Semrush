import type { ReactNode, SVGProps } from "react";
import { FlagUK, FlagUS } from "@/components/ui/icons";
import { WorldMap } from "@/features/domain/WorldMap";
import type { Cat, EmpIcon, Social } from "./data";

type P = SVGProps<SVGSVGElement>;

const st = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const Tri = ({ c, v = true }: { c: string[]; v?: boolean }) => (
  <svg viewBox="0 0 16 12" width={16} height={12} className="shrink-0">
    {c.map((x, i) => (v ? <rect key={i} x={(16 / 3) * i} width={16 / 3 + 0.1} height="12" fill={x} /> : <rect key={i} y={4 * i} width="16" height="4.1" fill={x} />))}
  </svg>
);

export function Flag({ code }: { code: string }) {
  if (code === "US") return <FlagUS width={16} height={12} className="shrink-0" />;
  if (code === "UK") return <FlagUK width={16} height={12} className="shrink-0" />;
  if (code === "FR") return <Tri c={["#1f3ea6", "#fff", "#e1242b"]} />;
  if (code === "DE") return <Tri c={["#1a1a1a", "#dd0000", "#ffce00"]} v={false} />;
  return (
    <svg viewBox="0 0 16 12" width={16} height={12} className="shrink-0">
      <rect width="16" height="12" fill="#c60b1e" />
      <rect y="3" width="16" height="6" fill="#ffc400" />
      <rect x="3.5" y="4.6" width="2.4" height="2.8" fill="#c60b1e" opacity=".7" />
    </svg>
  );
}

export const SortIcon = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M3 4.5h10M3 8h7M3 11.5h4" {...st} strokeWidth={1.3} />
  </svg>
);

export const LinkOut = (p: P) => (
  <svg viewBox="0 0 16 16" width={16} height={16} {...p}>
    <path d="M9.5 2.5h4v4M13.5 2.5 7.5 8.5M11.5 9.5v4h-9v-9h4" {...st} strokeWidth={1.3} />
  </svg>
);

const catPaths: Record<Cat, string> = {
  shop: "M4 6.5h8l.8 7H3.2zM6 6.5V5a2 2 0 0 1 4 0v1.5M6.5 9.5h3",
  cart: "M1.5 2.5h2l1.3 8h7.5l1.2-6H4.2M6 13.5h.1M11.5 13.5h.1",
  laptop: "M3 4h10v6.5H3zM1.5 12.5h13",
  plane: "M6 13.5 7.5 9 3 7.5l-1-1 1-.7 5 .8 3-3c1-1 2.5-1 2.5 0s0 1.5-1 2.5l-3 3 .8 5-.7 1-1-1L7.5 9M3.5 11.5l1.5 1",
  luggage: "M4.5 4.5h7v9h-7zM6.5 4.5v-2h3v2M6.5 7v4M9.5 7v4",
  music: "M6 12V3.5l7-1.5v8.5M6 12a1.8 1.8 0 1 1-1.8-1.8M13 10.5a1.8 1.8 0 1 1-1.8-1.8",
  video: "M2.5 3.5h11v9h-11zM7 6v4l3-2z",
  news: "M3 2.5h8l2 2v9H3zM5.5 6h5M5.5 8.5h5M5.5 11h3",
  money: "M8 1.5v13M11 4.5H6.8a2 2 0 0 0 0 4h2.4a2 2 0 0 1 0 4H5",
  truck: "M1.5 4h8v7h-8zM9.5 6.5h3l2 2.5v2h-5M4 13a1.3 1.3 0 1 0 0-.1M11.5 13a1.3 1.3 0 1 0 0-.1",
  leaf: "M3 13c0-6 3-10 10.5-10.5C13 10 9 13 3 13zM3 13l6-6",
  game: "M4 5.5h8a2.5 2.5 0 0 1 2.4 3.2l-.8 2.8a1.5 1.5 0 0 1-2.6.4L10 10.5H6l-1 1.4a1.5 1.5 0 0 1-2.6-.4l-.8-2.8A2.5 2.5 0 0 1 4 5.5zM5 7.5v2M4 8.5h2M10.5 8h.1M12 9h.1",
  car: "M2.5 10.5V8l1.5-3.5h8L13.5 8v2.5zM2.5 10.5v2h2v-2M11.5 10.5v2h2v-2M5 8.2h.1M11 8.2h.1",
  home: "M2.5 7.5 8 3l5.5 4.5M4 6.5v7h8v-7",
};

export function CatIcon({ c }: { c: Cat }) {
  return (
    <svg viewBox="0 0 16 16" width={18} height={18} className="text-[#8b8d8c]">
      <path d={catPaths[c]} {...st} strokeWidth={1.3} />
    </svg>
  );
}

const empPaths: Record<EmpIcon, string> = {
  home: "M2.5 7 8 2.5 13.5 7v6.5h-11zM6.5 13.5V10h3v3.5",
  badge: "M2.5 4.5h11v9h-11zM6 4.5v-2h4v2M5.5 8.5h5M8 4.5v4",
  shirt: "M5.5 2.5 2 4.5l1.5 3 1.5-.8v6.8h6V6.7l1.5.8 1.5-3-3.5-2c-.3 1-1.3 1.7-2.5 1.7S5.8 3.5 5.5 2.5z",
  cap: "M1.5 6.5 8 3.5l6.5 3L8 9.5zM4.5 8v3.5c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2V8",
  question: "M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM6.3 6.2A1.8 1.8 0 0 1 9.8 6.5c0 1.2-1.8 1.4-1.8 2.7M8 11.3h.1",
  case: "M1.5 5h13v8.5h-13zM5.5 5V3h5v2M1.5 9h13M7 9v1h2V9",
  crown: "M2 5.5 5 8l3-4.5L11 8l3-2.5-1.3 6.5H3.3zM3.5 14h9",
  hourglass: "M3.5 1.5h9M3.5 14.5h9M4.5 1.5c0 4 7 4 7 6.5s-7 2.5-7 6.5M11.5 1.5c0 4-7 4-7 6.5s7 2.5 7 6.5",
  stroller: "M3 3.5h1.5l2 7h6.5l1-4.5H6M7 13.5h.1M12 13.5h.1M9.5 2a3 3 0 0 1 3 3",
};

export function EmpIco({ i, yellow }: { i: EmpIcon; yellow?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width={18} height={18} className={yellow ? "text-[#ffae00]" : "text-[#8b8d8c]"}>
      <path d={empPaths[i]} {...st} strokeWidth={1.4} />
    </svg>
  );
}

export function SocialIcon({ k }: { k: Social }) {
  const box = (children: ReactNode) => (
    <svg viewBox="0 0 16 16" width={16} height={16} className="shrink-0">
      {children}
    </svg>
  );
  switch (k) {
    case "youtube":
      return box(
        <>
          <rect x="0" y="2.5" width="16" height="11" rx="3" fill="#f00" />
          <path d="M6.5 5.5v5l4-2.5z" fill="#fff" />
        </>,
      );
    case "instagram":
      return box(
        <>
          <rect x="1" y="1" width="14" height="14" rx="4" fill="#e1306c" />
          <rect x="3.2" y="3.2" width="9.6" height="9.6" rx="2.8" fill="none" stroke="#fff" strokeWidth="1.5" />
          <circle cx="8" cy="8" r="2.3" fill="none" stroke="#fff" strokeWidth="1.5" />
          <circle cx="11.2" cy="4.8" r=".8" fill="#fff" />
        </>,
      );
    case "facebook":
      return box(
        <>
          <circle cx="8" cy="8" r="7.5" fill="#1877f2" />
          <path d="M8.8 15.5V10h1.8l.3-2.2H8.8V6.6c0-.6.2-1 1.1-1h1.1v-2a14 14 0 0 0-1.6-.1c-1.6 0-2.7 1-2.7 2.8v1.6H4.9V10h1.8v5.5" fill="#fff" />
        </>,
      );
    case "reddit":
      return box(
        <>
          <circle cx="8" cy="8" r="7.5" fill="#ff4500" />
          <ellipse cx="8" cy="9.3" rx="4.6" ry="3.2" fill="#fff" />
          <circle cx="6.2" cy="9" r=".8" fill="#ff4500" />
          <circle cx="9.8" cy="9" r=".8" fill="#ff4500" />
          <circle cx="11" cy="4" r="1" fill="#fff" />
        </>,
      );
    case "tiktok":
      return box(<path d="M10.5 1.5c.3 1.8 1.4 2.9 3.2 3v2.2a5.5 5.5 0 0 1-3.2-1v5.1a4.3 4.3 0 1 1-4.3-4.3h.5V8.8a2.1 2.1 0 1 0 1.5 2V1.5z" fill="#111" />);
    case "linkedin":
      return box(
        <>
          <rect x="0.5" y="0.5" width="15" height="15" rx="2" fill="#0a66c2" />
          <path d="M3.5 6.3h2v6.2h-2zM4.5 3.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM7 6.3h1.9v.9c.3-.5 1-1.1 2-1.1 2 0 2.4 1.3 2.4 3v3.4h-2V9.5c0-.7 0-1.6-1-1.6s-1.2.8-1.2 1.6v3H7z" fill="#fff" />
        </>,
      );
    case "pinterest":
      return box(
        <>
          <circle cx="8" cy="8" r="7.5" fill="#e60023" />
          <path d="M7.5 3.5c-2.6 0-3.9 1.8-3.9 3.4 0 1 .4 1.8 1.2 2.1.1.1.3 0 .3-.1l.1-.5c0-.1 0-.2-.1-.3-.2-.3-.4-.7-.4-1.2 0-1.6 1.2-3 3.1-3 1.7 0 2.6 1 2.6 2.4 0 1.8-.8 3.3-2 3.3-.6 0-1.1-.5-1-1.2.2-.8.6-1.7.6-2.2 0-.5-.3-.9-.8-.9-.7 0-1.2.7-1.2 1.6 0 .6.2 1 .2 1l-.8 3.4c-.2 1 0 2.2 0 2.3l.2.1c.1-.1 1-1.3 1.3-2.4l.5-1.9c.2.5 1 .9 1.7.9 2.2 0 3.7-2 3.7-4.7C11.8 5.2 10 3.5 7.5 3.5z" fill="#fff" />
        </>,
      );
    case "x":
      return box(<path d="M1.5 1.5h4.2l3 4.2 3.6-4.2h1.4L9.4 6.6l5.1 7.9h-4.2l-3.3-4.7-4 4.7H1.6l5-5.8zm2.1 1 7.4 11h1.4l-7.3-11z" fill="#111" />);
    default:
      return box(<path d="M8 .8a7.3 7.3 0 0 0-2.3 14.2c.4.1.5-.2.5-.4v-1.3c-2 .4-2.5-.9-2.5-.9-.3-.8-.8-1.1-.8-1.1-.7-.5 0-.5 0-.5.8.1 1.2.8 1.2.8.7 1.1 1.8.8 2.2.6 0-.5.3-.8.5-1-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.4.8-2-.1-.2-.4-.9 0-1.9 0 0 .7-.2 2 .7a6.8 6.8 0 0 1 3.6 0c1.4-.9 2-.7 2-.7.4 1 .2 1.7.1 1.9.5.6.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.2.5.7.5 1.3v2c0 .2.1.5.5.4A7.3 7.3 0 0 0 8 .8z" fill="#111" />);
  }
}

const Wm = 1000;
const Hm = 570;
const mil = (lat: number) => 1.25 * Math.log(Math.tan(Math.PI / 4 + (0.4 * lat * Math.PI) / 180));
const yT = mil(84);
const yB = mil(-57);
const pr = ([lon, lat]: number[]) => `${(((lon + 170) / 360) * Wm).toFixed(1)} ${(((yT - mil(lat)) / (yT - yB)) * Hm).toFixed(1)}`;
const poly = (pts: number[][]) => "M" + pts.map(pr).join("L") + "Z";

const usa = [[-124.5, 48.5], [-95, 49], [-89, 48], [-83, 46], [-79, 43.5], [-75, 45], [-70, 45.5], [-67, 45], [-70, 42], [-74, 40.5], [-76, 38], [-75.5, 35.5], [-81, 31.5], [-80, 26], [-82, 26], [-83, 29], [-85, 30], [-89, 30.2], [-94, 29.5], [-97, 27.5], [-97.5, 26], [-99, 26.5], [-103, 29], [-106.5, 31.8], [-111, 31.3], [-114.8, 32.5], [-117, 32.6], [-120.5, 34.5], [-122.5, 37.5], [-124, 40.5], [-124.5, 48.5]];
const alaska = [[-141, 60], [-141, 69.6], [-156, 71.3], [-166, 68.8], [-162, 66], [-166, 64.5], [-161, 62], [-165, 60.5], [-162, 58.5], [-156, 57.5], [-150, 60], [-146, 60.6], [-141, 60]];
const spain = [[-9, 43.5], [-1.8, 43.4], [3.2, 42.3], [0, 39.5], [-0.8, 37.6], [-5.5, 36], [-7.4, 37.2], [-7, 39.5], [-9, 41.8]];
const france = [[-1.8, 43.4], [-1.3, 46], [-4.5, 48.4], [-1.5, 48.7], [1.5, 50.9], [4.2, 49.9], [8.2, 49], [7.5, 47.5], [6.8, 46], [7.5, 43.8], [3.2, 42.3]];
const uk = [[-5.5, 50], [1.4, 51.2], [1.7, 52.7], [-0.5, 54.2], [-2, 55.8], [-2, 57.7], [-5, 58.6], [-6, 56.8], [-5, 55], [-3, 54.3], [-4.5, 53.3], [-4.5, 51.6]];
const germany = [[6, 51.5], [7, 53.5], [9, 54.8], [14.2, 53.9], [14.8, 51], [12.2, 50.3], [13.8, 48.7], [13, 47.5], [7.6, 47.6], [8.2, 49], [6.2, 49.5]];

export function GeoMap({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full">
      <WorldMap highlight="#dcdddf" secondary="#dcdddf" className="h-full w-full" />
      <svg viewBox={`0 0 ${Wm} ${Hm}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <path d={poly(usa)} fill="#c3cef9" stroke="#fff" strokeWidth={1.2} />
        <path d={poly(alaska)} fill="#c3cef9" stroke="#fff" strokeWidth={1.2} />
        {[spain, france, uk, germany].map((c, i) => (
          <path key={i} d={poly(c)} fill={i < 2 ? "#e7ebfc" : "#e3e8fc"} stroke="#fff" strokeWidth={1} />
        ))}
      </svg>
      </div>
    </div>
  );
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`h-[37px] px-[8px] text-[13px] leading-4 font-normal whitespace-nowrap text-rk-text-2 ${className}`}>{children}</th>;
}

export function Toggle({ on, onClick, dark = false }: { on: boolean; onClick: () => void; dark?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`relative h-[14px] w-[22px] shrink-0 rounded-full border ${on ? (dark ? "border-[#1b1e1a] bg-[#1b1e1a]" : "border-[#6167e6] bg-[#6167e6]") : "border-[#d6d8d7] bg-[#e0e2e1]"}`}
    >
      <span className={`absolute top-[1px] h-[10px] w-[10px] rounded-full bg-white transition-all ${on ? "left-[9px]" : "left-[1px]"}`} />
    </button>
  );
}

export function fmtM(v: number) {
  if (v >= 1e6) return `${+(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${Math.round(v / 1e3)}K`;
  return String(Math.round(v));
}

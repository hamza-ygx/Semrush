import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const ln = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ContactIcon({ name, ...p }: P & { name: string }) {
  const phone = <path d="M8.2 3.5 6 3.6C4.6 4 3.6 5.4 3.8 7c.8 7 6.3 12.5 13.2 13.2 1.6.2 3-.8 3.4-2.2l.1-2.2-3.8-1.6-1.9 1.9a11.5 11.5 0 0 1-5-5l1.9-1.9z" {...ln} />;
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden {...p}>
      {name === "sales" && (
        <>
          {phone}
          <path d="M14 3.5a6.5 6.5 0 0 1 6.5 6.5M14 7a3 3 0 0 1 3 3" {...ln} />
        </>
      )}
      {name === "help" && <path d="M12 5 2.5 9.5 12 14l9.5-4.5zM6 11.3v4.4c0 1.5 2.7 2.8 6 2.8s6-1.3 6-2.8v-4.4M21.5 9.5V14" {...ln} />}
      {name === "support" && (
        <>
          {phone}
          <path d="m15 4 5 5M20 4l-5 5" {...ln} />
        </>
      )}
      {name === "phone" && (
        <>
          {phone}
          <path d="M14 6.5h6.5M17.5 3.5l3 3-3 3" {...ln} />
        </>
      )}
    </svg>
  );
}

export function Stripes({ className = "", from = "transparent 0%", to = "#000 100%" }: { className?: string; from?: string; to?: string }) {
  const mask = `linear-gradient(180deg, ${from}, ${to})`;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        backgroundImage: "repeating-linear-gradient(90deg, rgba(178,140,250,0.95) 0 2px, rgba(90,226,214,0.8) 2px 4px, transparent 4px 8.4px)",
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}

const ink = "#141414";
const s = { fill: "none", stroke: ink, strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function TeamArt(p: P) {
  return (
    <svg viewBox="0 0 742 420" width={742} height={420} aria-hidden {...p}>
      <rect width="742" height="420" fill="#f3efe7" />
      <rect x="0" y="0" width="160" height="420" fill="#ebe4d6" />
      <rect x="480" y="70" width="180" height="130" rx="4" fill="#3c5a8c" />
      <path d="M500 150c30-40 60-10 90-40s40 30 60 10" fill="none" stroke="#e7c35a" strokeWidth={10} />
      <rect x="470" y="60" width="200" height="150" fill="none" stroke="#b58b55" strokeWidth={10} />
      <path d="M640 250c20-60 60-110 90-130M680 230c10-50 30-80 50-90M700 260c0-40 20-70 42-80" stroke="#3d7a45" strokeWidth={14} strokeLinecap="round" />
      <rect x="620" y="250" width="100" height="170" rx="6" fill="#2a2e33" />
      <rect x="630" y="262" width="80" height="60" rx="3" fill="#6fd4fb" />
      <circle cx="260" cy="170" r="70" fill="#2a1f1a" />
      <path d="M205 200c0-50 25-80 55-80s55 30 55 80-25 70-55 70-55-20-55-70z" fill="#c68d62" />
      <path d="M225 205c10 12 25 16 40 12M240 175h10M275 175h10" {...s} stroke="#2a1f1a" />
      <rect x="226" y="164" width="30" height="20" rx="8" fill="none" stroke="#2a1f1a" strokeWidth={3} />
      <rect x="266" y="164" width="30" height="20" rx="8" fill="none" stroke="#2a1f1a" strokeWidth={3} />
      <path d="M140 420c0-90 50-140 120-140s120 50 120 140z" fill="#e9d8c0" />
      <circle cx="410" cy="190" r="50" fill="#5a3b24" />
      <path d="M370 215c0-38 18-60 42-60s42 22 42 60-18 52-42 52-42-14-42-52z" fill="#e2b48e" />
      <path d="M392 222c8 8 20 10 30 6M398 198h6M422 198h6" {...s} stroke="#3a2718" />
      <path d="M320 420c0-80 40-120 92-120s92 40 92 120z" fill="#7a8f6a" />
      <rect x="120" y="360" width="500" height="60" fill="#d8c6a8" />
    </svg>
  );
}

const palettes: Record<string, [string, string]> = {
  chart: ["#dcc6fd", "#8b5cf6"],
  ledger: ["#d9ecea", "#00a488"],
  search: ["#fde94a", "#141414"],
  chat: ["#dcc6fd", "#6a3fd0"],
  calendar: ["#ffd8c2", "#ff7a45"],
  coins: ["#c9f4a0", "#2e8b57"],
  magnifier: ["#bfe7fb", "#1f78b4"],
  rocket: ["#ffe1ef", "#e0457b"],
};

export function BlogArt({ kind, ...p }: P & { kind: string }) {
  const [bg, fg] = palettes[kind] ?? palettes.chart;
  return (
    <svg viewBox="0 0 200 120" aria-hidden preserveAspectRatio="xMidYMid slice" {...p}>
      <rect width="200" height="120" fill={bg} />
      {kind === "chart" && (
        <>
          <rect x="40" y="24" width="120" height="76" rx="6" {...s} fill="#fff" />
          <path d="M54 84V64M74 84V52M94 84V58M114 84V40M134 84V46" stroke={fg} strokeWidth={9} strokeLinecap="round" />
        </>
      )}
      {kind === "ledger" && (
        <>
          <rect x="56" y="18" width="88" height="88" rx="6" {...s} fill="#fff" />
          <path d="M70 38h60M70 54h60M70 70h40M70 86h24" {...s} />
          <path d="m112 82 8 8 16-18" fill="none" stroke={fg} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
      {kind === "search" && (
        <>
          <rect x="30" y="40" width="140" height="36" rx="18" {...s} fill="#fff" />
          <circle cx="146" cy="58" r="8" {...s} />
          <path d="m152 64 6 6M46 58h60" {...s} />
        </>
      )}
      {kind === "chat" && (
        <>
          <path d="M40 30h80a8 8 0 0 1 8 8v30a8 8 0 0 1-8 8H66l-14 12V76H40a8 8 0 0 1-8-8V38a8 8 0 0 1 8-8z" {...s} fill="#fff" />
          <path d="M110 52h44a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8h-6v10l-12-10h-26a8 8 0 0 1-8-8V60a8 8 0 0 1 8-8z" {...s} fill={fg} />
          <circle cx="58" cy="53" r="4" fill={ink} />
          <circle cx="74" cy="53" r="4" fill={ink} />
          <circle cx="90" cy="53" r="4" fill={ink} />
        </>
      )}
      {kind === "calendar" && (
        <>
          <rect x="55" y="24" width="90" height="80" rx="6" {...s} fill="#fff" />
          <path d="M55 44h90M76 16v14M124 16v14" {...s} />
          <rect x="98" y="62" width="22" height="20" rx="3" fill={fg} />
        </>
      )}
      {kind === "coins" && (
        <>
          <ellipse cx="84" cy="84" rx="30" ry="10" {...s} fill="#fde94a" />
          <path d="M54 84V66M114 84V66" {...s} />
          <ellipse cx="84" cy="66" rx="30" ry="10" {...s} fill="#fde94a" />
          <ellipse cx="128" cy="54" rx="24" ry="24" {...s} fill="#fff" />
          <path d="M128 42v24M122 48h10a4 4 0 0 1 0 8h-8a4 4 0 0 0 0 8h10" stroke={fg} strokeWidth={3} fill="none" strokeLinecap="round" />
        </>
      )}
      {kind === "magnifier" && (
        <>
          <circle cx="90" cy="56" r="30" {...s} fill="#fff" />
          <path d="m112 78 26 26" stroke={ink} strokeWidth={8} strokeLinecap="round" />
          <path d="M76 56h28M90 42v28" stroke={fg} strokeWidth={4} strokeLinecap="round" />
        </>
      )}
      {kind === "rocket" && (
        <>
          <path d="M100 16c22 14 28 40 20 70H80c-8-30-2-56 20-70z" {...s} fill="#fff" />
          <circle cx="100" cy="50" r="9" {...s} fill={fg} />
          <path d="M80 70 64 90h18M120 70l16 20h-18M92 90l8 16 8-16" {...s} fill="#fff" />
        </>
      )}
    </svg>
  );
}

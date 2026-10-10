import { useId, type ReactNode } from "react";
import type { BrowserKey, FeatureKey, StepKey } from "./data";

const NAVY = "#25325c";
const CHIP = "#3a4a7d";
const ORANGE = "#ff7a2f";
const LINE = "#e3e6ee";
const LINK = "#2a5bd7";
const URL = "#1e8a4c";
const OK = "#00b07b";
const WARN = "#ff9f1a";

function Shadow({ id }: { id: string }) {
  return (
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#25325c" floodOpacity="0.16" />
    </filter>
  );
}

function SqBadge({ x, y, size = 20 }: { x: number; y: number; size?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size / 4} fill={ORANGE} />
      <text x={x + size / 2} y={y + size * 0.68} textAnchor="middle" fontSize={size * 0.45} fontWeight={700} fill="#fff">
        SQ
      </text>
    </g>
  );
}

function Check({ x, y, warn = false }: { x: number; y: number; warn?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill={warn ? WARN : OK} />
      {warn ? <path d={`M${x} ${y - 3.5}v4M${x} ${y + 3}v.5`} stroke="#fff" strokeWidth={1.8} strokeLinecap="round" /> : <path d={`m${x - 3} ${y}l2 2 4-4`} fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />}
    </g>
  );
}

function Bar({ x, y, w, h = 7, fill = LINE }: { x: number; y: number; w: number; h?: number; fill?: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}

function Toolbar({ x, y, w, items }: { x: number; y: number; w: number; items: [string, string][] }) {
  const widths = items.map(([k, v]) => (k.length + v.length) * 6.1 + 22);
  const lefts = widths.map((_, i) => x + 36 + widths.slice(0, i).reduce((a, b) => a + b + 6, 0));
  return (
    <g>
      <rect x={x} y={y} width={w} height={30} fill={NAVY} />
      <SqBadge x={x + 8} y={y + 6} size={18} />
      {items.map(([k, v], i) => (
        <g key={k}>
          <rect x={lefts[i]} y={y + 7} width={widths[i]} height={16} rx={4} fill={CHIP} />
          <text x={lefts[i] + 8} y={y + 19} fontSize={10.5} fill="#b9c4ea">
            {k}
            <tspan dx={5} fill="#fff" fontWeight={600}>
              {v}
            </tspan>
          </text>
        </g>
      ))}
    </g>
  );
}

function Overlay({ x, y, w, rank }: { x: number; y: number; w: number; rank: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={18} rx={3} fill="#fff4ea" stroke="#ffd9bb" />
      <text x={x + 8} y={y + 12.5} fontSize={10} fill="#a4581f">
        <tspan fontWeight={700}>#{rank}</tspan>
        <tspan dx={10}>Index</tspan>
        <tspan dx={4} fontWeight={600}>{["12K", "8.4K", "3.1K"][rank - 1]}</tspan>
        <tspan dx={10}>Backlinks</tspan>
        <tspan dx={4} fontWeight={600}>{["340K", "96K", "41K"][rank - 1]}</tspan>
        <tspan dx={10}>Ref. domains</tspan>
        <tspan dx={4} fontWeight={600}>{["8.1K", "2.6K", "970"][rank - 1]}</tspan>
        <tspan dx={10}>Density</tspan>
      </text>
    </g>
  );
}

function Result({ x, y, title, url, rank }: { x: number; y: number; title: string; url: string; rank: number }) {
  return (
    <g>
      <text x={x} y={y} fontSize={11} fill={URL}>
        {url}
      </text>
      <text x={x} y={y + 19} fontSize={15} fill={LINK} fontWeight={500}>
        {title}
      </text>
      <Bar x={x} y={y + 28} w={420} h={6} />
      <Bar x={x} y={y + 39} w={300} h={6} />
      <Overlay x={x} y={y + 52} w={440} rank={rank} />
    </g>
  );
}

export function HeroArt() {
  const id = useId();
  return (
    <svg viewBox="0 0 863 380" width="100%" role="img" aria-label="SEOquake toolbar, SERP overlay, and page audit in a browser window" className="block">
      <defs>
        <Shadow id={`${id}s`} />
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fb0ff" />
          <stop offset="1" stopColor="#b6a3ff" />
        </linearGradient>
        <clipPath id={`${id}c`}>
          <rect x="0" y="0" width="863" height="380" rx="10" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}c)`}>
        <rect width="863" height="380" fill={`url(#${id}g)`} />
        <rect x="34" y="30" width="640" height="370" rx="10" fill="#fff" filter={`url(#${id}s)`} />
        <path d="M34 40a10 10 0 0 1 10-10h620a10 10 0 0 1 10 10v26H34z" fill="#f2f4f9" />
        {["#ff6b70", "#ffb400", "#00c78f"].map((c, i) => (
          <circle key={c} cx={52 + i * 14} cy={48} r={4.5} fill={c} />
        ))}
        <rect x="106" y="38" width="460" height="20" rx="10" fill="#fff" stroke={LINE} />
        <text x="120" y="52" fontSize={11} fill="#6a6c6a">
          search.example/?q=running+shoes
        </text>
        <SqBadge x={640} y={38} />
        <circle cx={622} cy={48} r={7} fill="#dfe3ec" />
        <Toolbar
          x={34}
          y={66}
          w={640}
          items={[
            ["Index", "4.8M"],
            ["Rank", "2,341"],
            ["Backlinks", "18.6M"],
            ["Ref. domains", "92K"],
            ["Audit", "86"],
          ]}
        />
        <rect x="60" y="114" width="360" height="30" rx="15" fill="#fff" stroke="#d6d8d7" />
        <text x="78" y="133" fontSize={13} fill="#1b1e1a">
          running shoes
        </text>
        <circle cx={401} cy={129} r={6} fill="none" stroke="#6a6c6a" strokeWidth={1.6} />
        <path d="m405.5 133.5 4 4" stroke="#6a6c6a" strokeWidth={1.6} strokeLinecap="round" />
        <Result x={60} y={170} rank={1} url="www.runnerspick.example › best-shoes" title="The 12 Best Running Shoes, Tested by Runners" />
        <Result x={60} y={258} rank={2} url="shop.trailhub.example › running" title="Running Shoes for Road and Trail | Trailhub" />
        <Result x={60} y={346} rank={3} url="www.stridelab.example › guide" title="How to Choose Running Shoes: A Complete Guide" />

        <g filter={`url(#${id}s)`}>
          <rect x="586" y="112" width="246" height="246" rx="10" fill="#fff" />
        </g>
        <text x="604" y="140" fontSize={14} fontWeight={600} fill="#1b1e1a">
          Page SEO audit
        </text>
        <SqBadge x={796} y={125} size={18} />
        <circle cx={634} cy={180} r={24} fill="none" stroke="#e7f6ef" strokeWidth={7} />
        <circle cx={634} cy={180} r={24} fill="none" stroke={OK} strokeWidth={7} strokeDasharray={`${2 * Math.PI * 24 * 0.86} 999`} transform="rotate(-90 634 180)" strokeLinecap="round" />
        <text x={634} y={186} textAnchor="middle" fontSize={16} fontWeight={700} fill="#1b1e1a">
          86
        </text>
        <text x="672" y="176" fontSize={13} fontWeight={600} fill={OK}>
          Good
        </text>
        <text x="672" y="193" fontSize={11} fill="#6a6c6a">
          3 issues to review
        </text>
        {(
          [
            ["Title length: 54 characters", false],
            ["Meta description found", false],
            ["One H1 heading", false],
            ["3 images missing alt text", true],
            ["Canonical URL set", false],
          ] as [string, boolean][]
        ).map(([t, w], i) => (
          <g key={t}>
            <Check x={612} y={228 + i * 25} warn={w} />
            <text x={627} y={232 + i * 25} fontSize={11.5} fill="#484a49">
              {t}
            </text>
          </g>
        ))}

        <g filter={`url(#${id}s)`}>
          <rect x="700" y="30" width="132" height="62" rx="10" fill="#fff" />
        </g>
        <text x="714" y="52" fontSize={11} fill="#6a6c6a">
          Keyword density
        </text>
        <text x="714" y="76" fontSize={18} fontWeight={700} fill="#1b1e1a">
          2.4%
        </text>
        <rect x="770" y="66" width="48" height="8" rx="4" fill="#efeafd" />
        <rect x="770" y="66" width="22" height="8" rx="4" fill="#8b6cf6" />
      </g>
    </svg>
  );
}

function Frame({ children, vb = "0 0 300 150" }: { children: ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden className="block">
      {children}
    </svg>
  );
}

function Card({ x, y, w, h, id }: { x: number; y: number; w: number; h: number; id: string }) {
  return <rect x={x} y={y} width={w} height={h} rx={8} fill="#fff" filter={`url(#${id})`} />;
}

function ToolbarArt({ id }: { id: string }) {
  return (
    <Frame vb="0 0 600 150">
      <Card x={40} y={26} w={520} h={140} id={id} />
      <path d="M40 34a8 8 0 0 1 8-8h504a8 8 0 0 1 8 8v16H40z" fill="#f2f4f9" />
      {["#ff6b70", "#ffb400", "#00c78f"].map((c, i) => (
        <circle key={c} cx={54 + i * 11} cy={38} r={3.5} fill={c} />
      ))}
      <rect x="96" y="32" width="330" height="12" rx="6" fill="#fff" stroke={LINE} />
      <Toolbar
        x={40}
        y={50}
        w={520}
        items={[
          ["Index", "4.8M"],
          ["Rank", "2,341"],
          ["Backlinks", "18.6M"],
          ["Ref. domains", "92K"],
        ]}
      />
      <Bar x={64} y={102} w={220} h={9} fill="#dfe6fb" />
      <Bar x={64} y={122} w={420} />
      <Bar x={64} y={137} w={360} />
    </Frame>
  );
}

function SerpArt({ id }: { id: string }) {
  return (
    <Frame>
      <Card x={36} y={18} w={228} h={150} id={id} />
      {[0, 1].map((i) => (
        <g key={i}>
          <Bar x={52} y={34 + i * 58} w={90} h={5} fill="#bfe3cd" />
          <Bar x={52} y={45 + i * 58} w={170} h={8} fill="#c9d8fb" />
          <Bar x={52} y={58 + i * 58} w={150} h={5} />
          <rect x={52} y={68 + i * 58} width={196} height={14} rx={3} fill="#fff4ea" stroke="#ffd9bb" />
          <text x={58} y={78.5 + i * 58} fontSize={8.5} fill="#a4581f">
            <tspan fontWeight={700}>#{i + 1}</tspan>
            <tspan dx={6}>Backlinks {i ? "96K" : "340K"}</tspan>
            <tspan dx={6}>Ref. dom. {i ? "2.6K" : "8.1K"}</tspan>
          </text>
        </g>
      ))}
    </Frame>
  );
}

function AuditArt({ id }: { id: string }) {
  const c = 2 * Math.PI * 20;
  return (
    <Frame>
      <Card x={50} y={18} w={200} h={150} id={id} />
      <circle cx={88} cy={56} r={20} fill="none" stroke="#e7f6ef" strokeWidth={6} />
      <circle cx={88} cy={56} r={20} fill="none" stroke={OK} strokeWidth={6} strokeDasharray={`${c * 0.86} 999`} transform="rotate(-90 88 56)" strokeLinecap="round" />
      <text x={88} y={61} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1b1e1a">
        86
      </text>
      <Bar x={120} y={46} w={90} h={7} fill="#cdeee0" />
      <Bar x={120} y={60} w={64} h={6} />
      {[false, false, true].map((w, i) => (
        <g key={i}>
          <Check x={74} y={98 + i * 20} warn={w} />
          <Bar x={88} y={95 + i * 20} w={[120, 96, 132][i]} h={6} />
        </g>
      ))}
    </Frame>
  );
}

function DensityArt({ id }: { id: string }) {
  const rows: [string, number][] = [
    ["running", 0.9],
    ["shoes", 0.72],
    ["trail", 0.46],
    ["cushion", 0.3],
  ];
  return (
    <Frame>
      <Card x={50} y={18} w={200} h={150} id={id} />
      <text x={66} y={40} fontSize={10} fontWeight={600} fill="#484a49">
        Keyword
      </text>
      <text x={234} y={40} fontSize={10} fontWeight={600} fill="#484a49" textAnchor="end">
        Density
      </text>
      {rows.map(([k, v], i) => (
        <g key={k}>
          <text x={66} y={62 + i * 22} fontSize={10.5} fill="#1b1e1a">
            {k}
          </text>
          <rect x={124} y={54 + i * 22} width={80} height={8} rx={4} fill="#efeafd" />
          <rect x={124} y={54 + i * 22} width={80 * v} height={8} rx={4} fill="#8b6cf6" />
          <text x={234} y={62 + i * 22} fontSize={10} fill="#6a6c6a" textAnchor="end">
            {(v * 3).toFixed(1)}%
          </text>
        </g>
      ))}
    </Frame>
  );
}

function LinksArt({ id }: { id: string }) {
  const out = [
    [226, 44],
    [240, 86],
    [222, 128],
  ];
  const inn = [
    [74, 40],
    [60, 90],
    [80, 132],
  ];
  return (
    <Frame>
      <Card x={118} y={50} w={64} h={74} id={id} />
      <Bar x={128} y={64} w={44} h={6} fill="#ffe08a" />
      <Bar x={128} y={78} w={36} h={5} />
      <Bar x={128} y={90} w={42} h={5} />
      <Bar x={128} y={102} w={30} h={5} />
      {inn.map(([x, y]) => (
        <g key={`i${y}`}>
          <path d={`M118 87 L${x + 12} ${y}`} stroke="#e0a800" strokeWidth={1.5} strokeDasharray="0" />
          <circle cx={x} cy={y} r={12} fill="#fff" stroke="#e0a800" strokeWidth={1.5} />
          <path d={`M${x - 4} ${y}h8M${x} ${y - 4}v8`} stroke="#e0a800" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
      {out.map(([x, y], i) => (
        <g key={`o${y}`}>
          <path d={`M182 87 L${x - 12} ${y}`} stroke={i === 1 ? "#a9abaa" : LINK} strokeWidth={1.5} strokeDasharray={i === 1 ? "4 3" : "0"} />
          <circle cx={x} cy={y} r={12} fill="#fff" stroke={i === 1 ? "#a9abaa" : LINK} strokeWidth={1.5} />
          <path d={`M${x - 4} ${y + 4}l8-8M${x - 1} ${y - 4}h5v5`} fill="none" stroke={i === 1 ? "#a9abaa" : LINK} strokeWidth={1.5} strokeLinecap="round" />
        </g>
      ))}
    </Frame>
  );
}

function CompareArt({ id }: { id: string }) {
  const rows = [
    [0.86, 0.6],
    [0.5, 0.74],
    [0.7, 0.42],
  ];
  return (
    <Frame>
      <Card x={46} y={18} w={208} h={150} id={id} />
      <rect x={62} y={32} width={10} height={10} rx={2} fill="#1aa3c8" />
      <Bar x={78} y={34} w={56} h={6} />
      <rect x={154} y={32} width={10} height={10} rx={2} fill={ORANGE} />
      <Bar x={170} y={34} w={56} h={6} />
      {rows.map(([a, b], i) => (
        <g key={i}>
          <Bar x={62} y={62 + i * 30} w={40} h={5} />
          <rect x={62} y={72 + i * 30} width={170 * a} height={6} rx={3} fill="#1aa3c8" />
          <rect x={62} y={80 + i * 30} width={170 * b} height={6} rx={3} fill={ORANGE} />
        </g>
      ))}
    </Frame>
  );
}

function ExportArt({ id }: { id: string }) {
  return (
    <Frame vb="0 0 600 150">
      <Card x={150} y={26} w={190} h={110} id={id} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          {[0, 1, 2].map((c) => (
            <rect key={c} x={164 + c * 58} y={40 + r * 22} width={50} height={14} rx={2} fill={r === 0 ? "#ffd3da" : "#f3f5f8"} />
          ))}
        </g>
      ))}
      <path d="M358 81h46" stroke="#e8798c" strokeWidth={2.5} strokeLinecap="round" />
      <path d="m396 73 8 8-8 8" fill="none" stroke="#e8798c" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M424 34h44l18 18v80a6 6 0 0 1-6 6h-56a6 6 0 0 1-6-6V40a6 6 0 0 1 6-6z" fill="#fff" filter={`url(#${id})`} />
      <path d="M468 34v18h18" fill="#ffe1e6" />
      <rect x={430} y={74} width={50} height={20} rx={4} fill="#e8798c" />
      <text x={455} y={88} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
        CSV
      </text>
      <Bar x={432} y={106} w={44} h={5} />
      <Bar x={432} y={118} w={32} h={5} />
    </Frame>
  );
}

const featureArt: Record<FeatureKey, (p: { id: string }) => ReactNode> = {
  toolbar: ToolbarArt,
  serp: SerpArt,
  audit: AuditArt,
  density: DensityArt,
  links: LinksArt,
  compare: CompareArt,
  export: ExportArt,
};

export function FeatureArt({ kind }: { kind: FeatureKey }) {
  const id = useId();
  const Art = featureArt[kind];
  return (
    <div className="relative h-full w-full">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <Shadow id={id} />
        </defs>
      </svg>
      <Art id={id} />
    </div>
  );
}

export function StepArt({ kind }: { kind: StepKey }) {
  if (kind === "install")
    return (
      <svg viewBox="0 0 96 72" width={96} height={72} aria-hidden>
        <rect x="6" y="8" width="84" height="58" rx="8" fill="#fff" stroke="#d9e2fb" strokeWidth={1.5} />
        <path d="M6 16a8 8 0 0 1 8-8h68a8 8 0 0 1 8 8v6H6z" fill="#e8efff" />
        <circle cx="15" cy="15" r="2.5" fill="#ff6b70" />
        <circle cx="23" cy="15" r="2.5" fill="#ffb400" />
        <circle cx="31" cy="15" r="2.5" fill="#00c78f" />
        <SqBadge x={36} y={32} size={24} />
        <circle cx="66" cy="34" r="9" fill="#00a37f" />
        <path d="M66 30v8M62 34h8" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      </svg>
    );
  if (kind === "browse")
    return (
      <svg viewBox="0 0 96 72" width={96} height={72} aria-hidden>
        <rect x="6" y="8" width="84" height="58" rx="8" fill="#fff" stroke="#d9e2fb" strokeWidth={1.5} />
        <rect x="14" y="16" width="52" height="9" rx="4.5" fill="#fff" stroke="#d6d8d7" />
        <Bar x={14} y={32} w={44} h={5} fill="#c9d8fb" />
        <Bar x={14} y={41} w={60} h={4} />
        <rect x="14" y="50" width="66" height="9" rx="2" fill="#fff4ea" stroke="#ffd9bb" />
        <Bar x={18} y={53} w={18} h={3} fill="#e7a874" />
        <Bar x={40} y={53} w={18} h={3} fill="#e7a874" />
      </svg>
    );
  return (
    <svg viewBox="0 0 96 72" width={96} height={72} aria-hidden>
      <rect x="6" y="8" width="84" height="58" rx="8" fill="#fff" stroke="#d9e2fb" strokeWidth={1.5} />
      <circle cx="30" cy="34" r="12" fill="none" stroke="#e7f6ef" strokeWidth={5} />
      <circle cx="30" cy="34" r="12" fill="none" stroke={OK} strokeWidth={5} strokeDasharray={`${2 * Math.PI * 12 * 0.86} 999`} transform="rotate(-90 30 34)" strokeLinecap="round" />
      <Bar x={50} y={26} w={30} h={5} fill="#cdeee0" />
      <Bar x={50} y={36} w={22} h={4} />
      <Check x={22} y={56} />
      <Bar x={32} y={54} w={44} h={4} />
    </svg>
  );
}

export function BrowserLogo({ kind, size = 32 }: { kind: BrowserKey; size?: number }) {
  const id = useId();
  if (kind === "chrome")
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
        <path d="M12 12 3.34 7A10 10 0 0 1 20.66 7z" fill="#ea4335" />
        <path d="M12 12h8.66A10 10 0 0 1 12 22z" fill="#fbbc04" />
        <path d="M12 12v10A10 10 0 0 1 3.34 7z" fill="#34a853" />
        <path d="M12 12 20.66 7a10 10 0 0 1 0 5z" fill="#fbbc04" />
        <circle cx="12" cy="12" r="5" fill="#fff" />
        <circle cx="12" cy="12" r="3.9" fill="#4285f4" />
      </svg>
    );
  if (kind === "firefox")
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffbd4f" />
            <stop offset="0.5" stopColor="#ff6a3d" />
            <stop offset="1" stopColor="#e31587" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill={`url(#${id})`} />
        <circle cx="12.5" cy="12.5" r="5.5" fill="#7b4fe0" />
        <path d="M4 9c2-4 7-6 11-4-3 0-5 2-5 4 2 .5 3 2 2 4" fill="none" stroke="#ffd567" strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    );
  if (kind === "edge")
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#36c1e1" />
            <stop offset="0.55" stopColor="#1f7fd6" />
            <stop offset="1" stopColor="#3dc46c" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill={`url(#${id})`} />
        <path d="M6 13.5c0-3.5 3-6 6.5-6S19 9.5 19 12.5c0 1.6-1.4 2.5-3.2 2.5H10.5c.3 2 2 3.5 4.5 3.5 1.2 0 2.4-.3 3.3-.9" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <ellipse cx="12" cy="12" rx="8" ry="9.5" fill="none" stroke="#ff1b2d" strokeWidth={4} />
      <ellipse cx="12" cy="12" rx="3.2" ry="7" fill="none" stroke="#c9001a" strokeWidth={1.4} opacity={0.6} />
    </svg>
  );
}

import type { ReactNode } from "react";

const T = { fontFamily: "inherit" };
const muted = "#8b8d8c";
const head = "#555a64";
const sk = "#e6e7eb";

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute h-[432px] w-[430px] rounded-[24px] bg-white shadow-[0_6px_40px_rgba(96,92,190,0.10)] ${className}`}>
      <svg viewBox="0 0 430 432" width={430} height={432} className="absolute inset-0" style={T}>
        {children}
      </svg>
    </div>
  );
}

const Title = ({ x = 25, y, children, size = 15 }: { x?: number; y: number; children: ReactNode; size?: number }) => (
  <text x={x} y={y + 5} fontSize={size} fontWeight={600} fill={head}>
    {children}
  </text>
);
const Label = ({ x, y, children, size = 12, fill = muted, anchor }: { x: number; y: number; children: ReactNode; size?: number; fill?: string; anchor?: "end" | "middle" }) => (
  <text x={x} y={y + size * 0.35} fontSize={size} fill={fill} textAnchor={anchor}>
    {children}
  </text>
);
const Pill = ({ x, y, w, h = 5, fill = sk }: { x: number; y: number; w: number; h?: number; fill?: string }) => <rect x={x} y={y - h / 2} width={w} height={h} rx={h / 2} fill={fill} />;

function GaugeArc({ cx, cy, r, w, value, color, track, marker = true }: { cx: number; cy: number; r: number; w: number; value: number; color: string; track: string; marker?: boolean }) {
  const pt = (v: number, rr = r) => {
    const a = Math.PI * (1 - v / 100);
    return [cx + rr * Math.cos(a), cy - rr * Math.sin(a)];
  };
  const [x0, y0] = pt(0);
  const [x1, y1] = pt(100);
  const [xv, yv] = pt(value);
  const [mx, my] = pt(Math.min(100, value + 20), r + 2);
  return (
    <g>
      <path d={`M${x0} ${y0 + 10}L${x0} ${y0}A${r} ${r} 0 0 1 ${x1} ${y1}L${x1} ${y1 + 10}`} fill="none" stroke={track} strokeWidth={w} />
      <path d={`M${x0} ${y0 + 10}L${x0} ${y0}A${r} ${r} 0 0 1 ${xv} ${yv}`} fill="none" stroke={color} strokeWidth={w} />
      {marker && <path d={`M${mx - 6} ${my - 2}l9 -6l1 10z`} fill="#f58f98" />}
    </g>
  );
}

export function VisibilityCard({ className = "" }: { className?: string }) {
  const bars = [
    [127, 209],
    [172, 199],
    [216, 187],
    [260, 194],
    [305, 172],
    [348, 186],
    [392, 172],
  ];
  const line = [216, 192, 194, 176, 184, 179, 162];
  return (
    <Card className={className}>
      <defs>
        <radialGradient id="ov-g1" cx="50%" cy="100%" r="90%">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset="1" stopColor="#fff9ec" />
        </radialGradient>
      </defs>
      <Title y={37}>AI Visibility</Title>
      <path d="M26 132a52 52 0 0 1 104 0z" fill="url(#ov-g1)" />
      <path d="M26 132a52 52 0 0 1 104 0" fill="none" stroke="#fdf1dc" strokeWidth={12} />
      <path d="M26 132a52 52 0 0 1 21-42" fill="none" stroke="#ffa947" strokeWidth={12} />
      <path d="M124 100l9-4-2 9z" fill="#c9a4fb" />
      <text x={72} y={105} fontSize={12} fontWeight={600} fill="#f08c00" textAnchor="middle">
        31
      </text>
      <text x={90} y={105} fontSize={8} fill="#f0a040" textAnchor="middle">
        /100
      </text>
      <text x={78} y={127} fontSize={20} fontWeight={700} fill="#f08c00" textAnchor="middle">
        Low
      </text>
      {[
        [170, "#b5c4f5", "Chat GPT"],
        [242, "#b58af2", "AI Mode"],
        [306, "#3ddc97", "AI Overview"],
      ].map(([x, c, t]) => (
        <g key={t as string}>
          <circle cx={x as number} cy={59} r={3} fill={c as string} />
          <Label x={(x as number) + 8} y={59} size={11}>
            {t}
          </Label>
        </g>
      ))}
      <path d="M166 80c30 0 40-4 70-2s40-6 70-2 40 0 60-4 30-6 40-8" fill="none" stroke="#c3cef7" strokeWidth={2} />
      <path d="M166 93c20 2 40-8 60-2s40 4 70-2 50 6 70-2 30-10 40-8" fill="none" stroke="#b58af2" strokeWidth={2} />
      <path d="M166 124c30 0 40-2 70 0s30-8 60-4 40 4 60-2 30-12 50-18" fill="none" stroke="#3ddc97" strokeWidth={2} />
      <circle cx={28} cy={160} r={3} fill="#f59ae8" />
      <Label x={36} y={160} size={11}>
        Audience
      </Label>
      <text x={25} y={188} fontSize={18} fontWeight={700} fill={head}>
        746
      </text>
      <circle cx={28} cy={213} r={3} fill="#ffa947" />
      <Label x={36} y={213} size={11}>
        Mentions
      </Label>
      <text x={25} y={241} fontSize={18} fontWeight={700} fill={head}>
        112
      </text>
      {bars.map(([x, top]) => (
        <rect key={x} x={x - 8} y={top} width={16} height={240 - top} rx={3} fill="#fdd08a" />
      ))}
      <path d={bars.map(([x], i) => `${i ? "L" : "M"}${x} ${line[i]}`).join("")} fill="none" stroke="#f59ae8" strokeWidth={1.6} strokeLinejoin="round" />
      {bars.map(([x], i) => (
        <circle key={x} cx={x} cy={line[i]} r={3.5} fill="#f59ae8" />
      ))}
      <rect x={25.5} y={277.5} width={380} height={127} rx={8} fill="#fff" stroke="#e6e2fb" />
      <path d="M25.5 304V285.5a8 8 0 0 1 8-8h364a8 8 0 0 1 8 8V304z" fill="#f3effd" />
      <text x={45} y={295} fontSize={11} fontWeight={600} fill={head}>
        What’s Next?
      </text>
      {[38, 158, 278].map((x) => (
        <g key={x}>
          <rect x={x + 0.5} y={318.5} width={113} height={74} rx={5} fill="#fff" stroke="#e6e2fb" />
          <circle cx={x + 16} cy={338} r={5} fill="none" stroke="#c9a4fb" strokeWidth={1.6} />
          <Pill x={x + 11} y={359} w={92} fill="#e3d6fb" />
          <Pill x={x + 11} y={374} w={92} fill="#e3d6fb" />
        </g>
      ))}
    </Card>
  );
}

function ChatGptMini({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={5} fill="none" stroke="#9a9ca6" strokeWidth={1.3} strokeDasharray="2 1.2" />;
}

function GoogleMini({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y + 4.5} fontSize={13} fontWeight={700} fill="#4285f4" textAnchor="middle">
      G
    </text>
  );
}

export function PromptCard({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <Title y={35}>Prompt Research</Title>
      <Label x={25} y={69}>
        AI Volume
      </Label>
      <Label x={157} y={69}>
        Topic Difficulty
      </Label>
      <Label x={296} y={69}>
        Brands Mentioned
      </Label>
      <text x={25} y={101} fontSize={18} fontWeight={700} fill={head}>
        34.6K
      </text>
      <text x={80} y={101} fontSize={10} fill="#1cc08a">
        +16%
      </text>
      <circle cx={165} cy={94} r={7} fill="none" stroke="#eef0f3" strokeWidth={3} />
      <path d="M165 87a7 7 0 0 1 6 10" fill="none" stroke="#3ddc97" strokeWidth={3} />
      <text x={177} y={101} fontSize={18} fontWeight={700} fill={head}>
        34
      </text>
      <text x={200} y={101} fontSize={10} fill="#1cc08a">
        ↑12
      </text>
      <text x={296} y={101} fontSize={18} fontWeight={700} fill={head}>
        342
      </text>
      <path d="M25 158c4-18 10-22 18-20s12 8 22 6 14-16 24-12 12 20 31 24v5H25z" fill="#eef1fc" />
      <path d="M25 158c4-18 10-22 18-20s12 8 22 6 14-16 24-12 12 20 31 24" fill="none" stroke="#b5c4f5" strokeWidth={1.4} />
      <path d="M157 160c4-20 8-28 16-28s8 6 16 4 8-8 14-4 8 6 14 2 6-6 12-2 6 10 14 20v8h-86z" fill="#eef1fc" />
      <path d="M157 160c4-20 8-28 16-28s8 6 16 4 8-8 14-4 8 6 14 2 6-6 12-2 6 10 14 20" fill="none" stroke="#b5c4f5" strokeWidth={1.4} />
      <Label x={296} y={131}>
        Intent
      </Label>
      {[
        ["N", "#d8d4fb", "#6c63d8"],
        ["C", "#ffe5b0", "#b07a00"],
        ["T", "#c8f5e6", "#1d9a74"],
        ["O", "#d9e4fb", "#4d6fd0"],
        ["T", "#f6d4f7", "#b04fc0"],
      ].map(([t, bg, fg], i) => (
        <g key={i}>
          <rect x={296 + i * 18} y={143} width={14} height={14} rx={3} fill={bg} />
          <text x={303 + i * 18} y={153.5} fontSize={9} fontWeight={700} fill={fg} textAnchor="middle">
            {t}
          </text>
        </g>
      ))}
      <rect x={25.5} y={199.5} width={196} height={24} rx={4} fill="#fff" stroke="#dcdfe6" />
      <rect x={25.5} y={199.5} width={54} height={24} rx={4} fill="#eef4ff" stroke="#9fb4f0" />
      <path d="M128.5 200v23" stroke="#dcdfe6" />
      <Label x={52} y={211} anchor="middle" fill={head} size={10}>
        Prompts
      </Label>
      <Label x={104} y={211} anchor="middle" fill={head} size={10}>
        Brands
      </Label>
      <Label x={175} y={211} anchor="middle" fill={head} size={10}>
        Source Domains
      </Label>
      {[
        [25, "Prompt"],
        [111, "Brand"],
        [167, "Sources"],
        [218, "AI Response"],
      ].map(([x, t]) => (
        <Label key={t as string} x={x as number} y={248} size={10}>
          {t}
        </Label>
      ))}
      <path d="M25 263.5h380" stroke="#edefef" />
      {[280, 323, 367].map((y, i) => (
        <g key={y}>
          <Pill x={25} y={y} w={68} />
          <Pill x={25} y={y + 14} w={50} />
          <Pill x={111} y={y} w={13} />
          <Pill x={167} y={y} w={13} />
          {i === 1 ? <GoogleMini x={222} y={y} /> : <ChatGptMini x={222} y={y} />}
          <Pill x={234} y={y} w={80} />
          <Pill x={234} y={y + 14} w={43} />
          <rect x={327.5} y={y - 4.5} width={76} height={20} rx={4} fill={i === 0 ? "#5d5e66" : "#fff"} stroke={i === 0 ? "#5d5e66" : "#e3e5ea"} />
          <Label x={365.5} y={y + 5.5} size={9} anchor="middle" fill={i === 0 ? "#fff" : muted}>
            Create content
          </Label>
        </g>
      ))}
    </Card>
  );
}

export function CompetitorCard({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <Title y={37}>Competitor Research</Title>
      {[
        [25, "#b5c4f5", "You", "90"],
        [102, "#3ddc97", "Competitor", "62"],
        [190, "#f59ae8", "Competitor", "74"],
      ].map(([x, c, t, v], i) => (
        <g key={i}>
          <circle cx={(x as number) + 3} cy={66} r={3} fill={c as string} />
          <Label x={(x as number) + 12} y={66} size={11}>
            {t}
          </Label>
          <text x={x as number} y={97} fontSize={18} fontWeight={700} fill={head}>
            {v}
          </text>
        </g>
      ))}
      <path d="M25 120c20 0 30 4 50 2s30 2 50 4 30 8 50 2 40-4 60-4 30-16 40-12 16 16 30 12 40 0 55-4" fill="none" stroke="#c3cef7" strokeWidth={1.8} />
      <path d="M25 139c20 10 40 6 60 6s40-4 60-2 40 0 60-4 40 4 60 4 40 0 60-2 30-2 40-2" fill="none" stroke="#3ddc97" strokeWidth={1.8} />
      <path d="M25 162c20-4 30-10 50-8s20 8 40 4 30-8 50-4 30 6 50 0 40-6 60 0 30 2 40-4 10-14 25-14 30 0 45-4" fill="none" stroke="#f59ae8" strokeWidth={1.8} />
      <rect x={25.5} y={183.5} width={379} height={69} rx={8} fill="#fff" stroke="#e6e2fb" />
      <path d="M25.5 210V191.5a8 8 0 0 1 8-8h363a8 8 0 0 1 8 8V210z" fill="#f3effd" />
      <text x={40} y={201} fontSize={11} fontWeight={600} fill={head}>
        Competitor Insights
      </text>
      <Pill x={37} y={229} w={160} />
      <Pill x={37} y={243} w={97} />
      <rect x={335} y={223} width={59} height={19} rx={4} fill="#5d5e66" />
      <Label x={364.5} y={232.5} size={8.5} anchor="middle" fill="#fff">
        Go to topic
      </Label>
      <rect x={25.5} y={275.5} width={154} height={23} rx={4} fill="#fff" stroke="#dcdfe6" />
      <rect x={25.5} y={275.5} width={100} height={23} rx={4} fill="#eef4ff" stroke="#9fb4f0" />
      <Label x={75.5} y={287} anchor="middle" fill={head} size={11}>
        Topics &amp; Prompts
      </Label>
      <Label x={152} y={287} anchor="middle" fill={head} size={11}>
        Sources
      </Label>
      {[
        [25, "Topic"],
        [112, "Mentions"],
        [169, "Difficulty"],
        [225, "AI Volume"],
        [294, "Intent"],
      ].map(([x, t]) => (
        <Label key={t as string} x={x as number} y={320} size={9}>
          {t}
        </Label>
      ))}
      <path d="M25 336.5h380" stroke="#edefef" />
      <rect x={106} y={384} width={48} height={26} fill="#d6fbef" />
      {[352, 390].map((y, i) => (
        <g key={y}>
          <Pill x={25} y={y} w={69} />
          <Pill x={25} y={y + 13} w={43} />
          <Pill x={112} y={y + 6} w={20} fill={i ? "#8ef0cf" : sk} />
          <Pill x={169} y={y + 6} w={20} />
          <path d={`M224 ${y + 10}c6-2 8-8 12-8s6 6 10 4 4-6 8-4`} fill="none" stroke="#b5c4f5" strokeWidth={1.2} />
          <Pill x={260} y={y + 6} w={14} />
          <rect x={294} y={y + 3} width={16} height={6} rx={3} fill="#b5c4f5" />
          <rect x={309} y={y + 3} width={24} height={6} fill="#3ddc97" />
          <rect x={332} y={y + 3} width={10} height={6} rx={3} fill={i ? "#ffb400" : "#b58af2"} />
          <rect x={359.5} y={y - 2.5} width={46} height={18} rx={4} fill="#fff" stroke="#e3e5ea" />
          <Label x={382.5} y={y + 6.5} size={8.5} anchor="middle">
            Monitor
          </Label>
        </g>
      ))}
    </Card>
  );
}

function Area({ x, w, color, fill, d }: { x: number; w: number; color: string; fill: string; d: string }) {
  return (
    <g transform={`translate(${x} 367)`}>
      <path d={`${d}V38H0z`} fill={fill} />
      <path d={d} fill="none" stroke={color} strokeWidth={1.4} />
      <path d={`M0 38h${w}`} stroke="#edefef" />
    </g>
  );
}

export function SiteHealthCard({ className = "" }: { className?: string }) {
  return (
    <Card className={className}>
      <Title y={34}>Site Health</Title>
      <Title x={228} y={34}>
        AI Search Health
      </Title>
      <GaugeArc cx={87} cy={127} r={55} w={15} value={72} color="#b5c4f5" track="#f0f1f3" />
      <text x={97} y={129} fontSize={24} fontWeight={600} fill={head} textAnchor="middle">
        75%
      </text>
      <GaugeArc cx={297} cy={127} r={55} w={15} value={45} color="#ffa947" track="#f0f1f3" />
      <text x={298} y={129} fontSize={24} fontWeight={600} fill="#f08c00" textAnchor="middle">
        45%
      </text>
      <Label x={25} y={162}>
        Crawled Pages
      </Label>
      {[
        [25, 16, "#3ddc97"],
        [41, 43, "#f26b7d"],
        [84, 30, "#ffa947"],
        [114, 10, "#b5c4f5"],
        [124, 12, "#e3e5ea"],
      ].map(([x, w, c]) => (
        <rect key={x as number} x={x as number} y={176} width={w as number} height={5} fill={c as string} />
      ))}
      {[
        ["Healthy", "#3ddc97", 201],
        ["Broken", "#f26b7d", 218],
        ["Have issues", "#ffa947", 235],
        ["Redirects", "#8fa4f0", 252],
      ].map(([t, c, y]) => (
        <g key={t as string}>
          <circle cx={30} cy={y as number} r={3} fill={c as string} />
          <Label x={40} y={y as number} size={10}>
            {t}
          </Label>
          <Pill x={150} y={y as number} w={17} />
        </g>
      ))}
      <Label x={228} y={163}>
        Blocked from AI Search
      </Label>
      {[186, 203, 221].map((y, i) => (
        <g key={y}>
          <circle cx={233} cy={y} r={4} fill="none" stroke={["#e0785a", "#9a9ca6", "#4aa7d8"][i]} strokeWidth={1.3} strokeDasharray="2 1.2" />
          <Pill x={244} y={y} w={27} />
          <Pill x={352} y={y} w={18} />
        </g>
      ))}
      <rect x={228.5} y={237.5} width={141} height={22} rx={5} fill="#f3effd" stroke="#e0d7fb" />
      <Label x={238} y={248.5} size={9.5} fill={head}>
        How to unblock pages
      </Label>
      <path d="m357 245 3 3.5-3 3.5" fill="none" stroke="#8fa4f0" strokeWidth={1.3} />
      {[
        [26, "Errors", "3.091", "#f26b7d"],
        [162, "Warnings", "339", "#f5a340"],
        [299, "Notices", "724", "#8fa4f0"],
      ].map(([x, t, v, c]) => (
        <g key={t as string}>
          <Label x={x as number} y={314} size={11}>
            {t}
          </Label>
          <text x={x as number} y={346} fontSize={20} fontWeight={600} fill={c as string}>
            {v}
          </text>
        </g>
      ))}
      <Area x={25} w={108} color="#f5a0a8" fill="#fdeef0" d="M0 26c8-10 14-6 22-4s12-8 22-4 8-10 18-12 10 10 18 16 14 4 28 4" />
      <Area x={162} w={108} color="#f7b35a" fill="#fff1de" d="M0 36c4-8 6-18 12-20s10 4 16 0 10-10 16-6 8 6 14 2 10-6 16 2 10-4 14 2 4 10 12 18" />
      <Area x={299} w={107} color="#a9b8f2" fill="#eef1fc" d="M0 36c6-8 10-16 18-14s12 6 18 2 8-10 16-12 8 6 14 12 12 8 20 10 12 0 21 0" />
    </Card>
  );
}

export function SovCard({ className = "" }: { className?: string }) {
  const bubbles: [number, number, number, string][] = [
    [36, 105, 11, "#f9c6f3"],
    [91, 87, 33, "#9ef0d8"],
    [132, 109, 27, "#a9a8ef"],
    [209, 102, 25, "#d6ddfd"],
    [235, 80, 18, "#e7a760"],
    [306, 82, 14, "#7fdcb9"],
    [351, 108, 20, "#9d9de8"],
    [393, 63, 9, "#f9b3bf"],
  ];
  return (
    <Card className={className}>
      <Title y={35}>Share of Voice vs. Sentiment</Title>
      {bubbles.map(([x, y, r, c], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={c} fillOpacity={0.85} />
          <path d={`M${x - 3} ${y}h6M${x} ${y - 3}v6`} stroke="#6a6ab8" strokeWidth={0.8} opacity={0.6} />
        </g>
      ))}
      <Title y={171} size={14}>
        Key Sentiment Drivers
      </Title>
      <path d="M31 194l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6v-4z" fill="none" stroke={muted} strokeWidth={1.2} />
      <Label x={44} y={200} size={11}>
        Brand Strength Factors
      </Label>
      <circle cx={229} cy={198} r={4} fill="none" stroke={muted} strokeWidth={1.2} />
      <path d="M229 202v4" stroke={muted} strokeWidth={1.2} />
      <Label x={241} y={200} size={11}>
        Areas for Improvement
      </Label>
      {[
        [218, 43],
        [246, 28],
        [270, 12],
      ].map(([y, w]) => (
        <g key={y}>
          <rect x={25} y={y} width={183} height={20} rx={4} fill="#dbfbf2" />
          <Pill x={33} y={y + 10} w={42} h={6} fill="#c3f4e5" />
          <Pill x={33} y={y + 10} w={w} h={6} fill="#35d69f" />
          <rect x={223} y={y} width={183} height={20} rx={4} fill="#fff2dc" />
          <Pill x={231} y={y + 10} w={42} h={6} fill="#fde2b8" />
          <Pill x={231} y={y + 10} w={w} h={6} fill="#ffa947" />
        </g>
      ))}
      <Title y={325} size={14}>
        AI Strategic Opportunities
      </Title>
      {[
        [25, "medium timeframe", "#fdeeda", "#d98a2b", 118],
        [223, "urgent timeframe", "#fde2e4", "#e0415b", 322],
      ].map(([x, t, bg, fg, bx]) => (
        <g key={t as string}>
          <rect x={x as number} y={344} width={183} height={61} rx={4} fill="#f3f4f6" />
          <rect x={bx as number} y={344} width={(x as number) + 183 - (bx as number)} height={14} rx={3} fill={bg as string} />
          <Label x={(x as number) + 179} y={351} size={8} anchor="end" fill={fg as string}>
            {t}
          </Label>
          <Pill x={(x as number) + 14} y={376} w={110} />
          <Pill x={(x as number) + 14} y={390} w={55} />
        </g>
      ))}
    </Card>
  );
}

export function Ga4Card({ className = "" }: { className?: string }) {
  const r = 51;
  const c = 2 * Math.PI * r;
  const segs: [number, string][] = [
    [0.5, "#b5c0f7"],
    [0.2, "#8ef0d0"],
    [0.18, "#f8a2f0"],
    [0.12, "#fcd57a"],
  ];
  let acc = 0;
  return (
    <Card className={className}>
      <Title y={37}>GA4 AI Traffic Overview</Title>
      <Title y={76} size={13}>
        Top AI Platforms
      </Title>
      <g transform="rotate(-90 86 158)">
        {segs.map(([v, col]) => {
          const el = <circle key={col} cx={86} cy={158} r={r} fill="none" stroke={col} strokeWidth={17} strokeDasharray={`${v * c - 1} ${c}`} strokeDashoffset={-acc * c} />;
          acc += v;
          return el;
        })}
      </g>
      {[
        [110, "#b5c4f5", "↑12%", "#1cc08a"],
        [132, "#3ddc97", "↑50%", "#1cc08a"],
        [155, "#f59ae8", "↑15%", "#1cc08a"],
        [177, "#fcd57a", "↓5%", "#f26b7d"],
      ].map(([y, col, v, vc]) => (
        <g key={y as number}>
          <circle cx={180} cy={y as number} r={4} fill={col as string} />
          <Pill x={190} y={y as number} w={63} h={6} />
          <Pill x={295} y={y as number} w={26} h={6} />
          <Label x={404} y={y as number} size={10} anchor="end" fill={vc as string}>
            {v}
          </Label>
        </g>
      ))}
      <path d="M175 194.5h230" stroke="#edefef" />
      <Label x={175} y={208} size={10}>
        Total
      </Label>
      <Pill x={295} y={208} w={26} h={6} />
      <Pill x={362} y={208} w={43} h={6} />
      {[
        [258, "Sessions", 279, "48", "↑23%"],
        [317, "Engaged Sessions", 338, "28", "↑16%"],
        [375, "Session Key Event Rate", 396, "28", "↑16%"],
      ].map(([y, t, vy, v, d]) => (
        <g key={t as string}>
          <Label x={25} y={y as number} size={10}>
            {t}
          </Label>
          <text x={25} y={(vy as number) + 6} fontSize={17} fontWeight={700} fill="#8fa4f0">
            {v}
          </text>
          <text x={48} y={(vy as number) + 5} fontSize={9} fill="#1cc08a">
            {d}
          </text>
        </g>
      ))}
      <Title x={174} y={258} size={12}>
        Sessions
      </Title>
      <path d="M174 280c6 6 10 18 20 14s10-14 18-4 14 24 20 42 10 30 18 16 10-38 20-44 12-16 20-8 10 20 16 8 12-44 20-34 4 60 12 72 14-26 22-30 14-12 20-16" fill="none" stroke="#b5c4f5" strokeWidth={1.4} />
      <path d="M174 394c8-8 14-20 20-18s8 16 14 16 10-26 16-24 10 20 16 20 12-40 20-34 12 30 22 28 10-10 16-14 12 4 18 14 10-20 18-22 10 4 16-6" fill="none" stroke="#b5c4f5" strokeWidth={1.4} strokeDasharray="4 3" />
    </Card>
  );
}

export function RankGaugeArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 206 130" width={206} height={130} className={className} aria-hidden>
      <defs>
        <radialGradient id="ov-g2" cx="50%" cy="100%" r="90%">
          <stop offset="0" stopColor="#fff8e6" />
          <stop offset="1" stopColor="#ffe2a2" />
        </radialGradient>
        <linearGradient id="ov-g3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
      </defs>
      <path d="M8 126a95 95 0 0 1 190 0" fill="none" stroke="#fdf1dc" strokeWidth={14} />
      <path d="M26 126a77 77 0 0 1 154 0z" fill="url(#ov-g2)" />
      <path d="M8 126a95 95 0 0 1 48-83" fill="none" stroke="#fda45a" strokeWidth={14} strokeLinecap="round" />
      <path d="M183 72l18-2-12 14z" fill="#d4b0fb" />
      <rect x="0" y="0" width="206" height="130" fill="url(#ov-g3)" />
      <text x={102} y={106} fontSize={30} fontWeight={700} fill="#f7934c" textAnchor="middle">
        Low
      </text>
    </svg>
  );
}

export function IssuesArt({ className = "" }: { className?: string }) {
  const rows = [
    { y: 14, label: "Technical structure", tag: "normal", tagBg: "#dbf6ee", tagFg: "#3aa98a", x: 10, bold: false },
    { y: 43, label: "Prompts missing", tag: "warning", tagBg: "#fde0d6", tagFg: "#e0613a", x: 4, bold: true },
    { y: 73, label: "Sources missing", tag: "warning", tagBg: "#fde0d6", tagFg: "#e0613a", x: 0, bold: true },
  ];
  return (
    <div className={`relative h-[120px] w-[212px] ${className}`}>
      <div className="absolute top-[86px] right-0 left-0 h-[34px] rounded-b-md bg-white shadow-[0_6px_14px_rgba(25,27,35,0.08)]">
        <span className="absolute top-[14px] left-[14px] h-[8px] w-[110px] rounded-full bg-[#eef1fa]" />
      </div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="absolute flex h-[30px] items-center gap-[7px] rounded-md bg-[#f6f7fc] pl-[10px] text-[11px] text-[#3a3d48] shadow-[0_2px_8px_rgba(25,27,35,0.08)]"
          style={{ top: r.y - 14, left: r.x, right: 0, fontWeight: r.bold ? 600 : 500, background: r.bold ? "#eef2fd" : "#f6f7fc" }}
        >
          <span className="h-[12px] w-[12px] rounded-[3px] border-[1.5px] border-[#b58af2]" />
          {r.label}
          <span className="absolute top-[-2px] right-[4px] rounded px-[8px] text-[9.5px] leading-[18px]" style={{ background: r.tagBg, color: r.tagFg }}>
            {r.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

export function GrowthArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 214 106" width={214} height={106} className={className} aria-hidden>
      <defs>
        <linearGradient id="ov-g4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcc8fb" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 50c10 10 16 30 30 30s18-24 34-28 26 12 44 12 30-4 44-20 20-32 44-34 18 0 18 0V106H0z" fill="url(#ov-g4)" opacity="0.7" />
      <path d="M2 50c10 10 16 30 30 30s18-24 34-28" fill="none" stroke="#4aa7ea" strokeWidth={3} strokeDasharray="7 5" strokeLinecap="round" />
      <path d="M66 52c16-4 26 12 44 12s30-4 44-20 20-32 44-34" fill="none" stroke="#a782ee" strokeWidth={3} strokeDasharray="7 5" strokeLinecap="round" />
      <circle cx={204} cy={9} r={7} fill="#e6d7fd" />
      <circle cx={204} cy={9} r={3.5} fill="#a782ee" />
    </svg>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import { MenuItem, Popover } from "@/components/ui/Popover";
import { FlagSE, FlagUK, FlagUS } from "@/components/ui/icons";
import { Chevron, OnboardingTip, SparkleIcon } from "./common";

type Mode = "domain" | "seed" | "manual";

const captions: Record<Mode, string> = {
  domain: "Strategy for new and existing content",
  seed: "Strategy for new content",
  manual: "Create a list of keywords for a future strategy",
};

const dbs = [
  { code: "US", name: "United States", flag: <FlagUS width={16} height={12} /> },
  { code: "UK", name: "United Kingdom", flag: <FlagUK width={16} height={12} /> },
  { code: "SE", name: "Sweden", flag: <FlagSE width={16} height={12} /> },
];

function DbSelect() {
  const [db, setDb] = useState(dbs[0]);
  return (
    <Popover
      align="right"
      panelClassName="w-[200px]"
      trigger={({ toggle }) => (
        <button type="button" onClick={toggle} className="flex h-10 w-[92px] items-center gap-2 rounded-md border border-rk-border bg-white px-3 text-[16px] hover:border-rk-border-strong">
          {db.flag}
          {db.code}
          <Chevron size={14} className="ml-auto" />
        </button>
      )}
    >
      {(close) =>
        dbs.map((d) => (
          <MenuItem
            key={d.code}
            active={d.code === db.code}
            onClick={() => {
              setDb(d);
              close();
            }}
          >
            {d.flag}
            {d.name}
          </MenuItem>
        ))
      }
    </Popover>
  );
}

function CreateBtn({ children = "Create" }: { children?: ReactNode }) {
  return (
    <button type="button" className="flex h-10 items-center gap-2 rounded-md bg-rk-btn-dark px-[13px] text-[16px] font-semibold text-white hover:bg-[#2b2e38]">
      {children}
    </button>
  );
}

function ModeSwitch({ mode, setMode, beacon }: { mode: Mode; setMode: (m: Mode) => void; beacon?: boolean }) {
  const items: { value: Mode; label: ReactNode }[] = [
    {
      value: "domain",
      label: (
        <span className="flex items-center gap-2">
          Domain-Based
          <span className="rounded-full bg-[#e85d0c] px-[5px] text-[11px] leading-[15px] font-semibold text-white">beta</span>
        </span>
      ),
    },
    { value: "seed", label: "Seed Keyword-Based" },
    { value: "manual", label: "Manual" },
  ];
  return (
    <div className="relative inline-flex">
      {items.map((it, i) => (
        <button
          key={it.value}
          type="button"
          onClick={() => setMode(it.value)}
          className={`relative -ml-px flex h-10 items-center border px-[11px] text-[16px] first:ml-0 ${i === 0 ? "rounded-l-md" : ""} ${i === items.length - 1 ? "rounded-r-md" : ""} ${
            mode === it.value ? "z-10 border-[#9ea6f5] bg-[#eef1fd]" : "border-rk-border bg-white hover:bg-rk-bg"
          }`}
        >
          {it.label}
        </button>
      ))}
      {beacon && <span className="absolute top-[24px] left-[162px] z-20 h-[10px] w-[10px] rounded-full bg-[#c9adfb] ring-2 ring-white/60" />}
    </div>
  );
}

function Builder({
  mode,
  setMode,
  title,
  headingClass,
  focus,
  tip,
  subtitle,
}: {
  subtitle?: ReactNode;
  mode: Mode;
  setMode: (m: Mode) => void;
  title: ReactNode;
  headingClass: string;
  focus?: boolean;
  tip?: ReactNode;
}) {
  const [share, setShare] = useState(false);
  const [seeds, setSeeds] = useState("");
  const seedLines = seeds.split("\n");
  const count = seedLines.filter((l) => l.trim()).length;
  const ring = "border-2 border-[#8f95f0] ring-2 ring-[#e3e5fc]";
  return (
    <div className={`relative rounded-lg bg-white px-6 pb-10 text-center shadow-card ${subtitle ? "pt-[37px]" : "pt-[38px]"}`}>
      <h2 className={headingClass}>{title}</h2>
      {subtitle && <p className="mt-[10px] text-[16px] leading-6">{subtitle}</p>}
      <div className={subtitle ? "mt-[33px]" : "mt-[31px]"}>
        <ModeSwitch mode={mode} setMode={setMode} beacon={!!tip} />
      </div>
      <div className="mt-[7px] text-[16px] leading-6 text-rk-muted">{captions[mode]}</div>
      {tip}
      <div className="mt-[17px] text-left xl:mx-auto xl:w-[734px]">
        {mode === "domain" && (
          <>
            <label className={`flex h-10 items-center gap-2 rounded-md bg-white px-[14px] ${focus ? "border-2 border-[#a98be5] ring-2 ring-[#eadcff] xl:border xl:border-[#d7d5df] xl:px-[13px] xl:ring-0 xl:focus-within:border-2 xl:focus-within:border-[#a98be5] xl:focus-within:px-[12px] xl:focus-within:ring-2" : "border border-[#d7d5df]"}`}>
              <SparkleIcon />
              <input autoFocus={focus} placeholder="Enter domain" className="min-w-0 flex-1 text-[16px] outline-none placeholder:text-rk-muted" />
            </label>
            <div className="mt-3 flex justify-end gap-3">
              <DbSelect />
              <CreateBtn />
            </div>
          </>
        )}
        {mode === "seed" && (
          <>
            <div className="flex items-center gap-[6px] text-[16px] leading-6 text-rk-text-2">
              Enter <span className="underline decoration-rk-faint decoration-dotted underline-offset-4">seed keywords</span>
              <span className="rounded-full border border-rk-border-strong px-[6px] text-[13px] leading-[20px]">{count}/5</span>
            </div>
            <div className={`mt-2 flex h-[93px] rounded-md bg-white ${ring}`}>
              <div className="w-[27px] shrink-0 pt-[9px] pr-[5px] text-right text-[16px] leading-6 text-rk-faint">
                {(seeds ? seedLines : ["", ""]).map((_, i) => (
                  <div key={i}>{i + 1}.</div>
                ))}
              </div>
              <textarea
                autoFocus={focus}
                value={seeds}
                onChange={(e) => setSeeds(e.target.value)}
                placeholder="books for elementary grades"
                className="flex-1 resize-none bg-transparent pt-[9px] pl-3 text-[16px] leading-6 outline-none placeholder:text-rk-faint"
              />
            </div>
            <div className="mt-[14px] flex items-center gap-3">
              <button type="button" className="h-10 rounded-md px-[13px] text-[16px] text-rk-text-2 hover:bg-rk-bg">
                View sample
              </button>
              <div className="ml-auto" />
              <DbSelect />
              <CreateBtn>
                Create
                <span className="rounded-full bg-white px-[6px] text-[13px] leading-[18px] font-semibold text-rk-text">{count}/30</span>
              </CreateBtn>
            </div>
          </>
        )}
        {mode === "manual" && (
          <>
            <input
              autoFocus={focus}
              placeholder="Enter list name"
              className={`h-10 w-full rounded-md bg-white px-3 text-[16px] outline-none placeholder:text-rk-muted ${focus ? ring : "border border-rk-border-strong"}`}
            />
            <div className="mt-3 flex items-center">
              <label className="flex cursor-pointer items-center gap-2 text-[16px]">
                <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} className="h-5 w-5 cursor-pointer appearance-none rounded-[4px] border border-rk-border-strong bg-white checked:border-[#6167e6] checked:bg-[#6167e6]" />
                Share once created
              </label>
              <div className="ml-auto">
                <CreateBtn />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const Bar = ({ w, c = "#ececef", h = 8 }: { w: number; c?: string; h?: number }) => <span className="block rounded-full" style={{ width: w, height: h, background: c }} />;

function PagesIllustration() {
  return (
    <div className="mx-auto mt-[48px] w-[442px] rounded-xl bg-[#f7f7f8] px-6 pt-6 pb-[23px] text-left xl:mt-0 xl:w-[443px]">
      <div className="inline-flex h-6 text-[11px] leading-[22px]">
        <span className="rounded-l-md border border-[#b9bef6] bg-[#eef1fd] px-3 text-rk-text-2">Pages to improve</span>
        <span className="-ml-px rounded-r-md border border-[#b9bef6] bg-white px-3 text-rk-text-2">Topics to create content</span>
      </div>
      <div className="mt-[10px] flex h-[150px] rounded-md bg-white shadow-[0_0_0_1px_#ececef]">
        <div className="w-[130px] border-r border-[#ececef] px-[17px] pt-[17px]">
          <div className="text-[13px] font-semibold text-rk-text-2">Pages</div>
          <div className="mt-[13px] flex flex-col gap-[13px]">
            <Bar w={91} c="#d0d0d4" />
            <Bar w={91} />
            <Bar w={91} />
            <Bar w={91} />
          </div>
        </div>
        <div className="relative flex-1 px-3 pt-4 text-[10px] leading-[14px] text-[#8e9099]">
          <div className="flex items-center gap-3">
            Title <Bar w={29} />
          </div>
          <div className="mt-[5px] flex items-center gap-3">
            URL <Bar w={76} />
          </div>
          <div className="mt-5">Keywords</div>
          <div className="mt-2 flex h-[14px] items-center">
            <Bar w={116} />
            <span className="ml-[42px] rounded-[3px] bg-[#fcd96b] px-[3px] text-[9px] font-bold text-[#8a5a00]">C</span>
            <span className="ml-auto flex items-center gap-1">
              <Bar w={16} />
              <span className="h-2 w-2 rounded-full bg-[#f08a90]" />
            </span>
          </div>
          <div className="mt-[7px] flex h-[14px] items-center">
            <Bar w={97} />
            <span className="ml-[61px] rounded-[3px] bg-[#9ef2c9] px-[3px] text-[9px] font-bold text-[#00785f]">T</span>
            <span className="ml-auto flex items-center gap-1">
              <Bar w={16} />
              <span className="h-2 w-2 rounded-full bg-[#fcd26b]" />
            </span>
          </div>
          <span className="absolute top-[18px] right-[16px] rounded-md bg-[#616161] px-[7px] py-[4px] text-[11px] text-white">Optimize page</span>
        </div>
      </div>
    </div>
  );
}

const Bubble = ({ x, y, r }: { x: number; y: number; r: number }) => (
  <circle cx={x} cy={y} r={r} fill="url(#kbb)" />
);

function TopicsIllustration() {
  return (
    <div className="mx-auto mt-[49px] w-[442px] rounded-xl bg-[#f7f7f8] px-6 pt-6 pb-6 text-left xl:mt-[47px] xl:w-[443px]">
      <div className="relative h-[116px] overflow-hidden rounded-md bg-white shadow-[0_0_0_1px_#ececef]">
        <div className="absolute top-[14px] left-[16px] text-[12px] font-semibold text-rk-text-2">Topical Overview</div>
        <span className="absolute top-[16px] right-[16px] rounded-md border border-[#e0e1e5] bg-[#f4f4f6] px-3 py-[2px] text-[12px] text-[#8e9099]">Export</span>
        <svg width={394} height={116} className="absolute inset-0">
          <defs>
            <linearGradient id="kbb" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e9c7fb" />
              <stop offset="1" stopColor="#a9d6ff" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="#e4e6f6">
            <circle cx="84" cy="84" r="27" />
            <circle cx="186" cy="77" r="45" />
            <circle cx="291" cy="48" r="23.5" />
          </g>
          <Bubble x={84} y={90} r={9} />
          <Bubble x={84} y={62} r={8} />
          <Bubble x={106} y={78} r={5.5} />
          <Bubble x={109} y={100} r={3.5} />
          <Bubble x={186} y={76} r={27} />
          <Bubble x={186} y={31} r={10.5} />
          <Bubble x={221} y={49} r={8.5} />
          <Bubble x={230} y={81} r={5} />
          <Bubble x={291} y={50} r={9} />
          <Bubble x={291} y={25} r={7.5} />
          <Bubble x={310} y={36} r={4} />
        </svg>
      </div>
      <div className="mt-[17px] pl-3 text-[12px] font-semibold text-rk-text-2">Topics</div>
      <div className="mt-[9px] flex gap-2">
        {["Volume", "KD %", "Intent"].map((f) => (
          <span key={f} className="flex h-[25px] items-center gap-3 rounded-md border border-[#e0e1e5] bg-white px-3 text-[12px] text-[#8e9099]">
            {f}
            <Chevron size={12} className="text-[#b5b7c0]" />
          </span>
        ))}
      </div>
      <div className="mt-[11px] flex flex-col gap-px">
        {[
          { i: "C", cls: "bg-[#fcd96b] text-[#8a5a00]", bar: "#e0e0e2", btn: true },
          { i: "T", cls: "bg-[#9ef2c9] text-[#00785f]", bar: "#e0e0e2" },
          { i: "I", cls: "bg-[#c4d8fd] text-[#2b53b8]", bar: "#e0e0e2" },
        ].map((r, k) => (
          <div
            key={r.i}
            className={`flex items-center rounded-md bg-white px-4 shadow-[0_0_0_1px_#efeff1,0_1px_3px_rgba(25,27,35,0.06)] ${k ? "h-[43px] [&>*]:opacity-50" : "h-12"}`}
          >
            <Bar w={91} c={r.bar} />
            <span className="ml-[27px]">
              <Bar w={29} c={r.bar} />
            </span>
            <span className={`ml-[28px] rounded-[3px] px-[3px] text-[9px] font-bold ${r.cls}`}>{r.i}</span>
            <span className="ml-[28px] flex items-center gap-1">
              <Bar w={16} c={r.bar} />
              <span className="h-2 w-2 rounded-full bg-[#f08a90]" />
            </span>
            {r.btn ? (
              <span className="ml-auto rounded-md bg-[#616161] px-2 py-[5px] text-[11px] text-white">Generate content</span>
            ) : (
              <span className="ml-auto h-[24px] w-[100px] rounded-md bg-[#c6c6c8] !opacity-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const bullets = {
  domain: [
    "Automatically generates keyword lists to improve on\u2011page optimization",
    "Identifies content gaps and suggests high-impact topics with ready-to-use keywords",
    "Improves SEO with data-driven insights",
  ],
  seed: ["Expands a single seed keyword into a wide set of related topics and keyword clusters", "Helps you find content that matches real user intent and demand", "Elevates your content ideation"],
};

const Hy = () => <span className="mx-[2px]">-</span>;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-[21px] flex flex-col gap-2 pl-[2px] text-[16px] leading-6">
      {items.map((b) => (
        <li key={b} className="flex gap-[11px]">
          <span className="mt-[10px] h-[5px] w-[5px] shrink-0 rounded-full bg-rk-muted" />
          {b}
        </li>
      ))}
    </ul>
  );
}

const shapes = [
  "polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)",
  "polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%, 16px 50%)",
  "polygon(0 0, 100% 0, 100% 100%, 0 100%, 16px 50%)",
];

function StepArt({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="relative h-[79px] w-[150px]">
        <div className="absolute top-0 left-0 flex h-[40px] w-[150px] items-center rounded-md bg-[#eef1fd] px-3">
          <Bar w={126} c="#c8d0f6" h={5} />
        </div>
        <div className="absolute bottom-0 left-[48px] h-[30px] w-[48px] rounded-md bg-[#f2f2f4]" />
        <div className="absolute right-0 bottom-0 h-[30px] w-[48px] rounded-md bg-[#c4c4c6]" />
      </div>
    );
  if (i === 1)
    return (
      <div className="relative h-[79px] w-[150px]">
        <div className="absolute top-0 left-0 flex h-[40px] w-[132px] items-center gap-2 rounded-md bg-[#f7f7f8] px-[10px]">
          <span className="h-4 w-4 rounded-[3px] bg-[#dcdcfb]" />
          <span className="flex flex-col gap-[4px]">
            <Bar w={32} c="#e6e6ea" h={5} />
            <Bar w={78} c="#e6e6ea" h={5} />
          </span>
        </div>
        <div className="absolute right-0 bottom-0 flex h-[40px] w-[132px] items-center gap-2 rounded-md bg-[#f7f7f8] px-[10px]">
          <span className="h-4 w-4 rounded-[3px] bg-[#b7f0a4]" />
          <span className="flex flex-col gap-[4px]">
            <Bar w={50} c="#e6e6ea" h={5} />
            <Bar w={78} c="#e6e6ea" h={5} />
          </span>
        </div>
      </div>
    );
  return (
    <div className="flex h-[79px] w-[150px] overflow-hidden rounded-md border border-[#f0f0f2]">
      <div className="flex w-[78px] flex-col gap-[7px] bg-[#f4f4f6] px-3 pt-3">
        <Bar w={30} c="#dcdcdf" h={5} />
        <Bar w={54} c="#dcdcdf" h={5} />
        <Bar w={54} c="#dcdcdf" h={5} />
        <Bar w={54} c="#dcdcdf" h={5} />
        <Bar w={54} c="#dcdcdf" h={5} />
      </div>
      <div className="flex-1 bg-white px-[12px] pt-3">
        <svg width={26} height={26} viewBox="0 0 26 26">
          <circle cx="13" cy="13" r="10" fill="none" stroke="#9ff0d6" strokeWidth={5} />
        </svg>
        <div className="mt-[9px] flex gap-[9px]">
          <span className="h-2 w-2 rounded-[2px] bg-[#dcdcdf]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#dcdcdf]" />
          <span className="h-2 w-2 rounded-[2px] bg-[#dcdcdf]" />
        </div>
      </div>
    </div>
  );
}

const steps = [
  { title: "Enter domain or keyword", text: "Depending on what you want to base your strategy on.", left: 0, width: 332 },
  { title: "Get recommendations", text: "Analyze topics and content gaps.", left: 322, width: 346 },
  { title: "Generate content", text: "Create content with keywords to monitor.", left: 658, width: 328 },
];

export function StrategyBuilder() {
  const [mode, setMode] = useState<Mode>("domain");
  const [tip, setTip] = useState(true);
  const change = (m: Mode) => {
    setMode(m);
    setTip(false);
  };
  return (
    <div className="mx-auto w-[986px] pt-[25px] xl:w-[989px]">
      <Builder
        mode={mode}
        setMode={change}
        title="Keyword Strategy Builder"
        headingClass="text-[36px] leading-[44px] font-semibold"
        subtitle={
          <>
            Drive more traffic with a ready-made strategy <br className="xl:hidden" />
            based on your website or a keyword.
          </>
        }
        focus
        tip={
          tip && mode === "domain" ? (
            <OnboardingTip
              className="top-[215px] left-[440px] w-[346px] gap-[14px] text-left"
              title="You can now build strategy based on your domain"
              onClose={() => setTip(false)}
              actions={
                <>
                  <button type="button" onClick={() => setTip(false)} className="h-7 rounded-md bg-white px-2 text-[14px] text-rk-text hover:bg-[#f5f6f6]">
                    Got it
                  </button>
                  <button type="button" onClick={() => setTip(false)} className="text-[14px] text-[#6a6c6a] hover:text-rk-text">
                    Remind me later
                  </button>
                </>
              }
            >
              Get tips and keywords for your existing pages and new content.
            </OnboardingTip>
          ) : undefined
        }
      />

      <div className="mt-4 rounded-lg bg-white px-6 pt-[70px] pb-10 shadow-card xl:grid xl:grid-cols-[1fr_443px] xl:gap-x-[4px] xl:px-[49px] xl:pt-10 xl:pb-10">
        <div className="xl:pt-[30px] xl:pr-5">
          <h3 className="text-[24px] leading-8 font-semibold">Domain<Hy />based strategy</h3>
          <Bullets items={bullets.domain} />
        </div>
        <PagesIllustration />
        <div className="xl:order-4 xl:self-center xl:pl-[48px]">
          <h3 className="mt-[78px] text-[24px] leading-8 font-semibold xl:mt-0">Seed keyword<Hy />based strategy</h3>
          <Bullets items={bullets.seed} />
        </div>
        <div className="xl:order-3">
          <TopicsIllustration />
        </div>
      </div>

      <h3 className="mt-[38px] text-[24px] leading-8 font-semibold">How it works</h3>
      <div className="relative mt-[22px] h-[215px] drop-shadow-[0_1px_1px_rgba(25,27,35,0.12)]">
        {steps.map((s, i) => (
          <div key={s.title} className="absolute top-0 h-full bg-white" style={{ left: s.left, width: s.width, clipPath: shapes[i], borderRadius: i === 0 ? "8px 0 0 8px" : i === 2 ? "0 8px 8px 0" : 0 }}>
            <div className="flex h-[107px] justify-center pt-7" style={{ paddingLeft: i ? 16 : 0, paddingRight: i < 2 ? 16 : 0 }}>
              <StepArt i={i} />
            </div>
            <div className="mt-[18px] text-[16px] leading-5" style={{ paddingLeft: i ? 36 : 20, paddingRight: 36 }}>
              <div className="font-semibold">{s.title}</div>
              <div className="mt-[6px] text-rk-text">{s.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Builder mode={mode} setMode={change} title={<>Drive more traffic with a ready<Hy />made keyword strategy</>} headingClass="text-[24px] leading-8 font-semibold" />
      </div>
    </div>
  );
}

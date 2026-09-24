import type { ReactNode } from "react";
import type { FeatureKey } from "./data";

const ink = { fill: "none", stroke: "#111", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Frame({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 140 130" width={140} height={130} className="block">
      <circle cx={72} cy={66} r={56} fill={bg} />
      {children}
    </svg>
  );
}

export function FeatureArt({ kind, active }: { kind: FeatureKey; active: boolean }) {
  const bg = active ? "#ffe452" : "#e3e8ee";
  if (kind === "seo")
    return (
      <Frame bg={bg}>
        <circle cx={36} cy={38} r={22} fill="#fff27a" stroke="#111" strokeWidth={2.2} />
        <path {...ink} d="M28 38c2-5 5-5 7 0s5 5 7 0M31 56l-6 22 7 6 11-19" />
        <path {...ink} d="M25 78l-3 12 9-5" fill="#111" />
        <rect x={62} y={36} width={60} height={46} rx={4} fill="#fff" stroke="#111" strokeWidth={2.2} />
        <path d="M62 44h60" stroke="#111" strokeWidth={8} />
        <circle cx={70} cy={44} r={2} fill="#fff" />
        <circle cx={77} cy={44} r={2} fill="#fff" />
        <circle cx={84} cy={44} r={2} fill="#fff" />
        <path d="M74 72l10-12 7 8 5-5 8 9z" fill="#111" />
        <circle cx={100} cy={56} r={3} fill="#111" />
        <path {...ink} d="M58 94h40M58 102h30" />
      </Frame>
    );
  if (kind === "readability")
    return (
      <Frame bg={bg}>
        <path d="M22 88l60-22 28 16-58 26z" fill="#fff" stroke="#111" strokeWidth={2.2} strokeLinejoin="round" />
        <path d="M24 94l28 18 60-26" {...ink} />
        <path {...ink} d="M64 92c4-4 6 2 10-2s6 2 10-2" />
        <circle cx={92} cy={96} r={3} fill="#111" />
        <path d="M18 30l22-8 10 26-22 8z" fill="#fff" stroke="#111" strokeWidth={2.2} strokeLinejoin="round" />
        <path {...ink} d="M24 36c2 3 3-3 5 0M27 43c2 3 3-3 5 0" />
        <path d="M58 20l12-6 6 12-4 44-10 6-6-10z" fill="#fff" stroke="#111" strokeWidth={2.2} strokeLinejoin="round" />
        <path {...ink} d="M60 62l6 16 6-14" />
        <path d="M86 26c10-6 22 2 26 14l-22 18-10-8z" fill="#111" />
        <path {...ink} d="M54 70c6-4 14-2 18 4s-2 12-8 10" />
      </Frame>
    );
  if (kind === "tone")
    return (
      <Frame bg={bg}>
        <g stroke="#111" strokeWidth={2.2} strokeLinejoin="round">
          <path d="M18 22h34v10c4-2 8 2 4 6h-4v12H18z" fill="#fff" />
          <path d="M58 22h40v34H58z" fill="#fff" />
          <path d="M20 58h32v10c-4-2-8 2-4 6h4v14H20z" fill="#fff" />
          <path d="M56 56h36v38H56V80c4 2 8-2 4-6h-4z" fill="#fff" />
        </g>
        <circle cx={34} cy={33} r={4} fill="#111" />
        <path d="M26 45c2-6 14-6 16 0z" fill="#111" />
        <circle cx={74} cy={68} r={4} fill="#111" />
        <path d="M66 80c2-6 14-6 16 0z" fill="#111" />
        <path {...ink} d="M66 32h24M66 40h20M26 72h16M26 80h12" />
        <path d="M86 88c6-2 12 4 10 12l-8 20H74l4-16z" fill="#fff" stroke="#111" strokeWidth={2.2} />
        <path d="M76 120l10-2 2 10H74z" fill="#111" />
      </Frame>
    );
  return (
    <Frame bg={bg}>
      <g stroke="#111" strokeWidth={2.2}>
        <ellipse cx={32} cy={36} rx={16} ry={18} fill="#fff" />
        <ellipse cx={32} cy={36} rx={10} ry={12} fill="#fff" />
        <ellipse cx={62} cy={30} rx={16} ry={18} fill="#fff" />
        <ellipse cx={62} cy={30} rx={10} ry={12} fill="#fff" />
        <path d="M34 54l6 50h26l8-60" fill="#fff" strokeLinejoin="round" />
        <path d="M92 10l-6 10 20 6 4-6c-6-6-12-10-18-10z" fill="#fff" />
        <path d="M80 22l34 10" />
        <path d="M86 30c-2 10 2 20 10 22l-4 60h14l6-58c6-4 6-14 2-20z" fill="#fff" strokeLinejoin="round" />
      </g>
      <path d="M58 58l10 50h8l-6-50z" fill="#111" />
      <path d="M92 60l-2 50h8l4-50z" fill="#111" />
    </Frame>
  );
}

const Tb = ({ children }: { children: ReactNode }) => (
  <span className="flex h-[22px] items-center gap-[10px] rounded-[4px] bg-white px-[8px] text-[13px] text-[#484a54] shadow-[0_0_1px_rgba(0,0,0,0.3)]">{children}</span>
);

const Hl = ({ children }: { children: ReactNode }) => <span className="bg-[#c9f3e6]">{children}</span>;

function Chip({ children, on, clip }: { children: ReactNode; on?: boolean; clip?: boolean }) {
  return (
    <span
      className={`inline-flex h-8 items-center overflow-hidden rounded-full px-[13px] text-[14.5px] whitespace-nowrap ${
        on ? "bg-[#d5f5ec] text-[#1fb892]" : "border border-[#a9abb6] text-[#6c6e79]"
      } ${clip ? "w-[134px]" : ""}`}
    >
      {children}
    </span>
  );
}

function Panel({ kind }: { kind: FeatureKey }) {
  if (kind === "seo")
    return (
      <>
        <div className="text-[12px] leading-[22px] font-bold text-rk-text">Target keywords</div>
        <p className="mt-[3px] w-[268px] text-[12px] leading-[22px] text-[#484a54]">Target keywords are phrases that summarize your text. They are what people type into Google search.</p>
        <div className="mt-[12px] flex w-[290px] flex-wrap gap-x-[9px] gap-y-[4px]">
          <Chip>how to write good content</Chip>
          <Chip on>seo strategy</Chip>
          <Chip>website content</Chip>
        </div>
        <div className="mt-[30px] text-[12px] leading-[22px] font-bold text-rk-text">Recommended keywords</div>
        <p className="mt-[2px] w-[222px] text-[12px] leading-[22px] text-[#484a54]">Enrich your text with these keywords to get better SEO results.</p>
        <div className="mt-[12px] flex w-[300px] flex-wrap gap-x-[5px] gap-y-[4px]">
          <Chip on>keyword research</Chip>
          <Chip on clip>
            content creation
          </Chip>
          <Chip>competitor’s content</Chip>
        </div>
      </>
    );
  if (kind === "readability")
    return (
      <>
        <div className="text-[12px] leading-[22px] font-bold text-rk-text">Readability</div>
        <div className="mt-2 text-[28px] font-semibold text-[#1fb892]">72.4</div>
        <p className="mt-1 w-[250px] text-[12px] leading-[22px] text-[#484a54]">Your text is fairly easy to read. Target score based on your top 10 rivals: 68.</p>
        <div className="mt-4 flex flex-col gap-2 text-[12px] text-[#484a54]">
          {["Rewrite hard to read sentences", "Simplify complex words", "Add more subheadings"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="h-[7px] w-[7px] rounded-full bg-[#ff4953]" />
              {t}
            </span>
          ))}
        </div>
      </>
    );
  if (kind === "tone")
    return (
      <>
        <div className="text-[12px] leading-[22px] font-bold text-rk-text">Tone of voice</div>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-[#484a54]">
          Casual
          <span className="relative h-[6px] w-[160px] rounded-full bg-[#e0e1e9]">
            <span className="absolute top-1/2 left-[62%] h-3 w-3 -translate-y-1/2 rounded-full bg-[#1fb892]" />
          </span>
          Formal
        </div>
        <p className="mt-4 w-[250px] text-[12px] leading-[22px] text-[#484a54]">Your text is consistent with the formal tone you selected. 2 sentences sound too casual.</p>
        <div className="mt-4 flex w-[290px] flex-wrap gap-2">
          <Chip on>consistent</Chip>
          <Chip>2 sentences to review</Chip>
        </div>
      </>
    );
  return (
    <>
      <div className="text-[12px] leading-[22px] font-bold text-rk-text">Originality</div>
      <div className="mt-2 text-[28px] font-semibold text-[#1fb892]">61.1%</div>
      <div className="mt-1 h-1 w-[240px] rounded-full bg-[#e0e1e9]">
        <div className="h-full w-[60%] rounded-full bg-[#1fb892]" />
      </div>
      <p className="mt-3 w-[250px] text-[12px] leading-[22px] text-[#484a54]">The total percent of your text is not similar to other sources.</p>
      <div className="mt-3 flex items-center gap-2 text-[12px] font-bold text-rk-text">
        <span className="h-[7px] w-[7px] rounded-full bg-[#ff4953]" />
        Unoriginal text <span className="font-normal text-rk-muted">(3)</span>
      </div>
    </>
  );
}

export function EditorMock({ kind }: { kind: FeatureKey }) {
  return (
    <div className="relative h-[434px] w-[723px] overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(25,27,35,0.10),0_0_1px_rgba(25,27,35,0.15)]">
      <div className="absolute top-[39px] left-[38px] h-[357px] w-[331px] rounded-lg bg-[#f2f5f8] px-[26px] pt-[21px]">
        <div className="flex justify-center gap-[12px]">
          <Tb>
            <span>
              H<sub className="text-[8px]">1</sub>
            </span>
            <span>
              H<sub className="text-[8px]">2</sub>
            </span>
          </Tb>
          <Tb>
            <b>B</b>
            <i className="font-serif">I</i>
          </Tb>
          <Tb>
            <span>⋮≡</span>
            <span>≔</span>
          </Tb>
          <Tb>
            <span>∞</span>
          </Tb>
          <Tb>
            <i className="font-serif underline">T</i>
          </Tb>
        </div>
        <div className="mt-[20px] text-[12.2px] leading-[21.8px] tracking-[-0.1px] text-[#484a54]">
          <p>
            Content creation is a pillar of a successful SEO strategy. It’s also important because it’s one of the few elements of your <Hl>SEO strategy</Hl> you have
            direct control over.
          </p>
          <p className="mt-[21.8px]">
            With proper strategy and insight, it can be a fun, illuminating process for you and your team. But if you’re new to <Hl>content creation</Hl>, try our guide
            below.
          </p>
          <p className="mt-[21.8px]">
            Start with <Hl>Keyword Research</Hl>. One of the first things you should do when...
          </p>
        </div>
      </div>
      <div className="absolute top-[35px] left-[407px]">
        <Panel kind={kind} />
      </div>
    </div>
  );
}

function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`absolute flex h-[27px] items-center justify-center rounded-full bg-[#e8eaed] text-[13px] text-[#6c6e79] ${className}`}>{children}</span>;
}

export function ScoreMock() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
      <div className="absolute top-[39px] left-[371px] h-[700px] w-[317px] rounded-xl bg-[#f7f9fa] shadow-[0_6px_30px_rgba(25,27,35,0.08)]">
        <div className="mt-[24px] text-center text-[14px] text-[#1fb892]">
          Good <b className="text-[16px]">7.4</b> <span className="text-[13px] text-[#6c6e79]">/10</span>
        </div>
        <Pill className="top-[63px] left-[39px] w-[83px]">Readability</Pill>
        <Pill className="top-[63px] left-[200px] w-[79px]">SEO</Pill>
        <svg className="absolute top-[88px] left-[58px]" width={200} height={190} viewBox="0 0 200 190">
          <path d="M40 20l40 40M160 20l-40 40M40 170l40-40M160 170l-40-40" stroke="#c4c7cf" strokeDasharray="2 3" />
          <circle cx={100} cy={92} r={78} fill="none" stroke="#c9ced3" strokeWidth={3} />
          <circle cx={100} cy={92} r={62} fill="#eceef0" stroke="#c4c7cf" strokeDasharray="2 3" />
          <circle cx={100} cy={92} r={40} fill="none" stroke="#c4c7cf" strokeDasharray="2 3" />
          <path d="M65 145C35 120 36 60 70 42s70-10 76 20" fill="none" stroke="#1fb892" strokeWidth={3.5} strokeLinecap="round" />
          <path d="M146 62c8 30-4 60-40 72-18 6-32 6-41 11" fill="none" stroke="#e8753a" strokeWidth={3.5} strokeLinecap="round" />
          <circle cx={70} cy={42} r={3.5} fill="#1fb892" />
          <circle cx={143} cy={52} r={3.5} fill="#1fb892" />
          <circle cx={65} cy={145} r={3.5} fill="#1fb892" />
          <circle cx={125} cy={122} r={3.5} fill="#e8753a" />
          <rect x={80} y={164} width={40} height={14} fill="#f7f9fa" />
          <text x={100} y={174} textAnchor="middle" fontSize={11} fill="#6c6e79">
            Target
          </text>
        </svg>
        <Pill className="top-[266px] left-[39px] w-[78px]">Originality</Pill>
        <Pill className="top-[266px] left-[183px] w-[100px]">Tone of voice</Pill>
        <div className="absolute top-[328px] left-[30px] h-[118px] w-[238px] rounded-lg bg-white px-5 pt-[14px] shadow-[0_1px_6px_rgba(25,27,35,0.08)]">
          <div className="text-[16px] font-bold">Readability</div>
          <svg viewBox="0 0 16 16" width={16} height={16} className="absolute top-[18px] right-[4px]"><path d="M3 13l1-4 7-7 3 3-7 7z" fill="#a9abb6" /></svg>
          <div className="mt-[17px] flex items-center gap-[12px] text-[13px] whitespace-nowrap text-[#484a54]">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#e8173b]" />
            Rewrite hard to read sentences
          </div>
          <div className="dotted-underline mt-[9px] ml-[19px] text-[13px] text-[#6c6e79] decoration-[#a9abb6]">5 more problems</div>
        </div>
        <div className="absolute top-[458px] left-[30px] h-[150px] w-[238px] rounded-lg bg-white px-5 pt-[14px] shadow-[0_1px_6px_rgba(25,27,35,0.08)]">
          <div className="text-[16px] font-bold">SEO</div>
          <svg viewBox="0 0 16 16" width={16} height={16} className="absolute top-[18px] right-[4px]"><path d="M3 13l1-4 7-7 3 3-7 7z" fill="#a9abb6" /></svg>
          <div className="mt-[19px] flex items-start gap-[12px] text-[13px] leading-[17px] text-[#484a54]">
            <span className="mt-[5px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#e8173b]" />
            <span className="w-[190px] shrink-0">Use at least one of your target keywords.</span>
          </div>
          <div className="dotted-underline mt-[10px] ml-[19px] text-[13px] text-[#6c6e79] decoration-[#a9abb6]">5 more problems</div>
        </div>
      </div>
      <div className="absolute top-[165px] left-[632px] h-[600px] w-[304px] rounded-xl bg-white shadow-[0_6px_30px_rgba(25,27,35,0.12)]">
        <div className="pt-[28px] pr-[28px] pl-[33px] text-[12.8px]">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-bold">Originality</span>
            <svg viewBox="0 0 16 16" width={16} height={16}>
              <path d="M3 13l1-4 7-7 3 3-7 7z" fill="#a9abb6" />
            </svg>
          </div>
          <div className="mt-[21px] flex gap-3 leading-[17px] text-[#484a54]">
            <span className="mt-[5px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#e8173b]" />
            <span>
              The text has been changed since the last check (currently <b className="text-rk-text">23%</b> similar). Originality data may be obsolete.
            </span>
          </div>
          <div className="mt-[12px] ml-[19px] flex justify-between text-[13px] text-[#484a54]">
            Checks used
            <span>
              3<span className="text-[#6c6e79]">/10</span>
            </span>
          </div>
          <div className="mt-[5px] ml-[19px] h-[4px] rounded-full bg-[#e8eaed]">
            <div className="h-full w-[22%] rounded-full bg-[#5c6b6f]" />
          </div>
          <span className="mt-[12px] ml-[19px] inline-flex h-[26px] items-center rounded-md border border-[#d6d8dd] bg-[#f4f5f6] px-[15px] text-[11px] text-[#484a54]">Recheck</span>
        </div>
        <div className="mt-[22px] border-t border-[#e8eaed] px-[33px] pt-[20px]">
          <div className="text-[22px] leading-7 text-[#1fb892]">61.1%</div>
          <div className="mt-[4px] h-[4px] rounded-full bg-[#e8eaed]">
            <div className="h-full w-[60%] rounded-full bg-[#1fb892]" />
          </div>
          <p className="mt-[17px] text-[13px] leading-[17px] text-[#484a54]">The total percent of your text is not similar to other sources.</p>
          <div className="mt-[22px] -ml-[3px] flex items-center gap-[10px] text-[13px] font-semibold">
            <span className="h-[7px] w-[7px] rounded-full bg-[#e8173b]" />
            Unoriginal text <span className="font-normal text-[#6c6e79]">(3)</span>
          </div>
          <div className="mt-[14px] rounded-lg border border-[#e8eaed] px-[14px] pt-[11px] pb-4 text-[13px] leading-[17px]">
            <div>
              <b className="text-[#e8173b]">120</b> copied words:
            </div>
            <p className="mt-2 text-[#6c6e79] italic">The tool returns a list of suggested keywords and their search volume, keyword difficulty and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const GoogleDocIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M3 1h7l3 3v11H3z" fill="#4285f4" />
    <path d="M10 1v3h3z" fill="#a1c2fa" />
    <path d="M5.5 8h5M5.5 10h5M5.5 12h3" stroke="#fff" strokeWidth={1} />
  </svg>
);
export const WordPressIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <circle cx="8" cy="8" r="6.8" fill="none" stroke="#6c6e79" strokeWidth={1.2} />
    <path d="M3.8 5.5l3 7.5 1.4-4 1.3 4 2.3-6.8M3 5.5h2.2M7 5.5h2.2" fill="none" stroke="#6c6e79" strokeWidth={1.1} strokeLinejoin="round" />
  </svg>
);
export const OfficeIcon = () => (
  <svg viewBox="0 0 16 16" width={16} height={16}>
    <path d="M3 3.8 9.8 1.5 13 2.8v10.4l-3.2 1.3L3 12.2l6.8.8V3.2L5 4.5v6.3L3 12.2z" fill="#e8491d" />
  </svg>
);
export const ClipboardIcon = () => (
  <svg viewBox="0 0 48 58" width={48} height={58}>
    <rect x={3} y={8} width={42} height={47} rx={4} fill="#fff" stroke="#c0480f" strokeWidth={5} />
    <rect x={14} y={2} width={20} height={9} rx={3} fill="#111" />
    <path d="M13 32l8 8 14-16" fill="none" stroke="#111" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

import { A, Gauge, Line, Sparkle } from "./kit";
import { RepurposeList } from "./Heroes";
import type { FeatureArtKind } from "./data";

const card = "rounded-xl bg-white shadow-[0_4px_18px_rgba(25,27,35,0.1)]";
const item = "flex items-center rounded-md border-l-[3px] border-[#b9a4f3] bg-white pl-[10px] text-[12.5px] shadow-[0_2px_10px_rgba(25,27,35,0.1)]";

function Generate() {
  return (
    <>
      <A x={-10} y={105} w={230} h={168} className="rounded-full bg-[#e8f9d9]" />
      <A x={73} y={18} w={209} h={240} className={`${card} px-[16px] pt-[16px]`}>
        <div className="text-[13px] font-semibold text-[#484a49]">Brand voice</div>
        <div className="mt-[8px] rounded-md bg-[#f3f3f5] px-[10px] py-[7px] text-[12.5px]">🐶 The Puppy POV</div>
        <div className="mt-[12px] text-[13px] font-semibold text-[#484a49]">Topic</div>
        <div className="mt-[8px] rounded-md border border-[#e3e3ea] px-[10px] py-[7px] text-[12.5px]">Best puppy dry food</div>
        <div className="mt-[12px] flex items-center gap-2 text-[12.5px]">
          <span className="h-[14px] w-[14px] rounded-[3px] bg-[#8b5cf6]" /> SEO Booster
        </div>
        <div className="mt-[8px] flex items-center gap-2 text-[12.5px]">
          <span className="h-[14px] w-[14px] rounded-[3px] bg-[#8b5cf6]" /> AI-generated images
        </div>
      </A>
      <A x={86} y={226} w={140} h={18} className="flex items-center justify-center gap-1 rounded-md bg-gradient-to-r from-[#d7c2fb] to-[#bcd0fb] text-[12px] text-white">
        ✦ Generate article
      </A>
    </>
  );
}

function Optimize() {
  return (
    <>
      <A x={135} y={14} w={270} h={270} className="rounded-full bg-[#f1ecfd]" />
      <A x={38} y={44} w={307} h={207} className={card}>
        <div className="absolute top-0 right-0 bottom-0 w-[60px] border-l border-[#ececf0] pt-[18px] text-center text-[11px] text-[#6a6c6a]">
          <div className="text-[18px] leading-5">⚙</div>
          SEO
          <div className="mx-auto mt-[14px] flex h-[28px] w-[28px] items-center justify-center rounded-md bg-[#efeafd] text-[#8b5cf6]">
            <Sparkle />
          </div>
          <div className="text-[#8b5cf6]">AI SEO</div>
          <div className="mt-[14px] text-[18px] leading-5">▣</div>
          <span className="text-[#d6d8d7]">Images</span>
        </div>
        <div className="px-[12px] pt-[10px] text-[13.5px] font-semibold">AI SEO Improvements</div>
        <div className="mx-[12px] mt-[8px] flex h-[22px] w-[221px] items-center justify-center gap-1 rounded-md border border-[#c9bdf6] bg-[#f6f3fe] text-[11px]">
          <Sparkle /> Improve all
        </div>
        <div className="mt-[10px] px-[12px] text-[12.5px]">
          <b className="font-semibold">Improvements</b> (by importance)
        </div>
      </A>
      <A x={17} y={141} w={221} h={32} className={item}>
        Show authorship and credentials
      </A>
      <A x={47} y={186} w={220} h={31} className={item}>
        Use natural Q&amp;A format
      </A>
      <A x={27} y={228} w={221} h={31} className={item}>
        Summarize first, then expand
      </A>
    </>
  );
}

function Repurpose() {
  return (
    <>
      <A x={168} y={24} w={240} h={240} className="rounded-full bg-[#d3fbee]" />
      <A x={15} y={14} w={233} h={207} className={card} />
      <A x={28} y={28} className="flex items-center gap-[8px] text-[15px] text-[#484a49]">
        <span className="text-[16px]">▤</span> Article
      </A>
      <A x={131} y={28} w={107} h={24} className="flex items-center justify-center gap-[6px] rounded-md bg-[#f3f3f5] text-[14px] text-[#6a6c6a]">
        ⇅ Repurpose
      </A>
      <A x={26} y={76}>
        <Gauge size={40} value={0.55} />
      </A>
      {[109, 128, 147, 167, 186, 205].map((y) => (
        <Line key={y} x={26} y={y} w={100} />
      ))}
      <A x={130} y={56} w={208} h={198} className={`${card} bg-white`} />
      <A x={130} y={60} w={208} h={196}>
        <div className="relative">
          <RepurposeList items={["Email", "Facebook", "Instagram", "LinkedIn", "X", "Pinterest", "Google Business profile"]} checked={["Instagram", "LinkedIn", "X"]} x={0} y={0} pitch={27} bg="#eef0fe" />
        </div>
      </A>
    </>
  );
}

function Topics() {
  return (
    <>
      <A x={120} y={20} w={260} h={260} className="rounded-full bg-[#fff3d9]" />
      <A x={30} y={30} w={320} h={230} className={`${card} px-[16px] pt-[14px]`}>
        <div className="text-[14px] font-semibold">Best-performing topics</div>
        {[
          ["Low-hanging fruit", "best dog food ratings"],
          ["Low-hanging fruit", "buy natural dog food"],
          ["Balanced growth", "homemade dog food recipes"],
        ].map(([t, k], i) => (
          <div key={k} className="mt-[10px] border-t border-[#ececf0] pt-[8px]">
            <span className={`rounded-full px-[7px] text-[11px] ${i === 2 ? "bg-[#e5e7fd] text-[#5a5fc0]" : "bg-[#d6f7ea] text-[#0a8a5f]"}`}>{t}</span>
            <div className="mt-[3px] text-[13px]">{k}</div>
          </div>
        ))}
      </A>
    </>
  );
}

function Brief() {
  return (
    <>
      <A x={130} y={20} w={260} h={260} className="rounded-full bg-[#f1ecfd]" />
      <A x={30} y={30} w={320} h={230} className={`${card} px-[18px] pt-[16px]`}>
        <div className="text-[17px] font-semibold text-[#484a49]">SEO Content Brief</div>
        <div className="mt-[10px] flex gap-2 text-[12px]">
          <span className="rounded-full bg-[#d9faf1] px-[9px] py-[3px]">puppy food</span>
          <span className="rounded-full bg-[#fdf3c9] px-[9px] py-[3px]">puppy kibble brands</span>
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="mt-[13px] h-[7px] rounded-full bg-[#e3e3e8]" style={{ width: [260, 220, 250, 180, 230][i] }} />
        ))}
      </A>
    </>
  );
}

export function FeatureArt({ kind }: { kind: FeatureArtKind }) {
  const C = { generate: Generate, optimize: Optimize, repurpose: Repurpose, topics: Topics, brief: Brief }[kind];
  return (
    <div className="relative h-[296px] w-[400px]">
      <C />
    </div>
  );
}

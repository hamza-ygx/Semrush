import { ChevronDown } from "@/components/ui/icons";
import { A, Chip, DocsChip, EDITOR, FRAME, FoodBag, Gauge, Line, LogoTile, MUTED, PANEL, Sparkle, TitleKeywords, Toolbar } from "./kit";

function Frame({ w, h, children, bg = FRAME }: { w: number; h: number; children: React.ReactNode; bg?: string }) {
  return (
    <div className="relative mx-auto overflow-hidden rounded-lg whitespace-nowrap" style={{ width: w, height: h, background: bg }}>
      {children}
    </div>
  );
}

const checkbox = (on: boolean) => (
  <span className={`flex h-[14px] w-[14px] items-center justify-center rounded-[3px] ${on ? "bg-[#6b5b95]" : "border border-[#c9a3f7] bg-[#e3cdfc]"}`}>
    {on && (
      <svg viewBox="0 0 10 10" width={9} height={9}>
        <path d="m2 5 2 2 4-4" fill="none" stroke="#fff" strokeWidth={1.6} />
      </svg>
    )}
  </span>
);

function SocialIcon({ k }: { k: string }) {
  const c = { Email: "#6c6e79", Facebook: "#6c6e79", Instagram: "#e1306c", LinkedIn: "#0a66c2", X: "#484a54", Pinterest: "#6c6e79", "Google Business profile": "#6c6e79" }[k] ?? "#6c6e79";
  if (k === "LinkedIn") return <span className="text-[15px] leading-none font-bold" style={{ color: c }}>in</span>;
  if (k === "X") return <span className="text-[13px] leading-none" style={{ color: c }}>𝕏</span>;
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} aria-hidden>
      {k === "Email" ? <path d="M2 4h12v8H2zM2 4l6 5 6-5" fill="none" stroke={c} strokeWidth={1.3} /> : k === "Instagram" ? <><rect x="2" y="2" width="12" height="12" rx="3.5" fill="none" stroke={c} strokeWidth={1.4} /><circle cx="8" cy="8" r="2.7" fill="none" stroke={c} strokeWidth={1.4} /></> : <circle cx="8" cy="8" r="6.5" fill={c} />}
    </svg>
  );
}

export function RepurposeList({ items, checked, x, y, pitch = 28, bg = PANEL }: { items: string[]; checked: string[]; x: number; y: number; pitch?: number; bg?: string }) {
  return (
    <>
      {items.map((it, i) => (
        <A key={it} x={x} y={y + i * pitch} h={pitch} className="flex items-center gap-[8px] pl-[8px] text-[13px] whitespace-nowrap text-[#484a54]" style={{ background: checked.includes(it) ? bg : undefined, borderLeft: checked.includes(it) ? "2px solid #484a54" : "2px solid transparent" }}>
          {checkbox(checked.includes(it))}
          <SocialIcon k={it} />
          {it}
        </A>
      ))}
    </>
  );
}

export function DashboardHero() {
  return (
    <Frame w={862} h={355}>
      <A x={14} y={16} w={108} h={26} className="flex items-center gap-[6px] rounded-md bg-[#dcc0fc] px-[8px] text-[14px]" style={{ color: MUTED }}>
        <svg viewBox="0 0 16 16" width={14} height={14} aria-hidden>
          <path d="M3 6V3h10M10 1l3 2-3 2M13 10v3H3M6 15l-3-2 3-2" fill="none" stroke={MUTED} strokeWidth={1.4} />
        </svg>
        Repurpose
      </A>
      <A x={13} y={49} w={140} h={330} className="rounded-xl" style={{ background: PANEL }} />
      <A x={16} y={62} w={120} h={150}>
        <div className="relative">
          <RepurposeList items={["Email", "Facebook", "Instagram", "LinkedIn", "X"]} checked={["Instagram", "LinkedIn", "X"]} x={0} y={0} bg="transparent" />
        </div>
      </A>
      <A x={133} y={31} w={601} h={340} className="rounded-xl" style={{ background: EDITOR }} />
      <Toolbar x={142} y={39} w={580} extra={<span className="w-[4px]" />} />
      <A x={512} y={47} w={27} h={27} className="flex items-center justify-center rounded-md border border-[#e3dcef] bg-[#f3eefb]">
        <LogoTileIcon />
      </A>
      <DocsChip x={541} y={47} w={174} />
      <A x={142} y={90} w={383} h={280} className="rounded-t-lg bg-white" />
      <TitleKeywords x={180} y={111} h1={155} title="Best Puppy Dry Food Brands" />
      <A x={162} y={185} className="text-[13px] text-[#a9abb6]">
        p
      </A>
      <FoodBag x={180} y={183} />
      <Line x={258} y={187} w={227} />
      <Line x={258} y={206} w={96} />
      <Line x={366} y={206} w={119} />
      <Line x={258} y={226} w={227} />
      <Line x={258} y={245} w={227} />
      <A x={162} y={256} className="text-[13px] text-[#a9abb6]">
        3
      </A>
      <Line x={180} y={265} w={305} />
      <A x={532} y={90} w={227} h={187} className="rounded-lg bg-white px-[12px] pt-[11px] shadow-[0_2px_8px_rgba(60,20,120,0.08)]">
        <div className="text-[14px] text-[#484a54]">AI SEO Improvements</div>
        <div className="mt-[4px] flex h-[18px] items-center gap-[4px]">
          <LogoMini />
        </div>
        <div className="mt-[6px] flex h-[27px] items-center justify-center gap-1 rounded-md border border-[#c9bdf6] bg-[#f6f3fe] text-[13px] text-[#484a54]">
          <Sparkle /> Improve all
        </div>
        <div className="mt-[8px] flex h-[33px] items-center rounded-md border border-[#e3e3ea] border-l-[3px] border-l-[#b9a4f3] pl-[8px] text-[12px] whitespace-nowrap">Show authorship and credentials</div>
        <div className="mt-[6px] flex h-[33px] items-center rounded-md border border-[#e3e3ea] border-l-[3px] border-l-[#b9a4f3] pl-[8px] text-[12.5px]">Use natural Q&amp;A format</div>
      </A>

      <A x={745} y={32} w={130} h={330} className="rounded-xl" style={{ background: PANEL }}>
        <div className="mt-[20px] text-center text-[14px] font-medium" style={{ color: MUTED }}>
          Images
        </div>
        <div className="mt-[8px] flex justify-center gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[33px] w-[30px] rounded-md border border-[#c9a3f7] bg-[#e5cdfb]" />
          ))}
        </div>
      </A>
      <A x={745} y={150} w={130} h={200} className="rounded-xl pt-[5px] pl-[35px] text-[13px]" style={{ background: PANEL, color: MUTED }}>
        <div className="-ml-[10px] text-[14px] font-medium">Competitor</div>
        {["Titles", "Structure", "Images"].map((t) => (
          <div key={t} className="mt-[13px] flex h-[22px] items-center">
            <span className="mr-[6px] inline-block h-[13px] w-[13px] rounded-sm border" style={{ borderColor: MUTED }} />
            {t}
          </div>
        ))}
        <div className="mt-[10px] ml-[8px]">More...</div>
      </A>
      <A x={697} y={84} w={118} h={36} rotate={5} className="flex items-center justify-center gap-1 rounded-full bg-white text-[13px] font-semibold text-[#7a5cc2] shadow-[0_2px_10px_rgba(60,20,120,0.2)]">
        ✓ Ready to rank
      </A>
      <A x={-4} y={212} w={160} h={132} rotate={-2} className="rounded-lg bg-white px-[10px] pt-[14px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <div className="text-[14px] text-[#484a54]">SEO Improvements</div>
        <div className="mt-[8px] flex items-center gap-2">
          <Gauge size={36} value={0.55} />
          <span className="text-[14px] font-semibold text-[#0a7a5a]">Ready to rank</span>
        </div>
        <div className="mt-[8px] inline-flex h-[26px] items-center gap-1 rounded-full bg-[#d6f7ea] px-[10px] text-[12px] text-[#0a7a5a]">✓ SEO Boosted!</div>
      </A>
      <A x={157} y={269} w={553} h={65} className="rounded-[16px] p-[2px]" style={{ background: "linear-gradient(90deg,#ff7a3d,#ffb36b 20%,#b9a4f3 60%,#8b5cf6)" }}>
        <div className="flex h-full items-center rounded-[14px] bg-white pr-[12px] pl-[18px] text-[16px] text-[#6c6e79]">
          Ask to generate, optimize or repurpose content..
          <span className="ml-auto flex h-[43px] w-[45px] items-center justify-center rounded-xl bg-[#9361f7] text-white">
            <svg viewBox="0 0 16 16" width={18} height={18}>
              <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </A>
    </Frame>
  );
}

function LogoTileIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="none" stroke="#6c6e79" strokeWidth={1.6} />
      <path d="M6 8l3.5 9 2.5-7 2.5 7L18 8" fill="none" stroke="#6c6e79" strokeWidth={1.5} />
    </svg>
  );
}

function LogoMini() {
  return (
    <span className="flex items-center gap-[4px] text-[15px] leading-none">
      <span className="text-[#1b1c22]">֍</span>
      <span className="text-[#4c8bf5]">✦</span>
      <span className="text-[#e5643e]">✳</span>
      <span className="text-[#1fb8cd]">❋</span>
      <span className="font-bold text-[#4285f4]">G</span>
    </span>
  );
}

export function GeneratorHero() {
  return (
    <Frame w={862} h={354}>
      <A x={0} y={-1} w={195} h={109} className="rounded-xl" style={{ background: PANEL }} />
      <A x={20} y={5} className="text-[14px] font-medium" style={{ color: MUTED }}>
        Competitor data
      </A>
      <Chip x={-2} y={35} w={60}>
        Titles
      </Chip>
      <Chip x={68} y={35} w={89}>
        Structure
      </Chip>
      <Chip x={5} y={66} w={76}>
        Images
      </Chip>
      <Chip x={90} y={66} w={52}>
        More...
      </Chip>
      <A x={0} y={118} w={212} h={178} className="rounded-xl px-[8px] pt-[18px]" style={{ background: PANEL }}>
        <div className="text-[12px] font-semibold" style={{ color: "#7a5f9e" }}>
          Brand Voice: 🐶 The Puppy POV
        </div>
        <div className="mt-[14px] flex items-center gap-4 text-[15px]" style={{ color: MUTED }}>
          Who are you?
          <span className="h-[38px] w-[38px] rounded-full bg-[#f3d9e6]" />
        </div>
        <div className="mt-[8px] text-[15px]" style={{ color: MUTED }}>
          Tone
        </div>
      </A>
      <LogoTile x={192} y={126} kind="wp" size={45} />
      <A x={219} y={16} w={423} h={360} className="rounded-xl" style={{ background: EDITOR }} />
      <Toolbar x={229} y={23} w={403} />
      <A x={229} y={73} w={403} h={290} className="rounded-t-lg bg-white" />
      <TitleKeywords x={268} y={107} h1={236} title="Top Puppy Dry Food Picks" />
      <A x={248} y={175} className="text-[13px] text-[#a9abb6]">
        p
      </A>
      <FoodBag x={268} y={180} />
      <Line x={346} y={183} w={227} />
      <Line x={346} y={202} w={277} />
      <Line x={346} y={222} w={277} />
      <Line x={346} y={241} w={152} />
      {[260, 280, 300, 320, 340].map((y) => (
        <Line key={y} x={268} y={y} w={352} />
      ))}
      <A x={567} y={33} w={88} h={52} rotate={8} className="flex items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(60,20,120,0.2)]">
        <span className="font-serif text-[25px] font-bold text-[#20c4cb] italic">Canva</span>
      </A>
      <LogoTile x={602} y={107} kind="mailchimp" size={44} rotate={6} />
      <A x={667} y={16} w={210} h={160} className="rounded-xl px-[18px] pt-[16px]" style={{ background: PANEL }}>
        <div className="text-[17px] font-semibold whitespace-nowrap" style={{ color: MUTED }}>
          AI SEO Improvements
        </div>
        <div className="mt-[8px] flex h-[20px] items-center justify-center gap-1 text-[12px]" style={{ color: MUTED }}>
          <Sparkle /> Improve all
        </div>
        <div className="mt-[6px] flex h-[32px] items-center rounded-md border border-[#c9a3f7] border-l-[3px] pl-[8px] text-[13px] whitespace-nowrap" style={{ color: MUTED }}>
          Show authorship and credentials
        </div>
        <div className="mt-[10px] flex h-[32px] items-center rounded-md border border-[#c9a3f7] border-l-[3px] pl-[8px] text-[13px] whitespace-nowrap" style={{ color: MUTED }}>
          Use natural Q&amp;A format
        </div>
      </A>
      <A x={622} y={176} w={250} h={178} rotate={2} className="rounded-xl bg-white px-[26px] pt-[21px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <div className="text-[14px] text-[#484a54]">Overall score</div>
        <div className="mt-[10px] flex items-start gap-[12px]">
          <div className="relative">
            <Gauge size={78} value={0.72} />
            <span className="absolute top-[26px] left-[26px] text-[13px] font-semibold">72%</span>
          </div>
          <div className="h-[68px] w-[125px] rounded-lg bg-[#d6f7ea] px-[12px] pt-[10px]">
            <div className="text-[14px] font-semibold text-[#0a7a5a]">Ready to rank</div>
            <div className="mt-[10px] h-[7px] rounded-full bg-[#a9ebd3]" />
            <div className="mt-[7px] h-[7px] rounded-full bg-[#a9ebd3]" />
          </div>
        </div>
        <div className="mt-[16px] -ml-[8px] flex h-[33px] w-[212px] items-center justify-center gap-2 rounded-md bg-[#f3f3f5] text-[14px] text-[#484a54]">↱ Share</div>
      </A>
      <A x={27} y={198} w={240} h={170} rotate={-3} className="rounded-xl bg-white px-[20px] pt-[26px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <div className="flex h-[34px] w-[145px] items-center gap-2 rounded-full border-2 border-[#dcc9fb] px-[12px] text-[12.5px] font-medium">
          {checkbox(true)} ⚡ SEO Booster
        </div>
        <div className="mt-[8px] flex h-[36px] w-[190px] items-center gap-2 rounded-full border-2 border-[#dcc9fb] px-[12px] text-[12.5px] font-medium">
          {checkbox(true)} ▣ AI-generated images
        </div>
        <div className="mt-[10px] flex h-[34px] w-[140px] items-center gap-2 rounded-lg bg-gradient-to-r from-[#d7c2fb] to-[#bcd0fb] px-[12px] text-[14px] font-medium text-white">
          ✦ Create article
        </div>
      </A>
    </Frame>
  );
}

export function OptimizerHero() {
  return (
    <Frame w={862} h={354}>
      <A x={-10} y={16} w={130} h={145} className="rounded-xl pt-[22px] pl-[15px]" style={{ background: PANEL, color: MUTED }}>
        <div className="text-[14px] font-semibold">Improvements</div>
        {["SEO", "Readability", "Tone of Voice"].map((t, i) => (
          <div key={t} className="mt-[9px] inline-flex h-[20px] items-center rounded-full border border-[#c9a3f7] px-[8px] text-[13px]" style={{ marginLeft: i === 0 ? 14 : 0 }}>
            {t}
          </div>
        ))}
      </A>
      <A x={-10} y={170} w={130} h={160} className="rounded-xl pt-[14px] pl-[20px] text-[13px]" style={{ background: PANEL, color: MUTED }}>
        <div className="ml-[5px] text-[16px] font-medium">AI chat</div>
        <div className="mt-[14px] flex gap-2">
          <span className="rounded-full border border-[#c9a3f7] px-2">Titles</span>
          <span className="rounded-full border border-[#c9a3f7] px-2">Images</span>
        </div>
        <div className="mt-[6px] flex gap-2">
          <span className="rounded-full border border-[#c9a3f7] px-2">Structure</span>
          <span className="rounded-full border border-[#c9a3f7] px-2">Intro</span>
        </div>
        <div className="mt-[14px] flex items-center gap-2">
          <span className="flex h-[26px] w-[60px] items-center rounded-md border border-[#c9a3f7] px-2 text-[14px]">Ask AI...</span>
          <span className="h-[26px] w-[27px] rounded-md bg-[#7ea6ea]" />
        </div>
      </A>
      <A x={132} y={16} w={598} h={360} className="rounded-xl" style={{ background: EDITOR }} />
      <Toolbar
        x={142}
        y={23}
        w={580}
        extra={
          <span className="mr-[60px] ml-[12px] flex items-center gap-2 text-[14px] text-[#6c6e79]">
            <svg viewBox="0 0 16 16" width={15} height={15} aria-hidden>
              <path d="M13 8a5 5 0 1 1-2-4M11 1v3h3" fill="none" stroke="#6c6e79" strokeWidth={1.4} />
            </svg>
            AI chat
          </span>
        }
      />
      <DocsChip x={540} y={31} w={174} />
      <A x={142} y={73} w={383} h={290} className="rounded-t-lg bg-white" />
      <TitleKeywords x={180} y={96} h1={155} title="Best Puppy Dry Food Brands" />
      <A x={163} y={168} className="text-[13px] text-[#a9abb6]">
        p
      </A>
      <FoodBag x={180} y={168} />
      <Line x={258} y={172} w={227} />
      <Line x={258} y={191} w={96} />
      <Line x={366} y={191} w={119} />
      <Line x={258} y={211} w={227} />
      <Line x={258} y={230} w={227} />
      <A x={155} y={240} className="text-[13px] text-[#a9abb6]">
        h3
      </A>
      <Line x={180} y={250} w={305} />
      <A x={163} y={262} className="text-[13px] text-[#a9abb6]">
        p
      </A>
      <Line x={180} y={269} w={45} />
      <Line x={238} y={269} w={160} />
      <Line x={180} y={288} w={305} />
      <Line x={180} y={308} w={305} />
      <A x={530} y={73} w={192} h={140} className="rounded-t-lg bg-white px-[16px] pt-[9px]">
        <div className="text-[14px] text-[#484a54]">SEO content score</div>
        <div className="mt-[4px]">
          <Gauge size={40} value={0.6} />
        </div>
        <div className="mt-[2px] border-l-2 border-[#ffcf4a] pl-[8px] text-[13px] text-[#6c6e79]">Use target keywords</div>
      </A>
      <A x={742} y={32} w={140} h={122} className="rounded-xl pt-[20px] pl-[30px]" style={{ background: PANEL, color: MUTED }}>
        <div className="ml-[18px] text-[15px] font-medium">Images</div>
        <div className="mt-[8px] flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[33px] w-[30px] rounded-md border border-[#c9a3f7] bg-[#e5cdfb]" />
          ))}
        </div>
      </A>
      <A x={742} y={150} w={140} h={180} className="rounded-xl pt-[6px] pl-[25px] text-[13px]" style={{ background: PANEL, color: MUTED }}>
        <div className="text-[14px] font-medium">Competitor</div>
        {["Titles", "Structure", "Images"].map((t) => (
          <div key={t} className="mt-[10px] flex h-[22px] items-center">
            <span className="mr-[6px] inline-block h-[13px] w-[13px] rounded-sm border" style={{ borderColor: MUTED }} />
            {t}
          </div>
        ))}
        <div className="mt-[8px] ml-[10px]">More...</div>
      </A>
      <A x={484} y={160} w={272} h={210} rotate={-2} className="rounded-xl bg-white px-[20px] pt-[18px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <div className="text-[14px] text-[#484a54]">AI SEO Improvements</div>
        <div className="mt-[8px] flex h-[24px] items-center justify-center gap-1 rounded-md border border-[#c9bdf6] bg-[#f6f3fe] text-[12px] text-[#484a54]">
          <Sparkle /> Improve all
        </div>
        <div className="mt-[10px] text-[16px] font-semibold text-[#484a54]">Improvements</div>
        <div className="mt-[6px] flex h-[37px] items-center rounded-md border border-[#e3e3ea] border-l-[3px] border-l-[#b9a4f3] pl-[10px] text-[13px]">Show authorship and credentials</div>
        <div className="mt-[8px] flex h-[37px] items-center rounded-md border border-[#e3e3ea] border-l-[3px] border-l-[#b9a4f3] pl-[10px] text-[13px]">Use natural Q&amp;A format</div>
      </A>
      <LogoTile x={450} y={245} kind="gpt" rotate={-4} />
      <LogoTile x={450} y={302} kind="claude" rotate={-4} />
      <LogoTile x={752} y={190} kind="gemini" rotate={4} />
      <LogoTile x={755} y={245} kind="google" rotate={4} />
      <LogoTile x={757} y={302} kind="perplexity" rotate={4} />
    </Frame>
  );
}

export function TopicHero() {
  const tag = (t: string, blue?: boolean) => (
    <span className={`inline-flex h-[19px] items-center rounded-full px-[7px] text-[12px] ${blue ? "bg-[#e5e7fd] text-[#5a5fc0]" : "bg-[#d6f7ea] text-[#0a8a5f]"}`}>{t}</span>
  );
  return (
    <Frame w={883} h={364} bg={FRAME}>
      <A x={0} y={0} w={283} h={165} className="rounded-tl-lg" style={{ background: PANEL }} />
      {[
        ["Keywords", 9],
        ["Intent", 91],
        ["Volume", 162],
        ["KD, %", 236],
      ].map(([t, x]) => (
        <A key={t as string} x={x as number} y={12} className="text-[13px] whitespace-nowrap" style={{ color: MUTED }}>
          {t}
        </A>
      ))}
      {[60, 96, 131].map((y, i) => (
        <A key={y} x={9} y={y - 10} w={110} h={20} className="flex items-center justify-between border-t border-[#c9a3f7] pt-[1px]">
          <span className="h-[7px] w-[62px] rounded-full bg-[#c9a3f7]" />
          <span className={`flex h-[20px] w-[19px] items-center justify-center rounded text-[10px] ${i === 1 ? "bg-[#c8cdfb] text-[#5a5fc0]" : "bg-[#f3c2c0] text-[#c0605b]"}`}>{i === 1 ? "I" : "C"}</span>
        </A>
      ))}
      <A x={0} y={210} w={130} h={120} className="pt-[4px]" style={{ background: PANEL }}>
        <div className="flex h-[28px] items-center border-y border-[#c9a3f7] px-[8px] text-[13px]" style={{ color: MUTED }}>
          Tasty dog food
        </div>
        <div className="mt-[6px] flex h-[28px] items-center gap-2 border-y border-[#c9a3f7] px-[8px] text-[13px]" style={{ color: MUTED }}>
          <span className="h-[8px] w-[12px] bg-[#b58ae8]" /> United States
        </div>
        <div className="mt-[8px] flex h-[28px] items-center justify-center rounded-md bg-[#c9a3f7] text-[13px] text-[#e9dcfb]">Find topics</div>
      </A>
      <A x={130} y={39} w={603} h={340} className="rounded-tl-lg bg-white shadow-[0_2px_12px_rgba(60,20,120,0.1)]" />
      <A x={130} y={39} w={188} h={330} className="border-r border-[#f0eef5]">
        <div className="px-[9px] pt-[14px] text-[15px] text-[#484a54]">Best-performing topics</div>
        <div className="mt-[8px] border-l-[3px] border-[#2b2e38] bg-[#f5f7fe] px-[7px] pt-[8px] pb-[8px]">
          {tag("Low-hanging fruit")}
          <div className="mt-[4px] text-[13.5px]">best dog food ratings</div>
        </div>
        <div className="border-t border-[#f0eef5] px-[9px] pt-[10px] pb-[8px]">
          {tag("Low-hanging fruit")}
          <div className="mt-[4px] text-[13.5px]">buy natural dog food</div>
        </div>
        <div className="border-t border-[#f0eef5] px-[9px] pt-[10px] pb-[8px]">
          {tag("Balanced growth", true)}
          <div className="mt-[4px] text-[13.5px]">homemade dog food recipes</div>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="border-t border-[#f0eef5] px-[9px] pt-[12px] pb-[10px]">
            <div className="h-[9px] w-[104px] rounded-full bg-[#ececef]" />
            <div className="mt-[9px] h-[9px] w-[168px] rounded-full bg-[#ececef]" />
          </div>
        ))}
      </A>
      <A x={334} y={58} className="text-[15px] font-medium text-[#6c6e79]">
        Title ideas for this topic
      </A>
      {[
        [88, "Definitive Guide: Best Dog Food Ratings"],
        [150, "Reliable Dog Food Ratings You Can Count On"],
        [215, "Top Dog Food Ratings You Can Trust"],
        [281, ""],
        [343, ""],
      ].map(([y, t]) => (
        <A key={y as number} x={334} y={y as number} w={392} h={49} className="flex items-center rounded-lg bg-[#f7f7f9] px-[12px] text-[12.5px] whitespace-nowrap text-[#484a54]">
          {t || <span className="h-[9px] w-[200px] rounded-full bg-[#ececef]" />}
        </A>
      ))}
      <A x={602} y={223} w={110} h={33} className="flex items-center justify-center gap-2 rounded-md border border-[#d6d8e1] bg-[#ececef] text-[13px] text-[#6c6e79]">
        Start writing <ChevronDown width={12} height={12} />
      </A>
      <A x={528} y={261} w={186} h={96} className="rounded-md bg-white py-[4px] text-[12.5px] shadow-[0_2px_10px_rgba(25,27,35,0.15)]">
        {["Generate article with AI", "Create SEO content brief", "Write article yourself"].map((t, i) => (
          <div key={t} className={`flex h-[29px] items-center gap-2 px-[12px] ${i === 0 ? "border-l-2 border-[#2b2e38] bg-[#f5f7fe]" : ""}`}>
            <span className="text-[#6c6e79]">{["✦", "▣", "✎"][i]}</span>
            {t}
          </div>
        ))}
      </A>
      <A x={755} y={249} w={130} h={40} className="flex items-center gap-2 pl-[6px] text-[13px]" style={{ background: PANEL, color: MUTED }}>
        <span className="flex h-[17px] w-[30px] items-center justify-end rounded-full bg-[#4a9bb0] pr-[2px]">
          <span className="h-[13px] w-[13px] rounded-full bg-white" />
        </span>
        Weekly updates
      </A>
      <A x={551} y={19} w={340} h={170} className="rounded-xl bg-white px-[22px] pt-[20px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <div className="flex items-center gap-[10px] text-[13.5px] font-semibold">
          <ChevronDown width={12} height={12} strokeWidth={2.4} /> Why this topic works
        </div>
        <div className="mt-[10px] ml-[6px] h-[5px] w-[282px] rounded-full bg-[#e5d4fb]" />
        <div className="mt-[11px] ml-[6px] h-[5px] w-[282px] rounded-full bg-[#e5d4fb]" />
        <div className="mt-[11px] ml-[6px] h-[5px] w-[84px] rounded-full bg-[#e5d4fb]" />
        <div className="mt-[14px] ml-[6px] flex gap-[16px] text-[12px] text-[#484a54]">
          <div className="border-r border-[#ececf0] pr-[15px]">
            Keywords
            <div className="text-[21px] font-semibold text-[#2f6fe0]">+15</div>
          </div>
          <div className="border-r border-[#ececf0] pr-[15px]">
            Total Volume
            <div className="text-[21px] font-semibold text-rk-text">86.1K</div>
          </div>
          <div className="border-r border-[#ececf0] pr-[15px]">
            KD
            <div className="flex items-center gap-1 text-[21px] font-semibold text-rk-text">
              28% <span className="h-[8px] w-[8px] rounded-full bg-[#2fd3a6]" />
            </div>
          </div>
          <div>
            Intent
            <div className="mt-[14px] flex h-[6px] w-[42px] overflow-hidden rounded-full">
              <span className="w-1/2 bg-[#6a66d9]" />
              <span className="w-1/2 bg-[#ff6b70]" />
            </div>
          </div>
        </div>
      </A>
    </Frame>
  );
}

export function BriefHero() {
  const step = "flex h-[30px] items-center gap-2 rounded-md bg-white px-[10px] text-[12.5px] font-semibold text-[#484a54]";
  return (
    <Frame w={862} h={354} bg="#ab70f8">
      <A x={0} y={0} w={170} h={110} className="rounded-br-xl pl-[4px]" style={{ background: PANEL }}>
        <div className="pt-[10px] text-[14px] font-medium" style={{ color: MUTED }}>
          Competitor data
        </div>
      </A>
      <Chip x={-12} y={40} w={52}>
        Titles
      </Chip>
      <Chip x={50} y={40} w={90}>
        Structure
      </Chip>
      <Chip x={-12} y={72} w={70}>
        Images
      </Chip>
      <Chip x={75} y={72} w={53}>
        More...
      </Chip>
      <A x={0} y={118} w={170} h={80} className="rounded-r-xl pt-[14px]" style={{ background: PANEL, color: MUTED }}>
        <div className="-ml-[6px] text-[14.5px] whitespace-nowrap">performing Keywords</div>
        <div className="mt-[8px] ml-[8px] inline-flex h-[20px] items-center rounded-full bg-[#caa6f7] px-[8px] text-[12px]">dried dog food</div>
      </A>
      <A x={187} y={26} w={488} h={340} className="rounded-xl" style={{ background: EDITOR }} />
      <A x={195} y={33} w={472} h={45} className="flex items-center justify-between rounded-lg bg-white px-[8px]">
        <span className="flex h-[27px] items-center gap-[6px] rounded-full bg-[#ececef] px-[10px] text-[14px] text-[#6c6e79]">
          <span className="h-[11px] w-[15px] bg-[linear-gradient(#b22234_0_14%,#fff_14%_28%,#b22234_28%_42%,#fff_42%_56%,#b22234_56%_70%,#fff_70%_84%,#b22234_84%)]" />
          ⚲ Puppy dry food brands
        </span>
        <span className="flex h-[27px] items-center gap-[6px] rounded-md bg-[#f3f3f5] px-[10px] text-[14px] text-[#6c6e79]">
          <Sparkle /> Generate SEO article
        </span>
      </A>
      {["Competitors", "General info", "Keywords", "Structure", "Meta info"].map((s, i) => (
        <A key={s} x={195} y={85 + i * 35} w={128} className={step}>
          <span className="text-[#8a8e9b]">✓</span>
          {s}
        </A>
      ))}
      <A x={195} y={260} w={128} className={`${step} border border-[#c9bdf6]`}>
        <span className="text-[#8a8e9b]">✓</span>
        Finish and share
      </A>
      <A x={332} y={85} w={335} h={280} className="rounded-t-lg bg-white" />
      <A x={355} y={104} className="text-[20px] font-semibold text-[#484a54]">
        SEO Content Brief
      </A>
      <A x={355} y={150} className="flex items-center gap-2 text-[12.5px]">
        <span className="text-[#8a8e9b]">⚲</span>
        <span className="flex h-[25px] items-center gap-[6px] rounded-full bg-[#d9faf1] px-[10px]">
          puppy food <span className="h-[6px] w-[6px] rounded-full bg-[#2fd3a6]" />
        </span>
        <span className="flex h-[25px] items-center gap-[6px] rounded-full bg-[#fdf3c9] px-[10px] text-[#7a5a00]">
          puppy kibble brands <span className="h-[6px] w-[6px] rounded-full bg-[#ffcf4a]" />
        </span>
      </A>
      {[197, 228, 259].map((y, i) => (
        <A key={y} x={360} y={y - 9} className="text-[13px] text-[#8a8e9b]">
          {["T", "◎", "∞"][i]}
        </A>
      ))}
      <Line x={380} y={197} w={265} />
      <Line x={380} y={228} w={265} />
      <Line x={380} y={259} w={265} />
      {[
        ["H1", 290, 368],
        ["H2", 314, 376],
        ["H3", 338, 384],
      ].map(([t, y, x]) => (
        <A key={t as string} x={(x as number) - 16} y={(y as number) - 8} className="text-[11px] text-[#c4c7cf]">
          {t}
        </A>
      ))}
      <Line x={388} y={290} w={262} />
      <Line x={396} y={314} w={254} />
      <Line x={404} y={338} w={246} />
      <A x={692} y={0} w={180} h={186} className="rounded-bl-xl pt-[14px] pl-[12px]" style={{ background: PANEL }}>
        {["Start writing an", "Optimize article", "Discover topics"].map((t, i) => (
          <div key={t} className="mb-[21px] flex h-[34px] items-center gap-2 rounded-l-md border border-r-0 border-[#c9a3f7] pl-[10px] text-[17px] whitespace-nowrap" style={{ color: MUTED, marginTop: i === 0 ? 0 : undefined }}>
            <span>{["✎", "☰", "◎"][i]}</span>
            {t}
          </div>
        ))}
      </A>
      <A x={449} y={218} w={398} h={108} rotate={2} className="flex items-center gap-[16px] rounded-xl bg-white px-[20px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <span className="flex h-[40px] items-center gap-[10px] rounded-md bg-[#f3f3f5] px-[12px] text-[17px] whitespace-nowrap text-[#6c6e79]">
          <svg viewBox="0 0 12 16" width={11} height={14} aria-hidden>
            <path d="M1 1h7l3 3v11H1z" fill="#4c8bf5" />
          </svg>
          Send to Google Docs
        </span>
        <span className="flex h-[40px] items-center gap-2 rounded-md bg-[#2b2e38] px-[14px] text-[16px] whitespace-nowrap text-white">↱ Share brief</span>
      </A>
      <A x={0} y={176} w={217} h={178} rotate={-2} className="rounded-xl bg-white px-[17px] pt-[30px] shadow-[0_4px_16px_rgba(60,20,120,0.18)]">
        <div className="text-[13.5px] font-semibold">Competitor articles</div>
        {[true, false, true].map((c, i) => (
          <div key={i} className="mt-[6px] flex items-center gap-2">
            <span className={`h-[14px] w-[14px] rounded-[3px] ${c ? "bg-[#d6d8e1]" : "border border-[#d6d8e1]"}`} />
            <span className="h-[7px] rounded-full bg-[#e3e3e8]" style={{ width: [135, 75, 118][i] }} />
          </div>
        ))}
        <div className="mt-[16px] inline-flex h-[26px] items-center gap-2 rounded-md bg-[#f3f3f5] px-[10px] text-[14px] text-[#484a54]">
          <Sparkle /> Keyword suggestions
        </div>
      </A>
    </Frame>
  );
}

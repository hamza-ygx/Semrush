import type { CSSProperties, ReactNode } from "react";
import { ChatGptIcon, GeminiIcon, GoogleIcon } from "@/components/ui/icons";
import type { Illustration } from "./data";

export const heroGradient = "linear-gradient(180deg, #dcedea 0%, #d8dbf8 100%)";

const box = (s: { l: number; t: number; w: number; h?: number }): CSSProperties => ({ left: s.l, top: s.t, width: s.w, height: s.h });

function Frame({ l, t, w, h, children, pad = 8 }: { l: number; t: number; w: number; h: number; children: ReactNode; pad?: number }) {
  return (
    <>
      <div className="absolute rounded-[18px] border border-white/60 bg-[#dfe5f2]/50" style={box({ l: l - pad, t: t - pad - 1, w: w + pad * 2, h: h + pad * 2 })} />
      <div className="absolute overflow-hidden rounded-[12px] bg-white shadow-[0_2px_12px_rgba(90,100,160,0.12)]" style={box({ l, t, w, h })}>
        {children}
      </div>
    </>
  );
}

export function DrawnAvatar({ size, tone = "#b08a70", hair = "#2e2622", bg = "#e6dccf", square = false, beard = false }: { size: number; tone?: string; hair?: string; bg?: string; square?: boolean; beard?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={`shrink-0 ${square ? "rounded-[3px]" : "rounded-full"}`}>
      <rect width="40" height="40" fill={bg} />
      <path d="M6 40c1-8 7-11 14-11s13 3 14 11z" fill={square ? "#2b2f38" : "#6b5a50"} />
      <rect x="16.5" y="24" width="7" height="7" rx="3" fill={tone} />
      <ellipse cx="20" cy="18" rx="7.2" ry="8.6" fill={tone} />
      <path d={square ? "M12.6 16c0-6 3.4-8.4 7.4-8.4s7.4 2.4 7.4 8.4c-1-3-3-4.4-7.4-4.4s-6.4 1.4-7.4 4.4z" : "M11.5 20c-1-9 3-12.5 8.5-12.5S29.5 11 28.5 20c-.5-4-2.5-7-8.5-7s-8 3-8.5 7z"} fill={hair} />
      {beard && <path d="M13.5 20.5c1 5 3.5 7 6.5 7s5.5-2 6.5-7c-1.5 2-3.5 3-6.5 3s-5-1-6.5-3z" fill="#9c9690" />}
      <circle cx="17.3" cy="18" r=".9" fill="#2a2320" />
      <circle cx="22.7" cy="18" r=".9" fill="#2a2320" />
    </svg>
  );
}

function TopicArt() {
  return (
    <Frame l={68} t={67} w={322} h={273} pad={7}>
      <div className="absolute top-[14px] left-[17px] text-[14px] leading-5 text-[#1b1e1a]">
        Topic: <b className="font-bold">Renewable energy sources</b>
      </div>
      <div className="absolute top-[44px] left-[17px] flex gap-[9px]">
        {[GoogleIcon, GeminiIcon, ChatGptIcon].map((I, i) => (
          <span key={i} className="flex h-[33px] w-[33px] items-center justify-center rounded-[7px] border border-[#e6e7ee] bg-white text-[#60626c]">
            <I width={16} height={16} />
          </span>
        ))}
      </div>
    </Frame>
  );
}

function TopicOverlay() {
  return (
    <div className="absolute rounded-[10px] border border-[#e8e9f0] bg-white shadow-[0_4px_16px_rgba(80,90,150,0.12)]" style={box({ l: 85, t: 158, w: 340, h: 167 })}>
      <div className="absolute top-[22px] left-[20px] flex items-center gap-[7px]">
        <DrawnAvatar size={36} tone="#c49a80" hair="#231c18" bg="#5a4d44" />
        <div className="leading-[20px]">
          <div className="text-[14px] font-bold text-[#2d63c8]">John Smith</div>
          <div className="text-[12.5px] text-[#484a49]">Editor</div>
        </div>
      </div>
      <div className="absolute top-[22px] left-[162px] flex items-center gap-[7px]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ccd2f6] text-[12.5px] font-bold text-[#3957c6]">SF</span>
        <div>
          <div className="text-[14px] leading-5 font-bold text-[#2d63c8]">Sleep Foundation</div>
          <span className="inline-block rounded-full bg-[#d4f5ea] px-[6px] text-[10.5px] leading-[15px] text-[#177a5f]">High AI authority</span>
        </div>
      </div>
      {[75, 95, 115].map((t) => (
        <div key={t} className="absolute left-[20px] h-[9px] w-[300px] rounded-full bg-[#e1e2ea]" style={{ top: t }} />
      ))}
      <div className="absolute top-[132px] left-[20px] flex items-center gap-1 text-[12px] text-[#2d63c8]">
        The best sleep trackers we have tested
        <svg viewBox="0 0 16 16" width={13} height={13} className="text-[#9a9ca8]">
          <path d="M9 3h4v4M13 3 7.5 8.5M11 9.5V13H3V5h3.5" fill="none" stroke="currentColor" strokeWidth={1.4} />
        </svg>
      </div>
    </div>
  );
}

function Donut({ pct, color }: { pct: number; color: string }) {
  const c = 2 * Math.PI * 7;
  return (
    <svg viewBox="0 0 20 20" width={20} height={20}>
      <circle cx="10" cy="10" r="7" fill="none" stroke="#e5e5ec" strokeWidth={4} />
      <circle cx="10" cy="10" r="7" fill="none" stroke={color} strokeWidth={4} strokeDasharray={`${(pct / 100) * c} ${c}`} transform="rotate(-90 10 10)" />
    </svg>
  );
}

function JournalistArt() {
  return (
    <>
      <Frame l={48} t={74} w={348} h={260} pad={7}>
        <div className="absolute top-[20px] left-[12px]">
          <DrawnAvatar size={54} square beard tone="#c69a80" hair="#8b7f76" bg="#3b4a5c" />
        </div>
        <div className="absolute top-[22px] left-[83px] text-[15px] leading-5 font-bold text-[#1b1e1a]">Jacob Jones</div>
        <div className="absolute top-[45px] left-[83px] w-[130px] text-[11px] leading-[10px] text-[#60626c]">jacob.jones@technews. com</div>
        <div className="absolute top-[21px] left-[278px] rounded-[3px] bg-[#1b1e1a] px-[5px] text-[11.5px] leading-4 text-white">Add to list</div>
        <div className="absolute top-[95px] left-[21px] rounded-full bg-[#eeeff3] px-2 text-[11.5px] leading-5 text-[#6a6c6a]">Artificial Intelligence</div>
        <div className="absolute top-[131px] left-[21px] h-[104px] w-[307px] rounded-[8px] bg-[#f3f4f8] px-[10px] pt-[9px]">
          <div className="text-[13px] leading-4 font-bold text-[#1b1e1a]">Related article</div>
          <div className="mt-[8px] text-[13px] leading-4 text-[#1b1e1a]">How AI chatbots keep people coming back</div>
          <div className="mt-[4px] text-[11px] leading-[13px] text-[#484a49]">
            Chatbots are increasingly looking to keep people chatting, using familiar tactics that we’ve already seen lead to negative consequences.
          </div>
        </div>
      </Frame>
      <div className="absolute rounded-[10px] bg-white shadow-[0_4px_16px_rgba(80,90,150,0.14)]" style={box({ l: 188, t: 155, w: 229, h: 77 })}>
        <div className="absolute top-[9px] left-[13px] text-[13px] leading-4 font-bold text-[#1b1e1a]">Outlet audience</div>
        {[
          { l: 13, pct: 76, c: "#34d9a8", n: "Men" },
          { l: 118, pct: 24, c: "#b57cf2", n: "Women" },
        ].map((s) => (
          <div key={s.n} className="absolute top-[31px] flex h-[32px] w-[99px] items-center gap-[6px] rounded-[4px] bg-[#f4f5f8] pl-[5px]" style={{ left: s.l }}>
            <Donut pct={s.pct} color={s.c} />
            <div className="leading-[9px]">
              <div className="text-[8px] font-bold text-[#1b1e1a]">{s.pct}%</div>
              <div className="text-[6.5px] text-[#8a8c96]">{s.n}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Chip({ children, ai }: { children: ReactNode; ai?: boolean }) {
  return ai ? (
    <span className="inline-flex h-[17px] items-center gap-[3px] rounded-full border border-[#c59bf3] bg-[#f5edff] px-[5px] text-[10.5px] text-[#8a3fcf]">
      <span className="text-[8px]">✦</span>
      {children}
    </span>
  ) : (
    <span className="inline-flex h-[19px] items-center rounded-[4px] bg-[#e3f4ff] px-[6px] text-[10px] text-[#1f8fd6]">{children}</span>
  );
}

function SearchArt() {
  return (
    <Frame l={51} t={62} w={386} h={320} pad={9}>
      <div className="absolute top-[14px] left-[14px] text-[15px] leading-5 font-medium text-[#1b1e1a]">Search for journalists</div>
      <div className="absolute top-[38px] left-[33px] text-[10px] leading-4 font-bold text-[#1b1e1a]">Keywords</div>
      <div className="absolute top-[56px] left-[33px]">
        <Chip>Artificial Intelligence</Chip>
      </div>
      <div className="absolute top-[79px] left-[33px] flex gap-[4px]">
        <Chip ai>Deep learning</Chip>
        <Chip ai>Technology</Chip>
        <Chip ai>Cybersecurity</Chip>
      </div>
      <div className="absolute top-[112px] left-[33px] text-[10px] leading-4 font-bold text-[#1b1e1a]">Location</div>
      <div className="absolute top-[130px] left-[33px] h-[22px] w-[320px] rounded-[4px] border border-[#e0e2e1] px-[6px] text-[10px] leading-5 text-[#60626c]">United States</div>
      <div className="absolute top-[166px] left-[33px] text-[10px] leading-4 font-bold text-[#1b1e1a]">Outlet type</div>
      <div className="absolute top-[184px] left-[33px] flex gap-[4px]">
        <Chip>Online news</Chip>
        <Chip>Magazines</Chip>
        <Chip>Blogs</Chip>
      </div>
      <div className="absolute top-[226px] left-[33px] rounded-[4px] bg-[#1b1e1a] px-[10px] text-[11px] leading-[22px] font-semibold text-white">Find journalists</div>
      <div className="absolute top-[266px] left-[33px] flex w-[320px] items-center gap-2 border-t border-[#edefef] pt-[10px]">
        <DrawnAvatar size={26} tone="#c49a80" hair="#3a2a20" />
        <div className="h-[8px] w-[120px] rounded-full bg-[#e1e2ea]" />
      </div>
    </Frame>
  );
}

function InboxArt() {
  return (
    <Frame l={54} t={70} w={373} h={300} pad={8}>
      <div className="absolute top-[11px] left-[17px] text-[15px] leading-5 font-medium text-[#1b1e1a]">Inbox</div>
      <div className="absolute top-[9px] left-[205px] flex h-[27px] w-[151px] items-center gap-[7px] rounded-[7px] bg-[#f5f6f9] pl-[10px] text-[10px] text-[#a3a5b0]">
        <svg viewBox="0 0 16 16" width={10} height={10}>
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="#8a8c96" strokeWidth={2} />
          <path d="m10.5 10.5 3.5 3.5" stroke="#8a8c96" strokeWidth={2.2} />
        </svg>
        Search mail
      </div>
      <div className="absolute top-[44px] right-0 left-0 border-t border-[#eeeff3]" />
      <div className="absolute top-[44px] bottom-0 left-[100px] border-l border-[#eeeff3]" />
      <div className="absolute top-[57px] left-[7px] flex h-[23px] w-[85px] items-center gap-[6px] rounded-[4px] bg-[#f5effe] pl-[6px] text-[10px] text-[#8a3fcf]">
        <svg viewBox="0 0 12 12" width={10} height={10}>
          <path d="M1.5 6.5h2.5l1 1.5h2l1-1.5h2.5M1.5 6.5 3 2h6l1.5 4.5v3.5h-9z" fill="none" stroke="currentColor" strokeWidth={1.1} />
        </svg>
        Inbox
      </div>
      {["Sent", "Drafts", "Scheduled"].map((l, i) => (
        <div key={l} className="absolute left-[13px] text-[10px] text-[#6a6c6a]" style={{ top: 90 + i * 24 }}>
          {l}
        </div>
      ))}
      {[
        { t: "68% of travelers report better sleep with earplugs", s: "Hi Anna, I noticed your recent piece on sleep…" },
        { t: "New study: remote workers take fewer sick days", s: "Hello Mark, following up on your article…" },
        { t: "Local startup cuts food waste by 40%", s: "Hi Sara, thought this might fit your column…" },
      ].map((m, i) => (
        <div key={m.t} className="absolute left-[111px] h-[62px] w-[251px] rounded-[6px] border border-[#eeeff3] bg-white px-[8px] pt-[6px]" style={{ top: 55 + i * 70 }}>
          <div className="truncate text-[10px] leading-[14px] font-bold text-[#1b1e1a]">{m.t}</div>
          <div className="mt-[3px] truncate text-[9px] leading-[12px] text-[#6a6c6a]">{m.s}</div>
          <div className="mt-[6px] flex gap-[4px]">
            <span className="rounded-full bg-[#e6f8f1] px-[5px] text-[8px] leading-[12px] text-[#177a5f]">Opened</span>
            <span className="rounded-full bg-[#eef0fc] px-[5px] text-[8px] leading-[12px] text-[#5c5cc4]">Clicked</span>
          </div>
        </div>
      ))}
    </Frame>
  );
}

function MentionsArt() {
  const top = "M0 22 L30 22 L60 30 L90 22 L130 32 L175 38 L220 44 L260 44 L300 54 L340 54 L375 54 L405 44 L435 44";
  const low = "M0 94 L30 90 L60 94 L90 90 L130 84 L175 84 L220 90 L260 84 L300 90 L340 78 L375 78 L405 78 L435 82";
  return (
    <>
      <Frame l={53} t={60} w={370} h={271} pad={8}>
        <div className="absolute top-[18px] left-[18px] h-[128px] w-[334px] rounded-[4px] border border-[#edefef]">
          <div className="absolute top-[7px] left-[6px] text-[11px] leading-4 font-semibold text-[#1b1e1a]">Mentions and Reach</div>
          <div className="absolute top-[27px] right-0 left-0 border-t border-[#edefef]" />
          <svg viewBox="0 0 435 110" width={328} height={80} preserveAspectRatio="none" className="absolute top-[41px] left-[6px]">
            <path d={`${top} L435 110 L0 110Z`} fill="#f2e9fd" />
            <path d={`${low} L435 110 L0 110Z`} fill="#e8e5fb" />
            <path d={top} fill="none" stroke="#b58af2" strokeWidth={2} />
            <path d={low} fill="none" stroke="#5b5fc7" strokeWidth={2} />
          </svg>
          <div className="absolute top-[107px] right-[6px] left-[6px] flex justify-between text-[8px] text-[#6a6c6a]">
            <span>02 Jun</span>
            <span>09 Jun</span>
            <span>16 Jun</span>
            <span>23 Jun</span>
          </div>
        </div>
        <div className="absolute top-[158px] left-[166px] h-[130px] w-[186px] rounded-[4px] border border-[#edefef]">
          <div className="absolute top-[7px] left-[12px] text-[11px] leading-4 font-semibold text-[#1b1e1a]">Sentiment</div>
          <div className="absolute top-[26px] right-0 left-0 border-t border-[#edefef]" />
          <div className="absolute top-[31px] left-[9px] flex gap-[6px] text-[10px] text-[#484a49]">
            <span className="flex items-center gap-[3px]">
              <i className="h-[5px] w-[5px] rounded-full bg-[#34d9a8]" />
              Positive
            </span>
            <span className="flex items-center gap-[3px]">
              <i className="h-[5px] w-[5px] rounded-full bg-[#d6d8d7]" />
              Neutral
            </span>
            <span className="flex items-center gap-[3px]">
              <i className="h-[5px] w-[5px] rounded-full bg-[#ff6b70]" />
              Negative
            </span>
          </div>
          <svg viewBox="0 0 110 60" width={110} height={60} className="absolute top-[56px] left-[38px]">
            <path d="M0 55 A55 55 0 0 1 55 0 L55 27 A28 28 0 0 0 27 55Z" fill="#3ae0b0" />
            <path d="M55 0 A55 55 0 0 1 93 16 L74 35 A28 28 0 0 0 55 27Z" fill="#c4c5ce" />
            <path d="M93 16 A55 55 0 0 1 110 55 L83 55 A28 28 0 0 0 74 35Z" fill="#ff6b6b" />
          </svg>
        </div>
      </Frame>
      <div className="absolute rounded-[10px] bg-white shadow-[0_4px_16px_rgba(80,90,150,0.14)]" style={box({ l: 51, t: 222, w: 153, h: 127 })}>
        <div className="absolute top-[14px] left-[14px] text-[11px] leading-4 font-semibold text-[#1b1e1a]">Sources</div>
        {[
          { c: "#ccd7fb", ch: "#d6ddfb", l: "News" },
          { c: "#94a3f2", ch: "#94a3f2", l: "Blogs" },
          { c: "#5b5fc7", ch: "#5b5fc7", l: "Forums" },
        ].map((s, i) => (
          <div key={s.l}>
            <div className="absolute left-[14px] h-[25px] w-[35px]" style={{ top: 35 + i * 27, background: s.c }} />
            <div className="absolute left-[60px] flex items-center gap-[7px] text-[10.5px] text-[#484a49]" style={{ top: 46 + i * 21 }}>
              <span className="flex h-[13px] w-[13px] items-center justify-center rounded-[3px] text-white" style={{ background: s.ch }}>
                <svg viewBox="0 0 16 16" width={9} height={9}>
                  <path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" strokeWidth={2.4} />
                </svg>
              </span>
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function AlertsArt() {
  return (
    <Frame l={50} t={61} w={348} h={290} pad={9}>
      <div className="absolute top-[19px] left-[17px] h-[252px] w-[315px] rounded-[8px] bg-[#f4f5f8] p-[14px]">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffe3e3] text-[12px] text-[#e5484d]">!</span>
          <div className="text-[12px] leading-4 font-bold text-[#1b1e1a]">New mention alert</div>
        </div>
        <div className="mt-[6px] text-[10px] leading-[14px] text-[#6a6c6a]">Query: Warby Parker · Real-time</div>
        {[
          { s: "Negative", c: "bg-[#ffe3e3] text-[#d1002f]", t: "Customers report delays with online orders" },
          { s: "Positive", c: "bg-[#d4f5ea] text-[#177a5f]", t: "Warby Parker opens 20 new stores this fall" },
          { s: "Neutral", c: "bg-[#edefef] text-[#484a49]", t: "Eyewear brands bet on smart glasses" },
        ].map((m) => (
          <div key={m.t} className="mt-[10px] rounded-[6px] bg-white p-[8px]">
            <div className="truncate text-[10.5px] leading-[14px] font-semibold text-[#1b1e1a]">{m.t}</div>
            <div className="mt-[5px] flex items-center justify-between">
              <span className={`rounded-full px-[6px] text-[8.5px] leading-[13px] ${m.c}`}>{m.s}</span>
              <span className="text-[8.5px] text-[#8a8c96]">2 min ago</span>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function DigestArt() {
  return (
    <Frame l={50} t={61} w={380} h={286} pad={9}>
      <div className="absolute top-[16px] left-[18px] text-[13px] leading-5 font-bold text-[#1b1e1a]">Weekly digest</div>
      <div className="absolute top-[20px] right-[18px] text-[10px] text-[#8a8c96]">Sep 17 – Sep 24</div>
      <div className="absolute top-[48px] left-[18px] w-[344px] rounded-[8px] bg-[#f5effe] p-[10px]">
        <div className="flex items-center gap-1 text-[10.5px] leading-[14px] font-semibold text-[#8a3fcf]">✦ AI summary</div>
        <div className="mt-[4px] text-[10px] leading-[14px] text-[#484a49]">
          Coverage grew 18% this week, driven by new store openings. Sentiment stayed mostly positive, with a few complaints about delivery times.
        </div>
      </div>
      <div className="absolute top-[140px] left-[18px] grid w-[344px] grid-cols-3 gap-[8px]">
        {[
          ["Mentions", "1,284"],
          ["Reach", "58.2M"],
          ["Positive", "71%"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-[6px] border border-[#edefef] px-[8px] py-[6px]">
            <div className="text-[9px] text-[#6a6c6a]">{l}</div>
            <div className="text-[15px] leading-5 font-bold text-[#1b1e1a]">{v}</div>
          </div>
        ))}
      </div>
      {[200, 222, 244].map((t, i) => (
        <div key={t} className="absolute left-[18px] flex items-center gap-2" style={{ top: t }}>
          <i className="h-[6px] w-[6px] rounded-full" style={{ background: ["#34d9a8", "#d6d8d7", "#ff6b70"][i] }} />
          <div className="h-[8px] rounded-full bg-[#e1e2ea]" style={{ width: [300, 250, 280][i] }} />
        </div>
      ))}
    </Frame>
  );
}

function ListsArt() {
  return (
    <Frame l={50} t={61} w={386} h={290} pad={9}>
      <div className="absolute top-[16px] left-[18px] text-[14px] leading-5 font-bold text-[#1b1e1a]">Media lists</div>
      <div className="absolute top-[14px] right-[18px] rounded-[4px] bg-[#1b1e1a] px-[8px] text-[10.5px] leading-[22px] font-semibold text-white">+ New list</div>
      {[
        { n: "Tech launch Q4", c: 24 },
        { n: "Wellness journalists", c: 17 },
        { n: "Retail & DTC", c: 31 },
        { n: "Local press — Sweden", c: 9 },
      ].map((l, i) => (
        <div key={l.n} className="absolute left-[18px] flex h-[46px] w-[350px] items-center justify-between rounded-[6px] border border-[#edefef] px-[10px]" style={{ top: 54 + i * 54 }}>
          <div>
            <div className="text-[11px] leading-[14px] font-semibold text-[#1b1e1a]">{l.n}</div>
            <div className="text-[9.5px] leading-[13px] text-[#6a6c6a]">{l.c} contacts</div>
          </div>
          <div className="flex -space-x-[6px]">
            {["#c49a80", "#8d7a6a", "#e0b89a"].map((t) => (
              <span key={t} className="rounded-full ring-2 ring-white">
                <DrawnAvatar size={20} tone={t} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </Frame>
  );
}

function SendersArt() {
  return (
    <Frame l={50} t={61} w={386} h={290} pad={9}>
      <div className="absolute top-[16px] left-[18px] text-[14px] leading-5 font-bold text-[#1b1e1a]">Senders and domains</div>
      {[
        { n: "press@yourbrand.com", s: "Verified" },
        { n: "news@yourbrand.com", s: "Verified" },
        { n: "pr@yourbrand.se", s: "Pending" },
      ].map((d, i) => (
        <div key={d.n} className="absolute left-[18px] flex h-[46px] w-[350px] items-center justify-between rounded-[6px] border border-[#edefef] px-[10px]" style={{ top: 54 + i * 54 }}>
          <div className="text-[11px] font-semibold text-[#1b1e1a]">{d.n}</div>
          <span className={`rounded-full px-[7px] text-[9.5px] leading-[15px] ${d.s === "Verified" ? "bg-[#d4f5ea] text-[#177a5f]" : "bg-[#fff1d6] text-[#b26a00]"}`}>{d.s}</span>
        </div>
      ))}
      <div className="absolute top-[226px] left-[18px] w-[350px] rounded-[6px] bg-[#f4f5f8] p-[10px] text-[10px] leading-[14px] text-[#484a49]">
        Sending health: <b className="text-[#177a5f]">Good</b> · 98% delivered
      </div>
    </Frame>
  );
}

export function ArtBox({ art, height = 408 }: { art: Illustration; height?: number }) {
  return (
    <div className="relative w-[486px] shrink-0 overflow-hidden rounded-lg" style={{ height, background: heroGradient }}>
      {art === "topic" && (
        <>
          <TopicArt />
          <TopicOverlay />
        </>
      )}
      {art === "journalist" && <JournalistArt />}
      {art === "search" && <SearchArt />}
      {art === "inbox" && <InboxArt />}
      {art === "mentions" && <MentionsArt />}
      {art === "alerts" && <AlertsArt />}
      {art === "digest" && <DigestArt />}
      {art === "lists" && <ListsArt />}
      {art === "senders" && <SendersArt />}
    </div>
  );
}

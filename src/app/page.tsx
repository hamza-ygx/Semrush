import { FoldersPanel } from "@/components/FoldersPanel";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ChevronUpDownIcon, FeedbackIcon } from "@/components/icons";
import { Sidebar } from "@/components/Sidebar";
import { ToolCards } from "@/components/ToolCards";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="px-8">
          <ToolCards />
          <FoldersPanel />

          <section className="mt-6 flex h-11 items-center justify-between rounded-lg bg-white px-5 shadow-card">
            <h2 className="text-[16px] font-bold">Domains for monitoring</h2>
            <button className="mr-[6px] flex items-center gap-2 px-1 text-[14px] text-[#484a54] hover:text-[#191b23]">
              Open
              <ChevronUpDownIcon />
            </button>
          </section>

          <a
            href="#"
            className="mt-[22px] inline-flex items-center gap-[6px] text-[14px] leading-5 text-[#484a54] hover:text-[#191b23]"
          >
            <FeedbackIcon />
            <span className="underline decoration-dashed decoration-1 underline-offset-[5px]">Send feedback</span>
          </a>
        </main>
        <Footer />
      </div>

      <button
        aria-label="Help"
        className="fixed right-5 bottom-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#c9aafc] text-[28px] font-bold text-[#191b23] shadow-card hover:bg-[#b98ffb]"
      >
        ?
      </button>
    </div>
  );
}

import { routes } from "@/config/routes";
import { ChevronDownIcon, PlusIcon } from "./icons";

export function Header() {
  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#e0e2e1] pl-8 pr-9">
      <form className="flex h-8" action={routes.domainOverview}>
        <input
          type="text"
          placeholder="Enter website or keyword"
          className="h-8 w-[480px] rounded-l-md border border-r-0 border-[#d6d8d7] bg-white px-3 text-[14px] text-[#1b1e1a] outline-none placeholder:text-[#6a6c6a] focus:border-[#008ff8]"
        />
        <button
          type="submit"
          className="h-8 w-[71px] rounded-r-md bg-[#1b1e1a] text-[14px] font-medium text-white hover:bg-[#2b2e38]"
        >
          Analyze
        </button>
      </form>

      <nav className="flex items-center gap-7 text-[14px] text-[#1b1e1a]">
        <a href="#" className="flex items-center gap-[6px] hover:text-[#006dca]">
          <PlusIcon />
          Invite users
        </a>
        <a href="#" className="hover:text-[#006dca]">
          Pricing
        </a>
        <a href="#" className="hover:text-[#006dca]">
          Enterprise
        </a>
        <button className="flex items-center gap-[6px] hover:text-[#006dca]">
          More
          <ChevronDownIcon />
        </button>
        <span className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#5b54f6] text-[13px] font-medium text-white ring-2 ring-[#c8c5fd]">
          C
        </span>
      </nav>
    </header>
  );
}

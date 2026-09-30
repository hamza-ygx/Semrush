import { backlinksProps, type SearchParams } from "@/features/backlinks/load";
import { RefDomainsPage } from "@/features/backlinks/RefDomains";

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { live, demo, name } = await backlinksProps(searchParams, "refdomains");
  return <RefDomainsPage live={live?.refdomains} demo={demo} name={name} />;
}

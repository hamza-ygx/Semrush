import { TrackingSerpPage } from "@/features/tracking/serp/SerpPage";

type Search = Promise<{ date_begin?: string; domain?: string; location?: string; device_group?: string }>;

function decode(v: string) {
  let out = v;
  for (let i = 0; i < 2 && /%[0-9a-f]{2}/i.test(out); i++) {
    try {
      out = decodeURIComponent(out);
    } catch {
      break;
    }
  }
  return out;
}

export default async function Page({ params, searchParams }: { params: Promise<{ keyword: string }>; searchParams: Search }) {
  const { keyword } = await params;
  const { date_begin = "20260925", domain = "www.rkjh.se", location = "Sweden, desktop", device_group = "desktop" } = await searchParams;
  const device = device_group.charAt(0).toUpperCase() + device_group.slice(1);
  const host = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(domain) ? domain : "www.rkjh.se";
  return <TrackingSerpPage keyword={decode(keyword)} date={date_begin} domain={host} location={decode(location)} device={device} />;
}

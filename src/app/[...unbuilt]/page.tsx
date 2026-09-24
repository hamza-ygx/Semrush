import NotFound from "../not-found";
import { unbuiltRoutes } from "@/config/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return unbuiltRoutes.map((r) => ({ unbuilt: r.split("/").filter(Boolean) }));
}

export default function Unbuilt() {
  return <NotFound />;
}

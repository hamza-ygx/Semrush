import { redirect } from "next/navigation";
import { routes } from "@/config/routes";

export default function Page() {
  redirect(`${routes.organic.overview}?db=se&q=rkjh.se&searchType=domain`);
}

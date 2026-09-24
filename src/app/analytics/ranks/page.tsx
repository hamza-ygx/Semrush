import { redirect } from "next/navigation";
import { routes } from "@/config/routes";

export default function RanksIndex() {
  redirect(`${routes.rank}?db=se`);
}

import { redirect } from "next/navigation";
import { socialToolHref } from "@/features/social/data";

export default function Page() {
  redirect(socialToolHref("tracker"));
}

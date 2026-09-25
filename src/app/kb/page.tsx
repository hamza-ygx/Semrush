import { redirect } from "next/navigation";
import { kbArticles, kbHref } from "@/features/kb/data";

export default function Page() {
  redirect(kbHref(kbArticles[0].slug));
}

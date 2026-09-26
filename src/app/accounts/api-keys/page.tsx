import { redirect } from "next/navigation";
import { accountRoutes } from "@/features/account/data";

export default function Page() {
  redirect(accountRoutes.apiKeysActive);
}

import { routes } from "@/config/routes";
import { MultiloginPage } from "@/features/multilogin/MultiloginPage";

export default async function Page({ searchParams }: { searchParams: Promise<{ redirect_to?: string }> }) {
  const { redirect_to } = await searchParams;
  const redirectTo = redirect_to && redirect_to.startsWith("/") && !redirect_to.startsWith("//") ? redirect_to : routes.home;
  return <MultiloginPage redirectTo={redirectTo} />;
}

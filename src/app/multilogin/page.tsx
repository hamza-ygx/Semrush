import { MultiloginPage } from "@/features/multilogin/MultiloginPage";
import { safeRedirect } from "@/lib/safeRedirect";

export default async function Page({ searchParams }: { searchParams: Promise<{ redirect_to?: string | string[] }> }) {
  const { redirect_to } = await searchParams;
  return <MultiloginPage redirectTo={safeRedirect(redirect_to)} />;
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { getSession } from "@/lib/auth/session";
import { AuthCard } from "../login/AuthCard";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata: Metadata = { title: `Change password | ${brand.name}` };

export default async function Page() {
  const session = await getSession();
  if (!session) redirect(routes.login);
  return (
    <AuthCard title="Change password" subtitle={session.mustChange ? `Choose your own password before continuing, ${session.email}.` : `Signed in as ${session.email}.`}>
      <ChangePasswordForm />
    </AuthCard>
  );
}

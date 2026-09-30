import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { routes } from "@/config/routes";
import { authEnabled } from "@/lib/auth/config";
import { safeRedirect } from "@/lib/safeRedirect";
import { AuthCard } from "./AuthCard";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: `Log in | ${brand.name}` };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <AuthCard title="Log in" subtitle={`For ${brand.legalName} staff.`}>
      {authEnabled ? (
        <LoginForm next={safeRedirect(next)} />
      ) : (
        <p className="text-[14px] text-rk-text-2">
          Login is not configured on this server.{" "}
          <a href={routes.home} className="text-rk-link hover:text-rk-link-hover">
            Continue to the app
          </a>
        </p>
      )}
    </AuthCard>
  );
}

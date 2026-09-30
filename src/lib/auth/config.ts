export const staffDomain = "rkjh.se";

export const sessionCookie = "rk_session";
export const oidcCookie = "rk_oidc";
export const sessionHours = 12;

export const entra =
  process.env.AZURE_AD_TENANT_ID && process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET && process.env.AUTH_SECRET
    ? {
        tenantId: process.env.AZURE_AD_TENANT_ID,
        clientId: process.env.AZURE_AD_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
        secret: process.env.AUTH_SECRET,
      }
    : null;

export const backendEnabled = Boolean(entra && process.env.DATABASE_URL);

export function isStaffEmail(email: unknown): email is string {
  return typeof email === "string" && email.toLowerCase().endsWith(`@${staffDomain}`);
}

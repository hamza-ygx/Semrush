import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseEnv } from "./env";

export async function createClient() {
  if (!supabaseEnv) return null;
  const cookieStore = await cookies();
  return createServerClient(supabaseEnv.url, supabaseEnv.key, {
    db: { schema: "seo" },
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) cookieStore.set(name, value, options);
        } catch {}
      },
    },
  });
}

export type Db = NonNullable<Awaited<ReturnType<typeof createClient>>>;

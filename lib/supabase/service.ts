import { createClient as createServerClient } from "@supabase/supabase-js";

export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // allow the service role key to be provided under either name (but warn)
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL",
    );
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "Using NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY — consider renaming to SUPABASE_SERVICE_ROLE_KEY to avoid exposing the key to the browser.",
    );
  }

  return createServerClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

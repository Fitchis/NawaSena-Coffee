/**
 * Script: create-admin-user.ts
 * Usage (locally):
 * 1. Set environment variables:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY (your service_role key)
 * 2. Run with ts-node or compile: `npx ts-node scripts/create-admin-user.ts email@example.com password123`
 *
 * This script uses the Supabase Admin API (service_role) to create a new
 * user and mark their email as confirmed. After creating the user, add the
 * email to your `ADMIN_EMAILS` env (comma-separated) so middleware allows access.
 */

import { createClient } from "@supabase/supabase-js";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error(
      "Usage: node scripts/create-admin-user.js <email> <password>",
    );
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error(
      "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment",
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  try {
    // create user via admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    } as any);

    if (error) {
      console.error("Error creating user:", error);
      process.exit(1);
    }

    console.log("Created user:", data);
    console.log("Next: add this email to ADMIN_EMAILS in your .env.local");
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
}

main();

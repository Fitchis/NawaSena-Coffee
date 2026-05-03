"use client";

import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    // clear admin cookie on server as well
    await fetch("/api/auth/clear-admin-cookie", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="ml-4 bg-gray-200 px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}

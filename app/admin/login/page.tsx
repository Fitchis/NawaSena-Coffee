"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getBrowserSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Quick path: ask server to set a short-lived admin cookie so middleware accepts
      await fetch("/api/auth/set-admin-cookie", { method: "POST" });

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Gagal login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 border rounded">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div>
            <button
              className="w-full bg-primary text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Menyambungkan..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

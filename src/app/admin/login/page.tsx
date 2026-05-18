"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg shadow-nile-900/5 border border-nile-100 p-8 md:p-10">
          <div className="flex items-center justify-center h-14 w-14 rounded-full bg-nile-900 text-sand-50 mx-auto mb-5">
            <Lock className="h-6 w-6" strokeWidth={1.7} />
          </div>

          <h1 className="font-display text-2xl text-nile-900 font-medium text-center mb-2">
            Admin access
          </h1>
          <p className="text-sm text-nile-700/80 text-center mb-8">
            Enter the admin password to manage product images.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full rounded-lg border border-nile-200 bg-white px-4 py-3 text-base text-nile-900 placeholder-nile-400 focus:outline-none focus:ring-2 focus:ring-sand-400 focus:border-transparent transition-all"
            />

            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-full bg-nile-800 px-6 py-3 text-sm font-semibold text-sand-50 transition-all hover:bg-nile-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center">
            <a
              href="/en"
              className="text-xs text-nile-600 hover:text-nile-800 transition-colors"
            >
              ← Back to site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

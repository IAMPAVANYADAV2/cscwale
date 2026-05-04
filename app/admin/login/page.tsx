"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { AlertCircle, CheckCircle, Loader, Lock, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import { useAdminAuth } from "@/lib/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, status } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/admin/dashboard");
    }

    if (!authLoading && status === "unauthorized") {
      router.replace("/admin/unauthorized");
    }
  }, [isAuthenticated, authLoading, status, router]);

  const handleAdminLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!email || !password) {
        setError("Please enter email and password");
        return;
      }

      const credential = await signInWithEmailAndPassword(auth, email, password);
      const token = await credential.user.getIdToken();
      const response = await fetch("/api/auth/verify-admin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.admin) {
        await signOut(auth);
        if (result?.error) setError(result.error);
        router.replace("/admin/unauthorized");
        return;
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-purple-200">Secure access for administrators only</p>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-purple-500/20">
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading || success}
                placeholder="you@company.com"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading || success}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-green-200 text-sm">Login successful. Redirecting...</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || authLoading || success || !email || !password}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading || authLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  {status === "loading" ? "Checking session..." : "Verifying..."}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In as Admin
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-400 text-center">
              This admin portal uses Firebase Auth and Firestore role checks.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-purple-300 hover:text-purple-200 text-sm underline transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

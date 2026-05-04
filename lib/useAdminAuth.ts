"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import type { User } from "@/types/admin";

export type AdminAuthStatus = "loading" | "unauthenticated" | "unauthorized" | "authenticated" | "error";

export function useAdminAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<AdminAuthStatus>("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setStatus("loading");
      setError(null);

      try {
        if (!firebaseUser) {
          setAdmin(null);
          setIsAuthenticated(false);
          setStatus("unauthenticated");
          return;
        }

        const token = await firebaseUser.getIdToken();
        const response = await fetch("/api/auth/verify-admin", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.admin) {
          setAdmin(null);
          setIsAuthenticated(false);
          setStatus("unauthorized");
          setError(result?.error || "You do not have permission to access the admin area.");
          return;
        }

        setAdmin(result.admin as User);
        setIsAuthenticated(true);
        setStatus("authenticated");
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to verify admin session";
        setError(message);
        setAdmin(null);
        setIsAuthenticated(false);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setAdmin(null);
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  return {
    admin,
    loading,
    isAuthenticated,
    error,
    status,
    logout,
  };
}

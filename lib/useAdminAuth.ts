"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: string;
}

export function useAdminAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        // Check if admin token exists in localStorage or sessionStorage
        const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
        
        if (!token) {
          setIsAuthenticated(false);
          setAdmin(null);
          setLoading(false);
          return;
        }

        // Try to get cached admin user
        const cachedAdmin = localStorage.getItem("adminUser");
        if (cachedAdmin) {
          setAdmin(JSON.parse(cachedAdmin));
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Verify token with backend
        const response = await fetch("/api/auth/verify-admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          // Token is invalid, clear storage
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          sessionStorage.removeItem("adminToken");
          setIsAuthenticated(false);
          setAdmin(null);
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (data.admin) {
          setAdmin(data.admin);
          localStorage.setItem("adminUser", JSON.stringify(data.admin));
          setIsAuthenticated(true);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to verify admin session";
        setError(message);
        console.error("Admin auth error:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminSession();
  }, []);

  const logout = async () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminToken");
    setAdmin(null);
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  return {
    admin,
    loading,
    isAuthenticated,
    error,
    logout,
  };
}

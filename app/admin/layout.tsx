"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "@/lib/useAdminAuth";
import { AlertCircle, Loader } from "lucide-react";
import AdminShell from "./components/AdminShell";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, isAuthenticated, logout, admin, error, status } = useAdminAuth();
  const isPublicAdminRoute = pathname === "/admin/login" || pathname === "/admin/unauthorized";

  useEffect(() => {
    if (loading || isAuthenticated || isPublicAdminRoute) return;

    if (status === "unauthorized") {
      router.replace("/admin/unauthorized");
      return;
    }

    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [loading, isAuthenticated, isPublicAdminRoute, status, router]);

  if (isPublicAdminRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-white">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-red-500/30 bg-slate-800 p-6 text-center shadow-2xl">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-white mb-2">Unable to verify admin access</h1>
          <p className="text-sm text-slate-300 mb-5">
            {error || "Please try signing in again."}
          </p>
          <button
            onClick={logout}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Return to admin login
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminShell admin={admin} onLogout={logout}>
      {children}
    </AdminShell>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}

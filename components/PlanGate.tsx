"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";

type PlanGateProps = {
  toolSlug: string;
  children: React.ReactNode;
};

export default function PlanGate({ toolSlug, children }: PlanGateProps) {
  const { loading, user, currentPlan, canAccessTool } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
        Checking plan access...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
          <Lock className="mx-auto h-8 w-8 text-slate-500" />
          <h1 className="mt-3 text-xl font-bold text-slate-900">Login required</h1>
          <p className="mt-2 text-sm text-slate-600">Please login to use this tool.</p>
          <Link
            href="/login"
            className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  if (!canAccessTool(toolSlug)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
          <Lock className="mx-auto h-8 w-8 text-amber-600" />
          <h1 className="mt-3 text-xl font-bold text-slate-900">Plan upgrade needed</h1>
          <p className="mt-2 text-sm text-slate-600">
            Your current {currentPlan?.name || "Trial"} plan does not include this tool.
          </p>
          <Link
            href="/tools"
            className="mt-5 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            View plans
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

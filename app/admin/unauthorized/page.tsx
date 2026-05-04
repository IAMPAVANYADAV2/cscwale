"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { AlertTriangle, Home, LogIn } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";

export default function AdminUnauthorizedPage() {
  const router = useRouter();

  const returnToLogin = async () => {
    await signOut(auth).catch(() => undefined);
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl border border-amber-500/30 bg-slate-800 p-8 text-center shadow-2xl">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15">
          <AlertTriangle className="h-8 w-8 text-amber-300" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-white">Admin access required</h1>
        <p className="mb-7 text-sm leading-6 text-slate-300">
          Your account is signed in, but it is not authorized to open the admin dashboard.
          Ask an administrator to update your role in Firestore if you need access.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={returnToLogin}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            <LogIn className="h-4 w-4" />
            Admin login
          </button>
          <button
            onClick={() => router.replace("/")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

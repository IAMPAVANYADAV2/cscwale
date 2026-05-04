"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/admin";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import ToastContainer from "./ui/Toast";

interface AdminShellProps {
  admin: User | null;
  children: ReactNode;
  onLogout: () => void;
}

export default function AdminShell({ admin, children, onLogout }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <AdminHeader
          admin={admin}
          onLogout={onLogout}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="p-4 sm:p-6">{children}</main>
        <ToastContainer />
      </div>
    </div>
  );
}

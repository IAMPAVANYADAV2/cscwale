"use client";

import { usePathname } from "next/navigation";
import { LogOut, Menu, RefreshCw } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "User Management",
  "/admin/orders": "Order Management",
  "/admin/messages": "Messages",
  "/admin/plans": "Plan Management",
  "/admin/tools": "Tools & Services",
  "/admin/trash": "Trash",
  "/admin/logs": "Activity Logs",
};

interface AdminHeaderProps {
  admin: { email: string; displayName?: string } | null;
  onLogout: () => void;
  onMenuToggle: () => void;
}

export default function AdminHeader({ admin, onLogout, onMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Admin";

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-white font-semibold text-lg">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400 hidden sm:block">
            {admin?.email || "admin"}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600/15 hover:bg-red-600/25 text-red-400 rounded-lg transition text-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

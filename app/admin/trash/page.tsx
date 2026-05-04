"use client";

import { useState, useEffect, useCallback } from "react";
import { RotateCcw, Loader, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import EmptyState from "../components/ui/EmptyState";
import { showToast } from "../components/ui/Toast";

interface TrashedItem {
  id: string;
  type: "users" | "plans" | "tools" | "messages" | "orders";
  typeLabel: string;
  collection: string;
  title: string;
  deletedAt: string | null;
  deletedBy: string;
}

const TRASH_TYPES = [
  { label: "All", value: "all" },
  { label: "Users", value: "users" },
  { label: "Plans", value: "plans" },
  { label: "Tools", value: "tools" },
  { label: "Messages", value: "messages" },
  { label: "Orders", value: "orders" },
];

const typeStyles: Record<TrashedItem["type"], string> = {
  users: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  plans: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  tools: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  messages: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  orders: "bg-blue-500/15 text-blue-300 border-blue-500/30",
};

export default function TrashPage() {
  const [items, setItems] = useState<TrashedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [restoring, setRestoring] = useState<string | null>(null);

  const loadTrash = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/trash?type=${filter}`);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load trash");
      }

      setItems(data.items || []);
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to load trash");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTrash();
  }, [loadTrash]);

  const handleRestore = async (item: TrashedItem) => {
    setRestoring(`${item.collection}:${item.id}`);
    try {
      const res = await adminFetch("/api/admin/trash/restore", {
        method: "POST",
        body: JSON.stringify({
          type: item.type,
          collection: item.collection,
          documentId: item.id,
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to restore");
      }

      showToast("success", "Record restored");
      loadTrash();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to restore record");
    } finally {
      setRestoring(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {TRASH_TYPES.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === item.value
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                : "bg-slate-800/50 text-slate-400 border border-slate-700 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-20 bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<Trash2 className="w-10 h-10" />}
          title="Trash is empty"
          description="Deleted users, plans, tools, messages, and orders will appear here."
        />
      ) : (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700/50 border-b border-slate-600/50">
                  <th className="px-5 py-3 text-left text-slate-300 font-medium text-xs uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-left text-slate-300 font-medium text-xs uppercase tracking-wider">Title / Name</th>
                  <th className="px-5 py-3 text-left text-slate-300 font-medium text-xs uppercase tracking-wider">Deleted At</th>
                  <th className="px-5 py-3 text-left text-slate-300 font-medium text-xs uppercase tracking-wider">Deleted By</th>
                  <th className="px-5 py-3 text-right text-slate-300 font-medium text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const restoreKey = `${item.collection}:${item.id}`;
                  return (
                    <tr key={restoreKey} className="border-b border-slate-700/50">
                      <td className="px-5 py-3">
                        <span className={`inline-flex text-xs px-2.5 py-0.5 rounded-md border font-medium ${typeStyles[item.type]}`}>
                          {item.typeLabel}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-white text-sm font-medium max-w-sm truncate">{item.title || item.id}</p>
                        <p className="text-slate-500 text-xs">{item.id}</p>
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs">
                        {item.deletedAt ? new Date(item.deletedAt).toLocaleString() : "Unknown"}
                      </td>
                      <td className="px-5 py-3 text-slate-400 text-xs">{item.deletedBy || "unknown"}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => handleRestore(item)}
                          disabled={restoring === restoreKey}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 rounded-lg transition text-sm disabled:opacity-50"
                        >
                          {restoring === restoreKey ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                          Restore
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

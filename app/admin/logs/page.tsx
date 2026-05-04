"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import type { AdminLog, TableColumn } from "@/types/admin";

const DAY_OPTIONS = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 14 days", value: "14" },
  { label: "Last 30 days", value: "30" },
];

export default function LogsPage() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState("7");

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/logs?days=${days}`);
      if (res.ok) {
        const d = await res.json();
        setLogs(d.data || []);
      }
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => { loadLogs(); }, [loadLogs]);

  const columns: TableColumn<AdminLog>[] = [
    {
      key: "timestamp",
      label: "Time",
      sortable: true,
      render: (l) => <span className="text-slate-400 text-xs whitespace-nowrap">{new Date(l.timestamp).toLocaleString()}</span>,
    },
    {
      key: "action",
      label: "Action",
      render: (l) => <StatusBadge status={l.action} />,
    },
    {
      key: "details",
      label: "Details",
      render: (l) => <span className="text-slate-300 text-xs max-w-xs truncate block">{l.details}</span>,
    },
    {
      key: "adminId",
      label: "Admin",
      render: (l) => <span className="text-slate-400 text-xs">{l.adminId}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={logs}
        loading={loading}
        searchable
        searchPlaceholder="Search logs..."
        searchFields={["action", "details", "adminId"]}
        emptyMessage="No admin actions logged"
        actions={
          <div className="flex gap-2">
            <select
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {DAY_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <button
              onClick={loadLogs}
              className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        }
      />
    </div>
  );
}

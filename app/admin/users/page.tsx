"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Ban,
  Eye,
  Loader2,
  RefreshCw,
  RotateCcw,
  Search,
  Trash2,
  Unlock,
} from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import Modal from "../components/ui/Modal";
import type { AdminUser, ApiResponse, Plan } from "@/types/admin";
import { showToast } from "../components/ui/Toast";

type StatusFilter = "all" | "active" | "blocked" | "deleted";

const STATUS_FILTERS: Array<{ label: string; value: StatusFilter }> = [
  { label: "All active", value: "all" },
  { label: "Active", value: "active" },
  { label: "Blocked", value: "blocked" },
  { label: "Deleted", value: "deleted" },
];

function getUserPlan(user: AdminUser): string {
  return (user.planId || "").toLowerCase();
}

function getUserPhone(user: AdminUser): string {
  return user.phone || user.phoneNumber || "";
}

function formatPlan(plan: string | null | undefined): string {
  if (!plan) return "Trial";
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

async function parseError(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => null)) as ApiResponse | null;
  return body?.error || body?.message || fallback;
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/users?includeDeleted=true&limit=200");

      if (!res.ok) {
        showToast(await parseError(res, "Failed to load users"), "error");
        return;
      }

      const data = (await res.json()) as ApiResponse<AdminUser[]>;
      setUsers(data.data || []);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error loading users", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const loadPlans = async () => {
      const res = await adminFetch("/api/admin/plans?includeDeleted=true&limit=100");
      if (!res.ok) return;
      const data = (await res.json()) as ApiResponse<Plan[]>;
      setPlans((data.data || []).filter((plan) => plan.isActive && !plan.isDeleted));
    };

    loadPlans();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const isDeleted = user.isDeleted === true;
      const isBlocked = user.isBlocked === true;
      const plan = getUserPlan(user);

      if (statusFilter === "deleted" && !isDeleted) return false;
      if (statusFilter !== "deleted" && isDeleted) return false;
      if (statusFilter === "active" && isBlocked) return false;
      if (statusFilter === "blocked" && !isBlocked) return false;
      if (planFilter !== "all" && plan !== planFilter.toLowerCase()) return false;

      if (!query) return true;

      return [user.displayName, user.email, getUserPhone(user)]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(query));
    });
  }, [planFilter, searchTerm, statusFilter, users]);

  const counts = useMemo(
    () => ({
      total: users.filter((user) => !user.isDeleted).length,
      active: users.filter((user) => !user.isDeleted && !user.isBlocked).length,
      blocked: users.filter((user) => !user.isDeleted && user.isBlocked).length,
      deleted: users.filter((user) => user.isDeleted).length,
    }),
    [users]
  );

  const updateUser = async (
    user: AdminUser,
    body: Record<string, unknown>,
    loadingKey: string,
    successMessage: string
  ) => {
    try {
      setActionLoading(loadingKey);
      const res = await adminFetch(`/api/admin/users/${user.uid}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        showToast(await parseError(res, "Failed to update user"), "error");
        return;
      }

      showToast(successMessage, "success");
      await loadUsers();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error updating user", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePlanChange = async (user: AdminUser, planId: string) => {
    await updateUser(
      user,
      { planId },
      `plan:${user.uid}`,
      "Assigned plan and updated expiry"
    );
  };

  const handleBlock = async (user: AdminUser) => {
    const reason = window.prompt(`Reason for blocking ${user.email}:`);
    if (!reason?.trim()) return;

    try {
      setActionLoading(`block:${user.uid}`);
      const res = await adminFetch(`/api/admin/users/${user.uid}/block`, {
        method: "POST",
        body: JSON.stringify({ reason: reason.trim() }),
      });

      if (!res.ok) {
        showToast(await parseError(res, "Failed to block user"), "error");
        return;
      }

      showToast("User blocked successfully", "success");
      await loadUsers();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error blocking user", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleActivate = async (user: AdminUser) => {
    try {
      setActionLoading(`activate:${user.uid}`);
      const res = await adminFetch(`/api/admin/users/${user.uid}/unblock`, {
        method: "POST",
      });

      if (!res.ok) {
        showToast(await parseError(res, "Failed to activate user"), "error");
        return;
      }

      showToast("User activated successfully", "success");
      await loadUsers();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error activating user", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (user: AdminUser) => {
    if (!window.confirm(`Soft delete ${user.email}?`)) return;

    try {
      setActionLoading(`delete:${user.uid}`);
      const res = await adminFetch(`/api/admin/users/${user.uid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        showToast(await parseError(res, "Failed to delete user"), "error");
        return;
      }

      showToast("User deleted successfully", "success");
      await loadUsers();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error deleting user", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRestore = async (user: AdminUser) => {
    try {
      setActionLoading(`restore:${user.uid}`);
      const res = await adminFetch(`/api/admin/users/${user.uid}/restore`, {
        method: "POST",
      });

      if (!res.ok) {
        showToast(await parseError(res, "Failed to restore user"), "error");
        return;
      }

      showToast("User restored successfully", "success");
      await loadUsers();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error restoring user", "error");
    } finally {
      setActionLoading(null);
    }
  };

  const isBusy = (key: string) => actionLoading === key;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Users Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Real Firestore users with plan, status, delete, and restore controls.
          </p>
        </div>
        <button
          onClick={loadUsers}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-700/60 bg-slate-900/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Shown</p>
          <p className="mt-1 text-2xl font-semibold text-white">{filteredUsers.length}</p>
        </div>
        <div className="rounded-lg border border-slate-700/60 bg-slate-900/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Active</p>
          <p className="mt-1 text-2xl font-semibold text-green-300">{counts.active}</p>
        </div>
        <div className="rounded-lg border border-slate-700/60 bg-slate-900/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Blocked</p>
          <p className="mt-1 text-2xl font-semibold text-orange-300">{counts.blocked}</p>
        </div>
        <div className="rounded-lg border border-slate-700/60 bg-slate-900/40 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Deleted</p>
          <p className="mt-1 text-2xl font-semibold text-red-300">{counts.deleted}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-slate-700/60 bg-slate-900/30 p-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search name, email, or phone"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 py-2 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
          />
        </div>

        <select
          value={planFilter}
          onChange={(event) => setPlanFilter(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500"
        >
          <option value="all">All plans</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id.toLowerCase()}>
              {plan.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-500"
        >
          {STATUS_FILTERS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-700/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="border-b border-slate-700/60 bg-slate-900/70">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">User</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Plan</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">Created</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 bg-slate-950/20">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading users from Firestore...
                    </span>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                    No users match the current filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const plan = getUserPlan(user);
                  const expired = user.effectivePlan === "trial" && plan !== "trial";
                  const deleted = user.isDeleted === true;
                  const blocked = user.isBlocked === true;

                  return (
                    <tr key={user.uid} className="transition-colors hover:bg-slate-800/35">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-100">
                          {user.displayName || "Unnamed user"}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-400">{user.email || "-"}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{getUserPhone(user) || "-"}</td>
                      <td className="px-4 py-3">
                        <select
                          value={plans.some((item) => item.id === user.planId) ? user.planId || "" : ""}
                          onChange={(event) => handlePlanChange(user, event.target.value)}
                          disabled={deleted || isBusy(`plan:${user.uid}`)}
                          className="w-28 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm text-white outline-none transition focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {plans.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <div className={`mt-1 text-xs ${expired ? "text-orange-300" : "text-slate-500"}`}>
                          {expired ? "Expired: Trial access" : `Expires: ${formatDate(user.planExpiryDate)}`}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {deleted ? (
                          <span className="rounded-full bg-red-500/15 px-2 py-1 text-xs font-medium text-red-300">
                            Deleted
                          </span>
                        ) : blocked ? (
                          <span className="rounded-full bg-orange-500/15 px-2 py-1 text-xs font-medium text-orange-300">
                            Blocked
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs font-medium text-green-300">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{formatDate(user.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {!deleted && !blocked && (
                            <button
                              onClick={() => handleBlock(user)}
                              disabled={isBusy(`block:${user.uid}`)}
                              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-orange-300 disabled:opacity-50"
                              title="Block user"
                            >
                              {isBusy(`block:${user.uid}`) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Ban className="h-4 w-4" />
                              )}
                            </button>
                          )}

                          {!deleted && blocked && (
                            <button
                              onClick={() => handleActivate(user)}
                              disabled={isBusy(`activate:${user.uid}`)}
                              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-green-300 disabled:opacity-50"
                              title="Activate user"
                            >
                              {isBusy(`activate:${user.uid}`) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Unlock className="h-4 w-4" />
                              )}
                            </button>
                          )}

                          {!deleted ? (
                            <button
                              onClick={() => handleDelete(user)}
                              disabled={isBusy(`delete:${user.uid}`)}
                              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-red-300 disabled:opacity-50"
                              title="Soft delete user"
                            >
                              {isBusy(`delete:${user.uid}`) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestore(user)}
                              disabled={isBusy(`restore:${user.uid}`)}
                              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-green-300 disabled:opacity-50"
                              title="Restore user"
                            >
                              {isBusy(`restore:${user.uid}`) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <RotateCcw className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <Modal
          title="User Details"
          subtitle={selectedUser.email}
          onClose={() => setSelectedUser(null)}
          maxWidth="max-w-3xl"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["UID", selectedUser.uid],
              ["Name", selectedUser.displayName || "-"],
              ["Email", selectedUser.email || "-"],
              ["Phone", getUserPhone(selectedUser) || "-"],
              ["Role", selectedUser.role || "user"],
              ["Plan", formatPlan(getUserPlan(selectedUser))],
              ["Effective plan", formatPlan(selectedUser.effectivePlan)],
              ["Plan expiry", formatDate(selectedUser.planExpiryDate)],
              ["Status", selectedUser.isDeleted ? "Deleted" : selectedUser.isBlocked ? "Blocked" : "Active"],
              ["Created", formatDate(selectedUser.createdAt)],
              ["Last login", formatDate(selectedUser.lastLogin)],
              ["Updated", formatDate(selectedUser.updatedAt)],
              ["Blocked reason", selectedUser.blockedReason || "-"],
              ["Deleted by", selectedUser.deletedBy || "-"],
              ["Deleted at", formatDate(selectedUser.deletedAt)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-700/70 bg-slate-900/50 p-3">
                <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
                <div className="mt-1 break-words text-sm text-slate-100">{value}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Edit2, Loader2, Plus, Power, RotateCcw, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import Modal from "../components/ui/Modal";
import { showToast } from "../components/ui/Toast";
import type { ApiResponse, CreatePlanInput, Plan, PlanName } from "@/types/admin";

const PLAN_NAMES: PlanName[] = ["Trial", "Light", "Pro"];

const emptyPlan: CreatePlanInput = {
  name: "Trial",
  price: 0,
  durationDays: 7,
  features: [],
  toolAccess: [],
  maxUsage: 10,
  isActive: true,
  sortOrder: 1,
};

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function arrayToLines(value: string[] | undefined): string {
  return (value || []).join("\n");
}

async function parseError(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => null)) as ApiResponse | null;
  return body?.error || body?.message || fallback;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<CreatePlanInput>(emptyPlan);
  const [featuresText, setFeaturesText] = useState("");
  const [toolAccessText, setToolAccessText] = useState("");
  const [showDeletedOnly, setShowDeletedOnly] = useState(false);

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/plans?includeDeleted=true&limit=100");

      if (!res.ok) {
        showToast(await parseError(res, "Failed to load plans"), "error");
        return;
      }

      const data = (await res.json()) as ApiResponse<Plan[]>;
      setPlans(data.data || []);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error loading plans", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const visiblePlans = useMemo(
    () => plans.filter((plan) => (showDeletedOnly ? plan.isDeleted : !plan.isDeleted)),
    [plans, showDeletedOnly]
  );

  const resetForm = (plan?: Plan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
        features: plan.features || [],
        toolAccess: plan.toolAccess || [],
        maxUsage: plan.maxUsage,
        isActive: plan.isActive,
        sortOrder: plan.sortOrder || 0,
      });
      setFeaturesText(arrayToLines(plan.features));
      setToolAccessText(arrayToLines(plan.toolAccess));
    } else {
      setEditingPlan(null);
      setFormData(emptyPlan);
      setFeaturesText("");
      setToolAccessText("");
    }
    setShowModal(true);
  };

  const savePlan = async () => {
    if (!formData.name) {
      showToast("Plan name is required", "error");
      return;
    }

    const payload: CreatePlanInput = {
      ...formData,
      price: Number(formData.price),
      durationDays: Number(formData.durationDays),
      maxUsage: Number(formData.maxUsage),
      features: linesToArray(featuresText),
      toolAccess: linesToArray(toolAccessText),
    };

    try {
      setSaving(true);
      const res = await adminFetch(
        editingPlan ? `/api/admin/plans/${editingPlan.id}` : "/api/admin/plans",
        {
          method: editingPlan ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        showToast(await parseError(res, "Failed to save plan"), "error");
        return;
      }

      showToast(editingPlan ? "Plan updated successfully" : "Plan created successfully", "success");
      setShowModal(false);
      await loadPlans();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error saving plan", "error");
    } finally {
      setSaving(false);
    }
  };

  const togglePlan = async (plan: Plan) => {
    const res = await adminFetch(`/api/admin/plans/${plan.id}`, {
      method: "PUT",
      body: JSON.stringify({ isActive: !plan.isActive }),
    });

    if (!res.ok) {
      showToast(await parseError(res, "Failed to update plan status"), "error");
      return;
    }

    showToast(plan.isActive ? "Plan disabled" : "Plan enabled", "success");
    await loadPlans();
  };

  const deletePlan = async (plan: Plan) => {
    if (!window.confirm(`Soft delete ${plan.name} plan?`)) return;
    const res = await adminFetch(`/api/admin/plans/${plan.id}`, { method: "DELETE" });

    if (!res.ok) {
      showToast(await parseError(res, "Failed to delete plan"), "error");
      return;
    }

    showToast("Plan deleted successfully", "success");
    await loadPlans();
  };

  const restorePlan = async (plan: Plan) => {
    const res = await adminFetch(`/api/admin/plans/${plan.id}/restore`, { method: "POST" });

    if (!res.ok) {
      showToast(await parseError(res, "Failed to restore plan"), "error");
      return;
    }

    showToast("Plan restored successfully", "success");
    await loadPlans();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Plans Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage Trial, Light, and Pro access, usage, expiry duration, and tool availability.
          </p>
        </div>
        <button
          onClick={() => resetForm()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          <Plus className="h-4 w-4" />
          Create Plan
        </button>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={showDeletedOnly}
          onChange={(event) => setShowDeletedOnly(event.target.checked)}
          className="rounded"
        />
        Show deleted plans
      </label>

      <div className="overflow-hidden rounded-lg border border-slate-700/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="border-b border-slate-700/60 bg-slate-900/70">
              <tr>
                {["Plan", "Price", "Duration", "Tools", "Usage", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 bg-slate-950/20">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading plans...
                    </span>
                  </td>
                </tr>
              ) : visiblePlans.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    No plans found.
                  </td>
                </tr>
              ) : (
                visiblePlans.map((plan) => (
                  <tr key={plan.id} className="transition hover:bg-slate-800/35">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-100">{plan.name}</div>
                      <div className="text-xs text-slate-500">{plan.features?.length || 0} features</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">Rs. {plan.price}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{plan.durationDays} days</td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {(plan.toolAccess || []).join(", ") || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {plan.maxUsage < 0 ? "Unlimited" : plan.maxUsage}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          plan.isDeleted
                            ? "bg-red-500/15 text-red-300"
                            : plan.isActive
                              ? "bg-green-500/15 text-green-300"
                              : "bg-slate-600/30 text-slate-300"
                        }`}
                      >
                        {plan.isDeleted ? "Deleted" : plan.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => resetForm(plan)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-amber-300"
                          title="Edit plan"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {!plan.isDeleted && (
                          <button
                            onClick={() => togglePlan(plan)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
                            title={plan.isActive ? "Disable plan" : "Enable plan"}
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        )}
                        {!plan.isDeleted ? (
                          <button
                            onClick={() => deletePlan(plan)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-red-300"
                            title="Soft delete plan"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => restorePlan(plan)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-green-300"
                            title="Restore plan"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal title={editingPlan ? "Edit Plan" : "Create Plan"} onClose={() => setShowModal(false)} maxWidth="max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-300">
              Plan
              <select
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value as PlanName })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              >
                {PLAN_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Price
              <input
                type="number"
                value={formData.price}
                onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Duration Days
              <input
                type="number"
                value={formData.durationDays}
                onChange={(event) => setFormData({ ...formData, durationDays: Number(event.target.value) })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Max Usage
              <input
                type="number"
                value={formData.maxUsage}
                onChange={(event) => setFormData({ ...formData, maxUsage: Number(event.target.value) })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300 sm:col-span-2">
              Features, one per line
              <textarea
                value={featuresText}
                onChange={(event) => setFeaturesText(event.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300 sm:col-span-2">
              Tool Access, one slug per line. Use * for all tools.
              <textarea
                value={toolAccessText}
                onChange={(event) => setToolAccessText(event.target.value)}
                rows={3}
                placeholder={"pvc-cropper\naadhar-cropper"}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
                className="rounded"
              />
              Active
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={savePlan}
              disabled={saving}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Plan
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

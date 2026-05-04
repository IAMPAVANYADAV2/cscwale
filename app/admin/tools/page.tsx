"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Edit2,
  Loader2,
  Plus,
  Power,
  RotateCcw,
  Star,
  Trash2,
} from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import Modal from "../components/ui/Modal";
import { showToast } from "../components/ui/Toast";
import type { ApiResponse, CreateToolInput, PlanKey, Tool } from "@/types/admin";

const CATEGORIES: Tool["category"][] = ["cropper", "pvc", "automation", "certificate", "general"];
const REQUIRED_PLANS: PlanKey[] = ["trial", "light", "pro"];

const emptyTool: CreateToolInput = {
  title: "",
  slug: "",
  description: "",
  category: "general",
  icon: "wrench",
  price: 0,
  requiredPlan: "trial",
  isActive: true,
  isFeatured: false,
  sortOrder: 0,
};

async function parseError(response: Response, fallback: string): Promise<string> {
  const body = (await response.json().catch(() => null)) as ApiResponse | null;
  return body?.error || body?.message || fallback;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [formData, setFormData] = useState<CreateToolInput>(emptyTool);
  const [showDeletedOnly, setShowDeletedOnly] = useState(false);

  const loadTools = useCallback(async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/tools?includeDeleted=true&limit=100");

      if (!res.ok) {
        showToast(await parseError(res, "Failed to load tools"), "error");
        return;
      }

      const data = (await res.json()) as ApiResponse<Tool[]>;
      setTools(data.data || []);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error loading tools", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  const visibleTools = useMemo(
    () =>
      tools
        .filter((tool) => (showDeletedOnly ? tool.isDeleted : !tool.isDeleted))
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    [tools, showDeletedOnly]
  );

  const resetForm = (tool?: Tool) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        title: tool.title || tool.name || "",
        slug: tool.slug,
        description: tool.description,
        category: tool.category,
        icon: tool.icon,
        price: tool.price,
        requiredPlan: tool.requiredPlan,
        isActive: tool.isActive,
        isFeatured: tool.isFeatured,
        sortOrder: tool.sortOrder,
      });
    } else {
      setEditingTool(null);
      setFormData({ ...emptyTool, sortOrder: tools.length + 1 });
    }

    setShowModal(true);
  };

  const saveTool = async () => {
    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast("Title and slug are required", "error");
      return;
    }

    const payload: CreateToolInput = {
      ...formData,
      title: formData.title.trim(),
      slug: slugify(formData.slug),
      price: Number(formData.price),
      sortOrder: Number(formData.sortOrder || 0),
    };

    try {
      setSaving(true);
      const res = await adminFetch(
        editingTool ? `/api/admin/tools/${editingTool.id}` : "/api/admin/tools",
        {
          method: editingTool ? "PUT" : "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        showToast(await parseError(res, "Failed to save tool"), "error");
        return;
      }

      showToast(editingTool ? "Tool updated successfully" : "Tool created successfully", "success");
      setShowModal(false);
      await loadTools();
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Error saving tool", "error");
    } finally {
      setSaving(false);
    }
  };

  const updateTool = async (tool: Tool, updates: Partial<CreateToolInput>, successMessage: string) => {
    const res = await adminFetch(`/api/admin/tools/${tool.id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      showToast(await parseError(res, "Failed to update tool"), "error");
      return;
    }

    showToast(successMessage, "success");
    await loadTools();
  };

  const deleteTool = async (tool: Tool) => {
    if (!window.confirm(`Soft delete "${tool.title || tool.name}"?`)) return;

    const res = await adminFetch(`/api/admin/tools/${tool.id}`, { method: "DELETE" });
    if (!res.ok) {
      showToast(await parseError(res, "Failed to delete tool"), "error");
      return;
    }

    showToast("Tool deleted successfully", "success");
    await loadTools();
  };

  const restoreTool = async (tool: Tool) => {
    const res = await adminFetch(`/api/admin/tools/${tool.id}/restore`, { method: "POST" });
    if (!res.ok) {
      showToast(await parseError(res, "Failed to restore tool"), "error");
      return;
    }

    showToast("Tool restored successfully", "success");
    await loadTools();
  };

  const moveTool = async (tool: Tool, direction: "up" | "down") => {
    const currentIndex = visibleTools.findIndex((item) => item.id === tool.id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const swapTool = visibleTools[swapIndex];

    if (!swapTool) return;

    const res = await adminFetch("/api/admin/tools/reorder", {
      method: "PUT",
      body: JSON.stringify({
        items: [
          { id: tool.id, sortOrder: swapTool.sortOrder },
          { id: swapTool.id, sortOrder: tool.sortOrder },
        ],
      }),
    });

    if (!res.ok) {
      showToast(await parseError(res, "Failed to reorder tools"), "error");
      return;
    }

    showToast("Tool order updated", "success");
    await loadTools();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tools Management</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add tools, control access, feature important tools, and manage soft-deleted records.
          </p>
        </div>
        <button
          onClick={() => resetForm()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
        >
          <Plus className="h-4 w-4" />
          Add Tool
        </button>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={showDeletedOnly}
          onChange={(event) => setShowDeletedOnly(event.target.checked)}
          className="rounded"
        />
        Show deleted tools
      </label>

      <div className="overflow-hidden rounded-lg border border-slate-700/60">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px]">
            <thead className="border-b border-slate-700/60 bg-slate-900/70">
              <tr>
                {["Order", "Tool", "Category", "Price", "Plan", "Featured", "Status", "Actions"].map((head) => (
                  <th key={head} className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 bg-slate-950/20">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading tools...
                    </span>
                  </td>
                </tr>
              ) : visibleTools.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                    No tools found.
                  </td>
                </tr>
              ) : (
                visibleTools.map((tool, index) => (
                  <tr key={tool.id} className="transition hover:bg-slate-800/35">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveTool(tool, "up")}
                          disabled={index === 0 || showDeletedOnly}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
                          title="Move up"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveTool(tool, "down")}
                          disabled={index === visibleTools.length - 1 || showDeletedOnly}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
                          title="Move down"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <span className="ml-2 text-sm text-slate-400">{tool.sortOrder}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-100">{tool.title || tool.name}</div>
                      <div className="text-xs text-slate-500">{tool.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{tool.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">Rs. {tool.price}</td>
                    <td className="px-4 py-3">
                      {!tool.isDeleted ? (
                        <select
                          value={tool.requiredPlan}
                          onChange={(event) =>
                            updateTool(tool, { requiredPlan: event.target.value }, "Required plan updated")
                          }
                          className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-sm text-white outline-none focus:border-cyan-500"
                        >
                          {REQUIRED_PLANS.map((plan) => (
                            <option key={plan} value={plan}>
                              {plan}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm text-slate-400">{tool.requiredPlan}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          updateTool(
                            tool,
                            { isFeatured: !tool.isFeatured },
                            tool.isFeatured ? "Tool unfeatured" : "Tool featured"
                          )
                        }
                        disabled={tool.isDeleted}
                        className={`rounded-lg p-1.5 transition disabled:cursor-not-allowed disabled:opacity-30 ${
                          tool.isFeatured ? "text-amber-300 hover:bg-amber-500/10" : "text-slate-500 hover:bg-slate-800"
                        }`}
                        title={tool.isFeatured ? "Unfeature tool" : "Feature tool"}
                      >
                        <Star className="h-4 w-4" fill={tool.isFeatured ? "currentColor" : "none"} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          tool.isDeleted
                            ? "bg-red-500/15 text-red-300"
                            : tool.isActive
                              ? "bg-green-500/15 text-green-300"
                              : "bg-slate-600/30 text-slate-300"
                        }`}
                      >
                        {tool.isDeleted ? "Deleted" : tool.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => resetForm(tool)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-amber-300"
                          title="Edit tool"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {!tool.isDeleted && (
                          <button
                            onClick={() =>
                              updateTool(
                                tool,
                                { isActive: !tool.isActive },
                                tool.isActive ? "Tool disabled" : "Tool enabled"
                              )
                            }
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
                            title={tool.isActive ? "Disable tool" : "Enable tool"}
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        )}
                        {!tool.isDeleted ? (
                          <button
                            onClick={() => deleteTool(tool)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-red-300"
                            title="Soft delete tool"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => restoreTool(tool)}
                            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-green-300"
                            title="Restore tool"
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
        <Modal title={editingTool ? "Edit Tool" : "Add Tool"} onClose={() => setShowModal(false)} maxWidth="max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm text-slate-300">
              Title
              <input
                type="text"
                value={formData.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setFormData({
                    ...formData,
                    title,
                    slug: editingTool || formData.slug ? formData.slug : slugify(title),
                  });
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Slug
              <input
                type="text"
                value={formData.slug}
                onChange={(event) => setFormData({ ...formData, slug: slugify(event.target.value) })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300 sm:col-span-2">
              Description
              <textarea
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                rows={3}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Category
              <select
                value={formData.category}
                onChange={(event) => setFormData({ ...formData, category: event.target.value as Tool["category"] })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Icon
              <input
                type="text"
                value={formData.icon}
                onChange={(event) => setFormData({ ...formData, icon: event.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Price
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(event) => setFormData({ ...formData, price: Number(event.target.value) })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Required Plan
              <select
                value={formData.requiredPlan}
                onChange={(event) => setFormData({ ...formData, requiredPlan: event.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              >
                {REQUIRED_PLANS.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-sm text-slate-300">
              Sort Order
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(event) => setFormData({ ...formData, sortOrder: Number(event.target.value) })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </label>

            <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(event) => setFormData({ ...formData, isActive: event.target.checked })}
                  className="rounded"
                />
                Active
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(event) => setFormData({ ...formData, isFeatured: event.target.checked })}
                  className="rounded"
                />
                Featured
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={saveTool}
              disabled={saving}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Tool
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

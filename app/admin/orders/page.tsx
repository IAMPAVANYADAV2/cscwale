"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { CheckCircle2, CreditCard, Loader, MessageCircle, Phone, RotateCcw, Save, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { showToast } from "../components/ui/Toast";
import type { Order, TableColumn } from "@/types/admin";

const STATUS_OPTIONS = ["pending", "processing", "completed", "cancelled"] as const;
const PAYMENT_OPTIONS = ["unpaid", "pending", "paid", "failed", "refunded"] as const;

function normalizeOrder(raw: Partial<Order> & { id: string }): Order {
  const status = raw.status === "processing" || raw.status === "completed" || raw.status === "cancelled"
    ? raw.status
    : "pending";

  return {
    id: raw.id,
    orderId: raw.orderId || raw.id,
    userId: raw.userId || "",
    userName: raw.userName || "",
    userEmail: raw.userEmail || "",
    serviceId: raw.serviceId || raw.orderType || "service",
    orderType: raw.orderType || "service",
    serviceName: raw.serviceName || "Order Request",
    amount: typeof raw.amount === "number" ? raw.amount : 0,
    status,
    paymentStatus: raw.paymentStatus || "unpaid",
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt,
    isDeleted: raw.isDeleted === true,
    deletedAt: raw.deletedAt,
    deletedBy: raw.deletedBy,
    description: raw.description,
    adminNotes: raw.adminNotes,
    tier: raw.tier,
  };
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getDialablePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function getOrderWhatsAppLink(order: Order) {
  const phone = getDialablePhone(order.userId);
  const text = encodeURIComponent(
    `Namaste ${order.userName || "Sir/Madam"}, CSC Wale se bol rahe hain. Aapka ${order.serviceName} order/request follow-up ke liye message kar rahe hain.`
  );
  return phone ? `https://wa.me/${phone}?text=${text}` : "";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [showDeleted, setShowDeleted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDraft, setStatusDraft] = useState<Order["status"]>("pending");
  const [paymentDraft, setPaymentDraft] = useState("unpaid");
  const [notesDraft, setNotesDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (showDeleted) params.set("includeDeleted", "true");

      const res = await adminFetch(`/api/admin/orders-management?${params.toString()}`);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load orders");
      }

      setOrders(((data?.data || []) as Array<Partial<Order> & { id: string }>).map(normalizeOrder));
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [showDeleted]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const displayedOrders = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (paymentFilter !== "all" && order.paymentStatus !== paymentFilter) return false;
      return true;
    });
  }, [orders, paymentFilter, statusFilter]);

  const revenueSummary = useMemo(() => {
    const paidCompleted = orders.filter(
      (order) => !order.isDeleted && order.status === "completed" && order.paymentStatus === "paid"
    );
    return {
      revenue: paidCompleted.reduce((sum, order) => sum + order.amount, 0),
      count: paidCompleted.length,
      average: paidCompleted.length
        ? paidCompleted.reduce((sum, order) => sum + order.amount, 0) / paidCompleted.length
        : 0,
    };
  }, [orders]);

  const openOrder = (order: Order) => {
    setSelectedOrder(order);
    setStatusDraft(order.status);
    setPaymentDraft(order.paymentStatus);
    setNotesDraft(order.adminNotes || "");
  };

  const updateOrder = async () => {
    if (!selectedOrder) return;
    setSaving(true);
    try {
      const res = await adminFetch(`/api/admin/orders-management/${selectedOrder.id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: statusDraft,
          paymentStatus: paymentDraft,
          adminNotes: notesDraft,
        }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update order");
      }

      const updated = normalizeOrder(data.data);
      setOrders((items) => items.map((item) => (item.id === updated.id ? updated : item)));
      setSelectedOrder(updated);
      showToast("success", "Order updated");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await adminFetch(`/api/admin/orders-management/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete order");
      }

      showToast("success", "Order moved to trash");
      setDeleteTarget(null);
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to delete order");
    } finally {
      setDeleting(false);
    }
  };

  const restoreOrder = async (order: Order) => {
    setSaving(true);
    try {
      const res = await adminFetch(`/api/admin/orders-management/${order.id}/restore`, { method: "POST" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to restore order");
      }

      showToast("success", "Order restored");
      setSelectedOrder(null);
      loadOrders();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to restore order");
    } finally {
      setSaving(false);
    }
  };

  const columns: TableColumn<Order>[] = [
    {
      key: "orderId",
      label: "Order",
      render: (order) => (
        <div>
          <p className="text-white text-sm font-medium">{order.orderId}</p>
          <p className="text-slate-400 text-xs">{order.serviceId}</p>
        </div>
      ),
    },
    {
      key: "userName",
      label: "User",
      render: (order) => (
        <div>
          <p className="text-white text-sm">{order.userName || order.userId || "Unknown"}</p>
          <p className="text-slate-400 text-xs">{order.userEmail || order.userId}</p>
        </div>
      ),
    },
    {
      key: "serviceName",
      label: "Service",
      render: (order) => <span className="text-slate-300 text-sm">{order.serviceName}</span>,
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (order) => <span className="text-emerald-300 text-sm font-medium">{formatMoney(order.amount)}</span>,
    },
    { key: "status", label: "Status", render: (order) => <StatusBadge status={order.status} /> },
    { key: "paymentStatus", label: "Payment", render: (order) => <StatusBadge status={order.paymentStatus} /> },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      render: (order) => <span className="text-slate-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <p className="text-slate-400 text-xs mb-1">Completed Paid Revenue</p>
          <p className="text-white text-2xl font-bold">{formatMoney(revenueSummary.revenue)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <p className="text-slate-400 text-xs mb-1">Paid Completed Orders</p>
          <p className="text-white text-2xl font-bold">{revenueSummary.count}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <p className="text-slate-400 text-xs mb-1">Average Paid Order</p>
          <p className="text-white text-2xl font-bold">{formatMoney(revenueSummary.average)}</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={displayedOrders}
        loading={loading}
        searchable
        searchPlaceholder="Search by order, user, email, or service..."
        searchFields={["orderId", "userId", "userName", "userEmail", "serviceName", "serviceId"]}
        onRowClick={openOrder}
        emptyMessage="No orders found"
        actions={
          <div className="flex gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="all">All status</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={paymentFilter}
              onChange={(event) => setPaymentFilter(event.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <option value="all">All payments</option>
              {PAYMENT_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <button
              onClick={() => setShowDeleted((value) => !value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition border ${
                showDeleted
                  ? "bg-red-600/20 text-red-300 border-red-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
              }`}
            >
              Deleted
            </button>
          </div>
        }
      />

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title="Order Management"
        subtitle={selectedOrder ? `ID: ${selectedOrder.orderId}` : ""}
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-xs mb-1">User</p>
                <p className="text-white text-sm">{selectedOrder.userName || selectedOrder.userId || "Unknown"}</p>
                <p className="text-slate-400 text-xs">{selectedOrder.userEmail || selectedOrder.userId}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Service</p>
                <p className="text-white text-sm">{selectedOrder.serviceName}</p>
                <p className="text-slate-400 text-xs">{selectedOrder.serviceId}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Amount</p>
                <p className="text-emerald-300 text-sm font-semibold">{formatMoney(selectedOrder.amount)}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Created</p>
                <p className="text-white text-sm">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {selectedOrder.description && (
              <div>
                <p className="text-slate-400 text-xs mb-1">Description</p>
                <p className="text-white text-sm bg-slate-700/50 p-3 rounded-lg">{selectedOrder.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-slate-300 text-sm font-medium mb-2 block">Order Status</span>
                <select
                  value={statusDraft}
                  onChange={(event) => setStatusDraft(event.target.value as Order["status"])}
                  disabled={selectedOrder.isDeleted}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-slate-300 text-sm font-medium mb-2 block">Payment Status</span>
                <select
                  value={paymentDraft}
                  onChange={(event) => setPaymentDraft(event.target.value)}
                  disabled={selectedOrder.isDeleted}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
                >
                  {PAYMENT_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Admin Notes</label>
              <textarea
                value={notesDraft}
                onChange={(event) => setNotesDraft(event.target.value)}
                disabled={selectedOrder.isDeleted}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
                rows={3}
                placeholder="Add notes..."
              />
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              {selectedOrder.updatedAt && <p>Updated: {new Date(selectedOrder.updatedAt).toLocaleString()}</p>}
              {selectedOrder.deletedAt && <p>Deleted: {new Date(selectedOrder.deletedAt).toLocaleString()}</p>}
            </div>

            <div className="flex gap-2 flex-wrap">
              {!selectedOrder.isDeleted && (
                <>
                  {getDialablePhone(selectedOrder.userId) && (
                    <>
                      <a
                        href={getOrderWhatsAppLink(selectedOrder)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-green-600/15 hover:bg-green-600/25 text-green-300 rounded-lg transition text-sm flex items-center gap-2"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:+${getDialablePhone(selectedOrder.userId)}`}
                        className="px-4 py-2 bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 rounded-lg transition text-sm flex items-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Call
                      </a>
                    </>
                  )}
                  <button
                    onClick={updateOrder}
                    disabled={saving}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg transition text-sm flex items-center gap-2"
                  >
                    {saving ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setStatusDraft("completed");
                      setPaymentDraft("paid");
                    }}
                    className="px-4 py-2 bg-green-600/15 hover:bg-green-600/25 text-green-300 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Complete Paid
                  </button>
                  <button
                    onClick={() => setPaymentDraft("paid")}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    Mark Paid
                  </button>
                  <button
                    onClick={() => setDeleteTarget(selectedOrder)}
                    className="px-4 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-600/30 text-red-400 rounded-lg transition text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </>
              )}

              {selectedOrder.isDeleted && (
                <button
                  onClick={() => restoreOrder(selectedOrder)}
                  disabled={saving}
                  className="px-4 py-2 bg-green-600/15 hover:bg-green-600/25 text-green-300 rounded-lg transition text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {saving ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <RotateCcw className="w-3.5 h-3.5" />}
                  Restore
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        message="This will move the order to trash. You can restore it later."
        confirmLabel="Move to Trash"
        loading={deleting}
      />
    </div>
  );
}

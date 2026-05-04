"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Loader, MailOpen, Mail, MessageCircle, Phone, RotateCcw, Save, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import DataTable from "../components/ui/DataTable";
import StatusBadge from "../components/ui/StatusBadge";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { showToast } from "../components/ui/Toast";
import type { Message, TableColumn } from "@/types/admin";

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Replied", value: "replied" },
  { label: "Deleted", value: "deleted" },
];

type LeadStatus = "unread" | "read" | "replied";

function getDialablePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function getWhatsAppLink(message: Message) {
  const phone = getDialablePhone(message.phone);
  const text = encodeURIComponent(
    `Namaste ${message.name || "Sir/Madam"}, CSC Wale se bol rahe hain. Aapne ${message.product || message.subject || "service"} ke liye inquiry ki thi.`
  );
  return phone ? `https://wa.me/${phone}?text=${text}` : "";
}

function normalizeMessage(raw: Partial<Message> & { id: string }): Message {
  return {
    id: raw.id,
    name: raw.name || raw.userName || raw.contactName || "",
    email: raw.email || raw.userEmail || raw.contactEmail || "",
    phone: raw.phone || raw.userPhone || raw.contactPhone || "",
    subject: raw.subject || "Contact Form Submission",
    message: raw.message || "",
    status: raw.status || "unread",
    adminNote: raw.adminNote || "",
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt,
    isDeleted: raw.isDeleted === true,
    deletedAt: raw.deletedAt,
    deletedBy: raw.deletedBy,
    plan: raw.plan,
    product: raw.product,
    leadType: raw.leadType,
    address: raw.address,
    sourceCollection: raw.sourceCollection,
    sourceId: raw.sourceId,
  };
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Message | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (filter === "deleted") {
        params.set("includeDeleted", "true");
      } else if (filter !== "all") {
        params.set("status", filter);
      }

      const res = await adminFetch(`/api/admin/messages-management?${params.toString()}`);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to load messages");
      }

      setMessages(((data?.data || []) as Array<Partial<Message> & { id: string }>).map(normalizeMessage));
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const updateMessage = async (messageId: string, updates: { status?: LeadStatus; adminNote?: string }) => {
    setSaving(true);
    try {
      const res = await adminFetch(`/api/admin/messages-management/${messageId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update message");
      }

      const updated = normalizeMessage(data.data);
      setMessages((items) => items.map((item) => (item.id === messageId ? updated : item)));
      setSelected(updated);
      setAdminNote(updated.adminNote || "");
      showToast("success", "Lead updated");
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to update message");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await adminFetch(`/api/admin/messages-management/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to delete message");
      }
      showToast("success", "Lead moved to trash");
      setDeleteTarget(null);
      setSelected(null);
      loadMessages();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to delete message");
    } finally {
      setDeleting(false);
    }
  };

  const handleRestore = async (message: Message) => {
    setSaving(true);
    try {
      const res = await adminFetch(`/api/admin/messages-management/${message.id}/restore`, { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to restore message");
      }
      showToast("success", "Lead restored");
      setSelected(null);
      loadMessages();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Failed to restore message");
    } finally {
      setSaving(false);
    }
  };

  const openMessage = (message: Message) => {
    setSelected(message);
    setAdminNote(message.adminNote || "");
  };

  const columns: TableColumn<Message>[] = [
    {
      key: "name",
      label: "Lead",
      render: (m) => (
        <div>
          <p className="text-white text-sm font-medium">{m.name || "Unknown"}</p>
          <p className="text-slate-400 text-xs">{m.email || "No email"}</p>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      render: (m) => <span className="text-purple-300 text-xs font-mono">{m.phone || "N/A"}</span>,
    },
    {
      key: "subject",
      label: "Subject",
      render: (m) => (
        <div>
          <p className="text-slate-300 text-sm">{m.product || m.subject}</p>
          {m.plan && <p className="text-slate-500 text-xs uppercase">{m.plan}</p>}
        </div>
      ),
    },
    { key: "status", label: "Status", render: (m) => <StatusBadge status={m.status} /> },
    {
      key: "createdAt",
      label: "Received",
      sortable: true,
      render: (m) => <span className="text-slate-400 text-xs">{new Date(m.createdAt).toLocaleString()}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((item) => (
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

      <DataTable
        columns={columns}
        data={messages}
        loading={loading}
        searchable
        searchPlaceholder="Search by name, email, or phone..."
        searchFields={["name", "email", "phone"]}
        onRowClick={openMessage}
        emptyMessage="No contact messages found"
      />

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.subject || "Contact Message"}
        subtitle={selected ? `Lead ID: ${selected.id.substring(0, 12)}...` : ""}
      >
        {selected && (
          <div className="space-y-5">
            <div className="bg-slate-700/40 rounded-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-slate-400 text-xs">Name</p>
                  <p className="text-white text-sm">{selected.name || "Unknown"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Email</p>
                  <p className="text-white text-sm break-all">{selected.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Phone</p>
                  <p className="text-purple-300 text-sm font-mono">{selected.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Status</p>
                  <StatusBadge status={selected.status} />
                </div>
                {selected.plan && (
                  <div>
                    <p className="text-slate-400 text-xs">Plan</p>
                    <p className="text-white text-sm uppercase">{selected.plan}</p>
                  </div>
                )}
                {selected.product && (
                  <div>
                    <p className="text-slate-400 text-xs">Product</p>
                    <p className="text-white text-sm">{selected.product}</p>
                  </div>
                )}
              </div>
            </div>

            {selected.address && (
              <div>
                <p className="text-slate-400 text-xs mb-1.5">Address / CSC Center</p>
                <div className="bg-slate-700/40 rounded-lg p-3 border border-slate-600/30">
                  <p className="text-slate-200 text-sm whitespace-pre-wrap">{selected.address}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-slate-400 text-xs mb-1.5">Message</p>
              <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
                <p className="text-slate-200 text-sm whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>

            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Admin Note</label>
              <textarea
                value={adminNote}
                onChange={(event) => setAdminNote(event.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                rows={4}
                placeholder="Add an internal note..."
              />
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p>Received: {new Date(selected.createdAt).toLocaleString()}</p>
              {selected.updatedAt && <p>Updated: {new Date(selected.updatedAt).toLocaleString()}</p>}
              {selected.deletedAt && <p>Deleted: {new Date(selected.deletedAt).toLocaleString()}</p>}
            </div>

            <div className="flex gap-2 flex-wrap">
              {selected.phone && (
                <>
                  <a
                    href={getWhatsAppLink(selected)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => updateMessage(selected.id, { status: "read" })}
                    className="px-3 py-2 bg-green-600/15 hover:bg-green-600/25 text-green-300 rounded-lg text-xs transition flex items-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:+${getDialablePhone(selected.phone)}`}
                    onClick={() => updateMessage(selected.id, { status: "read" })}
                    className="px-3 py-2 bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 rounded-lg text-xs transition flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selected.phone);
                      showToast("success", "Phone number copied");
                    }}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs transition flex items-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy Number
                  </button>
                </>
              )}
              {!selected.isDeleted && (
                <>
                  <button
                    onClick={() => updateMessage(selected.id, { status: selected.status === "unread" ? "read" : "unread" })}
                    disabled={saving}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-xs transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {selected.status === "unread" ? <MailOpen className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                    Mark {selected.status === "unread" ? "Read" : "Unread"}
                  </button>
                  <button
                    onClick={() => updateMessage(selected.id, { status: "replied" })}
                    disabled={saving}
                    className="px-3 py-2 bg-green-600/15 hover:bg-green-600/25 text-green-300 rounded-lg text-xs transition disabled:opacity-50"
                  >
                    Mark Replied
                  </button>
                  <button
                    onClick={() => updateMessage(selected.id, { adminNote })}
                    disabled={saving}
                    className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    Save Note
                  </button>
                  <button
                    onClick={() => setDeleteTarget(selected)}
                    className="px-3 py-2 bg-red-900/20 hover:bg-red-900/40 border border-red-600/30 text-red-400 rounded-lg text-xs transition flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </>
              )}

              {selected.isDeleted && (
                <button
                  onClick={() => handleRestore(selected)}
                  disabled={saving}
                  className="px-3 py-2 bg-green-600/15 hover:bg-green-600/25 text-green-300 rounded-lg text-xs transition flex items-center gap-2 disabled:opacity-50"
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
        title="Delete Lead"
        message="This will move the contact message to trash. You can restore it later."
        confirmLabel="Move to Trash"
        loading={deleting}
      />
    </div>
  );
}

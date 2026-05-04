"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users, ShoppingBag, MessageSquare, TrendingUp,
  Package, Scissors, Wrench, AlertCircle, BarChart3, Clock,
} from "lucide-react";
import { adminFetch } from "@/lib/hooks/useAdminFetch";
import StatsCard from "../components/ui/StatsCard";
import StatusBadge from "../components/ui/StatusBadge";
import type { DashboardStats, Order, Message } from "@/types/admin";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, dataRes] = await Promise.all([
        adminFetch("/api/admin/stats"),
        adminFetch("/api/admin/dashboard-data"),
      ]);

      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s.data);
      }

      if (dataRes.ok) {
        const d = await dataRes.json();
        const orders: Order[] = d.data?.orders || [];
        setRecentOrders(orders.slice(0, 5));

        const msgs: Message[] = (d.data?.messages || []).map((m: Record<string, unknown>) => ({
          id: m.id as string,
          name: (m.name as string) || (m.userName as string) || "",
          email: (m.email as string) || (m.userEmail as string) || "",
          phone: (m.phone as string) || (m.userPhone as string) || "",
          userId: (m.userId as string) || "",
          userEmail: (m.userEmail as string) || "",
          type: ((m.type as Message["type"]) || "contact"),
          subject: m.subject as string,
          message: (m.message as string) || "",
          status: ((m.status as Message["status"]) || "unread"),
          createdAt: m.createdAt as string,
        }));
        const contacts: Message[] = (d.data?.contacts || []).map((c: Record<string, unknown>) => ({
          id: c.id as string,
          name: (c.name as string) || "",
          email: (c.email as string) || "",
          phone: (c.phone as string) || "",
          userId: (c.phone as string) || (c.name as string) || "Contact",
          userEmail: (c.email as string) || "",
          type: "contact-form" as const,
          subject: (c.subject as string) || "Contact Form",
          message: (c.message as string) || "",
          status: ((c.status as Message["status"]) || "unread"),
          createdAt: c.createdAt as string,
          contactName: (c.name as string) || "",
          contactPhone: (c.phone as string) || "",
        }));
        const leads: Message[] = (d.data?.leads || []).map((lead: Record<string, unknown>) => ({
          id: lead.id as string,
          name: (lead.name as string) || "",
          email: (lead.email as string) || "",
          phone: (lead.phone as string) || "",
          userId: (lead.phone as string) || (lead.name as string) || "Lead",
          userEmail: (lead.email as string) || "",
          type: "contact-form" as const,
          subject: (lead.subject as string) || `${(lead.product as string) || "Software"} Inquiry`,
          message: (lead.message as string) || "",
          status: ((lead.status as Message["status"]) || "unread"),
          createdAt: lead.createdAt as string,
          plan: (lead.plan as string) || "",
          product: (lead.product as string) || "",
          address: (lead.address as string) || "",
        }));
        const all = [...msgs, ...contacts, ...leads].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentMessages(all.slice(0, 5));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const orderTypeBadge: Record<string, { color: string; label: string }> = {
    pvc: { color: "from-pink-500 to-rose-600", label: "PVC Card" },
    cropper: { color: "from-blue-500 to-cyan-600", label: "Cropper" },
    service: { color: "from-green-500 to-emerald-600", label: "Service" },
    contact: { color: "from-orange-500 to-amber-600", label: "Contact" },
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Orders" value={stats?.totalOrders ?? 0} subtitle={`${stats?.pendingOrders ?? 0} pending`} icon={<ShoppingBag className="w-5 h-5" />} color="blue" />
        <StatsCard label="Completed" value={stats?.approvedOrders ?? 0} subtitle="Finished orders" icon={<TrendingUp className="w-5 h-5" />} color="green" />
        <StatsCard label="Cancelled" value={stats?.rejectedOrders ?? 0} subtitle="Cancelled requests" icon={<AlertCircle className="w-5 h-5" />} color="red" />
        <StatsCard label="Messages" value={stats?.totalMessages ?? 0} subtitle={`${stats?.unreadMessages ?? 0} unread`} icon={<MessageSquare className="w-5 h-5" />} color="purple" />
        <StatsCard label="PVC Cards" value={stats?.pvcOrders ?? 0} subtitle="Order requests" icon={<Package className="w-5 h-5" />} color="pink" />
        <StatsCard label="Cropper" value={stats?.cropperOrders ?? 0} subtitle="Tool requests" icon={<Scissors className="w-5 h-5" />} color="cyan" />
        <StatsCard label="Services" value={stats?.serviceRequests ?? 0} subtitle="Pending approval" icon={<Wrench className="w-5 h-5" />} color="amber" />
        <StatsCard label="Users" value={stats?.totalUsers ?? 0} subtitle={`${stats?.activePlans ?? 0} active plans`} icon={<Users className="w-5 h-5" />} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-xl border border-slate-700 p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-purple-400" />
            Recent Orders
          </h3>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-slate-400 text-sm py-4 text-center">No orders yet</p>
            ) : (
              recentOrders.map((order) => {
                const badge = orderTypeBadge[order.orderType] || orderTypeBadge.service;
                return (
                  <div key={order.id} className="bg-slate-700/40 p-3 rounded-lg hover:bg-slate-700/60 transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-medium text-sm">{order.serviceName}</p>
                        <p className="text-slate-400 text-xs">{order.userEmail}</p>
                      </div>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-medium bg-gradient-to-r ${badge.color} text-white px-2 py-0.5 rounded`}>
                        {badge.label}
                      </span>
                      {order.tier && (
                        <span className="text-xs text-purple-300 font-semibold uppercase">{order.tier}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Stats + Recent Messages */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4.5 h-4.5 text-blue-400" />
              Quick Stats
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Completion Rate</span>
                <span className="text-blue-400 font-bold">
                  {stats && stats.totalOrders > 0
                    ? Math.round((stats.approvedOrders / stats.totalOrders) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pending Review</span>
                <span className="text-yellow-400 font-bold">{stats?.pendingOrders ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unread Messages</span>
                <span className="text-purple-400 font-bold">{stats?.unreadMessages ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Leads</span>
                <span className="text-teal-400 font-bold">{stats?.totalLeads ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Plans</span>
                <span className="text-emerald-400 font-bold">{stats?.activePlans ?? 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-5">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-purple-400" />
              Recent Messages
            </h3>
            <div className="space-y-2.5">
              {recentMessages.length === 0 ? (
                <p className="text-slate-400 text-sm py-4 text-center">No messages</p>
              ) : (
                recentMessages.map((msg) => (
                  <div key={msg.id} className="bg-slate-700/40 p-2.5 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="text-white text-xs font-medium truncate flex-1">
                        {msg.subject || msg.type}
                      </p>
                      <StatusBadge status={msg.status} className="text-[10px] px-1.5 py-0" />
                    </div>
                    <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

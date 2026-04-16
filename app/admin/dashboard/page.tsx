"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/useAdminAuth";
import {
  LogOut,
  Loader,
  ShoppingBag,
  MessageSquare,
  Settings,
  Home,
  BarChart3,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Search,
  X,
  Check,
  Clock,
  AlertTriangle,
  FileText,
  Activity,
  Zap,
} from "lucide-react";

interface Order {
  id: string;
  userId: string;
  userEmail: string;
  orderType: "pvc" | "cropper" | "service" | "contact";
  serviceName: string;
  tier?: "trial" | "lite" | "pro" | "free";
  status: "pending" | "processing" | "approved" | "rejected" | "declined" | "completed";
  amount?: number;
  description?: string;
  createdAt: any;
  updatedAt: any;
  adminNotes?: string;
}

interface Message {
  id: string;
  userId: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  type: "contact" | "service-request" | "custom-message" | "contact-form";
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  adminReply?: string;
  createdAt: any;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  approvedOrders: number;
  rejectedOrders: number;
  totalMessages: number;
  unreadMessages: number;
  totalUsers: number;
  pvcOrders: number;
  cropperOrders: number;
  serviceRequests: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { admin, loading: authLoading, isAuthenticated, logout: adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "pvc" | "cropper" | "service" | "messages" | "logs" | "settings"
  >("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    rejectedOrders: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalUsers: 0,
    pvcOrders: 0,
    cropperOrders: 0,
    serviceRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [actionNotes, setActionNotes] = useState("");
  const [operatingAction, setOperatingAction] = useState<string>("");

  // Check admin access
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

  // Load all data
  useEffect(() => {
    if (isAuthenticated && admin) {
      loadAllData();
    }
  }, [isAuthenticated, admin]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch data from admin API using token
      const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
      
      if (!token) {
        setError("Admin token not found");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/admin/dashboard-data", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch dashboard data");
      }

      const result = await response.json();
      const { data } = result;

      // Process orders data
      const ordersData: Order[] = data.orders || [];
      let pvcCount = 0, cropperCount = 0, serviceCount = 0;
      let pendingCount = 0, approvedCount = 0, rejectedCount = 0;

      ordersData.forEach((order) => {
        if (order.orderType === "pvc") pvcCount++;
        else if (order.orderType === "cropper") cropperCount++;
        else if (order.orderType === "service") serviceCount++;

        if (order.status === "pending") pendingCount++;
        else if (order.status === "approved") approvedCount++;
        else if (order.status === "rejected") rejectedCount++;
      });

      setOrders(ordersData);

      // Process messages data
      const messagesData: Message[] = (data.messages || []).map((msg: any) => ({
        id: msg.id,
        userId: msg.userId,
        userEmail: msg.userEmail,
        type: msg.type || "contact",
        subject: msg.subject,
        message: msg.message,
        status: msg.status || "unread",
        adminReply: msg.adminReply,
        createdAt: msg.createdAt,
      }));

      // Add contacts as messages (from contact form submissions)
      const contactsData: Message[] = (data.contacts || []).map((contact: any) => ({
        id: contact.id,
        userId: contact.phone || contact.name || "Contact Form",
        userEmail: contact.email || "",
        userName: contact.name || "Unknown",
        userPhone: contact.phone || "",
        type: "contact-form",
        subject: contact.subject || "Contact Form Submission",
        message: contact.message || "",
        status: contact.status || "unread",
        adminReply: undefined,
        createdAt: contact.createdAt,
        contactName: contact.name || "",
        contactPhone: contact.phone || "",
        contactEmail: contact.email || "",
      }));

      // Merge messages and contacts, sorted by date
      const allMessages = [...messagesData, ...contactsData].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setMessages(allMessages);

      // Count unread messages including contacts
      let unreadCount = 0;
      allMessages.forEach((msg) => {
        if (msg.status === "unread") unreadCount++;
      });

      // Update stats
      setStats({
        totalOrders: ordersData.length,
        pendingOrders: pendingCount,
        approvedOrders: approvedCount,
        rejectedOrders: rejectedCount,
        totalMessages: allMessages.length,
        unreadMessages: unreadCount,
        totalUsers: data.totalUsers || 0,
        pvcOrders: pvcCount,
        cropperOrders: cropperCount,
        serviceRequests: serviceCount,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderAction = async (orderId: string, action: string) => {
    try {
      setOperatingAction(action);

      // Get admin token
      const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
      
      if (!token) {
        setError("Admin token not found");
        setOperatingAction("");
        return;
      }

      const response = await fetch("/api/admin/orders-management", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
          action,
          notes: actionNotes,
        }),
      });

      if (response.ok) {
        setSelectedOrder(null);
        setActionNotes("");
        await loadAllData();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update order");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating order");
    } finally {
      setOperatingAction("");
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      if (!confirm("Are you sure you want to delete this message? This cannot be undone.")) {
        return;
      }

      setOperatingAction("deleting");

      // Get admin token
      const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
      
      if (!token) {
        setError("Admin token not found");
        setOperatingAction("");
        return;
      }

      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSelectedMessage(null);
        setOperatingAction("");
        await loadAllData();
        alert("Message deleted successfully!");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete message");
        setOperatingAction("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting message");
      setOperatingAction("");
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-300 border-green-600";
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-600";
      case "declined":
        return "bg-blue-500/20 text-blue-300 border-blue-600";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-600";
      case "processing":
        return "bg-purple-500/20 text-purple-300 border-purple-600";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-600";
    }
  };

  const getOrderTypeBadge = (type: string) => {
    const badges: any = {
      pvc: { color: "from-pink-500 to-rose-600", label: "🎫 PVC Card" },
      cropper: { color: "from-blue-500 to-cyan-600", label: "✂️ Cropper Tool" },
      service: { color: "from-green-500 to-emerald-600", label: "🛠️ Service Request" },
      contact: { color: "from-orange-500 to-amber-600", label: "📧 Contact" },
    };
    return badges[type] || badges.service;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.userEmail || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.serviceName || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Admin Control Center</h1>
              <p className="text-xs text-purple-300">Complete System Management</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadAllData}
              className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 rounded-lg p-4 border border-blue-600/30">
            <p className="text-blue-300 text-sm mb-1">📦 Total Orders</p>
            <h3 className="text-3xl font-bold text-white">{stats.totalOrders}</h3>
            <p className="text-xs text-blue-400 mt-2">⏳ {stats.pendingOrders} Pending</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/10 rounded-lg p-4 border border-green-600/30">
            <p className="text-green-300 text-sm mb-1">✅ Approved Orders</p>
            <h3 className="text-3xl font-bold text-white">{stats.approvedOrders}</h3>
            <p className="text-xs text-green-400 mt-2">Recent approvals</p>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-red-800/10 rounded-lg p-4 border border-red-600/30">
            <p className="text-red-300 text-sm mb-1">❌ Rejected</p>
            <h3 className="text-3xl font-bold text-white">{stats.rejectedOrders}</h3>
            <p className="text-xs text-red-400 mt-2">Needs review</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 rounded-lg p-4 border border-purple-600/30">
            <p className="text-purple-300 text-sm mb-1">💬 Messages</p>
            <h3 className="text-3xl font-bold text-white">{stats.totalMessages}</h3>
            <p className="text-xs text-purple-400 mt-2">{stats.unreadMessages} Unread</p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/10 rounded-lg p-4 border border-pink-600/30">
            <p className="text-pink-300 text-sm mb-1">🎫 PVC Cards</p>
            <h3 className="text-3xl font-bold text-white">{stats.pvcOrders}</h3>
            <p className="text-xs text-pink-400 mt-2">Order requests</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 rounded-lg p-4 border border-cyan-600/30">
            <p className="text-cyan-300 text-sm mb-1">✂️ Cropper Tool</p>
            <h3 className="text-3xl font-bold text-white">{stats.cropperOrders}</h3>
            <p className="text-xs text-cyan-400 mt-2">Tool requests</p>
          </div>

          <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/10 rounded-lg p-4 border border-amber-600/30">
            <p className="text-amber-300 text-sm mb-1">🛠️ Services</p>
            <h3 className="text-3xl font-bold text-white">{stats.serviceRequests}</h3>
            <p className="text-xs text-amber-400 mt-2">Pending approval</p>
          </div>

          <div className="bg-gradient-to-br from-teal-900/30 to-teal-800/10 rounded-lg p-4 border border-teal-600/30">
            <p className="text-teal-300 text-sm mb-1">👥 Users</p>
            <h3 className="text-3xl font-bold text-white">{stats.totalUsers}</h3>
            <p className="text-xs text-teal-400 mt-2">Registered</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700 overflow-x-auto pb-0">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "orders", label: "All Orders", icon: ShoppingBag },
            { id: "pvc", label: "PVC Cards", icon: ShoppingBag },
            { id: "cropper", label: "Cropper", icon: Zap },
            { id: "service", label: "Services", icon: FileText },
            { id: "messages", label: "Messages", icon: MessageSquare },
            { id: "logs", label: "Logs", icon: Activity },
            { id: "settings", label: "Settings", icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === id
                  ? "border-purple-500 text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                Recent Orders
              </h3>
              <div className="space-y-3">
                {filteredOrders.slice(0, 5).map((order) => {
                  const badge = getOrderTypeBadge(order.orderType);
                  return (
                    <div
                      key={order.id}
                      className="bg-slate-700 p-3 rounded-lg cursor-pointer hover:bg-slate-600 transition"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-medium">{order.serviceName}</p>
                          <p className="text-slate-400 text-xs">{order.userEmail}</p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(order.status)}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-medium bg-gradient-to-r ${badge.color} text-white px-2 py-1 rounded`}>
                          {badge.label}
                        </span>
                        {order.tier && (
                          <span className="text-xs text-purple-300 font-semibold">{order.tier.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Quick Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Success Rate:</span>
                  <span className="text-blue-400 font-bold">
                    {stats.totalOrders > 0
                      ? Math.round((stats.approvedOrders / stats.totalOrders) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Pending Review:</span>
                  <span className="text-yellow-400 font-bold">{stats.pendingOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Rejected Orders:</span>
                  <span className="text-red-400 font-bold">{stats.rejectedOrders}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by email or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-700 border-b border-slate-600">
                    <th className="px-6 py-3 text-left text-slate-300">Type</th>
                    <th className="px-6 py-3 text-left text-slate-300">User</th>
                    <th className="px-6 py-3 text-left text-slate-300">Service</th>
                    <th className="px-6 py-3 text-left text-slate-300">Status</th>
                    <th className="px-6 py-3 text-left text-slate-300">Tier</th>
                    <th className="px-6 py-3 text-left text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const badge = getOrderTypeBadge(order.orderType);
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-slate-700 hover:bg-slate-700/50 cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-6 py-3">
                          <span className={`text-xs px-2 py-1 rounded font-medium bg-gradient-to-r ${badge.color} text-white`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-white text-sm">{order.userEmail}</td>
                        <td className="px-6 py-3 text-slate-300">{order.serviceName}</td>
                        <td className="px-6 py-3">
                          <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-slate-300">
                          {order.tier ? order.tier.toUpperCase() : "-"}
                        </td>
                        <td className="px-6 py-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(order);
                            }}
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
                          >
                            Manage
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

        {/* PVC Tab */}
        {activeTab === "pvc" && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700 border-b border-slate-600">
                  <th className="px-6 py-3 text-left text-slate-300">User</th>
                  <th className="px-6 py-3 text-left text-slate-300">Card Details</th>
                  <th className="px-6 py-3 text-left text-slate-300">Status</th>
                  <th className="px-6 py-3 text-left text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((o) => o.orderType === "pvc")
                  .map((order) => (
                    <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-white">{order.userEmail}</td>
                      <td className="px-6 py-3 text-slate-300">{order.serviceName}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cropper Tab */}
        {activeTab === "cropper" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders
              .filter((o) => o.orderType === "cropper")
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-800 rounded-lg p-4 border border-slate-700 cursor-pointer hover:border-cyan-500 transition"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-bold">{order.serviceName}</p>
                      <p className="text-slate-400 text-sm">{order.userEmail}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  {order.tier && (
                    <div className="mb-3">
                      <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded border border-cyan-600">
                        Tier: {order.tier.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {order.description && (
                    <p className="text-slate-300 text-sm mb-3">{order.description}</p>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                    }}
                    className="w-full px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded text-sm transition"
                  >
                    Manage
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Service Tab */}
        {activeTab === "service" && (
          <div className="space-y-3">
            {orders
              .filter((o) => o.orderType === "service")
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-800 rounded-lg p-4 border border-slate-700 cursor-pointer hover:border-amber-500 transition"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-white font-bold">{order.serviceName}</p>
                      <p className="text-slate-400 text-sm mb-2">{order.userEmail}</p>
                      {order.description && (
                        <p className="text-slate-300 text-sm italic">{order.description}</p>
                      )}
                    </div>
                    <span className={`text-xs px-3 py-1 rounded border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                onClick={() => setSelectedMessage(msg)}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 cursor-pointer hover:border-purple-500 hover:bg-slate-700 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-sm">{msg.subject || msg.type}</h4>
                    <p className="text-xs text-slate-400 mt-1">{msg.userName || msg.userEmail || "Unknown"}</p>
                    {msg.userPhone && <p className="text-xs text-purple-400 font-mono">{msg.userPhone}</p>}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded flex-shrink-0 ${
                      msg.status === "unread" ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
                <p className="text-slate-300 text-xs mb-3 line-clamp-3">{msg.message}</p>
                <p className="text-xs text-slate-500">ID: {msg.id.substring(0, 10)}...</p>
              </div>
            ))}
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === "logs" && (
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h3 className="text-white font-bold mb-4">Admin Activity Logs</h3>
            <p className="text-slate-400">Audit trail coming soon...</p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
              <h3 className="text-white font-bold">Admin Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Email Notifications</p>
                    <p className="text-slate-400 text-sm">Get notified for new orders</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Management Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center">
              <h2 className="text-white font-bold text-lg">Order Management</h2>
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setActionNotes("");
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">Order ID</p>
                  <p className="text-white font-mono">{selectedOrder.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">User Email</p>
                    <p className="text-white">{selectedOrder.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Order Type</p>
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded font-medium bg-gradient-to-r ${
                        getOrderTypeBadge(selectedOrder.orderType).color
                      } text-white`}
                    >
                      {getOrderTypeBadge(selectedOrder.orderType).label}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">Service Name</p>
                  <p className="text-white">{selectedOrder.serviceName}</p>
                </div>

                {selectedOrder.description && (
                  <div>
                    <p className="text-slate-400 text-sm">Description</p>
                    <p className="text-white bg-slate-700 p-3 rounded">{selectedOrder.description}</p>
                  </div>
                )}

                {selectedOrder.tier && (
                  <div>
                    <p className="text-slate-400 text-sm">Tier</p>
                    <span className="inline-block text-sm px-3 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-600">
                      {selectedOrder.tier.toUpperCase()}
                    </span>
                  </div>
                )}

                <div>
                  <p className="text-slate-400 text-sm">Current Status</p>
                  <span className={`inline-block text-xs px-3 py-1 rounded border ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Admin Notes</label>
                <textarea
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="Add notes about this order..."
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => handleOrderAction(selectedOrder.id, "approved")}
                  disabled={operatingAction === "approved"}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded transition flex items-center justify-center gap-2"
                >
                  {operatingAction === "approved" ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Approve
                </button>

                <button
                  onClick={() => handleOrderAction(selectedOrder.id, "rejected")}
                  disabled={operatingAction === "rejected"}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded transition flex items-center justify-center gap-2"
                >
                  {operatingAction === "rejected" ? <Loader className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                  Reject
                </button>

                <button
                  onClick={() => handleOrderAction(selectedOrder.id, "declined")}
                  disabled={operatingAction === "declined"}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded transition flex items-center justify-center gap-2"
                >
                  {operatingAction === "declined" ? <Loader className="w-4 h-4 animate-spin" /> : <AlertCircle className="w-4 h-4" />}
                  Decline
                </button>

                <button
                  onClick={() => handleOrderAction(selectedOrder.id, "processing")}
                  disabled={operatingAction === "processing"}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded transition flex items-center justify-center gap-2"
                >
                  {operatingAction === "processing" ? <Loader className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                  Process
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setActionNotes("");
                }}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-lg max-w-2xl w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-white font-bold text-lg">{selectedMessage.subject || selectedMessage.type}</h2>
                <p className="text-slate-400 text-xs mt-1">ID: {selectedMessage.id}</p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Details */}
              {selectedMessage.type === "contact-form" && (
                <div className="bg-slate-700 rounded-lg p-4 border border-slate-600 space-y-3">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs">Name</p>
                      <p className="text-white font-medium">{selectedMessage.contactName || "Unknown"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Email</p>
                      <p className="text-white font-mono text-sm">{selectedMessage.contactEmail || "N/A"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400 text-xs">Phone Number</p>
                      <p className="text-purple-400 font-mono font-bold text-base">{selectedMessage.contactPhone || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Status</p>
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded font-medium ${
                          selectedMessage.status === "unread"
                            ? "bg-blue-500/20 text-blue-300"
                            : selectedMessage.status === "replied"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-gray-500/20 text-gray-300"
                        }`}
                      >
                        {selectedMessage.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div className="space-y-3">
                <h4 className="text-white font-bold">Message Content</h4>
                <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <p className="text-slate-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Message Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 text-xs">Received</p>
                  <p className="text-white text-sm">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Message Type</p>
                  <p className="text-white text-sm capitalize">{selectedMessage.type}</p>
                </div>
              </div>

              {/* Copy Phone Button */}
              {selectedMessage.contactPhone && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedMessage.contactPhone || "");
                    alert("Phone number copied!");
                  }}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition font-medium"
                >
                  📋 Copy Phone Number
                </button>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                disabled={operatingAction === "deleting"}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded transition font-medium flex items-center justify-center gap-2"
              >
                {operatingAction === "deleting" ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    Delete Message
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedMessage(null)}
                disabled={operatingAction === "deleting"}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

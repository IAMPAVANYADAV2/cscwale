"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import {
  LogOut,
  Loader,
  ShoppingBag,
  MessageSquare,
  Settings,
  Home,
  User,
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs, Timestamp } from "firebase/firestore";

interface Order {
  orderId: string;
  serviceName: string;
  status: "pending" | "processing" | "completed" | "rejected";
  amount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface CustomMessage {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "urgent";
  createdAt: Timestamp;
  isRead: boolean;
}

interface SubscriptionTier {
  name: string;
  icon: string;
  benefits: string[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, userProfile, logout, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customMessages, setCustomMessages] = useState<CustomMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "messages" | "settings">(
    "overview"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch user's orders and messages
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch orders
        const ordersRef = collection(db, "orders");
        const ordersQuery = query(ordersRef, where("userId", "==", user.uid));
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          orderId: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(ordersData);

        // Fetch custom messages for this user
        const messagesRef = collection(db, "customMessages");
        const messagesQuery = query(messagesRef, where("userId", "==", user.uid));
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesData = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CustomMessage[];
        setCustomMessages(messagesData);

        setError("");
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load your data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      setError("Failed to logout");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!user || !userProfile) {
    return null; // Redirect handled by useEffect
  }

  const subscriptionTiers: Record<string, SubscriptionTier> = {
    free: {
      name: "Free",
      icon: "🆓",
      benefits: ["Basic features", "Limited requests"],
    },
    lite: {
      name: "Lite",
      icon: "⭐",
      benefits: ["5 concurrent requests", "Priority support"],
    },
    trail: {
      name: "Trail",
      icon: "✨",
      benefits: ["Trial period access", "All features"],
    },
    pro: {
      name: "Professional",
      icon: "👑",
      benefits: ["Unlimited requests", "24/7 support", "Custom integrations"],
    },
  };

  const currentTier = subscriptionTiers[userProfile.subscriptionTier || "free"] || subscriptionTiers.free;
  const unreadMessages = customMessages.filter((msg) => !msg.isRead).length;
  const completedOrders = orders.filter((order) => order.status === "completed").length;
  const pendingOrders = orders.filter((order) => order.status === "pending" || order.status === "processing")
    .length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">CSC Wale Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">{userProfile.displayName || user.email}</p>
                <p className="text-xs text-indigo-600 font-semibold">{currentTier.name} Plan</p>
              </div>
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-200"
                />
              )}
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {(["overview", "orders", "messages", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-4 font-medium transition capitalize ${
                activeTab === tab
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Subscription Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-lg p-6">
                <div className="text-3xl mb-2">{currentTier.icon}</div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-2xl font-bold text-indigo-600">{currentTier.name}</p>
                <button className="mt-4 text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700">
                  Upgrade
                </button>
              </div>

              {/* Total Orders */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                <ShoppingBag className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                <p className="text-xs text-blue-600 mt-2">
                  {pendingOrders} pending • {completedOrders} completed
                </p>
              </div>

              {/* Messages */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-sm text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-purple-600">{customMessages.length}</p>
                {unreadMessages > 0 && (
                  <p className="text-xs text-purple-600 mt-2 font-semibold">{unreadMessages} unread</p>
                )}
              </div>

              {/* Account Status */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <p className="text-xs text-green-600 mt-2">✓ Verified</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-600">No orders yet. Start by placing an order!</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.orderId} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-800">{order.serviceName}</p>
                        <p className="text-xs text-gray-600">Order ID: {order.orderId}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{order.amount}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Your Orders</h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No orders found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Service</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.orderId} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-3">{order.serviceName}</td>
                        <td className="py-3 px-3 text-gray-600 text-xs">{order.orderId}</td>
                        <td className="py-3 px-3 font-medium">₹{order.amount}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-600 text-xs">
                          {order.createdAt.toDate().toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Custom Messages</h2>
              {unreadMessages > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {unreadMessages} unread
                </span>
              )}
            </div>

            {customMessages.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No messages yet</p>
              </div>
            ) : (
              customMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    message.type === "success"
                      ? "bg-green-50 border-green-400 text-green-800"
                      : message.type === "warning"
                      ? "bg-yellow-50 border-yellow-400 text-yellow-800"
                      : message.type === "urgent"
                      ? "bg-red-50 border-red-400 text-red-800"
                      : "bg-blue-50 border-blue-400 text-blue-800"
                  } ${!message.isRead ? "font-semibold" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{message.title}</h3>
                      <p className="text-sm mt-1">{message.message}</p>
                      <p className="text-xs mt-2 opacity-75">
                        {message.createdAt.toDate().toLocaleString()}
                      </p>
                    </div>
                    {!message.isRead && <div className="w-2 h-2 bg-current rounded-full mt-1" />}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-800">{userProfile.displayName || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Account Created</label>
                  <p className="text-gray-800">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(subscriptionTiers).map(([tier, tierData]) => (
                  <div
                    key={tier}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      (userProfile.subscriptionTier || "free") === tier
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <p className="text-2xl mb-2">{tierData.icon}</p>
                    <p className="font-bold text-gray-800">{tierData.name}</p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      {tierData.benefits.slice(0, 2).map((benefit, i) => (
                        <li key={i}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 font-medium">
                Upgrade Plan
              </button>
            </div>

            {/* Preferences Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preferences
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700">Email notifications for new orders</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-gray-700">Custom message notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-gray-700">Marketing emails</span>
                </label>
              </div>
              <button className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-medium">
                Save Preferences
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-lg border border-red-200 p-6">
              <h2 className="text-lg font-bold text-red-800 mb-4">Danger Zone</h2>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

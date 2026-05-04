import type { ReactNode } from "react";

export interface SoftDeletable {
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string | null;
}

export type UserRole = "user" | "admin";
export type AdminResource = "users" | "plans" | "tools" | "orders" | "messages" | "leads";
export type PlanName = "Trial" | "Light" | "Pro";
export type PlanKey = "trial" | "light" | "pro";

export interface Plan extends SoftDeletable {
  id: string;
  name: PlanName;
  price: number;
  durationDays: number;
  features: string[];
  toolAccess: string[];
  maxUsage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  slug?: PlanKey;
  description?: string;
  pricing?: number;
  pricingLabel?: string;
  pricingNote?: string;
  maxTools?: number;
  sortOrder?: number;
}

export interface Tool extends SoftDeletable {
  id: string;
  title: string;
  name?: string;
  slug: string;
  description: string;
  category: "cropper" | "pvc" | "automation" | "certificate" | "general";
  icon: string;
  price: number;
  requiredPlan: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface User extends SoftDeletable {
  id: string;
  uid: string;
  email: string;
  displayName?: string;
  phone?: string;
  phoneNumber?: string;
  photoURL?: string;
  role: UserRole;
  subscriptionTier?: string;
  planId?: string | null;
  planName?: PlanName | PlanKey | string | null;
  planAssignedAt?: string | null;
  planExpiryDate?: string | null;
  effectivePlan?: PlanKey;
  isActive?: boolean;
  isBlocked?: boolean;
  blockedAt?: string | null;
  blockedBy?: string | null;
  blockedReason?: string | null;
  createdAt: string;
  lastLogin?: string;
  updatedAt?: string;
}

export type AdminUser = User;

export interface Order extends SoftDeletable {
  id: string;
  orderId: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceId: string;
  orderType: "pvc" | "cropper" | "service" | "contact";
  serviceName: string;
  tier?: "trial" | "lite" | "pro" | "free";
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus: string;
  amount: number;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string;
  adminId?: string;
}

export interface Message extends SoftDeletable {
  id: string;
  sourceCollection?: "contacts" | "leads" | "messages";
  sourceId?: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived" | "spam" | "follow-up";
  adminNote?: string;
  updatedAt?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  type?: "contact" | "service-request" | "custom-message" | "contact-form";
  adminReply?: string;
  createdAt: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  plan?: string;
  product?: string;
  leadType?: string;
  address?: string;
}

export interface Lead extends SoftDeletable {
  id: string;
  name: string;
  phone: string;
  plan: string;
  leadType: string;
  status: "new" | "contacted" | "converted" | "lost";
  notes?: string;
  createdAt: string;
}

export interface AdminLog {
  id: string;
  adminId: string;
  adminEmail?: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "RESTORE" | "BLOCK" | "UNBLOCK" | "LOGIN" | "LOGOUT";
  resource: AdminResource;
  resourceId: string;
  resourceName?: string;
  details?: string;
  notes?: string;
  orderId?: string;
  messageId?: string;
  userId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
  totalPlans: number;
  activePlans: number;
  totalTools: number;
  activeTools: number;
  totalOrders: number;
  pendingOrders: number;
  approvedOrders: number;
  rejectedOrders: number;
  totalMessages: number;
  unreadMessages: number;
  totalLeads: number;
  pvcOrders: number;
  cropperOrders: number;
  serviceRequests: number;
  totalRevenue?: number;
  monthlyRevenue?: number;
  lastUpdated: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface CreatePlanInput {
  name: PlanName;
  price: number;
  durationDays: number;
  features: string[];
  toolAccess: string[];
  maxUsage: number;
  isActive?: boolean;
  slug?: PlanKey;
  description?: string;
  pricing?: number;
  pricingLabel?: string;
  pricingNote?: string;
  maxTools?: number;
  sortOrder?: number;
}

export type UpdatePlanInput = Partial<CreatePlanInput>;

export interface CreateToolInput {
  title: string;
  name?: string;
  slug: string;
  description: string;
  category: "cropper" | "pvc" | "automation" | "certificate" | "general";
  icon: string;
  price: number;
  requiredPlan: string;
  isActive?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
}

export type UpdateToolInput = Partial<CreateToolInput>;

export interface UpdateUserInput {
  displayName?: string;
  photoURL?: string;
  planId?: string | null;
  subscriptionTier?: string;
  planName?: string | null;
  planAssignedAt?: string | null;
  planExpiryDate?: string | null;
  isBlocked?: boolean;
  blockedReason?: string;
}

export interface UpdateOrderInput {
  status?: "pending" | "processing" | "completed" | "cancelled";
  paymentStatus?: string;
  adminNotes?: string;
  amount?: number;
}

export interface UpdateMessageInput {
  status?: "unread" | "read" | "replied" | "archived" | "spam" | "follow-up";
  adminNote?: string;
  adminReply?: string;
}

export interface BlockUserInput {
  reason: string;
  permanent?: boolean;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  includeDeleted?: boolean;
}

export interface QueryFilters {
  status?: string;
  planId?: string;
  category?: string;
  userId?: string;
  isBlocked?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  resource?: AdminLog["resource"];
  dateFrom?: string;
  dateTo?: string;
}

export interface TableColumn<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

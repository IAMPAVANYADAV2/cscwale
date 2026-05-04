import { getDb } from "./firebaseAdmin";
import type { Query } from "firebase-admin/firestore";
import {
  now,
  generateId,
  getChanges,
  sanitize,
} from "./adminUtils";
import {
  createPlanExpiry,
  DEFAULT_PLANS,
  getEffectivePlanKey,
  normalizePlanKey,
} from "./planAccess";
import type {
  Plan,
  Tool,
  AdminUser,
  Order,
  Message,
  AdminLog,
  CreatePlanInput,
  UpdatePlanInput,
  CreateToolInput,
  UpdateToolInput,
  UpdateUserInput,
  UpdateOrderInput,
  UpdateMessageInput,
  PaginationOptions,
  QueryFilters,
} from "@/types/admin";

const db = getDb();

type FirestoreDateValue =
  | string
  | Date
  | { toDate: () => Date }
  | { seconds?: number; _seconds?: number }
  | null
  | undefined;

function normalizeDate(value: FirestoreDateValue): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if ("toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  const timestampRecord = value as { seconds?: number; _seconds?: number };
  const seconds = timestampRecord.seconds ?? timestampRecord._seconds;
  if (typeof seconds === "number") return new Date(seconds * 1000).toISOString();

  return null;
}

function normalizeUser(docId: string, data: Record<string, unknown>): AdminUser {
  const planId =
    typeof data.planId === "string"
      ? data.planId
      : typeof data.subscriptionTier === "string"
        ? data.subscriptionTier
        : null;

  return {
    ...data,
    id: docId,
    uid: typeof data.uid === "string" ? data.uid : docId,
    email: typeof data.email === "string" ? data.email : "",
    displayName: typeof data.displayName === "string" ? data.displayName : "",
    phone: typeof data.phone === "string" ? data.phone : undefined,
    phoneNumber: typeof data.phoneNumber === "string" ? data.phoneNumber : undefined,
    role: data.role === "admin" ? "admin" : "user",
    planId,
    planName:
      typeof data.planName === "string"
        ? data.planName
        : typeof data.subscriptionTier === "string"
          ? data.subscriptionTier
          : planId,
    subscriptionTier:
      typeof data.subscriptionTier === "string" ? data.subscriptionTier : planId ?? undefined,
    planAssignedAt: normalizeDate(data.planAssignedAt as FirestoreDateValue),
    planExpiryDate: normalizeDate(data.planExpiryDate as FirestoreDateValue),
    effectivePlan: getEffectivePlanKey({
      planId,
      planName:
        typeof data.planName === "string"
          ? data.planName
          : typeof data.subscriptionTier === "string"
            ? data.subscriptionTier
            : planId,
      subscriptionTier: typeof data.subscriptionTier === "string" ? data.subscriptionTier : undefined,
      planExpiryDate: normalizeDate(data.planExpiryDate as FirestoreDateValue),
    }),
    isActive: typeof data.isActive === "boolean" ? data.isActive : !data.isBlocked,
    isBlocked: data.isBlocked === true,
    isDeleted: data.isDeleted === true,
    createdAt: normalizeDate(data.createdAt as FirestoreDateValue) ?? "",
    lastLogin: normalizeDate(data.lastLogin as FirestoreDateValue) ?? undefined,
    updatedAt: normalizeDate(data.updatedAt as FirestoreDateValue) ?? undefined,
    blockedAt: normalizeDate(data.blockedAt as FirestoreDateValue),
    deletedAt: normalizeDate(data.deletedAt as FirestoreDateValue),
    deletedBy: typeof data.deletedBy === "string" ? data.deletedBy : null,
  } as AdminUser;
}

function normalizePlan(docId: string, data: Record<string, unknown>): Plan {
  const key = normalizePlanKey(
    typeof data.slug === "string"
      ? data.slug
      : typeof data.name === "string"
        ? data.name
        : undefined
  );
  const defaults = DEFAULT_PLANS[key];
  const price =
    typeof data.price === "number"
      ? data.price
      : typeof data.pricing === "number"
        ? data.pricing
        : defaults.price;
  const maxUsage =
    typeof data.maxUsage === "number"
      ? data.maxUsage
      : typeof data.maxTools === "number"
        ? data.maxTools
        : defaults.maxUsage;

  return {
    ...defaults,
    ...data,
    id: docId,
    name: defaults.name,
    slug: key,
    price,
    pricing: price,
    durationDays:
      typeof data.durationDays === "number" ? data.durationDays : defaults.durationDays,
    features: Array.isArray(data.features) ? (data.features as string[]) : defaults.features,
    toolAccess: Array.isArray(data.toolAccess)
      ? (data.toolAccess as string[])
      : defaults.toolAccess,
    maxUsage,
    maxTools: typeof data.maxTools === "number" ? data.maxTools : maxUsage,
    isActive: typeof data.isActive === "boolean" ? data.isActive : true,
    isDeleted: data.isDeleted === true,
    createdAt: normalizeDate(data.createdAt as FirestoreDateValue) ?? now(),
    updatedAt: normalizeDate(data.updatedAt as FirestoreDateValue) ?? now(),
    deletedAt: normalizeDate(data.deletedAt as FirestoreDateValue),
    deletedBy: typeof data.deletedBy === "string" ? data.deletedBy : null,
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : defaults.sortOrder,
  } as Plan;
}

function sanitizePlanInput(data: CreatePlanInput | UpdatePlanInput) {
  const key = normalizePlanKey(data.name || data.slug);
  return sanitize({
    ...data,
    name: DEFAULT_PLANS[key].name,
    slug: key,
    price: data.price ?? data.pricing,
    pricing: data.price ?? data.pricing,
    durationDays: data.durationDays,
    features: data.features,
    toolAccess: data.toolAccess,
    maxUsage: data.maxUsage ?? data.maxTools,
    maxTools: data.maxUsage ?? data.maxTools,
    isActive: data.isActive,
    sortOrder: data.sortOrder ?? DEFAULT_PLANS[key].sortOrder,
  });
}

function normalizeTool(docId: string, data: Record<string, unknown>): Tool {
  const title =
    typeof data.title === "string"
      ? data.title
      : typeof data.name === "string"
        ? data.name
        : "";

  return {
    ...data,
    id: docId,
    title,
    name: title,
    slug: typeof data.slug === "string" ? data.slug : "",
    description: typeof data.description === "string" ? data.description : "",
    category:
      data.category === "cropper" ||
      data.category === "pvc" ||
      data.category === "automation" ||
      data.category === "certificate" ||
      data.category === "general"
        ? data.category
        : "general",
    icon: typeof data.icon === "string" ? data.icon : "wrench",
    price: typeof data.price === "number" ? data.price : 0,
    requiredPlan: typeof data.requiredPlan === "string" ? data.requiredPlan : "trial",
    isActive: typeof data.isActive === "boolean" ? data.isActive : true,
    isFeatured: typeof data.isFeatured === "boolean" ? data.isFeatured : false,
    sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
    isDeleted: data.isDeleted === true,
    deletedAt: normalizeDate(data.deletedAt as FirestoreDateValue),
    deletedBy: typeof data.deletedBy === "string" ? data.deletedBy : null,
    createdAt: normalizeDate(data.createdAt as FirestoreDateValue) ?? now(),
    updatedAt: normalizeDate(data.updatedAt as FirestoreDateValue) ?? now(),
  } as Tool;
}

function sanitizeToolInput(data: CreateToolInput | UpdateToolInput) {
  const title = data.title || data.name;

  return sanitize({
    ...data,
    title,
    name: title,
    price: data.price === undefined ? undefined : Number(data.price),
    isActive: data.isActive,
    isFeatured: data.isFeatured,
    sortOrder: data.sortOrder === undefined ? undefined : Number(data.sortOrder),
  });
}

function normalizeMessage(
  docId: string,
  data: Record<string, unknown>,
  sourceCollection: "contacts" | "leads" | "messages" = "contacts"
): Message {
  const name =
    typeof data.name === "string"
      ? data.name
      : typeof data.userName === "string"
        ? data.userName
        : typeof data.contactName === "string"
          ? data.contactName
          : "";
  const email =
    typeof data.email === "string"
      ? data.email
      : typeof data.userEmail === "string"
        ? data.userEmail
        : typeof data.contactEmail === "string"
          ? data.contactEmail
          : "";
  const phone =
    typeof data.phone === "string"
      ? data.phone
      : typeof data.userPhone === "string"
        ? data.userPhone
        : typeof data.contactPhone === "string"
          ? data.contactPhone
          : "";
  const status =
    data.status === "read" || data.status === "replied" ? data.status : "unread";
  const product = typeof data.product === "string" ? data.product : "";
  const plan = typeof data.plan === "string" ? data.plan : "";
  const subject =
    typeof data.subject === "string"
      ? data.subject
      : product
        ? `${product} Inquiry`
        : "Contact Form Submission";
  const message =
    typeof data.message === "string"
      ? data.message
      : product
        ? `${name || "Lead"} requested follow-up for ${product}.`
        : "";

  return {
    ...data,
    id: `${sourceCollection}:${docId}`,
    sourceCollection,
    sourceId: docId,
    name,
    email,
    phone,
    userEmail: email,
    userName: name,
    userPhone: phone,
    contactEmail: email,
    contactName: name,
    contactPhone: phone,
    type: "contact-form",
    subject,
    message,
    status,
    adminNote: typeof data.adminNote === "string" ? data.adminNote : "",
    plan,
    product,
    leadType: typeof data.leadType === "string" ? data.leadType : undefined,
    address: typeof data.address === "string" ? data.address : undefined,
    isDeleted: data.isDeleted === true,
    createdAt: normalizeDate(data.createdAt as FirestoreDateValue) ?? now(),
    updatedAt: normalizeDate(data.updatedAt as FirestoreDateValue) ?? undefined,
    deletedAt: normalizeDate(data.deletedAt as FirestoreDateValue),
    deletedBy: typeof data.deletedBy === "string" ? data.deletedBy : null,
  } as Message;
}

function splitMessageId(id: string): { collection: "contacts" | "leads" | "messages"; id: string } {
  const [collection, ...rest] = id.split(":");
  if (
    (collection === "contacts" || collection === "leads" || collection === "messages") &&
    rest.length > 0
  ) {
    return { collection, id: rest.join(":") };
  }

  return { collection: "contacts", id };
}

function toPersistedMessage(message: Message) {
  const copy = { ...message } as Record<string, unknown>;
  delete copy.id;
  delete copy.sourceId;
  delete copy.sourceCollection;
  return copy;
}

function normalizeOrderStatus(value: unknown): Order["status"] {
  if (value === "processing" || value === "completed" || value === "cancelled") return value;
  if (value === "approved") return "completed";
  if (value === "rejected" || value === "declined") return "cancelled";
  return "pending";
}

function normalizeOrder(docId: string, data: Record<string, unknown>): Order {
  const userName =
    typeof data.userName === "string"
      ? data.userName
      : typeof data.name === "string"
        ? data.name
        : "";
  const userEmail =
    typeof data.userEmail === "string"
      ? data.userEmail
      : typeof data.email === "string"
        ? data.email
        : "";
  const serviceName =
    typeof data.serviceName === "string"
      ? data.serviceName
      : typeof data.comboDetails === "string"
        ? data.comboDetails
        : typeof data.product === "string"
          ? data.product
          : "Order Request";
  const orderType =
    data.orderType === "pvc" ||
    data.orderType === "cropper" ||
    data.orderType === "service" ||
    data.orderType === "contact"
      ? data.orderType
      : "service";

  return {
    ...data,
    id: docId,
    orderId: typeof data.orderId === "string" ? data.orderId : docId,
    userId:
      typeof data.userId === "string"
        ? data.userId
        : typeof data.phone === "string"
          ? data.phone
          : "",
    userName,
    userEmail,
    serviceId:
      typeof data.serviceId === "string"
        ? data.serviceId
        : typeof data.orderType === "string"
          ? data.orderType
          : "service",
    orderType,
    serviceName,
    status: normalizeOrderStatus(data.status),
    paymentStatus: typeof data.paymentStatus === "string" ? data.paymentStatus : "unpaid",
    amount: typeof data.amount === "number" ? data.amount : 0,
    description:
      typeof data.description === "string"
        ? data.description
        : typeof data.notes === "string"
          ? data.notes
          : undefined,
    isDeleted: data.isDeleted === true,
    deletedAt: normalizeDate(data.deletedAt as FirestoreDateValue),
    deletedBy: typeof data.deletedBy === "string" ? data.deletedBy : null,
    createdAt: normalizeDate(data.createdAt as FirestoreDateValue) ?? now(),
    updatedAt: normalizeDate(data.updatedAt as FirestoreDateValue) ?? undefined,
  } as Order;
}

function toFirestoreData<T extends object>(data: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * PLANS SERVICE
 */
export const plansService = {
  async list(filters?: QueryFilters, options?: PaginationOptions) {
    let query: Query = db.collection("plans");

    // Sorting
    const sortBy = options?.sortBy || "sortOrder";
    const sortOrder = options?.sortOrder || "asc";
    query = query.orderBy(sortBy, sortOrder);

    // Pagination
    const limit = options?.limit || 50;
    const page = options?.page || 1;
    const offset = (page - 1) * limit;

    const snapshot = await query.limit(Math.max(limit * page, 100)).get();
    const plans = snapshot.docs
      .map((doc) => normalizePlan(doc.id, doc.data()))
      .filter((plan) => {
        if (filters?.isDeleted === true && !plan.isDeleted) return false;
        if (filters?.isDeleted !== true && plan.isDeleted) return false;
        if (filters?.isActive !== undefined && plan.isActive !== filters.isActive) return false;
        return true;
      });
    return plans.slice(offset, offset + limit);
  },

  async getById(id: string) {
    const doc = await db.collection("plans").doc(id).get();
    if (!doc.exists) return null;
    return normalizePlan(doc.id, doc.data() || {});
  },

  async getByKey(keyOrId: string) {
    const direct = await this.getById(keyOrId);
    if (direct) return direct;

    const key = normalizePlanKey(keyOrId);
    const bySlug = await db.collection("plans").where("slug", "==", key).limit(1).get();
    if (!bySlug.empty) {
      const doc = bySlug.docs[0]!;
      return normalizePlan(doc.id, doc.data());
    }

    const byName = await db.collection("plans").where("name", "==", DEFAULT_PLANS[key].name).limit(1).get();
    if (!byName.empty) {
      const doc = byName.docs[0]!;
      return normalizePlan(doc.id, doc.data());
    }

    return {
      id: key,
      ...DEFAULT_PLANS[key],
      createdAt: now(),
      updatedAt: now(),
    } as Plan;
  },

  async create(data: CreatePlanInput, adminId: string) {
    const id = generateId();
    const cleanData = sanitizePlanInput(data) as CreatePlanInput;
    const plan: Plan = {
      id,
      ...cleanData,
      name: cleanData.name,
      price: cleanData.price,
      durationDays: cleanData.durationDays,
      features: cleanData.features || [],
      toolAccess: cleanData.toolAccess || [],
      maxUsage: cleanData.maxUsage,
      isActive: cleanData.isActive ?? true,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      sortOrder: cleanData.sortOrder ?? 0,
      createdAt: now(),
      updatedAt: now(),
    };

    await db.collection("plans").doc(id).set(plan);
    await logAction(adminId, "CREATE", "plans", id, plan.name, { created: plan });

    return plan;
  },

  async update(id: string, data: UpdatePlanInput, adminId: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Plan not found");

    const updated = {
      ...existing,
      ...sanitizePlanInput(data),
      updatedAt: now(),
    };

    const changes = getChanges(existing, updated);

    await db.collection("plans").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "UPDATE", "plans", id, existing.name, changes);

    return updated;
  },

  async delete(id: string, adminId: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Plan not found");

    const updated = {
      ...existing,
      isDeleted: true,
      deletedAt: now(),
      deletedBy: adminId,
      updatedAt: now(),
    };

    await db.collection("plans").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "DELETE", "plans", id, existing.name);

    return updated;
  },

  async restore(id: string, adminId: string) {
    const doc = await db.collection("plans").doc(id).get();
    if (!doc.exists) throw new Error("Plan not found");

    const plan = doc.data() as Plan;

    const updated = {
      ...plan,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      updatedAt: now(),
    };

    await db.collection("plans").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "RESTORE", "plans", id, plan.name);

    return updated;
  },
};

/**
 * TOOLS SERVICE
 */
export const toolsService = {
  async list(filters?: QueryFilters, options?: PaginationOptions) {
    let query: Query = db.collection("tools");

    const sortBy = options?.sortBy || "sortOrder";
    const sortOrder = options?.sortOrder || "asc";
    query = query.orderBy(sortBy, sortOrder);

    const limit = options?.limit || 50;
    const page = options?.page || 1;
    const offset = (page - 1) * limit;

    const snapshot = await query.limit(Math.max(limit * page, 100)).get();
    const tools = snapshot.docs
      .map((doc) => normalizeTool(doc.id, doc.data()))
      .filter((tool) => {
        if (!options?.includeDeleted && filters?.isDeleted !== true && tool.isDeleted) return false;
        if (filters?.isDeleted === true && !tool.isDeleted) return false;
        if (filters?.isActive !== undefined && tool.isActive !== filters.isActive) return false;
        if (filters?.category && tool.category !== filters.category) return false;
        return true;
      });

    return tools.slice(offset, offset + limit);
  },

  async getById(id: string) {
    const doc = await db.collection("tools").doc(id).get();
    if (!doc.exists) return null;
    return normalizeTool(doc.id, doc.data() || {});
  },

  async create(data: CreateToolInput, adminId: string) {
    const id = generateId();
    const cleanData = sanitizeToolInput(data) as CreateToolInput;
    const tool: Tool = {
      id,
      title: cleanData.title,
      name: cleanData.title,
      slug: cleanData.slug,
      description: cleanData.description,
      category: cleanData.category,
      icon: cleanData.icon,
      price: cleanData.price,
      requiredPlan: cleanData.requiredPlan,
      isActive: cleanData.isActive ?? true,
      isFeatured: cleanData.isFeatured ?? false,
      sortOrder: cleanData.sortOrder ?? 0,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      createdAt: now(),
      updatedAt: now(),
    };

    await db.collection("tools").doc(id).set(tool);
    await logAction(adminId, "CREATE", "tools", id, tool.title, { created: tool });

    return tool;
  },

  async update(id: string, data: UpdateToolInput, adminId: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Tool not found");

    const updated = {
      ...existing,
      ...sanitizeToolInput(data),
      updatedAt: now(),
    };

    const changes = getChanges(existing, updated);

    await db.collection("tools").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "UPDATE", "tools", id, existing.title, changes);

    return updated;
  },

  async delete(id: string, adminId: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Tool not found");

    const updated = {
      ...existing,
      isDeleted: true,
      deletedAt: now(),
      deletedBy: adminId,
      updatedAt: now(),
    };

    await db.collection("tools").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "DELETE", "tools", id, existing.title);

    return updated;
  },

  async restore(id: string, adminId: string) {
    const doc = await db.collection("tools").doc(id).get();
    if (!doc.exists) throw new Error("Tool not found");

    const tool = normalizeTool(doc.id, doc.data() || {});

    const updated = {
      ...tool,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      updatedAt: now(),
    };

    await db.collection("tools").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "RESTORE", "tools", id, tool.title);

    return updated;
  },
};

/**
 * USERS SERVICE
 */
export const usersService = {
  async list(filters?: QueryFilters, options?: PaginationOptions) {
    let query: Query = db.collection("users");

    const sortBy = options?.sortBy || "createdAt";
    const sortOrder = options?.sortOrder || "desc";
    query = query.orderBy(sortBy, sortOrder);

    const limit = options?.limit || 50;
    const page = options?.page || 1;
    const offset = (page - 1) * limit;

    const snapshot = await query.limit(Math.max(limit * page, 200)).get();
    const users = snapshot.docs
      .map((doc) => normalizeUser(doc.id, doc.data()))
      .filter((user) => {
        if (filters?.isDeleted === true && !user.isDeleted) return false;
        if (filters?.isDeleted !== true && user.isDeleted) return false;
        if (filters?.isBlocked !== undefined && user.isBlocked !== filters.isBlocked) return false;
        if (filters?.planId && user.planId !== filters.planId) return false;
        return true;
      });
    return users.slice(offset, offset + limit);
  },

  async getByUid(uid: string) {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) return null;
    return normalizeUser(doc.id, doc.data() as Record<string, unknown>);
  },

  async update(uid: string, data: UpdateUserInput, adminId: string) {
    const existing = await this.getByUid(uid);
    if (!existing) throw new Error("User not found");

    const updated = {
      ...existing,
      ...sanitize(data),
      updatedAt: now(),
    };

    const changes = getChanges(existing, updated);

    await db.collection("users").doc(uid).set(toFirestoreData(updated));
    await logAction(adminId, "UPDATE", "users", uid, existing.email, changes);

    return updated;
  },

  async assignPlan(uid: string, planId: string, adminId: string) {
    const existing = await this.getByUid(uid);
    if (!existing) throw new Error("User not found");

    const plan = await plansService.getByKey(planId);
    if (!plan || plan.isDeleted) throw new Error("Plan not found");
    if (!plan.isActive) throw new Error("Disabled plan cannot be assigned");

    const assignedAt = now();
    const updated = {
      ...existing,
      planId: plan.id,
      planName: plan.name,
      subscriptionTier: normalizePlanKey(plan.name),
      planAssignedAt: assignedAt,
      planExpiryDate: createPlanExpiry(plan.durationDays, new Date(assignedAt)),
      updatedAt: assignedAt,
    };

    const changes = getChanges(existing, updated);

    await db.collection("users").doc(uid).set(toFirestoreData(updated));
    await logAction(adminId, "UPDATE", "users", uid, existing.email, {
      ...changes,
      planAssignment: {
        planId: plan.id,
        planName: plan.name,
        planExpiryDate: updated.planExpiryDate,
      },
    });

    return updated;
  },

  async block(uid: string, reason: string, adminId: string) {
    const existing = await this.getByUid(uid);
    if (!existing) throw new Error("User not found");

    const updated = {
      ...existing,
      isBlocked: true,
      isActive: false,
      blockedAt: now(),
      blockedBy: adminId,
      blockedReason: reason,
      updatedAt: now(),
    };

    await db.collection("users").doc(uid).set(toFirestoreData(updated));
    await logAction(adminId, "BLOCK", "users", uid, existing.email, { reason });

    return updated;
  },

  async unblock(uid: string, adminId: string) {
    const existing = await this.getByUid(uid);
    if (!existing) throw new Error("User not found");

    const updated = {
      ...existing,
      isBlocked: false,
      isActive: true,
      blockedAt: null,
      blockedBy: null,
      blockedReason: null,
      updatedAt: now(),
    };

    await db.collection("users").doc(uid).set(toFirestoreData(updated));
    await logAction(adminId, "UNBLOCK", "users", uid, existing.email);

    return updated;
  },

  async delete(uid: string, adminId: string) {
    const existing = await this.getByUid(uid);
    if (!existing) throw new Error("User not found");

    const updated = {
      ...existing,
      isDeleted: true,
      isActive: false,
      deletedAt: now(),
      deletedBy: adminId,
      updatedAt: now(),
    };

    await db.collection("users").doc(uid).set(toFirestoreData(updated));
    await logAction(adminId, "DELETE", "users", uid, existing.email);

    return updated;
  },

  async restore(uid: string, adminId: string) {
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) throw new Error("User not found");

    const user = doc.data() as AdminUser;

    const updated = {
      ...user,
      isDeleted: false,
      isActive: true,
      deletedAt: null,
      deletedBy: null,
      updatedAt: now(),
    };

    await db.collection("users").doc(uid).set(toFirestoreData(updated));
    await logAction(adminId, "RESTORE", "users", uid, user.email);

    return updated;
  },
};

/**
 * ORDERS SERVICE
 */
export const ordersService = {
  async list(filters?: QueryFilters, options?: PaginationOptions) {
    let query: Query = db.collection("orders");

    const sortBy = options?.sortBy || "createdAt";
    const sortOrder = options?.sortOrder || "desc";
    query = query.orderBy(sortBy, sortOrder);

    const limit = options?.limit || 50;
    const page = options?.page || 1;
    const snapshot = await query.limit(Math.max(limit * page, 100)).get();
    const orders = snapshot.docs
      .map((doc) => normalizeOrder(doc.id, doc.data()))
      .filter((order) => {
        if (filters?.isDeleted === true && !order.isDeleted) return false;
        if (filters?.isDeleted !== true && order.isDeleted) return false;
        if (filters?.status && order.status !== filters.status) return false;
        if (filters?.userId && order.userId !== filters.userId) return false;
        return true;
      });
    const offset = (page - 1) * limit;
    return orders.slice(offset, offset + limit);
  },

  async getById(id: string) {
    const doc = await db.collection("orders").doc(id).get();
    if (!doc.exists) return null;
    return normalizeOrder(doc.id, doc.data() || {});
  },

  async update(id: string, data: UpdateOrderInput, adminId: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Order not found");

    const updated = {
      ...existing,
      ...sanitize(data),
      adminId,
      updatedAt: now(),
    };

    const changes = getChanges(existing, updated);

    await db.collection("orders").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "UPDATE", "orders", id, existing.serviceName, changes);

    return updated;
  },

  async delete(id: string, adminId: string) {
    const existing = await this.getById(id);
    if (!existing) throw new Error("Order not found");

    const updated = {
      ...existing,
      isDeleted: true,
      deletedAt: now(),
      deletedBy: adminId,
      updatedAt: now(),
    };

    await db.collection("orders").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "DELETE", "orders", id, existing.serviceName);

    return updated;
  },

  async restore(id: string, adminId: string) {
    const doc = await db.collection("orders").doc(id).get();
    if (!doc.exists) throw new Error("Order not found");

    const order = normalizeOrder(doc.id, doc.data() || {});

    const updated = {
      ...order,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      updatedAt: now(),
    };

    await db.collection("orders").doc(id).set(toFirestoreData(updated));
    await logAction(adminId, "RESTORE", "orders", id, order.serviceName);

    return updated;
  },
};

/**
 * MESSAGES SERVICE
 */
export const messagesService = {
  async list(filters?: QueryFilters, options?: PaginationOptions) {
    const contactQuery: Query = db.collection("contacts");
    const leadQuery: Query = db.collection("leads");

    const sortBy = options?.sortBy || "createdAt";
    const sortOrder = options?.sortOrder || "desc";

    const limit = options?.limit || 50;
    const page = options?.page || 1;
    const queryLimit = Math.max(limit * page, 100);
    const [contactsSnapshot, leadsSnapshot] = await Promise.all([
      contactQuery.orderBy(sortBy, sortOrder).limit(queryLimit).get(),
      leadQuery.orderBy(sortBy, sortOrder).limit(queryLimit).get(),
    ]);
    const messages = [
      ...contactsSnapshot.docs.map((doc) => normalizeMessage(doc.id, doc.data(), "contacts")),
      ...leadsSnapshot.docs.map((doc) => normalizeMessage(doc.id, doc.data(), "leads")),
    ]
      .filter((message) => {
        if (filters?.isDeleted === true && !message.isDeleted) return false;
        if (filters?.isDeleted !== true && message.isDeleted) return false;
        if (filters?.status && message.status !== filters.status) return false;
        return true;
      })
      .sort((a, b) => {
        const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? diff : -diff;
      });
    const offset = (page - 1) * limit;
    return messages.slice(offset, offset + limit);
  },

  async getById(id: string) {
    const parsed = splitMessageId(id);
    const doc = await db.collection(parsed.collection).doc(parsed.id).get();
    if (!doc.exists) return null;
    return normalizeMessage(doc.id, doc.data() || {}, parsed.collection);
  },

  async update(id: string, data: UpdateMessageInput, adminId: string) {
    const parsed = splitMessageId(id);
    const existing = await this.getById(id);
    if (!existing) throw new Error("Message not found");

    const updated = {
      ...existing,
      ...sanitize(data),
      updatedAt: now(),
    };

    const changes = getChanges(existing, updated);

    await db.collection(parsed.collection).doc(parsed.id).set(toPersistedMessage(updated), { merge: true });
    await logAction(adminId, "UPDATE", "messages", id, existing.email || existing.phone || existing.name, changes);

    return updated;
  },

  async delete(id: string, adminId: string) {
    const parsed = splitMessageId(id);
    const existing = await this.getById(id);
    if (!existing) throw new Error("Message not found");

    const updated = {
      ...existing,
      isDeleted: true,
      deletedAt: now(),
      deletedBy: adminId,
      updatedAt: now(),
    };

    await db.collection(parsed.collection).doc(parsed.id).set(toPersistedMessage(updated), { merge: true });
    await logAction(adminId, "DELETE", "messages", id, existing.email || existing.phone || existing.name);

    return updated;
  },

  async restore(id: string, adminId: string) {
    const parsed = splitMessageId(id);
    const doc = await db.collection(parsed.collection).doc(parsed.id).get();
    if (!doc.exists) throw new Error("Message not found");

    const message = normalizeMessage(doc.id, doc.data() || {}, parsed.collection);

    const updated = {
      ...message,
      isDeleted: false,
      deletedAt: null,
      deletedBy: null,
      updatedAt: now(),
    };

    await db.collection(parsed.collection).doc(parsed.id).set(toPersistedMessage(updated), { merge: true });
    await logAction(adminId, "RESTORE", "messages", id, message.email || message.phone || message.name);

    return updated;
  },
};

/**
 * LOGS SERVICE
 */
export async function logAction(
  adminId: string,
  action: AdminLog["action"],
  resource: AdminLog["resource"],
  resourceId: string,
  resourceName?: string,
  changes?: Record<string, unknown>
) {
  try {
    const log: AdminLog = {
      id: generateId(),
      adminId,
      action,
      resource,
      resourceId,
      resourceName,
      changes,
      timestamp: now(),
    };

    await db.collection("adminLogs").doc(log.id).set(log);
  } catch (err) {
    console.error("Failed to log action:", err);
    // Don't throw, logging failure shouldn't break the operation
  }
}

export async function getLogs(filters?: QueryFilters, options?: PaginationOptions) {
  let query: Query = db.collection("adminLogs");

  const sortBy = options?.sortBy || "timestamp";
  const sortOrder = options?.sortOrder || "desc";
  query = query.orderBy(sortBy, sortOrder);

  const limit = options?.limit || 50;
  const page = options?.page || 1;

  const snapshot = await query.limit(Math.max(limit * page, 100)).get();
  const logs = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as AdminLog)
    .filter((log) => !filters?.resource || log.resource === filters.resource);
  const offset = (page - 1) * limit;
  return logs.slice(offset, offset + limit);
}

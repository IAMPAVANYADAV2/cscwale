import { FieldValue, type Query } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebaseAdmin";
import type {
  AdminLog,
  AdminResource,
  Message,
  Order,
  Plan,
  SoftDeletable,
  Tool,
  User,
} from "@/types/admin";

export type AdminCollectionName = AdminResource;

export const adminCollections = {
  users: "users",
  plans: "plans",
  tools: "tools",
  orders: "orders",
  messages: "messages",
  leads: "leads",
} as const satisfies Record<AdminCollectionName, string>;

export type AdminEntityMap = {
  users: User;
  plans: Plan;
  tools: Tool;
  orders: Order;
  messages: Message;
};

export function withSoftDeleteCreateFields<T extends object>(data: T): T & Required<SoftDeletable> {
  return {
    ...data,
    isDeleted: false,
    deletedAt: null,
    deletedBy: null,
  };
}

export async function getAdminUser(uid: string): Promise<User | null> {
  const snapshot = await getDb().collection(adminCollections.users).doc(uid).get();
  if (!snapshot.exists) return null;
  return { id: snapshot.id, uid: snapshot.id, ...snapshot.data() } as User;
}

export async function listActiveDocuments<T>(
  collectionName: AdminCollectionName,
  options: { limit?: number; orderBy?: string; direction?: "asc" | "desc" } = {}
): Promise<T[]> {
  let query: Query = getDb()
    .collection(adminCollections[collectionName]);

  if (options.orderBy) {
    query = query.orderBy(options.orderBy, options.direction || "desc");
  }

  const snapshot = await query.limit(Math.max(options.limit || 50, 100)).get();
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }) as unknown as T & SoftDeletable)
    .filter((doc) => doc.isDeleted !== true)
    .slice(0, options.limit || 50) as T[];
}

export async function softDeleteDocument(
  collectionName: AdminCollectionName,
  documentId: string,
  adminId: string
) {
  await getDb().collection(adminCollections[collectionName]).doc(documentId).update({
    isDeleted: true,
    deletedAt: FieldValue.serverTimestamp(),
    deletedBy: adminId,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function restoreSoftDeletedDocument(
  collectionName: AdminCollectionName,
  documentId: string
) {
  await getDb().collection(adminCollections[collectionName]).doc(documentId).update({
    isDeleted: false,
    deletedAt: null,
    deletedBy: null,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function writeAdminLog(log: Omit<AdminLog, "id" | "timestamp">) {
  const ref = getDb().collection("adminLogs").doc();
  await ref.set({
    id: ref.id,
    ...log,
    timestamp: FieldValue.serverTimestamp(),
  });
}

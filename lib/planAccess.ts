import type { Plan, PlanKey, PlanName } from "@/types/admin";

export const PLAN_NAMES: PlanName[] = ["Trial", "Light", "Pro"];

export const DEFAULT_PLANS: Record<PlanKey, Omit<Plan, "id" | "createdAt" | "updatedAt">> = {
  trial: {
    name: "Trial",
    slug: "trial",
    price: 0,
    durationDays: 7,
    features: ["Limited access", "Basic PVC cropper"],
    toolAccess: ["pvc-cropper"],
    maxUsage: 10,
    maxTools: 1,
    pricing: 0,
    isActive: true,
    isDeleted: false,
    sortOrder: 1,
  },
  light: {
    name: "Light",
    slug: "light",
    price: 199,
    durationDays: 30,
    features: ["PVC cropper", "Aadhar cropper", "Higher monthly usage"],
    toolAccess: ["pvc-cropper", "aadhar-cropper"],
    maxUsage: 250,
    maxTools: 2,
    pricing: 199,
    isActive: true,
    isDeleted: false,
    sortOrder: 2,
  },
  pro: {
    name: "Pro",
    slug: "pro",
    price: 499,
    durationDays: 30,
    features: ["All tools", "Priority access", "Unlimited workflow support"],
    toolAccess: ["*"],
    maxUsage: -1,
    maxTools: -1,
    pricing: 499,
    isActive: true,
    isDeleted: false,
    sortOrder: 3,
  },
};

export function normalizePlanKey(value: string | null | undefined): PlanKey {
  const normalized = String(value || "trial").trim().toLowerCase();
  if (normalized === "lite") return "light";
  if (normalized === "light" || normalized === "pro" || normalized === "trial") return normalized;
  return "trial";
}

export function getPlanKey(plan: Pick<Plan, "name" | "slug"> | null | undefined): PlanKey {
  return normalizePlanKey(plan?.slug || plan?.name);
}

export function isPlanExpired(expiryDate: string | number | Date | null | undefined): boolean {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate).getTime();
  return Number.isFinite(expiry) && expiry < Date.now();
}

type PlanSubject = {
  planId?: string | null;
  planName?: string | null;
  subscriptionTier?: string | null;
  planExpiryDate?: string | number | Date | null;
};

export function getEffectivePlanKey(user: PlanSubject | null | undefined): PlanKey {
  if (!user || isPlanExpired(user.planExpiryDate)) return "trial";
  return normalizePlanKey(user.planName || user.planId || user.subscriptionTier);
}

export function canAccessTool(plan: Pick<Plan, "toolAccess"> | null | undefined, toolSlug: string): boolean {
  const access = plan?.toolAccess || DEFAULT_PLANS.trial.toolAccess;
  return access.includes("*") || access.includes(toolSlug);
}

export function createPlanExpiry(durationDays: number, from = new Date()): string {
  const days = Number.isFinite(durationDays) && durationDays > 0 ? durationDays : 0;
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

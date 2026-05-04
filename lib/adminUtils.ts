import { Timestamp } from "firebase-admin/firestore";
import type { ApiResponse } from "@/types/admin";

/**
 * Create a standardized success response
 */
export function successResponse<T>(
  data?: T,
  message?: string,
  statusCode = 200
): { response: ApiResponse<T>; status: number } {
  return {
    response: {
      success: true,
      data,
      message: message || "Operation successful",
      timestamp: new Date().toISOString(),
    },
    status: statusCode,
  };
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  error: string,
  statusCode = 400
): { response: ApiResponse; status: number } {
  return {
    response: {
      success: false,
      error,
      timestamp: new Date().toISOString(),
    },
    status: statusCode,
  };
}

/**
 * Validate required fields
 */
export function validateRequired(
  data: Record<string, unknown>,
  fields: string[]
): string | null {
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === "string" && !(data[field] as string).trim())) {
      return `${field} is required`;
    }
  }
  return null;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate URL slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Convert Firestore timestamp to ISO string
 */
export function toISOString(timestamp: Timestamp | string | Date | null | undefined): string {
  if (!timestamp) return new Date().toISOString();
  if (timestamp instanceof Timestamp) return timestamp.toDate().toISOString();
  if (timestamp instanceof Date) return timestamp.toISOString();
  return new Date(timestamp).toISOString();
}

/**
 * Get current timestamp
 */
export function now(): string {
  return Timestamp.now().toDate().toISOString();
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format price
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Compare objects for changes
 */
export function getChanges(oldData: object, newData: object): Record<string, unknown> {
  const oldRecord = oldData as Record<string, unknown>;
  const newRecord = newData as Record<string, unknown>;
  const changes: Record<string, unknown> = {};
  for (const key in newRecord) {
    if (oldRecord[key] !== newRecord[key]) {
      changes[key] = {
        old: oldRecord[key],
        new: newRecord[key],
      };
    }
  }
  return changes;
}

/**
 * Sanitize object by removing undefined values
 */
export function sanitize<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key of Object.keys(obj) as Array<keyof T>) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Merge objects with defaults
 */
export function withDefaults<T extends Record<string, unknown>>(
  partial: Partial<T>,
  defaults: T
): T {
  return { ...defaults, ...sanitize(partial) } as T;
}

/**
 * Get client IP address from request
 */
export function getClientIp(headers: Record<string, string>): string {
  return (
    headers["x-forwarded-for"]?.split(",")[0].trim() ||
    headers["x-real-ip"] ||
    headers["x-client-ip"] ||
    "unknown"
  );
}

/**
 * Create a filter object for Firestore queries
 */
export function buildFirestoreFilters(params: Record<string, unknown>): Record<string, unknown> {
  const filters: Record<string, unknown> = {};

  if (params.isDeleted === false) {
    filters.isDeleted = false;
  }
  if (params.isDeleted === true) {
    filters.isDeleted = true;
  }

  if (params.isActive !== undefined) {
    filters.isActive = params.isActive;
  }

  if (params.isBlocked !== undefined) {
    filters.isBlocked = params.isBlocked;
  }

  if (params.status) {
    filters.status = params.status;
  }

  if (params.category) {
    filters.category = params.category;
  }

  if (params.planId) {
    filters.planId = params.planId;
  }

  if (params.userId) {
    filters.userId = params.userId;
  }

  return filters;
}

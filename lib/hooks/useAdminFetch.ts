"use client";

import { useState, useCallback } from "react";
import { auth } from "@/lib/firebaseConfig";

async function getAdminToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return auth.currentUser?.getIdToken() ?? null;
}

interface UseAdminFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url: string, options?: RequestInit) => Promise<T | null>;
}

export function useAdminFetch<T = unknown>(): UseAdminFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (url: string, options: RequestInit = {}): Promise<T | null> => {
    const token = await getAdminToken();
    if (!token) {
      setError("Admin token not found");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed (${response.status})`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Request failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}

export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getAdminToken();
  if (!token) return Promise.reject(new Error("Admin token not found"));

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}

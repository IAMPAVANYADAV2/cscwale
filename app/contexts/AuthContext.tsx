"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { canAccessTool, DEFAULT_PLANS, getEffectivePlanKey, normalizePlanKey } from "@/lib/planAccess";
import type { Plan, PlanKey } from "@/types/admin";

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "user" | "admin";
  createdAt: number;
  lastLogin: number;
  subscriptionTier?: string;
  planId?: string | null;
  planName?: string | null;
  planExpiryDate?: string | null;
  effectivePlan?: PlanKey;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  currentPlan: Plan | null;
  canAccessTool: (toolSlug: string) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  const loadPlan = async (profile: UserProfile) => {
    const effectivePlan = getEffectivePlanKey(profile);
    const planId = effectivePlan === "trial" ? "trial" : profile.planId || profile.planName || profile.subscriptionTier;

    const fallback: Plan = {
      id: effectivePlan,
      ...DEFAULT_PLANS[effectivePlan],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!planId) {
      setCurrentPlan(fallback);
      return { ...profile, effectivePlan };
    }

    const directSnap = await getDoc(doc(db, "plans", planId));
    if (directSnap.exists()) {
      const plan = { id: directSnap.id, ...directSnap.data() } as Plan;
      if (plan.isActive && !plan.isDeleted) {
        setCurrentPlan(plan);
        return { ...profile, effectivePlan };
      }
    }

    const slug = normalizePlanKey(planId);
    const planQuery = query(collection(db, "plans"), where("slug", "==", slug));
    const planSnap = await getDocs(planQuery);
    const planDoc = planSnap.docs[0];
    if (planDoc) {
      const plan = { id: planDoc.id, ...planDoc.data() } as Plan;
      if (plan.isActive && !plan.isDeleted && effectivePlan !== "trial") {
        setCurrentPlan(plan);
        return { ...profile, effectivePlan };
      }
    }

    setCurrentPlan(fallback);
    return { ...profile, effectivePlan: "trial" as PlanKey };
  };

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);

          try {
            // Fetch user profile from Firestore
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const profileData = userDocSnap.data() as UserProfile;
              setUserProfile(await loadPlan(profileData));
            } else {
              // User document doesn't exist, create default profile
              const newProfile: UserProfile = {
                uid: currentUser.uid,
                email: currentUser.email || "",
                displayName: currentUser.displayName || "",
                photoURL: currentUser.photoURL || "",
                role: "user",
                createdAt: Date.now(),
                lastLogin: Date.now(),
                subscriptionTier: "trial",
                planName: "Trial",
              };
              setUserProfile(await loadPlan(newProfile));
            }
          } catch (firestoreError) {
            // Firestore connection failed, but we can still set basic user info
            console.warn("Firestore connection issue, using basic user profile:", firestoreError);
            const basicProfile: UserProfile = {
              uid: currentUser.uid,
              email: currentUser.email || "",
              displayName: currentUser.displayName || "",
              photoURL: currentUser.photoURL || "",
              role: "user",
              createdAt: Date.now(),
              lastLogin: Date.now(),
              subscriptionTier: "trial",
              planName: "Trial",
            };
            setUserProfile(basicProfile);
            setCurrentPlan({
              id: "trial",
              ...DEFAULT_PLANS.trial,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setCurrentPlan(null);
        }
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load user profile";
        setError(message);
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setCurrentPlan(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to logout";
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        error,
        currentPlan,
        canAccessTool: (toolSlug: string) => canAccessTool(currentPlan, toolSlug),
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

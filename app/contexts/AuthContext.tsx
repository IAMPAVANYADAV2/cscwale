"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "user" | "admin"; // user = customer, admin = service provider
  createdAt: number;
  lastLogin: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              setUserProfile(profileData);
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
              };
              setUserProfile(newProfile);
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
            };
            setUserProfile(basicProfile);
          }
        } else {
          setUser(null);
          setUserProfile(null);
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
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to logout";
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, error, logout }}>
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

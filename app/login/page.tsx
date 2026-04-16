"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInAnonymously,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "@/lib/firebaseConfig";
import { useAuth } from "@/app/contexts/AuthContext";
import { UserPlus, Loader, AlertCircle, CheckCircle, User } from "lucide-react";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Set persistence to LOCAL so user stays logged in
      await setPersistence(auth, browserLocalPersistence);

      // Sign in anonymously
      const result = await signInAnonymously(auth);
      const authUser = result.user;

      // Create or update user document in Firestore
      const userDocRef = doc(db, "users", authUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // New anonymous user - create profile
        await setDoc(userDocRef, {
          uid: authUser.uid,
          email: authUser.email || "anonymous@cscwale.local",
          displayName: "Anonymous User",
          photoURL: null,
          role: "user",
          createdAt: Timestamp.now(),
          lastLogin: Timestamp.now(),
          subscriptionTier: "free",
          orders: [],
          customMessages: [],
          isActive: true,
          isAnonymous: true,
        });
      } else {
        // Existing user - update lastLogin
        await setDoc(
          userDocRef,
          {
            lastLogin: Timestamp.now(),
          },
          { merge: true }
        );
      }

      setSuccess(true);
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Anonymous login error:", err);
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Set persistence to LOCAL
      await setPersistence(auth, browserLocalPersistence);

      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = result.user;

      // Create user document in Firestore
      const userDocRef = doc(db, "users", authUser.uid);
      await setDoc(userDocRef, {
        uid: authUser.uid,
        email: authUser.email,
        displayName: email.split("@")[0], // Use part of email as default display name
        photoURL: null,
        role: "user",
        createdAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
        subscriptionTier: "free",
        orders: [],
        customMessages: [],
        isActive: true,
        isAnonymous: false,
      });

      setSuccess(true);
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Registration error:", err);
      let message = "Registration failed";
      if (err instanceof Error) {
        if (err.message.includes("already-in-use")) {
          message = "This email is already registered";
        } else if (err.message.includes("invalid-email")) {
          message = "Invalid email address";
        } else if (err.message.includes("weak-password")) {
          message = "Password is too weak";
        } else {
          message = err.message;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">CSC Wale</h1>
            <p className="text-indigo-100">Sarkari Seva Portal</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {mode === "login" ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
                <p className="text-gray-600 mb-8">
                  Choose how you want to continue
                </p>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Login Successful!</p>
                      <p className="text-green-700 text-sm">Redirecting to dashboard...</p>
                    </div>
                  </div>
                )}

                {/* Anonymous Login Button */}
                <button
                  onClick={handleAnonymousLogin}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Continuing...</span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5" />
                      <span>Continue as Anonymous</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setSuccess(false);
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="w-full bg-white border-2 border-indigo-200 hover:border-indigo-400 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </button>

                {/* Info Box */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>🔒 Secure & Private:</strong> Your data is encrypted and protected.
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-gray-800 mb-3">After Login, You'll Get:</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>📊 Personal Dashboard</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>📋 All Your Orders</span>
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>💬 Custom Messages from Admin</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                <p className="text-gray-600 mb-8">
                  Set your email and password. You can change your password anytime.
                </p>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Error</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Account Created!</p>
                      <p className="text-green-700 text-sm">Redirecting to dashboard...</p>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      disabled={loading}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-gray-50"
                    />
                  </div>

                  {/* Register Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Back to Login */}
                <button
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccess(false);
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="w-full mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                >
                  ← Back to Login
                </button>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>💡 Tip:</strong> Remember your password! You'll need it to log in next time.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-xs text-gray-600">
            <p>By using this service, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Having issues? Contact us at support@cscwale.com</p>
        </div>
      </div>
    </div>
  );
}

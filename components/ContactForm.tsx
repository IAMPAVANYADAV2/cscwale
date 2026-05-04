"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const MAX_TEXT_LENGTH = 512;
const PHONE_LENGTH = 10;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Pata nahi kya hua, please try again!");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      
      // Reset success state after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in-up">
        <div className="rounded-full bg-emerald-100 p-3 mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h4 className="text-xl font-bold text-indigo-900 mb-2">Message Sent!</h4>
        <p className="text-sm text-indigo-700">Aapki request receive ho gayi hai. Hum jald hi aapse contact karenge.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm mt-4 md:mt-0">
      <input
        type="text"
        placeholder="Aapka Naam"
        required
        maxLength={MAX_TEXT_LENGTH}
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="rounded-xl border border-indigo-200 bg-white/60 px-4 py-2.5 text-sm text-indigo-900 placeholder:text-indigo-400 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        maxLength={MAX_TEXT_LENGTH}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="rounded-xl border border-indigo-200 bg-white/60 px-4 py-2.5 text-sm text-indigo-900 placeholder:text-indigo-400 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        required
        inputMode="numeric"
        pattern="[0-9]{10}"
        maxLength={PHONE_LENGTH}
        value={formData.phone}
        onChange={(e) =>
          setFormData({
            ...formData,
            phone: e.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH),
          })
        }
        className="rounded-xl border border-indigo-200 bg-white/60 px-4 py-2.5 text-sm text-indigo-900 placeholder:text-indigo-400 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
      />
      <p className="-mt-1 text-[11px] text-indigo-500">
        Mobile number 10 digits hi rakhein.
      </p>
      <input
        type="text"
        placeholder="Subject (optional)"
        maxLength={MAX_TEXT_LENGTH}
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className="rounded-xl border border-indigo-200 bg-white/60 px-4 py-2.5 text-sm text-indigo-900 placeholder:text-indigo-400 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm"
      />
      <textarea
        placeholder="Requirements likhein..."
        required
        rows={2}
        maxLength={MAX_TEXT_LENGTH}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="rounded-xl border border-indigo-200 bg-white/60 px-4 py-2.5 text-sm text-indigo-900 placeholder:text-indigo-400 outline-none focus:border-indigo-400 focus:bg-white transition-all shadow-sm resize-none"
      />
      <p className="-mt-1 text-[11px] text-indigo-500">
        Har text field 512 characters se kam rakhein.
      </p>
      {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-500 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="animate-pulse">Sending...</span>
        ) : (
          <>
            Send Request <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

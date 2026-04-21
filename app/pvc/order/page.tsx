"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Phone,
  CheckCircle2,
  CreditCard,
  Shield,
  Clock,
  Zap,
  ArrowLeft,
  Send,
  User,
  MapPin,
  FileText,
  Hash,
  Truck,
  MessageSquare,
  Mail,
  Crop,
} from "lucide-react";

type OrderFormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  comboDetails: string;
  quantity: string;
  deliveryType: "pickup" | "delivery";
  notes: string;
};

const MAX_TEXT_LENGTH = 512;
const PHONE_LENGTH = 10;
const MAX_ORDER_QUANTITY = 10;

const initialState: OrderFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  comboDetails: "",
  quantity: "1",
  deliveryType: "delivery",
  notes: "",
};

export default function PVCOrderPage() {
  const [formState, setFormState] = useState<OrderFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateField = (
    field: keyof OrderFormState,
    value: string | boolean
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name.trim(),
          phone: formState.phone.trim(),
          email: formState.email.trim() || undefined,
          address: formState.address.trim() || undefined,
          comboDetails: formState.comboDetails.trim(),
          quantity: Number(formState.quantity) || 1,
          deliveryType: formState.deliveryType,
          notes: formState.notes.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || "Order create failed");
      }

      setSuccess(true);
      setFormState(initialState);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-10 shadow-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-3">
              Order Received! 🎉
            </h1>
            <p className="text-slate-600 mb-2">
              Dhanyawad! Aapki order request humne receive kar li hai.
            </p>
            <p className="text-sm text-slate-500 mb-8">
              Humari team aapse jald hi WhatsApp par contact karegi confirmation
              aur next steps ke liye.
            </p>

            <div className="space-y-3">
              <a
                href="https://wa.me/919452657508"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500 hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                WhatsApp Par Documents Bhejein
              </a>
              <Link
                href="/pvc"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to PVC Cards
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-amber-100/20 blur-[130px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[60%] rounded-full bg-emerald-100/15 blur-[130px]" />
      </div>

      {/* Hero Banner */}
      <section className="relative z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-10 w-48 h-48 rounded-full bg-amber-400 blur-[80px]" />
          <div className="absolute bottom-5 right-10 w-64 h-64 rounded-full bg-emerald-500 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-18">
          <Link
            href="/pvc"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to PVC Cards
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">
                <Sparkles className="h-3 w-3" />
                600 DPI Quality
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white">
                PVC Card Order Form
              </h1>
              <p className="mt-2 text-slate-400 max-w-xl">
                Apni details bharein. Hum 600 DPI resolution par aapke documents
                process karke premium PVC card banayenge.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-400" /> Secure
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-400" /> Fast
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-blue-400" /> Easy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Main Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Order Details
                </h2>
                <p className="text-xs text-slate-500">
                  * wale fields zaroori hain
                </p>
              </div>
            </div>

            {/* Personal Info */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <User className="h-3.5 w-3.5" /> Personal Information
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Name *
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="Aapka naam"
                    value={formState.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    maxLength={MAX_TEXT_LENGTH}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Phone (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                      placeholder="9XXXX XXXXX"
                      value={formState.phone}
                      onChange={(e) =>
                        updateField(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH)
                        )
                      }
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength={PHONE_LENGTH}
                      required
                    />
                  </div>
                  <span className="mt-1 block text-[11px] text-slate-400">
                    10 digit mobile number
                  </span>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5 block">
                    <Mail className="h-3.5 w-3.5 text-slate-400" /> Email
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="email@example.com"
                    value={formState.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    maxLength={MAX_TEXT_LENGTH}
                    type="email"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5 block">
                    <Hash className="h-3.5 w-3.5 text-slate-400" /> Quantity
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="1"
                    value={formState.quantity}
                    onChange={(e) =>
                      updateField(
                        "quantity",
                        e.target.value.replace(/\D/g, "").slice(0, 2)
                      )
                    }
                    inputMode="numeric"
                    maxLength={2}
                  />
                  <span className="mt-1 block text-[11px] text-slate-400">
                    1 se {MAX_ORDER_QUANTITY} ke beech
                  </span>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <CreditCard className="h-3.5 w-3.5" /> Card Details
              </p>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                  Kaun Si Card Chahiye? *
                </label>
                <textarea
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
                  rows={3}
                  placeholder="Example: 2 Aadhaar PVC (front+back), 1 PAN card PVC, 2 Voter ID PVC..."
                  value={formState.comboDetails}
                  onChange={(e) =>
                    updateField("comboDetails", e.target.value)
                  }
                  maxLength={MAX_TEXT_LENGTH}
                  required
                />
                <span className="mt-1 block text-[11px] text-slate-400">
                  Card type aur quantity clearly likhein
                </span>
              </div>
            </div>

            {/* Delivery */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Truck className="h-3.5 w-3.5" /> Delivery
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Delivery Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateField("deliveryType", "delivery")}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        formState.deliveryType === "delivery"
                          ? "border-amber-400 bg-amber-50 text-amber-700 ring-2 ring-amber-100"
                          : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      🚚 Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField("deliveryType", "pickup")}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                        formState.deliveryType === "pickup"
                          ? "border-amber-400 bg-amber-50 text-amber-700 ring-2 ring-amber-100"
                          : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      📍 Pickup
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5 block">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-400" />{" "}
                    Notes
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100"
                    placeholder="Koi special instruction..."
                    value={formState.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    maxLength={MAX_TEXT_LENGTH}
                  />
                </div>
              </div>

              {formState.deliveryType === "delivery" && (
                <div className="mt-4">
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5 block">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" /> Delivery
                    Address
                    <span className="text-slate-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
                    rows={2}
                    placeholder="Full delivery address..."
                    value={formState.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    maxLength={MAX_TEXT_LENGTH}
                  />
                </div>
              )}
            </div>

            {/* Error Message */}
            {message && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-amber-200 transition-all hover:shadow-xl hover:shadow-amber-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Submit Order
                </>
              )}
            </button>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              Order submit karne ke baad humari team WhatsApp par contact
              karegi.
            </p>
          </form>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quality Badge */}
            <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900">600 DPI Quality</h3>
                  <p className="text-xs text-amber-700">
                    Double the standard resolution
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Har image aur PDF ko 600 DPI par process karte hain. Text,
                photo, QR code — sab crystal clear nikalte hain.
              </p>
            </div>

            {/* Need to Crop? */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-6 shadow-sm">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Crop className="h-4 w-4 text-blue-600" />
                Need to Crop Your Image?
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                PVC card ke liye perfect alignment chahiye? Humara tool use karein!
              </p>
              <Link
                href="/pvc/cropper"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-500 hover:shadow-lg"
              >
                Use Image Cropper
              </Link>
            </div>

            {/* Quick Notes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                Quick Tips
              </h3>
              <ul className="space-y-3">
                {[
                  "Photos WhatsApp par bhej sakte hain order ke baad.",
                  "PDF ya clear photo — dono se kaam ho jaata hai.",
                  "Bulk orders par fast delivery priority milegi.",
                  "Documents ki privacy 100% safe hai.",
                ].map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
              <h3 className="font-bold text-emerald-900 mb-2">
                Seedha WhatsApp Par Bhejein? 💬
              </h3>
              <p className="text-sm text-emerald-700 mb-4">
                Form bhar ke ya seedha WhatsApp par — dono tarike se order kar
                sakte hain.
              </p>
              <a
                href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20PVC%20card%20print%20karana%20hai"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-500 hover:shadow-lg"
              >
                <Phone className="h-4 w-4" />
                WhatsApp Now
              </a>
            </div>

            {/* Contact */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
              <p className="text-xs text-slate-500 mb-1">Koi sawal hai?</p>
              <a
                href="tel:+919452657508"
                className="text-lg font-bold text-slate-900 hover:text-amber-600 transition-colors"
              >
                +91 9452657508
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500">
          <p>Copyright &copy; 2026 CSC Wale. All rights reserved.</p>
          <span className="flex items-center gap-1.5 text-xs">
            <Sparkles className="h-3 w-3 text-amber-500" /> 600 DPI Quality
            Guaranteed
          </span>
        </div>
      </footer>
    </main>
  );
}

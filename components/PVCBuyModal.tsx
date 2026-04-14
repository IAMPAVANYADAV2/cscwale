"use client";

import { useState } from "react";

type ModalState = "FORM" | "CONFIRMATION" | "LOADING" | "SUCCESS" | "ERROR";
type PlanId = "trial" | "lite" | "pro";
const MAX_TEXT_LENGTH = 512;
const PHONE_LENGTH = 10;

const planCopy: Record<
  PlanId,
  {
    title: string;
    subtitle: string;
    accent: string;
    note: string;
  }
> = {
  trial: {
    title: "Trial Edition",
    subtitle: "Evaluation access for testing workflow",
    accent: "from-sky-600 to-cyan-600",
    note: "Best for testing the software before upgrade.",
  },
  lite: {
    title: "Lite Edition",
    subtitle: "Simple and lightweight working edition",
    accent: "from-amber-500 to-orange-500",
    note: "Best for low-end systems and basic workflow.",
  },
  pro: {
    title: "Pro Edition",
    subtitle: "Full production workflow for serious users",
    accent: "from-emerald-600 to-teal-700",
    note: "Best for business users and high-volume work.",
  },
};

export default function PVCBuyModal({
  isOpen,
  onClose,
  selectedPlan,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanId;
}) {
  const [modalState, setModalState] = useState<ModalState>("FORM");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const selectedPlanCopy = planCopy[selectedPlan];

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      setErrorMsg("Kripya sabhi details bharein.");
      return;
    }
    setErrorMsg("");
    setModalState("CONFIRMATION");
  };

  const handleAgree = async () => {
    setModalState("LOADING");
    try {
      const res = await fetch("/api/buy-pvc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          plan: selectedPlan,
          sourcePage: "/tools",
          sourceSection: "tools_sales_modal",
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (res.ok && data.success) {
        setModalState("SUCCESS");
      } else {
        setModalState("ERROR");
        setErrorMsg(data.error || "Kuch technical problem aa gayi.");
      }
    } catch {
      setModalState("ERROR");
      setErrorMsg("Network error. Kripya thodi der baad try karein.");
    }
  };

  const forceClose = () => {
    setModalState("FORM");
    setFormData({ name: "", phone: "", address: "" });
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div
          className={`bg-gradient-to-r px-6 py-4 text-center text-white ${selectedPlanCopy.accent}`}
        >
          <h2 className="text-xl font-black tracking-wide">
            PVC Cropper Studio {selectedPlanCopy.title}
          </h2>
          <p className="text-sm text-white/85">{selectedPlanCopy.subtitle}</p>
          <button
            onClick={forceClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-1 text-white hover:bg-black/40"
            aria-label="Close Modal"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {modalState === "FORM" && (
            <form onSubmit={handleContinue} className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Selected Version
                </p>
                <p className="mt-2 text-lg font-black text-slate-900">
                  {selectedPlanCopy.title}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedPlanCopy.note}
                </p>
              </div>

              {errorMsg ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
                  {errorMsg}
                </div>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Aapka Naam
                </label>
                <input
                  required
                  type="text"
                  placeholder="Rahul Kumar VLE"
                  maxLength={MAX_TEXT_LENGTH}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Phone Number (WhatsApp)
                </label>
                <input
                  required
                  type="tel"
                  placeholder="9XXXX XXXXX"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={PHONE_LENGTH}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH),
                    })
                  }
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Mobile number 10 digits hi rakhein.
                </p>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Aapka Address (Ya CSC Center Name)
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="CSC Center, Gram Panchayat..."
                  maxLength={MAX_TEXT_LENGTH}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Har text field 512 characters se kam rakhein.
                </p>
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
                <p className="text-xs font-semibold leading-relaxed text-blue-800">
                  Aapka data sirf version inquiry aur support ke liye use hoga.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-slate-800"
              >
                Continue
              </button>
            </form>
          )}

          {modalState === "CONFIRMATION" && (
            <div className="space-y-6 py-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <span className="text-2xl">!</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Final Confirmation
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Humari team aapse jaldi contact karegi aur{" "}
                  <span className="font-semibold text-slate-900">
                    {selectedPlanCopy.title}
                  </span>{" "}
                  ke setup, pricing, aur workflow details share karegi.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={forceClose}
                  className="w-1/2 rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAgree}
                  className="w-1/2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {modalState === "LOADING" && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />
              <p className="text-sm font-bold text-slate-700">
                Please wait, details save ho rahi hain...
              </p>
            </div>
          )}

          {modalState === "SUCCESS" && (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <svg
                  className="h-8 w-8 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Request Sent
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Dhanyawad. Aapki {selectedPlanCopy.title} inquiry save ho gayi
                hai. Humari team jald hi contact karegi.
              </p>
              <button
                onClick={forceClose}
                className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          )}

          {modalState === "ERROR" && (
            <div className="space-y-4 py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl">!</span>
              </div>
              <h3 className="text-lg font-bold text-red-600">
                Submission Failed
              </h3>
              <p className="text-sm text-slate-600">{errorMsg}</p>
              <button
                onClick={() => setModalState("FORM")}
                className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

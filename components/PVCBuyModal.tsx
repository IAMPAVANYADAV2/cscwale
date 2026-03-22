"use client";

import { useState } from "react";

type ModalState = "CLOSED" | "FORM" | "CONFIRMATION" | "LOADING" | "SUCCESS" | "ERROR";

export default function PVCBuyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [modalState, setModalState] = useState<ModalState>("FORM");
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

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
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setModalState("SUCCESS");
      } else {
        setModalState("ERROR");
        setErrorMsg(data.error || "Kuch technical problem aa gayi.");
      }
    } catch (err) {
      setModalState("ERROR");
      setErrorMsg("Network error. Kripya thodi der baad try karein.");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", address: "" });
    setModalState("FORM");
    setErrorMsg("");
  };

  const forceClose = () => {
    handleReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 text-center text-white">
          <h2 className="text-xl font-black tracking-wide">PVC Cropper License</h2>
          <p className="text-sm text-emerald-100">Sirf ₹299 for Lifetime Access</p>
          <button
            onClick={forceClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-1 text-white hover:bg-black/40"
            aria-label="Close Modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {modalState === "FORM" && (
            <form onSubmit={handleContinue} className="space-y-4">
              {errorMsg && (
                <div className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600 border border-red-200">
                  {errorMsg}
                </div>
              )}
              
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Aapka Naam</label>
                <input
                  required
                  type="text"
                  placeholder="Rahul Kumar VLE"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Phone Number (WhatsApp)</label>
                <input
                  required
                  type="tel"
                  placeholder="9XXXX XXXXX"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Aapka Address (Ya CSC Center Name)</label>
                <textarea
                  required
                  rows={2}
                  placeholder="CSC Center, Gram Panchayat..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
                <p className="text-xs font-semibold leading-relaxed text-blue-800">
                  🔒 Aapka data kabhi marketing ke liye use nahi kiya jayega wo bilkul secure hai.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-md"
              >
                Continue
              </button>
            </form>
          )}

          {modalState === "CONFIRMATION" && (
            <div className="space-y-6 py-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Final Confirmation</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Humari team aapse baat karegi jaldi hi aage ki process complete karne ke liye. 
                  <br /><br />
                  <span className="font-semibold text-amber-700">Kya aapko koi dikkat to nahi?</span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={forceClose}
                  className="w-1/2 rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
                >
                  Disagree (Cancel)
                </button>
                <button
                  onClick={handleAgree}
                  className="w-1/2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 shadow-md"
                >
                  Agree (Proceed)
                </button>
              </div>
            </div>
          )}

          {modalState === "LOADING" && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
              <p className="text-sm font-bold text-slate-700">Please wait, details save ho rahi hain...</p>
            </div>
          )}

          {modalState === "SUCCESS" && (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Request Sent!</h3>
              <p className="mt-2 text-sm text-slate-600">
                Dhanyawad! Aapki details secure tarike se save ho gayi hain. 
                <br />
                Humari team jald hi aapko contact karegi.
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
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-bold text-red-600">Submission Failed</h3>
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

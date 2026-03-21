"use client";

import { useEffect, useState } from "react";

type OrderFormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  comboDetails: string;
  quantity: string;
  deliveryType: "pickup" | "delivery";
  notes: string;
  amountInr: string;
  payOnline: boolean;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const initialState: OrderFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  comboDetails: "",
  quantity: "1",
  deliveryType: "delivery",
  notes: "",
  amountInr: "",
  payOnline: true,
};

export default function PVCOrderPage() {
  const [formState, setFormState] = useState<OrderFormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (window.Razorpay) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const updateField = (
    field: keyof OrderFormState,
    value: string | boolean
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const createOrder = async () => {
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

    const data = (await response.json()) as { orderId: string };
    return data.orderId;
  };

  const createRazorpayOrder = async (orderId: string) => {
    const amountValue = Number(formState.amountInr);
    if (!amountValue || amountValue <= 0) {
      throw new Error("Enter a valid amount");
    }

    const response = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, amountInr: amountValue }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Payment init failed");
    }

    return (await response.json()) as {
      razorpayOrderId: string;
      keyId: string;
    };
  };

  const verifyPayment = async (payload: {
    orderId: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => {
    const response = await fetch("/api/razorpay/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Payment verify failed");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const orderId = await createOrder();

      if (!formState.payOnline) {
        setMessage(
          "Order received! Hum aapse WhatsApp par confirmation ke liye contact karenge."
        );
        setFormState(initialState);
        return;
      }

      const { razorpayOrderId, keyId } = await createRazorpayOrder(orderId);

      if (!window.Razorpay) {
        throw new Error("Payment gateway not loaded");
      }

      const options = {
        key: keyId,
        amount: Math.round(Number(formState.amountInr) * 100),
        currency: "INR",
        name: "CSC Wale",
        description: "PVC Card Printing & Delivery",
        order_id: razorpayOrderId,
        prefill: {
          name: formState.name,
          email: formState.email,
          contact: formState.phone,
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          await verifyPayment({
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
          setMessage(
            "Payment successful! Order confirmed. Hum aapse WhatsApp par update share karenge."
          );
          setFormState(initialState);
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="inline-block rounded-full border border-white/30 px-3 py-1 text-sm tracking-wide">
            PVC Order Form
          </p>
          <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
            Online Order + Payment (Optional)
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-emerald-50 md:text-base">
            Aap apna combo detail bhejein. Payment optional hai; chahe to “Pay Later”
            चुन सकते हैं.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold">Order Details</h2>
            <p className="mt-2 text-sm text-slate-600">
              Example: 4 PVC cards + high quality photos, 5 PVC family set, etc.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Name *
                <input
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Phone *
                <input
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Email (optional)
                <input
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.email}
                  onChange={(event) => updateField("email", event.target.value)}
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Quantity
                <input
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.quantity}
                  onChange={(event) => updateField("quantity", event.target.value)}
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-slate-700">
              Delivery Address (optional)
              <textarea
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                rows={2}
                value={formState.address}
                onChange={(event) => updateField("address", event.target.value)}
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-slate-700">
              Combo Details *
              <textarea
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                rows={3}
                value={formState.comboDetails}
                onChange={(event) =>
                  updateField("comboDetails", event.target.value)
                }
                required
              />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Delivery Type
                <select
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.deliveryType}
                  onChange={(event) =>
                    updateField(
                      "deliveryType",
                      event.target.value as "pickup" | "delivery"
                    )
                  }
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                Notes (optional)
                <input
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                />
              </label>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <input
                id="payOnline"
                type="checkbox"
                checked={formState.payOnline}
                onChange={(event) =>
                  updateField("payOnline", event.target.checked)
                }
              />
              <label htmlFor="payOnline" className="text-sm text-slate-700">
                Pay Online (Razorpay)
              </label>
            </div>

            {formState.payOnline ? (
              <label className="mt-4 block text-sm font-medium text-slate-700">
                Amount (INR) *
                <input
                  className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={formState.amountInr}
                  onChange={(event) => updateField("amountInr", event.target.value)}
                  placeholder="Agreed amount"
                  required
                />
              </label>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Order"}
            </button>

            {message ? (
              <p className="mt-4 text-sm text-slate-700">{message}</p>
            ) : null}
          </form>

          <aside className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-amber-900">Quick Notes</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Photos WhatsApp par bhej sakte hain.</li>
              <li>Bulk orders par fast delivery priority milegi.</li>
              <li>Payment optional hai, pehle confirm bhi kar sakte hain.</li>
            </ul>
            <a
              href="https://wa.me/919452657508"
              className="mt-4 inline-block rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-400"
            >
              WhatsApp Now
            </a>
          </aside>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-600">
          <p>Copyright 2026 CSC Wale. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

import Link from "next/link";

const pvcBundles = [
  {
    title: "Combo 1",
    description: "4 PVC cards + high quality photos",
    note: "Details aap apne hisab se update kar sakte hain.",
  },
  {
    title: "Combo 2",
    description: "5 PVC cards (family set)",
    note: "Bulk orders available.",
  },
  {
    title: "Combo 3",
    description: "PVC card + lamination + photo print",
    note: "Fast delivery option.",
  },
];

const steps = [
  "WhatsApp par requirement bhejein (name, service, quantity, delivery).",
  "Document/photo share karein. Clear aur readable images best result deti hain.",
  "Confirmation ke baad printing + packing start hota hai.",
  "Delivery ya pickup as per customer preference.",
];

export default function PVCPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="inline-block rounded-full border border-white/30 px-3 py-1 text-sm tracking-wide">
            PVC Card Printing & Delivery
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            High Quality PVC Cards + Photo Prints
          </h1>
          <p className="mt-4 max-w-3xl text-base text-orange-50 md:text-lg">
            Single card, family combo, ya bulk orders. Aap apne hisab se bundles
            decide karke bhej sakte hain. Hum quality aur timely delivery par focus
            karte hain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919452657508"
              className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              WhatsApp Now
            </a>
            <Link
              href="/pvc/order"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Order Online
            </Link>
            <a
              href="tel:+919452657508"
              className="rounded-lg border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Call for Order
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {pvcBundles.map((bundle) => (
            <article
              key={bundle.title}
              className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-amber-900">{bundle.title}</h2>
              <p className="mt-3 text-sm text-slate-700">{bundle.description}</p>
              <p className="mt-2 text-xs text-slate-500">{bundle.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Order Process</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {steps.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-amber-600" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-emerald-900">
            Send Your Requirement
          </h2>
          <p className="mt-3 text-slate-700">
            Aap apna combo define karein jaise: “4 PVC cards + high quality photos”
            ya “5 PVC cards (family set)”. Hum aapko pricing aur delivery details
            share kar denge.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919452657508"
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              Share on WhatsApp
            </a>
            <Link
              href="/pvc/order"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Order Online
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-emerald-200 px-5 py-3 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50"
            >
              Back to Home
            </Link>
          </div>
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

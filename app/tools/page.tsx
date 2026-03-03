import Image from "next/image";
import sampleFront from "@/image/pvc_cropper_sample_image/sample.png";
import sampleAlt from "@/image/pvc_cropper_sample_image/sanpme2.png";
import sampleBatch from "@/image/pvc_cropper_sample_image/sample3.png";

const benefits = [
  "Aadhaar, PAN, Voter ID, Ayushman templates ready.",
  "Batch processing se ek saath multiple PDFs kaam.",
  "Password-protected PDFs support with safe retry handling.",
  "Exact PVC-size output for print workflow.",
  "Easy input/output folder on Desktop.",
  "Licensed software with yearly validity.",
  "Offline use support (internet daily use ke liye required nahi).",
];

const whatsappNumber = "919452657508";
const whatsappMessage = encodeURIComponent(
  "Namaste, mujhe PVC Cropper by Nexus Core ka 1-Year License (₹491) activate karna hai. Demo aur activation process bhejiye."
);

const buyNowLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-900">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,#1d4ed8_0%,transparent_38%),radial-gradient(circle_at_bottom_right,#0ea5e9_0%,transparent_35%),linear-gradient(135deg,#0b1220,#13213c,#1e293b)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <p className="inline-flex rounded-full border border-cyan-200/50 bg-cyan-300/10 px-4 py-1 text-xs font-bold tracking-[0.16em] text-cyan-100">
            PVC CROPPER BY NEXUS CORE
          </p>
          <h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            CSC ke liye Fast, Professional aur Smart PVC Card Cropper
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-blue-100 md:text-base">
            Aadhaar, PAN, Voter ID, Ayushman Card PDFs ko seconds me crop,
            resize aur save karein.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.1fr_1fr]">
            <article className="rounded-2xl border border-cyan-200/40 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-cyan-200">Annual Plan</p>
              <p className="mt-2 text-4xl font-black">₹491</p>
              <p className="mt-1 text-sm text-cyan-100">Sirf ₹491 / Year</p>
              <ul className="mt-4 space-y-2 text-sm text-blue-100">
                <li>1 Year Valid License</li>
                <li>1 System License</li>
                <li>Fast Support for Activation/Renewal</li>
              </ul>
              <a
                href={buyNowLink}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-cyan-200"
              >
                Buy Now | Start 1-Year License
              </a>
            </article>

            <article className="rounded-2xl border border-white/25 bg-slate-950/40 p-6">
              <h2 className="text-xl font-extrabold">Short Sales Copy</h2>
              <p className="mt-3 text-sm text-slate-200">
                CSC center par daily document cropping me time waste ho raha
                hai? PVC Cropper se batch processing, fixed card-size output
                aur clean folder management ke saath kaam super fast ho jata
                hai.
              </p>
              <p className="mt-3 text-sm text-slate-200">
                No extra software dependency for user install. Simple setup,
                direct use.
              </p>
              <p className="mt-4 rounded-lg border border-emerald-300/35 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100">
                Developed for real CSC daily workflow | Quick activation
                support available
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <h2 className="text-2xl font-black md:text-3xl">Top Benefits</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <article
              key={benefit}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-bold tracking-wide text-blue-700">
                BENEFIT {index + 1}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                {benefit}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={sampleFront}
              alt="PVC Cropper sample output screen"
              className="h-56 w-full object-cover"
              priority
            />
          </article>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={sampleAlt}
              alt="PVC cropper workflow sample"
              className="h-56 w-full object-cover"
            />
          </article>
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={sampleBatch}
              alt="Batch processing sample preview"
              className="h-56 w-full object-cover"
            />
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">CTA Lines</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-800">
            <li>Ab manual cropping chhodiye. CSC ka time bachaiye.</li>
            <li>Aaj hi PVC Cropper activate kijiye - sirf ₹491/year.</li>
            <li>Professional output, kam mehnat, zyada speed.</li>
          </ul>

          <h3 className="mt-6 text-lg font-extrabold">WhatsApp Promotion Text</h3>
          <p className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            CSC Bhaiyon ke liye best tool! PVC Cropper by Nexus Core.
            Aadhaar/PAN/Voter/Ayushman PDFs ka fast crop + PVC print-ready size
            output. Batch processing + password PDF support + easy use. Price:
            ₹491 per year. Demo/License ke liye message karein: 9452657508.
          </p>
          <a
            href={buyNowLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
          >
            WhatsApp for Demo/License
          </a>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, MonitorPlay, Phone, X } from "lucide-react";
import sampleFront from "@/image/pvc_cropper_sample_image/sample.png";
import sampleAlt from "@/image/pvc_cropper_sample_image/sanpme2.png";
import sampleBatch from "@/image/pvc_cropper_sample_image/sample3.png";
import proMain from "@/image/pro/Main.jpg";
import proSetter from "@/image/pro/SetterLayout.jpg";
import PVCBuyModal from "@/components/PVCBuyModal";

type PlanId = "trial" | "lite" | "pro";

type Plan = {
  id: PlanId;
  badge: string;
  title: string;
  label: string;
  subtitle: string;
  summary: string;
  cta: string;
  accent: string;
  border: string;
  glow: string;
  audience: string;
  highlights: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "trial",
    badge: "Evaluation Edition",
    title: "Trial",
    label: "Try before you upgrade",
    subtitle: "Best for testing the workflow before purchase",
    summary:
      "Trial gives users a real feel of the interface, crop quality, and overall PVC processing workflow without full production freedom.",
    cta: "Download Trial",
    accent: "from-orange-400 to-amber-400",
    border: "border-orange-100",
    glow: "from-orange-100 to-amber-50",
    audience: "New users, evaluators, and software comparison buyers",
    highlights: [
      "Single-file processing only",
      "One PDF at a time",
      "Maximum 20 files in full trial lifecycle",
      "Batch processing locked",
      "Manual photo fix locked",
      "Integrated Template Setter locked",
    ],
  },
  {
    id: "lite",
    badge: "Lightweight Edition",
    title: "Lite",
    label: "Simple, fast, practical",
    subtitle: "Best for low-end computers and simple daily work",
    summary:
      "Lite is built for users who want an import, process, and crop workflow without heavy controls or complex interface layers.",
    cta: "Choose Lite",
    accent: "from-blue-500 to-cyan-500",
    border: "border-blue-100",
    glow: "from-blue-100 to-cyan-50",
    audience: "Small shops, entry-level operators, and weak or older PCs",
    highlights: [
      "Fast workflow with simple UI",
      "Lower system load",
      "Easy learning curve",
      "Batch support in simpler form",
      "Focused on practical daily use",
      "Less flexible than Pro",
    ],
  },
  {
    id: "pro",
    badge: "Production Edition",
    title: "Pro",
    label: "Full professional workflow power",
    subtitle: "Best for serious operators, businesses, and service centers",
    summary:
      "Pro is the complete business edition with higher productivity, stronger flexibility, and a professional production workflow.",
    cta: "Upgrade to Pro",
    accent: "from-purple-600 to-indigo-700",
    border: "border-purple-200",
    glow: "from-purple-200 to-indigo-100",
    audience: "Professional operators, high-volume users, and production teams",
    highlights: [
      "Process Selected and Process All",
      "Batch processing for multiple PDFs",
      "Automatic template detection from file names",
      "Manual template selection and photo fix",
      "Integrated Template Setter",
      "Protected PDF password handling",
    ],
    featured: true,
  },
];

const problems = [
  "Manual cropping takes too much time and attention every day.",
  "Repeated crop work creates fatigue and inconsistent output.",
  "Different document types need repeatable crop positions.",
  "Low-end PC users need a lighter workflow with less system load.",
  "Businesses need a professional tool instead of manual editing work.",
];

const reasons = [
  "Built for practical daily work",
  "Faster than manual cropping workflows",
  "Three editions for three types of buyers",
  "Suitable from low-end systems to professional production setups",
  "Designed for repeatable, business-friendly output",
  "Good for service centers and daily operators",
];

const comparisonRows = [
  {
    label: "Interface complexity",
    trial: "Simple evaluation experience",
    lite: "Very simple and minimal",
    pro: "Full professional workflow interface",
  },
  {
    label: "Processing style",
    trial: "One file at a time",
    lite: "Simple fast processing",
    pro: "Complete production processing",
  },
  {
    label: "Batch work",
    trial: "No",
    lite: "Yes, simpler workflow",
    pro: "Yes, full workflow level",
  },
  {
    label: "Advanced flexibility",
    trial: "No",
    lite: "Limited",
    pro: "Yes",
  },
  {
    label: "Manual photo fix",
    trial: "No",
    lite: "Not a main feature",
    pro: "Yes",
  },
  {
    label: "Best hardware fit",
    trial: "General testing",
    lite: "Low-end computers",
    pro: "Regular and professional systems",
  },
];

const useCases = [
  {
    title: "For testing and trust building",
    description:
      "Start with Trial to verify crop quality, understand the interface, and experience the software before you invest.",
  },
  {
    title: "For low-end PC operators",
    description:
      "Choose Lite if you want speed, comfort, and a cleaner workflow on weaker or older systems.",
  },
  {
    title: "For business-grade production",
    description:
      "Move to Pro when speed, workflow control, and batch capability directly affect your business performance.",
  },
];

const faqs = [
  {
    question: "What is PVC Cropper Studio?",
    answer:
      "PVC Cropper Studio is a Windows desktop software solution for processing document PDFs and generating PVC-card-style cropped output quickly and consistently.",
  },
  {
    question: "What is the difference between Trial, Lite, and Pro?",
    answer:
      "Trial is for testing, Lite is for simple and fast daily work, and Pro is the full professional production edition.",
  },
  {
    question: "Who should use the Lite version?",
    answer:
      "Lite is best for users who want a simple interface, quick workflow, and good performance on low-end computers.",
  },
  {
    question: "Who should use the Pro version?",
    answer:
      "Pro is best for businesses, professionals, high-volume operators, and users who need complete workflow capability.",
  },
  {
    question: "Is the Trial version enough for production?",
    answer:
      "No. The Trial version is mainly for evaluation and testing. It is designed to help users understand the software before upgrading.",
  },
  {
    question: "Why choose Lite instead of Pro?",
    answer:
      "Choose Lite if you want a simpler, lighter, and workflow-focused edition and do not need maximum flexibility.",
  },
];

const whatsappNumber = "919452657508";
const supportLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Namaste, mujhe PVC Cropper Studio ke Trial, Lite aur Pro editions ke bare me jankari chahiye."
)}`;

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PVC Cropper Studio",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Windows",
  offers: {
    "@type": "AggregateOffer",
    offerCount: 3,
    availability: "https://schema.org/InStock",
  },
  description:
    "Windows desktop software for fast, reliable, and repeatable PVC-card-style document cropping with Trial, Lite, and Pro editions.",
  brand: {
    "@type": "Brand",
    name: "Nexus Core",
  },
  url: "https://cscwale.com/tools",
};

export default function ToolsSalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro");
  const [selectedImage, setSelectedImage] = useState<{src: any; alt: string} | null>(null);

  const trackEvent = async (payload: {
    eventName: string;
    plan?: PlanId;
    section?: string;
    label?: string;
    href?: string;
  }) => {
    try {
      await fetch("/api/tools-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Tools event tracking failed", error);
    }
  };

  const openPlanModal = (planId: PlanId) => {
    void trackEvent({
      eventName: "open_plan_modal",
      plan: planId,
      section: "plan_cta",
      label: `Open ${planId} modal`,
    });
    setSelectedPlan(planId);
    setIsModalOpen(true);
  };

  const trackLinkClick = (payload: {
    eventName: string;
    section: string;
    label: string;
    href: string;
    plan?: PlanId;
  }) => {
    void trackEvent(payload);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-600 selection:bg-cyan-200 selection:text-slate-900">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[60%] w-[40%] rounded-full bg-fuchsia-200/40 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] h-[50%] w-[60%] rounded-full bg-blue-200/40 blur-[150px]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-fuchsia-700 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500" />
            </span>
            Premium Digital Tools Marketplace
          </div>

          <h1 className="max-w-5xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Boost Your Digital Business with
            <span className="block mt-2 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              High-Performance Tools
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Explore our curated collection of professional desktop tools designed specifically for CSC operators, digital centers, and printing businesses. More tools coming soon!
          </p>

          <div className="w-full mt-24 pt-16 border-t border-slate-200 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f8fafc] px-6 text-sm font-bold uppercase tracking-widest text-slate-400">Featured App</div>
             
             <h2 className="text-4xl font-black text-slate-900 mb-4">PVC Cropper Studio</h2>
             <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Fast, reliable, and repeatable PVC-card-style document cropping. Choose Trial, Lite, or Pro based on your workflow.</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openPlanModal("trial")}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-400/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <MonitorPlay className="h-5 w-5" />
              <span>Try Trial Edition</span>
            </button>
            <button
              onClick={() => openPlanModal("lite")}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <CheckCircle2 className="h-5 w-5" />
              Choose Lite
            </button>
            <button
              onClick={() => openPlanModal("pro")}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <CheckCircle2 className="h-5 w-5" />
              Upgrade to Pro
            </button>
          </div>

          <div className="mt-16 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-slate-200 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-xl">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-orange-500" /> Windows Desktop
            </div>
            <div className="hidden h-4 w-px bg-slate-300 sm:block" />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-blue-500" /> PVC Workflow Ready
            </div>
            <div className="hidden h-4 w-px bg-slate-300 sm:block" />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-purple-600" /> Trial, Lite, Pro
            </div>
          </div>

          <div className="mt-10 grid w-full max-w-5xl gap-4 md:grid-cols-3">
            {[
              ["3 Editions", "Trial se Pro tak clear upgrade path"],
              ["Low-End to Pro", "Weak PC se production workflow tak fit"],
              ["Batch Ready", "Daily operator aur service center use case"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white/70 px-5 py-4 text-left shadow-sm backdrop-blur"
              >
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">
                  {title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Editions Comparison
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Har edition ko clearly structure kiya gaya hai taaki testing user,
            low-end PC operator, aur professional production user sab turant apna
            fit samajh saken.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`group relative overflow-hidden rounded-3xl border ${plan.border} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.featured ? "ring-2 ring-purple-200 shadow-xl" : ""
              } ${
                plan.id === "pro"
                  ? "bg-gradient-to-br from-purple-900 via-indigo-800 to-indigo-900 text-white"
                  : plan.id === "lite"
                  ? "bg-gradient-to-br from-blue-50 to-cyan-50"
                  : "bg-white"
              }`}
            >
              <div
                className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${plan.glow} opacity-70 blur-3xl transition-opacity group-hover:opacity-100`}
              />
              {plan.featured ? (
                <div className="absolute right-5 top-5 rounded-full bg-indigo-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-white shadow-sm">
                  Most Popular
                </div>
              ) : null}

              <div className="relative z-10 flex h-full flex-col">
                <div
                  className={`inline-flex w-fit rounded-full bg-gradient-to-r px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.24em] text-white ${plan.accent}`}
                >
                  {plan.badge}
                </div>
                <h3 className={`mt-5 text-4xl font-black tracking-tight ${plan.id === "pro" ? "text-white" : "text-slate-900"}`}>
                  {plan.title}
                </h3>
                <p className={`mt-2 text-xl font-bold ${plan.id === "pro" ? "text-indigo-200" : "text-slate-800"}`}>
                  {plan.label}
                </p>
                <p className={`mt-3 text-base leading-relaxed ${plan.id === "pro" ? "text-indigo-100" : "text-slate-600"}`}>
                  {plan.subtitle}
                </p>
                <p className={`mt-5 text-base font-medium leading-relaxed ${plan.id === "pro" ? "text-indigo-100" : "text-slate-700"}`}>
                  {plan.summary}
                </p>

                {/* Plan-specific screenshots */}
                <div className="mt-6 rounded-2xl border border-slate-200 bg-black overflow-hidden h-56">
                  <Image
                    src={plan.id === "lite" ? sampleFront : plan.id === "pro" ? proMain : sampleBatch}
                    alt={`${plan.title} version screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className={`mt-6 rounded-2xl border p-4 ${plan.id === "pro" ? "border-indigo-700 bg-indigo-900/40" : "border-slate-100 bg-slate-50"}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.22em] ${plan.id === "pro" ? "text-indigo-300" : "text-slate-500"}`}>
                    Best For
                  </p>
                  <p className={`mt-2 text-sm leading-7 ${plan.id === "pro" ? "text-indigo-100" : "text-slate-700"}`}>
                    {plan.audience}
                  </p>
                </div>

                <div className={`mt-5 flex-1 rounded-2xl border p-4 ${plan.id === "pro" ? "border-indigo-700 bg-indigo-900/40" : "border-slate-100 bg-slate-50"}`}>
                  <p className={`text-xs font-black uppercase tracking-[0.22em] ${plan.id === "pro" ? "text-indigo-300" : "text-slate-500"}`}>
                    Included Highlights
                  </p>
                  <ul className="mt-4 space-y-3">
                    {plan.highlights.map((item) => (
                      <li key={item} className={`flex items-start gap-3 text-sm ${plan.id === "pro" ? "text-indigo-100" : "text-slate-700"}`}>
                        <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${plan.id === "pro" ? "bg-indigo-400" : "bg-slate-400"}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

            <button
              onClick={() => openPlanModal("pro")}
              className={`mt-6 w-full rounded-2xl bg-gradient-to-r px-6 py-4 text-base font-black text-white shadow-lg transition-transform hover:scale-[1.01] ${plan.accent}`}
            >
              {plan.cta}
            </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-orange-500/50 bg-gradient-to-br from-orange-700 to-amber-600 p-8 shadow-2xl backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-100">
              Main Problems
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Manual work slow hai aur repeated crop workflow inconsistent ho jata hai
            </h2>
            <p className="mt-4 text-base leading-8 text-orange-50/90">
              PVC Cropper Studio ka core purpose hai document PDFs ko PVC-ready
              crops mein fast aur repeatable format mein convert karna, especially
              un environments ke liye jahan speed, consistency, aur simple output
              process matter karta hai.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((problem, index) => (
              <article
                key={problem}
                className="group rounded-3xl border border-orange-500/40 bg-gradient-to-br from-orange-600 to-amber-500 p-5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:from-orange-500 hover:to-amber-400 hover:border-orange-400/80 hover:scale-105 backdrop-blur"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/10 text-sm font-black text-white shadow-lg group-hover:scale-125 transition-transform duration-300 group-hover:from-white/30 group-hover:to-white/20">
                  0{index + 1}
                </div>
                <p className="text-base font-semibold leading-relaxed text-white group-hover:text-orange-50 transition-colors duration-300">
                  {problem}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-500 to-purple-600 sm:text-4xl">
            Why Choose PVC Cropper Studio?
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            Yeh tool one-size-fits-all nahi hai. Trial evaluation ke liye, Lite
            simplicity aur low-end systems ke liye, aur Pro serious production
            workflow ke liye designed hai.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const gradients = [
              { border: "border-orange-500/60", from: "from-orange-600", to: "to-amber-500", icon: "from-white/20 to-white/10", hover: "hover:from-orange-500 hover:to-amber-400 hover:border-orange-400", text: "text-white hover:text-orange-50", scale: "" },
              { border: "border-blue-500/60", from: "from-blue-600", to: "to-cyan-500", icon: "from-white/20 to-white/10", hover: "hover:from-blue-500 hover:to-cyan-400 hover:border-blue-400", text: "text-white hover:text-blue-50", scale: "md:col-span-2 lg:col-span-1 lg:scale-110 ring-2 ring-blue-400/60" },
              { border: "border-purple-500/60", from: "from-purple-700", to: "to-indigo-600", icon: "from-white/20 to-white/10", hover: "hover:from-purple-600 hover:to-indigo-500 hover:border-purple-400", text: "text-white hover:text-purple-50", scale: "" },
            ];
            const style = gradients[index % 3];
            
            return (
              <article
                key={reason}
                className={`group relative overflow-hidden rounded-3xl border ${style.border} bg-gradient-to-br ${style.from} ${style.to} p-6 shadow-xl transition-all duration-300 ${style.hover} hover:shadow-2xl hover:border-opacity-100 backdrop-blur ${style.scale}`}
              >
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-slate-300/20 to-slate-400/10 opacity-40 blur-3xl group-hover:opacity-60 transition-opacity" />
                <div className="relative z-10">
                  <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${style.icon} text-sm font-black text-white shadow-lg group-hover:scale-125 transition-transform duration-300 group-hover:from-white/30 group-hover:to-white/20`}>
                    0{index + 1}
                  </div>
                  <p className={`text-base font-bold leading-relaxed ${style.text} transition-colors duration-300`}>
                    {reason}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-300 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
          <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Trial vs Lite vs Pro
            </h2>
            <p className="mt-3 text-slate-300">
              Clear comparison se user ko turant samajh aata hai kaunsa edition
              testing ke liye hai, kaunsa low-end PC ke liye, aur kaunsa business
              workflow ke liye.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-4 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 text-sm font-black uppercase tracking-[0.2em] text-slate-200">
                <div className="border-r border-slate-700 px-5 py-4 text-slate-100">Feature</div>
                <div className="border-r border-slate-700 px-5 py-4 text-orange-300">Trial</div>
                <div className="border-r border-slate-700 px-5 py-4 text-blue-300">Lite</div>
                <div className="px-5 py-4 text-purple-300">Pro</div>
              </div>
              {comparisonRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-4 border-t border-slate-700 text-sm transition-all duration-300 ${
                    index % 2 === 0 ? 'bg-slate-800/40' : 'bg-slate-900/20'
                  } hover:bg-slate-700/50`}
                >
                  <div className="border-r border-slate-700 px-5 py-4 font-bold text-slate-100">
                    {row.label}
                  </div>
                  
                  {/* Trial Cell */}
                  <div className="group border-r border-slate-700 px-5 py-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-900/60 hover:to-amber-800/40">
                    <div className="relative">
                      <span className="text-slate-200 group-hover:text-orange-100 transition-colors duration-300 font-medium">
                        {row.trial}
                      </span>
                      <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-300 group-hover:w-full" />
                    </div>
                  </div>

                  {/* Lite Cell - More Prominent */}
                  <div className="group border-r border-slate-700 px-5 py-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-900/80 hover:to-cyan-800/50">
                    <div className="relative">
                      <span className="text-blue-100 group-hover:text-blue-50 transition-colors duration-300 font-bold">
                        {row.lite}
                      </span>
                      <div className="absolute -bottom-1 left-0 h-1 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                    </div>
                  </div>

                  {/* Pro Cell */}
                  <div className="group px-5 py-4 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-900/70 hover:to-indigo-900/50">
                    <div className="relative">
                      <span className="text-indigo-100 group-hover:text-indigo-50 transition-colors duration-300 font-medium">
                        {row.pro}
                      </span>
                      <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Kaun sa edition kis user ke liye?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Har customer ko same complexity ki zarurat nahi hoti. Isi liye
                product family ko alag use cases ke hisab se position kiya gaya hai.
              </p>
            </div>
            {useCases.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 shadow-sm">
            <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">
              Interface Preview
            </h2>
            <p className="mt-4 text-base leading-8 text-indigo-700">
              Clean Windows workflow with production-ready output style. Yeh same
              page ecosystem mein fit hota hai jahan service, utility, aur software
              ek hi trusted brand ke under dikhte hain.
            </p>
            <p className="mt-2 text-sm text-indigo-600">💡 Click any image to view full size</p>
            <div className="mt-8 grid gap-6 md:grid-cols-1 lg:grid-cols-3">
              <button
                onClick={() => setSelectedImage({src: sampleFront, alt: "Interface Preview 1"})}
                className="group rounded-2xl border border-blue-200 bg-white shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Image
                  src={sampleFront}
                  alt="Interface Preview 1"
                  className="w-full h-80 object-cover group-hover:brightness-110 transition-all"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-2xl" />
              </button>
              <button
                onClick={() => setSelectedImage({src: proMain, alt: "Interface Preview 2 - Pro"})}
                className="group rounded-2xl border border-indigo-300 bg-indigo-50 shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Image
                  src={proMain}
                  alt="Interface Preview 2 - Pro"
                  className="w-full h-80 object-cover group-hover:brightness-110 transition-all"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-2xl" />
              </button>
              <button
                onClick={() => setSelectedImage({src: proSetter, alt: "Interface Preview 3 - Template"})}
                className="group rounded-2xl border border-purple-300 bg-purple-50 shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Image
                  src={proSetter}
                  alt="Interface Preview 3 - Template"
                  className="w-full h-80 object-cover group-hover:brightness-110 transition-all"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-2xl" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Production-Ready Output Quality
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Professional cropping aur consistent output har document type ke liye. Aadhaar, PAN, Voter ID, ya koi bhi custom format - sab ko perfectly handle karta hai.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-blue-100 bg-blue-50 p-8 shadow-sm hover:shadow-lg transition-all">
            <h3 className="font-bold text-blue-900 mb-4">✓ lite Interface</h3>
            <div className="rounded-xl border border-blue-200 bg-white h-48 overflow-hidden mb-4 flex items-center justify-center">
              <Image
                src={sampleFront}
                alt="Lite version output"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-blue-700">Simple, fast cropping with accurate positioning perfect for daily work.</p>
          </div>

          <div className="group rounded-2xl border border-orange-100 bg-orange-50 p-8 shadow-sm hover:shadow-lg transition-all">
            <h3 className="font-bold text-orange-900 mb-4">✓ Pro Interface</h3>
            <div className="rounded-xl border border-orange-200 bg-white h-48 overflow-hidden mb-4 flex items-center justify-center">
              <Image
                src={proMain}
                alt="Pro version interface"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-orange-700">Professional batch dashboard with full processing controls and queue management.</p>
          </div>

          <div className="group rounded-2xl border border-indigo-100 bg-indigo-50 p-8 shadow-sm hover:shadow-lg transition-all">
            <h3 className="font-bold text-indigo-900 mb-4">✓ Advanced Template Setter</h3>
            <div className="rounded-xl border border-indigo-200 bg-white h-48 overflow-hidden mb-4 flex items-center justify-center">
              <Image
                src={proSetter}
                alt="Pro version template setter"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-indigo-700">Advanced template customization tool with manual region drawing for precise cropping.</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Common buyer questions jo Trial, Lite aur Pro decide karne mein help
            karti hain.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-3 text-base leading-8 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 text-center lg:px-8">
        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-slate-50 p-8 shadow-sm md:p-12">
          <h2 className="text-3xl font-bold text-indigo-900 sm:text-4xl">
            Start with Trial, choose Lite for simple work, ya Pro se full production power lijiye
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-indigo-800">
            PVC Cropper Studio operators aur businesses ko document PDFs se
            PVC-ready crops nikalne mein better speed, consistency, aur workflow
            control deta hai. Ab tools page bhi homepage ki tarah same trust aur
            clarity ke saath present ho raha hai.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => openPlanModal("trial")}
              className="w-full rounded-2xl border border-blue-200 bg-white px-8 py-4 text-base font-bold text-blue-700 transition hover:bg-blue-50 sm:w-auto"
            >
              Test Before You Upgrade
            </button>
            <button
              onClick={() => openPlanModal("lite")}
              className="w-full rounded-2xl bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400 sm:w-auto"
            >
              Get the Simple Fast Version
            </button>
            <button
              onClick={() => openPlanModal("pro")}
              className="w-full rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500 sm:w-auto"
            >
              Get the Complete PVC Cropper Studio
            </button>
          </div>

          <a
            href={supportLink}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackLinkClick({
                eventName: "whatsapp_support_click",
                section: "final_cta",
                label: "WhatsApp Sales Support",
                href: supportLink,
              })
            }
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-200 bg-white px-7 py-3 text-sm font-bold text-indigo-800 transition hover:bg-indigo-50"
          >
            <Phone className="h-4 w-4" />
            WhatsApp Sales Support
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <span className="mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 font-black text-white">
                  C
                </div>
                CSC Wale
              </span>
              <p className="mb-6 max-w-md text-sm text-slate-500">
                PVC Cropper Studio by Nexus Core, trusted digital workflow tools
                aur CSC-friendly software solutions for operators, service centers,
                aur production users.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "internal_link_click",
                      section: "footer",
                      label: "Back to Home",
                      href: "/",
                    })
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Back to Home
                </Link>
                <Link
                  href="/pvc/order"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "internal_link_click",
                      section: "footer",
                      label: "PVC Order Page",
                      href: "/pvc/order",
                    })
                  }
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  PVC Order Page
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
                Software Focus
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>PVC cropper software</li>
                <li>Aadhaar / PAN / Voter ID workflow</li>
                <li>Trial, Lite and Pro editions</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <a
                  href="tel:+919452657508"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "phone_click",
                      section: "footer",
                      label: "Footer Phone Click",
                      href: "tel:+919452657508",
                    })
                  }
                  className="block transition hover:text-slate-900"
                >
                  +91 9452657508
                </a>
                <a
                  href={supportLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "whatsapp_support_click",
                      section: "footer",
                      label: "Footer WhatsApp Support",
                      href: supportLink,
                    })
                  }
                  className="block transition hover:text-slate-900"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {isModalOpen ? (
        <PVCBuyModal
          key={selectedPlan}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPlan={selectedPlan}
        />
      ) : null}
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  MonitorPlay,
  Phone,
  X,
  Zap,
  Shield,
  Layers,
  Target,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Star,
  Clock,
  Monitor,
  Repeat2,
  FileText,
  Award,
  MessageCircle,
  Download,
  Settings,
  Lock,
} from "lucide-react";
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
  tagline: string;
  subtitle: string;
  cta: string;
  ctaIcon: React.ReactNode;
  accent: string;
  accentBg: string;
  border: string;
  audience: string;
  screenshot: any;
  highlights: { text: string; included: boolean }[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: "trial",
    badge: "Evaluation",
    title: "Trial",
    tagline: "Test the workflow before you invest",
    subtitle: "Real feel of the interface, crop quality, and processing — free evaluation.",
    cta: "Download Trial",
    ctaIcon: <Download className="h-4 w-4" />,
    accent: "from-orange-500 to-amber-500",
    accentBg: "bg-orange-50",
    border: "border-orange-200",
    audience: "New users & evaluators",
    screenshot: sampleBatch,
    highlights: [
      { text: "Single-file processing", included: true },
      { text: "One PDF at a time", included: true },
      { text: "20 files in trial lifecycle", included: true },
      { text: "Batch processing", included: false },
      { text: "Manual photo fix", included: false },
      { text: "Template Setter", included: false },
    ],
  },
  {
    id: "lite",
    badge: "Lightweight",
    title: "Lite",
    tagline: "Simple, fast, practical daily work",
    subtitle: "Built for speed on any PC — import, process, crop. No complexity.",
    cta: "Choose Lite",
    ctaIcon: <Zap className="h-4 w-4" />,
    accent: "from-blue-500 to-cyan-500",
    accentBg: "bg-blue-50",
    border: "border-blue-200",
    audience: "Small shops & low-end PCs",
    screenshot: sampleFront,
    highlights: [
      { text: "Fast simple UI", included: true },
      { text: "Lower system load", included: true },
      { text: "Basic batch support", included: true },
      { text: "Easy learning curve", included: true },
      { text: "Manual photo fix", included: false },
      { text: "Template Setter", included: false },
    ],
  },
  {
    id: "pro",
    badge: "Production",
    title: "Pro",
    tagline: "Full professional workflow power",
    subtitle: "Complete business edition — batch, templates, password PDFs, everything.",
    cta: "Upgrade to Pro",
    ctaIcon: <Sparkles className="h-4 w-4" />,
    accent: "from-purple-600 to-indigo-600",
    accentBg: "bg-purple-50",
    border: "border-purple-300",
    audience: "Professionals & service centers",
    screenshot: proMain,
    highlights: [
      { text: "Process Selected & All", included: true },
      { text: "Full batch processing", included: true },
      { text: "Auto template detection", included: true },
      { text: "Manual photo fix", included: true },
      { text: "Integrated Template Setter", included: true },
      { text: "Password PDF handling", included: true },
    ],
    featured: true,
  },
];

const benefits = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "10x Faster Than Manual",
    description:
      "Manual crop mein jitna time lagta hai, PVC Cropper Studio mein uska 1/10th lagta hai.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Pixel-Perfect Consistency",
    description:
      "Har baar same crop position, same output quality. Manual errors zero.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "3 Editions, Perfect Fit",
    description:
      "Trial evaluation ke liye, Lite simple work ke liye, Pro full production ke liye.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Low-End PC Friendly",
    description:
      "Lite edition specially designed hai purane aur slow computers ke liye bhi.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: <Repeat2 className="h-6 w-6" />,
    title: "Batch Processing",
    description:
      "Multiple PDFs ek saath process karein. Pro mein full batch workflow milta hai.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Protected PDF Support",
    description:
      "Password-protected Aadhaar aur PAN PDFs ko bhi directly process karta hai.",
    color: "bg-indigo-100 text-indigo-600",
  },
];

const problems = [
  {
    icon: <Clock className="h-5 w-5" />,
    text: "Manual cropping takes too much time every single day.",
  },
  {
    icon: <Repeat2 className="h-5 w-5" />,
    text: "Repeated crop work creates fatigue and inconsistent output.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    text: "Different document types need repeatable crop positions.",
  },
  {
    icon: <Monitor className="h-5 w-5" />,
    text: "Low-end PCs struggle with heavy photo editing software.",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    text: "No professional tool designed specifically for PVC card cropping.",
  },
];

const comparisonRows = [
  {
    label: "Interface",
    trial: "Simple evaluation",
    lite: "Minimal & fast",
    pro: "Full professional UI",
  },
  {
    label: "Processing",
    trial: "One file at a time",
    lite: "Simple fast processing",
    pro: "Complete production",
  },
  {
    label: "Batch Work",
    trial: "Not available",
    lite: "Basic batch",
    pro: "Full batch workflow",
  },
  {
    label: "Flexibility",
    trial: "Limited",
    lite: "Moderate",
    pro: "Maximum control",
  },
  {
    label: "Photo Fix",
    trial: "Not available",
    lite: "Not included",
    pro: "Full manual fix",
  },
  {
    label: "Best For",
    trial: "Testing & evaluation",
    lite: "Low-end PCs, daily use",
    pro: "Business & production",
  },
];

const galleryImages = [
  {
    src: sampleFront,
    alt: "Lite Edition — Simple cropping interface",
    label: "Lite Interface",
    color: "border-blue-200 bg-blue-50",
    labelColor: "text-blue-700",
  },
  {
    src: proMain,
    alt: "Pro Edition — Full production dashboard",
    label: "Pro Dashboard",
    color: "border-purple-200 bg-purple-50",
    labelColor: "text-purple-700",
  },
  {
    src: proSetter,
    alt: "Template Setter — Advanced crop customization",
    label: "Template Setter",
    color: "border-indigo-200 bg-indigo-50",
    labelColor: "text-indigo-700",
  },
];

const faqs = [
  {
    question: "PVC Cropper Studio kya hai?",
    answer:
      "PVC Cropper Studio ek Windows desktop software hai jo document PDFs (Aadhaar, PAN, Voter ID, etc.) ko PVC-card-size mein fast aur accurately crop karta hai. Manually crop karne ki jagah yeh automated hai.",
  },
  {
    question: "Trial, Lite, aur Pro mein kya difference hai?",
    answer:
      "Trial evaluation ke liye hai (20 files limit). Lite simple daily work ke liye hai — fast UI, low system load. Pro full production edition hai — batch processing, template setter, password PDF support, sab kuch.",
  },
  {
    question: "Kya yeh low-end PC pe chalega?",
    answer:
      "Haan! Lite edition specially purane aur slow computers ke liye designed hai. Minimum system resources use karta hai aur fast workflow deta hai.",
  },
  {
    question: "Kya Trial version production ke liye enough hai?",
    answer:
      "Nahi. Trial version sirf evaluation ke liye hai — 20 files ki limit hai. Daily work ke liye Lite ya Pro lena zaroori hai.",
  },
  {
    question: "Password-protected PDFs support hain?",
    answer:
      "Haan, Pro edition mein password-protected Aadhaar aur PAN PDFs ko directly process karne ki support hai. Lite aur Trial mein yeh feature nahi hai.",
  },
  {
    question: "Software kaise milega? Delivery kaise hogi?",
    answer:
      "WhatsApp pe inquiry karein, humari team aapko pricing, setup instructions, aur software delivery ka poora process samjhayegi. Installation support bhi milta hai.",
  },
  {
    question: "Lite ki jagah Pro kyun lein?",
    answer:
      "Agar aapko batch processing, template setter, manual photo fix, aur password PDF support chahiye — toh Pro lein. Lite simple daily use ke liye better hai, Pro serious business ke liye.",
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
  brand: { "@type": "Brand", name: "Nexus Core" },
  url: "https://cscwale.com/tools",
};

export default function ToolsSalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro");
  const [selectedImage, setSelectedImage] = useState<{
    src: any;
    alt: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    } catch {}
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
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-600 selection:bg-purple-200 selection:text-slate-900">
      {/* Floating WhatsApp Button */}
      <a
        href={supportLink}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          trackLinkClick({
            eventName: "whatsapp_support_click",
            section: "floating_button",
            label: "Floating WhatsApp CTA",
            href: supportLink,
          })
        }
        className="fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110 active:scale-95 animate-whatsapp-pulse"
        aria-label="WhatsApp par enquiry karein"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-purple-200/25 blur-[120px]" />
        <div className="absolute top-[30%] -right-[10%] h-[50%] w-[40%] rounded-full bg-indigo-200/25 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] h-[40%] w-[50%] rounded-full bg-blue-200/20 blur-[150px]" />
      </div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative z-10">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.03] animate-spin-slow" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:py-28 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Hero Text */}
              <div className="text-center lg:text-left">
                <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
                  </span>
                  Windows Desktop Software
                </div>

                <h1 className="animate-fade-in-up delay-100 opacity-0 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08]">
                  PVC Cropper{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                    Studio
                  </span>
                </h1>

                <p className="animate-fade-in-up delay-200 opacity-0 mt-2 text-xl md:text-2xl font-bold text-slate-400">
                  Fast. Reliable. Repeatable.
                </p>

                <p className="animate-fade-in-up delay-300 opacity-0 mt-5 text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Document PDFs se PVC-ready crops nikalein —{" "}
                  <span className="font-bold text-purple-300">
                    10x faster than manual work
                  </span>
                  . Aadhaar, PAN, Voter ID, sab kuch handle karta hai.
                  Trial, Lite, aur Pro editions available.
                </p>

                <div className="animate-fade-in-up delay-400 opacity-0 mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <button
                    onClick={() => openPlanModal("pro")}
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-purple-500/35 active:scale-95"
                  >
                    <Sparkles className="h-5 w-5" />
                    Get Pro Edition
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                      <div className="relative h-full w-8 bg-white/15" />
                    </div>
                  </button>

                  <button
                    onClick={() => openPlanModal("trial")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
                  >
                    <MonitorPlay className="h-5 w-5 text-orange-400" />
                    Try Free Trial
                  </button>
                </div>

                {/* Trust badges */}
                <div className="animate-fade-in-up delay-500 opacity-0 mt-10 inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Monitor className="h-4 w-4 text-purple-400" /> Windows
                    Desktop
                  </div>
                  <div className="w-px h-4 bg-white/15 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Repeat2 className="h-4 w-4 text-blue-400" /> Batch Ready
                  </div>
                  <div className="w-px h-4 bg-white/15 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Lock className="h-4 w-4 text-emerald-400" /> Protected PDF
                  </div>
                </div>
              </div>

              {/* Hero Visual — Software Screenshot */}
              <div className="relative hidden lg:flex items-center justify-center">
                <div className="animate-fade-in-up delay-300 opacity-0 relative">
                  {/* Window frame */}
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 p-[2px] shadow-2xl shadow-purple-500/15">
                    <div className="rounded-2xl bg-slate-900 overflow-hidden">
                      {/* Title bar */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
                        <div className="flex gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-red-500/70" />
                          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
                          <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium ml-2">
                          PVC Cropper Studio — Pro Edition
                        </p>
                      </div>
                      <Image
                        src={proMain}
                        alt="PVC Cropper Studio Pro Interface"
                        className="w-full h-auto"
                        priority
                      />
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 animate-bounce-subtle">
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-500/30 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5" />
                      Most Popular
                    </div>
                  </div>

                  {/* Floating stat */}
                  <div className="absolute -bottom-3 -left-6 animate-pulse-soft">
                    <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      10x Faster
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS STRIP */}
      {/* ============================================ */}
      <section className="relative z-10 -mt-1">
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 py-5 shadow-xl shadow-purple-500/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Layers className="h-5 w-5" />, value: "3", label: "Editions Available" },
                { icon: <Monitor className="h-5 w-5" />, value: "Windows", label: "Desktop Software" },
                { icon: <Repeat2 className="h-5 w-5" />, value: "Batch", label: "Processing Ready" },
                { icon: <Shield className="h-5 w-5" />, value: "Protected", label: "PDF Support" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-lg font-black text-white leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-semibold text-white/70 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROBLEMS SECTION */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-8 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          {/* Left: Problem Statement */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-red-300 mb-5">
                <Clock className="h-3 w-3" />
                The Problem
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                Manual cropping is{" "}
                <span className="text-red-400">slow, tiring,</span> aur{" "}
                <span className="text-red-400">inconsistent</span>
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Har din same documents ko manually crop karna time waste karta
                hai. Output quality inconsistent hota hai aur heavy software
                purane PCs pe nahi chalta.
              </p>
            </div>
          </div>

          {/* Right: Problem Cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {problems.map((problem, idx) => (
              <div
                key={idx}
                className="card-lift group rounded-2xl border border-slate-200 bg-white p-5 hover:border-red-200 hover:shadow-lg hover:shadow-red-50"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    {problem.icon}
                  </div>
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                    {problem.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BENEFITS / WHY CHOOSE */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-600 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            The Solution
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              PVC Cropper Studio?
            </span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Trial evaluation ke liye, Lite simplicity ke liye, aur Pro serious
            production workflow ke liye — har user ke liye perfect fit.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="card-lift group rounded-2xl border border-slate-200 bg-white p-6 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50"
            >
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${benefit.color} transition-transform group-hover:scale-110`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* EDITION CARDS */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">
            <Layers className="h-3.5 w-3.5" />
            Choose Your Edition
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Three Editions, One Perfect Fit
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Testing se production tak — har level ke user ke liye ek edition
            designed hai.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`card-lift group relative overflow-hidden rounded-3xl border-2 transition-all ${
                plan.featured
                  ? "border-purple-300 ring-2 ring-purple-400 ring-offset-4 shadow-xl shadow-purple-100/60 bg-gradient-to-br from-purple-950 via-indigo-900 to-indigo-950 text-white lg:-mt-4 lg:pb-2"
                  : `${plan.border} bg-white hover:shadow-xl`
              }`}
            >
              {/* Glow effect */}
              <div
                className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${
                  plan.featured
                    ? "from-purple-500/20 to-indigo-500/10"
                    : plan.id === "trial"
                    ? "from-orange-200/40 to-amber-100/20"
                    : "from-blue-200/40 to-cyan-100/20"
                } opacity-60 blur-3xl transition-opacity group-hover:opacity-100`}
              />

              {plan.featured && (
                <div className="absolute right-5 top-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div className="relative z-10 p-6 flex flex-col h-full">
                {/* Badge */}
                <div
                  className={`inline-flex w-fit rounded-full bg-gradient-to-r ${plan.accent} px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white`}
                >
                  {plan.badge}
                </div>

                {/* Title */}
                <h3
                  className={`mt-4 text-3xl font-black tracking-tight ${
                    plan.featured ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`mt-1 text-base font-bold ${
                    plan.featured ? "text-purple-200" : "text-slate-700"
                  }`}
                >
                  {plan.tagline}
                </p>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    plan.featured ? "text-indigo-200" : "text-slate-500"
                  }`}
                >
                  {plan.subtitle}
                </p>

                {/* Screenshot */}
                <div
                  className={`mt-5 rounded-xl overflow-hidden border ${
                    plan.featured ? "border-indigo-700" : "border-slate-200"
                  } h-44`}
                >
                  <Image
                    src={plan.screenshot}
                    alt={`${plan.title} edition screenshot`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Best For */}
                <div
                  className={`mt-5 rounded-xl px-4 py-3 text-sm ${
                    plan.featured
                      ? "bg-indigo-900/50 border border-indigo-700 text-indigo-200"
                      : "bg-slate-50 border border-slate-100 text-slate-600"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                      plan.featured ? "text-indigo-400" : "text-slate-400"
                    }`}
                  >
                    Best For:
                  </span>{" "}
                  {plan.audience}
                </div>

                {/* Highlights */}
                <ul className="mt-5 space-y-2.5 flex-1">
                  {plan.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm">
                      {item.included ? (
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            plan.featured
                              ? "text-emerald-400"
                              : "text-emerald-500"
                          }`}
                        />
                      ) : (
                        <X
                          className={`h-4 w-4 shrink-0 ${
                            plan.featured
                              ? "text-indigo-600"
                              : "text-slate-300"
                          }`}
                        />
                      )}
                      <span
                        className={
                          item.included
                            ? plan.featured
                              ? "text-indigo-100"
                              : "text-slate-700"
                            : plan.featured
                            ? "text-indigo-500 line-through"
                            : "text-slate-400 line-through"
                        }
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button — FIXED: uses plan.id instead of hardcoded "pro" */}
                <button
                  onClick={() => openPlanModal(plan.id)}
                  className={`mt-6 group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${plan.accent} px-6 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center justify-center gap-2`}
                >
                  {plan.ctaIcon}
                  {plan.cta}
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover/btn:duration-1000 group-hover/btn:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/15" />
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* COMPARISON TABLE */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Trial vs Lite vs Pro
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Clear comparison — turant samjho kaunsa edition aapke liye sahi hai.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Header */}
              <div className="grid grid-cols-4 bg-slate-900 text-sm font-bold uppercase tracking-wider text-white">
                <div className="px-5 py-4 border-r border-slate-700">
                  Feature
                </div>
                <div className="px-5 py-4 border-r border-slate-700 text-orange-300">
                  Trial
                </div>
                <div className="px-5 py-4 border-r border-slate-700 text-blue-300">
                  Lite
                </div>
                <div className="px-5 py-4 text-purple-300">Pro</div>
              </div>

              {/* Rows */}
              {comparisonRows.map((row, idx) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-4 border-t border-slate-100 text-sm transition-colors hover:bg-slate-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <div className="px-5 py-4 font-bold text-slate-900 border-r border-slate-100">
                    {row.label}
                  </div>
                  <div className="px-5 py-4 text-slate-600 border-r border-slate-100">
                    {row.trial}
                  </div>
                  <div className="px-5 py-4 text-slate-600 border-r border-slate-100 font-medium">
                    {row.lite}
                  </div>
                  <div className="px-5 py-4 text-slate-900 font-bold">
                    {row.pro}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SOFTWARE PREVIEW GALLERY */}
      {/* ============================================ */}
      <section className="relative z-10 bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-4">
              <MonitorPlay className="h-3.5 w-3.5" />
              Software Preview
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Interface Gallery
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Clean Windows workflow with production-ready output. Click any
              image to view full size.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() =>
                  setSelectedImage({ src: img.src, alt: img.alt })
                }
                className={`card-lift group rounded-2xl border ${img.color} p-4 text-left transition-all hover:shadow-xl cursor-pointer`}
              >
                <div className="rounded-xl border border-slate-200 bg-white overflow-hidden h-52 mb-3">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className={`text-sm font-bold ${img.labelColor}`}>
                  {img.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click to enlarge
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ ACCORDION */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            <MessageCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Aksar Pooche Jaane Wale Sawal
          </h2>
          <p className="mt-3 text-slate-500">
            Kuch aur jaanna hai? WhatsApp pe poochein, hum turant jawab denge.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border bg-white overflow-hidden transition-all ${
                openFaq === idx
                  ? "border-purple-200 shadow-lg shadow-purple-50"
                  : "border-slate-200 hover:border-purple-200 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex items-center justify-between gap-4 w-full px-6 py-5 text-left"
              >
                <span className="flex items-center gap-3 font-bold text-slate-900 text-[15px]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 text-xs font-black">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-purple-500" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 ml-10">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-10 md:p-16 text-center overflow-hidden relative">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300 mb-6">
              <Award className="h-3.5 w-3.5" />
              Get Started Today
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Trial se Start Karein,{" "}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                Pro tak Grow Karein
              </span>
            </h2>

            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
              PVC Cropper Studio se document cropping{" "}
              <span className="text-purple-300 font-semibold">
                10x faster
              </span>{" "}
              banayein. Aaj hi apna edition choose karein.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openPlanModal("pro")}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Sparkles className="h-5 w-5" />
                Get Pro Edition
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/15" />
                </div>
              </button>

              <button
                onClick={() => openPlanModal("lite")}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                <Zap className="h-4 w-4 text-blue-400" />
                Choose Lite
              </button>

              <button
                onClick={() => openPlanModal("trial")}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 text-base font-semibold text-slate-400 transition-all hover:text-white hover:border-white/20 active:scale-95"
              >
                <MonitorPlay className="h-4 w-4" />
                Try Free Trial
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
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-purple-300 transition-colors"
            >
              <Phone className="h-4 w-4" />
              WhatsApp Sales Support: +91 9452657508
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <span className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 font-black text-white text-sm">
                  C
                </div>
                CSC Wale
              </span>
              <p className="text-sm text-slate-500 max-w-sm">
                PVC Cropper Studio by Nexus Core — trusted digital workflow
                tools for operators, service centers, aur production users.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "internal_link_click",
                      section: "footer",
                      label: "Home",
                      href: "/",
                    })
                  }
                  className="block text-sm text-slate-500 hover:text-purple-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/pvc"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "internal_link_click",
                      section: "footer",
                      label: "PVC Cards",
                      href: "/pvc",
                    })
                  }
                  className="block text-sm text-slate-500 hover:text-purple-600 transition-colors"
                >
                  PVC Card Printing
                </Link>
                <Link
                  href="/pvc/order"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "internal_link_click",
                      section: "footer",
                      label: "PVC Order",
                      href: "/pvc/order",
                    })
                  }
                  className="block text-sm text-slate-500 hover:text-purple-600 transition-colors"
                >
                  Order PVC Cards
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                Contact
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:+919452657508"
                  onClick={() =>
                    trackLinkClick({
                      eventName: "phone_click",
                      section: "footer",
                      label: "Footer Phone",
                      href: "tel:+919452657508",
                    })
                  }
                  className="block text-sm text-slate-500 hover:text-purple-600 transition-colors"
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
                      label: "Footer WhatsApp",
                      href: supportLink,
                    })
                  }
                  className="block text-sm text-slate-500 hover:text-purple-600 transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
            <p>&copy; 2026 CSC Wale. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-purple-400" />
              PVC Cropper Studio by Nexus Core
            </p>
          </div>
        </div>
      </footer>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="rounded-2xl overflow-hidden bg-white shadow-2xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
            <p className="text-center text-white/70 text-sm mt-3">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      {isModalOpen && (
        <PVCBuyModal
          key={selectedPlan}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPlan={selectedPlan}
        />
      )}
    </main>
  );
}

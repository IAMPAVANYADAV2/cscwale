import Link from "next/link";
import type { Metadata } from "next";
import {
  Sparkles,
  Zap,
  Shield,
  Printer,
  CreditCard,
  Phone,
  CheckCircle2,
  Star,
  ArrowRight,
  ImageIcon,
  FileText,
  Layers,
  Clock,
  Award,
  Crop,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Premium PVC Card Printing | 600 DPI Ultra HD Quality",
  description:
    "CSC Wale - Professional PVC card printing at 600 DPI resolution. Aadhaar, PAN, Voter ID, aur sabhi government IDs ki ultra-sharp PVC cards. Bulk orders, family combos, aur fast delivery available.",
  keywords: [
    "PVC card printing",
    "600 DPI PVC card",
    "high quality PVC card",
    "Aadhaar PVC card",
    "PAN card PVC",
    "Voter ID PVC",
    "PVC card near me",
    "professional PVC printing",
    "bulk PVC cards",
    "CSC PVC service",
  ],
};

const qualityFeatures = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "600 DPI Ultra HD Processing",
    description:
      "Hum har image aur PDF ko 600 DPI resolution par process karte hain — double the industry standard. Isse har text, photo aur detail crystal clear nikalti hai.",
    highlight: true,
  },
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "Advanced Image Enhancement",
    description:
      "Blur, dull ya low resolution photos ko bhi hum enhance karke sharp aur vibrant banate hain. Aapki PVC card nai jaisi dikhti hai.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "PDF to PVC Direct Processing",
    description:
      "Aadhaar, PAN, Voter ID — koi bhi PDF bhejiye, hum directly usme se card-ready output nikalte hain bina quality loss ke.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Premium Card Material",
    description:
      "Thick, durable PVC material use hota hai jo easily 5-7 saal tak chalta hai. Scratch-resistant aur waterproof finish.",
  },
  {
    icon: <Printer className="h-6 w-6" />,
    title: "Professional Grade Printing",
    description:
      "Industrial-grade printer se perfect color reproduction. Government ID cards jaise original jaisi sharper quality milti hai.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Data Security Guaranteed",
    description:
      "Aapke documents aur data ki poori security. Processing ke baad saari files safely delete ki jaati hain.",
  },
];

const pvcTypes = [
  {
    title: "Aadhaar Card PVC",
    description: "Both front & back, full details, QR code clearly visible",
    popular: true,
  },
  {
    title: "PAN Card PVC",
    description: "Photo, signature, aur saari details sharp and clear",
    popular: true,
  },
  {
    title: "Voter ID PVC",
    description: "EPIC number, photo, aur details perfectly printed",
    popular: false,
  },
  {
    title: "Driving License PVC",
    description: "Front & back details, photo, validity dates — sab readable",
    popular: false,
  },
  {
    title: "Student ID / Custom Card",
    description: "School, college ya company ID cards custom design ke saath",
    popular: false,
  },
  {
    title: "Ration Card / Family ID PVC",
    description: "Family details aur photos clearly printed on durable PVC",
    popular: false,
  },
];

const combos = [
  {
    title: "Single Card",
    subtitle: "Koi bhi ek PVC card",
    features: [
      "600 DPI processing",
      "Front + Back printing",
      "Premium PVC material",
      "Same-day processing",
    ],
    accent: "from-sky-500 to-blue-600",
    border: "border-sky-200",
    bg: "from-sky-50 to-blue-50",
  },
  {
    title: "Family Combo",
    subtitle: "4-5 cards ka family set",
    features: [
      "Sabhi cards 600 DPI quality",
      "Mix & match any ID type",
      "Family discount available",
      "Priority processing",
    ],
    accent: "from-amber-500 to-orange-600",
    border: "border-amber-200",
    bg: "from-amber-50 to-orange-50",
    popular: true,
  },
  {
    title: "Bulk Order",
    subtitle: "10+ cards ka business order",
    features: [
      "Maximum savings per card",
      "Dedicated quality check",
      "Fast turnaround guarantee",
      "Free delivery option",
    ],
    accent: "from-emerald-500 to-teal-600",
    border: "border-emerald-200",
    bg: "from-emerald-50 to-teal-50",
  },
];

const steps = [
  {
    number: "01",
    title: "Document Bhejein",
    description:
      "WhatsApp par apna document ya PDF bhejein. Clear photo ya direct PDF dono chalega.",
  },
  {
    number: "02",
    title: "600 DPI Processing",
    description:
      "Humari team 600 DPI par aapke document ko process karegi. Har detail sharp aur clear nikalegi.",
  },
  {
    number: "03",
    title: "Quality Check & Print",
    description:
      "Professional quality check ke baad premium PVC material par print hoga. Colors aur text sharp honge.",
  },
  {
    number: "04",
    title: "Delivery / Pickup",
    description:
      "Tayyar card aapko delivery ya pickup ke through mil jaayega. Safe packaging guaranteed.",
  },
];

export default function PVCPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] rounded-full bg-orange-100/20 blur-[140px]" />
        <div className="absolute top-[30%] -right-[15%] w-[50%] h-[70%] rounded-full bg-blue-100/20 blur-[140px]" />
        <div className="absolute -bottom-[20%] left-[10%] w-[60%] h-[50%] rounded-full bg-amber-100/15 blur-[160px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-amber-400 blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-orange-500 blur-[120px]" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                600 DPI Ultra HD Quality
              </div>

              <h1 className="max-w-4xl text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                Premium PVC Card{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                  Printing Service
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
                Aadhaar, PAN, Voter ID — koi bhi document bhejiye.{" "}
                <span className="font-semibold text-amber-300">
                  600 DPI resolution
                </span>{" "}
                par process karke crystal clear PVC card banate hain. Industry
                standard se double quality.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20PVC%20card%20print%20karana%20hai"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/40 active:scale-95"
                >
                  <Phone className="h-5 w-5" />
                  <span>WhatsApp Par Order Karein</span>
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                    <div className="relative h-full w-8 bg-white/20" />
                  </div>
                </a>

                <Link
                  href="/pvc/order"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
                >
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  Online Order Form
                </Link>

                <Link
                  href="/pvc/cropper"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-emerald-600/20 px-8 py-4 text-base font-semibold text-emerald-300 backdrop-blur-sm transition-all hover:bg-emerald-600/30 hover:border-emerald-400/30 hover:scale-105 active:scale-95"
                >
                  <Crop className="h-5 w-5" />
                  Use Image Cropper
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-14 inline-flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Sparkles className="h-4 w-4 text-amber-400" /> 600 DPI
                  Quality
                </div>
                <div className="w-px h-4 bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Zap className="h-4 w-4 text-emerald-400" /> Same Day
                  Processing
                </div>
                <div className="w-px h-4 bg-white/20 hidden sm:block" />
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Shield className="h-4 w-4 text-blue-400" /> 100% Secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 600 DPI Highlight Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-8 md:p-12 shadow-xl shadow-amber-100/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-200">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                  Kyun Hai Hamari Quality Sabse Alag?
                </h2>
                <p className="text-amber-700 font-semibold">
                  600 DPI = Double the Standard Resolution
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-red-100">
                    <span className="block w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      Normal Quality (300 DPI)
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Text thoda blurry, photos unclear, fine details lost ho
                      jaate hain. Zyaadatar shops yahi quality deti hain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-emerald-100">
                    <span className="block w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      CSC Wale Quality (600 DPI)
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase">
                        Our Standard
                      </span>
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Har ek letter, photo, QR code aur signature — sab kuch
                      razor-sharp nikalte hain. Original document jaisi quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-amber-100/50 to-orange-100/50 border border-amber-200/60">
              <p className="text-sm text-amber-900 font-medium text-center">
                💡 Hum sirf images hi nahi, <strong>PDFs ko bhi 600 DPI par process</strong> karte hain.
                Aadhaar PDF, PAN PDF — koi bhi bhejiye, output crystal clear milega.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Features Grid */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Hamari Processing Quality
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Har card pe mehnat karte hain taaki aapko best result mile. Yahi
            cheez hume sabse alag banati hai.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {qualityFeatures.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                feature.highlight
                  ? "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg shadow-amber-100/50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 right-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Our Specialty
                  </span>
                </div>
              )}
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${
                  feature.highlight
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600 group-hover:bg-amber-50 group-hover:text-amber-600"
                } transition-colors`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PVC Card Types */}
      <section className="relative z-10 bg-gradient-to-b from-slate-900 to-slate-800 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Kaun Kaun Si PVC Cards Banate Hain?
            </h2>
            <p className="mt-4 text-slate-400">
              Sabhi major government IDs aur custom cards — sab kuch milta hai.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pvcTypes.map((type, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
              >
                {type.popular && (
                  <span className="absolute -top-2 right-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase">
                    Popular
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                    <CreditCard className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{type.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Process */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Order Kaise Karein?
          </h2>
          <p className="mt-4 text-slate-600">
            Sirf 4 simple steps mein aapki PVC card ready ho jaayegi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-amber-200 h-full">
                <div className="mb-4 text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-amber-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Combos / Pricing Cards */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Order Options
          </h2>
          <p className="mt-4 text-slate-600">
            Single card se lekar bulk orders tak — sabke liye option hai.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {combos.map((combo, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl border-2 ${combo.border} bg-gradient-to-br ${combo.bg} p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                combo.popular ? "ring-2 ring-amber-400 ring-offset-2" : ""
              }`}
            >
              {combo.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase shadow-sm whitespace-nowrap">
                    <Star className="inline h-3 w-3 mr-1 -mt-0.5" /> Most
                    Popular
                  </span>
                </div>
              )}

              <div
                className={`inline-flex rounded-xl bg-gradient-to-r ${combo.accent} p-3 text-white shadow-sm mb-4`}
              >
                <CreditCard className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-black text-slate-900">
                {combo.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 mb-5">
                {combo.subtitle}
              </p>

              <ul className="space-y-2.5 mb-6">
                {combo.features.map((feature, fidx) => (
                  <li
                    key={fidx}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/919452657508?text=Namaste%2C%20mujhe%20${encodeURIComponent(
                  combo.title
                )}%20PVC%20card%20order%20karna%20hai`}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${combo.accent} px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95`}
              >
                <Phone className="h-4 w-4" />
                WhatsApp Par Order
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-14 text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-5 w-40 h-40 rounded-full bg-amber-400 blur-[80px]" />
            <div className="absolute bottom-5 right-5 w-60 h-60 rounded-full bg-orange-500 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-6">
              <Award className="h-3.5 w-3.5" />
              Trusted by 500+ Customers
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Abhi Order Karein,{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Best Quality Paayein
              </span>
            </h2>

            <p className="text-slate-400 max-w-xl mx-auto mb-8 text-lg">
              WhatsApp par apna document bhejiye aur 600 DPI quality mein sharp,
              durable PVC card paayein. Fast processing aur safe delivery.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20PVC%20card%20banwana%20hai"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-amber-500/30 transition-all hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Now
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
              </a>

              <Link
                href="/pvc/order"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                Order Form
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="tel:+919452657508"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-8 py-4 text-base font-semibold text-slate-400 transition-all hover:text-white hover:border-white/20 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Call: +91 9452657508
              </a>

              <Link
                href="/pvc/cropper"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-8 py-4 text-base font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20 hover:text-emerald-200 active:scale-95 mt-4 sm:mt-0"
              >
                <Crop className="h-4 w-4" />
                Crop Image for PVC
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>Copyright &copy; 2026 CSC Wale. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>
              All cards processed at{" "}
              <strong className="text-amber-600">600 DPI</strong> resolution
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

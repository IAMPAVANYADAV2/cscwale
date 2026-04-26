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
  ChevronDown,
  MapPin,
  AlertTriangle,
  Eye,
  Truck,
  Users,
  Target,
  ShieldCheck,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Premium PVC Card Printing | 600 DPI Ultra HD Quality — CSC Wale",
  description:
    "CSC Wale - Professional PVC card printing at 600 DPI resolution. Aadhaar, PAN, Voter ID, aur sabhi government IDs ki ultra-sharp PVC cards. Same-day processing, family combos, bulk discounts, aur fast delivery available. Jahidpur, UP.",
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
    "PVC card Bhadohi",
    "PVC card Jahidpur",
    "premium PVC card UP",
  ],
  openGraph: {
    title: "Premium PVC Card Printing | 600 DPI Ultra HD",
    description:
      "Crystal clear PVC cards at 600 DPI — double the industry standard. Aadhaar, PAN, Voter ID aur sabhi IDs.",
    type: "website",
  },
};

const problems = [
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Text Blurry & Unreadable",
    hindi: "Card pe likha hua padhne mein mushkil hota hai?",
    description:
      "Normal 300 DPI printing mein text edges jagged aur blurry nikalte hain. Name, number sab dhundla.",
  },
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "Photo Unclear & Dull",
    hindi: "Photo mein face clearly nahi dikh raha?",
    description:
      "Low resolution processing se photos pixelated ho jaati hain. Face recognition mushkil ho jaata hai.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "QR Code Scan Nahi Hota",
    hindi: "Aadhaar ka QR code kaam nahi kar raha?",
    description:
      "Poor quality printing se QR codes aur barcodes properly scan nahi hote. Verification fail ho jaata hai.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Card Jaldi Kharab Ho Jaati Hai",
    hindi: "Kuch hi mahine mein card ka haal bura ho jaata hai?",
    description:
      "Cheap material aur coating se card pe scratches aur fading jaldi aa jaati hai. Paise waste.",
  },
];

const qualityFeatures = [
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: "600 DPI Ultra HD Processing",
    description:
      "Har image aur PDF ko 600 DPI par process karte hain — double the industry standard. Har text, photo aur detail crystal clear.",
    highlight: true,
    span: true,
  },
  {
    icon: <ImageIcon className="h-6 w-6" />,
    title: "Advanced Image Enhancement",
    description:
      "Blur ya low-res photos ko enhance karke sharp aur vibrant banate hain. Card nai jaisi dikhti hai.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "PDF Direct Processing",
    description:
      "Aadhaar, PAN — koi bhi PDF bhejiye. Directly card-ready output bina quality loss ke.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Premium PVC Material",
    description:
      "Thick, durable material jo 5-7 saal chalti hai. Scratch-resistant aur waterproof finish.",
  },
  {
    icon: <Printer className="h-6 w-6" />,
    title: "Professional Grade Printing",
    description:
      "Industrial-grade printer se perfect color reproduction. Original document jaisi quality milti hai.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "100% Data Security",
    description:
      "Aapke documents ki poori security. Processing ke baad saari files safely delete hoti hain.",
  },
];

const pvcTypes = [
  {
    title: "Aadhaar Card PVC",
    description: "Front & back, QR code clearly visible, photo sharp",
    popular: true,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "PAN Card PVC",
    description: "Photo, signature, aur saari details razor-sharp",
    popular: true,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Voter ID PVC",
    description: "EPIC number, photo aur details perfectly printed",
    popular: false,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Driving License PVC",
    description: "Front & back, photo, validity dates — sab readable",
    popular: false,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Student / Custom ID PVC",
    description: "School, college ya company ID custom design ke saath",
    popular: false,
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Ration Card / Family ID",
    description: "Family details aur photos clearly printed on durable PVC",
    popular: false,
    color: "from-cyan-500 to-sky-500",
  },
];

const steps = [
  {
    number: "01",
    title: "Document Bhejein",
    description:
      "WhatsApp par apna document ya PDF bhejein. Clear photo ya direct PDF dono chalega.",
    icon: <MessageCircle className="h-6 w-6" />,
  },
  {
    number: "02",
    title: "600 DPI Processing",
    description:
      "Humari team 600 DPI par aapke document ko process karegi. Har detail sharp nikalegi.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    number: "03",
    title: "Quality Check & Print",
    description:
      "Professional quality check ke baad premium PVC material par print hoga.",
    icon: <Printer className="h-6 w-6" />,
  },
  {
    number: "04",
    title: "Delivery / Pickup",
    description:
      "Tayyar card delivery ya pickup ke through mil jaayegi. Safe packaging guaranteed.",
    icon: <Truck className="h-6 w-6" />,
  },
];

const combos = [
  {
    title: "Single Card",
    subtitle: "Koi bhi ek PVC card",
    features: [
      "600 DPI HD processing",
      "Front + Back printing",
      "Premium PVC material",
      "Same-day processing",
    ],
    accent: "from-sky-500 to-blue-600",
    iconBg: "bg-sky-100 text-sky-600",
    border: "border-sky-200 hover:border-sky-300",
    shadow: "hover:shadow-sky-100",
  },
  {
    title: "Family Combo",
    subtitle: "4-5 cards ka family set",
    features: [
      "Sabhi cards 600 DPI quality",
      "Mix & match any ID type",
      "Family discount included",
      "Priority processing",
      "Free quality check",
    ],
    accent: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 text-amber-600",
    border: "border-amber-300 hover:border-amber-400",
    shadow: "hover:shadow-amber-100",
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
    iconBg: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-200 hover:border-emerald-300",
    shadow: "hover:shadow-emerald-100",
  },
];

const stats = [
  { value: "600", suffix: "DPI", label: "Ultra HD Resolution", icon: <Sparkles className="h-5 w-5" /> },
  { value: "500", suffix: "+", label: "Cards Delivered", icon: <BadgeCheck className="h-5 w-5" /> },
  { value: "Same", suffix: "Day", label: "Fast Processing", icon: <Zap className="h-5 w-5" /> },
  { value: "5-7", suffix: "Yr", label: "Card Durability", icon: <Shield className="h-5 w-5" /> },
];

const faqs = [
  {
    question: "PVC card kitne din mein ready hoti hai?",
    answer:
      "Single card same-day processing mein ready ho jaati hai. Family combo 1-2 din mein, aur bulk orders 2-3 din mein ready hote hain. Urgent orders ke liye WhatsApp karein.",
  },
  {
    question: "600 DPI kya hota hai? Isme kya farak padta hai?",
    answer:
      "DPI matlab Dots Per Inch — jitne zyada dots, utni sharp image. Normal shops 300 DPI use karti hain, hum 600 DPI use karte hain — matlab double the detail. Isliye humari cards pe text aur photos crystal clear nikalte hain.",
  },
  {
    question: "Kya WhatsApp pe photo bhej sakta hoon?",
    answer:
      "Bilkul! WhatsApp pe clear photo ya PDF dono bhej sakte hain. Best results ke liye original PDF bhejein (jaise Aadhaar download PDF). Photo bhi chalega, hum enhance kar dete hain.",
  },
  {
    question: "PDF se bhi PVC card ban sakti hai?",
    answer:
      "Haan, yahi humari specialty hai! Aadhaar PDF, PAN PDF — koi bhi PDF bhejiye. Hum 600 DPI par process karke direct PVC card banate hain. Password-protected PDFs bhi accepted hain.",
  },
  {
    question: "Card kitne saal chalegi?",
    answer:
      "Humari PVC cards premium thick material se bani hoti hain jo 5-7 saal aaram se chalti hain. Scratch-resistant aur waterproof finish hota hai, toh daily use mein bhi safe rahti hai.",
  },
  {
    question: "Delivery available hai?",
    answer:
      "Haan! Local area mein delivery available hai. Bulk orders (10+ cards) pe free delivery milti hai. Baaki orders ke liye nominal delivery charge lagta hai. Pickup bhi kar sakte hain humari shop se.",
  },
  {
    question: "Bulk order pe discount milega?",
    answer:
      "Bilkul! 10+ cards ke orders pe special bulk pricing milti hai. Jitne zyada cards, utna better rate. CSC center operators ke liye special business rates bhi available hain. Details ke liye WhatsApp karein.",
  },
];

export default function PVCPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20PVC%20card%20print%20karana%20hai"
        className="fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110 active:scale-95 animate-whatsapp-pulse"
        aria-label="WhatsApp par order karein"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[30%] -left-[15%] w-[60%] h-[60%] rounded-full bg-orange-100/20 blur-[140px]" />
        <div className="absolute top-[40%] -right-[15%] w-[50%] h-[70%] rounded-full bg-blue-100/15 blur-[140px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-amber-100/10 blur-[160px]" />
      </div>

      {/* Offer Banner */}
      <div className="relative z-20 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-center py-2.5 px-4 shimmer-bar">
        <p className="relative z-10 text-sm font-semibold flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <Zap className="h-3.5 w-3.5" />
            Family Combo pe Special Discount!
          </span>
          <a
            href="https://wa.me/919452657508?text=Namaste%2C%20Family%20Combo%20ke%20baare%20mein%20jaankaari%20chahiye"
            className="underline underline-offset-2 font-bold hover:text-amber-100 transition-colors"
          >
            Abhi WhatsApp Karein →
          </a>
        </p>
      </div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative z-10">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
          {/* Hero background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/8 blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/8 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03] animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-500/[0.05] animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "35s" }} />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Hero Text */}
              <div className="text-center lg:text-left">
                <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  600 DPI Ultra HD Quality
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                </div>

                <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] opacity-0">
                  Premium PVC Card{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                    Printing Service
                  </span>
                </h1>

                <p className="animate-fade-in-up delay-200 opacity-0 mt-5 text-lg md:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Aadhaar, PAN, Voter ID — koi bhi document bhejiye.{" "}
                  <span className="font-bold text-amber-300">
                    600 DPI resolution
                  </span>{" "}
                  par crystal clear PVC card banate hain.{" "}
                  <span className="text-white font-semibold">
                    Industry standard se double quality.
                  </span>
                </p>

                {/* CTA Buttons */}
                <div className="animate-fade-in-up delay-300 opacity-0 mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20PVC%20card%20print%20karana%20hai"
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/35 active:scale-95"
                  >
                    <Phone className="h-5 w-5" />
                    <span>WhatsApp Par Order</span>
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                      <div className="relative h-full w-8 bg-white/20" />
                    </div>
                  </a>

                  <Link
                    href="/pvc/order"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
                  >
                    <CreditCard className="h-5 w-5 text-amber-400" />
                    Online Order Form
                  </Link>

                  <Link
                    href="/pvc/cropper"
                    className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-600/15 px-7 py-3.5 text-base font-semibold text-emerald-300 backdrop-blur-sm transition-all hover:bg-emerald-600/25 hover:border-emerald-400/40 hover:scale-105 active:scale-95"
                  >
                    <Crop className="h-5 w-5" />
                    Image Cropper
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="animate-fade-in-up delay-500 opacity-0 mt-10 inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Sparkles className="h-4 w-4 text-amber-400" /> 600 DPI
                  </div>
                  <div className="w-px h-4 bg-white/15 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Zap className="h-4 w-4 text-emerald-400" /> Same Day
                  </div>
                  <div className="w-px h-4 bg-white/15 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Shield className="h-4 w-4 text-blue-400" /> 100% Secure
                  </div>
                  <div className="w-px h-4 bg-white/15 hidden sm:block" />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Award className="h-4 w-4 text-rose-400" /> 500+ Cards
                  </div>
                </div>
              </div>

              {/* Hero Visual — Floating PVC Card */}
              <div className="relative hidden lg:flex items-center justify-center">
                {/* Background card (depth layer) */}
                <div className="absolute -bottom-6 -left-6 animate-float-reverse opacity-30">
                  <div className="w-[300px] h-[190px] rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 p-[2px] shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-900/90" />
                  </div>
                </div>

                {/* Main floating card */}
                <div className="animate-float relative">
                  <div className="w-[380px] h-[240px] rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-[2.5px] shadow-2xl shadow-amber-500/20">
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 p-6 flex flex-col justify-between relative overflow-hidden">
                      {/* Card decorative circles */}
                      <div className="absolute top-3 right-3 w-24 h-24 rounded-full bg-amber-500/5" />
                      <div className="absolute bottom-3 left-3 w-16 h-16 rounded-full bg-orange-500/5" />

                      <div className="relative flex justify-between items-start">
                        <div>
                          <p className="text-[10px] text-amber-400/80 font-bold tracking-[0.2em] uppercase">
                            Premium PVC Card
                          </p>
                          <p className="text-white text-2xl font-black mt-1 tracking-tight">
                            CSC Wale
                          </p>
                        </div>
                        <div className="w-12 h-10 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/10 border border-amber-400/20 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-amber-400" />
                        </div>
                      </div>

                      <div className="relative">
                        <p className="text-slate-500 text-xs tracking-[0.3em] font-mono">
                          XXXX XXXX XXXX 6508
                        </p>
                        <div className="flex justify-between items-end mt-3">
                          <div>
                            <p className="text-[9px] text-slate-600 uppercase tracking-wider">
                              Resolution
                            </p>
                            <p className="text-amber-400 text-lg font-black">
                              600 DPI
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-[9px] text-slate-600 uppercase tracking-wider">
                              Quality
                            </p>
                            <p className="text-emerald-400 text-lg font-black">
                              Ultra HD
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] text-slate-600 uppercase tracking-wider">
                              Durability
                            </p>
                            <p className="text-rose-400 text-lg font-black">
                              5-7 Yr
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-2 animate-bounce-subtle">
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified Quality
                  </div>
                </div>

                {/* Floating stat */}
                <div className="absolute -bottom-2 -right-8 animate-pulse-soft">
                  <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                    500+ Happy Customers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce-subtle">
            <ChevronDown className="h-5 w-5 text-slate-500" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS STRIP */}
      {/* ============================================ */}
      <section className="relative z-10 -mt-1">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 py-6 shadow-xl shadow-orange-500/10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 justify-center md:justify-start"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-black text-white leading-none">
                      {stat.value}
                      <span className="text-sm font-bold text-white/80 ml-0.5">
                        {stat.suffix}
                      </span>
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
      {/* PROBLEM SECTION */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500 mb-4">
            <AlertTriangle className="h-3.5 w-3.5" />
            Common Problems
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Kya Aapko Bhi Ye{" "}
            <span className="text-red-500">Problem</span> Hoti Hai?
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Zyaadatar shops 300 DPI pe print karti hain — isliye ye problems
            aati hain. Aap akele nahi hain.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {problems.map((problem, idx) => (
            <div
              key={idx}
              className="card-lift group rounded-2xl border-2 border-red-100 bg-gradient-to-br from-red-50/80 via-white to-orange-50/50 p-6 hover:border-red-200 hover:shadow-lg hover:shadow-red-50"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  {problem.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {problem.title}
                  </h3>
                  <p className="text-amber-700 text-sm font-semibold mt-0.5">
                    {problem.hindi}
                  </p>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* 600 DPI SOLUTION SECTION */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-8 md:p-12 shadow-2xl shadow-amber-100/60 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-200/30 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-tr-full" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Our Solution
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Hamara{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  600 DPI
                </span>{" "}
                Solution
              </h2>
              <p className="mt-2 text-amber-700 font-semibold text-lg">
                Double Resolution = Double Clarity
              </p>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Normal Quality */}
              <div className="rounded-2xl border-2 border-red-200/80 bg-white/80 p-6 relative overflow-hidden">
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase">
                  Others
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-500">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg">300 DPI</p>
                    <p className="text-red-500 text-xs font-semibold">
                      Normal Quality
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Text blurry aur jagged edges",
                    "Photos pixelated aur dull",
                    "QR code scan nahi hota",
                    "Colors faded dikhte hain",
                    "Details lost ho jaate hain",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CSC Wale Quality */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 to-white p-6 relative overflow-hidden shadow-lg shadow-emerald-100/50 ring-2 ring-emerald-400/20 ring-offset-2">
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase flex items-center gap-1">
                  <Star className="h-2.5 w-2.5" />
                  CSC Wale
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-lg">600 DPI</p>
                    <p className="text-emerald-600 text-xs font-semibold">
                      Ultra HD Quality
                    </p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Text razor-sharp aur crystal clear",
                    "Photos vibrant aur lifelike",
                    "QR code 100% scannable",
                    "Colors rich aur accurate",
                    "Har detail perfectly visible",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-amber-100/60 to-orange-100/60 border border-amber-200/60 max-w-3xl mx-auto">
              <p className="text-sm text-amber-900 font-medium text-center">
                Hum sirf images hi nahi,{" "}
                <strong>PDFs ko bhi 600 DPI par process</strong> karte hain.
                Aadhaar PDF, PAN PDF — koi bhi bhejiye, output crystal clear
                milega.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* QUALITY FEATURES — BENTO GRID */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
            <Award className="h-3.5 w-3.5" />
            Our Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Hamari Processing Quality
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Har card pe mehnat karte hain taaki aapko best result mile. Yahi
            cheez hume sabse alag banati hai.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {qualityFeatures.map((feature, idx) => (
            <div
              key={idx}
              className={`card-lift group relative rounded-2xl border p-6 ${
                feature.highlight
                  ? "md:col-span-2 lg:col-span-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-lg shadow-amber-100/50"
                  : "border-slate-200 bg-white hover:border-amber-200 hover:shadow-lg hover:shadow-amber-50"
              }`}
            >
              {feature.highlight && (
                <div className="absolute -top-3 right-5">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Our Specialty
                  </span>
                </div>
              )}
              <div
                className={`mb-4 inline-flex rounded-xl p-3 transition-all ${
                  feature.highlight
                    ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200"
                    : "bg-slate-100 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-600"
                }`}
              >
                {feature.icon}
              </div>
              <h3
                className={`font-bold text-slate-900 mb-2 ${
                  feature.highlight ? "text-xl" : "text-lg"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-slate-600 leading-relaxed ${
                  feature.highlight ? "text-base" : "text-sm"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* PVC CARD TYPES */}
      {/* ============================================ */}
      <section className="relative z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 overflow-hidden">
        {/* Section background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-amber-500/10 blur-[100px]" />
          <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full bg-orange-500/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">
              <CreditCard className="h-3.5 w-3.5" />
              Card Types
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Kaun Kaun Si{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                PVC Cards
              </span>{" "}
              Banate Hain?
            </h2>
            <p className="mt-3 text-slate-400 max-w-lg mx-auto">
              Sabhi major government IDs aur custom cards — premium 600 DPI
              quality mein.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pvcTypes.map((type, idx) => (
              <div
                key={idx}
                className="card-lift group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20"
              >
                {type.popular && (
                  <span className="absolute -top-2.5 right-4 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase shadow-md">
                    Popular
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${type.color} text-white shadow-lg`}
                  >
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-amber-300 transition-colors">
                      {type.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA inside dark section */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4 text-sm">
              Aapka document list mein nahi hai? Koi baat nahi — hum custom
              cards bhi banate hain!
            </p>
            <a
              href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20custom%20PVC%20card%20banwana%20hai"
              className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-6 py-3 text-sm font-bold text-amber-300 transition-all hover:bg-amber-500/20 hover:border-amber-400/50 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Custom Card Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW TO ORDER — TIMELINE */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
            <Clock className="h-3.5 w-3.5" />
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Order Kaise Karein?
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Sirf 4 simple steps mein aapki premium PVC card ready ho jaayegi.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="card-lift rounded-2xl border border-slate-200 bg-white p-6 h-full hover:border-amber-200 hover:shadow-xl hover:shadow-amber-50">
                {/* Step number */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200/50">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {/* Arrow connector (desktop only) */}
              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-amber-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING / COMBO CARDS */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">
            <Star className="h-3.5 w-3.5" />
            Order Options
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            Aapke Liye{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Best Options
            </span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Single card se lekar bulk orders tak — sabke liye option hai.
            WhatsApp pe rate poochein.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 items-start">
          {combos.map((combo, idx) => (
            <div
              key={idx}
              className={`card-lift relative rounded-3xl border-2 ${combo.border} bg-white p-7 transition-all ${combo.shadow} ${
                combo.popular
                  ? "ring-2 ring-amber-400 ring-offset-4 shadow-xl shadow-amber-100/50 md:-mt-4 md:pb-9"
                  : "hover:shadow-xl"
              }`}
            >
              {combo.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase shadow-lg shadow-amber-500/30 whitespace-nowrap flex items-center gap-1.5">
                    <Star className="h-3 w-3" /> Sabse Popular
                  </span>
                </div>
              )}

              <div
                className={`inline-flex rounded-xl p-3 ${combo.iconBg} mb-4`}
              >
                <CreditCard className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-black text-slate-900">
                {combo.title}
              </h3>
              <p className="text-sm text-slate-500 mt-1 mb-6">
                {combo.subtitle}
              </p>

              <ul className="space-y-3 mb-7">
                {combo.features.map((feature, fidx) => (
                  <li
                    key={fidx}
                    className="flex items-center gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/919452657508?text=Namaste%2C%20mujhe%20${encodeURIComponent(
                  combo.title
                )}%20PVC%20card%20order%20karna%20hai`}
                className={`group relative w-full inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r ${combo.accent} px-5 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95`}
              >
                <Phone className="h-4 w-4" />
                WhatsApp Par Order
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Price note */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Exact pricing ke liye WhatsApp par message karein. Bulk orders pe
          special rates available.
        </p>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <section className="relative z-10 bg-gradient-to-b from-slate-50 to-white py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
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
              <details
                key={idx}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-amber-200 hover:shadow-md"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 font-bold text-slate-900 text-[15px]">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 text-xs font-black">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-slate-400 group-hover:text-amber-500" />
                </summary>
                <div className="px-6 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-0 pt-4 ml-10">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* IMAGE CROPPER TOOL PROMO */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-8 md:p-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-bl-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-200">
              <Crop className="h-8 w-8" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xl font-black text-slate-900">
                Free PVC Image Cropper Tool
              </h3>
              <p className="text-slate-600 mt-1 text-sm leading-relaxed max-w-lg">
                Apni photo ko PVC card ke perfect size mein crop karein — bilkul
                free! Standard PVC dimensions (85.6mm x 53.98mm) ke liye optimized.
              </p>
            </div>
            <Link
              href="/pvc/cropper"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200/50 transition-all hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Crop className="h-4 w-4" />
              Cropper Open Karein
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA SECTION */}
      {/* ============================================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-10 md:p-16 text-center overflow-hidden relative">
          {/* CTA background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-amber-500/10 blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/[0.03]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-6">
              <Award className="h-3.5 w-3.5" />
              Trusted by 500+ Customers
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Abhi Order Karein,{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Best Quality Paayein
              </span>
            </h2>

            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
              WhatsApp par apna document bhejiye aur{" "}
              <span className="text-amber-300 font-semibold">
                600 DPI quality
              </span>{" "}
              mein sharp, durable PVC card paayein.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/919452657508?text=Namaste%2C%20mujhe%20PVC%20card%20banwana%20hai"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-amber-500/35 active:scale-95"
              >
                <Phone className="h-5 w-5" />
                WhatsApp Now
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
              </a>

              <Link
                href="/pvc/order"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
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
            </div>

            {/* Location info */}
            <div className="mt-10 inline-flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>
                Jahidpur, Bhadohi, UP — Near Banarasi Tent House, NH 135-A
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="relative z-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>&copy; 2026 CSC Wale. All rights reserved.</p>
            <Link
              href="/"
              className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              Home
            </Link>
          </div>
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

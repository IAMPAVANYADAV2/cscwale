import React from "react";
import Link from "next/link";
import {
  FileText,
  CreditCard,
  Printer,
  Briefcase,
  IndianRupee,
  ImageIcon,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  MonitorPlay,
  FileCheck,
  Landmark,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  HeartHandshake
} from "lucide-react";

const services = [
  {
    category: "Praman Patra (Certificates)",
    icon: <Award className="mb-3 h-8 w-8 text-fuchsia-400" />,
    description: "Ayush, Jati, aur Niwas praman patra (UP).",
    color: "from-fuchsia-500/20 to-pink-500/5",
    border: "border-fuchsia-500/20",
    items: [
      { name: "Income Certificate (Aay)", status: "days" },
      { name: "Caste Certificate (Jati)", status: "days" },
      { name: "Domicile Certificate (Niwas)", status: "days" },
      { name: "Certificate Download", status: "instant" },
    ],
  },
  {
    category: "Sarkari Dastavez (Govt IDs)",
    icon: <ShieldCheck className="mb-3 h-8 w-8 text-blue-400" />,
    description: "Aadhaar, PAN, Voter ID, Ration Card aur anya ID proofs.",
    color: "from-blue-500/20 to-cyan-500/5",
    border: "border-blue-500/20",
    items: [
      { name: "New PAN / Correction", status: "days" },
      { name: "New Voter ID / Correction", status: "days" },
      { name: "Ration Card Apply / Add Name", status: "days" },
      { name: "Family ID Registration", status: "days" },
      { name: "UDID Card (Divyang)", status: "days" },
    ],
  },
  {
    category: "Printing & PVC",
    icon: <Printer className="mb-3 h-8 w-8 text-emerald-400" />,
    description: "High quality PVC cards aur photo printing services.",
    color: "from-emerald-500/20 to-teal-500/5",
    border: "border-emerald-500/20",
    items: [
      { name: "PVC Card Printing", status: "instant" },
      { name: "Direct PVC Printing Service", status: "instant" },
      { name: "Passport Size Photos", status: "instant" },
      { name: "A4 Size Photos", status: "instant" },
      { name: "Lamination & Print", status: "instant" },
    ],
  },
  {
    category: "Student & Jobs",
    icon: <BookOpen className="mb-3 h-8 w-8 text-amber-400" />,
    description: "Resume, online forms, aur scholarship aavedan.",
    color: "from-amber-500/20 to-orange-500/5",
    border: "border-amber-500/20",
    items: [
      { name: "Online Form Filling", status: "instant" },
      { name: "Auto Format Resume", status: "instant" },
      { name: "Custom Resume Creation", status: "days" },
      { name: "Scholarship Form (UP)", status: "days" },
    ],
  },
  {
    category: "Pension & Yojana",
    icon: <HeartHandshake className="mb-3 h-8 w-8 text-rose-400" />,
    description: "Sarkari yojanaayein aur pension schemes.",
    color: "from-rose-500/20 to-red-500/5",
    border: "border-rose-500/20",
    items: [
      { name: "Kanya Sumangala Yojana", status: "days" },
      { name: "Old Age Pension", status: "days" },
      { name: "Widow / Divyang Pension", status: "days" },
      { name: "E-Shram Card", status: "instant" },
      { name: "Yuva Udyami Yojana", status: "days" },
    ],
  },
  {
    category: "Digital & Editing",
    icon: <ImageIcon className="mb-3 h-8 w-8 text-indigo-400" />,
    description: "Image, PDF editing aur photo album designing.",
    color: "from-indigo-500/20 to-violet-500/5",
    border: "border-indigo-500/20",
    items: [
      { name: "PDF Editing", status: "instant" },
      { name: "Image Editing", status: "instant" },
      { name: "Text/Graphics Mod in Images", status: "days" },
      { name: "Photo Album Designing", status: "days" },
    ],
  },
  {
    category: "Business & Tools",
    icon: <MonitorPlay className="mb-3 h-8 w-8 text-cyan-400" />,
    description: "CSC VLE aur businesses ke liye smart tools.",
    color: "from-cyan-500/20 to-sky-500/5",
    border: "border-cyan-500/20",
    items: [
      { name: "CSC Automation Tools", status: "instant" },
      { name: "Billing & Invoice Generation", status: "instant" },
      { name: "Data Entry Work", status: "days" },
      { name: "System Status AI", status: "future" },
    ],
  },
];

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CSC Wale",
  alternateName: "ICS CSC & Jan Sewa Kendra Jahidpur",
  telephone: "+91-9452657508",
  email: "iampavanyadav@gmail.com",
  areaServed: "Jahidpur, Uttar Pradesh, India",
  url: "https://cscwale.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Jahidpur Gharwanpur Mathurapur, Post Nai Bazar, Landmark: Banarasi Tent House, NH 135-A (Bypass Road)",
    addressLocality: "Nai Bazar",
    addressRegion: "Uttar Pradesh",
    postalCode: "221401",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.40421260879675,
    longitude: 82.57956408778885,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-900/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8 lg:pt-32 lg:pb-28">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-300 backdrop-blur-md mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Trusted Local Digital Center
          </div>
          
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl drop-shadow-sm mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">CSC Wale</span>
          </h1>
          
          <p className="max-w-2xl text-lg text-slate-400 md:text-xl mb-10 leading-relaxed">
            Aapke sabhi digital kaam ka ek bharosemand sthan. Fast processing, 
            transparent pricing, aur government-ready support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919452657508"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 px-8 py-4 text-base font-bold text-slate-900 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.5)] active:scale-95"
            >
              <Phone className="h-5 w-5" />
              <span>WhatsApp Now</span>
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                <div className="relative h-full w-8 bg-white/20" />
              </div>
            </a>
            
            <Link
              href="/pvc/order"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 shadow-xl"
            >
              <CreditCard className="h-5 w-5 text-cyan-400" />
              Order PVC Card
            </Link>

            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105 active:scale-95 shadow-xl"
            >
              <MonitorPlay className="h-5 w-5 text-fuchsia-400" />
              Explore Tools
            </Link>
          </div>

          <div className="mt-16 inline-flex items-center gap-6 rounded-2xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 100% Secure
            </div>
            <div className="w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock className="h-4 w-4 text-amber-400" /> Fast Delivery
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="h-4 w-4 text-rose-400" /> Jahidpur, UP
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Hamari Services</h2>
          <p className="mt-4 text-slate-400">Sabhi suvidhayein ek jagah, aapki aasaani ke liye.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((category, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl border ${category.border} bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] hover:shadow-2xl hover:-translate-y-1`}
            >
              <div className={`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${category.color} blur-3xl transition-opacity group-hover:opacity-100 opacity-50`}></div>
              
              <div className="relative z-10">
                {category.icon}
                <h3 className="text-xl font-bold text-white mb-2">{category.category}</h3>
                <p className="text-sm text-slate-400 mb-6 h-10">{category.description}</p>
                
                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <ServiceRow key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Custom Request CTA in Grid */}
          <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6 backdrop-blur-xl md:col-span-2 lg:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:bg-indigo-500/10">
             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50"></div>
             <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Aapka Kaam List Me Nahi Hai?</h3>
                <p className="text-slate-300">Koi bhi custom requirement ho, hume batayein. Hum turant madad karenge.</p>
             </div>
             <a
                href="https://wa.me/919452657508?text=Hello,%20I%20have%20a%20custom%20service%20request."
                className="relative z-10 inline-flex whitespace-nowrap items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-indigo-400 hover:-translate-y-0.5"
              >
                Message Us <ArrowRight className="h-4 w-4" />
              </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-4">
                 <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black">C</div>
                 CSC Wale
              </span>
              <p className="text-sm text-slate-400 max-w-sm mb-6">
                 ICS CSC, Jan Sewa Kendra Jahidpur Gharwanpur Mathurapur, Post Nai Bazar, Dist: Bhadohi, UP 221401. Landmark: Banarasi Tent House, NH 135-A
              </p>
              <div className="flex gap-4">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://wa.me/919452657508" className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors">
                  <span className="sr-only">WhatsApp</span>
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Info</h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-500 shrink-0" />
                  <a href="tel:+919452657508" className="hover:text-white transition-colors">+91 9452657508</a>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-slate-500 shrink-0" />
                  <a href="mailto:iampavanyadav@gmail.com" className="hover:text-white transition-colors break-all">iampavanyadav@gmail.com</a>
                </li>
              </ul>
            </div>

             <div>
               <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Location</h3>
               <div className="rounded-xl overflow-hidden border border-white/10 h-32 relative group">
                 <iframe
                   title="Map"
                   src="https://www.google.com/maps?q=25.40421260879675,82.57956408778885&z=14&output=embed"
                   width="100%"
                   height="100%"
                   className="absolute inset-0 grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                   loading="lazy"
                 />
               </div>
             </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>Copyright &copy; 2026 ICS CSC & Jan Sewa Kendra. All rights reserved.</p>
            <div className="flex gap-4">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
    </main>
  );
}

function ServiceRow({
  item,
}: {
  item: { name: string; status: string };
}) {
  const styles: Record<string, string> = {
    instant: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    days: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    manual: "border-rose-500/20 bg-rose-500/10 text-rose-300",
    future: "border-slate-500/20 bg-white/5 text-slate-400",
  };

  const labels: Record<string, string> = {
    instant: "Instant",
    days: "1-2 Days",
    manual: "Manual",
    future: "Soon",
  };

  const statusStyle = styles[item.status] || styles.future;
  const statusLabel = labels[item.status] || item.status;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm transition hover:bg-white/10">
      <span className="text-slate-200 font-medium">{item.name}</span>
      <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold ${statusStyle}`}>
        {statusLabel}
      </span>
    </div>
  );
}

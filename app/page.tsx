import React from "react";
import Link from "next/link";

const serviceCategories = [
  {
    title: "Identity & Documents",
    icon: "🪪",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
    items: [
      "Aadhaar Related Services",
      "PAN Card Assistance",
      "Voter ID Services",
      "Document Print & Scan",
    ],
  },
  {
    title: "Certificates & Forms",
    icon: "📜",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50/50",
    border: "border-amber-100",
    items: [
      "Income / Caste / Domicile Forms",
      "Birth / Death Certificate",
      "Online Application Submission",
      "Correction & Re-Upload Support",
    ],
  },
  {
    title: "Banking & Transfer",
    icon: "🏦",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
    items: [
      "AEPS Cash Withdrawal",
      "Domestic Money Transfer",
      "Mini Statement & Balance",
      "Micro ATM Support",
    ],
  },
  {
    title: "Payments & Recharge",
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50/50",
    border: "border-purple-100",
    items: [
      "Electricity Bill Payment",
      "Water / Utility Bill Payment",
      "Mobile / DTH Recharge",
      "Fast Digital Receipt Support",
    ],
  },
  {
    title: "Insurance & Pension",
    icon: "🛡️",
    color: "from-rose-500 to-red-500",
    bg: "bg-rose-50/50",
    border: "border-rose-100",
    items: [
      "PMJJBY / PMSBY Enrollment",
      "Atal Pension Yojana Assistance",
      "Vehicle / Health Insurance",
      "Policy Premium Payment",
    ],
  },
  {
    title: "Travel & Ticketing",
    icon: "🚆",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50/50",
    border: "border-indigo-100",
    items: [
      "Rail / Bus / Flight Ticket Booking",
      "Hotel Booking Assistance",
      "Travel Insurance Support",
      "Ticket Print & Cancellation",
    ],
  },
  {
    title: "Education & Exam",
    icon: "🎓",
    color: "from-sky-500 to-blue-400",
    bg: "bg-sky-50/50",
    border: "border-sky-100",
    items: [
      "Scholarship Form Filling",
      "College / University Forms",
      "Exam Registration & Admit Card",
      "Result Print & Document Upload",
    ],
  },
  {
    title: "Government Services",
    icon: "🏛️",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50/50",
    border: "border-orange-100",
    items: [
      "Government Scheme Registration",
      "PM Kisan / Ayushman Card",
      "Jan Sewa Kendra Services",
      "CSC Portal Assistance",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "CSC Wale par kaun kaun si services milti hain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aadhaar, PAN, voter ID, income/caste/domicile certificates, bill payments, PVC card printing/order, CSC tools aur CSC automation related support milta hai.",
      },
    },
    {
      "@type": "Question",
      name: "PVC card aur PVC cropper services available hain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Haan, PVC card printing/order aur PVC cropper (cutting) support available hai.",
      },
    },
    {
      "@type": "Question",
      name: "CSC tools aur automation ke liye help milti hai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CSC tools, CSC automation aur online form submission me assistance milti hai.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-cyan-200 selection:text-cyan-900 font-sans">
      {/* Dynamic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 pb-32 pt-20 md:pb-40 md:pt-32">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen animate-pulse duration-10000"></div>
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px] mix-blend-screen animate-pulse duration-7000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 py-1.5 px-4 text-sm font-medium text-cyan-100 backdrop-blur-md shadow-lg shadow-cyan-900/20">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            Trusted Local Digital Service Center
          </div>

          <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl drop-shadow-2xl">
            CSC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">Wale</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-indigo-100/90 leading-relaxed font-medium">
            Aapke sabhi digital kamo ka ek matra vishwasniya sthan. Document work, online forms, bill payment aur government services tay samay par.
          </p>
          <div className="mt-4 inline-block rounded-xl bg-black/30 px-4 py-2 text-sm font-semibold text-amber-300 backdrop-blur-md border border-white/10 shadow-inner">
            📍 ICS CSC & Jan Sewa Kendra Jahidpur
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/919452657508"
              className="group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/40 hover:from-emerald-400 hover:to-teal-400 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span>WhatsApp Us</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/pvc/order"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50 hover:shadow-cyan-100/50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              🛠️ Order PVC Card
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white/30 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Explore CSC Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="relative z-20 -mt-24 mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl border ${cat.border} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white`}
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 transition-transform duration-500 group-hover:scale-150 blur-2xl"></div>
              
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-2xl shadow-lg mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <span className="drop-shadow-md">{cat.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-4">{cat.title}</h3>
              
              <ul className="space-y-3">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                    <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br opacity-70 ${cat.color}"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative background for the dark card */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-300 via-transparent to-transparent"></div>
          
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Kyun Chunein CSC Wale?
              </h2>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                Jahidpur, Bhadohi ke logo ka bharosemand sathi. Hamari services fast, transparent aur genuine hain. Koi hidden charges nahi, kiyunki aapka samay aur paisa dono keemti hain.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 text-xl">⏳</div>
                  <div>
                    <h4 className="font-semibold text-white">Fast Processing</h4>
                    <p className="text-sm text-slate-400">Turant kaam</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl">🤝</div>
                  <div>
                    <h4 className="font-semibold text-white">Trustworthy</h4>
                    <p className="text-sm text-slate-400">Sahi margdarshan</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "PVC Card Printing", "Income Certificate", "CSC Tools Setup", 
                  "Aadhaar Update Help", "PAN Card Online", "Voter ID Card",
                  "Digital Seva", "Utility Bill Pay"
                ].map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location and Contact Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact details */}
          <div className="rounded-[2.5rem] bg-indigo-50/50 p-8 sm:p-12 border border-indigo-100/60 shadow-lg shadow-indigo-100/20 transition-all hover:shadow-xl hover:bg-indigo-50">
            <h2 className="text-3xl font-bold text-indigo-950 mb-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">📞</span>
              Contact Us
            </h2>
            <ul className="space-y-6 text-lg text-slate-700">
              <li className="flex gap-4">
                <span className="text-indigo-400 mt-1">🏢</span>
                <div>
                  <strong className="block text-slate-900">Shop Name</strong>
                  ICS CSC, Jan Sewa Kendra Jahidpur
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-indigo-400 mt-1">📍</span>
                <div>
                  <strong className="block text-slate-900">Address</strong>
                  Jahidpur Gharwanpur Mathurapur, Post Nai Bazar, Dist: Bhadohi, UP 221401
                  <br/>
                  <span className="text-sm text-slate-500 mt-1 block">Landmark: Banarasi Tent House, NH 135-A</span>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-emerald-500 text-xl">📱</span>
                <div>
                  <a href="tel:+919452657508" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors text-xl">
                    +91 9452657508
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-rose-400 text-xl">✉️</span>
                <div>
                  <a href="mailto:iampavanyadav@gmail.com" className="font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                    iampavanyadav@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 group relative">
            <iframe
              title="ICS CSC and Jan Sewa Kendra Jahidpur Map"
              src="https://www.google.com/maps?q=25.40421260879675,82.57956408778885&z=16&output=embed"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full min-h-[400px] grayscale-[20%] contrast-[1.1] opacity-90 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute top-4 right-4 z-10">
               <a
                href="https://www.google.com/maps?q=25.40421260879675,82.57956408778885"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-bold text-slate-800 shadow-lg transition-transform hover:scale-105"
              >
                Open in Maps ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-bold tracking-tight text-slate-900">CSC Wale</span>
            <p className="mt-2 text-sm text-slate-500">
              © 2026 ICS CSC & Jan Sewa Kendra. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
             <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900">
                fb
             </a>
             <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900">
                ig
             </a>
             <a href="https://wa.me/919452657508" className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition hover:bg-emerald-200 hover:text-emerald-700">
                wa
             </a>
          </div>
        </div>
      </footer>

      {/* SEO Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  );
}

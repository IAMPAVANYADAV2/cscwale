const serviceCategories = [
  {
    title: "Identity & Documents",
    items: [
      "Aadhaar Related Services",
      "PAN Card Assistance",
      "Voter ID Services",
      "Document Print & Scan",
    ],
  },
  {
    title: "Certificates & Forms",
    items: [
      "Income / Caste / Domicile Forms",
      "Birth / Death Certificate Application",
      "Online Application Submission",
      "Correction & Re-Upload Support",
    ],
  },
  {
    title: "Banking & Money Transfer",
    items: [
      "AEPS Cash Withdrawal",
      "Domestic Money Transfer",
      "Mini Statement & Balance Enquiry",
      "Micro ATM Support",
    ],
  },
  {
    title: "Payments & Recharge",
    items: [
      "Electricity Bill Payment",
      "Water / Utility Bill Payment",
      "Mobile / DTH Recharge",
      "Fast Digital Receipt Support",
    ],
  },
  {
    title: "Insurance & Pension",
    items: [
      "PMJJBY / PMSBY Enrollment",
      "Atal Pension Yojana Assistance",
      "Vehicle / Health Insurance Renewal",
      "Policy Premium Payment",
    ],
  },
  {
    title: "Travel & Ticketing",
    items: [
      "Rail / Bus / Flight Ticket Booking",
      "Hotel Booking Assistance",
      "Travel Insurance Support",
      "Ticket Print & Cancellation Help",
    ],
  },
  {
    title: "Education & Exam",
    items: [
      "Scholarship Form Filling",
      "College / University Online Forms",
      "Exam Registration & Admit Card Print",
      "Result Print & Document Upload",
    ],
  },
  {
    title: "Government Services",
    items: [
      "Government Scheme Registration",
      "PM Kisan / Ayushman Card Assistance",
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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="inline-block rounded-full border border-white/30 px-3 py-1 text-sm tracking-wide">
            Trusted Local Digital Service Center
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            CSC Wale
          </h1>
          <p className="mt-4 max-w-3xl text-base text-blue-100 md:text-lg">
            Fast, transparent and reliable CSC services. Document work, online
            forms, bill payment and government services ek hi jagah.
          </p>
          <p className="mt-2 text-sm text-blue-100">
            Branch Name: ICS CSC & Jan Sewa Kendra Jahidpur
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/tools"
              className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              CSC Tools Store
            </a>
            <a
              href="https://wa.me/919452657508"
              className="rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              WhatsApp: 9452657508
            </a>
            <a
              href="tel:+919452657508"
              className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Call Now
            </a>
            <a
              href="mailto:iampavanyadav@gmail.com"
              className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Services by Category</h2>
        <p className="mt-2 text-slate-600">
          Clear categorization se aapko service jaldi milti hai aur process transparent
          rehta hai.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {serviceCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-blue-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Why CSC Wale (Jahidpur, Bhadohi)</h2>
          <p className="mt-3 text-slate-700">
            CSC Wale (ICS CSC & Jan Sewa Kendra Jahidpur) local customers ke liye
            quick document work, government forms, CSC tools aur PVC card services
            provide karta hai. Hamara focus sahi guidance, transparent process aur
            timely delivery par hai.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Popular CSC Services</h2>
          <p className="mt-2 text-slate-600">
            Ye services hamare center par regular basis par available hain. In keywords
            se log online search karte hain, isliye yaha clearly mention kiya gaya hai.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>PVC Card Printing / PVC Card Order</li>
              <li>PVC Cropper (Card Cutting) Support</li>
              <li>CSC Tools Store / CSC Tools Purchase Guidance</li>
              <li>CSC Automation Setup & Support</li>
              <li>eDistrict (Income / Caste / Domicile) Forms</li>
              <li>Income Certificate / Caste Certificate / Domicile Certificate</li>
              <li>Aadhaar Update / Aadhaar Print Services</li>
              <li>PAN Card Application / PAN Correction</li>
            </ul>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Voter ID Services / Voter Card Print</li>
              <li>Electricity Bill Payment / Utility Bill Pay</li>
              <li>Online Form Filling & Document Upload</li>
              <li>Certificate Reprint / Download Help</li>
              <li>CSC Digital Seva Portal Assistance</li>
              <li>Jan Sewa Kendra Services</li>
              <li>Fast Document Scan & Print</li>
              <li>Government Scheme Registration</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Official Contact Details</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>
                <span className="font-semibold">Shop Names:</span> ICS CSC, Jan Sewa
                Kendra Jahidpur
              </li>
              <li>
                <span className="font-semibold">Address:</span> Jahidpur Gharwanpur
                Mathurapur, Post Nai Bazar, Dist: Bhadohi, Uttar Pradesh 221401
              </li>
              <li>
                <span className="font-semibold">Landmark:</span> Banarasi Tent House,
                NH 135-A (Bypass Road)
              </li>
              <li>
                <span className="font-semibold">Phone:</span>{" "}
                <a className="text-blue-700" href="tel:+919452657508">
                  9452657508
                </a>
              </li>
              <li>
                <span className="font-semibold">Email:</span>{" "}
                <a className="text-blue-700" href="mailto:iampavanyadav@gmail.com">
                  iampavanyadav@gmail.com
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Har customer ko proper receipt, clear pricing aur genuine service
              process diya jata hai.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Find Us On Google Maps</h2>
            <p className="mt-3 text-slate-700">
              Map par names search karein: <strong>CSC Wale</strong>,
              <strong> ICS CSC</strong> and
              <strong> Jan Sewa Kendra Jahidpur</strong>.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="ICS CSC and Jan Sewa Kendra Jahidpur Map"
                src="https://www.google.com/maps?q=25.40421260879675,82.57956408778885&z=16&output=embed"
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              className="mt-4 inline-block text-sm font-semibold text-blue-700 underline"
              href="https://www.google.com/maps?q=25.40421260879675,82.57956408778885"
              target="_blank"
              rel="noreferrer"
            >
              Open Exact Location in Google Maps
            </a>
          </article>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-600">
          <p>
            Copyright 2026 CSC Wale. All rights reserved.
          </p>
        </div>
      </footer>

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

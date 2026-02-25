const serviceCategories = [
  {
    title: "Identity & Documents",
    items: [
      "Aadhaar Related Services",
      "PAN Card Assistance",
      "Document Print & Scan",
    ],
  },
  {
    title: "Certificates & Forms",
    items: [
      "Income / Caste / Domicile Forms",
      "Online Application Submission",
      "Correction & Re-Upload Support",
    ],
  },
  {
    title: "Payments & Utility",
    items: [
      "Electricity Bill Payment",
      "Water / Utility Bill Payment",
      "Fast Digital Receipt Support",
    ],
  },
  {
    title: "Government Services",
    items: [
      "Government Scheme Registration",
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
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Official Contact Details</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>
                <span className="font-semibold">Shop Names:</span> ICS CSC, Jan Sewa
                Kendra Jahidpur
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
    </main>
  );
}

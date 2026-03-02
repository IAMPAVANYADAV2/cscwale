const toolCatalog = [
  {
    name: "PVC Cropper Tool",
    category: "Featured Tool",
    type: "Paid",
    price: "Rs 491/year",
    originalPrice: "Rs 1499/year",
    discount: "67% OFF",
    description:
      "Aadhaar, Voter, Ayushman, PAN aur custom ID card ke liye fast crop + print ready workflow.",
  },
  {
    name: "CSC Utility Pack",
    category: "Automation",
    type: "Free + Paid",
    price: "Coming Soon",
    originalPrice: "",
    discount: "",
    description:
      "Automation aur daily CSC tasks ke liye tools yahin par milenge. Free aur premium dono options rahenge.",
  },
];

const keyFeatures = [
  "Aadhaar card PVC crop support",
  "Voter ID crop and alignment",
  "Ayushman card layout ready",
  "PAN card print prep",
  "Any custom ID card template support",
  "Best optimized for Epson L8050 and L18050",
  "Standard PVC size print support",
  "Both side print workflow support",
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_15%_20%,#2563eb_0%,transparent_35%),radial-gradient(circle_at_80%_10%,#0ea5e9_0%,transparent_30%),linear-gradient(120deg,#020617,#0f172a,#111827)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="inline-flex rounded-full border border-cyan-300/50 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-widest text-cyan-200">
            CSC TOOLS STORE
          </p>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            PVC CROPPER TOOL
            <span className="block text-cyan-300">for CSC Professionals</span>
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-300 md:text-base">
            Ek dedicated tool page jahan aapko CSC related automation aur normal work tools milenge. Kuchh tools free honge, kuchh paid.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.3fr_1fr]">
            <article className="rounded-2xl border border-cyan-300/30 bg-slate-900/60 p-6 backdrop-blur">
              <p className="text-sm text-cyan-300">Limited Offer</p>
              <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">Rs 491/year</h2>
              <p className="mt-2 text-sm text-slate-300">
                Actual price <span className="line-through">Rs 1499/year</span>
              </p>
              <p className="mt-2 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                67% OFF
              </p>
              <p className="mt-4 text-sm text-slate-300">
                High-demand tool for ID card crop and print workflow. Fast setup, clean output.
              </p>
              <button className="mt-5 rounded-lg bg-cyan-400 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">
                Buy Now
              </button>
            </article>

            <article className="rounded-2xl border border-white/15 bg-slate-900/60 p-6">
              <h3 className="text-lg font-bold">Best Use Cases</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>Aadhaar PVC card</li>
                <li>Voter ID card</li>
                <li>Ayushman card</li>
                <li>PAN card</li>
                <li>Custom ID card design</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Tool Catalog</h2>
            <p className="mt-2 text-sm text-slate-300">
              Abhi featured tool live hai. Jaldi aur bhi CSC tools add honge.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {toolCatalog.map((tool) => (
            <article
              key={tool.name}
              className="rounded-2xl border border-white/15 bg-slate-900 p-5"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-cyan-400/15 px-3 py-1 font-semibold text-cyan-300">
                  {tool.category}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 font-semibold text-slate-200">
                  {tool.type}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-bold">{tool.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{tool.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-bold text-cyan-300">{tool.price}</span>
                {tool.originalPrice ? (
                  <span className="text-slate-400 line-through">{tool.originalPrice}</span>
                ) : null}
                {tool.discount ? (
                  <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-xs font-bold text-emerald-300">
                    {tool.discount}
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 md:pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/15 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              {keyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/15 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Product Images</h2>
            <p className="mt-2 text-sm text-slate-300">
              Image placeholders ready hain. Aap apni tool screenshots yahan directly replace kar sakte hain.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-cyan-300/40 bg-slate-800/60 text-xs uppercase tracking-wider text-cyan-200">
                Image Slot 1
              </div>
              <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-cyan-300/40 bg-slate-800/60 text-xs uppercase tracking-wider text-cyan-200">
                Image Slot 2
              </div>
              <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-cyan-300/40 bg-slate-800/60 text-xs uppercase tracking-wider text-cyan-200 sm:col-span-2">
                Wide Image Slot (Banner)
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14 md:pb-20">
        <article className="rounded-2xl border border-cyan-300/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">YouTube Demo Video</h2>
          <p className="mt-2 text-sm text-slate-300">
            Is section me aap demo video embed kar sakte hain taaki customer tool ko live dekh sake.
          </p>
          <div className="mt-4 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-cyan-300/50 bg-slate-800/70 text-center text-sm text-cyan-200">
            YouTube Video Placeholder (Paste Embed Link Here)
          </div>
        </article>
      </section>
    </main>
  );
}

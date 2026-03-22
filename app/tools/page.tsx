"use client";

import { useState } from "react";
import Image from "next/image";
import sampleFront from "@/image/pvc_cropper_sample_image/sample.png";
import sampleAlt from "@/image/pvc_cropper_sample_image/sanpme2.png";
import sampleBatch from "@/image/pvc_cropper_sample_image/sample3.png";
import PVCBuyModal from "@/components/PVCBuyModal";

const benefits = [
  "Aadhaar, PAN, Voter ID, Ayushman templates ready.",
  "Batch processing se ek saath multiple PDFs kaam.",
  "Password-protected PDFs support with safe retry handling.",
  "Exact PVC-size output for print workflow.",
  "Easy input/output folder on Desktop.",
  "Licensed software with LIFETIME validity.",
  "Offline use support (internet daily use ke liye required nahi).",
];

const whatsappNumber = "919452657508";
const supportLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  "Namaste, mujhe PVC Cropper Lifetime Tool ke bare me jankari/support chahiye."
)}`;

export default function ToolsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f3f6fc] text-slate-900 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white py-16 md:py-24">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl mix-blend-screen pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
                Premium Tool by Nexus Core
              </p>
            </div>
            
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-[4rem]">
              CSC Operators Ka Bharosa: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-emerald-300 to-green-400">
                Smart PVC Card Cropper
              </span>
            </h1>
            
            <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg leading-relaxed">
              Aadhaar, PAN, Voter ID, Ayushman Card PDFs ko seconds me crop,
              resize aur save karein. Bina internet ke offline use karein.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] items-stretch">
            {/* Pricing Card */}
            <article className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl overflow-hidden group hover:border-emerald-500/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-500 px-6 py-1.5 rounded-bl-2xl rounded-tr-3xl text-xs font-black text-white shadow-lg tracking-wider">
                LIFETIME OFFER
              </div>
              
              <p className="text-sm font-semibold text-emerald-300 mb-2 uppercase tracking-wide">
                Ek Baar Payment, Zindagi Bhar Istemal
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-black text-white md:text-6xl">₹299</p>
                <p className="text-lg font-medium text-slate-400 line-through">₹999</p>
              </div>
              <p className="mt-2 text-sm font-medium text-emerald-400">
                Lifetime License • No Hidden Charges
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Lifetime Access (Koi Renewal Nahi)",
                  "1 System Regular License",
                  "Free Updates & Maintenance",
                  "Priority CSC Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-200 font-medium">
                    <svg className="h-5 w-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-emerald-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Buy Now (LIFETIME ACCESS)
              </button>
            </article>

            {/* Testimonial / Value Prop Card */}
            <article className="rounded-3xl border border-white/5 bg-slate-950/40 p-8 flex flex-col justify-center">
              <div className="flex gap-2 text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h2 className="text-xl font-extrabold text-white leading-snug">
                "Daily ka 2 ghanta bachta hai. Ek saath 50 files lagao aur automatic crop hoke folder me aa jati hai."
              </h2>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  Ye software especially CSC Centers aur Jan Seva Kendras ki daily printing needs ko dhyan me rakh kar banaya gaya hai. Koi extra technical knowledge ki zaroorat nahi.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="bg-white/10 px-3 py-1 rounded-md">100% Secure</span>
                  <span className="bg-white/10 px-3 py-1 rounded-md">Fast Process</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black md:text-4xl text-slate-900">Kyun Chunein Hamara Cropper?</h2>
          <p className="mt-4 text-slate-600 font-medium">Market me sabse fast aur secure batch processing engine.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={index}
              className="group rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:scale-110 transition-all">
                <p className="text-sm font-black text-cyan-600 group-hover:text-white">
                  0{index + 1}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-relaxed">
                {benefit}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Image Previews Section */}
      <section className="bg-slate-900 py-16 md:py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black">Clean & Simple Interface</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {[sampleFront, sampleAlt, sampleBatch].map((img, i) => (
              <article key={i} className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl group relative">
                <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <Image
                  src={img}
                  alt={`Software preview ${i + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24 text-center">
        <div className="rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-8 md:p-12">
          <h2 className="text-3xl font-black text-emerald-900">Ab Manual Cropping Chhodiye!</h2>
          <p className="mt-4 text-lg text-emerald-700 font-medium max-w-2xl mx-auto">
            Aaj hi PVC Cropper ka <b>Lifetime License</b> activate kijiye sirf <b>₹299</b> me aur apne CSC Center ka time aur paisa bachaiye.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto rounded-2xl bg-emerald-600 px-8 py-4 text-base font-black text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-500 hover:-translate-y-1"
            >
              Get License Now (₹299)
            </button>
            <a
              href={supportLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto rounded-2xl bg-white border-2 border-emerald-600 px-8 py-4 text-base font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              WhatsApp Support
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-emerald-600">
            🔒 100% Safe • Instant Setup Support • No Marketing Spam
          </p>
        </div>
      </section>

      {/* Render the extracted Buy Modal */}
      <PVCBuyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </main>
  );
}

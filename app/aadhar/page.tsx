"use client";

import Link from "next/link";
import { FileText, Crop, CheckCircle, Shield } from "lucide-react";

export default function AadharPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <p className="inline-block rounded-full border border-white/30 px-3 py-1 text-sm tracking-wide">
              Identity Verification
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Aadhar Document Management
          </h1>
          <p className="text-lg text-emerald-100 max-w-3xl">
            Professional tools for cropping, optimizing, and managing your Aadhar documents for identity verification purposes.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 rounded-lg p-4 w-fit mb-4">
              <Crop className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Smart Cropping
            </h3>
            <p className="text-slate-600">
              Automatically crop your Aadhar documents to standard specifications with precise dimensions.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 rounded-lg p-4 w-fit mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              High Quality Output
            </h3>
            <p className="text-slate-600">
              Get 300 DPI high-resolution output perfect for verification systems and official requirements.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 rounded-lg p-4 w-fit mb-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Easy Adjustments
            </h3>
            <p className="text-slate-600">
              Scale, rotate, and position your document with intuitive controls before finalizing.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <Link
            href="/aadhar/cropper"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:shadow-lg transition-shadow"
          >
            <Crop className="h-6 w-6" />
            Start Cropping Aadhar Document
          </Link>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Document Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-8 border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                Standard Dimensions
              </h3>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">Width:</span> 88.9mm (3.5 inches)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">Height:</span> 50.8mm (2 inches)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">Aspect Ratio:</span> 1.75:1</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Output Settings
              </h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">Resolution:</span> 300 DPI (Professional Quality)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">Format:</span> PNG with transparency support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><span className="font-medium">File Size:</span> Optimized for web & systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            💡 Tips for Best Results
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li>• Ensure good lighting when capturing your Aadhar document image</li>
            <li>• Keep the document flat and fully visible in the frame</li>
            <li>• Avoid glare and shadows for clearer image quality</li>
            <li>• Use the rotation tool if your document is at an angle</li>
            <li>• Scale the image appropriately to fill the entire cropping area</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState, useRef } from "react";
import { Upload, Crop, RotateCw } from "lucide-react";
import PlanGate from "@/components/PlanGate";

export default function AadharCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Aadhar card standard dimensions
  const aadharDimensions = {
    width: 88.9, // mm (3.5 inches)
    height: 50.8, // mm (2 inches)
    dpi: 300,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCroppedImage(null);
        setScale(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!imageRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Aadhar dimensions in pixels (88.9mm x 50.8mm at 300 DPI)
    const aadharWidth = Math.round((aadharDimensions.width / 25.4) * aadharDimensions.dpi);
    const aadharHeight = Math.round(
      (aadharDimensions.height / 25.4) * aadharDimensions.dpi
    );

    canvas.width = aadharWidth;
    canvas.height = aadharHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Apply rotation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Calculate dimensions to fill the canvas
    const imgWidth = imageRef.current.width * scale;
    const imgHeight = imageRef.current.height * scale;

    // Center the image in the canvas
    const x = -imgWidth / 2;
    const y = -imgHeight / 2;

    ctx.drawImage(imageRef.current, x, y, imgWidth, imgHeight);
    ctx.restore();

    setCroppedImage(canvas.toDataURL("image/png"));
  };

  const handleDownload = () => {
    if (!croppedImage) return;

    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = "aadhar-document-image.png";
    link.click();
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <PlanGate toolSlug="aadhar-cropper">
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="inline-block rounded-full border border-white/30 px-3 py-1 text-sm tracking-wide">
            Document Tool
          </p>
          <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
            Aadhar Document Cropper
          </h1>
          <p className="mt-3 text-emerald-100 max-w-2xl">
            Crop and optimize your Aadhar document images for profile verification (88.9mm × 50.8mm). Perfect for identity verification systems.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Step 1: Upload Document Image
              </h2>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-green-300 rounded-lg p-8 hover:border-green-500 hover:bg-green-50 transition-colors text-center cursor-pointer"
              >
                <div className="space-y-2">
                  <Upload className="h-10 w-10 text-green-600 mx-auto" />
                  <p className="font-semibold text-slate-900">
                    Click to upload Aadhar image
                  </p>
                  <p className="text-sm text-slate-500">
                    PNG, JPG, or WebP (Max 10MB)
                  </p>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {image && (
                <>
                  <div className="mt-6">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Adjustment Controls
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Scale: {scale.toFixed(2)}x
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="3"
                          step="0.1"
                          value={scale}
                          onChange={(e) => setScale(parseFloat(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-700">
                          Rotation: {rotation}°
                        </label>
                        <button
                          onClick={handleRotate}
                          className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 px-4 py-2 font-medium text-slate-700 transition-colors"
                        >
                          <RotateCw className="h-4 w-4" />
                          Rotate 90°
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCrop}
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white hover:shadow-lg transition-shadow"
                  >
                    <Crop className="h-5 w-5" />
                    Crop Aadhar Document
                  </button>
                </>
              )}
            </div>

            {/* Aadhar Specs Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">
                Aadhar Document Specifications
              </h3>
              <div className="space-y-2 text-sm text-green-800">
                <p>
                  <span className="font-medium">Size:</span> 88.9mm × 50.8mm (Standard Document)
                </p>
                <p>
                  <span className="font-medium">Resolution:</span> 300 DPI (High Quality)
                </p>
                <p>
                  <span className="font-medium">Output:</span> PNG format
                </p>
                <p>
                  <span className="font-medium">Use Case:</span> Profile Verification
                </p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Step 2: Preview & Download
              </h2>

              {image && (
                <div className="space-y-4">
                  <div className="bg-slate-100 rounded-lg p-4 overflow-auto max-h-96">
                    <img
                      ref={imageRef}
                      src={image}
                      alt="Original"
                      className="max-w-full h-auto mx-auto"
                      style={{
                        transform: `scale(${scale}) rotate(${rotation}deg)`,
                        transformOrigin: "center",
                      }}
                    />
                  </div>

                  {croppedImage && (
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-slate-900 mb-3">
                        Cropped Result:
                      </h3>
                      <div className="bg-slate-100 rounded-lg p-4 flex justify-center">
                        <img
                          src={croppedImage}
                          alt="Cropped"
                          className="max-w-full h-auto"
                          style={{
                            maxHeight: "300px",
                          }}
                        />
                      </div>

                      <button
                        onClick={handleDownload}
                        className="mt-4 w-full rounded-lg bg-green-600 hover:bg-green-700 px-6 py-3 font-semibold text-white transition-colors"
                      >
                        Download Aadhar Document
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!image && (
                <div className="text-center py-12 text-slate-500">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                  <p>Upload an image to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="bg-slate-100 border-t border-slate-200 mt-12 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="font-semibold text-slate-900 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-medium text-slate-900 mb-2">1. Upload</p>
              <p className="text-sm text-slate-600">Select your Aadhar document image in PNG, JPG, or WebP format</p>
            </div>
            <div>
              <p className="font-medium text-slate-900 mb-2">2. Adjust</p>
              <p className="text-sm text-slate-600">Use scale and rotation controls to position the document correctly</p>
            </div>
            <div>
              <p className="font-medium text-slate-900 mb-2">3. Download</p>
              <p className="text-sm text-slate-600">Crop and download your optimized document image for verification</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </PlanGate>
  );
}

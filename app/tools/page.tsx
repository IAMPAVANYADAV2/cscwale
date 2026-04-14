import type { Metadata } from "next";
import ToolsSalesPage from "@/components/ToolsSalesPage";

export const metadata: Metadata = {
  title: "PVC Cropper Studio | Trial, Lite & Pro",
  description:
    "PVC Cropper Studio by Nexus Core is a Windows desktop software for fast PVC-ready document cropping. Compare Trial, Lite, and Pro editions for Aadhaar, PAN, Voter ID, and batch PVC workflow.",
  keywords: [
    "PVC cropper software",
    "PVC card crop software",
    "Aadhaar PVC crop tool",
    "PAN card crop software",
    "Voter ID crop software",
    "document crop desktop software",
    "PVC card processing software",
    "low-end PC crop software",
    "batch PVC cropper",
    "professional PVC crop software",
  ],
  alternates: {
    canonical: "https://cscwale.com/tools",
  },
  openGraph: {
    title: "PVC Cropper Studio | Trial, Lite & Pro",
    description:
      "Fast, reliable, and repeatable PVC-card-style document cropping for operators and service centers.",
    url: "https://cscwale.com/tools",
    siteName: "CSC Wale",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "PVC Cropper Studio by Nexus Core",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PVC Cropper Studio | Trial, Lite & Pro",
    description:
      "Compare Trial, Lite, and Pro editions of PVC Cropper Studio for low-end PCs to full production workflows.",
    images: ["/icon.png"],
  },
};

export default function ToolsPage() {
  return <ToolsSalesPage />;
}

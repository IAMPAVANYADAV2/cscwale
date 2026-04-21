import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cscwale.com"),
  title: {
    default: "CSC Wale | ICS CSC & Jan Sewa Kendra Jahidpur",
    template: "%s | CSC Wale",
  },
  description:
    "CSC Wale (ICS CSC & Jan Sewa Kendra Jahidpur) - Aadhaar, PAN, voter ID, income/caste/domicile certificate, bill payment, PVC card and CSC tools services.",
  keywords: [
    "CSC Wale",
    "ICS CSC",
    "Jan Sewa Kendra Jahidpur",
    "CSC center",
    "CSC tools",
    "CSC automation",
    "PVC card printing",
    "PVC card order",
    "600 DPI PVC printing",
    "Aadhaar service",
    "PAN card service",
    "Voter ID service",
    "Income certificate",
    "Caste certificate",
    "Domicile certificate",
    "Bhadohi CSC",
  ],
  alternates: {
    canonical: "https://cscwale.com",
  },
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "CSC Wale | ICS CSC & Jan Sewa Kendra Jahidpur",
    description:
      "Trusted CSC and Jan Sewa services for Aadhaar, PAN, certificates, bill payment, PVC card, CSC tools and automation.",
    url: "https://cscwale.com",
    siteName: "CSC Wale",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "CSC Wale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CSC Wale | ICS CSC & Jan Sewa Kendra Jahidpur",
    description:
      "Aadhaar, PAN, certificates, bill payment, PVC card, CSC tools and automation services.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSC Wale | ICS CSC & Jan Sewa Kendra Jahidpur",
  description:
    "CSC Wale (ICS CSC & Jan Sewa Kendra Jahidpur) - trusted CSC and Jan Sewa services for Aadhaar, PAN, online forms, bill payment and government services.",
  keywords: [
    "CSC Wale",
    "ICS CSC",
    "Jan Sewa Kendra Jahidpur",
    "CSC center",
    "Aadhaar service",
    "PAN card service",
    "Bhadohi CSC",
  ],
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
        {children}
      </body>
    </html>
  );
}

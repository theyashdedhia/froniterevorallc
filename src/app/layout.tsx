import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.frontierevora.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Frontier Evora LLC — Premium Solar Balance of System (BOS) Solutions",
    template: "%s | Frontier Evora LLC",
  },
  description:
    "Premium Solar Balance of System (BOS) products for EPCs, installers and developers — mounting structures, cable trays, DC/AC cables, earthing, lightning protection, ACDB/DCDB, combiner boxes and more.",
  keywords: [
    "solar BOS supplier",
    "module mounting structure",
    "cable tray manufacturer",
    "TÜV DC solar cable",
    "solar ACDB DCDB",
    "string combiner box",
    "EPC solar procurement",
  ],
  openGraph: {
    type: "website",
    title: "Frontier Evora LLC — Premium Solar BOS Solutions",
    description: "Your trusted partner for high-grade mounting structures, cabling, and safety systems.",
    url: siteUrl,
    siteName: "Frontier Evora LLC",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

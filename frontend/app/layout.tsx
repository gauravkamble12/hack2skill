import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#FF6B00",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Matdata Mitra | India Election Assistant",
  description: "Your AI-powered guide to Indian elections. Learn how to vote, register, and participate in democracy.",
  keywords: "election, India, voting, ECI, voter registration, Lok Sabha, democracy, matdata mitra",
  manifest: "/manifest.json",
  openGraph: {
    title: "Matdata Mitra | India Election Assistant",
    description: "AI-powered civic education platform for Indian elections — neutral, informative, empowering.",
    type: "website",
    siteName: "Matdata Mitra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matdata Mitra | India Election Assistant",
    description: "AI civic education for 96.8 crore Indian voters.",
  },
};

import { LangProvider } from "@/contexts/LangContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <LangProvider>
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}


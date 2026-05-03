import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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
  alternates: {
    canonical: "https://matdatamitra.in",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Matdata Mitra",
  "description": "AI-powered civic education platform for Indian elections",
  "url": "https://matdatamitra.in",
  "applicationCategory": "Education",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "author": {
    "@type": "Organization",
    "name": "Matdata Mitra",
    "url": "https://matdatamitra.in"
  },
  "featureList": [
    "AI Chatbot for election queries",
    "Voter registration guide",
    "Candidate explorer",
    "Polling booth finder",
    "Election timeline",
    "Multi-language support"
  ]
};

import { LangProvider } from "@/contexts/LangContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ErrorBoundary>
          <AuthProvider>
            <LangProvider>
              <Navbar />
              <main className="main-content" id="main-content">{children}</main>
              <Footer />
            </LangProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}


"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Bot, MapPin, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page" style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        style={{ fontSize: "5rem", marginBottom: "1.5rem" }}
      >
        🗳️
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1 }}
      >
        <span className="gradient-text">404</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ color: "#8896B3", fontSize: "1.1rem", marginTop: "1rem", marginBottom: "2.5rem", maxWidth: "450px" }}
      >
        Oops! This page doesn&apos;t exist. But your vote matters — let&apos;s get you back on track.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Link href="/" className="btn btn-primary">
          <Home size={16} /> Go Home
        </Link>
        <Link href="/chat" className="btn btn-outline">
          <Bot size={16} /> Ask Matdata Mitra
        </Link>
        <Link href="/find-booth" className="btn btn-outline">
          <MapPin size={16} /> Find Booth
        </Link>
        <Link href="/guide" className="btn btn-outline">
          <BookOpen size={16} /> Voter Guide
        </Link>
      </motion.div>
    </div>
  );
}

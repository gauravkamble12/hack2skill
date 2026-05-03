"use client";
import Link from "next/link";
import { ExternalLink, Phone, Mail, Shield, Heart } from "lucide-react";

const govLinks = [
  {
    category: "🏛️ Election Commission",
    links: [
      { label: "ECI Official Portal", url: "https://eci.gov.in", desc: "eci.gov.in" },
      { label: "Voter Registration", url: "https://voters.eci.gov.in", desc: "voters.eci.gov.in" },
      { label: "Know Your Candidate", url: "https://affidavit.eci.gov.in", desc: "affidavit.eci.gov.in" },
      { label: "ECI Results", url: "https://results.eci.gov.in", desc: "results.eci.gov.in" },
    ],
  },
  {
    category: "📋 Voter Services",
    links: [
      { label: "Voter Helpline App", url: "https://ecisveep.nic.in", desc: "ecisveep.nic.in" },
      { label: "National Voter Service Portal", url: "https://www.nvsp.in", desc: "nvsp.in" },
      { label: "Electoral Roll PDF", url: "https://ceomaharashtra.nic.in", desc: "CEO State Portals" },
      { label: "Voter ID Download", url: "https://voters.eci.gov.in/download-eepic", desc: "e-EPIC Download" },
    ],
  },
  {
    category: "⚖️ Legal & Constitution",
    links: [
      { label: "RPA 1951 Act", url: "https://legislative.gov.in/sites/default/files/A1951-43.pdf", desc: "Representation of People Act" },
      { label: "Constitution of India", url: "https://www.india.gov.in/my-government/constitution-india", desc: "Articles 324-329" },
      { label: "Model Code of Conduct", url: "https://eci.gov.in/model-code-of-conduct", desc: "MCC Guidelines" },
      { label: "EVM Information", url: "https://www.eci.gov.in/evm", desc: "EVM & VVPAT" },
    ],
  },
  {
    category: "🏢 State Election Commissions",
    links: [
      { label: "CEO Maharashtra", url: "https://ceomaharashtra.nic.in", desc: "Maharashtra" },
      { label: "CEO Delhi", url: "https://ceodelhigovt.nic.in", desc: "Delhi" },
      { label: "CEO Gujarat", url: "https://ceo.gujarat.gov.in", desc: "Gujarat" },
      { label: "CEO Karnataka", url: "https://ceokarnataka.kar.nic.in", desc: "Karnataka" },
    ],
  },
];

const internalLinks = [
  { href: "/chat", label: "AI Chatbot" },
  { href: "/guide", label: "Voter Guide" },
  { href: "/eligibility", label: "Eligibility Checker" },
  { href: "/simulator", label: "Mock EVM" },
  { href: "/candidates", label: "Candidate Explorer" },
  { href: "/timeline", label: "Election Timeline" },
  { href: "/find-booth", label: "Find Booth" },
  { href: "/helpline", label: "Helpline" },
  { href: "/learn", label: "Learning Hub" },
  { href: "/first-vote", label: "First Vote Wizard" },
  { href: "/about", label: "About Us" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(180deg, #0A0E1A 0%, #060810 100%)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      marginTop: "4rem",
    }}>
      {/* Tricolor strip */}
      <div style={{
        height: "4px",
        background: "linear-gradient(to right, #FF6B00 33.33%, #ffffff 33.33% 66.66%, #138808 66.66%)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>

        {/* Top Row — Brand + Emergency */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3rem" }}>
          {/* Brand */}
          <div style={{ maxWidth: "340px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.6rem" }}>🗳️</span>
              <span style={{
                fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "1.3rem",
                background: "linear-gradient(135deg, #FF6B00, #FFD700)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Matdata Mitra</span>
            </div>
            <p style={{ color: "#8896B3", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              An independent civic-education platform empowering India&apos;s 96.8 crore voters with
              neutral, AI-powered information. We strictly follow the ECI Model Code of Conduct.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href="tel:1950" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#FF8C38", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}>
                <Phone size={16} /> Voter Helpline: 1950
              </a>
              <a href="mailto:complaints@eci.gov.in" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4ade80", fontSize: "0.85rem", textDecoration: "none" }}>
                <Mail size={16} /> complaints@eci.gov.in
              </a>
            </div>
          </div>

          {/* Quick Emergency Helplines */}
          <div style={{
            background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.2)",
            borderRadius: "16px", padding: "1.25rem 1.5rem", minWidth: "260px"
          }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#FF8C38", marginBottom: "1rem" }}>
              📞 Emergency Contacts
            </div>
            {[
              { label: "Voter Helpline (ECI)", number: "1950" },
              { label: "National Emergency", number: "112" },
              { label: "Election Complaints", number: "1800-111-950" },
              { label: "SVEEP Helpline", number: "1800-111-098" },
            ].map(h => (
              <div key={h.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ color: "#8896B3", fontSize: "0.82rem" }}>{h.label}</span>
                <a href={`tel:${h.number}`} style={{ color: "#FF6B00", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>{h.number}</a>
              </div>
            ))}
            <Link href="/helpline" style={{
              display: "block", marginTop: "1rem", textAlign: "center",
              background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)",
              borderRadius: "8px", padding: "0.5rem", color: "#FF8C38",
              fontSize: "0.8rem", fontWeight: 700, textDecoration: "none"
            }}>
              View Full Helpline Directory →
            </Link>
          </div>
        </div>

        {/* Government Links Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {govLinks.map(section => (
            <div key={section.category}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#F0F4FF", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {section.category}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {section.links.map(link => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}
                    >
                      <span style={{ color: "#F0F4FF", fontSize: "0.85rem", transition: "color 0.2s" }}
                        onMouseOver={e => (e.currentTarget.style.color = "#FF6B00")}
                        onMouseOut={e => (e.currentTarget.style.color = "#F0F4FF")}
                      >{link.label}</span>
                      <ExternalLink size={11} color="#5a6a8a" />
                    </a>
                    <div style={{ color: "#5a6a8a", fontSize: "0.73rem", marginTop: "0.1rem" }}>{link.desc}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "2rem" }} />

        {/* Internal Links */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "#5a6a8a", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Explore Matdata Mitra
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {internalLinks.map(l => (
              <Link key={l.href} href={l.href} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50px", padding: "0.3rem 0.9rem", fontSize: "0.8rem",
                color: "#8896B3", textDecoration: "none", transition: "all 0.2s"
              }}
                onMouseOver={e => {
                  e.currentTarget.style.color = "#FF6B00";
                  e.currentTarget.style.borderColor = "rgba(255,107,0,0.4)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.color = "#8896B3";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#5a6a8a", fontSize: "0.8rem" }}>
            <Shield size={14} /> Neutral Civic Platform • No political affiliation • © 2026 Matdata Mitra
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#5a6a8a", fontSize: "0.8rem" }}>
            Made with <Heart size={12} color="#FF6B00" fill="#FF6B00" /> for India&apos;s Democracy
          </div>
        </div>
      </div>
    </footer>
  );
}

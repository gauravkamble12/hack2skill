"use client";
import { motion } from "framer-motion";
import { Phone, ExternalLink, MessageSquare, Globe, ShieldCheck, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";

const helplines = [
  {
    category: "🗳️ Election Commission of India",
    color: "#FF6B00",
    contacts: [
      {
        name: "Voter Helpline",
        number: "1950",
        description: "For voter registration, booth location, voter ID issues, and all general election queries.",
        available: "24x7 during elections",
        type: "toll-free",
      },
      {
        name: "ECI Complaint Line",
        number: "1800-111-950",
        description: "Register complaints about Model Code of Conduct violations, booth capture, or malpractice.",
        available: "24x7 during election period",
        type: "toll-free",
      },
      {
        name: "ECI Main Office",
        number: "011-23052205",
        description: "General enquiry at the Election Commission of India head office, New Delhi.",
        available: "Mon–Sat, 9am–6pm",
        type: "landline",
      },
    ],
  },
  {
    category: "📱 Digital Voter Services",
    color: "#6366f1",
    contacts: [
      {
        name: "Voter Helpline App (Android)",
        number: null,
        link: "https://play.google.com/store/apps/details?id=com.eci.citizen",
        description: "Download the official Voter Helpline app by ECI to find your booth, check voter ID status, and more.",
        available: "Available on Google Play",
        type: "app",
      },
      {
        name: "National Voter Service Portal",
        number: null,
        link: "https://www.nvsp.in",
        description: "Register as a voter, apply for changes, download e-EPIC (digital voter ID), and check electoral roll.",
        available: "Online 24x7",
        type: "website",
      },
      {
        name: "voters.eci.gov.in",
        number: null,
        link: "https://voters.eci.gov.in",
        description: "Official ECI voter portal for registration, address change, and e-EPIC download.",
        available: "Online 24x7",
        type: "website",
      },
    ],
  },
  {
    category: "🚨 Emergency & National",
    color: "#ef4444",
    contacts: [
      {
        name: "National Emergency",
        number: "112",
        description: "Police, Fire, Medical emergency. Call if you witness booth violence or voter intimidation.",
        available: "24x7",
        type: "emergency",
      },
      {
        name: "Police (Non-Emergency)",
        number: "100",
        description: "Report election-related crimes, voter intimidation, or booth malpractice to local police.",
        available: "24x7",
        type: "emergency",
      },
      {
        name: "Women Helpline",
        number: "1091",
        description: "Dedicated helpline for women voters facing issues or harassment at polling booths.",
        available: "24x7",
        type: "emergency",
      },
    ],
  },
  {
    category: "📊 SVEEP & Awareness",
    color: "#138808",
    contacts: [
      {
        name: "SVEEP Helpline",
        number: "1800-111-098",
        description: "Systematic Voters Education and Electoral Participation — for voter awareness and civic education.",
        available: "During campaign period",
        type: "toll-free",
      },
      {
        name: "ECI Email",
        number: null,
        link: "mailto:complaints@eci.gov.in",
        description: "Email the Election Commission of India directly with your grievances or feedback.",
        available: "Response within 24–48 hours",
        type: "email",
      },
      {
        name: "Know Your Candidate",
        number: null,
        link: "https://affidavit.eci.gov.in",
        description: "View candidate affidavits — declared assets, liabilities, criminal records, and education.",
        available: "Online 24x7",
        type: "website",
      },
    ],
  },
  {
    category: "🏢 State Election Helplines",
    color: "#0ea5e9",
    contacts: [
      { name: "CEO Maharashtra", number: "022-22025126", description: "Chief Electoral Officer Maharashtra, Mumbai", available: "Office hours", type: "landline", link: "https://ceomaharashtra.nic.in" },
      { name: "CEO Delhi", number: "011-23392002", description: "Chief Electoral Officer Delhi", available: "Office hours", type: "landline", link: "https://ceodelhigovt.nic.in" },
      { name: "CEO Gujarat", number: "079-23250101", description: "Chief Electoral Officer Gujarat, Gandhinagar", available: "Office hours", type: "landline", link: "https://ceo.gujarat.gov.in" },
      { name: "CEO Karnataka", number: "080-22353423", description: "Chief Electoral Officer Karnataka, Bengaluru", available: "Office hours", type: "landline", link: "https://ceokarnataka.kar.nic.in" },
      { name: "CEO UP", number: "0522-2239066", description: "Chief Electoral Officer Uttar Pradesh, Lucknow", available: "Office hours", type: "landline", link: "https://ceouttarpradesh.nic.in" },
      { name: "CEO Tamil Nadu", number: "044-28524680", description: "Chief Electoral Officer Tamil Nadu, Chennai", available: "Office hours", type: "landline", link: "https://www.elections.tn.gov.in" },
    ],
  },
];

function ContactCard({ contact, color }: { contact: typeof helplines[0]["contacts"][0]; color: string }) {
  const isPhone = !!contact.number;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card"
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderLeft: `3px solid ${color}`, position: "relative" }}
    >
      {/* Type Badge */}
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <span style={{
          fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
          padding: "0.2rem 0.5rem", borderRadius: "50px",
          background: contact.type === "emergency" ? "rgba(239,68,68,0.15)" : contact.type === "toll-free" ? "rgba(19,136,8,0.15)" : "rgba(99,102,241,0.15)",
          color: contact.type === "emergency" ? "#f87171" : contact.type === "toll-free" ? "#4ade80" : "#818cf8",
          border: `1px solid ${contact.type === "emergency" ? "rgba(239,68,68,0.3)" : contact.type === "toll-free" ? "rgba(19,136,8,0.3)" : "rgba(99,102,241,0.3)"}`,
        }}>
          {contact.type === "toll-free" ? "✅ Free Call" : contact.type === "emergency" ? "🚨 Emergency" : contact.type === "website" ? "🌐 Web" : contact.type === "app" ? "📱 App" : contact.type === "email" ? "📧 Email" : "📞 Landline"}
        </span>
      </div>

      <div style={{ fontWeight: 700, fontSize: "1rem", paddingRight: "5rem", color: "#F0F4FF" }}>{contact.name}</div>
      <p style={{ color: "#8896B3", fontSize: "0.85rem", lineHeight: 1.6 }}>{contact.description}</p>
      <div style={{ fontSize: "0.78rem", color: "#5a6a8a", display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <Info size={12} /> {contact.available}
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "auto" }}>
        {isPhone && (
          <a
            href={`tel:${contact.number}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: `${color}20`, border: `1px solid ${color}40`,
              borderRadius: "50px", padding: "0.45rem 1rem",
              color, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.background = `${color}35`; }}
            onMouseOut={e => { e.currentTarget.style.background = `${color}20`; }}
          >
            <Phone size={15} /> {contact.number}
          </a>
        )}
        {"link" in contact && contact.link && (
          <a
            href={contact.link}
            target={contact.link.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50px", padding: "0.45rem 1rem",
              color: "#aab4cc", fontWeight: 600, fontSize: "0.82rem", textDecoration: "none",
            }}
          >
            <ExternalLink size={13} /> Visit
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function HelplinePage() {
  return (
    <div className="page">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div className="badge badge-saffron" style={{ marginBottom: "1rem" }}>📞 Official Contacts</div>
        <h1 className="page-title" style={{ textAlign: "center", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          Election Helpline Directory
        </h1>
        <p style={{ color: "#8896B3", maxWidth: "600px", margin: "0.75rem auto 0", lineHeight: 1.7, fontSize: "1rem" }}>
          All official government helplines, portals, and contacts for Indian elections in one place.
          All toll-free numbers are <strong style={{ color: "#4ade80" }}>free to call</strong> from any phone.
        </p>
      </motion.div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(255,107,0,0.08))",
          border: "1px solid rgba(239,68,68,0.3)", borderRadius: "16px",
          padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem",
          marginBottom: "3rem", flexWrap: "wrap",
        }}
      >
        <AlertTriangle size={28} color="#f87171" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: "#f87171", marginBottom: "0.25rem" }}>In case of an emergency at a polling booth</div>
          <div style={{ color: "#8896B3", fontSize: "0.88rem" }}>
            Call <strong style={{ color: "#FF6B00" }}>112</strong> for national emergency •
            Call <strong style={{ color: "#FF6B00" }}>1950</strong> for ECI voter helpline •
            Call <strong style={{ color: "#FF6B00" }}>1800-111-950</strong> to report violations
          </div>
        </div>
        <a href="tel:112" style={{
          background: "#ef4444", color: "white", padding: "0.6rem 1.25rem",
          borderRadius: "50px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
          display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0,
        }}>
          <Phone size={16} /> Call 112
        </a>
      </motion.div>

      {/* AI Chatbot CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.2)",
          borderRadius: "16px", padding: "1.25rem 1.5rem", display: "flex",
          alignItems: "center", gap: "1rem", marginBottom: "3rem", flexWrap: "wrap"
        }}
      >
        <MessageSquare size={28} color="#FF6B00" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: "#FF8C38", marginBottom: "0.25rem" }}>Have an election question?</div>
          <div style={{ color: "#8896B3", fontSize: "0.88rem" }}>Our AI assistant Matdata Mitra can answer most election queries instantly — no wait time!</div>
        </div>
        <Link href="/chat" className="btn btn-primary" style={{ flexShrink: 0 }}>
          Ask Matdata Mitra
        </Link>
      </motion.div>

      {/* Helplines by Category */}
      {helplines.map((section, si) => (
        <motion.section
          key={section.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: si * 0.05 }}
          style={{ marginBottom: "3rem" }}
        >
          <div style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem", paddingBottom: "0.75rem",
            borderBottom: `2px solid ${section.color}30`
          }}>
            <div style={{ width: "4px", height: "24px", background: section.color, borderRadius: "2px" }} />
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#F0F4FF" }}>
              {section.category}
            </h2>
          </div>
          <div className="grid-3">
            {section.contacts.map(contact => (
              <ContactCard key={contact.name} contact={contact} color={section.color} />
            ))}
          </div>
        </motion.section>
      ))}

      {/* Info Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="card"
        style={{ background: "rgba(19,136,8,0.05)", borderColor: "rgba(19,136,8,0.2)", marginTop: "2rem" }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <ShieldCheck size={36} color="#138808" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.3rem" }}>All Numbers Verified from Official Sources</div>
            <p style={{ color: "#8896B3", fontSize: "0.85rem", lineHeight: 1.6 }}>
              All helpline numbers and links are sourced from <strong>eci.gov.in</strong>, official state CEO portals,
              and the Government of India. For the most up-to-date contact details, always verify at{" "}
              <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#FF6B00" }}>eci.gov.in</a>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

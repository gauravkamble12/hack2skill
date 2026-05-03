"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import electionData from "@/app/data/election_hierarchy.json";
import { CardSkeleton, ListSkeleton, GridSkeleton } from "@/components/Skeleton";

type ElectionHierarchy = typeof electionData;

interface PartyResultType {
  party: string;
  seats: number;
  votes_pct?: string;
  color: string;
}

interface VidhanSabhaElection {
  state: string;
  year: number;
  month: string;
  total_seats: number;
  turnout: string;
  result: PartyResultType[];
  govt_formed: string;
}

interface PanchayatTier {
  tier: string;
  head: string;
  tenure: string;
  functions: string[];
}

interface StatePanchayatElection {
  state: string;
  year: number;
  month?: string;
  gram_panchayats?: number;
  turnout?: string;
}

interface ElectionCalendarEntry {
  election: string;
  level: string;
  seats: number;
  expected?: string;
  actual?: string;
  result?: string;
  status: string;
  note?: string;
}

const LEVELS = [
  { key: "lok_sabha",       icon: "🏛️", label: "Lok Sabha",          subtitle: "National — General Elections",    color: "#FF6B00" },
  { key: "rajya_sabha",     icon: "⚖️", label: "Rajya Sabha",        subtitle: "National — Upper House",           color: "#6366f1" },
  { key: "vidhan_sabha",    icon: "🏢", label: "Vidhan Sabha",        subtitle: "State Assemblies",                 color: "#0ea5e9" },
  { key: "vidhan_parishad", icon: "📜", label: "Vidhan Parishad",     subtitle: "State Upper Houses (6 States)",   color: "#f59e0b" },
  { key: "municipal",       icon: "🌆", label: "Urban Local Bodies",  subtitle: "Cities & Municipalities",          color: "#14b8a6" },
  { key: "panchayat",       icon: "🌾", label: "Gram Panchayat",      subtitle: "Village — Grassroots Democracy",  color: "#138808" },
];

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ height: "100%", background: color, borderRadius: 4 }}
      />
    </div>
  );
}

function LokSabhaTab() {
  const d = (electionData as ElectionHierarchy).lok_sabha;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="grid-3">
        {[
          { label: "Total Seats", value: d.total_seats, icon: "🏛️" },
          { label: "Registered Voters", value: "96.9 Crore", icon: "👥" },
          { label: "Voter Turnout", value: d.last_election.voter_turnout, icon: "📊" },
          { label: "Total Candidates", value: d.last_election.total_candidates.toLocaleString(), icon: "🧑‍💼" },
          { label: "Polling Stations", value: "10.5 Lakh+", icon: "🗳️" },
          { label: "Election Phases", value: d.last_election.phase, icon: "📅" },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, fontFamily: "Poppins,sans-serif", color: "#FF6B00" }}>{s.value}</div>
            <div style={{ fontSize: "0.72rem", color: "#5a6a8a", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 800, marginBottom: "1.25rem" }}>📊 Lok Sabha 2024 — Party-wise Results</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {d.last_election.party_results.map((p: PartyResultType) => (
            <div key={p.party}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{p.party}</span>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <span style={{ color: "#aab4cc", fontSize: "0.82rem" }}>{p.votes_pct}</span>
                  <span style={{ fontWeight: 700, color: p.color, fontSize: "0.88rem" }}>{p.seats} seats</span>
                </div>
              </div>
              <ProgressBar pct={(p.seats / 543) * 100} color={p.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 800, marginBottom: "1rem" }}>📅 2024 Election Phase Schedule</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {d.last_election.dates.map((date: string, i: number) => (
            <div key={i} style={{ background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.25)", borderRadius: "10px", padding: "0.5rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.62rem", color: "#5a6a8a" }}>Phase {i + 1}</div>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#FF8C38" }}>{date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VidhanSabhaTab() {
  const d = (electionData as ElectionHierarchy).vidhan_sabha;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="grid-2">
        {d.recent_elections.map((s: VidhanSabhaElection) => (
          <div key={s.state} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.05rem" }}>{s.state}</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <span className="badge badge-saffron">{s.month} {s.year}</span>
                <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "#8896B3", border: "1px solid rgba(255,255,255,0.08)" }}>{s.total_seats} seats</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
              {s.result.map((p: PartyResultType) => p.seats > 0 && (
                <div key={p.party}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: 600 }}>{p.party}</span>
                    <span style={{ fontWeight: 700, color: p.color, fontSize: "0.82rem" }}>{p.seats}</span>
                  </div>
                  <ProgressBar pct={(p.seats / s.total_seats) * 100} color={p.color} />
                </div>
              ))}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#aab4cc" }}>✅ Turnout: <strong>{s.turnout}</strong></div>
            <div style={{ fontSize: "0.75rem", color: "#aab4cc" }}>🏛️ Govt: <strong>{s.govt_formed}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanchayatTab() {
  const d = (electionData as ElectionHierarchy).panchayat;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="grid-3">
        {[
          { icon: "🏘️", val: "2,56,535", label: "Gram Panchayats" },
          { icon: "🏗️", val: "6,925", label: "Panchayat Samitis" },
          { icon: "🏛️", val: "662", label: "Zila Parishads" },
          { icon: "👥", val: "32 Lakh+", label: "Elected Representatives" },
          { icon: "👩", val: "46%", label: "Women Representatives" },
          { icon: "🌾", val: "70%", label: "India's Rural Population" },
        ].map(s => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.25rem", fontWeight: 900, fontFamily: "Poppins,sans-serif", color: "#138808" }}>{s.val}</div>
            <div style={{ fontSize: "0.72rem", color: "#5a6a8a", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 800, marginBottom: "1rem" }}>🏗️ Three-Tier Panchayat Structure</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {d.three_tier_structure.map((t: PanchayatTier, i: number) => (
            <div key={t.tier} style={{ display: "flex", gap: "1rem", padding: "1rem", background: "var(--bg-card2)", borderRadius: "12px", border: "1px solid var(--border)" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: `rgba(19,136,8,${0.1 + i * 0.1})`, border: "1px solid rgba(19,136,8,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#138808", flexShrink: 0 }}>{i + 1}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{t.tier}</div>
                <div style={{ fontSize: "0.78rem", color: "#aab4cc" }}>Head: <strong>{t.head}</strong> · Tenure: {t.tenure}</div>
                <div style={{ fontSize: "0.75rem", color: "#5a6a8a", marginTop: "0.3rem" }}>Works: {t.functions.slice(0, 3).join(" · ")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 800, marginBottom: "1rem" }}>📊 State Panchayat Elections (2020–2023)</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["State", "Year", "Month", "Gram Panchayats", "Turnout"].map(h => (
                  <th key={h} style={{ padding: "0.5rem 0.75rem", textAlign: "left", color: "#5a6a8a", fontWeight: 600, fontSize: "0.75rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(d.state_elections || []).map((r: StatePanchayatElection) => (
                <tr key={r.state} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}>{r.state}</td>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#aab4cc" }}>{r.year}</td>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#aab4cc" }}>{r.month || "-"}</td>
                  <td style={{ padding: "0.6rem 0.75rem", color: "#FF8C38", fontWeight: 700 }}>{r.gram_panchayats?.toLocaleString() || "-"}</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>
                    <span style={{ background: "rgba(19,136,8,0.15)", border: "1px solid rgba(19,136,8,0.25)", borderRadius: "20px", padding: "0.15rem 0.6rem", color: "#4ADE80", fontWeight: 700, fontSize: "0.78rem" }}>{r.turnout || "-"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UpcomingTab() {
  const cal = (electionData as ElectionHierarchy).election_calendar_2025_26;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p style={{ color: "#8896B3", marginBottom: "0.5rem" }}>All upcoming elections across all levels in India for 2025–2026:</p>
      {cal.map((e: ElectionCalendarEntry, i: number) => (
        <motion.div
          key={e.election}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          className="card"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}
        >
          <div>
            <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{e.election}</div>
            <div style={{ fontSize: "0.78rem", color: "#aab4cc" }}>{e.level} · {e.seats.toLocaleString()} seats</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontWeight: 700, color: "#FF6B00" }}>{e.expected}</span>
            <span className="badge badge-saffron">Upcoming</span>
          </div>
        </motion.div>
      ))}
      <div className="card" style={{ marginTop: "0.5rem", background: "rgba(59,130,246,0.06)", borderColor: "rgba(59,130,246,0.2)" }}>
        <p style={{ fontSize: "0.82rem", color: "#8896B3", margin: 0 }}>📌 Dates are approximate based on 5-year term schedules. Official dates are announced by the Election Commission of India. <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#FF6B00" }}>eci.gov.in</a></p>
      </div>
    </div>
  );
}

export default function ElectionsPage() {
  const [activeLevel, setActiveLevel] = useState("lok_sabha");
  const [activeTab, setActiveTab] = useState<"results" | "upcoming">("results");

  const renderContent = () => {
    if (activeTab === "upcoming") return <UpcomingTab />;
    switch (activeLevel) {
      case "lok_sabha": return <LokSabhaTab />;
      case "vidhan_sabha": return <VidhanSabhaTab />;
      case "panchayat": return <PanchayatTab />;
      default:
        const d = (electionData as unknown as Record<string, { title?: string; description?: string; election_method?: string }>)[activeLevel];
        return (
          <div className="card">
            <h3 style={{ fontWeight: 800, marginBottom: "0.75rem" }}>{d?.title}</h3>
            <p style={{ color: "#aab4cc", lineHeight: 1.7 }}>{d?.description}</p>
            {d?.election_method && <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--bg-card2)", borderRadius: "10px", fontSize: "0.82rem", color: "#8896B3" }}>⚙️ <strong>Election Method:</strong> {d.election_method}</div>}
          </div>
        );
    }
  };

  return (
    <div className="page">
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>📊 Complete Election Database</div>
      <h1 className="page-title">All Elections in <span className="gradient-text">India</span></h1>
      <p className="page-subtitle">From Village Gram Panchayat to Lok Sabha — every layer of India&apos;s democracy with real data</p>

      {/* Top tab: Results vs Upcoming */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--bg-card2)", borderRadius: "50px", padding: "0.25rem", width: "fit-content" }}>
        {[{ key: "results", label: "📊 Results & Data" }, { key: "upcoming", label: "📅 Upcoming Elections" }].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as "results" | "upcoming")}
            style={{
              background: activeTab === t.key ? "var(--accent)" : "transparent",
              border: "none",
              borderRadius: "50px",
              padding: "0.5rem 1.25rem",
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              color: activeTab === t.key ? "white" : "#8896B3",
              transition: "all 0.2s",
            }}
          >{t.label}</button>
        ))}
      </div>

      {activeTab === "results" && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {LEVELS.map(l => (
            <button
              key={l.key}
              onClick={() => setActiveLevel(l.key)}
              style={{
                background: activeLevel === l.key ? `${l.color}18` : "var(--bg-card2)",
                border: `1px solid ${activeLevel === l.key ? l.color + "55" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "50px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
                fontSize: "0.82rem",
                color: activeLevel === l.key ? l.color : "#8896B3",
                transition: "all 0.2s",
              }}
            >
              {l.icon} {l.label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={activeLevel + activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div className="card" style={{ marginTop: "2.5rem", display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", background: "linear-gradient(135deg,rgba(255,107,0,0.08),rgba(19,136,8,0.06))", borderColor: "rgba(255,107,0,0.2)" }}>
        <div>
          <div style={{ fontWeight: 800, marginBottom: "0.4rem" }}>Find Your Nearest Polling Booth</div>
          <p style={{ color: "#8896B3", fontSize: "0.85rem", margin: 0 }}>Use your GPS location to instantly see the 5 closest voting centers</p>
        </div>
        <Link href="/find-booth" className="btn btn-primary">
          <MapPin size={18} />
          Find My Booth
        </Link>
      </div>
    </div>
  );
}

function MapPin({ size }: { size: number }) {
  return <span style={{ fontSize: size * 0.06 + "rem" }}>📍</span>;
}

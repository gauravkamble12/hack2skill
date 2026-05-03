"use client";
import { useState, useEffect } from "react";
import { Search, MapPin, Building, GraduationCap, Scale, Briefcase } from "lucide-react";
import IframeModal from "@/components/IframeModal";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Candidate { id: string; name: string; constituency: string; state: string; party: string; education: string; declared_assets: string; liabilities: string; criminal_cases: number; age: number; affidavit_url: string; summary: string; }

const STATES = ["All States", "Maharashtra", "Bihar", "Telangana", "Delhi"];

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [modalUrl, setModalUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/candidates`)
      .then(r => r.json())
      .then(d => { setCandidates(d.candidates || []); setLoading(false); })
      .catch(() => { setCandidates([]); setLoading(false); });
  }, []);

  const filtered = candidates.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.constituency.toLowerCase().includes(q);
    const matchState = stateFilter === "All States" || c.state === stateFilter;
    return matchSearch && matchState;
  });

  if (selected) return (
    <div className="page" style={{ maxWidth: "680px" }}>
      <button onClick={() => setSelected(null)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "50px", padding: "0.4rem 1rem", color: "#8896B3", cursor: "pointer", fontSize: "0.82rem", marginBottom: "1.5rem", fontFamily: "Inter,sans-serif" }}>← Back to Candidates</button>
      <div className="card">
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg,#FF6B00,#FFD700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>👤</div>
          <div>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "1.3rem" }}>{selected.name}</h2>
            <div style={{ fontSize: "0.82rem", color: "#8896B3" }}>{selected.constituency}, {selected.state}</div>
            <div className="badge badge-saffron" style={{ marginTop: "0.4rem" }}>{selected.party}</div>
          </div>
        </div>
        <div className="tricolor-strip" style={{ marginBottom: "1.25rem" }} />
        <p style={{ fontSize: "0.87rem", color: "#aab4cc", marginBottom: "1.25rem", lineHeight: 1.6 }}>{selected.summary}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {[
            ["🎓 Education", selected.education],
            ["🎂 Age", selected.age + " years"],
            ["💰 Declared Assets", selected.declared_assets],
            ["📉 Liabilities", selected.liabilities],
            ["⚖️ Criminal Cases", selected.criminal_cases === 0 ? "None declared" : `${selected.criminal_cases} case(s)`],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "var(--bg-card2)", borderRadius: "10px", padding: "0.75rem" }}>
              <div style={{ fontSize: "0.72rem", color: "#8896B3" }}>{k}</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginTop: "0.2rem", color: k === "⚖️ Criminal Cases" && selected.criminal_cases > 0 ? "#fbbf24" : "var(--text)" }}>{v}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setModalUrl(selected.affidavit_url)} className="btn btn-outline" style={{ marginTop: "1.25rem", width: "100%", justifyContent: "center" }}>📜 View Full Affidavit on ECI Website →</button>
        <p style={{ fontSize: "0.72rem", color: "#5a6a8a", marginTop: "0.75rem", textAlign: "center" }}>📌 Data sourced from ECI affidavit portal. Neutral, factual presentation only.</p>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>🧾 Neutral & Factual</div>
      <h1 className="page-title">Candidate <span className="gradient-text">Explorer</span></h1>
      <p className="page-subtitle">View declared assets, education, and background — neutral information only</p>

      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <input className="input" placeholder="🔍 Search by name or constituency..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: "200px" }} />
        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} style={{ background: "var(--bg-card2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "0.75rem 1rem", color: "var(--text)", fontFamily: "Inter,sans-serif", fontSize: "0.9rem", outline: "none", cursor: "pointer" }}>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#8896B3" }}>Loading candidates...</div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
          <p style={{ color: "#8896B3" }}>No candidates found. Try a different search.</p>
        </div>
      ) : (
        <div className="grid-2">
          {filtered.map(c => (
            <div key={c.id} className="card" style={{ cursor: "pointer" }} onClick={() => setSelected(c)}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,rgba(255,107,0,0.3),rgba(19,136,8,0.3))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{c.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#8896B3" }}>{c.constituency}, {c.state}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                <span className="badge badge-saffron">{c.party}</span>
                {c.criminal_cases > 0 && <span className="badge" style={{ background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" }}>⚠️ {c.criminal_cases} Case</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                <div style={{ fontSize: "0.75rem", color: "#8896B3" }}>🎓 {c.education.split(",")[0]}</div>
                <div style={{ fontSize: "0.75rem", color: "#8896B3" }}>💰 {c.declared_assets}</div>
              </div>
              <div style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: "#FF6B00" }}>View Full Profile →</div>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ marginTop: "2rem", borderColor: "rgba(19,136,8,0.3)", background: "rgba(19,136,8,0.05)" }}>
        <p style={{ fontSize: "0.78rem", color: "#8896B3" }}>🛡️ <strong>Note:</strong> This platform is strictly neutral. Candidate data is from ECI public affidavits. We do NOT endorse, recommend, or rank any candidate or party. Voter choice is entirely personal and free.</p>
      </div>
    </div>
  );
}

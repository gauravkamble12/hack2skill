"use client";
import { useState } from "react";

const CANDIDATES = [
  { name: "Candidate A", party: "Party 1", symbol: "🌸", color: "#FF6B00" },
  { name: "Candidate B", party: "Party 2", symbol: "🌿", color: "#138808" },
  { name: "Candidate C", party: "Party 3", symbol: "⭐", color: "#6366f1" },
  { name: "Candidate D", party: "Independent", symbol: "🕊️", color: "#0ea5e9" },
  { name: "NOTA", party: "None of the Above", symbol: "✗", color: "#6b7280" },
];

type Phase = "intro" | "voting" | "vvpat" | "done";

export default function SimulatorPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [selected, setSelected] = useState<number | null>(null);
  const [voted, setVoted] = useState<number | null>(null);
  const [showVVPAT, setShowVVPAT] = useState(false);

  const pressButton = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      setVoted(idx);
      setShowVVPAT(true);
      setPhase("vvpat");
      setTimeout(() => { setShowVVPAT(false); setPhase("done"); }, 7000);
    }, 500);
  };

  const reset = () => { setPhase("intro"); setSelected(null); setVoted(null); setShowVVPAT(false); };

  return (
    <div className="page" style={{ maxWidth: "680px" }}>
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>🗳️ Demo Only</div>
      <h1 className="page-title">Mock <span className="gradient-text">EVM</span> Simulator</h1>
      <p className="page-subtitle">Practice voting safely with a realistic EVM demo — no real votes recorded</p>

      {phase === "intro" && (
        <div className="fade-up">
          <div className="card" style={{ marginBottom: "1.5rem", borderColor: "rgba(255,107,0,0.3)", background: "rgba(255,107,0,0.06)" }}>
            <h3 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, marginBottom: "0.75rem" }}>📋 How to use this simulator</h3>
            {["This is a demo — no real votes are cast or stored", "Press the blue button next to any candidate to vote", "A VVPAT slip will appear for 7 seconds to confirm your choice", "Your vote is completely secret in real elections"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ color: "#FF6B00", fontWeight: 700 }}>{i + 1}.</span>
                <span style={{ fontSize: "0.87rem", color: "#aab4cc" }}>{s}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1rem", justifyContent: "center" }} onClick={() => setPhase("voting")}>
            Start Demo Voting Experience →
          </button>
        </div>
      )}

      {(phase === "voting" || phase === "vvpat") && (
        <div className="fade-up">
          {/* EVM Machine */}
          <div style={{ background: "#1a1a2e", border: "3px solid #334155", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
            {/* EVM Header */}
            <div style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", padding: "1rem 1.5rem", borderBottom: "2px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, color: "#FF6B00", fontSize: "0.9rem" }}>🏛️ ELECTION COMMISSION OF INDIA</div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>ELECTRONIC VOTING MACHINE — DEMO UNIT</div>
              </div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: selected !== null ? "#ef4444" : "#22c55e", boxShadow: `0 0 8px ${selected !== null ? "#ef444488" : "#22c55e88"}` }} />
            </div>

            {/* Ballot Unit */}
            <div style={{ padding: "1rem" }}>
              <div style={{ background: "#0f172a", borderRadius: "12px", padding: "0.5rem", marginBottom: "0.5rem" }}>
                <div style={{ fontSize: "0.65rem", color: "#64748b", textAlign: "center", padding: "0.3rem", letterSpacing: "0.1em" }}>BALLOT UNIT — SAMPLE CONSTITUENCY</div>
              </div>
              {CANDIDATES.map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0.75rem", borderBottom: i < CANDIDATES.length - 1 ? "1px solid #1e293b" : "none", opacity: selected !== null && selected !== i ? 0.4 : 1, transition: "opacity 0.3s" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: c.color + "22", border: `2px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{c.symbol}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#f1f5f9" }}>{c.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{c.party}</div>
                  </div>
                  <button onClick={() => pressButton(i)} disabled={selected !== null} style={{
                    width: "36px", height: "36px", borderRadius: "50%", border: "none", cursor: selected !== null ? "not-allowed" : "pointer",
                    background: selected === i ? "#22c55e" : "linear-gradient(135deg,#1d4ed8,#2563eb)",
                    boxShadow: selected === i ? "0 0 16px #22c55e88" : "0 0 12px rgba(37,99,235,0.5)",
                    color: "white", fontWeight: 800, fontSize: "0.8rem", transition: "all 0.3s",
                    transform: selected === i ? "scale(0.9)" : "scale(1)",
                  }}>
                    {selected === i ? "✓" : "●"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* VVPAT Slip */}
          {showVVPAT && voted !== null && (
            <div className="fade-up" style={{ marginTop: "1.5rem", background: "white", borderRadius: "12px", padding: "1.25rem", color: "#111", border: "2px solid #22c55e", boxShadow: "0 0 30px rgba(34,197,94,0.3)" }}>
              <div style={{ fontSize: "0.72rem", color: "#666", textAlign: "center", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>VVPAT VERIFICATION SLIP (Visible for 7 seconds)</div>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <div style={{ fontSize: "1.5rem" }}>{CANDIDATES[voted].symbol}</div>
                <div>
                  <div style={{ fontWeight: 700 }}>{CANDIDATES[voted].name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#555" }}>{CANDIDATES[voted].party}</div>
                </div>
                <div style={{ marginLeft: "auto", color: "#22c55e", fontSize: "1.2rem" }}>✓</div>
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "0.7rem", color: "#888", borderTop: "1px dashed #ccc", paddingTop: "0.4rem" }}>This slip confirms your vote. It will drop into sealed box automatically.</div>
            </div>
          )}
        </div>
      )}

      {phase === "done" && voted !== null && (
        <div className="fade-up">
          <div className="card" style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderColor: "rgba(34,197,94,0.4)", background: "rgba(34,197,94,0.06)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#4ade80", marginBottom: "0.75rem" }}>Vote Cast Successfully!</h2>
            <p style={{ color: "#aab4cc", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              In a real election, your vote would now be <strong>securely encrypted</strong> in the EVM. Nobody — not even election officials — can know who you voted for.
            </p>
            <div style={{ background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem", textAlign: "left" }}>
              <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🛡️ Your vote is protected by:</div>
              {["Indelible ink marking (prevents double voting)", "VVPAT paper trail for verification", "End-to-end encrypted EVM storage", "Sealed ballot units with tamper-proof locks"].map((s, i) => (
                <div key={i} style={{ fontSize: "0.82rem", color: "#8896B3", marginBottom: "0.25rem" }}>✅ {s}</div>
              ))}
            </div>
            <button onClick={reset} className="btn btn-primary" style={{ marginRight: "0.75rem" }}>🔄 Try Again</button>
          </div>

          <div className="card" style={{ marginTop: "1rem" }}>
            <div style={{ fontWeight: 600, marginBottom: "0.4rem" }}>🏅 Badge Unlocked!</div>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
              <span style={{ fontSize: "2rem" }}>🎯</span>
              <div>
                <div style={{ fontWeight: 700 }}>EVM Master</div>
                <div style={{ fontSize: "0.8rem", color: "#8896B3" }}>You completed the mock voting experience!</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: "1.5rem", borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.05)" }}>
        <p style={{ fontSize: "0.78rem", color: "#8896B3" }}>⚠️ <strong>Disclaimer:</strong> This is a simulation for educational purposes only. Candidate names are fictional. No votes are recorded or stored. Source: ECI EVM Guidelines.</p>
      </div>
    </div>
  );
}

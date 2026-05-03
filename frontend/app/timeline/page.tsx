"use client";
import { useState, useEffect } from "react";

const elections = [
  { id: "lok-sabha-2024", type: "Lok Sabha", label: "18th Lok Sabha General Election", year: 2024, phases: 7, voting: "Apr 19 – Jun 1, 2024", result: "Jun 4, 2024", status: "completed", seats: 543, turnout: "66.14%", color: "#6366f1" },
  { id: "delhi-2025", type: "Assembly", label: "Delhi Assembly Election 2025", state: "Delhi", year: 2025, phases: 1, voting: "Feb 5, 2025", result: "Feb 8, 2025", status: "completed", seats: 70, color: "#0ea5e9" },
  { id: "bihar-2025", type: "Assembly", label: "Bihar Assembly Election 2025", state: "Bihar", year: 2025, phases: 3, voting: "Oct 18 – Nov 1, 2025", result: "Nov 8, 2025", status: "upcoming", seats: 243, color: "#FF6B00" },
  { id: "lok-sabha-2029", type: "Lok Sabha", label: "19th Lok Sabha General Election", year: 2029, phases: 7, voting: "Apr–May 2029 (Estimated)", result: "Jun 2029 (Estimated)", status: "upcoming", seats: 543, color: "#138808" },
];

function Countdown({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTime({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [targetDate]);
  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      {[["d","Days"],["h","Hrs"],["m","Min"],["s","Sec"]].map(([k,l]) => (
        <div key={k} style={{ textAlign: "center" }}>
          <div style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "8px", padding: "0.35rem 0.65rem", fontWeight: 700, fontSize: "1.1rem", color: "#FF6B00", minWidth: "42px" }}>{String(time[k as keyof typeof time]).padStart(2,"0")}</div>
          <div style={{ fontSize: "0.6rem", color: "#8896B3", marginTop: "2px" }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function TimelinePage() {
  const [filter, setFilter] = useState<"all"|"upcoming"|"completed">("all");
  const filtered = elections.filter(e => filter === "all" || e.status === filter);

  return (
    <div className="page">
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>📅 Election Calendar</div>
      <h1 className="page-title">Election <span className="gradient-text">Timeline</span></h1>
      <p className="page-subtitle">Track upcoming and past Indian elections</p>

      {/* Filter */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {(["all","upcoming","completed"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "0.45rem 1.1rem", borderRadius: "50px", border: "1px solid", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", fontFamily: "Inter,sans-serif", transition: "all 0.2s", borderColor: filter===f ? "#FF6B00" : "var(--border)", background: filter===f ? "rgba(255,107,0,0.12)" : "transparent", color: filter===f ? "#FF6B00" : "#8896B3" }}>
            {f === "all" ? "All Elections" : f.charAt(0).toUpperCase()+f.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: "20px", top: 0, bottom: 0, width: "2px", background: "linear-gradient(to bottom,#FF6B00,#138808)", borderRadius: "1px" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingLeft: "50px" }}>
          {filtered.map(e => (
            <div key={e.id} style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "-38px", top: "20px", width: "16px", height: "16px", borderRadius: "50%", background: e.color, border: "3px solid var(--bg)", boxShadow: `0 0 12px ${e.color}88` }} />
              <div className="card" style={{ borderLeft: `3px solid ${e.color}`, borderRadius: "0 16px 16px 0" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, background: e.color+"22", border: `1px solid ${e.color}44`, borderRadius: "50px", padding: "0.2rem 0.7rem", color: e.color }}>{e.type}</span>
                  {e.state && <span className="tag">{e.state}</span>}
                  <span style={{ fontSize: "0.72rem", background: e.status==="upcoming" ? "rgba(255,107,0,0.12)" : "rgba(19,136,8,0.12)", border: `1px solid ${e.status==="upcoming" ? "rgba(255,107,0,0.3)" : "rgba(19,136,8,0.3)"}`, borderRadius: "50px", padding: "0.2rem 0.7rem", color: e.status==="upcoming" ? "#FF8C38" : "#4ade80" }}>
                    {e.status === "upcoming" ? "⏳ Upcoming" : "✅ Completed"}
                  </span>
                </div>
                <h3 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>{e.label}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  {[["📅 Voting Dates", e.voting], ["📊 Result", e.result], ["🏛️ Total Seats", e.seats.toString()], ["⚡ Phases", e.phases.toString()]].map(([k,v]) => (
                    <div key={k as string} style={{ background: "var(--bg-card2)", borderRadius: "10px", padding: "0.6rem 0.8rem" }}>
                      <div style={{ fontSize: "0.72rem", color: "#8896B3" }}>{k as string}</div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem", marginTop: "0.2rem" }}>{v as string}</div>
                    </div>
                  ))}
                </div>
                {e.status === "upcoming" && <Countdown targetDate={e.id === "bihar-2025" ? "2025-10-18" : "2029-04-15"} />}
                {e.turnout && <p style={{ marginTop: "0.75rem", fontSize: "0.82rem", color: "#8896B3" }}>📈 Voter Turnout: <strong style={{ color: "#4ade80" }}>{e.turnout}</strong></p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: "2rem", borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.05)" }}>
        <p style={{ fontSize: "0.82rem", color: "#8896B3" }}>📌 <strong>Source:</strong> Election Commission of India (eci.gov.in). Dates for 2029 are estimates. Official schedule released by ECI.</p>
      </div>
    </div>
  );
}

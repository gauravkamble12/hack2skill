"use client";
import { useState } from "react";
import IframeModal from "@/components/IframeModal";

const steps = {
  voter: [
    { num: 1, title: "Check Eligibility", icon: "✅", desc: "You must be 18+ years old and an Indian citizen.", detail: "Your age is calculated as of January 1st of the election year. Non-resident Indians (NRIs) can also register.", color: "#6366f1" },
    { num: 2, title: "Gather Documents", icon: "📋", desc: "Collect your age proof, address proof, and a passport photo.", detail: "Age proof: Aadhaar / Birth Certificate / Class 10 Marksheet\nAddress proof: Aadhaar / Utility Bill / Ration Card\nPhoto: Recent passport-size", color: "#0ea5e9" },
    { num: 3, title: "Fill Form 6", icon: "📝", desc: "Complete the New Voter Registration form online or offline.", detail: "Visit voters.eci.gov.in → New Voter Registration → Fill Form 6. You can also get a physical form from your local BLO (Booth Level Officer).", color: "#FF6B00" },
    { num: 4, title: "Submit & Track", icon: "📤", desc: "Submit online or at your BLO office. Track application status.", detail: "After submission you get a reference ID. Track at voters.eci.gov.in using the ID. Voter ID card is usually issued within 30 days.", color: "#138808" },
    { num: 5, title: "Find Polling Booth", icon: "📍", desc: "Before election day, locate your polling booth.", detail: "Search your name and polling booth at voters.eci.gov.in or call 1950. You can also use the Voter Helpline App.", color: "#f59e0b" },
    { num: 6, title: "Vote on Election Day!", icon: "🗳️", desc: "Carry your ID, go to the booth, and press the EVM button.", detail: "Carry your Voter ID or any 1 of 12 approved IDs. Voting hours are usually 7 AM – 6 PM. Your vote is completely secret!", color: "#ec4899" },
  ],
  candidate: [
    { num: 1, title: "Meet Eligibility", icon: "✅", desc: "Age 25+ (Lok Sabha/Assembly) or 30+ (Rajya Sabha). Indian citizen. Registered voter.", detail: "You must not hold any office of profit under the government. No conviction with 2+ year imprisonment.", color: "#6366f1" },
    { num: 2, title: "Get Nomination Form", icon: "📋", desc: "Collect Form 2B from the Returning Officer's office.", detail: "The Returning Officer (RO) is typically a senior IAS officer. Nomination window opens after the election schedule is announced.", color: "#0ea5e9" },
    { num: 3, title: "File Nomination", icon: "📝", desc: "Submit your nomination with proposers (voters from your constituency).", detail: "You need 1 proposer (Lok Sabha/Assembly) or 10 proposers (President/VP election). Nomination must be filed in person.", color: "#FF6B00" },
    { num: 4, title: "Submit Affidavit", icon: "📜", desc: "Declare all assets, liabilities, criminal cases, and education in Form 26.", detail: "This affidavit is public. Voters have the right to know your background. False declaration is a criminal offence.", color: "#138808" },
    { num: 5, title: "Pay Security Deposit", icon: "💰", desc: "₹25,000 for Lok Sabha (₹12,500 for SC/ST). ₹10,000 for Assembly.", detail: "The deposit is forfeited if you get less than 1/6th of valid votes polled. Payment via demand draft.", color: "#f59e0b" },
    { num: 6, title: "Campaign & Model Code", icon: "📣", desc: "Campaign following the Model Code of Conduct. Silence period 48 hrs before voting.", detail: "Maximum spending: ₹95 lakh (Lok Sabha), ₹40 lakh (Assembly). All expenses must be accounted for.", color: "#ec4899" },
  ],
};

export default function GuidePage() {
  const [tab, setTab] = useState<"voter" | "candidate">("voter");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [modalUrl, setModalUrl] = useState<{ url: string, title: string } | null>(null);

  return (
    <div className="page">
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>📖 Step-by-Step Guide</div>
      <h1 className="page-title">Election <span className="gradient-text">Guide</span></h1>
      <p className="page-subtitle">Everything you need to participate in Indian democracy</p>

      {/* Tab switcher */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", background: "var(--bg-card)", padding: "0.4rem", borderRadius: "50px", width: "fit-content" }}>
        {(["voter", "candidate"] as const).map(t => (
          <button key={t} onClick={() => { setTab(t); setExpanded(null); }} style={{
            padding: "0.55rem 1.5rem", borderRadius: "50px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "Inter,sans-serif",
            background: tab === t ? "linear-gradient(135deg,#FF6B00,#FF8C38)" : "transparent",
            color: tab === t ? "white" : "#8896B3", transition: "all 0.25s",
          }}>
            {t === "voter" ? "🗳️ Voter Registration" : "🏛️ Become a Candidate"}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {steps[tab].map((step, i) => (
          <div key={step.num} className="card" style={{ cursor: "pointer", borderColor: expanded === i ? step.color + "66" : "var(--border)" }} onClick={() => setExpanded(expanded === i ? null : i)}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: step.color + "22", border: `2px solid ${step.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                {step.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: step.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>Step {step.num}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>{step.title}</div>
                <div style={{ fontSize: "0.83rem", color: "#8896B3" }}>{step.desc}</div>
              </div>
              <span style={{ color: "#8896B3", fontSize: "1.1rem", transition: "transform 0.2s", transform: expanded === i ? "rotate(180deg)" : "none" }}>▾</span>
            </div>
            {expanded === i && (
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)", fontSize: "0.87rem", color: "#aab4cc", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {step.detail}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="card" style={{ marginTop: "2rem", background: "linear-gradient(135deg,rgba(255,107,0,0.08),rgba(19,136,8,0.05))", borderColor: "rgba(255,107,0,0.2)" }}>
        <h3 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, marginBottom: "0.75rem" }}>🔗 Official Resources</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {[
            { label: "🗳️ Register to Vote", url: "https://voters.eci.gov.in" },
            { label: "📍 Find Polling Booth", url: "https://voters.eci.gov.in/pollingstation" },
            { label: "📞 Voter Helpline 1950", url: "tel:1950" },
            { label: "🏛️ ECI Official Site", url: "https://eci.gov.in" },
          ].map(l => (
            <button 
              key={l.label} 
              onClick={() => l.url.startsWith('http') ? setModalUrl({ url: l.url, title: l.label }) : window.location.href = l.url} 
              className="btn btn-outline" 
              style={{ fontSize: "0.82rem" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <IframeModal 
        url={modalUrl?.url || null} 
        title={modalUrl?.title} 
        onClose={() => setModalUrl(null)} 
      />
    </div>
  );
}

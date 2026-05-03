"use client";
import { useState } from "react";

const articles = [
  { id: "lok-sabha", icon: "🏛️", title: "What is Lok Sabha?", tag: "Parliament", color: "#6366f1", readTime: "3 min", content: `The **Lok Sabha** (House of the People) is the lower house of India's Parliament.\n\n**Key Facts:**\n• 543 elected seats across India\n• Members elected by direct vote of citizens\n• Members are called MPs (Members of Parliament)\n• Term: 5 years (unless dissolved earlier)\n• Meets at Parliament House, New Delhi\n\n**Powers of Lok Sabha:**\n• Passes laws and the national budget\n• Can question the government during Question Hour\n• Can pass a No-Confidence Motion to remove the government\n• Money Bills can only be introduced here\n\n**Who can vote for Lok Sabha?**\nEvery Indian citizen aged 18 or above.\n\n📌 Source: Constitution of India, Articles 81-83` },
  { id: "rajya-sabha", icon: "🏟️", title: "What is Rajya Sabha?", tag: "Parliament", color: "#0ea5e9", readTime: "3 min", content: `The **Rajya Sabha** (Council of States) is the upper house of India's Parliament.\n\n**Key Facts:**\n• Maximum 250 seats (238 elected + 12 nominated by President)\n• Members NOT elected directly — chosen by elected State Assembly members\n• Term: 6 years per member\n• Rajya Sabha never fully dissolves — 1/3rd retire every 2 years\n\n**Powers:**\n• Reviews and suggests changes to bills passed by Lok Sabha\n• Represents state interests at the national level\n• Can initiate bills except Money Bills\n• Can pass Special Powers Resolution to expand Parliament's authority\n\n**Minimum age:** 30 years to be a member\n\n📌 Source: Constitution of India, Articles 80-84` },
  { id: "eci", icon: "⚖️", title: "Election Commission of India", tag: "Institutions", color: "#FF6B00", readTime: "4 min", content: `The **Election Commission of India (ECI)** is an autonomous constitutional authority responsible for administering all elections.\n\n**Established:** January 25, 1950 (National Voters' Day)\n**Constitutional Authority:** Article 324\n**Headquarters:** Nirvachan Sadan, New Delhi\n\n**Leadership:**\nHeaded by the Chief Election Commissioner (CEC) assisted by Election Commissioners\n\n**Key Responsibilities:**\n• Conducting free and fair elections\n• Maintaining electoral rolls (voter lists)\n• Enforcing Model Code of Conduct\n• Recognizing political parties and allotting symbols\n• Monitoring election expenditure limits\n• Setting election schedule and phases\n\n**Contact:**\n🌐 eci.gov.in\n📞 Voter Helpline: 1950\n\n📌 Source: Constitution of India, Article 324` },
  { id: "mcc", icon: "📜", title: "Model Code of Conduct", tag: "Rules", color: "#138808", readTime: "3 min", content: `The **Model Code of Conduct (MCC)** is a set of guidelines issued by ECI that all political parties and candidates must follow during elections.\n\n**When does it apply?**\nFrom the date of election announcement until results are declared.\n\n**Key Rules:**\n• No party can use government machinery for campaigning\n• No new government schemes can be announced\n• No inflammatory speeches targeting religion, caste, or community\n• No distribution of liquor, cash, or gifts to voters\n• Rallies need prior police permission\n• Campaign must stop 48 hours before polling (Silence Period)\n\n**Who must follow it?**\nAll political parties, candidates, and government officials.\n\n**Violations?**\nReport at 1950 or eci.gov.in\n\n📌 Source: ECI Model Code of Conduct Guidelines` },
  { id: "evm", icon: "🖥️", title: "How EVMs Work", tag: "Technology", color: "#f59e0b", readTime: "4 min", content: `**EVM (Electronic Voting Machine)** has been used in all Indian elections since 2004.\n\n**Two Components:**\n1. **Ballot Unit** — in the voting compartment, shows candidates with blue buttons\n2. **Control Unit** — with the Presiding Officer, enables each vote\n\n**Voting Process:**\n1. Presiding Officer enables the ballot unit for you\n2. You press the blue button next to your chosen candidate\n3. A beep sound confirms the vote is registered\n4. VVPAT machine shows a confirmation slip for 7 seconds\n5. The slip drops into a sealed box\n\n**Security Features:**\n• No internet/wireless connection possible\n• One-time programmable microchip\n• Automatically locks after polling ends\n• Time-stamped, sequential vote recording\n• Tamper-evident seals on all units\n\n📌 Source: ECI EVM Technical Handbook` },
  { id: "voter-reg", icon: "📋", title: "Voter Registration Process", tag: "How-To", color: "#ec4899", readTime: "5 min", content: `**How to Register as a Voter in India:**\n\n**Eligibility:**\n• Indian citizen\n• Age 18+ as of January 1 of the reference year\n• Must have an address in the constituency\n\n**Documents Needed:**\n• Age proof: Aadhaar / Birth Certificate / Class 10 Certificate\n• Address proof: Aadhaar / Utility Bill / Bank Passbook\n• Passport-size photograph\n\n**Online Registration:**\n1. Visit voters.eci.gov.in\n2. Click "New Voter Registration"\n3. Fill Form 6 with all details\n4. Upload documents and photo\n5. Submit and note your Reference ID\n6. Track status using Reference ID\n\n**Offline Registration:**\nGet Form 6 from your local BLO (Booth Level Officer) or ECI office.\n\n**Voter Helpline App:**\nAvailable on Google Play Store and Apple App Store\n\n📞 Call 1950 for help\n📌 Source: ECI Voter Registration Portal` },
];

const badges = [
  { id: "scholar", icon: "📖", title: "Civic Scholar", desc: "Read 3 articles", req: 3, color: "#6366f1" },
  { id: "expert", icon: "🎓", title: "Democracy Expert", desc: "Read all articles", req: 6, color: "#FF6B00" },
  { id: "champion", icon: "🏆", title: "Civic Champion", desc: "Complete everything", req: 6, color: "#FFD700" },
];

export default function LearnPage() {
  const [read, setRead] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<string | null>(null);

  const openArticle = (id: string) => {
    setOpen(id);
    setRead(prev => new Set([...prev, id]));
  };

  const renderContent = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>").replace(/^• /gm, "&#8226; ");

  return (
    <div className="page">
      <div className="badge badge-blue" style={{ marginBottom: "0.75rem" }}>📚 Learning Hub</div>
      <h1 className="page-title">Learn About <span className="gradient-text">Elections</span></h1>
      <p className="page-subtitle">Short, simple explainers about Indian democracy — {read.size}/{articles.length} articles read</p>

      {/* Progress */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ height: "8px", background: "var(--bg-card)", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(read.size / articles.length) * 100}%`, background: "linear-gradient(90deg,#FF6B00,#138808)", borderRadius: "4px", transition: "width 0.5s ease" }} />
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        {badges.map(b => {
          const earned = read.size >= b.req;
          return (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "50px", border: `1px solid ${earned ? b.color : "var(--border)"}`, background: earned ? b.color + "22" : "var(--bg-card)", transition: "all 0.3s", opacity: earned ? 1 : 0.5 }}>
              <span style={{ fontSize: "1.1rem" }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: earned ? b.color : "#8896B3" }}>{b.title}</div>
                <div style={{ fontSize: "0.65rem", color: "#8896B3" }}>{earned ? "✅ Earned!" : b.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Articles grid */}
      {!open ? (
        <div className="grid-2">
          {articles.map(a => (
            <div key={a.id} className="card" onClick={() => openArticle(a.id)} style={{ cursor: "pointer", position: "relative", overflow: "hidden" }}>
              {read.has(a.id) && <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(34,197,94,0.2)", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "50px", padding: "0.15rem 0.5rem", fontSize: "0.65rem", color: "#4ade80", fontWeight: 600 }}>✓ Read</div>}
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{a.icon}</div>
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.68rem", background: a.color + "22", border: `1px solid ${a.color}44`, borderRadius: "4px", padding: "0.15rem 0.5rem", color: a.color, fontWeight: 600 }}>{a.tag}</span>
                <span style={{ fontSize: "0.68rem", color: "#8896B3" }}>⏱ {a.readTime} read</span>
              </div>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{a.title}</h3>
              <p style={{ fontSize: "0.8rem", color: "#8896B3" }}>Tap to read →</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="fade-up">
          {(() => { const a = articles.find(x => x.id === open)!; return (
            <div className="card">
              <button onClick={() => setOpen(null)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "50px", padding: "0.4rem 1rem", color: "#8896B3", cursor: "pointer", fontSize: "0.82rem", marginBottom: "1.25rem", fontFamily: "Inter,sans-serif" }}>← Back to Articles</button>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{a.icon}</div>
              <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.72rem", background: a.color + "22", border: `1px solid ${a.color}44`, borderRadius: "4px", padding: "0.2rem 0.6rem", color: a.color, fontWeight: 600 }}>{a.tag}</span>
                <span style={{ fontSize: "0.72rem", color: "#8896B3" }}>⏱ {a.readTime}</span>
              </div>
              <h2 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.25rem" }}>{a.title}</h2>
              <div style={{ fontSize: "0.9rem", color: "#aab4cc", lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: renderContent(a.content) }} />
              <div className="divider" />
              <div style={{ fontSize: "0.75rem", color: "#5a6a8a" }}>✅ Marked as read • {new Date().toLocaleDateString("en-IN")}</div>
            </div>
          )})()}
        </div>
      )}
    </div>
  );
}

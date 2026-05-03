"use client";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Tab = "voter" | "candidate";

type QuestionOption = { v: string; l: string };
type Question = { id: string; label: string; type: string; key: string; placeholder?: string; invert?: boolean; options?: QuestionOption[] };

const voterQuestions: Question[] = [
  { id: "age", label: "How old are you?", type: "number", placeholder: "Enter your age", key: "age" },
  { id: "citizen", label: "Are you an Indian citizen?", type: "yesno", key: "citizen" },
  { id: "mentalHealth", label: "Has any court declared you of unsound mind?", type: "yesno", invert: true, key: "mentalHealth" },
  { id: "convicted", label: "Have you been convicted of a crime that disqualifies voters?", type: "yesno", invert: true, key: "convicted" },
  { id: "inVoterList", label: "Is your name in the electoral roll (voter list)?", type: "yesno", key: "inVoterList" },
];

const candidateQuestions: Question[] = [
  { id: "electionType", label: "Which election do you want to contest?", type: "select", options: [{ v: "lok_sabha", l: "Lok Sabha" }, { v: "assembly", l: "Assembly (Vidhan Sabha)" }, { v: "rajya_sabha", l: "Rajya Sabha" }], key: "electionType" },
  { id: "age", label: "How old are you?", type: "number", placeholder: "Enter your age", key: "age" },
  { id: "citizen", label: "Are you an Indian citizen?", type: "yesno", key: "citizen" },
  { id: "registeredVoter", label: "Are you a registered voter?", type: "yesno", key: "registeredVoter" },
  { id: "officeOfProfit", label: "Do you hold any government Office of Profit?", type: "yesno", invert: true, key: "officeOfProfit" },
  { id: "convicted", label: "Do you have any conviction with 2+ years imprisonment?", type: "yesno", invert: true, key: "convicted" },
];

export default function EligibilityPage() {
  const [tab, setTab] = useState<Tab>("voter");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const questions = tab === "voter" ? voterQuestions : candidateQuestions;
  const current = questions[step];

  const handleAnswer = (val: unknown) => {
    const updated = { ...answers, [current.key]: val };
    setAnswers(updated);
    if (step < questions.length - 1) { setStep(step + 1); }
    else { submitCheck(updated); }
  };

  const submitCheck = async (data: Record<string, unknown>) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/eligibility/${tab}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setResult(await res.json());
    } catch {
      setResult({ eligible: null, message: "⚠️ Could not connect to server. Please check if the backend is running." });
    }
    setLoading(false);
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };

  return (
    <div className="page" style={{ maxWidth: "680px" }}>
      <div className="badge badge-green" style={{ marginBottom: "0.75rem" }}>✅ Instant Check</div>
      <h1 className="page-title">Eligibility <span className="gradient-green">Checker</span></h1>
      <p className="page-subtitle">Find out if you can vote or contest elections in India</p>

      {/* Tab */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", background: "var(--bg-card)", padding: "0.4rem", borderRadius: "50px", width: "fit-content" }}>
        {(["voter","candidate"] as const).map(t => (
          <button key={t} onClick={() => { setTab(t); reset(); }} style={{ padding: "0.55rem 1.5rem", borderRadius: "50px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "Inter,sans-serif", background: tab===t ? "linear-gradient(135deg,#138808,#1aad0a)" : "transparent", color: tab===t ? "white" : "#8896B3", transition: "all 0.25s" }}>
            {t === "voter" ? "🗳️ Can I Vote?" : "🏛️ Can I Contest?"}
          </button>
        ))}
      </div>

      {!result ? (
        <div className="card">
          {/* Progress bar */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#8896B3" }}>Question {step + 1} of {questions.length}</span>
              <span style={{ fontSize: "0.78rem", color: "#FF6B00" }}>{Math.round((step / questions.length) * 100)}%</span>
            </div>
            <div style={{ height: "6px", background: "var(--bg-card2)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(step / questions.length) * 100}%`, background: "linear-gradient(90deg,#FF6B00,#138808)", borderRadius: "3px", transition: "width 0.4s ease" }} />
            </div>
          </div>

          <h2 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: "1.15rem", marginBottom: "1.5rem", lineHeight: 1.4 }}>{current.label}</h2>

          {current.type === "yesno" && (
            <div style={{ display: "flex", gap: "1rem" }}>
              {[{ l: "Yes ✓", v: true }, { l: "No ✗", v: false }].map(opt => (
                <button key={String(opt.v)} onClick={() => handleAnswer(current.invert ? !opt.v : opt.v)} style={{ flex: 1, padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", cursor: "pointer", fontWeight: 600, fontSize: "1rem", fontFamily: "Inter,sans-serif", background: "var(--bg-card2)", color: "var(--text)", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor="#FF6B00"; (e.target as HTMLElement).style.color="#FF6B00"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor="var(--border)"; (e.target as HTMLElement).style.color="var(--text)"; }}>
                  {opt.l}
                </button>
              ))}
            </div>
          )}

          {current.type === "number" && (
            <div style={{ display: "flex", gap: "1rem" }}>
              <input className="input" type="number" placeholder={current.placeholder} style={{ flex: 1 }}
                onKeyDown={e => { if(e.key==="Enter") { const v = parseInt((e.target as HTMLInputElement).value); if(v>0) handleAnswer(v); }}} />
              <button className="btn btn-primary" onClick={e => { const inp = (e.target as HTMLElement).closest("div")?.querySelector("input") as HTMLInputElement; const v = parseInt(inp.value); if(v>0) handleAnswer(v); }}>Next →</button>
            </div>
          )}

          {current.type === "select" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {current.options?.map(opt => (
                <button key={opt.v} onClick={() => handleAnswer(opt.v)} style={{ padding: "0.85rem 1.25rem", borderRadius: "12px", border: "1px solid var(--border)", cursor: "pointer", fontWeight: 500, fontSize: "0.95rem", fontFamily: "Inter,sans-serif", background: "var(--bg-card2)", color: "var(--text)", textAlign: "left", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.borderColor="#FF6B00"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.borderColor="var(--border)"; }}>
                  🏛️ {opt.l}
                </button>
              ))}
            </div>
          )}

          {loading && <div style={{ textAlign: "center", padding: "1rem", color: "#8896B3" }}>Checking eligibility...</div>}
        </div>
      ) : (
        <div className="fade-up">
          {/* Result card */}
          <div className="card" style={{ borderColor: result.eligible ? "rgba(19,136,8,0.4)" : "rgba(239,68,68,0.4)", background: result.eligible ? "rgba(19,136,8,0.06)" : "rgba(239,68,68,0.06)", marginBottom: "1.25rem", textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>{result.eligible === true ? "🎉" : result.eligible === false ? "❌" : "⚠️"}</div>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "1.4rem", color: result.eligible === true ? "#4ade80" : result.eligible === false ? "#f87171" : "#fbbf24", marginBottom: "0.75rem" }}>
              {result.eligible === true ? "You are Eligible!" : result.eligible === false ? "Not Eligible" : "Check Failed"}
            </h2>
            <p style={{ color: "#aab4cc", lineHeight: 1.6, fontSize: "0.9rem" }}>{result.message as string}</p>
          </div>

          {/* Checks */}
          {Array.isArray(result.checks) && (
            <div className="card" style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, marginBottom: "1rem" }}>Eligibility Breakdown</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {(result.checks as Array<{pass: boolean; rule: string; detail: string; warning?: boolean}>).map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0.75rem", borderRadius: "10px", background: c.pass ? "rgba(19,136,8,0.08)" : c.warning ? "rgba(245,158,11,0.08)" : "rgba(239,68,68,0.08)" }}>
                    <span style={{ fontSize: "1rem" }}>{c.pass ? "✅" : c.warning ? "⚠️" : "❌"}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{c.rule}</div>
                      <div style={{ fontSize: "0.8rem", color: "#8896B3" }}>{c.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next steps */}
          {Array.isArray(result.nextSteps) && (
            <div className="card" style={{ marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, marginBottom: "0.75rem" }}>Next Steps</h3>
              {(result.nextSteps as string[]).map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#FF6B00", fontWeight: 700 }}>{i + 1}.</span>
                  <span style={{ fontSize: "0.87rem", color: "#aab4cc" }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={reset} className="btn btn-outline" style={{ width: "100%" }}>🔄 Check Again</button>
        </div>
      )}
    </div>
  );
}

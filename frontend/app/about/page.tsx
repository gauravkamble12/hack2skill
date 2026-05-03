"use client";
import { ShieldCheck, Heart, Code } from "lucide-react";

export default function AboutPage() {

  return (
    <div className="page">
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>🇮🇳 Mission: Matdata Mitra</div>
      <h1 className="page-title">About the <span className="gradient-text">Project</span></h1>
      <p className="page-subtitle">Building technology for a more informed and active Indian democracy</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* The Why */}
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Heart color="#FF6B00" /> The Mission
          </h2>
          <div className="card">
            <p style={{ color: "#aab4cc", lineHeight: 1.8 }}>
              With over <strong>96.8 Crore</strong> registered voters, India is the world&apos;s largest democracy. However, the voter turnout in 2024 was around <strong>66%</strong>. 
              <br/><br/>
              <strong>Matdata Mitra</strong> was built to bridge this gap. Our goal is to provide every Indian citizen with a simple, neutral, and interactive AI assistant that makes the voting process accessible to everyone—from tech-savvy city dwellers to first-time voters in rural villages.
            </p>
          </div>
        </section>

        {/* The Tech */}
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Code color="#FF6B00" /> Tech Stack
          </h2>
          <div className="grid-3">
            {[
              { title: "Frontend", val: "Next.js 15, TypeScript", icon: "🌐" },
              { title: "AI Engine", val: "Gemini 1.5 Flash API", icon: "🤖" },
              { title: "Maps", val: "Leaflet, React Simple Maps", icon: "📍" },
              { title: "Styling", val: "Framer Motion, CSS3", icon: "🎨" },
              { title: "Backend", val: "Node.js, Express", icon: "⚙️" },
              { title: "Data", val: "ECI Official Public Datasets", icon: "📊" },
            ].map(s => (
              <div key={s.title} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: "0.2rem" }}>{s.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#8896B3" }}>{s.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <ShieldCheck color="#FF6B00" /> Our Principles
          </h2>
          <div className="grid-2">
            {[
              { title: "Strict Neutrality", desc: "Matdata Mitra never shows bias toward any political party or candidate. We follow the ECI Model Code of Conduct." },
              { title: "Privacy First", desc: "Your location and chat data are processed in real-time and never stored on our servers." },
              { title: "Accuracy", desc: "All data is sourced directly from the Election Commission of India (ECI) and the Constitution of India." },
              { title: "Accessibility", desc: "Multilingual UI and Voice Input support ensures that every citizen, regardless of language or literacy, can participate." },
            ].map(p => (
              <div key={p.title} className="card">
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem", color: "#FF8C38" }}>{p.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "#aab4cc", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <div className="card" style={{ background: "rgba(255,107,0,0.06)", borderColor: "rgba(255,107,0,0.2)", textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", color: "#8896B3", margin: 0 }}>
            Made By Gaurav Kamble for the <strong>Hack2Skill</strong> Challenge. <br/>
            Let&apos;s make democracy work for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

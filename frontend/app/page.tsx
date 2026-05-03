"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, BookOpen, Calendar, CheckCircle, Vote, GraduationCap, 
  Search, ShieldCheck, MapPin, Users, Info, ChevronRight, Sparkles 
} from "lucide-react";
import dynamic from "next/dynamic";

const IndiaMap = dynamic(() => import("@/components/IndiaMapWrapper"), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: 400, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      color: "#8896B3",
      background: "rgba(255,255,255,0.02)",
      borderRadius: "20px",
      border: "1px solid rgba(255,255,255,0.08)"
    }}>
      Loading Map...
    </div>
  ),
});
import WhatsAppSubscription from "@/components/WhatsAppSubscription";
import { useLang } from "@/contexts/LangContext";

const features = [
  { icon: <Bot size={24} />, title: "Ask Matdata Mitra", desc: "AI-powered Q&A about Indian elections in simple language", href: "/chat", color: "#FF6B00" },
  { icon: <BookOpen size={24} />, title: "Election Guide", desc: "Step-by-step guide to register and vote", href: "/guide", color: "#6366f1" },
  { icon: <Calendar size={24} />, title: "Timeline Tracker", desc: "Upcoming elections with countdowns and key dates", href: "/timeline", color: "#0ea5e9" },
  { icon: <CheckCircle size={24} />, title: "Eligibility Checker", desc: "Find out if you can vote or contest elections", href: "/eligibility", color: "#138808" },
  { icon: <Vote size={24} />, title: "Mock EVM Simulator", desc: "Practice voting with a realistic EVM demo", href: "/simulator", color: "#f59e0b" },
  { icon: <GraduationCap size={24} />, title: "Learning Hub", desc: "Short explainers on Lok Sabha, ECI and more", href: "/learn", color: "#ec4899" },
  { icon: <Search size={24} />, title: "Candidate Explorer", desc: "Neutral profiles with declared assets & education", href: "/candidates", color: "#14b8a6" },
];

function CountdownTimer() {
  const target = new Date("2025-11-01T00:00:00");
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const box = (val: number, label: string) => (
    <div style={{ textAlign: "center", minWidth: "60px" }}>
      <div style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "10px", padding: "0.5rem 0.75rem", fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "#FF6B00" }}>{String(val).padStart(2, "0")}</div>
      <div style={{ fontSize: "0.65rem", color: "#8896B3", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", flexWrap: "wrap" }}>
      {box(time.d, "Days")} <span style={{ color: "#FF6B00", fontSize: "1.4rem", paddingTop: "0.4rem" }}>:</span>
      {box(time.h, "Hours")} <span style={{ color: "#FF6B00", fontSize: "1.4rem", paddingTop: "0.4rem" }}>:</span>
      {box(time.m, "Mins")} <span style={{ color: "#FF6B00", fontSize: "1.4rem", paddingTop: "0.4rem" }}>:</span>
      {box(time.s, "Secs")}
    </div>
  );
}

export default function HomePage() {
  const { t } = useLang();
  const [selectedState, setSelectedState] = useState("");

  const STATES_DATA: Record<string, { next: string; turnout: string; seats: number; ruling: string }> = {
    "Maharashtra": { next: "Assembly 2024", turnout: "61.3%", seats: 288, ruling: "Alliance" },
    "Bihar": { next: "Assembly 2025", turnout: "57.3%", seats: 243, ruling: "Alliance" },
    "Delhi": { next: "Assembly 2025", turnout: "62.8%", seats: 70, ruling: "AAP" },
    "Telangana": { next: "Assembly 2028", turnout: "71.3%", seats: 119, ruling: "INC" },
    "Uttar Pradesh": { next: "Assembly 2027", turnout: "61.0%", seats: 403, ruling: "BJP" },
    "Rajasthan": { next: "Assembly 2028", turnout: "74.6%", seats: 200, ruling: "BJP" },
    "Gujarat": { next: "Assembly 2027", turnout: "64.3%", seats: 182, ruling: "BJP" },
    "Karnataka": { next: "Assembly 2028", turnout: "73.2%", seats: 224, ruling: "INC" },
    "Tamil Nadu": { next: "Assembly 2026", turnout: "73.3%", seats: 234, ruling: "DMK" },
    "West Bengal": { next: "Assembly 2026", turnout: "81.7%", seats: 294, ruling: "AITC" },
    "Kerala": { next: "Assembly 2026", turnout: "73.9%", seats: 140, ruling: "LDF" },
    "Andhra Pradesh": { next: "Assembly 2029", turnout: "80.4%", seats: 175, ruling: "TDP" },
    "Madhya Pradesh": { next: "Assembly 2028", turnout: "77.1%", seats: 230, ruling: "BJP" },
    "Punjab": { next: "Assembly 2027", turnout: "71.9%", seats: 117, ruling: "AAP" },
    "Haryana": { next: "Assembly 2029", turnout: "68.2%", seats: 90, ruling: "BJP" },
    "Odisha": { next: "Assembly 2029", turnout: "73.1%", seats: 147, ruling: "BJP" },
    "Assam": { next: "Assembly 2026", turnout: "82.3%", seats: 126, ruling: "BJP" },
    "Jharkhand": { next: "Assembly 2024", turnout: "65.2%", seats: 81, ruling: "JMM" },
    "Chhattisgarh": { next: "Assembly 2028", turnout: "76.3%", seats: 90, ruling: "BJP" },
  };

  const stateDetails = selectedState ? STATES_DATA[selectedState] || { next: "TBD", turnout: "N/A", seats: 0, ruling: "N/A" } : null;

  return (
    <div className="page" style={{ overflow: "hidden" }}>
      {/* ─── HERO ─── */}
      <section style={{ textAlign: "center", padding: "4rem 0 3.5rem", position: "relative" }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,107,0,0.12)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "50px", padding: "0.4rem 1.25rem", fontSize: "0.85rem", color: "#FF8C38", marginBottom: "2rem" }}
        >
          <Sparkles size={16} /> Empowering 96.8 Crore Indian Voters
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: "clamp(2rem,8vw,4.5rem)", fontFamily: "Poppins,sans-serif", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}
        >
          {t("home.hero.title")}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ color: "#8896B3", fontSize: "clamp(0.95rem,2.5vw,1.15rem)", maxWidth: "700px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}
        >
          {t("home.hero.subtitle")}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}
        >
          <Link href="/chat" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.85rem 1.75rem" }}>
            <Bot size={18} /> Chat with AI
          </Link>
          <Link href="/eligibility" className="btn btn-outline" style={{ fontSize: "1rem", padding: "0.85rem 1.75rem", borderColor: "#138808", color: "#138808" }}>
            <CheckCircle size={18} /> Check Eligibility
          </Link>
          <Link href="/find-booth" className="btn btn-outline" style={{ fontSize: "1rem", padding: "0.85rem 1.75rem" }}>
            <MapPin size={18} /> Find Your Booth
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: "2rem", padding: "1.25rem", background: "rgba(255,107,0,0.06)", borderRadius: "12px", border: "1px dashed rgba(255,107,0,0.2)", display: "inline-block" }}
        >
          <div style={{ fontSize: "0.8rem", color: "#8896B3", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "1px" }}>Next Major Election</div>
          <CountdownTimer />
        </motion.div>

        {/* First Vote CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: "3rem" }}
        >
          <Link href="/first-vote" style={{ 
            display: "inline-flex", alignItems: "center", gap: "0.75rem", 
            background: "rgba(255,107,0,0.05)", border: "1px solid rgba(255,107,0,0.2)", 
            padding: "0.75rem 1.5rem", borderRadius: "12px", color: "#FF8C38",
            fontSize: "0.95rem", fontWeight: 600, textDecoration: "none"
          }}>
            <Sparkles size={18} /> First time voting? Use our 2-minute wizard <ChevronRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ─── INTERACTIVE MAP SECTION ─── */}
      <section style={{ marginBottom: "4rem" }}>
        <div className="grid-2" style={{ alignItems: "center", gap: "3rem" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="badge badge-saffron" style={{ marginBottom: "1rem" }}>📍 Geographic Explorer</div>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>{t("home.map.title")}</h2>
            <p style={{ color: "#8896B3", marginBottom: "2rem", lineHeight: 1.7 }}>
              Click on any state on the map to find upcoming election dates, candidate details, and constituency information. Our data is synced with official ECI records.
            </p>
            {selectedState && stateDetails && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ borderLeft: "4px solid #FF6B00" }}>
                <h4 style={{ fontWeight: 800, marginBottom: "0.5rem" }}>{selectedState} Highlights</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontSize: "0.85rem", color: "#aab4cc" }}>• Next Election: {stateDetails.next}</div>
                  <div style={{ fontSize: "0.85rem", color: "#aab4cc" }}>• Voter Turnout: {stateDetails.turnout}</div>
                  <div style={{ fontSize: "0.85rem", color: "#aab4cc" }}>• Assembly Seats: {stateDetails.seats}</div>
                  <div style={{ fontSize: "0.85rem", color: "#aab4cc" }}>• Current Ruling Party/Alliance: {stateDetails.ruling}</div>
                  <Link href="/timeline" style={{ color: "#FF6B00", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.5rem" }}>
                    View State Timeline <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <IndiaMap onSelectState={setSelectedState} selectedState={selectedState} />
          </motion.div>
        </div>
      </section>

      {/* ─── COUNTDOWN ─── */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card" 
        style={{ marginBottom: "4rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(19,136,8,0.06))", borderColor: "rgba(255,107,0,0.25)", padding: "2.5rem" }}
      >
        <div style={{ flex: 1, minWidth: "280px" }}>
          <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>⏳ Countdown to Democracy</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800 }}>Bihar Assembly Election 2025</h2>
          <p style={{ color: "#8896B3", fontSize: "0.95rem", marginTop: "0.5rem" }}>The next major test for democracy in Bihar begins in October.</p>
        </div>
        <CountdownTimer />
        <Link href="/timeline" className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>Track All Dates <ChevronRight size={18} /></Link>
      </motion.section>

      {/* ─── WHATSAPP SUBSCRIPTION ─── */}
      <section id="whatsapp" style={{ marginBottom: "4rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <WhatsAppSubscription />
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ marginBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>{t("home.features.title")}</h2>
          <p style={{ color: "#8896B3" }}>The complete toolkit for an informed citizen</p>
        </div>
        <div className="grid-3">
          {features.map((f, i) => (
            <motion.div 
              key={f.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={f.href} style={{ textDecoration: "none" }}>
                <div className="card" style={{ height: "100%", cursor: "pointer", transition: "all 0.3s" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: f.color + "15", border: `1px solid ${f.color}33`, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, marginBottom: "1.25rem" }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.75rem", color: "#F0F4FF" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#8896B3", lineHeight: 1.6 }}>{f.desc}</p>
                  <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", fontWeight: 700, color: f.color }}>
                    Explore <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TRUST STATS ─── */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {[
          { icon: <Users />, v: "96.8Cr+", l: "Voter Base", c: "#FF6B00" },
          { icon: <MapPin />, v: "543", l: "Constituencies", c: "#138808" },
          { icon: <Info />, v: "1950", l: "ECI Helpline", c: "#0ea5e9" },
          { icon: <ShieldCheck />, v: "Secure", l: "EVM Protocol", c: "#8b5cf6" },
        ].map((s, i) => (
          <motion.div 
            key={s.l}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card" 
            style={{ textAlign: "center", borderBottom: `3px solid ${s.c}` }}
          >
            <div style={{ color: s.c, display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>{s.icon}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, fontFamily: "Poppins" }}>{s.v}</div>
            <div style={{ fontSize: "0.8rem", color: "#8896B3", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{s.l}</div>
          </motion.div>
        ))}
      </section>

      {/* ─── FOOTER DISCLAIMER ─── */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="card" 
        style={{ background: "rgba(10,14,26,0.5)", borderColor: "var(--border)", padding: "2rem" }}
      >
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <ShieldCheck size={40} color="#138808" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, marginBottom: "0.4rem", fontSize: "1.1rem" }}>Neutral Civic Education Platform</div>
            <p style={{ fontSize: "0.85rem", color: "#8896B3", lineHeight: 1.6 }}>
              Matdata Mitra is an independent tool for civic education. We strictly follow the <strong>ECI Model Code of Conduct</strong> and do not promote any political party or candidate. All data is sourced directly from <strong>eci.gov.in</strong>.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

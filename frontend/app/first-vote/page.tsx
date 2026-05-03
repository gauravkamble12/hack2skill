"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, UserPlus, MapPin, Vote, Share2, 
  ChevronRight, ChevronLeft, Sparkles, Trophy 
} from "lucide-react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

const steps = [
  {
    id: "welcome",
    title: "Welcome, Future Voter!",
    desc: "Turning 18 is a milestone. Your first vote is your voice in India's future. Let's get you ready in 2 minutes.",
    icon: <Sparkles size={48} color="#FF6B00" />,
    btn: "Let's Start!",
  },
  {
    id: "eligibility",
    title: "Step 1: Check Eligibility",
    desc: "Are you an Indian citizen and 18+? You must also be a resident of the area where you want to register.",
    icon: <CheckCircle2 size={48} color="#138808" />,
    action: "/eligibility",
    btn: "Am I Eligible?",
  },
  {
    id: "register",
    title: "Step 2: Get Registered",
    desc: "Need to enroll? Visit voters.eci.gov.in and fill Form 6. You'll need Aadhaar, Address Proof, and a Photo.",
    icon: <UserPlus size={48} color="#6366f1" />,
    link: "https://voters.eci.gov.in",
    btn: "Go to ECI Portal",
  },
  {
    id: "find",
    title: "Step 3: Know Your Booth",
    desc: "Once registered, your name will appear on the Electoral Roll. Use our finder to locate your nearest booth.",
    icon: <MapPin size={48} color="#ec4899" />,
    action: "/find-booth",
    btn: "Find My Booth",
  },
  {
    id: "practice",
    title: "Step 4: Practice Voting",
    desc: "Don't be nervous! Use our Mock EVM Simulator to practice casting a vote with VVPAT confirmation.",
    icon: <Vote size={48} color="#f59e0b" />,
    action: "/simulator",
    btn: "Try EVM Simulator",
  },
  {
    id: "pledge",
    title: "Final Step: Take the Pledge",
    desc: "\"I will vote in every election, without fear or favor, to uphold the dignity of my democracy.\"",
    icon: <Trophy size={48} color="#FFD700" />,
    btn: "Take the Pledge & Share",
  }
];

export default function FirstVotePage() {
  const [current, setCurrent] = useState(0);
  const [pledged, setPledged] = useState(false);
  const { t } = useLang();

  const next = () => current < steps.length - 1 && setCurrent(current + 1);
  const prev = () => current > 0 && setCurrent(current - 1);

  const step = steps[current];

  return (
    <div className="page" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: "600px", width: "100%" }}>
        
        {/* Progress Bar */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem" }}>
          {steps.map((_, i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, height: "6px", borderRadius: "3px",
                background: i <= current ? "var(--saffron)" : "var(--border)",
                transition: "all 0.4s ease"
              }} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
            style={{ padding: "3rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}
          >
            {/* Background Glow */}
            <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "150px", height: "150px", background: "var(--saffron)", filter: "blur(80px)", opacity: 0.1, pointerEvents: "none" }} />
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                {step.icon}
              </motion.div>
            </div>

            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>{step.title}</h2>
            <p style={{ color: "#aab4cc", lineHeight: 1.7, marginBottom: "2.5rem", fontSize: "1.05rem" }}>{step.desc}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {step.link ? (
                <a href={step.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: "1rem" }}>
                  {step.btn} <ChevronRight size={18} />
                </a>
              ) : step.action ? (
                <Link href={step.action} className="btn btn-primary" style={{ padding: "1rem" }}>
                  {step.btn} <ChevronRight size={18} />
                </Link>
              ) : (
                <button 
                  onClick={() => {
                    if (step.id === "pledge") setPledged(true);
                    next();
                  }} 
                  className="btn btn-primary" 
                  style={{ padding: "1rem" }}
                  disabled={current === steps.length - 1 && pledged}
                >
                  {current === steps.length - 1 ? (pledged ? "Pledge Taken! 🇮🇳" : "Take the Pledge") : step.btn} 
                  {current < steps.length - 1 && <ChevronRight size={18} />}
                </button>
              )}

              {current > 0 && (
                <button onClick={prev} className="btn btn-outline" style={{ border: "none", color: "#8896B3" }}>
                  <ChevronLeft size={16} /> Go Back
                </button>
              )}
            </div>

            {pledged && current === steps.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: "2rem", padding: "1rem", background: "rgba(19,136,8,0.1)", border: "1px solid rgba(19,136,8,0.2)", borderRadius: "12px", color: "#4ade80", fontSize: "0.9rem" }}
              >
                🎉 <strong>Congratulations!</strong> You are now ready to be a part of India&apos;s democracy. Share your journey with #MeraPehlaVote
                <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                   <button className="btn btn-green" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                     <Share2 size={14} /> WhatsApp Share
                   </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.8rem", color: "#5a6a8a" }}>
          Step {current + 1} of {steps.length} • Matdata Mitra Onboarding
        </p>
      </div>
    </div>
  );
}

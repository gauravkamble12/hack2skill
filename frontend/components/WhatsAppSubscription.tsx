"use client";
import { useState } from "react";
import { MessageSquare, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LangContext";

export default function WhatsAppSubscription() {
  const { t, lang } = useLang();
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    if (!/^\d{10}$/.test(phone)) {
      setMsg(lang === "hi" ? "कृपया 10 अंकों का वैध नंबर दर्ज करें।" : "Please enter a valid 10-digit number.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 
        (typeof window !== "undefined" && window.location.hostname !== "localhost" 
          ? "https://backend-zeta-gilt-i7moh0tq0f.vercel.app" 
          : "http://localhost:5000");

      const res = await fetch(`${apiBase}/api/notifications/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        // Trigger WhatsApp Opt-in after a short delay
        setTimeout(() => {
          const waMsg = encodeURIComponent(lang === "hi" ? "मैं मतदाता मित्र चुनाव अलर्ट के लिए सब्सक्राइब करना चाहता हूं! 🗳️" : "I want to subscribe to Matdata Mitra Election Alerts! 🗳️");
          window.open(`https://wa.me/91${phone}?text=${waMsg}`, "_blank");
        }, 1500);
      } else {
        setMsg(data.error || "Failed to subscribe.");
        setStatus("error");
      }
    } catch {
      setMsg("Connection error.");
      setStatus("error");
    }
  };

  return (
    <div className="card" style={{ 
      background: "linear-gradient(135deg, rgba(37, 211, 102, 0.1) 0%, rgba(10, 14, 26, 0.5) 100%)",
      border: "1px solid rgba(37, 211, 102, 0.2)",
      padding: "2rem",
      textAlign: "center",
      overflow: "hidden",
      position: "relative"
    }}>
      <div style={{ position: "absolute", top: "-20px", right: "-20px", fontSize: "5rem", opacity: 0.05, transform: "rotate(15deg)" }}>
        <MessageSquare size={120} />
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "1rem 0" }}
          >
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
              <CheckCircle2 color="white" size={32} />
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#25D366", marginBottom: "0.5rem" }}>{t("wa.success")}</h3>
            <p style={{ color: "#8896B3" }}>{t("wa.optin")}</p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
              <div style={{ padding: "0.75rem", background: "rgba(37, 211, 102, 0.15)", borderRadius: "12px", color: "#25D366" }}>
                <MessageSquare size={32} />
              </div>
            </div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem", background: "linear-gradient(135deg, #25D366, #4ADE80)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t("wa.title")}
            </h2>
            <p style={{ color: "#8896B3", maxWidth: "400px", margin: "0 auto 1.5rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {t("wa.subtitle")}
            </p>

            <div style={{ display: "flex", gap: "0.5rem", maxWidth: "400px", margin: "0 auto", background: "rgba(255,255,255,0.03)", padding: "0.4rem", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", paddingLeft: "1rem", color: "#8896B3", fontSize: "0.9rem", fontWeight: 600 }}>+91</div>
              <input 
                type="tel"
                placeholder={t("wa.placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", padding: "0.6rem 0.5rem" }}
              />
              <button 
                onClick={handleSubscribe}
                disabled={status === "loading" || phone.length !== 10}
                style={{ 
                  background: "#25D366", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "50px", 
                  padding: "0 1.25rem", 
                  fontWeight: 700, 
                  cursor: "pointer", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "0.5rem",
                  transition: "0.2s",
                  opacity: (status === "loading" || phone.length !== 10) ? 0.5 : 1
                }}
              >
                {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <><span className="desktop-only">{t("wa.button")}</span><ArrowRight size={18} /></>}
              </button>
            </div>
            
            {status === "error" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: "#EF4444", fontSize: "0.75rem", marginTop: "0.75rem", fontWeight: 600 }}>
                ⚠️ {msg}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        @media (max-width: 480px) { .desktop-only { display: none; } }
      `}</style>
    </div>
  );
}

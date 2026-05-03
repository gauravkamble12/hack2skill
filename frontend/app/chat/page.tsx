"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, HelpCircle, Info, Sparkles } from "lucide-react";
import SpeechButton from "@/components/SpeechButton";
import VoiceInput from "@/components/VoiceInput";
import { useLang } from "@/contexts/LangContext";

interface Message { role: "user" | "assistant"; content: string; sources?: string[]; fromCache?: boolean; }

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getInitialMessage(t: (key: string) => string): Message {
  return {
    role: "assistant",
    content: t("chat.welcome"),
    sources: ["Election Commission of India - eci.gov.in"],
  };
}

export default function ChatPage() {
  const { t, lang } = useLang();
  const [messages, setMessages] = useState<Message[]>([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setMessages([getInitialMessage(t)]);
    } else {
      setMessages([getInitialMessage(t)]);
    }
  }, [lang, t]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    const userMsg: Message = { role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: msg, 
          context: messages.slice(-6),
          language: lang 
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply || data.error || "Sorry, I could not get a response.",
        sources: data.sources,
        fromCache: data.fromCache,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: lang === "hi" ? "⚠️ सर्वर से कनेक्ट नहीं हो सका। कृपया जांचें कि बैकएंड चल रहा है।" : "⚠️ Could not connect to the server. Please make sure the backend is running at localhost:5000.",
      }]);
    } finally { setLoading(false); }
  };

  // Safe renderer — escapes HTML first then applies safe formatting only
  const renderContent = (text: string) => {
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
    return escaped
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>")
      .replace(/^- /gm, "• ");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1rem 2rem", height: "calc(100vh - 65px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
      >
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#FF6B00,#FFD700)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(255,107,0,0.3)" }}>
          <Bot color="white" size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Matdata Mitra <Sparkles size={16} color="#FF6B00" />
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span className="animate-pulse" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#138808", display: "inline-block" }} />
            <span style={{ fontSize: "0.78rem", color: "#8896B3" }}>{t("chat.status")}</span>
          </div>
        </div>
      </motion.div>
      <div className="tricolor-strip" style={{ marginBottom: "1rem" }} />

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem", paddingRight: "0.25rem" }}>
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: "0.6rem", alignItems: "flex-start" }}
            >
              {m.role === "assistant" && (
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#FF6B00,#FFD700)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <Bot size={18} color="white" />
                </div>
              )}
              <div style={{ maxWidth: "80%" }}>
                <div style={{
                  background: m.role === "user" ? "linear-gradient(135deg,#FF6B00,#FF8C38)" : "var(--bg-card)",
                  border: m.role === "user" ? "none" : "1px solid var(--border)",
                  borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
                  padding: "0.85rem 1.1rem",
                  fontSize: "0.92rem",
                  lineHeight: 1.65,
                  color: m.role === "user" ? "white" : "var(--text)",
                  boxShadow: m.role === "user" ? "0 4px 15px rgba(255,107,0,0.2)" : "none"
                }}>
                  <div dangerouslySetInnerHTML={{ __html: renderContent(m.content) }} />
                </div>
                
                <div style={{ marginTop: "0.4rem", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
                  {m.sources && m.sources.map((s, j) => (
                    <span key={j} style={{ fontSize: "0.65rem", background: "rgba(19,136,8,0.1)", border: "1px solid rgba(19,136,8,0.2)", borderRadius: "4px", padding: "0.15rem 0.5rem", color: "#4ade80", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                      <Info size={10} /> {s}
                    </span>
                  ))}
                  {m.fromCache && <span style={{ fontSize: "0.65rem", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "4px", padding: "0.15rem 0.5rem", color: "#818cf8" }}>⚡ Instant</span>}
                  {m.role === "assistant" && <SpeechButton text={m.content} />}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#FF6B00,#FFD700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={18} color="white" />
            </div>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "4px 18px 18px 18px", padding: "0.85rem 1.1rem" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(j => <motion.span key={j} animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: j*0.2 }} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B00", display: "inline-block" }} />)}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ padding: "0.75rem 0", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
        >
          {["sug.1", "sug.2", "sug.3", "sug.4"].map(key => (
            <button key={key} onClick={() => sendMessage(t(key))} style={{ background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: "50px", padding: "0.45rem 1rem", fontSize: "0.78rem", color: "#FF8C38", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={e => (e.currentTarget.style.background="rgba(255,107,0,0.15)")} onMouseOut={e => (e.currentTarget.style.background="rgba(255,107,0,0.06)")}>
              <HelpCircle size={14} style={{ display: "inline", marginRight: "0.4rem", verticalAlign: "middle" }} /> {t(key)}
            </button>
          ))}
        </motion.div>
      )}

      {/* Input Section */}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", gap: "0.75rem", background: "var(--bg-card)", padding: "0.5rem", borderRadius: "50px", border: "1px solid var(--border)" }}>
          <input
            className="input"
            placeholder={t("chat.placeholder")}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            style={{ flex: 1, border: "none", background: "transparent", paddingLeft: "1.25rem" }}
            disabled={loading}
          />
          <button onClick={() => sendMessage()} className="btn btn-primary" disabled={loading || !input.trim()} style={{ borderRadius: "50px", width: "45px", height: "45px", padding: 0, justifyContent: "center" }}>
            <Send size={18} />
          </button>
        </div>
        
        {/* Voice Input Button */}
        <VoiceInput onTranscript={(text) => sendMessage(text)} disabled={loading} />
      </div>
      
      <p style={{ fontSize: "0.7rem", color: "#5a6a8a", textAlign: "center", marginTop: "0.5rem" }}>
        {t("chat.disclaimer")}
      </p>
    </div>
  );
}

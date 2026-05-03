"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck, Database, RefreshCcw, Bell, ExternalLink, Cloud } from "lucide-react";

interface GCPLog {
  timestamp: string;
  message: string;
  type: string;
  function_id: string;
}

export default function AdminPage() {
  const [logs, setLogs] = useState<GCPLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 
        (typeof window !== "undefined" && window.location.hostname !== "localhost" 
          ? "https://backend-zeta-gilt-i7moh0tq0f.vercel.app" 
          : "http://localhost:5000");

      const res = await fetch(`${apiBase}/api/notifications/logs`);
      const data = await res.json();
      setLogs(data);
      setLoading(false);
    } catch (e) {
      console.error("Log fetch failed", e);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page" style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
        <div>
          <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>🛡️ Admin Control Panel</div>
          <h1 className="page-title" style={{ marginBottom: 0 }}>GCP Cloud <span className="gradient-text">Function Monitor</span></h1>
          <p className="page-subtitle">Real-time status of the automated election news watcher and WhatsApp notification engine.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="card" style={{ padding: "0.5rem 1rem", background: "rgba(37,211,102,0.1)", borderColor: "rgba(37,211,102,0.3)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#25D366", animation: "pulse 2s infinite" }}></div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#25D366" }}>System Online</span>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
        {/* Architecture Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="card">
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem", fontWeight: 800, marginBottom: "1rem" }}>
              <Cloud size={20} color="#4285F4" /> Cloud Architecture
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { icon: <Database size={18} />, title: "Subscribers", desc: "Phone numbers collected via WhatsApp API", status: "Active" },
                { icon: <RefreshCcw size={18} />, title: "GCP Scheduler", desc: "Triggers every 45s to poll ECI news", status: "Running" },
                { icon: <Bell size={18} />, title: "Push Notification", desc: "WhatsApp Dispatcher for election alerts", status: "Standby" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ padding: "0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "8px", height: "fit-content" }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {item.title} 
                      <span style={{ fontSize: "0.6rem", background: "rgba(37,211,102,0.15)", color: "#25D366", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>{item.status}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#8896B3", marginTop: "0.1rem" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: "rgba(255,107,0,0.03)", borderColor: "rgba(255,107,0,0.2)" }}>
            <ShieldCheck size={32} color="#FF6B00" style={{ marginBottom: "1rem" }} />
            <h4 style={{ fontWeight: 800, marginBottom: "0.5rem" }}>Data Privacy Policy</h4>
            <p style={{ fontSize: "0.8rem", color: "#8896B3", lineHeight: 1.5 }}>
              All subscriber phone numbers are encrypted at rest and only used for election-related notifications. We never share user data with third parties.
            </p>
          </div>
        </div>

        {/* Live Logs */}
        <div className="card" style={{ background: "#0a0e1a", border: "1px solid #1e293b", padding: "0" }}>
          <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #1e293b", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f172a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontWeight: 700, fontSize: "0.9rem" }}>
              <Terminal size={18} color="#FF6B00" /> Live Deployment Logs
            </div>
            <button onClick={fetchLogs} style={{ background: "none", border: "none", color: "#8896B3", cursor: "pointer", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <RefreshCcw size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>
          
          <div style={{ height: "500px", overflowY: "auto", padding: "1.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.82rem" }}>
            <AnimatePresence>
              {logs.length === 0 ? (
                <div style={{ color: "#5a6a8a", textAlign: "center", marginTop: "4rem" }}>
                  <Cloud size={48} style={{ opacity: 0.2, marginBottom: "1rem" }} />
                  <div>Waiting for first GCP trigger...</div>
                </div>
              ) : (
                logs.map((log, i) => (
                  <motion.div 
                    key={log.timestamp + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ marginBottom: "0.75rem", borderLeft: `2px solid ${getLogColor(log.type)}`, paddingLeft: "1rem" }}
                  >
                    <div style={{ display: "flex", gap: "1rem", color: "#5a6a8a", fontSize: "0.7rem", marginBottom: "0.2rem" }}>
                      <span>[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                      <span style={{ color: getLogColor(log.type), fontWeight: 700 }}>{log.type}</span>
                      <span style={{ opacity: 0.5 }}>{log.function_id}</span>
                    </div>
                    <div style={{ color: "#F0F4FF", lineHeight: 1.4 }}>{log.message}</div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

function getLogColor(type: string) {
  switch (type) {
    case 'TRIGGER': return '#3B82F6';
    case 'ALERT': return '#FF6B00';
    case 'SUCCESS': return '#25D366';
    case 'ERROR': return '#EF4444';
    case 'SYSTEM': return '#8B5CF6';
    default: return '#8896B3';
  }
}

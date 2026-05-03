"use client";
import { useState, useRef, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const searchableContent: SearchResult[] = [
  { title: "Chat with Matdata Mitra", description: "Ask questions about elections", href: "/chat", icon: "🤖" },
  { title: "All Elections", description: "View election results and data", href: "/elections", icon: "📊" },
  { title: "Find Your Booth", description: "Locate your polling station", href: "/find-booth", icon: "📍" },
  { title: "Voter Eligibility", description: "Check if you can vote", href: "/eligibility", icon: "✅" },
  { title: "Voting Guide", description: "Step-by-step voting instructions", href: "/guide", icon: "📖" },
  { title: "Timeline", description: "Upcoming election dates", href: "/timeline", icon: "📅" },
  { title: "EVM Simulator", description: "Practice voting on EVM", href: "/simulator", icon: "🗳️" },
  { title: "Learning Hub", description: "Civic education articles", href: "/learn", icon: "📚" },
  { title: "Candidate Explorer", description: "View candidate profiles", href: "/candidates", icon: "🧾" },
  { title: "First Time Voter", description: "Guide for new voters", href: "/first-vote", icon: "🇮🇳" },
  { title: "About", description: "About Matdata Mitra", href: "/about", icon: "ℹ️" },
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { t } = useLang();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return searchableContent.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Search site"
        style={{
          display: "flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
          padding: "0.5rem 1rem", borderRadius: "8px", color: "#8896B3",
          fontSize: "0.85rem", cursor: "pointer", minWidth: "180px"
        }}
      >
        🔍 <span style={{ flex: 1, textAlign: "left" }}>{t("common.search")}...</span>
        <kbd style={{ fontSize: "0.7rem", background: "rgba(255,255,255,0.1)", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>⌘K</kbd>
      </button>

      {isOpen && (
        <div 
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", paddingTop: "10vh" }} 
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div style={{ width: "100%", maxWidth: "600px", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", padding: "1rem", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: "1.2rem" }} aria-hidden="true">🔍</span>
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pages, features..."
                aria-label="Search query"
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "0 1rem", fontSize: "1rem", color: "var(--text)" }}
              />
              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close search"
                style={{ background: "none", border: "none", color: "#8896B3", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div 
              style={{ maxHeight: "400px", overflowY: "auto", padding: "0.5rem" }}
              role="listbox"
            >
              {results.length > 0 ? (
                results.map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSelect(item.href)} 
                    role="option"
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1rem", border: "none", background: "transparent", borderRadius: "8px", cursor: "pointer", textAlign: "left" }} 
                    className="search-item"
                  >
                    <span style={{ fontSize: "1.2rem" }} aria-hidden="true">{item.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{item.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "#8896B3" }}>{item.description}</div>
                    </div>
                  </button>
                ))
              ) : query ? (
                <div style={{ padding: "2rem", textAlign: "center", color: "#8896B3" }}>
                  No results found for &quot;{query}&quot;
                </div>
              ) : (
                <div style={{ padding: "1rem", color: "#8896B3", fontSize: "0.85rem" }}>
                  <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>Quick Links</div>
                  {searchableContent.slice(0, 5).map((item, i) => (
                    <button key={i} onClick={() => handleSelect(item.href)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", border: "none", background: "transparent", borderRadius: "6px", cursor: "pointer", color: "#aab4cc", fontSize: "0.85rem", textAlign: "left" }}>
                      {item.icon} {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .search-item:hover { background: rgba(255,107,0,0.1) !important; }
      `}</style>
    </>
  );
}
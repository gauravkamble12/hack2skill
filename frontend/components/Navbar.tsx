"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/contexts/LangContext";
import { ChevronDown, Menu, X } from "lucide-react";
import GlobalSearch from "./GlobalSearch";

const mainLinks = [
  { href: "/", labelKey: "nav.home", icon: "🏠" },
  { href: "/chat", labelKey: "nav.chat", icon: "🤖" },
  { href: "/elections", labelKey: "nav.elections", icon: "📊" },
  { href: "/timeline", labelKey: "nav.timeline", icon: "📅" },
  { href: "/find-booth", labelKey: "nav.findBooth", icon: "📍" },
];

const moreLinks = [
  { href: "/guide", labelKey: "nav.guide", icon: "📖" },
  { href: "/eligibility", labelKey: "nav.eligibility", icon: "✅" },
  { href: "/simulator", labelKey: "nav.simulator", icon: "🗳️" },
  { href: "/learn", labelKey: "nav.learn", icon: "📚" },
  { href: "/candidates", labelKey: "nav.candidates", icon: "🧾" },
  { href: "/first-vote", labelKey: "nav.firstVote", icon: "🇮🇳" },
  { href: "/helpline", labelKey: "nav.helpline", icon: "📞" },
  { href: "/about", labelKey: "nav.about", icon: "ℹ️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(10,14,26,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.5rem", height: "60px",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <span style={{ fontSize: "1.4rem" }}>🗳️</span>
          <span style={{ fontFamily: "Poppins,sans-serif", fontWeight: 800, fontSize: "1rem", background: "linear-gradient(135deg,#FF6B00,#FFD700)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Matdata Mitra
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="desktop-nav">
          {/* Global Search */}
          <GlobalSearch />
          
          {mainLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: "0.5rem 0.75rem", borderRadius: "8px", fontSize: "0.85rem", fontWeight: 500,
              color: pathname === l.href ? "#FF6B00" : "#aab4cc",
              background: pathname === l.href ? "rgba(255,107,0,0.1)" : "transparent",
              textDecoration: "none", transition: "all 0.2s",
            }}>
              {l.icon} {t(l.labelKey)}
            </Link>
          ))}
          
          <div ref={exploreRef} style={{ position: "relative" }}>
            <button onClick={() => setExploreOpen(!exploreOpen)} style={{
              background: exploreOpen ? "rgba(255,107,0,0.15)" : "transparent",
              border: "none", color: exploreOpen ? "#FF6B00" : "#aab4cc",
              fontSize: "0.85rem", fontWeight: 500, cursor: "pointer",
              padding: "0.5rem 0.75rem", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.3rem",
            }}>
              {t("common.explore")} <ChevronDown size={14} style={{ transform: exploreOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }} />
            </button>
            {exploreOpen && (
              <div style={{
                position: "absolute", top: "48px", right: 0, background: "var(--bg-card)",
                border: "1px solid var(--border)", borderRadius: "12px", padding: "0.5rem",
                minWidth: "200px", boxShadow: "0 10px 40px rgba(0,0,0,0.6)", zIndex: 1001
              }}>
                {moreLinks.map(l => (
                  <Link key={l.href} href={l.href} onClick={() => setExploreOpen(false)} style={{
                    display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.7rem 1rem",
                    color: pathname === l.href ? "#FF6B00" : "#e2e8f0",
                    textDecoration: "none", fontSize: "0.85rem", borderRadius: "8px", transition: "0.2s"
                  }}>
                    {l.icon} {t(l.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            style={{
              marginLeft: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem",
              background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.25)",
              color: "#FF8C38", padding: "0.4rem 0.8rem", borderRadius: "8px",
              fontSize: "0.75rem", fontWeight: 700, cursor: "pointer"
            }}
          >
            🌐 {lang.toUpperCase()}
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="hamburger-btn" style={{
          display: "none", background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer"
        }}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 999,
          background: "rgba(10,14,26,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem"
        }}>
          {[...mainLinks, ...moreLinks].map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              padding: "0.8rem 1rem", borderRadius: "10px", fontSize: "0.9rem",
              color: pathname === l.href ? "#FF6B00" : "#e2e8f0",
              background: pathname === l.href ? "rgba(255,107,0,0.1)" : "transparent",
              textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem",
            }}>
              {l.icon} {t(l.labelKey)}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
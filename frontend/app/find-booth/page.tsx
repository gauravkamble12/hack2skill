"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, AlertCircle, Loader } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import prevents SSR for the Leaflet map
const BoothMap = dynamic(() => import("@/components/BoothMap"), {
  ssr: false,
  loading: () => (
    <div style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card2)", borderRadius: "16px", border: "1px solid var(--border)" }}>
      <div style={{ textAlign: "center", color: "#8896B3" }}>
        <Loader size={36} style={{ marginBottom: "1rem", opacity: 0.5, animation: "spin 1s linear infinite" }} />
        <div>Loading interactive map...</div>
      </div>
    </div>
  ),
});

type GeoStatus = "idle" | "loading" | "success" | "denied" | "unavailable";

export default function FindBoothPage() {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");

  // Reverse geocode to get approximate address
  useEffect(() => {
    if (!coords) return;
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json`)
      .then(r => r.json())
      .then(d => {
        const parts = [d.address?.suburb, d.address?.city || d.address?.town, d.address?.state].filter(Boolean);
        setAddress(parts.join(", "));
      })
      .catch(() => setAddress("Your Location"));
  }, [coords]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("success");
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
          setError("Location access was denied. Please enable it in your browser settings to find nearby booths.");
        } else {
          setStatus("unavailable");
          setError("Could not get your location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="page">
      <div className="badge badge-saffron" style={{ marginBottom: "0.75rem" }}>📍 Polling Booth Finder</div>
      <h1 className="page-title">Find Nearest <span className="gradient-text">Polling Stations</span></h1>
      <p className="page-subtitle">
        Using your real-time GPS location to show the closest polling booths in your area
      </p>

      <AnimatePresence mode="wait">
        {/* IDLE STATE */}
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "4rem 2rem", textAlign: "center" }}
          >
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "rgba(255,107,0,0.12)", border: "2px solid rgba(255,107,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MapPin size={48} color="#FF6B00" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>Locate Your Polling Booth</h2>
              <p style={{ color: "#8896B3", maxWidth: 480, lineHeight: 1.6 }}>
                Click the button below to allow location access. We&apos;ll show you the <strong>5 nearest polling stations</strong> on an interactive map with walking distances.
              </p>
            </div>
            <button
              onClick={requestLocation}
              className="btn btn-primary"
              style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
            >
              <Navigation size={20} />
              Enable Location & Find Booths
            </button>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
              {[["🔒", "Private", "We never store your location"], ["⚡", "Instant", "Results shown immediately"], ["📶", "Offline Ready", "Works without backend"]].map(([icon, title, desc]) => (
                <div key={title} style={{ textAlign: "center", maxWidth: 140 }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#F0F4FF" }}>{title}</div>
                  <div style={{ fontSize: "0.72rem", color: "#5a6a8a" }}>{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: "center", padding: "4rem 2rem" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📡</div>
            <h2 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Locating You...</h2>
            <p style={{ color: "#8896B3" }}>Please allow location access in the browser prompt</p>
            <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginTop: "1.5rem" }}>
              {[0, 0.15, 0.3].map(d => (
                <div key={d} style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6B00", animation: `bounce 1s ${d}s infinite` }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* ERROR STATES */}
        {(status === "denied" || status === "unavailable") && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card"
            style={{ borderColor: "rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.06)", textAlign: "center", padding: "2.5rem" }}
          >
            <AlertCircle size={48} color="#EF4444" style={{ marginBottom: "1rem" }} />
            <h3 style={{ fontWeight: 700, marginBottom: "0.75rem" }}>
              {status === "denied" ? "Location Access Denied" : "Location Unavailable"}
            </h3>
            <p style={{ color: "#8896B3", marginBottom: "1.5rem", maxWidth: 480, margin: "0 auto 1.5rem" }}>{error}</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={requestLocation} className="btn btn-primary">Try Again</button>
              <a href="https://voters.eci.gov.in/pollingstation" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Search on ECI Website →
              </a>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STATE — Show Map */}
        {status === "success" && coords && (
          <motion.div
            key="map"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Location badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ background: "rgba(19,136,8,0.12)", border: "1px solid rgba(19,136,8,0.3)", borderRadius: "50px", padding: "0.4rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                <span style={{ color: "#4ADE80", fontSize: "0.6rem" }}>●</span>
                <span style={{ color: "#aab4cc" }}>Showing booths near:</span>
                <strong style={{ color: "#F0F4FF" }}>{address || "Your Location"}</strong>
              </div>
              <button onClick={() => { setStatus("idle"); setCoords(null); }} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "50px", padding: "0.35rem 0.85rem", color: "#8896B3", cursor: "pointer", fontSize: "0.78rem", fontFamily: "Inter,sans-serif" }}>
                Change Location
              </button>
            </div>

            {/* The Map */}
            <BoothMap lat={coords.lat} lng={coords.lng} />

            {/* Info card */}
            <div className="card" style={{ background: "rgba(10,14,26,0.5)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "1rem" }}>
                {[
                  { icon: "📍", label: "Your Coordinates", value: `${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E` },
                  { icon: "🏫", label: "Search Radius", value: "3 km around you" },
                  { icon: "🗳️", label: "Booths Found", value: "5 nearest stations" },
                  { icon: "🔄", label: "Data Source", value: "ECI Booth Format (Simulated)" },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: "0.72rem", color: "#5a6a8a", marginBottom: "0.2rem" }}>{item.icon} {item.label}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

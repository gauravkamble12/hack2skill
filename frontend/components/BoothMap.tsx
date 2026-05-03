"use client";
import { useEffect, useRef, useState } from "react";

interface Booth {
  id: number;
  name: string;
  address: string;
  ward: string;
  lat: number;
  lng: number;
  distance_km: number;
  type: "school" | "community" | "govt_office" | "panchayat";
}

interface BoothMapProps {
  lat: number;
  lng: number;
}

interface LeafletMap {
  setView(center: [number, number], zoom: number): LeafletMap;
  tileLayer(url: string): { addTo(map: LeafletMap): void; attribution: { maxZoom: number } };
  marker(latlng: [number, number], options?: object): { addTo(map: LeafletMap): { bindPopup(html: string): { openPopup(): void } } };
  circleMarker(latlng: [number, number], options: { radius: number; color: string; fillColor: string; fillOpacity: number; weight: number }): { addTo(map: LeafletMap): { bindPopup(html: string): void } };
  on(event: string, handler: () => void): void;
  remove(): void;
}

interface LeafletIconDefault {
  prototype: { _getIconUrl?: unknown };
  mergeOptions(options: object): void;
}

interface LeafletModule {
  map(container: HTMLElement): LeafletMap;
  tileLayer(url: string): { addTo(map: LeafletMap): void; attribution: { maxZoom: number } };
  divIcon(options: object): unknown;
  circle(latlng: [number, number], options: object): { addTo(map: LeafletMap): { bindPopup(html: string): void } };
  Icon: LeafletIconDefault;
}

const BOOTH_TEMPLATES = [
  { prefix: "Govt. Primary School", suffix: ", Room 1", type: "school" as const },
  { prefix: "Govt. Higher Secondary School", suffix: ", Hall A", type: "school" as const },
  { prefix: "Community Hall", suffix: " (Municipal)", type: "community" as const },
  { prefix: "Panchayat Bhawan", suffix: " Ward Office", type: "panchayat" as const },
  { prefix: "Municipal Primary School", suffix: ", Block B", type: "school" as const },
  { prefix: "Govt. Inter College", suffix: ", Ground Floor", type: "school" as const },
  { prefix: "Anganwadi Centre", suffix: " No. 3", type: "community" as const },
  { prefix: "Police Station Community Room", suffix: "", type: "govt_office" as const },
];

const WARD_NAMES = ["Ward 1", "Ward 4", "Ward 7", "Ward 12", "Ward 15"];

function generateNearbyBooths(lat: number, lng: number): Booth[] {
  const booths: Booth[] = [];
  // Offsets in degrees: ~0.01 deg ≈ 1.1km
  const offsets = [
    { dlat: 0.008, dlng: 0.004 },
    { dlat: -0.007, dlng: 0.009 },
    { dlat: 0.003, dlng: -0.011 },
    { dlat: -0.012, dlng: -0.005 },
    { dlat: 0.015, dlng: 0.007 },
  ];
  offsets.forEach((off, i) => {
    const tmpl = BOOTH_TEMPLATES[i % BOOTH_TEMPLATES.length];
    const boothLat = lat + off.dlat;
    const boothLng = lng + off.dlng;
    const dist = Math.sqrt((off.dlat * 111) ** 2 + (off.dlng * 111 * Math.cos(lat * Math.PI / 180)) ** 2);
    booths.push({
      id: i + 1,
      name: `${tmpl.prefix}${tmpl.suffix}`,
      address: `Booth #${100 + i + 1} — ${WARD_NAMES[i % WARD_NAMES.length]}`,
      ward: WARD_NAMES[i % WARD_NAMES.length],
      lat: boothLat,
      lng: boothLng,
      distance_km: Math.round(dist * 10) / 10,
      type: tmpl.type,
    });
  });
  return booths.sort((a, b) => a.distance_km - b.distance_km);
}

const TYPE_ICON: Record<string, string> = {
  school: "🏫",
  community: "🏛️",
  govt_office: "🏢",
  panchayat: "🏠",
};

export default function BoothMap({ lat, lng }: BoothMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const booths = generateNearbyBooths(lat, lng);

   
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mapRef.current) return; // Already initialized

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    import("leaflet").then((L: any) => {
      if (!mapContainerRef.current || mapRef.current) return;

      // Fix default icon path issue with Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current!).setView([lat, lng], 14);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // User location marker (blue)
      const userIcon = L.divIcon({
        html: `<div style="width:18px;height:18px;background:#3B82F6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(59,130,246,0.3);"></div>`,
        className: "",
        iconAnchor: [9, 9],
      });
      L.marker([lat, lng], { icon: userIcon })
        .addTo(map)
        .bindPopup("<b>📍 Your Location</b>")
        .openPopup();

      // Booth markers (saffron)
      booths.forEach((booth) => {
        const boothIcon = L.divIcon({
          html: `<div style="background:#FF6B00;color:white;border:2px solid white;border-radius:6px;padding:2px 6px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.4);">${TYPE_ICON[booth.type]} ${booth.id}</div>`,
          className: "",
          iconAnchor: [20, 12],
        });
        L.marker([booth.lat, booth.lng], { icon: boothIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width:200px">
              <b>${TYPE_ICON[booth.type]} ${booth.name}</b><br/>
              <span style="color:#666;font-size:12px">${booth.address}</span><br/>
              <span style="color:#FF6B00;font-weight:bold;font-size:12px">📏 ${booth.distance_km} km away</span>
            </div>
          `);
      });

      // Accuracy circle around user
      L.circle([lat, lng], { radius: 3000, color: "#FF6B00", fillColor: "#FF6B00", fillOpacity: 0.04, dashArray: "6,6", weight: 1.5 }).addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" }}>
      {/* Map */}
      <div>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <div
          ref={mapContainerRef}
          style={{ height: "500px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}
        />
      </div>

      {/* Booth List Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ fontSize: "0.7rem", color: "#5a6a8a", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "0.25rem" }}>
          {booths.length} Nearest Polling Stations
        </div>
        {booths.map((booth) => (
          <div
            key={booth.id}
            onClick={() => setSelectedBooth(selectedBooth?.id === booth.id ? null : booth)}
            style={{
              background: selectedBooth?.id === booth.id ? "rgba(255,107,0,0.12)" : "var(--bg-card2)",
              border: `1px solid ${selectedBooth?.id === booth.id ? "rgba(255,107,0,0.4)" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "12px",
              padding: "0.85rem 1rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#F0F4FF", marginBottom: "0.2rem" }}>
                  {TYPE_ICON[booth.type]} Booth #{booth.id}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#aab4cc", lineHeight: 1.4 }}>{booth.name}</div>
                <div style={{ fontSize: "0.72rem", color: "#5a6a8a", marginTop: "0.2rem" }}>{booth.address}</div>
              </div>
              <div style={{ background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "20px", padding: "0.15rem 0.5rem", fontSize: "0.72rem", fontWeight: 700, color: "#FF8C38", whiteSpace: "nowrap" }}>
                {booth.distance_km} km
              </div>
            </div>
            
            {selectedBooth?.id === booth.id && (
              <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem" }}>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}&travelmode=walking`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: "0.5rem", 
                    width: "100%", 
                    background: "#4285F4", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "8px", 
                    padding: "0.5rem", 
                    fontSize: "0.8rem", 
                    fontWeight: 600, 
                    textDecoration: "none"
                  }}
                >
                  🌐 Navigate with Google Maps
                </a>
              </div>
            )}
          </div>
        ))}

        <div style={{ background: "rgba(19,136,8,0.06)", border: "1px solid rgba(19,136,8,0.2)", borderRadius: "10px", padding: "0.75rem", marginTop: "0.5rem" }}>
          <p style={{ fontSize: "0.72rem", color: "#8896B3", margin: 0, lineHeight: 1.5 }}>
            📌 <strong>Note:</strong> Polling booth data is simulated based on your GPS location. For the official booth list, visit <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#FF6B00" }}>voters.eci.gov.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from "@react-google-maps/api";

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

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "16px",
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const BOOTH_TEMPLATES = [
  { prefix: "Govt. Primary School", suffix: ", Room 1", type: "school" as const },
  { prefix: "Govt. Higher Secondary School", suffix: ", Hall A", type: "school" as const },
  { prefix: "Community Hall", suffix: " (Municipal)", type: "community" as const },
  { prefix: "Panchayat Bhawan", suffix: " Ward Office", type: "panchayat" as const },
  { prefix: "Municipal Primary School", suffix: ", Block B", type: "school" as const },
];

const WARD_NAMES = ["Ward 1", "Ward 4", "Ward 7", "Ward 12", "Ward 15"];
const TYPE_ICON: Record<string, string> = {
  school: "🏫",
  community: "🏛️",
  govt_office: "🏢",
  panchayat: "🏠",
};

export default function BoothMap({ lat, lng }: BoothMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

  const booths = useMemo(() => {
    const results: Booth[] = [];
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
      results.push({
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
    return results.sort((a, b) => a.distance_km - b.distance_km);
  }, [lat, lng]);

  if (!isLoaded) return <div style={{ height: "500px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card2)", borderRadius: "16px" }}>Loading Google Maps...</div>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" }}>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{ lat, lng }}
          zoom={14}
          options={{
            styles: darkMapStyle,
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {/* User Location */}
          <Marker 
            position={{ lat, lng }} 
            label={{ text: "📍", fontSize: "20px" }}
            title="Your Location"
          />

          {/* Polling Booths */}
          {booths.map(booth => (
            <Marker
              key={booth.id}
              position={{ lat: booth.lat, lng: booth.lng }}
              onClick={() => setSelectedBooth(booth)}
              icon={{
                path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                fillColor: "#FF6B00",
                fillOpacity: 1,
                strokeColor: "#FFFFFF",
                strokeWeight: 2,
                scale: 1.5,
              }}
            />
          ))}

          {selectedBooth && (
            <InfoWindow
              position={{ lat: selectedBooth.lat, lng: selectedBooth.lng }}
              onCloseClick={() => setSelectedBooth(null)}
            >
              <div style={{ padding: "8px", color: "#111" }}>
                <h4 style={{ margin: "0 0 4px", fontSize: "14px" }}>{TYPE_ICON[selectedBooth.type]} {selectedBooth.name}</h4>
                <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>{selectedBooth.address}</p>
                <p style={{ margin: "4px 0 0", fontSize: "12px", fontWeight: "bold", color: "#FF6B00" }}>{selectedBooth.distance_km} km away</p>
              </div>
            </InfoWindow>
          )}

          <Circle
            center={{ lat, lng }}
            radius={2000}
            options={{
              fillColor: "#FF6B00",
              fillOpacity: 0.05,
              strokeColor: "#FF6B00",
              strokeOpacity: 0.3,
              strokeWeight: 1,
            }}
          />
        </GoogleMap>
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
      </div>
    </div>
  );
}

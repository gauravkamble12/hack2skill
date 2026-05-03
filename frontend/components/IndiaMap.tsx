"use client";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useState, useEffect } from "react";

interface IndiaMapProps {
  onSelectState: (state: string) => void;
  selectedState: string;
}

const geoUrl = "/india-states.json";

export default function IndiaMap({ onSelectState, selectedState }: IndiaMapProps) {
  const [geoData, setGeoData] = useState<Record<string, unknown> | null>(null);
  
  useEffect(() => {
      fetch(geoUrl).then(r => r.json()).then(d => {
          setGeoData(d);
      });
  }, [])

  if (!geoData) {
      return <div style={{ height: 400, display: "flex", alignItems: "center", justifyContent: "center", color: "#8896B3" }}>Loading Map...</div>;
  }

  return (
    <div style={{
      position: "relative",
      width: "100%",
      background: "rgba(255,255,255,0.02)",
      borderRadius: "20px",
      border: "1px solid rgba(255,255,255,0.08)",
      overflow: "hidden",
      padding: "1rem",
    }}>
      <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.7rem", color: "#5a6a8a", textTransform: "uppercase", letterSpacing: "2px" }}>
          Click a State / UT
        </span>
      </div>
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 800,
          center: [78.9629, 22.5937] // Center of India
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[78.9629, 22.5937]} zoom={1} minZoom={1} maxZoom={4}>
          {geoData ? (
            <Geographies geography={geoData as unknown as string | string[] | Record<string, unknown>}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoAny = geo as unknown as { id: string; rsmKey: string; properties: { NAME_1?: string; ST_NM?: string } };
                const stateName = geoAny.properties.NAME_1 || geoAny.properties.ST_NM || "";
                const isSelected = selectedState === stateName || selectedState === geoAny.id;
                
                return (
                  <Geography
                    key={geoAny.rsmKey}
                    geography={geo}
                    onClick={() => {
                        if (stateName) onSelectState(stateName);
                    }}
                    style={{
                      default: {
                        fill: isSelected ? "#FF6B00" : "rgba(255,107,0,0.1)",
                        stroke: isSelected ? "#FFD700" : "rgba(255,255,255,0.2)",
                        strokeWidth: isSelected ? 1.5 : 0.5,
                        outline: "none",
                        transition: "all 250ms",
                      },
                      hover: {
                        fill: "#FF8C38",
                        stroke: "#FFD700",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 250ms",
                      },
                      pressed: {
                        fill: "#FF6B00",
                        stroke: "#FFD700",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          ) : null}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

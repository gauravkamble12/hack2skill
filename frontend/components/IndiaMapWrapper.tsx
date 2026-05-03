"use client";
import { lazy, Suspense } from "react";

const IndiaMapLazy = lazy(() => import("@/components/IndiaMap"));

interface IndiaMapProps {
  onSelectState: (state: string) => void;
  selectedState: string;
}

export default function IndiaMapWrapper({ onSelectState, selectedState }: IndiaMapProps) {
  return (
    <Suspense fallback={
      <div style={{ 
        height: 400, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: "#8896B3",
        background: "rgba(255,255,255,0.02)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            border: "3px solid rgba(255,107,0,0.2)",
            borderTopColor: "#FF6B00",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 1rem"
          }} />
          Loading Map...
        </div>
      </div>
    }>
      <IndiaMapLazy onSelectState={onSelectState} selectedState={selectedState} />
    </Suspense>
  );
}
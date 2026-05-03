"use client";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Skeleton({ width = "100%", height = "20px", borderRadius = "8px", style = {} }: SkeletonProps) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        ...style,
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <Skeleton height="24px" width="60%" />
      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Skeleton height="16px" width="100%" />
        <Skeleton height="16px" width="80%" />
        <Skeleton height="16px" width="90%" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", background: "var(--bg-card2)", borderRadius: "12px" }}>
          <Skeleton width="48px" height="48px" borderRadius="50%" />
          <div style={{ flex: 1 }}>
            <Skeleton height="18px" width="40%" />
            <Skeleton height="14px" width="60%" style={{ marginTop: "0.5rem" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LoadingFallback() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div style={{ padding: "2rem", textAlign: "center", color: "#8896B3" }}>
        Loading data...
      </div>
    </>
  );
}
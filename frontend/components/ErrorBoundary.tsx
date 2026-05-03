"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#0A0E1A",
          color: "#F0F4FF"
        }}>
          <div style={{
            maxWidth: "450px",
            textAlign: "center",
            padding: "2rem",
            background: "#111827",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)"
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(239,68,68,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem"
            }}>
              <AlertTriangle size={32} color="#EF4444" />
            </div>
            
            <h1 style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "0.75rem"
            }}>
              Something went wrong
            </h1>
            
            <p style={{
              color: "#8896B3",
              marginBottom: "1.5rem",
              lineHeight: 1.6
            }}>
              We encountered an unexpected error. Please try again or return to the homepage.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div style={{
                background: "rgba(0,0,0,0.3)",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                textAlign: "left",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: "#EF4444",
                wordBreak: "break-word"
              }}>
                {this.state.error.message}
              </div>
            )}

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={this.handleReset}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #FF6B00, #FF8C38)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                <RefreshCw size={16} /> Try Again
              </button>
              
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "50px",
                  background: "transparent",
                  color: "#aab4cc",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem"
                }}
              >
                <Home size={16} /> Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export class MapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255,255,255,0.02)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#8896B3",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <AlertTriangle size={32} color="#F59E0B" />
          <p>Unable to load map. Please refresh or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
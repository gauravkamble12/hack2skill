import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface IframeModalProps {
  url: string | null;
  onClose: () => void;
  title?: string;
}

export default function IframeModal({ url, onClose, title = "External Content" }: IframeModalProps) {
  if (!url) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(5px)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          style={{
            background: "var(--bg-card)",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "1200px",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "1px solid var(--border)",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
        >
          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>{title}</h3>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "400px" }}>
                {url}
              </span>
            </div>
            
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
              >
                <ExternalLink size={16} style={{ marginRight: "0.3rem" }} />
                Open in new tab
              </a>
              <button
                onClick={onClose}
                className="btn btn-outline"
                style={{ padding: "0.4rem", borderRadius: "8px" }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Iframe Body */}
          <div style={{ flex: 1, position: "relative", background: "white" }}>
            <iframe
              src={url}
              title={title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

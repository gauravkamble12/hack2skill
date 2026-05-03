"use client";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface SpeechButtonProps {
  text: string;
}

export default function SpeechButton({ text }: SpeechButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = () => {
    if (!supported) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    // Clean text: remove markdown stars and break lines
    const cleanText = text.replace(/\*\*/g, "").replace(/\n/g, ". ");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Try to find a Hindi or Indian English voice
    const voices = window.speechSynthesis.getVoices();
    const indVoice = voices.find(v => v.lang.includes("IN") || v.lang.includes("hi"));
    if (indVoice) utterance.voice = indVoice;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!supported) return null;

  return (
    <button
      onClick={speak}
      style={{
        background: speaking ? "rgba(255,107,0,0.2)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${speaking ? "#FF6B00" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        color: speaking ? "#FF6B00" : "#8896B3",
        marginLeft: "0.5rem"
      }}
      title={speaking ? "Stop Listening" : "Listen to Response"}
    >
      {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}

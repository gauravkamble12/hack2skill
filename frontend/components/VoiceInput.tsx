"use client";
import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onTranscript, disabled }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const isSupported = (() => {
    if (typeof window === "undefined") return null;
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown }).SpeechRecognition 
      || (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;
    return SpeechRecognition ? true : false;
  })();
  const { lang, t } = useLang();

  const toggleListening = () => {
    if (isSupported === false) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown }).SpeechRecognition 
        || (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;
    
    if (!SpeechRecognition) return;

    if (isListening) {
      const recog = new SpeechRecognition() as unknown as {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onresult: ((event: unknown) => void) | null;
        onerror: ((event: unknown) => void) | null;
        onend: (() => void) | null;
        start: () => void;
        stop: () => void;
      };
      
      recog.continuous = false;
      recog.interimResults = false;
      recog.onresult = (event: unknown) => {
        const e = event as { results: { [key: number]: { [key: number]: { transcript: string } } } };
        const transcript = e.results[0]?.[0]?.transcript || "";
        onTranscript(transcript);
        setIsListening(false);
      };
      recog.onerror = () => setIsListening(false);
      recog.onend = () => setIsListening(false);
      recog.stop();
    } else {
      const recog = new SpeechRecognition() as unknown as {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onresult: ((event: unknown) => void) | null;
        onerror: ((event: unknown) => void) | null;
        onend: (() => void) | null;
        start: () => void;
        stop: () => void;
      };
      
      recog.continuous = false;
      recog.interimResults = false;
      recog.lang = lang === "hi" ? "hi-IN" : "en-IN";
      recog.onresult = (event: unknown) => {
        const e = event as { results: { [key: number]: { [key: number]: { transcript: string } } } };
        const transcript = e.results[0]?.[0]?.transcript || "";
        onTranscript(transcript);
        setIsListening(false);
      };
      recog.onerror = () => setIsListening(false);
      recog.onend = () => setIsListening(false);
      recog.start();
      setIsListening(true);
    }
  };

  if (isSupported === false) return null;

  return (
    <button
      onClick={toggleListening}
      disabled={disabled}
      title={t("chat.micBtn")}
      style={{
        background: isListening ? "rgba(239,68,68,0.15)" : "rgba(255,107,0,0.1)",
        border: `1px solid ${isListening ? "#EF4444" : "rgba(255,107,0,0.3)"}`,
        color: isListening ? "#EF4444" : "#FF6B00",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {isListening ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <Mic size={20} />
      )}
    </button>
  );
}
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "hi" | "mr" | "gu" | "bn" | "te" | "ta" | "bho";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const translations: any = {
  "nav.home": { en: "Home", hi: "होम" },
  "nav.chat": { en: "Ask Mitra", hi: "मित्र से पूछें" },
  "nav.elections": { en: "All Elections", hi: "सभी चुनाव" },
  "nav.findBooth": { en: "Find Booth", hi: "बूथ खोजें" },
  "nav.guide": { en: "Guide", hi: "गाइड" },
  "nav.timeline": { en: "Timeline", hi: "समयरेखा" },
  "nav.eligibility": { en: "Eligibility", hi: "पात्रता" },
  "nav.simulator": { en: "Mock Vote", hi: "मॉक वोट" },
  "nav.learn": { en: "Learn", hi: "सीखें" },
  "nav.candidates": { en: "Candidates", hi: "उम्मीदवार" },
  "nav.about": { en: "About", hi: "हमारे बारे में" },
  "nav.firstVote": { en: "First Vote 🇮🇳", hi: "पहला वोट 🇮🇳" },
  "nav.helpline": { en: "Helpline 📞", hi: "हेल्पलाइन 📞" },
  "nav.whatsapp": { en: "WhatsApp Alerts", hi: "व्हाट्सएप अलर्ट" },
  "nav.admin": { en: "System Monitor", hi: "सिस्टम मॉनिटर" },
  "home.hero.title": { 
    en: "Your Democratic Mitra is Here.", 
    hi: "आपका लोकतांत्रिक मित्र यहाँ है।" 
  },
  "home.hero.subtitle": { 
    en: "The official AI guide to India's elections.", 
    hi: "भारत के चुनावों के लिए AI गाइड।" 
  },
  "home.btn.chat": { en: "Ask Matdata Mitra", hi: "मतदाता मित्र से पूछें" },
  "home.btn.guide": { en: "Voter Guide", hi: "मतदाता गाइड" },
  "wa.title": { en: "WhatsApp Alerts", hi: "व्हाट्सएप अलर्ट" },
  "wa.subtitle": { 
    en: "Get real-time election updates & reminders directly on your WhatsApp.", 
    hi: "अपने व्हाट्सएप पर सीधे रीयल-टाइम चुनाव अपडेट और रिमाइंडर प्राप्त करें।" 
  },
  "wa.placeholder": { en: "Enter 10-digit phone number", hi: "10 अंकों का फोन नंबर दर्ज करें" },
  "wa.button": { en: "Subscribe Now", hi: "अभी सब्सक्राइब करें" },
  "wa.success": { en: "Successfully Subscribed!", hi: "सफलतापूर्वक सब्सक्राइब किया गया!" },
  "wa.optin": { en: "Opening WhatsApp...", hi: "व्हाट्सएप खुल रहा है..." },
  "home.map.title": { en: "Explore Your Constituency", hi: "अपने निर्वाचन क्षेत्र को जानें" },
  "home.features.title": { en: "Everything You Need", hi: "जो भी आपको चाहिए" },
  "chat.placeholder": { en: "Ask about voting...", hi: "मतदान के बारे में पूछें..." },
  "chat.status": { en: "Online • AI Civic Expert", hi: "ऑनलाईन • AI नागरिक विशेषज्ञ" },
  "chat.disclaimer": { en: "🛡️ Neutral info only • ECI • 1950", hi: "🛡️ तटस्थ जानकारी • ECI • 1950" },
  "chat.welcome": { en: "Namaste! 🙏 I'm Matdata Mitra, your civic assistant.", hi: "नमस्ते! 🙏 मैं मतदाता मित्र हूं।" },
  "chat.micListen": { en: "Listening...", hi: "सुन रहा हूं..." },
  "chat.micBtn": { en: "Speak your question", hi: "अपना प्रश्न बोलें" },
  "sug.1": { en: "How do I register as a voter?", hi: "मतदाता के रूप में पंजीकरण कैसे करें?" },
  "sug.2": { en: "What documents do I need to vote?", hi: "मतदान के लिए कौन से दस्तावेज़ चाहिए?" },
  "sug.3": { en: "How does the EVM work?", hi: "EVM कैसे काम करता है?" },
  "sug.4": { en: "What is the Model Code of Conduct?", hi: "आदर्श आचार संहिता क्या है?" },
  "common.explore": { en: "Explore", hi: "देखें" },
  "common.learnMore": { en: "Learn More", hi: "और जानें" },
  "common.back": { en: "← Back", hi: "← वापस" },
  "common.next": { en: "Next →", hi: "आगे →" },
  "common.close": { en: "Close", hi: "बंद करें" },
  "common.search": { en: "Search", hi: "खोजें" },
  "nav.signin": { en: "Sign In", hi: "साइन इन" },
  "nav.signout": { en: "Sign Out", hi: "साइन आउट" },
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string) => {
    if (!translations[key]) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Translation key missing: ${key}`);
      }
      return key;
    }
    return translations[key][lang] || translations[key]["en"] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
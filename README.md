# 🗳️ Matdata Mitra — India Election Assistant

An AI-powered civic education platform for Indian elections. Built for the **Google Antigravity Hackathon** to empower Indian citizens with neutral, factual, and accessible electoral information.

---

## 🎯 Hackathon Submission Details
- **Chosen Vertical**: Civic Tech / Democratic Engagement
- **Public Repo**: https://github.com/gauravkamble12/hack2skill
- **Live Demo (Frontend)**: [https://matdata-mitra-india.vercel.app](https://matdata-mitra-india.vercel.app)
- **Live Demo (Backend)**: [https://backend-zeta-gilt-i7moh0tq0f.vercel.app](https://backend-zeta-gilt-i7moh0tq0f.vercel.app)

---

## 💡 Approach & Logic
Our goal was to solve the "Information Overload" problem during elections. We focused on three pillars:
1.  **AI-First Q&A**: Using **Google Gemini 2.0 Flash** for natural language understanding of complex election laws.
2.  **Smart Caching**: An in-memory cache layer in the backend matches common queries (FAQs) instantly, reducing AI latency and API costs.
3.  **Gamified Learning**: Interactive tools like the "Mock EVM Simulator" and "Mera Pehla Vote" onboarding wizard to make civic education engaging.

### System Logic:
-   **Chat Flow**: User Query → Backend Controller → Local FAQ Cache Check → (If Miss) Gemini API Call → Source Verification → Secure Response.
-   **Security**: Neutrality is enforced via System Instructions to ensure the AI never takes a political side.

---

## 🛠️ How it Works
-   **Backend (Node.js/Express)**: Handles AI logic, real-time data fetching, and security filtering.
-   **Frontend (Next.js 16)**: A premium, dark-glassmorphism UI built with Framer Motion for smooth interactions.
-   **Data Layers**: 
    -   `elections.json`: Historical and upcoming election schedules.
    -   `candidates.json`: Detailed profiles of key candidates with asset/affidavit summaries.
    -   `faqs.json`: Pre-verified ECI answers for instant delivery.

---

## 📝 Assumptions Made
1.  **Simulated Real-time Data**: Since live ECI APIs are restricted to official partners, we use high-fidelity simulated JSON data updated with 2024 results.
2.  **Neutrality**: We assume the primary goal is education, not political debate; therefore, the bot is restricted from expressing opinions on political parties.

---

## 🚀 Quick Start (Local Development)

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Key Features
- 🤖 **Matdata Mitra AI Chat** — Smart Q&A using Google Gemini 2.0.
- 👨‍👩‍👧‍👦 **Mera Pehla Vote** — Onboarding wizard for first-time voters.
- 📍 **Booth Finder** — Interactive Map integration for polling station lookup.
- 🗳️ **Mock EVM Simulator** — Practice voting with VVPAT confirmation.
- 📞 **Helpline Directory** — One-tap access to National/State helplines.

---
© 2026 Matdata Mitra • Dedicated to Indian Democracy.

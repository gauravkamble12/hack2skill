# 🗳️ Matdata Mitra — India Election Assistant

An AI-powered civic education platform for Indian elections. Built for the VIT Hackathon to empower Indian citizens with neutral, factual, and accessible electoral information.

## 🚀 Quick Start

### 1. Backend Setup (AI & Knowledge Base)
```bash
cd backend
npm install
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY
npm run dev
```

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 AI Configuration

The chatbot uses **Google Gemini 2.0 Flash** for real-time election queries.
1. Get a free key at: https://aistudio.google.com/app/apikey
2. Add it to `backend/.env` as `GEMINI_API_KEY`.

---

## 📦 Key Features
- 🤖 **Matdata Mitra AI Chat** — Smart Q&A with conversational memory and FAQ caching.
- 👨‍👩‍👧‍👦 **Mera Pehla Vote** — An onboarding wizard for first-time voters.
- 📍 **Booth Finder** — Interactive Map integration to find your nearest polling station.
- 📞 **Helpline Directory** — One-tap access to National & State election helplines.
- 📖 **Election Guide** — Step-by-step guides for both Voters and Candidates.
- 📅 **Timeline Tracker** — Real-time countdowns to upcoming State & National elections.
- 🗳️ **Mock EVM Simulator** — Practice voting with VVPAT confirmation.
- 📚 **Learning Hub** — Gamified articles with progress tracking and badges.
- 🧾 **Candidate Explorer** — Neutral profiles with affidavit and asset summaries.

---

## 🛡️ Ethics & Sources
- **Neutrality**: No political promotion, criticism, or bias.
- **Data Sources**: 
  - Election Commission of India (eci.gov.in)
  - National Voters' Service Portal (voters.eci.gov.in)
  - Constitution of India (Articles 324-329)
- **Emergency**: Voter Helpline: **1950**

---
© 2026 Matdata Mitra • Dedicated to Indian Democracy.

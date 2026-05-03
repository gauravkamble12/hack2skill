# 🗳️ Matdata Mitra — India Election Assistant

An AI-powered civic education platform for Indian elections. Built for the **Google Antigravity Hackathon** to empower Indian citizens with neutral, factual, and accessible electoral information.

---

## 🎯 Hackathon Submission Details
- **Chosen Vertical**: Civic Tech / Democratic Engagement
- **Public Repo**: https://github.com/gauravkamble12/hack2skill
- **Live Demo (Frontend)**: [https://matdata-mitra-india.vercel.app](https://matdata-mitra-india.vercel.app)
- **Live Demo (Backend)**: [https://backend-zeta-gilt-i7moh0tq0f.vercel.app](https://backend-zeta-gilt-i7moh0tq0f.vercel.app)

---

## 💡 Tech Stack & Innovations
-   **AI Core**: **Google Gemini 2.0 Flash** for natural language understanding of election laws.
-   **Auth**: **Firebase Authentication** with Google Sign-In for personalized civic profiles.
-   **Cloud DB**: **Google Cloud Firestore** for real-time notification logs and subscriber management.
-   **Maps**: Premium **Google Maps API** integration with custom dark-themed styling for booth navigation.
-   **Testing**: Comprehensive **Jest** & **Supertest** suite for both Backend APIs and Frontend components.
-   **Aesthetics**: Premium Dark-Glassmorphism UI using **Next.js 16**, **Framer Motion**, and **Lucide Icons**.

---

## 🛠️ System Architecture
-   **Backend (Node.js/Express)**: 
    -   Secure AI routing with `express-rate-limit`.
    -   **Firebase Admin SDK** integration for server-side cloud operations.
    -   **Real-time News Watcher**: A background service that simulates election alerts and dispatches cloud-synced payloads.
-   **Frontend (Next.js 16)**:
    -   **AuthContext**: Centralized state management for Firebase users.
    -   **Responsive Map**: Dynamic booth finder using `@react-google-maps/api`.
    -   **Accessibility**: Full ARIA-compliant navigation and interaction models.

---

## 🚀 Quick Start (Local Development)

### 1. Backend Setup
```bash
cd backend
npm install
npm test # Run the API test suite
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm test # Run the component test suite
npm run dev
```

---

## 📦 Key Features
- 🤖 **Matdata Mitra AI Chat** — Smart Q&A using Google Gemini 2.0.
- 👨‍👩‍👧‍👦 **Mera Pehla Vote** — Onboarding wizard for first-time voters.
- 📍 **Premium Booth Finder** — Custom Google Maps integration.
- 🗳️ **Mock EVM Simulator** — Practice voting with VVPAT confirmation.
- 🛡️ **Admin Monitor** — Real-time cloud logs for system health.

---
© 2026 Matdata Mitra • Dedicated to Indian Democracy.

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const { translateText } = require('../services/translateService');

// Strict rate limit for AI endpoint (protect Gemini quota)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: 'AI request limit reached. Please wait a moment and try again.' }
});

// Load FAQ knowledge base
const faqsPath = path.join(__dirname, '../data/faqs.json');
let faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));

// ─── CACHE: Store AI responses to avoid duplicate API calls ───
const responseCache = new Map();

// ─── System Prompt for Matdata Mitra ───
const SYSTEM_PROMPT = `You are "Matdata Mitra" (मतदाता मित्र), an official civic education AI assistant created to help Indian citizens understand the election process. You are neutral, helpful, and friendly.

STRICT RULES:
1. NEVER promote, criticize, or show bias toward any political party or candidate
2. Only provide factual, neutral, educational information about elections
3. Always cite sources (ECI website, Constitution of India, RPA 1951)
4. If asked about political opinions or who to vote for, say "I only provide factual civic information. The choice of candidate is entirely yours as a free democratic citizen."
5. Respond in the same language the user writes in (English or Hindi)
6. Keep answers simple (Grade 6 reading level), use bullet points and emojis for clarity
7. Always end with 2-3 follow-up questions the user might want to ask, prefixed with "💡 You might also ask:"
8. Keep responses concise - max 300 words unless complex topic requires more

KNOWLEDGE BASE:
- Election Commission of India (eci.gov.in)
- Voter Helpline: 1950
- Voter Registration: voters.eci.gov.in
- Representation of the People Act, 1951
- Constitution of India (Articles 324-329)
- Model Code of Conduct
- National Voters' Day: January 25

TONE: Friendly, encouraging civic participation, simple, clear`;

// ─── Search local FAQ cache first ───
function searchLocalFAQ(query) {
  const q = query.toLowerCase().trim();
  const allFaqs = [...faqs.faqs, ...(faqs.hindi_faqs || [])];
  
  for (const faq of allFaqs) {
    // Check if any keyword matches as a whole phrase first
    const hasPhraseMatch = faq.keywords.some(k => k.includes(' ') && q.includes(k.toLowerCase()));
    
    // Count individual word matches (excluding very short common words)
    const words = q.split(/\s+/).filter(w => w.length > 2);
    let keywordHits = 0;
    faq.keywords.forEach(k => {
      if (!k.includes(' ') && words.includes(k.toLowerCase())) {
        keywordHits++;
      }
    });

    // Match if:
    // 1. Strong phrase match (e.g. "voter registration")
    // 2. Multiple keywords match (e.g. "how register voter")
    // 3. User query is exactly one of the keywords (e.g. "EVM")
    if (hasPhraseMatch || keywordHits >= 2 || faq.keywords.some(k => k.toLowerCase() === q)) {
      return {
        answer: faq.answer,
        sources: faq.sources,
        fromCache: true,
        question: faq.question
      };
    }
  }
  return null;
}

// ─── Call Gemini API ───
async function callGemini(userMessage, conversationHistory = [], targetLang = 'en') {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Gemini API key not configured');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  const langNames = {
    hi: 'Hindi', mr: 'Marathi', gu: 'Gujarati', 
    bn: 'Bengali', te: 'Telugu', ta: 'Tamil', 
    bho: 'Bhojpuri', en: 'English'
  };
  const targetLangName = langNames[targetLang] || 'English';

  const contents = [];
  if (conversationHistory.length > 0) {
    conversationHistory.slice(-6).forEach(msg => {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT + `\n\nCRITICAL: Respond in ${targetLangName} ONLY. Do NOT introduce yourself if the conversation has already started. Be direct.` }]
      },
      contents,
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 1024,
        topP: 0.8
      }
    })
  });


  if (!response.ok) {
    const err = await response.json();
    if (err.error?.code === 429) throw new Error('RATE_LIMIT');
    throw new Error(err.error?.message || 'Gemini API error');
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const reason = data.candidates?.[0]?.finishReason;
    if (reason === 'SAFETY') throw new Error('SAFETY_BLOCK');
    return 'I could not generate a response. Please try again or rephrase your question.';
  }
  return text;
}


// ─── Suggested follow-up questions ───
const SUGGESTIONS = [
  "How do I register as a voter?",
  "What documents do I need to vote?",
  "How does an EVM work?",
  "What is the Model Code of Conduct?",
  "How do I become a candidate?",
  "What is Lok Sabha?",
  "What is the Election Commission of India?",
  "Who is eligible to vote?"
];

// ─── POST /api/chat ───
router.post('/', aiLimiter, async (req, res) => {
  const { message, language = 'en', context = [] } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'Message too long. Please keep it under 500 characters.' });
  }

  try {
    // 1. Check local cache first (saves API quota!)
    const cacheKey = message.toLowerCase().trim().substring(0, 100);
    
    if (responseCache.has(cacheKey)) {
      const cached = responseCache.get(cacheKey);
      return res.json({ ...cached, fromSessionCache: true });
    }

    // 2. Search FAQ knowledge base
    const localAnswer = searchLocalFAQ(message);
    if (localAnswer) {
      // Use Google Translation API to translate the local answer to the user's language
      const translatedAnswer = await translateText(localAnswer.answer, language);
      
      const result = {
        reply: translatedAnswer,
        sources: localAnswer.sources,
        fromCache: true,
        suggestions: SUGGESTIONS.slice(0, 3)
      };
      responseCache.set(cacheKey, result);
      return res.json(result);
    }

    // 3. Call Gemini API for unknown questions
    const reply = await callGemini(message, context, language);
    
    const result = {
      reply,
      sources: ['Election Commission of India - eci.gov.in', 'Voter Helpline: 1950'],
      fromCache: false,
      suggestions: SUGGESTIONS.slice(0, 3)
    };
    
    // Cache the result to avoid future API calls for same question
    responseCache.set(cacheKey, result);
    // Limit cache size
    if (responseCache.size > 200) {
      const firstKey = responseCache.keys().next().value;
      responseCache.delete(firstKey);
    }

    return res.json(result);

  } catch (error) {
    console.error('Chat error:', error.message);

    if (error.message === 'RATE_LIMIT') {
      return res.status(429).json({
        error: 'AI rate limit reached. Please try again in a minute.',
        reply: "I'm a bit busy right now! 🙏 Please try asking again in a moment, or check the **Election Guide** section for detailed information.\n\n💡 You might also ask:\n- How do I register to vote?\n- What is the Model Code of Conduct?\n- What documents do I need to vote?",
        sources: ['Election Commission of India - eci.gov.in'],
        fromCache: false,
        rateLimited: true
      });
    }

    if (error.message === 'SAFETY_BLOCK') {
      return res.status(200).json({
        reply: "⚠️ I can only provide neutral, factual information about Indian elections and civic processes. Please ask me about voter registration, election procedures, ECI guidelines, or your voting rights.",
        sources: ['Election Commission of India - eci.gov.in'],
        fromCache: false,
        suggestions: SUGGESTIONS.slice(0, 3)
      });
    }

    return res.status(500).json({
      error: 'Something went wrong. Please try again.',
      reply: "I'm having trouble connecting right now. Please check the **Learning Hub** for information, or call the **Voter Helpline at 1950** for direct assistance.",
      sources: ['Voter Helpline: 1950']
    });
  }
});

// ─── GET /api/chat/suggestions ───
router.get('/suggestions', (req, res) => {
  res.json({ suggestions: SUGGESTIONS });
});

module.exports = router;

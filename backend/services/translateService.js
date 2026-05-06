const { TranslationServiceClient } = require('@google-cloud/translate');
const path = require('path');

const projectId = "matdata-mitra-india";
const location = 'global';

// Use environment variable for Vercel, or local JSON for dev
let credentials;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    credentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (e) {
    console.error("Invalid FIREBASE_SERVICE_ACCOUNT JSON in Translate Service", e);
  }
} else {
  try {
    credentials = require(path.join(__dirname, '../serviceAccountKey.json'));
  } catch (e) {
    console.warn("⚠️ Translation Service: serviceAccountKey.json not found.");
  }
}

let translationClient;
if (credentials) {
  try {
    translationClient = new TranslationServiceClient({ credentials });
  } catch (e) {
    console.error("Failed to initialize TranslationServiceClient", e);
  }
}

async function translateText(text, targetLanguage) {
  // Don't translate if target is English or text is empty
  if (!targetLanguage || targetLanguage === 'en' || !text) {
    return text;
  }

  try {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: 'text/plain',
      sourceLanguageCode: 'en',
      targetLanguageCode: targetLanguage,
    };

    if (!translationClient) {
      console.warn("Translation client not initialized. Skipping translation.");
      return text;
    }

    const [response] = await translationClient.translateText(request);
    return response.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to English on error
  }
}

module.exports = { translateText };

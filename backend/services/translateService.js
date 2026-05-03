const { TranslationServiceClient } = require('@google-cloud/translate');
const path = require('path');

const projectId = "matdata-mitra-india";
const location = 'global';

// Use environment variable for Vercel, or local JSON for dev
let credentials;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  credentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  credentials = require(path.join(__dirname, '../serviceAccountKey.json'));
}

const translationClient = new TranslationServiceClient({ credentials });

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

    const [response] = await translationClient.translateText(request);
    return response.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to English on error
  }
}

module.exports = { translateText };

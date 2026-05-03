const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  try {
    serviceAccount = require(path.join(__dirname, "../serviceAccountKey.json"));
  } catch (e) {
    console.error("Service account key not found. Please set FIREBASE_SERVICE_ACCOUNT env var.");
  }
}

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

let db;
if (admin.apps.length) {
  db = admin.firestore();
} else {
  console.warn("⚠️ Firebase Admin not initialized. Firestore will not be available.");
  // Mock db for tests or missing config
  db = {
    collection: () => ({
      doc: () => ({ get: () => Promise.resolve({ exists: false, data: () => ({}) }), set: () => Promise.resolve() }),
      add: () => Promise.resolve({ id: 'mock-id' }),
      where: () => ({ get: () => Promise.resolve({ docs: [], forEach: () => {} }) }),
      orderBy: () => ({ limit: () => ({ get: () => Promise.resolve({ docs: [], forEach: (cb) => [].forEach(cb) }) }) })
    })
  };
}

module.exports = { admin, db };

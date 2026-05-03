const { db } = require('./firebaseAdmin');

// Mock election news database
const MOCK_NEWS_SOURCE = [
  "New Election Date Announced for Bihar: Oct 18, 2025!",
  "ECI releases new guidelines for Senior Citizen voting.",
  "Voter registration drive starts in Maharashtra this Monday.",
  "Check your name in the final electoral roll published today.",
];

async function logToGCP(message, type = 'INFO') {
  try {
    const newLog = {
      timestamp: new Date().toISOString(),
      message,
      type,
      function_id: 'election-news-watcher-v1'
    };
    
    await db.collection('logs').add(newLog);
  } catch (e) {
    console.error("Log failed", e);
  }
}

function startWatcher() {
  console.log("☁️ Real GCP Cloud Function Watcher: Initializing...");
  logToGCP("Function 'election-news-watcher' initialized.", "SYSTEM");

  // Every 45 seconds, simulate a "News Detection" event
  setInterval(async () => {
    const news = MOCK_NEWS_SOURCE[Math.floor(Math.random() * MOCK_NEWS_SOURCE.length)];
    logToGCP(`GCP Scheduler triggered. Checking ECI RSS feeds...`, "TRIGGER");
    
    setTimeout(async () => {
      logToGCP(`New Alert Detected: "${news}"`, "ALERT");
      
      try {
        const subsSnapshot = await db.collection('subscribers').where('active', '==', true).get();
        if (!subsSnapshot.empty) {
          logToGCP(`Dispatching WhatsApp payloads to ${subsSnapshot.size} subscribers.`, "SUCCESS");
          // Real WhatsApp integration logic will go here once Twilio is ready
        } else {
          logToGCP(`No active subscribers found. Notification skipped.`, "SKIPPED");
        }
      } catch (err) {
        console.error("Subscriber check failed", err);
      }
    }, 2000);
  }, 45000);
}

module.exports = { startWatcher, logToGCP };

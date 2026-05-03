const fs = require('fs');
const path = require('path');

const LOGS_PATH = path.join(__dirname, '../data/gcp_logs.json');
const SUBSCRIBERS_PATH = path.join(__dirname, '../data/subscribers.json');

// Mock election news database
const MOCK_NEWS_SOURCE = [
  "New Election Date Announced for Bihar: Oct 18, 2025!",
  "ECI releases new guidelines for Senior Citizen voting.",
  "Voter registration drive starts in Maharashtra this Monday.",
  "Check your name in the final electoral roll published today.",
];

function logToGCP(message, type = 'INFO') {
  try {
    let logs = [];
    if (fs.existsSync(LOGS_PATH)) {
      logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf8'));
    }
    const newLog = {
      timestamp: new Date().toISOString(),
      message,
      type,
      function_id: 'election-news-watcher-v1'
    };
    logs.unshift(newLog); // Newest first
    // Keep only last 50 logs
    fs.writeFileSync(LOGS_PATH, JSON.stringify(logs.slice(0, 50), null, 2));
  } catch (e) {
    console.error("Log failed", e);
  }
}

function startWatcher() {
  console.log("☁️ Google Cloud Function Simulator: News Watcher started.");
  logToGCP("Function 'election-news-watcher' initialized.", "SYSTEM");

  // Every 45 seconds, simulate a "News Detection" event
  setInterval(() => {
    const news = MOCK_NEWS_SOURCE[Math.floor(Math.random() * MOCK_NEWS_SOURCE.length)];
    logToGCP(`GCP Scheduler triggered. Checking ECI RSS feeds...`, "TRIGGER");
    
    setTimeout(() => {
      logToGCP(`New Alert Detected: "${news}"`, "ALERT");
      
      // Simulate checking subscribers
      if (fs.existsSync(SUBSCRIBERS_PATH)) {
        const subs = JSON.parse(fs.readFileSync(SUBSCRIBERS_PATH, 'utf8'));
        if (subs.length > 0) {
          logToGCP(`Dispatching WhatsApp payloads to ${subs.length} subscribers.`, "SUCCESS");
        } else {
          logToGCP(`No subscribers found. Notification skipped.`, "SKIPPED");
        }
      }
    }, 2000);
  }, 45000);
}

module.exports = { startWatcher, logToGCP };

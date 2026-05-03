const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const chatRoute = require('./routes/chat');
const electionsRoute = require('./routes/elections');
const candidatesRoute = require('./routes/candidates');
const eligibilityRoute = require('./routes/eligibility');
const externalDataRoute = require('./routes/externalData');
const liveElectionRoute = require('./routes/liveElection');
const notificationsRoute = require('./routes/notifications');
const { startWatcher } = require('./services/cloudWatcher');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: [/localhost:\d+$/, /\.vercel\.app$/] }));
app.use(express.json());

// Global rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(globalLimiter);

// Routes
app.use('/api/chat', chatRoute);
app.use('/api/elections', electionsRoute);
app.use('/api/candidates', candidatesRoute);
app.use('/api/eligibility', eligibilityRoute);
app.use('/api/external', externalDataRoute);
app.use('/api/live', liveElectionRoute);
app.use('/api/notifications', notificationsRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Matdata Mitra API is running', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`✅ Matdata Mitra backend running at http://localhost:${PORT}`);
    startWatcher();
  });
}

module.exports = app;

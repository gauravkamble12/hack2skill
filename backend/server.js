const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
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

// Security & Basic Middleware
app.use(helmet());
app.use(hpp());
// Global CORS
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    const allowedPatterns = [/localhost:\d+$/, /\.vercel\.app$/];
    const isAllowed = allowedPatterns.some(pattern => pattern.test(origin));
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10kb' }));

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

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  console.error(`Unhandled Error [${status}]:`, err.message || err);
  
  // Ensure CORS headers are present even on errors
  const origin = req.headers.origin;
  const allowedPatterns = [/localhost:\d+$/, /\.vercel\.app$/];
  if (origin && allowedPatterns.some(pattern => pattern.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.status(status).json({ 
    error: status === 500 ? 'Internal Server Error' : 'Request Error', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Matdata Mitra backend running at http://localhost:${PORT}`);
    startWatcher();
  });
} else if (process.env.VERCEL) {
  // On Vercel, we still need to initialize the watcher if possible, 
  // but serverless functions are short-lived. 
  // For now, we skip startWatcher() to avoid startup overhead.
  console.log("☁️ Vercel deployment detected. Express app exported.");
}

module.exports = app;

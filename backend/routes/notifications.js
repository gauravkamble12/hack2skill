const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const SUBSCRIBERS_PATH = path.join(__dirname, '../data/subscribers.json');
const LOGS_PATH = path.join(__dirname, '../data/gcp_logs.json');

router.get('/logs', (req, res) => {
  try {
    if (fs.existsSync(LOGS_PATH)) {
      const logs = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf8'));
      res.status(200).json(logs);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

router.post('/subscribe', (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Please provide a valid 10-digit Indian phone number.' });
  }

  try {
    let subscribers = [];
    if (fs.existsSync(SUBSCRIBERS_PATH)) {
      subscribers = JSON.parse(fs.readFileSync(SUBSCRIBERS_PATH, 'utf8'));
    }

    if (subscribers.includes(phone)) {
      return res.status(200).json({ message: 'You are already subscribed!', alreadySubscribed: true });
    }

    subscribers.push(phone);
    fs.writeFileSync(SUBSCRIBERS_PATH, JSON.stringify(subscribers, null, 2));

    res.status(200).json({ message: 'Successfully subscribed to WhatsApp alerts!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription.' });
  }
});

module.exports = router;

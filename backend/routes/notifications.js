const express = require('express');
const router = express.Router();
const { db } = require('../services/firebaseAdmin');

// GET /api/notifications/logs
router.get('/logs', async (req, res) => {
  try {
    const logsSnapshot = await db.collection('logs')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();
    
    const logs = [];
    logsSnapshot.forEach(doc => logs.push(doc.data()));
    res.status(200).json(logs);
  } catch (error) {
    console.error('Fetch logs error:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// POST /api/notifications/subscribe
router.post('/subscribe', async (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'Please provide a valid 10-digit Indian phone number.' });
  }

  try {
    const subRef = db.collection('subscribers').doc(phone);
    const doc = await subRef.get();

    if (doc.exists) {
      return res.status(200).json({ message: 'You are already subscribed!', alreadySubscribed: true });
    }

    await subRef.set({
      phone,
      subscribedAt: new Date().toISOString(),
      active: true
    });

    res.status(200).json({ message: 'Successfully subscribed to WhatsApp alerts!' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Failed to process subscription.' });
  }
});

module.exports = router;

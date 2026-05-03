const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const electionsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/elections.json'), 'utf8'));

// GET /api/elections
router.get('/', (req, res) => {
  let { type, status, year } = req.query;
  let elections = electionsData.elections;

  if (type) elections = elections.filter(e => e.type.toLowerCase() === type.toLowerCase());
  if (status) elections = elections.filter(e => e.status === status);
  if (year) elections = elections.filter(e => e.year === parseInt(year));

  res.json({ elections, total: elections.length });
});

// GET /api/elections/upcoming
router.get('/upcoming', (req, res) => {
  const upcoming = electionsData.elections.filter(e => e.status === 'upcoming');
  res.json({ elections: upcoming });
});

// GET /api/elections/:id
router.get('/:id', (req, res) => {
  const election = electionsData.elections.find(e => e.id === req.params.id);
  if (!election) return res.status(404).json({ error: 'Election not found' });
  res.json(election);
});

module.exports = router;

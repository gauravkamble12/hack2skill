const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const candidatesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/candidates.json'), 'utf8'));

// GET /api/candidates
router.get('/', (req, res) => {
  let { state, constituency, election_id } = req.query;
  let candidates = candidatesData.candidates;

  if (state) candidates = candidates.filter(c => c.state?.toLowerCase().includes(state.toLowerCase()));
  if (constituency) candidates = candidates.filter(c => c.constituency?.toLowerCase().includes(constituency.toLowerCase()));
  if (election_id) candidates = candidates.filter(c => c.election_id === election_id);

  res.json({ candidates, total: candidates.length });
});

// GET /api/candidates/:id
router.get('/:id', (req, res) => {
  const candidate = candidatesData.candidates.find(c => c.id === req.params.id);
  if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
  res.json(candidate);
});

module.exports = router;

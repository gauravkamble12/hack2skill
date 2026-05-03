const express = require('express');
const router = express.Router();
const realTimeFetcher = require('../realTimeFetcher');

// Get upcoming elections
router.get('/upcoming', async (req, res) => {
  try {
    const elections = await realTimeFetcher.getUpcomingElections();
    res.json({ success: true, elections });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get live election status
router.get('/status/:electionId', async (req, res) => {
  try {
    const { electionId } = req.params;
    const status = await realTimeFetcher.getLiveElectionStatus(electionId);
    res.json({ success: true, electionId, status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get election phases
router.get('/phases/:electionType/:year', async (req, res) => {
  try {
    const { electionType, year } = req.params;
    const phases = await realTimeFetcher.getElectionPhases(electionType, parseInt(year));
    res.json({ success: true, phases });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get live turnout
router.get('/turnout/:electionId', async (req, res) => {
  try {
    const { electionId } = req.params;
    const turnout = await realTimeFetcher.getLiveTurnout(electionId);
    res.json({ success: true, electionId, turnout });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get state-wise results
router.get('/results/:electionId', async (req, res) => {
  try {
    const { electionId } = req.params;
    const results = await realTimeFetcher.getStateWiseResults(electionId);
    res.json({ success: true, electionId, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Search elections
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ success: false, error: "Query parameter 'q' required" });
    }
    const results = await realTimeFetcher.searchElections(q);
    res.json({ success: true, query: q, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
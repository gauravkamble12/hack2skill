const express = require('express');
const router = express.Router();
const dataLoader = require('../dataLoader');

// Get all available data types
router.get('/types', (req, res) => {
  res.json({
    available: dataLoader.getAvailableDataTypes(),
    message: "Add JSON files to backend/data/external/ folder"
  });
});

// Get data by type
router.get('/:type', (req, res) => {
  const { type } = req.params;
  const data = dataLoader.getData(type);
  
  if (data) {
    res.json({ success: true, data, source: 'external' });
  } else {
    res.status(404).json({ 
      success: false, 
      error: `Data type '${type}' not found`,
      available: dataLoader.getAvailableDataTypes()
    });
  }
});

// Add new entry to data
router.post('/:type', (req, res) => {
  const { type } = req.params;
  const entry = req.body;
  
  if (!entry) {
    return res.status(400).json({ success: false, error: "No entry data provided" });
  }
  
  const success = dataLoader.addDataEntry(type, entry);
  
  if (success) {
    res.json({ success: true, message: `Added entry to ${type}` });
  } else {
    res.status(400).json({ success: false, error: "Could not add entry" });
  }
});

// Reload specific data
router.post('/reload/:type', (req, res) => {
  const { type } = req.params;
  const success = dataLoader.reloadData(type);
  
  if (success) {
    res.json({ success: true, message: `Reloaded ${type}` });
  } else {
    res.status(404).json({ success: false, error: `Data type '${type}' not found` });
  }
});

module.exports = router;
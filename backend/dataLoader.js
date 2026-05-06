// Dynamic Data Loader - Reads JSON files from external folder
const fs = require('fs');
const path = require('path');

const EXTERNAL_DATA_DIR = path.join(__dirname, 'external');

class DynamicDataLoader {
  constructor() {
    this.dataCache = {};
    this.lastLoadTime = {};
    this.loadAllExternalData();
  }

  // Load all JSON files from external folder
  loadAllExternalData() {
    try {
      if (!fs.existsSync(EXTERNAL_DATA_DIR)) {
        try {
          fs.mkdirSync(EXTERNAL_DATA_DIR, { recursive: true });
          this.createSampleFiles();
        } catch (e) {
          console.warn("⚠️ Could not create external data directory (read-only system).");
        }
      }

      let files = [];
      try {
        files = fs.readdirSync(EXTERNAL_DATA_DIR);
      } catch (e) {
        console.warn("⚠️ Could not read external data directory. Skipping external data load.");
      }
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(EXTERNAL_DATA_DIR, file);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const dataName = file.replace('.json', '');
          this.dataCache[dataName] = data;
          this.lastLoadTime[dataName] = fs.statSync(filePath).mtime;
        }
      });

      console.log(`✅ Loaded external data: ${Object.keys(this.dataCache).join(', ')}`);
    } catch (error) {
      console.error('Error loading external data:', error.message);
    }
  }

  // Reload specific data file
  reloadData(dataName) {
    try {
      const filePath = path.join(EXTERNAL_DATA_DIR, `${dataName}.json`);
      if (fs.existsSync(filePath)) {
        this.dataCache[dataName] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        this.lastLoadTime[dataName] = fs.statSync(filePath).mtime;
        console.log(`🔄 Reloaded: ${dataName}`);
        return true;
      }
    } catch (error) {
      console.error(`Error reloading ${dataName}:`, error.message);
    }
    return false;
  }

  // Get data by name
  getData(dataName) {
    // Reload if file changed
    const filePath = path.join(EXTERNAL_DATA_DIR, `${dataName}.json`);
    if (fs.existsSync(filePath)) {
      const mtime = fs.statSync(filePath).mtime;
      if (this.lastLoadTime[dataName] && mtime > this.lastLoadTime[dataName]) {
        this.reloadData(dataName);
      }
    }
    return this.dataCache[dataName] || null;
  }

  // Get all available data types
  getAvailableDataTypes() {
    return Object.keys(this.dataCache);
  }

  // Add new data entry
  addDataEntry(dataName, entry) {
    if (!this.dataCache[dataName]) {
      this.dataCache[dataName] = [];
    }
    
    if (Array.isArray(this.dataCache[dataName])) {
      this.dataCache[dataName].push(entry);
      this.saveToFile(dataName);
      return true;
    }
    return false;
  }

  // Save data to file
  saveToFile(dataName) {
    try {
      const filePath = path.join(EXTERNAL_DATA_DIR, `${dataName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(this.dataCache[dataName], null, 2));
      console.log(`💾 Saved: ${dataName}`);
      return true;
    } catch (error) {
      console.error(`Error saving ${dataName}:`, error.message);
      return false;
    }
  }

  // Create sample files for user reference
  createSampleFiles() {
    const sampleFiles = {
      'custom_elections': [
        { id: "custom-2025-1", name: "Test Election", date: "2025-12-01", status: "upcoming" }
      ],
      'custom_candidates': [
        { id: "c1", name: "Test Candidate", party: "Test Party", constituency: "Test" }
      ],
      'custom_news': [
        { id: "n1", title: "Sample News", date: "2025-05-01", content: "Add your news here" }
      ]
    };

    Object.entries(sampleFiles).forEach(([name, data]) => {
      const filePath = path.join(EXTERNAL_DATA_DIR, `${name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    });

    console.log("📁 Sample files created in external folder");
  }
}

module.exports = new DynamicDataLoader();
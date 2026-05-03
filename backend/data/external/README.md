// External Data Folder - Add Your Data Here!
// ============================================
// 
// Simply add JSON files to this folder and they will be 
// automatically loaded by the app - NO CODE CHANGES NEEDED!
//
// How to use:
// 1. Create a new JSON file in this folder
// 2. Name it descriptive (e.g., election_results.json)
// 3. The API will automatically read it
//
// Example API calls:
// - GET /api/external/types      → List all available data
// - GET /api/external/election_results → Get election_results data
// - POST /api/external/election_results → Add new entry
// - POST /api/external/reload/election_results → Reload data
//
// Real-time elections:
// - GET /api/live/upcoming → Get upcoming elections
// - GET /api/live/status/election-id → Get live status
// - GET /api/live/turnout/election-id → Get live turnout
// - GET /api/live/results/election-id → Get state-wise results
// - GET /api/live/search?q=state → Search elections
//
// Example data format for elections:
//
// {
//   "elections": [
//     {
//       "id": "my-election-2025",
//       "name": "My Custom Election",
//       "state": "State Name",
//       "date": "2025-12-01",
//       "status": "upcoming/completed",
//       "seats": 250,
//       "results": {
//         "party1": 120,
//         "party2": 80,
//         "party3": 50
//       }
//     }
//   ]
// }
//
// Example data format for news:
//
// {
//   "news": [
//     {
//       "id": "n1",
//       "title": "Election News",
//       "date": "2025-05-03",
//       "content": "News content here...",
//       "source": "Source Name"
//     }
//   ]
// }

// Add your data below:
{
  "example_entry": {
    "note": "This is just a sample. Add your own JSON files!"
  }
}
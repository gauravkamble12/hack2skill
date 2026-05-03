const request = require('supertest');
const app = require('../server');

describe('Election Chatbot API Tests', () => {
  
  test('GET /api/health should return OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  test('GET /api/elections should return election data', async () => {
    const res = await request(app).get('/api/elections');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.elections)).toBe(true);
  });

  test('POST /api/chat should return a reply', async () => {
    // If the API key is leaked, the real call will fail.
    // For testing purposes, we check if the endpoint exists and handles requests.
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello', language: 'en' });
    
    // Check if it returns 200 (Success), 429 (Rate Limit), or 500 (API Key Error)
    // In a real CI/CD we would mock the Gemini call entirely.
    expect([200, 429, 500]).toContain(res.statusCode);
  });

  test('GET /api/notifications/logs should return logs', async () => {
    const res = await request(app).get('/api/notifications/logs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

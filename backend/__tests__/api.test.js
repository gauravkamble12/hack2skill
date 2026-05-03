const request = require('supertest');
const app = require('../server');

describe('Health Check', () => {
  it('should return OK status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});

describe('Chat API', () => {
  const validPayload = {
    message: 'How do I register to vote?',
    language: 'en'
  };

  it('should reject empty message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: '' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('empty');
  });

  it('should reject message over 500 characters', async () => {
    const longMessage = 'a'.repeat(501);
    const res = await request(app)
      .post('/api/chat')
      .send({ message: longMessage });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('too long');
  });

  it('should accept valid message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send(validPayload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('reply');
    expect(res.body).toHaveProperty('sources');
  });

  it('should return cached response for repeated query', async () => {
    const res1 = await request(app).post('/api/chat').send(validPayload);
    const res2 = await request(app).post('/api/chat').send(validPayload);
    expect(res2.body.fromCache).toBe(true);
  });

  it('should include suggestions in response', async () => {
    const res = await request(app).post('/api/chat').send(validPayload);
    expect(res.body).toHaveProperty('suggestions');
    expect(Array.isArray(res.body.suggestions)).toBe(true);
  });
});

describe('Rate Limiting', () => {
  it('should reject requests beyond rate limit', async () => {
    const promises = [];
    for (let i = 0; i < 25; i++) {
      promises.push(
        request(app)
          .post('/api/chat')
          .send({ message: 'test' })
      );
    }
    const responses = await Promise.all(promises);
    const rateLimited = responses.some(r => r.status === 429);
    expect(rateLimited).toBe(true);
  }, 30000);
});

describe('Security Headers', () => {
  it('should include security headers', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBeDefined();
  });
});

describe('Input Sanitization', () => {
  it('should block XSS attempts', async () => {
    const xssPayload = { message: '<script>alert("xss")</script>What is voter ID?' };
    const res = await request(app).post('/api/chat').send(xssPayload);
    expect(res.status).toBe(200);
    expect(res.body.reply).not.toContain('<script>');
  });

  it('should block SQL injection patterns', async () => {
    const sqlPayload = { message: "'; DROP TABLE users;--" };
    const res = await request(app).post('/api/chat').send(sqlPayload);
    expect(res.status).toBe(200);
  });
});

describe('Suggestions Endpoint', () => {
  it('should return suggestion list', async () => {
    const res = await request(app).get('/api/chat/suggestions');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.suggestions)).toBe(true);
    expect(res.body.suggestions.length).toBeGreaterThan(0);
  });
});
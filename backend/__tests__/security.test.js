const request = require('supertest');
const app = require('../server');

describe('Security Headers & Middleware', () => {
  it('should have security headers (Helmet)', async () => {
    const response = await request(app).get('/api/health');
    expect(response.headers['x-dns-prefetch-control']).toBeDefined();
    expect(response.headers['x-frame-options']).toBeDefined();
    expect(response.headers['strict-transport-security']).toBeDefined();
    expect(response.headers['content-security-policy']).toBeDefined();
  });

  it('should handle CORS correctly', async () => {
    const response = await request(app)
      .get('/api/health')
      .set('Origin', 'https://matdata-mitra-india.vercel.app');
    expect(response.headers['access-control-allow-origin']).toBe('https://matdata-mitra-india.vercel.app');
  });

  it('should limit request body size', async () => {
    const largeData = 'a'.repeat(11 * 1024); // 11kb, over the 10kb limit
    const response = await request(app)
      .post('/api/chat')
      .send({ message: largeData });
    expect(response.status).toBe(413); // Payload Too Large
  });
});

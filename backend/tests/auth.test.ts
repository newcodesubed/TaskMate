import request from 'supertest';
import app from '../src/app';

describe('Auth API', () => {
  it('should signup a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'alice', password: 'secret' });

    expect(res.status).toBe(201);
  });

  it('should login and return cookie', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'secret' });

    expect(res.status).toBe(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });
});

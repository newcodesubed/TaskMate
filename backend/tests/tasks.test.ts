import request from 'supertest';
import app from '../src/app';

let cookie: string;

beforeAll(async () => {
  // first signup or login
  await request(app).post('/api/auth/signup').send({
    username: 'alice',
    password: 'secret',
  });

  const res = await request(app).post('/api/auth/login').send({
    username: 'alice',
    password: 'secret',
  });

  cookie = res.headers['set-cookie'][0];
});

describe('Tasks API', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Cookie', cookie)
      .send({ title: 'Test Task', priority: 'High' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Cookie', cookie);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
// 
// cookie = Array.isArray(res.headers['set-cookie'])
//     ? res.headers['set-cookie']
//     : [res.headers['set-cookie']];
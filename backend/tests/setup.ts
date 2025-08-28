import { pool } from '../src/utils/db';

beforeAll(async () => {
  await pool.query('DELETE FROM tasks;');
  await pool.query('DELETE FROM users;');
});

afterAll(async () => {
  await pool.end();
});

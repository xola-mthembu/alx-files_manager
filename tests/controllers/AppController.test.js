import request from 'supertest';
import app from '../../server';

describe('AppController', () => {
  describe('GET /status', () => {
    it('should return the status of Redis and DB connections', async () => {
      const res = await request(app).get('/status');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('redis');
      expect(res.body).toHaveProperty('db');
    });
  });

  describe('GET /stats', () => {
    it('should return the number of users and files', async () => {
      const res = await request(app).get('/stats');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('users');
      expect(res.body).toHaveProperty('files');
      expect(typeof res.body.users).toBe('number');
      expect(typeof res.body.files).toBe('number');
    });
  });
});

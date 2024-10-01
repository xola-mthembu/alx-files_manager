import request from 'supertest';
import app from '../../server';
import dbClient from '../../utils/db';

describe('API Integration Tests', () => {
  beforeAll(async () => {
    // Clear the database before running tests
    await dbClient.client.db().collection('users').deleteMany({});
    await dbClient.client.db().collection('files').deleteMany({});
  });

  describe('User Registration and Authentication', () => {
    it('should register a new user, authenticate, and get user info', async () => {
      // Register a new user
      const registerRes = await request(app)
        .post('/users')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(registerRes.statusCode).toEqual(201);
      expect(registerRes.body).toHaveProperty('id');
      expect(registerRes.body).toHaveProperty('email', 'test@example.com');

      // Authenticate the user
      const authRes = await request(app)
        .get('/connect')
        .set('Authorization', 'Basic dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZDEyMw==');
      expect(authRes.statusCode).toEqual(200);
      expect(authRes.body).toHaveProperty('token');

      const { token } = authRes.body;

      // Get user info
      const userInfoRes = await request(app)
        .get('/users/me')
        .set('X-Token', token);
      expect(userInfoRes.statusCode).toEqual(200);
      expect(userInfoRes.body).toHaveProperty('id');
      expect(userInfoRes.body).toHaveProperty('email', 'test@example.com');
    });
  });

  afterAll(async () => {
    // Close the database connection
    await dbClient.client.close();
  });
});

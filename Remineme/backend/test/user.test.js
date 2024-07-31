const request = require('supertest');
const { sequelize, User } = require('../models');
const app = require('../src/app'); // Correctly import the app

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Users API', () => {
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        name: 'New User', // Include name since your model requires it
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('username', 'newuser');
  });

  test('should login a user', async () => {
    // Ensure the user exists
    await User.create({
      name: 'New User',
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'newpassword'
    });

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'newuser@example.com',
        password: 'newpassword'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'newuser@example.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401);
  });
});

const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../models');

beforeAll(async () => {
  jest.setTimeout(30000); // Set timeout to 30 seconds
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Reminders API', () => {
  let user;
  let token;

  beforeAll(async () => {
    // Create a user and get a JWT token for authenticated requests
    const res = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password',
    });
    user = res.body;
    const loginRes = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'password',
    });
    token = loginRes.body.token;
  });

  test('should create a new reminder', async () => {
    const res = await request(app)
      .post('/api/reminders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Reminder',
        description: 'This is a test reminder',
        date: new Date(),
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('should get all reminders', async () => {
    const res = await request(app)
      .get('/api/reminders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('should update a reminder', async () => {
    const reminder = await request(app)
      .post('/api/reminders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Reminder to update',
        description: 'Update this reminder',
        date: new Date(),
      });
    const res = await request(app)
      .put(`/api/reminders/${reminder.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Reminder',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Reminder');
  });

  test('should delete a reminder', async () => {
    const reminder = await request(app)
      .post('/api/reminders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Reminder to delete',
        description: 'Delete this reminder',
        date: new Date(),
      });
    const res = await request(app)
      .delete(`/api/reminders/${reminder.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});

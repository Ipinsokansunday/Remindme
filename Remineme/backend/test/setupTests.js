const { sequelize } = require('../models');
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}, 30000); // Increase timeout to 30 seconds

afterAll(async () => {
  try {
    console.log('Closing database connection...');
    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
});

test('dummy test', () => {
  expect(true).toBe(true);
});

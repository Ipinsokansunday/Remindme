require('dotenv').config({ path: '.env.test' });
const sequelize = require('../config/database');

test('Database connection is established', async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Ensure the test fails if connection is not established
  }
});

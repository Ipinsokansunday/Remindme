const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false, // Disable logging, or customize as needed
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import models
const User = require('./user')(sequelize, DataTypes);
const Reminder = require('./reminder')(sequelize, DataTypes);

// Define associations
User.hasMany(Reminder, { foreignKey: 'userId' });
Reminder.belongsTo(User, { foreignKey: 'userId' });

// Export the sequelize instance and models
const db = {
  sequelize,
  Sequelize,
  User,
  Reminder,
};

module.exports = db;

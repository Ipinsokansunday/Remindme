require('dotenv').config();

const { DATABASE_URL } = process.env;

const defaultConfig = {
  dialect: 'postgres',
};

module.exports = {
  development: {
    ...defaultConfig,
    url: DATABASE_URL,
  },
  test: {
    ...defaultConfig,
    url: DATABASE_URL,
  },
  production: {
    ...defaultConfig,
    url: DATABASE_URL,
  },
};

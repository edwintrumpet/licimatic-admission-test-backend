require('dotenv').config();

const config = {
  isDev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbLocal: process.env.DB_LOCAL,
};

module.exports = config;

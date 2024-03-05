const config = require('./index');
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    url: process.env.DATABASE_DEV_URL,
    dialect: "postgres",
    // logging: true,
    define: {
      timestamps: true,
      underscored: true
    }
  },
  production: {
    url: process.env.DATABASE_PROD_URL,
    dialect: "postgres",
    // logging: true,
    define: {
      timestamps: true,
      underscored: true
    }
  }
};

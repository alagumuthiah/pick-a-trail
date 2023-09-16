const databaseConfig = require('./config.js');
const db = databaseConfig.database;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

module.exports = {
    development: {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": "postgres",
        "seederStorage": "sequelize"
    },
    production: {
        "use_env_variable": 'DATABASE_URL',
        "dialect": 'postgres',
        "seederStorage": 'sequelize'
    },
};

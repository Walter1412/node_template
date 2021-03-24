module.exports = {
  development: {
    username: 'cloud',
    password: 'Cloud1234',
    database: 'test',
    host: '10.1.1.78',
    port: '1066',
    dialect: 'mysql',
  },
  sit: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
};

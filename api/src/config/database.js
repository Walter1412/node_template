module.exports = {
  development: {
    username: 'cloud',
    password: 'Cloud1234',
    database: 'test',
    host: '10.1.1.68',
    port: '1066',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

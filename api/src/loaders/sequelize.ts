const { Sequelize } = require('sequelize');
import Logger from './logger';
const config = require('../config/database.json');

export default () => {
  const { development } = config;
  const { database, username, password, host, port, dialect } = development;
  const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: (msg: any) => Logger.debug(msg),
  });
  return sequelize;
};

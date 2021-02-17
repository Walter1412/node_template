const { Sequelize, DataTypes } = require('sequelize');
import Logger from './logger';

export default async () => {
  const sequelize = new Sequelize('test', 'cloud', 'Cloud1234', {
    host: '10.1.1.88',
    port: '1066',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    logging: (msg: any) => Logger.debug(msg),
  });

  // return sequelize.authenticate;
  return sequelize;
};

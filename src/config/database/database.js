import { Sequelize } from 'sequelize';
import config from '../env/env-config.js'

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  dialect: 'postgres',
  port: config.dbPort
});

export default sequelize;
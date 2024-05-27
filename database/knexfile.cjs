const { getPassword } = require('../utils/getDbPassword');
require('dotenv').config({
  path: '../.env',
});

const config = process.env;

module.exports = {
  development: {
    client: 'pg',
    connection: async () => {
      const password = await getPassword();
      return {
        host: config['DB_HOST'],
        port: '5432',
        user: config['POSTGRES_USER'],
        password,
        database: config['POSTGRES_DB'],
      };
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
};

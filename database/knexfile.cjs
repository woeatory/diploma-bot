const fs = require('node:fs');
const { readFile } = require('node:fs/promises');
require('dotenv').config({
  path: '../.env',
});

const config = process.env;

const getPassword = async () => {
  const toBool = [() => true, () => false];

  const exists = await fs.promises
    .access(config['POSTGRES_PASSWORD_FILE'])
    .then(...toBool);
  const passwordFilePath = exists
    ? config['POSTGRES_PASSWORD_FILE']
    : 'password.txt';
  const password = await readFile(passwordFilePath, {
    encoding: 'utf8',
  });
  return password.trim();
};

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
      directory: './seeds',
    },
  },
};

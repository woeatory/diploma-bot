const { readFile } = require('node:fs/promises');

const config = process.env;

const getPassword = async () => {
  const password = await readFile(config['POSTGRES_PASSWORD_FILE'], {
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
        host: 'postgres-db',
        port: '5432',
        user: process.env.POSTGRES_USER,
        password,
        database: process.env.POSTGRES_DB,
      };
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

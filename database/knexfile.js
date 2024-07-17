import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getDbPassword } from '../utils/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbConfig = {
  ...config({ path: path.join(__dirname, '../.env') }).parsed,
  ...process.env,
};

export default {
  development: {
    client: 'pg',
    connection: async () => {
      const password = await getDbPassword(dbConfig.DB_PASSWORD_FILE);
      return {
        host: dbConfig['POSTGRES_HOST'],
        port: '5432',
        user: dbConfig['POSTGRES_USER'],
        password,
        database: dbConfig['POSTGRES_DB'],
      };
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.join(__dirname, './seeds/dev'),
    },
  },
};

import knex from 'knex';
import knexConfig from '../database/knexfile.js';

const db = knex(knexConfig.development);

export default db;

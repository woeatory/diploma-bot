import knex from 'knex';

export default function (config) {
  return knex({
    client: 'pg',
    connection: {
      host: config['host'],
      port: config['port'],
      user: config['user'],
      database: config['database'],
      password: config['password'],
      ssl: config['ssl'] ? { rejectUnauthorized: false } : false,
    },
  });
}

const env = process.env;

export default {
  botConfig: {
    token: env.BOT_TOKEN,
    mode: env.BOT_MODE,
  },
  postgresConfig: {
    host: env['POSTGRES_HOST'],
    port: env['POSTGRES_PORT'],
    user: env['POSTGRES_USER'],
    database: env['POSTGRES_DB'],
    password: env['POSTGRES_PASSWORD'],
    ssl: env['POSTGRES_SSL'] ? { rejectUnauthorized: false } : false,
  },
};

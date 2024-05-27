import start from './db/pg/start.js';
import UserRepository from './education/user/database/db.js';
import UserService from './education/user/domain/service/user-service.js';

export default function bootstrap(config) {
  const knex = start(config.postgresConfig);
  const userService = new UserService(new UserRepository(knex));
  return {
    userService,
  };
}

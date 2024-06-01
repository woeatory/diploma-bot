import start from './db/pg/start.js';
import DictionaryRepository from './education/dictionary/database/db.js';
import DictionaryService from './education/dictionary/domain/service/dictionary-service.js';
import UserRepository from './education/user/database/db.js';
import UserService from './education/user/domain/service/user-service.js';

export default function bootstrap(config) {
  const knex = start(config.postgresConfig);
  const userService = new UserService(new UserRepository(knex));
  const dictionaryService = new DictionaryService(
    new DictionaryRepository(knex),
  );

  return {
    userService,
    dictionaryService,
  };
}

import start from './db/pg/start.js';
import LadderRepository from './bot/crocodile-game/database/db.js';
import LadderService from './bot/crocodile-game/domain/service/ladder-service.js';
import DictionaryRepository from './education/dictionary/database/db.js';
import DictionaryService from './education/dictionary/domain/service/dictionary-service.js';
import UserRepository from './bot/user/database/db.js';
import UserService from './bot/user/domain/service/user-service.js';
import ChatService from './bot/chat/domain/chat-service.js';
import ChatsRepository from './bot/chat/database/db.js';
import LectureService from './education/lecture/domain/lecture-service.js';
import LectureRepository from './education/lecture/database/db.js';

export default function bootstrap(config) {
  const knex = start(config.postgresConfig);
  const chatService = new ChatService(new ChatsRepository(knex));
  const userService = new UserService(new UserRepository(knex));
  const ladderService = new LadderService(new LadderRepository(knex));
  const dictionaryService = new DictionaryService(
    new DictionaryRepository(knex),
  );
  const lectureService = new LectureService(new LectureRepository(knex));
  return {
    userService,
    dictionaryService,
    ladderService,
    chatService,
    lectureService,
  };
}

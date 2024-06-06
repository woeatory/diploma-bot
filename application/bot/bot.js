import { Bot, session } from 'grammy';
import { conversations } from '@grammyjs/conversations';
import user from './user/telegram/composer.js';
import crocodile from './crocodile-game/telegram/composer.js';
import chats from './chat/telegram/composer.js';
import createDictionary from './dictionary/telegram/create-dictionary.js';
import getUsersAllDictionaries from './dictionary/telegram/get-users-dictionaries.js';
import editDictionaryConversation from './dictionary/telegram/edit-dictionary.js';
import viewDictionary from './dictionary/telegram/view-dictionary.js';

const startPolling = (bot) => {
  bot.start({
    allowed_updates: [
      'message',
      'callback_query',
      'chat_member',
      'inline_query',
    ],
    onStart: (botInfo) => console.log(botInfo),
  });
};

const startWebhook = () => {
  throw new Error('not implemented');
};

export const initBot = async (botConfig, services) => {
  const bot = new Bot(botConfig.token);

  bot.use(session({ initial: () => ({}) }));
  bot.use(conversations());

  await bot.api.setMyCommands([
    { command: 'crocodile_start', description: 'Start playing crocodile' },
    { command: 'crocodile_rating', description: 'Show crocodile rating' },
    { command: 'create_dictionary', description: 'Create dictionary' },
    {
      command: 'get_my_dictionaries',
      description: 'Get list of my dictionaries',
    },
  ]);

  bot.use(user(services.userService));
  bot.use(chats(services.chatService));

  bot.use(createDictionary(services.dictionaryService));
  bot.use(getUsersAllDictionaries(services.dictionaryService));
  bot.use(viewDictionary(services.dictionaryService));
  bot.use(editDictionaryConversation(services.dictionaryService));
  bot.use(crocodile(services.ladderService));
  bot.catch((error) => {
    console.error(error);
  });
  botConfig.mode === 'WEBHOOK' ? startWebhook() : startPolling(bot);
};

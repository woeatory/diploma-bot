import { Bot } from 'grammy';
import user from './user/telegram/composer.js';
import crocodile from './crocodile-game/telegram/composer.js';
import chats from './chat/telegram/composer.js';

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
  await bot.api.setMyCommands([
    { command: 'crocodile_start', description: 'Start playing crocodile' },
    { command: 'crocodile_rating', description: 'Show crocodile rating' },
  ]);

  bot.use(chats(services.chatService));
  bot.use(crocodile(services.ladderService));
  bot.use(user(services.userService));

  botConfig.mode === 'WEBHOOK' ? startWebhook() : startPolling(bot);
};

import { Bot, Composer } from 'grammy';
import { user } from './user/user.js';
import { crocodile } from './crocodile/game.js';

const startPolling = (bot) => {
  bot.start({
    allowed_updates: ['message', 'chat_member'],
    onStart: (botInfo) => console.log(botInfo),
  });
};

const startWebhook = () => {
  throw new Error('not implemented');
};

export const initBot = (botConfig, services) => {
  const bot = new Bot(botConfig.token);
  const main = new Composer();
  main.use(crocodile);
  main.use(user(services.userService));

  botConfig.mode === 'WEBHOOK' ? startWebhook() : startPolling(bot);

};

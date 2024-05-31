import { Bot } from 'grammy';
import { user } from './user/user.js';

const startPolling = (bot) => {
  bot.start({
    allowed_updates: ['message'],
    onStart: (botInfo) => console.log(botInfo),
  });
};

const startWebhook = () => {
  throw new Error('not implemented');
};

export const initBot = (botConfig, services) => {
  const bot = new Bot(botConfig.token);

  bot.on('message');
  bot.use(user(services.userService));

  botConfig.mode === 'WEBHOOK' ? startWebhook() : startPolling(bot);

};

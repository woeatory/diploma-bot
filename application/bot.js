import { Bot } from 'grammy';

export const createBot = (botConfig) => new Bot(botConfig.token);

export const startPolling = (bot) => {
  bot.start({
    allowed_updates: ['message'],
    onStart: (botInfo) => console.log(botInfo),
  });
};

// export const startWebhook = (bot) => {
//   throw new Error('not implemented');
// };

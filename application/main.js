import { createBot, startPolling, startWebhook } from './bot.js';
import { botConfig } from './config.js';

const bot = createBot(botConfig);

const connectionModes = {
  'POLLING': startPolling,
  'WEBHOOK': startWebhook,
};

const startConnection = connectionModes[process.env.BOT_MODE];

if (!startConnection) process.exit(1);

startConnection(bot);

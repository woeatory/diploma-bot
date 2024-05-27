import { createBot, startPolling, startWebhook } from './bot.js';
import bootstrap from './bootstrap.js';
import config from './config.js';

bootstrap(config);

const bot = createBot(config.botConfig);

const connectionModes = {
  POLLING: startPolling,
  WEBHOOK: startWebhook,
};

const startConnection = connectionModes[process.env.BOT_MODE];

if (!startConnection) process.exit(1);

startConnection(bot);

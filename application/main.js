import { initBot } from './bot/bot.js';
import bootstrap from './bootstrap.js';
import config from './config.js';

const services = bootstrap(config);

initBot(config.botConfig, services);

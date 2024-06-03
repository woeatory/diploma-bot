import { Composer } from 'grammy';
import { GameEngine } from './game-engine.js';

const crocodile = (ladderService) => {
  const composer = new Composer();

  composer.command('crocodile_rating', async (ctx, next) => {
    const res = await ladderService.getChatRating(ctx.chat.id);
    if (res.length === 0) await ctx.reply('Nobody has played yet');
    let text = '';
    res.map((record, index) => {
      text += `${index + 1}. ${record.username}: ${record.score}\n`;
    });
    ctx.reply(text);
    await next();
  });

  composer.command('crocodile_start', async (ctx, next) => {
    try {
      const userId = ctx.from.id;
      const chatId = ctx.chat.id;

      GameEngine.setState(chatId, {
        masterUser: userId,
        isRunning: false,
        word: '',
      });

      await ctx.reply(`@${ctx.from.username}, check direct messages`);
      await ctx.api.sendMessage(userId, 'Choose a word for others to guess:');
    } catch (error) {
      if (error.error_code === 403) {
        ctx.reply(`@${ctx.from.username}, try to start me in direct messages`);
      }
    }
    await next();
  });

  composer.chatType('private').on('message:text', async (ctx, next) => {
    const userId = ctx.from.id;
    const [chatId, state] = GameEngine.startGame(
      userId,
      ctx.msg.text.toLowerCase(),
    );
    if (state) {
      await ctx.reply('Game has been started');
      await ctx.api.sendMessage(chatId, 'Game has been started');
    }
    await next();
  });

  composer.chatType('group').on('message:text', async (ctx, next) => {
    const userId = ctx.from.id;
    const chatId = ctx.chat.id;
    const word = ctx.msg.text;
    const gameState = GameEngine.getState(chatId);
    if (!gameState) {
      await next();
      return;
    }

    if (GameEngine.guessWord(word, userId, gameState)) {
      GameEngine.deleteState(chatId);
      await ctx.reply(
        `Congratulations! The word was "${gameState.word}". The game is now over.`,
      );
      await ladderService.addUsersScore({ userId, chatId });
      await next();
    }
  });
  return composer;
};

export default crocodile;

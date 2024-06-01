import { Composer } from 'grammy';

export const crocodile = () => {
  const crocodileComposer = new Composer();

  crocodileComposer.on('message::text', async (ctx) => {
    console.log('check');
    ctx.reply("Let's play crocodile", { reply_markup: 'aboba' });
  });

  return crocodileComposer;
};

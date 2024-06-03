import { Composer } from 'grammy';

const crocodile = (ladderService) => {
  const composer = new Composer();

  composer.command('crocodile_rating', async (ctx) => {
    const res = await ladderService.getChatRating(ctx.chat.id);
    console.log(res);
    if (res.length === 0) await ctx.reply('Nobody has played yet');
    let text = '';
    res.map((record, index) => {
      text += `${index + 1}. ${record.username}: ${record.score}\n`;
    });
    ctx.reply(text);
  });

  composer.command('crocodile_start', async (ctx) => {
    await ctx.api.sendMessage(ctx.from.id, 'Test');
  });

  return composer;
};

export default crocodile;

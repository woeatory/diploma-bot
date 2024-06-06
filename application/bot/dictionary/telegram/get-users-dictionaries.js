import { Composer } from 'grammy';

const getUsersAllDictionaries = (dictionaryService) => {
  const composer = new Composer();

  composer.command('get_my_dictionaries', async (ctx) => {
    const res = await dictionaryService.getUserDictionaries(ctx.msg.from.id);
    console.log(res);
    if (res.length === 0) {
      await ctx.reply('You have no dictionaries');
      return;
    }
    const inlineKeyboard = res.map((dict) => [
      {
        text: `${dict.title}(${dict.language})`,
        callback_data: `view_${dict.dictionary_id}`,
      },
    ]);
    await ctx.reply('Your dictionaries:', {
      reply_markup: { inline_keyboard: inlineKeyboard },
    });
  });

  return composer;
};

export default getUsersAllDictionaries;

import { Composer } from 'grammy';

const viewDictionary = (dictionaryService) => {
  async function viewDictionaryHandler(ctx, dictionaryId, page) {
    const [dictionary] = await dictionaryService.getDictionary(dictionaryId);

    const wordsPerPage = 10;

    const totalPages = Math.ceil(
      Object.keys(dictionary.words).length / wordsPerPage,
    );

    const renderPage = (page) => {
      const words = Object.entries(dictionary.words);
      const start = page * wordsPerPage;
      const end = start + wordsPerPage;
      const wordsPage = words.slice(start, end);

      let message = `Dictionary: ${dictionary.title}\nLanguage: ${dictionary.language}\n\n`;
      wordsPage.forEach(([word, definition]) => {
        message += `${word}: ${definition}\n`;
      });

      const navigationKeyboard = [];
      if (page > 0) {
        navigationKeyboard.push({
          text: 'Previous',
          callback_data: `prev_${dictionaryId}_${page - 1}`,
        });
      }
      if (page < totalPages - 1) {
        navigationKeyboard.push({
          text: 'Next',
          callback_data: `next_${dictionaryId}_${page + 1}`,
        });
      }
      const editKeyboard = [];
      editKeyboard.push({
        text: 'Edit',
        callback_data: `edit_${dictionaryId}`,
      });

      return { message, inlineKeyboard: [navigationKeyboard, editKeyboard] };
    };

    const { message, inlineKeyboard } = renderPage(page);
    await ctx.editMessageText(message, {
      reply_markup: { inline_keyboard: inlineKeyboard },
    });
  }

  const composer = new Composer();

  composer.command('list_dictionaries', async (ctx) => {
    const dictionaries = await dictionaryService.getUserDictionaries(
      ctx.from.id,
    );
    if (dictionaries.length === 0) {
      await ctx.reply('You have no dictionaries.');
    } else {
      const inlineKeyboard = dictionaries.map((dict) => [
        { text: dict.label, callback_data: `view_${dict.dictionary_id}` },
      ]);
      await ctx.reply('Your dictionaries:', {
        reply_markup: { inline_keyboard: inlineKeyboard },
      });
    }
  });

  composer.callbackQuery(/^view_(\d+)$/, async (ctx) => {
    const dictionaryId = ctx.match[1];
    const page = 0;
    await ctx.answerCallbackQuery(
      viewDictionaryHandler(ctx, dictionaryId, page),
    );
  });

  composer.callbackQuery(/^prev_(\d+)_(\d+)$/, async (ctx) => {
    const dictionaryId = ctx.match[1];
    const page = parseInt(ctx.match[2], 10);
    await ctx.answerCallbackQuery(
      viewDictionaryHandler(ctx, dictionaryId, page),
    );
  });

  composer.callbackQuery(/^next_(\d+)_(\d+)$/, async (ctx) => {
    const dictionaryId = ctx.match[1];
    const page = parseInt(ctx.match[2], 10);
    await ctx.answerCallbackQuery(
      viewDictionaryHandler(ctx, dictionaryId, page),
    );
  });

  return composer;
};

export default viewDictionary;

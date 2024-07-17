import { Composer } from 'grammy';
import { createConversation } from '@grammyjs/conversations';

const createDictionary = (dictionaryService) => {
  async function createDictionaryHandler(conversation, ctx) {
    await ctx.reply("Let's create a new dictionary! Enter a dictionary title:");
    const title = await conversation.form.text();

    await ctx.reply('Enter a language:');
    const language = await conversation.form.text();

    await ctx.reply('Enter a word or type /cancel to cancel:');

    const words = {};

    while (true) {
      const word = await conversation.form.text();

      if (word.toLowerCase() === '/save') {
        await ctx.reply('Your dictionary has been created!');

        const dictionary = {
          title,
          language,
          words,
          owner_id: ctx.from.id,
        };
        await conversation.external(
          async () => await dictionaryService.createDictionary(dictionary),
        );
        break;
      } else if (word.toLowerCase() === '/cancel') {
        await ctx.reply('Dictionary creation has been canceled');
        break;
      }

      await ctx.reply('Please enter the definition for the word:');
      const definition = await conversation.form.text();

      words[word] = definition;
      await ctx.reply(
        'Word and definition added! Enter another word or type /save or /cancel',
      );
    }
  }

  const composer = new Composer();
  composer.use(createConversation(createDictionaryHandler));
  composer.command('create_dictionary', async (ctx) => {
    await ctx.conversation.enter('createDictionaryHandler');
  });

  return composer;
};

export default createDictionary;

import { Composer, Keyboard } from 'grammy';
import { createConversation } from '@grammyjs/conversations';

const editDictionaryConversation = (dictionaryService) => {
  async function editDictionaryHandler(conversation, ctx) {
    const addWord = 'Add word';
    const deleteWord = 'Delete word';
    const save = 'Save';
    const cancel = 'Cancel';

    const keyboard = new Keyboard()
      .text(addWord)
      .text(deleteWord)
      .row()
      .text(save)
      .text(cancel)
      .resized();

    const dictionaryId = ctx.match[1];
    const [dictionary] = await dictionaryService.getDictionary(dictionaryId);

    while (true) {
      ctx.reply('Choose an option', {
        reply_markup: keyboard,
        one_time_keyboard: true,
      });
      const command = await conversation.form.text();
      if (command === addWord) {
        await ctx.reply('Send the word you want to add');
        const word = await conversation.form.text();
        await ctx.reply("Send it's definition");
        const definition = await conversation.form.text();
        dictionary.words[word] = definition;
        await ctx.reply('You added a new word - ' + word);
      } else if (command === save) {
        await dictionaryService.updateDictionary(dictionary);
        ctx.reply('Dictionary saved');
        return;
      } else if (command === deleteWord) {
        ctx.reply('Send the word you want to remove');
        const wordToRemove = await conversation.form.text();
        delete dictionary.words[wordToRemove];
        ctx.reply('Word deleted');
      } else if (command === cancel) {
        ctx.reply('You canceled editing');
        return;
      }
    }
  }

  const composer = new Composer();
  composer.use(createConversation(editDictionaryHandler));
  composer.callbackQuery(/^edit_(\d+)$/, async (ctx) => {
    await ctx.conversation.enter('editDictionaryHandler');
    await ctx.answerCallbackQuery();
  });

  return composer;
};

export default editDictionaryConversation;

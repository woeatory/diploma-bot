import { Composer } from 'grammy';
import { createConversation } from '@grammyjs/conversations';

const editDictionaryConversation = (dictionaryService) => {
  async function editDictionaryHandler(conversation, ctx) {
    await ctx.reply('Editing dict');
    console.log(ctx.match);
    const text = await conversation.form.text();
    console.log(text);
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

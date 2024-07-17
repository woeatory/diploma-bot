import { Composer } from 'grammy';

const chats = (chatService) => {
  const chatsComposer = new Composer();

  chatsComposer.on(':new_chat_members:me', async (ctx) => {
    await chatService.createChat(ctx.chat.id);
  });
  return chatsComposer;
};

export default chats;

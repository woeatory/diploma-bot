import { Composer } from 'grammy';

const user = (userService) => {
  const userComposer = new Composer();

  userComposer.command('start', async (ctx) => {
    await userService.createUser(ctx.from?.id, ctx.from?.username);
  });

  userComposer.on('message', async (ctx) => {
    if (ctx.chat.type !== 'private') {
      await userService.createUser(ctx.from?.id, ctx.from?.username);
    }
  });
  return userComposer;
};

export default user;

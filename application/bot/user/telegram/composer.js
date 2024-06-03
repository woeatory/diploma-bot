import { Composer } from 'grammy';

const user = (userService) => {
  const userComposer = new Composer();

  userComposer.command('start', async (ctx, next) => {
    await userService.createUser(ctx.from?.id, ctx.from?.username);
    await next();
  });

  userComposer.on('message', async (ctx, next) => {
    if (ctx.chat.type !== 'private') {
      await userService.createUser(ctx.from?.id, ctx.from?.username);
    }
    await next();
  });
  return userComposer;
};

export default user;

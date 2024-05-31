import { Composer } from 'grammy';

export const user = (userService) => {
  const userComposer = new Composer();

  userComposer.command('start', async (ctx) => {
    await userService.createUser(ctx.from?.id);
  });
  return userComposer;
};

import { Composer } from 'grammy';

const getAllLectures = (lectureService) => {
  const composer = new Composer();

  composer.command('get_all_lectures', async (ctx) => {
    const res = await lectureService.readAllLectures();
    if (res.length === 0) {
      await ctx.reply('There is no lectures');
      return;
    }

    const inlineKeyboard = res.map((lecture) => [
      {
        text: `${lecture.title}`,
        callback_data: `start_${lecture.id}`,
      },
    ]);

    await ctx.reply('Lectures:', {
      reply_markup: { inline_keyboard: inlineKeyboard },
    });
  });

  return composer;
};

export default getAllLectures;

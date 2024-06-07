import { createConversation } from '@grammyjs/conversations';
import { Composer, Keyboard } from 'grammy';

const startLecture = (lectureService) => {
  async function startLectureHandler(conversation, ctx) {
    const lecture = await lectureService.readLectureById(ctx.match[1]);

    await ctx.reply(
      `Started lecture: ${lecture.title}\n\n${lecture.description}`,
    );
    const results = {
      answers: 0,
      correct: 0,
      wrong: 0,
    };
    for (const task of lecture.tasks) {
      const text = `Assignment ${task.order + 1}\n\n${task.assignment}`;
      const options = task.options.map((option) => [
        Keyboard.text(option.option_text),
      ]);
      const keyboard = Keyboard.from(options).resized();
      await ctx.reply(text, { reply_markup: keyboard });
      const answer = await conversation.form.text();

      const correct = task.options.find(
        (option) => option.option_text === answer && option.is_correct,
      );
      results.answers += 1;
      correct ? (results.correct += 1) : (results.wrong += 1);
    }

    await ctx.reply(
      `Your results:\nAnswers: ${results.answers}\nCorrect: ${results.correct}\nWrong: ${results.wrong}`,
    );
  }

  const composer = new Composer();
  composer.use(createConversation(startLectureHandler));
  composer.callbackQuery(/^start_(\d+)$/, async (ctx) => {
    await ctx.conversation.enter('startLectureHandler');
    await ctx.answerCallbackQuery();
  });
  return composer;
};

export default startLecture;

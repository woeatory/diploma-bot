export default class LectureRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async createLecture(lecture) {
    console.log({ createLecture: lecture });

    try {
      await this.knex.transaction(async (trx) => {
        const [lectureId] = await trx('Lectures')
          .insert({
            title: lecture.title,
            description: lecture.description,
          })
          .returning('id');
        const taskPromises = lecture.tasks.map(async (task, index) => {
          // Insert each task and get the task id
          const [taskId] = await trx('Tasks')
            .insert({
              lecture_id: lectureId.id,
              assignment: task.assignment,
              order: index,
            })
            .returning('id');

          const optionPromises = task.options.map((option) =>
            trx('Options').insert({
              task_id: taskId.id,
              option_text: option.text,
              is_correct: option.isCorrect,
            }),
          );

          await Promise.all(optionPromises);
        });

        await Promise.all(taskPromises);
      });
    } catch (error) {
      console.error('Error creating lecture:', error);
      throw error;
    }
  }
}

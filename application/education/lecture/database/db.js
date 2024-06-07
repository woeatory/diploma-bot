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
            author_id: lecture.authorId,
          })
          .returning('id');
        const taskPromises = lecture.tasks.map(async (task, index) => {
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

  async readAllLectures(fields = ['*']) {
    console.log({ readAllLectures: fields });
    return await this.knex('Lectures').select(fields);
  }

  async readLectureById(lectureId) {
    console.log({ readLectureById: lectureId });
    try {
      const lecture = await this.knex('Lectures')
        .select('id', 'title', 'description', 'author_id')
        .where({ id: lectureId })
        .first();

      if (!lecture) {
        throw new Error(`Lecture with ID ${lectureId} not found`);
      }

      const tasks = await this.knex('Tasks')
        .select('id', 'assignment', 'order')
        .where({ lecture_id: lectureId })
        .orderBy('order', 'asc');

      const taskIds = tasks.map((task) => task.id);
      const options = await this.knex('Options')
        .select('id', 'task_id', 'option_text', 'is_correct')
        .whereIn('task_id', taskIds);

      const tasksWithOptions = tasks.map((task) => ({
        ...task,
        options: options.filter((option) => option.task_id === task.id),
      }));

      return {
        id: lecture.id,
        title: lecture.title,
        description: lecture.description,
        tasks: tasksWithOptions,
      };
    } catch (error) {
      console.error('Error reading lecture:', error);
      throw error;
    }
  }
}

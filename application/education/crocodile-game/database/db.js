export default class LadderRepository {
  tableName = 'Ladder';
  constructor(knex) {
    this.knex = knex;
  }

  async createRating({ userId, chatId, score = 0 }) {
    console.log({ createRating: { userId, chatId, score } });
    return await this.knex(this.tableName)
      .insert({ user_id: userId, chat_id: chatId, score })
      .returning('*');
  }

  async readRating(chatId, fields = ['*']) {
    console.log({ readRating: chatId });
    const names = fields.join(', ');
    return await this.knex(this.tableName)
      .select(names)
      .where({ chat_id: chatId })
      .orderBy('score', 'desc');
  }

  async updateRating({ userId, chatId, score }) {
    console.log({ updateRating: { userId, chatId, score } });
    return await this.knex(this.tableName)
      .where({ user_id: userId, chat_id: chatId })
      .update({ score })
      .returning('*');
  }
}

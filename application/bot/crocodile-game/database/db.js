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

  async readRating(chatId) {
    console.log({ readRating: chatId });
    return await this.knex(this.tableName)
      .join('Users', `${this.tableName}.user_id`, '=', 'Users.user_id')
      .select(
        `${this.tableName}.user_id`,
        `${this.tableName}.chat_id`,
        'Users.username',
        `${this.tableName}.score`,
      )
      .where(`${this.tableName}.chat_id`, chatId)
      .orderBy(`${this.tableName}.score`, 'desc');
  }

  async updateRating({ userId, chatId, score }) {
    console.log({ updateRating: { userId, chatId, score } });
    return await this.knex(this.tableName)
      .where({ user_id: userId, chat_id: chatId })
      .update({ score })
      .returning('*');
  }
}

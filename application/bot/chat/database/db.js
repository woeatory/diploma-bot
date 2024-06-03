export default class ChatsRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async createChat(chatId) {
    console.log({ createChat: chatId });
    return await this.knex('Chats')
      .insert({ chat_id: chatId })
      .returning('*')
      .onConflict()
      .ignore();
  }
}

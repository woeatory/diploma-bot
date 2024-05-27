export default class UserRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async createUser(userId) {
    console.log({ createUser: userId });
    await this.knex('Users').insert({ user_id: userId }).onConflict().ignore();
  }

  async readUser(userId, fields = ['*']) {
    const names = fields.join(', ');
    console.log({ readUser: userId });
    return await this.knex('Users')
      .select(names)
      .whereRaw('user_id = ?', userId);
  }
}

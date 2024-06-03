export default class UserRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async createUser(userId, username = null) {
    console.log({ createUser: userId });
    return await this.knex('Users')
      .insert({ user_id: userId, username })
      .returning('*')
      .onConflict('user_id')
      .merge();
  }

  async readUser(userId, fields = ['*']) {
    console.log({ readUser: userId });
    const names = fields.join(', ');
    return await this.knex('Users')
      .select(names)
      .whereRaw('user_id = ?', userId);
  }
}

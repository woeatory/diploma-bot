export default class UserRepository {
  constructor(knex) {
    this.knex = knex;
  }

  async createUser(userId, username = null) {
    console.log({ createUser: userId });
    return this.knex
      .transaction((trx) =>
        trx
          .insert({ user_id: userId }, 'user_id')
          .into('Users')
          .returning('user_id')
          .onConflict()
          .ignore()
          .then((id) => trx('Users').insert(username).where({ user_id: id })),
      )
      .catch((error) => {
        console.error(error);
      });
    // return await this.knex('Users')
    //   .insert({ user_id: userId, username })
    //   .returning('*')
    //   .onConflict('user_id')
    //   .ignore();
  }

  async readUser(userId, fields = ['*']) {
    console.log({ readUser: userId });
    const names = fields.join(', ');
    return await this.knex('Users')
      .select(names)
      .whereRaw('user_id = ?', userId);
  }
}

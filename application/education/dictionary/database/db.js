const dictionariesTable = 'Dictionaries';

export default class DictionaryRepository {
  constructor(knex) {
    this.knex = knex;
  }
  async createDictionary({ lable, authorId, language, words }) {
    console.log({ createDictionary: { lable, authorId, language, words } });
    return await this.knex.transaction(async (trx) => {
      const [createdDictionary] = await trx(dictionariesTable)
        .insert({
          lable,
          owner_id: authorId,
          language,
          words,
        })
        .returning('*')
        .catch((error) => console.error(error));

      console.log('created dictionary: ' + createdDictionary)
      return createdDictionary;
    });
  }
}

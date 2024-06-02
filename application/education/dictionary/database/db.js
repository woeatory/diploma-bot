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
        .returning('*');

      return createdDictionary;
    });
  }

  async readDictionary(ownerId, fields = ['*']) {
    console.log({ readDictionary: [ownerId, ...fields] });
    return await this.knex(dictionariesTable)
      .select(fields)
      .whereRaw('owner_id = ?', ownerId);
  }

  async updateDictionary(dictionaryId, fields) {
    console.log({ updateDictionary: { dictionaryId, fields } });
    return await this.knex(dictionariesTable)
      .where({ dictionary_id: dictionaryId })
      .update(fields, ['*']);
  }

  async deleteDictionary(dictionaryId) {
    console.log({ deleteDictionary: dictionaryId });
    return await this.knex(dictionariesTable)
      .where({ dictionary_id: dictionaryId })
      .del();
  }
}

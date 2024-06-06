const dictionariesTable = 'Dictionaries';

export default class DictionaryRepository {
  constructor(knex) {
    this.knex = knex;
  }
  async createDictionary({ title, owner_id, language, words }) {
    console.log({ createDictionary: { title, owner_id, language, words } });
    return await this.knex.transaction(async (trx) => {
      const [createdDictionary] = await trx(dictionariesTable)
        .insert({
          title,
          owner_id,
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

  async readDictionaryById(dictionaryId) {
    console.log({ readDictionaryById: dictionaryId });
    return await this.knex(dictionariesTable)
      .select('*')
      .where({ dictionary_id: dictionaryId });
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

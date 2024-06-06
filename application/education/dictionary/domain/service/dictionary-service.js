export default class DictionaryService {
  constructor(dictionaryRepository) {
    this.dictionaryRepository = dictionaryRepository;
  }

  async createDictionary(dictionary) {
    return await this.dictionaryRepository.createDictionary(dictionary);
  }

  async readDictionary(fields) {
    await this.dictionaryRepository.readDictionary(fields);
  }

  async getDictionary(dictionaryId) {
    return await this.dictionaryRepository.readDictionaryById(dictionaryId, [
      'dictionary_id',
      'title',
      'language',
      'words',
    ]);
  }

  async getUserDictionaries(userId) {
    return await this.dictionaryRepository.readDictionary(userId, [
      'dictionary_id',
      'title',
      'language',
    ]);
  }

  async updateDictionary(dictionary) {
    await this.dictionaryRepository.updateDictionary(
      dictionary.dictionary_id,
      dictionary,
    );
  }

  async deleteDictionary(dictionary) {
    await this.dictionaryRepository.removeDictionary(dictionary);
  }
}

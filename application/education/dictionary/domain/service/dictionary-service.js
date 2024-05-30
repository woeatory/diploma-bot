export default class DictionaryService {
  constructor(dictionaryRepository) {
    this.dictionaryRepository = dictionaryRepository;
  }

  async createDictionary(dictionary) {
    await this.dictionaryRepository.createDictionary(dictionary);
  }

  async readDictionary(fields) {
    await this.dictionaryRepository.readDictionary(fields);
  }

  async updateDictionary(dictionary) {
    await this.dictionaryRepository.updateDictionary(dictionary);
  }

  async deleteDictionary(dictionary) {
    await this.dictionaryRepository.removeDictionary(dictionary);
  }
}

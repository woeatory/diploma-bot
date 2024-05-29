export default class DictionaryService {
  constructor(dictionaryRepository) {
    this.dictionaryRepository = dictionaryRepository;
  }

  async createDictionary(dictionary) {
    await this.dictionaryRepository.createDictionary(dictionary);
  }

  readDictionary(fields) {
    this.dictionaryRepository.readDictionary(fields);
  }

  updateDictionary(dictionary) {
    this.dictionaryRepository.updateDictionary(dictionary);
  }

  deleteDictionary(dictionary) {
    this.dictionaryRepository.removeDictionary(dictionary);
  }
}

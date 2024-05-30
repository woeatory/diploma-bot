export default class Dictionary {
  constructor({ id, authorId, language, words }) {
    this.id = id;
    this.authorId = authorId;
    this.language = language;
    this.words = words;
  }
}

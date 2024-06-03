export default class LadderService {
  constructor(ladderRepository) {
    this.ladderRepository = ladderRepository;
  }

  async getChatRating(chatId) {
    return await this.ladderRepository.readRating(chatId);
  }
}

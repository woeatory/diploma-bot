export default class LadderService {
  constructor(ladderRepository) {
    this.ladderRepository = ladderRepository;
  }

  async getChatRating(chatId) {
    const res = await this.ladderRepository.readRating(chatId, ['user_id', 'score']);
    console.log(res);
  }
}

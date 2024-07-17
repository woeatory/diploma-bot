export default class LadderService {
  constructor(ladderRepository) {
    this.ladderRepository = ladderRepository;
  }

  async getChatRating(chatId) {
    return await this.ladderRepository.readRating(chatId);
  }

  async addUsersScore({ userId, chatId }) {
    const chatRating = await this.getChatRating(chatId);
    for (const user of chatRating) {
      const parsed = parseInt(user.user_id);
      if (parsed === userId) {
        return await this.ladderRepository.updateRating({
          userId,
          chatId,
          score: (user.score += 1),
        });
      }
    }
    return await this.ladderRepository.createRating({
      userId,
      chatId,
      score: 1,
    });
  }
}

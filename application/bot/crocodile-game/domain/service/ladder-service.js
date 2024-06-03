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
      console.log(user);
      const parsed = parseInt(user.user_id);
      console.log('userId: ' + userId);
      console.log('parsed:' + parsed);
      if (parsed === userId) {
        console.log('aaaa');
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

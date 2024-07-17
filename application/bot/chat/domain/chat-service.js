export default class ChatService {
  constructor(chatRepository) {
    this.chatRepository = chatRepository;
  }

  async createChat(chatId) {
    return await this.chatRepository.createChat(chatId);
  }
}

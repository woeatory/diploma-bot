export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userId) {
    return await this.userRepository.createUser(userId);
  }

  async readUser(userId) {
    return await this.userRepository.readUser(userId);
  }
}

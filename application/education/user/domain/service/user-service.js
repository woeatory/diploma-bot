export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userId) {
    await this.userRepository.createUser(userId);
  }

  async readUser(userId) {
    const res = await this.userRepository.readUser(userId);
    console.log(res);
  }
}

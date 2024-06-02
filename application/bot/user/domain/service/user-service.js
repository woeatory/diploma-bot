import { UsersCache } from '../../../../utils/cache.js';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userId, username) {
    if (UsersCache.has(userId)) return userId;
    await this.userRepository.createUser(userId, username);
    UsersCache.add(userId, username);
    return userId;
  }

  async readUser(userId) {
    await this.userRepository.readUser(userId);
  }
}

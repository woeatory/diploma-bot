import { UsersCache } from '../../../../utils/cache.js';

export default class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userId) {
    if (UsersCache.has(userId)) return userId;
    await this.userRepository.createUser(userId);
    UsersCache.add(userId);
    return userId;
  }

  async readUser(userId) {
    await this.userRepository.readUser(userId);
  }
}

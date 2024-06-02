export class UsersCache {
  static storage = new Map();

  static has(userId) {
    return this.storage.has(userId);
  }

  static add(userId, username) {
    return this.storage.set(userId, username)
  }

  static delete(userId) {
    return this.storage.delete(userId);
  }

  static clear() {
    this.storage.clear();
  }
}

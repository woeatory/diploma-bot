export class UsersCache {
  static storage = new Set();

  static has(userId) {
    return this.storage.has(userId);
  }

  static add(userId) {
    return this.storage.add(userId);
  }

  static delete(userId) {
    return this.storage.delete(userId);
  }

  static clear() {
    this.storage.clear();
  }
}

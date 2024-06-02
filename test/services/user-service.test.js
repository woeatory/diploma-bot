import { describe, it, mock, beforeEach } from 'node:test';
import assert from 'node:assert';
import UserService from '../../application/bot/user/domain/service/user-service.js';
import { UsersCache } from '../../application/utils/cache.js';

describe('UserService', () => {
  beforeEach(() => mock.restoreAll());
  describe('createUser', () => {
    beforeEach(() => {
      UsersCache.clear();
    });

    it("should check in cache, then add to db and cache, if cache doesn't have", async (t) => {
      const userId = 0;
      const createdAt = new Date();
      class UserRepositoryMock {
        createUser(userId) {
          return [
            {
              user_id: userId,
              created_at: createdAt,
            },
          ];
        }
      }

      const userRepositoryMock = new UserRepositoryMock();
      t.mock.method(userRepositoryMock, 'createUser');
      const userService = new UserService(userRepositoryMock);

      const actual = await userService.createUser(userId);
      assert.strictEqual(userRepositoryMock.createUser.mock.calls.length, 1);
      assert.strictEqual(actual, userId);
      assert.ok(UsersCache.has(userId));
    });

    it('should check in cache, then return from cache if present', async (t) => {
      const userId = 0;
      class UserRepositoryMock {
        createUser() {
          throw new Error('Shouldn\t invoke');
        }
      }
      UsersCache.add(userId);
      const userRepositoryMock = new UserRepositoryMock();
      t.mock.method(userRepositoryMock, 'createUser');
      t.mock.method(UsersCache, 'has');
      t.mock.method(UsersCache, 'add');
      const userService = new UserService(userRepositoryMock);

      const actual = await userService.createUser(userId);

      assert.strictEqual(userRepositoryMock.createUser.mock.calls.length, 0);
      assert.strictEqual(UsersCache.has.mock.calls.length, 1);
      assert.strictEqual(UsersCache.add.mock.calls.length, 0);
      assert.strictEqual(actual, userId);
      assert.ok(UsersCache.has(userId));
    });
  });
});

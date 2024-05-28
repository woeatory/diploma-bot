import { describe, it, before, after, afterEach } from 'node:test';
import assert from 'node:assert';
import knex from 'knex';
import knexConfig from '../../database/knexfile.js';
import UserRepository from '../../application/education/user/database/db.js';

describe('User repository', async () => {
  const db = knex(knexConfig.development);
  const userRepository = new UserRepository(db);

  before(async () => {
    await db.migrate.latest();
    await db('Users').del();
  });

  after(async () => {
    await db('Users').del();
    await db.destroy();
  });

  afterEach(async () => {
    await db('Users').del();
  });

  it('createUser should insert new user into DB', async () => {
    const userId = '0';
    const expectedTime = new Date();

    await userRepository.createUser(userId);

    const actual = await db('Users').select();
    const actualTime = actual[0].created_at;

    assert.ok(
      Math.abs(expectedTime.getTime() - actualTime.getTime()) < 5000,
      `created_at is not within the expected range: ${actualTime}`,
    );
    assert.strictEqual(actual[0]?.user_id, userId);
  });

  it('createUser should do nothing in case of duplication conflict', async () => {
    const userId = 0;
    await userRepository.createUser(userId);

    const actual = await userRepository.createUser(userId);
    assert.strictEqual(actual.length, 0);
  });

  it('readUser should return array of given fields', async () => {
    const userId = '0';
    await db('Users').insert({ user_id: userId });

    const [caseOne] = await userRepository.readUser(userId);
    console.log(caseOne);
    assert.strictEqual(
      Object.keys(caseOne).length,
      2,
      'should return [user_id, created_at]',
    );
    assert.strictEqual(caseOne.user_id, userId);
    assert.ok(
      typeof Date.parse(caseOne.created_at) === 'number',
      'should be date',
    );

    const [caseTwo] = await userRepository.readUser(userId, ['created_at']);
    assert.strictEqual(Object.keys(caseTwo).length, 1);
    assert.ok(
      typeof Date.parse(caseTwo.created_at) === 'number',
      'should be date',
    );

    const [caseThree] = await userRepository.readUser(userId, ['user_id']);
    assert.strictEqual(Object.keys(caseThree).length, 1);
    assert.strictEqual(caseThree.user_id, userId);
  });
});

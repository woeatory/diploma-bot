import { describe, it, before, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import DictionaryRepository from '../../application/education/dictionary/database/db.js';
import UserRepository from '../../application/education/user/database/db.js';

import db from '../setup.js';

const knexDb = db;

describe('Repositories', { concurrency: false }, () => {
  before(async () => {
    await knexDb.migrate.latest();
  });

  after(async () => {
    knexDb.destroy();
  });

  describe('UserRepository', () => {
    const userRepository = new UserRepository(knexDb);

    after(async () => {
      await knexDb('Users').del();
    });

    beforeEach(async () => {
      await knexDb('Users').del();
    });

    describe('createUser', () => {
      it('should insert new user into DB', async () => {
        const userId = '0';
        const expectedTime = new Date();

        await userRepository.createUser(userId);

        const actual = await knexDb('Users').select();
        const actualTime = actual[0].created_at;

        assert.ok(
          Math.abs(expectedTime.getTime() - actualTime.getTime()) < 5000,
          `created_at is not within the expected range: ${actualTime}`,
        );
        assert.strictEqual(actual[0]?.user_id, userId);
      });

      it('should do nothing in case of duplication conflict', async () => {
        const userId = 0;
        await userRepository.createUser(userId);

        const actual = await userRepository.createUser(userId);
        assert.strictEqual(actual.length, 0);
      });
    });
    describe('readUser', () => {
      it('should return array of given fields', async () => {
        const userId = '0';
        await knexDb('Users').insert({ user_id: userId });

        const [caseOne] = await userRepository.readUser(userId);
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
  });

  describe('DictionaryRepository', () => {
    const dictionaryRepository = new DictionaryRepository(knexDb);

    before(async () => {
      await knexDb('Users').insert({ user_id: 0 });
    });

    after(async () => {
      await knexDb('Dictionaries').del().truncate();
      await knexDb('Users').del();
    });

    beforeEach(async () => {
      await knexDb('Dictionaries').del();
    });

    describe('createDictionary', () => {
      it('should insert new dictionary into DB', async () => {
        const dictionary = {
          lable: 'Test dictionary',
          authorId: '0',
          language: 'English',
          words: {
            nocturnal: 'active mainly during the night',
            prolific: 'producing a large amount of something',
            relapse: 'the return of an illness after a period of improvement ',
          },
        };
        const expectedTime = new Date();

        const actual = await dictionaryRepository.createDictionary(dictionary);
        const actualTime = actual.created_at;

        assert.ok(
          Math.abs(expectedTime.getTime() - actualTime.getTime()) < 5000,
          `created_at is not within the expected range: ${actualTime}`,
        );
        assert.strictEqual(actual.lable, dictionary.lable);
        assert.strictEqual(actual.language, dictionary.language);
        assert.strictEqual(actual.owner_id, dictionary.authorId);
        assert.deepStrictEqual(actual.words, dictionary.words);
      });

      it("should throw exeption if user doesn't exist", async () => {
        const dictionary = {
          lable: 'Test dictionary',
          authorId: '1',
          language: 'English',
          words: {
            nocturnal: 'active mainly during the night',
            prolific: 'producing a large amount of something',
            relapse: 'the return of an illness after a period of improvement ',
          },
        };

        assert.rejects(async () => {
          await dictionaryRepository.createDictionary(dictionary);
        });
      });
    });

    describe('readDictionary', () => {
      it('should return dictionary with given fields', async () => {
        const dictionaries = [
          {
            lable: 'First dictionary',
            authorId: '0',
            language: 'English',
            words: {
              nocturnal: 'active mainly during the night',
              prolific: 'producing a large amount of something',
              relapse:
                'the return of an illness after a period of improvement ',
            },
          },
          {
            lable: 'Second dictionary',
            authorId: '0',
            language: 'English',
            words: {
              nocturnal: 'active mainly during the night',
              prolific: 'producing a large amount of something',
              relapse:
                'the return of an illness after a period of improvement ',
            },
          },
        ];
        for await (const dictionary of dictionaries) {
          await dictionaryRepository.createDictionary(dictionary);
        }

        const caseOne = await dictionaryRepository.readDictionary(0, ['*']);

        assert.ok(Array.isArray(caseOne), 'should be array');
        assert.strictEqual(caseOne.length, 2);
        for (let i = 0; i < dictionaries.length; i++) {
          assert.strictEqual(caseOne[i].lable, dictionaries[i].lable);
          assert.strictEqual(caseOne[i].language, dictionaries[i].language);
          assert.strictEqual(caseOne[i].owner_id, dictionaries[i].authorId);
          assert.deepStrictEqual(caseOne[i].words, dictionaries[i].words);
        }

        const caseTwo = await dictionaryRepository.readDictionary(0, ['words']);
        assert.ok(Array.isArray(caseTwo), 'should be array');
        assert.strictEqual(caseTwo.length, 2);
        for (let i = 0; i < dictionaries.length; i++) {
          assert.deepStrictEqual(caseOne[i].words, dictionaries[i].words);
        }
      });
    });
  });
});

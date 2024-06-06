/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';
import DictionaryService from '../../application/education/dictionary/domain/service/dictionary-service.js';

describe('DictionaryService', () => {
  beforeEach(() => mock.restoreAll());

  describe('createDictionary', () => {
    it('should call createDictionary method of repository and return createdDictionary', async (t) => {
      const title = 'test title';
      const language = 'English';
      const words = {
        nocturnal: 'active mainly during the night',
        prolific: 'producing a large amount of something',
        relapse: 'the return of an illness after a period of improvement ',
      };
      const owner_id = 1;
      const dictionary = {
        title,
        language,
        words,
        owner_id,
      };
      const time = Date.now();
      class DictionaryRepositoryMock {
        async createDictionary({ title, language, words, owner_id }) {
          return Promise.resolve({
            dictionary_id: 1,
            title,
            language,
            words,
            owner_id,
            created_at: time,
            updated_at: time,
          });
        }
      }

      const dictionaryRepositoryMock = new DictionaryRepositoryMock();
      t.mock.method(dictionaryRepositoryMock, 'createDictionary');
      const dictionaryService = new DictionaryService(dictionaryRepositoryMock);

      const actual = await dictionaryService.createDictionary(dictionary);

      assert.strictEqual(
        dictionaryRepositoryMock.createDictionary.mock.calls.length,
        1,
      );
      assert.deepStrictEqual(actual, {
        dictionary_id: 1,
        ...dictionary,
        created_at: time,
        updated_at: time,
      });
    });
  });

  describe('getUsersDictionaries', () => {
    it('should return list of users dictionaries', async (t) => {
      const time = Date.now();
      const firstDictionary = {
        dictionary_id: 1,
        title: 'first test dictionary',
        language: 'Enghlish',
        created_at: time,
        updated_at: time,
        owner_id: 0,
      };

      const secondDictionary = {
        dictionary_id: 1,
        title: 'second test dictionary',
        language: 'Enghlish',
        created_at: time,
        updated_at: time,
        owner_id: 0,
      };

      class DictionaryRepositoryMock {
        async readDictionary(userId) {
          return Promise.resolve([firstDictionary, secondDictionary]);
        }
      }

      const dictionaryRepositoryMock = new DictionaryRepositoryMock();
      t.mock.method(dictionaryRepositoryMock, 'readDictionary');
      const dictionaryService = new DictionaryService(dictionaryRepositoryMock);

      const actual = await dictionaryService.getUsersDictionaries(0);
      assert.strictEqual(
        dictionaryRepositoryMock.readDictionary.mock.calls.length,
        1,
      );
      assert.deepStrictEqual(actual, [firstDictionary, secondDictionary]);
    });
  });
});

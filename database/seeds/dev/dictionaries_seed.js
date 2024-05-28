/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Dictionaries').del().truncate();
  await knex('Dictionaries').insert([
    {
      name: 'my dictionary',
      language: 'English',
      words: {
        nocturnal: 'active mainly during the night',
        prolific: 'producing a large amount of something',
        relapse: 'the return of an illness after a period of improvement ',
      },
    },
  ]);
}

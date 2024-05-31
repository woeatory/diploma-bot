/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Dictionaries').insert([
    {
      lable: 'my dictionary',
      language: 'English',
      owner_id: '6965493277',
      words: {
        nocturnal: 'active mainly during the night',
        prolific: 'producing a large amount of something',
        relapse: 'the return of an illness after a period of improvement ',
      },
    },
  ]);
}

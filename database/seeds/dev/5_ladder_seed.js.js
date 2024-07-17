/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Ladder').insert([
    {
      user_id: 6965493277,
      chat_id: -4289774077,
      score: 100,
    },
  ]);
}

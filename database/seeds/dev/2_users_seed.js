/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Users').insert([
    { user_id: 6965493277, username: 'movnyuk_bot' },
    { user_id: 399951367, username: 'woeatory' },
  ]);
}

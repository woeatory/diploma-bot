/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Dictionaries').del().truncate();
  await knex('Chats').del();
  await knex('Ladder').del().truncate();
  await knex('Users').del();
}

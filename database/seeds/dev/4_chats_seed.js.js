/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('Chats').insert([
    {
      chat_id: -4289774077,
    },
  ]);
}

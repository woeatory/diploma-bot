/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('Ladder', (table) => {
    table
      .foreign('chat_id')
      .references('chat_id')
      .inTable('Chats')
      .onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('Ladder', (table) => {
    table.dropForeign('chat_id');
  });
}

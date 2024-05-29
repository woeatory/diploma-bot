/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('Dictionaries', (table) => {
    table.dropForeign('owner_id');
    table.foreign('owner_id').references('user_id').inTable('Users').onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('Dictionaries', (table) => {
    table.dropForeign('owner_id');

    table.foreign('owner_id').references('user_id').inTable('Users');
  });
}

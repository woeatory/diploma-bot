/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('Lectures', (table) => {
    table.bigInteger('author_id').notNullable();
    table
      .foreign('author_id')
      .references('user_id')
      .inTable('Users')
      .onDelete('CASCADE');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('Lectures', (table) => {
    table.dropForeign('author_id');
    table.dropColumn('author_id');
  });
}

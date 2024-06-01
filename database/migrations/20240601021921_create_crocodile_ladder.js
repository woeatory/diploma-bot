/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('Ladder', (table) => {
    table.bigInteger('user_id');
    table.foreign('user_id').references('user_id').inTable('Users');
    table.bigInteger('chat_id').notNullable();
    table.integer('score').unsigned();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('Ladder');
}

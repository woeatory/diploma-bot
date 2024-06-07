/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema
    .createTable('Lectures', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamps(true, true);
    })
    .createTable('Tasks', (table) => {
      table.increments('id').primary();
      table.integer('lecture_id').unsigned().notNullable();
      table
        .foreign('lecture_id')
        .references('id')
        .inTable('Lectures')
        .onDelete('CASCADE');
      table.text('assignment').notNullable();
      table.integer('order').unsigned().notNullable();
      table.timestamps(true, true);
    })
    .createTable('Options', (table) => {
      table.increments('id').primary();
      table.integer('task_id').unsigned().notNullable();
      table
        .foreign('task_id')
        .references('id')
        .inTable('Tasks')
        .onDelete('CASCADE');
      table.string('option_text').notNullable();
      table.boolean('is_correct').notNullable();
      table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema
    .alterTable('Options', (table) => {
      table.dropForeign('task_id');
    })
    .alterTable('Tasks', (table) => {
      table.dropForeign('lecture_id');
    })
    .dropTable('Lectures')
    .dropTable('Tasks')
    .dropTable('Options');
}

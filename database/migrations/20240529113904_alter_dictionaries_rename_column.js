/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('Dictionaries', (table) => {
    table.renameColumn('name', 'lable');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('Dictionaries', (table) => {
    table.renameColumn('lable', 'name');
  });
}

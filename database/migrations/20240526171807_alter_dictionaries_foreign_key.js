import { toBool } from '../../utils/utils.js';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('Dictionaries', (table) => {
    table.bigInteger('owner_id').unsigned();
    table.foreign('owner_id').references('Users.user_id');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable('Dictionaries', (table) => {
    table.dropForeign(['owner_id']);
    table.dropColumn('owner_id');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const toBool = [() => true, () => false];
  const exists = await knex.schema.hasTable('Dictionaries').then(...toBool);
  if (exists) {
    return knex.schema.alterTable('Dictionaries', (table) => {
      table.bigInteger('owner_id').unsigned();
      table.foreign('owner_id').references('Users.user_id');
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const toBool = [() => true, () => false];
  const exists = await knex.schema.hasTable('Dictionaries').then(...toBool);
  if (exists) {
    return knex.schema.alterTable('Dictionaries', (table) => {
      table.dropForeign(['owner_id']);
      table.dropColumn('owner_id');
    });
  }
};

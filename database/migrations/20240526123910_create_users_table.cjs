/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.hasTable('Users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('Users', (table) => {
        table.bigInteger('user_id').primary().index();
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Users');
};

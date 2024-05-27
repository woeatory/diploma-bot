/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('Users').del();
  await knex('Users').insert([{ user_id: 6965493277 }]);
};

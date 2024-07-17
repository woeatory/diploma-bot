export function up(knex) {
  return knex.schema.createTable('Dictionaries', (table) => {
    table.increments('dictionary_id');
    table.string('name', 64);
    table.string('language', 64);
    table.json('words');
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable('Dictionaries');
}

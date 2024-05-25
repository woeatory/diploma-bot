exports.up = function (knex) {
  knex.schema.hasTable('Dictionaries').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('Dictionaries', (table) => {
        table.increments('dictionary_id');
        table.string('name', 64);
        table.string('language', 64);
        table.json('words');
        table.timestamps(true, true);
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Dictionaries');
};

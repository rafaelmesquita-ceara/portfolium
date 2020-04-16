
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
        table.string('id').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('git_url');
        table.dateTime('creation_date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

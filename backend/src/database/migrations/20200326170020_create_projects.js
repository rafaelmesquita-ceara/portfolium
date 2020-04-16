
exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table){

        table.increments();
        
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.dateTime('submmit_date').defaultTo(knex.fn.now());
        table.string('what_learned').notNullable();
        table.string('git_url');
        table.string('user_id').notNullable();
        table.foreign('user_id').onDelete('CASCADE').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  
};

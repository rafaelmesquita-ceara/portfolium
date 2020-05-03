
exports.up = function(knex) {
  return knex.schema.createTable('uploads', function(table){

    table.increments();
    
    table.string('filename').notNullable();
    table.string('originalname').notNullable();
    table.string('description').notNullable();
    table.string('mimetype').notNullable();
    table.dateTime('creation_date').defaultTo(knex.fn.now());
    
    table.string('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('users');

    table.integer('project_id').unsigned().notNullable();
    table.foreign('project_id').references('id').inTable('projects');
});
};

exports.down = function(knex) {
  
};

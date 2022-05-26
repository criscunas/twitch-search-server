exports.up = function(knex, Promise) {
  return knex.schema.createTable('channels', (table) => {
    table.increments();
    table.string('display_name').unique().notNullable();
    table.integer('followers').notNullable();
  })
};

exports.down = function(knex) {
return knex.schema.dropTable('channels')  
};

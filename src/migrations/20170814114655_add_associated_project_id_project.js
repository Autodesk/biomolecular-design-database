
exports.up = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
  	table.text('associated_project');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
        table.dropColumn('associated_project');
    }); 
};


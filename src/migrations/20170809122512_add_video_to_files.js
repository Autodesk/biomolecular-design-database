
exports.up = function(knex, Promise) {
  return knex.schema.table('files', function(table) {
        table.bool('video');
        table.text('videoLink');
    }); 
};

exports.down = function(knex, Promise) {
  return knex.schema.table('files', function(table) {
        table.dropColumn('video');
        table.dropColumn('videoLink');
    }); 
};

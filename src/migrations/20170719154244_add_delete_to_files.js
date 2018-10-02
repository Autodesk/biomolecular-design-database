
exports.up = function(knex, Promise) {
     return knex.schema.table('files', function(table) {
        table.text('deleted');
    }); 
};

exports.down = function(knex, Promise) {
     return knex.schema.table('files', function(table) {
        table.dropColumn('deleted');
    }); 
};

exports.up = function(knex, Promise) {
    return knex.schema.table('projects', function(table) {
        table.text('published');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('projects', function(table) {
        table.dropColumn('published');
    });
};
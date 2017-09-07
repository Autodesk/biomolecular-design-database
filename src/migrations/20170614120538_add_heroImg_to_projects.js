
exports.up = function(knex, Promise) {
    return knex.schema.table('projects', function(table) {
        table.text('hero_image').defaultTo(null);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('projects', function(table) {
        table.dropColumn('hero_image');
    });
};
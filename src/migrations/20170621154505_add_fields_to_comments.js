exports.up = function(knex, Promise) {
    return knex.schema.table('comments', function(t) {
        t.text('username');
        t.text('user_firstname');
        t.text('user_lastname');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('products', function(t) {
        t.dropColumn('username');
        t.dropColumn('user_firstname');
        t.dropColumn('user_lastname');
    });
};


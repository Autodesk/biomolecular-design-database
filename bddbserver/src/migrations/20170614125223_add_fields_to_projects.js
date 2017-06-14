exports.up = function(knex, Promise) {
    return knex.schema.table('projects', function(table) {
        table.text('version');
        table.text('publication');
        table.text('contact_linkedin');
        table.text('contact_email');
        table.text('contact_facebook');
        table.text('contact_homepage');
        table.text('project_abstract');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('projects', function(table) {
        table.dropColumn('version');
        table.dropColumn('publication');
        table.dropColumn('contact_linkedin');
        table.dropColumn('contact_email');
        table.dropColumn('contact_facebook');
        table.dropColumn('contact_homepage');
        table.dropColumn('project_abstract');
    });
};